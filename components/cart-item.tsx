'use client';

import Image from "next/image";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";
import { X } from "lucide-react";
import { span } from "framer-motion/client";
import { formatter } from "@/lib/utils";

interface CartItemProps {
    data: Product;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
    const cart = useCart();

    return (
      <li className="flex py-6 border-b border-gray-200 dark:border-neutral-800">
        <div className="relative h-24 w-24 rounded-lg overflow-hidden sm:h-32 sm:w-32 bg-gray-100 dark:bg-neutral-800 flex shrink-0">
          <Image
            fill
            src={data.images[0].url}
            alt={data.name}
            className="object-cover object-center"
          />
        </div>

      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <button 
            onClick={() => cart.removeItem(data.id)}
            className="rounded-full flex items-center justify-center bg-white border dark:bg-neutral-900 shadow-sm p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 hover:scale-105 active:scale-95 transition"
            aria-label="Hapus Item"
          >
            <X size={15} className="text-gray-600 dark:text-gray-400"/>
          </button>
        </div>

        <div className="pr-10 sm:pr-0">
            <p className="text-base font-semibold text-gray-900 dark:text-white sm:text-lg">
              {data.name}
            </p>
          
          <div className="mt-2 flex items-center gap-x-2 text-xs">
            {data.color?.name && (
                <span className="px-2.5 py-1 rounded-md bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 font-medium">
                  {data.color.name}
              </span>
              )}
              {data.size?.name && (
                <span className="px-2.5 py-1 rounded-md bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 font-medium">
                  {data.size.name}
                </span>
              )}
          </div>

          <p className="mt-3 text-sm font-bold text-gray-900 dark:text-white sm:text-base">
            {formatter.format(Number(data.price))}
            </p>
        </div>
      </div>
    </li>
    );
};

export default CartItem;