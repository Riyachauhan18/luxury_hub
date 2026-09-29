'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Plus as PlusIcon, Edit3 as EditIcon, Trash2 as TrashIcon, X as XIcon } from 'lucide-react';
import { Collection } from '../lib/types';
import { createCollectionAction, updateCollectionAction, deleteCollectionAction } from '../app/actions';

interface AdminCollectionsClientProps {
  initialCollections: Collection[];
}

export default function AdminCollectionsClient({ initialCollections }: AdminCollectionsClientProps) {
  const [collections, setCollections] = useState<Collection[]>(initialCollections);
  const [editingItem, setEditingItem] = useState<Collection | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [saving, setSaving] = useState(false);

  const router = useRouter();

  const openNewModal = () => {
    setName('');
    setDescription('');
    setImageUrl('');
    setIsFeatured(false);
    setIsActive(true);
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const openEditModal = (c: Collection) => {
    setEditingItem(c);
    setName(c.name);
    setDescription(c.description || '');
    setImageUrl(c.image_url || '');
    setIsFeatured(c.is_featured);
    setIsActive(c.is_active);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSaving(true);
    try {
      if (editingItem) {
        const res = await updateCollectionAction(editingItem.id, {
          name: name.trim(),
          description: description.trim() || null,
          image_url: imageUrl.trim() || null,
          is_featured: isFeatured,
          is_active: isActive
        });
        if (res.success && res.data) {
          setCollections(prev => prev.map(c => c.id === res.data!.id ? res.data! : c));
        }
      } else {
        const res = await createCollectionAction({
          name: name.trim(),
          slug: '',
          description: description.trim() || null,
          image_url: imageUrl.trim() || null,
          is_featured: isFeatured,
          is_active: isActive
        });
        if (res.success && res.data) {
          setCollections(prev => [...prev, res.data!]);
        }
      }
      setIsModalOpen(false);
      router.refresh();
    } catch (err) {
      console.error('Save collection error:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this collection?')) return;
    try {
      const res = await deleteCollectionAction(id);
      if (res.success) {
        setCollections(prev => prev.filter(c => c.id !== id));
        router.refresh();
      }
    } catch (err) {
      console.error('Delete collection error:', err);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center">
        <div className="text-xs text-neutral-400">
          Total Collections: <span className="text-white font-semibold">{collections.length}</span>
        </div>
        <button
          onClick={openNewModal}
          className="px-6 py-3 bg-[#C5A85C] text-[#050505] hover:bg-[#D4AF37] transition-all font-semibold text-xs tracking-widest uppercase flex items-center cursor-pointer shadow-lg"
        >
          <PlusIcon className="w-4 h-4 mr-2" /> ADD COLLECTION
        </button>
      </div>

      <div className="border border-white/5 bg-[#0C0C0C] overflow-x-auto">
        <table className="w-full text-left text-xs text-neutral-400">
          <thead className="border-b border-white/5 text-[10px] uppercase text-neutral-500 tracking-widest bg-neutral-900/50">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Collection Name</th>
              <th className="p-4">Slug</th>
              <th className="p-4">Featured</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {collections.map((col) => (
              <tr key={col.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="p-4">
                  <div className="relative w-12 h-12 border border-white/5 bg-neutral-900 shrink-0">
                    <Image src={col.image_url || '/placeholder_product.jpg'} alt={col.name} fill className="object-cover" />
                  </div>
                </td>
                <td className="p-4 text-white font-medium">{col.name}</td>
                <td className="p-4 font-mono text-neutral-400">{col.slug}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 text-[9px] uppercase tracking-wider font-bold ${
                    col.is_featured ? 'bg-[#C5A85C]/20 text-[#C5A85C]' : 'text-neutral-600'
                  }`}>
                    {col.is_featured ? 'YES' : 'NO'}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 text-[9px] uppercase tracking-wider font-bold ${
                    col.is_active ? 'bg-[#25D366]/20 text-[#25D366]' : 'bg-neutral-800 text-neutral-400'
                  }`}>
                    {col.is_active ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end space-x-3">
                    <button
                      onClick={() => openEditModal(col)}
                      className="p-2 border border-white/5 bg-neutral-900 text-neutral-300 hover:text-[#C5A85C] transition-all cursor-pointer"
                    >
                      <EditIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(col.id)}
                      className="p-2 border border-white/5 bg-neutral-900 text-neutral-400 hover:text-red-400 transition-all cursor-pointer"
                    >
                      <TrashIcon className="w-4 h-4" />
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
          <form onSubmit={handleSave} className="max-w-lg w-full bg-[#0C0C0C] border border-white/10 p-8 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h3 className="font-serif text-xl text-white font-light">
                {editingItem ? 'Edit Collection' : 'Create Collection'}
              </h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-white">
                <XIcon className="w-5 h-5" />
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
                  placeholder="E.g. Modern Collection"
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
                  placeholder="Collection style description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full text-xs p-3 bg-[#050505] border border-white/10 text-warm-ivory"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
                  BANNER IMAGE URL
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full text-xs p-3 bg-[#050505] border border-white/10 text-warm-ivory"
                />
              </div>

              <div className="space-y-3 pt-2">
                <label className="flex items-center space-x-2 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="accent-[#C5A85C]"
                  />
                  <span className="text-neutral-300">Feature on Homepage</span>
                </label>

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
                {saving ? 'SAVING...' : 'SAVE COLLECTION'}
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
