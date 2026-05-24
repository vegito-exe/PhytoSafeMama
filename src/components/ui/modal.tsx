"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isMounted) return null;
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div 
        className={cn(
          "relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200",
          className
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors z-10 text-slate-500"
        >
          <X className="h-5 w-5" />
        </button>
        {title && (
          <div className="p-6 pb-2 border-b border-slate-100 pr-12">
            {typeof title === "string" ? (
              <h2 className="text-2xl font-bold text-green-900">{title}</h2>
            ) : (
              title
            )}
          </div>
        )}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}