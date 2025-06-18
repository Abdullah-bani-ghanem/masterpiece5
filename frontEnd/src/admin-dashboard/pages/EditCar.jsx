import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const EditCarAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const res = await axios.get(`/api/cars/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCar(res.data);
      } catch (err) {
        setError("Failed to load car data");
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`/api/cars/admin/update/${id}`, car, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      Swal.fire({
        title: "Success!",
        text: "Car information has been updated successfully",
        icon: "success",
        confirmButtonText: "Continue",
        confirmButtonColor: "#3B82F6",
        timer: 2000,
        timerProgressBar: true
      });
      
      navigate("/admin-dashboard/all-cars");
    } catch (err) {
      console.error(err);
      
      Swal.fire({
        title: "Error!",
        text: "Failed to update car information",
        icon: "error",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#EF4444"
      });
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-40">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-400"></div>
    </div>
  );
  
  if (error) return (
    <div className="bg-red-50 p-3 rounded-md text-center max-w-md mx-auto">
      <p className="text-red-600 text-sm font-medium">{error}</p>
    </div>
  );
  
  if (!car) return null;

  const fieldLabels = {
    name: "Car Name",
    brand: "Brand",
    model: "Model",
    year: "Year",
    price: "Price",
    condition: "Condition",
    description: "Description"
  };

  return (
    <div className="max-w-md mx-auto p-5 bg-white rounded-lg shadow-md border border-gray-100">
      <h1 className="text-xl font-semibold mb-4 text-gray-700 pb-2 border-b border-gray-100 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        Edit Car Information
      </h1>
      
      <form onSubmit={handleSubmit} className="grid gap-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">{fieldLabels.name}</label>
            <input
              type="text"
              name="name"
              value={car.name || ""}
              onChange={handleChange}
              className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">{fieldLabels.brand}</label>
            <input
              type="text"
              name="brand"
              value={car.brand || ""}
              onChange={handleChange}
              className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">{fieldLabels.model}</label>
            <input
              type="text"
              name="model"
              value={car.model || ""}
              onChange={handleChange}
              className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">{fieldLabels.year}</label>
            <input
              type="number"
              name="year"
              value={car.year || ""}
              onChange={handleChange}
              className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">{fieldLabels.price}</label>
            <input
              type="number"
              name="price"
              value={car.price || ""}
              onChange={handleChange}
              className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">{fieldLabels.condition}</label>
            <select
              name="condition"
              value={car.condition || ""}
              onChange={handleChange}
              className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition"
              required
            >
              <option value="">Select condition</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
              <option value="Certified Pre-Owned">Certified Pre-Owned</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">{fieldLabels.description}</label>
          <textarea
            name="description"
            value={car.description || ""}
            onChange={handleChange}
            className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition"
            rows="3"
            required
          />
        </div>

        <div className="flex justify-between mt-4 pt-2 border-t border-gray-100">
          <button 
            type="button" 
            onClick={() => navigate("/admin-dashboard/all-cars")}
            className="px-4 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-md hover:bg-gray-200 transition flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Cancel
          </button>
          <button 
            type="submit" 
            className="px-4 py-1.5 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition flex items-center shadow-sm"
          >
            <span>Save</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCarAdmin;