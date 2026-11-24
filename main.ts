// Day one, day seven — TikTok video entry.
// The entry is the video itself; this program only hands VIDEO.json to the
// grader. It copies VIDEO.json from the repository root to /output/VIDEO.json
// and nothing else: no network, no clock, no files outside the repository.

import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
try {
  copyFileSync(join(botDir, "VIDEO.json"), join(outDir, "VIDEO.json"));
} catch (err) {
  console.error(`VIDEO.json could not be copied from ${botDir}: ${(err as Error).message}`);
  process.exit(1);
}
