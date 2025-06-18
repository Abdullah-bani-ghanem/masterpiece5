import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    
    // للبحث والتصفح الصفحي
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [usersPerPage] = useState(5);
    const [filteredUsers, setFilteredUsers] = useState([]);
    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("/api/users", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsers(res.data);
                setFilteredUsers(res.data);
                setTotalPages(Math.ceil(res.data.length / usersPerPage));
            } catch (err) {
                setError("Failed to load users");
                toast.error('Failed to load users', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [usersPerPage]);
    
    // تصفية المستخدمين عند البحث
    useEffect(() => {
        const results = users.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.phoneNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.role.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        setFilteredUsers(results);
        setTotalPages(Math.ceil(results.length / usersPerPage));
        setCurrentPage(1); // العودة للصفحة الأولى عند البحث
    }, [searchTerm, users, usersPerPage]);

    const handleDeleteClick = (id) => {
        setUserToDelete(id);
        setShowConfirmDialog(true);
    };

    const confirmDelete = async () => {
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
          await axios.delete(`/api/users/${userToDelete}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
      
          setUsers((prev) => prev.filter((user) => user._id !== userToDelete));
          setFilteredUsers((prev) => prev.filter((user) => user._id !== userToDelete));
      
          await Swal.fire({
            title: "Deleted!",
            text: "User has been deleted successfully.",
            icon: "success",
            confirmButtonColor: "#38a169", // green
          });
        } catch (err) {
          console.error("Delete failed:", err);
          await Swal.fire({
            title: "Error!",
            text: "Failed to delete user.",
            icon: "error",
            confirmButtonColor: "#e3342f", // red
          });
        } finally {
          setShowConfirmDialog(false);
          setUserToDelete(null);
        }
      };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // محتوى الصفحة الحالية
    const currentUsers = filteredUsers.slice(
        (currentPage - 1) * usersPerPage,
        currentPage * usersPerPage
    );

    const ConfirmationDialog = () => {
        if (!showConfirmDialog) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-20 backdrop-blur-sm">
                <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl border border-gray-100">
                    <div className="text-center mb-6">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-50 border-2 border-red-100">
                            <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mt-4">Confirm Deletion</h3>
                        <p className="text-gray-500 mt-2">Are you sure you want to delete this user? This action cannot be undone.</p>
                    </div>

                    <div className="flex flex-row-reverse justify-center mt-6 gap-4">
                        <button
                            onClick={confirmDelete}
                            className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 font-medium shadow-sm flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete User
                        </button>
                        <button
                            onClick={() => setShowConfirmDialog(false)}
                            className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-300 font-medium"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const RoleTag = ({ role }) => {
        let classes = "px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ";
        
        switch (role) {
            case 'admin':
                classes += "bg-purple-100 text-purple-800 border border-purple-200";
                break;
            case 'editor':
                classes += "bg-blue-100 text-blue-800 border border-blue-200";
                break;
            default:
                classes += "bg-green-100 text-green-800 border border-green-200";
        }
        
        return <span className={classes}>{role}</span>;
    };

    // مكون التصفح الصفحي
    const Pagination = () => {
        if (totalPages <= 1) return null;

        const pageNumbers = [];
        const maxPagesToShow = 5;
        
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = startPage + maxPagesToShow - 1;
        
        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        
        return (
            <div className="flex items-center justify-center space-x-1 mt-6">
                <button
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 rounded-lg border ${
                        currentPage === 1 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200' 
                            : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200'
                    }`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                
                {startPage > 1 && (
                    <>
                        <button 
                            onClick={() => handlePageChange(1)} 
                            className="px-3 py-2 bg-white text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200"
                        >
                            1
                        </button>
                        {startPage > 2 && (
                            <span className="px-3 py-2 text-gray-500">...</span>
                        )}
                    </>
                )}
                
                {pageNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => handlePageChange(number)}
                        className={`px-3 py-2 rounded-lg border ${
                            currentPage === number
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200'
                        }`}
                    >
                        {number}
                    </button>
                ))}
                
                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - 1 && (
                            <span className="px-3 py-2 text-gray-500">...</span>
                        )}
                        <button 
                            onClick={() => handlePageChange(totalPages)} 
                            className="px-3 py-2 bg-white text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200"
                        >
                            {totalPages}
                        </button>
                    </>
                )}
                
                <button
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 rounded-lg border ${
                        currentPage === totalPages 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200' 
                            : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200'
                    }`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        );
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <ToastContainer />
            <ConfirmationDialog />
            <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100">
                <div className="p-1">
                    <div className="flex justify-between items-center mb-8 border-b pb-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">Manage Users</h1>
                                <p className="text-gray-500 text-sm">View, add, edit or delete system users</p>
                            </div>
                        </div>
                        <Link
                            to="/admin-dashboard/users/new"
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center gap-2 font-medium shadow-md"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <span>Add New User</span>
                        </Link>
                    </div>

                    {/* قسم البحث */}
                    <div className="mb-6">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search for a user (name, email, phone, role)"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                                dir="lft"
                            />
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-16">
                            <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-blue-600"></div>
                            <p className="ml-4 text-gray-600 font-medium">Loading users...</p>
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 border-l-4 border-red-600 p-5 rounded-lg">
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <p className="text-red-600 font-medium">{error}</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="w-full rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                            <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                            <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                            <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {currentUsers.map((user, index) => (
                                            <tr key={user._id} className="hover:bg-gray-100 transition-colors">
                                                <td className="py-4 px-6 whitespace-nowrap text-gray-500 font-medium">
                                                    #{(currentPage - 1) * usersPerPage + index + 1}
                                                </td>
                                                <td className="py-4 px-6 whitespace-nowrap">
                                                    <p className="font-medium text-gray-800">{user.name}</p>
                                                </td>
                                                <td className="py-4 px-6 whitespace-nowrap text-gray-600">
                                                    <div className="flex items-center">
                                                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                        </svg>
                                                        {user.email}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 whitespace-nowrap text-gray-600">
                                                    <div className="flex items-center">
                                                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                        </svg>
                                                        {user.phoneNumber}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 whitespace-nowrap">
                                                    <RoleTag role={user.role} />
                                                </td>
                                                <td className="py-4 px-6 whitespace-nowrap">
                                                    <div className="flex space-x-3">
                                                        <Link
                                                            to={`/admin-dashboard/users/edit/${user._id}`}
                                                            className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2 border border-blue-100"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                            <span>Edit</span>
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDeleteClick(user._id)}
                                                            className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2 border border-red-100"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                            <span>Delete</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {currentUsers.length === 0 && (
                                            <tr>
                                                <td colSpan="6" className="py-10 text-center">
                                                    <div className="flex flex-col items-center justify-center text-gray-500">
                                                        <div className="bg-gray-100 p-6 rounded-full mb-4">
                                                            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                                                            </svg>
                                                        </div>
                                                        <p className="text-xl font-medium mb-2">
                                                     
                                                        </p>
                                                        <p className="text-gray-400">
                                                           
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            
                            {/* عرض معلومات عن الصفحات */}
                            {filteredUsers.length > 0 && (
                                <div className="mt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
                                    <div>
                                    show{(currentPage - 1) * usersPerPage + 1} to{Math.min(currentPage * usersPerPage, filteredUsers.length)} 
                                    from {filteredUsers.length} user
                                    </div>
                                    <Pagination />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;