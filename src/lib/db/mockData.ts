import { Category, Brand, Collection, Product, ProductVariant, GalleryImage, TeamMember, FAQ, WebsiteSettings } from '../types';

export const initialCategories: Category[] = [
  {
    id: 'cat-sanitaryware',
    name: 'Sanitaryware',
    slug: 'sanitaryware',
    description: 'Elegance in every detail. Discover our range of premium basins, wall hung suites, and modern bathtubs.',
    image_url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
    display_order: 1,
    is_active: true
  },
  {
    id: 'cat-faucets',
    name: 'Faucets',
    slug: 'faucets',
    description: 'Performance meets style. Designer mixers, wall taps, and premium gold faucets built to last.',
    image_url: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=800',
    display_order: 2,
    is_active: true
  },
  {
    id: 'cat-showers',
    name: 'Showers',
    slug: 'showers',
    description: 'Experience the luxury of water. Smart thermostats, designer body jets, and overhead rain showers.',
    image_url: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&q=80&w=800',
    display_order: 3,
    is_active: true
  },
  {
    id: 'cat-accessories',
    name: 'Bathroom Accessories',
    slug: 'bathroom-accessories',
    description: 'Complete your space. Premium towel rails, robe hooks, soap dispensers, and designer accessories.',
    image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    display_order: 4,
    is_active: true
  },
  {
    id: 'cat-lighting',
    name: 'Lighting',
    slug: 'lighting',
    description: 'Brighten every moment. Elegant bathroom pendant lamps, vanity lighting, and warm architectural lights.',
    image_url: 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?auto=format&fit=crop&q=80&w=800',
    display_order: 5,
    is_active: true
  },
  {
    id: 'cat-mirrors',
    name: 'Mirrors',
    slug: 'mirrors',
    description: 'Reflecting luxury. Intelligent LED backlit vanity mirrors, anti-fog panels, and designer shapes.',
    image_url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800',
    display_order: 6,
    is_active: true
  },
  {
    id: 'cat-door-hardware',
    name: 'Door Hardware',
    slug: 'door-hardware',
    description: 'Premium entryways. Sleek mortise handles, security cylinders, and modern locks.',
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
    display_order: 7,
    is_active: true
  },
  {
    id: 'cat-cabinet-hardware',
    name: 'Cabinet Hardware',
    slug: 'cabinet-hardware',
    description: 'Sleek finishing touches. Brass knobs, designer cabinet pulls, and modern T-bars.',
    image_url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800',
    display_order: 8,
    is_active: true
  },
  {
    id: 'cat-interior-hardware',
    name: 'Interior Hardware',
    slug: 'interior-hardware',
    description: 'Architectural structural hardware. Premium glass hinges, magnetic catches, and sliding systems.',
    image_url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
    display_order: 9,
    is_active: true
  }
];

export const initialBrands: Brand[] = []; // Starts empty dynamically as per specifications

export const initialCollections: Collection[] = [
  {
    id: 'col-modern',
    name: 'Modern Collection',
    slug: 'modern-collection',
    description: 'Sleek lines, dark finishes, and smart functionalities designed for the contemporary urban home.',
    image_url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800',
    is_featured: true,
    is_active: true
  },
  {
    id: 'col-luxury-gold',
    name: 'Gold Finish Collection',
    slug: 'gold-finish-collection',
    description: 'Champagne gold accents and premium brushed brass fixtures that radiate warmth and high-end opulence.',
    image_url: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=800',
    is_featured: true,
    is_active: true
  },
  {
    id: 'col-minimal',
    name: 'Minimalist Collection',
    slug: 'minimalist-collection',
    description: 'Pure geometries, hidden spouts, and absolute simplicity. Luxury defined by what is absent.',
    image_url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
    is_featured: false,
    is_active: true
  }
];

