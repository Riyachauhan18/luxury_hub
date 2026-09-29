'use client';

import React from 'react';
import { Compass, FileText, PhoneCall, Award, ArrowRight } from 'lucide-react';
import { whatsappUtility } from '../lib/whatsapp';

interface ArchitectTradeConciergeProps {
  whatsappNumber: string;
}

export default function ArchitectTradeConcierge({ whatsappNumber }: ArchitectTradeConciergeProps) {
  const architectMsg = `Hello Vikram Ji, I am an Architect / Interior Designer working on a luxury residential project. I would like to request trade catalog PDFs, CAD specifications, and trade pricing.`;
  const waUrl = whatsappUtility.getGeneralLink(whatsappNumber, architectMsg);

  return (
    <section className="py-20 px-6 bg-gradient-to-r from-[#0C0C0C] via-[#12110D] to-[#0C0C0C] border-y border-[#C5A85C]/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Headline & Description */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] font-medium text-[#C5A85C] uppercase bg-[#C5A85C]/10 px-3 py-1 border border-[#C5A85C]/30">
            <Compass className="w-3.5 h-3.5" />
            <span>EXCLUSIVE TRADE PROGRAM</span>
          </div>

          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide text-white leading-tight">
            Architect & Interior Designer Trade Concierge
          </h2>

          <p className="text-xs md:text-sm text-neutral-300 font-light leading-relaxed max-w-2xl">
            We partner directly with leading Architects, Interior Designers, and Luxury Villa Builders across India. Enjoy priority CAD technical specs, physical material swatches, project schedule quotes, and personalized concierge support from founder <strong className="text-[#C5A85C] font-semibold">Vikram Shekhawat</strong>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/10 text-xs">
            <div className="flex items-start space-x-3">
              <FileText className="w-5 h-5 text-[#C5A85C] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-neutral-200">CAD & 3D Specs</h4>
                <p className="text-[10px] text-neutral-400 font-light mt-0.5">Dimensional line drawings for project plans</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Award className="w-5 h-5 text-[#C5A85C] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-neutral-200">Trade Pricing</h4>
                <p className="text-[10px] text-neutral-400 font-light mt-0.5">Bespoke volume discounts for large projects</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <PhoneCall className="w-5 h-5 text-[#C5A85C] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-neutral-200">Priority Desk</h4>
                <p className="text-[10px] text-neutral-400 font-light mt-0.5">Direct WhatsApp access to leadership</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: CTA Card */}
        <div className="lg:col-span-5 bg-[#050505] p-8 border border-[#C5A85C]/30 space-y-6 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#C5A85C]/5 rounded-full blur-2xl pointer-events-none"></div>

          <h3 className="font-serif text-2xl tracking-wide text-neutral-100 font-light">
            Request Designer Access & Catalogs
          </h3>

          <p className="text-xs text-neutral-400 font-light leading-relaxed">
            Connect directly with Vikram Shekhawat for immediate project assistance, sample finishes, or catalog downloads.
          </p>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 bg-[#C5A85C] text-[#050505] hover:bg-[#D4AF37] transition-all duration-300 font-semibold text-xs tracking-widest uppercase flex items-center justify-center cursor-pointer shadow-lg hover:scale-[1.02]"
          >
            JOIN TRADE PROGRAM ON WHATSAPP <ArrowRight className="w-4 h-4 ml-2" />
          </a>

          <p className="text-[10px] text-neutral-500 italic">
            ⚡ Typical response time: Within 30 minutes during showroom hours
          </p>
        </div>

      </div>
    </section>
  );
}
