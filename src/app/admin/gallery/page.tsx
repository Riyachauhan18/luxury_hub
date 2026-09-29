import { getAllGalleryAdmin, getAllProductsAdmin } from '@/lib/db';
import AdminGalleryClient from '@/components/AdminGalleryClient';

export const dynamic = 'force-dynamic';

export default async function AdminGalleryPage() {
  const [gallery, products] = await Promise.all([
    getAllGalleryAdmin(),
    getAllProductsAdmin()
  ]);

  return (
    <div className="space-y-8 font-sans">
      <div className="border-b border-white/5 pb-6">
        <h1 className="font-serif text-3xl font-light tracking-wide text-white">
          Inspiration Gallery Management
        </h1>
        <p className="text-xs text-neutral-400 font-light mt-1">
          Upload interior showcase photos and link associated products used in each setup.
        </p>
      </div>

      <AdminGalleryClient initialGallery={gallery} products={products} />
    </div>
  );
}
