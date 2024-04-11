import * as z from "zod";


export const OperatingCostsSchema = z.object({
    "electricity_cost": z.number().positive(),
    "maintenance_cost": z.number().positive(),
    "network_costs": z.number().positive(),
    "oc_period_end": z.coerce.date(),
    "oc_period_start": z.coerce.date(),
    "oc_year": z.string().regex(/^[0-9][0-9][0-9][0-9]$/),
    "repair_cost": z.number().positive(),
    "station_id": z.string(),
    "station_mr": z.number(),
});

import { OperatingCosts } from '../types-evchargingspec/operating-costs.js';

export function parseOperatingCosts(data: any)
    : OperatingCosts
{
    return OperatingCostsSchema.parse(data) as OperatingCosts;
}

export function safeParseOperatingCosts(data: any)
    : z.SafeParseReturnType<any, OperatingCosts>
{
    return OperatingCostsSchema.safeParse(data);
}
