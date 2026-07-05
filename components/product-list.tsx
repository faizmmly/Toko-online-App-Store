import { Product } from "@/types";
import NoResult from "./ui/no-result";
import ProductCard from "./ui/product-card";


interface ProductListProps {
    title: string;
    items: Product[];
}


const ProductList: React.FC<ProductListProps> = ({
     title, items 
}) => {
    return (
        <div className="space-y-4 my-8 px-4 sm:px-6 lg:px-8">
            <h3 className="font-bold text-2xl md:text-3xl text-neutral-800 tracking-tight">{title}</h3>
            {items.length === 0 && <NoResult />}
            <div className="grid grid-cols-2 sd:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                {items.map((item) => (
                    <ProductCard 
                    key={item.id} data={item} />
                ))}
            </div>
        </div>
    )
}
export default ProductList;