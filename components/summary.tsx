'use client'

import useCart from "@/hooks/use-cart";
import { Loader2, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { formatter } from "@/lib/utils";

const Summary = () => {
    const items = useCart((state) => state.items);
    const removeAll = useCart((state) => state.removeAll);
    const [isLoading, setIsLoading] = useState(false);

    const totalPrice = items.reduce((total, item) => {
        return total + Number(item.price);
    },  0);

    const onCheckout = () => {
      if (items.length === 0) return;
      
      setIsLoading(true);
      toast.success("Mengarahkan ke WhatsApp...");

      setTimeout(() => {
      // Menyusun list barang beserta detail varian
      const itemDetails = items
        .map((item) => {
          const variants = [item.color?.name, item.size?.name]
            .filter(Boolean)
            .join(", ");
          const variantText = variants ? ` (${variants})` : "";
          return `• *${item.name}*${variantText} - ${formatter.format(Number(item.price))}`;
        })
        .join("\n");

      // Format template pesan pesan WhatsApp
      const rawMessage = `Halo Admin *Toko Faiz Market*,\nSaya mau order barang berikut:\n\n${itemDetails}\n\n*Total Pembayaran:* ${formatter.format(totalPrice)}\n\nMohon diproses ya, terima kasih!`;

      const whatsappNumber = process.env.NEXT_PUBLIC_TELP || "";
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(rawMessage)}`;

      window.open(whatsappUrl, "_blank");
      removeAll();
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="mt-16 rounded-2xl bg-gray-50 dark:bg-neutral-900 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 border border-neutral-100 dark:border-neutral-800 transition-colors duration-300 lg:sticky lg:top-24">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
        Ringkasan Belanja
        </h2>

        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between text-sm text-gray-600 dark:border-neutral-400">
            <span>Subtotal Product</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {formatter.format(totalPrice)}
            </span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 dark:border-neutral-400"> 
            <span>Estimasi Pengiriman</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium text-xs bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded">
              Gratis Ongkir
            </span>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 dark:border-neutral-800 pt-4 mt-4">
          <div className="text-base font-semibold text-gray-900 dark:text-white">
            Total Harga
          </div>
          <div className="text-lg font-bold text-black dark:text-white">
            {formatter.format(totalPrice)}
          </div>
        </div>
      </div>
      

      <button 
        disabled={items.length === 0 || isLoading}
        onClick={onCheckout}
        className="w-full mt-6 rounded-full bg-black dark:bg-white border-transparent px-5 py-3.5 text-white dark:text-black font-semibold hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 transition flex items-center justify-center gap-x-2 cursor-pointer shadow-sm"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Membuka WhatsApp...</span>
          </>
        ) : (
          <>
            <MessageSquare size={19} />
            <span>Checkout via WhatsApp</span>
          </>
        )}
      </button>
    </div>
  );
};

export default Summary;

