'use client'

import { Product } from "@/types";
import Currency from "./ui/currency";
import { Button } from "./ui/button";
import { MessageCircleIcon, Share2 } from "lucide-react"; // Tambah ikon share biar keren
import Link from "next/link";
import { useEffect, useState } from "react";

interface InfoProps {
    data: Product
}

const Info: React.FC<InfoProps> = ({ data }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const URL = typeof window !== "undefined" ? `${window.location.origin}/product/${data?.id}` : "";
    const telp = process.env.NEXT_PUBLIC_TELP;
    const pesan = encodeURIComponent(`Halo, saya tertarik membeli ${data?.name} dengan harga ${data?.price}. Link produk: ${URL}`);

    const link = `https://wa.me/${telp}?text=${pesan}`;

    return (
        /* Container utama dengan efek timbul */
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50 transition-all hover:shadow-2xl">
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{data.name}</h1>
                <div className="mt-3 flex items-center justify-between">
                    <div className="flex flex-col">
                        <div className="text-2xl font-stretch-50% text-gray-700">
                            <Currency value={data?.price} />
                        </div>
                    </div>
                </div>
            </div>

            <hr className="my-6 border-gray-100" />

            <div className="flex flex-col gap-y-4 mb-6">
                <div className="flex items-center gap-x-4">
                    <span className="w-16 text-sm font-semibold text-gray-500">Ukuran:</span>
                    <span className="rounded-md border border-gray-300 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-800">
                        {data?.size?.name ? `${data.size.name} (${data.size.value})` : "-"}
                    </span>
                </div>
            </div>

            {/* Row Warna */}
            <div className="flex items-center gap-x-4">
            <span className="w-16 text-sm font-semibold text-gray-500">Warna:</span>
            <div className="flex items-center gap-x-2">
                <span className="text-xs font-medium text-gray-800">
                    {data?.color?.name || "-"}
                </span>
                {data?.color?.value && (
                    <div
                        className="h-5 w-5 rounded-full border border-gray-300 shadow-sm"
                        style={{ backgroundColor: data.color.value }}
                    />
                )}
            </div>
            </div>

            <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed italic">
                    "Dapatkan penawaran harga terbaik dan promo menarik untuk unit <span className="font-semibold text-gray-800">{data.name}</span> hanya di Faiz Market."
                </p>
                
                {/* Fitur Tambahan: Badge Stok/Kondisi */}
                <div className="flex gap-2">
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">Ready Stock</span>
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">Garansi Resmi</span>
                </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
                <Link href={link} target="_blank" className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto flex items-center justify-center gap-x-2 bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-6 text-lg transition-transform active:scale-95 shadow-lg shadow-green-200">
                        Chat Penjual (WhatsApp)
                        <MessageCircleIcon size={22} />
                    </Button>
                </Link>
                
                {/* Tombol pelengkap biar makin timbul */}
                <button 
                    onClick={() => navigator.clipboard.writeText(URL)}
                    className="p-4 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 transition-all"
                    title="Salin Link"
                >
                    <Share2 size={20} />
                </button>
            </div>
        </div>
    )
}

export default Info;