import { Link, useParams } from "react-router-dom";
import PageHead from "@/components/layout/PageHead";
import PageHero from "@/components/ui/PageHero";
import CtaBanner from "@/components/ui/CtaBanner";
import NotFoundPage from "./NotFoundPage";

const TRACKS = {
  "bca-project-development": { label:"BCA", title:"BCA Final Year Project Development and Support", intro:"Your BCA final-year project is an opportunity to apply what you have learned in programming, databases and software development. We help discuss the requirements, plan a suitable application and implement agreed features with technical walkthroughs.", areas:["Python-based applications","Full-stack web applications","Database management systems","Management and booking systems","Automation and utility applications"], tech:"HTML, CSS, JavaScript, React, Node.js, Express, Python, MySQL, PostgreSQL and MongoDB where suitable.", faq:"We first review your course requirements, topic, preferred technologies and submission deadline. The project scope and deliverables are agreed before development." },
  "btech-project-development": { label:"BTech", title:"BTech Software Project Development Support", intro:"BTech software projects need a feasible technical scope and a clear implementation plan. We discuss computer science and IT-related project requirements and develop agreed software features with a focus on understandable implementation.", areas:["Full-stack software applications","AI and machine learning applications","Database-driven systems","Automation and API integrations","Management dashboards"], tech:"The stack depends on the project: JavaScript, React, Node.js, Python, databases and relevant ML libraries.", faq:"We assess feasibility, technical depth, available data, hardware dependencies and college guidelines before confirming a project." },
  "mca-project-development": { label:"MCA", title:"MCA Final Year Software Project Development", intro:"MCA projects can involve advanced application requirements, database design, backend development, system integration and practical software implementation. We help plan and build an agreed scope with technical explanations.", areas:["Advanced web applications","Database-driven management systems","Python applications","AI/ML integrations where feasible","APIs and workflow systems"], tech:"React, Node.js, Express, Python, SQL databases, MongoDB and other appropriate technologies.", faq:"We review the project synopsis, required modules, technology constraints and expected deliverables before preparing a custom scope." },
  "python-project-development": { label:"Python", title:"Python Project Development for College Students", intro:"Python projects can cover automation, data processing, web applications, APIs and machine learning. We help evaluate the idea, choose a suitable implementation and develop agreed features.", areas:["Python automation tools","Flask or Django web applications","Data processing applications","API-based applications","Machine learning prototypes"], tech:"Python, Flask, Django, FastAPI, SQL databases and suitable data or ML libraries.", faq:"The project is scoped around the dataset, required functionality, runtime environment and the student's academic requirements." },
  "ai-ml-project-development": { label:"AI & ML", title:"AI and Machine Learning Project Development", intro:"AI and machine learning projects can involve dataset preparation, model development, evaluation and integration into an application. We define measurable objectives and check technical feasibility before development.", areas:["Dataset preparation and analysis","Classification and prediction models","Model evaluation and comparison","ML-powered web applications","Model integration and visualisation"], tech:"Python, pandas, scikit-learn and suitable frameworks or APIs depending on the model and available data.", faq:"We check data availability, licensing, model feasibility, evaluation criteria and the intended demonstration before accepting the scope." },
  "web-development-projects": { label:"Web Development", title:"Full-Stack Web Application Projects for Students", intro:"Build a working web application with frontend interfaces, backend APIs, database integration and agreed features. We discuss the architecture and explain the implementation so students can understand the system.", areas:["Role-based web applications","Admin dashboards","Booking and appointment systems","Student and campus portals","Inventory and management systems"], tech:"HTML, CSS, JavaScript, React, Node.js, Express, REST APIs, PostgreSQL, MySQL and MongoDB.", faq:"We plan the user roles, pages, API endpoints, database structure and deployment requirements based on the project brief." },
};

const MAIN_AREAS = [
  ["Python applications","Automation, backend development, data processing and suitable ML workflows."],
  ["AI and machine learning","Dataset preparation, model evaluation and application integration where feasible."],
  ["Full-stack web applications","Frontend, backend, APIs, authentication and database integration."],
  ["Database applications","Structured data storage, retrieval, user management and reporting."],
];

const PROCESS = ["Share your course, topic and college requirements","Discuss scope, feasibility and timeline","Agree features and development milestones","Develop and test the application","Review the code and understand the implementation","Complete agreed handover and demonstration preparation"];

