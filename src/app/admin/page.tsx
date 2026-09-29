import React from 'react';
import Link from 'next/link';
import { Package, FolderTree, Layers, Tag, Image as ImageIcon, MessageSquareText, Plus, Eye, ArrowUpRight } from 'lucide-react';
import { 
  getAllProductsAdmin, 
  getAllCategoriesAdmin, 
  getAllCollectionsAdmin, 
  getAllBrandsAdmin, 
  getAllGalleryAdmin, 
  getEnquiries 
} from '@/lib/db';
import AdminProductsTable from '@/components/AdminProductsTable';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const [
    products,
    categories,
    collections,
    brands,
    gallery,
    enquiries
  ] = await Promise.all([
    getAllProductsAdmin(),
    getAllCategoriesAdmin(),
    getAllCollectionsAdmin(),
    getAllBrandsAdmin(),
    getAllGalleryAdmin(),
    getEnquiries()
  ]);

  const recentEnquiries = enquiries.slice(0, 5);
  const recentProducts = products.slice(0, 4);

  return (
    <div className="space-y-10 font-sans">
      
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="font-serif text-3xl font-light tracking-wide text-white">
            Dashboard Overview
          </h1>
          <p className="text-xs text-neutral-400 font-light mt-1">
            Welcome to THE LUXURY HUB administrative control center.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center px-6 py-3 bg-[#C5A85C] text-[#050505] hover:bg-[#D4AF37] transition-all font-semibold text-xs tracking-widest uppercase cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-2" /> ADD NEW PRODUCT
        </Link>
      </div>

      {/* STATISTICS CARDS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <Link href="#product-catalog" className="bg-[#0C0C0C] border border-white/5 hover:border-[#C5A85C]/40 transition-all p-6 space-y-2 block cursor-pointer group">
          <div className="flex justify-between items-center text-neutral-500 group-hover:text-[#C5A85C]">
            <span className="text-[10px] tracking-widest uppercase font-semibold">PRODUCTS</span>
            <Package className="w-4 h-4 text-[#C5A85C]" />
          </div>
          <div className="text-3xl font-serif font-light text-white">{products.length}</div>
        </Link>

        <Link href="/admin/categories" className="bg-[#0C0C0C] border border-white/5 hover:border-[#C5A85C]/40 transition-all p-6 space-y-2 block cursor-pointer group">
          <div className="flex justify-between items-center text-neutral-500 group-hover:text-[#C5A85C]">
            <span className="text-[10px] tracking-widest uppercase font-semibold">CATEGORIES</span>
            <FolderTree className="w-4 h-4 text-[#C5A85C]" />
          </div>
          <div className="text-3xl font-serif font-light text-white">{categories.length}</div>
        </Link>

        <Link href="/admin/collections" className="bg-[#0C0C0C] border border-white/5 hover:border-[#C5A85C]/40 transition-all p-6 space-y-2 block cursor-pointer group">
          <div className="flex justify-between items-center text-neutral-500 group-hover:text-[#C5A85C]">
            <span className="text-[10px] tracking-widest uppercase font-semibold">COLLECTIONS</span>
            <Layers className="w-4 h-4 text-[#C5A85C]" />
          </div>
          <div className="text-3xl font-serif font-light text-white">{collections.length}</div>
        </Link>

        <Link href="/admin/brands" className="bg-[#0C0C0C] border border-white/5 hover:border-[#C5A85C]/40 transition-all p-6 space-y-2 block cursor-pointer group">
          <div className="flex justify-between items-center text-neutral-500 group-hover:text-[#C5A85C]">
            <span className="text-[10px] tracking-widest uppercase font-semibold">BRANDS</span>
            <Tag className="w-4 h-4 text-[#C5A85C]" />
          </div>
          <div className="text-3xl font-serif font-light text-white">{brands.length}</div>
        </Link>

        <Link href="/admin/gallery" className="bg-[#0C0C0C] border border-white/5 hover:border-[#C5A85C]/40 transition-all p-6 space-y-2 block cursor-pointer group">
          <div className="flex justify-between items-center text-neutral-500 group-hover:text-[#C5A85C]">
            <span className="text-[10px] tracking-widest uppercase font-semibold">GALLERY</span>
            <ImageIcon className="w-4 h-4 text-[#C5A85C]" />
          </div>
          <div className="text-3xl font-serif font-light text-white">{gallery.length}</div>
        </Link>

        <Link href="/admin/enquiries" className="bg-[#0C0C0C] border border-white/5 hover:border-[#C5A85C]/40 transition-all p-6 space-y-2 block cursor-pointer group">
          <div className="flex justify-between items-center text-neutral-500 group-hover:text-[#C5A85C]">
            <span className="text-[10px] tracking-widest uppercase font-semibold">ENQUIRIES</span>
            <MessageSquareText className="w-4 h-4 text-[#C5A85C]" />
          </div>
          <div className="text-3xl font-serif font-light text-white">{enquiries.length}</div>
        </Link>
      </div>

      {/* RECENT ENQUIRIES TABLE */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-serif text-xl text-white font-light">Recent Customer Enquiries</h2>
          <Link href="/admin/enquiries" className="text-xs text-[#C5A85C] hover:text-white flex items-center font-semibold tracking-wider">
            VIEW ALL <ArrowUpRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="border border-white/5 bg-[#0C0C0C] overflow-x-auto">
          {recentEnquiries.length === 0 ? (
            <div className="p-8 text-center text-neutral-500 text-xs italic">
              No customer enquiries recorded yet.
            </div>
          ) : (
            <table className="w-full text-left text-xs text-neutral-400">
              <thead className="border-b border-white/5 text-[10px] uppercase text-neutral-500 tracking-widest bg-neutral-900/50">
                <tr>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Items Count</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-white/[0.02]">
                    <td className="p-4 text-white font-medium">{enq.customer_name}</td>
                    <td className="p-4">{enq.customer_phone}</td>
                    <td className="p-4">{enq.items?.length || 0} Products</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 text-[9px] uppercase tracking-wider font-bold ${
                        enq.status === 'new' ? 'bg-amber-500/20 text-amber-300' : 'bg-neutral-800 text-neutral-400'
                      }`}>
                        {enq.status}
                      </span>
                    </td>
                    <td className="p-4 text-right text-neutral-500 text-[10px]">
                      {enq.created_at ? new Date(enq.created_at).toLocaleDateString() : 'Recent'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* QUICK PRODUCT MANAGEMENT (EDIT / DELETE DIRECTLY HERE) */}
      <div id="product-catalog" className="space-y-4 pt-4 border-t border-white/5 scroll-mt-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-serif text-xl text-white font-light">Product Catalogue Management</h2>
            <p className="text-xs text-neutral-500 font-light">Search, edit, or delete products directly from your dashboard.</p>
          </div>
          <Link href="/admin/products/new" className="text-xs text-[#C5A85C] hover:text-white flex items-center font-semibold tracking-wider">
            <Plus className="w-4 h-4 mr-1" /> ADD PRODUCT
          </Link>
        </div>

        <AdminProductsTable initialProducts={products} />
      </div>

    </div>
  );
}
