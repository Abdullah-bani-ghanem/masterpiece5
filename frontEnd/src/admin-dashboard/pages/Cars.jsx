import { useEffect, useState, useCallback } from "react";
import { Pencil, Trash2, Plus, Eye, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const StatusBadge = ({ status }) => {
  const statusStyles = {
    Available: "bg-green-100 text-green-800",
    Rented: "bg-blue-100 text-blue-800",
    default: "bg-gray-100 text-gray-800"
  };

  const style = statusStyles[status] || statusStyles.default;

  return (
    <span className={`px-2 py-1 rounded text-xs ${style}`}>
      {status}
    </span>
  );
};

const ActionButtons = ({ car, onDelete, onView }) => (
  <div className="flex gap-2">
    <button
      className="bg-green-600 text-white p-1 rounded hover:bg-green-700 transition-colors"
      onClick={() => onView(car)}
      title="View Details"
    >
      <Eye size={16} />
    </button>
    <Link
      to={`/admin-dashboard/car/edit/${car._id}`}
      className="bg-amber-500 text-white p-1 rounded hover:bg-amber-600 transition-colors"
      title="Edit Car"
    >
      <Pencil size={16} />
    </Link>
    <button
      className="bg-red-600 text-white p-1 rounded hover:bg-red-700 transition-colors"
      onClick={() => onDelete(car._id)}
      title="Delete Car"
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

const Cars = () => {
  const [allCars, setAllCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [displayedCars, setDisplayedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage] = useState(5);
  const navigate = useNavigate();

  const fetchCars = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/cars/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllCars(res.data);
      setFilteredCars(res.data);
    } catch (err) {
      console.error("Error fetching cars:", err);
      setError("Failed to load cars");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  useEffect(() => {
    // Filter cars based on search term
    const results = allCars.filter(car =>
      car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredCars(results);
    setCurrentPage(1); // Reset to first page when search changes
  }, [searchTerm, allCars]);

  useEffect(() => {
    // Update displayed cars based on pagination
    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    setDisplayedCars(filteredCars.slice(indexOfFirstCar, indexOfLastCar));
  }, [currentPage, filteredCars, carsPerPage]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This car will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    });
  
    if (!confirm.isConfirmed) return;
  
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/cars/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setAllCars((prev) => prev.filter((car) => car._id !== id));
  
      await Swal.fire({
        title: "Deleted!",
        text: "Car deleted successfully.",
        icon: "success",
        confirmButtonColor: "#38a169",
      });
    } catch (err) {
      console.error("Error deleting car:", err);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete car.",
        icon: "error",
        confirmButtonColor: "#e3342f",
      });
    }
  };
  

  const handleView = (car) => {
    navigate(`/admin-dashboard/cars/view/${car._id}`, { state: { car } });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  return (
    <div className="p-6 max-w-full bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Car Management</h2>
        <div className="flex gap-2">
          <Link
            to="/admin-dashboard/cars/new"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus size={18} /> Add Car
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Search Bar */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for a car (name, type, model)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              dir="lft"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-t-blue-500 border-b-blue-500 border-blue-200 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading cars...</p>
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
                  <th className="py-3 px-4 text-left font-semibold text-gray-600">Status</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600">Brand</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600">Model</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600">Description</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedCars.map((car, index) => (
                  <tr
                    key={car._id}
                    className="border-t border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <td className="py-3 px-4 text-gray-700">
                      {(currentPage - 1) * carsPerPage + index + 1}
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-800">{car.name}</td>
                    <td className="py-3 px-4 text-gray-700">${car.price}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={car.status} />
                    </td>
                    <td className="py-3 px-4 text-gray-700">{car.brand}</td>
                    <td className="py-3 px-4 text-gray-700">{car.model}</td>
                    <td className="py-3 px-4 max-w-xs truncate text-gray-600">{car.description}</td>
                    <td className="py-3 px-4">
                      <ActionButtons
                        car={car}
                        onDelete={handleDelete}
                        onView={handleView}
                      />
                    </td>
                  </tr>
                ))}
                {displayedCars.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center py-12">
                      <div className="flex flex-col items-center text-gray-500">
                        <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {searchTerm ? (
                          <p className="text-lg">There are no cars matching your search criteria.</p>
                        ) : (
                          <p className="text-lg">
                            There are no cars available at the moment.</p>
                        )}
                        <Link
                          to="/admin-dashboard/cars/new"
                          className="mt-4 text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        >
                          <Plus size={16} /> 
                          Add a new car
                        </Link>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && filteredCars.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        {/* Results Summary */}
        {!loading && !error && (
          <div className="p-4 border-t border-gray-200 text-sm text-gray-600">
            
an offer{displayedCars.length > 0 ? (currentPage - 1) * carsPerPage + 1 : 0} -
            {Math.min(currentPage * carsPerPage, filteredCars.length)} 
            from{filteredCars.length}car
            {searchTerm && <span> (
              Results are filtered based on:"{searchTerm}")</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cars;