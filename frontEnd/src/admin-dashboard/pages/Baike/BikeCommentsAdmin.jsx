import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const BikeCommentsAdmin = () => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/bikeComments/admin/reported", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(res.data);
    } catch (err) {
      console.error("Failed to fetch bike comments", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#10B981',
      confirmButtonText: 'Yes, delete it!'
    });

    if (confirmed.isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`/api/bikeComments/admin/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire('Deleted!', 'The comment has been deleted.', 'success');
        fetchComments();
      } catch (error) {
        console.error("Error deleting comment:", error);
        Swal.fire('Error', 'Failed to delete comment', 'error');
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Bike Comments</h1>

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-6 text-left">User</th>
              <th className="py-3 px-6 text-left">Comment</th>
              <th className="py-3 px-6 text-left">Created At</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment) => (
              <tr key={comment._id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-6">{comment.userId?.name || 'Anonymous'}</td>
                <td className="py-4 px-6">{comment.comment}</td>
                <td className="py-4 px-6">{new Date(comment.createdAt).toLocaleDateString()}</td>
                <td className="py-4 px-6 flex justify-center space-x-2">
                  <button
                    onClick={() => handleDelete(comment._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {comments.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No comments available.
          </div>
        )}
      </div>
    </div>
  );
};

export default BikeCommentsAdmin;
