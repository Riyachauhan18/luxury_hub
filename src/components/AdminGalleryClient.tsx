'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Plus, Edit3, Trash2, X } from 'lucide-react';
import { GalleryImage, Product } from '../lib/types';
import { createGalleryImageAction, updateGalleryImageAction, deleteGalleryImageAction } from '../app/actions';

interface AdminGalleryClientProps {
  initialGallery: GalleryImage[];
  products: Product[];
}

export default function AdminGalleryClient({ initialGallery, products }: AdminGalleryClientProps) {
  const [gallery, setGallery] = useState<GalleryImage[]>(initialGallery);
  const [editingItem, setEditingItem] = useState<GalleryImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('Bathrooms');
  const [associatedProducts, setAssociatedProducts] = useState<string[]>([]);
  const [displayOrder, setDisplayOrder] = useState<number>(1);
  const [saving, setSaving] = useState(false);

  const router = useRouter();

  const categories = ['Bathrooms', 'Faucets', 'Showers', 'Lighting', 'Hardware', 'Interiors'];

  const openNewModal = () => {
    setTitle('');
    setDescription('');
    setImageUrl('');
    setCategory('Bathrooms');
    setAssociatedProducts([]);
    setDisplayOrder(gallery.length + 1);
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const openEditModal = (g: GalleryImage) => {
    setEditingItem(g);
    setTitle(g.title || '');
    setDescription(g.description || '');
    setImageUrl(g.image_url);
    setCategory(g.category);
    setAssociatedProducts(g.associated_products || []);
    setDisplayOrder(g.display_order || 1);
    setIsModalOpen(true);
  };

  const handleProductTagToggle = (productId: string) => {
    setAssociatedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl.trim()) return;

    setSaving(true);
    try {
      if (editingItem) {
        const res = await updateGalleryImageAction(editingItem.id, {
          title: title.trim() || null,
          description: description.trim() || null,
          image_url: imageUrl.trim(),
          category,
          associated_products: associatedProducts,
          display_order: Number(displayOrder)
        });
        if (res.success && res.data) {
          setGallery(prev => prev.map(g => g.id === res.data!.id ? res.data! : g));
        }
      } else {
        const res = await createGalleryImageAction({
          title: title.trim() || null,
          description: description.trim() || null,
          image_url: imageUrl.trim(),
          category,
          associated_products: associatedProducts,
          display_order: Number(displayOrder)
        });
        if (res.success && res.data) {
          setGallery(prev => [...prev, res.data!]);
        }
      }
      setIsModalOpen(false);
      router.refresh();
    } catch (err) {
      console.error('Save gallery error:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery photo?')) return;
    try {
      const res = await deleteGalleryImageAction(id);
      if (res.success) {
        setGallery(prev => prev.filter(g => g.id !== id));
        router.refresh();
      }
    } catch (err) {
      console.error('Delete gallery error:', err);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center">
        <div className="text-xs text-neutral-400">
          Total Gallery Images: <span className="text-white font-semibold">{gallery.length}</span>
        </div>
        <button
          onClick={openNewModal}
          className="px-6 py-3 bg-[#C5A85C] text-[#050505] hover:bg-[#D4AF37] transition-all font-semibold text-xs tracking-widest uppercase flex items-center cursor-pointer shadow-lg"
        >
          <Plus className="w-4 h-4 mr-2" /> UPLOAD GALLERY IMAGE
        </button>
      </div>

      <div className="border border-white/5 bg-[#0C0C0C] overflow-x-auto">
        <table className="w-full text-left text-xs text-neutral-400">
          <thead className="border-b border-white/5 text-[10px] uppercase text-neutral-500 tracking-widest bg-neutral-900/50">
            <tr>
              <th className="p-4">Photo</th>
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Products Linked</th>
              <th className="p-4">Order</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {gallery.map((img) => (
              <tr key={img.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="p-4">
                  <div className="relative w-16 h-12 border border-white/5 bg-neutral-900 shrink-0">
                    <Image src={img.image_url} alt={img.title || 'Gallery'} fill className="object-cover" />
                  </div>
                </td>
                <td className="p-4 text-white font-medium">{img.title || 'Untitled'}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 text-[9px] uppercase tracking-wider bg-neutral-800 text-[#C5A85C]">
                    {img.category}
                  </span>
                </td>
                <td className="p-4 text-neutral-400">{img.associated_products?.length || 0} Products</td>
                <td className="p-4">{img.display_order}</td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end space-x-3">
                    <button
                      onClick={() => openEditModal(img)}
                      className="p-2 border border-white/5 bg-neutral-900 text-neutral-300 hover:text-[#C5A85C] transition-all cursor-pointer"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(img.id)}
                      className="p-2 border border-white/5 bg-neutral-900 text-neutral-400 hover:text-red-400 transition-all cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6 animate-fade-in">
          <form onSubmit={handleSave} className="max-w-xl w-full bg-[#0C0C0C] border border-white/10 p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h3 className="font-serif text-xl text-white font-light">
                {editingItem ? 'Edit Gallery Photo' : 'Upload Gallery Photo'}
              </h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
                  TITLE
                </label>
                <input
                  type="text"
                  placeholder="E.g. Luxury Obsidian Bathroom Suite"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xs p-3 bg-[#050505] border border-white/10 text-warm-ivory"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
                  IMAGE URL *
                </label>
                <input
                  type="text"
                  required
                  placeholder="https://images.unsplash.com/photo-..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full text-xs p-3 bg-[#050505] border border-white/10 text-warm-ivory"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
                    CATEGORY
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full text-xs p-3 bg-[#050505] border border-white/10 text-warm-ivory"
                  >
                    {categories.map(c => (
                      <option key={c} value={c} className="bg-[#0C0C0C]">{c}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
                    DISPLAY ORDER
                  </label>
                  <input
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(Number(e.target.value))}
                    className="w-full text-xs p-3 bg-[#050505] border border-white/10 text-warm-ivory"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
                  DESCRIPTION
                </label>
                <textarea
                  rows={3}
                  placeholder="Design details and architectural story..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full text-xs p-3 bg-[#050505] border border-white/10 text-warm-ivory"
                />
              </div>

              {/* Associate Catalogue Products Tags */}
              <div className="space-y-2 pt-2 border-t border-white/5">
                <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
                  TAG ASSOCIATED PRODUCTS USED IN PHOTO
                </label>
                <div className="max-h-36 overflow-y-auto border border-white/5 p-3 bg-[#050505] space-y-2">
                  {products.map(p => {
                    const isTagged = associatedProducts.includes(p.id);
                    return (
                      <label key={p.id} className="flex items-center space-x-3 text-xs cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isTagged}
                          onChange={() => handleProductTagToggle(p.id)}
                          className="accent-[#C5A85C]"
                        />
                        <span className={isTagged ? 'text-[#C5A85C] font-semibold' : 'text-neutral-400'}>
                          {p.name} {p.product_code ? `(${p.product_code})` : ''}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-white/5">
              <button
                type="submit"
                disabled={saving}
                className="w-full py-3 bg-[#C5A85C] text-[#050505] font-semibold text-xs tracking-widest uppercase hover:bg-[#D4AF37] transition-all cursor-pointer"
              >
                {saving ? 'SAVING...' : 'SAVE GALLERY IMAGE'}
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
