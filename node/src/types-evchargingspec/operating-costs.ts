/**
 * A product in the catalog
 */
export interface OperatingCosts {
    /**
     * Total amount paid (in USD) for station electricity use during reporting period
     * (estimated if station is not individually metered)
     */
    electricity_cost: number;
    /**
     * Total amount paid (in USD) for maintenance costs during reporting period or year
     */
    maintenance_cost: number;
    /**
     * Total amount paid (in USD) associated with network access,
     * including network service fees, communications costs,
     * transaction fees, etc.
     */
    network_costs: number;
    /**
     * End date of operations costs reporting period
     */
    oc_period_end: string;
    /**
     * Start date of operations costs reporting period
     */
    oc_period_start: string;
    /**
     * Year of operating cost (if reported annually)
     */
    oc_year: string;
    /**
     * Total amount paid (in USD) for repair costs during reporting period of year
     */
    repair_cost: number;
    /**
     * Unique identifier for the station where specific port is located.
     * (For NEVI or other Part 680 project, station_id must be same as
     * the permanent station identifier provided to third parties pursuant
     * to CFR 23 § 680.116(c)(1)).
     */
    station_id: string;
    /**
     * Total maintanence and repair cost incurred (in USD) in reporting period or year
     */
    station_mr: number;
    [property: string]: any;
}
