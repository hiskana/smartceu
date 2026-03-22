import { Link } from "react-router-dom";
import { ArrowRight, Clock, Award, BookOpen } from "lucide-react";
import { courses, userProgress } from "@/data/courses";
import { motion } from "framer-motion";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260210_031346_d87182fb-b0af-4273-84d1-c6fd17d6bf0f.mp4";

export default function Dashboard() {
  const completedHoursPercent = (userProgress.completedHours / userProgress.totalHours) * 100;

  return (
    <div className="min-h-screen">
      {/* Header — video hero */}
      <section className="relative overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
        <div className="relative z-10 container py-24 md:py-32 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div
              className="inline-flex items-center gap-2.5 h-[38px] px-4 rounded-[10px] border backdrop-blur-md mb-6"
              style={{ background: "rgba(85, 80, 110, 0.4)", borderColor: "rgba(164, 132, 215, 0.5)" }}
            >
              <span className="font-cabin font-medium text-sm text-white">Progress Overview</span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl text-white mb-4 leading-[1.1]">My CEUs.</h1>
          </motion.div>
        </div>
      </section>

      <div className="container py-16 md:py-24">
        {/* Stats — Big number bento cards */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-20"
        >
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: "Hours Completed", value: `${userProgress.completedHours}`, total: `/ ${userProgress.totalHours}`, icon: Clock, detail: `${completedHoursPercent.toFixed(0)}% complete` },
              { label: "Courses Completed", value: userProgress.coursesCompleted.toString(), total: "", icon: BookOpen, detail: "of total enrolled" },
              { label: "Certificates Earned", value: userProgress.certificatesEarned.toString(), total: "", icon: Award, detail: "verified credentials" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="studio-card p-8"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="stat-number text-5xl md:text-6xl">{stat.value}</span>
                  {stat.total && <span className="text-xl font-semibold text-muted-foreground">{stat.total}</span>}
                </div>
                <p className="text-sm font-semibold tracking-tight">{stat.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.detail}</p>
              </motion.div>
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
            <span className="section-marker block mb-6">Continue Learning</span>
            <div className="grid gap-4">
              {userProgress.activeCourses.map((active) => {
                const course = courses.find((c) => c.id === active.courseId);
                if (!course) return null;

                return (
                  <Link key={active.courseId} to={`/course/${active.courseId}`}>
                    <div className="studio-card p-5 md:p-6 flex items-center gap-5 group hover:shadow-studio-lg transition-all duration-300">
                      <div className="text-3xl w-14 h-14 rounded-2xl bg-muted flex items-center justify-center shrink-0">
                        {course.thumbnail}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold tracking-tight mb-1 group-hover:text-primary transition-colors">{course.title}</h3>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="meta-label">Module {active.lastModule} of {course.modules}</span>
                          <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                          <span className="meta-label">{active.progress}%</span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full w-full max-w-xs overflow-hidden">
                          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${active.progress}%` }} />
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
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
          <span className="section-marker block mb-6">Certificates</span>
          {userProgress.completedCourses.length > 0 ? (
            <div className="grid gap-4">
              {userProgress.completedCourses.map((completed) => {
                const course = courses.find((c) => c.id === completed.courseId);
                if (!course) return null;

                return (
                  <div key={completed.certificateId} className="studio-card p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                        <Award className="w-5 h-5 text-accent-foreground" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold tracking-tight">{course.title}</h3>
                        <span className="meta-label">
                          {new Date(completed.completedDate).toLocaleDateString()} — {course.hours} CEU{course.hours !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-3 ml-14">
                      <button className="btn-premium text-xs py-2 px-5">Download PDF</button>
                      <button className="btn-ghost text-xs py-2 px-5">CE Broker</button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="studio-card p-16 text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Award className="w-7 h-7 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground mb-6">No certificates yet.</p>
              <Link to="/catalog">
                <button className="btn-premium">Browse Courses</button>
              </Link>
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
}
