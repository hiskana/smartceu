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
    <div className="min-h-screen py-16 md:py-24">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-20"
        >
          <span className="section-marker block mb-6">Course Catalog</span>
          <h1 className="display-massive text-6xl md:text-8xl mb-6">
            All
            <br />
            Courses.
          </h1>
          <p className="text-sm font-light leading-[1.8] text-muted-foreground max-w-md">
            Find what you need. Learn at your own pace.
            Each course is designed for maximum efficiency.
          </p>
        </motion.div>

        {/* Categories */}
        {categories.map((category, catIndex) => {
          const categoryCourses = courses.filter((c) => c.category === category.id);
          if (categoryCourses.length === 0) return null;

          return (
            <motion.section
              key={category.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: catIndex * 0.1 }}
              className="mb-20"
            >
              <div className="flex items-center gap-6 mb-8 border-t border-foreground/10 pt-6">
                <span className="font-mono text-sm text-muted-foreground">{category.marker}</span>
                <h2 className="text-lg font-bold tracking-tight">{category.title}</h2>
              </div>

              {/* Course list — rhythmic vertical layout */}
              <div className="space-y-0">
                {categoryCourses.map((course, i) => (
                  <Link key={course.id} to={`/course/${course.id}`}>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: catIndex * 0.1 + i * 0.05 }}
                      className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[80px_1fr_200px_auto] gap-4 md:gap-8 items-center py-6 border-t border-foreground/5 group hover:bg-muted/30 transition-colors px-2 -mx-2"
                    >
                      {/* Emoji */}
                      <div className="text-3xl w-12 h-12 flex items-center justify-center">
                        {course.thumbnail}
                      </div>

                      {/* Title + meta */}
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold tracking-tight mb-1 group-hover:underline underline-offset-4">
                          {course.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {course.duration}
                          </span>
                          <span className="w-px h-3 bg-foreground/15" />
                          <span>{course.modules} modules</span>
                          {course.badge && (
                            <>
                              <span className="w-px h-3 bg-foreground/15" />
                              <span className="font-mono text-[10px] tracking-wider uppercase">{course.badge}</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Price */}
                      <div className="hidden md:block text-right">
                        {course.price === 0 ? (
                          <span className="meta-label">Free</span>
                        ) : (
                          <span className="text-sm font-medium">${course.price}</span>
                        )}
                      </div>

                      {/* Arrow */}
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
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
