import React from 'react';
import { getAdminSession } from '@/lib/auth';
import { isSupabaseConfigured } from '@/lib/supabase';
import AdminSidebarNav from '@/components/AdminSidebarNav';

export const dynamic = 'force-dynamic';

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  // If unauthenticated (or on login page), render children directly without sidebar
  if (!session) {
    return <>{children}</>;
  }

  // If authenticated, render full Administrative Panel with Sidebar and Header
  return (
    <div className="min-h-screen bg-[#050505] text-[#FDFBF7] flex font-sans">
      {/* Sidebar Navigation */}
      <AdminSidebarNav session={session} isSupabase={isSupabaseConfigured} />

      {/* Main Administrative Dashboard Workspace */}
      <div className="flex-grow flex flex-col min-w-0">
        
        {/* Top Dashboard Header */}
        <header className="h-16 border-b border-white/5 bg-[#0C0C0C] px-6 sm:px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3 text-xs">
            <span className="text-neutral-500 font-light">Role:</span>
            <span className={`px-2.5 py-0.5 text-[9px] tracking-wider uppercase font-bold rounded-none ${
              session.role === 'OWNER' ? 'bg-[#C5A85C] text-[#050505]' : 'bg-neutral-800 text-neutral-300'
            }`}>
              {session.role}
            </span>
            <span className="text-neutral-600">|</span>
            <span className="text-neutral-400 font-medium">{session.name}</span>
          </div>

          {/* Connection Status Badge */}
          <div className="flex items-center space-x-2 text-[10px] tracking-wider uppercase">
            <span className={`w-2 h-2 rounded-full ${isSupabaseConfigured ? 'bg-[#25D366]' : 'bg-amber-500'}`} />
            <span className="text-neutral-400 font-mono hidden sm:inline">
              {isSupabaseConfigured ? 'SUPABASE CLOUD ACTIVE' : 'DEV MODE (LOCAL MOCK DB)'}
            </span>
          </div>
        </header>

        {/* Dynamic Admin Page View */}
        <main className="flex-grow p-6 sm:p-8 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
}
