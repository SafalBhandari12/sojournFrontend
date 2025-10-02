"use client";

import React from "react";
import { AuthGuard } from "@/components/AuthGuard";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard requiredRoles={["ADMIN"]}>
      <div className='min-h-screen bg-gray-50'>
        <header className='bg-white shadow-sm border-b'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex justify-between items-center h-16'>
              <div className='flex items-center'>
                <h1 className='text-xl font-semibold text-gray-900'>
                  Admin Dashboard
                </h1>
              </div>
              <nav className='flex space-x-4'>
                <a
                  href='/dashboard/admin'
                  className='text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium'
                >
                  Overview
                </a>
                <a
                  href='/dashboard/admin/vendors'
                  className='text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium'
                >
                  Vendors
                </a>
                <a
                  href='/dashboard/admin/users'
                  className='text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium'
                >
                  Users
                </a>
              </nav>
            </div>
          </div>
        </header>
        <main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
