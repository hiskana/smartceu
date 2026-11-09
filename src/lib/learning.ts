import { z } from "zod";
import { previewCourse } from "@/data/learning";

export const storageKey = `smartceu.learning.${previewCourse.id}.${previewCourse.version}`;
const schema = z.object({
  version: z.literal("preview-1"),
  startedAt: z.string().datetime().optional(),
  stage: z.enum(["read", "check", "finish"]).optional(),
  section: z.number().int().min(0).max(2),
  read: z.array(z.number().int().min(0).max(2)),
  answers: z.record(z.number().int().min(0).max(2)),
  attempts: z.array(
    z.object({
      question: z.string(),
      answer: z.number().int().min(0).max(2),
      correct: z.boolean(),
    }),
  ),
  rating: z.string(),
  feedback: z.string().max(2000),
  attested: z.boolean(),
  completedAt: z.string().datetime().optional(),
});
export type LearningProgress = z.infer<typeof schema>;
export const emptyProgress = (): LearningProgress => ({
  version: "preview-1",
  section: 0,
  read: [],
  answers: {},
  attempts: [],
  rating: "",
  feedback: "",
  attested: false,
});
export function hasLearningActivity(p: LearningProgress) {
  return (
    !!p.startedAt ||
    p.read.length > 0 ||
    p.section > 0 ||
    Object.keys(p.answers).length > 0
  );
}
export function canComplete(p: LearningProgress) {
  return (
    previewCourse.sections.every((_, i) => p.read.includes(i)) &&
    previewCourse.questions.every((q) => p.answers[q.id] === q.correct) &&
    ["1", "2", "3", "4", "5"].includes(p.rating) &&
    p.attested
  );
}
export function readProgress(): { progress: LearningProgress; error: boolean } {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return { progress: emptyProgress(), error: false };
    const parsed = schema.safeParse(JSON.parse(raw));
    if (!parsed.success) return { progress: emptyProgress(), error: true };
    const progress = parsed.data;
    if (!canComplete(progress)) delete progress.completedAt;
    const allRead = previewCourse.sections.every((_, i) =>
      progress.read.includes(i),
    );
    const passed = previewCourse.questions.every(
      (q) => progress.answers[q.id] === q.correct,
    );
    if (!allRead) progress.stage = "read";
    else if (progress.stage === "finish" && !passed) progress.stage = "check";
    return { progress, error: false };
  } catch {
    return { progress: emptyProgress(), error: true };
  }
}
export function downloadRecord(p: LearningProgress) {
  if (!p.completedAt || !canComplete(p)) return;
  const blob = new Blob(
    [
      `SmartCEU — PREVIEW COMPLETION RECORD
Not a CE certificate. Awards 0 contact hours.

${previewCourse.title}
Version: ${previewCourse.version}
Completed: ${p.completedAt}
Practice checks: 3/3 correct
Stored on this browser only; no identity verification.
`,
    ],
    { type: "text/plain;charset=utf-8" },
  );
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "smartceu-preview-completion.txt";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
