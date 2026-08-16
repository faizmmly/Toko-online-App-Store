'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import qs from "query-string";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  products?: {
    id: string;
    name: string;
    category: string;
    slug: string;
  }[];
}

export const NavbarSearch= ({ products }: SearchBarProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentSearch = searchParams.get("name") || "";
    const [searchTerm, setSearchTerm] = useState(currentSearch);

    useEffect(() => {
        setSearchTerm(currentSearch);
    }, [currentSearch]);

    useEffect(() => {
        const timer = setTimeout(() => {
            const currentQuery = qs.parse(searchParams.toString()); 

            const updatedQuery = {
                ...currentQuery,
                name: searchTerm || null,
            };

            const url = qs.stringifyUrl(
                {
                    url: window.location.pathname,
                    query: updatedQuery,
                },
                { skipNull: true}
            );

            if(searchTerm !== (currentSearch || "")) {
                router.push(url);
            }
        }, 400);

        return () => clearTimeout(timer);
    }, [searchTerm, router, searchParams, currentSearch]);

    return (
        <div className="relative flex-1 max-w-md mx-4 hidden md:flex items-center">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"/>
            <input 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari Produk..."
                className="w-full pl-9 pr-8 py-2 text-sm bg-gray-100 dark:bg-neutral-800 border border-transparent rounded-full focus:outline-none focus:border-gray-300 dark:focus:border-neutral-700 text-gray-900 dark:text-white transition"
            />
            {searchTerm && (
                <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-700 text-gray-400"
                >
                    <X className="h-3.5 w-3.5 "/>
                </button>
            )}
        </div>
    );
};

export default NavbarSearch;