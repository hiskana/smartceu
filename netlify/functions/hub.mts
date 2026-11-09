import { getDatabase } from "@netlify/database";
import { z } from "zod";
import type { Config } from "@netlify/functions";

const task = z.object({
  id: z.string().uuid(),
  title: z.string().trim().min(1).max(160),
  details: z.string().trim().max(4000),
  status: z.enum(["To Do", "Doing", "Done"]),
  owner: z.enum(["Unassigned", "Iska", "Matthew", "Together"]),
  category: z.enum(["App", "Courses", "Strategy", "Marketing"]),
  sourcePost: z.string().uuid().nullable().optional(),
});
const post = z.object({
  id: z.string().uuid(),
  author: z.enum(["Iska", "Matthew"]),
  kind: z.enum(["Comment", "Idea", "Assessment", "Strategy", "Update"]),
  body: z.string().trim().min(1).max(8000),
});
const action = z.discriminatedUnion("action", [
  z.object({ action: z.literal("post"), post }),
  z.object({ action: z.literal("task"), task }),
  z.object({
    action: z.literal("update"),
    task,
    version: z.number().int().positive(),
  }),
]);
const taskColumns =
  'id, title, details, status, owner, category, source_post AS "sourcePost", version, created_at AS "createdAt", updated_at AS "updatedAt"';
const headers = {
  "Cache-Control": "no-store",
  "Content-Type": "application/json",
  "X-Content-Type-Options": "nosniff",
};
const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers });
export default async function handler(req: Request) {
  if (!["GET", "POST"].includes(req.method))
    return json({ error: "Method not allowed" }, 405);
  if (
    req.method === "POST" &&
    req.headers.get("origin") &&
    req.headers.get("origin") !== new URL(req.url).origin
  )
    return json({ error: "Use the Hub on this site to make changes." }, 403);
  try {
    const db = getDatabase();
    if (req.method === "GET") {
      const [tasks, posts] = await Promise.all([
        db.pool.query(
          `SELECT ${taskColumns} FROM hub_tasks ORDER BY created_at,id LIMIT 1000`,
        ),
        db.pool.query(
          'SELECT id,author,kind,body,created_at AS "createdAt" FROM hub_posts ORDER BY created_at DESC,id DESC LIMIT 200',
        ),
      ]);
      return json({
        tasks: tasks.rows,
        posts: posts.rows,
        serverTime: new Date().toISOString(),
      });
    }
    if (Number(req.headers.get("content-length")) > 20000)
      return json({ error: "This entry is too long." }, 413);
    const text = await req.text();
    if (text.length > 20000)
      return json({ error: "This entry is too long." }, 413);
    let body: unknown;
    try {
      body = JSON.parse(text);
    } catch {
      return json({ error: "Invalid JSON." }, 400);
    }
    const parsed = action.safeParse(body);
    if (!parsed.success)
      return json(
        { error: "Check the entry fields and length, then try again." },
        400,
      );
    const a = parsed.data;
    if (a.action === "post") {
      const p = a.post;
      const inserted = await db.pool.query(
        "INSERT INTO hub_posts(id,author,kind,body) VALUES($1,$2,$3,$4) ON CONFLICT(id) DO NOTHING RETURNING id",
        [p.id, p.author, p.kind, p.body],
      );
      if (!inserted.rowCount) {
        const previous = await db.pool.query(
          "SELECT author,kind,body FROM hub_posts WHERE id=$1",
          [p.id],
        );
        const existing = previous.rows[0];
        if (
          existing.author !== p.author ||
          existing.kind !== p.kind ||
          existing.body !== p.body
        )
          return json(
            {
              error:
                "An earlier version of this post was already saved. Copy your changed text, refresh, and submit it as a new post.",
            },
            409,
          );
      }
      return json({ ok: true }, 201);
    }
    const t = a.task;
    if (a.action === "task") {
      await db.pool.query(
        "INSERT INTO hub_tasks(id,title,details,status,owner,category,source_post) VALUES($1,$2,$3,$4,$5,$6,$7) ON CONFLICT(id) DO NOTHING",
        [
          t.id,
          t.title,
          t.details,
          t.status,
          t.owner,
          t.category,
          t.sourcePost ?? null,
        ],
      );
      return json({ ok: true }, 201);
    }
    const result = await db.pool.query(
      "UPDATE hub_tasks SET title=$1,details=$2,status=$3,owner=$4,category=$5,version=version+1,updated_at=now() WHERE id=$6 AND version=$7 RETURNING id",
      [t.title, t.details, t.status, t.owner, t.category, t.id, a.version],
    );
    if (!result.rowCount)
      return json(
        {
          error:
            "This task changed on another device. The board has refreshed; reopen the task to edit its latest version.",
        },
        409,
      );
    return json({ ok: true });
  } catch (error) {
    console.error(
      "Hub storage request failed",
      error instanceof Error ? error.message : "Unknown error",
    );
    return json(
      {
        error:
          "Shared storage is unavailable. Your entry has not been confirmed saved. Please retry shortly.",
      },
      503,
    );
  }
}
export const config: Config = {
  path: "/api/hub",
  rateLimit: {
    windowSize: 60,
    windowLimit: 100,
    aggregateBy: ["ip", "domain"],
  },
};
