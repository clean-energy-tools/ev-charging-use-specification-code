import * as z from "zod";

export const OutageSchema = z.object({
    "exempted_outage": z.boolean(),
    "outage_cause": z.string(),
    "outage_duration": z.string().regex(/(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$/),
    "outage_end": z.coerce.date(),
    "outage_id": z.string(),
    "outage_start": z.coerce.date(),
    "port_id": z.string(),
    "station_id": z.string(),
});


import { Outage } from '../types-evchargingspec/outage.js';

export function parseOutage(data: any): Outage {
    return OutageSchema.parse(data) as Outage;
}

export function safeParseOutage(data: any)
    : z.SafeParseReturnType<any, Outage>
{
    return OutageSchema.safeParse(data);
}
