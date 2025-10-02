import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth API functions
export const authAPI = {
  // Send OTP
  sendOTP: async (phoneNumber: string) => {
    console.log("Safal");
    const response = await api.post("/api/auth/send-otp", { phoneNumber });
    return response.data;
  },

  // Verify OTP
  verifyOTP: async (
    phoneNumber: string,
    verificationId: string,
    code: string
  ) => {
    const response = await api.post("/api/auth/verify-otp", {
      phoneNumber,
      verificationId,
      code,
    });
    return response.data;
  },

  // Register vendor
  registerVendor: async (vendorData: {
    businessName: string;
    ownerName: string;
    contactNumbers: string[];
    email: string;
    businessAddress: string;
    googleMapsLink?: string;
    gstNumber: string;
    panNumber: string;
    aadhaarNumber: string;
    vendorType: "HOTEL" | "ADVENTURE" | "TRANSPORT" | "LOCAL_MARKET";
    bankDetails: {
      accountNumber: string;
      ifscCode: string;
      bankName: string;
      branchName: string;
      accountHolder: string;
    };
  }) => {
    const response = await api.post("/api/auth/vendor/register", vendorData);
    return response.data;
  },

  // Get vendor status
  getVendorStatus: async (accessToken: string) => {
    const response = await api.get("/api/auth/vendor/status", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  },

  // Refresh token
  refreshToken: async (refreshToken: string) => {
    const response = await api.post(
      "/api/auth/refresh-token",
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    return response.data;
  },
};

// Admin API functions
export const adminAPI = {
  // Get all vendors for admin review
  getVendors: async (accessToken: string, params?: { status?: string; vendorType?: string; page?: number; limit?: number }) => {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.append('status', params.status);
    if (params?.vendorType) searchParams.append('vendorType', params.vendorType);
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());

    const response = await api.get(`/api/auth/admin/vendors?${searchParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  },

  // Approve vendor
  approveVendor: async (accessToken: string, vendorId: string) => {
    const response = await api.put(`/api/auth/admin/vendor/${vendorId}/approve`, {}, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  },

  // Reject vendor
  rejectVendor: async (accessToken: string, vendorId: string) => {
    const response = await api.put(`/api/auth/admin/vendor/${vendorId}/reject`, {}, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  },

  // Suspend vendor
  suspendVendor: async (accessToken: string, vendorId: string) => {
    const response = await api.put(`/api/auth/admin/vendor/${vendorId}/suspend`, {}, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  },

  // Get all users
  getUsers: async (accessToken: string, params?: { role?: string; isActive?: boolean; page?: number; limit?: number }) => {
    const searchParams = new URLSearchParams();
    if (params?.role) searchParams.append('role', params.role);
    if (params?.isActive !== undefined) searchParams.append('isActive', params.isActive.toString());
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());

    const response = await api.get(`/api/auth/admin/users?${searchParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  },

  // Toggle user status
  toggleUserStatus: async (accessToken: string, userId: string, isActive: boolean) => {
    const response = await api.put(`/api/auth/admin/user/${userId}/toggle-status`, { isActive }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  },

  // Assign admin role
  assignAdminRole: async (accessToken: string, userId: string, adminData: { fullName?: string; email?: string; permissions?: string[] }) => {
    const response = await api.put(`/api/auth/admin/user/${userId}/assign-admin`, adminData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  },

  // Revoke admin role
  revokeAdminRole: async (accessToken: string, userId: string) => {
    const response = await api.put(`/api/auth/admin/user/${userId}/revoke-admin`, {}, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  },

  // Update admin profile
  updateAdminProfile: async (accessToken: string, profileData: { fullName?: string; email?: string; permissions?: string[] }) => {
    const response = await api.put('/api/auth/admin/profile', profileData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  },
};

export default api;
