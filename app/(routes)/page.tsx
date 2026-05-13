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
        <Container>
            <div className="space-y-10 pb-10">
                <div className="pt-4">
                </div>
                {banner? (
                    <Banner data={banner} />
                ) : (
                    <div className="h-[300px] w-full bg-gray-100 animate-pulse rounded-xl flex items-center justify-center">
                            <p className="text-gray-400">Banner belum diatur di Admin</p>
                        </div>
                )}

                <div className="px-4 sm:px-6 lg:px-8">
                    <ProductList title="Product unggulan" items={product} />
                    <RecentlyViewed />
                </div>
            </div>
        </Container>
    )
}
export default HomePage;