import { getAllCategoriesAdmin, getAllCollectionsAdmin, getAllBrandsAdmin } from '@/lib/db';
import AdminProductForm from '@/components/AdminProductForm';

export const dynamic = 'force-dynamic';

export default async function AdminNewProductPage() {
  const [categories, collections, brands] = await Promise.all([
    getAllCategoriesAdmin(),
    getAllCollectionsAdmin(),
    getAllBrandsAdmin()
  ]);

  return (
    <AdminProductForm
      categories={categories}
      collections={collections}
      brands={brands}
    />
  );
}
