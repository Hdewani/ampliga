'use client';

import {useEffect,useRef,useState} from 'react';
import type {getCalApi} from '@calcom/embed-react';

// "Book a 30-minute call" opens the Cal.com booker in a modal over the drawer
// instead of handing the visitor off to a new tab. The embed is imported
// dynamically the first time the drawer opens, so its script never lands in the
// bundle of visitors who don't open the enquiry panel. The <a> keeps a real
// href: if the embed fails to load, the click just opens cal.com as before.
const CAL_LINK='ampliga/30min';
const CAL_NAMESPACE='ampliga-30min';

// Enquiries go to FormSubmit (https://formsubmit.co). We post to their /ajax/
// endpoint rather than using a plain form action, because a native POST would
// navigate away to FormSubmit's own thank-you page and throw away the drawer's
// success state. The AJAX endpoint is CORS-enabled and answers with JSON.
//
// NOTE: FormSubmit needs a one-time activation -- the first submission sends a
// confirmation link to this address, and nothing is delivered until it is
// clicked. Swap the address here to change where enquiries land.
const FORM_ENDPOINT='https://formsubmit.co/ajax/hello@ampliga.com';

// Slide-in "Start a project" enquiry drawer. Opens when any trigger is clicked:
// the header Contact CTA (a[href="#contact"]), the contact marquee, or any
// element marked with [data-start-project]. Kept always-mounted so the panel
// can transition in/out purely via the .is-open class.
export default function StartProjectDrawer(){
 const [open,setOpen]=useState(false);
 const [sent,setSent]=useState(false);
 const [sending,setSending]=useState(false);
 const [failed,setFailed]=useState(false);
 const [errors,setErrors]=useState<Record<string,string>>({});
 const panelRef=useRef<HTMLDivElement>(null);
 const formRef=useRef<HTMLFormElement>(null);
 const firstFieldRef=useRef<HTMLInputElement>(null);
 const calRef=useRef<Awaited<ReturnType<typeof getCalApi>>|null>(null);

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

 useEffect(()=>{
  if(!open||calRef.current)return;
  let cancelled=false;
  (async()=>{
   try{
    const {getCalApi}=await import('@calcom/embed-react');
    const cal=await getCalApi({namespace:CAL_NAMESPACE});
    if(cancelled)return;
    cal('ui',{layout:'month_view'});
    cal('preload',{calLink:CAL_LINK,type:'modal'});
    calRef.current=cal;
   }catch{
    // Leave calRef null so the anchor's href handles the click instead.
   }
  })();
  return()=>{cancelled=true};
 },[open]);

 const close=()=>setOpen(false);

 const openBooking=(event:React.MouseEvent<HTMLAnchorElement>)=>{
  const cal=calRef.current;
  // Not loaded yet, or the visitor asked for a new tab -- let the href win.
  if(!cal||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  event.preventDefault();
  const read=(name:string)=>{
   const field=formRef.current?.elements.namedItem(name);
   return field instanceof HTMLInputElement||field instanceof HTMLTextAreaElement||field instanceof HTMLSelectElement?field.value.trim():'';
  };
  // Carry over whatever they already typed so the booker isn't a blank retype.
  const prefill:Record<string,string>={};
  const name=read('name'); if(name)prefill.name=name;
  const email=read('email'); if(email&&/^\S+@\S+\.\S+$/.test(email))prefill.email=email;
  const notes=read('project'); if(notes)prefill.notes=notes;
  cal('modal',{calLink:CAL_LINK,config:{layout:'month_view',...prefill}});
 };
 const submit=async(event:React.FormEvent<HTMLFormElement>)=>{
  event.preventDefault();
  if(sending)return;
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
  setFailed(false);
  setSending(true);
  try{
   const response=await fetch(FORM_ENDPOINT,{
    method:'POST',
    headers:{'Content-Type':'application/json','Accept':'application/json'},
    body:JSON.stringify({
     // Underscore keys are FormSubmit directives; the rest become the email
     // body, so they are labelled the way they should read in the inbox.
     _subject:`New enquiry — ${value('service')}`,
     _template:'table',
     _captcha:'false',
     _replyto:email,
     _honey:value('_honey'),
     Name:value('name'),
     Email:email,
     Company:value('company')||'—',
     Service:value('service'),
     Budget:value('budget'),
     'Project details':value('project')
    })
   });
   if(!response.ok)throw new Error(`FormSubmit responded ${response.status}`);
   setSent(true);
  }catch{
   // Keep the filled-in form on screen so nothing the visitor typed is lost.
   setFailed(true);
  }finally{
   setSending(false);
  }
 };
 const clearError=(field:string)=>{setFailed(false);if(errors[field])setErrors(current=>{const next={...current};delete next[field];return next})};

 return (
  <div className={`start-project-root${open?' is-open':''}`} aria-hidden={!open}>
   <div className="start-project-backdrop" onClick={close}/>
   <div className="start-project-info" aria-hidden="true">
    <div className="start-project-info-cell">
     <b>Mail</b>
     <a href="mailto:hello@ampliga.com">hello@ampliga.com</a>
    </div>
    <div className="start-project-info-cell">
     <b>Phone</b>
     <a href="tel:+919999028398">+91 99990 28398</a>
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
     <form className="start-project-form" ref={formRef} onSubmit={submit} noValidate>
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
         <option>Brand Strategy</option><option>Digital Systems</option><option>AI &amp; Automation</option><option>Growth Marketing</option><option>E-commerce</option><option>Content Studio</option>
        </select></label>
        <label className={`start-project-field${errors.project?' has-error':''}`}><span>Project details *</span>{errors.project&&<b>{errors.project}</b>}<textarea name="project" placeholder="Share a little about your goals, timeline, and requirements…" onChange={()=>clearError('project')} aria-invalid={Boolean(errors.project)} rows={5}/></label>
        <label className={`start-project-field${errors.budget?' has-error':''}`}><span>Estimated budget *</span>{errors.budget&&<b>{errors.budget}</b>}<select name="budget" defaultValue="" onChange={()=>clearError('budget')} aria-invalid={Boolean(errors.budget)} aria-label="Select your estimated budget">
         <option value="" disabled>Select your estimated budget</option>
         <option>Under ₹1 lakh</option><option>₹1–3 lakh</option><option>₹3–7 lakh</option><option>₹7–15 lakh</option><option>₹15 lakh+</option>
        </select></label>
       </div>
      </section>

      {/* FormSubmit discards any submission where _honey is filled in. */}
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="start-project-honey"/>

      {failed&&<p className="start-project-failed" role="alert">Something went wrong sending that. Try again, or email <a href="mailto:hello@ampliga.com">hello@ampliga.com</a>.</p>}

      <div className="start-project-actions">
       <button type="submit" className="start-project-submit" disabled={sending} aria-busy={sending}><span>{sending?'Sending…':'Send inquiry'}</span><b aria-hidden="true">→</b></button>
      </div>

      <div className="start-project-or"><span>OR</span></div>

      <a className="start-project-book" href={`https://cal.com/${CAL_LINK}`} onClick={openBooking} target="_blank" rel="noreferrer">
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
