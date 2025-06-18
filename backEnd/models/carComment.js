const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car', // ربط التعليق مع السيارة
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // ربط التعليق مع المستخدم
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    isReported: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true } // سيقوم Mongoose بإنشاء الحقول `createdAt` و `updatedAt` تلقائيًا
);

module.exports = mongoose.model('Comment', commentSchema);