export const initialProducts: Product[] = [
  {
    id: 'prod-basin-1',
    name: 'Luxury Basin Collection',
    product_code: 'TLH-BSN-001',
    slug: 'luxury-basin-collection',
    category_id: 'cat-sanitaryware',
    brand_id: null,
    collection_id: 'col-minimal',
    price: 24800,
    contact_for_price: false,
    short_description: 'An elegant countertop wash basin crafted from high-density ceramic with a marble-texture finish.',
    description: 'Our Luxury Basin Collection features a premium matte countertop basin with clean, architectural lines. Made from superior impact-resistant vitrified ceramic, it features a special nano-glaze self-cleaning coating that prevents dirt accumulation. Available in standard warm white, matte black, and gold-rimmed marble pattern variants.',
    material: 'Premium Ceramic',
    finish: 'Vitrified Matte Ceramic',
    dimensions: '480mm x 370mm x 130mm',
    specifications: [
      { key: 'Installation Type', value: 'Countertop' },
      { key: 'Overflow', value: 'No' },
      { key: 'Net Weight', value: '8.5 kg' },
      { key: 'Coating', value: 'Hydrophobic Nano-Glaze' }
    ],
    features: [
      'Stain-resistant vitrified glaze',
      'Ultra-thin architectural rim design',
      'High impact resistance',
      'Compatible with wall-hung or tall countertop basin faucets'
    ],
    pdf_url: '/dummy_catalogue.pdf',
    is_featured: true,
    is_available: true,
    status: 'published'
  },
  {
    id: 'prod-faucet-1',
    name: 'Premium Gold Faucet',
    product_code: 'TLH-FCT-002',
    slug: 'premium-gold-faucet',
    category_id: 'cat-faucets',
    brand_id: null,
    collection_id: 'col-luxury-gold',
    price: 18500,
    contact_for_price: false,
    short_description: 'A tall countertop basin mixer finished in premium brushed gold, featuring a German ceramic cartridge.',
    description: 'Elevate your basin setup with the Premium Gold Faucet. Engineered with a solid brass body, this tall mixer offers a water-saving aerated spout and a luxurious brushed champagne gold finish. The ceramic disk valves are tested for over 500,000 cycles to guarantee leak-proof performance.',
    material: 'Dezincification-Resistant (DR) Brass',
    finish: 'Brushed Gold PVD Coating',
    dimensions: 'Height: 310mm, Spout Reach: 185mm',
    specifications: [
      { key: 'Cartridge', value: 'German Sedal Ceramic Disc' },
      { key: 'Aerator', value: 'Neoperl Honeycomb Aerator' },
      { key: 'Water Pressure', value: '1.0 to 5.0 Bar' },
      { key: 'Hose Connector', value: 'G 1/2 Threaded Inlet Pipes' }
    ],
    features: [
      'PVD (Physical Vapor Deposition) finish resistant to corrosion and tarnishing',
      'Hot & cold water flow control',
      'Neoperl aerator saves up to 40% water while maintaining optimal flow',
      'Sleek single-lever design'
    ],
    pdf_url: null,
    is_featured: true,
    is_available: true,
    status: 'published'
  },
  {
    id: 'prod-shower-1',
    name: 'Designer Rain Shower',
    product_code: 'TLH-SHW-003',
    slug: 'designer-rain-shower',
    category_id: 'cat-showers',
    brand_id: null,
    collection_id: 'col-luxury-gold',
    price: 32600,
    contact_for_price: false,
    short_description: 'A luxury overhead multi-function rain shower system with a wall-mounted brass arm and hand shower.',
    description: 'Experience the ultimate spa ritual with our Designer Rain Shower system. Featuring an ultra-slim 12-inch overhead plate, this shower creates a soft, oxygenated rain flow that relaxes the senses. The package includes a solid brass 3-way diverter, a sleek square slide rail, and a multi-function handheld shower.',
    material: 'Grade-A Solid Brass & SUS304 Stainless Steel',
    finish: 'Brushed Champagne Gold',
    dimensions: 'Showerhead: 300mm x 300mm, Arm Length: 400mm',
    specifications: [
      { key: 'Diverter', value: '3-Way Thermostatic Diverter' },
      { key: 'Nozzles', value: 'Anti-Clog Silicone Rub-Clean Nozzles' },
      { key: 'Flow Rate', value: '9.5 Liters/min at 3 Bar' },
      { key: 'Shower Arm', value: 'Heavy Duty Wall Mounted Arm' }
    ],
    features: [
      'Thermostatic safety valve prevents sudden temperature spikes',
      'Anti-lime silicone nozzles make cleaning lime deposits effortless',
      'Air-injection technology adds oxygen to droplets for a fuller spray feel',
      'Heavy-duty solid brass internal waterways'
    ],
    pdf_url: '/dummy_catalogue.pdf',
    is_featured: true,
    is_available: true,
    status: 'published'
  },
  {
    id: 'prod-wallhung-1',
    name: 'Modern Wall Hung Suite',
    product_code: 'TLH-WHS-004',
    slug: 'modern-wall-hung-suite',
    category_id: 'cat-sanitaryware',
    brand_id: null,
    collection_id: 'col-modern',
    price: 28900,
    contact_for_price: false,
    short_description: 'A rimless wall-hung toilet suite featuring dual-flush cistern and quiet soft-closing slim seat cover.',
    description: 'The Modern Wall Hung Suite is the epitome of hygiene and minimalist interior architecture. By keeping the floor clear, it maximizes space in your bathroom. Our advanced Rimless Flushing Technology ejects water with high pressure to sweep the entire inner bowl clean while using less water.',
    material: 'Vitrified Ceramic & PP Seat Cover',
    finish: 'Sleek Matte Black',
    dimensions: '530mm Depth x 360mm Width x 350mm Height',
    specifications: [
      { key: 'Flush System', value: 'Tornado Rimless Flushing' },
      { key: 'Water Consumption', value: '3 / 4.5 Liters Dual Flush' },
      { key: 'Seat Cover', value: 'UF Slim Soft Close Seat' },
      { key: 'Trap Distance', value: 'P-Trap 180mm' }
    ],
    features: [
      'Rimless bowl for superior hygiene and effortless wipe-down cleaning',
      'Elegant matte obsidian finish (also available in matte white)',
      'Quick-release seat cover hinges for deep sanitation',
      'Whisper-quiet soft closing hinges'
    ],
    pdf_url: null,
    is_featured: true,
    is_available: true,
    status: 'published'
  },
  {
    id: 'prod-mirror-1',
    name: 'Luxury Bathroom Mirror',
    product_code: 'TLH-MIR-005',
    slug: 'luxury-bathroom-mirror',
    category_id: 'cat-mirrors',
    brand_id: null,
    collection_id: 'col-modern',
    price: null,
    contact_for_price: true,
    short_description: 'A round backlit smart LED mirror with touch sensor, anti-fog heater, and three color temperature modes.',
    description: 'The Luxury Bathroom Mirror brings intelligent, ambient illumination to the modern vanity. Outfitted with high-lumen, high-CRI LED strips behind copper-free silver mirror glass, it provides shadow-free facial lighting. Touch-sensitive switches controls power, color toggling, and the built-in heating demister pad.',
    material: '5mm Eco-friendly Copper-Free Silver Mirror & Aluminum Frame',
    finish: 'Sandblasted Frosted Glass Border',
    dimensions: 'Diameter: 800mm, Thickness: 35mm',
    specifications: [
      { key: 'LED Color Temps', value: '3000K Warm, 4000K Neutral, 6000K Daylight' },
      { key: 'Defogger', value: 'Automatic 45-min Auto-off Demister Pad' },
      { key: 'Waterproof Rating', value: 'IP44 Bathroom Zone 2 Approved' },
      { key: 'Input Power', value: 'AC 220-240V, 50Hz' }
    ],
    features: [
      'Touch control switch with memory settings',
      'Step-less dimming to set the perfect mood lighting',
      'Integrated heating element keeps the center clear from steam condensation',
      'Shatter-proof backing film for high residential safety'
    ],
    pdf_url: null,
    is_featured: false,
    is_available: true,
    status: 'published'
  },
  {
    id: 'prod-door-hw-1',
    name: 'Premium Door Hardware',
    product_code: 'TLH-DHW-006',
    slug: 'premium-door-hardware',
    category_id: 'cat-door-hardware',
    brand_id: null,
    collection_id: 'col-minimal',
    price: null,
    contact_for_price: true,
    short_description: 'A designer solid brass mortise door handle with a sleek rectangular escutcheon and magnetic latch compatibility.',
    description: 'Welcome luxury with every touch. Crafted from solid forged brass and polished by hand, this premium door handle features a smooth spring-back lever motion and coordinates with high-security Euro-profile cylinders. Its clean geometric silhouette is the choice of luxury architects and interior designers.',
    material: 'Forged Solid Brass',
    finish: 'Brushed Champagne Gold & Antique Bronze',
    dimensions: 'Lever length: 135mm, Plate width: 50mm',
    specifications: [
      { key: 'Mechanism', value: 'Double Action Heavy Duty Spring' },
      { key: 'Spindle Size', value: '8mm x 8mm steel spindle' },
      { key: 'Suitable Doors', value: '35mm to 55mm thickness' },
      { key: 'Screws', value: 'Concealed fixings' }
    ],
    features: [
      'Ergonomically contoured solid brass handle weight',
      'Highly durable spring mechanism guarantees no handle sag over time',
      'Elegant metallic finishes matching our cabinet and sanitary collections',
      'Compatible with standard lock bodies and electronic key cylinders'
    ],
    pdf_url: null,
    is_featured: false,
    is_available: true,
    status: 'published'
  },
  {
    id: 'prod-lighting-1',
    name: 'Designer Lighting Collection',
    product_code: 'TLH-LTG-007',
    slug: 'designer-lighting-collection',
    category_id: 'cat-lighting',
    brand_id: null,
    collection_id: 'col-luxury-gold',
    price: null,
    contact_for_price: true,
    short_description: 'An artistic bathroom pendant light crafted from bubble glass and brass, casting a warm ambient glow.',
    description: 'Add a dramatic architectural touch to your bathroom or living space. The Designer Lighting Collection includes this vertical pendant light featuring a hand-blown cylinder bubble glass sleeve paired with a brushed brass collar. Creates a shimmering rain-like light effect on surrounding tile walls.',
    material: 'Solid Brass & Hand-Blown Bubble Glass',
    finish: 'Brushed Brass',
    dimensions: 'Glass Height: 400mm, Diameter: 70mm, Cord: 1.5m Adjustable',
    specifications: [
      { key: 'Bulb Fitting', value: 'Integrated LED 8W COB' },
      { key: 'Lumen Output', value: '640 lm' },
      { key: 'Color Temperature', value: '2700K Warm Soft Glow' },
      { key: 'Dimmable', value: 'Triac Dimmable (Trailing Edge)' }
    ],
    features: [
      'Handmade bubble glass patterns render unique lighting caustics',
      'IP44 splash resistance makes it safe to install near vanity basins',
      'Fully adjustable cable length to accommodate different ceiling heights',
      'Premium solid brass top cap and matching ceiling canopy'
    ],
    pdf_url: null,
    is_featured: false,
    is_available: true,
    status: 'published'
  },
  {
    id: 'prod-chandelier-rosegold',
    name: 'Rose Gold Curved Layered Chandelier',
    name_hi: 'रोज़ गोल्ड कर्व्ड लेयर्ड झूमर',
    product_code: 'TLH-CHND-002',
    slug: 'rose-gold-curved-layered-chandelier',
    category_id: 'cat-lighting',
    brand_id: null,
    collection_id: 'col-modern',
    price: 58000,
    contact_for_price: false,
    short_description: 'An architectural rose gold chandelier featuring organic wavy fluted acrylic panels and central brass pillars.',
    short_description_hi: 'रोज़ गोल्ड वेवी एक्रिलिक पैनल्स और ब्रास पिलर्स वाला आर्किटेक्चरल झूमर।',
    description: 'Featuring fluid organic curves, the Rose Gold Curved Layered Chandelier blends sculpture with light. Structured in electroplated rose gold brass with translucent textured acrylic wave surrounds, it casts soft ambient warmth.',
    description_hi: 'रोज़ गोल्ड वेवी एक्रिलिक पैनल्स वाला यह झूमर बेडरूम और लाउंज एरिया को क्लासिक लुक देता है।',
    material: 'Rose Gold Electroplated Brass & Ribbed Acrylic',
    finish: 'Mirror Rose Gold',
    dimensions: 'Diameter: 800mm, Height: 450mm',
    specifications: [
      { key: 'Fitting', value: '8 x E14 LED Bulbs' },
      { key: 'Frame', value: 'Rose Gold Electroplated Stainless Steel' }
    ],
    features: [
      'Translucent ribbed wave panels diffuser',
      'Corrosion resistant electroplated rose gold canopy'
    ],
    pdf_url: null,
    is_featured: true,
    is_available: true,
    status: 'published'
  },
  {
    id: 'prod-chandelier-royal',
    name: 'Royal French Gold Crystal Droplet Chandelier',
    name_hi: 'रॉयल फ्रेंच गोल्ड क्रिस्टल झूमर',
    product_code: 'TLH-CHND-003',
    slug: 'royal-french-gold-crystal-droplet-chandelier',
    category_id: 'cat-lighting',
    brand_id: null,
    collection_id: 'col-luxury-gold',
    price: 85000,
    contact_for_price: false,
    short_description: 'A regal French gold multi-arm chandelier with hand-cut crystal droplets and warm candle bulbs.',
    short_description_hi: 'रॉयल फ्रेंच गोल्ड मल्टी-आर्म क्रिस्टल झूमर आलीशान बैठकों के लिए।',
    description: 'The Royal French Gold Crystal Droplet Chandelier is a masterpiece of classic luxury. Featuring hand-cast brass arms plated in 24K shade French gold, draped with sparkling tear-drop crystals and glass bobeches.',
    description_hi: 'शाही फ्रेंच गोल्ड क्रिस्टल झूमर क्लासिक डाइनिंग और हॉल के लिए बनाया गया है।',
    material: 'Forged Brass & K9 Precision Crystals',
    finish: 'French Antique Gold',
    dimensions: 'Diameter: 950mm, Height: 900mm',
    specifications: [
      { key: 'Candle Bulbs', value: '10 x E14 Warm Flame Bulbs' },
      { key: 'Chain Length', value: '1.2 meters Heavy Duty' }
    ],
    features: [
      'Hand-cut optical crystal prism teardrops',
      'Solid forged brass scrollwork arms'
    ],
    pdf_url: null,
    is_featured: true,
    is_available: true,
    status: 'published'
  }
];

