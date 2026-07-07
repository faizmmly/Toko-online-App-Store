"use client"

import { Product } from "@/types";
import NoResult from "./ui/no-result";
import ProductCard from "./ui/product-card";
import { useState } from "react";


interface ProductListProps {
    title: string;
    items: Product[];
}


const ProductList: React.FC<ProductListProps> = ({
     title, items 
}) => {
    const [sortBy, setSortBy] = useState<string>("default")

    const getSortedItems = () => {
        const sorted = [...items]; // Salin array agar tidak merusak data asli

        if (sortBy === "price-low") {
            return sorted.sort((a, b) => Number(a.price) - Number(b.price)); // Termurah -> Termahal
        }
        if (sortBy === "price-high") {
            return sorted.sort((a, b) => Number(b.price) - Number(a.price)); // Termahal -> Termurah
        }
        if (sortBy === "newest") {
            // Mengurutkan berdasarkan tanggal (pastikan backend admin mengirim createdAt/updatedAt)
            return sorted.sort((a, b) => {
                const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                return dateB - dateA;
            });
        }
        
        return items; // Default (urutan asli dari database)
    };

    const sortedItems = getSortedItems();

    return (
        <div className="space-y-4 my-8 px-4 sm:px-6 lg:px-8">
            {/* 4. Bagian Header & Dropdown Filter Sampingan */}
            <div className="flex items-center justify-between w-full border-b border-neutral-100 dark:border-neutral-800 pb-3">
                <h3 className="font-bold text-2xl md:text-3xl text-neutral-800 dark:text-neutral-100 tracking-tight">
                    {title}
                </h3>
                
                <div className="flex items-center gap-x-2">
                    <label htmlFor="sort" className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                        Urutkan:
                    </label>
                    <select
                        id="sort"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-2.5 py-1 sm:px-4 sm:py-1.5 sm:text-sm font-medium text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition cursor-pointer"
                    >
                        <option value="default">Bawaan</option>
                        <option value="newest">Terbaru</option>
                        <option value="price-low">Harga: Murah ke Mahal</option>
                        <option value="price-high">Harga: Mahal ke Murah</option>
                    </select>
                </div>
            </div>

            {/* 5. Tampilan Grid menggunakan sortedItems hasil filter */}
            {sortedItems.length === 0 && <NoResult />}
            
            <div className="grid grid-cols-2 sd:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                {sortedItems.map((item) => (
                    <ProductCard 
                        key={item.id} 
                        data={item} 
                    />
                ))}
            </div>
        </div>
    )
}
export default ProductList;