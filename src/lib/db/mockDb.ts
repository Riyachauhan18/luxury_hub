import { 
  Category, Brand, Collection, Product, ProductVariant, 
  GalleryImage, TeamMember, FAQ, Enquiry, EnquiryItem, WebsiteSettings 
} from '../types';
import { 
  initialCategories, initialBrands, initialCollections, 
  initialProducts, initialProductImages, initialProductVariants, 
  initialGalleryImages, initialTeamMembers, initialFAQs, initialSettings 
} from './mockData';

// Helper to generate a random UUID-like string
function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

// Helper to generate slug from name
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

interface MockDatabaseState {
  categories: Category[];
  brands: Brand[];
  collections: Collection[];
  products: Product[];
  productImages: { id: string; product_id: string; image_url: string; display_order: number }[];
  productVariants: ProductVariant[];
  galleryImages: GalleryImage[];
  teamMembers: TeamMember[];
  faqs: FAQ[];
  enquiries: Enquiry[];
  enquiryItems: EnquiryItem[];
  settings: WebsiteSettings;
}

// Global pattern to prevent state resetting on Next.js hot reload
const globalForMockDb = globalThis as unknown as {
  mockDbInstance: MockDatabaseState | undefined;
};

if (!globalForMockDb.mockDbInstance) {
  globalForMockDb.mockDbInstance = {
    categories: [...initialCategories],
    brands: [...initialBrands],
    collections: [...initialCollections],
    products: [...initialProducts],
    productImages: [...initialProductImages],
    productVariants: [...initialProductVariants],
    galleryImages: [...initialGalleryImages],
    teamMembers: [...initialTeamMembers],
    faqs: [...initialFAQs],
    enquiries: [],
    enquiryItems: [],
    settings: JSON.parse(JSON.stringify(initialSettings))
  };
} else {
  globalForMockDb.mockDbInstance.products = [...initialProducts];
  globalForMockDb.mockDbInstance.productImages = [...initialProductImages];
  globalForMockDb.mockDbInstance.galleryImages = [...initialGalleryImages];
  globalForMockDb.mockDbInstance.teamMembers = [...initialTeamMembers];
  globalForMockDb.mockDbInstance.settings = JSON.parse(JSON.stringify(initialSettings));
}

