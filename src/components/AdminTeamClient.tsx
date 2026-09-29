'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Plus, Edit3, Trash2, X, Users2 } from 'lucide-react';
import { TeamMember } from '../lib/types';
import { createTeamMemberAction, updateTeamMemberAction, deleteTeamMemberAction } from '../app/actions';

interface AdminTeamClientProps {
  initialTeam: TeamMember[];
}

export default function AdminTeamClient({ initialTeam }: AdminTeamClientProps) {
  const [team, setTeam] = useState<TeamMember[]>(initialTeam);
  const [editingItem, setEditingItem] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [bio, setBio] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [displayOrder, setDisplayOrder] = useState<number>(1);
  const [isActive, setIsActive] = useState(true);
  const [saving, setSaving] = useState(false);

  const router = useRouter();

  const openNewModal = () => {
    setName('');
    setRole('');
    setBio('');
    setPhotoUrl('');
    setDisplayOrder(team.length + 1);
    setIsActive(true);
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const openEditModal = (m: TeamMember) => {
    setEditingItem(m);
    setName(m.name);
    setRole(m.role);
    setBio(m.bio || '');
    setPhotoUrl(m.photo_url || '');
    setDisplayOrder(m.display_order || 1);
    setIsActive(m.is_active);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !role.trim()) return;

    setSaving(true);
    try {
      if (editingItem) {
        const res = await updateTeamMemberAction(editingItem.id, {
          name: name.trim(),
          role: role.trim(),
          bio: bio.trim() || null,
          photo_url: photoUrl.trim() || null,
          display_order: Number(displayOrder),
          is_active: isActive
        });
        if (res.success && res.data) {
          setTeam(prev => prev.map(m => m.id === res.data!.id ? res.data! : m));
        }
      } else {
        const res = await createTeamMemberAction({
          name: name.trim(),
          role: role.trim(),
          bio: bio.trim() || null,
          photo_url: photoUrl.trim() || null,
          display_order: Number(displayOrder),
          is_active: isActive
        });
        if (res.success && res.data) {
          setTeam(prev => [...prev, res.data!]);
        }
      }
      setIsModalOpen(false);
      router.refresh();
    } catch (err) {
      console.error('Save team error:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;
    try {
      const res = await deleteTeamMemberAction(id);
      if (res.success) {
        setTeam(prev => prev.filter(m => m.id !== id));
        router.refresh();
      }
    } catch (err) {
      console.error('Delete team error:', err);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center">
        <div className="text-xs text-neutral-400">
          Total Registered Team: <span className="text-white font-semibold">{team.length}</span>
        </div>
        <button
          onClick={openNewModal}
          className="px-6 py-3 bg-[#C5A85C] text-[#050505] hover:bg-[#D4AF37] transition-all font-semibold text-xs tracking-widest uppercase flex items-center cursor-pointer shadow-lg"
        >
          <Plus className="w-4 h-4 mr-2" /> ADD TEAM MEMBER
        </button>
      </div>

      <div className="border border-white/5 bg-[#0C0C0C] overflow-x-auto">
        <table className="w-full text-left text-xs text-neutral-400">
          <thead className="border-b border-white/5 text-[10px] uppercase text-neutral-500 tracking-widest bg-neutral-900/50">
            <tr>
              <th className="p-4">Photo</th>
              <th className="p-4">Name</th>
              <th className="p-4">Role</th>
              <th className="p-4">Order</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {team.map((m) => (
              <tr key={m.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="p-4">
                  <div className="relative w-12 h-12 border border-white/5 bg-neutral-900 shrink-0 flex items-center justify-center">
                    {m.photo_url ? (
                      <Image src={m.photo_url} alt={m.name} fill className="object-cover" />
                    ) : (
                      <Users2 className="w-6 h-6 text-neutral-600" />
                    )}
                  </div>
                </td>
                <td className="p-4 text-white font-medium">{m.name}</td>
                <td className="p-4 text-[#C5A85C] font-semibold">{m.role}</td>
                <td className="p-4">{m.display_order}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 text-[9px] uppercase tracking-wider font-bold ${
                    m.is_active ? 'bg-[#25D366]/20 text-[#25D366]' : 'bg-neutral-800 text-neutral-400'
                  }`}>
                    {m.is_active ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end space-x-3">
                    <button
                      onClick={() => openEditModal(m)}
                      className="p-2 border border-white/5 bg-neutral-900 text-neutral-300 hover:text-[#C5A85C] transition-all cursor-pointer"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(m.id)}
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
                {editingItem ? 'Edit Profile' : 'Add Team Member'}
              </h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-white">
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
                  placeholder="E.g. Founder / Owner Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs p-3 bg-[#050505] border border-white/10 text-warm-ivory"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
                  ROLE / DESIGNATION *
                </label>
                <input
                  type="text"
                  required
                  placeholder="E.g. Founder & Managing Director"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full text-xs p-3 bg-[#050505] border border-white/10 text-warm-ivory"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
                  PHOTO URL
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="w-full text-xs p-3 bg-[#050505] border border-white/10 text-warm-ivory"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
                  SHORT BIOGRAPHY
                </label>
                <textarea
                  rows={3}
                  placeholder="Professional background story..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
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
                {saving ? 'SAVING...' : 'SAVE MEMBER'}
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
