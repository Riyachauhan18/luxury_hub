import React from 'react';
import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import { getSettings } from '@/lib/db';
import AdminSettingsClient from '@/components/AdminSettingsClient';

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  const session = await getAdminSession();

  // Role check: Only OWNER can modify website settings
  if (!session || session.role !== 'OWNER') {
    redirect('/admin');
  }

  const settings = await getSettings();

  return (
    <div className="space-y-8 font-sans">
      <div className="border-b border-white/5 pb-6">
        <h1 className="font-serif text-3xl font-light tracking-wide text-white">
          Website Settings & Configuration
        </h1>
        <p className="text-xs text-neutral-400 font-light mt-1">
          Update central business details, WhatsApp phone number, opening hours, hero copy, and default SEO parameters.
        </p>
      </div>

      <AdminSettingsClient initialSettings={settings} />
    </div>
  );
}
