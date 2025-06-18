const Testimonial = require("../models/Testimonials");

// POST: Create new testimonial
exports.createTestimonial = async (req, res) => {
    try {
      const { name, message, rating, image } = req.body;
  
      if (!name || !message || rating == null) {
        return res.status(400).json({ message: "All fields are required." });
      }
  
      const testimonial = new Testimonial({
        name,
        message,
        rating,
        image: image || null, // ✅ صورة اختيارية
      });
  
      await testimonial.save();
  
      res.status(201).json({ message: "Testimonial created successfully", testimonial });
    } catch (error) {
      res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  };
  




// GET: فقط التعليقات المسموحة بالظهور في الصفحة الرئيسية
exports.getTopTestimonials = async (req, res) => {
    try {
      const testimonials = await Testimonial.find({ showOnHome: true }) // ✅ فلترة هنا
        .sort({ rating: -1, createdAt: -1 })
        .limit(6);
        
  
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  



//حذف التعليق حسب اليوزر
exports.deleteTestimonial = async (req, res) => {
    try {
      const testimonial = await Testimonial.findById(req.params.id);
  
      if (!testimonial) {
        return res.status(404).json({ message: "Testimonial not found" });
      }
  
      // تأكد أن المستخدم هو صاحب التقييم (حسب الاسم)
      if (testimonial.name !== req.user.name) {
        return res.status(403).json({ message: "Not authorized to delete this testimonial" });
      }
  
      await testimonial.deleteOne();
      res.json({ message: "Testimonial deleted" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  







  // جميع التقييمات
exports.getAllTestimonials = async (req, res) => {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  };
  
  // حذف من قبل الأدمن
  exports.adminDeleteTestimonial = async (req, res) => {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: "Testimonial deleted by admin" });
  };
  
  // تبديل الظهور
  exports.toggleShowOnHome = async (req, res) => {
    const testimonial = await Testimonial.findById(req.params.id);
    testimonial.showOnHome = !testimonial.showOnHome;
    await testimonial.save();
    res.json({ message: "Visibility updated", showOnHome: testimonial.showOnHome });
  };
  