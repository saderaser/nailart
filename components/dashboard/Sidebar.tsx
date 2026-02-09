"use client";

import * as React from "react";
import Image from "next/image";
import type { GeneratedThumbnail } from "./PromptArea";

// --- Icons ---
const ImageIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </svg>
);

const DownloadIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const MenuIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="18" x2="20" y2="18" />
  </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

interface SidebarProps {
  thumbnails: GeneratedThumbnail[];
  onSelectThumbnail: (thumbnail: GeneratedThumbnail) => void;
  selectedId?: string | null;
}

export default function Sidebar({ thumbnails, onSelectThumbnail, selectedId }: SidebarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const sidebarContent = (
    <>
      {/* Liquid glass overlays */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 30% 0%, rgba(255,255,255,0.04) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 20%, transparent 80%, rgba(255,255,255,0.01) 100%)",
        }}
      />

      {/* Gallery */}
      <div className="relative flex-1 overflow-y-auto p-2.5 sidebar-scroll">
        {thumbnails.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center px-4">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-3">
              <ImageIcon className="h-5 w-5 text-white/20" />
            </div>
            <p className="text-xs text-white/30 leading-relaxed">
              Generated thumbnails<br />will appear here
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {thumbnails.map((thumb) => (
              <button
                key={thumb.id}
                onClick={() => {
                  onSelectThumbnail(thumb);
                  setIsOpen(false);
                }}
                className={`group relative rounded-xl overflow-hidden transition-all duration-200 text-left ${
                  selectedId === thumb.id
                    ? "ring-1 ring-white/25 shadow-lg shadow-black/40"
                    : "hover:ring-1 hover:ring-white/10 hover:shadow-md hover:shadow-black/20"
                }`}
              >
                {/* Image */}
                <div className="relative aspect-video">
                  <Image
                    src={thumb.imageUrl}
                    alt={thumb.prompt}
                    fill
                    className="object-cover"
                    sizes="240px"
                    unoptimized
                  />
                  {/* Hover overlay with download */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200 flex items-end justify-end">
                    <a
                      href={thumb.imageUrl}
                      download={`thumbnail-${thumb.id}.png`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="m-2 flex h-7 w-7 items-center justify-center rounded-lg bg-black/50 backdrop-blur-sm text-white/80 hover:text-white hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100 duration-200"
                    >
                      <DownloadIcon className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .sidebar-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .sidebar-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 4px;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.15);
        }
      `}</style>
    </>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-5 left-4 z-50 lg:hidden flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-[#202020]/90 backdrop-blur-xl text-white/60 hover:text-white hover:border-white/20 transition-all shadow-lg shadow-black/20"
      >
        <MenuIcon className="h-4.5 w-4.5" />
      </button>

      {/* Desktop floating sidebar */}
      <aside className="hidden lg:flex fixed left-4 top-4 bottom-4 w-[260px] z-40 flex-col rounded-2xl bg-[#202020]/90 backdrop-blur-xl border border-white/[0.08] shadow-2xl shadow-black/40 overflow-hidden">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          {/* Slide-in floating panel */}
          <aside className="absolute left-3 top-3 bottom-3 w-[260px] flex flex-col rounded-2xl bg-[#202020]/95 backdrop-blur-xl border border-white/[0.08] shadow-2xl shadow-black/50 overflow-hidden animate-in slide-in-from-left duration-200">
            {/* Close button */}
            <div className="flex justify-end p-2.5 pb-0">
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-white/40 hover:text-white/70 hover:bg-white/5 transition-colors"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
