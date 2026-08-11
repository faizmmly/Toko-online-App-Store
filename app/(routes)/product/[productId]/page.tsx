import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import Galery from "@/components/galery";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";
import Info from "@/components/info";

export const revalidate = 0;
export const dynamic = 'force-dynamic';

interface ProductPageProps {
    params: Promise<{
        productId: string;
    }>
}

const ProductPage = async ({
    params
}: {
    params: Promise<{productId: string}>
}) => {
    const resolvedParams = await params;
    const product = await getProduct(resolvedParams.productId);

    const suggestedProducts = await getProducts({
        categoryId: product?.category?.id
    });

    const filteredItems = suggestedProducts.filter((item) => item.id !== resolvedParams.productId);
    
    return (
        <div className="bg-white">
            <Container>
                <div className="px-4 py-10 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                         <Galery images={product?.images}/>
                         <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                            <Info data={product} />
                         </div>
                    </div>
                    <hr className="my-10"/>
                    <ProductList title="Produk Terkait" items={filteredItems}/>
                </div>
            </Container>
        </div>
    )
}

export default ProductPage;