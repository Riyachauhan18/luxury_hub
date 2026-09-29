export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  display_order: number;
  is_active: boolean;
  created_at?: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
  banner_url: string | null;
  website_url: string | null;
  is_active: boolean;
  created_at?: string;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  is_featured: boolean;
  is_active: boolean;
  created_at?: string;
}

export interface ProductSpecification {
  key: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  name: string;
  sku: string | null;
  finish: string | null;
  price: number | null;
  is_available: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface Product {
  id: string;
  name: string;
  name_hi?: string | null;
  product_code: string | null;
  slug: string;
  category_id: string | null;
  brand_id: string | null;
  collection_id: string | null;
  price: number | null;
  contact_for_price: boolean;
  short_description: string | null;
  short_description_hi?: string | null;
  description: string | null;
  description_hi?: string | null;
  material: string | null;
  finish: string | null;
  dimensions: string | null;
  specifications: ProductSpecification[];
  features: string[];
  pdf_url: string | null;
  is_featured: boolean;
  is_available: boolean;
  status: 'published' | 'draft';
  created_at?: string;
  updated_at?: string;
  
  // Joined relations
  images?: string[];
  variants?: ProductVariant[];
  category_name?: string;
  brand_name?: string;
  collection_name?: string;
}

export interface GalleryImage {
  id: string;
  title: string | null;
  description: string | null;
  image_url: string;
  category: string; // Bathrooms, Faucets, Showers, Lighting, Hardware, Interiors
  associated_products: string[]; // List of product IDs or names
  display_order: number;
  created_at?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  photo_url: string | null;
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface EnquiryItem {
  id?: string;
  product_id: string | null;
  product_name: string;
  product_code: string | null;
  quantity: number;
  variant_finish: string | null;
  image_url?: string | null;
  price?: number | null;
}

export interface Enquiry {
  id: string;
  customer_name: string;
  customer_email: string | null;
  customer_phone: string;
  message: string | null;
  status: 'new' | 'contacted' | 'in_progress' | 'completed' | 'closed';
  created_at?: string;
  items?: EnquiryItem[];
}

export interface BusinessInfoSettings {
  name: string;
  address: string;
  phone: string;
  email: string;
  opening_hours: string;
}

export interface WhatsAppSettings {
  number: string;
  secondary_number?: string;
  default_message: string;
}

export interface SocialLinksSettings {
  instagram: string;
  facebook: string;
  other: string;
}

export interface HomepageSettings {
  hero_title: string;
  hero_description: string;
  hero_images: string[];
}

export interface SeoSettings {
  default_title: string;
  default_description: string;
  social_share_image: string;
}

export interface WebsiteSettings {
  business: BusinessInfoSettings;
  whatsapp: WhatsAppSettings;
  social: SocialLinksSettings;
  homepage: HomepageSettings;
  seo: SeoSettings;
}