export const initialProductImages = [
  { id: 'img-1', product_id: 'prod-basin-1', image_url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800', display_order: 1 },
  { id: 'img-2', product_id: 'prod-basin-1', image_url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800', display_order: 2 },
  { id: 'img-3', product_id: 'prod-faucet-1', image_url: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=800', display_order: 1 },
  { id: 'img-4', product_id: 'prod-shower-1', image_url: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&q=80&w=800', display_order: 1 },
  { id: 'img-5', product_id: 'prod-wallhung-1', image_url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=800', display_order: 1 },
  { id: 'img-6', product_id: 'prod-mirror-1', image_url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800', display_order: 1 },
  { id: 'img-7', product_id: 'prod-door-hw-1', image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800', display_order: 1 },
  { id: 'img-8', product_id: 'prod-lighting-1', image_url: 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?auto=format&fit=crop&q=80&w=800', display_order: 1 },
  { id: 'img-chnd-2', product_id: 'prod-chandelier-rosegold', image_url: '/chandeliers/rose-gold-curved.jpg', display_order: 1 },
  { id: 'img-chnd-3', product_id: 'prod-chandelier-royal', image_url: '/chandeliers/royal-french-crystal.jpg', display_order: 1 }
];

export const initialProductVariants: ProductVariant[] = [
  // Luxury Basin Collection variants
  { id: 'var-1', product_id: 'prod-basin-1', name: 'Vitrified Matte White', sku: 'TLH-BSN-001-MW', finish: 'Matte White', price: 24800, is_available: true, display_order: 1 },
  { id: 'var-2', product_id: 'prod-basin-1', name: 'Vitrified Matte Black', sku: 'TLH-BSN-001-MB', finish: 'Matte Black', price: 26800, is_available: true, display_order: 2 },
  { id: 'var-3', product_id: 'prod-basin-1', name: 'Gold Rimmed Marble Pattern', sku: 'TLH-BSN-001-GM', finish: 'Gold Rimmed Marble', price: 31000, is_available: true, display_order: 3 },
  
  // Premium Gold Faucet variants
  { id: 'var-4', product_id: 'prod-faucet-1', name: 'Brushed Champagne Gold', sku: 'TLH-FCT-002-BG', finish: 'Brushed Gold', price: 18500, is_available: true, display_order: 1 },
  { id: 'var-5', product_id: 'prod-faucet-1', name: 'Matte Black', sku: 'TLH-FCT-002-MB', finish: 'Matte Black', price: 15900, is_available: true, display_order: 2 },
  { id: 'var-6', product_id: 'prod-faucet-1', name: 'Polished Chrome', sku: 'TLH-FCT-002-CH', finish: 'Polished Chrome', price: 14500, is_available: true, display_order: 3 },

  // Designer Rain Shower variants
  { id: 'var-7', product_id: 'prod-shower-1', name: 'Brushed Champagne Gold', sku: 'TLH-SHW-003-BG', finish: 'Brushed Gold', price: 32600, is_available: true, display_order: 1 },
  { id: 'var-8', product_id: 'prod-shower-1', name: 'Matte Obsidian Black', sku: 'TLH-SHW-003-MB', finish: 'Matte Black', price: 29500, is_available: true, display_order: 2 },

  // Modern Wall Hung Suite variants
  { id: 'var-9', product_id: 'prod-wallhung-1', name: 'Matte Black', sku: 'TLH-WHS-004-MB', finish: 'Matte Black', price: 28900, is_available: true, display_order: 1 },
  { id: 'var-10', product_id: 'prod-wallhung-1', name: 'Glossy White', sku: 'TLH-WHS-004-GW', finish: 'Glossy White', price: 23500, is_available: true, display_order: 2 }
];

export const initialGalleryImages: GalleryImage[] = [
  {
    id: 'gal-1',
    title: 'Luxury Obsidian Bathroom Suite',
    description: 'A masterfully curated bathroom showcase featuring our matte black wall hung suites, concealed gold fittings, and custom ambient architectural panel lighting.',
    image_url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200',
    category: 'Bathrooms',
    associated_products: ['prod-wallhung-1', 'prod-mirror-1'],
    display_order: 1
  },
  {
    id: 'gal-2',
    title: 'Warm Architectural Lighting Detail',
    description: 'Delicate placement of hand-blown glass pendants combined with brushed gold mixers highlights the natural grain of marble countertop tiles.',
    image_url: 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?auto=format&fit=crop&q=80&w=1200',
    category: 'Lighting',
    associated_products: ['prod-lighting-1', 'prod-faucet-1'],
    display_order: 2
  },
  {
    id: 'gal-3',
    title: 'Champagne Gold Shower Alcove',
    description: 'A sleek recessed shower shelf accented by brushed gold wall controls, featuring our 12-inch rain-head ceiling panel.',
    image_url: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&q=80&w=1200',
    category: 'Showers',
    associated_products: ['prod-shower-1'],
    display_order: 3
  },
  {
    id: 'gal-chnd-2',
    title: 'Rose Gold Curved Acrylic Layered Lounge',
    description: 'An architectural rose gold chandelier featuring organic wavy fluted acrylic panels and central brass pillars.',
    image_url: '/chandeliers/rose-gold-curved.jpg',
    category: 'Chandeliers',
    associated_products: ['prod-chandelier-rosegold'],
    display_order: 1
  },
  {
    id: 'gal-chnd-3',
    title: 'Royal French Gold Crystal Droplet Hall',
    description: 'A regal French gold multi-arm chandelier with hand-cut crystal droplets and warm candle bulbs.',
    image_url: '/chandeliers/royal-french-crystal.jpg',
    category: 'Chandeliers',
    associated_products: ['prod-chandelier-royal'],
    display_order: 2
  }
];

export const initialTeamMembers: TeamMember[] = [
  {
    id: 'team-owner',
    name: 'Vikram Shekhawat',
    role: 'Founder & Managing Director',
    bio: 'Founder of THE LUXURY HUB, Jaipur. Passionate about curating world-class sanitaryware, architectural lighting, and bespoke interior hardware for luxury homes and architectural projects.',
    photo_url: '/vikram_shekhawat.png',
    display_order: 1,
    is_active: true
  }
];

export const initialFAQs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'How can I enquire about a product or request a quote?',
    answer: 'Simply browse our dynamic product catalog, select any finishes or variants you prefer, and click "Add to Enquiry". Once your list is complete, open your Enquiry Cart and click "Send Enquiry on WhatsApp". This will compile your selections into a structured message and open it directly with our sales representative on WhatsApp. Alternatively, you can fill out the contact form on our Contact page.',
    display_order: 1,
    is_active: true
  },
  {
    id: 'faq-2',
    question: 'Can I place and complete an order directly through WhatsApp?',
    answer: 'Yes! THE LUXURY HUB operates on an Enquiry & Direct Consultation business model. When you click "Enquire on WhatsApp", you are connected directly with our showroom team who will check stock availability, provide custom quotations, coordinate shipping options, and finalize payments through direct chat.',
    display_order: 2,
    is_active: true
  },
  {
    id: 'faq-3',
    question: 'Do you provide printed or PDF product catalogues?',
    answer: 'Yes, premium catalog PDFs are available for download on individual product detail pages when supplied by our collection partners. The download link appears under the "Download Catalogue" button.',
    display_order: 3,
    is_active: true
  },
  {
    id: 'faq-4',
    question: 'Do products come in different finishes?',
    answer: 'Many of our faucets, basins, showers, and hardwares support customizable finishes including Polished Chrome, Matte Black, Brushed Gold, and Antique Bronze. The available finishes can be viewed and selected directly on each product details page.',
    display_order: 4,
    is_active: true
  },
  {
    id: 'faq-5',
    question: 'How can I verify product availability and lead times?',
    answer: 'Since we curate a highly premium and exclusive catalog, some products are imported or made-to-order. By clicking the WhatsApp button next to a product, our team can instantly verify physical showroom stock levels or calculate lead times for custom hardware orders.',
    display_order: 5,
    is_active: true
  }
];

export const initialSettings: WebsiteSettings = {
  business: {
    name: 'THE LUXURY HUB',
    address: 'Kalwar Rd, Manglam City, Govindpura, Jaipur, Hathoj, Rajasthan 302012',
    phone: '+91 8619193954 / +91 8306769710 / +91 9667431239',
    email: 'Vikramshekhawat3177@gmail.com',
    opening_hours: 'Open 24 Hours | Monday – Sunday'
  },
  whatsapp: {
    number: '918619193954',
    secondary_number: '918306769710',
    default_message: 'Hello The Luxury Hub, I would like to know more about your premium sanitaryware, lighting & hardware catalogue.'
  },
  social: {
    instagram: 'https://www.instagram.com/the_luxury_hub1/',
    facebook: '',
    other: ''
  },
  homepage: {
    hero_title: 'ELEVATE YOUR SPACE',
    hero_description: 'Premium Sanitaryware, Bathroom Fittings, Lighting & Interior Hardware',
    hero_images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1920'
    ]
  },
  seo: {
    default_title: 'THE LUXURY HUB | Premium Sanitaryware & Interior Hardware Showroom',
    default_description: 'Explore the high-end digital catalogue of THE LUXURY HUB, presenting luxury bathroom fittings, faucets, showers, mirrors, lights, and bespoke door hardware.',
    social_share_image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800'
  }
};
