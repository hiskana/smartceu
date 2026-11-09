import { Link, useSearchParams } from "react-router-dom";
import { previewCourse } from "@/data/learning";
export default function Catalog() {
  const [params, setParams] = useSearchParams();
  const profession = params.get("profession") === "lvn" ? "lvn" : "pt";
  return (
    <div className="container max-w-3xl py-12 space-y-7">
      <p className="text-sm text-muted-foreground">
        California PT & LVN education · In development
      </p>
      <h1 className="font-semibold tracking-tight text-4xl">
        A little learning, for you.
      </h1>
      <p>
        Try our first text-based learning preview. Courses and CE approvals are
        still in preparation.
      </p>
      <div
        role="group"
        aria-label="Choose your profession"
        className="flex gap-2 flex-wrap"
      >
        {(["pt", "lvn"] as const).map((p) => (
          <button
            key={p}
            aria-pressed={profession === p}
            onClick={() => setParams({ profession: p })}
            className={`rounded-xl border px-5 py-3 text-sm font-semibold ${profession === p ? "bg-primary text-white" : "bg-background"}`}
          >
            {p === "pt" ? "Psychiatric technician" : "Vocational nurse"}
          </button>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        Showing the preview for California{" "}
        {profession === "pt" ? "psychiatric technicians" : "LVNs"}. This
        introduction is available to both professions.
      </p>
      <article className="studio-card p-6 space-y-4">
        <p className="text-sm">
          Free preview · 3 short sections · 0 CE contact hours
        </p>
        <h2 className="text-2xl">{previewCourse.title}</h2>
        <p>
          Practice noticing changes, communicating respectfully, and keeping
          safety central.
        </p>
        <p className="text-sm text-muted-foreground">
          For {previewCourse.audience.toLowerCase()}. Clinical review pending.
        </p>
        <Link
          className="btn-premium inline-block"
          to={`/courses/de-escalation?profession=${profession}`}
        >
          View course details
        </Link>
      </article>
      <p>
        More courses will appear here when their content is ready. No qualifying
        CE courses are currently offered.
      </p>
    </div>
  );
}
