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
    gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0);
    return ()=>{gsap.ticker.remove(tick);lenis.destroy()};
  },[]);
  return null;
}
