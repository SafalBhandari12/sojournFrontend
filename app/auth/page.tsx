"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { authAPI } from "@/lib/api";

const AuthPage = () => {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);

  const { login, user } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      switch (user.role) {
        case "ADMIN":
          router.push("/dashboard/admin");
          break;
        case "VENDOR":
          router.push("/dashboard/vendor");
          break;
        default:
          router.push("/");
          break;
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
      console.log("Safal");

      if (response.success) {
        setVerificationId(response.data.verificationId);
        setStep("otp");
        setCountdown(parseInt(response.data.timeout) || 60);
      } else {
        setError(response.message || "Failed to send OTP");
      }
    } catch (error: any) {
      console.log(error);
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
        login(accessToken, refreshToken, user);

        // Redirect based on role
        switch (user.role) {
          case "ADMIN":
            router.push("/dashboard/admin");
            break;
          case "VENDOR":
            router.push("/dashboard/vendor");
            break;
          default:
            router.push("/");
            break;
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
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4'>
      <div className='max-w-md w-full bg-white rounded-lg shadow-lg p-8'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            Welcome to Sojourn
          </h1>
          <p className='text-gray-600'>
            {step === "phone"
              ? "Enter your phone number to continue"
              : "Enter the OTP sent to your phone"}
          </p>
        </div>

        {error && (
          <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded'>
            {error}
          </div>
        )}

        {step === "phone" ? (
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
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                required
                disabled={loading}
              />
            </div>

            <button
              type='submit'
              disabled={loading || !phoneNumber}
              className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>

            <div className='text-center'>
              <p className='text-sm text-gray-600'>
                Don't have an account? You'll be registered automatically.
              </p>
            </div>
          </form>
        ) : (
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
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl tracking-widest'
                required
                disabled={loading}
              />
            </div>

            <button
              type='submit'
              disabled={loading || otp.length !== 4}
              className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
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
              <button
                type='button'
                onClick={() => {
                  setStep("phone");
                  setOtp("");
                  setError("");
                }}
                className='block text-sm text-gray-600 hover:text-gray-500 underline mx-auto'
              >
                Change phone number
              </button>
            </div>
          </form>
        )}

        <div className='mt-8 text-center'>
          <p className='text-xs text-gray-500'>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
