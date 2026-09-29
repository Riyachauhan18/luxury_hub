import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getBrands } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function BrandsPage() {
  const brands = await getBrands();

  return (
    <div className="bg-[#050505] text-[#FDFBF7] py-16 px-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Title */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-[10px] tracking-[0.2em] font-medium text-[#C5A85C] uppercase">EXCLUSIVE LINES</span>
          <h1 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-white">
            Our Collection Partners
          </h1>
          <div className="w-12 h-[1px] bg-[#C5A85C] mx-auto mt-4"></div>
          <p className="text-xs text-neutral-400 leading-relaxed font-light mt-4">
            We partner with global manufacturers and design houses to curate architectural sanitaryware, rain showers, and bespoke cabinet hardware.
          </p>
        </div>

        {/* Brands list grid */}
        {brands.length === 0 ? (
          <div className="border border-white/5 bg-[#0C0C0C] p-16 text-center space-y-4 max-w-2xl mx-auto">
            <h3 className="font-serif text-xl font-light text-[#C5A85C]">Curated Architectural Lines</h3>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              We present an exclusive in-house collection of fixtures selected for design excellence and engineering quality. Official brand partner profiles can be added dynamically through the Admin Panel when authorized.
            </p>
            <div className="pt-4">
              <Link
                href="/products"
                className="inline-block px-8 py-4 bg-[#C5A85C] text-[#050505] font-semibold text-xs tracking-widest uppercase hover:bg-[#D4AF37] transition-all"
              >
                EXPLORE ALL PRODUCTS
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brands.map((b) => (
              <Link 
                key={b.id} 
                href={`/products?brand=${b.slug}`}
                className="group border border-white/5 bg-[#0C0C0C] p-8 flex flex-col justify-between space-y-6 hover:border-[#C5A85C]/30 transition-all duration-300"
              >
                <div className="relative h-20 w-full flex items-center justify-center">
                  {b.logo_url ? (
                    <Image src={b.logo_url} alt={b.name} fill className="object-contain filter grayscale group-hover:grayscale-0 transition-all" />
                  ) : (
                    <span className="font-serif text-2xl text-white font-light group-hover:text-[#C5A85C] transition-colors">{b.name}</span>
                  )}
                </div>
                {b.description && (
                  <p className="text-xs text-neutral-500 font-light leading-relaxed line-clamp-2">
                    {b.description}
                  </p>
                )}
                <div className="text-[10px] tracking-widest text-[#C5A85C] uppercase font-semibold">
                  VIEW BRAND PRODUCTS &rarr;
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
