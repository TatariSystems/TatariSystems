import { useState, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";

/* ═══════════════════════════════════════════
   CONTINENT DATA — Deep nested intelligence
   ═══════════════════════════════════════════ */
const CONTINENTS = {
  africa: {
    name: "Africa",
    lat: 2, lng: 20,
    color: "#fff",
    headline: "The Sovereign Compute Frontier",
    subtitle: "350 GW untapped hydro · <50 MW commercial DC capacity · 54 nations dependent on Chinese-built fiber",
    stats: [
      { label: "Exploitable Hydro", value: "350 GW", delta: "90% untapped" },
      { label: "DC Capacity", value: "<100 MW", delta: "vs 35 GW in N. Virginia" },
      { label: "Chinese Fiber Dep.", value: "70%", delta: "4G infra on Huawei" },
      { label: "Localization Mandates", value: "12", delta: "Tier 2–3 markets" },
    ],
    thesis: "Africa possesses the world's largest pool of stranded clean energy and the widest infrastructure gap. The convergence of data localization mandates, sovereign AI demand, and the Gulf conflict's validation of distributed compute creates a structural investment opportunity in sovereign-aligned infrastructure.",
    countries: [
      {
        name: "Ethiopia", flag: "ET", status: "Active Operations",
        metrics: [
          { k: "Hydro Potential", v: "45+ GW" },
          { k: "GERD Capacity", v: "5.15 GW" },
          { k: "Power Cost", v: "$0.02–0.04/kWh" },
          { k: "Tatari Mining", v: "144 ASICs, QRB Labs" },
        ],
        projects: [
          { name: "Grand Ethiopian Renaissance Dam", stage: "Operational (Sep 2025)", detail: "Largest hydro project in Africa. Creates surplus baseload for co-located compute." },
          { name: "Tatari BTC Mining Operations", stage: "Active", detail: "144 ASIC machines hosted by QRB Labs in Addis Ababa. Leveraging low-cost hydro power." },
        ]
      },
      {
        name: "Rwanda", flag: "RW", status: "Primary Target",
        metrics: [
          { k: "DC Capacity", v: "<10 MW" },
          { k: "Law 058/2021", v: "In-country storage req." },
          { k: "Raxio Presence", v: "Operational" },
          { k: "Fiber Landing", v: "Via Kenya/Tanzania" },
        ],
        projects: [
          { name: "National Cyber Security Authority", stage: "Enforcing", detail: "Data localization exceptions require NCSA approval. Enforcement tightening." },
          { name: "Kigali Innovation City", stage: "Under Development", detail: "Government-backed tech hub with data center plots allocated." },
        ]
      },
      {
        name: "Nigeria", flag: "NG", status: "Imminent Mandate",
        metrics: [
          { k: "DC Capacity", v: "<50 MW" },
          { k: "CBN Mandate", v: "Local routing required" },
          { k: "Population", v: "230M+" },
          { k: "NITDA Framework", v: "Active enforcement" },
        ],
        projects: [
          { name: "CBN Payment Data Localization", stage: "Enforced", detail: "All transaction data must route through local switches. Catalyzing domestic DC industry." },
          { name: "Africa Data Centres (DFC-backed)", stage: "Expanding", detail: "$300M DFC commitment for pan-African expansion including Lagos." },
        ]
      },
      {
        name: "DRC", flag: "CD", status: "Stranded Asset",
        metrics: [
          { k: "Inga Potential", v: "40 GW" },
          { k: "Inga I & II Output", v: "1.7 GW" },
          { k: "Grand Inga III", v: "In planning (decades)" },
          { k: "Exports", v: "Negligible" },
        ],
        projects: [
          { name: "Inga Complex", stage: "Partially Operational", detail: "Single largest stranded power asset on Earth. 40 GW theoretical — equivalent to 20 nuclear plants." },
        ]
      },
    ]
  },
  north_america: {
    name: "North America",
    lat: 40, lng: -100,
    color: "#fff",
    headline: "Hyperscaler Dominance & the Dual-Use Problem",
    subtitle: "$9B JWCC contract · 35+ GW operational capacity · Power bottleneck accelerating",
    stats: [
      { label: "DC Capacity", value: "35+ GW", delta: "N. Virginia alone: 4+ GW" },
      { label: "JWCC Contract", value: "$9B", delta: "AWS, Azure, GCP, Oracle" },
      { label: "DoD Cloud Spend", value: "$7.3B", delta: "FY2020–FY2024" },
      { label: "Power Cost Trend", value: "↑ Rising", delta: "$0.07–0.10/kWh" },
    ],
    thesis: "The Pentagon's JWCC and JADC2 architectures have collapsed the boundary between civilian and military compute. Every hyperscaler facility is a dual-use asset and therefore a potential adversary target. Power bottlenecks in Virginia and Oregon are driving costs upward while grid access becomes the binding constraint.",
    countries: [
      {
        name: "United States", flag: "US", status: "Saturated Core",
        metrics: [
          { k: "N. Virginia Cluster", v: "4+ GW, expanding" },
          { k: "JWCC Vendors", v: "AWS, Azure, GCP, Oracle" },
          { k: "C2E Contract (AWS)", v: "Up to $10B" },
          { k: "Nuclear PPAs Signed", v: "3+ (Microsoft, Google)" },
        ],
        projects: [
          { name: "JWCC Multi-Cloud Architecture", stage: "Operational", detail: "Classification boundaries enforced through logical separation — same physical infra as commercial customers. Dual-use by design." },
          { name: "JADC2 / Project Convergence", stage: "Active Integration", detail: "Real-time sensor-to-shooter fusion across all domains. Requires commercial cloud backends at scale." },
          { name: "Stargate (US)", stage: "Announced", detail: "OpenAI/SoftBank JV for domestic AI campus. Separate from UAE project." },
        ]
      },
      {
        name: "Canada", flag: "CA", status: "Growing Hub",
        metrics: [
          { k: "Key Markets", v: "Montreal, Toronto, Vancouver" },
          { k: "Hydro Advantage", v: "Quebec: $0.03–0.05/kWh" },
          { k: "Data Sovereignty", v: "PIPEDA framework" },
        ],
        projects: [
          { name: "Quebec Hydro-Powered DCs", stage: "Expanding", detail: "Clean hydro power attracting AI training workloads displaced from US power-constrained markets." },
        ]
      },
    ]
  },
  europe: {
    name: "Europe",
    lat: 50, lng: 10,
    color: "#fff",
    headline: "Regulatory Fortress & Cable Vulnerability",
    subtitle: "GDPR benchmark · 17 Red Sea cables at risk · Frankfurt/Amsterdam/London triangle",
    stats: [
      { label: "GDPR Jurisdictions", value: "27+", delta: "Global benchmark" },
      { label: "Red Sea Cables", value: "17", delta: "Euro–Asia–Africa corridor" },
      { label: "Key Hubs", value: "FRA/AMS/LON", delta: "Backbone triangle" },
      { label: "Overland Alt Routes", value: "6+", delta: "Gulf-funded, in planning" },
    ],
    thesis: "Europe sits at the terminus of the Red Sea cable corridor now compromised by the Iran conflict. The simultaneous closure of Hormuz and the Red Sea has forced emergency rerouting around Africa's Cape, adding latency and exposing the fragility of Europe's data connectivity to Asia. Gulf states are racing to fund overland alternatives through Syria, Iraq, and East Africa.",
    countries: [
      {
        name: "Germany", flag: "DE", status: "Primary Hub",
        metrics: [
          { k: "Frankfurt Capacity", v: "800+ MW" },
          { k: "DE-CIX", v: "World's largest IXP" },
          { k: "Gaia-X", v: "Sovereign cloud initiative" },
        ],
        projects: [
          { name: "Gaia-X European Cloud", stage: "In Development", detail: "Franco-German sovereign cloud initiative to reduce US hyperscaler dependency." },
        ]
      },
      {
        name: "France", flag: "FR", status: "Cable Terminus",
        metrics: [
          { k: "Marseille Landing", v: "PEACE cable terminus" },
          { k: "ASN (Alcatel)", v: "Major cable manufacturer" },
          { k: "Nuclear Power", v: "Low-cost baseload" },
        ],
        projects: [
          { name: "Marseille Cable Hub", stage: "Operational", detail: "Terminus for PEACE cable (Chinese-owned) and multiple Euro-Asia systems. Critical chokepoint." },
        ]
      },
    ]
  },
  middle_east: {
    name: "Middle East",
    lat: 25, lng: 45,
    color: "#fff",
    headline: "Under Fire — The $300B AI Bet in the Crosshairs",
    subtitle: "3 AWS facilities struck · Hormuz closed · Stargate UAE exposed · $300B at risk",
    stats: [
      { label: "AWS Strikes", value: "3", delta: "UAE & Bahrain, Mar 2026" },
      { label: "Gulf AI Investment", value: "$300B+", delta: "Hyperscaler commitments" },
      { label: "Hormuz Status", value: "Closed", delta: "Since Mar 2, 2026" },
      { label: "Bahrain Gov Data", value: "85%", delta: "Was on AWS Bahrain" },
    ],
    thesis: "The US–Iran conflict has produced the first confirmed military strikes on hyperscale cloud data centers and the simultaneous closure of both maritime data corridors serving the Gulf. The $300B AI infrastructure bet is now in the crosshairs. Bahrain's 85% government data migration to AWS — now offline in a conflict zone — is the cautionary tale for every sovereign data strategy.",
    countries: [
      {
        name: "UAE", flag: "AE", status: "Conflict Exposure",
        metrics: [
          { k: "AWS Strikes", v: "2 facilities (ME-CENTRAL-1)" },
          { k: "Stargate UAE", v: "10 sq mi, 5 GW planned" },
          { k: "Microsoft Commit", v: "$15B by 2029" },
          { k: "Drones Intercepted", v: "541 in one weekend" },
        ],
        projects: [
          { name: "Stargate UAE (Abu Dhabi)", stage: "At Risk", detail: "10-square-mile, 5-GW AI campus. OpenAI, Oracle, Nvidia, G42. Unmissable target for drone warfare." },
          { name: "AWS ME-CENTRAL-1", stage: "Partially Impaired", detail: "2 of 3 availability zones knocked out by Shahed-136 drone strikes. Recovery 'prolonged.'" },
        ]
      },
      {
        name: "Saudi Arabia", flag: "SA", status: "Tier 1 Localization",
        metrics: [
          { k: "DC Power Target", v: "6.6 GW by 2034" },
          { k: "Amazon–Humain", v: "$5B committed" },
          { k: "xAI Partnership", v: "500 MW facility" },
          { k: "SDAIA Alignment", v: "Data protection + AI" },
        ],
        projects: [
          { name: "Humain National AI Company", stage: "Active", detail: "$5B Amazon partnership for AI hub in Riyadh. Aligning data protection with SDAIA." },
        ]
      },
      {
        name: "Bahrain", flag: "BH", status: "Cautionary Tale",
        metrics: [
          { k: "Gov Data on AWS", v: "85% migrated" },
          { k: "AWS MES1 Strike", v: "1 facility hit" },
          { k: "Recovery Status", v: "Partially impaired" },
        ],
        projects: [
          { name: "Government Cloud Migration", stage: "Crisis", detail: "85% of government data was on AWS Bahrain. Facility now offline in an active conflict zone. No 'other region' for national data." },
        ]
      },
    ]
  },
  asia_pacific: {
    name: "Asia-Pacific",
    lat: 15, lng: 105,
    color: "#fff",
    headline: "Localization Accelerating, Chinese Stack Deepening",
    subtitle: "5 Tier 1 mandates enacted · India $25B DC market by 2031 · HMN Tech in 90+ cable projects",
    stats: [
      { label: "Tier 1 Mandates", value: "5", delta: "CN, RU, IN, VN, SA" },
      { label: "India DC Market", value: "$25B", delta: "Projected by 2031" },
      { label: "HMN Tech Projects", value: "90+", delta: "Global cable footprint" },
      { label: "PEACE Cable", value: "15,000 km", delta: "Chinese-owned, operational" },
    ],
    thesis: "Asia-Pacific contains the world's most aggressive data localization regimes and the deepest Chinese infrastructure penetration. India's layered approach — DPDPA plus RBI/SEBI sector mandates — is creating an $8B–$25B data center market. Meanwhile, China's PEACE cable, EMA project, and HMN Technologies' 90+ cable projects are building a parallel internet architecture.",
    countries: [
      {
        name: "India", flag: "IN", status: "Tier 1 / Booming",
        metrics: [
          { k: "DC Market (2026)", v: "$8B" },
          { k: "DC Market (2031)", v: "$25B" },
          { k: "DPDPA + RBI/SEBI", v: "Layered mandates" },
          { k: "Westbound via Hormuz", v: "33% of data" },
        ],
        projects: [
          { name: "DPDPA Enforcement", stage: "Active", detail: "Digital Personal Data Protection Act combined with sector-specific RBI and SEBI mandates creating massive compliance-driven DC demand." },
          { name: "Hormuz Cable Exposure", stage: "At Risk", detail: "33% of India's westbound internet traffic transits the Hormuz corridor. Strait closure causing latency spikes." },
        ]
      },
      {
        name: "Singapore", flag: "SG", status: "Regional Hub",
        metrics: [
          { k: "DC Moratorium", v: "Lifted 2023" },
          { k: "Regional Role", v: "APAC cloud gateway" },
          { k: "Cable Systems", v: "20+ landing" },
        ],
        projects: [
          { name: "APAC Cloud Gateway", stage: "Operational", detail: "Primary interconnection point for APAC hyperscaler traffic. Moratorium on new DCs lifted in 2023 with green energy requirements." },
        ]
      },
      {
        name: "China", flag: "CN", status: "Tier 1 / Closed",
        metrics: [
          { k: "Cybersecurity Law", v: "Comprehensive" },
          { k: "PIPL", v: "Most restrictive globally" },
          { k: "DSR Investment", v: "60% global cable target" },
          { k: "EMA Cable", v: "Full Chinese ownership" },
        ],
        projects: [
          { name: "Digital Silk Road", stage: "Expanding", detail: "State carriers building EMA cable as parallel to SeaMeWe-6 after US blocked HMN. Full Chinese ownership of alternative internet backbone." },
          { name: "PEACE Cable", stage: "Operational", detail: "15,000 km, Hengtong Group-owned, HMN-built. Gwadar to Djibouti to Marseille. Bypasses India entirely." },
        ]
      },
    ]
  },
  south_america: {
    name: "South America",
    lat: -15, lng: -55,
    color: "#fff",
    headline: "Emerging Localization, São Paulo Anchor",
    subtitle: "Brazil Tier 2 mandate imminent · 600+ MW São Paulo cluster · Cape rerouting beneficiary",
    stats: [
      { label: "Brazil DC Capacity", value: "600+ MW", delta: "São Paulo dominant" },
      { label: "LGPD Status", value: "Enacted", delta: "Localization strengthening" },
      { label: "Cape Route Benefit", value: "Active", delta: "Red Sea rerouting" },
      { label: "Equiano Cable", value: "Operational", delta: "Google, via W. Africa" },
    ],
    thesis: "Brazil's LGPD framework is moving toward explicit localization. São Paulo anchors regional capacity but secondary markets remain underserved. The Red Sea cable crisis benefits South Atlantic routing, increasing traffic through Brazilian and West African cable landing stations.",
    countries: [
      {
        name: "Brazil", flag: "BR", status: "Tier 2 Imminent",
        metrics: [
          { k: "São Paulo Cluster", v: "600+ MW" },
          { k: "LGPD", v: "Enacted, strengthening" },
          { k: "Equiano Landing", v: "Active (via W. Africa)" },
          { k: "Population", v: "215M+" },
        ],
        projects: [
          { name: "LGPD Localization Provisions", stage: "Strengthening", detail: "Brazil's General Data Protection Law moving toward explicit data localization requirements. Compliance-driven DC demand rising." },
        ]
      },
      {
        name: "Chile", flag: "CL", status: "Growing Hub",
        metrics: [
          { k: "Santiago Capacity", v: "~80 MW" },
          { k: "Submarine Cables", v: "Pacific landing point" },
          { k: "Renewable Energy", v: "Solar/wind abundant" },
        ],
        projects: [
          { name: "South Pacific Cable Hub", stage: "Expanding", detail: "Santiago emerging as secondary LATAM hub with Pacific cable connectivity and abundant renewable energy." },
        ]
      },
    ]
  },
};

/* ═══════════════════════════════════════════
   PUBLICATIONS
   ═══════════════════════════════════════════ */
const PUBLICATIONS = [
  { id:1, title:"China's Fiber Footprint: How PEACE, DARE, & Huawei Cable Network Are Building Beijing's Intelligence Architecture Across Africa", authors:"Tatari Institute", date:"March 2026", category:"Geopolitics of Compute", abstract:"Beneath the ocean floor, a quiet contest is playing out that will determine who controls the arteries of the global internet for decades. This paper examines the full stack of China's fiber footprint in Africa.", tag:"Geopolitical Risk", featured:true },
  { id:2, title:"The Stranded Gigawatt: Why Africa's Surplus Hydroelectric Capacity Is the Most Undervalued Asset in the Global AI Supply Chain", authors:"Glodi Karagi", date:"March 2026", category:"Development Brief", abstract:"GPU clusters in Virginia compete for grid access while 90% of Africa's exploitable hydroelectric potential remains untapped. This brief frames clean, stranded power as the structural arbitrage for AI infrastructure.", tag:"Energy & Compute", featured:true },
  { id:3, title:"The Dual-Use Problem: When Commercial Cloud Becomes a Military Asset", authors:"Tatari Institute", date:"March 2026", category:"Development Brief", abstract:"The Pentagon's $9B JWCC contract and JADC2 architecture have permanently collapsed the boundary between civilian and military compute infrastructure.", tag:"Defense & Compute", featured:true },
  { id:4, title:"Data Localization Is Coming — Whether Hyperscalers Like It or Not", authors:"Jaemoon Lee & Amen Amare", date:"March 2026", category:"Development Brief", abstract:"Between 2017 and 2025, active data localization controls worldwide more than doubled, rising from 67 to over 140 across 62 jurisdictions.", tag:"Sovereign AI", featured:false },
  { id:5, title:"Infrastructure Under Fire: US–Iran Conflict & the Weaponization of Cloud, Cable, and Compute", authors:"Winta Brhane & Yael Ehrlich", date:"March 2026", category:"Policy Brief", abstract:"The first confirmed military strikes on hyperscale cloud data centers. Three AWS facilities struck, 17 Red Sea cables at risk, and $300B in Gulf AI investment exposed.", tag:"Geopolitical Risk", featured:false },
];

const CATEGORIES = ["All","Policy Brief","Development Brief","Geopolitics of Compute"];

/* ═══════════════════════════════════════════
   DATA CENTER POINTS
   ═══════════════════════════════════════════ */
const DC_POINTS = [
  [39.04,-77.49,1.0],[37.39,-122.08,0.85],[32.78,-96.80,0.7],[41.88,-87.63,0.65],[47.61,-122.33,0.6],[33.75,-84.39,0.5],[40.06,-74.41,0.6],
  [51.51,-0.13,0.9],[50.11,8.68,0.85],[52.37,4.90,0.8],[53.35,-6.26,0.7],[48.86,2.35,0.65],[59.33,18.07,0.5],
  [1.35,103.82,0.9],[35.68,139.65,0.85],[22.32,114.17,0.8],[37.57,126.98,0.7],[19.08,72.88,0.7],[28.61,77.21,0.5],[-33.87,151.21,0.65],[31.23,121.47,0.75],[39.90,116.41,0.7],
  [25.20,55.27,0.6],[24.71,46.68,0.45],
  [-23.55,-46.63,0.6],[-33.45,-70.67,0.4],
  [-26.20,28.05,0.45],[-1.29,36.82,0.3],[6.52,3.38,0.3],[9.02,38.75,0.2],[-1.94,29.87,0.2],[30.04,31.24,0.35],
];

function latLngToVec3(lat,lng,r){const phi=(90-lat)*(Math.PI/180),theta=(lng+180)*(Math.PI/180);return new THREE.Vector3(-(r*Math.sin(phi)*Math.cos(theta)),r*Math.cos(phi),r*Math.sin(phi)*Math.sin(theta));}

/* ═══════════════════════════════════════════
   SIMPLIFIED CONTINENT OUTLINES
   ═══════════════════════════════════════════ */
const CONTINENT_OUTLINES = {
  africa: [[37,10],[36,5],[35,0],[37,-5],[37,-10],[34,-12],[31,-10],[28,-14],[25,-17],[22,-17],[18,-16],[15,-17],[12,-16],[10,-15],[7,-12],[5,-10],[4,-5],[4,-1],[5,1],[4,5],[4,10],[2,10],[0,10],[-2,10],[-5,12],[-8,13],[-10,14],[-13,13],[-15,12],[-18,12],[-20,15],[-23,15],[-25,15],[-27,16],[-28,17],[-30,18],[-32,18],[-34,18],[-34,20],[-34,22],[-33,25],[-33,27],[-31,29],[-30,30],[-28,31],[-25,33],[-22,35],[-20,35],[-17,38],[-15,40],[-12,40],[-10,40],[-7,42],[-5,40],[-2,42],[0,42],[3,40],[5,40],[8,42],[10,42],[12,44],[13,45],[15,45],[18,43],[20,40],[23,38],[25,38],[28,35],[30,33],[32,30],[33,28],[35,28],[36,20],[37,15],[37,10]],
  europe: [[36,-10],[37,-8],[38,-8],[40,-9],[43,-9],[43,-5],[44,0],[46,-2],[48,-5],[50,-5],[52,-5],[53,-3],[55,-3],[56,-5],[58,-5],[60,0],[62,5],[64,10],[65,14],[67,16],[70,20],[70,24],[70,28],[68,28],[65,25],[62,28],[60,30],[58,26],[57,24],[55,20],[54,16],[54,14],[53,10],[51,8],[50,5],[48,4],[46,3],[45,5],[44,8],[43,6],[42,3],[41,2],[40,0],[39,0],[38,-1],[37,0],[36,-5],[36,-10]],
  asia: [[42,28],[44,35],[45,40],[43,42],[42,44],[40,48],[40,50],[42,55],[45,60],[48,58],[50,55],[53,58],[55,60],[58,63],[60,65],[63,68],[65,70],[68,70],[70,72],[72,80],[71,85],[70,90],[69,95],[68,100],[66,103],[65,105],[62,108],[60,110],[57,110],[55,110],[52,115],[50,120],[48,125],[45,130],[43,132],[40,135],[38,140],[36,137],[35,136],[33,132],[30,125],[28,120],[25,117],[22,114],[20,110],[18,108],[15,108],[12,107],[10,106],[8,100],[6,102],[5,103],[3,104],[1,104],[-4,105],[-8,107],[-8,112],[-8,115],[-6,118],[-5,120],[-2,125],[0,128],[3,127],[5,127],[8,122],[10,120],[15,120],[18,120],[22,120],[25,121],[28,122],[30,128],[32,130],[35,132],[36,135],[35,136],[38,140],[40,142],[42,145],[44,143],[46,142],[48,140],[50,140],[52,140],[55,137],[58,139],[60,140],[62,150],[65,170],[68,180],[70,170],[72,155],[72,140],[71,135],[68,120],[65,100],[62,92],[60,90],[57,80],[55,72],[52,62],[50,55],[47,45],[45,40],[42,28]],
  north_america: [[70,-165],[72,-155],[71,-140],[69,-137],[68,-135],[64,-140],[60,-140],[58,-135],[56,-132],[55,-130],[52,-125],[50,-125],[48,-125],[45,-124],[42,-124],[38,-122],[35,-120],[32,-118],[30,-115],[28,-112],[25,-110],[22,-107],[20,-105],[18,-100],[18,-95],[18,-92],[18,-88],[19,-87],[20,-87],[22,-87],[24,-82],[25,-80],[27,-80],[28,-80],[30,-82],[30,-85],[30,-88],[30,-90],[32,-90],[35,-90],[36,-85],[38,-76],[40,-74],[42,-72],[42,-70],[44,-67],[46,-67],[47,-67],[48,-65],[49,-62],[50,-60],[52,-58],[55,-60],[58,-62],[60,-65],[63,-65],[65,-65],[68,-58],[70,-55],[73,-58],[75,-60],[78,-65],[80,-70],[83,-70],[83,-80],[83,-95],[78,-95],[75,-95],[72,-120],[72,-130],[71,-150],[70,-165]],
  south_america: [[12,-72],[11,-74],[10,-75],[9,-76],[8,-77],[6,-77],[5,-77],[3,-79],[2,-80],[0,-80],[-2,-80],[-5,-80],[-8,-79],[-10,-77],[-12,-76],[-15,-75],[-18,-72],[-20,-70],[-22,-70],[-25,-70],[-28,-71],[-30,-72],[-32,-72],[-35,-72],[-38,-73],[-40,-72],[-43,-74],[-45,-75],[-48,-75],[-50,-75],[-53,-72],[-55,-68],[-55,-66],[-55,-65],[-53,-62],[-52,-60],[-50,-62],[-48,-65],[-45,-66],[-42,-65],[-40,-62],[-38,-58],[-36,-56],[-35,-55],[-32,-52],[-30,-50],[-28,-49],[-25,-48],[-23,-42],[-22,-40],[-18,-39],[-15,-39],[-12,-38],[-10,-37],[-7,-35],[-5,-35],[-3,-40],[-2,-45],[0,-50],[1,-51],[2,-52],[4,-55],[5,-60],[7,-60],[8,-62],[10,-68],[10,-72],[12,-72]],
  oceania: [[-10,142],[-11,143],[-12,143],[-14,144],[-15,145],[-18,147],[-20,149],[-23,151],[-25,153],[-27,153],[-28,153],[-30,153],[-33,152],[-35,151],[-37,150],[-38,148],[-38,146],[-37,142],[-37,140],[-36,138],[-35,137],[-34,135],[-33,134],[-32,131],[-32,130],[-28,120],[-25,114],[-22,114],[-20,116],[-20,119],[-19,121],[-18,122],[-16,126],[-15,129],[-14,133],[-14,136],[-12,140],[-12,142],[-10,142]],
  middle_east: [[30,32],[32,34],[33,36],[35,36],[37,40],[38,42],[39,44],[40,44],[40,48],[38,48],[36,50],[34,51],[32,52],[30,50],[28,50],[26,50],[25,55],[24,56],[23,57],[22,55],[20,55],[18,53],[16,50],[15,48],[13,45],[12,44],[15,42],[18,40],[20,38],[22,36],[24,34],[26,33],[28,33],[30,32]],
};

/* ═══════════════════════════════════════════
   3D GLOBE COMPONENT
   ═══════════════════════════════════════════ */
function InteractiveGlobe({ onContinentClick, activeContinent }) {
  const mountRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;
    const width = container.clientWidth, height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 1000);
    camera.position.z = 3.0;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Sphere wireframe
    group.add(new THREE.Mesh(new THREE.SphereGeometry(1,64,64), new THREE.MeshBasicMaterial({color:0xffffff,wireframe:true,transparent:true,opacity:0.018})));

    // Lat lines
    for (let lat=-60;lat<=60;lat+=30) {
      const c=new THREE.EllipseCurve(0,0,Math.cos(lat*Math.PI/180),Math.cos(lat*Math.PI/180),0,2*Math.PI,false,0);
      const pts=c.getPoints(100).map(p=>new THREE.Vector3(p.x,Math.sin(lat*Math.PI/180),p.y));
      group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),new THREE.LineBasicMaterial({color:0xffffff,transparent:true,opacity:0.025})));
    }

    // Continent outlines — pronounced with glow layers
    Object.entries(CONTINENT_OUTLINES).forEach(([key, coords]) => {
      const isActive = activeContinent === key || 
        (key === 'oceania' && activeContinent === 'asia_pacific') || 
        (key === 'asia' && activeContinent === 'asia_pacific') ||
        (key === 'middle_east' && activeContinent === 'middle_east');

      // Interpolate more points between vertices for smoother curves
      const smoothed = [];
      for (let i = 0; i < coords.length; i++) {
        const [lat1, lng1] = coords[i];
        const [lat2, lng2] = coords[(i + 1) % coords.length];
        const steps = 4;
        for (let s = 0; s < steps; s++) {
          const t = s / steps;
          smoothed.push([lat1 + (lat2 - lat1) * t, lng1 + (lng2 - lng1) * t]);
        }
      }
      smoothed.push(smoothed[0]);

      const pts = smoothed.map(([lat, lng]) => latLngToVec3(lat, lng, 1.003));
      const geo = new THREE.BufferGeometry().setFromPoints(pts);

      // Layer 1: Outer glow (wide, soft)
      const glowMat = new THREE.LineBasicMaterial({
        color: 0xffffff, transparent: true,
        opacity: isActive ? 0.2 : 0.06,
        linewidth: 1,
      });
      const glowPts = smoothed.map(([lat, lng]) => latLngToVec3(lat, lng, 1.001));
      glowPts.push(glowPts[0]);
      group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(glowPts), glowMat));

      // Layer 2: Main outline (bright, sharp)
      const mainMat = new THREE.LineBasicMaterial({
        color: 0xffffff, transparent: true,
        opacity: isActive ? 0.85 : 0.4,
      });
      group.add(new THREE.Line(geo.clone(), mainMat));

      // Layer 3: Inner bright core
      const corePts = smoothed.map(([lat, lng]) => latLngToVec3(lat, lng, 1.005));
      corePts.push(corePts[0]);
      const coreMat = new THREE.LineBasicMaterial({
        color: 0xffffff, transparent: true,
        opacity: isActive ? 0.6 : 0.25,
      });
      group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(corePts), coreMat));

      // Layer 4: Fill mesh for active continent (subtle surface highlight)
      if (isActive && smoothed.length > 3) {
        const fillPts2D = smoothed.map(([lat, lng]) => latLngToVec3(lat, lng, 1.002));
        const fillGeo = new THREE.BufferGeometry().setFromPoints(fillPts2D);
        const fillMat = new THREE.PointsMaterial({
          color: 0xffffff, transparent: true, opacity: 0.08, size: 0.008,
        });
        group.add(new THREE.Points(fillGeo, fillMat));
      }
    });

    // DC points
    DC_POINTS.forEach(([lat,lng,intensity]) => {
      const pos = latLngToVec3(lat,lng,1.005);
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.006+intensity*0.008,10,10), new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:0.3+intensity*0.4}));
      dot.position.copy(pos);
      group.add(dot);
      if (intensity > 0.6) {
        const h = intensity*0.12;
        const dir = pos.clone().normalize();
        const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.002,0.002,h,6), new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:0.1+intensity*0.15}));
        pillar.position.copy(pos.clone().add(dir.clone().multiplyScalar(h/2)));
        pillar.lookAt(0,0,0); pillar.rotateX(Math.PI/2);
        group.add(pillar);
      }
    });

    // Continent hotspot markers — large, easy to click
    const hotspotMeshes = [];
    Object.entries(CONTINENTS).forEach(([key, c]) => {
      const pos = latLngToVec3(c.lat, c.lng, 1.04);
      const isActive = activeContinent === key;

      // Invisible large hit target (for easy clicking)
      const hitGeo = new THREE.SphereGeometry(0.08, 16, 16);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      hitMesh.position.copy(pos);
      hitMesh.userData = { continentKey: key };
      group.add(hitMesh);

      // Outer pulse ring
      const outerRing = new THREE.Mesh(
        new THREE.RingGeometry(0.055, 0.075, 48),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: isActive ? 0.7 : 0.25, side: THREE.DoubleSide })
      );
      outerRing.position.copy(pos); outerRing.lookAt(0, 0, 0);
      group.add(outerRing);

      // Middle ring
      const midRing = new THREE.Mesh(
        new THREE.RingGeometry(0.035, 0.050, 48),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: isActive ? 0.5 : 0.15, side: THREE.DoubleSide })
      );
      midRing.position.copy(pos); midRing.lookAt(0, 0, 0);
      group.add(midRing);

      // Core dot (bright, visible)
      const coreDot = new THREE.Mesh(
        new THREE.SphereGeometry(0.028, 20, 20),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: isActive ? 1.0 : 0.55 })
      );
      coreDot.position.copy(pos);
      coreDot.userData = { continentKey: key };
      group.add(coreDot);
      hotspotMeshes.push({ outer: outerRing, mid: midRing, core: coreDot });
    });

    // Atmosphere
    const atmosMat = new THREE.ShaderMaterial({
      vertexShader:`varying vec3 vN;void main(){vN=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
      fragmentShader:`varying vec3 vN;void main(){float i=pow(0.6-dot(vN,vec3(0,0,1)),3.0);gl_FragColor=vec4(1,1,1,i*0.12);}`,
      blending:THREE.AdditiveBlending, side:THREE.BackSide, transparent:true,
    });
    group.add(new THREE.Mesh(new THREE.SphereGeometry(1.12,64,64),atmosMat));

    // Interaction
    let isDragging=false, prev={x:0,y:0}, vel={x:0,y:0}, target={x:0.2,y:0};
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const el = renderer.domElement;

    const onDown=(e)=>{isDragging=true;const cx=e.clientX||e.touches?.[0]?.clientX||0,cy=e.clientY||e.touches?.[0]?.clientY||0;prev={x:cx,y:cy};vel={x:0,y:0};dragStart={x:cx,y:cy};};
    const onMove=(e)=>{if(!isDragging)return;const x=e.clientX||e.touches?.[0]?.clientX||0,y=e.clientY||e.touches?.[0]?.clientY||0;vel.x=(y-prev.y)*0.003;vel.y=(x-prev.x)*0.003;target.x+=vel.x;target.y+=vel.y;prev={x,y};};
    const onUp=()=>{isDragging=false;};
    let dragStart={x:0,y:0};

    const onClick = (e) => {
      // Only fire click if user didn't drag far (< 8px)
      const dx = e.clientX - dragStart.x, dy = e.clientY - dragStart.y;
      if (Math.sqrt(dx*dx + dy*dy) > 8) return;

      const rect = el.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left)/rect.width)*2-1;
      mouse.y = -((e.clientY - rect.top)/rect.height)*2+1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(group.children, false);
      for (const hit of intersects) {
        if (hit.object.userData?.continentKey) {
          onContinentClick(hit.object.userData.continentKey);
          return;
        }
      }
    };

    el.addEventListener("mousedown",onDown);el.addEventListener("mousemove",onMove);el.addEventListener("mouseup",onUp);el.addEventListener("mouseleave",onUp);
    el.addEventListener("touchstart",onDown,{passive:true});el.addEventListener("touchmove",onMove,{passive:true});el.addEventListener("touchend",onUp);
    el.addEventListener("click", onClick);

    let time = 0;
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      time += 0.02;
      if(!isDragging){target.y+=0.001;vel.x*=0.95;vel.y*=0.95;target.x+=vel.x;target.y+=vel.y;}
      target.x=Math.max(-1.2,Math.min(1.2,target.x));
      group.rotation.x+=(target.x-group.rotation.x)*0.05;
      group.rotation.y+=(target.y-group.rotation.y)*0.05;
      // Pulse hotspots
      hotspotMeshes.forEach((h, i) => {
        const pulse = Math.sin(time + i * 1.2) * 0.5 + 0.5;
        if (h.outer.material) h.outer.material.opacity = 0.12 + pulse * 0.2;
        if (h.core.material) {
          const s = 1 + pulse * 0.15;
          h.core.scale.set(s, s, s);
        }
      });
      renderer.render(scene,camera);
    };
    animate();

    const handleResize=()=>{const w=container.clientWidth,h=container.clientHeight;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h);};
    window.addEventListener("resize",handleResize);

    return ()=>{cancelAnimationFrame(frameRef.current);window.removeEventListener("resize",handleResize);el.removeEventListener("click",onClick);el.removeEventListener("mousedown",onDown);el.removeEventListener("mousemove",onMove);el.removeEventListener("mouseup",onUp);el.removeEventListener("mouseleave",onUp);el.removeEventListener("touchstart",onDown);el.removeEventListener("touchmove",onMove);el.removeEventListener("touchend",onUp);container.removeChild(renderer.domElement);renderer.dispose();};
  }, [activeContinent, onContinentClick]);

  return <div ref={mountRef} style={{width:"100%",height:"100%",cursor:"grab"}} onMouseDown={e=>e.currentTarget.style.cursor="grabbing"} onMouseUp={e=>e.currentTarget.style.cursor="grab"} />;
}

/* ═══════════════════════════════════════════
   CONTINENT PANEL — The Rich Detail View
   ═══════════════════════════════════════════ */
function CountryCard({ country, isExpanded, onToggle }) {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <div style={{ marginBottom:8, border:"1px solid rgba(255,255,255,0.06)", borderRadius:12, overflow:"hidden", background: isExpanded ? "rgba(255,255,255,0.03)" : "transparent", transition:"all 0.3s" }}>
      <button onClick={onToggle} style={{ width:"100%", padding:"16px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", background:"none", border:"none", cursor:"pointer", color:"#fff" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <span style={{ fontFamily:"'SF Mono',monospace", fontSize:10, color:"rgba(255,255,255,0.3)", background:"rgba(255,255,255,0.05)", padding:"3px 7px", borderRadius:3 }}>{country.flag}</span>
          <span style={{ fontFamily:"'Inter',sans-serif", fontSize:14, fontWeight:500 }}>{country.name}</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <span style={{ fontFamily:"'SF Mono',monospace", fontSize:10, color:"rgba(255,255,255,0.35)", padding:"3px 8px", background:"rgba(255,255,255,0.04)", borderRadius:4, border:"1px solid rgba(255,255,255,0.06)" }}>{country.status}</span>
          <span style={{ fontFamily:"'Inter',sans-serif", fontSize:14, color:"rgba(255,255,255,0.3)", transform: isExpanded ? "rotate(180deg)" : "rotate(0)", transition:"transform 0.3s" }}>▾</span>
        </div>
      </button>

      {isExpanded && (
        <div style={{ padding:"0 20px 20px", animation:"fadeIn 0.3s ease" }}>
          {/* Metrics grid */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:16 }}>
            {country.metrics.map((m,i) => (
              <div key={i} style={{ padding:"10px 12px", background:"rgba(255,255,255,0.02)", borderRadius:8, border:"1px solid rgba(255,255,255,0.04)" }}>
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:10, color:"rgba(255,255,255,0.3)", letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:4 }}>{m.k}</div>
                <div style={{ fontFamily:"'SF Mono',monospace", fontSize:13, color:"#fff", fontWeight:500 }}>{m.v}</div>
              </div>
            ))}
          </div>

          {/* Projects */}
          {country.projects?.map((proj, i) => (
            <div key={i} style={{ marginBottom:6 }}>
              <button onClick={() => setActiveProject(activeProject === i ? null : i)} style={{ width:"100%", padding:"12px 14px", display:"flex", alignItems:"center", justifyContent:"space-between", background: activeProject===i ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.015)", border:"1px solid rgba(255,255,255,0.05)", borderRadius:8, cursor:"pointer", color:"#fff", transition:"all 0.2s" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:6, height:6, borderRadius:"50%", background: proj.stage.includes("Active") || proj.stage.includes("Operational") ? "rgba(255,255,255,0.6)" : proj.stage.includes("Risk") || proj.stage.includes("Crisis") ? "rgba(255,100,100,0.6)" : "rgba(255,255,255,0.25)" }} />
                  <span style={{ fontFamily:"'Inter',sans-serif", fontSize:12, fontWeight:400 }}>{proj.name}</span>
                </div>
                <span style={{ fontFamily:"'SF Mono',monospace", fontSize:9, color:"rgba(255,255,255,0.3)", letterSpacing:"0.04em" }}>{proj.stage}</span>
              </button>
              {activeProject === i && (
                <div style={{ padding:"12px 14px", marginTop:2, background:"rgba(255,255,255,0.02)", borderRadius:8, border:"1px solid rgba(255,255,255,0.04)" }}>
                  <p style={{ fontFamily:"'Inter',sans-serif", fontSize:12, fontWeight:300, color:"rgba(255,255,255,0.45)", lineHeight:1.7, margin:0 }}>{proj.detail}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ContinentPanel({ continentKey, onClose }) {
  const c = CONTINENTS[continentKey];
  const [expandedCountry, setExpandedCountry] = useState(null);
  if (!c) return null;

  return (
    <div style={{ position:"fixed", top:0, right:0, bottom:0, width:"min(520px, 90vw)", zIndex:200, background:"rgba(8,8,12,0.95)", backdropFilter:"blur(40px) saturate(1.5)", borderLeft:"1px solid rgba(255,255,255,0.06)", overflowY:"auto", animation:"slideIn 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
      <style>{`
        @keyframes slideIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      {/* Header */}
      <div style={{ padding:"28px 28px 0", position:"sticky", top:0, background:"rgba(8,8,12,0.95)", backdropFilter:"blur(40px)", zIndex:10, borderBottom:"1px solid rgba(255,255,255,0.04)", paddingBottom:24 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:"rgba(255,255,255,0.5)", boxShadow:"0 0 12px rgba(255,255,255,0.15)" }} />
              <span style={{ fontFamily:"'SF Mono',monospace", fontSize:10, color:"rgba(255,255,255,0.35)", letterSpacing:"0.1em", textTransform:"uppercase" }}>{c.countries.length} Markets Tracked</span>
            </div>
            <h2 style={{ fontFamily:"'Instrument Serif',Georgia,serif", fontSize:28, fontWeight:400, color:"#fff", margin:0, lineHeight:1.15 }}>{c.name}</h2>
          </div>
          <button onClick={onClose} style={{ width:32, height:32, borderRadius:8, border:"1px solid rgba(255,255,255,0.1)", background:"rgba(255,255,255,0.03)", color:"rgba(255,255,255,0.5)", cursor:"pointer", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s" }}
            onMouseEnter={e=>{e.target.style.background="rgba(255,255,255,0.08)";e.target.style.color="#fff";}}
            onMouseLeave={e=>{e.target.style.background="rgba(255,255,255,0.03)";e.target.style.color="rgba(255,255,255,0.5)";}}
          >×</button>
        </div>
        <p style={{ fontFamily:"'Instrument Serif',Georgia,serif", fontSize:18, fontWeight:400, color:"rgba(255,255,255,0.7)", margin:"0 0 8px 0", lineHeight:1.3, fontStyle:"italic" }}>{c.headline}</p>
        <p style={{ fontFamily:"'SF Mono',monospace", fontSize:11, color:"rgba(255,255,255,0.25)", margin:0, lineHeight:1.6 }}>{c.subtitle}</p>
      </div>

      {/* Stats */}
      <div style={{ padding:"20px 28px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
        {c.stats.map((s,i) => (
          <div key={i} style={{ padding:"16px", background:"rgba(255,255,255,0.02)", borderRadius:10, border:"1px solid rgba(255,255,255,0.05)", animation:`fadeIn 0.4s ease ${i*0.08}s both` }}>
            <div style={{ fontFamily:"'Inter',sans-serif", fontSize:10, color:"rgba(255,255,255,0.3)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:6 }}>{s.label}</div>
            <div style={{ fontFamily:"'Instrument Serif',Georgia,serif", fontSize:22, color:"#fff", marginBottom:4 }}>{s.value}</div>
            <div style={{ fontFamily:"'SF Mono',monospace", fontSize:10, color:"rgba(255,255,255,0.25)" }}>{s.delta}</div>
          </div>
        ))}
      </div>

      {/* Thesis */}
      <div style={{ padding:"0 28px 20px" }}>
        <div style={{ padding:"20px", background:"rgba(255,255,255,0.015)", borderRadius:10, border:"1px solid rgba(255,255,255,0.04)", position:"relative" }}>
          <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:"linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} />
          <div style={{ fontFamily:"'SF Mono',monospace", fontSize:10, color:"rgba(255,255,255,0.25)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:10 }}>Tatari Institute Thesis</div>
          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:13, fontWeight:300, color:"rgba(255,255,255,0.5)", lineHeight:1.75, margin:0 }}>{c.thesis}</p>
        </div>
      </div>

      {/* Countries */}
      <div style={{ padding:"0 28px 32px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
          <span style={{ fontFamily:"'SF Mono',monospace", fontSize:10, color:"rgba(255,255,255,0.2)" }}>02</span>
          <div style={{ height:1, width:24, background:"rgba(255,255,255,0.08)" }} />
          <span style={{ fontFamily:"'Inter',sans-serif", fontSize:11, fontWeight:500, color:"rgba(255,255,255,0.35)", letterSpacing:"0.12em", textTransform:"uppercase" }}>Market Intelligence</span>
        </div>
        {c.countries.map((country, i) => (
          <CountryCard key={i} country={country} isExpanded={expandedCountry===i} onToggle={()=>setExpandedCountry(expandedCountry===i?null:i)} />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   CONTINENT SELECTOR BAR
   ═══════════════════════════════════════════ */
function ContinentBar({ active, onSelect }) {
  return (
    <div style={{ display:"flex", gap:6, flexWrap:"wrap", justifyContent:"center" }}>
      {Object.entries(CONTINENTS).map(([key, c]) => (
        <button key={key} onClick={() => onSelect(active===key?null:key)} style={{
          fontFamily:"'Inter',sans-serif", fontSize:11, fontWeight: active===key ? 500 : 300,
          color: active===key ? "#fff" : "rgba(255,255,255,0.35)",
          background: active===key ? "rgba(255,255,255,0.08)" : "transparent",
          border: `1px solid ${active===key ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.05)"}`,
          padding:"8px 16px", borderRadius:8, cursor:"pointer", transition:"all 0.3s",
        }}>{c.name}</button>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   BACKGROUND & UTILITIES
   ═══════════════════════════════════════════ */
function OrbBackground(){return(
  <div style={{position:"fixed",inset:0,zIndex:0,overflow:"hidden",pointerEvents:"none"}}>
    <style>{`@keyframes orbF1{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(60px,-40px) scale(1.1)}66%{transform:translate(-30px,30px) scale(.95)}}@keyframes orbF2{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-50px,50px) scale(1.08)}}@keyframes gridP{0%,100%{opacity:.018}50%{opacity:.045}}@keyframes particleD{0%{transform:translateY(0);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translateY(-100vh);opacity:0}}`}</style>
    <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",backgroundSize:"80px 80px",animation:"gridP 8s ease-in-out infinite"}} />
    <div style={{position:"absolute",top:"8%",right:"15%",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,255,255,0.04) 0%,transparent 70%)",animation:"orbF1 20s ease-in-out infinite",filter:"blur(60px)"}} />
    <div style={{position:"absolute",bottom:"10%",left:"5%",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,255,255,0.03) 0%,transparent 70%)",animation:"orbF2 25s ease-in-out infinite",filter:"blur(50px)"}} />
    {Array.from({length:12}).map((_,i)=><div key={i} style={{position:"absolute",left:`${5+(i*37)%90}%`,bottom:`-${(i*13)%10}%`,width:1+(i%3),height:1+(i%3),borderRadius:"50%",background:`rgba(255,255,255,${0.06+(i%5)*0.04})`,animation:`particleD ${16+(i%8)*2}s linear infinite`,animationDelay:`${(i*3)%20}s`}} />)}
  </div>
);}

function CursorGlow(){const ref=useRef(null);useEffect(()=>{const m=(e)=>{if(ref.current){ref.current.style.left=e.clientX+"px";ref.current.style.top=e.clientY+"px";}};window.addEventListener("mousemove",m);return()=>window.removeEventListener("mousemove",m);},[]);return <div ref={ref} style={{position:"fixed",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,255,255,0.03) 0%,transparent 70%)",transform:"translate(-50%,-50%)",pointerEvents:"none",zIndex:1,transition:"left 0.3s cubic-bezier(0.16,1,0.3,1),top 0.3s cubic-bezier(0.16,1,0.3,1)"}} />;}

function useInView(t=0.12){const ref=useRef(null);const[v,setV]=useState(false);useEffect(()=>{const el=ref.current;if(!el)return;const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setV(true);obs.disconnect();}},{threshold:t});obs.observe(el);return()=>obs.disconnect();},[t]);return[ref,v];}

/* ═══════════════════════════════════════════
   NAV & HERO
   ═══════════════════════════════════════════ */
function NavBar({scrolled}){return(
  <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:scrolled?"14px 48px":"28px 48px",display:"flex",justifyContent:"space-between",alignItems:"center",background:scrolled?"rgba(0,0,0,0.85)":"transparent",backdropFilter:scrolled?"blur(30px) saturate(1.4)":"none",borderBottom:scrolled?"1px solid rgba(255,255,255,0.06)":"none",transition:"all 0.5s cubic-bezier(0.16,1,0.3,1)"}}>
    <div style={{display:"flex",alignItems:"center",gap:14}}>
      <div style={{width:32,height:32,border:"1.5px solid rgba(255,255,255,0.7)",borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center"}}>
        <span style={{fontFamily:"'Instrument Serif',Georgia,serif",fontWeight:400,fontSize:18,color:"#fff"}}>T</span>
      </div>
      <span style={{fontFamily:"'Inter',-apple-system,sans-serif",fontWeight:500,fontSize:14,color:"rgba(255,255,255,0.9)",letterSpacing:"0.08em",textTransform:"uppercase"}}>Tatari Institute</span>
    </div>
    <div style={{display:"flex",gap:36,alignItems:"center"}}>
      {["Research","About","Contact"].map(item=>(<a key={item} href={`#${item.toLowerCase()}`} style={{fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:400,color:"rgba(255,255,255,0.4)",textDecoration:"none",letterSpacing:"0.08em",textTransform:"uppercase",transition:"color 0.3s"}} onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.4)"}>{item}</a>))}
    </div>
  </nav>
);}

function Hero({visible, activeContinent, onContinentClick}) {
  const words=["infrastructure","intelligence","sovereignty"];
  const[wi,setWi]=useState(0);const[ci,setCi]=useState(0);const[del,setDel]=useState(false);
  useEffect(()=>{const w=words[wi];const t=setTimeout(()=>{if(!del){if(ci<w.length)setCi(ci+1);else setTimeout(()=>setDel(true),2000);}else{if(ci>0)setCi(ci-1);else{setDel(false);setWi((wi+1)%words.length);}}},del?40:80);return()=>clearTimeout(t);},[ci,del,wi]);

  return(
    <section style={{minHeight:"100vh",display:"flex",flexDirection:"column",padding:"120px 48px 40px",position:"relative",zIndex:2}}>
      <style>{`@keyframes cursorBlink{0%,100%{opacity:1}50%{opacity:0}}@keyframes lineExpand{from{width:0}to{width:80px}}@keyframes fadeSlideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}@keyframes globeFadeIn{from{opacity:0;transform:scale(0.9)}to{opacity:1;transform:scale(1)}}`}</style>

      {/* Top row: text + globe */}
      <div style={{display:"flex",alignItems:"center",flex:1,gap:20}}>
        <div style={{flex:"0 0 40%",opacity:visible?1:0,transform:visible?"translateY(0)":"translateY(50px)",transition:"all 1.2s cubic-bezier(0.16,1,0.3,1)"}}>
          <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:36,animation:visible?"fadeSlideUp 0.8s ease forwards":"none",animationDelay:"0.2s",opacity:0}}>
            <div style={{height:1,width:80,background:"rgba(255,255,255,0.2)",animation:visible?"lineExpand 0.8s ease forwards":"none",animationDelay:"0.4s"}} />
            <span style={{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:400,color:"rgba(255,255,255,0.35)",letterSpacing:"0.2em",textTransform:"uppercase"}}>Est. 2025 &middot; Tatari LLC</span>
          </div>
          <h1 style={{fontFamily:"'Instrument Serif',Georgia,'Times New Roman',serif",fontSize:"clamp(32px,4vw,60px)",fontWeight:400,color:"#fff",lineHeight:1.05,margin:0,marginBottom:10,letterSpacing:"-0.02em",animation:visible?"fadeSlideUp 1s ease forwards":"none",animationDelay:"0.3s",opacity:0}}>
            Research at the<br/>frontier of AI
          </h1>
          <div style={{fontFamily:"'SF Mono','Fira Code','Consolas',monospace",fontSize:"clamp(14px,1.8vw,24px)",fontWeight:400,color:"rgba(255,255,255,0.5)",height:36,marginBottom:32,animation:visible?"fadeSlideUp 1s ease forwards":"none",animationDelay:"0.5s",opacity:0}}>
            {words[wi].slice(0,ci)}<span style={{animation:"cursorBlink 1s step-end infinite",marginLeft:1,color:"rgba(255,255,255,0.6)"}}>|</span>
          </div>
          <p style={{fontFamily:"'Inter',sans-serif",fontSize:14,fontWeight:300,color:"rgba(255,255,255,0.35)",lineHeight:1.75,maxWidth:440,margin:0,marginBottom:40,animation:visible?"fadeSlideUp 1s ease forwards":"none",animationDelay:"0.6s",opacity:0}}>
            Institutional-grade analysis on sovereign AI systems, compute geopolitics,
            and digital infrastructure economics.
          </p>
          <div style={{display:"flex",gap:40,animation:visible?"fadeSlideUp 1s ease forwards":"none",animationDelay:"0.8s",opacity:0}}>
            {[{num:"5",label:"Publications"},{num:"6",label:"Continents Mapped"},{num:"40+",label:"Jurisdictions"}].map((s,i)=>(
              <div key={i} style={{display:"flex",flexDirection:"column",gap:4}}>
                <span style={{fontFamily:"'Instrument Serif',Georgia,serif",fontSize:24,fontWeight:400,color:"#fff"}}>{s.num}</span>
                <span style={{fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:400,color:"rgba(255,255,255,0.3)",letterSpacing:"0.08em",textTransform:"uppercase"}}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Globe */}
        <div style={{flex:"0 0 60%",height:"min(65vh,560px)",position:"relative",animation:visible?"globeFadeIn 1.5s cubic-bezier(0.16,1,0.3,1) 0.4s forwards":"none",opacity:0}}>
          <InteractiveGlobe onContinentClick={onContinentClick} activeContinent={activeContinent} />
        </div>
      </div>

      {/* Continent selector bar */}
      <div style={{marginTop:20,animation:visible?"fadeSlideUp 0.8s ease 1s forwards":"none",opacity:0}}>
        <div style={{fontFamily:"'SF Mono',monospace",fontSize:10,color:"rgba(255,255,255,0.2)",textAlign:"center",marginBottom:12,letterSpacing:"0.1em",textTransform:"uppercase"}}>Select a region to explore intelligence</div>
        <ContinentBar active={activeContinent} onSelect={onContinentClick} />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   RESEARCH CARDS
   ═══════════════════════════════════════════ */
function FeaturedCard({pub,index,visible}){const[h,setH]=useState(false);return(
  <article onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{flex:"1 1 280px",minWidth:260,padding:32,position:"relative",overflow:"hidden",background:h?"rgba(255,255,255,0.04)":"rgba(255,255,255,0.015)",border:`1px solid ${h?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.05)"}`,borderRadius:16,cursor:"pointer",transition:"all 0.5s cubic-bezier(0.16,1,0.3,1)",transform:visible?(h?"translateY(-4px)":"translateY(0)"):"translateY(40px)",opacity:visible?1:0,transitionDelay:`${index*180}ms`}}>
    <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:h?"linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)":"transparent",transition:"all 0.5s"}} />
    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}>
      <span style={{fontFamily:"'SF Mono',monospace",fontSize:9,fontWeight:500,color:"rgba(255,255,255,0.7)",background:"rgba(255,255,255,0.06)",padding:"4px 10px",borderRadius:4,letterSpacing:"0.04em",textTransform:"uppercase",border:"1px solid rgba(255,255,255,0.06)"}}>{pub.tag}</span>
    </div>
    <h3 style={{fontFamily:"'Instrument Serif',Georgia,serif",fontSize:18,fontWeight:400,color:"#fff",lineHeight:1.35,margin:"0 0 12px 0"}}>{pub.title}</h3>
    {pub.authors!=="Tatari Institute"&&<p style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:"rgba(255,255,255,0.35)",margin:"0 0 8px 0"}}>By {pub.authors}</p>}
    <p style={{fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:300,color:"rgba(255,255,255,0.3)",lineHeight:1.65,margin:"0 0 20px 0"}}>{pub.abstract.slice(0,150)}...</p>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <span style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:"rgba(255,255,255,0.2)"}}>{pub.date}</span>
      <span style={{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:500,color:h?"#fff":"rgba(255,255,255,0.35)",transition:"all 0.3s",display:"flex",alignItems:"center",gap:6}}>Read <span style={{display:"inline-block",transform:h?"translateX(4px)":"translateX(0)",transition:"transform 0.3s"}}>→</span></span>
    </div>
  </article>
);}

function PubRow({pub,index,visible}){const[h,setH]=useState(false);return(
  <article onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{padding:"24px 20px",borderBottom:"1px solid rgba(255,255,255,0.04)",cursor:"pointer",display:"flex",alignItems:"flex-start",gap:20,background:h?"rgba(255,255,255,0.02)":"transparent",borderRadius:h?8:0,transition:"all 0.4s cubic-bezier(0.16,1,0.3,1)",opacity:visible?1:0,transform:visible?"translateY(0)":"translateY(24px)",transitionDelay:`${index*80}ms`}}>
    <span style={{fontFamily:"'SF Mono',monospace",fontSize:11,color:"rgba(255,255,255,0.15)",paddingTop:2,minWidth:24}}>0{pub.id}</span>
    <div style={{flex:1}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
        <span style={{fontFamily:"'SF Mono',monospace",fontSize:9,fontWeight:500,color:"rgba(255,255,255,0.5)",background:"rgba(255,255,255,0.04)",padding:"3px 8px",borderRadius:3,letterSpacing:"0.06em",textTransform:"uppercase"}}>{pub.tag}</span>
      </div>
      <h4 style={{fontFamily:"'Instrument Serif',Georgia,serif",fontSize:16,fontWeight:400,color:h?"#fff":"rgba(255,255,255,0.75)",margin:"0 0 4px 0",transition:"color 0.3s",lineHeight:1.4}}>{pub.title}</h4>
      {pub.authors!=="Tatari Institute"&&<p style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:"rgba(255,255,255,0.3)",margin:"0 0 4px 0"}}>By {pub.authors}</p>}
      <p style={{fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:300,color:"rgba(255,255,255,0.28)",margin:0,lineHeight:1.6,maxWidth:600}}>{pub.abstract.slice(0,120)}...</p>
    </div>
    <span style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:"rgba(255,255,255,0.18)",whiteSpace:"nowrap",paddingTop:24}}>{pub.date}</span>
  </article>
);}

/* ═══════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════ */
export default function TatariInstitute() {
  const[scrolled,setScrolled]=useState(false);
  const[heroVisible,setHeroVisible]=useState(false);
  const[activeContinent,setActiveContinent]=useState(null);
  const[activeCategory,setActiveCategory]=useState("All");
  const[featuredRef,featuredVisible]=useInView(0.08);
  const[archiveRef,archiveVisible]=useInView(0.08);
  const[footerRef,footerVisible]=useInView(0.08);

  useEffect(()=>{setTimeout(()=>setHeroVisible(true),150);},[]);
  useEffect(()=>{const h=()=>setScrolled(window.scrollY>50);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h);},[]);

  const handleContinentClick = useCallback((key) => {
    setActiveContinent(prev => prev === key ? null : key);
  }, []);

  const featured=PUBLICATIONS.filter(p=>p.featured);
  const archive=PUBLICATIONS.filter(p=>{if(activeCategory==="All")return!p.featured;return!p.featured&&p.category===activeCategory;});

  return(
    <div style={{minHeight:"100vh",background:"#000",color:"#fff",position:"relative"}}>
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <OrbBackground />
      <CursorGlow />
      <div style={{position:"fixed",inset:0,zIndex:999,pointerEvents:"none",opacity:0.4,background:`url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E")`}} />

      <NavBar scrolled={scrolled} />
      <Hero visible={heroVisible} activeContinent={activeContinent} onContinentClick={handleContinentClick} />

      {/* Continent panel overlay */}
      {activeContinent && <ContinentPanel continentKey={activeContinent} onClose={()=>setActiveContinent(null)} />}
      {activeContinent && <div onClick={()=>setActiveContinent(null)} style={{position:"fixed",inset:0,zIndex:199,background:"rgba(0,0,0,0.4)",backdropFilter:"blur(4px)"}} />}

      <div style={{padding:"0 48px",zIndex:2,position:"relative"}}><div style={{height:1,background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)"}} /></div>

      <section id="research" ref={featuredRef} style={{padding:"80px 48px",position:"relative",zIndex:2}}>
        <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:44,opacity:featuredVisible?1:0,transform:featuredVisible?"translateY(0)":"translateY(20px)",transition:"all 0.7s cubic-bezier(0.16,1,0.3,1)"}}>
          <span style={{fontFamily:"'SF Mono',monospace",fontSize:11,color:"rgba(255,255,255,0.2)",letterSpacing:"0.04em"}}>01</span>
          <div style={{height:1,width:40,background:"rgba(255,255,255,0.1)"}} />
          <h2 style={{fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:500,color:"rgba(255,255,255,0.4)",letterSpacing:"0.16em",textTransform:"uppercase",margin:0}}>Featured Research</h2>
        </div>
        <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>{featured.map((p,i)=><FeaturedCard key={p.id} pub={p} index={i} visible={featuredVisible} />)}</div>
      </section>

      <section ref={archiveRef} style={{padding:"20px 48px 100px",position:"relative",zIndex:2}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:32,flexWrap:"wrap",gap:16,opacity:archiveVisible?1:0,transform:archiveVisible?"translateY(0)":"translateY(20px)",transition:"all 0.7s cubic-bezier(0.16,1,0.3,1)"}}>
          <div style={{display:"flex",alignItems:"center",gap:16}}>
            <span style={{fontFamily:"'SF Mono',monospace",fontSize:11,color:"rgba(255,255,255,0.2)",letterSpacing:"0.04em"}}>02</span>
            <div style={{height:1,width:40,background:"rgba(255,255,255,0.1)"}} />
            <h2 style={{fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:500,color:"rgba(255,255,255,0.4)",letterSpacing:"0.16em",textTransform:"uppercase",margin:0}}>All Publications</h2>
          </div>
          <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
            {CATEGORIES.map(cat=>(<button key={cat} onClick={()=>setActiveCategory(cat)} style={{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:activeCategory===cat?500:300,color:activeCategory===cat?"#fff":"rgba(255,255,255,0.3)",background:activeCategory===cat?"rgba(255,255,255,0.08)":"transparent",border:`1px solid ${activeCategory===cat?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.05)"}`,padding:"6px 14px",borderRadius:6,cursor:"pointer",transition:"all 0.3s"}}>{cat}</button>))}
          </div>
        </div>
        <div>{archive.map((p,i)=><PubRow key={p.id} pub={p} index={i} visible={archiveVisible} />)}{archive.length===0&&<p style={{fontFamily:"'Inter',sans-serif",fontSize:14,color:"rgba(255,255,255,0.2)",textAlign:"center",padding:"60px 0"}}>No publications in this category.</p>}</div>
      </section>

      <footer id="contact" ref={footerRef} style={{padding:"64px 48px",borderTop:"1px solid rgba(255,255,255,0.04)",position:"relative",zIndex:2,opacity:footerVisible?1:0,transform:footerVisible?"translateY(0)":"translateY(20px)",transition:"all 0.8s cubic-bezier(0.16,1,0.3,1)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:48}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:18}}>
              <div style={{width:28,height:28,border:"1.5px solid rgba(255,255,255,0.5)",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontFamily:"'Instrument Serif',Georgia,serif",fontSize:15,color:"#fff"}}>T</span></div>
              <span style={{fontFamily:"'Inter',sans-serif",fontWeight:500,fontSize:13,letterSpacing:"0.08em",textTransform:"uppercase",color:"rgba(255,255,255,0.8)"}}>Tatari Institute</span>
            </div>
            <p style={{fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:300,color:"rgba(255,255,255,0.25)",lineHeight:1.7,maxWidth:380,margin:0}}>A research division of Tatari LLC producing institutional-grade analysis on AI infrastructure, sovereign compute, and digital asset economics.</p>
          </div>
          <div style={{display:"flex",gap:64,flexWrap:"wrap"}}>
            <div>
              <h4 style={{fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:500,color:"rgba(255,255,255,0.25)",letterSpacing:"0.14em",textTransform:"uppercase",margin:"0 0 16px 0"}}>Research Areas</h4>
              {["Sovereign AI","Geopolitical Risk","Energy & Compute","Defense & Compute"].map(a=>(<p key={a} style={{fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:300,color:"rgba(255,255,255,0.35)",margin:"0 0 8px 0"}}>{a}</p>))}
            </div>
            <div>
              <h4 style={{fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:500,color:"rgba(255,255,255,0.25)",letterSpacing:"0.14em",textTransform:"uppercase",margin:"0 0 16px 0"}}>Contact</h4>
              <p style={{fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:300,color:"rgba(255,255,255,0.35)",margin:"0 0 8px 0"}}>research@tatari.institute</p>
              <p style={{fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:300,color:"rgba(255,255,255,0.35)",margin:0}}>tatari.institute</p>
            </div>
          </div>
        </div>
        <div style={{marginTop:48,paddingTop:28,borderTop:"1px solid rgba(255,255,255,0.03)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:300,color:"rgba(255,255,255,0.15)"}}>© 2026 Tatari LLC. All rights reserved.</span>
          <span style={{fontFamily:"'SF Mono',monospace",fontSize:10,color:"rgba(255,255,255,0.1)",letterSpacing:"0.06em"}}>BOS &middot; DFW &middot; ADD</span>
        </div>
      </footer>
    </div>
  );
}
