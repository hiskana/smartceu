export const statuses = ["To Do", "Doing", "Done"] as const;
export const owners = ["Unassigned", "Iska", "Matthew", "Together"] as const;
export const categories = ["App", "Courses", "Strategy", "Marketing"] as const;
export const kinds = [
  "Comment",
  "Idea",
  "Assessment",
  "Strategy",
  "Update",
] as const;
export type HubPost = {
  id: string;
  author: "Iska" | "Matthew";
  kind: (typeof kinds)[number];
  body: string;
  createdAt: string;
};
export type HubTask = {
  id: string;
  title: string;
  details: string;
  status: (typeof statuses)[number];
  owner: (typeof owners)[number];
  category: (typeof categories)[number];
  sourcePost?: string | null;
  version: number;
  createdAt: string;
  updatedAt: string;
};
export type HubData = {
  tasks: HubTask[];
  posts: HubPost[];
  serverTime: string;
};
export async function fetchHub(): Promise<HubData> {
  const response = await fetch("/api/hub", { cache: "no-store" });
  if (
    !response.ok ||
    !response.headers.get("content-type")?.includes("application/json")
  )
    throw new Error("Shared Hub is unavailable. Refresh or try again shortly.");
  const data = await response.json();
  if (!Array.isArray(data.tasks) || !Array.isArray(data.posts))
    throw new Error(
      "Shared Hub is not connected on this preview server. Open the published Hub or use Netlify Dev.",
    );
  return data;
}
export async function changeHub(body: unknown) {
  const response = await fetch("/api/hub", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(
      data?.error ?? "Could not confirm this change was saved. Please retry.",
    );
  }
}
