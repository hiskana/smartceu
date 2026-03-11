import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Play, Pause, ArrowLeft, Check, X, Award } from "lucide-react";
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
  const rotate = useTransform(x, [-200, 200], [-6, 6]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);
  const leftGlow = useTransform(x, [-200, 0], [1, 0]);
  const rightGlow = useTransform(x, [0, 200], [0, 1]);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="section-marker block mb-4">Error</span>
          <h2 className="text-2xl font-extrabold mb-2">Course Not Found</h2>
          <p className="text-sm text-muted-foreground">Return to the catalog.</p>
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
    setTimeout(() => navigate("/dashboard"), 3000);
  };

  if (completed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center section-dark">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mb-8"
        >
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
            <Award className="w-10 h-10 text-primary" strokeWidth={1.5} />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="section-marker block mb-4" style={{ color: 'hsl(0 0% 55%)' }}>Complete</span>
          <h1 className="display-massive text-4xl mb-4 text-white">Certificate Generated</h1>
          <p className="text-sm text-white/50">Redirecting to progress...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border px-4 py-3 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-muted rounded-xl transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-xs font-bold tracking-tight truncate">{course.title}</h1>
          <span className="meta-label">Module {currentModule} of {course.modules}</span>
        </div>
      </header>

      {/* Progress — rounded bar */}
      <div className="h-1 bg-muted">
        <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      {/* Video Player */}
      <div className="relative aspect-[9/14] max-h-[55vh] bg-muted flex items-center justify-center">
        <span className="text-7xl">{course.thumbnail}</span>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: isPlaying ? 0 : 1 }}
            className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-studio-purple"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-primary-foreground" fill="currentColor" />
            ) : (
              <Play className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" />
            )}
          </motion.div>
        </button>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-background/80 backdrop-blur-xl p-4 rounded-2xl">
            <p className="text-xs font-bold tracking-tight">Understanding Unconscious Bias</p>
            <span className="meta-label">How implicit biases affect patient care</span>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 p-6 flex flex-col">
        {!showAttestation ? (
          <>
            <div className="mb-6">
              <span className="section-marker block mb-2">Clinical Scenario</span>
              <p className="text-xs text-muted-foreground">
                Swipe right for correct action — swipe left for incorrect
              </p>
            </div>

            <div className="relative flex-1 flex items-center justify-center min-h-[200px]">
              {/* Direction indicators */}
              <motion.div
                style={{ opacity: rightGlow }}
                className="absolute inset-y-0 right-0 w-16 pointer-events-none flex items-center justify-center"
              >
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="w-5 h-5 text-primary" />
                </div>
              </motion.div>
              <motion.div
                style={{ opacity: leftGlow }}
                className="absolute inset-y-0 left-0 w-16 pointer-events-none flex items-center justify-center"
              >
                <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
                  <X className="w-5 h-5 text-destructive" />
                </div>
              </motion.div>

              {/* Swipeable card */}
              <motion.div
                style={{ x, rotate, opacity }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={handleDragEnd}
                className="studio-card p-6 w-full max-w-sm cursor-grab active:cursor-grabbing"
              >
                <span className="meta-label block mb-4">
                  {scenarioIndex + 1} / {course.scenarios.length}
                </span>
                <p className="text-sm font-light leading-relaxed">{scenario?.situation}</p>
              </motion.div>
            </div>

            <button
              onClick={() => setShowAttestation(true)}
              className="text-xs text-muted-foreground underline mt-6 text-center"
            >
              Skip to completion
            </button>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full"
          >
            <span className="section-marker block mb-6">Final Attestation</span>

            <div className="space-y-6">
              <label className="flex items-start gap-3 cursor-pointer studio-card p-5 hover:shadow-studio-lg transition-all">
                <Checkbox
                  checked={attested}
                  onCheckedChange={(checked) => setAttested(checked === true)}
                  className="mt-0.5"
                />
                <span className="text-sm font-light leading-relaxed">
                  I legally attest that I have completed this educational material and understand the content
                  presented. I confirm that I personally participated in this learning activity.
                </span>
              </label>

              <button
                onClick={handleGenerateCertificate}
                disabled={!attested}
                className="btn-premium w-full disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Generate Certificate
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
