import { useSearchParams } from "react-router-dom";
import PageHead from "@/components/layout/PageHead";
import EnquiryForm from "@/components/ui/EnquiryForm";
import PageHero from "@/components/ui/PageHero";
import { SITE } from "@/data/site";

export default function ContactPage() {
  const [params] = useSearchParams();
  const mode = params.get("type") === "student" ? "student" : "business";
  const isStudent = mode === "student";

  return (
    <>
      <PageHead />
      <PageHero
        eyebrow={isStudent ? "Student project enquiry" : "Business project enquiry"}
        title={isStudent ? "Tell us about your academic project." : "Tell us what your business needs to achieve."}
        description={isStudent
          ? "Share your course, project topic, college requirements and submission deadline. We will review the scope and discuss the next step."
          : "Share your business goals, required functionality and timeline. We will review the requirements before preparing a project-specific quotation."}
        meta="Based in Kerala · Remote delivery across India"
      />
      <section className="z-section">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <aside className="space-y-7">
            <div>
              <span className="z-label z-label-accent">Choose your enquiry</span>
              <div className="mt-4 flex flex-wrap gap-2">
                <a className={`z-btn z-btn-sm ${!isStudent ? "z-btn-primary" : "z-btn-secondary"}`} href="/contact/?type=business">Business project</a>
                <a className={`z-btn z-btn-sm ${isStudent ? "z-btn-primary" : "z-btn-secondary"}`} href="/contact/?type=student">Student project</a>
              </div>
            </div>
            <div className="z-card p-6">
              <h2 className="font-display text-xl font-bold">What happens next?</h2>
              <ol className="mt-5 space-y-4 text-sm text-muted">
                <li><strong className="text-ink">01 · Review</strong><br/>We review your goals, requirements and likely scope.</li>
                <li><strong className="text-ink">02 · Clarify</strong><br/>We follow up through WhatsApp, email or a short call.</li>
                <li><strong className="text-ink">03 · Propose</strong><br/>We discuss deliverables, timeline and a custom quotation.</li>
              </ol>
            </div>
            <div className="rounded-2xl border border-line bg-deep p-6 text-sm leading-relaxed text-muted">
              <strong className="block font-display text-base text-ink">Direct contact</strong>
              <p className="mt-2">WhatsApp: <a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer" className="text-ice underline-offset-4 hover:underline">{SITE.whatsappDisplay}</a></p>
              <p>Email: <a href={`mailto:${SITE.email}`} className="text-ice underline-offset-4 hover:underline">{SITE.email}</a></p>
              <p className="mt-2 text-soft-blue">Kerala, India · Remote delivery across India</p>
            </div>
          </aside>
          <EnquiryForm mode={mode} />
        </div>
      </section>
    </>
  );
}