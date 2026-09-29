import { getEnquiries } from '@/lib/db';
import AdminEnquiriesClient from '@/components/AdminEnquiriesClient';

export const dynamic = 'force-dynamic';

export default async function AdminEnquiriesPage() {
  const enquiries = await getEnquiries();

  return (
    <div className="space-y-8 font-sans">
      <div className="border-b border-white/5 pb-6">
        <h1 className="font-serif text-3xl font-light tracking-wide text-white">
          Customer Enquiries
        </h1>
        <p className="text-xs text-neutral-400 font-light mt-1">
          Review incoming website form enquiries, inspect cart product lists, and manage resolution statuses.
        </p>
      </div>

      <AdminEnquiriesClient initialEnquiries={enquiries} />
    </div>
  );
}
