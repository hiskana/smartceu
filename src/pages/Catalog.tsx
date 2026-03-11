import { Link } from "react-router-dom";
import { Play, Clock, ChevronRight } from "lucide-react";
import { courses } from "@/data/courses";
import { motion } from "framer-motion";

const categories = [
  { id: "free", title: "Free Mandatory Courses", annotation: "★ required for CA renewals" },
  { id: "bundles", title: "Renewal Bundles", annotation: "one-time fee, everything included" },
  { id: "trending", title: "Trending Topics", annotation: "what nurses are learning now →" },
];

export default function Catalog() {
  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="font-display text-5xl md:text-6xl font-black italic mb-2">Course Catalog</h1>
          <span className="annotation text-xl inline-block rotate-[-2deg]">
            ★ find what you need, learn at your pace
          </span>
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
              className="mb-12"
            >
              <div className="flex items-end justify-between mb-4 editorial-divider pb-3">
                <div>
                  <h2 className="header-condensed text-2xl">{category.title}</h2>
                  <span className="annotation text-base inline-block rotate-[-1deg]">{category.annotation}</span>
                </div>
                <div className="bg-primary text-primary-foreground p-1 border-[2px] border-foreground">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>

              {/* Horizontal scroll */}
              <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-2 -mx-4 px-4">
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
                      className="editorial-card editorial-card-taped overflow-hidden group hover:translate-y-[-3px] transition-transform pt-2"
                    >
                      {/* Thumbnail */}
                      <div className="aspect-video bg-muted relative flex items-center justify-center border-b-[2px] border-foreground mx-2 mt-4">
                        <span className="text-5xl">{course.thumbnail}</span>
                        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="w-12 h-12 bg-accent border-[2px] border-foreground flex items-center justify-center">
                            <Play className="w-5 h-5 text-accent-foreground ml-0.5" fill="currentColor" />
                          </div>
                        </div>
                        {/* Price badge */}
                        <div className="absolute top-2 right-2">
                          {course.price === 0 ? (
                            <span className="bg-accent text-accent-foreground font-condensed text-xs px-3 py-1 border-[2px] border-foreground uppercase">
                              Free
                            </span>
                          ) : (
                            <span className="bg-card text-foreground font-condensed text-xs px-3 py-1 border-[2px] border-foreground">
                              ${course.price}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="header-condensed text-base mb-1 line-clamp-1">
                          {course.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs font-body text-muted-foreground mb-3">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{course.duration}</span>
                          <span>|</span>
                          <span>{course.modules} modules</span>
                        </div>
                        {course.badge && (
                          <span className="annotation text-sm inline-block rotate-[-1deg]">
                            ★ {course.badge}
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
