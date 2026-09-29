import { isSupabaseConfigured, supabase, supabaseAdmin } from '../supabase';
import { mockDb, generateSlug } from './mockDb';
import { 
  Category, Brand, Collection, Product, ProductVariant, 
  GalleryImage, TeamMember, FAQ, Enquiry, EnquiryItem, WebsiteSettings 
} from '../types';

export { generateSlug };

const dbClient = supabaseAdmin || supabase;

// Categories
export async function getCategories(): Promise<Category[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });
    
    if (!error && data && data.length > 0) return data as Category[];
  }
  return mockDb.getCategories();
}

export async function getAllCategoriesAdmin(): Promise<Category[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (!error && data && data.length > 0) return data as Category[];
  }
  return mockDb.getAllCategoriesAdmin();
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (!error && data) return data as Category;
  }
  return mockDb.getCategoryBySlug(slug);
}

export async function createCategory(category: Omit<Category, 'id'>): Promise<Category> {
  if (isSupabaseConfigured && supabase) {
    const slug = category.slug || generateSlug(category.name);
    const { data, error } = await supabase
      .from('categories')
      .insert([{ ...category, slug }])
      .select()
      .single();
    
    if (!error && data) return data as Category;
    console.error('Supabase createCategory error:', error);
  }
  return mockDb.createCategory(category);
}

export async function updateCategory(id: string, category: Partial<Category>): Promise<Category | null> {
  if (isSupabaseConfigured && supabase) {
    let updates = { ...category };
    if (category.name && !category.slug) {
      updates.slug = generateSlug(category.name);
    }
    const { data, error } = await supabase
      .from('categories')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (!error && data) return data as Category;
    console.error('Supabase updateCategory error:', error);
  }
  return mockDb.updateCategory(id, category);
}

export async function deleteCategory(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);
    return !error;
  }
  return mockDb.deleteCategory(id);
}

// Brands
export async function getBrands(): Promise<Brand[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .eq('is_active', true)
      .order('name', { ascending: true });
    
    if (!error && data && data.length > 0) return data as Brand[];
  }
  return mockDb.getBrands();
}

export async function getAllBrandsAdmin(): Promise<Brand[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .order('name', { ascending: true });
    
    if (!error && data && data.length > 0) return data as Brand[];
  }
  return mockDb.getAllBrandsAdmin();
}

export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (!error && data) return data as Brand;
  }
  return mockDb.getBrandBySlug(slug);
}

export async function createBrand(brand: Omit<Brand, 'id'>): Promise<Brand> {
  if (isSupabaseConfigured && supabase) {
    const slug = brand.slug || generateSlug(brand.name);
    const { data, error } = await supabase
      .from('brands')
      .insert([{ ...brand, slug }])
      .select()
      .single();
    
    if (!error && data) return data as Brand;
    console.error('Supabase createBrand error:', error);
  }
  return mockDb.createBrand(brand);
}

export async function updateBrand(id: string, brand: Partial<Brand>): Promise<Brand | null> {
  if (isSupabaseConfigured && supabase) {
    let updates = { ...brand };
    if (brand.name && !brand.slug) {
      updates.slug = generateSlug(brand.name);
    }
    const { data, error } = await supabase
      .from('brands')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (!error && data) return data as Brand;
    console.error('Supabase updateBrand error:', error);
  }
  return mockDb.updateBrand(id, brand);
}

export async function deleteBrand(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from('brands')
      .delete()
      .eq('id', id);
    return !error;
  }
  return mockDb.deleteBrand(id);
}

// Collections
export async function getCollections(): Promise<Collection[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('collections')
      .select('*')
      .eq('is_active', true)
      .order('name', { ascending: true });
    
    if (!error && data && data.length > 0) return data as Collection[];
  }
  return mockDb.getCollections();
}

export async function getAllCollectionsAdmin(): Promise<Collection[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('collections')
      .select('*')
      .order('name', { ascending: true });
    
    if (!error && data && data.length > 0) return data as Collection[];
  }
  return mockDb.getAllCollectionsAdmin();
}

