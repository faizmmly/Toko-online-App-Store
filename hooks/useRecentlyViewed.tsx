"use client"

import { useEffect, useState } from "react";

const STORAGE_KEY = "faiz_recently_viewed";
const MAX_ITEMS = 6;


export interface RecentProduct {
    id: string;
    name: string;
    category: string;
    imageUrl?: string;
    slug?: string;
    price: string;
}

export function useRecentlyViewed(){
    const [recentlyViewed, setRecentlyViewed] = useState<RecentProduct[]>([]);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) setRecentlyViewed(JSON.parse(saved));
        } catch {}
    }, []);

    function addToRecent(product: RecentProduct){
        setRecentlyViewed((prev) => {
            const filtered = prev.filter((p) => p.id !== product.id);
            const updated = [product, ...filtered].slice(0, MAX_ITEMS);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });
    }

    function clearRecent(){
        setRecentlyViewed([]);
        localStorage.removeItem(STORAGE_KEY);
    }

    return { recentlyViewed, addToRecent, clearRecent };
}
