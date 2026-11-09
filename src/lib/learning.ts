import { z } from "zod";
import { previewCourse } from "@/data/learning";

export const storageKey = `smartceu.learning.${previewCourse.id}.${previewCourse.version}`;
const schema = z.object({
  version: z.literal("preview-1"),
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
    return { progress, error: false };
  } catch {
    return { progress: emptyProgress(), error: true };
  }
}
export function downloadRecord(p: LearningProgress) {
  if (!p.completedAt || !canComplete(p)) return;
  const blob = new Blob(
    [
      `SmartCEU — PREVIEW COMPLETION RECORD\nNot a CE certificate. Awards 0 contact hours.\n\n${previewCourse.title}\nVersion: ${previewCourse.version}\nCompleted: ${p.completedAt}\nPractice checks: 3/3 correct\nStored on this browser only; no identity verification.\n`,
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
