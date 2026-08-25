'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function Motion(){
 useEffect(()=>{
  gsap.registerPlugin(ScrollTrigger);
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ctx=gsap.context(()=>{
   gsap.timeline({defaults:{ease:'power3.out'}}).from('.nav-in',{y:-18,opacity:0,duration:.55,stagger:.06}).from('.eyebrow-in',{y:16,opacity:0,duration:.5},'-=.25').from('.hero-line > span',{yPercent:110,duration:.85,stagger:.1,ease:'power4.out'},'-=.25').from('.hero-after',{y:18,opacity:0,duration:.6,stagger:.08},'-=.45');
   if(reduced) return;
   gsap.to('.hero-copy',{yPercent:-14,opacity:.25,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
   gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el)=>gsap.from(el,{y:48,opacity:0,duration:.9,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 86%'}}));
   gsap.utils.toArray<HTMLElement>('.parallax-img').forEach((el)=>gsap.fromTo(el,{yPercent:-5,scale:1.06},{yPercent:5,scale:1,ease:'none',scrollTrigger:{trigger:el.parentElement,start:'top bottom',end:'bottom top',scrub:.8}}));
   const statements=gsap.utils.toArray<HTMLElement>('.manifesto-line'); statements.forEach((el)=>ScrollTrigger.create({trigger:el,start:'top 55%',end:'bottom 45%',toggleClass:'active'}));
   const mm=gsap.matchMedia(); mm.add('(min-width: 1024px)',()=>{
    const track=document.querySelector<HTMLElement>('.process-track'); if(track) gsap.to(track,{x:()=>-(track.scrollWidth-innerWidth+96),ease:'none',scrollTrigger:{trigger:'.process',start:'top top',end:()=>`+=${track.scrollWidth}`,scrub:1,pin:true,invalidateOnRefresh:true}});
    const tl=gsap.timeline({scrollTrigger:{trigger:'.philosophy',start:'top top',end:'bottom bottom',scrub:1,pin:'.philosophy-pin'}}); tl.to('.thought-one',{y:-60,opacity:0}).fromTo('.thought-two',{y:80,opacity:0},{y:0,opacity:1},'<.2').from('.thought-support',{y:30,opacity:0},'<.35');
   });
  });
  return ()=>ctx.revert();
 },[]);
 return null;
}
