const mongoose = require("mongoose");
const User = require("../models/User");
const Car = require("../models/Car");
const Bike = require("../models/bikeModel");

// ✅ جلب عناصر الويشليست
exports.getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ wishlist: user.wishlist });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ message: "Server error" });
  }
};
 




// ✅ إضافة عنصر للويشليست
exports.addToWishlist = async (req, res) => {
  try {
    const { type, name, model, year, imageUrl, carId, bikeId } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // تحقق من النوع الصحيح
    if (type === 'car' && !carId) {
      return res.status(400).json({ message: "carId is required for car type" });
    }
    if (type === 'motorcycle' && !bikeId) {
      return res.status(400).json({ message: "bikeId is required for bike type" });
    }

    // منع التكرار
    const alreadyExists = user.wishlist.some(item =>
      (type === 'car' && item.carId?.toString() === carId) ||
      (type === 'motorcycle' && item.bikeId?.toString() === bikeId)
    );

    if (alreadyExists) {
      return res.status(400).json({ message: "Item already exists in wishlist" });
    }

    const newItem = {
      type,
      name,
      model,
      year,
      imageUrl,
      carId: type === 'car' ? new mongoose.Types.ObjectId(carId) : undefined,
      bikeId: type === 'motorcycle' ? new mongoose.Types.ObjectId(bikeId) : undefined,
    };

    user.wishlist.push(newItem);
    await user.save();

    res.status(201).json({ message: "Item added to wishlist", wishlist: user.wishlist });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    res.status(500).json({ message: "Server error" });
  }
};





// ✅ حذف عنصر من الويشليست
exports.removeFromWishlist = async (req, res) => {
  try {
    const { itemId } = req.params;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.wishlist = user.wishlist.filter(
      (item) => item._id.toString() !== itemId
    );

    await user.save();

    res.json({ message: "Item removed from wishlist", wishlist: user.wishlist });
  } catch (error) {
    console.error("Error removing wishlist item:", error);
    res.status(500).json({ message: "Server error" });
  }
};




// ✅ التحقق إذا العنصر موجود مسبقًا في الويشليست
exports.isInWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { vehicleId } = req.params;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const exists = user.wishlist.some((item) =>
      item.carId?.toString() === vehicleId || item.bikeId?.toString() === vehicleId
    );

    res.json({ exists }); // 🔁 true or false
  } catch (error) {
    console.error("Error checking wishlist:", error);
    res.status(500).json({ message: "Server error" });
  }
};
 


//جلب الاعلانات الخاصه باليوزر
exports.getUserCars = async (req, res) => {
  try {
    const userId = req.user.id;
    const cars = await Car.find({ seller: userId });
    res.json({ cars });
  } catch (error) {
    console.error("Error fetching user cars:", error);
    res.status(500).json({ message: "Server error" });
  }
};



 
//جلب الاعلانات الخاصه باليوزر
exports.getUserBikes = async (req, res) => {
  try {
    const userId = req.user.id;
    const bikes = await Bike.find({ seller: userId }); // ✅ استخدم اسم الموديل الصحيح
    res.json({ bikes });
  } catch (error) {
    console.error("Error fetching user bikes:", error);
    res.status(500).json({ message: "Server error" });
  }
};

