"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { authAPI } from "@/lib/api";

interface VendorStatus {
  status: "NOT_APPLIED" | "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";
  businessName?: string;
  vendorType?: string;
  createdAt?: string;
  commissionRate?: number;
  message?: string;
}

export default function VendorStatusDashboard() {
  const [vendorStatus, setVendorStatus] = useState<VendorStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, logout } = useAuth();
  const router = useRouter();

  const onLogoutClick = () => {
    router.push("/");
    logout();
  };

  useEffect(() => {
    const fetchVendorStatus = async () => {
      try {
        // Get access token from localStorage
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          router.push("/auth");
          return;
        }

        const response = await authAPI.getVendorStatus(accessToken);

        if (response.success) {
          setVendorStatus(response.data);
        } else {
          setError("Failed to fetch vendor status");
        }
      } catch (err: any) {
        console.error("Error fetching vendor status:", err);
        if (err.response?.status === 401) {
          // Token expired, redirect to auth
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          router.push("/auth");
        } else {
          setError("Failed to fetch vendor status");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVendorStatus();
  }, [router]);

  const getStatusDisplay = () => {
    if (!vendorStatus) return null;

    switch (vendorStatus.status) {
      case "NOT_APPLIED":
        return {
          title: "Apply to Become a Vendor",
          message:
            vendorStatus.message ||
            "No vendor application found. You can apply to become a vendor.",
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          action: (
            <button
              onClick={() => router.push("/auth/vendorRegistration")}
              className='mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors'
            >
              Apply Now
            </button>
          ),
        };

      case "PENDING":
        return {
          title: "Application Under Review",
          message:
            "Your vendor application is currently being reviewed by our admin team. We will notify you once the review is complete.",
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          action: (
            <div className='mt-4 text-sm text-gray-600'>
              <p>
                <strong>Business Name:</strong> {vendorStatus.businessName}
              </p>
              <p>
                <strong>Vendor Type:</strong> {vendorStatus.vendorType}
              </p>
              <p>
                <strong>Applied On:</strong>{" "}
                {new Date(vendorStatus.createdAt!).toLocaleDateString()}
              </p>
            </div>
          ),
        };

      case "APPROVED":
        return {
          title: "Application Approved! 🎉",
          message:
            "Congratulations! Your vendor application has been approved. You can now access your vendor dashboard.",
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          action: (
            <div className='mt-4'>
              <button
                onClick={() => router.push("/dashboard/vendor")}
                className='bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors'
              >
                Go to Vendor Panel
              </button>
              <div className='mt-4 text-sm text-gray-600'>
                <p>
                  <strong>Business Name:</strong> {vendorStatus.businessName}
                </p>
                <p>
                  <strong>Vendor Type:</strong> {vendorStatus.vendorType}
                </p>
                <p>
                  <strong>Commission Rate:</strong>{" "}
                  {vendorStatus.commissionRate}%
                </p>
              </div>
            </div>
          ),
        };

      case "REJECTED":
        return {
          title: "Application Rejected",
          message:
            "Unfortunately, your vendor application has been rejected. You can apply again with updated information.",
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          action: (
            <button
              onClick={() => router.push("/auth/vendorRegistration")}
              className='mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors'
            >
              Apply Again
            </button>
          ),
        };

      case "SUSPENDED":
        return {
          title: "Account Suspended",
          message:
            "Your vendor account has been suspended. Please contact support for more information.",
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          action: (
            <button
              onClick={() =>
                (window.location.href = "mailto:support@sojourn.com")
              }
              className='mt-4 bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors'
            >
              Contact Support
            </button>
          ),
        };

      default:
        return {
          title: "Unknown Status",
          message: "Unable to determine vendor status. Please contact support.",
          color: "text-gray-600",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          action: null,
        };
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='bg-white p-8 rounded-lg shadow-lg'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
          <p className='text-center mt-4 text-gray-600'>
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='bg-white p-8 rounded-lg shadow-lg max-w-md'>
          <div className='text-center'>
            <div className='text-red-600 text-6xl mb-4'>⚠️</div>
            <h1 className='text-2xl font-bold text-gray-800 mb-4'>Error</h1>
            <p className='text-gray-600 mb-6'>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors'
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const statusDisplay = getStatusDisplay();

  return (
    <div className='min-h-screen bg-gray-50 py-12'>
      <div className='max-w-4xl mx-auto px-4'>
        {/* Header */}
        <div className='bg-white rounded-lg shadow-lg p-6 mb-8'>
          <div className='flex justify-between items-center'>
            <div>
              <h1 className='text-3xl font-bold text-gray-800'>Dashboard</h1>
              <p className='text-gray-600 mt-1'>Welcome, {user?.phoneNumber}</p>
            </div>
            <button
              onClick={onLogoutClick}
              className='bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors'
            >
              Logout
            </button>
          </div>
        </div>

        {/* Vendor Status Card */}
        <div className='bg-white rounded-lg shadow-lg p-8'>
          <div className='text-center mb-6'>
            <h2 className='text-2xl font-bold text-gray-800'>
              Vendor Application Status
            </h2>
            <p className='text-gray-600 mt-2'>
              Check the current status of your vendor application
            </p>
          </div>

          {statusDisplay && (
            <div
              className={`${statusDisplay.bgColor} ${statusDisplay.borderColor} border-2 rounded-lg p-8 text-center`}
            >
              <div className={`${statusDisplay.color} text-4xl mb-4`}>
                {vendorStatus?.status === "PENDING" && "⏳"}
                {vendorStatus?.status === "APPROVED" && "✅"}
                {vendorStatus?.status === "REJECTED" && "❌"}
                {vendorStatus?.status === "SUSPENDED" && "🚫"}
                {vendorStatus?.status === "NOT_APPLIED" && "📝"}
              </div>

              <h3 className={`text-2xl font-bold ${statusDisplay.color} mb-4`}>
                {statusDisplay.title}
              </h3>

              <p className='text-gray-700 mb-6 leading-relaxed'>
                {statusDisplay.message}
              </p>

              {statusDisplay.action}
            </div>
          )}
        </div>

        {/* Admin Dashboard Link for Admins */}
        {user?.role === "ADMIN" && (
          <div className='mt-8 bg-white rounded-lg shadow-lg p-6'>
            <h3 className='text-xl font-bold text-gray-800 mb-4'>
              Admin Tools
            </h3>
            <button
              onClick={() => router.push("/dashboard/admin")}
              className='bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors'
            >
              Go to Admin Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
