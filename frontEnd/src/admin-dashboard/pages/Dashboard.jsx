import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Car, Clock, CheckCircle, XCircle, AlertTriangle, Calendar, User, Tag } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });
  const [recentCars, setRecentCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/cars/all", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const cars = res.data;

        // Stats calculation
        const total = cars.length;
        const approved = cars.filter(c => c.status === "approved").length;
        const pending = cars.filter(c => c.status === "pending").length;
        const rejected = cars.filter(c => c.status === "rejected").length;

        setStats({ total, approved, pending, rejected });
        
        // Get the 5 most recent cars
        const sortedCars = [...cars].sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        ).slice(0, 5);
        
        setRecentCars(sortedCars);
      } catch (err) {
        console.error("Failed to load data:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Data for charts
  const chartData = [
    { name: "Approved", value: stats.approved, color: "#10B981" },
    { name: "Pending", value: stats.pending, color: "#F59E0B" },
    { name: "Rejected", value: stats.rejected, color: "#EF4444" }
  ];

  // Status badge component
  const StatusBadge = ({ status }) => {
    const badges = {
      approved: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      rejected: "bg-red-100 text-red-800 border-red-200"
    };
    
    const icons = {
      approved: <CheckCircle size={14} className="mr-1" />,
      pending: <Clock size={14} className="mr-1" />,
      rejected: <XCircle size={14} className="mr-1" />
    };
    
    return (
      <span className={`flex items-center px-2 py-1 text-xs font-medium rounded-full border ${badges[status]}`}>
        {icons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Format date function
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">Admin Dashboard</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-600">Loading statistics...</div>
          </div>
        ) : (
          <>

          
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 transition-all hover:shadow-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-700">All Cars</h2>
                    <p className="text-3xl font-bold text-blue-600 mt-2">{stats.total}</p>
                  </div>
                  <Car size={36} className="text-blue-400" />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500 transition-all hover:shadow-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-700">Approved</h2>
                    <p className="text-3xl font-bold text-green-600 mt-2">{stats.approved}</p>
                  </div>
                  <CheckCircle size={36} className="text-green-400" />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500 transition-all hover:shadow-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-700">Pending</h2>
                    <p className="text-3xl font-bold text-yellow-500 mt-2">{stats.pending}</p>
                  </div>
                  <Clock size={36} className="text-yellow-400" />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500 transition-all hover:shadow-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-700">Rejected</h2>
                    <p className="text-3xl font-bold text-red-600 mt-2">{stats.rejected}</p>
                  </div>
                  <XCircle size={36} className="text-red-400" />
                </div>
              </div>
            </div>
            



            {/* Data Visualization */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-10">
              <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-3">Vehicle Status Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Chart */}
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} cars`, 'Count']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Status Summary */}
                <div className="flex flex-col justify-center">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">Status Summary</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-gray-700">Approved: </span>
                        <span className="ml-2 font-medium">{stats.approved} cars ({stats.total ? ((stats.approved / stats.total) * 100).toFixed(1) : 0}%)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                        <span className="text-gray-700">Pending: </span>
                        <span className="ml-2 font-medium">{stats.pending} cars ({stats.total ? ((stats.pending / stats.total) * 100).toFixed(1) : 0}%)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                        <span className="text-gray-700">Rejected: </span>
                        <span className="ml-2 font-medium">{stats.rejected} cars ({stats.total ? ((stats.rejected / stats.total) * 100).toFixed(1) : 0}%)</span>
                      </div>
                    </div>
                  </div>
                  
                  {stats.pending > 0 && (
                    <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-md">
                      <div className="flex">
                        <AlertTriangle className="text-yellow-400 mr-2" size={20} />
                        <p className="text-sm text-yellow-700">You have {stats.pending} cars pending review.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Recent Cars Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6 border-b pb-3">
                <h2 className="text-xl font-bold text-gray-800">Recently Added Cars</h2>
              </div>
              
              {recentCars.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  No cars have been added yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Car Details
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Owner
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentCars.map((car, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center">
                                <Car size={20} className="text-gray-500" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {car.make} {car.model}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {car.year} • {car.licensePlate}
                                </div>
                              </div>
                            </div>
                          </td>
                          
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Calendar size={14} className="text-gray-400 mr-1" />
                              <div className="text-sm text-gray-500">{formatDate(car.createdAt)}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap w-auto">
                            <StatusBadge status={car.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;