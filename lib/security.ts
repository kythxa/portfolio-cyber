export const SESSION_COOKIE = "portfolio_session";
export const SESSION_TTL_DAYS = 14;

const encoder = new TextEncoder();

function bytesToBase64Url(bytes: Uint8Array) {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToBytes(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((value.length + 3) % 4);
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

export function createSessionToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return bytesToBase64Url(bytes);
}

export async function sha256Hex(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(value));
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function constantTimeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i += 1) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export async function hashPassword(password: string) {
  const salt = new Uint8Array(16);
  crypto.getRandomValues(salt);

  const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: 120000, hash: "SHA-256" },
    key,
    256,
  );

  return `pbkdf2$120000$${bytesToBase64Url(salt)}$${bytesToBase64Url(new Uint8Array(bits))}`;
}

export async function verifyPassword(password: string, stored: string) {
  const [algorithm, iterations, saltB64, hashB64] = stored.split("$");
  if (algorithm !== "pbkdf2" || !iterations || !saltB64 || !hashB64) return false;

  const salt = base64UrlToBytes(saltB64);
  const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: Number(iterations), hash: "SHA-256" },
    key,
    256,
  );
  const candidate = bytesToBase64Url(new Uint8Array(bits));
  return constantTimeEqual(candidate, hashB64);
}

export function sessionExpiresAt() {
  return new Date(Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000).toISOString();
}