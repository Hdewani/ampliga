'use client';

import {useState} from 'react';

type Service={number:string;title:string;tags:string[];description:string;image:string};

export default function ServiceAccordion({services}:{services:Service[]}){
 const [openIndex,setOpenIndex]=useState<number|null>(0);
 return <div className="services-accordion">{services.map((service,index)=>{
  const isOpen=openIndex===index;
  return <article className={`service-item${isOpen?' is-open':''}`} key={service.title}>
   <button className="service-item-head" type="button" aria-expanded={isOpen} aria-controls={`service-panel-${index}`} onClick={()=>setOpenIndex(isOpen?null:index)}>
    <span className="service-item-num">{String(index+1).padStart(2,'0')}</span>
    <span className="service-item-rule" aria-hidden="true"/>
    <h3>{service.title}</h3>
    <span className="service-item-toggle" aria-hidden="true">
     <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
    </span>
   </button>
   <div className="service-item-body" id={`service-panel-${index}`} role="region" aria-hidden={!isOpen}>
    <div className="service-item-body-inner">
     <ul className="service-item-tags">{service.tags.map(tag=><li key={tag}>{tag}</li>)}</ul>
     <div className="service-item-copy">
      <p>{service.description}</p>
      <a className="service-item-link" href="#work">View case studies
       <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9"/></svg>
      </a>
     </div>
    </div>
   </div>
  </article>;
 })}</div>;
}
