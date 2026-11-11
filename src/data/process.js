/** Collaboration workflow shown on the homepage and service pages. */
export const PROCESS_STEPS = [
  {
    num: "01",
    title: "Discovery",
    desc: "Goals, audience, constraints and the real problem to solve.",
    output: "Shared brief",
  },
  {
    num: "02",
    title: "Planning",
    desc: "Scope, content, user journeys, milestones and a quotation you can review.",
    output: "Scope & roadmap",
  },
  {
    num: "03",
    title: "Design",
    desc: "A shared design direction and interfaces that feel natural to use.",
    output: "Approved design",
  },
  {
    num: "04",
    title: "Development",
    desc: "Maintainable engineering in clear milestones, with code review and visible progress.",
    output: "Working build",
  },
  {
    num: "05",
    title: "Testing",
    desc: "Responsive, content, functional and production checks before anything goes live.",
    output: "QA checklist",
  },
  {
    num: "06",
    title: "Launch & Support",
    desc: "Deployment, handover, documentation and continuous improvement after launch.",
    output: "Live product",
  },
];

/** Three ways to engage, with what a client can expect from each. */
export const ENGAGEMENT_PATHS = [
  {
    num: "01",
    title: "Business Website",
    desc: "A credible, enquiry-ready presence for a business or professional.",
    expect: [
      "Discovery and sitemap",
      "Custom responsive design",
      "WhatsApp and enquiry integration",
      "SEO and performance foundations",
    ],
    to: "/contact/?service=Business%20website",
  },
  {
    num: "02",
    title: "Growth System",
    desc: "Richer content, lead journeys, bookings, catalogues and optimisation.",
    expect: [
      "Positioning and conversion structure",
      "Booking, catalogue or lead workflows",
      "Analytics and conversion tracking",
      "Optimisation plan and maintenance options",
    ],
    to: "/contact/?service=Growth%20website",
  },
  {
    num: "03",
    title: "Custom Platform",
    desc: "A portal, SaaS product, mobile app or internal platform built to fit.",
    expect: [
      "User roles and information architecture",
      "Data model, integrations and permissions",
      "Incremental builds with code review",
      "Deployment, documentation and support",
    ],
    to: "/contact/?service=Web%20application",
  },
];
