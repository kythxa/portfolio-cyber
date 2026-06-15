import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Configuration de l'adaptateur OpenNext -> Cloudflare Workers.
// `opennextjs-cloudflare build` builde l'app Next via `buildCommand` (ci-dessous),
// puis génère `.open-next/worker.js` (le point d'entrée attendu par wrangler).
//
// IMPORTANT : `buildCommand` DOIT pointer sur `build:next` (= `next build`) et NON
// sur le script `build` (qui vaut `opennextjs-cloudflare build`) — sinon OpenNext
// se relance lui-même en boucle infinie. Pattern template agence.
//
// Cache incrémental (ISR) optionnel : à activer plus tard via un binding R2/KV
// si le site a besoin de revalidation. Showcase statique -> laissé vide.
const config = defineCloudflareConfig({});

export default { ...config, buildCommand: "npm run build:next" };
