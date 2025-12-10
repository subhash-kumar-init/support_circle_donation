import { API_BASE_URL } from '../api';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [donations, setDonations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/admin');
        } else {
            fetchDonations();
        }
    }, [navigate]);

    const fetchDonations = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/api/donations`);
            setDonations(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin');
    };

    const handleStatusUpdate = async (id, currentStatus) => {
        if (currentStatus === 'Completed') return;

        try {
            const res = await axios.put(`${API_BASE_URL}/api/donations/${id}/status`, { status: 'Completed' });

            // Update local state
            setDonations(donations.map(donation =>
                donation._id === id ? { ...donation, status: 'Completed' } : donation
            ));
        } catch (err) {
            console.error("Error updating status:", err);
            alert("Failed to update status");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-orange-500">Admin Dashboard</h1>
                    <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300">Logout</button>
                </div>

                <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-700 text-gray-300 uppercase text-sm leading-normal">
                                <th className="py-3 px-6">Name</th>
                                <th className="py-3 px-6">Mobile</th>
                                <th className="py-3 px-6">Category</th>
                                <th className="py-3 px-6">Details</th>
                                <th className="py-3 px-6">Address</th>
                                <th className="py-3 px-6">Message</th>
                                <th className="py-3 px-6">Status</th>
                                <th className="py-3 px-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-300 text-sm font-light">
                            {donations.map((donation) => (
                                <tr key={donation._id} className="border-b border-gray-700 hover:bg-gray-700 transition duration-150">
                                    <td className="py-3 px-6 whitespace-nowrap font-medium">{donation.name}</td>
                                    <td className="py-3 px-6">
                                        <div className="flex flex-col">
                                            <span>{donation.mobile}</span>
                                            <a href={`tel:${donation.mobile}`} className="text-orange-400 hover:text-orange-300 text-xs mt-1 font-bold">
                                                📞 Call Now
                                            </a>
                                        </div>
                                    </td>
                                    <td className="py-3 px-6">
                                        <span className="bg-orange-500/20 text-orange-500 py-1 px-3 rounded-full text-xs font-bold">
                                            {donation.category}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6">
                                        {donation.timingSlot && <span className="block text-xs text-gray-400">Time: {donation.timingSlot}</span>}
                                        {donation.gadgetType && <span className="block text-xs text-gray-400">Type: {donation.gadgetType}</span>}
                                    </td>
                                    <td className="py-3 px-6">{donation.address}</td>
                                    <td className="py-3 px-6 max-w-xs truncate" title={donation.message}>{donation.message}</td>
                                    <td className="py-3 px-6">
                                        <span className={`py-1 px-3 rounded-full text-xs font-bold ${donation.status === 'Completed'
                                                ? 'bg-green-500/20 text-green-500'
                                                : 'bg-yellow-500/20 text-yellow-500'
                                            }`}>
                                            {donation.status || 'Pending'}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6">
                                        {donation.status !== 'Completed' && (
                                            <button
                                                onClick={() => handleStatusUpdate(donation._id, donation.status)}
                                                className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded text-xs transition duration-300"
                                            >
                                                Mark Completed
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {donations.length === 0 && (
                        <div className="p-6 text-center text-gray-400">No donations found.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
