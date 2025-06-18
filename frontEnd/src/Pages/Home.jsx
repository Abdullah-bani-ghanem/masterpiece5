import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import axios from 'axios';
import SliderCar from '../Component/SliderCar';
import SliderBik from '../Component/SliderBik';
import Mapp from '../Component/Map';
import WhatsAndButton from '../Component/WhatsAndButton';
import Serves from '../Component/Serves';
import Testimonials from '../Component/Testimonials';

function Home() {
  const [userCount, setUserCount] = useState(0);
  const [approvedCarCount, setApprovedCarCount] = useState(0);
  const [approvedBikeCount, setApprovedBikeCount] = useState(0);
  const [featuredCarss, setFeaturedCarss] = useState([]);
  const [featuredBikes, setFeaturedBikes] = useState([]);

  //عداد للدراجات والسيارات واليوزر
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (!token) {
          console.error("No token found!");
          return;
        }

        // جلب عدد الدراجات المعتمدة
        const approvedBikeRes = await axios.get("/api/bikes/approved-bikes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApprovedBikeCount(approvedBikeRes.data.length); // نحسب الطول مباشرة لأن الـ API بترجع فقط الدراجات المعتمدة

        // جلب عدد المستخدمين المسجلين
        const userCountRes = await axios.get("/api/counter/user-count", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserCount(userCountRes.data.length); // تعيين عدد المستخدمين في ال state

        // جلب عدد السيارات المعتمدة
        const approvedCarRes = await axios.get("/api/counter/approved-car-count", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const approvedCars = approvedCarRes.data.filter(c => c.status === "approved");
        setApprovedCarCount(approvedCars.length); // تعيين عدد السيارات المعتمدة في ال state

      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData(); // استدعاء الدالة لتحميل البيانات
  }, []);


  useEffect(() => {
    const fetchFeaturedData = async () => {
      try {
        const [carsRes, bikesRes] = await Promise.all([
          axios.get("http://localhost:5000/api/cars/latest-approved"),//بتجيب اول ثلاث سيارات
          axios.get("http://localhost:5000/api/bikes/latest-approved"),//بتجيب اول ثلاث دراجات
        ]);

        setFeaturedCarss(carsRes.data);
        setFeaturedBikes(bikesRes.data);
      } catch (error) {
        console.error("Error loading featured data:", error);
      }
    };
    fetchFeaturedData();
  }, []);

  return (

    <div className="bg-gray-50 dark:bg-[#2d2d2e] mt-18">

      {/* Hero Section with Enhanced CTA */}
      <div className="relative h-screen ">
        <div className="absolute inset-0 z-10 "></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center w-full max-w-4xl px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-[Playfair Display] text-[#FBBF24]  font-cursive  md:text-7xl lg:text-6xl  mb-50">
            Driven By Drivers
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-[Playfair Display] text-[#FBBF24] text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Experience the golden age of automotive excellence with our curated collection of timeless classics
          </motion.p>
          <a href="/cars" className="inline-flex justify-center bg-[#FBBF24]  items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-2 focus:ring-primary-300 dark:focus:ring-primary-900">
            Learn more
            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </a>
        </div>
        <>
          <section className="relative h-screen flex flex-col items-center justify-center text-center text-white ">
            <div className="video-docker absolute top-0 left-0 w-full h-[39rem] overflow-hidden">
              <video
                className="min-w-full min-h-full absolute object-cover "
                src="/classicCar.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </section>
          <style
            dangerouslySetInnerHTML={{
              __html:
                '\n    .video-docker video {\n        top: 50%;\n        left: 50%;\n        transform: translate(-50%, -50%);\n    }\n\n    .video-docker::after {\n        content: "";\n        position: absolute;\n        width: 100%;\n        height: 100%;\n        top: 0;\n        left: 0;\n        background: rgba(0, 0, 0, 0.6);\n        z-index: 1;\n    }\n'
            }}
          />
        </>
      </div>

      {/* Welcome Section with Animation */}
      <div className="">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center  px-4 max-w-4xl mx-auto"
        >
                                                                    {/* //dark:text-white */}
          <h2 className="font-[Playfair Display] text-4xl font-cursive font-bold mb-6 text-white ">Welcome to Classic</h2>
          <p className="font-[Playfair Display] text-xl font-cursive mb-6 leading-relaxed text-white">
            "Are you a fan of classic cars? Here at Classic, we offer a curated selection of original classic cars that combine luxury and history. Browse our collection of unique vehicles and enjoy an exceptional buying experience. Every car has a story, discover the story that sets you apart." 🚗✨
          </p>
          <div className="flex justify-center gap-8 mt-10">
            <div className="text-center">
              <div className="font-[Playfair Display] text-[#FBBF24] text-5xl font-bold mb-2">{userCount}+</div>
              <div className="font-[Playfair Display] text-gray-600 dark:text-gray-400">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="font-[Playfair Display] text-[#FBBF24] text-5xl font-bold mb-2">{approvedCarCount}+</div>
              <div className="font-[Playfair Display] text-gray-600 dark:text-gray-400">Classic Cars</div>
            </div>
            <div className="text-center">
              <div className="font-[Playfair Display] text-[#FBBF24] text-5xl font-bold mb-2">{approvedBikeCount}+</div>
              <div className="font-[Playfair Display] text-gray-600 dark:text-gray-400">Classic Bikes</div>
            </div>
          </div>
        </motion.div>
      </div>


      {/* Featured cars Section */}

      <div className="py-8 px-4 max-w-7xl mx-auto">
        <div className="relative mb-12">
          <h2 className="font-[Playfair Display] text-5xl font-bold dark:text-white text-center">
            Featured Listings
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCarss.map((car, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-[#2d2d2e] rounded-xl overflow-hidden shadow-lg  shadow-yellow-500 "
            >
              <div className="relative">
                <img
                  src={`http://localhost:5000/uploads/${car.images?.[0]}`}
                  alt={car.name}
                  className="w-full h-64 object-cover"
                />

                <div className="font-[Playfair Display] absolute top-3 right-3 dark:bg-[#FBBF24] text-white py-1 px-3 rounded-full text-sm font-semibold">
                  Featured
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 dark:text-white">{car.name}</h3>
                <p className="text-2xl text-[#FBBF24] font-bold mb-4">{car.price}</p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Calendar size={18} className="mr-2" />
                    <span>{car.year}</span>
                  </div>
                </div>
                <Link to={`/car-details/${car._id}`}>
                  <button className="font-[Playfair Display] block w-full dark:bg-[#FBBF24] hover:bg-yellow-600 text-white text-center py-3 rounded-lg font-semibold transition">
                    View Details
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <SliderCar />

      {/* Featured Bikes Section */}
      <div className="py-8 px-4 max-w-7xl mx-auto">
        <div className="relative mb-12">
          <h2 className="font-[Playfair Display] text-5xl font-bold dark:text-white text-center">
            Featured Bikes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBikes.map((bike) => (
            <motion.div
              key={bike._id}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-[#2d2d2e] rounded-xl overflow-hidden shadow-lg shadow-yellow-500"
            >
              <div className="relative">
                <img
                  src={`http://localhost:5000/${bike.images?.[0]}`}
                  alt={bike.name}
                  className="w-full h-64 object-cover"
                />
                <div className="font-[Playfair Display] absolute top-3 right-3 dark:bg-[#FBBF24] text-white py-1 px-3 rounded-full text-sm font-semibold">
                  Featured
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 dark:text-white">{bike.name}</h3>
                <p className="text-gray-300 mb-2">{bike.type}</p>
                <p className="text-gray-300 mb-4">{bike.brand}</p>
                <p className="text-2xl text-[#FBBF24] font-bold mb-4">${bike.price}</p>
                <Link to={`/bike-details/${bike._id}`}>
                  <button className="font-[Playfair Display] block w-full dark:bg-[#FBBF24] hover:bg-yellow-600 text-white text-center py-3 rounded-lg font-semibold transition">
                    View Details
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <SliderBik />

      <Serves />
      
      <Testimonials/>

      <Mapp />

      <WhatsAndButton />


    </div>
  );
}

export default Home;