import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllDestinationSlugs, getRouteStats } from '@/lib/seo-data';

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    return getAllDestinationSlugs();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const routeSlug = `puttur-to-${slug}`;
    const stats = getRouteStats(routeSlug);

    if (!stats) {
        return {
            title: 'Destination Not Found | PutturBus',
        };
    }

    return {
        title: `${stats.destination} Bus Services from Puttur | KSRTC Timings`,
        description: `Everything you need to know about traveling from Puttur to ${stats.destination}. ${stats.frequency} buses daily, first bus at ${stats.firstBus}, last bus at ${stats.lastBus}.`,
    };
}

import { Suspense } from 'react';
import ClientDestinationView from './ClientDestinationView';

export default async function DestinationPage({ params }: Props) {
    const { slug } = await params;
    const routeSlug = `puttur-to-${slug}`;
    const stats = getRouteStats(routeSlug);

    if (!stats) {
        notFound();
    }

    return (
        <Suspense fallback={<div className="container mx-auto px-4 py-12 text-center">Loading destination info...</div>}>
            <ClientDestinationView stats={stats} routeSlug={routeSlug} />
        </Suspense>
    );
}
