import React, { useState, useEffect, useContext } from 'react';
import { Star, X } from 'lucide-react';
import axios from 'axios';
import Swal from "sweetalert2";
import { AuthContext } from '../context/AuthContext'; 

function Testimonials() {
    const [formData, setFormData] = useState({ message: "", rating: 5 });
    const [success, setSuccess] = useState(false);
    const [testimonials, setTestimonials] = useState([]);
    const [isHovering, setIsHovering] = useState(null);
    const [user, setUser] = useState(null);

   
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            if (!token) return;
    
            try {
                const res = await axios.get('http://localhost:5000/api/users/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(res.data);
            } catch (err) {
                console.error("Error fetching user", err);
            }
        };
    
        fetchUser();
        fetchTestimonials();
    }, []);
    
    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const response = await axios.get("/api/testimonials");
            setTestimonials(response.data);
        } catch (error) {
            console.error("Error fetching testimonials", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const dataToSend = {
                ...formData,
                name: user?.name,
                image: user?.image || null,
            };
            console.log("dataToSend", dataToSend);


            await axios.post("/api/testimonials/add", dataToSend);
            

            setFormData({ message: "", rating: 5 });
            fetchTestimonials();

            await Swal.fire({
                title: 'Thank you!',
                text: 'Your testimonial has been submitted successfully.',
                icon: 'success',
                confirmButtonText: 'OK',
                timer: 9000,
                timerProgressBar: true,
                background: '#1f2937',
                iconColor: '#10b981',
                color: '#ffffff',
                confirmButtonColor: '#3b82f6'
            });

        } catch (error) {
            console.error("Error submitting testimonial", error.response?.data || error.message);
            Swal.fire({
                title: 'Error!',
                text: 'There was a problem submitting your testimonial.',
                icon: 'error',
                confirmButtonText: 'OK',
                background: '#1f2937',
                iconColor: '#ef4444',
                color: '#ffffff',
                confirmButtonColor: '#3b82f6'
            });
        }
    };

    const handleStarClick = (rating) => {
        setFormData({ ...formData, rating });
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to delete your testimonial?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (!result.isConfirmed) return;

        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            await axios.delete(`/api/testimonials/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            await Swal.fire("Deleted!", "Your testimonial has been deleted.", "success");
            fetchTestimonials();
        } catch (error) {
            console.error("Error deleting testimonial", error);
            Swal.fire("Error", "There was a problem deleting your testimonial.", "error");
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-[#2d2d2e] min-h-screen py-15">
            <section className="max-w-3xl mx-auto dark:bg-[#4a4a48] rounded-xl shadow-lg mb-12 overflow-hidden">
                <div className="p-8">
                    <h2 className="text-3xl font-bold mb-6 text-center dark:text-white">Leave Your Feedback</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Your Message
                            </label>
                            <textarea
                                id="message"
                                placeholder="Tell us about your experience..."
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                required
                                className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-200 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition dark:bg-[#5e5e5e] dark:text-white"
                                rows={4}
                            ></textarea>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Rating</label>
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => handleStarClick(star)}
                                        onMouseEnter={() => setIsHovering(star)}
                                        onMouseLeave={() => setIsHovering(null)}
                                        className="focus:outline-none transition-transform hover:scale-110"
                                    >
                                        <Star
                                            size={28}
                                            fill={(isHovering !== null ? star <= isHovering : star <= formData.rating) ? "#FBBF24" : "none"}
                                            color={(isHovering !== null ? star <= isHovering : star <= formData.rating) ? "#FBBF24" : "#CBD5E0"}
                                        />
                                    </button>
                                ))}
                                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">({formData.rating}/5)</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1"
                        >
                            Submit Feedback
                        </button>

                        {success && (
                            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded" role="alert">
                                <p className="font-medium">Thank you for your feedback!</p>
                                <p>Your testimonial has been submitted successfully.</p>
                            </div>
                        )}
                    </form>
                </div>
            </section>

            <section className="py-12 px-4">
                <h2 className="text-3xl text-center font-bold mb-12 text-gray-800 dark:text-white">
                    What Our Customers Say
                </h2>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                    {testimonials
                        .sort((a, b) => b.rating - a.rating)
                        .slice(0, 6)
                        .map((testimonial) => (
                            <div
                                key={testimonial._id}
                                className="relative bg-white dark:bg-[#4a4a48] p-6 rounded-xl shadow-lg transition-transform hover:shadow-xl hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
                            >
                                {testimonial.name === user?.name && (
                                    <button
                                        onClick={() => handleDelete(testimonial._id)}
                                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 "
                                        title="Delete"
                                    >
                                        <X size={18} />
                                    </button>
                                )}

                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        {testimonial.image ? (
                                            <img
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                className="w-10 h-10 rounded-full object-cover border border-gray-300"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500 text-white font-bold text-lg uppercase">
                                                {testimonial.name.charAt(0)}
                                            </div>
                                        )}
                                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                                            {testimonial.name}
                                        </h3>
                                    </div>

                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={18}
                                                fill={i < testimonial.rating ? "#FBBF24" : "none"}
                                                color={i < testimonial.rating ? "#FBBF24" : "#CBD5E0"}
                                                className="ml-1"
                                            />
                                        ))}
                                    </div>
                                </div>

                                <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.message}"</p>
                            </div>
                        ))}
                </div>
            </section>
        </div>
    );
}

export default Testimonials;