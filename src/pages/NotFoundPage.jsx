import { Link } from "react-router-dom";
import PageHead from "@/components/layout/PageHead";
import PageHero from "@/components/ui/PageHero";

export default function NotFoundPage() {
  return (
    <>
      <PageHead
        title="Page not found | Zenith Softworks"
        description="The requested page could not be found."
      />
      <PageHero
        eyebrow="404"
        title="That page is not here."
        description="The link may be outdated or the page may have moved."
        actions={
          <Link
            to="/"
            className="z-btn z-btn-primary"
          >
            Return home
          </Link>
        }
      />
    </>
  );
}
