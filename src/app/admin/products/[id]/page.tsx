import React from 'react';
import { notFound } from 'next/navigation';
import { getProductById, getAllCategoriesAdmin, getAllCollectionsAdmin, getAllBrandsAdmin } from '@/lib/db';
import AdminProductForm from '@/components/AdminProductForm';

export const dynamic = 'force-dynamic';

interface AdminEditProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AdminEditProductPage({ params }: AdminEditProductPageProps) {
  const resolvedParams = await params;
  const [product, categories, collections, brands] = await Promise.all([
    getProductById(resolvedParams.id),
    getAllCategoriesAdmin(),
    getAllCollectionsAdmin(),
    getAllBrandsAdmin()
  ]);

  if (!product) {
    notFound();
  }

  return (
    <AdminProductForm
      initialProduct={product}
      categories={categories}
      collections={collections}
      brands={brands}
    />
  );
}
