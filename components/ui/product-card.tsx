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
        whileTap = {{scale: 0.95}}
        className="group bg-white rounded-xl border p-3 flex flex-col justify-between h-full cursor-pointer"
        whileHover={{ y: -5}}
        transition={{ type: "spring", stiffness: 400, damping: 17}}
        onClick={handleClick}
        >
        
            <div className="aspect-square rounded-xl bg-gray-100 relative overflow-hidden">
                <div className="absolute top-3 left-3 z-10">
                    <span className="bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-black shadow-sm">
                        New Arrival
                    </span>
                </div>  

                <button
                onClick={onWishList}
                className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center border transition-all ${wishlisted? "bg-red-50 border-red-200 text-red-500" : "bg-white/80 border-white/50 text-gray-400 hover:text-red-400 hover:border-red-200"}`}
                aria-label={wishlisted ? "Hapus dari wishlist" : "Tambah ke wishlist"}
                >
                    <Heart size={14} fill={wishlisted? "currentColor" : "none"}/>
                </button>

                <Image alt="Image" 
                src={data?.images?.[0]?.url}
                fill
                className="aspect-square object-cover rounded-md"
                />

                <div className="opacity-100 md:opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
                    <div className="flex gap-x-6 justify-center">
                        <IconButton 
                        onClick={onPreview}
                        icon={<Expand size={20} className="text-gray-600" />}
                        />

                        <IconButton
                        onClick={onAddToCart}
                        icon={<ShoppingCart size={20} className="text-gray-600" />}
                        />
                    </div>
                </div>
            </div>
            {/* description product */}
            <div className="space-y-1">
                <p className="font-semibold text-sm md:text-base line-clamp-1 break-words text-neutral-800 min-h-[40px] md:min-h-[48px]">
                    {data.name}</p>
                <p className=" text-sm text-gray-500">{data.category?.name}</p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-neutral-50 mt-3">
                <Currency value={data?.price} />
            </div>
        </motion.div>
    );
}

export default ProductCard;