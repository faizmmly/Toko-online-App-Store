"use client"

import { useRecentlyViewed } from "@/hooks/useRecentlyViewed"
import Link from "next/link";
import Image from "next/image";


export default function RecentlyViewed(){
    const { recentlyViewed, clearRecent} = useRecentlyViewed();

    if(recentlyViewed.length == 0) return null;


    return (
         <section className="py-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-widest">
                    Terakhir Dilihat
                </h2>
                <button
                onClick={clearRecent}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
                    Hapus Semua
                </button>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {recentlyViewed.map((product) => (
                    <Link
                    key={product.id}
                    href={`/product/${product.slug ?? product.id}`}
                    className="flex-shrink-0 w-[90px] group"
                    >
                        <div className="w-[90px] h-[90px] rounded-xl bg-gray-100 overflow-hidden border border-gray-100 group-hover:border-gray-300 transition-colors relative">
                            {product.imageUrl ? (
                                <Image 
                                src={product.imageUrl}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="90px"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                    </svg>
                                </div>
                            )}
                        </div>
                        <p className="mt-1.5 text-[11px] text-gray-500 leading-tight line-clamp-2 text-center">
                            {product.name}
                        </p>
                    </Link>
                ))}
            </div>
         </section>
    );
} 