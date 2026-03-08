import { Link } from "react-router-dom";
import { Download, ExternalLink, Clock, Award, BookOpen, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { courses, userProgress } from "@/data/courses";
import { motion } from "framer-motion";

export default function Dashboard() {
  const completedHoursPercent = (userProgress.completedHours / userProgress.totalHours) * 100;

  return (
    <div className="min-h-screen py-6 md:py-10">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">My CEUs</h1>
          <p className="text-muted-foreground">Track your progress and access certificates</p>
        </motion.div>

        {/* Progress Ring Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-strong rounded-3xl p-6 md:p-8 mb-8 glow-teal"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            {/* Progress Ring */}
            <div className="relative">
              <svg className="w-36 h-36 md:w-44 md:h-44 -rotate-90">
                {/* Background circle */}
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke="hsl(var(--muted))"
                  strokeWidth="12"
                />
                {/* Progress circle */}
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke="url(#progressGradient)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - completedHoursPercent / 100) }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(170 100% 45%)" />
                    <stop offset="100%" stopColor="hsl(270 60% 65%)" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-3xl md:text-4xl font-bold">{userProgress.completedHours}</span>
                <span className="text-sm text-muted-foreground">of {userProgress.totalHours} hrs</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex-1 grid grid-cols-3 gap-4 w-full md:w-auto">
              {[
                { label: "Hours Completed", value: userProgress.completedHours, icon: Clock },
                { label: "Courses Done", value: userProgress.coursesCompleted, icon: BookOpen },
                { label: "Certificates", value: userProgress.certificatesEarned, icon: Award },
              ].map((stat, i) => (
                <div key={stat.label} className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                    <stat.icon className="w-4 h-4 text-primary hidden md:block" />
                    <span className="font-display text-2xl font-bold">{stat.value}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Active Courses */}
        {userProgress.activeCourses.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="font-display text-xl font-semibold mb-4">Continue Learning</h2>
            <div className="space-y-4">
              {userProgress.activeCourses.map((active) => {
                const course = courses.find((c) => c.id === active.courseId);
                if (!course) return null;

                return (
                  <Link key={active.courseId} to={`/course/${active.courseId}`}>
                    <div className="glass rounded-2xl p-4 hover:glow-teal transition-shadow flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center flex-shrink-0">
                        <span className="text-3xl">{course.thumbnail}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-semibold text-sm mb-1 truncate">{course.title}</h3>
                        <p className="text-xs text-muted-foreground mb-2">
                          Module {active.lastModule} of {course.modules}
                        </p>
                        <Progress value={active.progress} className="h-1.5" />
                      </div>
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Play className="w-4 h-4 text-primary ml-0.5" fill="currentColor" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.section>
        )}

        {/* Certificate Wallet */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="font-display text-xl font-semibold mb-4">Certificate Wallet</h2>
          {userProgress.completedCourses.length > 0 ? (
            <div className="space-y-3">
              {userProgress.completedCourses.map((completed) => {
                const course = courses.find((c) => c.id === completed.courseId);
                if (!course) return null;

                return (
                  <div key={completed.certificateId} className="glass rounded-2xl p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
                        <Award className="w-6 h-6 text-secondary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-semibold text-sm truncate">{course.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          Completed {new Date(completed.completedDate).toLocaleDateString()} • {course.hours} CEU{course.hours !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1 rounded-lg">
                        <Download className="w-4 h-4 mr-2" />
                        PDF
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 rounded-lg">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        CE Broker
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="glass rounded-2xl p-8 text-center">
              <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Complete a course to earn your first certificate!</p>
              <Link to="/catalog">
                <Button className="mt-4 gradient-primary text-primary-foreground">
                  Browse Courses
                </Button>
              </Link>
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
}
