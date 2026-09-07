import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { HeroConfig } from '../types';

interface FooterProps {
  hero: HeroConfig;
}

export const Footer: React.FC<FooterProps> = ({ hero }) => {
  return (
    <footer className="mt-6 sm:mt-8 border-t border-[#EBE3F7] bg-white/70 backdrop-blur-xs py-4 sm:py-5 text-center">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#502882]">
          <Sparkles className="w-3.5 h-3.5 text-[#A83870]" />
          <span>Thank you for visiting my portfolio.</span>
        </div>
        <p className="text-xs text-slate-500 font-medium">
          © 2026 {hero.ownerName || "Phiraphat Khodsawat"}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
