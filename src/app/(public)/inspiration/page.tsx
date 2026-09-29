import { getGalleryImages, getProducts, getSettings } from '@/lib/db';
import InspirationGalleryClient from '@/components/InspirationGalleryClient';

export const dynamic = 'force-dynamic';

export default async function InspirationPage() {
  const [galleryImages, allProducts, settings] = await Promise.all([
    getGalleryImages(),
    getProducts(),
    getSettings()
  ]);

  return (
    <InspirationGalleryClient 
      initialImages={galleryImages} 
      allProducts={allProducts} 
      settings={settings}
    />
  );
}
