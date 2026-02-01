"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Home, Search, Map, Bus, HelpCircle, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function BottomNav() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { t, language, setLanguage } = useLanguage();

    const isSearchFocused = searchParams.get('focus') === 'search';

    const navItems = [
        {
            id: "home",
            label: t('home'),
            icon: Home,
            href: "/",
            isActive: pathname === "/" && !isSearchFocused,
        },
        {
            id: "search",
            label: t('search'),
            icon: Search,
            href: "/?focus=search",
            isActive: isSearchFocused,
        },
        {
            id: "routes",
            label: t('directory'),
            icon: Map,
            href: "/directory",
            isActive: pathname.startsWith("/directory"),
        },
        {
            id: "language",
            label: language === 'en' ? 'ಕನ್ನಡ' : 'English',
            icon: Globe,
            onClick: () => setLanguage(language === 'en' ? 'kn' : 'en'),
            isActive: false,
        },
        {
            id: "help",
            label: t('help'),
            icon: HelpCircle,
            href: "/help",
            isActive: pathname.startsWith("/help"),
        },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 pb-[env(safe-area-inset-bottom)] z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <nav className="flex items-center justify-around h-16 w-full">
                {navItems.map((item) => {
                    const Content = (
                        <>
                            {item.isActive && (
                                <motion.div
                                    layoutId="bottom-nav-indicator"
                                    className="absolute top-0 w-12 h-0.5 bg-blue-600 rounded-b-full"
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}

                            <motion.div
                                whileTap={{ scale: 0.9 }}
                                className={`flex flex-col items-center gap-1 transition-colors ${item.isActive ? "text-blue-600" : "text-slate-500 hover:text-slate-900"
                                    }`}
                            >
                                <item.icon className="w-6 h-6" strokeWidth={item.isActive ? 2.5 : 2} />
                                <span className="text-[10px] font-medium leading-none">{item.label}</span>
                            </motion.div>
                        </>
                    );

                    if (item.onClick) {
                        return (
                            <button
                                key={item.id}
                                onClick={item.onClick}
                                className="relative flex flex-col items-center justify-center w-full h-full"
                                aria-label={item.label}
                            >
                                {Content}
                            </button>
                        );
                    }

                    return (
                        <Link
                            key={item.id}
                            href={item.href!}
                            className="relative flex flex-col items-center justify-center w-full h-full"
                            aria-label={item.label}
                        >
                            {Content}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
