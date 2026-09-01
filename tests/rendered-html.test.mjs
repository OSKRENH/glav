import assert from "node:assert/strict";
import test from "node:test";

test("renders the Etalon home page", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(html, /Группа «Эталон»/);
  assert.match(html, /ЖИТЬ/);
  assert.match(html, /Найти свой адрес/);
  assert.match(html, /РАССТОЯНИЕ/);
  assert.match(html, /project-shagal-hero\.webp/);
  assert.match(html, /project-voxhall-hero\.webp/);
  assert.match(html, /project-nagatino-hero\.webp/);
});

test("renders the Shagal project page", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-project`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://localhost/projects/shagal", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Шагал/);
  assert.match(html, /15 минут/);
  assert.match(html, /Строительство/);
  assert.match(html, /Найти своё/);
  assert.match(html, /Не обещание/);
  assert.match(html, /shagal-architecture\.webp/);
  assert.match(html, /shagal-embankment\.webp/);
  assert.match(html, /shagal-construction\.webp/);
});
