'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Package, FolderTree, Layers, Tag, 
  Image as ImageIcon, Users, HelpCircle, MessageSquareText, 
  Settings, LogOut, Menu, X 
} from 'lucide-react';
import { AdminUser } from '../lib/auth';
import { logoutAdminAction } from '../app/actions';

interface AdminSidebarNavProps {
  session: AdminUser;
  isSupabase: boolean;
}

export default function AdminSidebarNav({ session, isSupabase }: AdminSidebarNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Categories', path: '/admin/categories', icon: FolderTree },
    { name: 'Collections', path: '/admin/collections', icon: Layers },
    { name: 'Brands', path: '/admin/brands', icon: Tag },
    { name: 'Gallery', path: '/admin/gallery', icon: ImageIcon },
    { name: 'Team Members', path: '/admin/team', icon: Users },
    { name: 'FAQs', path: '/admin/faqs', icon: HelpCircle },
    { name: 'Enquiries', path: '/admin/enquiries', icon: MessageSquareText },
  ];

  // OWNER gets access to Settings
  if (session.role === 'OWNER') {
    navItems.push({ name: 'Website Settings', path: '/admin/settings', icon: Settings });
  }

  const handleLogout = async () => {
    await logoutAdminAction();
    router.push('/admin/login');
    router.refresh();
  };

  const isActive = (path: string) => {
    if (path === '/admin') return pathname === '/admin';
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-[#0C0C0C] border-r border-white/5 flex-col justify-between shrink-0 h-screen sticky top-0 font-sans">
        <div>
          {/* Header Branding */}
          <div className="p-6 border-b border-white/5 space-y-3">
            <Link href="/admin" className="relative h-10 w-40 block">
              <Image
                src="/logo.png"
                alt="THE LUXURY HUB"
                fill
                className="object-contain filter brightness-110"
              />
            </Link>
            <div className="text-[9px] tracking-widest text-[#C5A85C] uppercase font-mono font-semibold">
              ADMIN CONTROL PANEL
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`flex items-center px-4 py-3 text-xs tracking-wider font-medium transition-colors ${
                    active 
                      ? 'bg-[#C5A85C]/10 text-[#C5A85C] border-r-2 border-[#C5A85C]' 
                      : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-3 stroke-[1.5]" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Logout Button */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-xs tracking-wider text-red-400 hover:bg-red-950/30 transition-colors font-medium cursor-pointer"
          >
            <LogOut className="w-4 h-4 mr-3 stroke-[1.5]" />
            LOGOUT
          </button>
        </div>
      </aside>

      {/* Mobile Header Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0C0C0C] border-b border-white/5 z-40 px-6 flex items-center justify-between">
        <Link href="/admin" className="relative h-8 w-32">
          <Image src="/logo.png" alt="Logo" fill className="object-contain" />
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-neutral-300 hover:text-white p-2"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-[#050505] z-50 p-6 space-y-6 overflow-y-auto">
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center px-4 py-3 text-sm text-neutral-300 hover:text-[#C5A85C] border-b border-white/5"
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-sm text-red-400 font-semibold"
          >
            <LogOut className="w-5 h-5 mr-3" /> LOGOUT
          </button>
        </div>
      )}
    </>
  );
}
