'use client'

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Container from "./ui/container";
import MainNav from "./main-nav";
import { Category } from "@/types";
import NavbarActions from "./navbar-actions";

interface NavbarClientProps {
    categories: Category[];
}

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    return (
        <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-neutral-900 dark:bg-white origin-left z-50"
        style={{ scale: scrollYProgress }}
        />
    );
};

const NavbarClient: React.FC<NavbarClientProps> = ({ categories }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { scrollYProgress } = useScroll();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    return (
        <nav className="sticky top-0 z-40 w-full bg-white/80 dark:bg-neutral-900/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
            <motion.div 
                className="fixed top-0 left-0 right-0 h-[3px] bg-blue-500 origin-left"
                style={{ scaleX: scrollYProgress}}
            />
            <Container>
                <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
                    
                        {/* LOGO */}
                        <Link href="/" className="flex gap-x-2 transition-transform hover:scale-105 active:scale-95 shrink-0">
                            <p className="text-xl font-bold uppercase tracking-tight text-neutral-900 dark:text-white">
                                Toko <span className="text-neutral-500 dark:text-neutral-400">Faiz Market</span>
                            </p>
                        </Link>

                        {/* DESKTOP NAV (Sembunyi di HP) */}
                        <div className="hidden md:block flex-1 ml-8">
                            <MainNav data={categories} />
                        </div>

                        <div className="flex items-center gap-x-2">
                        <NavbarActions />

                        {/* MOBILE HAMBURGER BUTTON (Hanya muncul di HP) */}
                        <button 
                            onClick={() => setIsOpen(true)}
                            className="md:hidden p-2 rounded-full text-neutral-500 dark:bg-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer"
                            aria-label="Buka Menu"
                            >
                            <Menu size={22} />
                        </button>
                    </div>
                </div>
            </Container>

            {/* MOBILE SIDEBAR OVERLAY */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Background Gelap (Dimmer) */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 dark:bg-black/60 backdrop-blur-xs z-50"
                        />

                        {/* Menu Panel */}
                        <motion.div 
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 220 }}
                            className="fixed right-0 top-0 bottom-0 w-[280px] bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800 p-6 z-55 shadow-2xl flex flex-col"
                        >
                            <div className="flex items-center justify-between mb-8 border-b border-neutral-100 dark:border-neutral-800 pb-4">
                                <p className="font-bold text-neutral-900 dark:text-white text-lg">Menu</p>
                                <button onClick={() => setIsOpen(false)} 
                                className="text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 p-1.5 rounded-full transition cursor-pointer">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex flex-col gap-y-4 overflow-y-auto no-scrollbar flex-1">
                                {categories.map((category) => (
                                    <Link
                                        key={category.id}
                                        href={`/category/${category.id}`}
                                        onClick={() => setIsOpen(false)}
                                        className="text-base font-medium px-3 py-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 hover:text-neutral-900 dark:hover:text-white transition"
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
}

export default NavbarClient;