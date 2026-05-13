import { Banner as BannerType } from "@/types";
import { ArrowRight} from "lucide-react";
import Link from "next/link";

interface BannerProps {
  data: BannerType;
}

const Banner: React.FC<BannerProps> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <div className="rounded-xl border bg-slate-100/50 flex flex-col md:flex-row items-center p-8 md:p-12 gap-x-12">
        
        <div className="flex-1 space-y-6 text-center md:text-left order-2 md:order-1 mt-6 md:mt-0">
          <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-black leading-tight tracking-tighter">
            {data?.label}
          </h1>
          
          <p className="text-gray-700 text-base md:text-lg max-w-md mx-auto md:mx-0">
            Dapatkan koleksi jersey boxy unisex terbaik hanya di Toko Faiz Market.
          </p>
          
          <Link
          href="/category/75dc54a7-5beb-46d4-92f2-696c16ee0f49"
          className="group inline-flex items-center gap-x-2 bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-black/80 transition-colors"
            >
              Lihat Koleksi
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform"/>
        </Link>
        </div>

    
        <div className="flex-1 order-1 md:order-2">
            <div className="aspect-square rounded-full border-4 border-white shadow-lg overflow-hidden relative max-w-[300px] md:max-w-none mx-auto">
                <img 
                    src={data?.imageUrl}
                    alt="Banner Image"
                    className="w-full h-full object-cover" // object-cover agar gambar penuh dalam lingkaran
                />
            </div>
        </div>

      </div>
    </div>
  );
};

export default Banner;