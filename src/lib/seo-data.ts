
import busData from '@/data/bus-routes.json';
import intercityData from '@/data/intercity-buses.json';
import { findDestination, normalizeSlug } from '@/lib/route-matcher';

// Types for our stats
export interface RouteStats {
    destination: string;
    firstBus: string;
    lastBus: string;
    frequency: number; // Daily buses
    totalBuses: number; // Same as frequency for daily
    provider: string; // "KSRTC" or combined
    duration?: string; // e.g. "1h 30m" if available
}

// Helper to convert "H:MM" or "HH:MM" to minutes from midnight
function toMinutes(timeStr: string): number {
    if (!timeStr) return 0;
    const [h, m] = timeStr.split(':').map(Number);
    return (h || 0) * 60 + (m || 0);
}

// Helper to format "H:MM" to "h:mm A" pretty format
function formatTime(timeStr: string): string {
    if (!timeStr) return '';
    const mins = toMinutes(timeStr);
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${m.toString().padStart(2, '0')} ${ampm}`;
}

/**
 * Returns a unique list of all SEO slugs for generating static params
 */
export function getAllRouteSlugs(): { slug: string }[] {
    const slugSet = new Set<string>();

    // 1. Local Routes (From "Puttur" to X)
    busData.forEach(bus => {
        if (bus.from.toLowerCase() === 'puttur') {
            const dest = bus.to.toLowerCase().replace(/\s+/g, '-');
            slugSet.add(`puttur-to-${dest}`);
        }
    });

    // 2. Intercity Routes (From "Puttur" to X)
    intercityData.forEach(bus => {
        if (bus.from.toLowerCase() === 'puttur') {
            const dest = bus.to.toLowerCase().replace(/\s+/g, '-');
            slugSet.add(`puttur-to-${dest}`);
        }
    });

    return Array.from(slugSet).map(slug => ({ slug }));
}

/**
 * Returns a unique list of all destination slugs for standardizing /destinations/ url
 */
export function getAllDestinationSlugs(): { slug: string }[] {
    const slugSet = new Set<string>();

    // 1. Local Routes
    busData.forEach(bus => {
        if (bus.from.toLowerCase() === 'puttur') {
            slugSet.add(bus.to.toLowerCase().replace(/\s+/g, '-'));
        }
    });

    // 2. Intercity Routes
    intercityData.forEach(bus => {
        if (bus.from.toLowerCase() === 'puttur') {
            slugSet.add(bus.to.toLowerCase().replace(/\s+/g, '-'));
        }
    });

    return Array.from(slugSet).map(slug => ({ slug }));
}

/**
 * Calculates SEO stats for a given route slug.
 * e.g. "puttur-to-mangalore"
 */
export function getRouteStats(slug: string): RouteStats | null {
    const destName = findDestination(slug);
    if (!destName) return null;

    // Filter Local Buses
    const localBuses = busData.filter(b =>
        b.from.toLowerCase() === 'puttur' &&
        findDestination(b.to) === destName
    );

    // Filter Intercity Buses
    const intercityBuses = intercityData.filter(b =>
        b.from.toLowerCase() === 'puttur' &&
        findDestination(b.to) === destName
    );

    // Collect all departure times
    // Local: .time
    // Intercity: .departureTime
    const allTimes = [
        ...localBuses.map(b => b.time),
        ...intercityBuses.map(b => b.departureTime)
    ].filter(Boolean);

    if (allTimes.length === 0) {
        return {
            destination: destName,
            firstBus: 'N/A',
            lastBus: 'N/A',
            frequency: 0,
            totalBuses: 0,
            provider: 'KSRTC'
        };
    }

    // Sort times
    allTimes.sort((a, b) => toMinutes(a) - toMinutes(b));

    const firstTime = allTimes[0];
    const lastTime = allTimes[allTimes.length - 1];

    return {
        destination: destName,
        firstBus: formatTime(firstTime),
        lastBus: formatTime(lastTime),
        frequency: allTimes.length,
        totalBuses: allTimes.length,
        provider: 'KSRTC'
    };
}

/**
 * Generates FAQ Schema list for a route
 */
export function getRouteFAQ(stats: RouteStats) {
    return [
        {
            question: `Is there a KSRTC bus from Puttur to ${stats.destination}?`,
            answer: `Yes, KSRTC operates ${stats.frequency} buses daily from Puttur to ${stats.destination}.`
        },
        {
            question: `What time is the first bus from Puttur to ${stats.destination}?`,
            answer: `The first bus departs from Puttur KSRTC Bus Stand at ${stats.firstBus}.`
        },
        {
            question: `What time is the last bus from Puttur to ${stats.destination}?`,
            answer: `The last bus departs at ${stats.lastBus}.`
        },
        {
            question: `How many buses go from Puttur to ${stats.destination} daily?`,
            answer: `There are approximately ${stats.frequency} buses every day.`
        }
    ];
}

/**
 * Returns top N destinations by bus frequency
 */
export function getTopDestinations(limit: number = 5): RouteStats[] {
    const destinations = getAllDestinationSlugs();
    const allStats = destinations
        .map(d => getRouteStats(`puttur-to-${d.slug}`))
        .filter((s): s is RouteStats => s !== null);

    // Sort by frequency descending
    allStats.sort((a, b) => b.frequency - a.frequency);

    return allStats.slice(0, limit);
}

export interface BusService {
    time: string;
    destination: string;
    type: string;
    via: string;
}

/**
 * Returns list of buses for a route (normalized)
 */
export function getRouteBuses(slug: string): BusService[] {
    const destName = findDestination(slug);
    if (!destName) return [];

    const localBuses = busData.filter(b =>
        b.from.toLowerCase() === 'puttur' &&
        findDestination(b.to) === destName
    ).map(b => ({
        time: b.time,
        destination: b.to,
        type: b.type,
        via: b.via
    }));

    const intercityBuses = intercityData.filter(b =>
        b.from.toLowerCase() === 'puttur' &&
        findDestination(b.to) === destName
    ).map(b => ({
        time: b.departureTime,
        destination: b.to,
        type: b.serviceType,
        via: b.via.join(', ')
    }));

    const all = [...localBuses, ...intercityBuses];
    all.sort((a, b) => toMinutes(a.time) - toMinutes(b.time));
    return all;
}
