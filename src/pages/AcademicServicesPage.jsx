import { useState } from "react";
import { Link } from "react-router-dom";
import PageHead from "@/components/layout/PageHead";
import PageHero from "@/components/ui/PageHero";
import { SITE } from "@/data/site";

const TRACKS = [
  {
    tag: "Software projects",
    title: "Software & Web",
    price: "₹10,000 onwards",
    desc: "Web apps, AI/ML, mobile apps, databases and custom software. Scope, mentoring sessions and deliverables agreed before booking.",
    cta: "Request software quote",
  },
  {
    tag: "Hardware integrated",
    title: "IoT & Hardware",
    price: "₹15,000 onwards",
    desc: "Hardware plus software solutions. Final pricing depends on sensors, components, procurement, complexity and agreed scope.",
    cta: "Request hardware quote",
  },
];

const TIMELINE = [
  {
    days: "01 · Days 1–3",
    title: "Consult",
    desc: "Bring your idea or request help choosing one. Discuss feasibility, goals and college deadlines.",
  },
  {
    days: "02 · Days 4–7",
    title: "Plan",
    desc: "Agree modules, responsibilities, scope, schedule, training and milestone payments.",
  },
  {
    days: "03 · Days 8–30",
    title: "Develop & learn",
    desc: "Build in stages, review demos, understand modules and provide feedback.",
  },
  {
    days: "04 · Days 31–40",
    title: "Test & practice",
    desc: "Verify functionality, fix agreed issues, practise walkthroughs and review presentations.",
  },
  {
    days: "05 · Days 41–45",
    title: "Handover",
    desc: "Receive agreed deliverables and guidance, with a defined post-delivery support period.",
  },
];

