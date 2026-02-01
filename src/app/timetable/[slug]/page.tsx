import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllRouteSlugs, getRouteBuses, getRouteStats } from '@/lib/seo-data';

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    return getAllRouteSlugs();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const stats = getRouteStats(slug);

    if (!stats) {
        return { title: 'Timetable Not Found' };
    }

    return {
        title: `Puttur to ${stats.destination} Bus Time Table | Pure HTML Schedule`,
        description: `Complete list of all bus departure times from Puttur to ${stats.destination}. ${stats.frequency} buses listed in chronological order.`,
    };
}

import { Suspense } from 'react';
import ClientTimetableView from './ClientTimetableView';

export default async function TimetablePage({ params }: Props) {
    const { slug } = await params;
    const stats = getRouteStats(slug);
    const buses = getRouteBuses(slug);

    if (!stats || buses.length === 0) {
        notFound();
    }

    return (
        <Suspense fallback={<div className="container mx-auto py-12 text-center">Loading timetable...</div>}>
            <ClientTimetableView stats={stats} slug={slug} buses={buses} />
        </Suspense>
    );
}
