import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { previewCourse as course } from "@/data/learning";
import {
  canComplete,
  downloadRecord,
  LearningProgress,
  readProgress,
  storageKey,
} from "@/lib/learning";

export default function Course() {
  const { id } = useParams();
  return id === course.id ? (
    <Reader key={id} />
  ) : (
    <main className="container py-20">
      <h1 className="text-3xl mb-4">Course unavailable</h1>
      <p className="mb-6">This course has no published learning content yet.</p>
      <Link className="btn-premium" to="/catalog">
        Browse learning previews
      </Link>
    </main>
  );
}
function Reader() {
  const [initial] = useState(readProgress);
  const [progress, setProgress] = useState(initial.progress);
  const [saveError, setSaveError] = useState(initial.error);
  const [font, setFont] = useState(18);
  const [dark, setDark] = useState(false);
  const stage = progress.stage ?? "read";
  function setStage(stage: "read" | "check" | "finish") {
    update({ ...progress, stage });
  }
  const [notice, setNotice] = useState("");
  useEffect(() => {
    if (!progress.startedAt) {
      const next = { ...progress, startedAt: new Date().toISOString() };
      setProgress(next);
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
        setSaveError(false);
      } catch {
        setSaveError(true);
      }
    }
  }, [progress]);
  function update(next: LearningProgress) {
    setProgress(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
      setSaveError(false);
    } catch {
      setSaveError(true);
    }
  }
  const section = course.sections[progress.section];
  const allRead = course.sections.every((_, i) => progress.read.includes(i));
  const passed = course.questions.every(
    (q) => progress.answers[q.id] === q.correct,
  );
  function finish() {
    if (!canComplete(progress)) return;
    update({
      ...progress,
      completedAt: progress.completedAt ?? new Date().toISOString(),
    });
    setNotice("Preview completed. Your record is available below.");
  }
  return (
    <div className={dark ? "dark" : ""}>
      <main className="min-h-screen bg-background text-foreground pb-16">
        <header className="border-b border-border">
          <div className="max-w-3xl mx-auto px-5 py-5 flex flex-wrap justify-between gap-4">
            <Link to={`/courses/${course.id}`} className="underline">
              ← Course details
            </Link>
            <Link to="/dashboard" className="underline">
              My learning
            </Link>
          </div>
        </header>
        <div className="max-w-3xl mx-auto px-5 py-8 space-y-7">
          <div className="rounded-xl border border-border p-4 text-sm">
            Learning preview · 0 CE contact hours · Clinical review pending.
            This is not an approved CE course or a substitute for facility
            training.
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-3">
              {course.audience}
            </p>
            <h1 className="font-semibold tracking-tight text-4xl leading-tight">
              {course.title}
            </h1>
            <p className="mt-4">
              Practice noticing changes, communicating respectfully, and
              recognizing the limits of this preview.
            </p>
          </div>
          <p role="status" className="text-sm">
            {saveError
              ? "Progress could not be restored or saved. You can continue, but keep this page open; changes may be lost."
              : "Progress is saved on this browser only. It does not sync across devices."}
          </p>
          <nav aria-label="Course steps" className="flex flex-wrap gap-3">
            <button
              className="btn-ghost"
              aria-current={stage === "read" ? "step" : undefined}
              onClick={() => setStage("read")}
            >
              1. Read ({new Set(progress.read).size}/3)
            </button>
            <button
              className="btn-ghost disabled:opacity-40"
              disabled={!allRead}
              onClick={() => setStage("check")}
            >
              2. Practice
            </button>
            <button
              className="btn-ghost disabled:opacity-40"
              disabled={!allRead || !passed}
              onClick={() => setStage("finish")}
            >
              3. Reflect & finish
            </button>
          </nav>
          {stage === "read" && (
            <>
              <div className="flex flex-wrap items-center gap-4 border-y border-border py-3">
                <label>
                  Text size{" "}
                  <select
                    className="bg-background border rounded p-2"
                    aria-label="Text size"
                    value={font}
                    onChange={(e) => setFont(Number(e.target.value))}
                  >
                    <option value={18}>Standard</option>
                    <option value={21}>Large</option>
                    <option value={24}>Extra large</option>
                  </select>
                </label>
                <button
                  className="underline"
                  aria-pressed={dark}
                  onClick={() => setDark(!dark)}
                >
                  Dark mode
                </button>
              </div>
              <nav
                aria-label="Lesson sections"
                className="flex flex-wrap gap-3"
              >
                {course.sections.map((s, i) => (
                  <button
                    key={s.id}
                    className="underline text-sm"
                    aria-current={progress.section === i ? "page" : undefined}
                    onClick={() => update({ ...progress, section: i })}
                  >
                    {i + 1}. {s.title}
                    {progress.read.includes(i) ? " ✓" : ""}
                  </button>
                ))}
              </nav>
              <article id="lesson" style={{ fontSize: font, lineHeight: 1.85 }}>
                <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                <p>{section.text}</p>
                <p className="border-l-4 border-primary pl-4 mt-6">
                  {section.takeaway}
                </p>
              </article>
              <button
                className="btn-premium"
                onClick={() => {
                  update({
                    ...progress,
                    read: [...new Set([...progress.read, progress.section])],
                    section: Math.min(2, progress.section + 1),
                  });
                  if (progress.section === 2)
                    setNotice(
                      "Section marked read. Read all sections to unlock practice.",
                    );
                }}
              >
                Mark section read{progress.section < 2 ? " & continue" : ""}
              </button>
              {allRead && (
                <button
                  className="btn-premium ml-3"
                  onClick={() => setStage("check")}
                >
                  Start practice
                </button>
              )}
            </>
          )}
          {stage === "check" && (
            <section>
              <h2 className="text-2xl font-semibold mb-3">
                Practice what you learned
              </h2>
              <p className="mb-6">
                Open book. Answer all three correctly to continue. You can
                review and retry without a limit.
              </p>
              <div className="space-y-8">
                {course.questions.map((q, i) => (
                  <fieldset
                    key={q.id}
                    className="border border-border rounded-xl p-5"
                  >
                    <legend className="font-semibold px-2">
                      {i + 1}. {q.prompt}
                    </legend>
                    {q.options.map((option, index) => (
                      <label
                        key={option}
                        className="flex gap-3 items-start py-3"
                      >
                        <input
                          type="radio"
                          name={q.id}
                          checked={progress.answers[q.id] === index}
                          disabled={!!progress.completedAt}
                          onChange={() =>
                            update({
                              ...progress,
                              answers: { ...progress.answers, [q.id]: index },
                              attempts: [
                                ...progress.attempts,
                                {
                                  question: q.id,
                                  answer: index,
                                  correct: index === q.correct,
                                },
                              ],
                            })
                          }
                          className="mt-1"
                        />
                        {option}
                      </label>
                    ))}
                    {progress.answers[q.id] !== undefined && (
                      <p role="status" className="mt-3">
                        {progress.answers[q.id] === q.correct
                          ? "Correct. "
                          : "Review and try again. "}
                        {q.explanation}{" "}
                        <button
                          className="underline"
                          onClick={() => {
                            update({
                              ...progress,
                              section: q.section,
                              stage: "read",
                            });
                          }}
                        >
                          Review relevant section
                        </button>
                      </p>
                    )}
                  </fieldset>
                ))}
              </div>
              <button
                className="btn-premium mt-6 disabled:opacity-40"
                disabled={!passed || !allRead}
                onClick={() => setStage("finish")}
              >
                Continue to reflection
              </button>
            </section>
          )}
          {stage === "finish" && (
            <section className="space-y-5">
              <h2 className="text-2xl font-semibold">Reflect & finish</h2>
              <label className="block">
                How useful was this preview?
                <select
                  disabled={!!progress.completedAt}
                  className="block bg-background border rounded p-3 mt-2"
                  value={progress.rating}
                  onChange={(e) =>
                    update({ ...progress, rating: e.target.value })
                  }
                >
                  <option value="">Choose a rating</option>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n} —{" "}
                      {n === 1
                        ? "Not useful"
                        : n === 5
                          ? "Very useful"
                          : "Somewhat useful"}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                What could we improve? (optional)
                <textarea
                  disabled={!!progress.completedAt}
                  maxLength={2000}
                  className="block bg-background border rounded p-3 w-full mt-2"
                  value={progress.feedback}
                  onChange={(e) =>
                    update({ ...progress, feedback: e.target.value })
                  }
                />
              </label>
              <label className="flex gap-3">
                <input
                  type="checkbox"
                  disabled={!!progress.completedAt}
                  checked={progress.attested}
                  onChange={(e) =>
                    update({ ...progress, attested: e.target.checked })
                  }
                />
                I personally reviewed the sections and completed the practice
                questions. I understand this preview awards no CE credit.
              </label>
              <button
                disabled={!canComplete(progress) || !!progress.completedAt}
                className="btn-premium disabled:opacity-40"
                onClick={finish}
              >
                {progress.completedAt
                  ? "Preview completed"
                  : "Complete preview"}
              </button>
            </section>
          )}
          {notice && <p role="status">{notice}</p>}
          {progress.completedAt && (
            <section className="studio-card p-6 space-y-4">
              <h2 className="text-2xl">Your preview completion record</h2>
              <p>
                Completed {new Date(progress.completedAt).toLocaleString()}.
                This record is not a CE certificate.
              </p>
              <button
                className="btn-premium"
                onClick={() => downloadRecord(progress)}
              >
                Download preview record
              </button>
              <Link
                to="/dashboard"
                className="inline-block text-primary underline"
              >
                Go to My learning
              </Link>
            </section>
          )}
          <footer className="border-t border-border pt-5 text-sm text-muted-foreground">
            <p>
              Draft curriculum · Version {course.version} · Instructor review
              pending.
            </p>
            <p className="mt-2">
              Reference:{" "}
              <a
                className="underline"
                href="https://www.nice.org.uk/guidance/ng10/chapter/recommendations"
                target="_blank"
                rel="noreferrer"
              >
                NICE NG10, de-escalation recommendations 1.3.12–1.3.20
              </a>
              . This UK guidance informs the preview; it does not establish
              California CE approval.
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
