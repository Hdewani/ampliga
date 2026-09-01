import type { Metadata } from 'next';
import type React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProjectPageTransition from '@/components/ProjectPageTransition';
import { notFound } from 'next/navigation';
import './case-study.css';

type Study = {
  slug:string; title:string; summary:string; image:string; services:string[];
  sections:{title:string;body:string}[];
};

const studies:Study[]=[
  {slug:'tradeghar',title:'Tradeghar',summary:'AI-powered real estate intelligence for verified requirements and smarter property matching.',image:'/projects/tradeghar-ai-real-estate.png',services:['AI & Automation','Product Design','Data Systems','Lead Management'],sections:[
    {title:'The challenge',body:'Tradeghar was receiving buyer, seller, tenant and owner enquiries through several disconnected channels. Important details were spread across conversations, spreadsheets and individual team members, so every new requirement involved repeated reading, copying and manual coordination. This made response times inconsistent, increased the possibility of missed follow-ups and made it difficult for management to understand what was moving through the pipeline. The central challenge was not simply collecting more leads—it was turning a high volume of unstructured conversations into clear, actionable opportunities without making the experience feel complicated for the sales team.'},
    {title:'Approach',body:'We began by studying how an enquiry moved from its first message to a successful property match. Instead of adding another isolated tool, we designed one connected journey that organises incoming requirements, brings property information into a consistent structure and gives the team a shared place to work. The experience prioritises clarity: teams can understand the customer’s need, see relevant options and know the next action without searching across multiple sources. For customers, the same thinking creates a faster and more focused property-discovery experience with recommendations that feel relevant rather than overwhelming.'},
    {title:'Outcome',body:'Tradeghar now has a more organised operating model for managing property demand and inventory. Sales teams spend less time interpreting and moving information between tools, allowing them to focus more on conversations and closures. Customer requirements are easier to understand, relevant properties can be identified sooner and follow-ups are more dependable. Management also gains a clearer view of active opportunities and team activity, creating a stronger foundation for consistent service and future growth.'},
    {title:'What we did',body:'● Mapped the complete enquiry, matching and follow-up journey ● Designed a simple experience for customers and internal teams ● Brought lead, customer and property information into one coherent workflow ● Created clearer ways to review requirements and identify relevant inventory ● Introduced intelligent assistance for classification, matching and follow-up ● Designed a central operations view for everyday decisions ● Helped the team move from fragmented conversations to a repeatable sales process'}
  ]},
  {slug:'jp-associates',title:'JP Associates',summary:'A continuously updated trademark intelligence platform built for a leading law firm in Gwalior.',image:'/projects/jp-associates-trademark-monitoring.png',services:['Python Automation','Web Scraping','Data Engineering','Internal Platform'],sections:[
    {title:'The challenge',body:'JP Associates works with a vast and continuously changing body of trademark information. Researching a mark required legal professionals to repeat searches, compare records and manually follow changes across a large number of applications. The process consumed valuable time and made it difficult to maintain a consistent, up-to-date view of every matter being monitored. The firm needed a dependable internal system that could support large-scale research while remaining straightforward enough for everyday legal work.'},
    {title:'Approach',body:'We designed the solution around the team’s actual research and review process. The experience brings trademark discovery, record review, ongoing monitoring and reporting into one private workspace. Search and filtering were structured to help professionals move quickly from a broad query to the records that matter, while saved matters provide continuity across repeated investigations. Complex data collection and comparison remain behind the interface, allowing the legal team to focus on interpretation and client advice rather than administration.'},
    {title:'Outcome',body:'The firm can now conduct trademark research with greater speed, consistency and confidence. Large result sets are easier to narrow down, important matters can be revisited without repeating the full search and meaningful record changes are simpler to identify. Reports are based on a more current and organised view of the information, reducing repetitive effort and improving the team’s ability to respond to clients with timely insights.'},
    {title:'What we did',body:'● Studied the firm’s trademark search, review and reporting process ● Organised a large body of trademark information for practical legal use ● Designed focused search, filtering and record-review experiences ● Created saved matters for continued monitoring ● Added clear ways to recognise and review meaningful updates ● Streamlined the preparation of current client reports ● Delivered a secure internal workspace suited to the firm’s daily operations'}
  ]},
  {slug:'sarox',title:'Sarox',summary:'Electrical testing and reporting automation designed to make field operations faster and more reliable.',image:'/projects/sarox-testing-dashboard.png',services:['Workflow Automation','Reporting','Product Design','Data Systems'],sections:[
    {title:'The challenge',body:'Sarox’s electrical testing work generated detailed information that had to move between field teams, office staff and final client reports. Repeated manual entry increased administrative effort and created opportunities for inconsistent formatting or missing details. Project information was also harder to revisit once a report had been completed. The challenge was to improve speed and consistency without disrupting the careful procedures and professional judgement required in electrical testing.'},
    {title:'Approach',body:'We mapped the full journey from starting a project and recording observations to reviewing results and issuing a finished report. The new experience was shaped around real field conditions, using clear steps, familiar language and reusable project information. Standardised forms improve consistency while still allowing teams to capture the context each job requires. Review points were placed at the right moments so office teams can verify information before it reaches the client.'},
    {title:'Outcome',body:'Testing information now moves through a clearer and more dependable reporting process. Field teams spend less time repeating administrative tasks, office staff can review submissions more efficiently and completed reports follow a more consistent structure. Project history is easier to access when a client returns or a previous result needs to be checked. The overall improvement gives the team more time to focus on testing quality, client communication and delivery.'},
    {title:'What we did',body:'● Mapped the field-testing, review and reporting workflow ● Designed a focused interface suited to practical on-site use ● Standardised project and test-information capture ● Reduced repeated entry across the reporting journey ● Created structured review points before report completion ● Improved access to past projects and completed reports ● Designed a consistent client-facing report experience'}
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
    <header className="case-header"><Link href="/v2" className="case-logo"><Image src="/ampliga-logo.png" alt="Ampliga" width={58} height={42}/></Link><Link href="/v2#contact" className="case-contact">Let&apos;s talk <span>↗</span></Link></header>
    <div className="case-layout">
      <aside className="case-sidebar">
        <Link className="case-back" href="/v2#work">← &nbsp; Back to work</Link>
        <div className="case-identity"><h1>{study.title}</h1><p>{study.summary}</p><ul>{study.services.map(service=><li key={service}>{service}</li>)}</ul></div>
        <nav className="case-tabs" aria-label="Case-study sections">{sections.map((section,index)=><a href={`#section-${index}`} key={section.title}>{section.title}</a>)}</nav>
        <p className="case-sidebar-copy">Explore the challenge, the system we designed and the impact created for {study.title}.</p>
        <div className="case-sidebar-foot"><Link href={`/v2/work/${previous.slug}`} data-project-transition>← &nbsp;Back</Link><Link href={`/v2/work/${next.slug}`} data-project-transition>Next&nbsp; →</Link></div>
      </aside>
      <article className="case-content">
        <div className="case-hero"><Image src={study.image} alt={`${study.title} project overview`} fill priority sizes="(max-width: 900px) 100vw, 66vw"/></div>
        <div className="case-document">
          {sections.map((section,index)=><section className="case-section" id={`section-${index}`} key={`${section.title}-${index}`}><span>{String(index+1).padStart(2,'0')}</span><div><p className="case-eyebrow">{study.title} / Case study</p><h2>{section.title}</h2><StructuredBody body={section.body}/></div></section>)}
        </div>
        <footer className="case-end"><span>End of case study</span><Link href={`/v2/work/${next.slug}`} data-project-transition>Next project: {next.title} →</Link></footer>
      </article>
    </div>
  </main>;
}
