import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import WhatsAndButton from '../Component/WhatsAndButton';

function About() {
  const [showMore, setShowMore] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleText = () => {
    setShowMore(!showMore);
  };

  // Function to toggle FAQ visibility
  const toggleFaq = (index) => {
    if (expandedFaq === index) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(index);
    }
  };

  const shortText = <p className='font-[Playfair Display] leading-relaxed'>"At our Classic Car sales website, we offer a curated selection of the finest classic cars that embody elegance and luxury. Whether you're looking to add a rare gem to your collection or wish to sell your own unique classic car, we provide a trustworthy and seamless experience."</p>;

  const fullText = <p className='font-[Playfair Display] leading-relaxed'>"At our Classic Car sales website, we offer a curated selection of the finest classic cars that embody elegance and luxury. Whether you're looking to add a rare gem to your collection or wish to sell your own unique classic car, we provide a trustworthy and seamless experience. Our team of experts ensures that each vehicle is of the highest quality, with a documented history and meticulous maintenance. Explore our diverse collection and start a new journey in the world of classic cars, where passion meets authenticity and timeless beauty. We pride ourselves on our commitment to quality, authenticity, and customer satisfaction. Each car in our inventory undergoes a rigorous inspection process to ensure it meets our high standards. Our knowledgeable staff is always ready to assist you in finding the perfect classic car that matches your preferences and requirements."</p>;

  // FAQ Data
  const faqData = [
    {
      question: "What documentation do I need to sell my classic car?",
      answer: "To sell your classic car through our platform, you'll need to provide the original title, maintenance records, restoration documentation (if applicable), and verification of the vehicle identification number (VIN). Our team will guide you through the process to ensure all paperwork is complete and accurate."
    },
    {
      question: "Do you offer financing options for classic car purchases?",
      answer: "Yes, we partner with specialized classic car financing institutions that understand the unique value of vintage automobiles. We can arrange flexible payment plans with competitive interest rates, specifically designed for collector vehicles. Contact us for more details about financing options tailored to your situation."
    },
    {
      question: "How do you verify the authenticity and condition of your classic cars?",
      answer: "Each vehicle in our inventory undergoes a comprehensive 150-point inspection by certified classic car specialists. We verify matching numbers, authenticate original parts, and thoroughly document the car's history. We also provide detailed condition reports with professional photography and, when available, include original documentation and provenance records."
    },
    {
      question: "Can you help source a specific classic car model that's not in your inventory?",
      answer: "Absolutely! Our extensive network of collectors, dealers, and enthusiasts allows us to locate rare and specific models. Simply provide us with details of your dream classic car, and our acquisition team will begin a personalized search. We've successfully sourced some of the rarest vehicles for our clients worldwide."
    },
    {
      question: "What shipping options are available for international buyers?",
      answer: "We offer door-to-door enclosed transport services worldwide. Our logistics team handles all shipping details, including customs documentation, insurance during transit, and any necessary temporary import permits. We work with specialized classic car shipping companies that understand the unique requirements of vintage vehicles."
    }
  ];

  return (
    <>
      {/* Hero Section with Improved Overlay */}
      <div className="bg-gray-600 bg-opacity-60 bg-blend-overlay bg-center bg-cover py-20 md:py-32 mt-18"
        style={{ backgroundImage: 'url("https://images.pexels.com/photos/13575247/pexels-photo-13575247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}>
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="font-[Playfair Display] text-5xl md:text-6xl font-bold mb-6 drop-shadow-xl">About Us</h1>
          <p className="font-[Playfair Display] text-xl md:text-2xl max-w-3xl mx-auto drop-shadow-md">"Whether you're searching for your dream classic car or ready to sell, we're here to make your journey effortless and memorable."</p>
        </div>
      </div>

      {/* About Section with Better Layout */}
      <section className="py-16 md:py-24 relative bg-white dark:bg-[#2d2d2e]">
        <div className="container max-w-6xl px-4 mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Image */}
            <div className="order-2 lg:order-1">
              <div className="flex items-center justify-center p-4">
                <div className="relative w-120 h-120 overflow-hidden rounded-full shadow-xl">
                  <img
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    src="https://images.pexels.com/photos/15240800/pexels-photo-15240800/free-photo-of-green-old-fashioned-volkswagen-with-sunroof.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Classic Green Car"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Right Column: Text */}
            <div className="order-1 lg:order-2">
              <div className="p-6 md:p-8 rounded-xl shadow-lg border border-yellow-400 dark:border-yellow-600">
                <h2 className="font-[Playfair Display] text-3xl md:text-4xl text-gray-800 dark:text-gray-200 font-bold mb-6">
                  We are Petal Haven S.C.
                </h2>
                <div className="mt-4 text-gray-700 dark:text-gray-300 text-lg">
                  {showMore ? fullText : shortText}
                </div>
                <button
                  onClick={toggleText}
                  className="mt-8 px-6 py-3 bg-yellow-600 rounded-md text-lg text-white font-medium hover:bg-yellow-700 transition-colors duration-300 flex items-center justify-center gap-2">
                  {showMore ? "Read Less" : "Read More"}
                  {showMore ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <div className="py-16 w-full bg-gray-100 dark:bg-[#222224]">
        <div className="container mx-auto px-4">
          <h2 className="font-[Playfair Display] text-3xl md:text-4xl text-center text-gray-900 dark:text-yellow-500 font-bold mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="mb-6 border border-gray-200 rounded-lg shadow-md dark:border-yellow-700/40">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex justify-between items-center bg-white dark:bg-[#2d2d2e] rounded-lg hover:bg-gray-50 dark:hover:bg-[#3a3a3c] transition-colors">
                  <h3 className="font-[Playfair Display] text-xl font-semibold text-left text-gray-800 dark:text-gray-200">
                    {faq.question}
                  </h3>
                  {expandedFaq === index ?
                    <ChevronUp className="h-5 w-5 text-yellow-500 flex-shrink-0" /> :
                    <ChevronDown className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                  }
                </button>
                {expandedFaq === index && (
                  <div className="px-6 py-4 bg-white dark:bg-[#2d2d2e] rounded-b-lg border-t border-gray-100 dark:border-gray-700">
                    <p className="font-[Playfair Display] text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <WhatsAndButton />
    </>
  );
}

export default About;