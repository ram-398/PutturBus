import { MetadataRoute } from 'next';
import { getAllRouteSlugs, getAllDestinationSlugs } from '@/lib/seo-data';

const BASE_URL = 'https://putturbus.com'; // Change if needed

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = getAllRouteSlugs();
    const destinations = getAllDestinationSlugs();

    // 1. Static Pages
    const staticPages = [
        '',
        '/puttur-bus-stand',
        '/directory', // Assuming this exists
    ].map(route => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
    }));

    // 2. Route Pages
    const routeUrls = routes.map(({ slug }) => ({
        url: `${BASE_URL}/route/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.8,
    }));

    // 3. Destination Pages
    const destinationUrls = destinations.map(({ slug }) => ({
        url: `${BASE_URL}/destinations/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    // 4. Timetable Pages
    const timetableUrls = routes.map(({ slug }) => ({
        url: `${BASE_URL}/timetable/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    return [
        ...staticPages,
        ...routeUrls,
        ...destinationUrls,
        ...timetableUrls
    ];
}