export default function AcademicServicesPage() {
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    college: "",
    team: "4",
    category: "Software / Web",
    idea: "We already have an idea",
    deadline: "",
    referral: "",
    details: "",
  });

  const updateField = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const labels = {
      name: "Name",
      email: "Email",
      college: "College / Organization",
      team: "Team size",
      category: "Project category",
      idea: "Idea status",
      deadline: "Expected deadline",
      referral: "Referral code",
      details: "Project details",
    };
    const body =
      "New Zenith Project Enquiry\n\n" +
      Object.entries(labels)
        .map(([key, label]) => `${label}: ${String(form[key] || "Not provided").replace(/[\r\n]+/g, " ")}`)
        .join("\n");
    setStatus("WhatsApp will open with your enquiry. Please tap Send in WhatsApp to submit it.");
    const url = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(body)}`;
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) window.location.href = url;
  };

  const inputClass =
    "z-field";

  return (
    <>
      <PageHead />
      <PageHero
        eyebrow="Zenith Softworks · Student Services"
        title="Get your project ready early. Learn with confidence."
        description="From idea selection to a working demonstration: structured project mentoring, development assistance, technical explanations and review preparation for BCA, BTech, MCA and related courses."
        actions={
          <>
            <a
              href="#enquiry"
              className="z-btn z-btn-primary"
            >
              Book a consultation
            </a>
            <a
              href="#process"
              className="z-btn z-btn-secondary"
            >
              See how it works
            </a>
            <Link
              to="/student-projects/"
              className="z-btn z-btn-secondary"
            >
              Explore project ideas
            </Link>
          </>
        }
      />

      <section className="z-section">
        <div className="z-container">
          <span className="z-label z-label-accent z-eyebrow">
            Clear starting prices
          </span>
          <h2 className="z-display-md mt-5 text-ink">
            Choose your project track
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {TRACKS.map((track) => (
              <article
                key={track.title}
                className="flex flex-col justify-between z-card p-8 backdrop-blur"
              >
                <div>
                  <span className="z-label z-label-accent">
                    {track.tag}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-bold text-ink">{track.title}</h3>
                  <div className="mt-3 font-display text-4xl font-bold text-ice">{track.price}</div>
                  <p className="mt-4 text-sm leading-relaxed text-muted">{track.desc}</p>
                </div>
                <a
                  href="#enquiry"
                  className="z-btn z-btn-secondary z-btn-sm mt-7 w-fit"
                >
                  {track.cta}
                </a>
              </article>
            ))}
          </div>
          <p className="mt-5 text-xs text-soft-blue">
            Prices are starting estimates, not fixed quotes. Hardware requirements may increase the
            final amount.
          </p>
        </div>
      </section>

      <section id="process" className="z-section border-y border-line bg-navy/40">
        <div className="z-container">
          <span className="z-label z-label-accent z-eyebrow">
            A structured process
          </span>
          <h2 className="z-display-md mt-5 text-ink">
            From consultation to confident handover
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {TIMELINE.map((step) => (
              <article
                key={step.days}
                className="z-card p-5"
              >
                <strong className="z-num">{step.days}</strong>
                <h3 className="mt-2 font-display text-lg font-bold text-ink">{step.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{step.desc}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border-l-4 border-ice bg-navy/50 p-5 text-sm leading-relaxed text-muted">
            <strong className="text-ink">Why start early?</strong> More time to explore the
            application, understand each module, test scenarios and prepare for reviews without
            last-minute pressure. The 30–45 day schedule is an estimate, subject to complexity,
            feedback and availability.
          </div>
        </div>
      </section>

      <section className="z-section">
        <div className="z-container">
          <span className="z-label z-label-accent z-eyebrow">
            Bring your own idea or discover one
          </span>
          <h2 className="z-display-md mt-5 text-ink">
            Support that fits your team
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="z-card p-8">
              <h3 className="font-display text-2xl font-bold text-ink">Already have an idea?</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                We&apos;ll review feasibility, propose a practical scope, discuss technical choices
                and plan guided implementation.
              </p>
            </article>
            <article className="z-card p-8">
              <h3 className="font-display text-2xl font-bold text-ink">Need a project idea?</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Explore our idea library and book a consultation to select a suitable, achievable
                project direction.
              </p>
              <Link
                to="/student-projects/"
                className="mt-5 inline-flex text-xs font-bold text-ice hover:underline"
              >
                Browse the idea library →
              </Link>
            </article>
          </div>
          <p className="mt-5 text-xs text-soft-blue">
            Our services are designed for learning, mentoring, code review and transparent
            technical assistance. Students must follow their institution&apos;s academic integrity
            and authorship rules.
          </p>
        </div>
      </section>

      <section id="referrals" className="z-section border-y border-line bg-navy/40">
        <div className="z-container">
          <div className="z-glass rounded-[1.75rem] p-8 sm:p-12">
            <span className="z-label z-label-accent">
              Referral rewards
            </span>
            <h2 className="z-display-md mt-5 text-ink">
              Refer 3 confirmed projects. Choose your reward.
            </h2>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="font-display text-2xl font-bold text-ice">₹3,000 cash reward</h3>
                <p className="mt-2 text-sm text-muted">
                  For three eligible, new project bookings confirmed with advance payments.
                </p>
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-ice">
                  OR one eligible free project service
                </h3>
                <p className="mt-2 text-sm text-muted">
                  Standard software project support package up to ₹10,000 value. Hardware, paid
                  third-party tools and additional scope excluded.
                </p>
              </div>
            </div>
            <p className="mt-6 text-xs leading-relaxed text-soft-blue">
              One reward per set of three qualifying referrals. Referrals must be recorded before
              booking; duplicate or cancelled bookings do not count. Reward fulfillment follows
              verification. No fixed referral deadline is advertised.
            </p>
            <a
              href="#enquiry"
              className="z-btn z-btn-primary mt-6"
            >
              Register a referral
            </a>
          </div>
        </div>
      </section>

      <section id="enquiry" className="z-section">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <span className="z-label z-label-accent z-eyebrow">
            Start here
          </span>
          <h2 className="z-display-md mt-5 text-ink">
            Tell us about your project
          </h2>
          <p className="mt-2 text-sm text-muted">
            Submit your details and continue to WhatsApp with a prepared enquiry. No account is
            needed.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 grid gap-5 z-card p-6 sm:grid-cols-2 sm:p-8"
          >
            <label className="flex flex-col gap-2 text-sm font-medium text-muted">
              Your name
              <input
                name="name"
                required
                maxLength={100}
                autoComplete="name"
                value={form.name}
                onChange={updateField("name")}
                className={inputClass}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-muted">
              Email
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={updateField("email")}
                className={inputClass}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-muted">
              College / organization
              <input
                name="college"
                required
                maxLength={140}
                value={form.college}
                onChange={updateField("college")}
                className={inputClass}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-muted">
              Team size
              <select
                name="team"
                value={form.team}
                onChange={updateField("team")}
                className={inputClass}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5+</option>
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-muted">
              Project category
              <select
                name="category"
                value={form.category}
                onChange={updateField("category")}
                className={inputClass}
              >
                <option>Software / Web</option>
                <option>Hardware + Software</option>
                <option>Business Website</option>
                <option>Referral Enquiry</option>
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-muted">
              Idea status
              <select
                name="idea"
                value={form.idea}
                onChange={updateField("idea")}
                className={inputClass}
              >
                <option>We already have an idea</option>
                <option>We need idea guidance</option>
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-muted">
              Expected deadline
              <input
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={updateField("deadline")}
                className={inputClass}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-muted">
              Referral code (optional)
              <input
                name="referral"
                maxLength={60}
                value={form.referral}
                onChange={updateField("referral")}
                className={inputClass}
              />
            </label>
            <label className="text-xs font-semibold text-soft-blue sm:col-span-2">
              Project details
              <textarea
                name="details"
                rows={4}
                maxLength={2500}
                placeholder="Describe your idea, requirements, or referral details"
                value={form.details}
                onChange={updateField("details")}
                className={inputClass}
              />
            </label>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="z-btn z-btn-primary"
              >
                Continue to WhatsApp
              </button>
              {status && (
                <p role="status" className="mt-3 text-sm text-ice">
                  {status}
                </p>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
