"use client";

import { useSearchParams } from "next/navigation";
import { RoutePageClient } from "@/components/RoutePageClient";
import { IntercityRoutePageClient } from "@/components/IntercityRoutePageClient";

interface ClientRouteViewProps {
    slug: string;
    isIntercity: boolean;
}

export default function ClientRouteView({ slug, isIntercity }: ClientRouteViewProps) {
    // We can use searchParams here safely if needed in the future
    const searchParams = useSearchParams();

    // Render the appropriate client component
    if (isIntercity) {
        return <IntercityRoutePageClient slug={slug} />;
    }

    return <RoutePageClient slug={slug} />;
}
