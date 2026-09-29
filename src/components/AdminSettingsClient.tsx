'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Check, Phone, Building, Globe, Share2, Search, ShieldCheck, KeyRound } from 'lucide-react';
import { WebsiteSettings } from '../lib/types';
import { updateSettingsAction, updateAdminPasswordsAction } from '../app/actions';

interface AdminSettingsClientProps {
  initialSettings: WebsiteSettings;
}

export default function AdminSettingsClient({ initialSettings }: AdminSettingsClientProps) {
  const [settings, setSettings] = useState<WebsiteSettings>(initialSettings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Security Passwords State (Owner Handover)
  const [ownerPass, setOwnerPass] = useState('');
  const [managerPass, setManagerPass] = useState('');
  const [passStatus, setPassStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [savingPass, setSavingPass] = useState(false);

  const router = useRouter();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    try {
      const res = await updateSettingsAction(settings);
      if (res.success && res.data) {
        setSettings(res.data);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        router.refresh();
      }
    } catch (err) {
      console.error('Update settings error:', err);
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassStatus(null);
    setSavingPass(true);

    try {
      const res = await updateAdminPasswordsAction(ownerPass, managerPass);
      if (res.success) {
        setPassStatus({ success: true, message: 'Admin passwords updated successfully for this session!' });
        setOwnerPass('');
        setManagerPass('');
      } else {
        setPassStatus({ success: false, message: res.error || 'Failed to update passwords.' });
      }
    } catch (err) {
      setPassStatus({ success: false, message: 'An unexpected error occurred while updating passwords.' });
    } finally {
      setSavingPass(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-12 max-w-4xl font-sans">
      
      {saved && (
        <div className="p-4 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-xs flex items-center">
          <Check className="w-4 h-4 mr-2" /> Website settings updated successfully!
        </div>
      )}

      {/* 1. BUSINESS INFORMATION */}
      <div className="bg-[#0C0C0C] border border-white/5 p-8 space-y-6">
        <h3 className="font-serif text-xl font-light text-white border-b border-white/5 pb-4 flex items-center">
          <Building className="w-5 h-5 text-[#C5A85C] mr-2 stroke-[1.5]" /> 1. Business Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="space-y-2">
            <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">BUSINESS NAME</label>
            <input
              type="text"
              value={settings.business.name}
              onChange={(e) => setSettings({
                ...settings,
                business: { ...settings.business, name: e.target.value }
              })}
              className="w-full p-3 bg-[#050505] border border-white/10 text-warm-ivory"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">PHONE NUMBER</label>
            <input
              type="text"
              value={settings.business.phone}
              onChange={(e) => setSettings({
                ...settings,
                business: { ...settings.business, phone: e.target.value }
              })}
              className="w-full p-3 bg-[#050505] border border-white/10 text-warm-ivory"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">EMAIL ADDRESS</label>
            <input
              type="text"
              value={settings.business.email}
              onChange={(e) => setSettings({
                ...settings,
                business: { ...settings.business, email: e.target.value }
              })}
              className="w-full p-3 bg-[#050505] border border-white/10 text-warm-ivory"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">OPENING HOURS</label>
            <input
              type="text"
              value={settings.business.opening_hours}
              onChange={(e) => setSettings({
                ...settings,
                business: { ...settings.business, opening_hours: e.target.value }
              })}
              className="w-full p-3 bg-[#050505] border border-white/10 text-warm-ivory"
            />
          </div>
        </div>

        <div className="space-y-2 text-xs">
          <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">SHOWROOM ADDRESS</label>
          <textarea
            rows={2}
            value={settings.business.address}
            onChange={(e) => setSettings({
              ...settings,
              business: { ...settings.business, address: e.target.value }
            })}
            className="w-full p-3 bg-[#050505] border border-white/10 text-warm-ivory"
          />
        </div>
      </div>

      {/* 2. WHATSAPP CONFIGURATION */}
      <div className="bg-[#0C0C0C] border border-white/5 p-8 space-y-6">
        <h3 className="font-serif text-xl font-light text-white border-b border-white/5 pb-4 flex items-center">
          <Phone className="w-5 h-5 text-[#25D366] mr-2 stroke-[1.5]" /> 2. Central WhatsApp Number
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="space-y-2">
            <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">WHATSAPP NUMBER *</label>
            <input
              type="text"
              value={settings.whatsapp.number}
              onChange={(e) => setSettings({
                ...settings,
                whatsapp: { ...settings.whatsapp, number: e.target.value }
              })}
              placeholder="E.g. 919876543210"
              className="w-full p-3 bg-[#050505] border border-white/10 text-warm-ivory font-mono"
            />
            <p className="text-[10px] text-neutral-500 italic">
              All floating buttons, product enquiry buttons, and cart checkout CTAs across the entire website will automatically link to this number.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">DEFAULT WELCOME MESSAGE</label>
            <textarea
              rows={3}
              value={settings.whatsapp.default_message}
              onChange={(e) => setSettings({
                ...settings,
                whatsapp: { ...settings.whatsapp, default_message: e.target.value }
              })}
              className="w-full p-3 bg-[#050505] border border-white/10 text-warm-ivory"
            />
          </div>
        </div>
      </div>

      {/* 3. HOMEPAGE HERO COPY */}
      <div className="bg-[#0C0C0C] border border-white/5 p-8 space-y-6">
        <h3 className="font-serif text-xl font-light text-white border-b border-white/5 pb-4 flex items-center">
          <Globe className="w-5 h-5 text-[#C5A85C] mr-2 stroke-[1.5]" /> 3. Homepage Content
        </h3>

        <div className="space-y-4 text-xs">
          <div className="space-y-2">
            <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">HERO SUBHEADING / OVERLINE</label>
            <input
              type="text"
              value={settings.homepage.hero_title}
              onChange={(e) => setSettings({
                ...settings,
                homepage: { ...settings.homepage, hero_title: e.target.value }
              })}
              className="w-full p-3 bg-[#050505] border border-white/10 text-warm-ivory font-serif"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">HERO TAGLINE DESCRIPTION</label>
            <input
              type="text"
              value={settings.homepage.hero_description}
              onChange={(e) => setSettings({
                ...settings,
                homepage: { ...settings.homepage, hero_description: e.target.value }
              })}
              className="w-full p-3 bg-[#050505] border border-white/10 text-warm-ivory"
            />
          </div>
        </div>
      </div>

      {/* 4. SEO DEFAULTS */}
      <div className="bg-[#0C0C0C] border border-white/5 p-8 space-y-6">
        <h3 className="font-serif text-xl font-light text-white border-b border-white/5 pb-4 flex items-center">
          <Search className="w-5 h-5 text-[#C5A85C] mr-2 stroke-[1.5]" /> 4. Default SEO Meta
        </h3>

        <div className="space-y-4 text-xs">
          <div className="space-y-2">
            <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">DEFAULT META TITLE</label>
            <input
              type="text"
              value={settings.seo.default_title}
              onChange={(e) => setSettings({
                ...settings,
                seo: { ...settings.seo, default_title: e.target.value }
              })}
              className="w-full p-3 bg-[#050505] border border-white/10 text-warm-ivory"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">DEFAULT META DESCRIPTION</label>
            <textarea
              rows={3}
              value={settings.seo.default_description}
              onChange={(e) => setSettings({
                ...settings,
                seo: { ...settings.seo, default_description: e.target.value }
              })}
              className="w-full p-3 bg-[#050505] border border-white/10 text-warm-ivory"
            />
          </div>
        </div>
      </div>

      {/* Save Trigger */}
      <div className="pt-4 border-b border-white/5 pb-12">
        <button
          type="submit"
          disabled={saving}
          className="px-8 py-4 bg-[#C5A85C] text-[#050505] hover:bg-[#D4AF37] transition-all font-semibold text-xs tracking-widest uppercase flex items-center justify-center cursor-pointer shadow-lg disabled:opacity-50"
        >
          <Save className="w-4 h-4 mr-2" /> {saving ? 'SAVING SETTINGS...' : 'SAVE WEBSITE SETTINGS'}
        </button>
      </div>

      {/* 5. SECURITY & PASSWORDS (OWNER HANDOVER CONTROL) */}
      <div className="bg-[#0C0C0C] border border-[#C5A85C]/20 p-8 space-y-6">
        <h3 className="font-serif text-xl font-light text-white border-b border-white/5 pb-4 flex items-center">
          <ShieldCheck className="w-5 h-5 text-[#C5A85C] mr-2 stroke-[1.5]" /> 5. Change Security Passwords (Owner Handover)
        </h3>

        {passStatus && (
          <div className={`p-4 text-xs leading-relaxed border ${
            passStatus.success 
              ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300' 
              : 'bg-red-950/40 border-red-500/30 text-red-300'
          }`}>
            {passStatus.message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="space-y-2">
            <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
              NEW OWNER PASSWORD (Vikram Shekhawat)
            </label>
            <input
              type="password"
              placeholder="Enter new owner password..."
              value={ownerPass}
              onChange={(e) => setOwnerPass(e.target.value)}
              className="w-full p-3 bg-[#050505] border border-white/10 text-warm-ivory"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
              NEW MANAGER PASSWORD (Showroom Manager)
            </label>
            <input
              type="password"
              placeholder="Enter new manager password..."
              value={managerPass}
              onChange={(e) => setManagerPass(e.target.value)}
              className="w-full p-3 bg-[#050505] border border-white/10 text-warm-ivory"
            />
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={handlePasswordUpdate}
            disabled={savingPass || (!ownerPass && !managerPass)}
            className="px-6 py-3.5 bg-transparent border border-[#C5A85C] text-[#C5A85C] hover:bg-[#C5A85C] hover:text-[#050505] transition-all font-semibold text-xs tracking-widest uppercase flex items-center justify-center cursor-pointer disabled:opacity-50"
          >
            <KeyRound className="w-4 h-4 mr-2" /> {savingPass ? 'UPDATING PASSWORDS...' : 'UPDATE SECURITY PASSWORDS'}
          </button>
        </div>
      </div>

    </form>
  );
}
