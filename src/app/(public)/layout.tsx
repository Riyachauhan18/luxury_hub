import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FloatingWhatsApp from '../../components/FloatingWhatsApp';
import { getSettings } from '../../lib/db';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-[#FDFBF7]">
      <Header />
      <main className="flex-grow min-h-[calc(100vh-92px-350px)] pt-[92px]">
        {children}
      </main>
      <Footer settings={settings} />
      <FloatingWhatsApp settings={settings} />
    </div>
  );
}
