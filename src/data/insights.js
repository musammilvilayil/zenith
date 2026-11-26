export const INSIGHTS = [
  {
    id: "1",
    title: "How to scope a custom software project",
    summary: "A practical way to turn a broad business idea into a clear, buildable software brief.",
    sections: [
      { heading: "Describe the problem before the features", body: "Write down who experiences the problem, what they do today and what becomes difficult or slow. A booking system, for example, may need to solve double bookings, missed reminders or scattered customer records. Those problems lead to better requirements than starting with a long list of screens." },
      { heading: "Map users and workflows", body: "Identify each user type and the actions they need to complete. Sketch the main journey from start to finish, including exceptions such as cancellations, failed payments or missing information. This helps reveal permissions, data and integrations early." },
      { heading: "Define a realistic first release", body: "Separate essential features from useful later additions. Agree what will be delivered, what is excluded, which content or accounts the client must provide and how acceptance will be checked. A written scope reduces misunderstandings and makes quotations more meaningful." },
    ],
  },
  {
    id: "2",
    title: "When AI automation is actually useful",
    summary: "How to decide whether a workflow needs AI, conventional automation or a simple software feature.",
    sections: [
      { heading: "Look for uncertainty in the task", body: "AI can be useful when a task involves interpreting unstructured information, classifying varied inputs, summarising documents or generating a draft. If the task follows fixed rules—such as calculating a total or checking whether a field is empty—ordinary code is usually more predictable." },
      { heading: "Check the cost of a wrong answer", body: "Consider what happens when the system is incorrect. Customer-facing recommendations, financial actions and sensitive decisions need appropriate human review, validation and fallback behaviour. Do not automate a high-impact decision just because a model can produce an answer." },
      { heading: "Start with a measurable pilot", body: "Choose one narrow workflow and compare time, error rate and operating cost before and after automation. Include monitoring and a way for people to correct mistakes. Keep the solution only if it produces a measurable improvement over the simpler alternative." },
    ],
  },
  {
    id: "3",
    title: "MVP does not mean disposable",
    summary: "Build the smallest useful product while keeping the foundations understandable and maintainable.",
    sections: [
      { heading: "Keep the first version focused", body: "An MVP should test a meaningful assumption with the fewest essential features. It does not need every integration, dashboard or automation imagined for the future. A narrow release makes feedback easier to interpret and reduces avoidable development work." },
      { heading: "Do not skip basic engineering", body: "Even a small product needs clear data ownership, sensible access control, input validation, error handling and backups appropriate to its risk. These foundations prevent a quick experiment from becoming unsafe or impossible to maintain." },
      { heading: "Leave room to learn", body: "Use modular code, documented decisions and a simple release process. Track how people use the product and review what should change after real feedback. The aim is not to predict every future feature, but to avoid choices that make reasonable changes unnecessarily difficult." },
    ],
  },
];