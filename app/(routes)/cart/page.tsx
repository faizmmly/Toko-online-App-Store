"use client";

import { useEffect, useState } from "react";
import Container from "@/components/ui/container";
import useCart from "@/hooks/use-cart";
import CartItem from "@/components/cart-item";
import Summary from "@/components/summary";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="bg-white dark:bg-neutral-950 min-h-[80vh]">
      <Container>
        <div className="px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Keranjang Belanja
          </h1>

        {cart.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-gray-200 dark:border-neutral-800 rounded-2xl my-8 p-8 text-center bg-gray-50/50 dark:bg-neutral-900/50">
            <div className="p-4 rounded-full bg-gray-100 dark:bg-neutral-800 mb-4">
                <ShoppingBag className="w-12 h-12 text-gray-400 dark:text-gray-500"/>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Keranjang Belanja Anda Masih Kosong
                </h2>
                <p className="text-sm text-gray-500 dark:text-neutral-400 max-w-md mb-6">
                Sepertinya kamu belum menambahkan produk apa pun. Yuk, jelajahi koleksi knitwear dan jersey terbaik kami!
                </p>
                <Link href="/">
                  <Button className="flex items-center gap-2 px-6 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-medium hover:opacity-90 transition">
                    Mulai Belanja <ArrowRight size={16} />
                  </Button>
                </Link>
            </div>
          ) : (
            <div className="mt-8 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
              <div className="lg:col-span-7">
                <ul className="divide-y divide-gray-200 dark:divide-neutral-800">
                  {cart.items.map((item) => (
                    <CartItem key={item.id} data={item} />
                  ))}
                </ul>
            </div>
            <Summary />
        </div>
        )}
        </div>
      </Container>
    </div>
  );
};

export default CartPage;