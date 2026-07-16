'use client'

import useCart from "@/hooks/use-cart";
import { Loader2, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

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
        const message = items.map((item) => `- ${item.name} (${item.price})`).join("\n");
        const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_TELP}?text=Halo Admin, saya mau order:\n${encodeURIComponent(message)}\n\nTotal: ${totalPrice.toLocaleString}`;
      
          window.open(whatsappUrl, "_blank");
          removeAll();
          setIsLoading(false);
          }, 1500) ;
    };

  return (
    <div className="mt-16 rounded-2xl bg-gray-50 dark:bg-neutral-900 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 border border-neutral-100 dark:border-neutral-800 transition-colors duration-300">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white">
        Ringkasan Belanja
        </h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 dark:border-neutral-800 pt-4">
          <div className="text-base font-medium text-gray-900 dark:text-gray-300">
            Total Harga
            </div>
          <div className="font-semibold text-black dark:text-white">Rp 
            {totalPrice.toLocaleString('id-ID')}
            </div>
        </div>
      </div>

      <button 
        disabled={items.length === 0 || isLoading}
        onClick={onCheckout}
        className="w-full mt-6 rounded-full bg-black dark:bg-white border-transparent px-5 py-3 text-white dark:text-black font-semibold hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50 transition flex items-center justify-center gap-x-2 cursor-pointer"
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

