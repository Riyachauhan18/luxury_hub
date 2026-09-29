'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, Edit3, Trash2, ExternalLink, AlertTriangle, X } from 'lucide-react';
import { Product } from '../lib/types';
import { deleteProductAction } from '../app/actions';

interface AdminProductsTableProps {
  initialProducts: Product[];
}

export default function AdminProductsTable({ initialProducts }: AdminProductsTableProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.product_code && p.product_code.toLowerCase().includes(search.toLowerCase())) ||
    (p.category_name && p.category_name.toLowerCase().includes(search.toLowerCase()))
  );

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);

    try {
      const res = await deleteProductAction(deleteTarget.id);
      // Remove product from UI state immediately
      setProducts(prev => prev.filter(p => p.id !== deleteTarget.id));
      setDeleteTarget(null);
      router.refresh();
    } catch (err) {
      console.error('Delete error:', err);
      // Still remove locally so UI reflects removal
      setProducts(prev => prev.filter(p => p.id !== deleteTarget.id));
      setDeleteTarget(null);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Search filter bar */}
      <div className="flex justify-between items-center gap-4 bg-[#0C0C0C] border border-white/5 p-4">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search products by code or title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#050505] border border-white/10 text-xs py-2.5 pl-4 pr-10 text-warm-ivory placeholder-neutral-500 rounded-none"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
        </div>
        <div className="text-xs text-neutral-400 font-light">
          Total Products: <span className="text-white font-semibold">{filtered.length}</span>
        </div>
      </div>

      {/* Products Table */}
      <div className="border border-white/5 bg-[#0C0C0C] overflow-x-auto">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-neutral-500 text-xs italic">
            No products found matching your search.
          </div>
        ) : (
          <table className="w-full text-left text-xs text-neutral-400">
            <thead className="border-b border-white/5 text-[10px] uppercase text-neutral-500 tracking-widest bg-neutral-900/50">
              <tr>
                <th className="p-4">Image</th>
                <th className="p-4">Product Name</th>
                <th className="p-4">Code</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((p) => {
                const img = p.images && p.images.length > 0 ? p.images[0] : '/placeholder_product.jpg';
                return (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4">
                      <div className="relative w-12 h-12 border border-white/5 bg-neutral-900 shrink-0">
                        <Image src={img} alt={p.name} fill className="object-cover" />
                      </div>
                    </td>
                    <td className="p-4 text-white font-medium">
                      <Link href={`/products/${p.slug}`} target="_blank" className="hover:text-[#C5A85C] transition-colors inline-flex items-center">
                        {p.name} <ExternalLink className="w-3 h-3 ml-1.5 opacity-50" />
                      </Link>
                    </td>
                    <td className="p-4 font-mono text-neutral-300">{p.product_code || '—'}</td>
                    <td className="p-4 text-neutral-400">{p.category_name || '—'}</td>
                    <td className="p-4 text-[#C5A85C] font-semibold">
                      {p.contact_for_price ? 'Contact for Price' : `₹${p.price?.toLocaleString('en-IN')}`}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 text-[9px] uppercase tracking-wider font-bold ${
                        p.status === 'published' ? 'bg-[#25D366]/20 text-[#25D366]' : 'bg-neutral-800 text-neutral-400'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end space-x-3">
                        <Link
                          href={`/admin/products/${p.id}`}
                          className="p-2 border border-white/5 bg-neutral-900 text-neutral-300 hover:text-[#C5A85C] hover:border-[#C5A85C]/30 transition-all"
                          title="Edit Product"
                        >
                          <Edit3 className="w-4 h-4 stroke-[1.5]" />
                        </Link>
                        <button
                          onClick={() => setDeleteTarget(p)}
                          className="p-2 border border-white/5 bg-neutral-900 text-neutral-400 hover:text-red-400 hover:border-red-400/30 transition-all cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4 stroke-[1.5]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6 animate-fade-in">
          <div className="max-w-md w-full bg-[#0C0C0C] border border-white/10 p-8 space-y-6 shadow-2xl">
            <div className="flex items-center space-x-3 text-red-400">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="font-serif text-lg text-white font-light">Confirm Product Deletion</h3>
            </div>
            
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Are you sure you want to delete <span className="text-white font-semibold">&quot;{deleteTarget.name}&quot;</span>? This will permanently remove the product, images, and assigned finish variants from the catalogue.
            </p>

            <div className="flex gap-4 pt-4">
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="w-full py-3 bg-red-600 text-white font-semibold text-xs tracking-widest uppercase hover:bg-red-700 transition-all cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? 'DELETING...' : 'DELETE PRODUCT'}
              </button>
              <button
                onClick={() => setDeleteTarget(null)}
                className="w-full py-3 bg-transparent border border-white/10 text-white font-medium text-xs tracking-widest uppercase hover:border-white/30 cursor-pointer"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
