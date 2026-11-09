export const previewCourse = {
  id: "de-escalation",
  version: "preview-1",
  title: "Therapeutic Communication & De-escalation",
  audience: "California psychiatric technicians and LVNs",
  sections: [
    {
      id: "recognize",
      title: "Notice changes early",
      text: "Watch for changes in agitation and consider what may be upsetting the person. Ask about their concerns rather than assuming a cause. Early recognition creates an opportunity to respond calmly.",
      takeaway: "Notice changes and seek to understand the concern.",
    },
    {
      id: "communicate",
      title: "Communicate with respect",
      text: "Use a respectful tone and allow personal space. Where appropriate, one staff member should lead the conversation so the person is not overwhelmed by competing voices. Listen and clarify what they need.",
      takeaway: "Keep communication calm, clear, and coordinated.",
    },
    {
      id: "safety",
      title: "Keep safety central",
      text: "Assess safety throughout the interaction. Follow your facility’s emergency procedures and seek trained assistance when needed. This short preview does not teach restraint, medication use, or emergency response skills.",
      takeaway:
        "A learning preview does not replace local protocols or supervised training.",
    },
  ],
  questions: [
    {
      id: "q1",
      section: 0,
      prompt:
        "A person becomes increasingly agitated. What is a useful early response?",
      options: [
        "Assume you know why they are upset.",
        "Notice the change and ask about their concern.",
        "Wait until the situation becomes an emergency.",
      ],
      correct: 1,
      explanation:
        "Recognizing a change and clarifying the concern supports an informed response.",
    },
    {
      id: "q2",
      section: 1,
      prompt:
        "Several staff members are speaking at once. What could improve communication?",
      options: [
        "Coordinate one primary communicator.",
        "Have everyone repeat instructions more loudly.",
        "Move closer to demand attention.",
      ],
      correct: 0,
      explanation:
        "One primary communicator can reduce competing messages while respecting personal space.",
    },
    {
      id: "q3",
      section: 2,
      prompt:
        "The situation is becoming unsafe. What should guide your next action?",
      options: [
        "Continue alone regardless of risk.",
        "Use this preview as authorization for restraint.",
        "Follow facility emergency procedures and seek trained help.",
      ],
      correct: 2,
      explanation:
        "Use your facility’s procedures and trained assistance. This preview is not emergency skills training.",
    },
  ],
};
