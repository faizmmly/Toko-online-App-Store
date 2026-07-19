import getBanners from "@/actions/get-banners";
import getProducts from "@/actions/get-products";
import Banner from "@/components/banner";
import ProductList from "@/components/product-list";
import RecentlyViewed from "@/components/recently-viewed";
import Container from "@/components/ui/container"
import ProductListSkeleton from "@/components/ui/product-list-skeleton";
import { Suspense } from "react";

export const revalidate = 0;

const FeaturedProducts = async () => {
    const products= await getProducts({ isFeatured: true });
    return <ProductList title="Product Unggulan" items={products} />;
}

const HomePage =  async () => {

    const bannersData = getBanners();
    const banners = await bannersData;

    return (
        <div className="bg-white dark:bg-neutral-900 transition-colors duration-300">
            <Container>
                <div className="space-y-12 pb-16 pt-6">
                    
                    {banners && banners.length > 0 ? (
                        <Banner data={banners} />
                    ) : (
                        <div className="h-[200px] sm:h[300px] md:h[400px] w-full bg-gray-50 dark:bg-neutral-800 border-dashed border-gray-200 dark:border-neutral-700 animate-pulse rounded-2xl flex items-center justify-center">
                                <p className="text-sm font-medium text-gray-400">Banner belum diatur di Admin</p>
                            </div>
                    )}

                    <div className="px-4 sm:px-6 lg:px-8">
                        <Suspense fallback={<ProductListSkeleton count={4} />}>
                            <FeaturedProducts />
                        </Suspense>
                    </div>

                    <div className="px-4 sm:px-6 lg:px-8">
                        <RecentlyViewed />
                    </div>
                </div>
            </Container>
        </div>
    )
}
export default HomePage;