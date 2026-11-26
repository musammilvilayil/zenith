import PageHead from "@/components/layout/PageHead";
import PageHero from "@/components/ui/PageHero";
import { SITE } from "@/data/site";

const LEGAL_COPY = {
  privacy: {
    title: "Privacy Policy",
    updated: "Last updated: 26 November 2026",
    body: "When you contact Zenith Softworks through a website form or WhatsApp, you may provide information such as your name, email address, phone number, business or college details, course, project requirements, preferred technology and expected timeline. We use the information you choose to provide to review and respond to your enquiry, discuss project scope and coordinate the next steps. Form submissions may be delivered to Zenith Softworks by email through our configured service. We do not sell personal information. Please do not submit passwords, payment card details, government identity numbers or other sensitive records through the enquiry form. You may contact us to ask about information you have submitted.",
  },
  terms: {
    title: "Terms of Use",
    updated: "Last updated: 26 November 2026",
    body: "Website information is provided for general guidance. Project scope, price, timeline, ownership, support, confidentiality and payment terms are governed by a separate written agreement. Quotations are prepared after reviewing requirements and are not implied by general website descriptions. Academic project services are intended to support practical development and technical understanding; students remain responsible for following their institution's academic integrity and authorship rules. Portfolio descriptions may be simplified and do not disclose confidential information.",
  },
};

export default function LegalPage({ type = "privacy" }) {
  const doc = LEGAL_COPY[type] || LEGAL_COPY.privacy;
  return (
    <>
      <PageHead />
      <PageHero eyebrow="Legal" title={doc.title} description={doc.updated} />
      <section className="z-section"><div className="mx-auto max-w-3xl space-y-8 px-5 sm:px-8"><p className="text-lg leading-relaxed text-ink/95">{doc.body}</p><div className="border-t border-line pt-6"><h2 className="font-display text-2xl font-bold text-ink">Contact</h2><p className="mt-2 text-sm text-muted">Questions may be sent to <a href={`mailto:${SITE.helloEmail}`} className="text-ice underline-offset-4 hover:underline">{SITE.helloEmail}</a>.</p></div></div></section>
    </>
  );
}