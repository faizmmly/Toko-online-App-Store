'use client'

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Category } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MainNavProps {
    data: Category[];
}

const MainNav: React.FC<MainNavProps> = ({
    data
}) => { 
    const pathname = usePathname()

    const routes = data.map((route) => ({
        href: `/category/${route.id}`,
        label: route.name,
        active: pathname === `/category/${route.id}`
    }))

    return (
        <nav className="mx-6 flex items-center space-x-4 lg:space-x-6 overflow-x-auto whitespace-nowrap py-2 no-scrollbar">
            {routes.map((route) => (
                <Link 
                    key={route.href}
                    href={route.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-black",
                        route.active ? "text-black" : "text-neutral-500"
                    )}
                    >

                    <motion.span
                            className={cn (
                                "absolute inset-0 rounded-full",
                        route.active ? "bg-black" : "bg-transparent group-hover:bg-gray-100"
                    )}
                        layoutId={route.active ? "active-bg" : undefined}
                        transition={{ type: "spring", stiffness: 400, damping: 300}}
                    />

                    <span className={cn(
                        "relative z-10 transition-colors",
                        route.active ? "text-white" : "text-neutral-500 group-hover:text-black"
                    )}> 
                    {route.label}
                    </span>
                </Link>
            ))}
        </nav>
    )
}

export default MainNav;