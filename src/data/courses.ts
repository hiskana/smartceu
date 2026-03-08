export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  hours: number;
  price: number;
  badge?: string;
  category: string;
  modules: number;
  thumbnail: string;
  scenarios: Scenario[];
}

export interface Scenario {
  id: string;
  situation: string;
  correctAction: string;
  incorrectAction: string;
}

export const courses: Course[] = [
  {
    id: "implicit-bias",
    title: "Implicit Bias Training",
    description: "Mandatory 1-hour implicit bias training for California healthcare professionals. Required for AB 1407 first renewal.",
    duration: "1 Hour",
    hours: 1,
    price: 0,
    badge: "Mandatory for CA AB 1407",
    category: "free",
    modules: 4,
    thumbnail: "🧠",
    scenarios: [
      { id: "s1", situation: "A patient with visible tattoos and piercings presents with chest pain. Your initial thought is they might be drug-seeking.", correctAction: "Recognize the bias, perform standard cardiac assessment regardless of appearance", incorrectAction: "Order a drug screen first before addressing the chest pain" },
      { id: "s2", situation: "An elderly patient insists they can manage their own insulin injections, but you assume they need help.", correctAction: "Assess their actual capability through demonstration before deciding", incorrectAction: "Override their preference and arrange for home health assistance" },
      { id: "s3", situation: "A non-English speaking patient seems to nod along. You assume they understand your discharge instructions.", correctAction: "Use a certified medical interpreter and teach-back method", incorrectAction: "Continue with discharge since the patient appears to agree" },
    ],
  },
  {
    id: "ca-30hr-bundle",
    title: "California 30-Hour Renewal Bundle",
    description: "Everything you need for BRN/BVNPT renewal. All required topics covered in short-form video modules.",
    duration: "30 Hours",
    hours: 30,
    price: 49,
    badge: "One-Time Fee. No Auto-Renew.",
    category: "bundles",
    modules: 20,
    thumbnail: "📦",
    scenarios: [
      { id: "s1", situation: "During medication administration, you realize the dose seems unusually high for the patient's weight.", correctAction: "Hold the medication and verify the order with the prescribing physician", incorrectAction: "Administer as ordered since the doctor wrote the prescription" },
      { id: "s2", situation: "A colleague asks you to co-sign their documentation for a procedure you did not witness.", correctAction: "Decline and explain you can only sign for care you directly observed", incorrectAction: "Co-sign as a professional courtesy since you trust your colleague" },
    ],
  },
  {
    id: "nurse-burnout",
    title: "Navigating Nurse Burnout",
    description: "Evidence-based strategies for recognizing and combating burnout, compassion fatigue, and moral injury in nursing.",
    duration: "2 Hours",
    hours: 2,
    price: 12,
    category: "trending",
    modules: 6,
    thumbnail: "🔥",
    scenarios: [
      { id: "s1", situation: "You've been picking up extra shifts for 3 weeks straight and notice you're becoming irritable with patients.", correctAction: "Acknowledge the burnout sign and speak with your manager about your schedule", incorrectAction: "Push through — patients need you and short-staffing isn't your fault" },
    ],
  },
  {
    id: "ai-ethics",
    title: "AI Ethics in Nursing",
    description: "Explore the ethical implications of AI-assisted diagnosis, charting, and patient care in modern healthcare settings.",
    duration: "1.5 Hours",
    hours: 1.5,
    price: 12,
    category: "trending",
    modules: 5,
    thumbnail: "🤖",
    scenarios: [
      { id: "s1", situation: "An AI clinical decision support tool recommends a treatment plan that contradicts your clinical judgment.", correctAction: "Use critical thinking to evaluate both perspectives, document your rationale, and consult with the care team", incorrectAction: "Follow the AI recommendation since it has access to more data than you" },
    ],
  },
  {
    id: "de-escalation",
    title: "De-escalating Assaultive Behavior",
    description: "Learn verbal and non-verbal techniques for safely de-escalating aggressive patient encounters.",
    duration: "2 Hours",
    hours: 2,
    price: 15,
    category: "trending",
    modules: 7,
    thumbnail: "🛡️",
    scenarios: [
      { id: "s1", situation: "A patient becomes agitated and starts yelling after a long wait time. They stand up and clench their fists.", correctAction: "Maintain a calm tone, create physical distance, acknowledge their frustration, and offer a specific timeline", incorrectAction: "Match their volume to show authority and tell them to sit down immediately" },
    ],
  },
];

export const userProgress = {
  totalHours: 30,
  completedHours: 3,
  coursesCompleted: 1,
  certificatesEarned: 1,
  activeCourses: [
    { courseId: "ca-30hr-bundle", progress: 10, lastModule: 2 },
  ],
  completedCourses: [
    { courseId: "implicit-bias", completedDate: "2024-12-15", certificateId: "CERT-2024-IB-001" },
  ],
};
