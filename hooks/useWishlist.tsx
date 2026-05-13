"use client"

import { useEffect, useState } from "react";

const STORAGE_KEY = "faiz_wishlist";


export function useWishlist(){
    const [wishlist, setWishlist] = useState<String[]>([]);

    useEffect(() => {
        try{
            const saved = localStorage.getItem(STORAGE_KEY);
            if(saved) setWishlist(JSON.parse(saved));
        } catch {}
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
    }, [wishlist]);

    function toggle(productId: String){
        setWishlist((prev) => 
            prev.includes(productId)
            ? prev.filter((id) => id !== productId)
            : [...prev, productId]
        );
    }

    function isWishlisted(productId: String){
        return wishlist.includes(productId);
    }

    return { wishlist, toggle, isWishlisted};
}