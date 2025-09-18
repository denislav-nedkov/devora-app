import { z } from "zod";
import { cookieSchemas } from "@/schemas/cookie";

export interface CookieOptions {
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: "strict" | "lax" | "none";
    path?: string;
    domain?: string;
    maxAge?: number; // seconds
    expires?: Date;
    priority?: "low" | "medium" | "high";
}

export type CookieResult<T> =
    | { success: true; data: T }
    | { success: false; error: string };

export type CookieSchemas = typeof cookieSchemas;
export type CookieName = keyof CookieSchemas;
export type CookieValue<T extends CookieName> = z.infer<
    CookieSchemas[T]["schema"]
>;
