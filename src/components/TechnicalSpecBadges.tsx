'use client';

import React from 'react';
import { ShieldCheck, Sparkles, Droplets, Award } from 'lucide-react';

export default function TechnicalSpecBadges() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-white/5 my-6">
      <div className="flex items-center space-x-3 p-3 bg-[#0C0C0C] border border-white/5">
        <Award className="w-6 h-6 text-[#C5A85C] shrink-0" />
        <div>
          <h5 className="text-[11px] font-semibold text-neutral-200 uppercase tracking-wider">100% Solid Brass</h5>
          <p className="text-[9px] text-neutral-500 font-light mt-0.5">Heavy forged lead-free core</p>
        </div>
      </div>

      <div className="flex items-center space-x-3 p-3 bg-[#0C0C0C] border border-white/5">
        <Sparkles className="w-6 h-6 text-[#C5A85C] shrink-0" />
        <div>
          <h5 className="text-[11px] font-semibold text-neutral-200 uppercase tracking-wider">PVD Vacuum Finish</h5>
          <p className="text-[9px] text-neutral-500 font-light mt-0.5">Scratch & tarnish proof coating</p>
        </div>
      </div>

      <div className="flex items-center space-x-3 p-3 bg-[#0C0C0C] border border-white/5">
        <Droplets className="w-6 h-6 text-[#C5A85C] shrink-0" />
        <div>
          <h5 className="text-[11px] font-semibold text-neutral-200 uppercase tracking-wider">Ceramic Cartridge</h5>
          <p className="text-[9px] text-neutral-500 font-light mt-0.5">Tested for 500k smooth cycles</p>
        </div>
      </div>

      <div className="flex items-center space-x-3 p-3 bg-[#0C0C0C] border border-white/5">
        <ShieldCheck className="w-6 h-6 text-[#C5A85C] shrink-0" />
        <div>
          <h5 className="text-[11px] font-semibold text-neutral-200 uppercase tracking-wider">10-Year Warranty</h5>
          <p className="text-[9px] text-neutral-500 font-light mt-0.5">Comprehensive surface cover</p>
        </div>
      </div>
    </div>
  );
}
