import { Link } from "react-router-dom";
import { Play, Clock, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { courses } from "@/data/courses";
import { motion } from "framer-motion";

const categories = [
  { id: "free", title: "Free Mandatory Courses", description: "Start here — required for California renewals" },
  { id: "bundles", title: "Renewal Bundles", description: "Everything you need in one package" },
  { id: "trending", title: "Trending Topics", description: "Popular courses for modern nurses" },
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
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Course Catalog</h1>
          <p className="text-muted-foreground">Find the CEUs you need. Learn at your pace.</p>
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
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-display text-xl font-semibold">{category.title}</h2>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>

              {/* Horizontal scroll */}
              <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 -mx-4 px-4">
                {categoryCourses.map((course, i) => (
                  <Link
                    key={course.id}
                    to={`/course/${course.id}`}
                    className="flex-shrink-0 w-64 md:w-72"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: catIndex * 0.1 + i * 0.05 }}
                      className="glass rounded-2xl overflow-hidden hover:glow-teal transition-all group"
                    >
                      {/* Thumbnail */}
                      <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 relative flex items-center justify-center">
                        <span className="text-5xl">{course.thumbnail}</span>
                        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                            <Play className="w-5 h-5 text-primary-foreground ml-0.5" fill="currentColor" />
                          </div>
                        </div>
                        {/* Price badge */}
                        <div className="absolute top-3 right-3">
                          {course.price === 0 ? (
                            <Badge className="bg-primary text-primary-foreground">FREE</Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-card/90 text-foreground">
                              ${course.price}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="font-display font-semibold text-base mb-1 line-clamp-1">
                          {course.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{course.duration}</span>
                          <span>•</span>
                          <span>{course.modules} modules</span>
                        </div>
                        {course.badge && (
                          <Badge variant="outline" className="text-[10px] font-normal border-primary/30 text-primary">
                            {course.badge}
                          </Badge>
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
