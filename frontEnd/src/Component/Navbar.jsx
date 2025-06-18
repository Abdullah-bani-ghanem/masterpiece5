import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [userProfilePicture, setUserProfilePicture] = useState('');
  const [userRole, setUserRole] = useState('');
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user } = useContext(AuthContext);

  // Scroll-hide navbar effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(currentScrollTop < lastScrollTop || currentScrollTop <= 100);
      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);

  // Auth check
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/users/check-auth", {
          withCredentials: true,
        });

        const user = data.user;
        setUserName(user.name || user.username || "User");
        setUserProfilePicture(user.profilePicture || '');
        setUserRole(user.role || '');
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
        setUserName('');
        setUserProfilePicture('');
        setUserRole('');
      }
    };

    fetchUser();
  }, [location.pathname]);

  // Logout
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out from your account.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
      background: '#1f2937',
      color: '#ffffff',
      iconColor: '#facc15'
    });

    if (result.isConfirmed) {
      try {
        await axios.post("http://localhost:5000/api/users/logout", {}, { withCredentials: true });
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        setIsAuthenticated(false);
        setUserName('');
        // Swal.fire({
        //   title: 'Success!',
        //   text: 'Logged out successfully',
        //   icon: 'success',
        //   timer: 2000,
        //   timerProgressBar: true,
        //   background: '#1f2937',
        //   iconColor: '#10b981',
        //   color: '#ffffff',
        //   confirmButtonColor: '#3b82f6'
        // });
        navigate('/');
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred during logout',
          icon: 'error',
          background: '#1f2937',
          iconColor: '#ef4444',
          color: '#ffffff',
          confirmButtonColor: '#3b82f6'
        });
      }
    }
  };

  return (
    <nav className={`bg-white dark:bg-[#FBBF24] shadow-md fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">

        {/* Logo */}
        <Link to="/" className="block w-50">
          <img width={200} src="/classic-cars-high-resolution-logo-transparent.png" className="mr-28" />
        </Link>

        {/* Auth buttons */}
        <div className="flex md:order-3">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="font-[Playfair Display] text-white bg-black hover:bg-red-800 focus:ring-2 focus:ring-[#2d2d2e7d] font-medium rounded-lg text-sm px-4 py-2 transition"
            >
              Logout
            </button>
          ) : (
            <div className="flex space-x-3">
              <Link to="/login" className="font-[Playfair Display] text-black border border-black hover:bg-black hover:text-white rounded-lg text-sm px-4 py-2 transition">
                Login
              </Link>
              <Link to="/register" className="font-[Playfair Display] text-white bg-black hover:bg-gray-900 rounded-lg text-sm px-4 py-2 transition">
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Hamburger Menu */}
        <div className="flex items-center md:order-2 ml-4">
          <button
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>

        {/* Main Nav */}
        <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="navbar-language">
          <ul className="flex flex-col md:flex-row font-medium p-4 md:p-0 mt-4 md:mt-0 border md:border-0 rounded-lg md:space-x-8 rtl:space-x-reverse ml-25">
            {[
              { path: '/', label: 'Home' },
              { path: '/cars', label: 'Cars' },
              { path: '/bikes', label: 'Bikes' },
              { path: '/contact', label: 'Contact' },
              { path: '/about', label: 'About' },
            ].map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `font-[Playfair Display] block py-2 px-3 text-2xl md:p-0 transition duration-300 ${
                    isActive ? 'border-b-2 border-white text-white' : 'text-gray-900 hover:bg-white md:hover:bg-transparent md:hover:text-white dark:hover:text-white'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </ul>

          {/* Profile */}
          {isAuthenticated && userName && (
            <div className="hidden md:flex items-center ml-10 space-x-3">
              <span className="font-[Playfair Display] text-gray-900">Hello, {userName}</span>
              <Link to="/userprofile">
                {userProfilePicture ? (
                  <img src={userProfilePicture} alt={userName} className="w-8 h-8 rounded-full object-cover border border-gray-400 hover:opacity-80 transition" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-yellow-600 flex items-center justify-center text-white font-semibold hover:opacity-80 transition">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                )}
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;