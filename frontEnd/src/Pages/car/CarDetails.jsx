import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Calendar, Palette, Star, Truck, Info, DollarSign, MapPin, Activity, Clock, Shield, User, MessageSquare } from 'lucide-react';
import Swal from 'sweetalert2';

const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);
    const [showInquiryForm, setShowInquiryForm] = useState(false);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [editingCommentId, setEditingCommentId] = useState(null);  // To track the comment being edited
    const [editedComment, setEditedComment] = useState('');  // To store the edited comment
    const [isWishlisted, setIsWishlisted] = useState(false);

    const fetchComments = async () => {
        if (!id) {
            console.error("Car ID is missing.");
            return;
        }

        try {
            const res = await axios.get(`http://localhost:5000/api/comments/${id}`);
            setComments(res.data);
        } catch (err) {
            console.error("Error loading comments:", err);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [id]);

    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const token = localStorage.getItem('token') || sessionStorage.getItem('token');
                const res = await axios.get(`http://localhost:5000/api/cars/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setCar(res.data);
            } catch (err) {
                console.error("Error loading car details:", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCarDetails();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="text-center">
                    <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-gold border-r-transparent align-middle"></div>
                    <p className="mt-4 text-gold text-xl font-serif">Loading your exclusive vehicle...</p>
                </div>
            </div>
        );
    }

    if (!car) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="text-amber-300 text-xl font-serif">
                    Please log in
                </div>
            </div>
        );
    }



    
const handleAddToWishlist = async () => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (!token) {
        Swal.fire({
          icon: 'warning',
          title: 'Not Logged In',
          text: 'Please login to add to wishlist.',
        });
        return;
      }
  
      await axios.post(
        'http://localhost:5000/api/wishlist',
        {
          type: 'car',
          carId: car._id,
          name: car.name,
          model: car.model,
          year: car.year,
          imageUrl: car.images.length > 0 ? `http://localhost:5000/uploads/${car.images[0]}` : '',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
  
      setIsWishlisted(true); // ✅ هنا نغلق الزر
  
      Swal.fire({
        icon: 'success',
        title: 'Added to Wishlist!',
        text: `${car.name} has been added to your wishlist.`,
        confirmButtonText: 'OK',
      });
    } catch (err) {
      console.error('Error adding to wishlist:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: err.response?.data?.message || 'Failed to add the car to wishlist.',
        confirmButtonText: 'OK',
      });
    }
  };




    const handleAddComment = async () => {
        if (comment.trim() === '') return;

        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            const response = await axios.post(
                `http://localhost:5000/api/comments/${id}`,
                { comment },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Update comments after adding a new one
            await fetchComments();
            // setComments([response.data, ...comments]);
            setComment('');
        } catch (err) {
            console.error("Error adding comment:", err);
        }
    };



    const handleDeleteComment = async (commentId) => {
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: "Do you really want to delete this comment?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, delete it',
          cancelButtonText: 'Cancel'
        });
      
        if (!result.isConfirmed) return;
      
        try {
          const token = localStorage.getItem('token') || sessionStorage.getItem('token');
          await axios.delete(`http://localhost:5000/api/comments/${commentId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          setComments(comments.filter((comment) => comment._id !== commentId));
      
          Swal.fire({
            title: 'Deleted!',
            text: 'Comment deleted successfully',
            icon: 'success',
            confirmButtonColor: '#38a169'
          });
        } catch (err) {
          console.error("Error deleting comment:", err);
      
          Swal.fire({
            title: 'Error!',
            text: 'An error occurred while deleting the comment',
            icon: 'error',
            confirmButtonColor: '#e3342f'
          });
        }
      };
      




      const handleEditComment = (commentId, existingComment) => {
        setEditingCommentId(commentId);
        setEditedComment(existingComment);
      };
      

      const handleUpdateComment = async () => {
        if (editedComment.trim() === '') return;
    
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to save the changes to this comment?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#38a169', // green
            cancelButtonColor: '#d33',     // red
            confirmButtonText: 'Yes, save it',
            cancelButtonText: 'Cancel'
        });
    
        if (!result.isConfirmed) return;
    
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            const response = await axios.put(
                `http://localhost:5000/api/comments/${editingCommentId}`,
                { comment: editedComment },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            // Update the comment in UI
            setComments((prevComments) =>
                prevComments.map((comment) =>
                    comment._id === editingCommentId ? { ...comment, comment: response.data.comment } : comment
                )
            );
    
            setEditingCommentId(null);
            setEditedComment('');
    
            Swal.fire({
                title: 'Updated!',
                text: 'Comment updated successfully',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } catch (err) {
            console.error("Error updating comment:", err);
    
            Swal.fire({
                title: 'Error!',
                text: 'An error occurred while updating the comment',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };
    






    const handleImageChange = (index) => {
        setActiveImage(index);
    };

    const toggleInquiryForm = () => {
        setShowInquiryForm(!showInquiryForm);
    };

    // Format price with commas
    const formatPrice = (price) => {
        return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 'On Request';
    };

    // Format date to readable format
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Format relative time for comments
    const formatRelativeTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffSec = Math.round(diffMs / 1000);
        const diffMin = Math.round(diffSec / 60);
        const diffHr = Math.round(diffMin / 60);
        const diffDays = Math.round(diffHr / 24);

        if (diffSec < 60) return 'Just now';
        if (diffMin < 60) return `${diffMin} minute${diffMin !== 1 ? 's' : ''} ago`;
        if (diffHr < 24) return `${diffHr} hour${diffHr !== 1 ? 's' : ''} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;

        return formatDate(dateString);
    };





    const handleReportComment = async (commentId) => {
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
          await axios.patch(`http://localhost:5000/api/comments/report/${commentId}`, {}, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
      
          Swal.fire({
            icon: 'success',
            title: 'Comment Reported',
            text: 'Thank you for reporting. Our admin will review this comment.',
          });
      
        } catch (err) {
          console.error("Failed to report comment:", err);
          Swal.fire({
            icon: 'error',
            title: 'Report Failed',
            text: err.response?.data?.message || 'Something went wrong!',
          });
        }
      };
      

    return (
        <div className="bg-gradient-to-b dark:bg-[#2d2d2e] pt-12 pb-20 ">
            <div className="max-w-6xl mx-auto px-20 mt-15">
                {/* Vehicle Title Section */}
                <div className="mb-12 text-center">
                    <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#FBBF24] mb-4">
                        {car.name}
                    </h1>
                    <div className="flex items-center justify-center mb-6">
                        <div className="h-px w-20 dark:bg-[#FBBF24]"></div>
                        <div className="h-px w-20 dark:bg-[#FBBF24]"></div>
                    </div>
                </div>

                {/* Main Content Wrapper */}
                <div className="dark:bg-[#373738] rounded-xl overflow-hidden shadow-2xl border border-gray-800">
                    {/* Image Gallery Section */}
                    <div className="relative">
                        {/* Main Image */}
                        <div className="bg-gray-800 overflow-hidden">
                            {car.images && car.images.length > 0 ? (
                                <img
                                    src={`http://localhost:5000/uploads/${car.images[activeImage]}`}
                                    alt={car.name}
                                    className="w-full h-112 object-cover"
                                />
                            ) : (
                                <div className="w-full h-112 bg-gray-800 flex items-center justify-center">
                                    <span className="text-gray-400 font-serif">No image available</span>
                                </div>
                            )}

                            {/* Elegant Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>

                            {/* Price Badge */}
                            <div className="absolute top-6 right-6 bg-black bg-opacity-80 text-[#FBBF24] px-6 py-3 rounded-full backdrop-blur-sm border border-amber-300/30">
                                <span className="text-sm uppercase tracking-wider mr-2">Price</span>
                                <span className="text-2xl font-serif font-bold">${formatPrice(car.price)}</span>
                            </div>

                            {!isWishlisted && (
  <button
    onClick={handleAddToWishlist}
    className="absolute bottom-6 right-6 dark:bg-[#FBBF24] hover:bg-yellow-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg transition-all duration-300"
  >
    Add to Wishlist
  </button>
)}


                            {/* Status Badge */}
                            {/* {car.status && (
                                <div className="absolute top-6 left-6 bg-black bg-opacity-80 px-4 py-2 rounded-full backdrop-blur-sm border border-gray-700">
                                    <span className={`text-sm font-medium ${car.status === 'approved' ? 'text-green-400' :
                                        car.status === 'rejected' ? 'text-red-400' : 'text-green-400'
                                        }`}>
                                        {car.status === 'approved' ? 'Approved' :
                                            car.status === 'rejected' ? 'Rejected' : 'Pending Review'}
                                    </span>
                                </div>
                            )} */}
                        </div>

                        {/* Thumbnail Navigation */}
                        {car.images && car.images.length > 1 && (
                            <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 px-6">
                                <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg p-2 flex space-x-2 border border-gray-700">
                                    {car.images.map((image, index) => (
                                        <div
                                            key={index}
                                            className={`cursor-pointer rounded-md overflow-hidden ${activeImage === index ? 'ring-2 ring-[#FBBF24]' : 'opacity-60 hover:opacity-100'
                                                } transition duration-300`}
                                            onClick={() => handleImageChange(index)}
                                        >
                                            <img
                                                src={`http://localhost:5000/uploads/${image}`}
                                                alt={`${car.name} view ${index + 1}`}
                                                className="w-16 h-12 object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Vehicle Details Content */}
                    <div className="p-8 md:p-12">
                        {/* Key Features Banner */}
                        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-12">
                            <div className="text-center">
                                <div className="flex justify-center">
                                    <Calendar size={24} className="text-[#FBBF24] mb-2" />
                                </div>
                                <div className="text-gray-400 text-xs uppercase mb-1">Year</div>
                                <div className="text-white font-medium">{car.year}</div>
                            </div>

                            <div className="text-center">
                                <div className="flex justify-center">
                                    <Star size={24} className="text-[#FBBF24]  mb-2" />
                                </div>
                                <div className="text-gray-400 text-xs uppercase mb-1">Brand</div>
                                <div className="text-white font-medium">{car.brand}</div>
                            </div>

                            <div className="text-center">
                                <div className="flex justify-center">
                                    <Truck size={24} className="text-[#FBBF24]  mb-2" />
                                </div>
                                <div className="text-gray-400 text-xs uppercase mb-1">Model</div>
                                <div className="text-white font-medium">{car.model}</div>
                            </div>

                            <div className="text-center">
                                <div className="flex justify-center">
                                    <Activity size={24} className="text-[#FBBF24]  mb-2" />
                                </div>
                                <div className="text-gray-400 text-xs uppercase mb-1">Condition</div>
                                <div className="text-white font-medium">{car.condition === 'new' ? 'New' : 'Used'}</div>
                            </div>

                            <div className="text-center">
                                <div className="flex justify-center">
                                    <Clock size={24} className="text-[#FBBF24]  mb-2" />
                                </div>
                                <div className="text-gray-400 text-xs uppercase mb-1">Listing Date</div>
                                <div className="text-white font-medium">{formatDate(car.createdAt)}</div>
                            </div>
                        </div>

                        {/* Car Schema Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            {/* Left Column */}
                            <div>
                                <h2 className="text-2xl font-serif text-[#FBBF24] mb-6 flex items-center">
                                    <span className="inline-block w-8 h-px bg-[#FBBF24] mr-3"></span>
                                    Vehicle Details
                                </h2>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center border-b border-gray-500 pb-3">
                                        <span className="text-gray-300">Name</span>
                                        <span className="text-white font-medium">{car.name}</span>
                                    </div>

                                    <div className="flex justify-between items-center border-b border-gray-500 pb-3">
                                        <span className="text-gray-300">Brand</span>
                                        <span className="text-white font-medium">{car.brand}</span>
                                    </div>

                                    <div className="flex justify-between items-center border-b border-gray-500 pb-3">
                                        <span className="text-gray-300">Model</span>
                                        <span className="text-white font-medium">{car.model}</span>
                                    </div>

                                    <div className="flex justify-between items-center border-b border-gray-500 pb-3">
                                        <span className="text-gray-300">Year</span>
                                        <span className="text-white font-medium">{car.year}</span>
                                    </div>

                                    <div className="flex justify-between items-center border-b border-gray-500 pb-3">
                                        <span className="text-gray-300">Price</span>
                                        <span className="text-white font-medium">${formatPrice(car.price)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div>
                                <h2 className="text-2xl font-serif text-[#FBBF24] mb-6 flex items-center">
                                    <span className="inline-block w-8 h-px bg-[#FBBF24] mr-3"></span>
                                    Additional Information
                                </h2>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center border-b border-gray-500 pb-3">
                                        <span className="text-gray-300">Condition</span>
                                        <span className="text-white font-medium">{car.condition === 'new' ? 'New' : 'Used'}</span>
                                    </div>

                                    <div className="flex justify-between items-center border-b border-gray-500 pb-3">
                                        <span className="text-gray-300">Request Status</span>
                                        <span className={`font-medium ${car.status === 'approved' ? 'text-[#FBBF24]' :
                                            car.status === 'rejected' ? 'text-red-400' : 'text-[#FBBF24]'
                                            }`}>
                                            {car.status === 'approved' ? 'Approved' :
                                                car.status === 'rejected' ? 'Rejected' : 'Pending Review'}
                                        </span>
                                    </div>

                                    {car.adminNote && (
                                        <div className="flex justify-between items-center border-b border-gray-500 pb-3">
                                            <span className="text-gray-300">Admin Notes</span>
                                            <span className="text-white font-medium">{car.adminNote}</span>
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center border-b border-gray-500 pb-3">
                                        <span className="text-gray-300">Listing Date</span>
                                        <span className="text-white font-medium">{formatDate(car.createdAt)}</span>
                                    </div>

                                    <div className="flex justify-between items-center border-b border-gray-500 pb-3">
                                        <span className="text-gray-300">Last Updated</span>
                                        <span className="text-white font-medium">{formatDate(car.updatedAt)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description Section */}
                        {car.description && (
                            <div className="mb-12">
                                <h2 className="text-2xl font-serif text-[#FBBF24] mb-6 flex items-center">
                                    <span className="inline-block w-8 h-px bg-[#FBBF24] mr-3"></span>
                                    Vehicle Description
                                </h2>
                                <div className="dark:bg-[#2d2d2e] bg-opacity-50 rounded-lg p-6 border border-gray-700">
                                    <p className="text-gray-300 leading-relaxed">{car.description}</p>
                                </div>
                            </div>
                        )}

                        {/* Comments Section */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-serif text-[#FBBF24] mb-6 flex items-center">
                                <span className="inline-block w-8 h-px bg-[#FBBF24] mr-3"></span>
                                <MessageSquare size={20} className="text-[#FBBF24] mr-2" />
                                Comments
                            </h2>

                            {/* Add Comment Form */}
                            <div className="dark:bg-[#2d2d2e] bg-opacity-50 rounded-lg p-6 border border-gray-700 mb-6">
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Write your comment..."
                                    className="w-full h-20 p-4 text-white dark:bg-[#39393a] rounded-md border border-gray-600 focus:border-amber-300 focus:ring-1 focus:ring-amber-300 focus:outline-none transition duration-300 resize-none mb-4"
                                ></textarea>
                                <button
                                    onClick={handleAddComment}
                                    className="bg-[#FBBF24] hover:bg-amber-500 text-black font-medium py-2 px-6 rounded-md transition duration-300 flex items-center"
                                >
                                    <MessageSquare size={16} className="mr-2" />
                                    Add Comment
                                </button>
                            </div>

                            {/* Comments List */}
                            <div className="space-y-6">
                                {comments.length > 0 ? (
                                    comments.map((comment, index) => (

                                        <div key={index} className="dark:bg-[#2d2d2e] bg-opacity-50 rounded-lg p-5 border border-gray-700 hover:border-gray-600 transition duration-300">
                                            <div className="flex items-center mb-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-100 to-[#FBBF24] mr-3 flex items-center justify-center text-black font-bold text-sm">
                                                    {comment.userId && comment.userId.name ? comment.userId.name.charAt(0).toUpperCase() : 'U'}
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-medium">
                                                        {comment.userId && comment.userId.name ? comment.userId.name : 'Anonymous User'}
                                                    </h4>

                                                    <p className="text-gray-400 text-xs">
                                                        {comment.createdAt ? formatRelativeTime(comment.createdAt) : 'Just now'}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* هنا سيتم عرض التعليق */}
                                            {editingCommentId === comment._id ? (
                                                <div className="flex flex-col mb-4">
                                                    <textarea
                                                        value={editedComment}
                                                        onChange={(e) => setEditedComment(e.target.value)}
                                                        className="w-full h-24 p-3 text-white dark:bg-[#39393a] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                    ></textarea>
                                                    <div className="flex justify-end space-x-2 mt-2">
                                                        <button
                                                            onClick={handleUpdateComment}
                                                            className="dark:bg-[#FBBF24]  hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-md"
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setEditingCommentId(null);
                                                                setEditedComment('');
                                                            }}
                                                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p className="text-gray-300 pl-12">{comment.comment}</p>
                                            )}

                                            {/* أزرار الحذف والتعديل */}
                                            <div className="mt-3 flex justify-end space-x-2">
                                                <button
                                                    onClick={() => handleDeleteComment(comment._id)}
                                                    className="bg-red-800 hover:bg-red-900 text-white font-medium py-2 px-6 rounded-md"
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    onClick={() => handleEditComment(comment._id, comment.comment)}
                                                    className="bg-blue-800 hover:bg-blue-900 text-white font-medium py-2 px-6 rounded-md"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleReportComment(comment._id)}
                                                    className="bg-yellow-600 hover:bg-yellow-700 text-black font-medium py-2 px-6 rounded-md"
                                                >
                                                    Report
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className=" bg-opacity-30 rounded-lg p-8 border border-gray-700 text-center">
                                        <MessageSquare size={32} className="text-gray-500 mx-auto mb-3" />
                                        <p className="text-gray-400">No comments yet. Be the first to share your thoughts!</p>
                                    </div>
                                )}
                            </div>


                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-6 mb-8 mt-10">
                                <div className="text-center">
                                    <div className="mb-3 flex justify-center">
                                        <Shield size={32} className="text-[#FBBF24]" />
                                    </div>
                                    <h4 className="text-white text-sm font-medium mb-1">Premium Protection</h4>
                                    <p className="text-gray-400 text-xs">Comprehensive warranty included</p>
                                </div>
                                <div className="text-center">
                                    <div className="mb-3 flex justify-center">
                                        <Clock size={32} className="text-[#FBBF24]" />
                                    </div>
                                    <h4 className="text-white text-sm font-medium mb-1">24/7 Support</h4>
                                    <p className="text-gray-400 text-xs">Dedicated concierge service</p>
                                </div>
                                <div className="text-center">
                                    <div className="mb-3 flex justify-center">
                                        <User size={32} className="text-[#FBBF24]" />
                                    </div>
                                    <h4 className="text-white text-sm font-medium mb-1">Expert Consultation</h4>
                                    <p className="text-gray-400 text-xs">Personalized vehicle assistance</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Branding */}
                    <div className=" text-center">
                        <div className="text-[#FBBF24] uppercase tracking-widest text-sm font-light mb-2">LUXURY AUTOMOTIVE GROUP</div>
                        <div className="text-gray-400 text-sm mb-10">© {new Date().getFullYear()} Luxury Motors. All rights reserved.</div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CarDetails;