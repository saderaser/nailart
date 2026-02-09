"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardNavbar from "@/components/dashboard/Navbar";
import PromptArea from "@/components/dashboard/PromptArea";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#181818] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#181818] relative">
      {/* Grid background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Navbar */}
      <DashboardNavbar />

      {/* Center: Prompt Area */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          What will you create?
        </h1>
        <p className="text-white/40 text-sm mb-8">
          Describe your YouTube thumbnail and let AI bring it to life.
        </p>
        <PromptArea />
      </main>
    </div>
  );
}
