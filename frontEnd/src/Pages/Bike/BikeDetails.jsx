import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Calendar, Star, Truck, Activity, Clock, Shield, User, MessageSquare } from 'lucide-react';
import Swal from 'sweetalert2';


const BikeDetails = () => {
    const { id } = useParams();
    const [bike, setBike] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedComment, setEditedComment] = useState('');
    const [isWishlisted, setIsWishlisted] = useState(false);


    const fetchComments = async () => {
        if (!id) {
            console.error("Bike ID is missing.");
            return;
        }

        try {
            const res = await axios.get(`http://localhost:5000/api/bikeComments/${id}`);
            setComments(res.data);
            // console.log(res.data);
        } catch (err) {
            console.error("Error loading comments:", err);
        }
    };
      

    useEffect(() => {
        fetchComments();
    }, [id]);

    useEffect(() => {
        const fetchBikeDetails = async () => {
            try {
                const token = localStorage.getItem('token') || sessionStorage.getItem('token');
                const res = await axios.get(`http://localhost:5000/api/bikes/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setBike(res.data);
            } catch (err) {
                console.error("Error loading bike details:", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchBikeDetails();
        }
    }, [id]);

   
      
    

    const handleAddToWishlist = async () => {
        try {
          const token = localStorage.getItem('token') || sessionStorage.getItem('token');
          if (!token) {
            Swal.fire({
              icon: 'warning',
              title: 'Not Logged In',
              text: 'You need to log in to add items to your wishlist.',
            });
            return;
          }
      
          const newItem = {
            type: "motorcycle",
            name: bike.name,
            model: bike.model,
            year: bike.year,
            imageUrl: `http://localhost:5000/${bike.images[0]}`,
            bikeId: bike._id,
          };
      
          await axios.post('http://localhost:5000/api/wishlist', newItem, {
            headers: {
              Authorization: `Bearer ${token}`
            },
            withCredentials: true
          });
      
          setIsWishlisted(true); // ✅ هنا يتم إخفاء الزر
      
          Swal.fire({
            icon: 'success',
            title: 'Added!',
            text: `${bike.name} has been added to your wishlist.`,
            confirmButtonColor: '#10B981',
          });
      
        } catch (err) {
          console.error("Failed to add to wishlist:", err);
          Swal.fire({
            icon: 'error',
            title: '',
            text: 'you Added to wishlist.',
          });
        }
      };
      


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="text-center">
                    <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-gold border-r-transparent align-middle"></div>
                    <p className="mt-4 text-gold text-xl font-serif">Loading your bike...</p>
                </div>
            </div>
        );
    }

    if (!bike) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="text-amber-300 text-xl font-serif">
                    Please log in
                </div>
            </div>
        );
    }

    const handleAddComment = async () => {
        if (comment.trim() === '') return;

        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            const response = await axios.post(
                `http://localhost:5000/api/bikeComments/${id}`,
                { comment },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );


            // setComments([response.data, ...comments]);
            await fetchComments();
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
            confirmButtonColor: '#d33',     // Red
            cancelButtonColor: '#3085d6',   // Blue
            confirmButtonText: 'Yes, delete it',
            cancelButtonText: 'Cancel'
        });

        if (!result.isConfirmed) return;

        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');

            await axios.delete(`http://localhost:5000/api/bikeComments/delete/${commentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Remove the deleted comment from the state
            setComments(comments.filter((comment) => comment._id !== commentId));

            Swal.fire({
                title: 'Deleted!',
                text: 'Comment deleted successfully',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } catch (err) {
            console.error("Error deleting comment:", err);

            Swal.fire({
                title: 'Error!',
                text: 'An error occurred while deleting the comment',
                icon: 'error',
                confirmButtonText: 'OK'
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
            text: "Do you want to save changes to this comment?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#38a169',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, save it',
            cancelButtonText: 'Cancel'
        });

        if (!result.isConfirmed) return;

        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            const response = await axios.put(
                `http://localhost:5000/api/bikeComments/update/${editingCommentId}`,
                { comment: editedComment },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Update comment locally
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


    const handleReportComment = async (commentId) => {
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            await axios.patch(`http://localhost:5000/api/bikeComments/report/${commentId}`, {}, {
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


    const handleImageChange = (index) => {
        setActiveImage(index);
    };

    const formatPrice = (price) => {
        return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 'On Request';
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="bg-gradient-to-b dark:bg-[#2d2d2e] pt-12 pb-20">
            <div className="max-w-6xl mx-auto px-20 mt-15">
                {/* Vehicle Title Section */}
                <div className="mb-12 text-center">
                    <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#FBBF24] mb-4">
                        {bike.name}
                    </h1>
                    <div className="flex items-center justify-center mb-6">
                        <div className="h-px w-20 bg-[#FBBF24]"></div>
                        <div className="h-px w-20 bg-[#FBBF24]"></div>
                    </div>
                </div>

                {/* Main Content Wrapper */}
                <div className="dark:bg-[#373738] rounded-xl overflow-hidden shadow-2xl border border-gray-800">
                    {/* Image Gallery Section */}
                    <div className="relative">
                        <div className="bg-gray-800 overflow-hidden">
                            {bike.images && bike.images.length > 0 ? (
                                <img
                                    src={`http://localhost:5000/${bike.images[0]}`}
                                    alt={bike.name}
                                    className="w-full h-112 object-cover"
                                />
                            ) : (
                                <div className="w-full h-112 bg-gray-800 flex items-center justify-center">
                                    <span className="text-gray-400 font-serif">No image available</span>
                                </div>
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>

                            {/* Price Badge */}
                            <div className="absolute top-6 right-6 bg-black bg-opacity-80 text-[#FBBF24] px-6 py-3 rounded-full backdrop-blur-sm border border-amber-300/30">
                                <span className="text-sm uppercase tracking-wider mr-2">Price</span>
                                <span className="text-2xl font-serif font-bold">${formatPrice(bike.price)}</span>
                            </div>
                        </div>

                        {!isWishlisted && (
                            <button
                                onClick={handleAddToWishlist}
                                className="absolute bottom-6 right-6 dark:bg-[#FBBF24] hover:bg-yellow-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg transition-all duration-300"
                            >
                                Add to Wishlist
                            </button>
                        )}


                        {bike.images && bike.images.length > 1 && (
                            <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 px-6">
                                <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg p-2 flex space-x-2 border border-gray-700">
                                    {bike.images.map((image, index) => (
                                        <div
                                            key={index}
                                            className={`cursor-pointer rounded-md overflow-hidden ${activeImage === index ? 'ring-2 ring-[#FBBF24]' : 'opacity-60 hover:opacity-100'
                                                } transition duration-300`}
                                            onClick={() => handleImageChange(index)}
                                        >
                                            <img
                                                src={`http://localhost:5000/uploads/${image}`}
                                                alt={`${bike.name} view ${index + 1}`}
                                                className="w-16 h-12 object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Bike Details Content */}
                    <div className="p-8 md:p-12">
                        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-12">
                            <div className="text-center">
                                <div className="flex justify-center">
                                    <Calendar size={24} className="text-[#FBBF24] mb-2" />
                                </div>
                                <div className="text-gray-400 text-xs uppercase mb-1">Year</div>
                                <div className="text-white font-medium">{bike.year}</div>
                            </div>

                            <div className="text-center">
                                <div className="flex justify-center">
                                    <Star size={24} className="text-[#FBBF24] mb-2" />
                                </div>
                                <div className="text-gray-400 text-xs uppercase mb-1">Brand</div>
                                <div className="text-white font-medium">{bike.brand}</div>
                            </div>

                            <div className="text-center">
                                <div className="flex justify-center">
                                    <Truck size={24} className="text-[#FBBF24] mb-2" />
                                </div>
                                <div className="text-gray-400 text-xs uppercase mb-1">Model</div>
                                <div className="text-white font-medium">{bike.model}</div>
                            </div>

                            <div className="text-center">
                                <div className="flex justify-center">
                                    <Activity size={24} className="text-[#FBBF24] mb-2" />
                                </div>
                                <div className="text-gray-400 text-xs uppercase mb-1">Condition</div>
                                <div className="text-white font-medium">{bike.condition === 'new' ? 'New' : 'Used'}</div>
                            </div>

                            <div className="text-center">
                                <div className="flex justify-center">
                                    <Clock size={24} className="text-[#FBBF24] mb-2" />
                                </div>
                                <div className="text-gray-400 text-xs uppercase mb-1">Listing Date</div>
                                <div className="text-white font-medium">{formatDate(bike.createdAt)}</div>
                            </div>
                        </div>

                        {/* Bike Schema Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">


                            {/* Left Column */}
                            <div>
                                <h2 className="text-2xl font-serif text-[#FBBF24] mb-6 flex items-center">
                                    <span className="inline-block w-8 h-px bg-[#FBBF24] mr-3"></span>
                                    Bike Details
                                </h2>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center border-b border-gray-500 pb-3">
                                        <span className="text-gray-300">Name</span>
                                        <span className="text-white font-medium">{bike.name}</span>
                                    </div>

                                    <div className="flex justify-between items-center border-b border-gray-500 pb-3">
                                        <span className="text-gray-300">Brand</span>
                                        <span className="text-white font-medium">{bike.brand}</span>
                                    </div>

                                    <div className="flex justify-between items-center border-b border-gray-500 pb-3">
                                        <span className="text-gray-300">Model</span>
                                        <span className="text-white font-medium">{bike.model}</span>
                                    </div>

                                    <div className="flex justify-between items-center border-b border-gray-500 pb-3">
                                        <span className="text-gray-300">Year</span>
                                        <span className="text-white font-medium">{bike.year}</span>
                                    </div>

                                    <div className="flex justify-between items-center border-b border-gray-500 pb-3">
                                        <span className="text-gray-300">Price</span>
                                        <span className="text-white font-medium">${formatPrice(bike.price)}</span>
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
                                        <span className="text-white font-medium">{bike.condition === 'new' ? 'New' : 'Used'}</span>
                                    </div>

                                    <div className="flex justify-between items-center border-b border-gray-500 pb-3">
                                        <span className="text-gray-300">Request Status</span>
                                        <span className={`font-medium ${bike.status === 'approved' ? 'text-[#FBBF24]' :
                                            bike.status === 'rejected' ? 'text-red-400' : 'text-[#FBBF24]'
                                            }`}>
                                            {bike.status === 'approved' ? 'Approved' :
                                                bike.status === 'rejected' ? 'Rejected' : 'Pending Review'}
                                        </span>
                                    </div>

                                    {bike.adminNote && (
                                        <div className="flex justify-between items-center border-b border-gray-500 pb-3">
                                            <span className="text-gray-300">Admin Notes</span>
                                            <span className="text-white font-medium">{bike.adminNote}</span>
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center border-b border-gray-500 pb-3">
                                        <span className="text-gray-300">Listing Date</span>
                                        <span className="text-white font-medium">{formatDate(bike.createdAt)}</span>
                                    </div>

                                    <div className="flex justify-between items-center border-b border-gray-500 pb-3">
                                        <span className="text-gray-300">Last Updated</span>
                                        <span className="text-white font-medium">{formatDate(bike.updatedAt)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description Section */}
                        {bike.description && (
                            <div className="mb-12">
                                <h2 className="text-2xl font-serif text-[#FBBF24] mb-6 flex items-center">
                                    <span className="inline-block w-8 h-px bg-[#FBBF24] mr-3"></span>
                                    Vehicle Description
                                </h2>
                                <div className="dark:bg-[#2d2d2e] bg-opacity-50 rounded-lg p-6 border border-gray-700">
                                    <p className="text-gray-300 leading-relaxed">{bike.description}</p>
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
                                                        {comment.createdAt ? formatDate(comment.createdAt) : 'Just now'}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* التعليق النصي */}

                                            {editingCommentId === comment._id ? (
                                                <div className="flex flex-col mb-4">
                                                    <textarea
                                                        value={editedComment}
                                                        onChange={(e) => setEditedComment(e.target.value)}
                                                        className="w-full h-24 p-3 text-white dark:bg-[#39393a] border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FBBF24]"
                                                    ></textarea>
                                                    <div className="flex justify-end space-x-2 mt-2">
                                                        <button
                                                            onClick={handleUpdateComment}
                                                            className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 px-4 rounded-md"
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setEditingCommentId(null);
                                                                setEditedComment('');
                                                            }}
                                                            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md"
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
                                                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-6 rounded-md"
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


                                {/* Footer Branding */}
                                <div className=" text-center">
                                    <div className="text-[#FBBF24] uppercase tracking-widest text-sm font-light mb-2">LUXURY AUTOMOTIVE GROUP</div>
                                    <div className="text-gray-400 text-sm mb-2">© {new Date().getFullYear()} Luxury Motors. All rights reserved.</div>
                                </div>


                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default BikeDetails;
