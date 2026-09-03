'use client';

import {useEffect,useRef,useState} from 'react';

// Slide-in "Start a project" enquiry drawer. Opens when any trigger is clicked:
// the header Contact CTA (a[href="#contact"]), the contact marquee, or any
// element marked with [data-start-project]. Kept always-mounted so the panel
// can transition in/out purely via the .is-open class.
export default function StartProjectDrawer(){
 const [open,setOpen]=useState(false);
 const [sent,setSent]=useState(false);
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
  // Front-end only for now — swap this for a POST to your enquiry endpoint.
  setSent(true);
 };

 return (
  <div className={`start-project-root${open?' is-open':''}`} aria-hidden={!open}>
   <div className="start-project-backdrop" onClick={close}/>
   <div className="start-project-info" aria-hidden="true">
    <div className="start-project-info-cell">
     <b>Mail</b>
     <a href="mailto:hello@ampliga.com">hello@<br/>ampliga.com</a>
    </div>
    <div className="start-project-info-cell">
     <b>Social</b>
     <a href="https://instagram.com/ampliga" target="_blank" rel="noreferrer">Instagram<br/>@ampliga</a>
    </div>
    <div className="start-project-info-cell">
     <b>Office</b>
     <span>Gurugram,<br/>India</span>
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
     <form className="start-project-form" onSubmit={submit} noValidate={false}>
      <header className="start-project-head">
       <h2>Start a Project</h2>
      </header>

      <section className="start-project-section">
       <div className="start-project-section-head">
        <span className="start-project-eyebrow">Contact details</span>
        <span className="start-project-step">01</span>
       </div>
       <p className="start-project-hint">How can we contact you?</p>
       <div className="start-project-grid">
        <input ref={firstFieldRef} name="name" type="text" placeholder="Your name*" required autoComplete="name"/>
        <input name="company" type="text" placeholder="Company name*" required autoComplete="organization"/>
        <input name="email" type="email" placeholder="Email address*" required autoComplete="email"/>
        <input name="mobile" type="tel" placeholder="Mobile number*" required autoComplete="tel"/>
       </div>
      </section>

      <section className="start-project-section">
       <div className="start-project-section-head">
        <span className="start-project-eyebrow">Project information</span>
        <span className="start-project-step">02</span>
       </div>
       <p className="start-project-hint">Tell us more about your project.</p>
       <textarea name="project" placeholder="Tell us more about your project…*" required rows={6}/>
      </section>

      <div className="start-project-actions">
       <button type="submit" className="start-project-submit">Submit Enquiry</button>
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
