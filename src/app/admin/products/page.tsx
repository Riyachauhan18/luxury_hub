import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Edit3, Trash2, ExternalLink } from 'lucide-react';
import { getAllProductsAdmin } from '@/lib/db';
import AdminProductsTable from '@/components/AdminProductsTable';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const products = await getAllProductsAdmin();

  return (
    <div className="space-y-8 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="font-serif text-3xl font-light tracking-wide text-white">
            Product Management
          </h1>
          <p className="text-xs text-neutral-400 font-light mt-1">
            Add, edit, organize variants, and publish products in your catalogue.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center px-6 py-3 bg-[#C5A85C] text-[#050505] hover:bg-[#D4AF37] transition-all font-semibold text-xs tracking-widest uppercase cursor-pointer shadow-lg"
        >
          <Plus className="w-4 h-4 mr-2" /> ADD PRODUCT
        </Link>
      </div>

      {/* Client Table Component with Delete Confirmation Modal */}
      <AdminProductsTable initialProducts={products} />
    </div>
  );
}
