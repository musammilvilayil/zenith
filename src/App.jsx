import { Route, Routes } from "react-router-dom";
import SiteLayout from "@/components/layout/SiteLayout";
import AboutPage from "@/pages/AboutPage";
import AcademicServicesPage from "@/pages/AcademicServicesPage";
import ContactPage from "@/pages/ContactPage";
import HomePage from "@/pages/HomePage";
import InsightDetailPage from "@/pages/InsightDetailPage";
import InsightsPage from "@/pages/InsightsPage";
import LegalPage from "@/pages/LegalPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ServiceDetailPage from "@/pages/ServiceDetailPage";
import ServicesPage from "@/pages/ServicesPage";
import SolutionsPage from "@/pages/SolutionsPage";
import StudentProjectsPage from "@/pages/StudentProjectsPage";
import TalentPage from "@/pages/TalentPage";
import WorkDetailPage from "@/pages/WorkDetailPage";
import WorkPage from "@/pages/WorkPage";

export default function App() {
  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about/*" element={<AboutPage />} />
        <Route path="/academic-services/*" element={<AcademicServicesPage />} />
        <Route path="/contact/*" element={<ContactPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/insights/:id/*" element={<InsightDetailPage />} />
        <Route path="/privacy/*" element={<LegalPage type="privacy" />} />
        <Route path="/terms/*" element={<LegalPage type="terms" />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug/*" element={<ServiceDetailPage />} />
        <Route path="/solutions/*" element={<SolutionsPage />} />
        <Route path="/student-projects" element={<StudentProjectsPage />} />
        <Route
          path="/student-projects/sustainability/*"
          element={<StudentProjectsPage sustainabilityMode />}
        />
        <Route path="/talent/*" element={<TalentPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/work/:slug/*" element={<WorkDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SiteLayout>
  );
}
