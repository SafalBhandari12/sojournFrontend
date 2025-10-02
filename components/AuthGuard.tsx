"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRoles?: ("CUSTOMER" | "VENDOR" | "ADMIN")[];
  redirectTo?: string;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requiredRoles = [],
  redirectTo = "/auth",
}) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push(redirectTo);
        return;
      }

      if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
        // Redirect based on user role
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
        return;
      }
    }
  }, [user, isLoading, requiredRoles, router, redirectTo]);

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600'></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
};
