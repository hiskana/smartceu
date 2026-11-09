// @vitest-environment node
import { beforeAll, afterAll, describe, it, expect, vi } from "vitest";
import { NetlifyDB } from "@netlify/database-dev";
import pg from "pg";
let pool: pg.Pool;
vi.mock("@netlify/database", () => ({ getDatabase: () => ({ pool }) }));
import handler from "../../netlify/functions/hub.mts";
let server: NetlifyDB;
beforeAll(async () => {
  server = new NetlifyDB();
  const connectionString = await server.start();
  await server.applyMigrations("./netlify/database/migrations");
  pool = new pg.Pool({ connectionString });
}, 60000);
afterAll(async () => {
  await pool?.end();
  await server?.stop();
});
const req = (body: unknown) =>
  new Request("https://smartceu.netlify.app/api/hub", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "https://smartceu.netlify.app",
    },
    body: JSON.stringify(body),
  });
describe("shared Hub storage", () => {
  it("seeds the board and reads shared data", async () => {
    const response = await handler(
      new Request("https://smartceu.netlify.app/api/hub"),
    );
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.tasks).toHaveLength(13);
    expect(data.posts).toEqual([]);
  });
  it("preserves separate posts and makes retried submissions idempotent", async () => {
    const first = {
      action: "post",
      post: {
        id: crypto.randomUUID(),
        author: "Matthew",
        kind: "Idea",
        body: "Interview PT learners",
      },
    };
    const second = {
      action: "post",
      post: {
        id: crypto.randomUUID(),
        author: "Iska",
        kind: "Update",
        body: "Prepare course review",
      },
    };
    await Promise.all([handler(req(first)), handler(req(second))]);
    await handler(req(first));
    const data = await (
      await handler(new Request("https://smartceu.netlify.app/api/hub"))
    ).json();
    expect(data.posts).toHaveLength(2);
    expect(data.posts.map((p: { body: string }) => p.body)).toContain(
      "Interview PT learners",
    );
  });
  it("rejects stale task updates rather than overwriting a newer move", async () => {
    const data = await (
      await handler(new Request("https://smartceu.netlify.app/api/hub"))
    ).json();
    const task = data.tasks[0];
    const a = await handler(
      req({
        action: "update",
        task: { ...task, status: "Doing" },
        version: task.version,
      }),
    );
    expect(a.status).toBe(200);
    const b = await handler(
      req({
        action: "update",
        task: { ...task, status: "To Do" },
        version: task.version,
      }),
    );
    expect(b.status).toBe(409);
  });
  it("validates posts and refuses cross-origin writes", async () => {
    expect(
      (
        await handler(
          req({
            action: "post",
            post: {
              id: crypto.randomUUID(),
              author: "Other",
              kind: "Idea",
              body: "x",
            },
          }),
        )
      ).status,
    ).toBe(400);
    expect(
      (
        await handler(
          new Request("https://smartceu.netlify.app/api/hub", {
            method: "POST",
            headers: { Origin: "https://other.example" },
            body: "{}",
          }),
        )
      ).status,
    ).toBe(403);
  });
});
