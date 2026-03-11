import { Link } from "react-router-dom";
import { Play, Clock, ChevronRight } from "lucide-react";
import { courses } from "@/data/courses";
import { motion } from "framer-motion";

const categories = [
  { id: "free", title: "Free Mandatory Courses", description: "// Required for California renewals" },
  { id: "bundles", title: "Renewal Bundles", description: "// Everything you need in one package" },
  { id: "trending", title: "Trending Topics", description: "// Popular courses for modern nurses" },
];

export default function Catalog() {
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
            <h1 className="font-display text-3xl md:text-4xl font-bold uppercase">Course Catalog</h1>
          </div>
          <p className="font-mono text-sm text-muted-foreground mt-2">{'>'} Find the CEUs you need. Learn at your pace.</p>
        </motion.div>

        {/* Category Rows */}
        {categories.map((category, catIndex) => {
          const categoryCourses = courses.filter((c) => c.category === category.id);
          if (categoryCourses.length === 0) return null;

          return (
            <motion.section
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1 }}
              className="mb-10"
            >
              <div className="flex items-center justify-between mb-4 brutalist-divider pb-3">
                <div>
                  <h2 className="font-display text-xl font-bold uppercase">{category.title}</h2>
                  <p className="font-mono text-xs text-muted-foreground">{category.description}</p>
                </div>
                <div className="bg-foreground text-background p-1">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>

              {/* Horizontal scroll */}
              <div className="flex gap-5 overflow-x-auto hide-scrollbar pb-2 -mx-4 px-4">
                {categoryCourses.map((course, i) => (
                  <Link
                    key={course.id}
                    to={`/course/${course.id}`}
                    className="flex-shrink-0 w-64 md:w-72"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: catIndex * 0.1 + i * 0.05 }}
                      className="brutalist-card overflow-hidden group hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_hsl(0_0%_0%)] transition-all"
                    >
                      {/* Thumbnail */}
                      <div className="aspect-video bg-muted relative flex items-center justify-center border-b-[3px] border-foreground">
                        <span className="text-5xl">{course.thumbnail}</span>
                        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="w-12 h-12 bg-primary border-[2px] border-foreground flex items-center justify-center">
                            <Play className="w-5 h-5 text-primary-foreground ml-0.5" fill="currentColor" />
                          </div>
                        </div>
                        {/* Price badge */}
                        <div className="absolute top-2 right-2">
                          {course.price === 0 ? (
                            <span className="bg-primary text-primary-foreground font-bold text-xs px-3 py-1 border-[2px] border-foreground uppercase" style={{ boxShadow: '2px 2px 0px 0px hsl(0 0% 0%)' }}>
                              Free
                            </span>
                          ) : (
                            <span className="bg-secondary text-secondary-foreground font-bold text-xs px-3 py-1 border-[2px] border-foreground" style={{ boxShadow: '2px 2px 0px 0px hsl(0 0% 0%)' }}>
                              ${course.price}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="font-display font-bold text-base mb-1 line-clamp-1 uppercase">
                          {course.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-3">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{course.duration}</span>
                          <span>|</span>
                          <span>{course.modules} modules</span>
                        </div>
                        {course.badge && (
                          <span className="pixel-text bg-accent/20 border-[1px] border-foreground px-2 py-0.5 text-[10px]">
                            {course.badge}
                          </span>
                        )}
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
