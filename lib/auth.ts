import { cookies } from "next/headers";
import { SESSION_COOKIE } from "./security";
import { findUserBySessionToken } from "./store";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return findUserBySessionToken(token);
}

export async function requireCurrentUser() {
  const user = await getCurrentUser();
  if (!user) return null;
  return user;
}