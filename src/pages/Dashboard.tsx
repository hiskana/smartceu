import { Link } from "react-router-dom";
import { Download, ExternalLink, Clock, Award, BookOpen, Play } from "lucide-react";
import { courses, userProgress } from "@/data/courses";
import { motion } from "framer-motion";

export default function Dashboard() {
  const completedHoursPercent = (userProgress.completedHours / userProgress.totalHours) * 100;

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="font-display text-5xl md:text-6xl font-black italic mb-2">My CEUs</h1>
          <span className="annotation text-xl inline-block rotate-[-2deg]">
            ★ track your progress, access certificates
          </span>
        </motion.div>

        {/* Progress Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="editorial-card editorial-card-taped p-6 md:p-8 mb-8 pt-10"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            {/* Progress Ring */}
            <div className="relative">
              <svg className="w-36 h-36 md:w-44 md:h-44 -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke="hsl(0 0% 0% / 0.1)"
                  strokeWidth="14"
                />
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke="hsl(0 72% 51%)"
                  strokeWidth="14"
                  strokeLinecap="butt"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - completedHoursPercent / 100) }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-4xl font-black">{userProgress.completedHours}</span>
                <span className="annotation text-sm">of {userProgress.totalHours} hrs</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex-1 grid grid-cols-3 gap-4 w-full md:w-auto">
              {[
                { label: "Hours Done", value: userProgress.completedHours, icon: Clock },
                { label: "Courses Done", value: userProgress.coursesCompleted, icon: BookOpen },
                { label: "Certificates", value: userProgress.certificatesEarned, icon: Award },
              ].map((stat) => (
                <div key={stat.label} className="bg-card border-[2px] border-foreground p-3 text-center">
                  <stat.icon className="w-4 h-4 mx-auto mb-1" />
                  <span className="font-display text-2xl font-black block">{stat.value}</span>
                  <p className="header-condensed text-[10px] text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Annotation */}
          <span className="annotation text-base inline-block rotate-[2deg] mt-4">
            ★ positive trend — keep going!
          </span>
        </motion.div>

        {/* Active Courses */}
        {userProgress.activeCourses.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="header-condensed text-xl mb-1 editorial-divider pb-2">Continue Learning</h2>
            <span className="annotation text-base inline-block rotate-[-1deg] mb-4">pick up where you left off →</span>
            <div className="space-y-4">
              {userProgress.activeCourses.map((active) => {
                const course = courses.find((c) => c.id === active.courseId);
                if (!course) return null;

                return (
                  <Link key={active.courseId} to={`/course/${active.courseId}`}>
                    <div className="editorial-card p-4 hover:translate-y-[-2px] transition-transform flex items-center gap-4">
                      <div className="w-16 h-16 bg-muted border-[2px] border-foreground flex items-center justify-center flex-shrink-0">
                        <span className="text-3xl">{course.thumbnail}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="header-condensed text-sm mb-1 truncate">{course.title}</h3>
                        <span className="annotation text-sm">Module {active.lastModule} of {course.modules}</span>
                        <div className="h-2 bg-muted border-[1px] border-foreground mt-2">
                          <div className="h-full bg-accent transition-all" style={{ width: `${active.progress}%` }} />
                        </div>
                      </div>
                      <div className="w-10 h-10 bg-primary border-[2px] border-foreground flex items-center justify-center flex-shrink-0">
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
          <h2 className="header-condensed text-xl mb-1 editorial-divider pb-2">Certificate Wallet</h2>
          <span className="annotation text-base inline-block rotate-[-1deg] mb-4">your credentials ★</span>
          {userProgress.completedCourses.length > 0 ? (
            <div className="space-y-3">
              {userProgress.completedCourses.map((completed) => {
                const course = courses.find((c) => c.id === completed.courseId);
                if (!course) return null;

                return (
                  <div key={completed.certificateId} className="editorial-card p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-accent border-[2px] border-foreground flex items-center justify-center flex-shrink-0">
                        <Award className="w-6 h-6 text-accent-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="header-condensed text-sm truncate">{course.title}</h3>
                        <span className="annotation text-sm">
                          Completed {new Date(completed.completedDate).toLocaleDateString()} | {course.hours} CEU{course.hours !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button className="editorial-btn flex-1 py-2 text-sm inline-flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" />
                        PDF
                      </button>
                      <button className="sticker-btn flex-1 py-2 text-sm inline-flex items-center justify-center gap-2 rotate-0">
                        <ExternalLink className="w-4 h-4" />
                        CE Broker
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="editorial-card editorial-card-taped p-8 pt-10 text-center">
              <Award className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="font-body text-muted-foreground mb-2">No certificates yet.</p>
              <span className="annotation text-lg inline-block rotate-[-2deg]">complete a course to earn your first! ★</span>
              <div className="mt-4">
                <Link to="/catalog">
                  <button className="editorial-btn px-6 py-3 text-sm">
                    Browse Courses
                  </button>
                </Link>
              </div>
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
}
