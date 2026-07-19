"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Color, Size } from "@/types";
import { Button } from "@/components/ui/button";
import Filter from "@/components/ui/filter"; // Filter satuan yang sudah kamu punya

interface MobileFiltersProps {
  sizes: Size[];
  colors: Color[];
}

const MobileFilters: React.FC<MobileFiltersProps> = ({ sizes, colors }) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      {/* Tombol yang hanya muncul di layar mobile (lg:hidden) */}
      <Button 
        onClick={onOpen} 
        className="flex items-center gap-x-2 lg:hidden bg-blue-600 text-white rounded-full px-4 py-2 text-sm font-semibold shadow-sm hover:bg-blue-700 transition"
      >
        Filter
        <Plus size={16} />
      </Button>

      {/* Overlay & Dialog Box */}
      {open && (
        <div className="relative z-40 lg:hidden">
          {/* Background overlay gelap */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm transition-opacity" 
            onClick={onClose}
          />

          {/* Konten Drawer dari Kanan */}
          <div className="fixed inset-y-0 right-0 z-40 flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white dark:bg-neutral-950 p-6 shadow-xl transition-transform duration-300 ease-in-out">
            
            {/* Tombol Close */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
              <button 
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-neutral-400 dark:hover:text-white rounded-md border border-gray-200 dark:border-neutral-800"
              >
                <X size={15} />
              </button>
            </div>

            {/* Render Komponen Filter di Dalam Sini */}
            <div className="space-y-6 mt-4">
              <Filter valueKey="sizeId" name="Ukuran" data={sizes} />
              <Filter valueKey="colorId" name="Warna" data={colors} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileFilters;