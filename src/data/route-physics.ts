/**
 * PHASE 2: Route Physics
 * Physical reality engine for the app.
 * 
 * Defines the real-world distance and travel time for key destinations.
 * These values are used to calculate arrival times and simulate bus movement.
 */

export interface PhysicsProfile {
    distanceKm: number;
    durationMin: number;
}

// Key is the normalized lowercase destination slug/name
export const ROUTE_PHYSICS: Record<string, PhysicsProfile> = {
    "sulya": {
        distanceKm: 31,
        durationMin: 58
    },
    "statebank": {
        distanceKm: 52,
        durationMin: 90
    },
    "mangalore": {
        distanceKm: 58,
        durationMin: 95
    },
    "mysore": {
        distanceKm: 130,
        durationMin: 210
    },
    "bc road": {
        distanceKm: 42,
        durationMin: 65
    },
    "uppinangady": {
        distanceKm: 12,
        durationMin: 25
    },
    "kukke subrahmanya": {
        distanceKm: 45,
        durationMin: 85
    },
    "dharmasthala": {
        distanceKm: 55,
        durationMin: 90
    }
};

/**
 * Get physics profile for a destination.
 * Falls back to generic physics if exact match not found.
 */
export function getRoutePhysics(destination: string): PhysicsProfile {
    const key = destination.toLowerCase().trim();

    if (ROUTE_PHYSICS[key]) {
        return ROUTE_PHYSICS[key];
    }

    // Generic Fallback (Physics approx: 30km/h average speed in ghat sections)
    // We assume a generic distance if not strictly defined, or just return defaults
    return {
        distanceKm: 40,
        durationMin: 60
    };
}
