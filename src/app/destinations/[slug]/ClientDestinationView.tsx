"use client";

import Link from 'next/link';
import { MapPin, Clock, Calendar, Bus } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

interface RouteStats {
    destination: string;
    frequency: number;
    firstBus: string;
    lastBus: string;
    provider: string;
    distance?: string;
}

interface ClientDestinationViewProps {
    stats: RouteStats;
    routeSlug: string;
}

export default function ClientDestinationView({ stats, routeSlug }: ClientDestinationViewProps) {
    // Enabled usage of search params for future filtering
    const searchParams = useSearchParams();

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="mb-8">
                <Link href="/" className="text-sm text-muted-foreground hover:underline">
                    ← Back to Home
                </Link>
            </div>

            <header className="mb-12 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight mb-4">
                    {stats.destination} Bus Services from Puttur
                </h1>
                <p className="text-xl text-muted-foreground text-balanced">
                    Direct KSRTC connectivity from Puttur to {stats.destination} via multiple routes.
                </p>
            </header>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="space-y-6">
                    <div className="p-6 bg-card rounded-xl border shadow-sm">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-primary" />
                            Service Summary
                        </h2>
                        <dl className="space-y-4">
                            <div className="flex justify-between items-center border-b pb-2">
                                <dt className="text-muted-foreground">Daily Buses</dt>
                                <dd className="font-medium text-lg">{stats.frequency}</dd>
                            </div>
                            <div className="flex justify-between items-center border-b pb-2">
                                <dt className="text-muted-foreground">First Bus</dt>
                                <dd className="font-medium text-lg text-green-600">{stats.firstBus}</dd>
                            </div>
                            <div className="flex justify-between items-center border-b pb-2">
                                <dt className="text-muted-foreground">Last Bus</dt>
                                <dd className="font-medium text-lg text-red-600">{stats.lastBus}</dd>
                            </div>
                            <div className="flex justify-between items-center">
                                <dt className="text-muted-foreground">Operator</dt>
                                <dd className="font-medium">{stats.provider}</dd>
                            </div>
                        </dl>
                    </div>

                    <div className="p-6 bg-muted/30 rounded-xl border border-dashed">
                        <h3 className="font-semibold mb-2">Why Travel by Bus?</h3>
                        <p className="text-sm text-muted-foreground">
                            Puttur is directly connected to {stats.destination} by KSRTC Express, Ordinary, and Limited Stop buses.
                            Travelers can choose from {stats.frequency} daily deviations ensuring flexible travel plans.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="relative aspect-video bg-muted rounded-xl flex items-center justify-center overflow-hidden border">
                        {/* Map Placeholder */}
                        <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-900 flex flex-col items-center justify-center text-center p-4">
                            <MapPin className="w-12 h-12 text-muted-foreground mb-2" />
                            <p className="text-muted-foreground font-medium">Route Map Preview</p>
                            <span className="text-xs text-muted-foreground">Distance: ~{stats.distance || 'Calculated'} KM</span>
                        </div>
                    </div>

                    <Link
                        href={`/route/${routeSlug}`}
                        className="w-full py-4 text-center bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    >
                        <Bus className="w-5 h-5" />
                        View Full Timetable
                    </Link>
                </div>
            </div>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Popular Routes to {stats.destination}</h2>
                <div className="grid md:grid-cols-3 gap-4">
                    <Link href={`/route/${routeSlug}`} className="block p-4 bg-card hover:bg-muted transition-colors rounded-lg border">
                        <div className="font-medium">Puttur ➔ {stats.destination}</div>
                        <div className="text-sm text-muted-foreground">Direct • {stats.frequency} Buses</div>
                    </Link>
                    {/* Placeholder for other hypothetical routes if we had them reversed */}
                </div>
            </section>
        </div>
    );
}
