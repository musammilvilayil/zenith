import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import VoxelArc from "@/components/fx/VoxelArc";
import PageHead from "@/components/layout/PageHead";
import CtaBanner from "@/components/ui/CtaBanner";
import PageHero from "@/components/ui/PageHero";
import { BRAND_IMAGES } from "@/data/site";
import {
  DIFFICULTY_RANK,
  DURATION_RANK,
  GENERAL_IDEAS,
  SUSTAINABILITY_IDEAS,
  SUSTAINABILITY_KEYWORDS,
} from "@/data/studentProjects";

const TRACK_OPTIONS = [
  "Web & Software",
  "AI & Data",
  "IoT & Hardware",
  "Security & Trust",
  "Cloud & Engineering",
  "Mobile & Field",
];

const DIFFICULTY_OPTIONS = ["Easy", "Easy-Medium", "Medium", "Medium-High", "High"];

export default function StudentProjectsPage({ sustainabilityMode = false }) {
  const [query, setQuery] = useState(sustainabilityMode ? "sustainability" : "");
  const [category, setCategory] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [course, setCourse] = useState("all");
  const [technology, setTechnology] = useState("all");
  const [duration, setDuration] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [limit, setLimit] = useState(sustainabilityMode ? 70 : 24);
  const [selectedIdea, setSelectedIdea] = useState(null);

  useEffect(() => {
    setQuery(sustainabilityMode ? "sustainability" : "");
    setCategory("all");
    setDifficulty("all");
    setCourse("all");
    setTechnology("all");
    setDuration("all");
    setSortBy("featured");
    setLimit(sustainabilityMode ? 70 : 24);
    setSelectedIdea(null);
  }, [sustainabilityMode]);

  useEffect(() => {
    if (!selectedIdea) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setSelectedIdea(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [selectedIdea]);

  const courses = useMemo(
    () => [...new Set(GENERAL_IDEAS.map((item) => item.course))].sort(),
    [],
  );
  const technologies = useMemo(
    () => [...new Set(GENERAL_IDEAS.map((item) => item.technology))].sort(),
    [],
  );
  const durations = useMemo(
    () => [...new Set(GENERAL_IDEAS.map((item) => item.duration))].sort(),
    [],
  );

  const featuredIdeas = useMemo(() => GENERAL_IDEAS.filter((item) => item.featured), []);

  const filteredIdeas = useMemo(() => {
    const q = query.trim().toLowerCase();
    const isSustainabilitySearch =
      sustainabilityMode ||
      (q.length >= 3 &&
        (SUSTAINABILITY_KEYWORDS.some((kw) => q.includes(kw) || kw.includes(q)) ||
          SUSTAINABILITY_IDEAS.some((item) => item.search.includes(q))));

    let pool;
    if (isSustainabilitySearch) {
      const broadSustainability =
        !q ||
        q === "sustainable" ||
        q === "sustainability" ||
        SUSTAINABILITY_KEYWORDS.some((kw) => q === kw);
      pool = broadSustainability
        ? [...SUSTAINABILITY_IDEAS]
        : SUSTAINABILITY_IDEAS.filter((item) => item.search.includes(q));
    } else {
      pool = GENERAL_IDEAS.filter((item) => !q || item.search.includes(q));
    }

    const narrowed = pool.filter(
      (item) =>
        (category === "all" || item.category === category) &&
        (difficulty === "all" || item.difficulty === difficulty) &&
        (course === "all" || item.course === course) &&
        (technology === "all" || item.technology === technology) &&
        (duration === "all" || item.duration === duration),
    );

    const sorted = [...narrowed];
    if (sortBy === "name-asc") sorted.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === "name-desc") sorted.sort((a, b) => b.name.localeCompare(a.name));
    else if (sortBy === "difficulty-asc")
      sorted.sort((a, b) => (DIFFICULTY_RANK[a.difficulty] || 0) - (DIFFICULTY_RANK[b.difficulty] || 0));
    else if (sortBy === "difficulty-desc")
      sorted.sort((a, b) => (DIFFICULTY_RANK[b.difficulty] || 0) - (DIFFICULTY_RANK[a.difficulty] || 0));
    else if (sortBy === "duration-asc")
      sorted.sort((a, b) => (DURATION_RANK[a.duration] || 0) - (DURATION_RANK[b.duration] || 0));
    else if (sortBy === "duration-desc")
      sorted.sort((a, b) => (DURATION_RANK[b.duration] || 0) - (DURATION_RANK[a.duration] || 0));
    else if (sortBy === "newest") sorted.sort((a, b) => Number(b.id) - Number(a.id));
    else
      sorted.sort(
        (a, b) => Number(b.featured) - Number(a.featured) || a.id.localeCompare(b.id),
      );

    return sorted;
  }, [category, course, difficulty, duration, query, sortBy, sustainabilityMode, technology]);

  const visibleIdeas = sustainabilityMode ? filteredIdeas : filteredIdeas.slice(0, limit);

  const resetAll = () => {
    setQuery(sustainabilityMode ? "sustainability" : "");
    setCategory("all");
    setDifficulty("all");
    setCourse("all");
    setTechnology("all");
    setDuration("all");
    setSortBy("featured");
    setLimit(sustainabilityMode ? 70 : 24);
  };

  const selectClass =
    "mt-1 w-full rounded-xl border border-ice/25 bg-midnight/85 px-3 py-2.5 text-sm text-ink focus:border-ice focus:outline-none";

  return (
    <>
      <PageHead />
      <PageHero
        eyebrow={
          sustainabilityMode ? "Student Project Lab · Green Technology" : "Student project lab"
        }
        title={
          sustainabilityMode
            ? "Sustainability & Green Tech project ideas."
            : "Build a project you can explain, demonstrate and extend."
        }
        description={
          sustainabilityMode
            ? "70 concise project directions across smart energy, water conservation, circular economy, sustainable agriculture, climate intelligence, electric mobility and green buildings."
            : "500 structured final-year project directions across software, AI, analytics, IoT, cloud engineering, cybersecurity, mobile systems and green technology."
        }
        actions={
          <>
            <a
              href="#idea-library"
              className="rounded-full bg-ice px-6 py-3 text-xs font-bold text-midnight transition hover:bg-white"
            >
              {sustainabilityMode ? "Browse 70 ideas" : "Browse project ideas"}
            </a>
            <Link
              to={
                sustainabilityMode
                  ? "/contact/?service=Academic%20project"
                  : "/academic-services/#enquiry"
              }
              className="rounded-full border border-ice/35 px-6 py-3 text-xs font-semibold text-ink transition hover:border-ice hover:bg-navy/50"
            >
              {sustainabilityMode ? "Request a full abstract" : "Discuss your project"}
            </Link>
            {!sustainabilityMode && (
              <Link
                to="/student-projects/sustainability/"
                className="rounded-full border border-ice/35 px-6 py-3 text-xs font-semibold text-ice transition hover:border-ice hover:bg-navy/50"
              >
                70 Sustainability ideas ↗
              </Link>
            )}
          </>
        }
        aside={
          <div className="space-y-4">
            <div className="overflow-hidden rounded-3xl border border-ice/25 bg-midnight/60 p-2 shadow-2xl">
              <img
                src={BRAND_IMAGES.studentLabImg}
                alt="Zenith Student Project Lab engineering blueprint visual"
                className="aspect-[16/10] w-full rounded-2xl object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="rounded-2xl border border-ice/20 bg-navy/50 p-4">
                <strong className="block font-display text-2xl text-ice">
                  {sustainabilityMode ? "70" : "500+"}
                </strong>
                <span className="text-xs text-muted">
                  {sustainabilityMode ? "Green-tech ideas" : "Project directions"}
                </span>
              </div>
              <div className="rounded-2xl border border-ice/20 bg-navy/50 p-4">
                <strong className="block font-display text-2xl text-ice">
                  {sustainabilityMode ? "7" : "70"}
                </strong>
                <span className="text-xs text-muted">
                  {sustainabilityMode ? "Sustainability themes" : "Sustainability concepts"}
                </span>
              </div>
            </div>
          </div>
        }
      />

      {!sustainabilityMode && (
        <section className="relative isolate overflow-hidden border-b border-ice/15 bg-deep py-16">
          <VoxelArc
            crestColor="#C1E8FF"
            midColor="#5483B3"
            deepColor="#052659"
            horizonY={0.5}
            opacity={0.45}
          />
          <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-soft-blue">
              Featured ideas
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold text-ink">
              Strong starting points for different student profiles.
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredIdeas.map((idea) => (
                <article
                  key={idea.id}
                  className="flex flex-col justify-between rounded-3xl border border-ice/20 bg-midnight/80 p-6 backdrop-blur"
                >
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-ice">
                      {idea.id} · {idea.category}
                    </span>
                    <h3 className="mt-2 font-display text-xl font-bold text-ink">{idea.name}</h3>
                    <p className="mt-2 text-sm text-muted">{idea.problem}</p>
                    <p className="mt-3 text-xs text-soft-blue">
                      <strong className="text-ink">Stack:</strong> {idea.stack}
                    </p>
                  </div>
                  <Link
                    to={`/contact/?service=Academic%20project&project=${encodeURIComponent(idea.name)}`}
                    className="mt-5 inline-flex text-xs font-bold text-ice hover:underline"
                  >
                    Request full abstract →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="idea-library" className="py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-soft-blue">
              {sustainabilityMode ? "Sustainability catalogue" : "Idea library"}
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
              {sustainabilityMode
                ? "Search an exact title or explore by green-tech theme."
                : "Search, sort and filter project ideas."}
            </h2>
            <p className="mt-2 text-sm text-muted">
              Search an exact project title or keywords such as sustainability, green tech,
              climate, water, waste, solar, EV or carbon.
            </p>
          </div>

          <div className="mt-8 grid gap-4 rounded-3xl border border-ice/20 bg-navy/40 p-6 sm:grid-cols-2 lg:grid-cols-4">
            <label className="text-xs font-semibold text-soft-blue sm:col-span-2">
              Search ideas
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (!sustainabilityMode) setLimit(24);
                }}
                placeholder="Project name, sustainability, climate, water, AI, IoT..."
                className={selectClass}
              />
            </label>

            <label className="text-xs font-semibold text-soft-blue">
              Technology track
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={selectClass}
              >
                <option value="all">All tracks</option>
                {TRACK_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-xs font-semibold text-soft-blue">
              Difficulty
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className={selectClass}
              >
                <option value="all">All levels</option>
                {DIFFICULTY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>

            {!sustainabilityMode && (
              <>
                <label className="text-xs font-semibold text-soft-blue">
                  Course focus
                  <select
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className={selectClass}
                  >
                    <option value="all">All course tracks</option>
                    {courses.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="text-xs font-semibold text-soft-blue">
                  Primary technology
                  <select
                    value={technology}
                    onChange={(e) => setTechnology(e.target.value)}
                    className={selectClass}
                  >
                    <option value="all">All technologies</option>
                    {technologies.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="text-xs font-semibold text-soft-blue">
                  Duration
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className={selectClass}
                  >
                    <option value="all">Any duration</option>
                    {durations.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </label>
              </>
            )}

            <label className="text-xs font-semibold text-soft-blue">
              Sort by
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={selectClass}
              >
                <option value="featured">Featured / recommended</option>
                <option value="name-asc">Name A–Z</option>
                <option value="name-desc">Name Z–A</option>
                <option value="difficulty-asc">Difficulty: low to high</option>
                <option value="difficulty-desc">Difficulty: high to low</option>
                <option value="duration-asc">Duration: shortest first</option>
                <option value="duration-desc">Duration: longest first</option>
                <option value="newest">Project ID: newest first</option>
              </select>
            </label>

            <div className="flex flex-wrap items-end gap-2 sm:col-span-2 lg:col-span-4">
              <button
                type="button"
                onClick={resetAll}
                className="rounded-full border border-ice/35 px-4 py-2 text-xs font-semibold text-ink transition hover:border-ice hover:bg-navy"
              >
                {sustainabilityMode ? "Show all sustainability ideas" : "Clear filters"}
              </button>
              {!sustainabilityMode && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("sustainability");
                    setLimit(70);
                  }}
                  className="rounded-full border border-ice/35 bg-ice/10 px-4 py-2 text-xs font-semibold text-ice transition hover:bg-ice/20"
                >
                  Sustainability & Green Tech
                </button>
              )}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm text-muted">
            <span>
              <strong className="text-ice">{filteredIdeas.length}</strong> matching ideas
            </span>
            <span>
              <strong className="text-ice">{visibleIdeas.length}</strong> currently displayed
            </span>
          </div>

          {visibleIdeas.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-ice/20 bg-navy/35 p-10 text-center text-muted">
              No matching ideas. Clear a filter or use a broader search.
            </div>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visibleIdeas.map((idea) => (
                <article
                  key={idea.id}
                  className="flex flex-col justify-between rounded-3xl border border-ice/20 bg-navy/45 p-6 transition hover:-translate-y-0.5 hover:border-ice/45"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-ice">{idea.id}</span>
                      <span className="rounded-full border border-ice/25 px-2.5 py-0.5 text-[11px] text-soft-blue">
                        {idea.difficulty}
                      </span>
                    </div>
                    <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-soft-blue">
                      {idea.isSustainability
                        ? `Sustainability & Green Tech · ${idea.domain}`
                        : `${idea.category} · ${idea.domain}`}
                    </p>
                    <h3 className="mt-1.5 font-display text-xl font-bold text-ink">{idea.name}</h3>
                    <p className="text-xs text-ice/80">{idea.type}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{idea.summary}</p>
                  </div>

                  <div className="mt-5 border-t border-ice/15 pt-4">
                    <div className="flex flex-wrap gap-2 text-[11px] text-soft-blue">
                      <span>{idea.duration}</span>
                      <span>·</span>
                      <span>{idea.course}</span>
                      <span>·</span>
                      <span>{idea.technology}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedIdea(idea)}
                      className="mt-4 inline-flex text-xs font-bold text-ice hover:underline"
                    >
                      View idea details →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {!sustainabilityMode && visibleIdeas.length < filteredIdeas.length && (
            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => setLimit((prev) => prev + 24)}
                className="rounded-full border border-ice/40 px-6 py-3 text-xs font-bold text-ink transition hover:border-ice hover:bg-navy/60"
              >
                Load 24 more ideas
              </button>
            </div>
          )}
        </div>
      </section>

      {selectedIdea && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="idea-dialog-title"
          className="fixed inset-0 z-50 grid place-items-center bg-midnight/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedIdea(null)}
        >
          <div
            className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-ice/30 bg-deep p-7 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close project details"
              onClick={() => setSelectedIdea(null)}
              className="absolute top-5 right-5 grid h-9 w-9 place-items-center rounded-full border border-ice/25 text-lg text-ink hover:bg-navy"
            >
              ×
            </button>
            <span className="text-xs font-bold uppercase tracking-wider text-ice">
              Project {selectedIdea.id} · {selectedIdea.category}
            </span>
            <h2 id="idea-dialog-title" className="mt-2 font-display text-3xl font-bold text-ink">
              {selectedIdea.name}
            </h2>
            <p className="text-sm text-soft-blue">{selectedIdea.type}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-ice">
              <span className="rounded-full border border-ice/25 px-3 py-1">
                {selectedIdea.difficulty}
              </span>
              <span className="rounded-full border border-ice/25 px-3 py-1">
                {selectedIdea.duration}
              </span>
              <span className="rounded-full border border-ice/25 px-3 py-1">
                {selectedIdea.course}
              </span>
            </div>

            <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted">
              <div>
                <h3 className="font-display text-base font-bold text-ink">Problem & direction</h3>
                <p className="mt-1">{selectedIdea.problem}</p>
                {!selectedIdea.isSustainability && (
                  <p className="mt-1">{selectedIdea.summary}</p>
                )}
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-ink">Suggested MVP</h3>
                <p className="mt-1">{selectedIdea.mvp}</p>
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-ink">Suggested technology</h3>
                <p className="mt-1">{selectedIdea.stack}</p>
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-ink">Expected outcome</h3>
                <p className="mt-1">{selectedIdea.outcome}</p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to={`/contact/?service=Academic%20project&project=${encodeURIComponent(selectedIdea.name)}`}
                className="rounded-full bg-ice px-6 py-3 text-xs font-bold text-midnight hover:bg-white"
              >
                Request full abstract
              </Link>
              <button
                type="button"
                onClick={() => setSelectedIdea(null)}
                className="rounded-full border border-ice/35 px-6 py-3 text-xs font-semibold text-ink hover:bg-navy"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <CtaBanner
        title="Found an idea worth building?"
        primaryLabel="Request a detailed project brief"
        primaryHref="/academic-services/#enquiry"
      />
    </>
  );
}
