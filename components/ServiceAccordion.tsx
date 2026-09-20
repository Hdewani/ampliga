'use client';

import {useEffect,useState} from 'react';

type Service={number:string;title:string;tags:string[];description:string;image:string;video?:string};

// The illustrations are transparent video. Safari -- and every browser on iOS,
// since they are all WebKit -- plays VP9 WebM but ignores its alpha channel,
// which leaves the artwork sitting on an opaque block. WebKit gets Apple's
// HEVC-with-alpha instead; everyone else keeps the smaller WebM.
//
// Those files must be .mov: HEVC-with-alpha is only signalled by the `almo`
// sample-entry box, which AVAssetWriter writes into QuickTime and nothing
// writes into MP4. An .mp4 without it decodes as an opaque track, which is the
// exact bug this replaced. See scripts/build-alpha-mov.sh.
function useAlphaVideoExt(){
 const [ext,setExt]=useState<'webm'|'mov'|null>(null);
 useEffect(()=>{setExt(/apple/i.test(navigator.vendor)?'mov':'webm');},[]);
 return ext;
}

export default function ServiceAccordion({services}:{services:Service[]}){
 const [openIndex,setOpenIndex]=useState<number|null>(0);
 const ext=useAlphaVideoExt();
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
      <button className="service-item-cta" type="button" tabIndex={isOpen?0:-1} data-start-project>Start a project<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg></button>
     </div>
     {service.video&&<div className="service-item-visual">{isOpen&&ext&&<video src={`${service.video}.${ext}`} poster={service.image} autoPlay muted loop playsInline preload="none" aria-hidden="true"/>}</div>}
    </div>
   </div>
  </article>;
 })}</div>;
}
