import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowRight, ShieldCheck, Layers, Users2, BadgeHelp, MapPin, Phone, MessageSquare, Award } from 'lucide-react';
import { 
  getCategories, 
  getCollections, 
  getProducts, 
  getGalleryImages, 
  getTeamMembers, 
  getSettings,
  getBrands
} from '../../lib/db';
import { whatsappUtility } from '../../lib/whatsapp';
import FinishFamilySelector from '../../components/FinishFamilySelector';
import ArchitectTradeConcierge from '../../components/ArchitectTradeConcierge';

export default async function HomePage() {
  const [
    categories,
    collections,
    featuredProducts,
    galleryImages,
    teamMembers,
    settings,
    brands
  ] = await Promise.all([
    getCategories(),
    getCollections(),
    getProducts({ isFeatured: true }),
    getGalleryImages(),
    getTeamMembers(),
    getSettings(),
    getBrands()
  ]);

  const { business, whatsapp } = settings;
  const whatsappNumber = whatsapp.number;

  // General Enquiry WhatsApp link
  const generalWhatsAppLink = whatsappUtility.getGeneralLink(
    whatsappNumber,
    whatsapp.default_message
  );

  return (
    <div className="bg-[#050505] text-[#FDFBF7] overflow-x-hidden font-sans">
      {/* SECTION 1: HERO SECTION */}
      <section className="relative h-[90vh] md:h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Parallax Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={settings.homepage.hero_images[0] || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1920'}
            alt="Luxury Interior Background"
            fill
            className="object-cover brightness-[0.4] scale-105 animate-[pulse-subtle_20s_ease-in-out_infinite]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/80"></div>
        </div>

        {/* Hero Text Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-xs md:text-sm tracking-[0.3em] font-medium text-[#C5A85C] uppercase animate-[fade-in_1s_ease-out_forwards]">
            {settings.homepage.hero_title}
          </h2>
          <h1 className="font-serif text-4xl md:text-7xl lg:text-8xl tracking-tight leading-[1.1] font-light animate-[slide-up_1.2s_ease-out_forwards]">
            LUXURY IN<br />
            <span className="italic font-normal gold-gradient-text">EVERY DETAIL</span>
          </h1>
          <p className="max-w-xl mx-auto text-xs md:text-sm text-neutral-400 tracking-wider font-light leading-relaxed animate-[fade-in_1.5s_ease-out_forwards]">
            {settings.homepage.hero_description}
          </p>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 animate-[slide-up_1.5s_ease-out_forwards]">
            <Link 
              href="/products" 
              className="w-full sm:w-auto px-8 py-4 bg-[#C5A85C] text-[#050505] hover:bg-[#D4AF37] transition-all duration-300 font-medium text-xs tracking-widest uppercase hover:scale-[1.02]"
            >
              EXPLORE COLLECTION
            </Link>
            <Link 
              href="/showroom" 
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white hover:border-[#C5A85C] hover:text-[#C5A85C] transition-all duration-300 font-medium text-xs tracking-widest uppercase"
            >
              VISIT SHOWROOM
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: TRUST / SERVICE STRIP */}
      <section className="border-y border-white/5 bg-[#0C0C0C] py-8 md:py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center space-x-4">
            <Award className="w-8 h-8 text-[#C5A85C] stroke-[1.2]" />
            <div>
              <h4 className="text-xs tracking-wider font-medium uppercase text-neutral-200">PREMIUM QUALITY</h4>
              <p className="text-[10px] text-neutral-500 mt-1">Carefully Selected Brands</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Layers className="w-8 h-8 text-[#C5A85C] stroke-[1.2]" />
            <div>
              <h4 className="text-xs tracking-wider font-medium uppercase text-neutral-200">WIDE COLLECTION</h4>
              <p className="text-[10px] text-neutral-500 mt-1">Designed For Every Space</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Users2 className="w-8 h-8 text-[#C5A85C] stroke-[1.2]" />
            <div>
              <h4 className="text-xs tracking-wider font-medium uppercase text-neutral-200">EXPERT GUIDANCE</h4>
              <p className="text-[10px] text-neutral-500 mt-1">Personalized Assistance</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ShieldCheck className="w-8 h-8 text-[#C5A85C] stroke-[1.2]" />
            <div>
              <h4 className="text-xs tracking-wider font-medium uppercase text-neutral-200">AFTER-SALES SUPPORT</h4>
              <p className="text-[10px] text-neutral-500 mt-1">We Care Beyond Purchase</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SHOP BY CATEGORY */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <span className="text-[10px] tracking-[0.2em] font-medium text-[#C5A85C] uppercase">EXPLORE OUR DEPARTMENTS</span>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide">Designed for Every Space</h2>
          <div className="w-12 h-[1px] bg-[#C5A85C] mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link 
              key={cat.id} 
              href={`/products?category=${cat.slug}`}
              className="group relative h-96 overflow-hidden border border-white/5 gold-border-glow bg-[#0C0C0C]"
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src={cat.image_url || '/placeholder_product.jpg'}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.4] group-hover:brightness-[0.3]"
                />
              </div>
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-8 z-20 space-y-3">
                <h3 className="font-serif text-2xl tracking-wide text-white font-light group-hover:text-[#C5A85C] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed font-light">
                  {cat.description}
                </p>
                <div className="pt-2 flex items-center text-[10px] tracking-widest text-[#C5A85C] font-semibold">
                  DISCOVER MORE <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* LUXURY FEATURE: SHOP BY FINISH FAMILY */}
      <FinishFamilySelector />

      {/* SECTION 4: FEATURED COLLECTIONS */}
      <section className="py-24 px-6 bg-[#0C0C0C] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-4">
              <span className="text-[10px] tracking-[0.2em] font-medium text-[#C5A85C] uppercase">CURATED ABODE</span>
              <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide">Featured Collections</h2>
            </div>
            <Link 
              href="/collections" 
              className="text-xs tracking-widest font-medium text-[#C5A85C] hover:text-white transition-colors flex items-center"
            >
              VIEW ALL COLLECTIONS <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {collections.slice(0, 2).map((col) => (
              <div 
                key={col.id} 
                className="group relative h-[450px] overflow-hidden border border-white/5 bg-[#050505]"
              >
                <div className="absolute inset-0">
                  <Image
                    src={col.image_url || '/placeholder_product.jpg'}
                    alt={col.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105 brightness-[0.4]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-transparent to-transparent"></div>
                </div>

                <div className="absolute inset-0 p-12 flex flex-col justify-end space-y-4">
                  <h3 className="font-serif text-3xl tracking-wide font-light text-white">
                    {col.name}
                  </h3>
                  <p className="text-xs text-neutral-400 max-w-md font-light leading-relaxed">
                    {col.description}
                  </p>
                  <div className="pt-4">
                    <Link 
                      href={`/products?collection=${col.slug}`}
                      className="inline-block px-6 py-3 bg-[#C5A85C] text-[#050505] hover:bg-[#D4AF37] transition-all duration-300 font-medium text-[10px] tracking-widest uppercase"
                    >
                      EXPLORE DESIGN
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: MOST LOVED PRODUCTS */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <span className="text-[10px] tracking-[0.2em] font-medium text-[#C5A85C] uppercase">PREMIUM PICKS</span>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide">Our Most Loved Products</h2>
          </div>
          <Link 
            href="/products" 
            className="text-xs tracking-widest font-medium text-[#C5A85C] hover:text-white transition-colors flex items-center"
          >
            VIEW ALL PRODUCTS <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).map((p) => {
            const productImg = p.images && p.images.length > 0 ? p.images[0] : '/placeholder_product.jpg';
            return (
              <div 
                key={p.id} 
                className="group border border-white/5 bg-[#0C0C0C] flex flex-col h-full hover:border-[#C5A85C]/30 transition-all duration-500"
              >
                <Link href={`/products/${p.slug}`} className="relative h-72 w-full overflow-hidden block">
                  <Image
                    src={productImg}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                </Link>

                <div className="p-6 flex flex-col flex-grow space-y-4">
                  <div className="space-y-1">
                    <span className="text-[9px] tracking-wider text-neutral-500 uppercase">{p.category_name}</span>
                    <h3 className="font-serif text-lg tracking-wide text-neutral-200 line-clamp-1 group-hover:text-[#C5A85C] transition-colors">
                      <Link href={`/products/${p.slug}`}>{p.name}</Link>
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-2 mt-auto border-t border-white/5">
                    <span className="text-xs text-[#C5A85C] font-semibold">
                      {p.contact_for_price 
                        ? 'Contact for Price' 
                        : `₹${p.price?.toLocaleString('en-IN')}`}
                    </span>
                    <Link 
                      href={`/products/${p.slug}`} 
                      className="text-[10px] tracking-widest font-semibold hover:text-[#C5A85C] transition-colors uppercase"
                    >
                      VIEW DETAILS
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 6: PREMIUM INTERIOR INSPIRATION */}
      <section className="py-24 px-6 bg-[#0C0C0C] border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-[10px] tracking-[0.2em] font-medium text-[#C5A85C] uppercase">INSPIRE YOUR SPACE</span>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide leading-tight">Luxury Interior Ideas</h2>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Explore dynamic showroom mockups, luxury bath suites, and architectural layouts displaying our products in authentic high-end environments.
            </p>
            <div className="pt-4">
              <Link 
                href="/inspiration" 
                className="px-8 py-4 bg-transparent border border-[#C5A85C] text-[#C5A85C] hover:bg-[#C5A85C] hover:text-[#050505] transition-all duration-300 font-medium text-xs tracking-widest uppercase hover:scale-[1.02]"
              >
                EXPLORE INSPIRATION
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {galleryImages.slice(0, 2).map((img, i) => (
              <div 
                key={img.id}
                className={`relative h-96 overflow-hidden border border-white/5 ${
                  i === 1 ? 'hidden sm:block' : ''
                }`}
              >
                <Image
                  src={img.image_url}
                  alt={img.title || 'Inspiration'}
                  fill
                  className="object-cover brightness-75 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[9px] tracking-widest text-[#C5A85C] uppercase bg-black/60 px-2.5 py-1 inline-block mb-2 rounded-none">
                    {img.category}
                  </span>
                  <h4 className="font-serif text-lg text-white font-light line-clamp-1">{img.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: OUR BRANDS / DYNAMIC BRAND SECTION */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-b border-white/5 text-center">
        <h3 className="text-[10px] tracking-[0.2em] font-medium text-neutral-500 uppercase mb-8">
          OUR COLLECTION PARTNERS
        </h3>
        {brands.length === 0 ? (
          <p className="text-xs text-neutral-600 italic tracking-wider">
            Displaying curated exclusive lines. Brand partnerships can be managed dynamically through settings.
          </p>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-60">
            {brands.map((b) => (
              <div key={b.id} className="relative h-12 w-32 filter grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300">
                {b.logo_url ? (
                  <Image src={b.logo_url} alt={b.name} fill className="object-contain" />
                ) : (
                  <span className="text-sm font-semibold tracking-widest text-neutral-400">{b.name}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SECTION 8: WHY CHOOSE THE LUXURY HUB */}
      <section className="py-24 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <span className="text-[10px] tracking-[0.2em] font-medium text-[#C5A85C] uppercase">OUR VALUES</span>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide">Why Choose The Luxury Hub</h2>
            <div className="w-12 h-[1px] bg-[#C5A85C] mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-neutral-900 border border-[#C5A85C]/20 flex items-center justify-center mx-auto rounded-none">
                <span className="text-lg font-serif text-[#C5A85C] font-semibold">01</span>
              </div>
              <h3 className="font-serif text-xl tracking-wide text-neutral-200">Exclusivity</h3>
              <p className="text-xs text-neutral-500 leading-relaxed max-w-sm mx-auto font-light">
                We partner with high-end global designers to secure fixtures that are architectural, modern, and unique to our showroom.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-neutral-900 border border-[#C5A85C]/20 flex items-center justify-center mx-auto rounded-none">
                <span className="text-lg font-serif text-[#C5A85C] font-semibold">02</span>
              </div>
              <h3 className="font-serif text-xl tracking-wide text-neutral-200">Craftsmanship</h3>
              <p className="text-xs text-neutral-500 leading-relaxed max-w-sm mx-auto font-light">
                From hand-blown pendant glass to high-density vitrified ceramics and PVD faucet plating, we offer products engineered for life.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-neutral-900 border border-[#C5A85C]/20 flex items-center justify-center mx-auto rounded-none">
                <span className="text-lg font-serif text-[#C5A85C] font-semibold">03</span>
              </div>
              <h3 className="font-serif text-xl tracking-wide text-neutral-200">Consultation</h3>
              <p className="text-xs text-neutral-500 leading-relaxed max-w-sm mx-auto font-light">
                Our in-showroom designers assist you with selecting coordinate finishes, technical drafts, and bespoke structural hardware fittings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: ABOUT / STORY PREVIEW */}
      <section className="py-24 px-6 bg-[#0C0C0C] border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[480px] w-full border border-white/5 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
              alt="Premium Interior View"
              fill
              className="object-cover brightness-75"
            />
          </div>

          <div className="space-y-6">
            <span className="text-[10px] tracking-[0.2em] font-medium text-[#C5A85C] uppercase">OUR STORY</span>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide leading-tight">Elevating Spaces, Inspiring Living</h2>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              THE LUXURY HUB has established itself as an upscale architectural showroom dealing in high-end sanitaryware, premium bathroom systems, lights, and luxury cabinet fittings. 
            </p>
            <p className="text-xs text-neutral-500 leading-relaxed font-light">
              We believe that luxury lies in the details. Our philosophy focuses on combining architectural elegance with engineering performance. We assist luxury homeowners, architects, and designers in constructing bathroom spaces that function as sanctuary environments.
            </p>
            <div className="pt-4">
              <Link 
                href="/about" 
                className="text-xs tracking-widest font-semibold text-[#C5A85C] hover:text-white transition-colors flex items-center"
              >
                DISCOVER OUR STORY <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: OWNER / TEAM PREVIEW */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-20">
          <span className="text-[10px] tracking-[0.2em] font-medium text-[#C5A85C] uppercase">THE VISIONARIES</span>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide">The People Behind The Luxury Hub</h2>
          <div className="w-12 h-[1px] bg-[#C5A85C] mx-auto mt-4"></div>
        </div>

        <div className={`grid grid-cols-1 ${teamMembers.length > 1 ? 'md:grid-cols-2 max-w-4xl' : 'max-w-xl'} gap-12 mx-auto`}>
          {teamMembers.map((member) => (
            <div 
              key={member.id} 
              className="group border border-white/5 bg-[#0C0C0C] p-8 text-center space-y-6 hover:border-[#C5A85C]/20 transition-all duration-500 w-full"
            >
              {/* Photo Area */}
              <div className="relative w-36 h-36 mx-auto bg-neutral-900 border border-white/5 overflow-hidden flex items-center justify-center">
                {member.photo_url ? (
                  <Image src={member.photo_url} alt={member.name} fill className="object-cover" />
                ) : (
                  <Users2 className="w-12 h-12 text-neutral-700 stroke-[1.2]" />
                )}
              </div>

              {/* Bio Details */}
              <div className="space-y-2">
                <h3 className="font-serif text-xl tracking-wide text-neutral-200">{member.name}</h3>
                <span className="text-[10px] tracking-widest text-[#C5A85C] uppercase font-medium">{member.role}</span>
                <p className="text-xs text-neutral-500 leading-relaxed font-light mt-4 pt-4 border-t border-white/5">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 11: SHOWROOM EXPERIENCE */}
      <section className="py-24 px-6 bg-[#0C0C0C] border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="text-[10px] tracking-[0.2em] font-medium text-[#C5A85C] uppercase">VISIT US</span>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide leading-tight">Experience Luxury in Person</h2>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              We invite you to schedule a visit to our flagship showroom. Touch our PVD faucet coatings, inspect the rimless tornado flush basins, and consult with our hardware engineers under warm, natural architectural settings.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/5 text-xs text-neutral-400">
              <div className="space-y-2">
                <h4 className="font-serif text-sm text-[#C5A85C] uppercase tracking-wide">ADDRESS</h4>
                <p className="font-light leading-relaxed">{business.address}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-serif text-sm text-[#C5A85C] uppercase tracking-wide">HOURS</h4>
                <p className="font-light leading-relaxed">{business.opening_hours}</p>
              </div>
            </div>

            <div className="pt-6">
              <Link 
                href="/showroom" 
                className="inline-block px-8 py-4 bg-[#C5A85C] text-[#050505] hover:bg-[#D4AF37] transition-all duration-300 font-medium text-xs tracking-widest uppercase hover:scale-[1.02]"
              >
                SHOWROOM DETAILS
              </Link>
            </div>
          </div>

          {/* Map/Image Placeholder */}
          <div className="relative h-96 w-full border border-white/5 bg-neutral-900/50 flex flex-col items-center justify-center p-6 text-center">
            <MapPin className="w-10 h-10 text-[#C5A85C] stroke-[1.2] mb-4" />
            <h4 className="font-serif text-xl tracking-wide text-neutral-200 mb-2">Showroom Map Location</h4>
            <p className="text-xs text-neutral-500 max-w-sm mb-6 font-light">
              Interactive Google Maps can be dynamically embedded by the owner through settings.
            </p>
            <Link 
              href="/showroom"
              className="text-[10px] tracking-widest font-semibold hover:text-[#C5A85C] transition-colors uppercase border border-white/10 px-4 py-2 hover:border-[#C5A85C]"
            >
              GET DIRECTIONS
            </Link>
          </div>
        </div>
      </section>

      {/* LUXURY FEATURE: ARCHITECT & INTERIOR DESIGNER TRADE CONCIERGE */}
      <ArchitectTradeConcierge whatsappNumber={whatsappNumber} />

      {/* SECTION 12: CONTACT / WHATSAPP CTA */}
      <section className="py-28 px-6 bg-gradient-to-b from-[#0C0C0C] to-[#050505] text-center border-t border-white/5">
        <div className="max-w-3xl mx-auto space-y-8">
          <span className="text-[10px] tracking-[0.2em] font-medium text-[#C5A85C] uppercase">START YOUR JOURNEY</span>
          <h2 className="font-serif text-4xl md:text-6xl font-light tracking-wide leading-tight text-white">
            Have a project in mind? Let&apos;s talk.
          </h2>
          <p className="text-xs md:text-sm text-neutral-400 max-w-md mx-auto leading-relaxed font-light">
            Enquire about custom configurations, variant finishes, or request layout assistance directly with our team.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href={generalWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-[#25D366] text-white hover:bg-[#20ba59] transition-all duration-300 font-semibold text-xs tracking-widest uppercase flex items-center justify-center"
            >
              <MessageSquare className="w-4 h-4 mr-2" /> ENQUIRE ON WHATSAPP
            </a>
            <Link 
              href="/contact" 
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white hover:border-[#C5A85C] hover:text-[#C5A85C] transition-all duration-300 font-medium text-xs tracking-widest uppercase"
            >
              FILL ENQUIRY FORM
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
