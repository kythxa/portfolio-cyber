import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default {
  ...defineCloudflareConfig({}),
  // Indispensable : sans cette ligne, OpenNext relance `npm run build`
  // (= `opennextjs-cloudflare build`) pour son étape « Building Next.js app »
  // → récursion infinie du build Cloudflare jusqu'au crash mémoire.
  buildCommand: "npm run build:next",
};
