/**
 * Supports reporting data about service outages for a Port on a Station.  The reported data
 * includes the start/end time of an outage, and its cause.
 */
export interface Outage {
    /**
     * Is outage exempted under program rules?
     */
    exempted_outage: boolean;
    /**
     * Cause of outage (e.g. equipment failure, power failure, vandalism).
     */
    outage_cause: string;
    /**
     * Duration of outage in minutes (including partial minutes)
     */
    outage_duration: string;
    /**
     * Date and time when outage was resolved.
     */
    outage_end: string;
    /**
     * Unique identifier for an individual outage on an individual port.
     */
    outage_id: string;
    /**
     * Date and time when outage started or was first detected.
     */
    outage_start: string;
    /**
     * Unique identifier for specified port. (For NEVI or other Part 680 project,
     * port_id must be same as the permanent station identifier provided
     * to third parties pursuant to CFR 23 § 680.116(c)(8)(iii).)
     */
    port_id: string;
    /**
     * Unique identifier for the station where specific port is located.
     * (For NEVI or other Part 680 project, station_id must be same as
     * the permanent station identifier provided to third parties pursuant
     * to CFR 23 § 680.116(c)(1)).
     */
    station_id: string;
    [property: string]: any;
}
