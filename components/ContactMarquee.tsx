'use client';

import {useRef} from 'react';

export default function ContactMarquee(){
 const marqueeRef=useRef<HTMLAnchorElement>(null);

 const moveCursor=(event:React.PointerEvent<HTMLAnchorElement>)=>{
  const bounds=event.currentTarget.getBoundingClientRect();
  marqueeRef.current?.style.setProperty('--contact-cursor-x',`${event.clientX-bounds.left}px`);
  marqueeRef.current?.style.setProperty('--contact-cursor-y',`${event.clientY-bounds.top}px`);
 };

 return <section className="swiss-contact" id="contact" aria-label="Start a project with Ampliga">
  <a ref={marqueeRef} className="contact-marquee" href="mailto:hello@ampliga.com" aria-label="Start a project — email Ampliga" onPointerMove={moveCursor}>
   <span className="contact-marquee-track" aria-hidden="true">
    {[0,1].map(copy=><span className="contact-marquee-group" key={copy}>{Array.from({length:4},(_,index)=><span className="contact-marquee-item" key={index}><span>Start a project</span><i/></span>)}</span>)}
   </span>
   <span className="contact-pointer" aria-hidden="true"><svg viewBox="0 0 71 71"><path d="M26.9 53.56 11.28 10.63c-.91-2.49 1.62-4.84 4.03-3.77l42.61 18.93c2.47 1.09 2.35 4.63-.19 5.56l-16.7 6.08a3 3 0 0 0-1.7 1.55l-6.89 14.82c-1.12 2.43-4.62 2.28-5.54-.24Z"/></svg><b>Let&apos;s talk</b></span>
  </a>
 </section>;
}
