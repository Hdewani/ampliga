import type { Metadata } from 'next';
import type React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProjectPageTransition from '@/components/ProjectPageTransition';
import { notFound } from 'next/navigation';
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
  {slug:'jp-associates',title:'JP Associates',summary:'A trademark-monitoring platform that scrapes and structures 70 lakh+ records into always-current TMC reports for a law firm.',image:'/projects/jp-associates-trademark-monitoring.png',services:['Python Automation','Web Scraping','Data Engineering','Internal Platform'],sections:[
    {title:'Overview',body:'JP Associates is a private trademark-intelligence platform built for a Gwalior law firm. It continuously collects and structures more than 70 lakh trademark records — using Python, Playwright, Beautiful Soup and SQL — and turns them into monitoring reports that are always current, so the firm researches and advises from one reliable source instead of manual public searches.'},
    {title:'The challenge',body:'Trademark work meant repeating the same searches across public registries, comparing records by hand and manually tracking status changes across thousands of applications. It was slow, easy to get wrong and impossible to keep genuinely current — yet the firm’s advice depended on having the latest picture of every mark it monitored.'},
    {title:'What we built',body:'● Automated scrapers (Playwright + Beautiful Soup) that harvest 70 lakh+ trademark records ● A SQL data layer that cleans, structures and de-duplicates every record ● Scheduled monitoring that detects and flags meaningful status changes ● Fast search and filtering to move from a broad query to the records that matter ● Saved matters that keep long-running investigations in one place ● One-click, always-current TMC reports ready for client advice'},
    {title:'The impact',body:'Research that used to take hours now takes minutes, and 70 lakh+ records stay continuously updated in the background. The firm can revisit any matter without repeating a full search, spot meaningful changes as they happen, and advise clients from a current, dependable view of the register.'}
  ]},
  {slug:'sarox',title:'Sarox',summary:'Field-to-report automation for electrical testing teams that cut reporting time by 55%.',image:'/projects/sarox-testing-dashboard.png',services:['Workflow Automation','Reporting','Product Design','Data Systems'],sections:[
    {title:'Overview',body:'Sarox is a field-to-report tool for electrical testing teams. It replaces the repeated manual data entry between site, office and client report with structured on-site capture that flows straight into standardised reports — cutting reporting time by 55% without changing the careful procedures that testing demands.'},
    {title:'The challenge',body:'Every electrical test produced detailed data that was re-typed as it moved from the field to the office to the final client report. The repetition slowed turnaround, introduced inconsistent formatting and missing details, and made past projects hard to revisit once a report was filed.'},
    {title:'What we built',body:'● A mobile-friendly capture flow designed for real on-site conditions ● Standardised, reusable test forms that keep every report consistent ● Office review checkpoints so information is verified before it reaches the client ● One-click generation of clean, consistent client reports ● A searchable archive of past projects and completed reports'},
    {title:'The impact',body:'Reporting is now 55% faster and far more consistent. Field teams capture results once, office staff review submissions instead of re-typing them, and finished reports follow the same trusted structure every time — with full project history a search away when a client returns.'}
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
  return {title:study?`${study.title} — Ampliga case study`:'Case study — Ampliga',description:study?.summary};
}

const editorialLabels=['The Challenge','The Solution','Problems:','Before:','After:','Approach:','Outcome:'];
function StructuredBody({body}:{body:string}){
  let prepared=body;
  editorialLabels.forEach(label=>{prepared=prepared.replaceAll(label,`\n## ${label.replace(/:$/,'')}\n`);});
  prepared=prepared.replace(/\s*●\s*/g,'\n• ').replace(/\s+(?=(?:\d{1,2})\.\s+[A-Z])/g,'\n');
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
  return <main className="case-page"><ProjectPageTransition/>
    <header className="case-header"><Link href="/v2" className="case-logo"><Image src="/ampliga-logo.png" alt="Ampliga" width={58} height={42}/></Link><Link href="/v2#contact" className="case-contact">Contact <span>↗</span></Link></header>
    <div className="case-layout">
      <aside className="case-sidebar">
        <Link className="case-back" href="/v2#work">← &nbsp; Back to work</Link>
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
      <Link className="case-footer-prev" href={`/v2/work/${previous.slug}`} data-project-transition>← Previous project: {previous.title}</Link>
      <Link className="case-footer-next" href={`/v2/work/${next.slug}`} data-project-transition>Next project: {next.title} →</Link>
    </footer>
  </main>;
}
