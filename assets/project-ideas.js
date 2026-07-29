const D=`Healthcare|Health|patients and clinics|health records and appointments
Education|Learn|students and institutions|learning activity and assessments
Agriculture|Agri|farmers and field officers|crop, soil, weather and market data
Retail|Retail|retailers and customers|sales, stock and customer behaviour
Logistics|Route|dispatchers and drivers|routes, deliveries and vehicle status
Finance|Fin|businesses and accountants|transactions, invoices and budgets
Public Services|Civic|citizens and departments|requests, cases and service status
Environment|Eco|communities and regulators|resource use, waste and environmental readings
Energy|Power|facilities and technicians|consumption and equipment state
Water|Aqua|utilities and communities|levels, flow, quality and usage
Safety|Safe|students, workers and responders|alerts, location and incident evidence
Cybersecurity|Trust|users and security teams|access events, risks and audit history
Tourism|Trip|travellers and local businesses|destinations, bookings and feedback
Hospitality|Stay|hotels and guests|reservations, rooms and service requests
Construction|Build|contractors and engineers|tasks, materials and inspections
Manufacturing|Factory|operators and supervisors|production, quality and downtime
Human Resources|Talent|employees and recruiters|profiles, attendance and hiring activity
Legal Services|Legal|citizens and legal teams|cases, documents and deadlines
Real Estate|Estate|tenants and property managers|properties, leases and maintenance
Transportation|Transit|passengers and operators|schedules, occupancy and routes
Waste Management|Waste|collectors and communities|collection events and route evidence
Food Services|Food|kitchens and customers|orders, inventory and safety checks
Community Services|Community|volunteers and residents|requests, resources and outcomes
Sports|Sport|athletes and coaches|training, performance and fixtures
Media|Media|creators and editors|assets, rights and publishing
Insurance|Cover|customers and agents|policies, claims and evidence
Pharmacy|Medi|pharmacists and patients|medicine stock and prescriptions
Elder Care|Care|families and caregivers|care plans, visits and wellbeing
Disaster Management|Rescue|communities and responders|incidents, resources and locations
Automotive|Auto|vehicle owners and workshops|service history and maintenance
Telemedicine|TeleCare|patients and doctors|consultations and follow-ups
Libraries|Book|students and librarians|catalogues, borrowing and usage
Laboratories|Lab|technicians and researchers|samples, tests and equipment
Supply Chain|Supply|buyers and suppliers|orders, vendors and deliveries
E-commerce|Shop|sellers and customers|products, orders and payments
Mental Wellness|Well|users and counsellors|check-ins, resources and appointments
Accessibility|Access|people with disabilities and institutions|access needs and support requests
Career Development|Career|students and mentors|skills, roles and applications
Research Management|Research|students and guides|topics, milestones and evidence
Campus Operations|Campus|students and administrators|attendance, facilities and requests
Home Services|Home|households and technicians|bookings, tasks and service quality
Banking Support|Bank|customers and support teams|requests, transactions and identity evidence
Renewable Energy|Solar|homes and installers|generation and equipment health
Animal Welfare|Paw|rescuers and veterinary teams|reports, treatment and adoption
Parking|Park|drivers and operators|space availability and entry events
Event Management|Event|organisers and attendees|registrations, schedules and resources
Quality Assurance|Quality|developers and testers|requirements, tests and defects
Cloud Operations|Cloud|developers and DevOps teams|deployments, costs and incidents
Small Business Operations|Biz|owners and staff|sales, tasks and inventory
Document Management|Doc|offices and compliance teams|documents, approvals and versions`.trim().split('\n').map(x=>x.split('|'));
const A=`Flow|Workflow Management Platform|Web & Software|Easy-Medium|Software|React or Next.js, Node.js or FastAPI, PostgreSQL
Lens|AI Analytics Dashboard|AI & Data|Medium-High|AI & Data|React, Python, FastAPI, PostgreSQL, ML tools
Assist|Intelligent Assistant|AI & Data|Medium|AI & Data|Next.js, Python, embeddings, PostgreSQL
Link|Mobile Field App|Mobile & Field|Medium|Mobile|Flutter or React Native, FastAPI, PostgreSQL
Sense|IoT Monitoring System|IoT & Hardware|Medium-High|IoT|ESP32, sensors, MQTT, Node.js
Guard|Security & Audit System|Security & Trust|Medium-High|Cybersecurity|Next.js, FastAPI, PostgreSQL, RBAC
Ops|Cloud Reliability Platform|Cloud & Engineering|High|Cloud & DevOps|Next.js, Docker, PostgreSQL, monitoring tools
Pulse|Real-Time Dashboard|Web & Software|Medium|Software|React, Node.js, WebSockets, PostgreSQL
Predict|Forecasting & Risk System|AI & Data|High|AI & Data|React, Python, FastAPI, forecasting models
Vault|Secure Records Portal|Security & Trust|Medium|Cybersecurity|Next.js, FastAPI, PostgreSQL, object storage`.trim().split('\n').map(x=>x.split('|'));
const DS={'Easy':1,'Easy-Medium':2,'Medium':3,'Medium-High':4,'High':5},TS={'4–6 weeks':1,'6–10 weeks':2,'8–12 weeks':3,'10–14 weeks':4,'12–16 weeks':5};
(()=>{const $=s=>document.querySelector(s),esc=s=>String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const desc={'Web & Software':'digitises repeated work using roles, records, approvals, notifications and reports','AI & Data':'turns realistic data into analysis, recommendations or forecasts with human review','Mobile & Field':'supports field users with mobile tasks, evidence capture and live updates','IoT & Hardware':'connects low-cost sensors to a dashboard with history, thresholds and alerts','Security & Trust':'uses permissions, verification, evidence and audit trails to protect a workflow','Cloud & Engineering':'tracks services, deployments, incidents and reliability indicators'};
const mvp={'Web & Software':'Login, roles, core records, workflow states, search, notifications and reports','AI & Data':'Data intake, baseline model or controlled AI flow, metrics, dashboard and review path','Mobile & Field':'Mobile login, task creation, status updates, evidence, notifications and admin view','IoT & Hardware':'Sensor prototype, MQTT data flow, live dashboard, thresholds, alerts and test results','Security & Trust':'Identity, roles, evidence intake, checks, review queue, event log and report','Cloud & Engineering':'Service registry, health checks, deployment history, incident timeline and dashboard'};
let n=0,I=[];D.forEach((d,di)=>A.forEach((a,ai)=>{n++;let [domain,token,users,data]=d,[suffix,label,category,difficulty,course,stack]=a;if(difficulty==='Medium'&&(di+ai)%5===4)difficulty='Medium-High';if(difficulty==='Medium-High'&&(di+ai)%5===0)difficulty='Medium';let duration=difficulty==='Easy'?'4–6 weeks':difficulty==='Easy-Medium'?'6–10 weeks':difficulty==='Medium'?'8–12 weeks':difficulty==='Medium-High'?'10–14 weeks':'12–16 weeks',id=String(n).padStart(3,'0'),name=token+suffix,type=domain+' '+label,technology=stack.split(',')[0];I.push({id,name,type,domain,category,difficulty,duration,course,technology,stack,summary:`A ${domain.toLowerCase()} project that ${desc[category]} for ${users}.`,problem:`${users[0].toUpperCase()+users.slice(1)} often work with fragmented ${data}, making decisions slow or difficult to verify.`,mvp:mvp[category]+`. Test with realistic ${data}.`,outcome:`A working ${label.toLowerCase()} with measurable evidence and a clear extension path.`,featured:[1,53,107,216,342,489].includes(n),search:[name,type,domain,category,difficulty,duration,course,stack].join(' ').toLowerCase()})}));
let grid=$('#ideaGrid');if(!grid)return;let F={q:$('#ideaSearch'),c:$('#categoryFilter'),d:$('#difficultyFilter'),o:$('#courseFilter'),t:$('#technologyFilter'),u:$('#durationFilter'),s:$('#sortFilter')},limit=24,rows=I;
function opts(id,v){let e=$(id);[...new Set(v)].sort().forEach(x=>e.insertAdjacentHTML('beforeend',`<option>${esc(x)}</option>`))}opts('#courseFilter',I.map(x=>x.course));opts('#technologyFilter',I.map(x=>x.technology));opts('#durationFilter',I.map(x=>x.duration));
function card(x){return `<article class="idea-card"><div class="idea-top"><span class="idea-id">${x.id}</span><span class="idea-difficulty">${esc(x.difficulty)}</span></div><span class="idea-category">${esc(x.category)} · ${esc(x.domain)}</span><h3>${esc(x.name)}</h3><p class="idea-type">${esc(x.type)}</p><p>${esc(x.summary)}</p><div class="idea-meta"><span>${esc(x.duration)}</span><span>${esc(x.course)}</span><span>${esc(x.technology)}</span></div><button class="idea-open" data-project-id="${x.id}">View idea details →</button></article>`}
function apply(reset=true){if(reset)limit=24;let q=F.q.value.trim().toLowerCase();rows=I.filter(x=>(!q||x.search.includes(q))&&(F.c.value==='all'||x.category===F.c.value)&&(F.d.value==='all'||x.difficulty===F.d.value)&&(F.o.value==='all'||x.course===F.o.value)&&(F.t.value==='all'||x.technology===F.t.value)&&(F.u.value==='all'||x.duration===F.u.value));let s=F.s.value;if(s==='name-asc')rows.sort((a,b)=>a.name.localeCompare(b.name));else if(s==='name-desc')rows.sort((a,b)=>b.name.localeCompare(a.name));else if(s==='difficulty-asc')rows.sort((a,b)=>DS[a.difficulty]-DS[b.difficulty]);else if(s==='difficulty-desc')rows.sort((a,b)=>DS[b.difficulty]-DS[a.difficulty]);else if(s==='duration-asc')rows.sort((a,b)=>TS[a.duration]-TS[b.duration]);else if(s==='duration-desc')rows.sort((a,b)=>TS[b.duration]-TS[a.duration]);else if(s==='newest')rows.sort((a,b)=>+b.id-+a.id);else rows.sort((a,b)=>+b.featured-+a.featured||+a.id-+b.id);let v=rows.slice(0,limit);grid.innerHTML=v.map(card).join('');$('#ideaCount').textContent=rows.length;$('#visibleCount').textContent=v.length;$('#ideaEmpty').hidden=!!rows.length;$('#loadMoreIdeas').hidden=v.length>=rows.length}
Object.values(F).forEach(e=>e.addEventListener(e===F.q?'input':'change',()=>apply(e!==F.s)));$('#resetFilters').onclick=()=>{F.q.value='';[F.c,F.d,F.o,F.t,F.u].forEach(x=>x.value='all');F.s.value='featured';apply()};$('#loadMoreIdeas').onclick=()=>{limit+=24;apply(false)};
$('#featuredIdeas').innerHTML=I.filter(x=>x.featured).map(x=>`<article class="featured-idea"><span class="eyebrow">${x.id} · ${esc(x.category)}</span><h3>${esc(x.name)}</h3><p>${esc(x.problem)}</p><dl><div><dt>Suggested MVP</dt><dd>${esc(x.mvp)}</dd></div><div><dt>Technology</dt><dd>${esc(x.stack)}</dd></div></dl><a href="/contact/?service=Academic%20project&project=${encodeURIComponent(x.name)}">Request full abstract →</a></article>`).join('');
let dialog=$('#ideaDialog'),content=$('#ideaDialogContent'),map=new Map(I.map(x=>[x.id,x]));grid.onclick=e=>{let b=e.target.closest('[data-project-id]');if(!b)return;let x=map.get(b.dataset.projectId),url='/contact/?service=Academic%20project&project='+encodeURIComponent(x.name);content.innerHTML=`<span class="eyebrow">Project ${x.id} · ${esc(x.category)}</span><h2>${esc(x.name)}</h2><p class="dialog-type">${esc(x.type)}</p><div class="dialog-tags"><span>${esc(x.difficulty)}</span><span>${esc(x.duration)}</span><span>${esc(x.course)}</span></div><div class="dialog-detail"><h3>Problem</h3><p>${esc(x.problem)}</p><h3>Project direction</h3><p>${esc(x.summary)}</p><h3>Suggested MVP</h3><p>${esc(x.mvp)}</p><h3>Suggested technology</h3><p>${esc(x.stack)}</p><h3>Expected outcome</h3><p>${esc(x.outcome)}</p></div><div class="actions"><a class="btn primary" href="${url}">Request full abstract</a><button class="btn dialog-cancel">Close</button></div>`;dialog.showModal();content.querySelector('.dialog-cancel').onclick=()=>dialog.close()};dialog.querySelector('.dialog-close').onclick=()=>dialog.close();dialog.onclick=e=>{if(e.target===dialog)dialog.close()};apply()})();