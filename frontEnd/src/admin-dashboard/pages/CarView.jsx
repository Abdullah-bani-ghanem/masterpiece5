import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CarView = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);

  if (!state?.car) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="text-red-600 text-xl font-semibold mb-4">No car data available.</div>
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors shadow-sm flex items-center"
          onClick={() => navigate(-1)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Previous Page
        </button>
      </div>
    );
  }

  const {
    name, brand, model, year, price, condition, description,
    color, mileage, status, images, seller
  } = state.car;

  // Function to handle image navigation
  const handleImageChange = (direction) => {
    if (!images || images.length <= 1) return;
    
    if (direction === "next") {
      setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    } else {
      setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-6 px-4 sm:px-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header with Car Name */}
        <div className="bg-gray-800 text-white p-4 text-center">
          <h2 className="text-xl font-bold">{name} {year}</h2>
          
        </div>

        {/* Content Container */}
        <div className="p-5">
          {/* Car Images with Navigation - Medium Size */}
          {images && images.length > 0 && (
            <div className="mb-6 relative">
              <div className="flex justify-center">
                <img
                  src={`http://localhost:5000/uploads/${images[activeImage]}`}
                  alt={`${brand} ${model}`}
                  className="w-full md:w-3/4 lg:w-2/3 h-60 object-cover rounded-md shadow-sm"
                />
              </div>
              
              {images.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between px-4">
                  <button 
                    onClick={() => handleImageChange("prev")}
                    className="bg-black bg-opacity-40 hover:bg-opacity-60 text-white rounded-full p-1 focus:outline-none transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => handleImageChange("next")}
                    className="bg-black bg-opacity-40 hover:bg-opacity-60 text-white rounded-full p-1 focus:outline-none transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
              
              {/* Image Counter */}
              {images.length > 1 && (
                <div className="absolute bottom-2 right-4 md:right-1/4 lg:right-1/4 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
                  {activeImage + 1}/{images.length}
                </div>
              )}
            </div>
          )}

          {/* Price Highlight */}
          <div className="flex justify-center mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg py-2 px-6 inline-block">
              <p className="text-2xl font-bold text-green-700">${new Intl.NumberFormat().format(price)}</p>
            </div>
          </div>

          {/* Car Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            {/* Specifications */}
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h3 className="text-md font-semibold mb-3 text-gray-700 border-b pb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Specifications
              </h3>
              <div className="grid grid-cols-1 gap-1">
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-500">Brand:</span>
                  <span className="text-sm text-gray-800">{brand}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-500">Model:</span>
                  <span className="text-sm text-gray-800">{model}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-500">Year:</span>
                  <span className="text-sm text-gray-800">{year}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-500">Color:</span>
                  <span className="text-sm text-gray-800">{color}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-sm font-medium text-gray-500">Mileage:</span>
                  <span className="text-sm text-gray-800">{mileage} km</span>
                </div>
              </div>
            </div>

            {/* Sale Info */}
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h3 className="text-md font-semibold mb-3 text-gray-700 border-b pb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                Sale Info
              </h3>
              <div className="grid grid-cols-1 gap-1">
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-500">Condition:</span>
                  <span className="text-sm text-gray-800">{condition}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-sm font-medium text-gray-500">Status:</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    status === "Available" ? "bg-green-100 text-green-800" : 
                    status === "Sold" ? "bg-red-100 text-red-800" : 
                    "bg-yellow-100 text-yellow-800"
                  }`}>
                    {status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-6">
            <h3 className="text-md font-semibold mb-3 text-gray-700 border-b pb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Description
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed bg-white p-3 rounded-md border border-gray-100">{description}</p>
          </div>

          {/* Seller Info */}
          {seller && (
            <div className="bg-blue-50 p-4 rounded-md border border-blue-100 mb-6">
              <h3 className="text-md font-semibold mb-3 text-blue-700 border-b border-blue-100 pb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Seller Info
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white p-3 rounded-md border border-blue-100">
                <div className="text-sm">
                  <p className="mb-1"><span className="font-medium text-gray-500">Name:</span> <span className="text-gray-800">{seller.name}</span></p>
                  <p><span className="font-medium text-gray-500">Email:</span> <span className="text-gray-800">{seller.email}</span></p>
                </div>
                <div className="mt-3 sm:mt-0">
                  {/* Removed contact button as per original code */}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Button */}
          <div className="flex justify-center mt-4">
            <button
              className="bg-gray-800 text-white px-5 py-2 rounded-md hover:bg-gray-900 transition-colors shadow-sm flex items-center text-sm"
              onClick={() => navigate(-1)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Car Listings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarView;