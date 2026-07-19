import { div } from "framer-motion/client";
import ProductSkeleton from "./product-skeleton";

interface ProductListSkeletonProps {
    count?: number;
}

const ProductListSkeleton: React.FC<ProductListSkeletonProps> = ({
    count = 4
}) => {
    return (
        <div className="space-y-4">
            <div className="h-7 bg-gray-200 dark:bg-neutral-800 rounded w-48 animate-pulse mb-6"/>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: count }).map((_, index) => (
                    <ProductSkeleton key={index} />
                ))}
            </div>
        </div>
    );
};

export default ProductListSkeleton;