const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    // required: true,  
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  bio: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date, 
    default: Date.now,
  },
  
  // ✅ هنا نضيف الويشليست:
  wishlist: [
    {
      type: {
        type: String,
        enum: ['car', 'motorcycle'],
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      model: {
        type: String,
        required: true,
      },
      year: {
        type: String,
        required: true,
      },
      imageUrl: {
        type: String,
      },
      addedAt: {
        type: Date,
        default: Date.now,
      },
      carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
      },
      bikeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bike',
      }
    }
  ]
  

});

// قبل حفظ المستخدم، نشفر كلمة المرور
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// دالة للتحقق من كلمة المرور
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
