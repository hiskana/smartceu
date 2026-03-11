import { Link } from "react-router-dom";
import { Download, ExternalLink, Clock, Award, BookOpen, Play } from "lucide-react";
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
          <div className="brutalist-card p-4 inline-block mb-2">
            <h1 className="font-display text-3xl md:text-4xl font-bold uppercase">My CEUs</h1>
          </div>
          <p className="font-mono text-sm text-muted-foreground mt-2">{'>'} Track your progress and access certificates</p>
        </motion.div>

        {/* Progress Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="brutalist-card-cyan p-6 md:p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            {/* Progress Ring — SVG with brutalist style */}
            <div className="relative">
              <svg className="w-36 h-36 md:w-44 md:h-44 -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke="hsl(0 0% 0% / 0.15)"
                  strokeWidth="14"
                />
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke="hsl(0 0% 0%)"
                  strokeWidth="14"
                  strokeLinecap="butt"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - completedHoursPercent / 100) }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-3xl md:text-4xl font-bold">{userProgress.completedHours}</span>
                <span className="font-mono text-xs text-accent-foreground">of {userProgress.totalHours} hrs</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex-1 grid grid-cols-3 gap-4 w-full md:w-auto">
              {[
                { label: "Hours Done", value: userProgress.completedHours, icon: Clock },
                { label: "Courses Done", value: userProgress.coursesCompleted, icon: BookOpen },
                { label: "Certificates", value: userProgress.certificatesEarned, icon: Award },
              ].map((stat) => (
                <div key={stat.label} className="bg-card border-[2px] border-foreground p-3 text-center" style={{ boxShadow: '2px 2px 0px 0px hsl(0 0% 0%)' }}>
                  <stat.icon className="w-4 h-4 mx-auto mb-1" />
                  <span className="font-display text-2xl font-bold block">{stat.value}</span>
                  <p className="pixel-text text-muted-foreground">{stat.label}</p>
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
            <h2 className="font-display text-xl font-bold uppercase mb-4 brutalist-divider pb-2">Continue Learning</h2>
            <div className="space-y-4">
              {userProgress.activeCourses.map((active) => {
                const course = courses.find((c) => c.id === active.courseId);
                if (!course) return null;

                return (
                  <Link key={active.courseId} to={`/course/${active.courseId}`}>
                    <div className="brutalist-card p-4 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_hsl(0_0%_0%)] transition-all flex items-center gap-4">
                      <div className="w-16 h-16 bg-muted border-[2px] border-foreground flex items-center justify-center flex-shrink-0">
                        <span className="text-3xl">{course.thumbnail}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-bold text-sm mb-1 truncate uppercase">{course.title}</h3>
                        <p className="font-mono text-xs text-muted-foreground mb-2">
                          Module {active.lastModule} of {course.modules}
                        </p>
                        <div className="h-2 bg-muted border-[1px] border-foreground">
                          <div className="h-full bg-primary transition-all" style={{ width: `${active.progress}%` }} />
                        </div>
                      </div>
                      <div className="w-10 h-10 bg-primary border-[2px] border-foreground flex items-center justify-center flex-shrink-0" style={{ boxShadow: '2px 2px 0px 0px hsl(0 0% 0%)' }}>
                        <Play className="w-4 h-4 text-primary-foreground ml-0.5" fill="currentColor" />
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
          <h2 className="font-display text-xl font-bold uppercase mb-4 brutalist-divider pb-2">Certificate Wallet</h2>
          {userProgress.completedCourses.length > 0 ? (
            <div className="space-y-3">
              {userProgress.completedCourses.map((completed) => {
                const course = courses.find((c) => c.id === completed.courseId);
                if (!course) return null;

                return (
                  <div key={completed.certificateId} className="brutalist-card p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-secondary border-[2px] border-foreground flex items-center justify-center flex-shrink-0" style={{ boxShadow: '2px 2px 0px 0px hsl(0 0% 0%)' }}>
                        <Award className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-bold text-sm truncate uppercase">{course.title}</h3>
                        <p className="font-mono text-xs text-muted-foreground">
                          Completed {new Date(completed.completedDate).toLocaleDateString()} | {course.hours} CEU{course.hours !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button className="brutalist-btn bg-card text-foreground flex-1 py-2 text-sm inline-flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" />
                        PDF
                      </button>
                      <button className="brutalist-btn bg-accent text-accent-foreground flex-1 py-2 text-sm inline-flex items-center justify-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        CE Broker
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="brutalist-card p-8 text-center">
              <Award className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="font-mono text-muted-foreground">// No certificates yet. Complete a course to deploy your first one.</p>
              <Link to="/catalog">
                <button className="brutalist-btn bg-primary text-primary-foreground mt-4 px-6 py-3 text-sm">
                  Browse Courses
                </button>
              </Link>
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
}
