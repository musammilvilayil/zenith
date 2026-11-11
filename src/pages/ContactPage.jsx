import PageHead from "@/components/layout/PageHead";
import EnquiryForm from "@/components/ui/EnquiryForm";
import PageHero from "@/components/ui/PageHero";
import { SITE } from "@/data/site";

const STEPS = [
  {
    num: "01",
    title: "We review the context",
    desc: "Your goal, audience, required workflow and likely scope.",
  },
  {
    num: "02",
    title: "We clarify what is missing",
    desc: "Important questions are resolved through WhatsApp, email or a short call.",
  },
  {
    num: "03",
    title: "We propose the next step",
    desc: "A practical scope, delivery stages, timeline and quotation.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHead />
      <PageHero
        eyebrow="Start a project"
        title="Tell us what the business needs to achieve."
        description="A useful brief does not need perfect technical language. Share the audience, current problem, desired outcome and any important deadline."
      />

      <section className="z-section">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <aside className="space-y-8">
            <div>
              <span className="z-label z-label-accent z-eyebrow">
                What happens next
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold text-ink">
                A requirement review before a quotation.
              </h2>
            </div>

            <div className="space-y-4">
              {STEPS.map((step) => (
                <div
                  key={step.num}
                  className="z-card p-5"
                >
                  <span className="z-num">{step.num}</span>
                  <h3 className="mt-1.5 font-display text-lg font-bold text-ink">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted">{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-line bg-deep p-6 text-sm leading-relaxed text-muted">
              <strong className="block font-display text-base text-ink">Direct contact</strong>
              <p className="mt-2">
                WhatsApp:{" "}
                <a
                  href={SITE.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ice underline-offset-4 hover:underline"
                >
                  {SITE.whatsappDisplay}
                </a>
              </p>
              <p>
                Email:{" "}
                <a href={`mailto:${SITE.email}`} className="text-ice underline-offset-4 hover:underline">
                  {SITE.email}
                </a>
              </p>
              <p className="mt-1 text-soft-blue">Kerala, India</p>
            </div>
          </aside>

          <EnquiryForm mode="contact" />
        </div>
      </section>
    </>
  );
}
