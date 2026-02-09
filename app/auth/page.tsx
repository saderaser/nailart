"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthPage() {
  const { user, loading, signInWithGoogle } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      {/* Left Panel - 3/5 */}
      <div className="hidden lg:flex lg:w-3/5 relative flex-col">
        {/* Background image placeholder + dark overlay */}
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(120,50,255,0.2), transparent), radial-gradient(ellipse 50% 50% at 20% 80%, rgba(255,50,100,0.1), transparent)",
          }}
        />

        {/* Content over overlay */}
        <div className="relative z-20 flex flex-col justify-between h-full p-10">
          {/* Top: YouTube Video */}
          <div className="flex-1 flex items-center">
            <div className="w-full max-w-2xl mx-auto aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="NailArt AI Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Bottom: Oversized NAILART */}
          <div className="pb-8">
            <h1
              className="text-[clamp(3rem,7vw,6rem)] font-black text-white/10 leading-none tracking-tighter select-none"
              style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}
            >
              NAILART
            </h1>
            <p className="text-white/30 text-lg mt-3 whitespace-nowrap">
              AI-powered YouTube thumbnail generator.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - 2/5 */}
      <div className="w-full lg:w-2/5 flex items-center justify-center relative">
        {/* Subtle gradient for right panel */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(120,50,255,0.08), transparent)",
          }}
        />

        <div className="relative z-10 w-full max-w-md mx-6">
          {/* Login Card */}
          <div
            className="rounded-2xl border border-white/10 p-10 backdrop-blur-xl"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
            }}
          >
            {/* Logo + Brand */}
            <div className="flex flex-col items-center gap-3 mb-8">
              <div className="relative w-12 h-12">
                <Image
                  src="/nailart.png"
                  alt="NailArt AI Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                NailArt AI
              </h2>
              <p className="text-sm text-white/50 text-center">
                Sign in to create stunning YouTube thumbnails with AI
              </p>
            </div>

            {/* Google Login Button */}
            <button
              onClick={signInWithGoogle}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 rounded-xl px-6 py-3.5 text-sm font-semibold text-white border border-white/20 backdrop-blur-md shadow-lg transition-all hover:bg-white/10 hover:border-white/30 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.1), rgba(255,255,255,0.03))",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              {loading ? "Loading..." : "Continue with Google"}
            </button>

            {/* Terms */}
            <p className="mt-6 text-xs text-white/30 text-center leading-relaxed">
              By continuing, you agree to our{" "}
              <Link
                href="#"
                className="text-white/50 underline hover:text-white/70 transition-colors"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="#"
                className="text-white/50 underline hover:text-white/70 transition-colors"
              >
                Privacy Policy
              </Link>
            </p>
          </div>

          {/* Back to home */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-white/40 hover:text-white/70 transition-colors"
            >
              &larr; Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
