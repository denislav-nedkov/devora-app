"use server";

import { z } from "zod";
import { encrypt, decrypt } from "@/lib/crypto";
import { cookieSchemas } from "@/schemas/cookie";
import { cookies as baseCookies } from "next/headers";
import { CookieName, CookieOptions, CookieResult, CookieValue } from "@/types/cookies";

const DEFAULT_COOKIE_OPTIONS: CookieOptions = {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    priority: "medium",
};

class CookieManager {
    private static getDefaultOptions(overrides?: CookieOptions): CookieOptions {
        return { ...DEFAULT_COOKIE_OPTIONS, ...overrides };
    }

    static async get<T extends string>(
        name: T
    ): Promise<
        T extends CookieName
        ? CookieResult<CookieValue<T> | undefined>
        : CookieResult<string | any | undefined>
    > {
        try {
            const cookieStore = await baseCookies();
            const cookie = cookieStore.get(name);

            if (!cookie?.value) {
                return { success: true, data: undefined } as any;
            }

            if (name in cookieSchemas) {
                const { schema, isEncrypted } = cookieSchemas[name as CookieName];

                let raw: string;
                try {
                    raw = isEncrypted ? decrypt(cookie.value) : cookie.value;
                } catch {
                    return {
                        success: false,
                        error: `Failed to decrypt cookie '${name}'`,
                    } as any;
                }

                let parsed: any;
                try {
                    parsed = JSON.parse(raw);
                } catch {
                    return {
                        success: false,
                        error: `Invalid JSON in cookie '${name}'`,
                    } as any;
                }

                try {
                    const validated = schema.parse(parsed);
                    return { success: true, data: validated } as any;
                } catch (err) {
                    if (err instanceof z.ZodError) {
                        return {
                            success: false,
                            error: `Invalid data for cookie '${name}': ${err.message}`,
                        } as any;
                    }
                    return {
                        success: false,
                        error: `Validation failed for cookie '${name}'`,
                    } as any;
                }
            }

            return { success: true, data: cookie.value } as any;
        } catch (error) {
            return {
                success: false,
                error: `Failed to get cookie '${name}': ${error}`,
            } as any;
        }
    }

    static async set<T extends string>(
        name: T,
        value: T extends CookieName
            ? CookieValue<T>
            : string | object | number | boolean,
        options?: CookieOptions
    ): Promise<CookieResult<void>> {
        try {
            const cookieStore = await baseCookies();
            const cookieOptions = this.getDefaultOptions(options);

            let stringValue: string;

            if (name in cookieSchemas) {
                const { schema, isEncrypted } = cookieSchemas[name as CookieName];
                const validated = schema.parse(value);

                const json = JSON.stringify(validated);
                stringValue = isEncrypted ? encrypt(json) : json;
            } else if (typeof value === "string") {
                stringValue = value;
            } else {
                stringValue = JSON.stringify(value);
            }

            cookieStore.set(name, stringValue, cookieOptions);
            return { success: true, data: undefined };
        } catch (error) {
            return {
                success: false,
                error: `Failed to set cookie '${name}': ${error}`,
            };
        }
    }

    static async delete(name: string): Promise<CookieResult<void>> {
        try {
            const cookieStore = await baseCookies();
            cookieStore.delete(name);
            return { success: true, data: undefined };
        } catch (err) {
            return {
                success: false,
                error: `Failed to delete cookie '${name}': ${err}`,
            };
        }
    }
}

export async function getCookie<T extends string>(
    name: T,
) {
    return CookieManager.get(name);
}

export async function setCookie<T extends string>(
    name: T,
    value: T extends CookieName
        ? CookieValue<T>
        : string | object | number | boolean,
    options?: CookieOptions
) {
    return CookieManager.set(name, value, options);
}

export async function deleteCookie(name: string) {
    return CookieManager.delete(name);
}
