'use client';

import { useEffect, useRef, useState } from 'react';

// The case-study sidebar is sticky for the whole scroll, so without an index it
// sits empty below the project identity. This fills it with a live table of
// contents: every section, numbered, with the one being read marked.
export default function CaseSectionIndex({titles}:{titles:string[]}){
  const [active,setActive]=useState(0);
  const nav=useRef<HTMLElement>(null);

  useEffect(()=>{
    const sections=titles.map((_,index)=>document.getElementById(`section-${index}`));
    let frame=0;
    const measure=()=>{
      frame=0;
      // Near the foot of the page the last section can never reach the read
      // line, so anchor to the end instead of leaving it permanently unmarked.
      if(window.innerHeight+window.scrollY>=document.body.scrollHeight-80){setActive(titles.length-1);return;}
      const readLine=window.innerHeight*.35;
      let current=0;
      sections.forEach((section,index)=>{if(section&&section.getBoundingClientRect().top<=readLine)current=index;});
      setActive(current);
    };
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(measure);};
    measure();
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule);
    return()=>{if(frame)cancelAnimationFrame(frame);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);};
  },[titles]);

  // Keep the marked entry visible when a study has more sections than the
  // sidebar can show at once.
  useEffect(()=>{
    nav.current?.querySelector<HTMLElement>('[data-active="true"]')?.scrollIntoView({block:'nearest'});
  },[active]);

  const jump=(event:React.MouseEvent<HTMLAnchorElement>,index:number)=>{
    const target=document.getElementById(`section-${index}`);
    if(!target)return;
    event.preventDefault();
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'});
    history.replaceState(null,'',`#section-${index}`);
  };

  return <nav className="case-index" ref={nav} aria-label="Case study sections">
    <span className="case-index-label">Contents</span>
    <ol>
      {titles.map((title,index)=>
        <li key={`${title}-${index}`}>
          <a href={`#section-${index}`} data-active={index===active} aria-current={index===active?'true':undefined} onClick={event=>jump(event,index)}>
            <b>{String(index+1).padStart(2,'0')}</b>
            <span>{title}</span>
          </a>
        </li>
      )}
    </ol>
  </nav>;
}
