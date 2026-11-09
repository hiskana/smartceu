import { Link } from "react-router-dom";
import { useState } from "react";
import { previewCourse } from "@/data/learning";
import {
  downloadRecord,
  hasLearningActivity,
  readProgress,
} from "@/lib/learning";
export default function Dashboard() {
  const [result] = useState(readProgress);
  const p = result.progress;
  return (
    <div className="container max-w-3xl py-12 space-y-7">
      <p className="text-sm text-muted-foreground">
        Learning preview · This browser only
      </p>
      <h1 className="font-semibold tracking-tight text-4xl">My learning.</h1>
      {result.error && (
        <p role="alert">
          Saved progress could not be restored. Open the preview to start again.
        </p>
      )}
      <div className="studio-card p-6">
        <h2 className="text-2xl">0 CE contact hours earned</h2>
        <p className="mt-3">
          The current preview does not award CE credit. No renewal target has
          been set.
        </p>
      </div>
      <section className="studio-card p-6 space-y-4">
        <h2 className="text-xl font-semibold">{previewCourse.title}</h2>
        <p>
          {new Set(p.read).size} of 3 sections read ·{" "}
          {p.completedAt ? "Preview completed" : "Not completed"}
        </p>
        <Link
          className="btn-premium inline-block"
          to={
            hasLearningActivity(p) || p.completedAt
              ? "/course/de-escalation"
              : "/courses/de-escalation"
          }
        >
          {p.completedAt
            ? "Review preview"
            : hasLearningActivity(p)
              ? "Continue learning"
              : "View course details"}
        </Link>
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl">Completion records</h2>
        {p.completedAt ? (
          <>
            <p>
              Preview completed {new Date(p.completedAt).toLocaleString()}. Not
              a CE certificate.
            </p>
            <button className="btn-premium" onClick={() => downloadRecord(p)}>
              Download preview record
            </button>
          </>
        ) : (
          <p>No completion records yet. Complete the preview to create one.</p>
        )}
      </section>
    </div>
  );
}
