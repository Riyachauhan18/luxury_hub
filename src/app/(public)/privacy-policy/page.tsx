import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#050505] text-[#FDFBF7] py-16 px-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4 border-b border-white/5 pb-8">
          <span className="text-[10px] tracking-[0.2em] font-medium text-[#C5A85C] uppercase">LEGAL INFORMATION</span>
          <h1 className="font-serif text-4xl font-light tracking-wide text-white">
            Privacy Policy
          </h1>
          <p className="text-xs text-neutral-500 font-light">Last updated: August 2026</p>
        </div>

        <div className="space-y-8 text-xs text-neutral-400 font-light leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-xl text-white font-light">1. Introduction</h2>
            <p>
              THE LUXURY HUB (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to protecting the personal data you share when browsing our digital catalogue or contacting our showroom team.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-white font-light">2. Information We Collect</h2>
            <p>
              When you submit a contact form or send a product enquiry list via WhatsApp, we collect information such as your name, phone number, email address, and specific product finish selections.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-white font-light">3. How We Use Your Information</h2>
            <p>
              We use your information solely to respond to price quotation requests, verify physical showroom stock levels, schedule consultation appointments, and facilitate direct communications. We do not sell your personal data to third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-white font-light">4. WhatsApp Communication</h2>
            <p>
              When you click any WhatsApp enquiry link on our site, your conversation is conducted directly within the secure WhatsApp application according to WhatsApp&apos;s privacy policies.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
