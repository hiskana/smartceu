import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CircleHelp, MessageCircle, ArrowLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

const questions = [
  {
    question: "Is this approved California CE?",
    answer:
      "Not yet. SmartCEU currently offers a free learning preview with 0 CE contact hours. Clinical review and the applicable provider approval are still needed. Do not use the preview record for license renewal.",
  },
  {
    question: "Is SmartCEU for PTs or LVNs?",
    answer:
      "Both. We are building practical education for California psychiatric technicians (PTs) and licensed vocational nurses (LVNs). The first preview introduces therapeutic communication and de-escalation.",
  },
  {
    question: "How do I start learning?",
    answer:
      "Open the free preview, read the three sections, and try the practice questions. You can review the lesson and retry. Finish with a short evaluation and participation acknowledgement.",
    link: "/course/de-escalation",
    label: "Open free preview",
  },
  {
    question: "Will my progress be saved?",
    answer:
      "Your section, practice answers, and completion are saved in this browser when browser storage is available. They do not sync to another device or browser. Clearing site data may remove them. There is no account sign-in yet.",
    link: "/dashboard",
    label: "View my learning",
  },
  {
    question: "Where is my completion record?",
    answer:
      "After you finish the preview, download your text completion record from the lesson or My learning. It is a preview record, not a CE certificate, and awards no CE credit.",
    link: "/dashboard",
    label: "View my learning",
  },
  {
    question: "Does the preview cost anything?",
    answer:
      "The current preview is free. There is no checkout, subscription, or payment required. Prices for future qualifying CE courses have not been finalized.",
  },
];
export default function HelpChat() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const { pathname } = useLocation();
  const answer = selected === null ? null : questions[selected];
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={`help-launcher ${pathname.startsWith("/course/") ? "help-launcher-reader" : ""}`}
          aria-label="Open SmartCEU help"
        >
          <CircleHelp size={28} strokeWidth={1.8} />
          <span className="hidden sm:inline">Need a hand?</span>
        </button>
      </DialogTrigger>
      <DialogContent className="help-dialog p-0 gap-0 overflow-hidden">
        <DialogHeader className="bg-primary text-primary-foreground p-6 pr-12 text-left">
          <div className="flex gap-3 items-center mb-2">
            <MessageCircle size={23} />
            <DialogTitle className="text-xl">
              A little help, right here.
            </DialogTitle>
          </div>
          <DialogDescription className="text-white/80">
            SmartCEU guide · Ready-made answers
          </DialogDescription>
        </DialogHeader>
        <div className="p-5 overflow-y-auto max-h-[60dvh]">
          {answer ? (
            <>
              <button
                className="inline-flex items-center gap-2 text-primary text-sm font-semibold mb-5"
                onClick={() => setSelected(null)}
              >
                <ArrowLeft size={16} />
                All questions
              </button>
              <div className="rounded-2xl bg-secondary p-4 mb-4 font-semibold">
                {answer.question}
              </div>
              <div
                role="status"
                className="rounded-2xl border border-border p-4 leading-relaxed text-sm"
              >
                {answer.answer}
              </div>
              {answer.link && (
                <Link
                  className="btn-premium inline-block mt-5"
                  to={answer.link}
                  onClick={() => setOpen(false)}
                >
                  {answer.label}
                </Link>
              )}
            </>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-4">
                Hi! Choose a question to get started.
              </p>
              <div className="space-y-2">
                {questions.map((q, i) => (
                  <button
                    key={q.question}
                    className="w-full text-left border border-border rounded-xl px-4 py-3 text-sm hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary"
                    onClick={() => setSelected(i)}
                  >
                    {q.question}
                    <span
                      aria-hidden="true"
                      className="float-right text-primary"
                    >
                      →
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        <p className="px-5 py-3 border-t text-xs text-muted-foreground">
          Automated FAQs, not a live chat. No messages are sent.
        </p>
      </DialogContent>
    </Dialog>
  );
}