export default function StudentProjectLandingPage() {
  const { slug } = useParams();
  const detail = slug ? TRACKS[slug] : null;
  if (slug && !detail) return <NotFoundPage />;

  return (
    <>
      <PageHead />
      <PageHero
        eyebrow={detail ? `Student project development · ${detail.label}` : "Academic software project development · India"}
        title={detail?.title || "Build Your Final Year Project with Practical Development Support"}
        description={detail?.intro || "Have a project idea but need help turning it into a working application? Zenith Softworks provides academic software project development for students who need practical implementation support, agreed documentation and technical walkthroughs. Students should participate in understanding and presenting their project."}
        actions={<><Link to={`/contact/?type=student${detail ? `&course=${encodeURIComponent(detail.label)}` : ""}`} className="z-btn z-btn-primary">Discuss Your Student Project</Link><Link to="/projects/" className="z-btn z-btn-secondary">Explore Project Work</Link><Link to="/student-project-ideas/" className="z-btn z-btn-secondary">Browse Project Ideas</Link></>}
        meta="Based in Kerala · Remote project delivery across India"
      />
      {detail ? (
        <>
          <section className="z-section"><div className="z-container grid gap-10 lg:grid-cols-2"><div><span className="z-label z-label-accent">Project areas</span><h2 className="z-display-md mt-4">Possible project directions</h2><p className="mt-4 text-muted">The final scope depends on your course requirements, topic, timeline and technical feasibility.</p></div><ul className="z-card grid gap-3 p-7">{detail.areas.map((a)=><li key={a} className="flex gap-3"><span className="text-ice">✦</span>{a}</li>)}</ul></div></section>
          <section className="z-section border-y border-line bg-navy/40"><div className="z-container"><h2 className="z-display-md">Technologies and implementation</h2><p className="mt-4 max-w-3xl leading-relaxed text-muted">{detail.tech}</p><p className="mt-5 max-w-3xl leading-relaxed text-muted">We discuss the architecture, modules, database and implementation choices as part of the project walkthrough.</p></div></section>
          <section className="z-section"><div className="z-container max-w-4xl"><h2 className="z-display-md">Frequently asked question</h2><article className="mt-8 border-t border-line py-6"><h3 className="font-display text-lg font-bold">How do you scope a {detail.label} project?</h3><p className="mt-3 leading-relaxed text-muted">{detail.faq}</p></article></div></section>
        </>
      ) : (
        <>
          <section className="z-section"><div className="z-container"><div className="max-w-3xl"><span className="z-label z-label-accent">Who we support</span><h2 className="z-display-md mt-4">Project development for computing students.</h2><p className="mt-4 leading-relaxed text-muted">We discuss requirements from BCA, BTech, MCA and other relevant computing programmes. Each project is evaluated individually before confirming feasibility and scope.</p></div><div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[["BCA","/student-projects/bca-project-development/"],["BTech","/student-projects/btech-project-development/"],["MCA","/student-projects/mca-project-development/"]].map(([name,to])=><Link key={name} to={to} className="z-card z-card-interactive p-6"><span className="z-num">ACADEMIC PROGRAMME</span><h3 className="mt-3 font-display text-2xl font-bold">{name} Projects</h3><span className="mt-5 inline-flex text-sm font-semibold text-ice">Explore development support ↗</span></Link>)}</div></div></section>
          <section className="z-section border-y border-line bg-navy/40"><div className="z-container"><h2 className="z-display-md">Project development areas</h2><div className="mt-8 grid gap-4 sm:grid-cols-2">{MAIN_AREAS.map(([title,desc])=><article key={title} className="z-card p-6"><h3 className="font-display text-xl font-bold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p></article>)}</div><div className="mt-8 flex flex-wrap gap-3">{Object.entries(TRACKS).filter(([slug])=>slug.includes("python")||slug.includes("ai-ml")||slug.includes("web-development")).map(([slug,track])=><Link key={slug} to={`/student-projects/${slug}/`} className="z-btn z-btn-secondary z-btn-sm">{track.label} projects</Link>)}</div></div></section>
        </>
      )}
      <section className="z-section"><div className="z-container"><h2 className="z-display-md">How project development works</h2><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{PROCESS.map((step,i)=><article key={step} className="z-card p-5"><span className="z-num">0{i+1}</span><p className="mt-3 text-sm leading-relaxed text-muted">{step}</p></article>)}</div><p className="mt-7 max-w-4xl text-sm leading-relaxed text-muted">The exact deliverables depend on the agreed scope and college requirements. Students should follow their institution's academic integrity and authorship rules. We do not guarantee grades or academic outcomes.</p></div></section>
      <CtaBanner title="Have a final-year project requirement?" primaryLabel="Discuss your project" primaryHref="/contact/?type=student" />
    </>
  );
}
