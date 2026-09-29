'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Plus, Edit3, Trash2, X, Check } from 'lucide-react';
import { Category } from '../lib/types';
import { createCategoryAction, updateCategoryAction, deleteCategoryAction } from '../app/actions';

interface AdminCategoriesClientProps {
  initialCategories: Category[];
}

export default function AdminCategoriesClient({ initialCategories }: AdminCategoriesClientProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [editingItem, setEditingItem] = useState<Category | null>(null);
  const [isNewModal, setIsNewModal] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [displayOrder, setDisplayOrder] = useState<number>(1);
  const [isActive, setIsActive] = useState(true);
  const [saving, setSaving] = useState(false);

  const router = useRouter();

  const openNewModal = () => {
    setName('');
    setDescription('');
    setImageUrl('');
    setDisplayOrder(categories.length + 1);
    setIsActive(true);
    setEditingItem(null);
    setIsNewModal(true);
  };

  const openEditModal = (c: Category) => {
    setEditingItem(c);
    setName(c.name);
    setDescription(c.description || '');
    setImageUrl(c.image_url || '');
    setDisplayOrder(c.display_order || 1);
    setIsActive(c.is_active);
    setIsNewModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSaving(true);
    try {
      if (editingItem) {
        const res = await updateCategoryAction(editingItem.id, {
          name: name.trim(),
          description: description.trim() || null,
          image_url: imageUrl.trim() || null,
          display_order: Number(displayOrder),
          is_active: isActive
        });
        if (res.success && res.data) {
          setCategories(prev => prev.map(c => c.id === res.data!.id ? res.data! : c));
        }
      } else {
        const res = await createCategoryAction({
          name: name.trim(),
          slug: '',
          description: description.trim() || null,
          image_url: imageUrl.trim() || null,
          display_order: Number(displayOrder),
          is_active: isActive
        });
        if (res.success && res.data) {
          setCategories(prev => [...prev, res.data!]);
        }
      }
      setIsNewModal(false);
      router.refresh();
    } catch (err) {
      console.error('Save category error:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    try {
      const res = await deleteCategoryAction(id);
      if (res.success) {
        setCategories(prev => prev.filter(c => c.id !== id));
        router.refresh();
      }
    } catch (err) {
      console.error('Delete category error:', err);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center">
        <div className="text-xs text-neutral-400">
          Total Departments: <span className="text-white font-semibold">{categories.length}</span>
        </div>
        <button
          onClick={openNewModal}
          className="px-6 py-3 bg-[#C5A85C] text-[#050505] hover:bg-[#D4AF37] transition-all font-semibold text-xs tracking-widest uppercase flex items-center cursor-pointer shadow-lg"
        >
          <Plus className="w-4 h-4 mr-2" /> ADD CATEGORY
        </button>
      </div>

      <div className="border border-white/5 bg-[#0C0C0C] overflow-x-auto">
        <table className="w-full text-left text-xs text-neutral-400">
          <thead className="border-b border-white/5 text-[10px] uppercase text-neutral-500 tracking-widest bg-neutral-900/50">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Category Name</th>
              <th className="p-4">Slug</th>
              <th className="p-4">Order</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="p-4">
                  <div className="relative w-12 h-12 border border-white/5 bg-neutral-900 shrink-0">
                    <Image src={cat.image_url || '/placeholder_product.jpg'} alt={cat.name} fill className="object-cover" />
                  </div>
                </td>
                <td className="p-4 text-white font-medium">{cat.name}</td>
                <td className="p-4 font-mono text-neutral-400">{cat.slug}</td>
                <td className="p-4">{cat.display_order}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 text-[9px] uppercase tracking-wider font-bold ${
                    cat.is_active ? 'bg-[#25D366]/20 text-[#25D366]' : 'bg-neutral-800 text-neutral-400'
                  }`}>
                    {cat.is_active ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end space-x-3">
                    <button
                      onClick={() => openEditModal(cat)}
                      className="p-2 border border-white/5 bg-neutral-900 text-neutral-300 hover:text-[#C5A85C] transition-all cursor-pointer"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
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

      {/* CREATE / EDIT MODAL */}
      {isNewModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6 animate-fade-in">
          <form onSubmit={handleSave} className="max-w-lg w-full bg-[#0C0C0C] border border-white/10 p-8 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h3 className="font-serif text-xl text-white font-light">
                {editingItem ? 'Edit Category' : 'Create Category'}
              </h3>
              <button type="button" onClick={() => setIsNewModal(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
                  NAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="E.g. Sanitaryware"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs p-3 bg-[#050505] border border-white/10 text-warm-ivory"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
                  DESCRIPTION
                </label>
                <textarea
                  rows={3}
                  placeholder="Short department summary..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full text-xs p-3 bg-[#050505] border border-white/10 text-warm-ivory"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
                  IMAGE URL
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full text-xs p-3 bg-[#050505] border border-white/10 text-warm-ivory"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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

                <div className="space-y-2 pt-6">
                  <label className="flex items-center space-x-2 text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      className="accent-[#C5A85C]"
                    />
                    <span className="text-neutral-300">Active</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-white/5">
              <button
                type="submit"
                disabled={saving}
                className="w-full py-3 bg-[#C5A85C] text-[#050505] font-semibold text-xs tracking-widest uppercase hover:bg-[#D4AF37] transition-all cursor-pointer"
              >
                {saving ? 'SAVING...' : 'SAVE CATEGORY'}
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
