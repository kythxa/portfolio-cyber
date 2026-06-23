import { NextResponse } from "next/server";
import { createTicket, listTicketsForUser } from "@/lib/store";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const tickets = await listTicketsForUser(user);
  return NextResponse.json({ tickets });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    requesterName?: unknown;
    requesterEmail?: unknown;
    title?: unknown;
    category?: unknown;
    urgency?: unknown;
    description?: unknown;
  } | null;

  const requesterName = String(body?.requesterName ?? "").trim();
  const requesterEmail = String(body?.requesterEmail ?? "").trim().toLowerCase();
  const title = String(body?.title ?? "").trim();
  const category = String(body?.category ?? "").trim();
  const urgency = String(body?.urgency ?? "normal").trim();
  const description = String(body?.description ?? "").trim();

  if (!requesterName || !requesterEmail || !title || !category || !description) {
    return NextResponse.json({ error: "Tous les champs principaux sont requis." }, { status: 400 });
  }

  const authUser = await getCurrentUser();
  const ticket = await createTicket({
    userId: authUser?.id ?? null,
    requesterName: authUser?.name ?? requesterName,
    requesterEmail: authUser?.email ?? requesterEmail,
    title,
    category,
    urgency,
    description,
  });

  return NextResponse.json(
    {
      ok: true,
      ticket,
      message:
        "Votre demande a bien été envoyée. Pour suivre son état, vous pouvez vous connecter à votre espace membre.",
    },
    { status: 201 },
  );
}