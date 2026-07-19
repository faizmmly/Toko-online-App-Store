const ProductSkeleton = () => {
    return (
        <div className="bg-white dark:bg-neutral-900 group rounded-xl border p-3 space-y-4 animate-pulse">
            <div className="aspect-square rounded-xl bg-gray-200 dark:bg-neutral-800"/>

            <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-neutral-800 rounded w-3/4" />
                <div className="h-4 bg-gray-200 dark:bg-neutral-800 rounded w-1/2" />
            </div>

            <div className="flex items-center justify-between pt-2">
                <div className="h-5 bg-gray-200 dark:bg-neutral-800 rounded w-1/3" />
                <div className="h-8 w-8 bg-gray-200 dark:bg-neutral-800 rounded full" />
            </div>
        </div>
    );
};

export default ProductSkeleton;