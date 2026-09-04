'use client';

import {useEffect,useRef,useState} from 'react';

// Slide-in "Start a project" enquiry drawer. Opens when any trigger is clicked:
// the header Contact CTA (a[href="#contact"]), the contact marquee, or any
// element marked with [data-start-project]. Kept always-mounted so the panel
// can transition in/out purely via the .is-open class.
export default function StartProjectDrawer(){
 const [open,setOpen]=useState(false);
 const [sent,setSent]=useState(false);
 const [errors,setErrors]=useState<Record<string,string>>({});
 const panelRef=useRef<HTMLDivElement>(null);
 const firstFieldRef=useRef<HTMLInputElement>(null);

 useEffect(()=>{
  const onClick=(event:MouseEvent)=>{
   const target=event.target as HTMLElement|null;
   const trigger=target?.closest('[data-start-project], .swiss-header a[href="#contact"], .contact-marquee');
   if(!trigger)return;
   event.preventDefault();
   setOpen(true);
  };
  document.addEventListener('click',onClick,true);
  return()=>document.removeEventListener('click',onClick,true);
 },[]);

 useEffect(()=>{
  if(!open)return;
  const onKey=(event:KeyboardEvent)=>{if(event.key==='Escape')setOpen(false)};
  document.addEventListener('keydown',onKey);
  const previousOverflow=document.body.style.overflow;
  document.body.style.overflow='hidden';
  const focusTimer=window.setTimeout(()=>firstFieldRef.current?.focus(),320);
  return()=>{
   document.removeEventListener('keydown',onKey);
   document.body.style.overflow=previousOverflow;
   window.clearTimeout(focusTimer);
  };
 },[open]);

 const close=()=>setOpen(false);
 const submit=(event:React.FormEvent<HTMLFormElement>)=>{
  event.preventDefault();
  const data=new FormData(event.currentTarget);
  const value=(name:string)=>String(data.get(name)??'').trim();
  const nextErrors:Record<string,string>={};
  if(!value('name'))nextErrors.name='Enter your full name';
  const email=value('email');
  if(!email||!/^\S+@\S+\.\S+$/.test(email))nextErrors.email='Enter a valid email';
  if(!value('service'))nextErrors.service='Select a service';
  if(value('project').length<20)nextErrors.project='Minimum 20 characters';
  if(!value('budget'))nextErrors.budget='Select a budget';
  if(Object.keys(nextErrors).length){setErrors(nextErrors);return}
  setErrors({});
  // Front-end only for now — swap this for a POST to your enquiry endpoint.
  setSent(true);
 };
 const clearError=(field:string)=>{if(errors[field])setErrors(current=>{const next={...current};delete next[field];return next})};

 return (
  <div className={`start-project-root${open?' is-open':''}`} aria-hidden={!open}>
   <div className="start-project-backdrop" onClick={close}/>
   <div className="start-project-info" aria-hidden="true">
    <div className="start-project-info-cell">
     <b>Mail</b>
     <a href="mailto:hello@ampliga.com">hello@<br/>ampliga.com</a>
    </div>
    <div className="start-project-info-cell">
     <b>Phone</b>
     <a href="tel:+919000000000">+91<br/>90000 00000</a>
    </div>
   </div>
   <aside
    className="start-project-drawer"
    role="dialog"
    aria-modal="true"
    aria-label="Start a project"
    ref={panelRef}
   >
    <button type="button" className="start-project-close" onClick={close} aria-label="Close">
     <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
    </button>

    {sent?(
     <div className="start-project-success" role="status">
      <span className="start-project-success-mark" aria-hidden="true">
       <svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
      </span>
      <h2>Enquiry sent</h2>
      <p>Thanks for reaching out — we&apos;ll get back to you within one working day.</p>
      <button type="button" className="start-project-submit" onClick={close}>Close</button>
     </div>
    ):(
     <form className="start-project-form" onSubmit={submit} noValidate>
      <header className="start-project-head">
       <h2>Let&apos;s build something great.</h2>
       <p>Tell us about your project, we usually<br/>reply within one business day.</p>
      </header>

      <section className="start-project-section">
       <div className="start-project-grid">
        <label className={`start-project-field${errors.name?' has-error':''}`}><span>Full Name *</span>{errors.name&&<b>{errors.name}</b>}<input ref={firstFieldRef} name="name" type="text" placeholder="Full Name" onChange={()=>clearError('name')} aria-invalid={Boolean(errors.name)} autoComplete="name"/></label>
        <label className={`start-project-field${errors.email?' has-error':''}`}><span>Email address *</span>{errors.email&&<b>{errors.email}</b>}<input name="email" type="email" placeholder="Email address" onChange={()=>clearError('email')} aria-invalid={Boolean(errors.email)} autoComplete="email"/></label>
        <input name="company" type="text" placeholder="Company / Website name" autoComplete="organization"/>
        <label className={`start-project-field${errors.service?' has-error':''}`}><span>Service *</span>{errors.service&&<b>{errors.service}</b>}<select name="service" defaultValue="" onChange={()=>clearError('service')} aria-invalid={Boolean(errors.service)} aria-label="Select a service">
         <option value="" disabled>Select a service</option>
         <option>Brand Strategy</option><option>Product Development</option><option>AI &amp; Automation</option><option>Digital Marketing</option><option>E-commerce Solutions</option><option>Content &amp; Creative Studio</option>
        </select></label>
        <label className={`start-project-field${errors.project?' has-error':''}`}><span>Project details *</span>{errors.project&&<b>{errors.project}</b>}<textarea name="project" placeholder="Share a little about your goals, timeline, and requirements…" onChange={()=>clearError('project')} aria-invalid={Boolean(errors.project)} rows={5}/></label>
        <label className={`start-project-field${errors.budget?' has-error':''}`}><span>Estimated budget *</span>{errors.budget&&<b>{errors.budget}</b>}<select name="budget" defaultValue="" onChange={()=>clearError('budget')} aria-invalid={Boolean(errors.budget)} aria-label="Select your estimated budget">
         <option value="" disabled>Select your estimated budget</option>
         <option>Under ₹1 lakh</option><option>₹1–3 lakh</option><option>₹3–7 lakh</option><option>₹7–15 lakh</option><option>₹15 lakh+</option>
        </select></label>
       </div>
      </section>

      <div className="start-project-actions">
       <button type="submit" className="start-project-submit"><span>Send inquiry</span><b aria-hidden="true">→</b></button>
      </div>

      <div className="start-project-or"><span>OR</span></div>

      <a className="start-project-book" href="https://cal.com/ampliga/30min" target="_blank" rel="noreferrer">
       <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/><circle cx="12" cy="15" r="2.4"/><path d="M12 13.4V15l1 1"/></svg>
       <span>Book a 30-minute call</span>
      </a>

      <p className="start-project-email">Prefer email? <a href="mailto:hello@ampliga.com">hello@ampliga.com</a></p>
     </form>
    )}
   </aside>
  </div>
 );
}