export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('collections')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (!error && data) return data as Collection;
  }
  return mockDb.getCollectionBySlug(slug);
}

export async function createCollection(collection: Omit<Collection, 'id'>): Promise<Collection> {
  if (isSupabaseConfigured && supabase) {
    const slug = collection.slug || generateSlug(collection.name);
    const { data, error } = await supabase
      .from('collections')
      .insert([{ ...collection, slug }])
      .select()
      .single();
    
    if (!error && data) return data as Collection;
    console.error('Supabase createCollection error:', error);
  }
  return mockDb.createCollection(collection);
}

export async function updateCollection(id: string, collection: Partial<Collection>): Promise<Collection | null> {
  if (isSupabaseConfigured && supabase) {
    let updates = { ...collection };
    if (collection.name && !collection.slug) {
      updates.slug = generateSlug(collection.name);
    }
    const { data, error } = await supabase
      .from('collections')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (!error && data) return data as Collection;
    console.error('Supabase updateCollection error:', error);
  }
  return mockDb.updateCollection(id, collection);
}

export async function deleteCollection(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from('collections')
      .delete()
      .eq('id', id);
    return !error;
  }
  return mockDb.deleteCollection(id);
}

// Products Helper to enrich a product with images and variants from Supabase
async function enrichSupabaseProduct(p: any): Promise<Product> {
  if (!supabase) return p;

  const [imagesRes, variantsRes] = await Promise.all([
    supabase
      .from('product_images')
      .select('image_url')
      .eq('product_id', p.id)
      .order('display_order', { ascending: true }),
    supabase
      .from('product_variants')
      .select('*')
      .eq('product_id', p.id)
      .order('display_order', { ascending: true })
  ]);

  const images = imagesRes.data ? imagesRes.data.map(img => img.image_url) : [];
  const variants = variantsRes.data ? (variantsRes.data as ProductVariant[]) : [];

  return {
    ...p,
    images: images.length > 0 ? images : ['/placeholder_product.jpg'],
    variants
  };
}

// Products
export async function getProducts(filters?: {
  categorySlug?: string;
  brandSlug?: string;
  collectionSlug?: string;
  search?: string;
  finish?: string;
  priceMin?: number;
  priceMax?: number;
  isFeatured?: boolean;
  sort?: string;
}): Promise<Product[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase
        .from('products')
        .select(`
          *,
          categories:category_id(name, slug),
          brands:brand_id(name, slug),
          collections:collection_id(name, slug)
        `)
        .eq('status', 'published')
        .eq('is_available', true);

      if (filters) {
        if (filters.isFeatured !== undefined) {
          query = query.eq('is_featured', filters.isFeatured);
        }

        // Apply filters
        // Relational checks done post-query or by retrieving ids
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        let enriched = await Promise.all(data.map(async p => {
          const prod = await enrichSupabaseProduct(p);
          return {
            ...prod,
            category_name: p.categories?.name,
            brand_name: p.brands?.name,
            collection_name: p.collections?.name
          };
        }));

        // Perform post-query filters that are easier in memory
        if (filters) {
          if (filters.categorySlug) {
            enriched = enriched.filter(p => p.category_id && data.find(item => item.id === p.id)?.categories?.slug === filters.categorySlug);
          }
          if (filters.brandSlug) {
            enriched = enriched.filter(p => p.brand_id && data.find(item => item.id === p.id)?.brands?.slug === filters.brandSlug);
          }
          if (filters.collectionSlug) {
            enriched = enriched.filter(p => p.collection_id && data.find(item => item.id === p.id)?.collections?.slug === filters.collectionSlug);
          }
          if (filters.search) {
            const searchQ = filters.search.toLowerCase();
            enriched = enriched.filter(p => 
              p.name.toLowerCase().includes(searchQ) ||
              (p.product_code && p.product_code.toLowerCase().includes(searchQ)) ||
              (p.short_description && p.short_description.toLowerCase().includes(searchQ))
            );
          }
          if (filters.finish) {
            const fQ = filters.finish.toLowerCase();
            enriched = enriched.filter(p => 
              (p.finish && p.finish.toLowerCase().includes(fQ)) ||
              p.variants?.some(v => v.finish && v.finish.toLowerCase().includes(fQ))
            );
          }
          if (filters.priceMin !== undefined) {
            enriched = enriched.filter(p => p.price !== null && p.price >= filters.priceMin!);
          }
          if (filters.priceMax !== undefined) {
            enriched = enriched.filter(p => p.price !== null && p.price <= filters.priceMax!);
          }
          if (filters.sort) {
            if (filters.sort === 'price_asc') {
              enriched.sort((a, b) => (a.price || 0) - (b.price || 0));
            } else if (filters.sort === 'price_desc') {
              enriched.sort((a, b) => (b.price || 0) - (a.price || 0));
            }
          }
        }
        return enriched;
      }
    } catch (e) {
      console.error('Supabase getProducts error:', e);
    }
  }
  return mockDb.getProducts(filters);
}

