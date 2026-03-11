import { Link } from "react-router-dom";
import { ArrowRight, Clock, Award, BookOpen } from "lucide-react";
import { courses, userProgress } from "@/data/courses";
import { motion } from "framer-motion";

export default function Dashboard() {
  const completedHoursPercent = (userProgress.completedHours / userProgress.totalHours) * 100;

  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-20"
        >
          <span className="section-marker block mb-6">Progress Overview</span>
          <h1 className="display-massive text-6xl md:text-8xl mb-6">
            My
            <br />
            CEUs.
          </h1>
        </motion.div>

        {/* Stats — rhythmic vertical list */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-20"
        >
          <div className="border-t border-foreground/10">
            {[
              { label: "Hours Completed", value: `${userProgress.completedHours} / ${userProgress.totalHours}`, icon: Clock, detail: `${completedHoursPercent.toFixed(0)}% complete` },
              { label: "Courses Completed", value: userProgress.coursesCompleted.toString(), icon: BookOpen, detail: "of total enrolled" },
              { label: "Certificates Earned", value: userProgress.certificatesEarned.toString(), icon: Award, detail: "verified credentials" },
            ].map((stat, i) => (
              <div key={stat.label} className="grid grid-cols-[60px_1fr_auto] md:grid-cols-[100px_1fr_200px_auto] gap-6 items-center py-8 border-b border-foreground/5">
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                <div>
                  <h3 className="text-sm font-semibold tracking-tight">{stat.label}</h3>
                  <span className="text-xs text-muted-foreground">{stat.detail}</span>
                </div>
                <span className="hidden md:block" />
                <span className="display-massive text-3xl md:text-5xl text-right">{stat.value}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Active Courses */}
        {userProgress.activeCourses.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-20"
          >
            <span className="section-marker block mb-6">04. Continue Learning</span>
            <div className="space-y-0">
              {userProgress.activeCourses.map((active) => {
                const course = courses.find((c) => c.id === active.courseId);
                if (!course) return null;

                return (
                  <Link key={active.courseId} to={`/course/${active.courseId}`}>
                    <div className="grid grid-cols-[auto_1fr_auto] gap-6 items-center py-6 border-t border-foreground/5 group hover:bg-muted/30 transition-colors px-2 -mx-2">
                      <div className="text-3xl w-12 h-12 flex items-center justify-center">
                        {course.thumbnail}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold tracking-tight mb-1 group-hover:underline underline-offset-4">{course.title}</h3>
                        <div className="flex items-center gap-3">
                          <span className="meta-label">Module {active.lastModule} of {course.modules}</span>
                          <span className="w-px h-3 bg-foreground/15" />
                          <span className="meta-label">{active.progress}%</span>
                        </div>
                        {/* Progress bar — thin line */}
                        <div className="h-px bg-muted mt-3 w-full max-w-xs">
                          <div className="h-full bg-foreground transition-all" style={{ width: `${active.progress}%` }} />
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.section>
        )}

        {/* Certificate Wallet */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="section-marker block mb-6">05. Certificates</span>
          {userProgress.completedCourses.length > 0 ? (
            <div className="space-y-0">
              {userProgress.completedCourses.map((completed) => {
                const course = courses.find((c) => c.id === completed.courseId);
                if (!course) return null;

                return (
                  <div key={completed.certificateId} className="py-6 border-t border-foreground/5">
                    <div className="grid grid-cols-[auto_1fr] gap-6 items-center mb-4">
                      <Award className="w-5 h-5" strokeWidth={1.5} />
                      <div>
                        <h3 className="text-sm font-semibold tracking-tight">{course.title}</h3>
                        <span className="meta-label">
                          {new Date(completed.completedDate).toLocaleDateString()} — {course.hours} CEU{course.hours !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-3 ml-11">
                      <button className="btn-primary text-xs py-2 px-4">Download PDF</button>
                      <button className="btn-outline text-xs py-2 px-4">CE Broker</button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-16 text-center border-t border-foreground/5">
              <Award className="w-10 h-10 mx-auto mb-4 text-muted-foreground" strokeWidth={1} />
              <p className="text-sm text-muted-foreground mb-6">No certificates yet.</p>
              <Link to="/catalog">
                <button className="btn-primary">Browse Courses</button>
              </Link>
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
}
