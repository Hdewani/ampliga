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
      // A long jump teleports, so the header lands on a completely different
      // backdrop in one frame. Its .32s background/border/shadow transitions
      // would then cross-fade the old pill into the new state -- a flash at the
      // top of the screen. Suppress them across the jump so it just snaps.
      // Released two frames later: StickyHeaderState re-classes the header in a
      // rAF, and restoring in that same frame would still start a transition.
      if(longJump){
        const root=document.documentElement;
        root.classList.add('is-scroll-jump');
        requestAnimationFrame(()=>requestAnimationFrame(()=>root.classList.remove('is-scroll-jump')));
      }
      lenis.scrollTo(target,{offset:-90,immediate:longJump,lock:!longJump});
      history.replaceState(null,'',hash);
    };
    document.addEventListener('click',navigate);
    gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0);
    return ()=>{document.removeEventListener('click',navigate);gsap.ticker.remove(tick);lenis.destroy()};
  },[]);
  return null;
}
