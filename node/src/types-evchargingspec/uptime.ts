/**
 * Supports reporting the amount of uptime for a port on a station over a defined period of
 * time.
 */
export interface Uptime {
    /**
     * Total number of excluded outage minutes (including partial minutes)
     * for Port ID in uptime period or Report Year and Month.
     * (For NEVI or other Part 680 project, calculated
     * in accordance with CFR 23 § 680.116(b)).
     */
    outage_excluded: number;
    /**
     * Total number of outage minutes (including partial minutes)
     * for Port ID in in uptime period or Report Year and Month.
     * For NEVI or other Part 680 project, calculated
     * in accordance with CFR 23 § 680.116(b)).
     */
    outage_total: number;
    /**
     * Unique identifier for specified port. (For NEVI or other Part 680 project,
     * port_id must be same as the permanent station identifier provided
     * to third parties pursuant to CFR 23 § 680.116(c)(8)(iii).)
     */
    port_id: string;
    /**
     * Year and month of uptime summary in YYYYMM format
     * if reported monthly (as required by part 680)
     */
    report_yr_mon: string;
    /**
     * Unique identifier for the station where specific port is located.
     * (For NEVI or other Part 680 project, station_id must be same as
     * the permanent station identifier provided to third parties pursuant
     * to CFR 23 § 680.116(c)(1)).
     */
    station_id: string;
    /**
     * Uptime percentage (between 0-100) for Port ID in uptime period
     * or Report Year and Month. (For NEVI or other Part 680 project,
     * calculated in accordance with CFR 23 § 680.116(b)).
     */
    uptime_pct: number;
    /**
     * End date of uptime reporting period.
     */
    uptime_period_end: string;
    /**
     * Start date of uptime reporting period.
     */
    uptime_period_start: string;
    [property: string]: any;
}
