import React from 'react';
import Image from 'next/image';
import { Users2, Award, ShieldCheck, Heart } from 'lucide-react';
import { getTeamMembers, getSettings } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const [teamMembers, settings] = await Promise.all([
    getTeamMembers(),
    getSettings()
  ]);

  return (
    <div className="bg-[#050505] text-[#FDFBF7] py-16 px-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Title Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-[10px] tracking-[0.2em] font-medium text-[#C5A85C] uppercase">OUR HERITAGE</span>
          <h1 className="font-serif text-4xl md:text-6xl font-light tracking-wide text-white leading-tight">
            About Us
          </h1>
          <div className="w-12 h-[1px] bg-[#C5A85C] mx-auto mt-4"></div>
          <p className="text-xs text-neutral-400 leading-relaxed font-light mt-4">
            Learn about our journey, showroom philosophy, and the professionals crafting sanitaryware and interior spaces for luxury homes.
          </p>
        </div>

        {/* Section 1: Story Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[480px] w-full border border-white/5 bg-neutral-900 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800"
              alt="Luxury Bathroom Visual"
              fill
              className="object-cover brightness-75"
            />
          </div>

          <div className="space-y-6">
            <h2 className="font-serif text-3xl font-light tracking-wide text-white">
              Elevating Bathrooms Into Sanctuary Environments
            </h2>
            <p className="text-xs leading-relaxed text-neutral-400 font-light">
              Founded under the principle that luxury is defined by detail and quality, **THE LUXURY HUB** curates a premier digital catalogue of bathroom sanitaryware, rain showers, light fittings, and cabinet hardwares.
            </p>
            <p className="text-xs leading-relaxed text-neutral-500 font-light">
              We understand that modern bathrooms are no longer just utilitarian spaces, but private retreats to reflect, relax, and rejuvenate. By working closely with luxury architects, interior designers, and homeowners, we help pick fixtures that coordinate perfectly in finish, match in geometry, and operate with long-term engineering integrity.
            </p>
          </div>
        </div>

        {/* Section 2: Values & Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-16 border-t border-white/5">
          <div className="space-y-4">
            <Award className="w-8 h-8 text-[#C5A85C] stroke-[1.2]" />
            <h3 className="font-serif text-xl tracking-wide text-neutral-200">Curated Exclusivity</h3>
            <p className="text-xs text-neutral-500 leading-relaxed font-light">
              We filter the global market to bring fixtures that carry unique geometries, modern aesthetics, and architectural value.
            </p>
          </div>
          <div className="space-y-4">
            <ShieldCheck className="w-8 h-8 text-[#C5A85C] stroke-[1.2]" />
            <h3 className="font-serif text-xl tracking-wide text-neutral-200">Engineering Quality</h3>
            <p className="text-xs text-neutral-500 leading-relaxed font-light">
              We prioritize PVD tarnish-resistant coatings, German ceramic disk cartridges, and solid brass castings built to perform for decades.
            </p>
          </div>
          <div className="space-y-4">
            <Heart className="w-8 h-8 text-[#C5A85C] stroke-[1.2]" />
            <h3 className="font-serif text-xl tracking-wide text-neutral-200">Personalized Assistance</h3>
            <p className="text-xs text-neutral-500 leading-relaxed font-light">
              We value human conversation. Our designers assist you with coordinate selections, technical specifications, and direct updates via WhatsApp.
            </p>
          </div>
        </div>

        {/* Section 3: Team Visionaries */}
        <div className="pt-16 border-t border-white/5 space-y-16">
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <span className="text-[10px] tracking-[0.2em] font-medium text-[#C5A85C] uppercase">THE DESIGN CONSULTANTS</span>
            <h2 className="font-serif text-3xl font-light tracking-wide text-white">
              The People Behind The Luxury Hub
            </h2>
            <p className="text-xs text-neutral-500 font-light">
              Our professionals guide you through design concepts, technical specifications, and catalog orders.
            </p>
          </div>

          <div className={`grid grid-cols-1 ${teamMembers.length > 1 ? 'md:grid-cols-2 max-w-4xl' : 'max-w-xl'} gap-12 mx-auto`}>
            {teamMembers.map((member) => (
              <div 
                key={member.id}
                className="group border border-white/5 bg-[#0C0C0C] p-8 text-center space-y-6 hover:border-[#C5A85C]/20 transition-all duration-500 w-full"
              >
                {/* Photo frame */}
                <div className="relative w-36 h-36 mx-auto bg-neutral-900 border border-white/5 overflow-hidden flex items-center justify-center">
                  {member.photo_url ? (
                    <Image src={member.photo_url} alt={member.name} fill className="object-cover" />
                  ) : (
                    <Users2 className="w-12 h-12 text-neutral-700 stroke-[1.2]" />
                  )}
                </div>

                {/* Info block */}
                <div className="space-y-2">
                  <h3 className="font-serif text-xl tracking-wide text-neutral-200">{member.name}</h3>
                  <span className="text-[10px] tracking-widest text-[#C5A85C] uppercase font-semibold">{member.role}</span>
                  <p className="text-xs text-neutral-500 leading-relaxed font-light mt-4 pt-4 border-t border-white/5">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
