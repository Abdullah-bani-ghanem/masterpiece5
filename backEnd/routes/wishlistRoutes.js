const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");
const { protect } = require("../middleware/auth"); // لو عندك middleware لحماية المسارات

// جلب الويشليست
router.get("/", protect, wishlistController.getWishlist);

// إضافة عنصر للويشليست
router.post("/", protect, wishlistController.addToWishlist);

// حذف عنصر من الويشليست
router.delete("/:itemId", protect, wishlistController.removeFromWishlist);

// التحقق إذا العنصر موجود مسبقًا في الويشليست
router.get("/check/:vehicleId", protect, wishlistController.isInWishlist);


router.get("/my-car", protect, wishlistController.getUserCars);

router.get("/my-bikee", protect, wishlistController.getUserBikes);


module.exports = router; 
