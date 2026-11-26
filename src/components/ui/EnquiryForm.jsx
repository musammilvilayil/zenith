import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SITE } from "@/data/site";

const BUSINESS_SERVICES = ["Business website", "E-commerce website", "Custom software / web application", "Website redesign", "Other"];
const STUDENT_CATEGORIES = ["Python project", "AI / Machine Learning", "Web development", "Database application", "Management system", "Other"];
const TALENT_ROLES = ["Frontend development", "Full stack development", "Mobile app development", "UI/UX design", "QA and documentation", "Content and social media", "AI and automation", "Cloud and DevOps"];

export default function EnquiryForm({ mode = "business" }) {
  const [searchParams] = useSearchParams();
  const isTalent = mode === "talent";
  const isStudent = mode === "student";
  const [startedAt] = useState(() => String(Date.now()));
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Your enquiry will be sent to Zenith Softworks. If email delivery is unavailable, a WhatsApp option will be provided.");
  const [whatsappFallbackUrl, setWhatsappFallbackUrl] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [consent, setConsent] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "", course: "",
    service: "", budget: "", timeline: "", source: "Google / search",
    role: "", portfolio: "", technology: "", deadline: "", college: "", message: "",
  });

  useEffect(() => {
    const service = searchParams.get("service");
    const course = searchParams.get("course");
    const project = searchParams.get("project");
    setForm((prev) => ({
      ...prev,
      ...(service ? { service: isStudent && service.toLowerCase() === "academic project" ? "Other" : service } : {}),
      ...(course ? { course } : {}),
      ...(project && !prev.message ? { message: `Project idea: ${project}. Please review the requirements and discuss development scope.` } : {}),
    }));
  }, [searchParams]);

  const updateField = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!consent) return;
    setSubmitting(true);
    setWhatsappFallbackUrl("");
    setStatusMessage("Sending your details…");

    const payload = {
      ...form,
      company: isStudent ? form.college : form.company,
      service: isStudent ? `Student project — ${form.course} — ${form.service}` : form.service,
      timeline: isStudent ? form.deadline : form.timeline,
      message: isStudent
        ? `Course: ${form.course}\nProject category: ${form.service}\nPreferred technology: ${form.technology || "Not specified"}\nCollege: ${form.college || "Not specified"}\nSubmission deadline: ${form.deadline}\nProject requirements: ${form.message}`
        : form.message,
      enquiry_type: isStudent ? "student-project" : isTalent ? "talent" : "business",
      consent,
      website: honeypot,
      form_started_at: startedAt,
      page: window.location.href,
    };

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!(response.ok && (result.delivered || result.ok))) {
        throw new Error(result.error || "Email delivery could not be confirmed.");
      }
      setStatusMessage("Thank you. Your enquiry has been sent to Zenith Softworks. We will review the details and get back to you.");
      setForm({
        name: "", email: "", phone: "", company: "", course: "", service: "",
        budget: "", timeline: "", source: "Google / search", role: "", portfolio: "",
        technology: "", deadline: "", college: "", message: "",
      });
      setConsent(false);
    } catch (error) {
      const lines = [
        "Hello Zenith Softworks",
        `Enquiry type: ${payload.enquiry_type}`,
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Phone: ${payload.phone}`,
        `Service / category: ${payload.service}`,
        `Course: ${payload.course || "Not applicable"}`,
        `Technology: ${payload.technology || "Not specified"}`,
        `Deadline: ${payload.timeline || "Not specified"}`,
        `Details: ${payload.message}`,
      ];
      setStatusMessage(error.message || "Email delivery could not be confirmed.");
      setWhatsappFallbackUrl(`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`);
    } finally {
      setSubmitting(false);
    }
  };

  const fieldClass = "z-field";
  const labelClass = "flex flex-col gap-2 text-sm font-medium text-muted";

  return (
    <form onSubmit={handleSubmit} className="z-card grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
      <input type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <label className={labelClass}>Name<input name="name" autoComplete="name" required value={form.name} onChange={updateField("name")} className={fieldClass} /></label>
      <label className={labelClass}>Email address<input name="email" type="email" autoComplete="email" required value={form.email} onChange={updateField("email")} className={fieldClass} /></label>
      <label className={labelClass}>WhatsApp number<input name="phone" type="tel" autoComplete="tel" required value={form.phone} onChange={updateField("phone")} className={fieldClass} /></label>

      {isTalent ? (
        <>
          <label className={labelClass}>Primary role<select name="role" required value={form.role} onChange={updateField("role")} className={fieldClass}><option value="">Choose your area</option>{TALENT_ROLES.map((x)=><option key={x}>{x}</option>)}</select></label>
          <label className={labelClass}>Portfolio / GitHub<input name="portfolio" type="url" placeholder="https://" value={form.portfolio} onChange={updateField("portfolio")} className={fieldClass} /></label>
          <label className={labelClass}>Current course / experience<input name="company" value={form.company} onChange={updateField("company")} className={fieldClass} /></label>
        </>
      ) : isStudent ? (
        <>
          <label className={labelClass}>Course<select name="course" required value={form.course} onChange={updateField("course")} className={fieldClass}><option value="">Select your course</option>{["BCA","BTech","MCA","Other"].map((x)=><option key={x}>{x}</option>)}</select></label>
          <label className={labelClass}>Project category<select name="service" required value={form.service} onChange={updateField("service")} className={fieldClass}><option value="">Select category</option>{STUDENT_CATEGORIES.map((x)=><option key={x}>{x}</option>)}</select></label>
          <label className={labelClass}>College / institution<input name="college" value={form.college} onChange={updateField("college")} className={fieldClass} /></label>
          <label className={labelClass}>Preferred technology<input name="technology" placeholder="Example: Python, React, MySQL" value={form.technology} onChange={updateField("technology")} className={fieldClass} /></label>
          <label className={labelClass}>Submission deadline<input name="deadline" type="date" required value={form.deadline} onChange={updateField("deadline")} className={fieldClass} /></label>
        </>
      ) : (
        <>
          <label className={labelClass}>Business / organisation<input name="company" autoComplete="organization" value={form.company} onChange={updateField("company")} className={fieldClass} /></label>
          <label className={labelClass}>Service required<select name="service" required value={form.service} onChange={updateField("service")} className={fieldClass}><option value="">Choose a service</option>{BUSINESS_SERVICES.map((x)=><option key={x}>{x}</option>)}</select></label>
          <label className={labelClass}>Existing website (optional)<input name="portfolio" type="url" placeholder="https://" value={form.portfolio} onChange={updateField("portfolio")} className={fieldClass} /></label>
          <label className={labelClass}>Expected timeline<select name="timeline" value={form.timeline} onChange={updateField("timeline")} className={fieldClass}><option value="">Choose if known</option><option>As soon as practical</option><option>Within 1 month</option><option>1–3 months</option><option>3–6 months</option><option>Flexible</option></select></label>
        </>
      )}

      <label className={`${labelClass} sm:col-span-2`}>{isStudent ? "Project topic and requirements" : isTalent ? "Skills and strongest project" : "Project goals and requirements"}<textarea name="message" rows={5} required placeholder={isStudent ? "Share your project topic, required modules, college guidelines and what you need developed." : isTalent ? "Tell us about your skills and experience." : "What does your business need? Mention the audience, required features and current problem."} value={form.message} onChange={updateField("message")} className={fieldClass} /></label>

      <div className="space-y-4 sm:col-span-2">
        {!isStudent && !isTalent && <p className="text-xs leading-relaxed text-muted">Pricing is custom. We review the requirements and provide a project-specific quotation before development begins.</p>}
        {isStudent && <p className="text-xs leading-relaxed text-muted">Students should participate in understanding and presenting their work and follow their institution's academic integrity rules.</p>}
        <label className="flex items-start gap-3 text-xs leading-relaxed text-muted"><input type="checkbox" required checked={consent} onChange={(e)=>setConsent(e.target.checked)} className="mt-0.5 accent-sky-400" /><span>I agree that Zenith Softworks may use these details to respond to my enquiry. See the <a href="/privacy/" className="text-ice underline">Privacy Policy</a>.</span></label>
        <button type="submit" disabled={submitting || !consent} className="z-btn z-btn-primary disabled:cursor-not-allowed disabled:opacity-60">{submitting ? "Sending…" : isStudent ? "Submit Student Project Enquiry →" : "Send Business Enquiry →"}</button>
        <div role="status" aria-live="polite" className="rounded-xl border border-line bg-midnight/60 px-4 py-3 text-sm text-muted">{statusMessage} {whatsappFallbackUrl && <a href={whatsappFallbackUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-ice underline underline-offset-4">Continue through WhatsApp</a>}</div>
      </div>
    </form>
  );
}
