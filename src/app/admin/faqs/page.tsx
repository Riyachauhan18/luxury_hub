import { getAllFAQsAdmin } from '@/lib/db';
import AdminFAQsClient from '@/components/AdminFAQsClient';

export const dynamic = 'force-dynamic';

export default async function AdminFAQsPage() {
  const faqs = await getAllFAQsAdmin();

  return (
    <div className="space-y-8 font-sans">
      <div className="border-b border-white/5 pb-6">
        <h1 className="font-serif text-3xl font-light tracking-wide text-white">
          FAQ Management
        </h1>
        <p className="text-xs text-neutral-400 font-light mt-1">
          Add, edit, and organize frequently asked questions displayed on the public FAQ page.
        </p>
      </div>

      <AdminFAQsClient initialFAQs={faqs} />
    </div>
  );
}
