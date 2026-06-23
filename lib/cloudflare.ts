import { getCloudflareContext } from "@opennextjs/cloudflare";

type CloudflareEnv = {
  DB: D1Database;
};

export function getDb() {
  const { env } = getCloudflareContext();
  return (env as CloudflareEnv).DB;
}