export const mockDb = {
  getState(): MockDatabaseState {
    return globalForMockDb.mockDbInstance!;
  },

  // Categories
  async getCategories(): Promise<Category[]> {
    return this.getState().categories.filter(c => c.is_active).sort((a, b) => a.display_order - b.display_order);
  },

  async getAllCategoriesAdmin(): Promise<Category[]> {
    return [...this.getState().categories].sort((a, b) => a.display_order - b.display_order);
  },

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    return this.getState().categories.find(c => c.slug === slug) || null;
  },

  async createCategory(category: Omit<Category, 'id'>): Promise<Category> {
    const newCategory: Category = {
      ...category,
      id: 'cat-' + generateId(),
      slug: category.slug || generateSlug(category.name)
    };
    this.getState().categories.push(newCategory);
    return newCategory;
  },

  async updateCategory(id: string, category: Partial<Category>): Promise<Category | null> {
    const state = this.getState();
    const index = state.categories.findIndex(c => c.id === id);
    if (index === -1) return null;
    
    const updated = {
      ...state.categories[index],
      ...category,
      slug: category.name ? generateSlug(category.name) : state.categories[index].slug
    };
    state.categories[index] = updated;
    return updated;
  },

  async deleteCategory(id: string): Promise<boolean> {
    const state = this.getState();
    const lenBefore = state.categories.length;
    state.categories = state.categories.filter(c => c.id !== id);
    return state.categories.length < lenBefore;
  },

  // Brands
  async getBrands(): Promise<Brand[]> {
    return this.getState().brands.filter(b => b.is_active);
  },

  async getAllBrandsAdmin(): Promise<Brand[]> {
    return [...this.getState().brands];
  },

  async getBrandBySlug(slug: string): Promise<Brand | null> {
    return this.getState().brands.find(b => b.slug === slug) || null;
  },

  async createBrand(brand: Omit<Brand, 'id'>): Promise<Brand> {
    const newBrand: Brand = {
      ...brand,
      id: 'brand-' + generateId(),
      slug: brand.slug || generateSlug(brand.name)
    };
    this.getState().brands.push(newBrand);
    return newBrand;
  },

  async updateBrand(id: string, brand: Partial<Brand>): Promise<Brand | null> {
    const state = this.getState();
    const index = state.brands.findIndex(b => b.id === id);
    if (index === -1) return null;
    const updated = {
      ...state.brands[index],
      ...brand,
      slug: brand.name ? generateSlug(brand.name) : state.brands[index].slug
    };
    state.brands[index] = updated;
    return updated;
  },

  async deleteBrand(id: string): Promise<boolean> {
    const state = this.getState();
    const len = state.brands.length;
    state.brands = state.brands.filter(b => b.id !== id);
    return state.brands.length < len;
  },

  // Collections
  async getCollections(): Promise<Collection[]> {
    return this.getState().collections.filter(c => c.is_active);
  },

  async getAllCollectionsAdmin(): Promise<Collection[]> {
    return [...this.getState().collections];
  },

  async getCollectionBySlug(slug: string): Promise<Collection | null> {
    return this.getState().collections.find(c => c.slug === slug) || null;
  },

  async createCollection(collection: Omit<Collection, 'id'>): Promise<Collection> {
    const newCollection: Collection = {
      ...collection,
      id: 'col-' + generateId(),
      slug: collection.slug || generateSlug(collection.name)
    };
    this.getState().collections.push(newCollection);
    return newCollection;
  },

  async updateCollection(id: string, collection: Partial<Collection>): Promise<Collection | null> {
    const state = this.getState();
    const index = state.collections.findIndex(c => c.id === id);
    if (index === -1) return null;
    const updated = {
      ...state.collections[index],
      ...collection,
      slug: collection.name ? generateSlug(collection.name) : state.collections[index].slug
    };
    state.collections[index] = updated;
    return updated;
  },

  async deleteCollection(id: string): Promise<boolean> {
    const state = this.getState();
    const len = state.collections.length;
    state.collections = state.collections.filter(c => c.id !== id);
    return state.collections.length < len;
  },

  // Products
  async getProducts(filters?: {
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
    const state = this.getState();
    let result = [...state.products];

    // Read relation data helper
    const enrichProduct = (p: Product): Product => {
      const category = state.categories.find(c => c.id === p.category_id);
      const brand = state.brands.find(b => b.id === p.brand_id);
      const collection = state.collections.find(c => c.id === p.collection_id);
      const imgs = state.productImages
        .filter(img => img.product_id === p.id)
        .sort((a, b) => a.display_order - b.display_order)
        .map(img => img.image_url);
      const vars = state.productVariants
        .filter(v => v.product_id === p.id)
        .sort((a, b) => a.display_order - b.display_order);

      return {
        ...p,
        category_name: category ? category.name : undefined,
        brand_name: brand ? brand.name : undefined,
        collection_name: collection ? collection.name : undefined,
        images: imgs.length > 0 ? imgs : ['/placeholder_product.jpg'],
        variants: vars
      };
    };

    // Filter by active status in public view
    result = result.filter(p => p.status === 'published' && p.is_available);

    if (filters) {
      if (filters.isFeatured !== undefined) {
        result = result.filter(p => p.is_featured === filters.isFeatured);
      }
      if (filters.categorySlug) {
        const cat = state.categories.find(c => c.slug === filters.categorySlug);
        if (cat) {
          result = result.filter(p => p.category_id === cat.id);
        } else {
          return [];
        }
      }
      if (filters.brandSlug) {
        const br = state.brands.find(b => b.slug === filters.brandSlug);
        if (br) {
          result = result.filter(p => p.brand_id === br.id);
        } else {
          return [];
        }
      }
      if (filters.collectionSlug) {
        const col = state.collections.find(c => c.slug === filters.collectionSlug);
        if (col) {
          result = result.filter(p => p.collection_id === col.id);
        } else {
          return [];
        }
      }
      if (filters.search) {
        const query = filters.search.toLowerCase();
        result = result.filter(p => 
          p.name.toLowerCase().includes(query) || 
          (p.product_code && p.product_code.toLowerCase().includes(query)) ||
          (p.short_description && p.short_description.toLowerCase().includes(query)) ||
          (p.description && p.description.toLowerCase().includes(query)) ||
          (p.material && p.material.toLowerCase().includes(query)) ||
          (p.finish && p.finish.toLowerCase().includes(query))
        );
      }
      if (filters.finish) {
        const fQuery = filters.finish.toLowerCase();
        result = result.filter(p => {
          const productFinish = p.finish ? p.finish.toLowerCase().includes(fQuery) : false;
          const variantFinish = state.productVariants
            .filter(v => v.product_id === p.id)
            .some(v => v.finish && v.finish.toLowerCase().includes(fQuery));
          return productFinish || variantFinish;
        });
      }
      if (filters.priceMin !== undefined) {
        result = result.filter(p => p.price !== null && p.price >= filters.priceMin!);
      }
      if (filters.priceMax !== undefined) {
        result = result.filter(p => p.price !== null && p.price <= filters.priceMax!);
      }
      
      // Sorting
      if (filters.sort) {
        if (filters.sort === 'price_asc') {
          result.sort((a, b) => (a.price || 0) - (b.price || 0));
        } else if (filters.sort === 'price_desc') {
          result.sort((a, b) => (b.price || 0) - (a.price || 0));
        } else if (filters.sort === 'newest') {
          // Default sorting or mock created_at sorting
        }
      }
    }

    return result.map(enrichProduct);
  },

  async getAllProductsAdmin(): Promise<Product[]> {
    const state = this.getState();
    
    return state.products.map(p => {
      const category = state.categories.find(c => c.id === p.category_id);
      const brand = state.brands.find(b => b.id === p.brand_id);
      const collection = state.collections.find(c => c.id === p.collection_id);
      const imgs = state.productImages
        .filter(img => img.product_id === p.id)
        .sort((a, b) => a.display_order - b.display_order)
        .map(img => img.image_url);
      const vars = state.productVariants
        .filter(v => v.product_id === p.id)
        .sort((a, b) => a.display_order - b.display_order);

      return {
        ...p,
        category_name: category ? category.name : undefined,
        brand_name: brand ? brand.name : undefined,
        collection_name: collection ? collection.name : undefined,
        images: imgs,
        variants: vars
      };
    });
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    const state = this.getState();
    const p = state.products.find(prod => prod.slug === slug);
    if (!p) return null;

    const category = state.categories.find(c => c.id === p.category_id);
    const brand = state.brands.find(b => b.id === p.brand_id);
    const collection = state.collections.find(c => c.id === p.collection_id);
    const imgs = state.productImages
      .filter(img => img.product_id === p.id)
      .sort((a, b) => a.display_order - b.display_order)
      .map(img => img.image_url);
    const vars = state.productVariants
      .filter(v => v.product_id === p.id)
      .sort((a, b) => a.display_order - b.display_order);

    return {
      ...p,
      category_name: category ? category.name : undefined,
      brand_name: brand ? brand.name : undefined,
      collection_name: collection ? collection.name : undefined,
      images: imgs.length > 0 ? imgs : ['/placeholder_product.jpg'],
      variants: vars
    };
  },

  async getProductById(id: string): Promise<Product | null> {
    const state = this.getState();
    const p = state.products.find(prod => prod.id === id);
    if (!p) return null;

    const imgs = state.productImages
      .filter(img => img.product_id === p.id)
      .sort((a, b) => a.display_order - b.display_order)
      .map(img => img.image_url);
    const vars = state.productVariants
      .filter(v => v.product_id === p.id)
      .sort((a, b) => a.display_order - b.display_order);

    return {
      ...p,
      images: imgs,
      variants: vars
    };
  },

  async createProduct(
    product: Omit<Product, 'id' | 'images' | 'variants'>, 
    images: string[], 
    variants: Omit<ProductVariant, 'id' | 'product_id'>[]
  ): Promise<Product> {
    const state = this.getState();
    const newId = 'prod-' + generateId();
    const newProduct: Product = {
      ...product,
      id: newId,
      slug: product.slug || generateSlug(product.name),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    state.products.push(newProduct);

    // Save images
    images.forEach((imgUrl, i) => {
      state.productImages.push({
        id: 'img-' + generateId(),
        product_id: newId,
        image_url: imgUrl,
        display_order: i + 1
      });
    });

    // Save variants
    variants.forEach((v, i) => {
      state.productVariants.push({
        ...v,
        id: 'var-' + generateId(),
        product_id: newId,
        display_order: v.display_order || i + 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    });

    return {
      ...newProduct,
      images,
      variants: state.productVariants.filter(v => v.product_id === newId)
    };
  },

  async updateProduct(
    id: string, 
    product: Partial<Product>, 
    images?: string[], 
    variants?: Omit<ProductVariant, 'id' | 'product_id'>[]
  ): Promise<Product | null> {
    const state = this.getState();
    const index = state.products.findIndex(p => p.id === id);
    if (index === -1) return null;

    const existing = state.products[index];
    const updatedProduct = {
      ...existing,
      ...product,
      slug: product.name ? generateSlug(product.name) : existing.slug,
      updated_at: new Date().toISOString()
    };
    state.products[index] = updatedProduct;

    // Update images if provided
    if (images) {
      // Remove old
      state.productImages = state.productImages.filter(img => img.product_id !== id);
      // Add new
      images.forEach((imgUrl, i) => {
        state.productImages.push({
          id: 'img-' + generateId(),
          product_id: id,
          image_url: imgUrl,
          display_order: i + 1
        });
      });
    }

    // Update variants if provided
    if (variants) {
      // Remove old
      state.productVariants = state.productVariants.filter(v => v.product_id !== id);
      // Add new
      variants.forEach((v, i) => {
        state.productVariants.push({
          ...v,
          id: 'var-' + generateId(),
          product_id: id,
          display_order: v.display_order || i + 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      });
    }

    return this.getProductBySlug(updatedProduct.slug);
  },

  async deleteProduct(id: string): Promise<boolean> {
    const state = this.getState();
    const len = state.products.length;
    state.products = state.products.filter(p => p.id !== id);
    state.productImages = state.productImages.filter(img => img.product_id !== id);
    state.productVariants = state.productVariants.filter(v => v.product_id !== id);
    return state.products.length < len;
  },

  // Gallery
  async getGalleryImages(category?: string): Promise<GalleryImage[]> {
    const state = this.getState();
    let imgs = [...state.galleryImages];
    if (category) {
      imgs = imgs.filter(img => img.category.toLowerCase() === category.toLowerCase());
    }
    return imgs.sort((a, b) => a.display_order - b.display_order);
  },

  async getAllGalleryAdmin(): Promise<GalleryImage[]> {
    return [...this.getState().galleryImages].sort((a, b) => a.display_order - b.display_order);
  },

  async createGalleryImage(img: Omit<GalleryImage, 'id'>): Promise<GalleryImage> {
    const state = this.getState();
    const newImg = {
      ...img,
      id: 'gal-' + generateId(),
      created_at: new Date().toISOString()
    };
    state.galleryImages.push(newImg);
    return newImg;
  },

  async updateGalleryImage(id: string, img: Partial<GalleryImage>): Promise<GalleryImage | null> {
    const state = this.getState();
    const idx = state.galleryImages.findIndex(g => g.id === id);
    if (idx === -1) return null;
    const updated = {
      ...state.galleryImages[idx],
      ...img
    };
    state.galleryImages[idx] = updated;
    return updated;
  },

  async deleteGalleryImage(id: string): Promise<boolean> {
    const state = this.getState();
    const len = state.galleryImages.length;
    state.galleryImages = state.galleryImages.filter(g => g.id !== id);
    return state.galleryImages.length < len;
  },

  // Team Members
  async getTeamMembers(): Promise<TeamMember[]> {
    return this.getState().teamMembers
      .filter(m => m.is_active)
      .sort((a, b) => a.display_order - b.display_order);
  },

  async getAllTeamMembersAdmin(): Promise<TeamMember[]> {
    return [...this.getState().teamMembers].sort((a, b) => a.display_order - b.display_order);
  },

  async createTeamMember(member: Omit<TeamMember, 'id'>): Promise<TeamMember> {
    const state = this.getState();
    const newMember = {
      ...member,
      id: 'team-' + generateId(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    state.teamMembers.push(newMember);
    return newMember;
  },

  async updateTeamMember(id: string, member: Partial<TeamMember>): Promise<TeamMember | null> {
    const state = this.getState();
    const idx = state.teamMembers.findIndex(m => m.id === id);
    if (idx === -1) return null;
    const updated = {
      ...state.teamMembers[idx],
      ...member,
      updated_at: new Date().toISOString()
    };
    state.teamMembers[idx] = updated;
    return updated;
  },

  async deleteTeamMember(id: string): Promise<boolean> {
    const state = this.getState();
    const len = state.teamMembers.length;
    state.teamMembers = state.teamMembers.filter(m => m.id !== id);
    return state.teamMembers.length < len;
  },

  // FAQs
  async getFAQs(): Promise<FAQ[]> {
    return this.getState().faqs
      .filter(f => f.is_active)
      .sort((a, b) => a.display_order - b.display_order);
  },

  async getAllFAQsAdmin(): Promise<FAQ[]> {
    return [...this.getState().faqs].sort((a, b) => a.display_order - b.display_order);
  },

  async createFAQ(faq: Omit<FAQ, 'id'>): Promise<FAQ> {
    const state = this.getState();
    const newFaq = {
      ...faq,
      id: 'faq-' + generateId(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    state.faqs.push(newFaq);
    return newFaq;
  },

  async updateFAQ(id: string, faq: Partial<FAQ>): Promise<FAQ | null> {
    const state = this.getState();
    const idx = state.faqs.findIndex(f => f.id === id);
    if (idx === -1) return null;
    const updated = {
      ...state.faqs[idx],
      ...faq,
      updated_at: new Date().toISOString()
    };
    state.faqs[idx] = updated;
    return updated;
  },

  async deleteFAQ(id: string): Promise<boolean> {
    const state = this.getState();
    const len = state.faqs.length;
    state.faqs = state.faqs.filter(f => f.id !== id);
    return state.faqs.length < len;
  },

  // Enquiries
  async getEnquiries(): Promise<Enquiry[]> {
    const state = this.getState();
    return state.enquiries.map(enq => ({
      ...enq,
      items: state.enquiryItems.filter(item => item.id?.startsWith(enq.id))
    })).sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime());
  },

  async createEnquiry(enquiry: Omit<Enquiry, 'id' | 'created_at'>): Promise<Enquiry> {
    const state = this.getState();
    const newId = 'enq-' + generateId();
    const newEnquiry: Enquiry = {
      ...enquiry,
      id: newId,
      created_at: new Date().toISOString(),
      status: 'new'
    };

    state.enquiries.push(newEnquiry);

    // Save items
    if (enquiry.items) {
      enquiry.items.forEach((item, i) => {
        state.enquiryItems.push({
          ...item,
          id: `${newId}-item-${i}`
        });
      });
    }

    return {
      ...newEnquiry,
      items: state.enquiryItems.filter(item => item.id?.startsWith(newId))
    };
  },

  async updateEnquiryStatus(id: string, status: Enquiry['status']): Promise<boolean> {
    const state = this.getState();
    const index = state.enquiries.findIndex(e => e.id === id);
    if (index === -1) return false;
    state.enquiries[index].status = status;
    return true;
  },

  // Settings
  async getSettings(): Promise<WebsiteSettings> {
    return JSON.parse(JSON.stringify(this.getState().settings));
  },

  async updateSettings(settings: Partial<WebsiteSettings>): Promise<WebsiteSettings> {
    const state = this.getState();
    if (settings.business) state.settings.business = { ...state.settings.business, ...settings.business };
    if (settings.whatsapp) state.settings.whatsapp = { ...state.settings.whatsapp, ...settings.whatsapp };
    if (settings.social) state.settings.social = { ...state.settings.social, ...settings.social };
    if (settings.homepage) state.settings.homepage = { ...state.settings.homepage, ...settings.homepage };
    if (settings.seo) state.settings.seo = { ...state.settings.seo, ...settings.seo };
    return this.getSettings();
  }
};
