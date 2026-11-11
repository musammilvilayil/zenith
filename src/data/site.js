import navbarLogo from "@/assets/images/zenith-original-navbar.png";
import footerLogo from "@/assets/images/zenith-logo-footer.svg";
import markLogo from "@/assets/images/zenith-mark.svg";
import heroAbstractImg from "@/assets/images/hero-abstract.jpg";
import workMeghamImg from "@/assets/images/work-megham.jpg";
import workCarematrixImg from "@/assets/images/work-carematrix.jpg";
import workSheShieldImg from "@/assets/images/work-she-shield.jpg";
import workProjexifyImg from "@/assets/images/work-projexify.jpg";
import studentLabImg from "@/assets/images/student-lab.jpg";

export const BRAND_IMAGES = {
  navbarLogo,
  footerLogo,
  markLogo,
  heroAbstractImg,
  workMeghamImg,
  workCarematrixImg,
  workSheShieldImg,
  workProjexifyImg,
  studentLabImg,
};

export const SITE = {
  name: "Zenith Softworks",
  tagline: "Independent Digital Studio · Kerala, India",
  email: "info@zenithsoftworks.in",
  helloEmail: "hello@zenithsoftworks.in",
  whatsappNumber: "919497665504",
  whatsappDisplay: "+91 94976 65504",
  whatsappHref:
    "https://wa.me/919497665504?text=Hello%20Zenith%20Softworks%2C%20I%20would%20like%20to%20discuss%20a%20project.",
  siteUrl: "https://zenithsoftworks.in",
};

export const NAV_LINKS = [
  { href: "/services/", label: "Services" },
  { href: "/work/", label: "Work" },
  { href: "/talent/", label: "Join Talent" },
  { href: "/student-projects/", label: "Project Ideas" },
  { href: "/academic-services/", label: "Student Services" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export const FOOTER_COLUMNS = [
  {
    title: "Company",
    links: [
      { href: "/about/", label: "About" },
      { href: "/work/", label: "Work" },
      { href: "/talent/", label: "Join Zenith Talent" },
      { href: "/student-projects/", label: "Project Ideas" },
      { href: "/academic-services/", label: "Student Services" },
      { href: "/insights/", label: "Insights" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/services/", label: "Website packages" },
      { href: "/services/web-platforms/", label: "Web applications" },
      { href: "/services/mobile-apps/", label: "Mobile applications" },
      { href: "/services/ai-automation/", label: "AI & automation" },
      { href: "/services/iot-solutions/", label: "IoT systems" },
      { href: "/solutions/", label: "Solutions" },
    ],
  },
];
