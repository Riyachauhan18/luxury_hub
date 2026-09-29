import React from 'react';

export default function TermsPage() {
  return (
    <div className="bg-[#050505] text-[#FDFBF7] py-16 px-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4 border-b border-white/5 pb-8">
          <span className="text-[10px] tracking-[0.2em] font-medium text-[#C5A85C] uppercase">LEGAL INFORMATION</span>
          <h1 className="font-serif text-4xl font-light tracking-wide text-white">
            Terms & Conditions
          </h1>
          <p className="text-xs text-neutral-500 font-light">Last updated: August 2026</p>
        </div>

        <div className="space-y-8 text-xs text-neutral-400 font-light leading-relaxed">
          <section className="space-y-3">
            <h1 className="font-serif text-xl text-white font-light">1. Digital Catalogue Model</h1>
            <p>
              This website serves primarily as a digital catalogue and enquiry platform for THE LUXURY HUB showroom. Displayed prices or &quot;Contact for Price&quot; indicators are subject to physical stock verification and custom quotation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-white font-light">2. Intellectual Property</h2>
            <p>
              All trademarks, product designs, photography, logo branding, and editorial text presented on this platform are owned by or licensed to THE LUXURY HUB. Unauthorised copying or reproduction is prohibited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-white font-light">3. Quotations & Availability</h2>
            <p>
              Product specifications, finish variants, lead times, and availability are subject to change. Formal sales commitments and invoices are issued directly by showroom representatives following consultation.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
