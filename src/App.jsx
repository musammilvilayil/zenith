import { Navigate, Route, Routes } from "react-router";
import SiteLayout from "@/components/layout/SiteLayout";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import HomePage from "@/pages/HomePage";
import InsightDetailPage from "@/pages/InsightDetailPage";
import InsightsPage from "@/pages/InsightsPage";
import LegalPage from "@/pages/LegalPage";
import NotFoundPage from "@/pages/NotFoundPage";
import StudentProjectsPage from "@/pages/StudentProjectsPage";
import TalentPage from "@/pages/TalentPage";
import WorkDetailPage from "@/pages/WorkDetailPage";
import WorkPage from "@/pages/WorkPage";
import BusinessPage from "@/pages/BusinessPage";
import StudentProjectLandingPage from "@/pages/StudentProjectLandingPage";

export default function App() {
  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/business/" element={<BusinessPage />} />
        <Route path="/business/:slug/" element={<BusinessPage />} />
        <Route path="/student-projects/" element={<StudentProjectLandingPage />} />
        <Route path="/student-projects/sustainability/" element={<Navigate to="/student-project-ideas/sustainability/" replace />} />
        <Route path="/student-projects/:slug/" element={<StudentProjectLandingPage />} />
        <Route path="/projects/" element={<WorkPage />} />
        <Route path="/projects/:slug/" element={<WorkDetailPage />} />
        <Route path="/resources/" element={<InsightsPage />} />
        <Route path="/resources/:id/" element={<InsightDetailPage />} />
        <Route path="/about/*" element={<AboutPage />} />
        <Route path="/contact/*" element={<ContactPage />} />
        <Route path="/privacy/*" element={<LegalPage type="privacy" />} />
        <Route path="/terms/*" element={<LegalPage type="terms" />} />
        <Route path="/talent/*" element={<TalentPage />} />
        <Route path="/student-project-ideas/" element={<StudentProjectsPage />} />
        <Route path="/student-project-ideas/sustainability/*" element={<StudentProjectsPage sustainabilityMode />} />
        <Route path="/services/*" element={<Navigate to="/business/" replace />} />
        <Route path="/academic-services/*" element={<Navigate to="/student-projects/" replace />} />
        <Route path="/solutions/*" element={<Navigate to="/business/" replace />} />
        <Route path="/work/" element={<WorkPage />} />
        <Route path="/work/:slug/*" element={<WorkDetailPage />} />
        <Route path="/insights/" element={<Navigate to="/resources/" replace />} />
        <Route path="/insights/:id/*" element={<InsightDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SiteLayout>
  );
}