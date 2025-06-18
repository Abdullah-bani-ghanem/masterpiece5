import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ContactsManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyMap, setReplyMap] = useState({}); // For storing temporary replies

  const fetchContacts = async () => {
    try {
      const res = await axios.get('/api/contacts');
      setContacts(res.data);
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const deleteContact = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',       // Red
      cancelButtonColor: '#3085d6',     // Blue
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel'
    });
  
    if (!result.isConfirmed) return;
  
    try {
      await axios.delete(`/api/contacts/${id}`);
      setContacts((prev) => prev.filter(c => c._id !== id));
  
      await Swal.fire({
        title: 'Deleted!',
        text: 'The message has been deleted.',
        icon: 'success',
        confirmButtonColor: '#38a169' // Green
      });
    } catch (err) {
      console.error('Error deleting contact:', err);
  
      await Swal.fire({
        title: 'Error!',
        text: 'Failed to delete the message. Please try again.',
        icon: 'error',
        confirmButtonColor: '#e3342f'
      });
    }
  };

  const handleReplyChange = (id, value) => {
    setReplyMap({ ...replyMap, [id]: value });
  };

  const sendReply = async (id) => {
    const reply = replyMap[id];
    if (!reply) return alert('Please write a reply first');
    
    try {
      await axios.put(`/api/contacts/${id}/reply`, { reply });
      fetchContacts(); // Reload data after sending reply
      // Clear the reply from the map
      const newReplyMap = {...replyMap};
      delete newReplyMap[id];
      setReplyMap(newReplyMap);
    } catch (err) {
      console.error('Error sending reply:', err);
      alert('Failed to send reply. Please try again.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 border-b pb-4">Contact Messages Management</h1>
      </header>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-gray-300 h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      ) : contacts.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <p className="text-gray-600 text-lg">No messages available at this time.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {contacts.map((contact) => (
            <div key={contact._id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{contact.name}</h2>
                  <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">{contact.email}</a>
                </div>
                <span className="text-sm text-gray-500">{new Date(contact.createdAt).toLocaleString()}</span>
              </div>
              
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <p className="text-gray-700">{contact.message}</p>
              </div>

              {contact.reply ? (
                <div className="mt-4 p-4 bg-green-50 rounded-md border-l-4 border-green-500">
                  <h3 className="font-medium text-green-700">Your Reply</h3>
                  <p className="text-gray-700 mt-1">{contact.reply}</p>
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  <h3 className="font-medium text-gray-700">Send a Reply</h3>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    rows="3"
                    placeholder="Type your reply here..."
                    value={replyMap[contact._id] || ''}
                    onChange={(e) => handleReplyChange(contact._id, e.target.value)}
                  />
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition-colors duration-200 flex items-center"
                    onClick={() => sendReply(contact._id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Send Reply
                  </button>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                <button
                  className="flex items-center text-red-600 hover:text-red-800 font-medium transition-colors duration-200"
                  onClick={() => deleteContact(contact._id)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete Message
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactsManagement;