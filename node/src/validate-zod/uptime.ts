import * as z from "zod";

export const UptimeSchema = z.object({
    "outage_excluded": z.number().positive(),
    "outage_total": z.number().positive(),
    "port_id": z.string(),
    "report_yr_mon": z.string().regex(/^[0-9][0-9][0-9][0-9][0-9][0-9]$/),
    "station_id": z.string(),
    "uptime_pct": z.number().min(0).max(1),
    "uptime_period_end": z.coerce.date(),
    "uptime_period_start": z.coerce.date(),
});

import { Uptime } from '../types-evchargingspec/uptime.js';

export function parseUptime(data: any): Uptime {
    return UptimeSchema.parse(data) as Uptime;
}

export function safeParseUptime(data: any)
    : z.SafeParseReturnType<any, Uptime>
{
    return UptimeSchema.safeParse(data);
}
