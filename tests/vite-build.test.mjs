import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("Vite build contains a deployable index page and assets", async () => {
  const html = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
  assert.match(html, /<div id="root"><\/div>/);
  assert.match(html, /BLUEWAY/);
  assert.match(html, /\/assets\/[^"']+\.js/);
  await access(new URL("../dist/og.png", import.meta.url));
  await access(new URL("../dist/favicon.svg", import.meta.url));
});
