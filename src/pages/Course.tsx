import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Play, Pause, ChevronLeft, Check, X, Award } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { courses } from "@/data/courses";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

export default function Course() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find((c) => c.id === id);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentModule, setCurrentModule] = useState(1);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [showAttestation, setShowAttestation] = useState(false);
  const [attested, setAttested] = useState(false);
  const [completed, setCompleted] = useState(false);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-8, 8]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);
  const leftGlow = useTransform(x, [-200, 0], [1, 0]);
  const rightGlow = useTransform(x, [0, 200], [0, 1]);
  const constraintRef = useRef<HTMLDivElement>(null);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="editorial-card p-8">
          <h2 className="font-display text-2xl font-black italic">Course not found.</h2>
          <span className="annotation text-lg">← check the catalog</span>
        </div>
      </div>
    );
  }

  const scenario = course.scenarios[scenarioIndex];
  const progress = (currentModule / course.modules) * 100;

  const handleSwipe = (direction: "left" | "right") => {
    const targetX = direction === "left" ? -300 : 300;
    animate(x, targetX, { duration: 0.3 }).then(() => {
      if (scenarioIndex < course.scenarios.length - 1) {
        setScenarioIndex((prev) => prev + 1);
        x.set(0);
      } else {
        setShowAttestation(true);
      }
    });
  };

  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    const swipeThreshold = 100;
    if (Math.abs(info.offset.x) > swipeThreshold) {
      handleSwipe(info.offset.x > 0 ? "right" : "left");
    } else {
      animate(x, 0, { type: "spring", stiffness: 500, damping: 30 });
    }
  };

  const handleGenerateCertificate = () => {
    setCompleted(true);
    setTimeout(() => {
      navigate("/dashboard");
    }, 3000);
  };

  if (completed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mb-6"
        >
          <div className="w-24 h-24 bg-accent border-[2px] border-foreground flex items-center justify-center">
            <Award className="w-12 h-12 text-accent-foreground" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="editorial-card editorial-card-taped p-8 pt-10"
        >
          <h1 className="font-display text-3xl font-black italic mb-2">
            Course Complete! 🎉
          </h1>
          <span className="annotation text-xl inline-block rotate-[-2deg]">
            ★ certificate generated successfully
          </span>
          <p className="text-sm font-body text-muted-foreground mt-4">
            Redirecting to dashboard...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-primary text-primary-foreground border-b-[2px] border-foreground px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 border-[2px] border-primary-foreground/40 hover:bg-card hover:text-foreground transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="header-condensed text-sm truncate">{course.title}</h1>
          <span className="annotation text-sm text-accent">Module {currentModule} of {course.modules}</span>
        </div>
      </header>

      {/* Progress bar */}
      <div className="h-2 bg-muted border-b-[2px] border-foreground">
        <div className="h-full bg-accent transition-all" style={{ width: `${progress}%` }} />
      </div>

      {/* Video Player */}
      <div className="relative aspect-[9/14] max-h-[55vh] bg-muted flex items-center justify-center border-b-[2px] border-foreground">
        <span className="text-7xl">{course.thumbnail}</span>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: isPlaying ? 0 : 1 }}
            className="w-16 h-16 bg-primary border-[2px] border-foreground flex items-center justify-center"
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 text-primary-foreground" fill="currentColor" />
            ) : (
              <Play className="w-7 h-7 text-primary-foreground ml-1" fill="currentColor" />
            )}
          </motion.div>
        </button>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-card border-[2px] border-foreground p-3">
            <p className="text-sm font-bold header-condensed">Understanding Unconscious Bias</p>
            <span className="annotation text-sm">how implicit biases affect patient care</span>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 p-4 flex flex-col">
        {!showAttestation ? (
          <>
            {/* Scenario Swipe Component */}
            <div className="mb-4 editorial-divider pb-3">
              <h2 className="header-condensed text-lg">Clinical Scenario Check</h2>
              <span className="annotation text-base inline-block rotate-[-1deg]">
                swipe right = correct ★ | swipe left = incorrect
              </span>
            </div>

            <div ref={constraintRef} className="relative flex-1 flex items-center justify-center min-h-[200px]">
              {/* Direction indicators */}
              <motion.div
                style={{ opacity: rightGlow }}
                className="absolute inset-y-0 right-0 w-20 bg-accent/20 border-l-[2px] border-foreground pointer-events-none flex items-center justify-center"
              >
                <Check className="w-8 h-8 text-accent" />
              </motion.div>
              <motion.div
                style={{ opacity: leftGlow }}
                className="absolute inset-y-0 left-0 w-20 bg-foreground/10 border-r-[2px] border-foreground pointer-events-none flex items-center justify-center"
              >
                <X className="w-8 h-8 text-foreground" />
              </motion.div>

              {/* Swipeable card */}
              <motion.div
                style={{ x, rotate, opacity }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={handleDragEnd}
                className="editorial-card editorial-card-taped p-5 pt-8 w-full max-w-sm cursor-grab active:cursor-grabbing"
              >
                <span className="annotation text-sm inline-block rotate-[-2deg] mb-2">
                  scenario {scenarioIndex + 1} of {course.scenarios.length}
                </span>
                <p className="text-sm leading-relaxed font-body">{scenario?.situation}</p>
              </motion.div>
            </div>

            <button
              onClick={() => setShowAttestation(true)}
              className="text-sm text-muted-foreground underline mt-4 text-center font-body"
            >
              Skip to completion (demo)
            </button>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col justify-center"
          >
            <div className="editorial-card editorial-card-taped p-6 pt-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-accent border-[2px] border-foreground flex items-center justify-center">
                  <Award className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h2 className="header-condensed text-lg">Course Completed!</h2>
                  <span className="annotation text-base">one final step ★</span>
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer bg-muted border-[2px] border-foreground p-3">
                  <Checkbox
                    checked={attested}
                    onCheckedChange={(checked) => setAttested(checked === true)}
                    className="mt-0.5 border-[2px] border-foreground"
                  />
                  <span className="text-sm leading-relaxed font-body">
                    I legally attest that I have completed this educational material and understand the content
                    presented. I confirm that I personally participated in this learning activity.
                  </span>
                </label>

                <button
                  onClick={handleGenerateCertificate}
                  disabled={!attested}
                  className="editorial-btn w-full py-4 text-base inline-flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Generate Certificate
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
