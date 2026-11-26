import { Link, useParams } from "react-router";
import PageHead from "@/components/layout/PageHead";
import CtaBanner from "@/components/ui/CtaBanner";
import PageHero from "@/components/ui/PageHero";
import { INSIGHTS } from "@/data/insights";
import NotFoundPage from "./NotFoundPage";

const RELATED_LINKS = {
  "1": [["Custom software development", "/business/custom-software-development/"], ["Discuss a software project", "/contact/?type=business"]],
  "2": [["Custom software development", "/business/custom-software-development/"], ["Discuss an automation requirement", "/contact/?type=business"]],
  "3": [["Custom software development", "/business/custom-software-development/"], ["Explore selected projects", "/projects/"]],
  "4": [["Website development in Kerala", "/business/website-development/"], ["E-commerce development", "/business/ecommerce-development/"]],
  "5": [["Website development services", "/business/website-development/"], ["Contact Zenith Softworks", "/contact/"]],
  "6": [["Website development", "/business/website-development/"], ["Website redesign", "/business/website-redesign/"]],
  "7": [["E-commerce development", "/business/ecommerce-development/"], ["Discuss an online store", "/contact/?type=business"]],
  "8": [["BCA and student project support", "/student-projects/"], ["Browse project ideas", "/student-project-ideas/"]],
  "9": [["Student project development", "/student-projects/"], ["Explore software projects", "/projects/"]],
  "10": [["Python project development", "/student-projects/python-project-development/"], ["Student project support", "/student-projects/"]],
  "11": [["BCA, BTech and MCA project support", "/student-projects/"], ["Discuss a project topic", "/contact/?type=student"]],
  "12": [["Custom software development", "/business/custom-software-development/"], ["Discuss business requirements", "/contact/?type=business"]],
  "13": [["Custom software development", "/business/custom-software-development/"], ["Contact Zenith Softworks", "/contact/"]],
  "14": [["Website development", "/business/website-development/"], ["Website redesign", "/business/website-redesign/"]],
  "15": [["Website development services", "/business/website-development/"], ["Website redesign services", "/business/website-redesign/"]]
};

export default function InsightDetailPage() {
  const { id } = useParams();
  const article = INSIGHTS.find((item) => item.id === id);

  if (!article) return <NotFoundPage />;

  return (
    <>
      <PageHead />
      <PageHero
        eyebrow="Zenith insight"
        title={article.title}
        description={article.summary}
        actions={
          <Link
            to="/resources/"
            className="z-btn z-btn-secondary z-btn-sm"
          >
            ← All insights
          </Link>
        }
      />

      <article className="z-section">
        <div className="mx-auto max-w-3xl space-y-10 px-5 sm:px-8">
          {article.sections.map((section) => (
            <section key={section.heading} className="space-y-3">
              <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                {section.heading}
              </h2>
              <p className="text-base leading-relaxed text-muted">{section.body}</p>
            </section>
          ))}
          <section className="border-t border-line pt-8">
            <h2 className="font-display text-2xl font-bold text-ink">Related services and resources</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {(RELATED_LINKS[id] || [["Explore all services", "/business/"], ["Contact Zenith Softworks", "/contact/"]]).map(([label, href]) => (
                <Link key={href} to={href} className="z-btn z-btn-secondary z-btn-sm">{label} ↗</Link>
              ))}
            </div>
          </section>
        </div>
      </article>

      <CtaBanner title="Applying these principles to a new system?" />
    </>
  );
}
