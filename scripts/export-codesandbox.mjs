import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const FILES = [
  "package.json",
  "vite.config.ts",
  "tsconfig.json",
  "index.html",
  "src/main.tsx",
  "src/App.tsx",
  "src/index.css",
  "src/docx.ts",
  // the predev hook calls it; with no .docx in the sandbox root it exits 0 gracefully
  "scripts/embed-docx.mjs",
  "README.md",
];
if (!/DOCX_BASE64 =\n\s+"/.test(readFileSync(root + "src/docx.ts", "utf8"))) {
  console.error("export: src/docx.ts still holds the placeholder — run node scripts/embed-docx.mjs with the .docx in the root first");
  process.exit(1);
}
const files = Object.fromEntries(FILES.map((f) => [f, { content: readFileSync(root + f, "utf8") }]));
const response = await fetch("https://codesandbox.io/api/v1/sandboxes/define?json=1", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ files }),
});
if (!response.ok) {
  console.error(`export: define failed (${response.status}): ${(await response.text()).slice(0, 200)}`);
  process.exit(1);
}
const { sandbox_id: id } = await response.json();
const url = `https://codesandbox.io/s/${id}`;
console.log(`export: ${url} — open it (logged in) and Fork to keep it under your account`);
