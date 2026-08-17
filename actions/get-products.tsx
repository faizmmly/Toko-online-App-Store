import { Product } from "@/types";

import qs from "query-string";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
    categoryId?: string;
    colorId?: string;
    sizeId?: string;
    isFeatured?: boolean;
    name?: string;
    page?: number;
    limit?: number;
}

const getProducts = async (query: Query = {}): Promise<Product[]> => {
    const url = qs.stringifyUrl({
        url: URL,
        query: {
            categoryId: query.categoryId,
            colorId: query.colorId,
            sizeId: query.sizeId,
            isFeatured: query.isFeatured,
            name: query.name,
            page: query.page,
            limit: query.limit,
        },
    },
    { skipNull: true, skipEmptyString: true }
);

    const res = await fetch(url, { cache: 'no-store' });

    if(!res.ok){
        console.error("Failed to fetch products", await res.text());
    }

    return res.json();
};

export default getProducts;