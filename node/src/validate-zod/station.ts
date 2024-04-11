import * as z from "zod";

// Valid Access Type.

export const AccessTypeSchema = z.enum([
    "commercial_only",
    "private",
    "public",
    "semi_public",
]);

// Valid Distributed Energy Resource Type

export const OnsiteDerTypeSchema = z.enum([
    "fuel_cell",
    "other",
    "solar",
    "stationary_battery",
    "wind",
]);

// Valid Operating Status.

export const OperatingStatusSchema = z.enum([
    "decommissioned",
    "operational",
    "planned",
    "under_construction",
]);

export const StationSchema = z.object({
    "access_type": AccessTypeSchema,
    "der_energy": z.number().positive(),
    "der_power": z.number().positive(),
    "host_email": z.string().email(),
    "host_first_name": z.string(),
    "host_last_name": z.string(),
    "onsite_der": z.boolean(),
    "onsite_der_type": OnsiteDerTypeSchema,
    "operating_status": OperatingStatusSchema,
    "operator_address": z.string(),
    "operator_city": z.string(),
    "operator_name": z.string(),
    "operator_state": z.string(),
    "operator_zip": z.string().regex(/^[0-9][0-9][0-9][0-9][0-9]$/).optional(),
    "site_host_type": z.string(),
    "site_host_type_detail": z.string(),
    "station_address": z.string(),
    "station_city": z.string(),
    "station_county": z.string(),
    "station_id": z.string(),
    "station_lat": z.number().min(-180).max(180),
    "station_lon": z.number().min(-90).max(90),
    "station_name": z.string(),
    "station_state": z.string(),
    "station_zip": z.string().regex(/^[0-9][0-9][0-9][0-9][0-9]$/),
});

import { Station } from '../types-evchargingspec/station.js';

export function parseStation(data: any): Station {
    return StationSchema.parse(data) as Station;
}

export function safeParseStation(data: any)
    : z.SafeParseReturnType<any, Station>
{
    return StationSchema.safeParse(data);
}
