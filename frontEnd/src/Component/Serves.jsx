import React from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Serves() {
    const services = [
        {
          icon: "⭐",
          title: "Highlight Listing",
          description: "Make your ad stand out and attract more buyers by featuring your classic vehicle prominently.",
        },
        {
          icon: "🎥",
          title: "Professional Photography",
          description: "Capture high-quality images that showcase the beauty of your classic car or motorcycle.",
        },
        {
          icon: "📚",
          title: "Classic Buying Tips",
          description: "A comprehensive guide to help you choose the right classic vehicle for your needs.",
        },
        {
          icon: "🛠️",
          title: "Pre-Purchase Inspection Reports",
          description: "Ensure quality and safety with a detailed inspection report.",
        },
      ];
  return (
    <div>
      
      {/* Services Section */}
      <div className="">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-[Playfair Display] text-5xl font-bold text-center mb-12 dark:text-white">Our Specialized Services</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-[#2d2d2e] rounded-xl p-6 shadow-lg shadow-yellow-500 text-center"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3 dark:text-white">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
              </motion.div>
            ))}

            {/* Centered Contact Us Section */}
            <div className="flex flex-col items-center justify-center  text-center h-full col-span-full">
              <p className="text-xl font-semibold mb-4 dark:text-white">
                Contact us if you'd like to use any of these services
              </p>
              <Link to="/contact">
                <button className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Serves
