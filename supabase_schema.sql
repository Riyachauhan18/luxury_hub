-- Drop existing tables if they exist (clean setup)
DROP TABLE IF EXISTS enquiry_items CASCADE;
DROP TABLE IF EXISTS enquiries CASCADE;
DROP TABLE IF EXISTS product_images CASCADE;
DROP TABLE IF EXISTS product_variants CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS collections CASCADE;
DROP TABLE IF EXISTS brands CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS gallery_images CASCADE;
DROP TABLE IF EXISTS team_members CASCADE;
DROP TABLE IF EXISTS faqs CASCADE;
DROP TABLE IF EXISTS website_settings CASCADE;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Categories
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL UNIQUE,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Brands
CREATE TABLE brands (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL UNIQUE,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    logo_url TEXT,
    banner_url TEXT,
    website_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Collections
CREATE TABLE collections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL UNIQUE,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Products
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    product_code VARCHAR(100) UNIQUE,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    brand_id UUID REFERENCES brands(id) ON DELETE SET NULL,
    collection_id UUID REFERENCES collections(id) ON DELETE SET NULL,
    price DECIMAL(12, 2) DEFAULT NULL,
    contact_for_price BOOLEAN DEFAULT TRUE,
    short_description TEXT,
    description TEXT,
    material VARCHAR(255),
    finish VARCHAR(255),
    dimensions VARCHAR(255),
    specifications JSONB DEFAULT '[]'::jsonb, -- array of {key, value}
    features TEXT[] DEFAULT '{}'::text[],
    pdf_url TEXT DEFAULT NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    is_available BOOLEAN DEFAULT TRUE,
    status VARCHAR(50) DEFAULT 'published', -- draft, published
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Product Images
CREATE TABLE product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Product Variants
CREATE TABLE product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    sku VARCHAR(100),
    finish VARCHAR(255),
    price DECIMAL(12, 2) DEFAULT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Inspiration Gallery
CREATE TABLE gallery_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255),
    description TEXT,
    image_url TEXT NOT NULL,
    category VARCHAR(100) NOT NULL, -- Bathrooms, Faucets, Lighting, etc.
    associated_products JSONB DEFAULT '[]'::jsonb, -- list of product ids or names
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Team Members
CREATE TABLE team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    bio TEXT,
    photo_url TEXT,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. FAQs
CREATE TABLE faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. Enquiries
CREATE TABLE enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255),
    customer_phone VARCHAR(50) NOT NULL,
    message TEXT,
    status VARCHAR(50) DEFAULT 'new', -- new, contacted, in_progress, completed, closed
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 11. Enquiry Items
CREATE TABLE enquiry_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enquiry_id UUID REFERENCES enquiries(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    product_name VARCHAR(255) NOT NULL,
    product_code VARCHAR(100),
    quantity INT DEFAULT 1,
    variant_finish VARCHAR(255)
);

-- 12. Website Settings
CREATE TABLE website_settings (
    key VARCHAR(255) PRIMARY KEY,
    value JSONB NOT NULL
);

-- Add Indexes for Performance
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_brand ON products(brand_id);
CREATE INDEX idx_products_collection ON products(collection_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_product_images_product ON product_images(product_id);
CREATE INDEX idx_product_variants_product ON product_variants(product_id);
CREATE INDEX idx_enquiry_items_enquiry ON enquiry_items(enquiry_id);

-- Enable Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiry_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies (Public Read Access for Catalog Data)
CREATE POLICY "Public Read Access on Categories" ON categories FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public Read Access on Brands" ON brands FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public Read Access on Collections" ON collections FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public Read Access on Products" ON products FOR SELECT USING (status = 'published' AND is_available = TRUE);
CREATE POLICY "Public Read Access on Product Images" ON product_images FOR SELECT USING (TRUE);
CREATE POLICY "Public Read Access on Product Variants" ON product_variants FOR SELECT USING (is_available = TRUE);
CREATE POLICY "Public Read Access on Gallery Images" ON gallery_images FOR SELECT USING (TRUE);
CREATE POLICY "Public Read Access on Team Members" ON team_members FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public Read Access on FAQs" ON faqs FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public Read Access on Website Settings" ON website_settings FOR SELECT USING (TRUE);

-- RLS Write Access Policies (Restricted to Admin Users)
-- Note: In a production Supabase auth environment, auth.role() = 'authenticated' is typical.
-- You can configure detailed admin verification policies based on your auth structure.
CREATE POLICY "Admin Write on Categories" ON categories FOR ALL TO authenticated USING (TRUE);
CREATE POLICY "Admin Write on Brands" ON brands FOR ALL TO authenticated USING (TRUE);
CREATE POLICY "Admin Write on Collections" ON collections FOR ALL TO authenticated USING (TRUE);
CREATE POLICY "Admin Write on Products" ON products FOR ALL TO authenticated USING (TRUE);
CREATE POLICY "Admin Write on Product Images" ON product_images FOR ALL TO authenticated USING (TRUE);
CREATE POLICY "Admin Write on Product Variants" ON product_variants FOR ALL TO authenticated USING (TRUE);
CREATE POLICY "Admin Write on Gallery" ON gallery_images FOR ALL TO authenticated USING (TRUE);
CREATE POLICY "Admin Write on Team" ON team_members FOR ALL TO authenticated USING (TRUE);
CREATE POLICY "Admin Write on FAQs" ON faqs FOR ALL TO authenticated USING (TRUE);
CREATE POLICY "Admin Write on Settings" ON website_settings FOR ALL TO authenticated USING (TRUE);

-- Enquiries (Public insert, Admin select/update)
CREATE POLICY "Public Insert Enquiries" ON enquiries FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Public Insert Enquiry Items" ON enquiry_items FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Admin Read/Update Enquiries" ON enquiries FOR ALL TO authenticated USING (TRUE);
CREATE POLICY "Admin Read/Update Enquiry Items" ON enquiry_items FOR ALL TO authenticated USING (TRUE);
