import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Suspense } from "react";
import ModalProvider from "@/providers/modal-provider";
import ToastProvider from "@/providers/toast-provider";
import SearchBar from "@/components/search-bar";
import getProducts from "@/actions/get-products"; 
import { ThemeProvider } from "@/components/theme-provider";

const font = Urbanist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Toko Online",
  description: "Toko online dengan Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const products = await getProducts();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.className} bg-white dark:bg-neutral-900 text-black dark:text-neutral-100 transition-colors duration-300`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
        <ToastProvider />
        <ModalProvider />

        <Suspense fallback={<div className="h-20 w-full bg-white dark:bg-neutral-900 border-b dark:border-neutral-800" />}>
          <Navbar products={products} />
        </Suspense>
        <main className="min-h-screen">
          {children}
        </main>
        
        <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}