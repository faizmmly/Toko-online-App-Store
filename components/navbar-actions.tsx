'use client'

import { motion } from "framer-motion";
import useCart from "@/hooks/use-cart";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { SignInButton, UserButton, Show} from "@clerk/nextjs";

const NavbarActions = () => {
    const [isMounted, setIsMounted] = useState(false);
    const cart = useCart();
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted) return null;

    return(
        <div className="ml-auto flex items-center gap-x-4">
            <motion.button
            key={cart.items.length}
            initial={{scale: 1}}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.3 }}
            onClick={() => router.push("/cart")}
            className="flex items-center rounded-full dark:bg-white bg-black px-4 py-2 transition-colors duration-300"
            >
                <ShoppingBag size={20} className="text-white dark:text-black"/>

                <span className="ml-2 text-sm font-medium text-white dark:text-black">
                {cart.items.length}
                </span>
                </motion.button>

                <Show when="signed-out">
                    <SignInButton mode="modal">
                        <button className="px-4 py-2 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-full hover:opacity-80 transition duration-300">
                            Masuk
                        </button>
                    </SignInButton>
                </Show>

                <Show when="signed-in">
                <UserButton 
                    appearance={{
                        elements: {
                            avatarBox: "h-9 w-9 border dark:border-neutral-700" // Sesuaikan ukuran avatar biar proporsional
                        }
                    }}
                />
            </Show>
        </div>
    );
}

export default NavbarActions