'use client'

import useCart from "@/hooks/use-cart";
import { motion  } from "framer-motion";
import { Product } from "@/types";
import Image from "next/image";
import IconButton from "./icon-button";
import { Expand, Heart, ShoppingCart } from "lucide-react";
import Currency from "./currency";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import usePreviewModal from "@/hooks/use-preview-modal";
import { useWishlist } from "@/hooks/useWishlist";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";

interface ProductCardProps {
    data: Product;
}


const ProductCard: React.FC<ProductCardProps> = ({data}) => {

    const previewModal = usePreviewModal();
    const router = useRouter();
    const cart = useCart();
    const { toggle, isWishlisted } = useWishlist();
    const { addToRecent } = useRecentlyViewed();

    const wishlisted = isWishlisted(data.id);

    const handleClick = () => {
        addToRecent({
            id: data.id,
            name: data.name,
            category: data.category?.name,
            imageUrl: data.images?.[0]?.url,
            slug: data.id,
            price: data.price,
        });
        router.push(`/product/${data.id}`);
    }

    const onPreview: MouseEventHandler<HTMLButtonElement>= (event) => {
        event.stopPropagation();
        previewModal.onOpen(data);
    }

    const onAddToCart:MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        cart.addItem(data);
    };

    const onWishList:MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        toggle(data.id);
    };

    return (
        <motion.div
        whileTap = {{scale: 0.98}}
        className="group bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-150 dark:border-neutral-800 p-3 flex flex-col justify-between h-full cursor-pointer hover:shadow-md dark:hover:shadow-neutral-950/40 transition-all duration-300"
        whileHover={{ y: -4}}
        transition={{ type: "spring", stiffness: 400, damping: 20}}
        onClick={handleClick}
        >
        
            <div className="aspect-square rounded-xl bg-gray-100 dark:bg-neutral-800 relative overflow-hidden shrink-0">
                <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md px-2.5 py-0 rounded-full text-[9px] font-bold uppercase tracking-wider text-black dark:text-white shadow-xs">
                        New Arrival
                    </span>
                </div>  

                <button
                    onClick={onWishList}
                    className={`absolute top-3 right-2.5 z-10 w-7 h-7 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                        wishlisted
                        ? "bg-red-50 border-red-200 text-red-500 dark:bg-red-950/50 dark:border-red-900" 
                        : "bg-white/90 border-white/50 text-gray-400 dark:bg-neutral-900/90 dark:border-neutral-800 hover:text-red-400"
                    }`}
                    aria-label={wishlisted ? "Hapus dari wishlist" : "Tambah ke wishlist"}
                    >
                        <Heart size={14} fill={wishlisted? "currentColor" : "none"}/>
                </button>

                <Image 
                    alt="Image" 
                    src={data?.images?.[0]?.url}
                    fill
                    sizes="(max-width: 640px) 50vw. (max-width: 1024px) 33vw, 25vw"
                    className="aspect-square object-cover rounded-xl transition-transform duration-500 group-hover:scale-103"
                />

                <div className="hidden md:flex opacity-0 group-hover:opacity-100 transition duration-300 absolute inset-0 items-end justify-center pb-4 bg-gradient-to-t from-black/20 via-transparent to-transparent">
                    <div className="flex gap-x-3 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md p-1.5 rounded-full shadow-lg border border-white/20">
                        <IconButton 
                            onClick={onPreview}
                            icon={<Expand size={18} className="text-neutral-700 dark:text-neutral-300" />}
                        />

                        <IconButton
                            onClick={onAddToCart}
                            icon={<ShoppingCart size={18} className="text-neutral-700 dark:text-neutral-300" />}
                        />
                    </div>
                </div>
            </div>
            {/* description product */}
            <div className="space-y-1 pt-3 flex-1 flex-col justify-between">
                <p className="font-semibold text-sm md:text-base line-clamp-2 text-neutral-800 dark:text-neutral-200 loading-snug">
                    {data.name}</p>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-neutral-400 mt-0.5">
                    {data.category?.name}</p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800/60 mt-3 shrink-0">
                <Currency value={data?.price} />

                <button
                    onClick={onAddToCart}
                    className="md:hidden p-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 active:scale-95 transition cursor-pointer"
                >
                    <ShoppingCart size={14}/>
                </button>
            </div>
        </motion.div>
    );
}

export default ProductCard;