"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { adminAPI } from "@/lib/api";

interface Vendor {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  vendorType: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";
  createdAt: string;
  commissionRate: number;
  user: {
    phoneNumber: string;
    createdAt: string;
  };
  bankDetails: {
    accountNumber: string;
    bankName: string;
    accountHolder: string;
  };
}

interface User {
  id: string;
  phoneNumber: string;
  role: "ADMIN" | "VENDOR" | "CUSTOMER";
  isActive: boolean;
  createdAt: string;
  vendorProfile?: {
    businessName: string;
    status: string;
    vendorType: string;
  };
  adminProfile?: {
    fullName: string;
    email: string;
  };
}

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVendors: 0,
    pendingApplications: 0,
    activeVendors: 0,
  });

  const getAccessToken = () => localStorage.getItem("accessToken") || "";

  useEffect(() => {
    if (activeTab === "vendors") {
      fetchVendors();
    } else if (activeTab === "users") {
      fetchUsers();
    } else if (activeTab === "overview") {
      fetchStats();
    }
  }, [activeTab]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [vendorsRes, usersRes] = await Promise.all([
        adminAPI.getVendors(getAccessToken(), { limit: 1000 }),
        adminAPI.getUsers(getAccessToken(), { limit: 1000 }),
      ]);

      if (vendorsRes.success && usersRes.success) {
        const vendorsData = vendorsRes.data.vendors;
        const usersData = usersRes.data.users;

        setStats({
          totalUsers: usersData.length,
          totalVendors: vendorsData.length,
          pendingApplications: vendorsData.filter(
            (v: Vendor) => v.status === "PENDING"
          ).length,
          activeVendors: vendorsData.filter(
            (v: Vendor) => v.status === "APPROVED"
          ).length,
        });
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getVendors(getAccessToken());
      if (response.success) {
        setVendors(response.data.vendors);
      }
    } catch (error) {
      console.error("Failed to fetch vendors:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getUsers(getAccessToken());
      if (response.success) {
        setUsers(response.data.users);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVendorAction = async (
    vendorId: string,
    action: "approve" | "reject" | "suspend"
  ) => {
    try {
      let response;
      switch (action) {
        case "approve":
          response = await adminAPI.approveVendor(getAccessToken(), vendorId);
          break;
        case "reject":
          response = await adminAPI.rejectVendor(getAccessToken(), vendorId);
          break;
        case "suspend":
          response = await adminAPI.suspendVendor(getAccessToken(), vendorId);
          break;
      }

      if (response.success) {
        fetchVendors(); // Refresh the list
        alert(`Vendor ${action}d successfully!`);
      }
    } catch (error) {
      console.error(`Failed to ${action} vendor:`, error);
      alert(`Failed to ${action} vendor. Please try again.`);
    }
  };

  const handleUserStatusToggle = async (userId: string, isActive: boolean) => {
    try {
      const response = await adminAPI.toggleUserStatus(
        getAccessToken(),
        userId,
        !isActive
      );
      if (response.success) {
        fetchUsers(); // Refresh the list
        alert(`User ${!isActive ? "activated" : "deactivated"} successfully!`);
      }
    } catch (error) {
      console.error("Failed to toggle user status:", error);
      alert("Failed to update user status. Please try again.");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "APPROVED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      case "SUSPENDED":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-purple-100 text-purple-800";
      case "VENDOR":
        return "bg-blue-100 text-blue-800";
      case "CUSTOMER":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-white shadow-sm border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center py-6'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>
                Admin Dashboard
              </h1>
              <p className='text-gray-600 mt-1'>Welcome, {user?.phoneNumber}</p>
            </div>
            <button
              onClick={logout}
              className='bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors'
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className='bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <nav className='flex space-x-8'>
            {["overview", "vendors", "users"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {loading && (
          <div className='flex justify-center items-center py-12'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === "overview" && !loading && (
          <div className='space-y-6'>
            {/* Stats Grid */}
            <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'>
              <div className='bg-white overflow-hidden shadow-lg rounded-lg'>
                <div className='p-5'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                      <div className='w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center'>
                        <span className='text-white text-sm font-medium'>
                          👥
                        </span>
                      </div>
                    </div>
                    <div className='ml-5 w-0 flex-1'>
                      <dl>
                        <dt className='text-sm font-medium text-gray-500 truncate'>
                          Total Users
                        </dt>
                        <dd className='text-lg font-medium text-gray-900'>
                          {stats.totalUsers}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className='bg-white overflow-hidden shadow-lg rounded-lg'>
                <div className='p-5'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                      <div className='w-8 h-8 bg-green-500 rounded-md flex items-center justify-center'>
                        <span className='text-white text-sm font-medium'>
                          ✅
                        </span>
                      </div>
                    </div>
                    <div className='ml-5 w-0 flex-1'>
                      <dl>
                        <dt className='text-sm font-medium text-gray-500 truncate'>
                          Active Vendors
                        </dt>
                        <dd className='text-lg font-medium text-gray-900'>
                          {stats.activeVendors}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className='bg-white overflow-hidden shadow-lg rounded-lg'>
                <div className='p-5'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                      <div className='w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center'>
                        <span className='text-white text-sm font-medium'>
                          ⏳
                        </span>
                      </div>
                    </div>
                    <div className='ml-5 w-0 flex-1'>
                      <dl>
                        <dt className='text-sm font-medium text-gray-500 truncate'>
                          Pending Applications
                        </dt>
                        <dd className='text-lg font-medium text-gray-900'>
                          {stats.pendingApplications}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className='bg-white overflow-hidden shadow-lg rounded-lg'>
                <div className='p-5'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                      <div className='w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center'>
                        <span className='text-white text-sm font-medium'>
                          🏪
                        </span>
                      </div>
                    </div>
                    <div className='ml-5 w-0 flex-1'>
                      <dl>
                        <dt className='text-sm font-medium text-gray-500 truncate'>
                          Total Vendors
                        </dt>
                        <dd className='text-lg font-medium text-gray-900'>
                          {stats.totalVendors}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className='bg-white shadow-lg rounded-lg'>
              <div className='px-4 py-5 sm:p-6'>
                <h3 className='text-lg leading-6 font-medium text-gray-900 mb-4'>
                  Quick Actions
                </h3>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                  <button
                    onClick={() => setActiveTab("vendors")}
                    className='bg-blue-50 hover:bg-blue-100 p-4 rounded-lg text-left transition-colors border border-blue-200'
                  >
                    <h4 className='font-medium text-blue-900'>
                      Manage Vendors
                    </h4>
                    <p className='text-sm text-blue-700 mt-1'>
                      Approve or reject vendor applications
                    </p>
                  </button>

                  <button
                    onClick={() => setActiveTab("users")}
                    className='bg-green-50 hover:bg-green-100 p-4 rounded-lg text-left transition-colors border border-green-200'
                  >
                    <h4 className='font-medium text-green-900'>Manage Users</h4>
                    <p className='text-sm text-green-700 mt-1'>
                      View and manage user accounts
                    </p>
                  </button>

                  <button className='bg-purple-50 hover:bg-purple-100 p-4 rounded-lg text-left transition-colors border border-purple-200'>
                    <h4 className='font-medium text-purple-900'>Analytics</h4>
                    <p className='text-sm text-purple-700 mt-1'>
                      View platform performance metrics
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Vendors Tab */}
        {activeTab === "vendors" && !loading && (
          <div className='space-y-6'>
            <div className='bg-white shadow-lg rounded-lg'>
              <div className='px-4 py-5 sm:p-6'>
                <h3 className='text-lg leading-6 font-medium text-gray-900 mb-4'>
                  Vendor Management
                </h3>
                <div className='overflow-x-auto'>
                  <table className='min-w-full divide-y divide-gray-200'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Business
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Owner
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Type
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Status
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Phone
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Applied
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                      {vendors.map((vendor) => (
                        <tr key={vendor.id} className='hover:bg-gray-50'>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='text-sm font-medium text-gray-900'>
                              {vendor.businessName}
                            </div>
                            <div className='text-sm text-gray-500'>
                              {vendor.email}
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                            {vendor.ownerName}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                            {vendor.vendorType}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                vendor.status
                              )}`}
                            >
                              {vendor.status}
                            </span>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                            {vendor.user.phoneNumber}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                            {new Date(vendor.createdAt).toLocaleDateString()}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2'>
                            {vendor.status === "PENDING" && (
                              <>
                                <button
                                  onClick={() =>
                                    handleVendorAction(vendor.id, "approve")
                                  }
                                  className='text-green-600 hover:text-green-900 bg-green-100 px-2 py-1 rounded'
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() =>
                                    handleVendorAction(vendor.id, "reject")
                                  }
                                  className='text-red-600 hover:text-red-900 bg-red-100 px-2 py-1 rounded'
                                >
                                  Reject
                                </button>
                              </>
                            )}
                            {vendor.status === "APPROVED" && (
                              <button
                                onClick={() =>
                                  handleVendorAction(vendor.id, "suspend")
                                }
                                className='text-gray-600 hover:text-gray-900 bg-gray-100 px-2 py-1 rounded'
                              >
                                Suspend
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {vendors.length === 0 && (
                    <div className='text-center py-8 text-gray-500'>
                      No vendors found.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && !loading && (
          <div className='space-y-6'>
            <div className='bg-white shadow-lg rounded-lg'>
              <div className='px-4 py-5 sm:p-6'>
                <h3 className='text-lg leading-6 font-medium text-gray-900 mb-4'>
                  User Management
                </h3>
                <div className='overflow-x-auto'>
                  <table className='min-w-full divide-y divide-gray-200'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Phone Number
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Role
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Status
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Joined
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Vendor Info
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                      {users.map((userData) => (
                        <tr key={userData.id} className='hover:bg-gray-50'>
                          <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                            {userData.phoneNumber}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(
                                userData.role
                              )}`}
                            >
                              {userData.role}
                            </span>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                userData.isActive
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {userData.isActive ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                            {new Date(userData.createdAt).toLocaleDateString()}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                            {userData.vendorProfile ? (
                              <div>
                                <div className='font-medium'>
                                  {userData.vendorProfile.businessName}
                                </div>
                                <div className='text-xs'>
                                  {userData.vendorProfile.vendorType} -{" "}
                                  {userData.vendorProfile.status}
                                </div>
                              </div>
                            ) : (
                              "No vendor profile"
                            )}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                            <button
                              onClick={() =>
                                handleUserStatusToggle(
                                  userData.id,
                                  userData.isActive
                                )
                              }
                              className={`px-2 py-1 rounded text-xs ${
                                userData.isActive
                                  ? "bg-red-100 text-red-600 hover:bg-red-200"
                                  : "bg-green-100 text-green-600 hover:bg-green-200"
                              }`}
                            >
                              {userData.isActive ? "Deactivate" : "Activate"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {users.length === 0 && (
                    <div className='text-center py-8 text-gray-500'>
                      No users found.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
