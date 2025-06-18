import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


export default function SliderCar() {
  const [carImages, setCarImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

 
  useEffect(() => {
    axios.get("http://localhost:5000/api/cars/latest-approvedd")
      .then((res) => {
        setCarImages(res.data);

      })
      .catch((err) => {
        console.error("Error fetching car images:", err);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carImages]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % carImages.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + carImages.length) % carImages.length);

  if (carImages.length === 0) return <p className="text-center">Loading...</p>;

  return (
    <>
      <br />
      <div className="relative max-w-3xl dark:bg-[#2d2d2e] mx-auto h-96 overflow-hidden rounded-2xl shadow-lg">
        <AnimatePresence mode="wait">
          <div onClick={() => navigate(`/car-details/${carImages[current]?.id}`)} className="cursor-pointer">
          <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-md text-sm font-semibold shadow">
              {carImages[current]?.price} $
            </div>
            <motion.img
              key={current}
              src={`http://localhost:5000/uploads/${carImages[current]?.image}`}//<Route path="/car-details/:id" element={<CarDetails />} />
              className="w-full h-96 object-cover"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </AnimatePresence>

        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
        >
          <ChevronRight />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {carImages.map((_, index) => (
            <span
              key={index}
              className={`h-2 w-2 rounded-full ${index === current ? "bg-white" : "bg-gray-400"}`}
            />
          ))}
        </div>
      </div>
      <br /><br /><br /><br /><br />
    </>
  );
}
