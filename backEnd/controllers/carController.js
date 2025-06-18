const Car = require("../models/Car");

//اضافه سياره
exports.addCar = async (req, res) => {
  try {
    const { name, brand, model, year, price, condition, images, description } = req.body;

    const newCar = new Car({
      name,
      brand,
      model,
      year,
      price,
      condition,
      images,
      description,
      seller: req.user._id, // تأكد أن الـ middleware يضيف req.user
    });

    await newCar.save();
    res.status(201).json({ message: "The vehicle has been sent for review", car: newCar });
  } catch (err) {
    res.status(500).json({ message: "Transmission failed", error: err.message });
  }
};



//اضافه سياره من قبل الادمن
exports.addCarByAdmin = async (req, res) => {
  try {
    const { name, brand, model, year, price, condition, description } = req.body;
    // if (!name || !brand || !model || !year || !price || !description) {
    //   return res.status(400).json({ message: "كل الحقول مطلوبة!" });
    // }

    // إذا كانت الصور موجودة
    const images = req.files ? req.files.map(file => file.filename) : [];

    // إنشاء السيارة في قاعدة البيانات
    const newCar = new Car({
      name,
      brand,
      model,
      year,
      price,
      condition,
      images,
      description,
      seller: req.user._id,  // تأكد من أنك تضيف الـ user بشكل صحيح
    });

    await newCar.save();
    res.status(201).json({ message: "The car has been sent", car: newCar });
  } catch (err) {
    console.error("Error in adding car:", err);  // إضافة تسجيل الأخطاء
    res.status(500).json({ message: "Transmission failed", error: err.message });
  }
};




// 2. جلب كل السيارات المعلّقة (للأدمن)
exports.getPendingCars = async (req, res) => {
  try {
    const cars = await Car.find({ status: "pending" }).populate("seller", "name email");
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ message: "An error occurred while fetching", error: err.message });
  }
};




// 3. موافقة أو رفض السيارة
exports.approveOrRejectCar = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNote } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "The status is incorrect" });
    }

    const updatedCar = await Car.findByIdAndUpdate(
      id,
      { status, adminNote, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedCar) return res.status(404).json({ message: "The car does not exist" });

    res.status(200).json({ message: `تم ${status === "approved" ? "Approval" : "rejection"}`, car: updatedCar });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};




// 4. تعديل بيانات السيارة من قبل الأدمن
exports.updateCarByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedCar = await Car.findByIdAndUpdate(id, { ...updates, updatedAt: Date.now() }, { new: true });

    if (!updatedCar) return res.status(404).json({ message: "The car does not exist" });

    res.status(200).json({ message: "The vehicle data has been modified", car: updatedCar });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};



exports.getCarById = async (req, res) => {
    try {
      const car = await Car.findById(req.params.id).populate("seller", "name email");
      if (!car) return res.status(404).json({ message: "The car does not exist" });
  
      res.status(200).json(car);
    } catch (error) {
      res.status(500).json({ message: "Failed to bring cars", error: error.message });
    }
  };
  


  exports.getAllCarsForAdmin = async (req, res) => {
    try {
      const filter = req.query.status ? { status: req.query.status } : {};
  
      const cars = await Car.find(filter).populate("seller", "name email");
  
      res.status(200).json(cars);
    } catch (error) {
      console.error("❌ getAllCarsForAdmin ERROR:", error.message);
      res.status(500).json({ message: "Failed to bring cars", error: error.message });
    }
  };
  


