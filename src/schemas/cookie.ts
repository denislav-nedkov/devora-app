import { z } from "zod";

// This is test schema

export const cookieSchemas = {
    userSession: {
        schema: z.object({
            userId: z.string(),
            email: z.email(),
            role: z.enum(["user", "admin", "moderator"]),
            expiresAt: z.number(),
        }),
        isEncrypted: true, // 🔐 sensitive info
    },
    preferences: {
        schema: z.object({
            theme: z.enum(["light", "dark", "system"]),
            language: z.string().min(2).max(5),
            notifications: z.boolean(),
        }),
        isEncrypted: true,
    },
    cart: {
        schema: z.array(
            z.object({
                id: z.string(),
                quantity: z.number().positive(),
                addedAt: z.number(),
            })
        ),
        isEncrypted: false,
    },
} as const;
