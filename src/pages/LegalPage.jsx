import PageHead from "@/components/layout/PageHead";
import PageHero from "@/components/ui/PageHero";
import { SITE } from "@/data/site";

const LEGAL_COPY = {
  privacy: {
    title: "Privacy Policy",
    updated: "Last updated: 29 July 2026",
    body: "We collect only the information you submit through the enquiry form, such as your name, contact details and project description. We use it to respond to your request and plan potential work. We do not sell personal information. Avoid submitting credentials, financial information or sensitive records.",
  },
  terms: {
    title: "Terms of Use",
    updated: "Last updated: 29 July 2026",
    body: "Website information is provided for general guidance. Project scope, price, timeline, ownership, support and confidentiality are governed by a separate written agreement. Portfolio descriptions may be simplified and do not disclose confidential client information.",
  },
};

export default function LegalPage({ type = "privacy" }) {
  const doc = LEGAL_COPY[type] || LEGAL_COPY.privacy;

  return (
    <>
      <PageHead />
      <PageHero eyebrow="Legal" title={doc.title} description={doc.updated} />

      <section className="z-section">
        <div className="mx-auto max-w-3xl space-y-8 px-5 sm:px-8">
          <p className="text-lg leading-relaxed text-ink/95">{doc.body}</p>
          <div className="border-t border-line pt-6">
            <h2 className="font-display text-2xl font-bold text-ink">Contact</h2>
            <p className="mt-2 text-sm text-muted">
              Questions may be sent to{" "}
              <a href={`mailto:${SITE.helloEmail}`} className="text-ice underline-offset-4 hover:underline">
                {SITE.helloEmail}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
