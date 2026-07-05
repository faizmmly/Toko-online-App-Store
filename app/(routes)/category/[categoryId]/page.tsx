import getCategory from "@/actions/get-category";
import getProducts from "@/actions/get-products";
import Banner from "@/components/banner";
import Container from "@/components/ui/container";
import NoResult from "@/components/ui/no-result";
import ProductCard from "@/components/ui/product-card";

interface CategoryPageProps {
    params: Promise<{categoryId: string}>
}


const CategoryPage= async ({params }: CategoryPageProps) => {

    const { categoryId } = await params;

        const products = await getProducts({
            categoryId: categoryId
        })

        const category = await getCategory(categoryId)
    return (

        <div className="bg-white">
            <Container>
                <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
                    <Banner data={category.banner}/>
                </div>

                <div className="px-4 sm:px-6 lg:px-8 pb-24">
                    <div className="mt-6 lg:col-span-4 lg:mt-0">
                        {products.length === 0 && <NoResult />}

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                            {products.map((item) => (
                                <ProductCard key={item.id} data={item} /> 
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default CategoryPage;