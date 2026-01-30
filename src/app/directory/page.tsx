"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, ArrowRight, Home } from 'lucide-react';
import busData from '@/data/bus-routes.json';

const DESTINATIONS = Array.from(new Set(busData.map(b => b.to))).sort();

export default function DirectoryPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredDestinations = DESTINATIONS.filter(d =>
        d.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-slate-50 pb-20">
            {/* Header */}
            <header className="bg-gradient-to-br from-indigo-900 via-blue-800 to-indigo-900 text-white pt-16 pb-24 px-4 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_50%)]"></div>
                <div className="absolute inset-0 opacity-10 bg-[url('/grid-pattern.svg')]"></div>

                <div className="max-w-3xl mx-auto relative z-10 text-center space-y-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-blue-200 hover:text-white hover:bg-white/10 transition-all text-sm font-semibold px-4 py-2 rounded-full backdrop-blur-sm border border-white/10"
                    >
                        <Home className="w-4 h-4" />
                        Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-sm">
                        Bus Directory
                    </h1>
                    <p className="text-blue-100/90 text-lg max-w-xl mx-auto font-medium">
                        Browse all connected destinations from Puttur KSRTC
                    </p>
                </div>
            </header>

            {/* Floating Search Bar */}
            <div className="max-w-xl mx-auto px-4 -mt-8 relative z-30">
                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-2 flex items-center ring-1 ring-slate-900/5">
                    <div className="p-3 bg-slate-50 rounded-xl text-slate-400">
                        <Search className="w-6 h-6" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search for a destination..."
                        className="w-full p-4 bg-transparent text-slate-800 placeholder:text-slate-400 focus:outline-none font-semibold text-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Content Grid */}
            <div className="max-w-4xl mx-auto px-4 mt-12 relative z-20">
                <div className="flex items-center justify-between mb-6 px-2">
                    <h2 className="text-slate-400 font-bold uppercase tracking-wider text-xs">
                        {filteredDestinations.length} Destinations Available
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredDestinations.map(dest => {
                        const slug = dest.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
                        return (
                            <Link
                                key={dest}
                                href={`/route/puttur-to-${slug}`}
                                className="group bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-200 transition-all duration-300 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                                    <ArrowRight className="w-5 h-5 text-blue-500" />
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 shadow-inner group-hover:shadow-lg group-hover:shadow-blue-500/30">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 text-lg group-hover:text-blue-700 transition-colors line-clamp-1">
                                            {dest}
                                        </h3>
                                        <p className="text-xs text-slate-400 font-medium group-hover:text-blue-400/80 transition-colors">
                                            View Timings
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {filteredDestinations.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-1">No destinations found</h3>
                        <p className="text-slate-400 text-sm">
                            Try searching for something else
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}
