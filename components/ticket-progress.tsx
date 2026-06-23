"use client";

import type { TicketStatus } from "@/lib/store";

const steps = [
  { key: "sent", label: "Envoyé" },
  { key: "pending", label: "En attente" },
  { key: "decision", label: "Décision" },
  { key: "investigation", label: "Enquête" },
  { key: "resolved", label: "Résolu" },
] as const;

function progressIndex(status: TicketStatus) {
  switch (status) {
    case "sent":
      return 0;
    case "pending":
      return 1;
    case "accepted":
      return 2;
    case "refused":
      return 2;
    case "investigation":
      return 3;
    case "resolved":
      return 4;
    default:
      return 0;
  }
}

export function TicketProgress({ status }: { status: TicketStatus }) {
  const current = progressIndex(status);

  return (
    <ol className="ticket-steps" aria-label="Progression de la mission">
      {steps.map((step, index) => {
        const done = index < current || (status === "resolved" && index <= current);
        const active = index === current;
        const isRefused = step.key === "decision" && status === "refused";

        let label: string = step.label;
        if (step.key === "decision") {
          label = status === "refused" ? "Refusée" : status === "accepted" || status === "investigation" || status === "resolved" ? "Acceptée" : "Accepté / refusé";
        }

        return (
          <li
            key={step.key}
            className={
              isRefused
                ? "ticket-step refused"
                : done
                  ? "ticket-step done"
                  : active
                    ? "ticket-step active"
                    : "ticket-step"
            }
          >
            <span>{label}</span>
          </li>
        );
      })}
    </ol>
  );
}