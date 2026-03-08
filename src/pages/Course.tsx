import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Play, Pause, ChevronLeft, Check, X, Award, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
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

  // Swipe state
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);
  const leftGlow = useTransform(x, [-200, 0], [1, 0]);
  const rightGlow = useTransform(x, [0, 200], [0, 1]);
  const constraintRef = useRef<HTMLDivElement>(null);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Course not found</p>
      </div>
    );
  }

  const scenario = course.scenarios[scenarioIndex];
  const progress = (currentModule / course.modules) * 100;

  const handleSwipe = (direction: "left" | "right") => {
    const targetX = direction === "left" ? -300 : 300;
    animate(x, targetX, { duration: 0.3 }).then(() => {
      // Move to next scenario or show attestation
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
          <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center glow-teal">
            <Sparkles className="w-12 h-12 text-primary-foreground" />
          </div>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display text-2xl font-bold mb-2"
        >
          Congratulations! 🎉
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground mb-4"
        >
          Your certificate has been generated!
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-muted-foreground"
        >
          Redirecting to your dashboard...
        </motion.p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="glass-strong sticky top-0 z-40 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-muted rounded-lg">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="font-display font-semibold text-sm truncate">{course.title}</h1>
          <p className="text-xs text-muted-foreground">Module {currentModule} of {course.modules}</p>
        </div>
      </header>

      {/* Progress bar */}
      <Progress value={progress} className="h-1 rounded-none" />

      {/* Video Player */}
      <div className="relative aspect-[9/14] max-h-[55vh] bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
        <span className="text-7xl">{course.thumbnail}</span>
        
        {/* Play/Pause overlay */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: isPlaying ? 0 : 1 }}
            className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center backdrop-blur-sm"
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 text-primary-foreground" fill="currentColor" />
            ) : (
              <Play className="w-7 h-7 text-primary-foreground ml-1" fill="currentColor" />
            )}
          </motion.div>
        </button>

        {/* Module info */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="glass rounded-xl p-4">
            <p className="text-sm font-medium mb-1">Understanding Unconscious Bias</p>
            <p className="text-xs text-muted-foreground">How implicit biases form and affect patient care decisions</p>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 p-4 flex flex-col">
        {!showAttestation ? (
          <>
            {/* Scenario Swipe Component */}
            <div className="mb-4">
              <h2 className="font-display font-semibold text-lg mb-1">Clinical Scenario Check</h2>
              <p className="text-sm text-muted-foreground">
                Swipe <span className="text-primary">right</span> for correct action, <span className="text-accent">left</span> for incorrect
              </p>
            </div>

            <div ref={constraintRef} className="relative flex-1 flex items-center justify-center min-h-[200px]">
              {/* Glow indicators */}
              <motion.div
                style={{ opacity: rightGlow }}
                className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-primary/30 to-transparent rounded-r-2xl pointer-events-none"
              />
              <motion.div
                style={{ opacity: leftGlow }}
                className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-accent/30 to-transparent rounded-l-2xl pointer-events-none"
              />

              {/* Swipe icons */}
              <motion.div style={{ opacity: leftGlow }} className="absolute left-4 top-1/2 -translate-y-1/2">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <X className="w-5 h-5 text-accent" />
                </div>
              </motion.div>
              <motion.div style={{ opacity: rightGlow }} className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="w-5 h-5 text-primary" />
                </div>
              </motion.div>

              {/* Swipeable card */}
              <motion.div
                style={{ x, rotate, opacity }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={handleDragEnd}
                className="glass-strong rounded-2xl p-5 w-full max-w-sm cursor-grab active:cursor-grabbing"
              >
                <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wide">
                  Scenario {scenarioIndex + 1} of {course.scenarios.length}
                </p>
                <p className="text-sm leading-relaxed">{scenario?.situation}</p>
              </motion.div>
            </div>

            {/* Skip to end (for demo) */}
            <button
              onClick={() => setShowAttestation(true)}
              className="text-xs text-muted-foreground underline mt-4 text-center"
            >
              Skip to completion (demo)
            </button>
          </>
        ) : (
          /* Attestation Section */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col justify-center"
          >
            <div className="glass-strong rounded-2xl p-6 glow-purple">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                  <Award className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h2 className="font-display font-semibold text-lg">Course Completed!</h2>
                  <p className="text-sm text-muted-foreground">One final step to get your certificate</p>
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <Checkbox
                    checked={attested}
                    onCheckedChange={(checked) => setAttested(checked === true)}
                    className="mt-0.5"
                  />
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    I legally attest that I have completed this educational material and understand the content 
                    presented. I confirm that I personally participated in this learning activity.
                  </span>
                </label>

                <Button
                  onClick={handleGenerateCertificate}
                  disabled={!attested}
                  className="w-full gradient-primary text-primary-foreground font-semibold py-6 rounded-xl disabled:opacity-50"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Instantly Generate Certificate
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
