'use client'

import { Megaphone, X } from "lucide-react";
import { useState } from "react";

const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative w-full bg-black dark:bg-zinc-900 text-white py-2 px-4 flex items-center overflow-hidden border-b border-neutral-800">
      <div className="max-w-7xl mx-auto flex items-center justify-center w-full">
        
        {/* Ikon Pengumuman */}
        <div className="hidden sm:flex items-center gap-x-2 bg-zinc-800 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider mr-3 shrink-0">
          <Megaphone size={12} className="text-yellow-400 animate-bounce" />
          Promo
        </div>

        {/* Teks Berjalan (Marquee) */}
        <div className="relative flex overflow-x-hidden w-full max-w-xl">
          <div className="animate-marquee whitespace-nowrap text-xs md:text-sm font-medium tracking-wide py-0.5">
            🎉 DISKON AKHIR SEMESTER! Dapatkan potongan hingga 20% untuk semua koleksi Jersey & Knitwear • Gratis Ongkir se-Bandung Raya dengan minimal belanja Rp150.000! • 🎉 DISKON AKHIR SEMESTER! Dapatkan potongan hingga 20% untuk semua koleksi Jersey & Knitwear • Gratis Ongkir se-Bandung Raya dengan minimal belanja Rp150.000! •
          </div>
        </div>
      </div>

      {/* Tombol Close (X) jika pembeli ingin menutup pengumuman */}
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-3 p-1 hover:bg-zinc-800 rounded-full transition"
        aria-label="Tutup pengumuman"
      >
        <X size={14} className="text-neutral-400 hover:text-white" />
      </button>
    </div>
  );
};

export default AnnouncementBar;