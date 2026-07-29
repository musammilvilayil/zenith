const header=document.getElementById('site-header');
const menuButton=document.getElementById('menu-button');
const nav=document.getElementById('primary-nav');
const backToTop=document.getElementById('back-to-top');
const form=document.getElementById('enquiry-form');
const status=document.getElementById('form-status');
const modal=document.getElementById('legal-modal');
const modalContent=document.getElementById('modal-content');
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.getElementById('year').textContent=new Date().getFullYear();
function setMenu(open){nav.classList.toggle('open',open);menuButton.classList.toggle('open',open);menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation');document.body.classList.toggle('menu-open',open)}
menuButton.addEventListener('click',()=>setMenu(!nav.classList.contains('open')));
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){setMenu(false);if(modal.open)modal.close()}});
function onScroll(){const y=window.scrollY;header.classList.toggle('scrolled',y>24);backToTop.classList.toggle('visible',y>700)}
window.addEventListener('scroll',onScroll,{passive:true});onScroll();
backToTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:reducedMotion?'auto':'smooth'}));
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
const sections=[...document.querySelectorAll('main section[id]')];
const links=[...nav.querySelectorAll('a')];
const sectionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${entry.target.id}`))}}),{rootMargin:'-35% 0px -55%'});
sections.forEach(section=>sectionObserver.observe(section));
form.addEventListener('submit',e=>{e.preventDefault();status.textContent='';const required=[...form.querySelectorAll('[required]')];let valid=true;required.forEach(field=>{const bad=field.type==='checkbox'?!field.checked:!field.value.trim();field.setAttribute('aria-invalid',String(bad));if(bad)valid=false});const email=form.elements.email;if(email.value&&!/^\S+@\S+\.\S+$/.test(email.value)){email.setAttribute('aria-invalid','true');valid=false}if(!valid){status.textContent='Please complete the required fields correctly.';required.find(f=>f.getAttribute('aria-invalid')==='true')?.focus();return}const data=new FormData(form);const message=['Hello Zenith Softworks, I would like to discuss a project.','',`Name: ${data.get('name')}`,`Email: ${data.get('email')}`,`Phone: ${data.get('phone')||'Not provided'}`,`Category: ${data.get('category')}`,`Budget: ${data.get('budget')}`,`Timeline: ${data.get('timeline')}`,'',`Project brief: ${data.get('message')}`].join('\n');status.textContent='Opening WhatsApp with your project brief…';window.open(`https://wa.me/916282135504?text=${encodeURIComponent(message)}`,'_blank','noopener,noreferrer')});
form.querySelectorAll('input,select,textarea').forEach(field=>field.addEventListener('input',()=>field.removeAttribute('aria-invalid')));
const legal={privacy:`<div class="legal-copy"><p class="eyebrow">Legal</p><h2>Privacy notice</h2><p>Last updated: 29 July 2026</p><h3>Information you provide</h3><p>This website does not store enquiry form data. When you submit the form, your project brief is prepared locally in your browser and opened in WhatsApp for you to send voluntarily.</p><h3>External services</h3><p>WhatsApp, email and hosting services have their own privacy practices. Zenith Softworks does not control those external platforms.</p><h3>Contact</h3><p>For privacy questions, contact hello@zenithsoftworks.in.</p></div>`,terms:`<div class="legal-copy"><p class="eyebrow">Legal</p><h2>Website terms</h2><p>Last updated: 29 July 2026</p><h3>General information</h3><p>The website presents Zenith Softworks services and representative project work. A project begins only after scope, timeline, deliverables and commercial terms are agreed separately.</p><h3>Project enquiries</h3><p>Sending an enquiry does not create a contract or guarantee availability. Estimates are provided after reviewing the complete requirements.</p><h3>Intellectual property</h3><p>Website design, copy and brand elements belong to Zenith Softworks unless otherwise stated.</p></div>`};
document.querySelectorAll('[data-modal]').forEach(button=>button.addEventListener('click',()=>{modalContent.innerHTML=legal[button.dataset.modal];modal.showModal()}));
modal.querySelector('.modal-close').addEventListener('click',()=>modal.close());
modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});
