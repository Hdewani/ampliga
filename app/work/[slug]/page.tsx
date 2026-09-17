import type { Metadata } from 'next';
import type React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProjectPageTransition from '@/components/ProjectPageTransition';
import StartProjectDrawer from '@/components/StartProjectDrawer';
import { notFound } from 'next/navigation';
import '../../site.css';
import './case-study.css';

type Study = {
  slug:string; title:string; summary:string; image:string; services:string[];
  facts?:{label:string;value:string}[];
  sections:{title:string;body:string}[];
};

const studies:Study[]=[
  {slug:'tradeghar',title:'Tradeghar',summary:'An AI-powered real-estate platform that turns scattered enquiries and unverified listings into one pipeline of verified requirements and smart property matches.',image:'/projects/tradeghar-ai-real-estate.png',services:['AI Matching','Product Design','Data Systems','Lead Pipeline'],sections:[
    {title:'Overview',body:'Tradeghar is a real-estate platform built to take the noise out of property discovery. It pulls every buyer, seller, tenant and owner requirement into a single pipeline and uses AI to match each one to verified listings — so agents work from one trustworthy source instead of chasing leads across WhatsApp, spreadsheets and phone calls, and buyers only ever see homes that actually fit their brief.'},
    {title:'The challenge',body:'Enquiries reached Tradeghar through disconnected channels, and the details behind each one lived in separate chats, sheets and people’s heads. Every new requirement meant re-reading and re-typing the same information by hand — which slowed responses, caused missed follow-ups and left management with no real view of the pipeline. For buyers, a flood of unverified and duplicate listings made property discovery slow and hard to trust.'},
    {title:'What we built',body:'● A verified-listing system so every property shown is checked, never duplicated ● Structured requirement intake that captures each enquiry in a consistent format ● An AI matching engine that pairs live requirements with relevant inventory ● A lead pipeline tracking every buyer, seller, tenant and owner in one place ● An operations dashboard giving management live visibility of demand and activity ● A focused buyer search experience that surfaces only relevant, verified homes'},
    {title:'The impact',body:'Tradeghar now runs on one connected pipeline instead of scattered conversations. Agents spend less time moving information between tools and more time closing, buyers see only verified matches that fit their brief, and management has a live view of demand, inventory and team activity — a foundation built to scale.'}
  ]},
  {slug:'jp-associates',title:'JP Associates',summary:'An enterprise IP-intelligence platform combining continuous registry surveillance, phonetic discovery and real-time portfolio management across 70 lakh+ trademark records.',image:'/projects/jp-associates-trademark-monitoring.png',services:['IP Intelligence','Registry Automation','Similarity Search','Portfolio Platform'],sections:[
    {title:'Overview',body:'JP Associates is a commercial-grade trademark and copyright intelligence platform built for a Gwalior law firm. It continuously collects, structures and monitors more than 70 lakh statutory records, turning fragmented government-registry data into one dependable workspace for discovery, surveillance, deadline management and client reporting.'},
    {title:'The challenge',body:'Official trademark and copyright registries hold critical statutory data, but their infrastructure creates serious operational bottlenecks for IP law firms and brand owners.\n● Hostile and fragile registries: Dynamic session tokens, aggressive IP rate limiting and complex captchas prevent standard programmatic queries and native bulk synchronization.\n● Flawed keyword-only queries: Basic searches miss deceptive infringement tactics such as sound-alike spellings, partial-string clones and visual typos across Nice classification codes.\n● Strict statutory opposition windows: Once an application is gazetted, attorneys typically have only three to four months to file a formal opposition. Manually tracking publications across 45 classes risks missed deadlines and irreversible brand dilution.\n● Fragmented portfolio management: Legal teams manage client portfolios across disconnected spreadsheets without centralized docketing, dynamic milestone tracking or rapid reporting.'},
    {title:'Our solution',body:'We designed one unified platform that combines continuous background ingestion, phonetic and fuzzy discovery, and an interactive real-time portfolio dashboard.\n● Autonomous 24/7 ingestion engine: A persistent crawler network polls TM and TMC registries around the clock, handles changing portal sessions and indexes newly filed applications and status transitions.\n● Live delta sync and visual updates: Incoming registry snapshots are compared with stored records. Legal movements—including Objected, Marked for Exam, Advertised and Awaiting Hearing—update dashboard badges and stage timelines through WebSockets.\n● Phonetic and fuzzy trademark watch: Elasticsearch similarity scoring detects sound-alikes, typographical variants and visual brand clones as they are published.\n● Multi-tenant portfolio workspace: Legal teams can segment thousands of marks by client, automate statutory deadline calendars and generate bulk PDF and Excel exports.'},
    {title:'Tools used',body:'● Scraping and automation pipeline: Python, Playwright for headless browser automation and session handling, Beautiful Soup for DOM extraction and normalization, OCR/captcha-processing services and rotating proxy management.\n● Backend architecture and APIs: Node.js REST services, asynchronous job scheduling and delta-evaluation pipelines.\n● Real-time streaming: WebSockets and Socket.io push status transitions, notification toasts and timeline changes directly to active dashboards.\n● Search and similarity engine: Elasticsearch with Double Metaphone phonetic analyzers, Levenshtein edit distance and Edge N-grams.\n● Database and persistence: MongoDB document schemas store statutory filings, status histories, class descriptors, multi-tenant portfolios and audit logs.\n● Frontend platform: React.js powers responsive data grids, stage visualizers, live-status badges and multi-parameter filters.'},
    {title:'Results achieved',body:'● Full-funnel automation: Discovery, continuous ingestion, status-change detection and portfolio reporting now operate in one platform, eliminating manual spreadsheet docketing.\n● Real-time visual state updates: Official registry changes appear in seconds through WebSockets without requiring a page reload.\n● Protection of opposition deadlines: Continuous surveillance alerts attorneys to conflicting and phonetically similar applications as they are gazetted.\n● Sub-100ms indexed search: Trademark discovery and similarity checks across the multi-million-record dataset return nearly instantly instead of inheriting government-portal latency.\n● 95% reduction in administrative overhead: Automated journal monitoring, client grouping, conflict identification and formatted reporting save dozens of legal-team hours each week.'}
  ]},
  {slug:'sarox',title:'Sarox',summary:'USB-connected electrical-test automation that captures Megger and multimeter readings, plots results and produces client-ready technical reports.',image:'/projects/sarox-testing-dashboard.png',services:['Test Automation','Device Integration','Technical Reporting','Data Visualisation'],sections:[
    {title:'Overview',body:'Sarox is an electrical testing and reporting platform for teams that inspect motors, generators and stator windings using instruments such as insulation-resistance testers (commonly called Meggers) and digital multimeters. The instrument connects to a laptop through USB, allowing the software to capture readings directly, visualise the response during the test and turn the completed sequence into a structured client report.'},
    {title:'The challenge',body:'The original process was entirely manual. A technician had to watch the instrument continuously, record every reading at the correct interval, place the values into fixed tables and repeat the same work for each phase, frequency and test type. The team then calculated results, recreated graphs and assembled separate PDF and Excel reports. Tests such as insulation resistance, Polarisation Index (PI), Dielectric Absorption Ratio (DAR), ramp voltage and Step Voltage (SV) generated many time-based readings. Motor and stator programs could also require repeated phase-to-ground, phase-to-phase and configured winding checks. Manual transcription made the process slow and introduced missed samples, calculation errors and inconsistent reports.'},
    {title:'What we automated',body:'● Direct USB communication between the Megger or multimeter and the laptop ● One-click test initiation from the software instead of continuous manual monitoring ● Automatic capture and time-stamping of every instrument reading ● Automated voltage or frequency changes for configured test sequences ● Live graphs that show resistance, leakage-current and test progression as values arrive ● Built-in calculations and threshold checks for PI, DAR and related diagnostic results ● Clear test and machine status indicators so reviewers can identify acceptable or problematic results ● A reusable record containing client, site, asset, instrument and operator information'},
    {title:'Client-ready reporting',body:'Once a test is complete, the same captured dataset flows directly into a professional report. The system combines the client’s information and logo with test settings, readings, calculations, graphs, observations and the final machine status. Teams can review the result once and export consistently formatted PDF and Excel files without copying values between tools or rebuilding the report by hand.'},
    {title:'The impact',body:'Sarox turns a repetitive instrument-to-spreadsheet process into one connected workflow: connect the device, select the test, press start, review the live result and export the report. Technicians no longer have to monitor and transcribe every value, calculations remain consistent across repeated tests, and clients receive clearer reports with complete traceability from the raw reading to the final equipment assessment.'}
  ]},
  {slug:'purely-saatvik',title:'Purely Saatvik',summary:'A premium Ayurveda-inspired wellness identity, packaging system and conversion-focused Shopify experience designed for global growth.',image:'/projects/purely-saatvik-brand-commerce.png',services:['Brand Identity','Packaging Design','Shopify Commerce','Digital Marketing'],facts:[
    {label:'Client',value:'Rocketly'},
    {label:'Service',value:'Branding Identity'},
    {label:'Industry',value:'Technology'},
    {label:'Date',value:'14 October 2021'}
  ],sections:[
    {title:'Client overview',body:'Purely Saatvik is a wellness brand rooted in Ayurveda and sattvic living, targeting health-conscious consumers in the USA. The brand emphasizes seasonal eating, gut-friendly nutrition, and Ayurveda-inspired lifestyle products for people seeking natural and holistic well-being.'},
    {title:'The challenge',body:'Purely Saatvik brought a well-researched concept and a deep understanding of its market, but the early-stage brand needed a structured system capable of carrying that vision into the world.\n● The brand’s philosophy required a cohesive identity that could express its values consistently across every channel.\n● Packaging needed to meet international retail and D2C standards while building credibility and trust.\n● The absence of a scalable e-commerce platform limited global reach and customer access.\n● Marketing needed a data-driven framework that could turn audience interest into measurable, long-term growth.'},
    {title:'Our approach',body:'## 1. Branding & identity\n● Developed a complete identity system—logo, typography and color palette—aligned with wellness and purity.\n● Created guidelines for consistent use across digital and physical platforms.\n● Positioned Purely Saatvik as a premium Ayurveda-inspired wellness brand for international audiences.\n## 2. Packaging design\n● Designed clean, eco-conscious packaging that communicates authenticity and trust.\n● Used minimalist visuals, sattvic color tones and a clear information hierarchy for shelf appeal and online credibility.\n## 3. E-commerce store setup\n● Built a mobile-first Shopify store optimized for conversion.\n● Integrated global payments, subscriptions and cart-recovery systems.\n● Created a seamless navigation and checkout experience.\n## 4. Online marketing & lead generation\n● Launched performance-led Meta and Google campaigns to build awareness and qualified traffic.\n● Developed blogs, reels and newsletters around sattvic living.\n● Integrated CRM and WhatsApp automation for engagement and retention.'},
    {title:'Results',body:'The collaboration translated Purely Saatvik’s vision into a strong, scalable digital presence aligned with its values and market ambitions.\n● Brand perception: A clearly defined identity positioned Purely Saatvik as a trusted wellness brand with global appeal.\n● Packaging impact: Refined packaging elevated confidence across retail and online touchpoints.\n● E-commerce growth: A conversion-optimized store simplified customer journeys, supported international transactions and expanded orders across geographies.\n● Marketing ROI: Data-backed campaigns improved lead quality, while automated systems nurtured retention and repeat buyers.'},
    {title:'Conclusion',body:'Through branding, packaging design, e-commerce enablement and digital marketing, the Purely Saatvik concept became a globally scalable wellness brand. The project demonstrates how a holistic digital ecosystem—executed strategically—can drive measurable impact in the competitive D2C wellness space.'}
  ]},
  {slug:'hnm-meta-campaign',title:'HNM Realtors',summary:'A full-funnel Meta campaign that turned commercial real-estate awareness into qualified investor conversations across India.',image:'/projects/hnm-meta-campaign-creative-v2.png',services:['Meta Advertising','Lead Generation','Retargeting','Campaign Strategy'],facts:[
    {label:'Client',value:'HNM Realtors'},
    {label:'Service',value:'Meta Performance Campaign'},
    {label:'Industry',value:'Commercial Real Estate'},
    {label:'Date',value:'14 October 2021'}
  ],sections:[
    {title:'Campaign overview',body:'The campaign was designed to generate qualified leads and sales conversations for commercial real-estate projects. It focused on investors, business owners and high-net-worth individuals across India, moving audiences from first exposure through consideration and into direct sales follow-up.'},
    {title:'Top-of-funnel strategy',body:'Objective: Attract cold audiences and build a large, relevant prospect pool.\n● Used broad and interest-based targeting to discover responsive investor segments.\n● Tested multiple creative directions early to identify the strongest messages.\n● Spent ₹293,269 to deliver 1.16M impressions and reach 648K people.\n● Recorded a ₹252.77 CPM, ₹583.91 CPC and 1,104 campaign results.'},
    {title:'Middle-of-funnel strategy',body:'Objective: Re-engage warm prospects and turn familiarity into intent.\n● Retargeted website visitors and people who had already engaged with campaign content.\n● Used testimonials, project credibility and return-on-investment highlights to reduce hesitation.\n● Spent ₹34,138 to deliver 107K impressions and reach 78K people.\n● Recorded a ₹316.88 CPM, ₹156.72 CPC and 218 campaign results.'},
    {title:'Bottom-of-funnel strategy',body:'Objective: Convert high-intent prospects into sales conversations.\n● Introduced stronger calls to action, urgency and limited-opportunity messaging.\n● Used personalized sales follow-up to move qualified prospects toward a decision.\n● Offline conversions were handled by the sales team, so direct bottom-of-funnel media spend and closed-deal attribution were not tracked.'},
    {title:'Post-purchase opportunity',body:'Objective: Re-engage existing customers and create additional lifetime value.\n● Recommended referral programs for satisfied investors and buyers.\n● Proposed regular investor updates to maintain trust and consideration.\n● Identified cross-selling and low-cost remarketing as opportunities for future campaigns.\nNo post-purchase digital campaigns were recorded during this campaign period.'},
    {title:'Key metrics and results',body:'Total spend: ₹327,407\nTotal results: 1,197\nTotal impressions: 1,276,921\nTotal reach: 727,016\nAssumed conversion rate: 1%\n● At a ₹5,000,000 minimum deal value, projected revenue was ₹59,850,000 with 182.8× ROAS.\n● At a ₹20,000,000 average deal value, projected revenue was ₹239,400,000 with 731.2× ROAS.\n● At a ₹35,000,000 maximum deal value, projected revenue was ₹418,950,000 with 1,279.6× ROAS.\nRevenue and ROAS figures are projections based on the supplied 1% conversion assumption and property-value range, rather than tracked offline sales.'},
    {title:'Challenges and solutions',body:'1. High TOF cost per lead — Iterated campaign creative and reduced spend on non-performing audiences.\n2. Limited offline conversion tracking — Recommended CRM integration and the Meta Offline Conversions API to connect campaign leads with closed sales.\n3. No post-purchase digital activity — Proposed low-cost remarketing, referral and investor-update campaigns.'},
    {title:'Lessons and best practices',body:'The campaign showed that retargeting can become a profit centre when warm audiences receive the right proof at the right time. Creative testing should happen early, offline sales should be connected to campaign reporting, and existing customers should remain part of the growth system.\n● Warm cold leads before asking for a high-value commitment.\n● Rotate campaign creatives before performance declines.\n● Track offline sales to understand true return on ad spend.\n● Use urgency carefully at the decision stage.\n● Remarket to past customers and qualified prospects.'}
  ]}
];

