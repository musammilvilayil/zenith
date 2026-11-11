import PageHead from "@/components/layout/PageHead";
import CtaBanner from "@/components/ui/CtaBanner";
import PageHero from "@/components/ui/PageHero";
import PortfolioCard from "@/components/ui/PortfolioCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { CASE_STUDIES } from "@/data/work";

// Asymmetric 12-column rhythm: wide/narrow, then narrow/wide.
const LAYOUT = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

export default function WorkPage() {
  return (
    <>
      <PageHead />
      <PageHero
        eyebrow="Selected work"
        title="Systems built around real constraints."
        description="Each project starts with a specific operational problem and becomes a product that people can understand, use and maintain."
        meta={`${CASE_STUDIES.length} projects`}
      />

      <section className="z-section">
        <div className="z-container">
          <SectionHeading
            index="Index"
            meta="Product engineering · Platforms · Mobile + IoT"
            title="Projects in focus"
            size="md"
            description="Cloud workspaces, healthcare intelligence, safety technology and collaboration systems—each shaped around the people who use it."
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-12">
            {CASE_STUDIES.map((project, idx) => (
              <PortfolioCard
                key={project.slug}
                project={project}
                headingLevel="h2"
                feature={LAYOUT[idx % LAYOUT.length] === "lg:col-span-7"}
                className={LAYOUT[idx % LAYOUT.length]}
              />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner title="Have a similar challenge?" primaryLabel="Start a conversation" />
    </>
  );
}
