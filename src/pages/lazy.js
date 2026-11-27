import { lazy } from "react";
import HomePage from "@/pages/HomePage";

// Home ships in the main bundle; every other route is split into its own chunk.
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const InsightDetailPage = lazy(() => import("@/pages/InsightDetailPage"));
const InsightsPage = lazy(() => import("@/pages/InsightsPage"));
const LegalPage = lazy(() => import("@/pages/LegalPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
const StudentProjectsPage = lazy(() => import("@/pages/StudentProjectsPage"));
const TalentPage = lazy(() => import("@/pages/TalentPage"));
const WorkDetailPage = lazy(() => import("@/pages/WorkDetailPage"));
const WorkPage = lazy(() => import("@/pages/WorkPage"));
const BusinessPage = lazy(() => import("@/pages/BusinessPage"));
const StudentProjectLandingPage = lazy(() => import("@/pages/StudentProjectLandingPage"));
const LocationPage = lazy(() => import("@/pages/LocationPage"));

export default { AboutPage, ContactPage, HomePage, InsightDetailPage, InsightsPage, LegalPage, NotFoundPage, StudentProjectsPage, TalentPage, WorkDetailPage, WorkPage, BusinessPage, StudentProjectLandingPage, LocationPage };