export function generateStaticParams(){return studies.map(({slug})=>({slug}));}
export function generateMetadata({params}:{params:{slug:string}}):Metadata{
  const study=studies.find(item=>item.slug===params.slug);
  if(!study)return {title:'Case study',robots:{index:false,follow:false}};
  const title=`${study.title} — Ampliga case study`;
  const url=`/work/${study.slug}`;
  return {
   title:{absolute:title},
   description:study.summary,
   alternates:{canonical:url},
   openGraph:{title,description:study.summary,url,siteName:'Ampliga',type:'article',images:[{url:`https://www.ampliga.com${study.image}`,width:1254,height:1254,alt:`${study.title} project overview`}]},
   twitter:{card:'summary_large_image',title,description:study.summary,images:[`https://www.ampliga.com${study.image}`]}
  };
}

const editorialLabels=['The Challenge','The Solution','Problems:','Before:','After:','Approach:','Outcome:'];
function StructuredBody({body}:{body:string}){
  let prepared=body;
  editorialLabels.forEach(label=>{prepared=prepared.replaceAll(label,`\n## ${label.replace(/:$/,'')}\n`);});
  prepared=prepared.replace(/\s*●\s*/g,'\n• ').replace(/(?<!#)\s+(?=(?:\d{1,2})\.\s+[A-Z])/g,'\n');
  const lines=prepared.split(/\n+/).map(line=>line.trim()).filter(Boolean);
  const nodes:React.ReactNode[]=[]; let bullets:string[]=[];
  const flush=()=>{if(bullets.length){nodes.push(<ul className="case-rich-list" key={`list-${nodes.length}`}>{bullets.map((item,index)=><li key={index}>{item}</li>)}</ul>);bullets=[];}};
  lines.forEach((line,index)=>{if(line.startsWith('• ')){bullets.push(line.slice(2));return;} flush(); if(line.startsWith('## ')){nodes.push(<h3 key={`heading-${index}`}>{line.slice(3)}</h3>);return;} const step=line.match(/^(\d{1,2})\.\s+(.+)/); if(step){nodes.push(<div className="case-step" key={`step-${index}`}><b>{step[1].padStart(2,'0')}</b><p>{step[2]}</p></div>);return;} nodes.push(<p key={`paragraph-${index}`}>{line}</p>);}); flush();
  return <div className="case-rich-body">{nodes}</div>;
}

export default function WorkCaseStudy({params}:{params:{slug:string}}){
  const study=studies.find(item=>item.slug===params.slug);
  if(!study) notFound();
  const sections=study.sections;
  const current=studies.findIndex(item=>item.slug===study.slug);
  const previous=studies[(current-1+studies.length)%studies.length];
  const next=studies[(current+1)%studies.length];
  const pageUrl=`https://www.ampliga.com/work/${study.slug}`;
  const creativeWorkSchema={
   '@context':'https://schema.org',
   '@type':'CreativeWork',
   '@id':`${pageUrl}#case-study`,
   name:`${study.title} — Ampliga case study`,
   headline:study.title,
   description:study.summary,
   url:pageUrl,
   mainEntityOfPage:pageUrl,
   dateModified:'2026-09-18',
   image:`https://www.ampliga.com${study.image}`,
   keywords:study.services.join(', '),
   creator:{'@id':'https://www.ampliga.com/#organization'},
   publisher:{'@id':'https://www.ampliga.com/#organization'},
   inLanguage:'en'
  };
  const breadcrumbSchema={
   '@context':'https://schema.org',
   '@type':'BreadcrumbList',
   itemListElement:[
    {'@type':'ListItem',position:1,name:'Home',item:'https://www.ampliga.com/'},
    {'@type':'ListItem',position:2,name:'Work',item:'https://www.ampliga.com/#work'},
    {'@type':'ListItem',position:3,name:study.title,item:pageUrl}
   ]
  };
  return <main className="case-page"><ProjectPageTransition/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(creativeWorkSchema)}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbSchema)}}/>
    <header className="case-header"><Link href="/" className="case-logo"><Image src="/ampliga-logo.png" alt="Ampliga" width={58} height={42}/></Link><a href="#contact" className="case-contact" data-start-project>Contact <span>↗</span></a></header>
    <div className="case-layout">
      <aside className="case-sidebar">
        <Link className="case-back" href="/#work">← &nbsp; Back to work</Link>
        <div className="case-identity"><h1>{study.title}</h1><p>{study.summary}</p><ul>{study.services.map(service=><li key={service}>{service}</li>)}</ul>{study.facts&&<dl className="case-facts">{study.facts.map(fact=><div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>}</div>
      </aside>
      <article className="case-content">
        <div className="case-hero"><Image src={study.image} alt={`${study.title} project overview`} fill priority sizes="(max-width: 900px) 100vw, 66vw"/></div>
        <div className="case-document">
          {sections.map((section,index)=><section className="case-section" id={`section-${index}`} key={`${section.title}-${index}`}><span>{String(index+1).padStart(2,'0')}</span><div><h2>{section.title}</h2><StructuredBody body={section.body}/></div></section>)}
        </div>
        <div className="case-study-end-marker"><span>End of case study</span></div>
      </article>
    </div>
    <footer className="case-project-footer">
      <Link className="case-footer-prev" href={`/work/${previous.slug}`} data-project-transition>← Previous project: {previous.title}</Link>
      <Link className="case-footer-next" href={`/work/${next.slug}`} data-project-transition>Next project: {next.title} →</Link>
    </footer>
    <StartProjectDrawer/>
  </main>;
}
