import getBanner from "@/actions/get-banner";
import getProducts from "@/actions/get-products";
import Banner from "@/components/banner";
import ProductList from "@/components/product-list";
import RecentlyViewed from "@/components/recently-viewed";
import Container from "@/components/ui/container"

export const revalidate = 0;

const HomePage =  async () => {

    const productsData = await getProducts({isFeatured: true});
    const bannerData = getBanner("c74f18d7-ed7a-428a-8a42-490e093d67e7");

    const [product, banner] = await Promise.all([productsData, bannerData]);

    return (
        <div className="bg-white dark:bg-neutral-900 transition-colors duration-300">
            <Container>
                <div className="space-y-12 pb-16 pt-6">
                    
                    {banner? (
                        <Banner data={banner} />
                    ) : (
                        <div className="h-[200px] sm:h[300px] md:h[400px] w-full bg-gray-50 dark:bg-neutral-800 border-dashed border-gray-200 dark:border-neutral-700 animate-pulse rounded-2xl flex items-center justify-center">
                                <p className="text-sm font-medium text-gray-400">Banner belum diatur di Admin</p>
                            </div>
                    )}

                    <div className="px-4 sm:px-6 lg:px-8">
                        <ProductList title="Product unggulan" items={product} />
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