export async function getAllProductsAdmin(): Promise<Product[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories:category_id(name),
        brands:brand_id(name),
        collections:collection_id(name)
      `);
    
    if (!error && data && data.length > 0) {
      return Promise.all(data.map(async p => {
        const prod = await enrichSupabaseProduct(p);
        return {
          ...prod,
          category_name: p.categories?.name,
          brand_name: p.brands?.name,
          collection_name: p.collections?.name
        };
      }));
    }
  }
  return mockDb.getAllProductsAdmin();
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories:category_id(name),
        brands:brand_id(name),
        collections:collection_id(name)
      `)
      .eq('slug', slug)
      .single();
    
    if (!error && data) {
      const enriched = await enrichSupabaseProduct(data);
      return {
        ...enriched,
        category_name: data.categories?.name,
        brand_name: data.brands?.name,
        collection_name: data.collections?.name
      };
    }
  }
  return mockDb.getProductBySlug(slug);
}

export async function getProductById(id: string): Promise<Product | null> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (!error && data) {
      return enrichSupabaseProduct(data);
    }
  }
  return mockDb.getProductById(id);
}

export async function createProduct(
  product: Omit<Product, 'id' | 'images' | 'variants'>, 
  images: string[], 
  variants: Omit<ProductVariant, 'id' | 'product_id'>[]
): Promise<Product> {
  if (isSupabaseConfigured && supabase) {
    const slug = product.slug || generateSlug(product.name);
    const { data: newProd, error } = await supabase
      .from('products')
      .insert([{ ...product, slug }])
      .select()
      .single();

    if (!error && newProd) {
      const productId = newProd.id;

      // Insert images
      if (images.length > 0) {
        const imageInserts = images.map((img, i) => ({
          product_id: productId,
          image_url: img,
          display_order: i + 1
        }));
        await supabase.from('product_images').insert(imageInserts);
      }

      // Insert variants
      if (variants.length > 0) {
        const variantInserts = variants.map((v, i) => ({
          ...v,
          product_id: productId,
          display_order: v.display_order || i + 1
        }));
        await supabase.from('product_variants').insert(variantInserts);
      }

      return enrichSupabaseProduct(newProd);
    }
    console.error('Supabase createProduct error:', error);
  }
  return mockDb.createProduct(product, images, variants);
}

