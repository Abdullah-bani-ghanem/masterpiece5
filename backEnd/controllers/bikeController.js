const Bike = require('../models/bikeModel');

// جلب جميع الدراجات
exports.getAllBikes = async (req, res) => {
  try {
    const bikes = await Bike.find(); // جلب جميع الدراجات من قاعدة البيانات
    res.status(200).json(bikes); // إرجاع البيانات إلى العميل
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching bikes', error }); // إذا حدث خطأ
  }
};


 //اضافه دراجه
exports.addBike = async (req, res) => {
  try {
    const { name, brand, type, price, description, model, year, condition, status, adminNote } = req.body;

    if (!name || !brand || !type || !price || !model || !year || !condition || !description) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    const userId = req.user.id; // 👈 استخراج ID المستخدم من التوكن

    const newBike = new Bike({
      name,
      brand,
      type,
      price,
      description,
      model,
      year,
      condition,
      status,
      adminNote,
      seller: userId, // ✅ ربط الدراجة بالمستخدم الحالي
      images: req.files.map(file => file.path) // تخزين مسارات الصور
    });

    await newBike.save();
    res.status(201).json({ message: 'Bike added successfully!', bike: newBike });
  } catch (error) {
    console.error('Error while adding bike:', error);
    res.status(500).json({ message: 'An error occurred while adding the bike', error });
  }
};



// حذف دراجة بواسطة ID
exports.deleteBike = async (req, res) => {
  try {
    const bikeId = req.params.id; // احصل على معرف الدراجة من عنوان URL
    await Bike.findByIdAndDelete(bikeId); // حذف الدراجة من قاعدة البيانات
    res.status(200).json({ message: 'Bike deleted successfully' }); // عودة رسالة النجاح
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the bike', error }); // إذا حدث خطأ
  }
};



// تحديث بيانات الدراجة بواسطة ID
exports.updateBike = async (req, res) => {
  try {
    const bikeId = req.params.id; //احصل على معرف الدراجة من عنوان URL
    const updatedData = req.body; // احصل على البيانات الجديدة من نص الطلب

  
    if (!updatedData.name && !updatedData.brand && !updatedData.type && !updatedData.price && !updatedData.model && !updatedData.year && !updatedData.condition) {
      return res.status(400).json({ message: 'Please send valid data to update the bike' });
    }

   
    const updatedBike = await Bike.findByIdAndUpdate(bikeId, updatedData, { new: true });

    if (!updatedBike) {
      return res.status(404).json({ message: 'Bike not found' }); // If the bike is not found
    }

    res.status(200).json({ message: 'Bike updated successfully', bike: updatedBike }); // Return the updated bike
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating the bike', error }); // If an error occurs
  }
};



// جلب الدراجة بواسطة ID
exports.getBikeById = async (req, res) => {
  try {
    const bikeId = req.params.id; // الحصول على ID الدراجة من الـ URL
    const bike = await Bike.findById(bikeId); // البحث عن الدراجة بواسطة ID

    if (!bike) {
      return res.status(404).json({ message: 'Bike not found' }); // إذا كانت الدراجة غير موجودة
    }

    res.status(200).json(bike); // إرجاع الدراجة
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching the bike', error }); // إذا حدث خطأ
  }
};

 

// جلب الدراجات المعتمدة فقط
exports.getApprovedBikes = async (req, res) => {
  try {
    const bikes = await Bike.find({ status: 'approved', payment: true })
    .sort({ createdAt: -1 });; // جلب الدراجات المعتمدة فقط
    res.status(200).json(bikes); // إرجاع الدراجات المعتمدة
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching approved bikes', error }); // إذا حدث خطأ
  }
};
 
 


// جلب الدراجات المعلقة فقط
exports.getPendingBikes = async (req, res) => {
  try {
    // جلب الدراجات التي حالتها معلقة أو مرفوضة
    const bikes = await Bike.find({ status: { $in: ['pending', 'rejected'] } });
    res.status(200).json(bikes); // إرجاع البيانات
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching bikes', error }); // إذا حدث خطأ
  }
};



// الموافقة أو الرفض للدراجة
exports.approveOrRejectBike = async (req, res) => {
  try {
    const bikeId = req.params.id; // الحصول على ID الدراجة من الـ URL
    const { status } = req.body; // الحصول على الحالة (موافقة أو رفض)

    if (status !== 'approved' && status !== 'rejected') {
      return res.status(400).json({ message: 'Status must be either "approved" or "rejected"' });
    }

    const updatedBike = await Bike.findByIdAndUpdate(bikeId, { status }, { new: true }); // تحديث الحالة في قاعدة البيانات

    if (!updatedBike) {
      return res.status(404).json({ message: 'Bike not found' }); // إذا كانت الدراجة غير موجودة
    }

    res.status(200).json({ message: 'Bike status updated successfully', bike: updatedBike }); // إرجاع الدراجة المحدثة
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while approving or rejecting the bike', error }); // إذا حدث خطأ
  }
};



// جلب عدد الدراجات المعتمدة
exports.getApprovedBikeCount = async (req, res) => {
  try {
    const count = await Bike.countDocuments({ status: 'approved' }); // حساب عدد الدراجات المعتمدة
    res.status(200).json({ count }); // إرجاع العدد
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while counting approved bikes', error }); // إذا حدث خطأ
  }
};




// جلب الدراجات المعلقة
exports.getPendingBikes = async (req, res) => {
  try {
    const bikes = await Bike.find({ status: 'pending' }); // جلب الدراجات المعلقة فقط
    res.status(200).json(bikes);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching pending bikes', error });
  }
};




// الموافقة أو الرفض على الدراجة
exports.approveOrRejectBike = async (req, res) => {
  try {
    const bikeId = req.params.id; // الحصول على ID الدراجة من الـ URL
    const { status } = req.body; // الحصول على الحالة (موافقة أو رفض)

    if (status !== 'approved' && status !== 'rejected') {
      return res.status(400).json({ message: 'Status must be either approved or rejected' });
    }

    const updatedBike = await Bike.findByIdAndUpdate(bikeId, { status }, { new: true }); // تحديث الحالة في قاعدة البيانات

    if (!updatedBike) {
      return res.status(404).json({ message: 'Bike not found' });
    }

    res.status(200).json({ message: 'Bike status updated successfully', bike: updatedBike }); // إرجاع الدراجة المحدثة
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while approving or rejecting the bike', error });
  }
};





// عدد الدراجات المعتمدة
exports.getApprovedBikeCount = async (req, res) => {
  try {
    const count = await Bike.countDocuments({ status: 'approved' });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء الحساب', error });
  }
};






//بتجيب اول 3 دراجات للهوم
exports.getLatestApprovedBikes = async (req, res) => {
  try {
    const latestBikes = await Bike.find({ status: 'approved' })
      .sort({ createdAt: -1 }) // الأحدث أولاً
      .limit(3);

    res.status(200).json(latestBikes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching latest approved bikes', error });
  }
};





//جلب اخر 7 صور للدراجات للهوم
exports.getLatestApprovedBikes7 = async (req, res) => {
  try {
    const latestBikes = await Bike.find({ status: "approved" })
      .sort({ createdAt: -1 }) // الأحدث أولاً
      .skip(3)                 // تجاهل أول 3 (الأحدث)
      .limit(7)                // جلب 7 بعدهم
      .select("images price"); // نرجع فقط الصور (أول صورة كافية للسلايدر)

    const formatted = latestBikes.map((bike) => ({
      id: bike._id,
      image: bike.images[0], // فقط أول صورة لكل دراجة
      price: bike.price,
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch latest approved bikes" });
  }
}; 