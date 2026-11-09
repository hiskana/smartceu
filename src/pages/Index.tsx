import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  BrainCircuit,
  HeartPulse,
  Bookmark,
  ArrowRight,
} from "lucide-react";

import { previewCourse } from "@/data/learning";
import { hasLearningActivity, readProgress } from "@/lib/learning";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

const paths = [
  {
    id: "pt",
    title: "Psychiatric Technician",
    icon: BrainCircuit,
    theme: "profession-pt",
    photo: "portrait-left",
  },
  {
    id: "lvn",
    title: "Vocational Nurse",
    icon: HeartPulse,
    theme: "profession-lvn",
    photo: "portrait-right",
  },
];

export default function Index() {
  const [{ progress, error }] = useState(readProgress);
  const hasActivity =
    !error && !progress.completedAt && hasLearningActivity(progress);
  const resumeLabel =
    progress.stage === "finish"
      ? "Reflection & completion"
      : progress.stage === "check"
        ? "Practice questions"
        : previewCourse.sections[progress.section].title;
  return (
    <div className="profession-home">
      <header className="profession-welcome">
        <p>California PT & LVN</p>
        <h1>Your next chapter.</h1>
        <span>Choose your profession.</span>
      </header>
      {hasActivity && (
        <Link
          to="/course/de-escalation"
          className="resume-card"
          aria-label="Continue learning: Therapeutic Communication & De-escalation"
        >
          <Bookmark size={22} className="shrink-0 text-primary" />
          <div className="min-w-0 flex-1">
            <span className="text-xs text-primary font-semibold">
              Continue learning
            </span>
            <p className="text-sm font-semibold mt-1">{previewCourse.title}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {resumeLabel} · Saved in this browser
            </p>
          </div>
          <ArrowRight size={20} className="shrink-0 text-primary" />
        </Link>
      )}
      <div className="profession-tiles">
        {paths.map(({ id, title, icon: Icon, theme, photo }) => (
          <Link
            key={id}
            to={`/catalog?profession=${id}`}
            className={`profession-tile ${theme}`}
            aria-label={`${title} — explore learning`}
          >
            <div className={`profession-portrait ${photo}`} aria-hidden="true">
              <img
                src="/images/care-team.png"
                alt=""
                width="1536"
                height="1024"
              />
            </div>
            <div className="profession-tile-content">
              <span className="profession-icon">
                <Icon size={30} strokeWidth={1.6} />
              </span>
              <h2>{id === "lvn" ? "LVN" : title}</h2>
              {id === "lvn" && (
                <span className="profession-subtitle">Vocational Nurse</span>
              )}
              <span className="profession-tile-link">
                Explore learning <ArrowUpRight size={18} />
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="text-center mt-5">
        <Dialog>
          <DialogTrigger asChild>
            <button className="text-sm text-primary underline underline-offset-4 py-2">
              How SmartCEU works.
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-md rounded-2xl w-[calc(100%-32px)]">
            <DialogHeader>
              <DialogTitle>How SmartCEU works</DialogTitle>
              <DialogDescription>
                A few simple steps, at your pace.
              </DialogDescription>
            </DialogHeader>
            <ol className="space-y-5 my-3 list-decimal pl-5 text-sm">
              <li>
                <strong>Choose your learning.</strong>
                <p className="mt-1 text-muted-foreground">
                  Pick PT or LVN and open the free preview.
                </p>
              </li>
              <li>
                <strong>Read, practice, and return.</strong>
                <p className="mt-1 text-muted-foreground">
                  Work through short sections and knowledge checks. Your place
                  is saved in this browser.
                </p>
              </li>
              <li>
                <strong>Finish and keep a record.</strong>
                <p className="mt-1 text-muted-foreground">
                  Complete the evaluation and acknowledgement, then download
                  your preview record.
                </p>
              </li>
            </ol>
            <p className="text-xs text-muted-foreground border-t pt-4">
              The current preview is free and awards 0 CE contact hours. Your
              record is not a CE certificate. Progress does not sync across
              devices.
            </p>
          </DialogContent>
        </Dialog>
      </div>
      <p className="profession-preview">
        Free learning preview · No CE credit yet
      </p>
    </div>
  );
}
