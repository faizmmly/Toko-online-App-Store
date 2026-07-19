import { Banner } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/banners`;


// Fungsi lama untuk mengambil 1 data banner berdasarkan ID
export const getBanner = async (id: string): Promise<Banner> => {
    const res = await fetch(`${URL}/${id}`);
    return res.json();
};

const getBanners = async (): Promise<Banner[]> => {
    const res = await fetch(URL, { cache: 'no-store' });
    return res.json();
};

export default getBanners;