import React from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';
import { getSettings } from '@/lib/db';
import { whatsappUtility } from '@/lib/whatsapp';

export const dynamic = 'force-dynamic';

export default async function ShowroomPage() {
  const settings = await getSettings();
  const { business, whatsapp } = settings;
  const whatsappNumber = whatsapp.number;

  const generalWhatsAppLink = whatsappUtility.getGeneralLink(
    whatsappNumber,
    "Hello The Luxury Hub, I would like to schedule a showroom visit to explore your bathroom fittings and hardware collections."
  );

  return (
    <div className="bg-[#050505] text-[#FDFBF7] py-16 px-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Title Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-[10px] tracking-[0.2em] font-medium text-[#C5A85C] uppercase">VISIT FLAGSHIP SHOWROOM</span>
          <h1 className="font-serif text-4xl md:text-6xl font-light tracking-wide text-white leading-tight">
            Experience Luxury in Person
          </h1>
          <div className="w-12 h-[1px] bg-[#C5A85C] mx-auto mt-4"></div>
          <p className="text-xs text-neutral-400 leading-relaxed font-light mt-4">
            Step into our premium gallery to physically inspect tarnish-resistant faucet finishes, test silent cabinet sliders, and review customized details with our in-house consultants.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left panel: Info */}
          <div className="space-y-8 bg-[#0C0C0C] border border-white/5 p-8 md:p-12">
            <h2 className="font-serif text-2xl font-light tracking-wide text-white border-b border-white/5 pb-4">
              Showroom Coordinates
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

            <div className="pt-6">
              <a 
                href={generalWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full py-4 bg-[#25D366] text-white hover:bg-[#20ba59] transition-all duration-300 font-semibold text-xs tracking-widest uppercase items-center justify-center cursor-pointer shadow-lg"
              >
                <MessageSquare className="w-4 h-4 mr-2" /> BOOK SHOWROOM APPOINTMENT
              </a>
            </div>
          </div>

          {/* Right panel: Map/Visual representation */}
          <div className="space-y-6">
            <div className="relative h-[320px] w-full border border-white/5 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800"
                alt="Showroom Interior"
                fill
                className="object-cover brightness-75"
              />
            </div>
            
            {/* Embedded map placeholder */}
            <div className="h-64 border border-white/5 bg-[#0C0C0C] flex flex-col items-center justify-center p-6 text-center space-y-3">
              <MapPin className="w-10 h-10 text-[#C5A85C] stroke-[1.2]" />
              <h3 className="font-serif text-lg tracking-wide text-white">THE LUXURY HUB — Jaipur Showroom</h3>
              <p className="text-xs text-neutral-400 max-w-sm font-light leading-relaxed">
                Kalwar Rd, Manglam City, Govindpura, Jaipur, Hathoj, Rajasthan 302012
              </p>
              <a
                href="https://maps.google.com/?q=The+Luxury+Hub+Kalwar+Rd+Manglam+City+Govindpura+Jaipur+Rajasthan+302012"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[10px] tracking-widest font-semibold hover:text-[#C5A85C] transition-colors uppercase border border-white/10 px-6 py-3 hover:border-[#C5A85C]"
              >
                OPEN IN GOOGLE MAPS &rarr;
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
