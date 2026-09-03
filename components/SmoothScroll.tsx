'use client';
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SmoothScroll(){
  useEffect(()=>{
    if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({duration:1.05, smoothWheel:true});
    lenis.on('scroll', ScrollTrigger.update);
    const tick=(t:number)=>lenis.raf(t*1000);
    const navigate=(event:MouseEvent)=>{
      const link=(event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if(!link)return;
      const hash=link.getAttribute('href');
      if(!hash||hash==='#')return;
      const target=document.querySelector<HTMLElement>(hash);
      if(!target)return;
      event.preventDefault();
      const longJump=Math.abs(target.getBoundingClientRect().top)>window.innerHeight*2;
      lenis.scrollTo(target,{offset:-90,immediate:longJump,lock:!longJump});
      history.replaceState(null,'',hash);
    };
    document.addEventListener('click',navigate);
    gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0);
    return ()=>{document.removeEventListener('click',navigate);gsap.ticker.remove(tick);lenis.destroy()};
  },[]);
  return null;
}