export async function updateProduct(
  id: string, 
  product: Partial<Product>, 
  images?: string[], 
  variants?: Omit<ProductVariant, 'id' | 'product_id'>[]
): Promise<Product | null> {
  if (isSupabaseConfigured && supabase) {
    let updates = { ...product };
    if (product.name && !product.slug) {
      updates.slug = generateSlug(product.name);
    }
    const { data: updatedProd, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (!error && updatedProd) {
      // Update images
      if (images) {
        await supabase.from('product_images').delete().eq('product_id', id);
        if (images.length > 0) {
          const imageInserts = images.map((img, i) => ({
            product_id: id,
            image_url: img,
            display_order: i + 1
          }));
          await supabase.from('product_images').insert(imageInserts);
        }
      }

      // Update variants
      if (variants) {
        await supabase.from('product_variants').delete().eq('product_id', id);
        if (variants.length > 0) {
          const variantInserts = variants.map((v, i) => ({
            ...v,
            product_id: id,
            display_order: v.display_order || i + 1
          }));
          await supabase.from('product_variants').insert(variantInserts);
        }
      }

      return enrichSupabaseProduct(updatedProd);
    }
    console.error('Supabase updateProduct error:', error);
  }
  return mockDb.updateProduct(id, product, images, variants);
}

export async function deleteProduct(id: string): Promise<boolean> {
  if (isSupabaseConfigured && dbClient) {
    try {
      // Delete child records first to satisfy foreign key constraints
      await dbClient.from('product_images').delete().eq('product_id', id);
      await dbClient.from('product_variants').delete().eq('product_id', id);
      
      const { error } = await dbClient
        .from('products')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase deleteProduct error:', error);
      }
    } catch (err) {
      console.error('Supabase deleteProduct exception:', err);
    }
  }
  return mockDb.deleteProduct(id);
}

// Gallery
export async function getGalleryImages(category?: string): Promise<GalleryImage[]> {
  if (isSupabaseConfigured && supabase) {
    let query = supabase
      .from('gallery_images')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (category) {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query;
    if (!error && data && data.length > 0) return data as GalleryImage[];
  }
  return mockDb.getGalleryImages(category);
}

export async function getAllGalleryAdmin(): Promise<GalleryImage[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (!error && data) return data as GalleryImage[];
  }
  return mockDb.getAllGalleryAdmin();
}

export async function createGalleryImage(img: Omit<GalleryImage, 'id'>): Promise<GalleryImage> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('gallery_images')
      .insert([img])
      .select()
      .single();
    
    if (!error && data) return data as GalleryImage;
    console.error('Supabase createGalleryImage error:', error);
  }
  return mockDb.createGalleryImage(img);
}

export async function updateGalleryImage(id: string, img: Partial<GalleryImage>): Promise<GalleryImage | null> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('gallery_images')
      .update(img)
      .eq('id', id)
      .select()
      .single();
    
    if (!error && data) return data as GalleryImage;
    console.error('Supabase updateGalleryImage error:', error);
  }
  return mockDb.updateGalleryImage(id, img);
}

export async function deleteGalleryImage(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from('gallery_images')
      .delete()
      .eq('id', id);
    return !error;
  }
  return mockDb.deleteGalleryImage(id);
}

// Team Members
export async function getTeamMembers(): Promise<TeamMember[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });
    
    if (!error && data && data.length > 0) return data as TeamMember[];
  }
  return mockDb.getTeamMembers();
}

export async function getAllTeamMembersAdmin(): Promise<TeamMember[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (!error && data) return data as TeamMember[];
  }
  return mockDb.getAllTeamMembersAdmin();
}

export async function createTeamMember(member: Omit<TeamMember, 'id'>): Promise<TeamMember> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('team_members')
      .insert([member])
      .select()
      .single();
    
    if (!error && data) return data as TeamMember;
    console.error('Supabase createTeamMember error:', error);
  }
  return mockDb.createTeamMember(member);
}

export async function updateTeamMember(id: string, member: Partial<TeamMember>): Promise<TeamMember | null> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('team_members')
      .update(member)
      .eq('id', id)
      .select()
      .single();
    
    if (!error && data) return data as TeamMember;
    console.error('Supabase updateTeamMember error:', error);
  }
  return mockDb.updateTeamMember(id, member);
}

export async function deleteTeamMember(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', id);
    return !error;
  }
  return mockDb.deleteTeamMember(id);
}

// FAQs
export async function getFAQs(): Promise<FAQ[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });
    
    if (!error && data && data.length > 0) return data as FAQ[];
  }
  return mockDb.getFAQs();
}

export async function getAllFAQsAdmin(): Promise<FAQ[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (!error && data) return data as FAQ[];
  }
  return mockDb.getAllFAQsAdmin();
}

export async function createFAQ(faq: Omit<FAQ, 'id'>): Promise<FAQ> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('faqs')
      .insert([faq])
      .select()
      .single();
    
    if (!error && data) return data as FAQ;
    console.error('Supabase createFAQ error:', error);
  }
  return mockDb.createFAQ(faq);
}

