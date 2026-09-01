'use client';

import { useEffect, useRef } from 'react';
import styles from './ProjectPageTransition.module.css';

const easing='cubic-bezier(.76,0,.24,1)';

export default function ProjectPageTransition({entry=false}:{entry?:boolean}){
  const overlay=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const root=overlay.current;
    if(!root)return;
    const slices=Array.from(root.querySelectorAll<HTMLElement>('[data-transition-slice]'));
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(entry){
      if(sessionStorage.getItem('ampliga-project-transition')!=='1'||reduced)return;
      sessionStorage.removeItem('ampliga-project-transition');
      root.classList.add(styles.entering);
      const animations=slices.map((slice,index)=>slice.animate([{transform:'scaleY(1)'},{transform:'scaleY(0)'}],{duration:620,delay:(slices.length-1-index)*55,easing,fill:'forwards'}));
      Promise.all(animations.map(animation=>animation.finished)).then(()=>root.classList.remove(styles.entering));
      return;
    }
    const click=(event:MouseEvent)=>{
      const link=(event.target as HTMLElement).closest<HTMLAnchorElement>('a[data-project-transition]');
      if(!link||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
      if(reduced)return;
      event.preventDefault();
      root.classList.add(styles.active);
      slices.forEach((slice,index)=>slice.animate([{transform:'scaleY(0)'},{transform:'scaleY(1)'}],{duration:560,delay:(slices.length-1-index)*55,easing,fill:'forwards'}));
      window.setTimeout(()=>window.location.assign(link.href),820);
    };
    document.addEventListener('click',click,true);
    return()=>document.removeEventListener('click',click,true);
  },[entry]);
  return <div ref={overlay} className={styles.overlay} aria-hidden="true">{Array.from({length:5},(_,index)=><i className={styles.slice} data-transition-slice key={index}/>)}</div>;
}
