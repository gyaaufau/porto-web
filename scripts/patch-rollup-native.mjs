import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const targetPath = resolve("node_modules/rollup/dist/native.js");

if (!existsSync(targetPath)) {
  process.exit(0);
}

const source = readFileSync(targetPath, "utf8");
const originalSnippet =
  "const { parse, parseAsync, xxhashBase64Url, xxhashBase36, xxhashBase16 } = requireWithFriendlyError(\n" +
  "\texistsSync(path.join(__dirname, localName)) ? localName : `@rollup/rollup-${packageBase}`\n" +
  ");";

const patchedSnippet =
  "let rollupBinding;\n\n" +
  "try {\n" +
  "\trollupBinding = requireWithFriendlyError(\n" +
  "\t\texistsSync(path.join(__dirname, localName)) ? localName : `@rollup/rollup-${packageBase}`\n" +
  "\t);\n" +
  "} catch {\n" +
  "\trollupBinding = require('@rollup/wasm-node/dist/native.js');\n" +
  "}\n\n" +
  "const { parse, parseAsync, xxhashBase64Url, xxhashBase36, xxhashBase16 } = rollupBinding;";

if (source.includes("rollupBinding = require('@rollup/wasm-node/dist/native.js');")) {
  process.exit(0);
}

if (!source.includes(originalSnippet)) {
  console.warn("Rollup native patch skipped: expected snippet not found.");
  process.exit(0);
}

writeFileSync(targetPath, source.replace(originalSnippet, patchedSnippet));
