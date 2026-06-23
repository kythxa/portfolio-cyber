import { NextResponse } from "next/server";
import { createSession, findUserByEmail } from "@/lib/store";
import { createSessionToken, sessionExpiresAt, SESSION_COOKIE, verifyPassword } from "@/lib/security";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    email?: unknown;
    password?: unknown;
  } | null;

  const email = String(body?.email ?? "").trim().toLowerCase();
  const password = String(body?.password ?? "");

  if (!email || !password) {
    return NextResponse.json({ error: "Email et mot de passe requis." }, { status: 400 });
  }

  const user = await findUserByEmail(email);
  if (!user) {
    return NextResponse.json({ error: "Identifiants invalides." }, { status: 401 });
  }

  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) {
    return NextResponse.json({ error: "Identifiants invalides." }, { status: 401 });
  }

  const token = createSessionToken();
  await createSession(user.id, token, sessionExpiresAt());

  const response = NextResponse.json({
    ok: true,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    redirectTo: user.role === "admin" ? "/admin" : "/member",
  });

  response.cookies.set({
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });

  return response;
}