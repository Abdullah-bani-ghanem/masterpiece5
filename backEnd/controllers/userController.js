const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");




exports.register = async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    const newUser = new User({ name, email, password, phoneNumber });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    ); 

    res.cookie("token", token, {
      httpOnly: false, 
      secure: false, 
      sameSite: "lax",
      maxAge: 3600000,
    }); 

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ message: "Registration error", error });
  }
};






exports.login = async (req, res) => { 
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      maxAge: 3600000,
    });

    res.status(200).json({
      message: "Logged in successfully",
      token, // <-- this is necessary
      user,  // you can include user data too
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};





exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.json({ message: "Successfully logged out" });
};






//للتأكد انك مسجل دخول عشان تشوف تفاصيل السياره
exports.checkAuth = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ authenticated: false, message: "Not logged in" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ authenticated: false, message: "User not found" });
    }

    res.json({ authenticated: true, user });
  } catch (error) {
    res.status(401).json({ authenticated: false, message: "Invalid token" });
  }
};








exports.updateProfile = async (req, res) => {
  const token = req.cookies.token;
  const jwt = require("jsonwebtoken");
  const User = require("../models/User");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const fieldsToUpdate = ['name', 'email', 'phoneNumber', 'address', 'bio'];
    fieldsToUpdate.forEach(field => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    }); 

    if (req.file) {
      const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
      user.profilePicture = imageUrl;
    }

    await user.save();
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while updating the profile" });
  }
};





//جلب كل المستخدمين
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // excluding the password
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
};





//حذف المستخدم
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error: error.message });
  }
};






//اضافه مستخدم جديد
exports.createUser = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, role } = req.body;

    if (!name || !email || !phoneNumber || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "This email is already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
      role: role || "user",
    });

    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("❌ Failed to create user:", error.message); // important
    res.status(500).json({ message: "Server error", error: error.message });
  }
};






//جلب بيانات مستخدم من خلال الid
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user data", error: error.message });
  }
};







//تعديل بيانات مستخدم
exports.updateUser = async (req, res) => {
  try {
    const { name, email, phoneNumber, role } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phoneNumber, role },
      { new: true, runValidators: true }
    );

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "✅ User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "❌ Failed to update user", error: error.message });
  }
};








// دالة لجلب عدد المستخدمين المسجلين
exports.getUserCount = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // excluding the password
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
};





//بتجيب اسم اليوزر للتعليقات بالهووم
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email image role");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error getting user info" });
  }
};
