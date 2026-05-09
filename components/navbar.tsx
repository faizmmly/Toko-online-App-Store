import Link from "next/link";
import Container from "./ui/container";
import MainNav from "./main-nav";
import getCategories from "@/actions/get-categories";
import NavbarActions from "./navbar-actions";
import SearchBar from "./search-bar";
import { Product } from "@/types";


export const revalidate = 0

interface NavbarProps {
    products: Product[];
}

const Navbar =  async ({products}: {products: Product[]}) => {
    const categories = await getCategories();

    return (
        <div className="sticky top-0 z-50 w-full border-b bg-white/70 backdrop-blur-md">
                <Container>
                    <div className="px-4 sm:px-6 lg:px-8 flex h-16 items-center gap-x-4">
                    <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
                <p className="text-2xl font-bold tracking-tighter italic"><span className="hidden min-[380px]:inline">Toko</span> Faiz
                <span className="text-blue-600"> Market</span></p>
                </Link>
                
                <div className="hidden md:flex flex-1 px-4 overflow-x-auto no-scrollbar">
                <MainNav data={categories} />
                </div>


                <SearchBar products={products.map(p => ({
                    id: p.id,
                    name: p.name,
                    category: p.category.name,
                    slug: p.id,
                }))}/>

                <div className="md:hidden px-4 pb-3">
                <NavbarActions />
                </div>
                </div>
            </Container>
        </div>
    );
}

export default Navbar;