import { NextResponse } from "next/server";
import { createSession, createUser, findUserByEmail } from "@/lib/store";
import { createSessionToken, hashPassword, sessionExpiresAt, SESSION_COOKIE } from "@/lib/security";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    name?: unknown;
    email?: unknown;
    password?: unknown;
  } | null;

  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim().toLowerCase();
  const password = String(body?.password ?? "");

  if (!name || !email || password.length < 8) {
    return NextResponse.json(
      { error: "Nom, email et mot de passe d’au moins 8 caractères sont requis." },
      { status: 400 },
    );
  }

  const existing = await findUserByEmail(email);
  if (existing) {
    return NextResponse.json({ error: "Cet email est déjà utilisé." }, { status: 409 });
  }

  const passwordHash = await hashPassword(password);
  const user = await createUser({ name, email, passwordHash });

  const token = createSessionToken();
  await createSession(user.id, token, sessionExpiresAt());

  const response = NextResponse.json({
    ok: true,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    redirectTo: "/member",
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