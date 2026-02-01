"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface Bus {
    time: string;
    destination: string;
    type: string;
    via: string;
}

interface RouteStats {
    destination: string;
    frequency: number;
    // ... add other properties if needed
}

interface ClientTimetableViewProps {
    stats: RouteStats;
    slug: string;
    buses: Bus[];
}

export default function ClientTimetableView({ stats, slug, buses }: ClientTimetableViewProps) {
    const searchParams = useSearchParams();

    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <div className="mb-6">
                <Link href={`/route/${slug}`} className="text-sm text-primary hover:underline">
                    ← Back to Route View
                </Link>
            </div>

            <h1 className="text-3xl font-bold mb-6">
                Puttur to {stats.destination} Bus Time Table
            </h1>

            <div className="prose dark:prose-invert mb-8">
                <p>
                    Below is the complete text-only schedule for KSRTC buses from Puttur Bus Stand to {stats.destination}.
                    Times are in 24-hour format. Sorted by departure time.
                </p>
            </div>

            <div className="overflow-x-auto border rounded-xl shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-muted text-muted-foreground border-b">
                        <tr>
                            <th className="p-4 font-semibold">Departure</th>
                            <th className="p-4 font-semibold">Destination</th>
                            <th className="p-4 font-semibold">Bus Type</th>
                            <th className="p-4 font-semibold">Via Route</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y bg-card text-card-foreground">
                        {buses.map((bus, idx) => (
                            <tr key={idx} className="hover:bg-muted/50 transition-colors">
                                <td className="p-4 font-mono font-medium text-lg">{bus.time}</td>
                                <td className="p-4">{bus.destination}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs border ${bus.type.toLowerCase().includes('express')
                                        ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-900'
                                        : 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                                        }`}>
                                        {bus.type}
                                    </span>
                                </td>
                                <td className="p-4 text-muted-foreground">{bus.via}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-8 text-sm text-muted-foreground text-center">
                <p>Timings are subject to change by KSRTC. Please check at the bus stand for live status.</p>
            </div>
        </div>
    );
}
