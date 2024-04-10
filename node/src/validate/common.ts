
import { promises as fsp } from 'node:fs';
import Ajv from "ajv";

type errorResult = {
    result?: string;
    errors?: any[];
}

export function serializerJSON<T>(data: T, validator: Ajv.ValidateFunction<T>): errorResult {
    if (validator(data)) {
        return { result: JSON.stringify(data) };
    } else {
        if (validator.errors) {
            return { errors: validator.errors };
        } else {
            return { errors: [ 'UNKNOWN ERROR' ]};
        }
    }
}

export function validator<T>(data: T, validator: Ajv.ValidateFunction<T>): boolean {
    if (validator(data)) {
        return true;
    } else {
        return false;
    }
}


export function parserJSON<T>(data: string, validator: Ajv.ValidateFunction<T>): T | undefined {
    if (data && typeof data === 'string') {
        const ret: T = JSON.parse(data);
        if (validator(ret)) {
            return ret;
        } else {
            // TODO how to indicate the errors
            return undefined;
        }
    } else {
        return undefined;
    }
}

export async function readJSONSchema(fn: string): Promise<any | undefined> {

    const _json = await fsp.readFile(fn, 'utf-8');
    try {
        const _schema = JSON.parse(_json);

        return _schema;
    } catch (err) {
        return undefined;
    }

}