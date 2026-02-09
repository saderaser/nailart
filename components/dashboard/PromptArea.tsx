"use client";

import * as React from "react";
import Image from "next/image";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as DialogPrimitive from "@radix-ui/react-dialog";

// --- Utility ---
type ClassValue = string | number | boolean | null | undefined;
function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(" ");
}

// --- Icons ---
const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M12 5V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SendIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M12 5.25L12 18.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18.75 12L12 5.25L5.25 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SparklesIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    <path d="M20 3v4" />
    <path d="M22 5h-4" />
  </svg>
);

const ImageIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </svg>
);

// --- Radix Wrappers ---
const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & { showArrow?: boolean }
>(({ className, sideOffset = 4, showArrow = false, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "relative z-50 max-w-[280px] rounded-md bg-[#303030] text-white px-2 py-1 text-xs",
        "animate-in fade-in-0 zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        className
      )}
      {...props}
    >
      {props.children}
      {showArrow && <TooltipPrimitive.Arrow className="-my-px fill-[#303030]" />}
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = "TooltipContent";

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-64 rounded-xl bg-[#303030] p-2 text-white shadow-md outline-none",
        "animate-in data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
        "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = "PopoverContent";

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = "DialogOverlay";

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-[90vw] md:max-w-[800px] translate-x-[-50%] translate-y-[-50%] border-none bg-transparent p-0 shadow-none",
        "duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        className
      )}
      {...props}
    >
      <div className="relative bg-[#303030] rounded-[28px] overflow-hidden shadow-2xl p-1">
        {children}
        <DialogPrimitive.Close className="absolute right-3 top-3 z-10 rounded-full bg-[#303030] p-1 hover:bg-[#515151] transition-all">
          <XIcon className="h-5 w-5 text-gray-200 hover:text-white" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </div>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
DialogContent.displayName = "DialogContent";

// --- Models list ---
const modelsList = [
  { id: "gemini-2.5-flash-image", name: "Flash", description: "Fast & efficient" },
  { id: "gemini-3-pro-image-preview", name: "Pro", description: "Highest quality" },
] as const;

type ModelId = (typeof modelsList)[number]["id"];

