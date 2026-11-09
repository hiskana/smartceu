import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowRight, BookOpen, Check, HeartHandshake } from "lucide-react";
import { previewCourse as course } from "@/data/learning";
import { hasLearningActivity, readProgress } from "@/lib/learning";

export default function CourseDetails() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const [{ progress, error }] = useState(readProgress);
  const profession = params.get("profession") === "lvn" ? "lvn" : "pt";
  if (id !== course.id)
    return (
      <div className="container max-w-3xl py-12 space-y-5">
        <h1 className="text-3xl font-semibold">Course unavailable</h1>
        <p>This course is not available yet.</p>
        <Link className="btn-premium inline-block" to="/catalog">
          Browse learning
        </Link>
      </div>
    );
  const active = !error && hasLearningActivity(progress);
  const label = progress.completedAt
    ? "Review learning preview"
    : active
      ? "Continue learning"
      : "Start free preview";
  return (
    <div className="container max-w-4xl py-8 sm:py-12 space-y-8">
      <Link
        to={`/catalog?profession=${profession}`}
        className="text-sm text-primary underline underline-offset-4"
      >
        ← Back to {profession === "lvn" ? "LVN" : "PT"} learning
      </Link>
      <header className="space-y-4">
        <span className="pill inline-block">Free learning preview</span>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight">
          {course.title}
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          A short introduction to noticing changes, communicating respectfully,
          and keeping safety central.
        </p>
        <p className="text-sm">
          For California psychiatric technicians and LVNs.
        </p>
      </header>
      <section
        aria-label="Preview facts"
        className="grid grid-cols-3 gap-3 text-center"
      >
        {[
          { value: "Free", label: "No payment" },
          { value: "3 sections", label: "Read at your pace" },
          { value: "0 CE hours", label: "Clinical review pending" },
        ].map((f) => (
          <div className="rounded-xl bg-secondary p-4" key={f.value}>
            <p className="font-semibold text-sm sm:text-base">{f.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{f.label}</p>
          </div>
        ))}
      </section>
      <div className="rounded-2xl border border-border p-5 space-y-4">
        <p className="text-sm leading-relaxed">
          This draft is not an approved CE course. It does not meet a renewal
          requirement or replace facility training. It is not the planned
          two-hour course.
        </p>
        {error && (
          <p role="alert" className="text-sm">
            Saved progress could not be restored. You can open the preview to
            start again.
          </p>
        )}
        {active && (
          <p className="text-sm text-primary">
            {new Set(progress.read).size} of 3 sections read · Saved in this
            browser
          </p>
        )}
        {progress.completedAt && (
          <p className="text-sm text-primary">
            You completed this preview. Your record is available in My learning.
          </p>
        )}
        <div className="flex flex-wrap gap-4 items-center">
          <Link
            to={`/course/${course.id}`}
            className="btn-premium inline-flex items-center gap-2"
          >
            {label}
            <ArrowRight size={17} />
          </Link>
          {progress.completedAt && (
            <Link to="/dashboard" className="text-sm text-primary underline">
              View completion record
            </Link>
          )}
        </div>
      </div>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold flex gap-2 items-center">
          <HeartHandshake size={22} className="text-primary" />
          What you’ll practice
        </h2>
        <ul className="space-y-3 text-sm">
          {[
            "Recognize changes in agitation and ask about concerns.",
            "Choose respectful, coordinated communication.",
            "Recognize when local safety procedures and trained help are needed.",
          ].map((t) => (
            <li key={t} className="flex gap-3">
              <Check size={17} className="text-primary shrink-0" />
              {t}
            </li>
          ))}
        </ul>
      </section>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold flex gap-2 items-center">
          <BookOpen size={22} className="text-primary" />
          Inside the preview
        </h2>
        <ol className="divide-y border-y border-border">
          {course.sections.map((s, i) => (
            <li key={s.id} className="py-4 flex gap-4 items-center">
              <span className="text-primary font-semibold text-sm">
                0{i + 1}
              </span>
              <span className="text-sm">{s.title}</span>
            </li>
          ))}
        </ol>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">How you’ll finish</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Read all three sections, answer three open-book practice questions
          correctly, and complete a short evaluation and acknowledgement. Review
          explanations and retry as often as you need.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          You can download a text preview completion record afterward. It is not
          a CE certificate. Progress stays in this browser and does not sync
          across devices.
        </p>
      </section>
      <section className="space-y-3 border-t border-border pt-6">
        <h2 className="text-xl font-semibold">Content & review</h2>
        <p className="text-sm text-muted-foreground">
          Draft curriculum · Version {course.version}. A qualified clinical
          reviewer and instructor have not yet been confirmed for this preview.
        </p>
        <a
          className="text-sm text-primary underline underline-offset-4"
          href="https://www.nice.org.uk/guidance/ng10/chapter/recommendations"
          target="_blank"
          rel="noreferrer"
        >
          Reference: NICE NG10 de-escalation recommendations
        </a>
        <p className="text-xs text-muted-foreground">
          This UK reference informs the draft; it does not establish California
          CE approval.
        </p>
      </section>
    </div>
  );
}
