import { Metadata } from 'next';
import { RoutePageClient } from '@/components/RoutePageClient';
import { IntercityRoutePageClient } from '@/components/IntercityRoutePageClient';
import { findDestination, isIntercityDest } from '@/lib/route-matcher';
import { getAllRouteSlugs, getRouteStats, getRouteFAQ } from '@/lib/seo-data';

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
        return {
            title: 'Bus Route Not Found | PutturBus',
            description: 'The requested bus route information is not available.'
        };
    }

    return {
        title: `Puttur to ${stats.destination} KSRTC Bus Timings | Today's Schedule`,
        description: `Check today's KSRTC buses from Puttur to ${stats.destination}. First bus: ${stats.firstBus}, Last bus: ${stats.lastBus}. Total ${stats.frequency} buses daily with route map and fare info.`,
        openGraph: {
            title: `Puttur to ${stats.destination} Bus Timings`,
            description: `${stats.frequency} buses daily. First: ${stats.firstBus}, Last: ${stats.lastBus}.`,
            type: 'website',
        }
    };
}

export default async function RoutePage({ params }: Props) {
    const { slug } = await params;
    const destName = findDestination(slug);
    const stats = getRouteStats(slug);
    const faqs = stats ? getRouteFAQ(stats) : [];

    // JSON-LD Schema
    const jsonLd = stats ? {
        "@context": "https://schema.org",
        "@type": "BusTrip",
        "name": `Puttur to ${stats.destination} KSRTC`,
        "departureBusStop": {
            "@type": "BusStop",
            "name": "Puttur KSRTC Bus Stand"
        },
        "arrivalBusStop": {
            "@type": "BusStop",
            "name": `${stats.destination} Bus Stand`
        },
        "provider": {
            "@type": "Organization",
            "name": "KSRTC"
        },
        "departureTime": stats.firstBus, // Schematic representation
        "potentialAction": {
            "@type": "SearchAction",
            "target": `https://putturbus.com/route/${slug}`,
            "query-input": "required name=search_term_string"
        }
    } : null;

    // FAQ Schema
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": f.answer
            }
        }))
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Structured Data Injection */}
            {jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            )}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            {/* Main Content */}
            {isIntercityDest(destName) ? (
                <IntercityRoutePageClient slug={slug} />
            ) : (
                <RoutePageClient slug={slug} />
            )}

            {/* SEO Content Injection - Hidden from main visual flow but visible to crawlers/readers at bottom */}
            {stats && (
                <section className="container mx-auto px-4 py-12 max-w-4xl">
                    <div className="prose dark:prose-invert max-w-none">
                        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                        <div className="grid gap-6">
                            {faqs.map((faq, i) => (
                                <div key={i} className="bg-card p-6 rounded-lg border shadow-sm">
                                    <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                                    <p className="text-muted-foreground">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-12 p-6 bg-muted/50 rounded-xl">
                        <h2 className="text-xl font-semibold mb-4">Route Summary</h2>
                        <ul className="space-y-2">
                            <li><strong>Origin:</strong> Puttur KSRTC Bus Stand</li>
                            <li><strong>Destination:</strong> {stats.destination}</li>
                            <li><strong>First Bus:</strong> {stats.firstBus}</li>
                            <li><strong>Last Bus:</strong> {stats.lastBus}</li>
                            <li><strong>Daily Frequency:</strong> ~{stats.frequency} Buses</li>
                        </ul>
                    </div>
                </section>
            )}
        </div>
    );
}
