import { getAllCollectionsAdmin } from '@/lib/db';
import AdminCollectionsClient from '@/components/AdminCollectionsClient';

export const dynamic = 'force-dynamic';

export default async function AdminCollectionsPage() {
  const collections = await getAllCollectionsAdmin();

  return (
    <div className="space-y-8 font-sans">
      <div className="border-b border-white/5 pb-6">
        <h1 className="font-serif text-3xl font-light tracking-wide text-white">
          Collections Management
        </h1>
        <p className="text-xs text-neutral-400 font-light mt-1">
          Manage curated style lines (Modern, Gold Finish, Minimalist, etc.).
        </p>
      </div>

      <AdminCollectionsClient initialCollections={collections} />
    </div>
  );
}
