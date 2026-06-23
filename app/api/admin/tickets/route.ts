import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { listAllTickets } from "@/lib/store";

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const tickets = await listAllTickets();
  return NextResponse.json({ tickets });
}