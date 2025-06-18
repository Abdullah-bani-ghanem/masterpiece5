const FormCar = require('../models/formCarModel');

const createCar = async (req, res) => {
  try {
    const {
      make,
      model,
      year,
      color,
      licensePlate,
      mileage,
      fuelType,
      transmission,
      price,
      condition,
      description,
    } = req.body;
    console.log('✅ عدد الصور:', req.files.length);
    // ✅ دعم صور متعددة
    const imageUrls = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    const newCar = new FormCar({
      make,
      model,
      year,
      color,
      licensePlate,
      mileage,
      fuelType,
      transmission,
      price,
      condition,
      description,
      images: imageUrls, // ← خزّن مصفوفة الصور هنا
    });

    await newCar.save();
    res.status(201).json({ message: 'Car added successfully', data: newCar });
  } catch (error) {
    console.error('Error creating car:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createCar,
};
