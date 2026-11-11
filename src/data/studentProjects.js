const DOMAINS = `Healthcare|Health|patients and clinics|health records and appointments
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
Document Management|Doc|offices and compliance teams|documents, approvals and versions`
  .trim()
  .split("\n")
  .map((row) => row.split("|"));

const ARCHETYPES = `Flow|Workflow Management Platform|Web & Software|Easy-Medium|Software|React or Next.js, Node.js or FastAPI, PostgreSQL
Lens|AI Analytics Dashboard|AI & Data|Medium-High|AI & Data|React, Python, FastAPI, PostgreSQL, ML tools
Assist|Intelligent Assistant|AI & Data|Medium|AI & Data|Next.js, Python, embeddings, PostgreSQL
Link|Mobile Field App|Mobile & Field|Medium|Mobile|Flutter or React Native, FastAPI, PostgreSQL
Sense|IoT Monitoring System|IoT & Hardware|Medium-High|IoT|ESP32, sensors, MQTT, Node.js
Guard|Security & Audit System|Security & Trust|Medium-High|Cybersecurity|Next.js, FastAPI, PostgreSQL, RBAC
Ops|Cloud Reliability Platform|Cloud & Engineering|High|Cloud & DevOps|Next.js, Docker, PostgreSQL, monitoring tools
Pulse|Real-Time Dashboard|Web & Software|Medium|Software|React, Node.js, WebSockets, PostgreSQL
Predict|Forecasting & Risk System|AI & Data|High|AI & Data|React, Python, FastAPI, forecasting models
Vault|Secure Records Portal|Security & Trust|Medium|Cybersecurity|Next.js, FastAPI, PostgreSQL, object storage`
  .trim()
  .split("\n")
  .map((row) => row.split("|"));

const CATEGORY_DESC = {
  "Web & Software": "digitises repeated work using roles, records, approvals, notifications and reports",
  "AI & Data": "turns realistic data into analysis, recommendations or forecasts with human review",
  "Mobile & Field": "supports field users with mobile tasks, evidence capture and live updates",
  "IoT & Hardware": "connects low-cost sensors to a dashboard with history, thresholds and alerts",
  "Security & Trust": "uses permissions, verification, evidence and audit trails to protect a workflow",
  "Cloud & Engineering": "tracks services, deployments, incidents and reliability indicators",
};

const CATEGORY_MVP = {
  "Web & Software": "Login, roles, core records, workflow states, search, notifications and reports",
  "AI & Data": "Data intake, baseline model or controlled AI flow, metrics, dashboard and review path",
  "Mobile & Field": "Mobile login, task creation, status updates, evidence, notifications and admin view",
  "IoT & Hardware": "Sensor prototype, MQTT data flow, live dashboard, thresholds, alerts and test results",
  "Security & Trust": "Identity, roles, evidence intake, checks, review queue, event log and report",
  "Cloud & Engineering": "Service registry, health checks, deployment history, incident timeline and dashboard",
};

export const DIFFICULTY_RANK = {
  Easy: 1,
  "Easy-Medium": 2,
  Medium: 3,
  "Medium-High": 4,
  High: 5,
};

export const DURATION_RANK = {
  "4–6 weeks": 1,
  "6–10 weeks": 2,
  "8–12 weeks": 3,
  "10–14 weeks": 4,
  "12–16 weeks": 5,
};

export const GENERAL_IDEAS = (() => {
  let n = 0;
  const list = [];
  DOMAINS.forEach((domainEntry, di) => {
    ARCHETYPES.forEach((archEntry, ai) => {
      n += 1;
      const [domain, token, users, data] = domainEntry;
      let [suffix, label, category, difficulty, course, stack] = archEntry;
      if (difficulty === "Medium" && (di + ai) % 5 === 4) difficulty = "Medium-High";
      if (difficulty === "Medium-High" && (di + ai) % 5 === 0) difficulty = "Medium";
      const duration =
        difficulty === "Easy"
          ? "4–6 weeks"
          : difficulty === "Easy-Medium"
            ? "6–10 weeks"
            : difficulty === "Medium"
              ? "8–12 weeks"
              : difficulty === "Medium-High"
                ? "10–14 weeks"
                : "12–16 weeks";
      const id = String(n).padStart(3, "0");
      const name = token + suffix;
      const type = `${domain} ${label}`;
      const technology = stack.split(",")[0].trim();
      list.push({
        id,
        name,
        type,
        domain,
        category,
        difficulty,
        duration,
        course,
        technology,
        stack,
        summary: `A ${domain.toLowerCase()} project that ${CATEGORY_DESC[category]} for ${users}.`,
        problem: `${users[0].toUpperCase() + users.slice(1)} often work with fragmented ${data}, making decisions slow or difficult to verify.`,
        mvp: `${CATEGORY_MVP[category]}. Test with realistic ${data}.`,
        outcome: `A working ${label.toLowerCase()} with measurable evidence and a clear extension path.`,
        featured: [1, 53, 107, 216, 342, 489].includes(n),
        isSustainability: false,
        search: [name, type, domain, category, difficulty, duration, course, stack].join(" ").toLowerCase(),
      });
    });
  });
  return list;
})();

