"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { authAPI } from "@/lib/api";

const VendorRegistrationPage = () => {
  const [step, setStep] = useState<"phone" | "otp" | "registration">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [tempUser, setTempUser] = useState<any>(null);

  const { user, login } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    contactNumbers: [""],
    email: "",
    businessAddress: "",
    googleMapsLink: "",
    gstNumber: "",
    panNumber: "",
    aadhaarNumber: "",
    vendorType: "HOTEL" as "HOTEL" | "ADVENTURE" | "TRANSPORT" | "LOCAL_MARKET",
    bankDetails: {
      accountNumber: "",
      ifscCode: "",
      bankName: "",
      branchName: "",
      accountHolder: "",
    },
  });

  // Check if user is already logged in
  useEffect(() => {
    if (user) {
      if (user.role === "CUSTOMER") {
        setStep("registration");
      } else {
        // Redirect if already vendor/admin
        router.push(
          user.role === "VENDOR" ? "/dashboard/vendor" : "/dashboard/admin"
        );
      }
    }
  }, [user, router]);

  // Countdown timer for OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await authAPI.sendOTP(phoneNumber);

      if (response.success) {
        setVerificationId(response.data.verificationId);
        setStep("otp");
        setCountdown(parseInt(response.data.timeout) || 60);
      } else {
        setError(response.message || "Failed to send OTP");
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await authAPI.verifyOTP(
        phoneNumber,
        verificationId,
        otp
      );

      if (response.success) {
        const { accessToken, refreshToken, user } = response.data;

        if (user.role === "CUSTOMER") {
          // Store auth data and proceed to registration
          login(accessToken, refreshToken, user);
          setTempUser(user);
          setStep("registration");
        } else {
          // Already vendor/admin, redirect
          login(accessToken, refreshToken, user);
          router.push(
            user.role === "VENDOR" ? "/dashboard/vendor" : "/dashboard/admin"
          );
        }
      } else {
        setError(response.message || "Invalid OTP");
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as object),
          [child]: value,
        },
      }));
    } else if (field === "contactNumbers") {
      setFormData((prev) => ({ ...prev, contactNumbers: [value] }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmitRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await authAPI.registerVendor(formData);

      if (response.success) {
        // Show success message and redirect
        alert(
          "Vendor registration submitted successfully! Your application is pending admin approval."
        );
        router.push("/");
      } else {
        setError(response.message || "Registration failed");
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;

    setLoading(true);
    try {
      const response = await authAPI.sendOTP(phoneNumber);
      if (response.success) {
        setVerificationId(response.data.verificationId);
        setCountdown(parseInt(response.data.timeout) || 60);
        setError("");
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8'>
      <div className='max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            Vendor Registration
          </h1>
          <p className='text-gray-600'>
            {step === "phone" && "Enter your phone number to get started"}
            {step === "otp" && "Enter the OTP sent to your phone"}
            {step === "registration" && "Complete your vendor profile"}
          </p>
        </div>

        {error && (
          <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded'>
            {error}
          </div>
        )}

        {step === "phone" && (
          <form onSubmit={handleSendOTP} className='space-y-6'>
            <div>
              <label
                htmlFor='phone'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Phone Number
              </label>
              <input
                type='tel'
                id='phone'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder='Enter your phone number'
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
                disabled={loading}
              />
            </div>
            <button
              type='submit'
              disabled={loading || !phoneNumber}
              className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50'
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleVerifyOTP} className='space-y-6'>
            <div>
              <label
                htmlFor='otp'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                OTP Code
              </label>
              <input
                type='text'
                id='otp'
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder='Enter 4-digit OTP'
                maxLength={4}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-2xl tracking-widest'
                required
                disabled={loading}
              />
            </div>
            <button
              type='submit'
              disabled={loading || otp.length !== 4}
              className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50'
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <div className='text-center space-y-2'>
              <p className='text-sm text-gray-600'>Sent to: {phoneNumber}</p>
              {countdown > 0 ? (
                <p className='text-sm text-gray-500'>
                  Resend OTP in {countdown} seconds
                </p>
              ) : (
                <button
                  type='button'
                  onClick={handleResendOTP}
                  disabled={loading}
                  className='text-sm text-blue-600 hover:text-blue-500 underline'
                >
                  Resend OTP
                </button>
              )}
            </div>
          </form>
        )}

        {step === "registration" && (
          <form onSubmit={handleSubmitRegistration} className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Business Information */}
              <div className='col-span-2'>
                <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                  Business Information
                </h3>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Business Name *
                </label>
                <input
                  type='text'
                  value={formData.businessName}
                  onChange={(e) =>
                    handleInputChange("businessName", e.target.value)
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Owner Name *
                </label>
                <input
                  type='text'
                  value={formData.ownerName}
                  onChange={(e) =>
                    handleInputChange("ownerName", e.target.value)
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Contact Number *
                </label>
                <input
                  type='tel'
                  value={formData.contactNumbers[0]}
                  onChange={(e) =>
                    handleInputChange("contactNumbers", e.target.value)
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Email *
                </label>
                <input
                  type='email'
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>

              <div className='col-span-2'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Business Address *
                </label>
                <textarea
                  value={formData.businessAddress}
                  onChange={(e) =>
                    handleInputChange("businessAddress", e.target.value)
                  }
                  rows={3}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>

              <div className='col-span-2'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Google Maps Link
                </label>
                <input
                  type='url'
                  value={formData.googleMapsLink}
                  onChange={(e) =>
                    handleInputChange("googleMapsLink", e.target.value)
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Vendor Type *
                </label>
                <select
                  value={formData.vendorType}
                  onChange={(e) =>
                    handleInputChange("vendorType", e.target.value)
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  required
                >
                  <option value='HOTEL'>Hotel</option>
                  <option value='ADVENTURE'>Adventure</option>
                  <option value='TRANSPORT'>Transport</option>
                  <option value='LOCAL_MARKET'>Local Market</option>
                </select>
              </div>

              {/* Legal Information */}
              <div className='col-span-2 mt-6'>
                <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                  Legal Information
                </h3>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  GST Number *
                </label>
                <input
                  type='text'
                  value={formData.gstNumber}
                  onChange={(e) =>
                    handleInputChange("gstNumber", e.target.value)
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  PAN Number *
                </label>
                <input
                  type='text'
                  value={formData.panNumber}
                  onChange={(e) =>
                    handleInputChange("panNumber", e.target.value)
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Aadhaar Number *
                </label>
                <input
                  type='text'
                  value={formData.aadhaarNumber}
                  onChange={(e) =>
                    handleInputChange("aadhaarNumber", e.target.value)
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>

              {/* Bank Details */}
              <div className='col-span-2 mt-6'>
                <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                  Bank Details
                </h3>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Account Number *
                </label>
                <input
                  type='text'
                  value={formData.bankDetails.accountNumber}
                  onChange={(e) =>
                    handleInputChange(
                      "bankDetails.accountNumber",
                      e.target.value
                    )
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  IFSC Code *
                </label>
                <input
                  type='text'
                  value={formData.bankDetails.ifscCode}
                  onChange={(e) =>
                    handleInputChange("bankDetails.ifscCode", e.target.value)
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Bank Name *
                </label>
                <input
                  type='text'
                  value={formData.bankDetails.bankName}
                  onChange={(e) =>
                    handleInputChange("bankDetails.bankName", e.target.value)
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Branch Name *
                </label>
                <input
                  type='text'
                  value={formData.bankDetails.branchName}
                  onChange={(e) =>
                    handleInputChange("bankDetails.branchName", e.target.value)
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Account Holder Name *
                </label>
                <input
                  type='text'
                  value={formData.bankDetails.accountHolder}
                  onChange={(e) =>
                    handleInputChange(
                      "bankDetails.accountHolder",
                      e.target.value
                    )
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>
            </div>

            <div className='flex space-x-4 pt-6'>
              <button
                type='button'
                onClick={() => router.push("/")}
                className='flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400'
              >
                Cancel
              </button>
              <button
                type='submit'
                disabled={loading}
                className='flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50'
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default VendorRegistrationPage;
