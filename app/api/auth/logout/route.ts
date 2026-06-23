import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { destroySession } from "@/lib/store";
import { SESSION_COOKIE } from "@/lib/security";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (token) {
    await destroySession(token);
  }

  const response = NextResponse.json({ ok: true, redirectTo: "/" });
  response.cookies.set({
    name: SESSION_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}