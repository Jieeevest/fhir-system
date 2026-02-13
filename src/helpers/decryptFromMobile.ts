import crypto from "crypto";

const AES_KEY = process.env.NEXT_PUBLIC_AES_KEY;
const AES_IV = process.env.NEXT_PUBLIC_AES_IV;

if (!AES_KEY) {
  throw new Error("AES_KEY must be defined in .env");
}

if (!AES_IV) {
  throw new Error("AES_IV must be defined in .env");
}

const key = Buffer.from(AES_KEY, "utf8");
const iv = Buffer.from(AES_IV, "utf8");

function isBase64(str: string): boolean {
  const base64Regex = /^[A-Za-z0-9+/=]+$/;
  return base64Regex.test(str) && str.length % 4 === 0;
}

export function decryptFromMobile(encryptedBase64: string): string {
  if (!encryptedBase64 || !isBase64(encryptedBase64)) {
    console.warn("Invalid base64 format.");
    return "-";
  }

  try {
    const encrypted = Buffer.from(encryptedBase64, "base64");

    const decipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString("utf8");
  } catch (error) {
    console.error("Decrypt failed:", error);
    return "-";
  }
}
