'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit3, Trash2, X } from 'lucide-react';
import { FAQ } from '../lib/types';
import { createFAQAction, updateFAQAction, deleteFAQAction } from '../app/actions';

interface AdminFAQsClientProps {
  initialFAQs: FAQ[];
}

export default function AdminFAQsClient({ initialFAQs }: AdminFAQsClientProps) {
  const [faqs, setFaqs] = useState<FAQ[]>(initialFAQs);
  const [editingItem, setEditingItem] = useState<FAQ | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [displayOrder, setDisplayOrder] = useState<number>(1);
  const [isActive, setIsActive] = useState(true);
  const [saving, setSaving] = useState(false);

  const router = useRouter();

  const openNewModal = () => {
    setQuestion('');
    setAnswer('');
    setDisplayOrder(faqs.length + 1);
    setIsActive(true);
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const openEditModal = (f: FAQ) => {
    setEditingItem(f);
    setQuestion(f.question);
    setAnswer(f.answer);
    setDisplayOrder(f.display_order || 1);
    setIsActive(f.is_active);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;

    setSaving(true);
    try {
      if (editingItem) {
        const res = await updateFAQAction(editingItem.id, {
          question: question.trim(),
          answer: answer.trim(),
          display_order: Number(displayOrder),
          is_active: isActive
        });
        if (res.success && res.data) {
          setFaqs(prev => prev.map(f => f.id === res.data!.id ? res.data! : f));
        }
      } else {
        const res = await createFAQAction({
          question: question.trim(),
          answer: answer.trim(),
          display_order: Number(displayOrder),
          is_active: isActive
        });
        if (res.success && res.data) {
          setFaqs(prev => [...prev, res.data!]);
        }
      }
      setIsModalOpen(false);
      router.refresh();
    } catch (err) {
      console.error('Save FAQ error:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;
    try {
      const res = await deleteFAQAction(id);
      if (res.success) {
        setFaqs(prev => prev.filter(f => f.id !== id));
        router.refresh();
      }
    } catch (err) {
      console.error('Delete FAQ error:', err);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center">
        <div className="text-xs text-neutral-400">
          Total FAQs: <span className="text-white font-semibold">{faqs.length}</span>
        </div>
        <button
          onClick={openNewModal}
          className="px-6 py-3 bg-[#C5A85C] text-[#050505] hover:bg-[#D4AF37] transition-all font-semibold text-xs tracking-widest uppercase flex items-center cursor-pointer shadow-lg"
        >
          <Plus className="w-4 h-4 mr-2" /> ADD FAQ
        </button>
      </div>

      <div className="border border-white/5 bg-[#0C0C0C] overflow-x-auto">
        <table className="w-full text-left text-xs text-neutral-400">
          <thead className="border-b border-white/5 text-[10px] uppercase text-neutral-500 tracking-widest bg-neutral-900/50">
            <tr>
              <th className="p-4">Question</th>
              <th className="p-4">Answer Preview</th>
              <th className="p-4">Order</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {faqs.map((f) => (
              <tr key={f.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="p-4 text-white font-medium max-w-xs">{f.question}</td>
                <td className="p-4 text-neutral-400 max-w-sm line-clamp-2">{f.answer}</td>
                <td className="p-4">{f.display_order}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 text-[9px] uppercase tracking-wider font-bold ${
                    f.is_active ? 'bg-[#25D366]/20 text-[#25D366]' : 'bg-neutral-800 text-neutral-400'
                  }`}>
                    {f.is_active ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end space-x-3">
                    <button
                      onClick={() => openEditModal(f)}
                      className="p-2 border border-white/5 bg-neutral-900 text-neutral-300 hover:text-[#C5A85C] transition-all cursor-pointer"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(f.id)}
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
          <form onSubmit={handleSave} className="max-w-lg w-full bg-[#0C0C0C] border border-white/10 p-8 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h3 className="font-serif text-xl text-white font-light">
                {editingItem ? 'Edit FAQ' : 'Add FAQ'}
              </h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
                  QUESTION *
                </label>
                <input
                  type="text"
                  required
                  placeholder="E.g. How can I enquire about a product?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full text-xs p-3 bg-[#050505] border border-white/10 text-warm-ivory"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
                  ANSWER *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detailed answer explanation..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
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
                {saving ? 'SAVING...' : 'SAVE FAQ'}
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