const SUSTAINABILITY_RAW = `S001|EcoTrack AI|A campus sustainability intelligence platform that monitors electricity, water, waste, solar output and estimated carbon emissions in one dashboard.|Energy & Smart Power|AI & Data
S002|Smart Energy Meter|A room- or building-level energy monitoring system that records consumption and highlights unusual usage patterns.|Energy & Smart Power|IoT & Hardware
S003|AI Energy Waste Detector|An analytics system that identifies abnormal electricity consumption and recommends practical energy-saving actions.|Energy & Smart Power|AI & Data
S004|Solar Power Monitoring System|A solar performance dashboard that tracks generation, efficiency, downtime and possible panel faults.|Energy & Smart Power|IoT & Hardware
S005|Smart Streetlight Controller|A daylight- and motion-aware streetlight system designed to reduce unnecessary power usage while maintaining safety.|Energy & Smart Power|IoT & Hardware
S006|Hostel Energy Management System|A hostel-level platform that tracks room-wise energy use and detects avoidable consumption.|Energy & Smart Power|Web & Software
S007|Smart Classroom Power Saver|An occupancy-based control system that switches lights and fans off when a classroom is empty.|Energy & Smart Power|IoT & Hardware
S008|Renewable Energy Forecasting Platform|A forecasting platform that predicts solar or wind energy generation using weather and historical production data.|Energy & Smart Power|AI & Data
S009|Home Appliance Energy Optimizer|A household dashboard that compares appliance-level energy use and provides personalised saving suggestions.|Energy & Smart Power|Web & Software
S010|Community Microgrid Manager|A decision-support system that distributes solar and battery power across homes or campus buildings based on priority and demand.|Energy & Smart Power|Cloud & Engineering
S011|Smart Water Leakage Detector|A sensor-based pipeline monitoring system that identifies leaks and sends immediate alerts.|Water Sustainability|IoT & Hardware
S012|Water Usage Monitoring System|A home, hostel or campus platform that tracks water consumption by location and time.|Water Sustainability|IoT & Hardware
S013|AI Water Demand Predictor|A forecasting system that estimates future water demand using past consumption, weather and occupancy data.|Water Sustainability|AI & Data
S014|Rainwater Harvesting Monitor|A dashboard that monitors rainwater tank level, usage, pump operation and basic quality readings.|Water Sustainability|IoT & Hardware
S015|Smart Irrigation System|A soil-moisture-based irrigation controller that supplies water only when crops require it.|Water Sustainability|IoT & Hardware
S016|Greywater Reuse Management System|A system that tracks treated greywater availability and schedules its reuse for gardening or cleaning.|Water Sustainability|Web & Software
S017|Smart Public Tap Controller|A timed or sensor-controlled public tap designed to reduce unattended water wastage.|Water Sustainability|IoT & Hardware
S018|Groundwater Level Monitoring System|A continuous groundwater or borewell monitoring platform with historical trends and warning thresholds.|Water Sustainability|IoT & Hardware
S019|Water Quality Detection System|A low-cost system that monitors pH, turbidity, temperature and other selected water-quality parameters.|Water Sustainability|IoT & Hardware
S020|Campus Water Sustainability Dashboard|A building-wise dashboard for water use, leakage events, harvesting and conservation performance.|Water Sustainability|Web & Software
S021|WasteLens AI|An image-based system that classifies plastic, paper, metal and organic waste for better segregation.|Waste Management & Circular Economy|AI & Data
S022|Smart Waste Bin|A fill-level monitoring bin that notifies collection teams before overflow occurs.|Waste Management & Circular Economy|IoT & Hardware
S023|Waste Collection Route Optimizer|A routing platform that creates efficient collection plans using bin status, location and vehicle capacity.|Waste Management & Circular Economy|AI & Data
S024|FoodLoop|A food-redistribution platform that connects safe surplus food from hotels or events with NGOs and volunteers.|Waste Management & Circular Economy|Web & Software
S025|E-Waste Collection Platform|A platform that coordinates electronic-waste pickup with authorised recyclers and tracks disposal evidence.|Waste Management & Circular Economy|Web & Software
S026|Plastic Recycling Reward App|A mobile reward system that gives users points for verified plastic returns and responsible recycling.|Waste Management & Circular Economy|Mobile & Field
S027|College Waste Audit System|A campus system that records waste by category, source and quantity to support reduction targets.|Waste Management & Circular Economy|Web & Software
S028|Compost Monitoring System|A composting dashboard that tracks temperature, moisture and decomposition progress.|Waste Management & Circular Economy|IoT & Hardware
S029|Reusable Product Marketplace|A local marketplace for exchanging or reselling furniture, electronics, books and other reusable products.|Waste Management & Circular Economy|Web & Software
S030|Construction Waste Exchange Platform|A marketplace that helps contractors list and reuse surplus construction materials instead of discarding them.|Waste Management & Circular Economy|Web & Software
S031|Precision Farming System|A farm decision-support platform that combines soil, weather and crop data for better resource use.|Sustainable Agriculture|AI & Data
S032|Crop Water Requirement Predictor|A system that estimates irrigation needs using crop type, soil condition and local weather.|Sustainable Agriculture|AI & Data
S033|AI Plant Disease Detector|A computer-vision tool that identifies likely plant diseases from leaf images and suggests next steps.|Sustainable Agriculture|AI & Data
S034|Organic Farming Management App|A farm management app for organic inputs, schedules, evidence and certification records.|Sustainable Agriculture|Mobile & Field
S035|Smart Greenhouse Controller|An automated greenhouse system for temperature, humidity, lighting and irrigation control.|Sustainable Agriculture|IoT & Hardware
S036|Farm Carbon Footprint Calculator|A calculator that estimates farm emissions from fertiliser, fuel, electricity, water and transport use.|Sustainable Agriculture|Web & Software
S037|Food Supply-Chain Waste Tracker|A traceability platform that records food loss from farm to storage, transport and retail.|Sustainable Agriculture|Web & Software
S038|Solar-Powered Irrigation Controller|A solar-powered pump controller that schedules irrigation using available energy and soil need.|Sustainable Agriculture|IoT & Hardware
S039|Local Farmer-to-Customer Platform|A direct-selling platform that connects nearby farmers with customers and reduces transport distance and middlemen.|Sustainable Agriculture|Web & Software
S040|Crop Residue Utilisation Platform|A coordination platform that connects agricultural residue with composting, biofuel or material-reuse opportunities.|Sustainable Agriculture|Web & Software
S041|Local Carbon Footprint Calculator|A tool that estimates emissions for individuals, families or organisations and recommends reduction actions.|Climate & Environment|Web & Software
S042|Air Quality Monitoring Network|A low-cost sensor network that creates location-wise air-quality maps and alerts.|Climate & Environment|IoT & Hardware
S043|Urban Heat Mapping System|A mapping platform that identifies urban heat hotspots using temperature and location data.|Climate & Environment|AI & Data
S044|Flood Risk Prediction System|A warning platform that combines rainfall, water level and terrain information to estimate flood risk.|Climate & Environment|AI & Data
S045|Forest Fire Early Warning System|A sensor-based system that uses smoke, temperature and humidity readings to detect early fire risk.|Climate & Environment|IoT & Hardware
S046|Noise Pollution Mapping App|A mobile application that collects geo-tagged noise readings and creates area-wise pollution maps.|Climate & Environment|Mobile & Field
S047|Tree Plantation Tracking Platform|A platform that records planted trees, location, growth updates and survival rate over time.|Climate & Environment|Mobile & Field
S048|Biodiversity Observation App|A community app for recording bird, plant and animal sightings with location and evidence.|Climate & Environment|Mobile & Field
S049|Climate Risk Dashboard for Local Bodies|A local-government dashboard combining flood, heat, rainfall and water-risk indicators.|Climate & Environment|AI & Data
S050|Green Cover Change Detector|A satellite-image analysis system that identifies vegetation gain or loss over time.|Climate & Environment|AI & Data
S051|EV Charging Station Finder|A mobile platform that shows nearby charging stations, connector type, availability and pricing.|Sustainable Transport & EV|Mobile & Field
S052|Smart EV Charging Scheduler|A scheduling system that charges vehicles during lower-demand periods while respecting departure deadlines.|Sustainable Transport & EV|AI & Data
S053|EV Battery Health Monitor|A monitoring dashboard that analyses battery temperature, charge cycles and health indicators.|Sustainable Transport & EV|IoT & Hardware
S054|Public Transport Carbon-Saving App|An app that estimates emissions saved when users choose bus or train instead of private vehicles.|Sustainable Transport & EV|Mobile & Field
S055|College Carpool Platform|A verified ride-sharing platform for students and staff that reduces duplicate trips and fuel use.|Sustainable Transport & EV|Mobile & Field
S056|Smart Bicycle Rental System|A campus or community bicycle-sharing platform with QR-based rental, tracking and maintenance status.|Sustainable Transport & EV|Mobile & Field
S057|Green Route Planner|A route-planning tool that recommends journeys with lower estimated fuel use or emissions.|Sustainable Transport & EV|AI & Data
S058|Delivery Route Emission Optimizer|A logistics tool that reduces delivery distance, idle time and estimated emissions.|Sustainable Transport & EV|AI & Data
S059|Electric Bus Fleet Monitoring System|A fleet dashboard for battery state, route performance, charging and energy consumption.|Sustainable Transport & EV|Cloud & Engineering
S060|Vehicle Pollution Maintenance Reminder|A maintenance platform that uses vehicle usage and service history to reduce avoidable emissions.|Sustainable Transport & EV|Web & Software
S061|Green Building Performance Dashboard|A dashboard that evaluates energy, water, ventilation and waste performance for a building.|Sustainable Buildings & Cities|Web & Software
S062|Smart HVAC Controller|An occupancy- and temperature-aware control system that reduces unnecessary cooling and ventilation energy.|Sustainable Buildings & Cities|IoT & Hardware
S063|Building Carbon Emission Calculator|A calculator that estimates emissions from materials, construction and building operation.|Sustainable Buildings & Cities|Web & Software
S064|Smart Natural Ventilation System|An indoor-air-quality system that controls windows or fans using temperature, humidity and CO2 readings.|Sustainable Buildings & Cities|IoT & Hardware
S065|Sustainable Material Recommendation Tool|A decision-support tool that compares construction materials by cost, durability and environmental impact.|Sustainable Buildings & Cities|AI & Data
S066|Smart Parking and Emission Reduction System|A parking guidance system that reduces time and fuel wasted while searching for available spaces.|Sustainable Buildings & Cities|IoT & Hardware
S067|Urban Rainwater Drain Monitoring System|A drain-level and blockage monitoring system that provides early flood-risk alerts.|Sustainable Buildings & Cities|IoT & Hardware
S068|Public Lighting Energy Dashboard|A municipal dashboard that tracks streetlight energy use, faults and maintenance response.|Sustainable Buildings & Cities|Cloud & Engineering
S069|Green Campus Rating Platform|A platform that scores colleges using energy, water, waste, mobility and environmental indicators.|Sustainable Buildings & Cities|Web & Software
S070|Smart Building Occupancy System|An occupancy analytics system that prevents electricity and cooling waste in underused spaces.|Sustainable Buildings & Cities|IoT & Hardware`
  .trim()
  .split("\n")
  .map((row) => row.split("|"));

