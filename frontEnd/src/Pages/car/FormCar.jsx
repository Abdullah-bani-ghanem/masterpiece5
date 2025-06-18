import React, { useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

const CarInfoForm = () => {
    const [formData, setFormData] = useState({
        make: '',
        model: '',
        year: '',
        color: '',
        licensePlate: '',
        mileage: '',
        fuelType: '',
        transmission: 'automatic',
        price: '',
        condition: '',
        description: ''
    });

    const [carImages, setCarImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setCarImages(files);
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const removeImage = (index) => {
        setImagePreviews(imagePreviews.filter((_, i) => i !== index));
        setCarImages(carImages.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            });

            carImages.forEach((image) => {
                formDataToSend.append('images', image);
            });

            const token = localStorage.getItem('token') || sessionStorage.getItem('token');

            const res = await axios.post('http://localhost:5000/api/cars/submit', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.status === 201) {
                console.log('carCreated', res.data);
                navigate(`/payment/${res.data.car?._id}`)
                Swal.fire({
                    icon: 'success',
                    title: 'Car Submitted',
                    text: '✅ Your car has been submitted successfully and is awaiting admin approval.',
                    confirmButtonText: 'OK'
                });

                setFormData({
                    make: '', model: '', year: '', color: '', licensePlate: '', mileage: '', fuelType: '', transmission: 'automatic', price: '', condition: '', description: ''
                });
                setCarImages([]);
                setImagePreviews([]);
                setSuccess(true);
            }
        } catch (err) {
            console.error('Submit error:', err);
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: 'An error occurred while submitting. Please make sure all data is entered correctly.',
                confirmButtonText: 'OK'
            });
            setError('An error occurred while submitting. Please make sure all data is entered correctly.');
        }
    };

    return (
        <div className="min-h-screen  py-12 px-4 mt-18">
            <div className="max-w-4xl mx-auto">
                {/* Header Banner */}
                <div className="relative bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-t-2xl p-8 text-center text-white shadow-lg overflow-hidden">
                    <div className="relative z-10">
                        <h1 className="text-4xl font-bold mb-3">Car Information Form</h1>
                        <p className="text-lg max-w-2xl mx-auto opacity-90">
                            Please fill in your car details to list it for sale - Provide accurate information to help potential buyers make informed decisions.
                        </p>
                    </div>
                </div>

                {/* Main Form */}
                <div className="bg-white rounded-b-2xl shadow-xl p-8">
                    {success && (
                        <div className="mb-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md">
                            <p className="flex items-center">
                                <span className="mr-2">✅</span> Car information submitted successfully!
                            </p>
                        </div>
                    )}

                    {error && (
                        <div className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md">
                            <p className="flex items-center">
                                <span className="mr-2">❌</span> {error}
                            </p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8 ">
                        {/* Car Basic Information */}
                        <div className="border-b border-gray-200 pb-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                <span className="bg-yellow-500 w-8 h-8 rounded-full text-white flex items-center justify-center mr-2 text-sm">1</span>
                                Basic Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-1">
                                        Make
                                    </label>
                                    <input
                                        type="text"
                                        id="make"
                                        name="make"
                                        value={formData.make}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                                        required
                                        placeholder="Ex: Toyota"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
                                        Model
                                    </label>
                                    <input
                                        type="text"
                                        id="model"
                                        name="model"
                                        value={formData.model}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                                        required
                                        placeholder="Ex: Camry"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                                        Year
                                    </label>
                                    <input
                                        type="number"
                                        id="year"
                                        name="year"
                                        value={formData.year}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                                        required
                                        placeholder="Ex: 2023"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Car Appearance */}
                        <div className="border-b border-gray-200 pb-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                <span className="bg-yellow-500 w-8 h-8 rounded-full text-white flex items-center justify-center mr-2 text-sm">2</span>
                                Appearance
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
                                        Color
                                    </label>
                                    <input
                                        type="text"
                                        id="color"
                                        name="color"
                                        value={formData.color}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                                        required
                                        placeholder="Ex: White"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                                        Condition
                                    </label>
                                    <select
                                        id="condition"
                                        name="condition"
                                        value={formData.condition}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                                        required
                                    >
                                        <option value="">Select Condition</option>
                                        <option value="new">New</option>
                                        <option value="used">Used</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Car Technical Information */}
                        <div className="border-b border-gray-200 pb-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                <span className="bg-yellow-500 w-8 h-8 rounded-full text-white flex items-center justify-center mr-2 text-sm">3</span>
                                Technical Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-700 mb-1">
                                        License Plate
                                    </label>
                                    <input
                                        type="text"
                                        id="licensePlate"
                                        name="licensePlate"
                                        value={formData.licensePlate}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                                        required
                                        placeholder="Ex: ABC 1234"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="mileage" className="block text-sm font-medium text-gray-700 mb-1">
                                        Mileage (km)
                                    </label>
                                    <input
                                        type="number"
                                        id="mileage"
                                        name="mileage"
                                        value={formData.mileage}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                                        required
                                        placeholder="Ex: 50000"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 mb-1">
                                        Fuel Type
                                    </label>
                                    <select
                                        id="fuelType"
                                        name="fuelType"
                                        value={formData.fuelType}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                                        required
                                    >
                                        <option value="">Select Fuel Type</option>
                                        <option value="gasoline">Gasoline</option>
                                        <option value="diesel">Diesel</option>
                                        <option value="electric">Electric</option>
                                        <option value="hybrid">Hybrid</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Transmission
                                </label>
                                <div className="flex items-center space-x-6">
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="automatic"
                                            name="transmission"
                                            value="automatic"
                                            checked={formData.transmission === 'automatic'}
                                            onChange={handleChange}
                                            className="h-4 w-4 text-yellow-500 focus:ring-yellow-400"
                                        />
                                        <label htmlFor="automatic" className="ml-2 text-sm text-gray-700">
                                            Automatic
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="manual"
                                            name="transmission"
                                            value="manual"
                                            checked={formData.transmission === 'manual'}
                                            onChange={handleChange}
                                            className="h-4 w-4 text-yellow-500 focus:ring-yellow-400"
                                        />
                                        <label htmlFor="manual" className="ml-2 text-sm text-gray-700">
                                            Manual
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Price and Description */}
                        <div className="border-b border-gray-200 pb-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                <span className="bg-yellow-500 w-8 h-8 rounded-full text-white flex items-center justify-center mr-2 text-sm">4</span>
                                Price and Description
                            </h3>
                            <div className="mb-6">
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                                    Price ($)
                                </label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 sm:text-sm">$</span>
                                    </div>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="block w-full pl-7 rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                                        required
                                        placeholder="Ex: 25000"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    className="block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                                    required
                                    placeholder="Write a detailed description of the car, including any special features or maintenance history..."
                                ></textarea>
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                <span className="bg-yellow-500 w-8 h-8 rounded-full text-white flex items-center justify-center mr-2 text-sm">5</span>
                                Car Images
                            </h3>
                            <div className="border-2 border-dashed border-yellow-300 bg-yellow-50 rounded-lg p-6 text-center hover:bg-yellow-100 transition-colors">
                                <label htmlFor="carImage" className="cursor-pointer block">
                                    <div className="mb-3">
                                        <span className="text-sm font-medium text-yellow-700">Click to upload car images</span>
                                    </div>
                                    <input
                                        type="file"
                                        id="carImage"
                                        name="images"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                    <div className="flex justify-center">
                                        <div className="bg-yellow-200 text-yellow-700 rounded-full p-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                        </div>
                                    </div>
                                    <p className="mt-2 text-xs text-gray-500">
                                        Upload multiple images of your car (exterior, interior, etc.)
                                    </p>
                                </label>
                            </div>

                            {imagePreviews.length > 0 && (
                                <div className="mt-6">
                                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                                        Image Previews ({imagePreviews.length})
                                    </h4>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {imagePreviews.map((src, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={src}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-full h-32 object-cover rounded-lg shadow-md"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <button
                                type="submit"
                                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 flex items-center justify-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Submit Car Information</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CarInfoForm;






// import React, { useState } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';

// const CarInfoForm = () => {
//     const navigate = useNavigate()
//     const [formData, setFormData] = useState({
//         make: '',
//         model: '',
//         year: '',
//         color: '',
//         licensePlate: '',
//         mileage: '',
//         fuelType: '',
//         transmission: 'automatic',
//         price: '',
//         condition: '',
//         description: ''
//     });

//     const [carImages, setCarImages] = useState([]);
//     const [imagePreviews, setImagePreviews] = useState([]);
//     const [success, setSuccess] = useState(false);
//     const [error, setError] = useState(null);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     const handleImageChange = (e) => {
//         const files = Array.from(e.target.files);
//         setCarImages(files);
//         const previews = files.map(file => URL.createObjectURL(file));
//         setImagePreviews(previews);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const formDataToSend = new FormData();
//             Object.entries(formData).forEach(([key, value]) => {
//                 formDataToSend.append(key, value);
//             });

//             carImages.forEach((image) => {
//                 formDataToSend.append('images', image);
//             });

//             const token = localStorage.getItem('token') || sessionStorage.getItem('token');

//             const res = await axios.post('http://localhost:5000/api/cars/submit', formDataToSend, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             if (res.status === 201) {
//                 console.log('carrCreated', res.data);
//                 navigate(`/payment/${res.data.car?._id}`)
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Car Submitted',
//                     text: '✅ Your car has been submitted successfully and is awaiting admin approval.',
//                     confirmButtonText: 'OK'
//                 });

//                 setFormData({
//                     make: '', model: '', year: '', color: '', licensePlate: '', mileage: '', fuelType: '', transmission: 'automatic', price: '', condition: '', description: ''
//                 });
//                 setCarImages([]);
//                 setImagePreviews([]);
//                 setSuccess(true);
//             }
//         } catch (err) {
//             console.error('Submit error:', err);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Submission Failed',
//                 text: 'An error occurred while submitting. Please make sure all data is entered correctly.',
//                 confirmButtonText: 'OK'
//             });
//             setError('An error occurred while submitting. Please make sure all data is entered correctly.');
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-b py-12 px-4 mt-18">
//             <div className="max-w-4xl mx-auto">
//                 {/* Header Banner */}
//                 <div className="relative bg-yellow-500 rounded-t-2xl mb-0 p-8 text-center text-white shadow-lg overflow-hidden">
//                     <div className="absolute inset-0  opacity-50"></div>
//                     <div className="relative z-10">
//                         <h1 className="font-[Playfair Display] text-4xl font-bold mb-3">Car Information Form</h1>
//                         <p className="font-[Playfair Display] text-lg max-w-2xl mx-auto opacity-90">
//                             Please fill in the details of your car to list it for sale – provide accurate information to help potential buyers make informed decisions.
//                         </p>
//                     </div>
//                 </div>

//                 {/* Main Form */}
//                 <div className="bg-white dark:bg-[#4a4a48] rounded-b-2xl shadow-xl p-8">
//                     {success && (
//                         <div className="mb-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md">
//                             <p className="flex items-center">
//                                 <span className="mr-2">✅</span> The car has been submitted successfully!
//                             </p>
//                         </div>
//                     )}

//                     {error && (
//                         <div className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md">
//                             <p className="flex items-center">
//                                 <span className="mr-2">❌</span> {error}
//                             </p>
//                         </div>
//                     )}

//                     <form onSubmit={handleSubmit} className="space-y-8">
//                         {/* Car Basic Information */}
//                         <div className="border-b border-gray-200 dark:border-gray-700 pb-5">
//                             <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
//                                 Basic Information
//                             </h3>
//                             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                                 <div>
//                                     <label htmlFor="make" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">

//                                         Car name
//                                     </label>
//                                     <input
//                                         type="text"
//                                         id="make"
//                                         name="make"
//                                         value={formData.make}
//                                         onChange={handleChange}
//                                         className="block w-full rounded-md border-yellow-500 shadow-sm  focus:ring-opacity-50 dark:bg-white  text-black "
//                                         required
//                                     />
//                                 </div>
//                                 <div>
//                                     <label htmlFor="model" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                                         Model
//                                     </label>
//                                     <input
//                                         type="text"
//                                         id="model"
//                                         name="model"
//                                         value={formData.model}
//                                         onChange={handleChange}
//                                         className="block w-full rounded-md border-gray-300 shadow-sm  focus:ring-opacity-50 dark:bg-white dark:text-black dark:border-gray-600"
//                                         required
//                                     />
//                                 </div>
//                                 <div>
//                                     <label htmlFor="year" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                                         Year
//                                     </label>
//                                     <input
//                                         type="text"
//                                         id="year"
//                                         name="year"
//                                         value={formData.year}
//                                         onChange={handleChange}
//                                         className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-opacity-50 dark:bg-white dark:text-black dark:border-gray-600"
//                                         required
//                                     />
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Car Appearance */}
//                         <div className="border-b border-gray-200 dark:border-gray-700 pb-5">
//                             <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
//                                 Appearance
//                             </h3>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 <div>
//                                     <label htmlFor="color" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                                         Color
//                                     </label>
//                                     <input
//                                         type="text"
//                                         id="color"
//                                         name="color"
//                                         value={formData.color}
//                                         onChange={handleChange}
//                                         className="block w-full rounded-md border-gray-300 shadow-sm  focus:ring-opacity-50 dark:bg-white dark:text-black dark:border-gray-600"
//                                         required
//                                     />
//                                 </div>
//                                 <div>
//                                     <label htmlFor="condition" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                                         Condition
//                                     </label>
//                                     <select
//                                         id="condition"
//                                         name="condition"
//                                         value={formData.condition}
//                                         onChange={handleChange}
//                                         className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-opacity-50 dark:bg-white dark:text-black dark:border-gray-600"
//                                         required
//                                     >
//                                         <option value="">Select condition</option>
//                                         <option value="new">New</option>
//                                         <option value="used">Used</option>
//                                     </select>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Car Technical Information */}
//                         <div className="border-b border-gray-200 dark:border-gray-700 pb-5">
//                             <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
//                                 Technical Information
//                             </h3>
//                             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                                 <div>
//                                     <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                                         License Plate
//                                     </label>
//                                     <input
//                                         type="text"
//                                         id="licensePlate"
//                                         name="licensePlate"
//                                         value={formData.licensePlate}
//                                         onChange={handleChange}
//                                         className="block w-full rounded-md border-gray-300 shadow-sm  focus:ring-opacity-50 dark:bg-white dark:text-black dark:border-gray-600"
//                                         required
//                                     />
//                                 </div>
//                                 <div>
//                                     <label htmlFor="mileage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                                         Mileage
//                                     </label>
//                                     <input
//                                         type="text"
//                                         id="mileage"
//                                         name="mileage"
//                                         value={formData.mileage}
//                                         onChange={handleChange}
//                                         className="block w-full rounded-md border-gray-300 shadow-sm  focus:ring-opacity-50 dark:bg-white dark:text-black dark:border-gray-600"
//                                         required
//                                     />
//                                 </div>
//                                 <div>
//                                     <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                                         Fuel Type
//                                     </label>
//                                     <select
//                                         id="fuelType"
//                                         name="fuelType"
//                                         value={formData.fuelType}
//                                         onChange={handleChange}
//                                         className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-opacity-50 dark:bg-white dark:text-black dark:border-gray-600"
//                                         required
//                                     >
//                                         <option value="">Select fuel type</option>
//                                         <option value="gasoline">Gasoline</option>
//                                         <option value="diesel">Diesel</option>
//                                         <option value="electric">Electric</option>
//                                         <option value="hybrid">Hybrid</option>
//                                     </select>
//                                 </div>
//                             </div>

//                             <div className="mt-6">
//                                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                                     Transmission
//                                 </label>
//                                 <div className="flex items-center space-x-6">
//                                     {['automatic', 'manual'].map((option) => (
//                                         <div key={option} className="flex items-center">
//                                             <input
//                                                 type="radio"
//                                                 id={option}
//                                                 name="transmission"
//                                                 value={option}
//                                                 checked={formData.transmission === option}
//                                                 onChange={handleChange}
//                                                 className="h-4 w-4"
//                                             />
//                                             <label htmlFor={option} className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize">
//                                                 {option}
//                                             </label>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Price and Description */}
//                         <div className="border-b border-gray-200 dark:border-gray-700 pb-5">
//                             <h3 className="text-lg font-semibold  dark:text-gray-200 mb-4">
//                                 Price and Description
//                             </h3>
//                             <div className="mb-6">
//                                 <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                                     Price ($)
//                                 </label>
//                                 <input
//                                     type="number"
//                                     id="price"
//                                     name="price"
//                                     value={formData.price}
//                                     onChange={handleChange}
//                                     className="block w-full rounded-md border-gray-300 shadow-sm  focus:ring-opacity-50 dark:bg-white dark:text-black dark:border-gray-600"
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                                 Full description
//                                 </label>
//                                 <textarea
//                                     id="description"
//                                     name="description"
//                                     value={formData.description}
//                                     onChange={handleChange}
//                                     rows="4"
//                                     className="block w-full rounded-md border-gray-300 shadow-sm  focus:ring-opacity-50 dark:bg-white dark:text-black dark:border-gray-600"
//                                     required
//                                 ></textarea>
//                             </div>
//                         </div>

//                         {/* Image Upload */}
//                         <div>
//                             <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
//                                 Car Images
//                             </h3>
//                             <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
//                                 <label htmlFor="carImage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
//                                     Upload Car Images
//                                 </label>
//                                 <input
//                                     type="file"
//                                     id="carImage"
//                                     name="images"
//                                     accept="image/*"
//                                     multiple
//                                     onChange={handleImageChange}
//                                     className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:text-gray-400 dark:file:bg-gray-700 dark:file:text-gray-300"
//                                 />
//                                 <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
//                                     Upload multiple images of your car (exterior, interior, etc.)
//                                 </p>
//                             </div>

//                             {imagePreviews.length > 0 && (
//                                 <div className="mt-6">
//                                     <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
//                                         Image Previews
//                                     </h4>
//                                     <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                                         {imagePreviews.map((src, index) => (
//                                             <div key={index} className="relative group">
//                                                 <img
//                                                     src={src}
//                                                     alt={`Preview ${index + 1}`}
//                                                     className="w-full h-48 object-cover rounded-lg shadow-md"
//                                                 />
//                                                 <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg"></div>
//                                                 <div className="absolute bottom-2 right-2 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
//                                                     Image {index + 1}
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}
//                         </div>

//                         {/* Submit Button */}
//                         <div className="pt-4">
//                             <button
//                                 type="submit"
//                                 className="w-full bg-[#FBBF24] hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 flex items-center justify-center"
//                             >
//                                 <span>Submit Car Information</span>
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CarInfoForm;