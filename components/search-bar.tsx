'use client'

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface Product {
    id: String;
    name: String;
    category: String;
    slug?: String;
}

interface SearchBarProps {
    products: Product[];
}

export default function SearchBar({products}: SearchBarProps){
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Product[]>([]);
    const [open, setOpen] = useState(false);
    const wrapRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
 
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
    setOpen(true);
  }, [query, products]);
 
  // Tutup dropdown kalau klik di luar
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
 
  function handleSelect(product: Product) {
    setQuery("");
    setOpen(false);
    router.push(`/product/${product.slug ?? product.id}`);
  }
 
  return (
    <div ref={wrapRef} className="relative w-full max-w-sm">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari produk..."
          className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-gray-400 transition-colors"
        />
        {query && (
          <button
            onClick={() => { setQuery(""); setOpen(false); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Hapus pencarian"
          >
            ✕
          </button>
        )}
      </div>
 
      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-100 rounded-xl shadow-md overflow-hidden">
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-gray-400 text-center">
              Produk tidak ditemukan
            </p>
          ) : (
            <ul>
              {results.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => handleSelect(p)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-content-center flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{p.name}</p>
                      <p className="text-xs text-gray-400">{p.category}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}