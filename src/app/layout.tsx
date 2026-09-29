import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { EnquiryCartProvider } from "../context/EnquiryCartContext";
import { LanguageProvider } from "../context/LanguageContext";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "THE LUXURY HUB | Premium Sanitaryware & Interior Fittings Showroom",
  description: "Explore the high-end digital catalogue of THE LUXURY HUB, presenting luxury bathroom fittings, faucets, showers, mirrors, lights, and bespoke door hardware.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050505] text-[#FDFBF7] font-sans selection:bg-[#C5A85C] selection:text-[#050505]">
        <LanguageProvider>
          <EnquiryCartProvider>
            {children}
          </EnquiryCartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}


