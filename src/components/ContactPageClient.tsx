'use client';

import React, { useState } from 'react';
import { Mail, MapPin, Phone, Clock, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { WebsiteSettings } from '../lib/types';
import { submitContactForm } from '../app/actions';
import { whatsappUtility } from '../lib/whatsapp';

import { useLanguage } from '../context/LanguageContext';

interface ContactPageClientProps {
  settings: WebsiteSettings;
}

export default function ContactPageClient({ settings }: ContactPageClientProps) {
  const { business, whatsapp } = settings;
  const whatsappNumber = whatsapp.number;
  const { language, t } = useLanguage();

  const whatsappLink = whatsappUtility.getGeneralLink(
    whatsappNumber,
    language
  );

  // Form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ success?: boolean; msg?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      const res = await submitContactForm({
        name,
        phone,
        email,
        subject,
        message
      });

      if (res.success) {
        setStatus({ success: true, msg: res.message });
        setName('');
        setPhone('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        setStatus({ success: false, msg: res.error || 'Failed to submit form.' });
      }
    } catch (err) {
      setStatus({ success: false, msg: 'An error occurred while submitting your message.' });
    } finally {
      setSubmitting(false);
    }
  };

  const generateWhatsAppUrl = (custName: string, custPhone: string, custEmail: string, custSubject: string, custMsg: string) => {
    let text = '';
    if (language === 'hi') {
      text = `नमस्ते THE LUXURY HUB,

मैंने आपकी वेबसाइट से पूछताछ भेजी है:
👤 नाम: ${custName}
📞 फोन: ${custPhone}
✉️ ईमेल: ${custEmail || 'N/A'}
📌 विषय: ${custSubject || 'सामान्य पूछताछ'}

💬 संदेश:
${custMsg}`;
    } else {
      text = `Hello THE LUXURY HUB,

I have submitted an enquiry from your website:
👤 Name: ${custName}
📞 Phone: ${custPhone}
✉️ Email: ${custEmail || 'N/A'}
📌 Subject: ${custSubject || 'General Product Enquiry'}

💬 Message:
${custMsg}`;
    }

    const cleanNum = whatsappNumber.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanNum}?text=${encodeURIComponent(text)}`;
  };

  const handleWhatsAppSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      setStatus({ success: false, msg: 'Name, phone number, and message are required.' });
      return;
    }

    setSubmitting(true);
    setStatus(null);

    try {
      // 1. Persist to DB for admin record tracking
      await submitContactForm({ name, phone, email, subject, message });

      // 2. Open WhatsApp directly pre-filled with formatted enquiry
      const url = generateWhatsAppUrl(name, phone, email, subject, message);
      window.open(url, '_blank');

      setStatus({ 
        success: true, 
        msg: 'Enquiry saved! Opening WhatsApp to send your message directly...' 
      });

      setName('');
      setPhone('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      console.error('WhatsApp submit error:', err);
      // Still open WhatsApp even if DB call fails locally
      const url = generateWhatsAppUrl(name, phone, email, subject, message);
      window.open(url, '_blank');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#050505] text-[#FDFBF7] py-16 px-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Title Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-[10px] tracking-[0.2em] font-medium text-[#C5A85C] uppercase">GET IN TOUCH</span>
          <h1 className="font-serif text-4xl md:text-6xl font-light tracking-wide text-white leading-tight">
            Contact Us
          </h1>
          <div className="w-12 h-[1px] bg-[#C5A85C] mx-auto mt-4"></div>
          <p className="text-xs text-neutral-400 leading-relaxed font-light mt-4">
            Have questions about product availability, finish customizations, or technical drawings? Fill out the form below to send an instant message on WhatsApp or submit a website enquiry.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Contact Form */}
          <div className="bg-[#0C0C0C] border border-white/5 p-8 md:p-12 space-y-6">
            <h2 className="font-serif text-2xl font-light tracking-wide text-white border-b border-white/5 pb-4">
              Send an Enquiry
            </h2>

            {status && (
              <div className={`p-4 text-xs font-medium border ${
                status.success 
                  ? 'bg-[#25D366]/10 border-[#25D366]/30 text-[#25D366] flex items-center' 
                  : 'bg-red-950/40 border-red-500/30 text-red-400'
              }`}>
                {status.success && <CheckCircle className="w-4 h-4 mr-2 shrink-0" />}
                {status.msg}
              </div>
            )}

            <form onSubmit={handleWhatsAppSubmit} className="space-y-6 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.g. John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3.5 bg-[#050505] border border-white/10 text-warm-ivory rounded-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
                    PHONE NUMBER *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3.5 bg-[#050505] border border-white/10 text-warm-ivory rounded-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3.5 bg-[#050505] border border-white/10 text-warm-ivory rounded-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
                    SUBJECT
                  </label>
                  <input
                    type="text"
                    placeholder="E.g. Product Inquiry"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-3.5 bg-[#050505] border border-white/10 text-warm-ivory rounded-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
                  MESSAGE / REQUIREMENTS *
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Tell us about your project or product requirements..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3.5 bg-[#050505] border border-white/10 text-warm-ivory rounded-none"
                />
              </div>

              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-[#25D366] text-white hover:bg-[#20ba59] transition-all font-semibold text-xs tracking-widest uppercase flex items-center justify-center cursor-pointer shadow-lg disabled:opacity-50"
                >
                  <MessageSquare className="w-4 h-4 mr-2" /> {submitting ? 'PROCESSING...' : 'SEND QUERY ON WHATSAPP'}
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full py-3.5 bg-transparent border border-white/10 text-neutral-300 hover:border-white/30 transition-all font-semibold text-[11px] tracking-widest uppercase flex items-center justify-center cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5 mr-2" /> SUBMIT TO WEBSITE DATABASE ONLY
                </button>
              </div>
            </form>
          </div>

          {/* Business Info & WhatsApp Option */}
          <div className="space-y-8">
            <div className="bg-[#0C0C0C] border border-white/5 p-8 md:p-12 space-y-6">
              <h2 className="font-serif text-2xl font-light tracking-wide text-white border-b border-white/5 pb-4">
                Showroom Contact
              </h2>

              <ul className="space-y-6 text-xs text-neutral-400">
                <li className="flex items-start space-x-4">
                  <MapPin className="w-5 h-5 text-[#C5A85C] shrink-0 stroke-[1.5]" />
                  <div className="space-y-1">
                    <h4 className="font-semibold text-neutral-200 uppercase">ADDRESS</h4>
                    <p className="leading-relaxed font-light">{business.address}</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <Phone className="w-5 h-5 text-[#C5A85C] shrink-0 stroke-[1.5]" />
                  <div className="space-y-1">
                    <h4 className="font-semibold text-neutral-200 uppercase">SHOWROOM PHONES</h4>
                    <div className="flex flex-col space-y-1 font-mono text-xs">
                      <a href="tel:+919667431239" className="hover:text-[#C5A85C] transition-colors">+91 96674 31239</a>
                      <a href="tel:+918619193954" className="hover:text-[#C5A85C] transition-colors">+91 86191 93954</a>
                      <a href="tel:+917230056518" className="hover:text-[#C5A85C] transition-colors">+91 72300 56518</a>
                    </div>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <Mail className="w-5 h-5 text-[#C5A85C] shrink-0 stroke-[1.5]" />
                  <div className="space-y-1">
                    <h4 className="font-semibold text-neutral-200 uppercase">EMAIL</h4>
                    <p className="leading-relaxed font-light break-all">{business.email}</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <Clock className="w-5 h-5 text-[#C5A85C] shrink-0 stroke-[1.5]" />
                  <div className="space-y-1">
                    <h4 className="font-semibold text-neutral-200 uppercase">OPENING HOURS</h4>
                    <p className="leading-relaxed font-light">{business.opening_hours}</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="bg-[#0C0C0C] border border-[#25D366]/20 p-8 text-center space-y-4">
              <MessageSquare className="w-8 h-8 text-[#25D366] mx-auto stroke-[1.5]" />
              <h3 className="font-serif text-xl font-light text-white">Prefer Instant Chat?</h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Connect directly with our showroom sales representatives on WhatsApp for real-time answers and stock verification.
              </p>
              <div className="pt-2">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full py-4 bg-[#25D366] text-white hover:bg-[#20ba59] transition-all font-semibold text-xs tracking-widest uppercase items-center justify-center cursor-pointer shadow-lg"
                >
                  <MessageSquare className="w-4 h-4 mr-2" /> CONTINUE ON WHATSAPP
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
