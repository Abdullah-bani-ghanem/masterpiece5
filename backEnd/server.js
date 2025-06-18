require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const path = require('path');

const carRoutes = require("./routes/carRoutes"); // ✅ مسار كود السيارة
const userRoutes = require("./routes/userRoutes"); // ✅ مسار المستخدمين
const contactRoutes = require("./routes/contactRoutes"); // ✅ صفحة اتصل بنا
const paymentRoutes = require("./routes/paymentRoutes"); // ✅ الدفع
const formCarRoutes = require('./routes/formCarRoutes');
const commentRoutes = require('../backEnd/routes/comments');
const counterRoute=require("../backEnd/routes/counterRoute")
const bikeRoutes = require('./routes/bikeRoutes');
const bikeCommentRoutes = require('../backEnd/routes/bikeComments');
const wishlistRoutes = require("./routes/wishlistRoutes"); 
const testimonialRoutes = require("./routes/testimonialRoutes");






const app = express();

// ✅ تفعيل قراءة JSON والكوكيز
app.use(express.json());
app.use(cookieParser());

// ✅ إعداد CORS
app.use(cors({
  origin: 'http://localhost:5173',  // الواجهة الأمامية
  credentials: true,  // السماح بإرسال الكوكيز عبر النطاقات
}));

// ✅ توصيل قاعدة البيانات
connectDB();

// ✅ استخدام الراوترات
app.use("/api/cars", carRoutes);
app.use("/api/users", userRoutes);
app.use("/api", contactRoutes);
app.use("/api/payment", paymentRoutes);
app.use('/api/car', formCarRoutes);
app.use("/api/counter",counterRoute);
app.use('/api/comments', commentRoutes);
app.use("/api/bikes", bikeRoutes); // إضافة هذا السطر لربط مسار الدراجات
app.use('/api/bikeComments', bikeCommentRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));




// ✅ تشغيل السيرفر
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

