import Link from "next/link";
import Container from "./ui/container";
import MainNav from "./main-nav";
import getCategories from "@/actions/get-categories";
import NavbarActions from "./navbar-actions";
import SearchBar from "./search-bar";
import { Product } from "@/types";
import { ThemeToggle } from "./theme-toogle";
import NotificationDropdown from "./notification-dropdown";


export const revalidate = 0

interface NavbarProps {
    products: Product[];
}

const Navbar =  async ({products}: {products: Product[]}) => {
    const categories = await getCategories();

    const mappedProducts = products.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category.name,
    slug: p.id,
  }));

    return (
        <div className="sticky top-0 z-50 w-full border-b border-gray-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-colors duration-300">
            <Container>
                <div className="px-4 sm:px-6 lg:px-8 flex h-16 items-center gap-x-4 justify-between">
                    
                <Link href="/" className="flex shrink-0 items-center gap-x-1">
                    <p className="text-xl font-bold tracking-tight italic">
                    <span className="hidden min-[380px]:inline">Toko</span> Faiz
                    <span className="text-blue-600"> Market</span></p>
                </Link>
                
                <div className="hidden md:flex flex-1 items-center justify-center gap-x-6 mx-4">
                <MainNav data={categories} />

                <div className="flex-1 max-w-md ml-auto">
                    <SearchBar products={mappedProducts} />
                    </div>
                </div>

                <div className="flex items-center gap-x-1.5 sm:gap-3 shrink-0 ml-auto">
                    <ThemeToggle />
                    <NotificationDropdown />
                    <NavbarActions />
                    </div>
                </div>

                <div className="md:hidden px-4 pb-2.5">
                    <SearchBar products={mappedProducts}/>
                </div>
            </Container>
        </div>
    );
}

export default Navbar;