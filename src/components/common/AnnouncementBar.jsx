import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ANNOUNCEMENTS = [
  "100% GENUINE PRODUCTS",
  "100% CERTIFIED 925 & 999 PURE SILVER",
  "FREE INSURED EXPRESS DELIVERY ACROSS INDIA",
  "CUSTOM HANDCRAFTED YATRA LOCKETS MADE ON ORDER"
];

export default function AnnouncementBar({ onNavigateCategory }) {
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#600814] text-white py-1.5 px-4 text-center select-none shadow-inner border-b border-[#4A000A]">
      <div className="max-w-7xl mx-auto flex items-center justify-center space-x-6 sm:space-x-12">
        <button 
          onClick={handlePrev}
          className="text-white/80 hover:text-white transition-opacity p-0.5"
          aria-label="Previous announcement"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <span 
          onClick={() => onNavigateCategory("all")}
          className="text-[11px] sm:text-xs font-bold tracking-widest text-white uppercase cursor-pointer hover:underline transition-all"
        >
          {ANNOUNCEMENTS[index]}
        </span>

        <button 
          onClick={handleNext}
          className="text-white/80 hover:text-white transition-opacity p-0.5"
          aria-label="Next announcement"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
