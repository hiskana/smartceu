import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Play, Pause, ChevronLeft, Check, X, Award, Rocket } from "lucide-react";
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

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-8, 8]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);
  const leftGlow = useTransform(x, [-200, 0], [1, 0]);
  const rightGlow = useTransform(x, [0, 200], [0, 1]);
  const constraintRef = useRef<HTMLDivElement>(null);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="brutalist-card p-8">
          <p className="font-bold uppercase">Course not found.</p>
          <p className="font-mono text-sm text-muted-foreground mt-1">// Awaiting valid course ID</p>
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
          <div className="w-24 h-24 bg-primary border-[3px] border-foreground flex items-center justify-center" style={{ boxShadow: '4px 4px 0px 0px hsl(0 0% 0%)' }}>
            <Rocket className="w-12 h-12 text-primary-foreground" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="brutalist-card p-8"
        >
          <h1 className="font-display text-2xl font-bold mb-2 uppercase">
            Mission Complete! 🎉
          </h1>
          <p className="text-muted-foreground font-mono text-sm mb-4">
            // Certificate generated successfully
          </p>
          <p className="text-sm font-mono text-muted-foreground">
            {'>>>'} Redirecting to dashboard...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b-[3px] border-foreground px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 border-[2px] border-foreground bg-card hover:bg-muted" style={{ boxShadow: '2px 2px 0px 0px hsl(0 0% 0%)' }}>
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="font-display font-bold text-sm truncate uppercase">{course.title}</h1>
          <p className="text-xs font-mono text-muted-foreground">Module {currentModule} of {course.modules}</p>
        </div>
      </header>

      {/* Progress bar */}
      <div className="h-2 bg-muted border-b-[2px] border-foreground">
        <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
      </div>

      {/* Video Player */}
      <div className="relative aspect-[9/14] max-h-[55vh] bg-muted flex items-center justify-center border-b-[3px] border-foreground">
        <span className="text-7xl">{course.thumbnail}</span>
        
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: isPlaying ? 0 : 1 }}
            className="w-16 h-16 bg-primary border-[3px] border-foreground flex items-center justify-center"
            style={{ boxShadow: '3px 3px 0px 0px hsl(0 0% 0%)' }}
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 text-primary-foreground" fill="currentColor" />
            ) : (
              <Play className="w-7 h-7 text-primary-foreground ml-1" fill="currentColor" />
            )}
          </motion.div>
        </button>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-card border-[2px] border-foreground p-3" style={{ boxShadow: '2px 2px 0px 0px hsl(0 0% 0%)' }}>
            <p className="text-sm font-bold">Understanding Unconscious Bias</p>
            <p className="text-xs font-mono text-muted-foreground">// How implicit biases affect patient care</p>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 p-4 flex flex-col">
        {!showAttestation ? (
          <>
            {/* Scenario Swipe Component */}
            <div className="mb-4 brutalist-divider pb-3">
              <h2 className="font-display font-bold text-lg uppercase">Clinical Scenario Check</h2>
              <p className="font-mono text-xs text-muted-foreground">
                {'>'} Swipe <span className="text-primary font-bold">RIGHT</span> = correct | <span className="text-destructive font-bold">LEFT</span> = incorrect
              </p>
            </div>

            <div ref={constraintRef} className="relative flex-1 flex items-center justify-center min-h-[200px]">
              {/* Direction indicators */}
              <motion.div
                style={{ opacity: rightGlow }}
                className="absolute inset-y-0 right-0 w-20 bg-primary/20 border-l-[2px] border-foreground pointer-events-none flex items-center justify-center"
              >
                <Check className="w-8 h-8 text-primary" />
              </motion.div>
              <motion.div
                style={{ opacity: leftGlow }}
                className="absolute inset-y-0 left-0 w-20 bg-destructive/20 border-r-[2px] border-foreground pointer-events-none flex items-center justify-center"
              >
                <X className="w-8 h-8 text-destructive" />
              </motion.div>

              {/* Swipeable card */}
              <motion.div
                style={{ x, rotate, opacity }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={handleDragEnd}
                className="brutalist-card p-5 w-full max-w-sm cursor-grab active:cursor-grabbing"
              >
                <p className="pixel-text text-muted-foreground mb-3">
                  Scenario {scenarioIndex + 1} of {course.scenarios.length}
                </p>
                <p className="text-sm leading-relaxed">{scenario?.situation}</p>
              </motion.div>
            </div>

            <button
              onClick={() => setShowAttestation(true)}
              className="font-mono text-xs text-muted-foreground underline mt-4 text-center"
            >
              {'>'} skip_to_completion --demo
            </button>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col justify-center"
          >
            <div className="brutalist-card-yellow p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-card border-[2px] border-foreground flex items-center justify-center" style={{ boxShadow: '2px 2px 0px 0px hsl(0 0% 0%)' }}>
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg uppercase">Course Completed!</h2>
                  <p className="text-sm font-mono">// One final step to deploy your certificate</p>
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer bg-card border-[2px] border-foreground p-3">
                  <Checkbox
                    checked={attested}
                    onCheckedChange={(checked) => setAttested(checked === true)}
                    className="mt-0.5 border-[2px] border-foreground"
                  />
                  <span className="text-sm leading-relaxed">
                    I legally attest that I have completed this educational material and understand the content 
                    presented. I confirm that I personally participated in this learning activity.
                  </span>
                </label>

                <button
                  onClick={handleGenerateCertificate}
                  disabled={!attested}
                  className="brutalist-btn bg-primary text-primary-foreground w-full py-4 text-base inline-flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Rocket className="w-5 h-5" />
                  Deploy Certificate
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