export async function updateFAQ(id: string, faq: Partial<FAQ>): Promise<FAQ | null> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('faqs')
      .update(faq)
      .eq('id', id)
      .select()
      .single();
    
    if (!error && data) return data as FAQ;
    console.error('Supabase updateFAQ error:', error);
  }
  return mockDb.updateFAQ(id, faq);
}

export async function deleteFAQ(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from('faqs')
      .delete()
      .eq('id', id);
    return !error;
  }
  return mockDb.deleteFAQ(id);
}

// Enquiries
export async function getEnquiries(): Promise<Enquiry[]> {
  if (isSupabaseConfigured && dbClient) {
    const { data: enquiries, error } = await dbClient
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && enquiries) {
      return Promise.all(enquiries.map(async enq => {
        const { data: items } = await dbClient!.from('enquiry_items')
          .select('*')
          .eq('enquiry_id', enq.id);
        return {
          ...enq,
          items: items || []
        };
      }));
    }
  }
  return mockDb.getEnquiries();
}

export async function createEnquiry(enquiry: Omit<Enquiry, 'id' | 'created_at'>): Promise<Enquiry> {
  if (isSupabaseConfigured && dbClient) {
    const { data: newEnq, error } = await dbClient
      .from('enquiries')
      .insert([{
        customer_name: enquiry.customer_name,
        customer_email: enquiry.customer_email,
        customer_phone: enquiry.customer_phone,
        message: enquiry.message,
        status: 'new'
      }])
      .select()
      .single();

    if (!error && newEnq) {
      if (enquiry.items && enquiry.items.length > 0) {
        const itemInserts = enquiry.items.map(item => ({
          enquiry_id: newEnq.id,
          product_id: item.product_id,
          product_name: item.product_name,
          product_code: item.product_code,
          quantity: item.quantity,
          variant_finish: item.variant_finish
        }));
        await dbClient.from('enquiry_items').insert(itemInserts);
      }

      const { data: items } = await dbClient
        .from('enquiry_items')
        .select('*')
        .eq('enquiry_id', newEnq.id);

      return {
        ...newEnq,
        items: items || []
      };
    }
    console.error('Supabase createEnquiry error:', error);
  }
  return mockDb.createEnquiry(enquiry);
}

export async function updateEnquiryStatus(id: string, status: Enquiry['status']): Promise<boolean> {
  if (isSupabaseConfigured && dbClient) {
    const { error } = await dbClient
      .from('enquiries')
      .update({ status })
      .eq('id', id);
    return !error;
  }
  return mockDb.updateEnquiryStatus(id, status);
}

// Settings
export async function getSettings(): Promise<WebsiteSettings> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('website_settings')
        .select('*');
      
      if (!error && data && data.length > 0) {
        // Build settings object from rows
        const settings: any = {};
        data.forEach(row => {
          settings[row.key] = row.value;
        });
        
        // Ensure all sections exist, merge with default initialSettings if missing
        return {
          business: settings.business || mockDb.getState().settings.business,
          whatsapp: settings.whatsapp || mockDb.getState().settings.whatsapp,
          social: settings.social || mockDb.getState().settings.social,
          homepage: settings.homepage || mockDb.getState().settings.homepage,
          seo: settings.seo || mockDb.getState().settings.seo
        };
      }
    } catch (e) {
      console.error('Supabase getSettings error:', e);
    }
  }
  return mockDb.getSettings();
}

export async function updateSettings(settings: Partial<WebsiteSettings>): Promise<WebsiteSettings> {
  if (isSupabaseConfigured && supabase) {
    try {
      const promises = Object.entries(settings).map(async ([key, value]) => {
        // Upsert setting key/value
        return supabase!
          .from('website_settings')
          .upsert({ key, value }, { onConflict: 'key' });
      });
      await Promise.all(promises);
      return getSettings();
    } catch (e) {
      console.error('Supabase updateSettings error:', e);
    }
  }
  return mockDb.updateSettings(settings);
}
