"use client";
import LandingPage from "./components/LandingPage";

export default function Home() {
  const handleLogin = () => {
    // Handle login logic here
    console.log("Login clicked");
  };

  const handleGetStarted = () => {
    // Handle get started logic here
    console.log("Get started clicked");
  };

  return <LandingPage onLogin={handleLogin} onGetStarted={handleGetStarted} />;
}
