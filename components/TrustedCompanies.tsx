'use client';

import Image from 'next/image';
import {useEffect,useRef,useState} from 'react';

const companies=[
 {name:'Ardor',logo:'/logos/transparent/01.png'},
 {name:'SR Fincorp',logo:'/logos/transparent/02.png'},
 {name:'Medvante',logo:'/logos/transparent/03.png'},
 {name:'NiyoX',logo:'/logos/transparent/04.png'},
 {name:'Induskart',logo:'/logos/transparent/05.png'},
 {name:'My Pankhuri',logo:'/logos/transparent/06.png'},
 {name:'Mrigaya',logo:'/logos/transparent/07.png'},
 {name:'Monaris',logo:'/logos/transparent/08.png'},
 {name:'Bizfinn',logo:'/logos/transparent/09.png'},
 {name:'Lawyered',logo:'/logos/transparent/10.png'},
 {name:'Fit Family',logo:'/logos/transparent/11.png'},
 {name:'Trade Ghar',logo:'/logos/transparent/12.png'},
 {name:'Isotech India',logo:'/logos/transparent/20.png'},
 {name:'EnergyExp',logo:'/logos/transparent/21.png'},
 {name:'Library of Joy',logo:'/logos/transparent/22.png'},
 {name:'HNM Realtors',logo:'/logos/transparent/23.png'},
 {name:'Fundz360',logo:'/logos/transparent/24.png'},
 {name:'Ecolink',logo:'/logos/transparent/25.png'},
 {name:'Consumer Mitra',logo:'/logos/transparent/26.png'}
];

type LogoPhase='idle'|'out'|'in';

function CompanyCard({slot,companyIndex,phase,onHover}:{slot:number;companyIndex:number;phase:LogoPhase;onHover:(slot:number,hovered:boolean)=>void}){
 const company=companies[companyIndex];
 return <article className={`trusted-company-card trusted-logo-${phase}`} onMouseEnter={()=>onHover(slot,true)} onMouseLeave={()=>onHover(slot,false)} onFocus={()=>onHover(slot,true)} onBlur={()=>onHover(slot,false)} tabIndex={0} aria-label={company.name}>
  <div className="trusted-company-logo"><Image src={company.logo} alt="" width={260} height={120}/></div>
  <span>{company.name}</span>
 </article>;
}

export default function TrustedCompanies(){
 const [companyIndices,setCompanyIndices]=useState(()=>Array.from({length:12},(_,slot)=>slot));
 const [phases,setPhases]=useState<LogoPhase[]>(()=>Array.from({length:12},()=>'idle'));
 const indicesRef=useRef(companyIndices);
 const hoveredRef=useRef<boolean[]>(Array.from({length:12},()=>false));
 const handleHover=(slot:number,hovered:boolean)=>{hoveredRef.current[slot]=hovered};

 useEffect(()=>{
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  let cancelled=false;
  const timers:Array<ReturnType<typeof setTimeout>>=[];
  let order:Array<number>=[];
  const shuffledOrder=()=>Array.from({length:12},(_,index)=>index).sort(()=>Math.random()-.5);
  const nextSlot=()=>{
   if(!order.length)order=shuffledOrder();
   let slot=order.shift()!;
   let attempts=0;
   while(hoveredRef.current[slot]&&attempts<12){order.push(slot);slot=order.shift()!;attempts++}
   return slot;
  };
  const setSlotPhase=(slot:number,phase:LogoPhase)=>setPhases(current=>current.map((value,index)=>index===slot?phase:value));
  const schedule=()=>{
   timers.push(setTimeout(()=>{
    if(cancelled)return;
    const slot=nextSlot();
    setSlotPhase(slot,'out');
    timers.push(setTimeout(()=>{
     if(cancelled)return;
     const used=new Set(indicesRef.current);
     let next=(indicesRef.current[slot]+7)%companies.length;
     while(used.has(next))next=(next+1)%companies.length;
     const updated=indicesRef.current.map((value,index)=>index===slot?next:value);
     indicesRef.current=updated;
     setCompanyIndices(updated);
     setSlotPhase(slot,'in');
     timers.push(setTimeout(()=>{if(!cancelled){setSlotPhase(slot,'idle');schedule()}},620));
    },380));
   },10000));
  };
  schedule();
  return()=>{cancelled=true;timers.forEach(clearTimeout)};
 },[]);

 return <section className="trusted-companies" aria-labelledby="trusted-companies-title">
  <svg className="trusted-bridge" viewBox="0 0 880 300" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d="M440 0C440 72 360 82 374 150C386 210 440 217 440 292"/></svg>
  <header><svg className="trusted-heart" viewBox="0 0 72 62" fill="none" aria-hidden="true"><path d="M36 55C31 50 10 37 10 21C10 10 24 7 30 15C33 18 35 22 36 26C37 22 39 18 42 15C48 7 62 10 62 21C62 37 41 50 36 55Z"/></svg><h2 id="trusted-companies-title">{['Loved','and','trusted','by','great','companies'].map(word=><span key={word}>{word}</span>)}</h2></header>
  <div className="trusted-companies-grid">{companyIndices.map((companyIndex,slot)=><CompanyCard slot={slot} companyIndex={companyIndex} phase={phases[slot]} onHover={handleHover} key={slot}/>)}</div>
 </section>;
}
