/**
 * PHASE 1: Time Engine
 * Core utility for manipulating transit time.
 * 
 * Rules:
 * 1. STRICT SOURCE OF TRUTH: Local System Time.
 * 2. All display outputs MUST be 12-hour format (AM/PM).
 * 3. All internal calculations MUST be in minutes from midnight.
 */

/**
 * Get current local minutes from midnight (0-1439).
 */
export function getCurrentMinutes(): number {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
}

/**
 * Convert 24h string ("14:30") or 12h string ("2:30 PM") to minutes.
 */
export function minutesFromTime(timeString: string): number {
    if (!timeString) return 0;

    // Normalize string
    const s = timeString.trim().toLowerCase();

    let hours = 0;
    let minutes = 0;

    // Check for AM/PM
    const isPM = s.includes('pm');
    const isAM = s.includes('am');

    // Remove text to get numbers
    const cleanTime = s.replace('pm', '').replace('am', '').trim();
    const parts = cleanTime.split(':');

    if (parts.length >= 2) {
        hours = parseInt(parts[0], 10);
        minutes = parseInt(parts[1], 10);
    }

    // Adjust for 12h format
    if (isPM && hours < 12) hours += 12;
    if (isAM && hours === 12) hours = 0;

    // Fallback for 24h format (no AM/PM detected)
    // If user provides "14:00" without PM, it's 14:00 (PM). 
    // If "2:00" without PM, it's 2:00 (AM).

    return hours * 60 + minutes;
}

/**
 * Convert minutes to strictly formatted 12-hour string (e.g., "7:15 PM").
 * Handles day rollover (minutes > 1440).
 */
export function timeFromMinutes(totalMinutes: number): string {
    // Handle day rollover (e.g., 25:00 -> 1:00 AM)
    // Fix: Ensure we are working with integers to avoid "7:17.02999 PM"
    const integerMinutes = Math.floor(totalMinutes);
    let normalizedMinutes = integerMinutes % 1440;
    if (normalizedMinutes < 0) normalizedMinutes += 1440;

    const h = Math.floor(normalizedMinutes / 60);
    const m = normalizedMinutes % 60;

    const h12 = h % 12 || 12; // 0 -> 12
    const suffix = h >= 12 ? 'PM' : 'AM';

    return `${h12}:${m.toString().padStart(2, '0')} ${suffix}`;
}

/**
 * Format a time string (24h or 12h) into strict 12-hour format.
 */
export function format12h(timeString: string): string {
    return timeFromMinutes(minutesFromTime(timeString));
}

/**
 * Add minutes to a time string and return new 12-hour time string.
 */
export function addMinutes(startBaseTime: string, minsToAdd: number): string {
    const startMins = minutesFromTime(startBaseTime);
    return timeFromMinutes(startMins + minsToAdd);
}
