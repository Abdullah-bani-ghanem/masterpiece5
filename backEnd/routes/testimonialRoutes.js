const express = require("express");
const router = express.Router();
const testimonialController = require("../controllers/testimonialController");
const { protect, isAdmin,authMiddleware, isCommentOwner } = require('../middleware/auth');



//اضافه تعليق
router.post("/add", testimonialController.createTestimonial);
//عرض التعليقات
router.get("/", testimonialController.getTopTestimonials);
//حذف تعليق
router.delete("/:id", protect, testimonialController.deleteTestimonial);


// جلب كل التقييمات للإدارة
router.get("/all", protect, isAdmin, testimonialController.getAllTestimonials);

// حذف من قبل الأدمن
router.delete("/admin-delete/:id", protect, isAdmin, testimonialController.adminDeleteTestimonial);

// تبديل حالة الظهور
router.put("/toggle-show/:id", protect, isAdmin, testimonialController.toggleShowOnHome);    


module.exports = router;
