'use client'

import { Product } from "@/types";
import { useState } from "react";
import NoResult from "./ui/no-result";
import ProductCard from "./ui/product-card";
import { div } from "framer-motion/client";
import { Loader2 } from "lucide-react";
import getProducts from "@/actions/get-products";

interface ProductListClientProps {
    initialProducts: Product[];
    title: string;
    searchParamsProps?: {
        categoryId?: string;
        colorId?: string;
        sizeId?: string;
        name?: string;
        isFeatured?: boolean;
    };
}

const LIMIT = 8;

const ProductListClient = ({
    initialProducts,
    title,
    searchParamsProps = {},
}: ProductListClientProps) => {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(initialProducts.length >= LIMIT);

    const loadMore = async () => {
        setLoading(true);
        const nextPage = page + 1;

        try {
            const newProducts = await getProducts({
                categoryId: searchParamsProps.categoryId || undefined,
                colorId: searchParamsProps.colorId || undefined,
                sizeId: searchParamsProps.sizeId || undefined,
                name: searchParamsProps.name || undefined,
                isFeatured: searchParamsProps.isFeatured,
                page: nextPage,
                limit: LIMIT,
            });

            if (!newProducts|| newProducts.length < LIMIT) {
                setHasMore(false);
            }

            if(newProducts && newProducts.length > 0){
                setProducts((prev) => [...prev, ...newProducts]);
                setPage(nextPage);
            }
        } catch (error) {
            console.error("Error loading more products:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <h3 className="font-bold text-3xl">{title}</h3>
            {products.length === 0 && <NoResult />}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((item) => (
                    <ProductCard key={item.id} data={item}/>
                ))}
            </div>

            {hasMore && (
                <div className="flex justify-center pt-8">
                    <button
                    onClick={loadMore}
                    disabled={loading}
                    className="flex items-center gap-x-2 px-6 py-2.5 rounded-full bg-neutral-900 dark:bg-white dark:text-neutral-900 font-medium text-sm hover:opacity-90 transition disabled:opacity-50"
                    >
                        {loading && <Loader2 className="h-4 w-4 animate-spin"/>}
                        {loading ? "Memuat..." : "Tampilkan Lebih Banyak"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductListClient;