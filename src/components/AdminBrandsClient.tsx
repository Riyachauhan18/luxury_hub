'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Plus, Edit3, Trash2, X } from 'lucide-react';
import { Brand } from '../lib/types';
import { createBrandAction, updateBrandAction, deleteBrandAction } from '../app/actions';

interface AdminBrandsClientProps {
  initialBrands: Brand[];
}

export default function AdminBrandsClient({ initialBrands }: AdminBrandsClientProps) {
  const [brands, setBrands] = useState<Brand[]>(initialBrands);
  const [editingItem, setEditingItem] = useState<Brand | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [saving, setSaving] = useState(false);

  const router = useRouter();

  const openNewModal = () => {
    setName('');
    setDescription('');
    setLogoUrl('');
    setWebsiteUrl('');
    setIsActive(true);
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const openEditModal = (b: Brand) => {
    setEditingItem(b);
    setName(b.name);
    setDescription(b.description || '');
    setLogoUrl(b.logo_url || '');
    setWebsiteUrl(b.website_url || '');
    setIsActive(b.is_active);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSaving(true);
    try {
      if (editingItem) {
        const res = await updateBrandAction(editingItem.id, {
          name: name.trim(),
          description: description.trim() || null,
          logo_url: logoUrl.trim() || null,
          website_url: websiteUrl.trim() || null,
          is_active: isActive
        });
        if (res.success && res.data) {
          setBrands(prev => prev.map(b => b.id === res.data!.id ? res.data! : b));
        }
      } else {
        const res = await createBrandAction({
          name: name.trim(),
          slug: '',
          description: description.trim() || null,
          logo_url: logoUrl.trim() || null,
          banner_url: null,
          website_url: websiteUrl.trim() || null,
          is_active: isActive
        });
        if (res.success && res.data) {
          setBrands(prev => [...prev, res.data!]);
        }
      }
      setIsModalOpen(false);
      router.refresh();
    } catch (err) {
      console.error('Save brand error:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this brand?')) return;
    try {
      const res = await deleteBrandAction(id);
      if (res.success) {
        setBrands(prev => prev.filter(b => b.id !== id));
        router.refresh();
      }
    } catch (err) {
      console.error('Delete brand error:', err);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center">
        <div className="text-xs text-neutral-400">
          Total Partner Brands: <span className="text-white font-semibold">{brands.length}</span>
        </div>
        <button
          onClick={openNewModal}
          className="px-6 py-3 bg-[#C5A85C] text-[#050505] hover:bg-[#D4AF37] transition-all font-semibold text-xs tracking-widest uppercase flex items-center cursor-pointer shadow-lg"
        >
          <Plus className="w-4 h-4 mr-2" /> ADD BRAND
        </button>
      </div>

      <div className="border border-white/5 bg-[#0C0C0C] overflow-x-auto">
        {brands.length === 0 ? (
          <div className="p-12 text-center text-neutral-500 text-xs italic">
            No external brands registered yet. Partner brand profiles can be added when authorized by the owner.
          </div>
        ) : (
          <table className="w-full text-left text-xs text-neutral-400">
            <thead className="border-b border-white/5 text-[10px] uppercase text-neutral-500 tracking-widest bg-neutral-900/50">
              <tr>
                <th className="p-4">Logo</th>
                <th className="p-4">Brand Name</th>
                <th className="p-4">Slug</th>
                <th className="p-4">Website</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {brands.map((b) => (
                <tr key={b.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4">
                    <div className="relative w-12 h-12 border border-white/5 bg-neutral-900 shrink-0">
                      {b.logo_url ? (
                        <Image src={b.logo_url} alt={b.name} fill className="object-contain" />
                      ) : (
                        <span className="text-[10px] text-neutral-600 flex items-center justify-center h-full">NO LOGO</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-white font-medium">{b.name}</td>
                  <td className="p-4 font-mono text-neutral-400">{b.slug}</td>
                  <td className="p-4 text-neutral-400">{b.website_url || '—'}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 text-[9px] uppercase tracking-wider font-bold ${
                      b.is_active ? 'bg-[#25D366]/20 text-[#25D366]' : 'bg-neutral-800 text-neutral-400'
                    }`}>
                      {b.is_active ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-3">
                      <button
                        onClick={() => openEditModal(b)}
                        className="p-2 border border-white/5 bg-neutral-900 text-neutral-300 hover:text-[#C5A85C] transition-all cursor-pointer"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(b.id)}
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
        )}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6 animate-fade-in">
          <form onSubmit={handleSave} className="max-w-lg w-full bg-[#0C0C0C] border border-white/10 p-8 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h3 className="font-serif text-xl text-white font-light">
                {editingItem ? 'Edit Brand' : 'Add Brand'}
              </h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
                  BRAND NAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="E.g. Designer Line"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs p-3 bg-[#050505] border border-white/10 text-warm-ivory"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
                  LOGO URL
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  className="w-full text-xs p-3 bg-[#050505] border border-white/10 text-warm-ivory"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
                  WEBSITE URL
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="w-full text-xs p-3 bg-[#050505] border border-white/10 text-warm-ivory"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
                  DESCRIPTION
                </label>
                <textarea
                  rows={3}
                  placeholder="Brand story or details..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full text-xs p-3 bg-[#050505] border border-white/10 text-warm-ivory"
                />
              </div>

              <div className="pt-2">
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

            <div className="flex gap-4 pt-4 border-t border-white/5">
              <button
                type="submit"
                disabled={saving}
                className="w-full py-3 bg-[#C5A85C] text-[#050505] font-semibold text-xs tracking-widest uppercase hover:bg-[#D4AF37] transition-all cursor-pointer"
              >
                {saving ? 'SAVING...' : 'SAVE BRAND'}
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
