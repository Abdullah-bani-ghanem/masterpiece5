import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaArrowUp, FaSearch, FaFilter, FaComments, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';
import WhatsAndButton from '../../Component/WhatsAndButton';

function Bikes() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'bot', message: 'Hello! How can I help you with finding your perfect bike today?' }
  ]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 5000], // Max price range for bikes
    type: '',
    brand: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // إرسال التوكن مع الطلب
    const fetchBikes = async () => {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');

        // التأكد من وجود التوكن
        if (!token) {
          console.error('No token found, please log in!');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/bikes/approved-bikes');
        // console.log(response.data)

        // setBikes(response.data); // تعيين البيانات المسترجعة
        setSearchResults(response.data); // Initialize search results with all bikes
        setLoading(false); // إيقاف حالة التحميل
      } catch (error) {
        console.error('Error fetching bikes:', error);
        setLoading(false); // إيقاف حالة التحميل في حالة الخطأ
      }
    };

    fetchBikes();
  }, []);

  // Listen for scroll to show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced search effect - runs whenever searchQuery or filters change
  useEffect(() => {
    if (bikes.length === 0) return; // Skip if no data loaded yet

    setIsSearching(true);

    // Debounce search for better performance
    const searchTimeout = setTimeout(() => {
      const filteredResults = performSearch(bikes, searchQuery, filters);
      setSearchResults(filteredResults);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [searchQuery, filters, bikes]);

  // Enhanced search function that searches all bike properties
  const performSearch = (bikesArray, query, filterSettings) => {
    const searchLower = query.toLowerCase().trim();

    return bikesArray.filter(bike => {
      // Check filters first
      const priceNum = parseInt(bike.price);
      const matchesFilters = (
        priceNum >= filterSettings.priceRange[0] &&
        priceNum <= filterSettings.priceRange[1] &&
        (filterSettings.type === '' || bike.type?.toLowerCase().includes(filterSettings.type.toLowerCase())) &&
        (filterSettings.brand === '' || bike.brand?.toLowerCase().includes(filterSettings.brand.toLowerCase()))
      );

      // If no search query, just return filter results
      if (searchLower === '') return matchesFilters;

      // Enhanced search across all bike properties
      const matchesSearch =
        bike.name?.toLowerCase().includes(searchLower) ||
        bike.brand?.toLowerCase().includes(searchLower) ||
        bike.type?.toLowerCase().includes(searchLower) ||
        bike.description?.toLowerCase().includes(searchLower) ||
        bike.price?.toString().includes(searchLower);

      return matchesFilters && matchesSearch;
    });
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Handle chatbot message submit
  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (chatMessage.trim() === '') return;

    // Add user message to chat history
    setChatHistory([...chatHistory, { sender: 'user', message: chatMessage }]);

    // Simulate bot response (in a real app, this would call an API)
    setTimeout(() => {
      let botResponse;
      const msg = chatMessage.toLowerCase();

      // Custom responses for bike-related questions
      if (msg.includes('price') || msg.includes('cost')) {
        botResponse = "Our bikes range from $500 to $5000 depending on the type, brand, and features. Do you have a specific budget in mind?";
      } else if (msg.includes('test ride') || msg.includes('see')) {
        botResponse = "We offer private viewings and test rides by appointment. Would you like me to schedule one for you?";
      } else if (msg.includes('financing') || msg.includes('loan')) {
        botResponse = "We offer specialized bike financing options with competitive rates. I can connect you with our finance team if you're interested.";
      } else {
        botResponse = "Thanks for your message! One of our bike specialists will get back to you shortly. Is there anything specific you'd like to know about our bike collection?";
      }

      setChatHistory(prev => [...prev, { sender: 'bot', message: botResponse }]);
    }, 1000);

    setChatMessage('');
  };

  // Handle search input change with immediate feedback
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Search is already handled by the useEffect
  };

  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  // Toggle filter panel
  const toggleFilterPanel = () => {
    setFilterOpen(!filterOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b dark:bg-[#2d2d2e] text-white relative mt-18">
      {/* Header Section with Improved Hero */}
      <div className="bg-black bg-opacity-70 py-12 px-4 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('../img/hero-bg.jpg')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="font-[Playfair Display] text-5xl font-bold mb-6 tracking-wide text-center bg-clip-text text-transparent bg-gradient-to-r dark:bg-[#FBBF24]">
            Bike Collection
          </h1>
          <p className="font-[Playfair Display] text-2xl text-center max-w-3xl mx-auto mb-8 text-gray-100 font-light">
            Discover Your Perfect Bike — Ride in Style, Unmatched Performance!
          </p>

          {/* Enhanced Search Bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search by type, brand, name..."
              className="w-full py-3 px-6 rounded-full bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 dark:bg-white text-black"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button type="submit" className="absolute right-3 top-3 ">
              <FaSearch className="text-black" size={20} />
            </button>
          </form>
        </div>




        {/* Quick Stats */}
        <div className="flex justify-center mt-8 space-x-8">
          <div className="text-center">
            <p className="font-[Playfair Display] text-3xl font-bold text-[#FBBF24]">25+</p>
            <p className="font-[Playfair Display] text-gray-300">Unique Models</p>
          </div>
          <div className="text-center">
            <p className="font-[Playfair Display] text-3xl font-bold text-[#FBBF24]">100%</p>
            <p className="font-[Playfair Display] text-gray-300">Verified History</p>
          </div>
          <div className="text-center">
            <p className="font-[Playfair Display] text-3xl font-bold text-[#FBBF24]">30-Day</p>
            <p className="font-[Playfair Display] text-gray-300">Guarantee</p>
          </div>
        </div>
      </div>




      {/* Centered Available Bikes Title */}
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center mb-8">
        <p className="font-[Playfair Display] text-5xl text-[#FBBF24] font-semibold text-center">
          <strong>Available Bikes</strong>
        </p>
        {!loading && (
          <p className="font-[Playfair Display] text-center text-gray-300 mt-2">
            {searchResults.length === 0 ?
              "No cars match your search" :
              `Showing ${searchResults.length} ${searchResults.length === 1 ? 'Bike' : 'Bikes'}`
            }
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 mb-20">
        <div className="mb-8 flex justify-end">
          <Link to="/add-bike" className="mt-4 md:mt-0">
            <button className="dark:bg-[#FBBF24]  hover:bg-yellow-600 text-white py-3 px-6 rounded-lg transition-colors duration-300 font-medium flex items-center">
              <span className="mr-2">Add a car for sale</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </button>
          </Link>
        </div>

        {/* Loading State */}
        {loading || isSearching ? (
          <div className="font-[Playfair Display] flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 dark:bg-[#FBBF24]"></div>
          </div>
        ) : searchResults.length === 0 ? (
          <div className="font-[Playfair Display] text-center py-16">
            <h3 className="text-2xl font-bold text-gray-400 mb-2">No Bikes Found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="font-[Playfair Display] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

            {searchResults.map((bike) => (
              <div
                key={bike._id}
                className="rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 border border-gray-700 group mb-3"
                style={{
                  boxShadow: "0px 1px 7px rgba(251, 191, 36, 0.5), -1px 0px 7px rgba(251, 191, 36, 0.3), 1px 0px 7px rgba(251, 191, 36, 0.3)"
                }}
              >

                <img
                  src={`http://localhost:5000/${bike.images[0]}`}
                  alt={bike.name}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-[#FBBF24]">{bike.name}</h3>
                  <p className="text-gray-300 mb-2">{bike.type}</p>
                  <p className="text-gray-300 mb-4">{bike.brand}</p>
                  <p className="text-gray-300 mb-4 line-clamp-2">{bike.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-[#FBBF24] font-semibold">${bike.price}</span>
                    
                    <Link to={`/bike-details/${bike._id}`}>
                      <button className="dark:bg-[#FBBF24]  hover:bg-yellow-600 text-white py-2 px-4 rounded-lg transition-colors duration-300 font-medium">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>



      <WhatsAndButton />


    </div>
  );
}

export default Bikes;
