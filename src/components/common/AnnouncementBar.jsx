import React, { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, Truck, ChevronRight, X } from 'lucide-react';

const ANNOUNCEMENTS = [
  { icon: ShieldCheck, text: "100% Certified 925 Hallmark & 999 Pure Fine Silver", linkText: "View Guarantee" },
  { icon: Sparkles, text: "Handcrafted Custom Yatra & Shrine Lockets Made on Order", linkText: "Customize Now" },
  { icon: Truck, text: "Free Insured Express Delivery across India on Orders above ₹5,000", linkText: "Shop Bestsellers" }
];

export default function AnnouncementBar({ onNavigateCategory }) {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  const current = ANNOUNCEMENTS[index];
  const Icon = current.icon;

  return (
    <div className="bg-[#1A1A1A] text-white text-xs py-2 px-4 border-b border-[#D4AF37]/30 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center space-x-2 text-silver-300 font-medium">
          <span className="inline-block w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
          <span>BIS Hallmarked Pure Silver Jewelry & Murti</span>
        </div>

        <div className="flex-1 flex justify-center items-center space-x-2 text-center text-xs md:text-sm font-medium">
          <Icon className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
          <span className="tracking-wide text-silver-100">{current.text}</span>
          <button 
            onClick={() => onNavigateCategory("custom-gifting")}
            className="text-[#D4AF37] hover:underline font-semibold flex items-center ml-1 shrink-0"
          >
            {current.linkText} <ChevronRight className="w-3 h-3 ml-0.5" />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <span className="hidden lg:inline-block text-silver-400 text-xs">Helpline: +91 98765 43210</span>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-silver-400 hover:text-white transition-colors"
            title="Close Bar"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
