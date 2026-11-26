import navbarLogo from "@/assets/images/zenith-navbar.svg";
import footerLogo from "@/assets/images/zenith-logo-footer.svg";
import markLogo from "@/assets/images/zenith-mark.svg";
import heroAbstractImg from "@/assets/images/hero-abstract.jpg";
import workMeghamImg from "@/assets/images/work-megham.jpg";
import workCarematrixImg from "@/assets/images/work-carematrix.jpg";
import workSheShieldImg from "@/assets/images/work-she-shield.jpg";
import workProjexifyImg from "@/assets/images/work-projexify.jpg";
import studentLabImg from "@/assets/images/student-lab.jpg";

export const BRAND_IMAGES = { navbarLogo, footerLogo, markLogo, heroAbstractImg, workMeghamImg, workCarematrixImg, workSheShieldImg, workProjexifyImg, studentLabImg };

export const SITE = {
  name: "Zenith Softworks",
  tagline: "Ideas Into Digital Products. Built With Purpose.",
  email: "info@zenithsoftworks.in",
  helloEmail: "hello@zenithsoftworks.in",
  whatsappNumber: "919497665504",
  whatsappDisplay: "+91 94976 65504",
  whatsappHref: "https://wa.me/919497665504?text=Hello%20Zenith%20Softworks%2C%20I%20would%20like%20to%20discuss%20a%20project.",
  siteUrl: "https://zenithsoftworks.in",
  serviceArea: "Kerala, India · Remote delivery across India",
};

export const NAV_LINKS = [
  { href: "/business/", label: "Business" },
  { href: "/student-projects/", label: "Student Projects" },
  { href: "/projects/", label: "Projects" },
  { href: "/resources/", label: "Resources" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export const FOOTER_COLUMNS = [
  { title: "Business", links: [
    { href: "/business/website-development/", label: "Website Development" },
    { href: "/business/ecommerce-development/", label: "E-commerce Development" },
    { href: "/business/custom-software-development/", label: "Custom Software" },
    { href: "/business/website-redesign/", label: "Website Redesign" },
  ]},
  { title: "Students", links: [
    { href: "/student-projects/", label: "Project Development" },
    { href: "/student-projects/bca-project-development/", label: "BCA Projects" },
    { href: "/student-projects/btech-project-development/", label: "BTech Projects" },
    { href: "/student-projects/mca-project-development/", label: "MCA Projects" },
    { href: "/resources/", label: "Resources & Guides" },
  ]},
];