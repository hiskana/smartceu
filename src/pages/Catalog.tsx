import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { courses } from "@/data/courses";
import { motion } from "framer-motion";

const categories = [
  { id: "free", title: "Mandatory Courses", marker: "01" },
  { id: "bundles", title: "Renewal Bundles", marker: "02" },
  { id: "trending", title: "Trending Topics", marker: "03" },
];

export default function Catalog() {
  return (
    <div className="min-h-screen">
      {/* Header — dark cinematic */}
      <section className="section-dark relative overflow-hidden">
        <div className="absolute inset-0 studio-glow" />
        <div className="container relative z-10 py-24 md:py-32 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="section-marker block mb-4" style={{ color: 'hsl(0 0% 55%)' }}>Course Catalog</span>
            <h1 className="display-massive text-5xl md:text-7xl text-white mb-4">
              All Courses.
            </h1>
            <p className="text-sm font-light text-white/50 max-w-md mx-auto">
              Find what you need. Learn at your own pace. Maximum efficiency.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Course listings — light section */}
      <div className="container py-16 md:py-24">
        {categories.map((category, catIndex) => {
          const categoryCourses = courses.filter((c) => c.category === category.id);
          if (categoryCourses.length === 0) return null;

          return (
            <motion.section
              key={category.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: catIndex * 0.1 }}
              className="mb-16"
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="meta-label">{category.marker}</span>
                <h2 className="text-xl font-bold tracking-tight">{category.title}</h2>
              </div>

              <div className="grid gap-4">
                {categoryCourses.map((course, i) => (
                  <Link key={course.id} to={`/course/${course.id}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: catIndex * 0.1 + i * 0.05 }}
                      className="studio-card p-5 md:p-6 flex items-center gap-5 group hover:shadow-studio-lg transition-all duration-300"
                    >
                      <div className="text-3xl w-14 h-14 rounded-2xl bg-muted flex items-center justify-center shrink-0">
                        {course.thumbnail}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold tracking-tight mb-1 group-hover:text-primary transition-colors">
                          {course.title}
                        </h3>
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <span className="flex items-center gap-1 text-xs">
                            <Clock className="w-3 h-3" />
                            {course.duration}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                          <span className="text-xs">{course.modules} modules</span>
                          {course.badge && (
                            <>
                              <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                              <span className="text-[10px] font-mono tracking-wider uppercase text-primary">{course.badge}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="hidden md:flex items-center gap-6">
                        {course.price === 0 ? (
                          <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">Free</span>
                        ) : (
                          <span className="text-sm font-bold">${course.price}</span>
                        )}
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}
