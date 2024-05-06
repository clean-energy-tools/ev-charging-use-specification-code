/**
 * Describes a location where charging stations are installed.  It records the street
 * address, the operating organization, the site host contact, and characteristics of the
 * site.  A station is a collection of charging ports at a given location.
 */
export interface Station {
    /**
     * Valid Access Type.
     */
    access_type: AccessType;
    /**
     * Combined nameplate capacity of onsite energy generation and/or
     * maximum battery discharge capacity in kilowatts (kW).
     */
    der_energy?: number;
    /**
     * Nameplate capacity of onsite energy generation in kW
     */
    der_power?: number;
    /**
     * Station host point of contact email address
     */
    host_email: string;
    /**
     * Station host point of contact first name
     */
    host_first_name: string;
    /**
     * Station host point of contact last name
     */
    host_last_name: string;
    /**
     * Station has distributed energy resource.
     */
    onsite_der: boolean;
    /**
     * Valid Distributed Energy Resource Type
     */
    onsite_der_type?: OnsiteDERType;
    /**
     * Valid Operating Status.
     */
    operating_status: OperatingStatus;
    /**
     * Street address of entity responsible for operation and maintenance of the funded charging
     * station.
     */
    operator_address: string;
    /**
     * City of entity responsible for operation and maintenance of the funded charging station.
     */
    operator_city: string;
    /**
     * Name of entity responsible for operation and maintenance of the funded charging station.
     */
    operator_name: string;
    /**
     * Valid state code of entity responsible for operation and maintenance of the funded
     * charging station.
     */
    operator_state: string;
    /**
     * Valid ZIP Code of entity responsible for operation and maintenance
     * of the of the funded charging station.
     */
    operator_zip?: string;
    /**
     * Type of site host for the charging station. (e.g. public, workplace, MUD)
     */
    site_host_type: string;
    /**
     * Additional detail on site host land use. (e.g. hospital, hotel, parking garage, etc.)
     */
    site_host_type_detail: string;
    /**
     * Street address of charging station.
     */
    station_address: string;
    /**
     * City where charging station is located.
     */
    station_city: string;
    /**
     * Station county (or county analogue)
     */
    station_county: string;
    /**
     * Unique identity specific to the physical location of the station (site) funded by the
     * project.
     * (For NEVI/Part 680 programs, Station ID must be same as the permanent station identifier
     * provided to third parties pursuant to CFR 23 § 680.116(c)(1).
     */
    station_id: string;
    /**
     * Station center WSG84 encoded latitude in decimal degrees to at least 4 decimal places.
     * Valid latitudes are between -90 and 90.
     */
    station_lat: number;
    /**
     * Station center WSG84-encoded longitude in decimal degrees to at least 4 decimal places.
     * Valid longitudes are between -180 and 180
     */
    station_lon: number;
    /**
     * Descriptive name of charging site (e.g., Mercy Hospital)
     */
    station_name: string;
    /**
     * Valid state code of state where station or territory where the station is located.
     */
    station_state: string;
    /**
     * Valid ZIP code of where station is located.
     */
    station_zip: string;
    [property: string]: any;
}

/**
 * Valid Access Type.
 *
 *
 * Valid Access Type.
 */
export type AccessType = "public" | "private" | "semi_public" | "commercial_only";

/**
 * Valid Distributed Energy Resource Type
 *
 *
 * Valid Distributed Energy Resource Type
 */
export type OnsiteDERType = "solar" | "stationary_battery" | "wind" | "fuel_cell" | "other";

/**
 * Valid Operating Status.
 *
 *
 * Valid Operating Status.
 */
export type OperatingStatus = "operational" | "under_construction" | "planned" | "decommissioned";
