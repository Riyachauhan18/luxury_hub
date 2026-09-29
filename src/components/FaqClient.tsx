'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ } from '../lib/types';

interface FaqClientProps {
  faqs: FAQ[];
}

export default function FaqClient({ faqs }: FaqClientProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0); // First item open by default

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div 
            key={faq.id} 
            className="border border-white/5 bg-[#0C0C0C] transition-colors"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full p-6 text-left flex justify-between items-center gap-4 cursor-pointer hover:bg-white/[0.01]"
            >
              <span className="font-serif text-lg text-white font-light tracking-wide flex items-center">
                <HelpCircle className="w-4 h-4 text-[#C5A85C] mr-3 shrink-0 stroke-[1.5]" />
                {faq.question}
              </span>
              <ChevronDown className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-300 ${
                isOpen ? 'rotate-180 text-[#C5A85C]' : ''
              }`} />
            </button>

            {isOpen && (
              <div className="px-6 pb-6 pt-2 text-xs text-neutral-400 font-light leading-relaxed border-t border-white/5 animate-fade-in pl-13">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
