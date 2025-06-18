const Comment = require('../models/bikeComment');
const Bike = require('../models/bikeModel');  

// 1. إضافة تعليق جديد
exports.addComment = async (req, res) => {
    const bikeId = req.params.addBikeId; // استخراج carId من الرابط
    const { comment } = req.body; // استخراج التعليق من الجسم (Body)
    const userId = req.user.id; // استخراج userId من الميدل وير (تم التحقق من التوكن)

    if (!comment) {
        return res.status(400).json({ message: 'Comment is required.' });
    }
    try {
        // تحقق من وجود السيارة
        const bike = await Bike.findById(bikeId);
        // console.log(bikeId)
        if (!bike) {
            return res.status(404).json({ message: 'bike not found.' });
        }

        // إنشاء التعليق الجديد
        const newComment = new Comment({
            bikeId,
            userId,  // التأكد من أن userId ممرر هنا
            comment
        });

        await newComment.save(); 

        res.status(201).json(newComment); // إرجاع التعليق الجديد
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add comment.' });
    }
};




// 2. جلب التعليقات الخاصة بسيارة معينة
exports.getComments = async (req, res) => {
    const { bikeId } = req.params;

    try {
        // استرجاع التعليقات مع البيانات الإضافية للمستخدم مثل `username`
        const comments = await Comment.find({ bikeId })
            .populate({ path: 'userId', select: 'name username email', model: 'User' })
  // إضافة username هنا
            .sort({ createdAt: -1 }); // ترتيب التعليقات من الأحدث إلى الأقدم

        res.json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to load comments.' });
    }
};




// 3. تعديل تعليق موجود
exports.updateComment = async (req, res) => {
    const { commentId } = req.params;  // استخراج commentId من الرابط
    const { comment } = req.body;      // استخراج التعليق الجديد من الجسم (Body)

    if (!comment) {
        return res.status(400).json({ message: 'Comment is required.' });
    }

    try {
        // البحث عن التعليق
        const existingComment = await Comment.findById(commentId);

        if (!existingComment) {
            return res.status(404).json({ message: 'Comment not found.' });
        }

        // تحقق من أن المستخدم الذي يحاول التعديل هو نفسه الذي أضاف التعليق
        if (existingComment.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You can only edit your own comments.' });
        }

        // تحديث التعليق
        existingComment.comment = comment;
        await existingComment.save();

        res.json(existingComment);  // إرجاع التعليق المعدل
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update comment.' });
    }
};




// 4. حذف تعليق
exports.deleteComment = async (req, res) => {
    const { commentId } = req.params;  // استخراج commentId من الرابط

    try {
        // البحث عن التعليق
        const commentToDelete = await Comment.findById(commentId);

        if (!commentToDelete) {
            return res.status(404).json({ message: 'Comment not found.' });
        }

        // تحقق من أن المستخدم الذي يحاول الحذف هو نفسه الذي أضاف التعليق
        if (commentToDelete.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You can only delete your own comments.' });
        }

        // حذف التعليق
        await Comment.findByIdAndDelete(commentId);

        res.status(200).json({ message: 'Comment deleted successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete comment.' });
    }
};



//جلب التعليق المبلغ عنه للادمن
exports.getReportedComments = async (req, res) => {
    try {
      const reported = await Comment.find({ isReported: true })
        .populate('userId', 'name email')
        .populate('bikeId', 'name');
  
      res.status(200).json(reported);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching reported comments', error });
    }
  };
  
  

  // حذف تعليق دراجة
  exports.deleteBikeComment = async (req, res) => {
    try {
      const { id } = req.params;
      await Comment.findByIdAndDelete(id);
      res.status(200).json({ message: 'Bike comment deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting bike comment', error });
    }
  };




  // وضع تعليق كمُبلغ عنه
exports.reportComment = async (req, res) => {
    const { commentId } = req.params;
  
    try {
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found.' });
      }
  
      comment.isReported = true;
      await comment.save();
  
      res.status(200).json({ message: 'Comment reported successfully.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to report comment.' });
    }
  };
  