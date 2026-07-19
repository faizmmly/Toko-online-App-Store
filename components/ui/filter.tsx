"use client";

import { Color, Size } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string"; // Pastikan sudah install library 'query-string'
import { cn } from "@/lib/utils";
import { Button } from "./button"; // Menggunakan komponen Button custom milikmu

interface FilterProps {
  data: (Size | Color)[];
  name: string;
  valueKey: string;
}

const Filter: React.FC<FilterProps> = ({ data, name, valueKey }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Mengambil nilai ID filter yang sedang aktif dari URL
  const selectedValue = searchParams.get(valueKey);

  const onClick = (id: string) => {
    // 1. Ambil semua parameter yang ada di URL saat ini
    const current = qs.parse(searchParams.toString());

    // 2. Tambahkan parameter filter yang baru diklik
    const query = {
      ...current,
      [valueKey]: id
    };

    // 3. Kalau user nge-klik filter yang sama (yang lagi aktif), hapus filter tersebut (toggle off)
    if (current[valueKey] === id) {
      delete query[valueKey];
    }

    // 4. Perbarui URL browser dengan parameter baru
    const url = qs.stringifyUrl({
      url: window.location.href,
      query
    }, { skipNull: true });

    router.push(url);
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {name}
      </h3>
      <hr className="my-4 border-gray-200 dark:border-neutral-800" />
      
      {/* List Pilihan Filter */}
      <div className="flex flex-wrap gap-2">
        {data.map((filter) => (
          <div key={filter.id} className="flex items-center">
            <Button
              className={cn(
                "rounded-md text-sm p-2 bg-white dark:bg-neutral-900 text-gray-800 dark:text-neutral-200 border border-gray-300 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 transition",
                selectedValue === filter.id && "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white hover:bg-black/90 dark:hover:bg-white/90"
              )}
              onClick={() => onClick(filter.id)}
            >
              {filter.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;