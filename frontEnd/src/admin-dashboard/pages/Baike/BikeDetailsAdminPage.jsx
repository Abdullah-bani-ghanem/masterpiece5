import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const BikeDetailsAdminPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [bike, setBike] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBike = async () => {
            try {
                const token = localStorage.getItem('token') || sessionStorage.getItem('token');
                const res = await axios.get(`http://localhost:5000/api/bikes/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setBike(res.data);

            } catch (error) {
                console.error('Error fetching bike:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBike();
    }, [id]);

    const handleApproval = async (status) => {
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            const res = await axios.put(
                `http://localhost:5000/api/bikes/status/${id}`,
                { status },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            Swal.fire({
                icon: 'success',
                title: `Bike ${status === 'approved' ? 'approved' : 'rejected'} successfully!`,
                confirmButtonText: 'OK',
            }).then(() => {
                navigate(`/admin/AdminBikeDashboard`);
            });

        } catch (error) {
            console.error('Error updating bike status:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Could not update bike status.',
            });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
                    <p className="mt-4 text-lg text-gray-700 font-medium">Loading bike details...</p>
                </div>
            </div>
        );
    }

    if (!bike) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="text-2xl font-bold text-gray-800">Bike Not Found</h2>
                    <p className="mt-2 text-gray-600">The requested bike information could not be found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6">
            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
                {/* Header with gradient background */}
                <div className="bg-gradient-to-r  from-gray-800 to-gray-900 px-6 py-6 text-center">
                    <h1 className="text-3xl font-bold text-white">{bike.name}</h1>
                    <div className="mt-4">
                        <span className={`inline-block px-6 py-2 rounded-full text-sm font-bold ${bike.status === 'approved' ? 'bg-green-500 text-white' :
                                bike.status === 'rejected' ? 'bg-red-500 text-white' :
                                    'bg-yellow-400 text-gray-800'
                            } uppercase tracking-wider`}>
                            {bike.status}
                        </span>
                    </div>
                </div>

                <div className="md:flex">
                    {/* Image Gallery Section */}
                    {bike.images && bike.images.length > 0 && (
                        <div className="md:w-1/2 p-6">
                            <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Bike Images</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    {bike.images.map((img, index) => (
                                        <div key={index} className="overflow-hidden rounded-lg shadow-md">
                                            <img
                                                src={`http://localhost:5000/${img}`}
                                                alt={`${bike.name} - Image ${index + 1}`}
                                                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Bike Details Section */}
                    <div className="md:w-1/2 p-6">
                        <div className="bg-gray-50 p-4 rounded-lg shadow-inner h-full">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Specifications</h3>
                            <div className="space-y-4">
                                <div className="bg-white p-3 rounded-md shadow-sm">
                                    <div className="flex items-center">
                                        <span className="text-gray-700 font-medium w-24">Brand:</span>
                                        <span className="text-gray-900 font-semibold">{bike.brand}</span>
                                    </div>
                                </div>
                                <div className="bg-white p-3 rounded-md shadow-sm">
                                    <div className="flex items-center">
                                        <span className="text-gray-700 font-medium w-24">Model:</span>
                                        <span className="text-gray-900 font-semibold">{bike.model}</span>
                                    </div>
                                </div>
                                <div className="bg-white p-3 rounded-md shadow-sm">
                                    <div className="flex items-center">
                                        <span className="text-gray-700 font-medium w-24">Year:</span>
                                        <span className="text-gray-900 font-semibold">{bike.year}</span>
                                    </div>
                                </div>
                                <div className="bg-white p-3 rounded-md shadow-sm">
                                    <div className="flex items-center">
                                        <span className="text-gray-700 font-medium w-24">Type:</span>
                                        <span className="text-gray-900 font-semibold">{bike.type}</span>
                                    </div>
                                </div>
                                <div className="bg-white p-3 rounded-md shadow-sm">
                                    <div className="flex items-center">
                                        <span className="text-gray-700 font-medium w-24">Price:</span>
                                        <span className="text-gray-900 font-semibold">${bike.price}</span>
                                    </div>
                                </div>
                                <div className="bg-white p-3 rounded-md shadow-sm">
                                    <div className="flex items-center">
                                        <span className="text-gray-700 font-medium w-24">Condition:</span>
                                        <span className="text-gray-900 font-semibold">{bike.condition}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description Section */}
                <div className="px-6 pb-6">
                    <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Description</h3>
                        <p className="text-gray-700 leading-relaxed">{bike.description}</p>
                    </div>
                </div>

                {/* Admin Action Buttons */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-6 flex justify-center items-center gap-6">
                    <button
                        onClick={() => handleApproval('approved')}
                        className="bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Approve
                    </button>
                    <button
                        onClick={() => handleApproval('rejected')}
                        className="bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        Reject
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BikeDetailsAdminPage;