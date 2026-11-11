import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SITE } from "@/data/site";

const CONTACT_SERVICES = [
  "Business website",
  "Website redesign",
  "Growth website",
  "E-commerce website",
  "Web application",
  "Mobile application",
  "Startup MVP",
  "Branding and UI/UX",
  "AI and automation",
  "IoT system",
  "Website maintenance",
  "Academic project guidance",
  "Other",
];

const TALENT_ROLES = [
  "Frontend development",
  "Full stack development",
  "Mobile app development",
  "UI/UX design",
  "Graphic and brand design",
  "QA and documentation",
  "Content and social media",
  "AI and automation",
  "Cloud and DevOps",
  "IoT and hardware",
];

const SERVICE_ALIASES = {
  "web-platforms": "Web application",
  "mobile-apps": "Mobile application",
  "ai-automation": "AI and automation",
  "iot-solutions": "IoT system",
  "cloud-devops": "Web application",
  "software-development": "Web application",
  "academic project": "Academic project guidance",
};

export default function EnquiryForm({ mode = "contact" }) {
  const [searchParams] = useSearchParams();
  const isTalent = mode === "talent";
  const [startedAt] = useState(() => String(Date.now()));
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(
    isTalent
      ? "Applications are reviewed based on honesty, role fit, work evidence and current project needs."
      : "Your details are sent securely to Zenith Softworks. If delivery is unavailable, we will show a WhatsApp option.",
  );
  const [whatsappFallbackUrl, setWhatsappFallbackUrl] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: isTalent ? "Join Zenith Talent" : "",
    budget: isTalent ? "Less than 5 hours" : "",
    timeline: isTalent ? "Learning fundamentals" : "Flexible",
    source: "Instagram",
    role: "",
    portfolio: "",
    message: "",
  });

  useEffect(() => {
    if (isTalent) return;
    const rawService = searchParams.get("service");
    const project = searchParams.get("project");
    setForm((prev) => {
      let nextService = prev.service;
      if (rawService) {
        const lower = rawService.toLowerCase();
        const match =
          CONTACT_SERVICES.find((s) => s.toLowerCase() === lower) ||
          SERVICE_ALIASES[lower] ||
          "";
        if (match) nextService = match;
      }
      const nextMessage =
        project && !prev.message
          ? `I am interested in the student project idea: ${project}. Please share the detailed abstract, scope and implementation guidance.`
          : prev.message;
      return { ...prev, service: nextService, message: nextMessage };
    });
  }, [isTalent, searchParams]);

  const updateField = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setWhatsappFallbackUrl("");
    setStatusMessage("Sending your details…");

    const payload = {
      ...form,
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

      setStatusMessage(
        isTalent
          ? "Thank you. Your Zenith Talent application has been sent for review."
          : "Thank you. Your project brief has been sent to Zenith Softworks. We will review the context before replying.",
      );
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: isTalent ? "Join Zenith Talent" : "",
        budget: isTalent ? "Less than 5 hours" : "",
        timeline: isTalent ? "Learning fundamentals" : "Flexible",
        source: "Instagram",
        role: "",
        portfolio: "",
        message: "",
      });
    } catch (error) {
      const msg = encodeURIComponent(
        `Hello Zenith Softworks,\nName: ${payload.name}\nEmail: ${payload.email}\nPhone: ${payload.phone}\nEnquiry: ${payload.service}\nDetails: ${payload.message}`,
      );
      setStatusMessage(error.message || "Email delivery could not be confirmed.");
      setWhatsappFallbackUrl(`https://wa.me/${SITE.whatsappNumber}?text=${msg}`);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-ice/25 bg-midnight/80 px-4 py-3 text-sm text-ink placeholder:text-soft-blue/70 focus:border-ice focus:outline-none";

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-5 rounded-3xl border border-ice/20 bg-navy/45 p-6 backdrop-blur-md sm:grid-cols-2 sm:p-8"
    >
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <label className="text-xs font-semibold uppercase tracking-wider text-soft-blue">
        {isTalent ? "Full name" : "Name"}
        <input
          name="name"
          autoComplete="name"
          required
          value={form.name}
          onChange={updateField("name")}
          className={inputClass}
        />
      </label>

      <label className="text-xs font-semibold uppercase tracking-wider text-soft-blue">
        Email
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          value={form.email}
          onChange={updateField("email")}
          className={inputClass}
        />
      </label>

      <label className="text-xs font-semibold uppercase tracking-wider text-soft-blue">
        WhatsApp / phone
        <input
          name="phone"
          autoComplete="tel"
          required
          value={form.phone}
          onChange={updateField("phone")}
          className={inputClass}
        />
      </label>

      <label className="text-xs font-semibold uppercase tracking-wider text-soft-blue">
        {isTalent ? "Current course / role" : "Business / organisation"}
        <input
          name="company"
          autoComplete={isTalent ? undefined : "organization"}
          placeholder={isTalent ? "Example: BCA graduate / UI designer" : undefined}
          required={isTalent}
          value={form.company}
          onChange={updateField("company")}
          className={inputClass}
        />
      </label>

      {isTalent ? (
        <>
          <label className="text-xs font-semibold uppercase tracking-wider text-soft-blue">
            Primary role
            <select
              name="role"
              required
              value={form.role}
              onChange={updateField("role")}
              className={inputClass}
            >
              <option value="">Choose your strongest area</option>
              {TALENT_ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </label>

          <label className="text-xs font-semibold uppercase tracking-wider text-soft-blue">
            Weekly availability
            <select
              name="budget"
              value={form.budget}
              onChange={updateField("budget")}
              className={inputClass}
            >
              <option>Less than 5 hours</option>
              <option>5–10 hours</option>
              <option>10–20 hours</option>
              <option>20+ hours</option>
              <option>Currently flexible</option>
            </select>
          </label>

          <label className="text-xs font-semibold uppercase tracking-wider text-soft-blue">
            Experience level
            <select
              name="timeline"
              value={form.timeline}
              onChange={updateField("timeline")}
              className={inputClass}
            >
              <option>Learning fundamentals</option>
              <option>Built practice projects</option>
              <option>Completed academic projects</option>
              <option>Freelance / internship experience</option>
              <option>Professional experience</option>
            </select>
          </label>

          <label className="text-xs font-semibold uppercase tracking-wider text-soft-blue">
            Portfolio / GitHub link
            <input
              name="portfolio"
              type="url"
              placeholder="https://"
              value={form.portfolio}
              onChange={updateField("portfolio")}
              className={inputClass}
            />
          </label>
        </>
      ) : (
        <>
          <label className="text-xs font-semibold uppercase tracking-wider text-soft-blue">
            What do you need?
            <select
              name="service"
              required
              value={form.service}
              onChange={updateField("service")}
              className={inputClass}
            >
              <option value="">Choose a service</option>
              {CONTACT_SERVICES.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </label>

          <label className="text-xs font-semibold uppercase tracking-wider text-soft-blue">
            Estimated budget (USD or local equivalent)
            <select
              name="budget"
              value={form.budget}
              onChange={updateField("budget")}
              className={inputClass}
            >
              <option value="">Select a budget range</option>
              <option>Under US$500 (or local equivalent)</option>
              <option>US$500–US$1,500 (or local equivalent)</option>
              <option>US$1,500–US$5,000 (or local equivalent)</option>
              <option>US$5,000+ (or local equivalent)</option>
              <option>Not decided — help me scope it</option>
            </select>
          </label>

          <label className="text-xs font-semibold uppercase tracking-wider text-soft-blue">
            Preferred timeline
            <select
              name="timeline"
              value={form.timeline}
              onChange={updateField("timeline")}
              className={inputClass}
            >
              <option>Flexible</option>
              <option>As soon as practical</option>
              <option>Within 1 month</option>
              <option>1–3 months</option>
              <option>3–6 months</option>
            </select>
          </label>

          <label className="text-xs font-semibold uppercase tracking-wider text-soft-blue">
            How did you find Zenith?
            <select
              name="source"
              value={form.source}
              onChange={updateField("source")}
              className={inputClass}
            >
              <option>Instagram</option>
              <option>Referral</option>
              <option>Google / search</option>
              <option>LinkedIn</option>
              <option>GitHub / portfolio</option>
              <option>Other</option>
            </select>
          </label>
        </>
      )}

      <label className="text-xs font-semibold uppercase tracking-wider text-soft-blue sm:col-span-2">
        {isTalent
          ? "Tell us about your skills, strongest project and the kind of work you want to contribute to"
          : "Project goals and current problem"}
        <textarea
          name="message"
          rows={5}
          required
          placeholder={
            isTalent
              ? "Mention your exact contribution, tools you can explain, current limitations and what you want to improve."
              : "Who is it for? What should it help them do? What exists today? What result matters most?"
          }
          value={form.message}
          onChange={updateField("message")}
          className={inputClass}
        />
      </label>

      <div className="space-y-3 sm:col-span-2">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 rounded-full bg-ice px-7 py-3.5 text-sm font-bold text-midnight transition hover:-translate-y-0.5 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting
            ? "Sending…"
            : isTalent
              ? "Submit Talent Application"
              : "Send project brief →"}
        </button>

        <div
          id="formStatus"
          role="status"
          aria-live="polite"
          className="rounded-xl border border-ice/15 bg-midnight/60 px-4 py-3 text-sm text-muted"
        >
          {statusMessage}{" "}
          {whatsappFallbackUrl && (
            <a
              href={whatsappFallbackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-ice underline underline-offset-4"
            >
              Send the same details through WhatsApp
            </a>
          )}
        </div>
      </div>
    </form>
  );
}
