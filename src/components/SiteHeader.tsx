"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, HelpCircle, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function SiteHeader() {
    const pathname = usePathname();
    const { language, setLanguage, t } = useLanguage();

    return (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50 transition-all">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
                {/* Logo / Home Link */}
                <Link href="/" className="flex items-center gap-2 group shrink-0">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:bg-blue-700 transition-colors">
                        P
                    </div>
                    <div className="hidden sm:block">
                        <h1 className="text-lg font-bold text-slate-900 leading-none">PutturBus</h1>
                        <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">{t('community_project')}</p>
                    </div>
                </Link>

                <div className="flex items-center gap-3">
                    {/* Navigation Links */}
                    <nav className="hidden md:flex items-center gap-1 sm:gap-2 mr-2">
                        <NavLink href="/" icon={<Home className="w-4 h-4" />} label={t('home')} active={pathname === "/"} />
                        <NavLink href="/directory" icon={<Map className="w-4 h-4" />} label={t('directory')} active={pathname.startsWith("/directory")} />
                        <NavLink href="/help" icon={<HelpCircle className="w-4 h-4" />} label={t('help')} active={pathname.startsWith("/help")} />
                    </nav>

                    {/* Utility Bar */}
                    <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                        {/* Language Toggle */}
                        <button
                            onClick={() => setLanguage(language === 'en' ? 'kn' : 'en')}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-all"
                            aria-label="Toggle Language"
                        >
                            <Globe className="w-3.5 h-3.5" />
                            {language === 'en' ? 'English' : 'ಕನ್ನಡ'}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

function NavLink({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active: boolean }) {
    return (
        <Link
            href={href}
            className={`
                flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all
                ${active
                    ? "bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-200"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }
            `}
        >
            {icon}
            <span className={`${active ? "block" : "hidden sm:block"}`}>{label}</span>
        </Link>
    );
}
