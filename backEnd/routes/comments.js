const express = require('express');
const router = express.Router();
const { addComment, getComments, updateComment, deleteComment, adminDeleteComment, getReportedComments,reportComment } = require('../controllers/commentsController');
const { protect, isAdmin, isCommentOwner } = require('../middleware/auth');
// مسار جلب جميع التعليقات

// router.get('/allComments', protect, isAdmin, getAllComments);

// ✅ جلب تعليقات مبلّغ عنها للأدمن
router.get('/admin/reported', protect, isAdmin, getReportedComments);

// مسار إضافة تعليق (حماية الوصول إلى المسار من خلال التوكن)
router.post('/:carId', protect, addComment);

// مسار جلب التعليقات الخاصة بسيارة معينة
router.get('/:carId', getComments);

// مسار تعديل تعليق معين (حماية الوصول من خلال التوكن و التحقق من مالك التعليق)
router.put('/:commentId', protect, isCommentOwner, updateComment);

// مسار حذف تعليق معين (حماية الوصول من خلال التوكن و التحقق من مالك التعليق)
router.delete('/:commentId', protect, isAdmin, adminDeleteComment);


router.delete('/:commentId', protect, isAdmin, adminDeleteComment);

// ✅ راوت تبليغ
router.patch('/report/:commentId', protect, reportComment);

module.exports = router;
