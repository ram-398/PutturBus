import { Metadata } from 'next';
import Link from 'next/link';
import { getTopDestinations } from '@/lib/seo-data';
import { MapPin, Info, Phone, Navigation } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Puttur KSRTC Bus Stand Timings & Routes | PutturBus',
    description: 'Complete guide to Puttur KSRTC Bus Stand. View live depot timings, platform information, contact numbers, and all available bus routes.',
};

export default function BusStandPage() {
    const topDestinations = getTopDestinations(10);

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <header className="mb-12 text-center">
                <div className="inline-flex items-center justify-center p-3 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full mb-4">
                    <MapPin className="w-6 h-6" />
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight mb-4">
                    Puttur KSRTC Bus Stand
                </h1>
                <p className="text-xl text-muted-foreground text-balanced">
                    The central hub for all KSRTC buses starting from and passing through Puttur.
                </p>
            </header>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="md:col-span-2 space-y-8">
                    <section className="bg-card rounded-xl border p-6 shadow-sm">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <Info className="w-5 h-5 text-primary" />
                            About the Station
                        </h2>
                        <div className="prose dark:prose-invert">
                            <p>
                                Puttur KSRTC Bus Stand is one of the busiest transport hubs in Dakshina Kannada.
                                It serves as a major depot for buses heading towards Mangalore, Mysore, Bangalore, and rural areas like Sulya and Subrahmanya.
                            </p>
                            <p>
                                The station offers basic amenities including waiting areas, washrooms, and a canteen.
                                High-speed KSRTC Express buses and Airavat Volvos operate from the main platforms.
                            </p>
                        </div>
                    </section>

                    <section className="bg-card rounded-xl border p-6 shadow-sm">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <Navigation className="w-5 h-5 text-primary" />
                            Popular Departures
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-muted-foreground border-b bg-muted/50">
                                    <tr>
                                        <th className="py-3 px-4 font-medium">Destination</th>
                                        <th className="py-3 px-4 font-medium">Frequency</th>
                                        <th className="py-3 px-4 font-medium">First Bus</th>
                                        <th className="py-3 px-4 font-medium">Last Bus</th>
                                        <th className="py-3 px-4 font-medium">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {topDestinations.map((dest, i) => (
                                        <tr key={i} className="hover:bg-muted/50">
                                            <td className="py-3 px-4 font-medium">{dest.destination}</td>
                                            <td className="py-3 px-4">{dest.frequency} daily</td>
                                            <td className="py-3 px-4 text-green-600">{dest.firstBus}</td>
                                            <td className="py-3 px-4 text-red-600">{dest.lastBus}</td>
                                            <td className="py-3 px-4">
                                                <Link
                                                    href={`/timetable/puttur-to-${dest.destination.toLowerCase().replace(/\s+/g, '-')}`}
                                                    className="text-primary hover:underline font-medium"
                                                >
                                                    View Timetable
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-4 text-center">
                            <Link href="/" className="text-primary hover:underline">View All Destinations →</Link>
                        </div>
                    </section>
                </div>

                <div className="space-y-6">
                    <div className="bg-muted p-6 rounded-xl border">
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            Helpline Numbers
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex justify-between">
                                <span className="text-muted-foreground">KSRTC Control Room</span>
                                <a href="tel:08251230101" className="font-medium hover:text-primary">08251-230101</a>
                            </li>
                            <li className="flex justify-between">
                                <span className="text-muted-foreground">Enquiry</span>
                                <a href="tel:08251230102" className="font-medium hover:text-primary">08251-230102</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Embedded Map Section could go here */}
        </div>
    );
}
