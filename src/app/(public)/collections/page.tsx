import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getCollections } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <div className="bg-[#050505] text-[#FDFBF7] py-16 px-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Title */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-[10px] tracking-[0.2em] font-medium text-[#C5A85C] uppercase">CURATED STYLE LINES</span>
          <h1 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-white">
            Curated Collections
          </h1>
          <div className="w-12 h-[1px] bg-[#C5A85C] mx-auto mt-4"></div>
          <p className="text-xs text-neutral-400 leading-relaxed font-light mt-4">
            Explore our curated aesthetic themes grouping sanitaryware, gold faucets, minimal wall hungs, and matching architectural hardware.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {collections.map((col) => (
            <div 
              key={col.id}
              className="group relative h-[480px] overflow-hidden border border-white/5 bg-[#0C0C0C]"
            >
              <div className="absolute inset-0">
                <Image
                  src={col.image_url || '/placeholder_product.jpg'}
                  alt={col.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105 brightness-[0.4]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
              </div>

              <div className="absolute inset-0 p-12 flex flex-col justify-end space-y-4">
                <span className="text-[9px] tracking-widest text-[#C5A85C] uppercase font-semibold">
                  THE LUXURY HUB COLLECTION
                </span>
                <h2 className="font-serif text-3xl font-light text-white">
                  {col.name}
                </h2>
                <p className="text-xs text-neutral-400 max-w-md font-light leading-relaxed">
                  {col.description}
                </p>
                <div className="pt-4">
                  <Link
                    href={`/products?collection=${col.slug}`}
                    className="inline-flex items-center px-8 py-4 bg-[#C5A85C] text-[#050505] font-semibold text-xs tracking-widest uppercase hover:bg-[#D4AF37] transition-all"
                  >
                    EXPLORE COLLECTION PRODUCTS <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
