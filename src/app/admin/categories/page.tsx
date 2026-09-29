import { getAllCategoriesAdmin } from '@/lib/db';
import AdminCategoriesClient from '@/components/AdminCategoriesClient';

export const dynamic = 'force-dynamic';

export default async function AdminCategoriesPage() {
  const categories = await getAllCategoriesAdmin();

  return (
    <div className="space-y-8 font-sans">
      <div className="border-b border-white/5 pb-6">
        <h1 className="font-serif text-3xl font-light tracking-wide text-white">
          Category Management
        </h1>
        <p className="text-xs text-neutral-400 font-light mt-1">
          Organize product departments (Sanitaryware, Faucets, Showers, Lighting, Hardware, etc.).
        </p>
      </div>

      <AdminCategoriesClient initialCategories={categories} />
    </div>
  );
}
