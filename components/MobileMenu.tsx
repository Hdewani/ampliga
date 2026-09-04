'use client';

import {useEffect,useState} from 'react';
import {createPortal} from 'react-dom';

const links=[{href:'#about',label:'About'},{href:'#work',label:'Work'},{href:'#services',label:'Services'}];

// Phone navigation. The header pill is too tight for inline links, so below
// 760px the nav collapses to this button and a full-screen panel.
//
// The panel is portalled to <body> on purpose: .swiss-header carries
// transform:translateX(-50%), which makes it a containing block for
// position:fixed descendants, so a panel rendered inside the header would be
// positioned against the pill instead of the viewport.
export default function MobileMenu(){
 const [open,setOpen]=useState(false);
 const [mounted,setMounted]=useState(false);

 useEffect(()=>setMounted(true),[]);

 useEffect(()=>{
  if(!open)return;
  const onKey=(event:KeyboardEvent)=>{if(event.key==='Escape')setOpen(false)};
  // Resizing past the breakpoint hides the panel via CSS, so close it too —
  // otherwise the scroll lock below would stay applied with nothing on screen.
  const wide=window.matchMedia('(min-width: 761px)');
  const onWide=()=>{if(wide.matches)setOpen(false)};
  document.addEventListener('keydown',onKey);
  wide.addEventListener('change',onWide);
  const previousOverflow=document.body.style.overflow;
  document.body.style.overflow='hidden';
  return()=>{
   document.removeEventListener('keydown',onKey);
   wide.removeEventListener('change',onWide);
   document.body.style.overflow=previousOverflow;
  };
 },[open]);

 const panel=<div id="mobile-menu" className={`mobile-menu-root${open?' is-open':''}`}>
  <nav className="mobile-menu-panel" aria-label="Mobile navigation">
   <ul>
    {links.map((link,index)=><li key={link.href} style={{['--menu-index' as string]:index}}>
     <a href={link.href} onClick={()=>setOpen(false)}>{link.label}</a>
    </li>)}
   </ul>
   <a className="mobile-menu-mail" href="mailto:hello@ampliga.com" onClick={()=>setOpen(false)}>hello@ampliga.com</a>
  </nav>
 </div>;

 return <>
  <button
   type="button"
   className="mobile-menu-button"
   aria-label={open?'Close menu':'Open menu'}
   aria-expanded={open}
   aria-controls="mobile-menu"
   onClick={()=>setOpen(value=>!value)}
  >
   <span className={`mobile-menu-icon${open?' is-open':''}`} aria-hidden="true"><i/><i/></span>
  </button>
  {mounted&&createPortal(panel,document.body)}
 </>;
}
