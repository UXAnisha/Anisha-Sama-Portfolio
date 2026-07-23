import React, { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface LightboxImage {
  src?: string;
  alt?: string;
  title?: string;
  caption?: string;
  customRender?: React.ReactNode;
}

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: LightboxImage[];
  currentIndex: number;
  onNavigate?: (index: number) => void;
}

export default function ImageLightbox({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate,
}: ImageLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && onNavigate && images.length > 1) {
        onNavigate((currentIndex - 1 + images.length) % images.length);
      } else if (e.key === "ArrowRight" && onNavigate && images.length > 1) {
        onNavigate((currentIndex + 1) % images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, currentIndex, images, onClose, onNavigate]);

  if (!isOpen || images.length === 0) return null;

  const currentItem = images[currentIndex] || images[0];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10"
        role="dialog"
        aria-modal="true"
        aria-label={currentItem.title || "Image Lightbox"}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Lightbox"
          className="absolute top-4 right-4 sm:top-6 sm:right-6 text-neutral-400 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 p-2.5 rounded-full transition-colors z-10 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Previous Button */}
        {images.length > 1 && onNavigate && (
          <button
            onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
            aria-label="Previous image"
            className="absolute left-4 sm:left-6 text-neutral-400 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 p-3 rounded-full transition-colors z-10 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Button */}
        {images.length > 1 && onNavigate && (
          <button
            onClick={() => onNavigate((currentIndex + 1) % images.length)}
            aria-label="Next image"
            className="absolute right-4 sm:right-6 text-neutral-400 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 p-3 rounded-full transition-colors z-10 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Content Container */}
        <div className="max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center overflow-auto p-2">
          {currentItem.customRender ? (
            <div className="w-full flex justify-center bg-[#FAFAF7] rounded-lg p-4 sm:p-6 overflow-auto max-h-[75vh]">
              {currentItem.customRender}
            </div>
          ) : currentItem.src ? (
            <img
              src={currentItem.src}
              alt={currentItem.alt}
              className="max-w-full max-h-[75vh] object-contain rounded shadow-2xl"
            />
          ) : null}

          {/* Title and Caption */}
          {(currentItem.title || currentItem.caption) && (
            <div className="mt-4 text-center space-y-1 max-w-2xl px-4">
              {currentItem.title && (
                <h4 className="font-serif text-lg font-bold text-white">
                  {currentItem.title}
                </h4>
              )}
              {currentItem.caption && (
                <p className="font-sans text-xs sm:text-sm text-neutral-400 font-light">
                  {currentItem.caption}
                </p>
              )}
            </div>
          )}

          {/* Image Index Indicator */}
          {images.length > 1 && (
            <div className="mt-3 font-mono text-[11px] text-neutral-500 uppercase tracking-widest">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
