import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts, getSettings } from '@/lib/db';
import ProductDetailClient from '@/components/ProductDetailClient';

// Opt-out of static rendering to read params dynamically
export const dynamic = 'force-dynamic';

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate Dynamic SEO Metadata
export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);
  
  if (!product) {
    return {
      title: 'Product Not Found | THE LUXURY HUB',
    };
  }

  const title = `${product.name} | THE LUXURY HUB`;
  const description = product.short_description || `View specifications and details for the premium ${product.name} at THE LUXURY HUB showroom.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: product.images && product.images.length > 0 ? [product.images[0]] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  // Fetch settings & related products (same category)
  const [settings, allProducts] = await Promise.all([
    getSettings(),
    getProducts()
  ]);

  // Find related products in the same category (excluding current product)
  const relatedProducts = allProducts
    .filter(p => p.category_id === product.category_id && p.id !== product.id)
    .slice(0, 4);

  return (
    <ProductDetailClient
      product={product}
      relatedProducts={relatedProducts}
      settings={settings}
    />
  );
}
