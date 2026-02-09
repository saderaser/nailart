"use client";

import * as React from "react";
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

const Settings2Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 7h-9" />
    <path d="M14 17H5" />
    <circle cx="17" cy="17" r="3" />
    <circle cx="7" cy="7" r="3" />
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

const GlobeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const PencilIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    <path d="m15 5 4 4" />
  </svg>
);

const LightbulbIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M12 7C9.23858 7 7 9.23858 7 12C7 13.3613 7.54402 14.5955 8.42651 15.4972C8.77025 15.8484 9.05281 16.2663 9.14923 16.7482L9.67833 19.3924C9.86537 20.3272 10.6862 21 11.6395 21H12.3605C13.3138 21 14.1346 20.3272 14.3217 19.3924L14.8508 16.7482C14.9472 16.2663 15.2297 15.8484 15.5735 15.4972C16.456 14.5955 17 13.3613 17 12C17 9.23858 14.7614 7 12 7Z" stroke="currentColor" strokeWidth="2" />
    <path d="M12 4V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 6L19 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 5L6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 17H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PaintBrushIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z" />
    <path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7" />
    <path d="M14.5 17.5 4.5 15" />
  </svg>
);

const TelescopeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="2" />
    <path d="M4.93 4.93 9 9" />
    <path d="M14.12 9.88l5.66-5.66" />
    <path d="m7.76 16.24-6.69 1.69 1.69-6.69" />
    <path d="M20.71 3.29a1 1 0 0 0-1.42 0L12 10.59a1 1 0 0 0 0 1.42l0 0a1 1 0 0 0 1.42 0l7.29-7.3a1 1 0 0 0 0-1.42Z" />
    <path d="M12 16v5" />
    <path d="M16 20h-8" />
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

// --- Tools list ---
const toolsList = [
  { id: "createImage", name: "Create an image", shortName: "Image", icon: PaintBrushIcon },
  { id: "searchWeb", name: "Search the web", shortName: "Search", icon: GlobeIcon },
  { id: "writeCode", name: "Write or code", shortName: "Write", icon: PencilIcon },
  { id: "deepResearch", name: "Run deep research", shortName: "Deep Search", icon: TelescopeIcon },
  { id: "thinkLonger", name: "Think for longer", shortName: "Think", icon: LightbulbIcon },
];

// --- PromptArea Component ---
export default function PromptArea() {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useState("");
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [selectedTool, setSelectedTool] = React.useState<string | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = React.useState(false);

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    event.target.value = "";
  };

  const handleRemoveImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const hasValue = value.trim().length > 0 || imagePreview;
  const activeTool = selectedTool ? toolsList.find((t) => t.id === selectedTool) : null;
  const ActiveToolIcon = activeTool?.icon;

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
      />

      {/* Image preview */}
      {imagePreview && (
        <DialogPrimitive.Root open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
          <div className="relative mb-1 w-fit rounded-[1rem] px-1 pt-1">
            <button
              type="button"
              className="transition-transform"
              onClick={() => setIsImageDialogOpen(true)}
            >
              <img
                src={imagePreview}
                alt="Image preview"
                className="h-14 w-14 rounded-[1rem] object-cover"
              />
            </button>
            <button
              onClick={handleRemoveImage}
              className="absolute right-2 top-2 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-[#303030] text-white transition-colors hover:bg-[#515151]"
              aria-label="Remove image"
            >
              <XIcon className="h-4 w-4" />
            </button>
          </div>
          <DialogContent>
            <img
              src={imagePreview}
              alt="Full size preview"
              className="w-full max-h-[95vh] object-contain rounded-[24px]"
            />
          </DialogContent>
        </DialogPrimitive.Root>
      )}

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        onChange={handleInputChange}
        placeholder="Describe your thumbnail idea..."
        className="w-full resize-none border-0 bg-transparent p-3 text-white placeholder:text-gray-400 focus:ring-0 focus-visible:outline-none min-h-12"
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
                <p>Attach image</p>
              </TooltipContent>
            </Tooltip>

            {/* Tools popover */}
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className="flex h-8 items-center gap-2 rounded-full p-2 text-sm text-white transition-colors hover:bg-[#515151]"
                    >
                      <Settings2Icon className="h-4 w-4" />
                      {!selectedTool && "Tools"}
                    </button>
                  </PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent side="top" showArrow>
                  <p>Explore Tools</p>
                </TooltipContent>
              </Tooltip>
              <PopoverContent side="top" align="start">
                <div className="flex flex-col gap-1">
                  {toolsList.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => {
                        setSelectedTool(tool.id);
                        setIsPopoverOpen(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-md p-2 text-left text-sm hover:bg-[#515151]"
                    >
                      <tool.icon className="h-4 w-4" />
                      <span>{tool.name}</span>
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* Active tool badge */}
            {activeTool && (
              <>
                <div className="h-4 w-px bg-gray-600" />
                <button
                  onClick={() => setSelectedTool(null)}
                  className="flex h-8 items-center gap-2 rounded-full px-2 text-sm hover:bg-[#3b4045] cursor-pointer text-[#99ceff] transition-colors"
                >
                  {ActiveToolIcon && <ActiveToolIcon className="h-4 w-4" />}
                  {activeTool.shortName}
                  <XIcon className="h-4 w-4" />
                </button>
              </>
            )}

            {/* Send button */}
            <div className="ml-auto">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="submit"
                    disabled={!hasValue}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors bg-white text-black hover:bg-white/80 disabled:bg-[#515151] disabled:text-gray-500 disabled:pointer-events-none"
                  >
                    <SendIcon className="h-6 w-6" />
                    <span className="sr-only">Send message</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" showArrow>
                  <p>Send</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
}
