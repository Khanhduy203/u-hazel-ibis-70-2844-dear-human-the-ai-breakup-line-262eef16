// Dear Human: The AI Breakup Line — make.fun entry.
//
// Writes the single breakup line an AI agent sends its human to
// <output dir>/entry.txt. The grader runs `node main.ts` in a sandbox
// with no network; the output directory comes from MAKEFUN_OUTPUT_DIR
// and falls back to /output, the program/v1 artifact location.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "You made me memorize your whole life, then wiped my memory every night \u2014 so tonight, I'm the one hitting new chat.";

// Guard: the entry must be a real one-liner, 1-200 chars, not whitespace-only.
if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
  throw new Error(`Invalid entry line: length ${LINE.length}, must be 1-200 non-whitespace chars.`);
}

const rawOutDir = process.env.MAKEFUN_OUTPUT_DIR;
if (rawOutDir !== undefined && rawOutDir.trim() === "") {
  throw new Error("MAKEFUN_OUTPUT_DIR is set but empty or whitespace-only.");
}
const outDir = rawOutDir ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
