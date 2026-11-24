// Day one, day seven — TikTok video entry.
// The entry is the video itself; this program only hands VIDEO.json to the
// grader. It copies VIDEO.json from the repository root to /output/VIDEO.json
// and nothing else: no network, no clock, no files outside the repository.

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
try {
  // Fail fast on a malformed VIDEO.json instead of handing the grader a
  // dead link: it must name the posted TikTok video's full address.
  const video = JSON.parse(readFileSync(join(botDir, "VIDEO.json"), "utf8")) as {
    url?: unknown;
  };
  if (typeof video.url !== "string" || !video.url.startsWith("https://www.tiktok.com/")) {
    throw new Error("VIDEO.json has no TikTok video url");
  }
  copyFileSync(join(botDir, "VIDEO.json"), join(outDir, "VIDEO.json"));
  console.log(`handing over ${video.url}`);
} catch (err) {
  console.error(`VIDEO.json could not be copied from ${botDir}: ${(err as Error).message}`);
  process.exit(1);
}
