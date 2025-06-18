const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");
const { protect, isAdmin } = require("../middleware/auth");


// Multer setup
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // You can customize this


// إرسال سيارة جديدة من المستخدم
router.post("/submit", protect, upload.array("images", 5), carController.submitCarRequest);

// مستخدم عادي يضيف سيارة
router.post("/add", protect, carController.addCar);

router.post("/addByAdmin", protect,isAdmin, carController.addCarByAdmin);

// بجيب اول 3 سيارات للهوم
router.get('/latest-approved', carController.getLatestApprovedCars);

// جلب آخر 7 سيارات معتمدة (للسلايدر في الهوم)
router.get('/latest-approvedd', carController.getLatestApprovedCars7);

 
    
// فقط الأدمن يشوف السيارات المعلقة
router.get("/pending", protect, isAdmin, carController.getPendingCars);

// الأدمن يوافق أو يرفض سيارة
router.patch("/status/:id", protect, isAdmin, carController.approveOrRejectCar);

// الأدمن يعدّل معلومات السيارة
router.put("/admin/update/:id", protect, isAdmin, carController.updateCarByAdmin);

// المستخدم يرسل سيارة 
router.post("/submit", protect, carController.submitCarRequest); // ✅ صح


// عرض السيارات المعلقة 
router.get("/pending", protect, isAdmin, carController.getPendingCars);


// الأدمن يوافق على السيارة ويعدلها
router.put("/approve/:id", protect, isAdmin, carController.approveAndEditCar);

//بجيب كل السيارات من api مع فلتره
// router.get("/all", protect, isAdmin, carController.getAllCars);

router.get("/all", protect, isAdmin, carController.getAllCarsForAdmin);

router.get("/:id", protect, carController.getCarById);

router.get('/approved-cars/:id', carController.getApprovedCars);////

router.delete('/:id', carController.deleteCar);////


// مسار جلب عدد السيارات المعتمدة
router.get('/approved-car-count', carController.getApprovedCarCount);






module.exports = router;

