"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { authAPI } from "@/lib/api";

const VendorDashboard = () => {
  const { user, logout } = useAuth();
  const [vendorStatus, setVendorStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendorStatus = async () => {
      try {
        // Get access token from localStorage
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          console.error("No access token found");
          return;
        }

        const response = await authAPI.getVendorStatus(accessToken);
        if (response.success) {
          setVendorStatus(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch vendor status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendorStatus();
  }, []);

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600'></div>
      </div>
    );
  }

  return (
    <div className='px-4 py-6 sm:px-0'>
      <div className='border-4 border-dashed border-gray-200 rounded-lg p-8'>
        <div className='max-w-4xl mx-auto'>
          {/* Header */}
          <div className='flex justify-between items-center mb-8'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>
                Welcome, {user?.phoneNumber}
              </h1>
              <p className='text-gray-600 mt-2'>Vendor Dashboard</p>
            </div>
            <button
              onClick={handleLogout}
              className='bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700'
            >
              Logout
            </button>
          </div>

          {/* Vendor Status Card */}
          <div className='bg-white overflow-hidden shadow rounded-lg mb-6'>
            <div className='px-4 py-5 sm:p-6'>
              <h3 className='text-lg leading-6 font-medium text-gray-900 mb-4'>
                Vendor Application Status
              </h3>

              {vendorStatus ? (
                <div className='space-y-4'>
                  <div className='flex items-center'>
                    <span className='text-sm font-medium text-gray-500 w-32'>
                      Status:
                    </span>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        vendorStatus.status === "APPROVED"
                          ? "bg-green-100 text-green-800"
                          : vendorStatus.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {vendorStatus.status}
                    </span>
                  </div>

                  {vendorStatus.businessName && (
                    <div className='flex items-center'>
                      <span className='text-sm font-medium text-gray-500 w-32'>
                        Business Name:
                      </span>
                      <span className='text-sm text-gray-900'>
                        {vendorStatus.businessName}
                      </span>
                    </div>
                  )}

                  {vendorStatus.vendorType && (
                    <div className='flex items-center'>
                      <span className='text-sm font-medium text-gray-500 w-32'>
                        Vendor Type:
                      </span>
                      <span className='text-sm text-gray-900'>
                        {vendorStatus.vendorType}
                      </span>
                    </div>
                  )}

                  {vendorStatus.commissionRate && (
                    <div className='flex items-center'>
                      <span className='text-sm font-medium text-gray-500 w-32'>
                        Commission Rate:
                      </span>
                      <span className='text-sm text-gray-900'>
                        {vendorStatus.commissionRate}%
                      </span>
                    </div>
                  )}

                  {vendorStatus.createdAt && (
                    <div className='flex items-center'>
                      <span className='text-sm font-medium text-gray-500 w-32'>
                        Applied On:
                      </span>
                      <span className='text-sm text-gray-900'>
                        {new Date(vendorStatus.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className='text-center py-8'>
                  <p className='text-gray-500 mb-4'>
                    No vendor application found.
                  </p>
                  <a
                    href='/auth/vendorRegistration'
                    className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700'
                  >
                    Apply to become a vendor
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className='grid grid-cols-1 gap-5 sm:grid-cols-3 mb-6'>
            <div className='bg-white overflow-hidden shadow rounded-lg'>
              <div className='p-5'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0'>
                    <div className='w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center'>
                      <span className='text-white text-sm font-medium'>B</span>
                    </div>
                  </div>
                  <div className='ml-5 w-0 flex-1'>
                    <dl>
                      <dt className='text-sm font-medium text-gray-500 truncate'>
                        Total Bookings
                      </dt>
                      <dd className='text-lg font-medium text-gray-900'>0</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-white overflow-hidden shadow rounded-lg'>
              <div className='p-5'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0'>
                    <div className='w-8 h-8 bg-green-500 rounded-md flex items-center justify-center'>
                      <span className='text-white text-sm font-medium'>₹</span>
                    </div>
                  </div>
                  <div className='ml-5 w-0 flex-1'>
                    <dl>
                      <dt className='text-sm font-medium text-gray-500 truncate'>
                        Total Revenue
                      </dt>
                      <dd className='text-lg font-medium text-gray-900'>₹0</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-white overflow-hidden shadow rounded-lg'>
              <div className='p-5'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0'>
                    <div className='w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center'>
                      <span className='text-white text-sm font-medium'>P</span>
                    </div>
                  </div>
                  <div className='ml-5 w-0 flex-1'>
                    <dl>
                      <dt className='text-sm font-medium text-gray-500 truncate'>
                        Pending Reviews
                      </dt>
                      <dd className='text-lg font-medium text-gray-900'>0</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className='bg-white shadow rounded-lg'>
            <div className='px-4 py-5 sm:p-6'>
              <h3 className='text-lg leading-6 font-medium text-gray-900 mb-4'>
                Recent Activity
              </h3>
              <div className='text-center py-8 text-gray-500'>
                No recent activity to display.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
