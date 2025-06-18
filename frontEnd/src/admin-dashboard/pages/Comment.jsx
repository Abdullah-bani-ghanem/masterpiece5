import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TrashIcon, RefreshCw, Search } from 'lucide-react';
import Swal from 'sweetalert2';

const CommentsManagement = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [commentsPerPage] = useState(5);

    // Fetch comments from the server
    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        setLoading(true);
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
        if (!token) {
            toast.error("You are not logged in.");
            setLoading(false);
            return;
        }
    
        try {
            const response = await fetch('http://localhost:5000/api/comments/admin/reported', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch comments');
            }
    
            const data = await response.json();
            setComments(data);
        } catch (err) {
            console.error('Error loading comments:', err);
            toast.error('Failed to load comments');
        } finally {
            setLoading(false);
        }
    };
    

    // Delete comment with SweetAlert confirmation
    const handleDelete = async (commentId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this comment!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            iconColor: '#d33'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
                    const response = await fetch(`http://localhost:5000/api/comments/${commentId}`, {
                        method: 'DELETE',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Failed to delete comment');
                    }

                    // Remove deleted comment from state
                    setComments(comments.filter(comment => comment._id !== commentId));

                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Comment has been deleted.',
                        icon: 'success',
                        confirmButtonColor: '#3085d6'
                    });
                } catch (err) {
                    console.error('Error deleting comment:', err);
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to delete comment.',
                        icon: 'error',
                        confirmButtonColor: '#3085d6'
                    });
                }
            }
        });
    };

    // Filter comments based on search term
    const filteredComments = comments.filter(comment => 
        (comment.comment && comment.comment.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (comment.userId?.name && comment.userId.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Get current comments for pagination
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = filteredComments.slice(indexOfFirstComment, indexOfLastComment);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Total number of pages
    const totalPages = Math.ceil(filteredComments.length / commentsPerPage);

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <ToastContainer position="top-right" />

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Comments Management</h1>
                    <button
                        onClick={fetchComments}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                    >
                        <RefreshCw size={18} /> Refresh
                    </button>
                </div>

                {/* Search Box */}
                <div className="mb-6 relative">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search for comment or username..."
                            className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1); // Reset to first page on search
                            }}
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                </div>

                <div className="w-full overflow-x-auto">
                    {loading ? (
                        <div className="flex justify-center items-center h-40">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                            <span className="ml-3 text-gray-700">Loading comments...</span>
                        </div>
                    ) : filteredComments.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            {searchTerm ? 'No search results found' : 'No comments to display'}
                        </div>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        #
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        User
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Comment
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentComments.map((comment, index) => (
                                    <tr key={comment._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <div className="text-sm font-medium text-gray-900">
                                                {indexOfFirstComment + index + 1}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {comment.userId?.name || 'Not available'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 max-w-md break-words">
                                                {comment.comment}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">
                                                {new Date(comment.createdAt).toLocaleString('en-US')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                                            <button
                                                onClick={() => handleDelete(comment._id)}
                                                className="text-red-600 hover:text-red-800 flex items-center gap-1 transition-colors duration-200"
                                            >
                                                <TrashIcon size={16} /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {/* Pagination */}
                    {!loading && filteredComments.length > 0 && (
                        <div className="mt-6 flex justify-center">
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <button
                                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                                        currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                                    }`}
                                >
                                    Previous
                                </button>
                                
                                {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                                    // Calculate page numbers to show
                                    let pageNum;
                                    if (totalPages <= 5 || currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }
                                    
                                    if (pageNum > totalPages) return null;
                                    
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => paginate(pageNum)}
                                            className={`relative inline-flex items-center px-4 py-2 border ${
                                                currentPage === pageNum
                                                    ? 'bg-blue-50 border-blue-500 text-blue-600 z-10'
                                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                            } text-sm font-medium`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                                
                                <button
                                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                                        currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                                    }`}
                                >
                                    Next
                                </button>
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommentsManagement;