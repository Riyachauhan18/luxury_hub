import { getProducts, getCategories, getCollections, getBrands, getSettings } from '@/lib/db';
import ProductCatalog from '@/components/ProductCatalog';

// Opt-out of static rendering to read search parameters
export const dynamic = 'force-dynamic';

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    collection?: string;
    brand?: string;
    search?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  // Resolve search parameters promise
  const resolvedParams = await searchParams;

  const [
    allProducts,
    categories,
    collections,
    brands,
    settings
  ] = await Promise.all([
    getProducts(), // Fetches all published, active products
    getCategories(),
    getCollections(),
    getBrands(),
    getSettings()
  ]);

  return (
    <ProductCatalog
      initialProducts={allProducts}
      categories={categories}
      collections={collections}
      brands={brands}
      settings={settings}
      initialCategorySlug={resolvedParams.category}
      initialCollectionSlug={resolvedParams.collection}
      initialBrandSlug={resolvedParams.brand}
      initialSearchQuery={resolvedParams.search}
    />
  );
}