const SUSTAINABILITY_GROUP_META = {
  "Energy & Smart Power": ["Medium-High", "10–14 weeks", "AI & Data", "Python, FastAPI, React, IoT sensors"],
  "Water Sustainability": ["Medium", "8–12 weeks", "IoT", "ESP32, sensors, MQTT, React"],
  "Waste Management & Circular Economy": ["Medium", "8–12 weeks", "Software", "React, Node.js, PostgreSQL"],
  "Sustainable Agriculture": ["Medium-High", "10–14 weeks", "AI & Data", "Python, FastAPI, React, field sensors"],
  "Climate & Environment": ["High", "12–16 weeks", "AI & Data", "Python, FastAPI, GIS, React"],
  "Sustainable Transport & EV": ["Medium-High", "10–14 weeks", "Mobile", "Flutter, FastAPI, maps, telemetry"],
  "Sustainable Buildings & Cities": ["Medium-High", "10–14 weeks", "IoT", "ESP32, sensors, MQTT, dashboard"],
};

export const SUSTAINABILITY_KEYWORDS = [
  "sustainable",
  "sustainability",
  "green tech",
  "green technology",
  "climate",
  "environment",
  "eco",
  "carbon",
  "renewable",
  "solar",
  "water",
  "waste",
  "circular economy",
  "energy",
  "ev",
  "electric vehicle",
  "agriculture",
  "smart city",
  "green building",
  "pollution",
  "irrigation",
  "recycling",
];

export const SUSTAINABILITY_IDEAS = SUSTAINABILITY_RAW.map(([id, name, summary, group, category]) => {
  const [difficulty, duration, course, stack] = SUSTAINABILITY_GROUP_META[group];
  return {
    id,
    name,
    type: group,
    domain: group,
    category,
    difficulty,
    duration,
    course,
    stack,
    technology: stack.split(",")[0].trim(),
    summary,
    problem: summary,
    mvp: "Build a focused prototype with data collection, a dashboard, measurable indicators, alerts or recommendations, and a realistic test dataset.",
    outcome: "A demonstrable green-technology solution with measurable environmental value and a practical extension path.",
    featured: false,
    isSustainability: true,
    search: [name, summary, group, category, ...SUSTAINABILITY_KEYWORDS].join(" ").toLowerCase(),
  };
});
