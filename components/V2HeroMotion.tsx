'use client';

import {useLayoutEffect} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

export default function V2HeroMotion(){
  useLayoutEffect(()=>{
    const previousScrollRestoration=window.history.scrollRestoration;
    if('scrollRestoration' in window.history) window.history.scrollRestoration='manual';
    window.scrollTo(0,0);
    const hero=document.querySelector<HTMLElement>('.swiss-hero');
    if(!hero||matchMedia('(prefers-reduced-motion: reduce)').matches){
      window.history.scrollRestoration=previousScrollRestoration;
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    hero.classList.add('hero-motion-ready');
    const cleanups:Array<()=>void>=[];
    const root=document.documentElement;
    const previousRootOverflow=root.style.overflow;
    const previousRootOverscroll=root.style.overscrollBehavior;
    const previousBodyOverflow=document.body.style.overflow;
    let introLocked=true;
    const lockIntroScroll=()=>{
      root.style.overflow='hidden';
      root.style.overscrollBehavior='none';
      document.body.style.overflow='hidden';
    };
    const unlockIntroScroll=()=>{
      if(!introLocked)return;
      introLocked=false;
      root.style.overflow=previousRootOverflow;
      root.style.overscrollBehavior=previousRootOverscroll;
      document.body.style.overflow=previousBodyOverflow;
      window.scrollTo(0,0);
      ScrollTrigger.refresh();
    };
    lockIntroScroll();
    cleanups.push(()=>{
      root.style.overflow=previousRootOverflow;
      root.style.overscrollBehavior=previousRootOverscroll;
      document.body.style.overflow=previousBodyOverflow;
    });
    const ctx=gsap.context(()=>{
      gsap.set('.swiss-logo',{y:-14,autoAlpha:0});
      gsap.set('.swiss-header nav, .swiss-cta, .version-link',{y:-12,autoAlpha:0});
      gsap.set('.swiss-disciplines',{y:18,autoAlpha:0});
      gsap.set('.hero-copy',{y:35,autoAlpha:0});
      gsap.set('.scroll-cue',{autoAlpha:0});
      const heroLines=Array.from(document.querySelectorAll<HTMLElement>('.hero-mask > span'));
      const heroWords=Array.from(document.querySelectorAll<HTMLElement>('.hero-word'));
      const wordOrigins=[[-240,-150,-11],[260,-120,9],[-310,170,-8],[130,300,13],[390,145,-10],[-280,330,8],[80,-260,-12],[330,290,11],[-210,250,-9],[300,190,10]];
      gsap.set(heroLines,{autoAlpha:1,x:0,y:0,rotation:0,scale:1,filter:'none'});
      gsap.set(heroWords,{autoAlpha:0,x:(index)=>wordOrigins[index]?.[0]??0,y:(index)=>wordOrigins[index]?.[1]??160,rotation:(index)=>wordOrigins[index]?.[2]??0,scale:(index)=>index%3===0?.62:.78,filter:'blur(12px)'});
      gsap.set('.signal-bolt, .signal-graph, .signal-compass, .momentum-pulse',{autoAlpha:0,x:(index)=>[-220,310,260,-180][index]??0,y:(index)=>[-190,180,-260,290][index]??0,scale:.18,rotation:-35});
      gsap.set('.hero-arrow-zone',{x:180,autoAlpha:0,scale:.88});
      const loaderFrame=document.querySelector<HTMLElement>('.intro-loader-frame');
      const frameWidth=loaderFrame?.offsetWidth??480;
      const frameHeight=loaderFrame?.offsetHeight??310;
      gsap.set('.intro-loader-frame',{autoAlpha:1});
      gsap.set('.loader-corner',{autoAlpha:1,x:0,y:0,scale:1});
      gsap.set('.intro-wordmark-ghost',{autoAlpha:0,scale:.96});
      gsap.set('.intro-logo-piece',{autoAlpha:0,filter:'blur(9px)'});
      gsap.set('.intro-logo-piece-one',{x:-54,y:15,rotation:-5});
      gsap.set('.intro-logo-piece-two',{x:0,y:-30,rotation:4});
      gsap.set('.intro-logo-piece-three',{x:52,y:18,rotation:6});
      gsap.set('.intro-loader-wordmark',{scale:.94});
      gsap.set('.intro-loader-lockup small',{autoAlpha:0,y:8});
      gsap.set('.intro-loader-status > *',{autoAlpha:0,y:6});
      const loaderCounter={value:0};
      const timeline=gsap.timeline({defaults:{ease:'power4.out'},onComplete:unlockIntroScroll});
      timeline
        .to('.loader-corner',{x:(index)=>index%2===0?frameWidth/2:-frameWidth/2,y:(index)=>index<2?frameHeight/2:-frameHeight/2,scale:.55,duration:.5,stagger:.025,ease:'power3.inOut'},.08)
        .to('.loader-corner',{x:0,y:0,scale:1,duration:.7,stagger:.035,ease:'back.out(2.15)'},.58)
        .to('.intro-wordmark-ghost',{autoAlpha:.13,scale:1,duration:.48,ease:'power2.out'},.72)
        .to('.intro-logo-piece',{x:0,y:0,rotation:0,autoAlpha:1,filter:'blur(0px)',duration:.82,stagger:.11,ease:'expo.out'},.8)
        .to('.intro-loader-wordmark',{scale:1,duration:.8,ease:'power3.out'},.8)
        .to('.intro-loader-lockup small',{autoAlpha:1,y:0,duration:.42},1.08)
        .to('.intro-loader-status > *',{autoAlpha:1,y:0,duration:.28,stagger:.06},.18)
        .to(loaderCounter,{value:100,duration:1.72,ease:'power2.inOut',onUpdate:()=>{const count=document.querySelector<HTMLElement>('.intro-loader-count');if(count)count.textContent=`${String(Math.round(loaderCounter.value)).padStart(3,'0')}%`}},.2)
        .to('.intro-logo-piece-one',{x:-42,y:14,rotation:-7,autoAlpha:0,duration:.42,ease:'power3.in'},2.2)
        .to('.intro-logo-piece-two',{x:5,y:-25,rotation:5,autoAlpha:0,duration:.42,ease:'power3.in'},2.2)
        .to('.intro-logo-piece-three',{x:43,y:16,rotation:8,autoAlpha:0,duration:.42,ease:'power3.in'},2.2)
        .to('.intro-wordmark-ghost',{autoAlpha:0,duration:.24},2.22)
        .to('.loader-corner, .intro-loader-lockup small, .intro-loader-status',{autoAlpha:0,duration:.28,ease:'power2.in'},2.28)
        .to('.hero-intro',{autoAlpha:0,duration:.42,ease:'power2.inOut'},2.52)
        .set('.hero-intro',{display:'none'},2.95)
        .to('.swiss-logo',{y:0,autoAlpha:1,duration:.55},2.62)
        .to('.swiss-header nav, .swiss-cta, .version-link',{y:0,autoAlpha:1,duration:.55,stagger:.05},2.7)
        .to(heroWords,{x:0,y:0,rotation:0,scale:1,autoAlpha:1,filter:'blur(0px)',duration:1.18,stagger:{each:.065,from:'random'},ease:'expo.out'},2.58)
        .to('.signal-bolt, .signal-graph, .signal-compass, .momentum-pulse',{x:0,y:0,autoAlpha:1,scale:1,rotation:0,duration:.9,stagger:{each:.09,from:'random'},ease:'back.out(1.7)'},2.82)
        .to('.hero-arrow-zone',{x:0,autoAlpha:1,scale:1,duration:1.05,ease:'expo.out'},2.9)
        .to('.swiss-disciplines',{y:0,autoAlpha:1,duration:.55},2.96)
        .to('.hero-copy',{y:0,autoAlpha:1,duration:.72},3.3)
        .to('.scroll-cue',{autoAlpha:1,duration:.5},3.46);

      const curve=document.querySelector<SVGPathElement>('.sweep-curve');
      const arrowZone=document.querySelector<HTMLElement>('.hero-arrow-zone');
      const label=document.querySelector<HTMLElement>('.momentum-cursor-label');
      const objects=Array.from(document.querySelectorAll<HTMLElement>('.momentum-object'));
      const showLabel=(event:PointerEvent)=>{
        if(!label) return;
        const target=event.currentTarget as HTMLElement;
        label.textContent=target.dataset.label||'';
        gsap.set(label,{x:event.clientX+16,y:event.clientY+16});
        gsap.to(label,{autoAlpha:1,duration:.18});
      };
      const moveLabel=(event:PointerEvent)=>label&&gsap.to(label,{x:event.clientX+16,y:event.clientY+16,duration:.16,ease:'power2.out',overwrite:true});
      const hideLabel=()=>label&&gsap.to(label,{autoAlpha:0,duration:.16});
      objects.forEach(object=>{
        object.addEventListener('pointerenter',showLabel);
        object.addEventListener('pointermove',moveLabel);
        object.addEventListener('pointerleave',hideLabel);
        cleanups.push(()=>{object.removeEventListener('pointerenter',showLabel);object.removeEventListener('pointermove',moveLabel);object.removeEventListener('pointerleave',hideLabel)});
      });

      const orange=document.querySelector<HTMLElement>('.signal-graph');
      if(orange){
        const icon=orange.querySelector('svg');
        const orbit=orange.querySelector('.signal-orbit');
        const move=(event:PointerEvent)=>{const rect=orange.getBoundingClientRect();const dx=event.clientX-(rect.left+rect.width/2);const dy=event.clientY-(rect.top+rect.height/2);gsap.to(orange,{x:Math.max(-28,Math.min(28,dx*.42)),y:Math.max(-28,Math.min(28,dy*.42)),duration:.22,ease:'power2.out',overwrite:true});gsap.to(icon,{x:Math.max(-38,Math.min(38,dx*.56)),y:Math.max(-38,Math.min(38,dy*.56)),rotation:dx*.16,duration:.22,overwrite:true})};
        const enter=()=>{gsap.to(curve,{scaleX:1.012,transformOrigin:'left center',duration:.45,ease:'power3.out'});gsap.fromTo(orbit,{rotation:0},{rotation:360,duration:.8,ease:'power2.inOut'})};
        const leave=()=>{gsap.to(orange,{x:0,y:0,duration:.75,ease:'elastic.out(1,.45)'});gsap.to(icon,{x:0,y:0,rotation:0,duration:.65,ease:'elastic.out(1,.5)'});gsap.to(curve,{scaleX:1,duration:.45})};
        orange.addEventListener('pointermove',move);orange.addEventListener('pointerenter',enter);orange.addEventListener('pointerleave',leave);cleanups.push(()=>{orange.removeEventListener('pointermove',move);orange.removeEventListener('pointerenter',enter);orange.removeEventListener('pointerleave',leave)});
      }

      const build=document.querySelector<HTMLElement>('.signal-bolt');
      if(build){
        const icon=build.querySelector('svg');
        const idle=gsap.timeline({repeat:-1,repeatDelay:2.8,delay:1.35})
          .to(build,{scale:1.055,boxShadow:'0 0 0 7px rgba(8,8,8,.055)',duration:.2,ease:'power2.out'})
          .to(icon,{scale:1.16,rotation:-9,y:-3,duration:.18,ease:'power2.out'},0)
          .to(icon,{scale:.96,rotation:5,y:2,duration:.14,ease:'power2.inOut'})
          .to(icon,{scale:1,rotation:0,y:0,duration:.42,ease:'elastic.out(1,.45)'})
          .to(build,{scale:1,boxShadow:'0 0 0 0 rgba(8,8,8,0)',duration:.38,ease:'power2.out'},.32);
        const move=(event:PointerEvent)=>{const rect=build.getBoundingClientRect();const dx=event.clientX-(rect.left+rect.width/2);const dy=event.clientY-(rect.top+rect.height/2);gsap.to(build,{x:Math.max(-26,Math.min(26,dx*.4)),y:Math.max(-26,Math.min(26,dy*.4)),duration:.21,ease:'power2.out',overwrite:'auto'});gsap.to(icon,{x:Math.max(-36,Math.min(36,dx*.54)),y:Math.max(-36,Math.min(36,dy*.54)),rotation:dx*.18,duration:.21,overwrite:'auto'})};
        const enter=()=>{idle.pause();gsap.to(build,{scale:1.14,boxShadow:'0 0 0 7px rgba(8,8,8,.07)',duration:.35,ease:'back.out(1.7)'});gsap.to(icon,{scale:1.08,rotation:-7,duration:.28,ease:'back.out(2)'});gsap.to('.sweep-curve, .sweep-tip',{strokeWidth:6,duration:.3,ease:'power2.out'})};
        const leave=()=>{gsap.to(build,{x:0,y:0,scale:1,boxShadow:'0 0 0 0 rgba(8,8,8,0)',duration:.65,ease:'elastic.out(1,.48)'});gsap.to(icon,{x:0,y:0,scale:1,rotation:0,duration:.65,ease:'elastic.out(1,.5)'});gsap.to('.sweep-curve, .sweep-tip',{strokeWidth:3,duration:.3,ease:'power2.out'});idle.restart(true)};
        build.addEventListener('pointermove',move);build.addEventListener('pointerenter',enter);build.addEventListener('pointerleave',leave);cleanups.push(()=>{build.removeEventListener('pointermove',move);build.removeEventListener('pointerenter',enter);build.removeEventListener('pointerleave',leave);idle.kill()})
      }

      const compass=document.querySelector<HTMLElement>('.signal-compass');
      if(compass){
        const icon=compass.querySelector('svg');
        const idle=gsap.timeline({repeat:-1,repeatDelay:3.2,delay:2})
          .to(compass,{scale:1.06,boxShadow:'0 0 0 7px rgba(8,8,8,.05)',duration:.24,ease:'power2.out'})
          .to(icon,{rotation:24,scale:1.08,duration:.28,ease:'power2.out'},0)
          .to(icon,{rotation:0,scale:1,duration:.55,ease:'elastic.out(1,.5)'})
          .to(compass,{scale:1,boxShadow:'0 0 0 0 rgba(8,8,8,0)',duration:.4},.34);
        const move=(event:PointerEvent)=>{const rect=compass.getBoundingClientRect();const dx=event.clientX-(rect.left+rect.width/2);const dy=event.clientY-(rect.top+rect.height/2);gsap.to(compass,{x:Math.max(-27,Math.min(27,dx*.41)),y:Math.max(-27,Math.min(27,dy*.41)),duration:.21,ease:'power2.out',overwrite:'auto'});gsap.to(icon,{x:Math.max(-37,Math.min(37,dx*.55)),y:Math.max(-37,Math.min(37,dy*.55)),rotation:dx*.12,duration:.21,ease:'power2.out',overwrite:'auto'})};
        const enter=()=>{idle.pause();gsap.to(compass,{scale:1.12,boxShadow:'0 0 0 7px rgba(8,8,8,.07)',duration:.34,ease:'back.out(1.8)'});gsap.to(icon,{rotation:360,scale:1.08,duration:.82,ease:'power3.inOut'});gsap.to(curve,{scaleX:1.01,transformOrigin:'left center',duration:.4})};
        const leave=()=>{gsap.to(compass,{x:0,y:0,scale:1,boxShadow:'0 0 0 0 rgba(8,8,8,0)',duration:.7,ease:'elastic.out(1,.46)'});gsap.to(icon,{x:0,y:0,rotation:0,scale:1,duration:.68,ease:'elastic.out(1,.48)'});gsap.to(curve,{scaleX:1,duration:.4});idle.restart(true)};
        compass.addEventListener('pointermove',move);compass.addEventListener('pointerenter',enter);compass.addEventListener('pointerleave',leave);cleanups.push(()=>{compass.removeEventListener('pointermove',move);compass.removeEventListener('pointerenter',enter);compass.removeEventListener('pointerleave',leave);idle.kill()});
      }

      const yellow=document.querySelector<HTMLElement>('.momentum-pulse');
      if(yellow){const bars=yellow.querySelectorAll('path');const move=(event:PointerEvent)=>{const rect=yellow.getBoundingClientRect();const dx=event.clientX-(rect.left+rect.width/2);const dy=event.clientY-(rect.top+rect.height/2);gsap.to(yellow,{x:Math.max(-28,Math.min(28,dx*.42)),y:Math.max(-28,Math.min(28,dy*.42)),rotation:dx*.08,duration:.21,ease:'power2.out',overwrite:'auto'});gsap.to(bars,{x:Math.max(-34,Math.min(34,dx*.5)),y:Math.max(-34,Math.min(34,dy*.5)),duration:.21,ease:'power2.out',overwrite:'auto'})};const enter=()=>{gsap.to(yellow,{scale:1.13,duration:.35,ease:'back.out(1.8)'});gsap.fromTo(bars,{scaleY:.45,y:4},{scaleY:1.18,y:-3,transformOrigin:'50% 100%',duration:.34,stagger:.06,ease:'back.out(2)'});gsap.to(arrowZone,{scaleY:1.035,transformOrigin:'center bottom',duration:.45,ease:'power3.out'})};const leave=()=>{gsap.to(yellow,{x:0,y:0,rotation:0,scale:1,duration:.7,ease:'elastic.out(1,.45)'});gsap.to(bars,{x:0,y:0,scaleY:1,duration:.45,stagger:.04,ease:'elastic.out(1,.5)'});gsap.to(arrowZone,{scaleY:1,duration:.5,ease:'power3.out'})};yellow.addEventListener('pointermove',move);yellow.addEventListener('pointerenter',enter);yellow.addEventListener('pointerleave',leave);cleanups.push(()=>{yellow.removeEventListener('pointermove',move);yellow.removeEventListener('pointerenter',enter);yellow.removeEventListener('pointerleave',leave)})}

      gsap.timeline({scrollTrigger:{trigger:hero,start:'top top',end:'72% top',scrub:1.15,invalidateOnRefresh:true}})
        .to('.hero-primary',{y:-26,scale:.992,duration:1,ease:'none'},0)
        .to(heroWords,{x:(index)=>index%3===0?-9:index%3===1?8:0,y:(index)=>index%2===0?-34:-24,rotation:(index)=>index%2===0?-.45:.4,stagger:.01,duration:1,ease:'none'},0)
        .to('.signal-bolt, .signal-graph, .signal-compass, .momentum-pulse',{y:(index)=>-12-index*4,duration:.9,ease:'none'},0)
        .to('.hero-arrow-zone',{y:-42,scale:.985,duration:1,ease:'none'},0)
        .to('.hero-ref, .momentum-hero',{backgroundPosition:'center 18%',duration:1,ease:'none'},0);

      const manifesto=document.querySelector<HTMLElement>('.studio-manifesto');
      if(manifesto){
        const manifestoWords=Array.from(manifesto.querySelectorAll<HTMLElement>('.studio-manifesto-word'));
        const manifestoIndex=manifesto.querySelector<HTMLElement>('.studio-manifesto-index');
        const manifestoRule=manifesto.querySelector<HTMLElement>('.studio-manifesto-rule');
        const manifestoMarker=manifestoRule?.querySelector<HTMLElement>('span');
        const manifestoPlus=manifestoMarker?.querySelector<SVGElement>('svg');
        gsap.set(manifesto,{y:150});
        gsap.set(manifestoIndex,{autoAlpha:.35,y:12});
        gsap.set(manifestoWords,{autoAlpha:1,yPercent:0,filter:'none',color:'#b8b8b8'});
        gsap.set('.studio-manifesto-rule',{'--rule-progress':0});
        if(manifestoMarker)gsap.set(manifestoMarker,{x:0,xPercent:-50,yPercent:-50});
        const manifestoTimeline=gsap.timeline({
          scrollTrigger:{
            trigger:manifesto,
            start:'top 96%',
            end:'top 12%',
            scrub:.9,
            invalidateOnRefresh:true
          }
        });
        manifestoTimeline
          .to(manifesto,{y:0,duration:.42,ease:'none'},0)
          .to(manifestoIndex,{autoAlpha:1,y:0,duration:.14,ease:'none'},.18)
          .to(manifestoWords,{color:(index,word)=>index===0?'#DD1112':word.classList.contains('studio-manifesto-meaningful')?'#890000':word.classList.contains('studio-manifesto-through')?'#797979':'#080808',duration:.13,stagger:.052,ease:'none'},.22);
        const ruleTimeline=gsap.timeline({
          scrollTrigger:{
            trigger:manifesto,
            start:'top 78%',
            end:'top -10%',
            scrub:.65,
            invalidateOnRefresh:true
          }
        });
        ruleTimeline
          .to(manifestoRule,{'--rule-progress':1,duration:1,ease:'none'},0);
        if(manifestoMarker)ruleTimeline.to(manifestoMarker,{x:()=>manifestoRule?.clientWidth||0,duration:1,ease:'none'},0);
        if(manifestoPlus)ruleTimeline.to(manifestoPlus,{rotation:630,transformOrigin:'50% 50%',duration:1,ease:'none'},0);
      }

      const darkTransition=document.querySelector<HTMLElement>('.dark-slice-transition');
      if(darkTransition){
        const transitionStage=darkTransition.closest<HTMLElement>('.manifesto-transition-stage')||darkTransition;
        const darkSlices=Array.from(darkTransition.querySelectorAll<HTMLElement>('.dark-slice-frame i'));
        const factsTitle=darkTransition.querySelector<HTMLElement>('.facts-transition-title');
        const factsWords=Array.from(darkTransition.querySelectorAll<HTMLElement>('.facts-transition-title span'));
        gsap.set(darkSlices,{scaleY:0});
        gsap.set(factsTitle,{yPercent:100,autoAlpha:1});
        gsap.set(factsWords,{y:36,autoAlpha:0,filter:'blur(8px)'});
        gsap.timeline({scrollTrigger:{trigger:transitionStage,start:'top top',end:'bottom bottom',scrub:.75,invalidateOnRefresh:true}})
          .to(darkSlices,{scaleY:1,duration:.68,stagger:{each:.05,from:'end'},ease:'power2.inOut'},.14)
          .to(transitionStage,{backgroundColor:'#111111',duration:.14,ease:'none'},.48)
          .to(manifesto,{backgroundColor:'#111111',borderTopLeftRadius:0,borderTopRightRadius:0,duration:.14,ease:'none'},.68)
          .to(factsTitle,{yPercent:-25,duration:.72,ease:'power2.inOut'},.2)
          .to(factsWords,{y:0,autoAlpha:1,filter:'blur(0px)',duration:.34,stagger:.04,ease:'power2.out'},.36)
          .to(darkSlices,{scaleY:1.03,duration:.1,ease:'none'},.84);
      }

      const grid=document.querySelector<HTMLElement>('.momentum-specks');
      if(grid){const interactionSurface=arrowZone||grid;const dots=Array.from(grid.querySelectorAll<SVGCircleElement>('.grid-dot'));const move=(event:PointerEvent)=>{const svg=grid.querySelector<SVGSVGElement>('svg');if(!svg)return;const rect=svg.getBoundingClientRect();const viewBox=svg.viewBox.baseVal;const px=(event.clientX-rect.left)*viewBox.width/rect.width;const py=(event.clientY-rect.top)*viewBox.height/rect.height;const radius=165;dots.forEach(dot=>{const x=Number(dot.getAttribute('cx'));const y=Number(dot.getAttribute('cy'));const dx=x-px;const dy=y-py;const distance=Math.hypot(dx,dy)||1;const force=Math.max(0,1-distance/radius)*28;gsap.to(dot,{x:dx/distance*force,y:dy/distance*force,scale:1+Math.max(0,1-distance/radius)*.7,duration:.18,ease:'power2.out',overwrite:true})});gsap.to(curve,{y:Math.max(-14,Math.min(14,(py-viewBox.height/2)*.085)),duration:.25,overwrite:true})};const leave=()=>{gsap.to(dots,{x:0,y:0,scale:1,duration:.75,stagger:{amount:.18,from:'random'},ease:'elastic.out(1,.42)'});gsap.to(curve,{y:0,duration:.45})};interactionSurface.addEventListener('pointermove',move);interactionSurface.addEventListener('pointerleave',leave);cleanups.push(()=>{interactionSurface.removeEventListener('pointermove',move);interactionSurface.removeEventListener('pointerleave',leave)})}

      const orangeDot=document.querySelector<HTMLElement>('.doodle-orange');
      if(orangeDot){const enter=()=>gsap.to(orangeDot,{y:-10,scale:1.5,boxShadow:'0 0 0 11px rgba(221,17,18,.14)',duration:.32,ease:'back.out(2)'});const leave=()=>gsap.to(orangeDot,{y:0,scale:1,boxShadow:'0 0 0 0 rgba(221,17,18,0)',duration:.6,ease:'elastic.out(1,.48)'});orangeDot.addEventListener('pointerenter',enter);orangeDot.addEventListener('pointerleave',leave);cleanups.push(()=>{orangeDot.removeEventListener('pointerenter',enter);orangeDot.removeEventListener('pointerleave',leave)})}
      const blackDot=document.querySelector<HTMLElement>('.doodle-black');
      if(blackDot){const enter=()=>gsap.to(blackDot,{x:14,scale:1.65,duration:.26,ease:'back.out(2.5)'});const leave=()=>gsap.to(blackDot,{x:0,scale:1,duration:.55,ease:'elastic.out(1,.42)'});blackDot.addEventListener('pointerenter',enter);blackDot.addEventListener('pointerleave',leave);cleanups.push(()=>{blackDot.removeEventListener('pointerenter',enter);blackDot.removeEventListener('pointerleave',leave)})}
      const plus=document.querySelector<HTMLElement>('.doodle-plus');
      if(plus){const spin=gsap.timeline({paused:true}).to(plus,{rotation:720,scale:1.3,duration:1.05,ease:'power2.inOut'}).to(plus,{scale:1,duration:.24,ease:'back.out(2)'});const enter=()=>spin.restart();const leave=()=>{spin.pause();gsap.set(plus,{rotation:0});gsap.to(plus,{scale:1,duration:.2})};plus.addEventListener('pointerenter',enter);plus.addEventListener('pointerleave',leave);cleanups.push(()=>{plus.removeEventListener('pointerenter',enter);plus.removeEventListener('pointerleave',leave);spin.kill()})}
      const ring=document.querySelector<HTMLElement>('.doodle-ring');
      if(ring){const enter=()=>gsap.to(ring,{scale:1.75,rotation:180,borderColor:'#ffc91c',duration:.48,ease:'back.out(1.8)'});const leave=()=>gsap.to(ring,{scale:1,rotation:0,borderColor:'#DD1112',duration:.62,ease:'elastic.out(1,.45)'});ring.addEventListener('pointerenter',enter);ring.addEventListener('pointerleave',leave);cleanups.push(()=>{ring.removeEventListener('pointerenter',enter);ring.removeEventListener('pointerleave',leave)})}

      const servicesSection=document.querySelector<HTMLElement>('.swiss-services');
      const pipeline=document.querySelector<SVGPathElement>('.roadmap-path path');
      if(servicesSection&&pipeline){
        const pathLength=pipeline.getTotalLength();
        const nodes=Array.from(servicesSection.querySelectorAll<HTMLElement>('.roadmap-node'));
        const stages=Array.from(servicesSection.querySelectorAll<HTMLElement>('.roadmap-stages article'));
        const rows=Array.from(servicesSection.querySelectorAll<HTMLElement>('.roadmap-row'));
        const rings=Array.from(servicesSection.querySelectorAll<HTMLElement>('.roadmap-node > span'));
        const titleLines=Array.from(servicesSection.querySelectorAll<HTMLElement>('.roadmap-title-line'));
        gsap.set(pipeline,{strokeDasharray:pathLength,strokeDashoffset:pathLength});
        gsap.set('.roadmap-head > span',{autoAlpha:0,letterSpacing:'.55em',y:16});
        gsap.set(titleLines,{autoAlpha:0,y:28,filter:'blur(5px)'});
        gsap.set(stages,{autoAlpha:.22,x:-24});
        gsap.set(nodes,{autoAlpha:.16,y:20,scale:.9});
        gsap.set(rings,{'--ring-progress':'0%'});
        gsap.set('.roadmap-impact-node',{autoAlpha:0,x:-18});
        const serviceTimeline=gsap.timeline({scrollTrigger:{trigger:servicesSection,start:'top 70%',end:'bottom bottom',scrub:.5,invalidateOnRefresh:true}});
        serviceTimeline
          .to(servicesSection,{y:0,duration:.01},0)
          .to('.roadmap-head > span',{autoAlpha:1,letterSpacing:'.28em',y:0,duration:.11,ease:'power2.out'},0)
          .to(titleLines,{autoAlpha:1,y:0,filter:'blur(0px)',duration:.16,stagger:.045,ease:'power3.out'},.035)
          .to(pipeline,{strokeDashoffset:0,duration:.76,ease:'none'},.15);
        const nodeTimes=[.25,.34,.45,.55,.65,.76,.84];
        const orderedNodes=[nodes[0],nodes[1],nodes[4],nodes[3],nodes[2],nodes[5],nodes[6]].filter(Boolean);
        orderedNodes.forEach((node,index)=>{
          const ring=node.querySelector<HTMLElement>(':scope > span');
          if(ring) serviceTimeline.to(ring,{'--ring-progress':'100%',duration:.085,ease:'none'},nodeTimes[index]-.025);
          serviceTimeline.to(node,{autoAlpha:1,y:0,scale:1,duration:.075,ease:'back.out(1.5)'},nodeTimes[index]);
          const row=node.closest('.roadmap-row');
          const stageIndex=row?rows.indexOf(row as HTMLElement):index;
          if(stages[stageIndex]) serviceTimeline.to(stages[stageIndex],{autoAlpha:1,x:0,duration:.1,ease:'power2.out'},nodeTimes[index]-.035);
        });
        serviceTimeline.to('.roadmap-impact-node',{autoAlpha:1,x:0,duration:.12,ease:'power3.out'},.88);
      }

      const impactSection=document.querySelector<HTMLElement>('.impact-studio');
      if(impactSection){
        const cards=Array.from(impactSection.querySelectorAll<HTMLElement>('.impact-card'));
        const springSvg=impactSection.querySelector<SVGSVGElement>('.spring-svg');
        const springPath=impactSection.querySelector<SVGPathElement>('.spring-path');
        const timelineLine=impactSection.querySelector<SVGGeometryElement>('.timeline-line');
        const awardRing=impactSection.querySelector<SVGGeometryElement>('.award-ring');
        const chartLine=impactSection.querySelector<SVGGeometryElement>('.chart-line');
        const timelineDots=impactSection.querySelectorAll<SVGElement>('.timeline-dot');
        const avatars=impactSection.querySelectorAll<SVGGElement>('.user-avatar');
        const trophy=impactSection.querySelector<SVGGElement>('.award-trophy');
        const plus=impactSection.querySelector<SVGGElement>('.users-plus');
        const count=impactSection.querySelector<SVGTextElement>('.conversion-number');
        const projectsLine=impactSection.querySelector<SVGGeometryElement>('.projects-line');
        const projectsArea=impactSection.querySelector<SVGElement>('.projects-area');
        const projectsPoints=impactSection.querySelectorAll<SVGElement>('.projects-points circle, .projects-end');
        const mapLand=impactSection.querySelector<SVGElement>('.map-land');
        const mapPins=impactSection.querySelectorAll<SVGGElement>('.map-pin');
        const growthLine=impactSection.querySelector<SVGGeometryElement>('.growth-line');
        const growthArrow=impactSection.querySelector<SVGElement>('.growth-arrow');
        const growthGuide=impactSection.querySelector<SVGElement>('.growth-guide');
        const budgetRing=impactSection.querySelector<SVGElement>('.budget-ring');
        const budgetCount=impactSection.querySelector<SVGTextElement>('.budget-count');
        const budgetLegend=impactSection.querySelector<SVGGElement>('.budget-legend');
        const lastImpactCard=cards[cards.length-1];
        gsap.set(impactSection,{'--impact-title-opacity':0,'--impact-title-y':'72px','--impact-title-blur':'14px','--impact-title-lightness':'38%'});
        gsap.to(impactSection,{'--impact-title-opacity':1,'--impact-title-y':'0px','--impact-title-blur':'0px','--impact-title-lightness':'94%',ease:'none',scrollTrigger:{trigger:impactSection,start:'top 92%',end:'top 50%',scrub:1.05,invalidateOnRefresh:true}});
        if(lastImpactCard){
          const stackedCardBottom=()=>parseFloat(getComputedStyle(lastImpactCard).top)+lastImpactCard.offsetHeight;
          gsap.fromTo(impactSection,{'--impact-title-opacity':1,'--impact-title-y':'0px','--impact-title-blur':'0px'},{'--impact-title-opacity':0,'--impact-title-y':'-120px','--impact-title-blur':'6px',immediateRender:false,ease:'none',scrollTrigger:{
            trigger:impactSection,
            // Keep the title intact until the final sticky card has joined the
            // stack. It exits only when the section boundary starts pushing the
            // completed stack upward.
            start:()=>`bottom ${stackedCardBottom()}px`,
            end:()=>`bottom ${Math.max(0,stackedCardBottom()-220)}px`,
            scrub:1.05,
            invalidateOnRefresh:true
          }});
        }
        if(springPath){
          const springLength=springPath.getTotalLength();
          const fourthCard=cards[Math.min(3,cards.length-1)]||impactSection;
          const fifthCard=cards[Math.min(4,cards.length-1)]||fourthCard;
          // Use a gap longer than the full path so a second repeated SVG dash can
          // never re-enter from the top while the first dash is being removed.
          gsap.set(springPath,{strokeDasharray:`${springLength} ${springLength*2}`,strokeDashoffset:springLength});
          if(springSvg)gsap.set(springSvg,{autoAlpha:1,scale:1,clipPath:'none',transformOrigin:'50% 50%'});
          // Draw from the path's first point to its last point.
          gsap.to(springPath,{strokeDashoffset:0,ease:'none',scrollTrigger:{trigger:cards[0],start:'top 68%',endTrigger:fourthCard,end:'top 32%',scrub:1.25,invalidateOnRefresh:true}});
          // Remove it from that same first point, following the identical Bézier
          // geometry instead of cutting the SVG with a rectangular mask.
          gsap.fromTo(springPath,{strokeDashoffset:0},{strokeDashoffset:-springLength,immediateRender:false,ease:'none',scrollTrigger:{trigger:fifthCard,start:'top 78%',endTrigger:impactSection,end:'bottom top',scrub:1.5,invalidateOnRefresh:true}});
        }
        [timelineLine,awardRing,chartLine,projectsLine,growthLine].forEach(path=>{if(!path)return;const length=path.getTotalLength();gsap.set(path,{strokeDasharray:length,strokeDashoffset:length})});
        gsap.set(projectsArea,{autoAlpha:0});
        gsap.set(projectsPoints,{autoAlpha:0,scale:0,transformOrigin:'center'});
        gsap.set(mapLand,{autoAlpha:.15});
        gsap.set(mapPins,{autoAlpha:0,scale:0,transformOrigin:'center'});
        gsap.set(growthArrow,{autoAlpha:0,scale:.5,transformOrigin:'center'});
        gsap.set(growthGuide,{autoAlpha:0});
        gsap.set(budgetRing,{strokeDasharray:'0 100'});
        gsap.set([budgetCount,budgetLegend],{autoAlpha:0,y:8});
        gsap.set(timelineDots,{autoAlpha:0,scale:0,transformOrigin:'center'});
        gsap.set(avatars,{autoAlpha:0,x:-18,scale:.82,transformOrigin:'center'});
        gsap.set(trophy,{autoAlpha:0,y:12,transformOrigin:'center'});
        gsap.set(plus,{scale:.82,transformOrigin:'center'});
        if(count) count.textContent='24%';
        cards.forEach(card=>gsap.fromTo(card,{y:70},{y:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:card,start:'top 68%',end:'top 36%',scrub:.7,invalidateOnRefresh:true}}));
        const artTimeline=(card:HTMLElement,end='top 12%')=>gsap.timeline({scrollTrigger:{trigger:card,start:'top 70%',end,scrub:.9,invalidateOnRefresh:true}});
        const projectsTl=artTimeline(cards[0]);
        if(projectsLine)projectsTl.to(projectsLine,{strokeDashoffset:0,duration:.65,ease:'power2.inOut'},0);
        projectsTl.to(projectsArea,{autoAlpha:1,duration:.35},.22).to(projectsPoints,{autoAlpha:1,scale:1,duration:.24,stagger:.08,ease:'back.out(2)'},.34);
        artTimeline(cards[1]).to(mapLand,{autoAlpha:.9,duration:.45},0).to(mapPins,{autoAlpha:1,scale:1,duration:.3,stagger:.1,ease:'back.out(2.2)'},.18);
        const growthTl=artTimeline(cards[2]);
        if(growthLine)growthTl.to(growthLine,{strokeDashoffset:0,duration:.7,ease:'power2.inOut'},0);
        growthTl.to(growthGuide,{autoAlpha:1,duration:.25},.45).to(growthArrow,{autoAlpha:1,scale:1,duration:.28,ease:'back.out(2)'},.54);
        const timelineTl=artTimeline(cards[3]);
        if(timelineLine)timelineTl.to(timelineLine,{strokeDashoffset:0,duration:.65,ease:'power2.inOut'},0);
        timelineTl.to(timelineDots,{autoAlpha:1,scale:1,duration:.24,stagger:.07,ease:'back.out(2)'},.25);
        const awardTl=artTimeline(cards[4]);
        if(awardRing)awardTl.to(awardRing,{strokeDashoffset:0,duration:.65,ease:'power2.inOut'},0);
        if(trophy)awardTl.to(trophy,{autoAlpha:1,y:0,duration:.4,ease:'back.out(1.6)'},.22);
        artTimeline(cards[5]).to(avatars,{autoAlpha:1,x:0,scale:1,duration:.3,stagger:.07,ease:'back.out(1.8)'},0).to(plus,{scale:1.1,duration:.18,ease:'power2.out'},.45).to(plus,{scale:1,duration:.28,ease:'elastic.out(1,.5)'},.6);
        // The final card sticks near 26% of the viewport. Finish its artwork
        // before that point so the completed state is visible while it holds.
        artTimeline(cards[6],'top 30%').to(budgetRing,{strokeDasharray:'24 76',duration:.65,ease:'power2.inOut'},0).to([budgetCount,budgetLegend],{autoAlpha:1,y:0,duration:.35,stagger:.1},.3);
        cards.slice(0,-1).forEach((card,index)=>{
          const nextCard=cards[index+1];
          gsap.to(card,{
            scale:.96,
            ease:'none',
            scrollTrigger:{
              trigger:nextCard,
              start:'top 78%',
              end:'top 18%',
              scrub:.65,
              invalidateOnRefresh:true
            }
          });
        });
      }

      const trustedSection=document.querySelector<HTMLElement>('.trusted-companies');
      const trustedHeading=trustedSection?.querySelector<HTMLElement>('#trusted-companies-title');
      const trustedHeart=trustedSection?.querySelector<SVGElement>('.trusted-heart');
      const trustedBridge=trustedSection?.querySelector<SVGPathElement>('.trusted-bridge path');
      const trustedWords=trustedHeading?Array.from(trustedHeading.querySelectorAll<HTMLElement>('span')):[];
      const trustedHeartPaths=trustedHeart?Array.from(trustedHeart.querySelectorAll<SVGPathElement>('path')):[];
      const trustedCards=trustedSection?Array.from(trustedSection.querySelectorAll<HTMLElement>('.trusted-company-card')):[];
      const departingBudgetRing=document.querySelector<SVGElement>('.impact-card:last-child .budget-ring');
      if(trustedSection&&trustedHeading){
        if(trustedBridge){const length=trustedBridge.getTotalLength();gsap.set(trustedBridge,{strokeDasharray:length,strokeDashoffset:length})}
        trustedHeartPaths.forEach(path=>{const length=path.getTotalLength();gsap.set(path,{strokeDasharray:length,strokeDashoffset:length})});
        gsap.set(trustedHeading,{y:48});
        gsap.set(trustedWords,{y:34,autoAlpha:0,filter:'blur(12px)'});
        if(trustedHeart)gsap.set(trustedHeart,{y:18,scale:.78,rotation:-18,transformOrigin:'50% 50%'});
        gsap.set(trustedCards,{y:(index)=>index%2===0?84:112,scale:.94,autoAlpha:0,filter:'blur(9px)',transformOrigin:'50% 100%'});
        const trustedTimeline=gsap.timeline({scrollTrigger:{trigger:trustedSection,start:'top 94%',end:'top 42%',scrub:1.05,invalidateOnRefresh:true}});
        if(departingBudgetRing)trustedTimeline.to(departingBudgetRing,{strokeDasharray:'0 100',rotation:95,transformOrigin:'50% 50%',duration:.24,ease:'power2.in'},0);
        if(trustedBridge)trustedTimeline.to(trustedBridge,{strokeDashoffset:0,duration:.5,ease:'power2.inOut'},0);
        if(trustedHeart)trustedTimeline.to(trustedHeart,{y:0,scale:1,rotation:-4,duration:.42,ease:'power2.out'},.3);
        if(trustedHeartPaths.length)trustedTimeline.to(trustedHeartPaths,{strokeDashoffset:0,duration:.75,stagger:.12,ease:'none'},.38);
        trustedTimeline
          .to(trustedHeading,{y:0,duration:.36,ease:'power2.out'},.78)
          .to(trustedWords,{y:0,autoAlpha:1,filter:'blur(0px)',duration:.34,stagger:.065,ease:'power2.out'},.82)
          .to(trustedCards,{y:0,scale:1,autoAlpha:1,filter:'blur(0px)',duration:.55,stagger:{each:.05,grid:[2,6],from:'start'},ease:'power3.out'},1.12);
      }

      const workSection=document.querySelector<HTMLElement>('.swiss-work');
      const workSticky=workSection?.querySelector<HTMLElement>('.work-horizontal-sticky');
      const projectViewport=workSection?.querySelector<HTMLElement>('.work-project-viewport');
      const projectTrack=workSection?.querySelector<HTMLElement>('.project-track');
      const workDarkLayer=workSection?.querySelector<HTMLElement>('.work-dark-layer');
      const workIntro=workSection?.querySelector<HTMLElement>('.work-intro-panel');
      const workTitleChars=workIntro?Array.from(workIntro.querySelectorAll<HTMLElement>('.work-title-char')):[];
      const workProjectsLink=workIntro?.querySelector<HTMLElement>('.work-projects-link');
      const projectCards=projectTrack?Array.from(projectTrack.querySelectorAll<HTMLElement>('.project-card')):[];
      const workCollectionPanel=projectTrack?.querySelector<HTMLElement>('.work-collection-panel');
      const workCapabilitiesPanel=workSection?.querySelector<HTMLElement>('.work-capabilities-panel');
      if(workSection&&workSticky){
        gsap.set(workSticky,{'--work-line-progress':0,'--work-plus-rotation':'0deg'});
        gsap.to(workSticky,{'--work-line-progress':1,'--work-plus-rotation':'540deg',ease:'none',scrollTrigger:{trigger:workSection,start:'top 80%',end:'top 42%',scrub:1.25,invalidateOnRefresh:true}});
      }
      if(workSection&&workTitleChars.length){
        const scatterX=[-90,62,-48,84,-72,38,-64,91,-34,58,-76,46];
        const scatterY=[-58,74,46,-68,82,-44,62,-76,38,70,-52,56];
        gsap.set(workTitleChars,{x:(index)=>scatterX[index%scatterX.length],y:(index)=>scatterY[index%scatterY.length],rotation:(index)=>index%2===0?-7:6,autoAlpha:.08,filter:'blur(13px)'});
        if(workProjectsLink)gsap.set(workProjectsLink,{y:28,autoAlpha:0,filter:'blur(6px)'});
        const workIntroTimeline=gsap.timeline({scrollTrigger:{trigger:workSection,start:'top 76%',end:'top 16%',scrub:1.55,invalidateOnRefresh:true}});
        workIntroTimeline.to(workTitleChars,{x:0,y:0,rotation:0,autoAlpha:1,filter:'blur(0px)',duration:.9,stagger:{each:.038,from:'random'},ease:'power2.out'},0);
        if(workProjectsLink)workIntroTimeline.to(workProjectsLink,{y:0,autoAlpha:1,filter:'blur(0px)',duration:.34,ease:'power2.out'},.78);
      }
      if(workSection&&projectViewport&&projectTrack&&workIntro&&window.matchMedia('(min-width: 761px)').matches){
        gsap.set(projectCards.slice(1),{y:()=>window.innerHeight*.68,force3D:true});
        if(workCollectionPanel)gsap.set(workCollectionPanel,{y:0,autoAlpha:1,force3D:true});
        if(workCapabilitiesPanel)gsap.set(workCapabilitiesPanel,{y:0,autoAlpha:1,force3D:true});
        const workTimeline=gsap.timeline({scrollTrigger:{trigger:workSection,start:'top top',end:'bottom bottom',scrub:1.8,invalidateOnRefresh:true}});
        workTimeline.to([projectTrack,workIntro],{
          x:()=>-Math.max(0,projectTrack.scrollWidth-projectViewport.clientWidth),
          duration:.82,
          ease:'none',
          force3D:true
        },0);
        projectCards.slice(1).forEach((card,index)=>{
          workTimeline.to(card,{y:0,duration:.24,ease:'none',force3D:true},.04+index*.17);
        });
        if(workDarkLayer){
          workTimeline.to(workDarkLayer,{
            x:()=>-window.innerWidth,
            duration:.2,
            ease:'none',
            force3D:true
          },.62);
        }
      }

      const revealGroups=[
        {trigger:'.swiss-insights',items:'.swiss-insights > *',stagger:.1},
        {trigger:'.swiss-contact',items:'.swiss-contact > *',stagger:.11},
        {trigger:'.swiss-footer',items:'.swiss-footer > *',stagger:.08}
      ];
      const observers:IntersectionObserver[]=[];
      revealGroups.forEach(group=>{
        const trigger=document.querySelector<HTMLElement>(group.trigger);
        if(!trigger)return;
        const items=Array.from(document.querySelectorAll<HTMLElement>(group.items));
        if(!items.length)return;
        gsap.set(items,{y:46,autoAlpha:0,filter:'blur(7px)'});
        const observer=new IntersectionObserver(entries=>{
          if(!entries.some(entry=>entry.isIntersecting))return;
          gsap.to(items,{y:0,autoAlpha:1,filter:'blur(0px)',duration:.82,stagger:group.stagger,ease:'power3.out',overwrite:true});
          observer.disconnect();
        },{threshold:.12,rootMargin:'0px 0px -8% 0px'});
        observer.observe(trigger);
        observers.push(observer);
      });
      cleanups.push(()=>observers.forEach(observer=>observer.disconnect()));
      requestAnimationFrame(()=>ScrollTrigger.refresh());
    },document.body);
    return()=>{cleanups.forEach(cleanup=>cleanup());ctx.revert();hero.classList.remove('hero-motion-ready');window.history.scrollRestoration=previousScrollRestoration};
  },[]);
  return null;
}
