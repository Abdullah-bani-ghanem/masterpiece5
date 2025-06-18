import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Pencil, Trash2, Check, X, Eye, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StatusBadge = ({ status }) => {
  const statusStyles = {
    approved: "bg-green-100 text-green-800",
    pending: "bg-amber-100 text-amber-800",
    rejected: "bg-red-100 text-red-800",
    default: "bg-gray-100 text-gray-800"
  };

  const style = statusStyles[status] || statusStyles.default;

  return (
    <span className={`px-2 py-1 rounded text-xs ${style}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const ActionButtons = ({ bike, onApprove, onReject, onDelete, onView }) => (
  <div className="flex gap-2">
    <button
      className="bg-green-600 text-white p-1 rounded hover:bg-green-700 transition-colors"
      onClick={() => onView(bike._id)}
      title="View Details"
    >
      <Eye size={16} />
    </button>
    <button
      className="bg-emerald-500 text-white p-1 rounded hover:bg-emerald-600 transition-colors"
      onClick={() => onApprove(bike._id, "approved")}
      title="Approve"
    >
      <Check size={16} />
    </button>
    <button
      className="bg-amber-500 text-white p-1 rounded hover:bg-amber-600 transition-colors"
      onClick={() => onReject(bike._id, "rejected")}
      title="Reject"
    >
      <X size={16} />
    </button>
    <button
      className="bg-red-600 text-white p-1 rounded hover:bg-red-700 transition-colors"
      onClick={() => onDelete(bike._id)}
      title="Delete"
    >
      <Trash2 size={16} />
    </button>
  </div>
);

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-center mt-6 gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded ${currentPage === 1
          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
          : "bg-blue-100 text-blue-700 hover:bg-blue-200"
          }`}
      >
        <ChevronLeft size={16} />
      </button>

      <div className="flex gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded ${currentPage === page
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded ${currentPage === totalPages
          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
          : "bg-blue-100 text-blue-700 hover:bg-blue-200"
          }`}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

const BikeApprovalPage = () => {
  const [bikes, setBikes] = useState([]);
  const [filteredBikes, setFilteredBikes] = useState([]);
  const [displayedBikes, setDisplayedBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [bikesPerPage] = useState(5);
  const navigate = useNavigate();

  const fetchBikes = async () => {
  try {
    setLoading(true);
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: 'Unauthorized',
        text: 'Please login first.',
      });
      return;
    }

    const res = await axios.get("http://localhost:5000/api/bikes/Pending", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setBikes(res.data);
    setFilteredBikes(res.data);
  } catch (err) {
    console.error("Error fetching bikes:", err);
    setError("Failed to load bikes");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchBikes();
  }, []);

  useEffect(() => {
    // Filter bikes based on search term and status
    let results = bikes;

    // Filter by status
    if (statusFilter !== "all") {
      results = results.filter(bike => bike.status.toLowerCase() === statusFilter);
    }

    // Search functionality
    if (searchTerm.trim() !== "") {
      const lowercaseSearch = searchTerm.toLowerCase();
      results = results.filter((bike) => {
        return (
          bike.name?.toLowerCase().includes(lowercaseSearch) ||
          bike.model?.toLowerCase().includes(lowercaseSearch) ||
          bike.brand?.toLowerCase().includes(lowercaseSearch) ||
          bike.type?.toLowerCase().includes(lowercaseSearch) ||
          bike.year?.toString().includes(lowercaseSearch) ||
          bike.price?.toString().includes(lowercaseSearch) ||
          bike.description?.toLowerCase().includes(lowercaseSearch)
        );
      });
    }

    setFilteredBikes(results);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, bikes]);

  useEffect(() => {
    // Update displayed bikes based on pagination
    const indexOfLastBike = currentPage * bikesPerPage;
    const indexOfFirstBike = indexOfLastBike - bikesPerPage;
    setDisplayedBikes(filteredBikes.slice(indexOfFirstBike, indexOfLastBike));
  }, [currentPage, filteredBikes, bikesPerPage]);

  const handleApproval = async (id, status) => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');;
      await axios.put(
        `http://localhost:5000/api/bikes/status/${id}/`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire({
        icon: "success",
        title: `Bike has been ${status === "approved" ? "approved" : "rejected"}!`,
        background: "#ffffff",
        color: "#333333",
      });
      fetchBikes();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Something went wrong!",
        background: "#ffffff",
        color: "#333333",
      });
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This bike will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    });
  
    if (!confirm.isConfirmed) return;
  
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/bikes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      await Swal.fire({
        title: "Deleted!",
        text: "Bike deleted successfully.",
        icon: "success",
        confirmButtonColor: "#38a169",
      });
  
      fetchBikes(); // إعادة تحميل القائمة بعد الحذف
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete bike.",
        icon: "error",
        confirmButtonColor: "#e3342f",
      });
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/admin/BikeDetailsAdminPage/${id}`);
  };

  const totalPages = Math.ceil(filteredBikes.length / bikesPerPage);

  return (
    <div className="p-6 max-w-full bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Bike Approvals</h2>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Search and Filter Bar */}
        <div className="p-4 border-b border-gray-200 flex gap-4">
          <div className="flex-grow relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for a bike (name, type, brand)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              dir="lft"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-48 py-2 px-2 border border-gray-300 rounded-lg bg-white text-gray-700 outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-t-blue-500 border-b-blue-500 border-blue-200 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading bikes...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-4">
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p>{error}</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600">#</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600">Name</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600">Price</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600">Brand</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600">Model</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600">Description</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600">Status</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600">Payment</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedBikes.map((bike, index) => (
                  <tr
                    key={bike._id}
                    className="border-t border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <td className="py-3 px-4 text-gray-700">
                      {(currentPage - 1) * bikesPerPage + index + 1}
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-800">{bike.name}</td>
                    <td className="py-3 px-4 text-gray-700">${bike.price}</td>
                    <td className="py-3 px-4 text-gray-700">{bike.brand}</td>
                    <td className="py-3 px-4 text-gray-700">{bike.model}</td>
                    <td className="py-3 px-4 max-w-xs truncate text-gray-600">{bike.description}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={bike.status} />
                    </td>
                    <td className="py-3 px-4">
                      {bike.payment ? (
                        <span className="text-green-600 text-xs font-medium">paid ✅</span>
                      ) : (
                        <span className="text-red-600 text-xs font-medium">unpaid ❌</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <ActionButtons
                        bike={bike}
                        onApprove={handleApproval}
                        onReject={handleApproval}
                        onDelete={handleDelete}
                        onView={handleViewDetails}
                      />
                    </td>
                  </tr>
                ))}
                {displayedBikes.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center py-12">
                      <div className="flex flex-col items-center text-gray-500">
                        <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {searchTerm || statusFilter !== "all" ? (
                          <p className="text-lg">There are no bikes matching your search criteria.</p>
                        ) : (
                          <p className="text-lg">
                            There are no bikes available at the moment.</p>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && filteredBikes.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        {/* Results Summary */}
        {!loading && !error && (
          <div className="p-4 border-t border-gray-200 text-sm text-gray-600">
            Showing {displayedBikes.length > 0 ? (currentPage - 1) * bikesPerPage + 1 : 0} -
            {Math.min(currentPage * bikesPerPage, filteredBikes.length)}
            from {filteredBikes.length} bikes
            {searchTerm && <span> (Results are filtered based on: "{searchTerm}")</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default BikeApprovalPage;