// إنشاء طلب سيارة من المستخدم (بانتظار الموافقة)
exports.submitCarRequest = async (req, res) => {
    try {
      const {
        make,
        model,
        year,
        color,
        licensePlate,
        mileage,
        fuelType,
        transmission,
        price,
        condition,
        description,
      } = req.body;
  
      const imageFilenames = req.files.map(file => file.filename); // ✅ دعم صور متعددة
  
      const newCar = new Car({
        name: `${make} ${model}`,
        brand: make,
        model,
        year: parseInt(year),
        color,
        licensePlate,
        mileage: parseInt(mileage),
        fuelType,
        transmission,
        price: parseFloat(price),
        condition,
        description,
        images: imageFilenames,
        seller: req.user._id,
        payment: false,
        status: "pending",
      });
  
      await newCar.save();
  
      res.status(201).json({ message: "🚗 The car has been successfully saved", car: newCar });
    } catch (error) {
      console.error("❌ Error saving car:", error.message);
      res.status(500).json({ message: "Error saving the car", error: error.message });
    }
  };
  


  // الموافقة على سيارة وتعديلها
  exports.approveAndEditCar = async (req, res) => {
    try {
      const car = await Car.findById(req.params.id);
      if (!car) return res.status(404).json({ message: "The car does not exist" });
  
      // تحديث معلومات السيارة من البودي
      Object.assign(car, req.body);
      car.approved = true;
  
      await car.save();
      res.json({ message: "The vehicle has been approved and updated", car });
    } catch (error) {
      res.status(500).json({ message: "Error while approving or modifying", error });
    }
  };
  




  // ✅ جلب كل السيارات مع فلترة اختيارية (status)
exports.getAllCars = async (req, res) => {
    try {
      const { status } = req.query;
      const query = status ? { status } : {};
  
      const cars = await Car.find(query).populate("seller", "name email");
      res.status(200).json(cars);
    } catch (err) {
      res.status(500).json({ message: "Failed to bring cars", error: err.message });
    }
  };
  


// عرض جميع السيارات المعتمدة
exports.getApprovedCars = async (req, res) => {
    try {
      const cars = await Car.find({ status: "approved", payment: true })
      .sort({ createdAt: -1 }); // جلب السيارات المعتمدة فقط
      
      if (!cars || cars.length === 0) {
        return res.status(404).json({ message: "No approved cars found" });
      }
      res.json(cars); // إرجاع السيارات في الاستجابة
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };




  // Delete Car Controller
  exports.deleteCar = async (req, res) => {
  const { id } = req.params; // الحصول على id من باراميتر الـ URL

  try {
      // البحث عن السيارة بناءً على id وحذفها
      const car = await Car.findByIdAndDelete(id);

      // إذا كانت السيارة غير موجودة، يرجع رسالة خطأ 404
      if (!car) {
          return res.status(404).json({ message: 'Car not found' });
      }

      // إذا تم الحذف بنجاح، يرجع رسالة تأكيد
      res.status(200).json({ message: 'Car deleted successfully' });
  } catch (err) {
      // إذا حدث خطأ في العملية، يرجع رسالة خطأ 500
      res.status(500).json({ message: 'Failed to delete car', error: err.message });
  }
};




// دالة لجلب عدد السيارات المعتمدة
exports.getApprovedCarCount = async (req, res) => {
  try {
    const filter = req.query.status ? { status: req.query.status } : {};

    const cars = await Car.find(filter).populate("seller", "name email");

    res.status(200).json(cars);
  } catch (error) {
    console.error("❌ getAllCarsForAdmin ERROR:", error.message);
    res.status(500).json({ message: "Failed to bring cars", error: error.message });
  }
};







// بجيب اول 3 سيارات للهوم
exports.getLatestApprovedCars = async (req, res) => {
  try {
    const latestCars = await Car.find({ status: 'approved' })
      .sort({ createdAt: -1 }) // الأحدث أولاً
      .limit(3);

    res.status(200).json(latestCars);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching latest approved cars', error });
  }
};




//جلب اخر 7 صور للدراجات للهوم
exports.getLatestApprovedCars7 = async (req, res) => {
  try {
    const latestCars = await Car.find({ status: "approved" })
      .sort({ createdAt: -1 })
      .skip(3)                 // تجاهل أول 3 (الأحدث)
      .limit(7)                // جلب 7 بعدهم
      .select("images price"); // فقط الصور

    const formatted = latestCars.map((car) => ({
      id: car._id,
      image: car.images[0], // أول صورة
      price: car.price,
    }));

    res.json(formatted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch latest approved cars" });
  }
};