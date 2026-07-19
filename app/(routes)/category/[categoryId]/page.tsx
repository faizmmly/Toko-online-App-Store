import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import Banner from "@/components/banner";
import MobileFilters from "@/components/mobile-filters";
import Container from "@/components/ui/container";
import Filter from "@/components/ui/filter";
import NoResult from "@/components/ui/no-result";
import ProductCard from "@/components/ui/product-card";


interface CategoryPageProps {
    params: Promise<{categoryId: string}>;
    searchParams: Promise<{ colorId?: string; sizeId?: string }>
}

const CategoryPage= async ({params, searchParams }: CategoryPageProps) => {

    const { categoryId } = await params;
    const { colorId, sizeId } = await searchParams;

        const [products, category, sizes, colors] = await Promise.all([
            getProducts({ 
                categoryId: categoryId,
                colorId: colorId,
                sizeId: sizeId
            }),
            getCategory(categoryId),
            getSizes(),
            getColors()
        ]);

    return (
        <div className="bg-white dark:bg-neutral-900 transition-colors duration-300">
            <Container>
                <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
                    {/* Hero Banner Tetap Paling Atas & Aman */}
                    <Banner data={category.banner}/>
                </div>

                <div className="px-4 sm:px-6 lg:px-8 pb-24">
                    <div className="mb-8 border-b border-gray-100 dark:border-neutral-800 pb-5">
                        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white capitalize">
                            Koleksi {category.name}
                        </h2>
                        <p className="mt-2 text-sm text-neutral-500">
                            Menampilkan <span className="font-semibold text-black dark:text-neutral-300">{products.length}</span> produk pilihan terbaik anda.
                        </p>
                    </div>

                    {/* Implementasi Grid Layout Responsif */}
                    <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
                        
                        {/* 1. Tombol Filter khusus Layar Mobile (Sembunyi di lg:) */}
                        <div className="mb-4 lg:hidden">
                            <MobileFilters sizes={sizes} colors={colors} />
                        </div>

                        {/* 2. Panel Filter khusus Layar Desktop (Sembunyi di mobile) */}
                        <div className="hidden lg:block lg:col-span-1 space-y-6">
                            <Filter valueKey="sizeId" name="Ukuran" data={sizes} />
                            <Filter valueKey="colorId" name="Warna" data={colors} />
                        </div>

                        {/* 3. Grid List Produk */}
                        <div className="mt-6 lg:col-span-4 lg:mt-0">
                            {products.length === 0 && <NoResult />}

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                                {products.map((item) => (
                                    <ProductCard key={item.id} data={item} /> 
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </Container>
        </div>
    )
}

export default CategoryPage;