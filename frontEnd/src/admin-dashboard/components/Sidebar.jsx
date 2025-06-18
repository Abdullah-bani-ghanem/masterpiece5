import { Home, Car, Users, ShoppingCart, LogOut, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import axios from 'axios';

const Sidebar = () => {
  // Handle logout functionality
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/users/logout", {}, { withCredentials: true });
      alert("Logged out successfully!");
      window.location.href = '/'; // Alternative to navigate
    } catch (error) {
      alert("Error during logout!");
    }
  };

  return (
    <div className="w-64 bg-gray-900 text-white shadow-xl flex flex-col h-screen">
      {/* Fixed header */}
      <div className="p-6 border-b border-gray-800 flex-shrink-0">
        <h2 className="text-2xl font-bold text-blue-400">ClassicCars</h2>
      </div>

      {/* Scrollable navigation */}
      <nav className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        <ul className="space-y-2 px-4 py-4">
          <li>
            <Link
              to="/"
              className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-800 transition-all duration-200"
            >
              <Home size={18} className="text-green-400" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin-dashboard"
              className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-800 transition-all duration-200"
            >
              <Home size={18} className="text-blue-400" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin-dashboard/all-cars"
              className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-800 transition-all duration-200"
            >
              <ShoppingCart size={18} className="text-blue-400" />
              <span>Orders</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin-dashboard/cars"
              className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-800 transition-all duration-200"
            >
              <Car size={18} className="text-blue-400" />
              <span>Cars</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin-dashboard/comment"
              className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-800 transition-all duration-200"
            >
              <MessageSquare size={18} className="text-blue-400" />
              <span>Cars Comment</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/AdminBikeDashboard"
              className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-800 transition-all duration-200"
            >
              <Users size={18} className="text-blue-400" />
              <span>Bike</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/BikeCommentsAdmin"
              className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-800 transition-all duration-200"
            >
              <Users size={18} className="text-blue-400" />
              <span>Bike Comments</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin-dashboard/users"
              className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-800 transition-all duration-200"
            >
              <Users size={18} className="text-blue-400" />
              <span>Users</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin-dashboard/testimonials"
              className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-800 transition-all duration-200"
            >
              <MessageSquare size={18} className="text-blue-400" />
              <span>Testimonials</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/contacts"
              className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-800 transition-all duration-200"
            >
              <Users size={18} className="text-blue-400" />
              <span>Contact</span>
            </Link>
          </li>
          {/* You can add more menu items here if needed */}
        </ul>
      </nav>

      {/* Fixed logout button at bottom */}
      <div className="p-4 border-t border-gray-800 flex-shrink-0">
        <button
          className="flex items-center justify-center gap-3 py-3 px-4 rounded-lg bg-red-600 hover:bg-red-700 transition-all duration-200 w-full"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;