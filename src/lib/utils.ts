import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Encryption utilities for sensitive data
const ENCRYPTION_KEY = "ikea-eats-secure-key-2024"; // In production, use proper key management

export async function encryptData(data: string): Promise<string> {
  // Check if Web Crypto API is available
  if (!crypto || !crypto.subtle) {
    throw new Error("Web Crypto API is not available in this environment");
  }

  try {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);

    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(ENCRYPTION_KEY),
      { name: "AES-GCM" },
      false,
      ["encrypt"]
    );

    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      dataBuffer
    );

    const combined = new Uint8Array(iv.length + encrypted.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(encrypted), iv.length);

    return btoa(String.fromCharCode(...combined));
  } catch (error) {
    console.error("Encryption failed:", error);
    throw new Error("Failed to encrypt data");
  }
}

export async function decryptData(encryptedData: string): Promise<string> {
  // Check if Web Crypto API is available
  if (!crypto || !crypto.subtle) {
    throw new Error("Web Crypto API is not available in this environment");
  }

  try {
    const decoder = new TextDecoder();
    const combined = new Uint8Array(
      atob(encryptedData)
        .split("")
        .map((c) => c.charCodeAt(0))
    );

    const iv = combined.slice(0, 12);
    const encrypted = combined.slice(12);

    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(ENCRYPTION_KEY),
      { name: "AES-GCM" },
      false,
      ["decrypt"]
    );

    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      encrypted
    );

    return decoder.decode(decrypted);
  } catch (error) {
    console.error("Decryption failed:", error);
    throw new Error("Failed to decrypt data");
  }
}

// Simple fallback encryption for environments without Web Crypto API
function simpleEncrypt(data: string): string {
  // This is NOT secure encryption - only for fallback purposes
  const key = ENCRYPTION_KEY;
  let result = "";
  for (let i = 0; i < data.length; i++) {
    const charCode = data.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    result += String.fromCharCode(charCode);
  }
  return btoa(result);
}

function simpleDecrypt(encryptedData: string): string {
  // This is NOT secure decryption - only for fallback purposes
  const key = ENCRYPTION_KEY;
  const data = atob(encryptedData);
  let result = "";
  for (let i = 0; i < data.length; i++) {
    const charCode = data.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    result += String.fromCharCode(charCode);
  }
  return result;
}

// Safe encryption wrapper that falls back to simple encryption if Web Crypto API is unavailable
export async function safeEncryptData(data: string): Promise<string> {
  try {
    return await encryptData(data);
  } catch (error) {
    console.warn(
      "Web Crypto API unavailable, using fallback encryption:",
      error
    );
    return simpleEncrypt(data);
  }
}

export async function safeDecryptData(encryptedData: string): Promise<string> {
  try {
    return await decryptData(encryptedData);
  } catch (error) {
    console.warn(
      "Web Crypto API unavailable, using fallback decryption:",
      error
    );
    try {
      return simpleDecrypt(encryptedData);
    } catch (fallbackError) {
      console.error("Fallback decryption also failed:", fallbackError);
      throw new Error("Failed to decrypt data");
    }
  }
}
