import { getFAQs } from '@/lib/db';
import FaqClient from '@/components/FaqClient';

export const dynamic = 'force-dynamic';

export default async function FaqPage() {
  const faqs = await getFAQs();

  return (
    <div className="bg-[#050505] text-[#FDFBF7] py-16 px-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Header Title */}
        <div className="text-center space-y-4">
          <span className="text-[10px] tracking-[0.2em] font-medium text-[#C5A85C] uppercase">HELP & ASSISTANCE</span>
          <h1 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-white">
            Frequently Asked Questions
          </h1>
          <div className="w-12 h-[1px] bg-[#C5A85C] mx-auto mt-4"></div>
          <p className="text-xs text-neutral-400 leading-relaxed font-light mt-4">
            Find answers regarding product enquiries, WhatsApp ordering, catalogue downloads, and showroom consultations.
          </p>
        </div>

        {/* Client Collapsible Accordion */}
        <FaqClient faqs={faqs} />

      </div>
    </div>
  );
}
