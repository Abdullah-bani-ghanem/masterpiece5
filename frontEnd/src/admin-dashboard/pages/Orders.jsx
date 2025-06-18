import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Eye, Check, X, Edit, Search } from "lucide-react";

const Orders = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statusFilter, setStatusFilter] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [carsPerPage] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCars = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("token");
                const res = await axios.get(`/api/cars/all${statusFilter ? `?status=${statusFilter}` : ""}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCars(res.data);
            } catch (err) {
                setError("Failed to load cars");
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, [statusFilter]);

    const handleStatusChange = async (id, newStatus) => {
        const { value: note } = await Swal.fire({
            title: `${newStatus === "approved" ? "Approve" : "Reject"} Order`,
            input: "text",
            inputLabel: "Add a note (optional)",
            inputPlaceholder: "Type your note here...",
            showCancelButton: true,
            confirmButtonText: newStatus === "approved" ? "Approve" : "Reject",
            confirmButtonColor: newStatus === "approved" ? "#10B981" : "#EF4444",
        });

        if (note === undefined) return; // User clicked cancel

        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            const res = await axios.patch(`/api/cars/status/${id}`, {
                status: newStatus,
                adminNote: note,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setCars(prev =>
                prev.map(car =>
                    car._id === id ? { ...car, status: newStatus, adminNote: note } : car
                )
            );

            Swal.fire({
                icon: "success",
                title: "Status Updated",
                text: res.data.message,
                timer: 2000,
                showConfirmButton: false,
            });
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Failed to update status",
                text: err?.response?.data?.message || "Something went wrong",
            });
        }
    };

    const handleView = (car) => {
        navigate(`/admin-dashboard/cars/view/${car._id}`, { state: { car } });
    };

    const getStatusBadge = (status) => {
        const styles = {
            approved: "bg-green-100 text-green-800 border border-green-300",
            rejected: "bg-red-100 text-red-800 border border-red-300",
            pending: "bg-yellow-100 text-yellow-800 border border-yellow-300",
        };

        return (
            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    // Search functionality
    const filteredCars = cars.filter(car => {
        return (
            car.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            car.model?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            car.year?.toString().includes(searchQuery) ||
            car.seller?.name?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    // Pagination logic
    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
    const totalPages = Math.ceil(filteredCars.length / carsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    return (
        <div className="bg-gray-50 min-h-screen p-3">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                    <h1 className="text-xl font-bold text-gray-800 mb-2 md:mb-0">Order Management</h1>
                    <div className="flex flex-col md:flex-row w-full md:w-auto gap-2 md:items-center">
                        {/* Search Box */}
                        <div className="relative w-full md:w-64">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search size={16} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearch}
                                placeholder="Search cars..."
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        {/* Status Filter */}
                        <div className="flex items-center w-full md:w-auto">
                            <label htmlFor="statusFilter" className="text-sm text-gray-600 mr-2">Filter:</label>
                            <select
                                id="statusFilter"
                                value={statusFilter}
                                onChange={(e) => {
                                    setStatusFilter(e.target.value);
                                    setCurrentPage(1); // Reset to first page on filter change
                                }}
                                className="border border-gray-300 px-2 py-2 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 w-full md:w-auto"
                            >
                                <option value="">All</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-8">
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                            <p className="mt-2 text-sm text-gray-600">Loading orders...</p>
                        </div>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded shadow-sm">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <X className="h-4 w-4 text-red-500" />
                            </div>
                            <div className="ml-2">
                                <h3 className="text-sm text-red-800 font-medium">Error</h3>
                                <p className="text-xs text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                ) : filteredCars.length === 0 ? (
                    <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                        <div className="mb-2">
                            <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <p className="text-sm text-gray-600">
                            {searchQuery
                                ? "No cars found matching your search criteria."
                                : "No orders found matching your criteria."}
                        </p>
                        {(statusFilter || searchQuery) && (
                            <div className="mt-2 space-x-2">
                                {statusFilter && (
                                    <button
                                        onClick={() => setStatusFilter("")}
                                        className="text-sm text-blue-600 hover:text-blue-800"
                                    >
                                        Clear filter
                                    </button>
                                )}
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="text-sm text-blue-600 hover:text-blue-800"
                                    >
                                        Clear search
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">#</th>
                                        <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car Details</th>
                                        <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                        <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                                        <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {currentCars.map((car, index) => (
                                        <tr key={car._id} className="hover:bg-gray-50">
                                            <td className="px-3 py-2 whitespace-nowrap">
                                                <div className="text-xs font-medium text-gray-900">
                                                    {indexOfFirstCar + index + 1}
                                                </div>
                                            </td>
                                            <td className="px-3 py-2 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {car.images?.length > 0 && (
                                                        <div className="flex-shrink-0 mr-2">
                                                            <img
                                                                className="h-12 w-12 rounded-md object-cover"
                                                                src={`http://localhost:5000/uploads/${car.images[0]}`}
                                                                alt={car.name}
                                                            />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <div className="text-xs font-medium text-gray-900">{car.name}</div>
                                                        <div className="text-xs text-gray-500">{car.model}, {car.year}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-3 py-2 whitespace-nowrap">
                                                <div className="text-xs font-medium text-gray-900">${car.price.toLocaleString()}</div>
                                                <div className="text-xs text-gray-500">Seller: {car.seller?.name}</div>
                                            </td>
                                            <td className="px-3 py-2 whitespace-nowrap">
                                                {getStatusBadge(car.status)}
                                                {car.adminNote && (
                                                    <div className="text-xs text-gray-500 mt-1 max-w-xs truncate">
                                                        Note: {car.adminNote}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-3 py-2 whitespace-nowrap">
                                                {car.payment ? (
                                                    <span className="text-green-600 text-xs font-medium">paid ✅</span>
                                                ) : (
                                                    <span className="text-red-600 text-xs font-medium">unpaid ❌</span>
                                                )}
                                            </td>
                                            <td className="px-3 py-2 whitespace-nowrap">
                                                <div className="flex flex-wrap gap-1">
                                                    <button
                                                        className={`${car.status === "approved"
                                                                ? "bg-gray-300 cursor-not-allowed"
                                                                : "bg-green-500 hover:bg-green-600"
                                                            } text-white px-2 py-1 rounded text-xs flex items-center`}
                                                        onClick={() => handleStatusChange(car._id, "approved")}
                                                        disabled={car.status === "approved"}
                                                    >
                                                        <Check size={12} />
                                                    </button>
                                                    <button
                                                        className={`${car.status === "rejected"
                                                                ? "bg-gray-300 cursor-not-allowed"
                                                                : "bg-red-500 hover:bg-red-600"
                                                            } text-white px-2 py-1 rounded text-xs flex items-center`}
                                                        onClick={() => handleStatusChange(car._id, "rejected")}
                                                        disabled={car.status === "rejected"}
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                    <Link
                                                        to={`/admin-dashboard/car/edit/${car._id}`}
                                                        className="bg-amber-500 hover:bg-amber-600 text-white px-2 py-1 rounded text-xs flex items-center"
                                                    >
                                                        <Edit size={12} />
                                                    </Link>
                                                    <button
                                                        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs flex items-center"
                                                        onClick={() => handleView(car)}
                                                    >
                                                        <Eye size={12} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6">
                                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            Showing <span className="font-medium">{indexOfFirstCar + 1}</span> to{" "}
                                            <span className="font-medium">
                                                {indexOfLastCar > filteredCars.length ? filteredCars.length : indexOfLastCar}
                                            </span>{" "}
                                            of <span className="font-medium">{filteredCars.length}</span> results
                                        </p>
                                    </div>
                                    <div>
                                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                            <button
                                                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                                                disabled={currentPage === 1}
                                                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
                                                    }`}
                                            >
                                                <span className="sr-only">Previous</span>
                                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </button>

                                            {/* Page Numbers */}
                                            {[...Array(totalPages).keys()].map(number => (
                                                <button
                                                    key={number + 1}
                                                    onClick={() => paginate(number + 1)}
                                                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${currentPage === number + 1
                                                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                            : 'text-gray-500 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {number + 1}
                                                </button>
                                            ))}

                                            <button
                                                onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                                                disabled={currentPage === totalPages}
                                                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
                                                    }`}
                                            >
                                                <span className="sr-only">Next</span>
                                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </nav>
                                    </div>
                                </div>
                                <div className="flex justify-between w-full sm:hidden">
                                    <button
                                        onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                                        disabled={currentPage === 1}
                                        className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${currentPage === 1
                                                ? 'text-gray-400 cursor-not-allowed'
                                                : 'text-blue-700 bg-white hover:bg-blue-50'
                                            }`}
                                    >
                                        Previous
                                    </button>
                                    <span className="text-sm text-gray-700">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <button
                                        onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                                        disabled={currentPage === totalPages}
                                        className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${currentPage === totalPages
                                                ? 'text-gray-400 cursor-not-allowed'
                                                : 'text-blue-700 bg-white hover:bg-blue-50'
                                            }`}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;