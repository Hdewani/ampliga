'use client';

import {useEffect,useRef} from 'react';

const testimonials=[
 {quote:'We are delighted to inform you that we are quite happy and impressed with excellent services you have provided to us in developing our website. Keep up the good work. Wishing you success in all your endeavours.',name:'Bhoop Singh Vijayran',role:'Plant Head, SPRA Automotive Pvt. Ltd',initials:'BV'},
 {quote:'Ampliga team is very friendly, client oriented & they understood our requirements very well. Happy to be associated for our website design services. Wishing you guys great future.',name:'Sanjay Arora',role:'Director, JSR Kapital',initials:'SA'},
 {quote:'Outstanding job! The team excels at grasping and meeting requirements promptly. They consistently deliver on short notice with impressive efficiency. Keep up the excellent work, Team. It’s been a pleasure working with you.',name:'Sanyukta Chawdhary',role:'Program Manager, Finnew Solutions Private Limited',initials:'SC'}
];

export default function PartnerTestimonials(){
 const canvasRef=useRef<HTMLCanvasElement>(null);
 useEffect(()=>{
  const canvas=canvasRef.current;
  const section=canvas?.closest<HTMLElement>('.partner-testimonials');
  const context=canvas?.getContext('2d');
  if(!canvas||!section||!context)return;
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let width=0,height=0,dpr=1,frame=0,start=performance.now();
  let pointerX=.5,pointerY=.5,targetX=.5,targetY=.5;
  const resize=()=>{
   const rect=section.getBoundingClientRect();
   width=rect.width;height=rect.height;dpr=Math.min(window.devicePixelRatio||1,2);
   canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
   canvas.style.width=`${width}px`;canvas.style.height=`${height}px`;
   context.setTransform(dpr,0,0,dpr,0,0);
  };
  const move=(event:PointerEvent)=>{const rect=section.getBoundingClientRect();targetX=(event.clientX-rect.left)/rect.width;targetY=(event.clientY-rect.top)/rect.height};
  const leave=()=>{targetX=.5;targetY=.5};
  const draw=(time:number)=>{
   pointerX+=(targetX-pointerX)*.035;pointerY+=(targetY-pointerY)*.035;
   context.clearRect(0,0,width,height);
   const spacing=28;
   const pulse=reduceMotion?0:Math.sin((time-start)*.00055)*.12;
   const driftX=(pointerX-.5)*10,driftY=(pointerY-.5)*8;
   for(let y=-spacing;y<height+spacing;y+=spacing){
    for(let x=-spacing;x<width+spacing;x+=spacing){
     const px=x+driftX+Math.sin(y*.012+(time-start)*.00012)*2;
     const py=y+driftY+Math.cos(x*.011+(time-start)*.0001)*2;
     const dx=px-width*.5,dy=py-height*.5;
     const depth=Math.max(.16,1-Math.hypot(dx,dy)/Math.max(width,height));
     context.beginPath();context.arc(px,py,.65+depth*(.42+pulse),0,Math.PI*2);
     context.fillStyle=`rgba(60,60,60,${.06+depth*.12})`;context.fill();
    }
   }
   if(!reduceMotion)frame=requestAnimationFrame(draw);
  };
  resize();draw(performance.now());
  window.addEventListener('resize',resize);section.addEventListener('pointermove',move);section.addEventListener('pointerleave',leave);
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('resize',resize);section.removeEventListener('pointermove',move);section.removeEventListener('pointerleave',leave)};
 },[]);
 return <section className="partner-testimonials" aria-labelledby="partner-testimonials-title">
  <canvas ref={canvasRef} className="partner-testimonials-canvas" aria-hidden="true"/>
  <div className="partner-testimonials-center">
   <span className="partner-testimonials-label"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14v10H9l-4 4V5Z"/><path d="M8 9h8M8 12h5"/></svg>Partner Experiences</span>
   <h2 id="partner-testimonials-title"><em><span>Hear From</span><b>the Teams</b></em><span>We&apos;ve Partnered With</span></h2>
  </div>
  <div className="partner-testimonials-grid">{testimonials.map((item,index)=><article className={`partner-testimonial-card partner-testimonial-card-${index+1}`} key={item.name}>
   <blockquote>{item.quote}</blockquote><footer><span aria-hidden="true">{item.initials}</span><div><strong>{item.name}</strong><small>{item.role}</small></div></footer>
  </article>)}</div>
 </section>;
}
