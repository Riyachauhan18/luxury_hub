'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

interface FinishItem {
  id: string;
  name: string;
  subtitle: string;
  colorClass: string;
  gradient: string;
  hex: string;
}

const FINISHES: FinishItem[] = [
  {
    id: 'champagne-gold',
    name: 'Champagne Gold',
    subtitle: 'Ultra-luxurious PVD gold with subtle warmth',
    colorClass: 'border-[#C5A85C]',
    gradient: 'from-[#D4AF37] via-[#F3E5AB] to-[#AA7C11]',
    hex: '#C5A85C'
  },
  {
    id: 'matte-black',
    name: 'Matte Velvet Black',
    subtitle: 'Fingerprint-resistant sleek architectural black',
    colorClass: 'border-[#333333]',
    gradient: 'from-[#2C2C2C] via-[#1A1A1A] to-[#0A0A0A]',
    hex: '#1A1A1A'
  },
  {
    id: 'rose-gold',
    name: 'Rose Gold & Copper',
    subtitle: 'Warm brushed metallic for modern sanctuaries',
    colorClass: 'border-[#B87333]',
    gradient: 'from-[#E08D69] via-[#B87333] to-[#804018]',
    hex: '#B87333'
  },
  {
    id: 'polished-chrome',
    name: 'Polished Chrome',
    subtitle: 'Mirror-finish reflection with corrosion guard',
    colorClass: 'border-neutral-400',
    gradient: 'from-[#FFFFFF] via-[#D0D0D0] to-[#808080]',
    hex: '#E0E0E0'
  },
  {
    id: 'gunmetal-gray',
    name: 'Brushed Gunmetal',
    subtitle: 'Industrial elegance with micro-brushed texture',
    colorClass: 'border-neutral-600',
    gradient: 'from-[#606470] via-[#3C4048] to-[#1E2022]',
    hex: '#4A4A4A'
  },
  {
    id: 'antique-brass',
    name: 'Royal Antique Brass',
    subtitle: 'Hand-burnished heritage patina finish',
    colorClass: 'border-[#9A7B38]',
    gradient: 'from-[#B5944B] via-[#8C6D2B] to-[#5C4517]',
    hex: '#8C6D2B'
  }
];

export default function FinishFamilySelector() {
  return (
    <section className="py-24 px-6 bg-[#090909] border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] font-medium text-[#C5A85C] uppercase bg-[#C5A85C]/10 px-3 py-1 border border-[#C5A85C]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>HARMONIOUS INTERIORS</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide text-white">
            Shop By Finish Family
          </h2>
          <p className="text-xs text-neutral-400 max-w-xl mx-auto font-light leading-relaxed">
            Ensure complete color harmony across your faucets, rain showers, towel rails, and vanity mirrors with matched PVD surface finishes.
          </p>
          <div className="w-12 h-[1px] bg-[#C5A85C] mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FINISHES.map((finish) => (
            <Link
              key={finish.id}
              href={`/products?search=${encodeURIComponent(finish.name.split(' ')[0])}`}
              className="group relative p-8 border border-white/5 bg-[#0C0C0C] hover:border-[#C5A85C]/40 transition-all duration-500 flex flex-col justify-between h-56"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <span className="text-[9px] tracking-widest text-neutral-500 uppercase font-semibold">FINISH PALETTE</span>
                  <h3 className="font-serif text-xl tracking-wide text-neutral-100 group-hover:text-[#C5A85C] transition-colors">
                    {finish.name}
                  </h3>
                </div>

                {/* Metallic Swatch */}
                <div 
                  className={`w-12 h-12 rounded-full bg-gradient-to-tr ${finish.gradient} shadow-lg border border-white/20 group-hover:scale-110 transition-transform duration-500`}
                />
              </div>

              <p className="text-xs text-neutral-400 font-light leading-relaxed pr-6">
                {finish.subtitle}
              </p>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] tracking-widest text-[#C5A85C] font-semibold">
                <span>EXPLORE MATCHING COLLECTION</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
