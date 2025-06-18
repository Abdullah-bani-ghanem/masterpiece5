import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaArrowUp, FaSearch, FaFilter, FaComments, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';
import WhatsAndButton from '../../Component/WhatsAndButton';

function Cars() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'bot', message: 'Hello! How can I help you with finding your perfect classic car today?' }
  ]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000000], // Increased max price
    year: '',
    make: '',
    model: '',
  });
  // Enhanced search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from API
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cars/approved-cars/1');
        // console.log(response.data);  // تحقق من استجابة الخادم
        setCars(response.data);
        setSearchResults(response.data); // Initialize search results with all cars
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cars:', error);
        setLoading(false);
      }
    };

    fetchCars();
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
    if (cars.length === 0) return; // Skip if no data loaded yet

    setIsSearching(true);

    // Debounce search for better performance
    const searchTimeout = setTimeout(() => {
      const filteredResults = performSearch(cars, searchQuery, filters);

      setSearchResults(filteredResults);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [searchQuery, filters, cars]);

  // Enhanced search function that searches all car properties
  const performSearch = (carsArray, query, filterSettings) => {
    const searchLower = query.toLowerCase().trim();

    return carsArray.filter(car => {
      // Check filters first
      const priceNum = parseInt(car.price);
      const matchesFilters = (
        priceNum >= filterSettings.priceRange[0] &&
        priceNum <= filterSettings.priceRange[1] &&
        (filterSettings.year === '' || car.year.toString().includes(filterSettings.year)) &&
        (filterSettings.make === '' || car.make.toLowerCase().includes(filterSettings.make.toLowerCase())) &&
        (filterSettings.model === '' || car.model.toLowerCase().includes(filterSettings.model.toLowerCase()))
      );

      // If no search query, just return filter results
      if (searchLower === '') return matchesFilters;

      // Enhanced search across all car properties
      const matchesSearch =
        car.make?.toLowerCase().includes(searchLower) ||
        car.model?.toLowerCase().includes(searchLower) ||
        car.year?.toString().includes(searchLower) ||
        car.name?.toLowerCase().includes(searchLower) ||
        car.title?.toLowerCase().includes(searchLower) ||
        car.description?.toLowerCase().includes(searchLower) ||
        car.color?.toLowerCase().includes(searchLower) ||
        car.engine?.toLowerCase().includes(searchLower) ||
        car.transmission?.toLowerCase().includes(searchLower) ||
        car.price?.toString().includes(searchLower);

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

      if (msg.includes('price') || msg.includes('cost')) {
        botResponse = "Our classic cars range from $30,000 to $150,000 depending on make, model, and condition. Is there a specific budget you have in mind?";
      } else if (msg.includes('test drive') || msg.includes('see')) {
        botResponse = "We offer private viewings and test drives by appointment. Would you like me to schedule one for you?";
      } else if (msg.includes('financing') || msg.includes('loan')) {
        botResponse = "We offer specialized classic car financing options with competitive rates. I can connect you with our finance team if you're interested.";
      } else {
        botResponse = "Thanks for your message! One of our classic car specialists will get back to you shortly. Is there anything specific you'd like to know about our collection?";
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
            Classic Cars Collection
          </h1>
          <p className="font-[Playfair Display] text-2xl text-center max-w-3xl mx-auto mb-8 text-gray-100 font-light">
            Discover Your Perfect Classic Car — Timeless Style, Unmatched Performance!
          </p>

          {/* Enhanced Search Bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search by make, model, year, color, engine type..."
              className="w-full py-3 px-6 rounded-full    focus:ring-2 dark:bg-white text-black"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button type="submit" className="absolute right-3 top-3 ">
              <FaSearch className="text-black" size={20} />
            </button>
          </form>




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
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Results Section Header - MODIFIED WITH ADD CAR BUTTON */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-center">
          <div className="w-full">
            <p className="font-[Playfair Display] text-5xl text-[#FBBF24] font-semibold text-center ml-55">
              Available Classic Cars
            </p>
            {/* Search results count */}
            {!loading && (
              <p className="font-[Playfair Display] text-center text-gray-300 mt-2 ml-55">
                {searchResults.length === 0 ?
                  "No cars match your search" :
                  `Showing ${searchResults.length} ${searchResults.length === 1 ? 'car' : 'cars'}`
                }
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            )}
          </div>

          {/* Add Car For Sale Button */}
          <Link to="/form" className="mt-4 md:mt-0">
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
          // No results found
          <div className="font-[Playfair Display] text-center py-16">
            <FaSearch size={48} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-400 mb-2">No Cars Found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 dark:bg-[#FBBF24]  hover:bg-yellow-600 text-white py-2 px-6 rounded-lg transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          /* Cars Grid with Improved Card Design */
          <div className="font-[Playfair Display] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-20 ">
            {searchResults.map((car, index) => (

              <div
                key={index}
                className="rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 shadow-lg border border-gray-700 group mb-3"
                style={{
                  boxShadow: "0px 1px 7px rgba(251, 191, 36, 0.5), -1px 0px 7px rgba(251, 191, 36, 0.3), 1px 0px 7px rgba(251, 191, 36, 0.3)",
                }}
              >
                <div className="relative">
                  <img
                    src={`http://localhost:5000/uploads/${car.images[0]}`}
                    alt={car.name}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-0 right-0 bg-[#FBBF24] text-white px-4 py-2 rounded-bl-lg font-bold text-lg shadow-md">
                    ${car.price}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-16"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-[#FBBF24]">{car.name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Year: {car.year}</span>
                    <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">{car.model}</span>
                  </div>

                  <p className="text-gray-300 mb-4 line-clamp-2">{car.description}</p>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="text-sm text-gray-400">Available</span>
                    </div>
                    <Link to={`/car-details/${car._id}`}>
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

export default Cars;