// --- Types ---
export type GeneratedThumbnail = {
  id: string;
  prompt: string;
  imageUrl: string;
  status: string;
  created_at: string;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_FILES = 10;

// --- PromptArea Component ---
export default function PromptArea({
  onGenerated,
  onGenerateStart,
  onGenerateError,
  thumbnails = [],
}: {
  onGenerated?: (thumbnail: GeneratedThumbnail) => void;
  onGenerateStart?: () => void;
  onGenerateError?: () => void;
  thumbnails?: GeneratedThumbnail[];
}) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const refTimeoutRef = React.useRef<ReturnType<typeof setTimeout>>(undefined);
  const [value, setValue] = React.useState("");
  const [imagePreviews, setImagePreviews] = React.useState<string[]>([]);
  const [dialogImageIndex, setDialogImageIndex] = React.useState<number | null>(null);
  const [isRefPopoverOpen, setIsRefPopoverOpen] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedModel, setSelectedModel] = React.useState<ModelId>("gemini-2.5-flash-image");
  const [isModelPopoverOpen, setIsModelPopoverOpen] = React.useState(false);

  React.useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const newHeight = Math.min(textarea.scrollHeight, 200);
      textarea.style.height = `${newHeight}px`;
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handlePlusClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    event.target.value = "";

    if (files.length === 0) return;

    const remaining = MAX_FILES - imagePreviews.length;
    if (remaining <= 0) {
      setError(`Maximum ${MAX_FILES} images allowed`);
      return;
    }

    const filesToProcess = files.slice(0, remaining);

    const oversized = filesToProcess.filter((f) => f.size > MAX_FILE_SIZE);
    if (oversized.length > 0) {
      setError("Each image must be under 5MB");
      return;
    }

    const validFiles = filesToProcess.filter((f) => f.type.startsWith("image/"));
    if (validFiles.length === 0) return;

    const results = await Promise.all(
      validFiles.map(
        (file) =>
          new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          })
      )
    );

    setImagePreviews((prev) => [...prev, ...results].slice(0, MAX_FILES));
  };

  const handleRemoveImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRefThumbnailClick = (imageUrl: string) => {
    if (imagePreviews.length >= MAX_FILES) {
      setError(`Maximum ${MAX_FILES} images allowed`);
      return;
    }
    setImagePreviews((prev) => [...prev, imageUrl]);
    setIsRefPopoverOpen(false);
  };

  const handleRefEnter = () => {
    clearTimeout(refTimeoutRef.current);
    setIsRefPopoverOpen(true);
  };

  const handleRefLeave = () => {
    refTimeoutRef.current = setTimeout(() => setIsRefPopoverOpen(false), 200);
  };

  const handleGenerate = async () => {
    if (!value.trim() && imagePreviews.length === 0) return;
    setIsGenerating(true);
    setError(null);
    onGenerateStart?.();

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: value.trim(),
          referenceImages: imagePreviews.length > 0 ? imagePreviews : undefined,
          model: selectedModel,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate image");
      }

      onGenerated?.({
        id: data.thumbnail.id,
        prompt: data.thumbnail.prompt,
        imageUrl: data.imageUrl,
        status: data.thumbnail.status,
        created_at: data.thumbnail.created_at,
      });

      // Clear inputs after success
      setValue("");
      setImagePreviews([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      onGenerateError?.();
    } finally {
      setIsGenerating(false);
    }
  };

  const hasValue = value.trim().length > 0 || imagePreviews.length > 0;

  return (
    <div className="relative flex flex-col rounded-[28px] p-2 shadow-sm transition-colors bg-[#303030] cursor-text w-full max-w-3xl overflow-hidden">
      {/* Border beam animation */}
      <div
        className="absolute inset-0 rounded-[28px] pointer-events-none"
        style={{
          background:
            "conic-gradient(from var(--beam-angle, 0deg) at 50% 50%, transparent 0%, transparent 70%, rgba(120,80,255,0.5) 76%, rgba(167,139,250,0.8) 80%, rgba(255,255,255,0.9) 82%, rgba(167,139,250,0.8) 84%, rgba(120,80,255,0.5) 88%, transparent 94%, transparent 100%)",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1.5px",
          animation: "beam-rotate 4s linear infinite",
        }}
      />
      <style jsx>{`
        @keyframes beam-rotate {
          from { --beam-angle: 0deg; }
          to { --beam-angle: 360deg; }
        }
        @property --beam-angle {
          syntax: "<angle>";
          inherits: false;
          initial-value: 0deg;
        }
      `}</style>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
        multiple
      />

      {/* Image previews */}
      {imagePreviews.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-1 px-1 pt-1">
          {imagePreviews.map((src, i) => (
            <div key={i} className="relative group">
              <button
                type="button"
                className="transition-transform"
                onClick={() => setDialogImageIndex(i)}
              >
                <Image
                  src={src}
                  alt={`Preview ${i + 1}`}
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-[1rem] object-cover"
                  unoptimized
                />
              </button>
              <button
                onClick={() => handleRemoveImage(i)}
                className="absolute -right-1 -top-1 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-[#303030] text-white transition-colors hover:bg-[#515151] opacity-0 group-hover:opacity-100"
                aria-label="Remove image"
              >
                <XIcon className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Full-size image dialog */}
      <DialogPrimitive.Root
        open={dialogImageIndex !== null}
        onOpenChange={(open) => {
          if (!open) setDialogImageIndex(null);
        }}
      >
        <DialogContent>
          {dialogImageIndex !== null && (
            <Image
              src={imagePreviews[dialogImageIndex]}
              alt="Full size preview"
              width={800}
              height={450}
              className="w-full max-h-[95vh] object-contain rounded-[24px]"
              unoptimized
            />
          )}
        </DialogContent>
      </DialogPrimitive.Root>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (hasValue && !isGenerating) handleGenerate();
          }
        }}
        placeholder="Describe your thumbnail idea..."
        className="w-full resize-none border-0 bg-transparent p-3 text-white placeholder:text-gray-400 focus:ring-0 focus-visible:outline-none min-h-24"
      />

      {/* Bottom toolbar */}
      <div className="mt-0.5 p-1 pt-0">
        <TooltipProvider delayDuration={100}>
          <div className="flex items-center gap-2">
            {/* Attach */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={handlePlusClick}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:bg-[#515151]"
                >
                  <PlusIcon className="h-6 w-6" />
                  <span className="sr-only">Attach image</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" showArrow>
                <p>Attach image (max 5MB, up to {MAX_FILES})</p>
              </TooltipContent>
            </Tooltip>

            {/* Reference popover */}
            <Popover open={isRefPopoverOpen} onOpenChange={setIsRefPopoverOpen}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      onMouseEnter={handleRefEnter}
                      onMouseLeave={handleRefLeave}
                      className="flex h-8 items-center gap-2 rounded-full p-2 text-sm text-white transition-colors hover:bg-[#515151]"
                    >
                      <ImageIcon className="h-4 w-4" />
                      Reference
                    </button>
                  </PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent side="top" showArrow>
                  <p>Reference existing thumbnails</p>
                </TooltipContent>
              </Tooltip>
              <PopoverContent
                side="top"
                align="start"
                className="w-72"
                onMouseEnter={handleRefEnter}
                onMouseLeave={handleRefLeave}
              >
                {thumbnails.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-4 text-center">
                    <ImageIcon className="h-5 w-5 text-white/20 mb-2" />
                    <p className="text-xs text-white/40">No thumbnails yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-1.5 max-h-56 overflow-y-auto pr-0.5">
                    {thumbnails.map((thumb) => (
                      <button
                        key={thumb.id}
                        onClick={() => handleRefThumbnailClick(thumb.imageUrl)}
                        disabled={imagePreviews.length >= MAX_FILES}
                        className="relative aspect-video rounded-lg overflow-hidden hover:ring-2 hover:ring-white/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <Image
                          src={thumb.imageUrl}
                          alt={thumb.prompt}
                          fill
                          className="object-cover"
                          sizes="120px"
                          unoptimized
                        />
                      </button>
                    ))}
                  </div>
                )}
              </PopoverContent>
            </Popover>

            {/* Model selector */}
            <Popover open={isModelPopoverOpen} onOpenChange={setIsModelPopoverOpen}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className="flex h-8 items-center gap-1.5 rounded-full px-2.5 text-sm text-white/70 transition-colors hover:bg-[#515151] hover:text-white"
                    >
                      <SparklesIcon className="h-4 w-4" />
                      <span className="text-xs">{modelsList.find((m) => m.id === selectedModel)?.name}</span>
                    </button>
                  </PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent side="top" showArrow>
                  <p>Select model</p>
                </TooltipContent>
              </Tooltip>
              <PopoverContent side="top" align="start" className="w-52">
                <div className="flex flex-col gap-1">
                  {modelsList.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => {
                        setSelectedModel(model.id);
                        setIsModelPopoverOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center justify-between rounded-md p-2 text-left text-sm transition-colors",
                        selectedModel === model.id
                          ? "bg-white/10 text-white"
                          : "hover:bg-[#515151] text-white/70"
                      )}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{model.name}</span>
                        <span className="text-xs text-white/40">{model.description}</span>
                      </div>
                      {selectedModel === model.id && (
                        <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                      )}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* Send button */}
            <div className="ml-auto">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    disabled={!hasValue || isGenerating}
                    onClick={handleGenerate}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors bg-white text-black hover:bg-white/80 disabled:bg-[#515151] disabled:text-gray-500 disabled:pointer-events-none"
                  >
                    {isGenerating ? (
                      <div className="h-4 w-4 border-2 border-gray-400 border-t-black rounded-full animate-spin" />
                    ) : (
                      <SendIcon className="h-6 w-6" />
                    )}
                    <span className="sr-only">{isGenerating ? "Generating..." : "Generate thumbnail"}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" showArrow>
                  <p>{isGenerating ? "Generating..." : "Generate thumbnail"}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </TooltipProvider>
      </div>

      {/* Error message */}
      {error && (
        <div className="flex items-center justify-between gap-2 px-4 pb-3">
          <p className="text-sm text-red-400">{error}</p>
          <button
            onClick={() => setError(null)}
            className="text-xs text-white/40 hover:text-white/60 transition-colors"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}
