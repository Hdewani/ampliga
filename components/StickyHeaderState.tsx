'use client';

import {useEffect} from 'react';

export default function StickyHeaderState(){
  useEffect(()=>{
    const header=document.querySelector<HTMLElement>('.swiss-header');
    const hero=document.querySelector<HTMLElement>('.momentum-hero');
    if(!header||!hero)return;

    let frame=0;
    const update=()=>{
      frame=0;
      const compact=hero.getBoundingClientRect().bottom<=header.offsetHeight;
      header.classList.toggle('is-compact',compact);

      if(compact){
        const previousVisibility=header.style.visibility;
        header.style.visibility='hidden';
        const backdrop=document.elementFromPoint(window.innerWidth/2,Math.min(header.getBoundingClientRect().bottom-1,48));
        header.style.visibility=previousVisibility;
        const backdropIsLight=(node:Element|null)=>{
          if(node?.closest('.scroll-services,.partner-testimonials,.swiss-contact'))return true;
          let current:Element|null=node;
          while(current&&current!==document.documentElement){
            const color=getComputedStyle(current).backgroundColor;
            const match=color.match(/rgba?\((\d+)[, ]+(\d+)[, ]+(\d+)(?:[, /]+([\d.]+))?\)/);
            if(match&&Number(match[4]??1)>.12){
              const [,red,green,blue]=match.map(Number);
              const luminance=(.2126*red+.7152*green+.0722*blue)/255;
              return luminance>.55;
            }
            current=current.parentElement;
          }
          return true;
        };
        const zoomFlood=document.querySelector<HTMLElement>('.work-zoom-flood');
        const floodStyle=zoomFlood?getComputedStyle(zoomFlood):null;
        const floodRect=zoomFlood?.getBoundingClientRect();
        const floodCoversHeader=Boolean(
          zoomFlood&&floodStyle&&floodRect&&
          floodStyle.visibility!=='hidden'&&Number(floodStyle.opacity)>.45&&
          floodRect.top<=48&&floodRect.bottom>=48
        );
        const lightSurfaceSelector='.momentum-hero,.manifesto-transition-stage,.studio-manifesto,.services-section,.service-item,.partner-testimonials';
        const backdropLayers=document.elementsFromPoint(window.innerWidth/2,Math.min(header.getBoundingClientRect().bottom-1,48));
        const knownLightSurface=backdropLayers.some(layer=>Boolean(layer.closest(lightSurfaceSelector)));
        const lightBackdrop=floodCoversHeader||knownLightSurface||backdropIsLight(backdrop);
        header.classList.toggle('is-on-light',lightBackdrop);
        header.classList.toggle('is-on-dark',!lightBackdrop);
      }else{
        header.classList.remove('is-on-light','is-on-dark');
      }
    };
    const schedule=()=>{
      if(frame)return;
      frame=requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule,{passive:true});
    return()=>{
      if(frame)cancelAnimationFrame(frame);
      window.removeEventListener('scroll',schedule);
      window.removeEventListener('resize',schedule);
      header.classList.remove('is-compact','is-on-light','is-on-dark');
    };
  },[]);

  return null;
}
