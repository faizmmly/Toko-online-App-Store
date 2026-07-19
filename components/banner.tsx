"use client"

import { Banner as BannerType } from "@/types";
import { ArrowRight, ChevronLeft, ChevronRight} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence} from "framer-motion";

interface BannerProps {
  data: BannerType[] | BannerType;
}

const Banner: React.FC<BannerProps> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ isHovered, setIsHovered ] = useState(false);

  const bannerArray = Array.isArray(data) ? data : data ? [data] : [];

  useEffect(() => {
    if(isHovered || bannerArray.length <= 1 ) return;

    const interval = setInterval (() => {
      setCurrentIndex((prev) => (prev === bannerArray.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isHovered, bannerArray.length]);
  
  if (bannerArray.length === 0) return null;

  const currentBanner = bannerArray[currentIndex];
  const isCarousel = bannerArray.length > 1;

  return (
    <div 
        className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
      
      <div className="rounded-xl border bg-slate-100/50 dark:bg-neutral-900/50 flex flex-col md:flex-row items-center p-8 md:p-12 gap-x-12 relative min-h-[400px] md:min-h-[450px] overflow-hidden">
        
      <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full z-5"
          >
              <Link
                href="/category/75dc54a7-5beb-46d4-92f2-696c16ee0f49"
                className="w-full flex flex-col md:flex-row items-center gap-x-12 cursor-pointer group/content block"
              >
              {/* Bagian Kiri: Teks & Tombol */}
              <div className="flex-1 space-y-6 text-center md:text-left order-2 md:order-1 mt-6 md:mt-0">
                <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-black dark:text-white leading-tight tracking-tighter group-hover/content:text-neutral-700 dark:group-hover/content:text-neutral-300 transition-colors">
                  {currentBanner?.label}
                </h1>
              
              <p className="text-gray-700 dark:text-neutral-300 text-base md:text-lg max-w-md mx-auto md:mx-0">
                Dapatkan koleksi jersey boxy unisex terbaik hanya di Toko Faiz Market.
              </p>
              
              <div className="group inline-flex items-center gap-x-2 bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-full font-medium group-hover/content:bg-black/80 dark:group-hover/content:bg-white/80 transition-colors">
                Lihat Koleksi
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform"/>
              </div>
            </div>

            {/* Bagian Kanan: Gambar Lingkaran */}
            <div className="flex-1 order-1 md:order-2">
              <div className="aspect-square rounded-full border-4 border-white shadow-lg overflow-hidden relative max-w-[300px] md:max-w-[380px] mx-auto transition-transform duration-300 group-hover/content:scale-[1.02]">
                <img 
                  src={currentBanner?.imageUrl}
                  alt="Banner Image"
                  className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* TOMBOL NAVIGASI KIRI & KANAN (Muncul tipis saat hover area banner) */}
        {isCarousel && (
          <>
            <button
              onClick={() => setCurrentIndex((prev) => (prev === 0 ? bannerArray.length - 1 : prev - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-neutral-800/90 p-2 rounded-full shadow-md text-neutral-800 dark:text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer z-10 hover:bg-white"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setCurrentIndex((prev) => (prev === bannerArray.length - 1 ? 0 : prev + 1))}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-neutral-800/90 p-2 rounded-full shadow-md text-neutral-800 dark:text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer z-10 hover:bg-white"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* DOTS INDIKATOR DI BAGIAN BAWAH */}
        {isCarousel && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-x-2 z-10">
            {bannerArray.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === index 
                    ? "w-6 bg-black dark:bg-white" 
                    : "w-2 bg-black/20 dark:bg-white/20"
                }`}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
export default Banner;