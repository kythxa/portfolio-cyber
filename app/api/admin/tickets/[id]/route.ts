import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { updateTicketStatus } from "@/lib/store";
import type { TicketStatus } from "@/lib/store";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const body = (await request.json().catch(() => null)) as {
    status?: unknown;
    adminNotes?: unknown;
  } | null;

  const status = String(body?.status ?? "sent") as TicketStatus;
  const adminNotes = String(body?.adminNotes ?? "");

  await updateTicketStatus({
    ticketId: id,
    status,
    adminNotes,
    actorId: user.id,
  });

  return NextResponse.json({ ok: true });
}