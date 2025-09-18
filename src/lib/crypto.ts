import crypto from "crypto";

const ALGO = "aes-256-gcm";
const ENC_KEY = crypto
    .createHash("sha256")
    .update(process.env.COOKIE_SECRET || "dev-secret")
    .digest(); // 32 bytes
const IV_LEN = 16;

export function encrypt(text: string): string {
    const iv = crypto.randomBytes(IV_LEN);
    const cipher = crypto.createCipheriv(ALGO, ENC_KEY, iv);

    const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
    const tag = cipher.getAuthTag();

    return Buffer.concat([iv, tag, encrypted]).toString("base64");
}

export function decrypt(encData: string): string {
    const data = Buffer.from(encData, "base64");
    const iv = data.subarray(0, IV_LEN);
    const tag = data.subarray(IV_LEN, IV_LEN + 16);
    const text = data.subarray(IV_LEN + 16);

    const decipher = crypto.createDecipheriv(ALGO, ENC_KEY, iv);
    decipher.setAuthTag(tag);

    const decrypted = Buffer.concat([decipher.update(text), decipher.final()]);
    return decrypted.toString("utf8");
}
