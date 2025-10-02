"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import LandingPage from "./components/LandingPage";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    if (user) {
      // Redirect based on user role
      switch (user.role) {
        case "ADMIN":
          router.push("/dashboard/admin");
          break;
        case "VENDOR":
          router.push("/dashboard/vendor");
          break;
        default:
          // Already on main page for customers
          break;
      }
    } else {
      router.push("/auth");
    }
  };

  const handleGetStarted = () => {
    if (user) {
      // Already logged in, redirect to appropriate dashboard
      switch (user.role) {
        case "ADMIN":
          router.push("/dashboard/admin");
          break;
        case "VENDOR":
          router.push("/dashboard/vendor");
          break;
        default:
          // For customers, maybe show booking page or profile
          router.push("/");
          break;
      }
    } else {
      router.push("/auth");
    }
  };

  return <LandingPage onLogin={handleLogin} onGetStarted={handleGetStarted} />;
}
