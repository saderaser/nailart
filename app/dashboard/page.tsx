"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import DashboardNavbar from "@/components/dashboard/Navbar";
import PromptArea from "@/components/dashboard/PromptArea";
import Loader from "@/components/dashboard/Loader";
import Sidebar from "@/components/dashboard/Sidebar";
import type { GeneratedThumbnail } from "@/components/dashboard/PromptArea";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [thumbnails, setThumbnails] = useState<GeneratedThumbnail[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [latestResult, setLatestResult] = useState<GeneratedThumbnail | null>(
    null
  );

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth");
    }
  }, [user, loading, router]);

  const handleGenerateStart = useCallback(() => {
    setIsGenerating(true);
    setLatestResult(null);
  }, []);

  const handleGenerated = useCallback((thumbnail: GeneratedThumbnail) => {
    setIsGenerating(false);
    setLatestResult(thumbnail);
    setThumbnails((prev) => [thumbnail, ...prev]);
  }, []);

  const handleGenerateError = useCallback(() => {
    setIsGenerating(false);
  }, []);

  const handleSelectThumbnail = useCallback((thumbnail: GeneratedThumbnail) => {
    setLatestResult(thumbnail);
    setIsGenerating(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#181818] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const hasActivity = isGenerating || latestResult || thumbnails.length > 0;

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

      {/* Sidebar */}
      <Sidebar
        thumbnails={thumbnails}
        onSelectThumbnail={handleSelectThumbnail}
        selectedId={latestResult?.id}
      />

      {/* Navbar */}
      <DashboardNavbar />

      {/* Main content - offset for sidebar on desktop */}
      <main className="relative z-10 flex flex-col items-center min-h-screen px-6">
        <div
          className={`flex flex-col items-center w-full max-w-3xl transition-all duration-500 ${
            hasActivity ? "pt-24" : "justify-center min-h-screen"
          }`}
        >
          {/* Title - only when idle */}
          {!hasActivity && (
            <>
              <h1 className="text-3xl font-bold text-white mb-2">
                What will you create?
              </h1>
              <p className="text-white/40 text-sm mb-8">
                Describe your YouTube thumbnail and let AI bring it to life.
              </p>
            </>
          )}

          {/* Loader / Result area - above prompt */}
          {(isGenerating || latestResult) && (
            <div className="w-full flex flex-col items-center mb-8">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <Loader />
                </div>
              ) : latestResult ? (
                <div className="w-full max-w-2xl rounded-2xl overflow-hidden border border-white/10 bg-[#232323] shadow-xl shadow-black/30">
                  <div className="relative aspect-video">
                    <Image
                      src={latestResult.imageUrl}
                      alt={latestResult.prompt}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <p className="text-sm text-white/70 line-clamp-1 flex-1 mr-4">
                      {latestResult.prompt}
                    </p>
                    <a
                      href={latestResult.imageUrl}
                      download={`thumbnail-${latestResult.id}.png`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-white/40 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5 border border-white/10 shrink-0"
                    >
                      Download
                    </a>
                  </div>
                </div>
              ) : null}
            </div>
          )}

          {/* Prompt Area */}
          <PromptArea
            onGenerated={handleGenerated}
            onGenerateStart={handleGenerateStart}
            onGenerateError={handleGenerateError}
            thumbnails={thumbnails}
          />
        </div>
      </main>
    </div>
  );
}
