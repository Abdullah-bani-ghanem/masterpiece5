const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middleware/auth');
const bikeController = require("../controllers/bikeController");
const multer = require("multer");

const upload = multer({ dest: "uploads/" }); // تخزين الصور مؤقتاً في مجلد uploads




//Routes for Admin

router.get('/all', protect, isAdmin, bikeController.getAllBikes);// جلب كل الدراجات 

router.get("/pending", protect, isAdmin, bikeController.getAllBikes); //  جلب الدراجات المعلّقة فقط 

router.put("/status/:id", protect, isAdmin, bikeController.approveOrRejectBike);// الموافقة أو الرفض على دراجة معينة

router.put("/admin/update/:id", protect, isAdmin, bikeController.updateBike);// تعديل دراجة من قبل الأدمن

//////////////////////////////////

// Routes for Public Access

 
router.get('/approved-bikes', bikeController.getApprovedBikes);//  عرض جميع الدراجات المعتمدة

router.get('/latest-approved', bikeController.getLatestApprovedBikes);// جلب 3 دراجات فقط للواجهة الرئيسية
router.get('/latest-approvedd', bikeController.getLatestApprovedBikes7);

// 🌐 عدد الدراجات المعتمدة
router.get('/approved-bike-count', bikeController.getApprovedBikeCount);

// 🌐 جلب دراجة معتمدة واحدة فقط عبر ID
router.get('/approved-bikes/:id', bikeController.getApprovedBikes);


//Routes for Authenticated Users


// ✅ إرسال دراجة جديدة (مع صور)
router.post("/submit", protect, upload.array("images", 5), bikeController.addBike);

// ✅ جلب تفاصيل دراجة معينة (للمستخدم المسجل)
router.get("/:id", protect, bikeController.getBikeById);

// ✅ حذف دراجة معينة
router.delete('/:id', protect, bikeController.deleteBike);


module.exports = router;
