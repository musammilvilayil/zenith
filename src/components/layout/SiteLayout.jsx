import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { ArrowUpRight, Menu, X, MessageCircle } from "lucide-react";
import { BRAND_IMAGES, SITE } from "@/data/site";
const links=[{href:"/business/",label:"Business"},{href:"/student-projects/",label:"Student projects"},{href:"/projects/",label:"Work"},{href:"/resources/",label:"Insights"},{href:"/about/",label:"About"}];
export default function SiteLayout({children}){
 const[open,setOpen]=useState(false);const[scrolled,setScrolled]=useState(false);const{pathname}=useLocation();
 useEffect(()=>{setOpen(false);window.scrollTo({top:0,behavior:"instant"});},[pathname]);
 useEffect(()=>{const f=()=>setScrolled(window.scrollY>24);f();window.addEventListener("scroll",f,{passive:true});return()=>window.removeEventListener("scroll",f);},[]);
 useEffect(()=>{if(!open)return;const f=e=>{if(e.key==="Escape")setOpen(false);};document.addEventListener("keydown",f);return()=>document.removeEventListener("keydown",f);},[open]);
 return <div className="zn-site">
  <a className="zn-skip" href="#main-content">Skip to content</a>
  <header className={"zn-header "+(scrolled?"is-scrolled":"")}><div className="zn-nav-wrap">
   <Link to="/" className="zn-brand" aria-label="Zenith Softworks home"><img src={BRAND_IMAGES.navbarLogo} alt="Zenith Softworks" width="160" height="42"/><span>DIGITAL DEVELOPMENT STUDIO</span></Link>
   <nav className="zn-desktop-nav" aria-label="Main navigation">{links.map(link=><NavLink key={link.href} to={link.href} className={({isActive})=>isActive?"active":""}>{link.label}</NavLink>)}</nav>
   <div className="zn-nav-actions"><Link to="/contact/" className="zn-nav-cta">Start a project <ArrowUpRight size={16}/></Link><button className="zn-menu-button" aria-label={open?"Close menu":"Open menu"} aria-expanded={open} aria-controls="zn-mobile-nav" onClick={()=>setOpen(v=>!v)}>{open?<X/>:<Menu/>}</button></div>
  </div>{open&&<nav id="zn-mobile-nav" className="zn-mobile-nav" aria-label="Mobile navigation">{links.map((link,i)=><Link key={link.href} to={link.href}><span>0{i+1}</span>{link.label}<ArrowUpRight size={17}/></Link>)}<Link to="/contact/" className="zn-mobile-cta">Start a project <ArrowUpRight size={17}/></Link></nav>}</header>
  <main id="main-content" tabIndex="-1">{children}</main>
  <footer className="zn-footer"><div className="zn-wrap">
   <div className="zn-footer-top"><div><p className="zn-overline">ZENITH SOFTWORKS · KERALA, INDIA</p><h2>Make your next idea<br/><em>mean something.</em></h2></div><Link to="/contact/" className="zn-button zn-button-light">Let's talk <ArrowUpRight size={18}/></Link></div>
   <div className="zn-footer-columns"><div className="zn-footer-brand"><img src={BRAND_IMAGES.footerLogo} alt="Zenith Softworks" width="170" height="44" loading="lazy"/><p>A digital development studio building useful websites, software and student project solutions from Kerala, India.</p></div>
    <div><h3>Business</h3><Link to="/business/website-development/">Website development</Link><Link to="/business/ecommerce-development/">E-commerce</Link><Link to="/business/custom-software-development/">Custom software</Link><Link to="/business/website-redesign/">Website redesign</Link></div>
    <div><h3>Students</h3><Link to="/student-projects/">Project support</Link><Link to="/student-projects/bca-project-development/">BCA projects</Link><Link to="/student-projects/btech-project-development/">BTech projects</Link><Link to="/student-projects/mca-project-development/">MCA projects</Link></div>
    <div><h3>Explore</h3><Link to="/projects/">Selected work</Link><Link to="/resources/">Insights</Link><Link to="/about/">About Zenith</Link><Link to="/contact/">Contact</Link></div>
    <div><h3>Get in touch</h3><a href={"mailto:"+SITE.email}>{SITE.email}</a><a href={SITE.whatsappHref} target="_blank" rel="noreferrer">{SITE.whatsappDisplay}</a><span>Kerala, India<br/>Remote across India</span></div>
   </div><div className="zn-footer-bottom"><span>© {new Date().getFullYear()} Zenith Softworks. All rights reserved.</span><div><Link to="/privacy/">Privacy</Link><Link to="/terms/">Terms</Link></div><span>DESIGNED WITH INTENTION</span></div>
  </div></footer>
  <a className="zn-whatsapp" href={SITE.whatsappHref} target="_blank" rel="noreferrer" aria-label="Chat with Zenith Softworks on WhatsApp"><MessageCircle size={19}/><span>Let's talk</span></a>
 </div>;
}