'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ScrollAnimations() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const cursorCleanups: Array<() => void> = [];

    const context = gsap.context(() => {
      const projectCursor = document.querySelector<HTMLElement>('.project-cursor');
      const projectTargets = gsap.utils.toArray<HTMLElement>('.lead-image, .work-image');

      if (projectCursor && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const moveX = gsap.quickTo(projectCursor, 'x', { duration: .28, ease: 'power3.out' });
        const moveY = gsap.quickTo(projectCursor, 'y', { duration: .28, ease: 'power3.out' });
        const onMove = (event: MouseEvent) => { moveX(event.clientX); moveY(event.clientY); };
        window.addEventListener('mousemove', onMove);
        cursorCleanups.push(() => window.removeEventListener('mousemove', onMove));

        projectTargets.forEach((target) => {
          const enter = () => projectCursor.classList.add('is-visible');
          const leave = () => projectCursor.classList.remove('is-visible');
          target.addEventListener('mouseenter', enter);
          target.addEventListener('mouseleave', leave);
          cursorCleanups.push(() => {
            target.removeEventListener('mouseenter', enter);
            target.removeEventListener('mouseleave', leave);
          });
        });
      }

      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro
        .from('.site-header > *', { y: -16, opacity: 0, duration: .55, stagger: .06 })
        .from('.hero-ref > .eyebrow', { y: 18, opacity: 0, duration: .5 }, '-=.25')
        .from('.hero-ref h1', { y: 55, opacity: 0, duration: .85, ease: 'power4.out' }, '-=.2')
        .from('.hero-actions > *', { y: 24, opacity: 0, duration: .6, stagger: .1 }, '-=.4')
        .from('.hero-meta', { opacity: 0, duration: .5 }, '-=.25')
        .from('.hero-image', { clipPath: 'inset(12% 0 0 0)', opacity: 0, duration: .9 }, '-=.2');

      gsap.utils.toArray<HTMLElement>('.section-pad:not(.process-ref) > .eyebrow, .think > .eyebrow').forEach((el) => {
        gsap.from(el, { y: 18, opacity: 0, duration: .65, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
      });

      gsap.utils.toArray<HTMLElement>('.two-col h2, .selected > h2, .disciplines-ref > h2, .wod-head h2, .technology h2, .more-head h2, .about-copy h2, .contact-ref h2').forEach((el) => {
        gsap.from(el, { y: 60, opacity: 0, duration: .9, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 84%', once: true } });
      });

      gsap.set('.business > .eyebrow', { y: 24, autoAlpha: 0 });
      gsap.set('.business h2 > span', { yPercent: 115, autoAlpha: 0 });
      gsap.set('.claims p', { y: 60, autoAlpha: 0, color: '#4d4d4d' });
      gsap.set('.business h3', { y: 70, autoAlpha: 0 });

      const businessTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.business',
          start: 'top 88%',
          end: 'bottom 68%',
          scrub: .8,
          invalidateOnRefresh: true,
          refreshPriority: -10
        }
      });
      businessTimeline
        .to('.business > .eyebrow', { y: 0, autoAlpha: 1, duration: .5, ease: 'power3.out' })
        .to('.business h2 > span', { yPercent: 0, autoAlpha: 1, duration: .8, stagger: .22, ease: 'power4.out' }, '+=.12');

      gsap.utils.toArray<HTMLElement>('.claims p').forEach((el) => {
        businessTimeline
          .to(el, { y: 0, autoAlpha: 1, duration: .65, ease: 'power3.out' }, '+=.18')
          .to(el, { color: '#f2f0ea', duration: .45, ease: 'none' });
      });
      businessTimeline
        .to('.business h3', { y: 0, autoAlpha: 1, color: '#f2f0ea', duration: .85, ease: 'power4.out' }, '+=.12');

      gsap.utils.toArray<HTMLElement>('.lead-image, .work-image, .about-image').forEach((el, index) => {
        gsap.from(el, { clipPath: index % 2 ? 'inset(0 0 18% 0)' : 'inset(14% 0 0 0)', opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 86%', once: true } });
        const image = el.querySelector('img');
        if (image) gsap.fromTo(image, { scale: 1.055, yPercent: -2 }, { scale: 1, yPercent: 2, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: .7 } });
      });

      gsap.from('.case-copy > *', { y: 25, opacity: 0, duration: .65, stagger: .08, ease: 'power3.out', scrollTrigger: { trigger: '.case-copy', start: 'top 85%', once: true } });

      gsap.utils.toArray<HTMLElement>('.disciplines-ref article, .results > div, .about-stats > span').forEach((el, index) => {
        gsap.from(el, { y: 34, opacity: 0, duration: .7, delay: (index % 3) * .06, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
      });

      gsap.from('.contact-ref > a, .contact-ref > p', { y: 30, opacity: 0, duration: .7, stagger: .12, ease: 'power3.out', scrollTrigger: { trigger: '.contact-ref', start: 'top 55%', once: true } });

      const media = gsap.matchMedia();
      media.add('(min-width: 768px)', () => {
        const process = document.querySelector<HTMLElement>('.process-ref');
        const processPin = document.querySelector<HTMLElement>('.process-pin');
        const track = document.querySelector<HTMLElement>('.steps');
        if (!process || !processPin || !track) return;

        const processEntrance = gsap.timeline({
          scrollTrigger: {
            trigger: process,
            start: 'top 92%',
            end: 'top top',
            scrub: .75
          }
        });
        processEntrance
          .fromTo('.process-pin > .eyebrow', { y: 28, opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0)
          .fromTo('.process-head h2', { y: 75, opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, .08)
          .fromTo('.process-head p', { y: 45, opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, .18);

        const getProcessTravel = () => Math.max(0, track.scrollWidth - window.innerWidth + window.innerWidth * .0625);
        const setProcessHeight = () => {
          process.style.height = `${window.innerHeight + getProcessTravel() * 1.22 + window.innerHeight * .35}px`;
        };
        setProcessHeight();

        const horizontal = gsap.timeline({
          scrollTrigger: {
            trigger: process,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.35,
            invalidateOnRefresh: true
          }
        });
        horizontal
          .to(track, { x: 0, duration: .12, ease: 'none' })
          .to(track, { x: () => -getProcessTravel(), duration: .88, ease: 'none' });
        window.addEventListener('resize', setProcessHeight);
        return () => {
          window.removeEventListener('resize', setProcessHeight);
          process.style.height = '';
        };

      });

      media.add('(min-width: 768px)', () => {
        const think = document.querySelector<HTMLElement>('.think');
        if (!think) return;

        gsap.set('.think h2, .think > p', { autoAlpha: 0 });
        const philosophy = gsap.timeline({
          scrollTrigger: {
            trigger: think,
            start: 'top top',
            end: '+=220%',
            scrub: .8,
            pin: true,
            anticipatePin: 1
          }
        });

        philosophy
          .fromTo('.think h2:first-of-type', { y: 85, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, ease: 'power3.out' })
          .to('.think h2:first-of-type', { y: -90, autoAlpha: 0, duration: .85, ease: 'power2.inOut' }, '+=.4')
          .fromTo('.think h2:nth-of-type(2)', { y: 95, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, ease: 'power3.out' }, '+=.12')
          .fromTo('.think > p', { y: 35, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .7, ease: 'power3.out' }, '-=.15');
      });

      media.add('(max-width: 767px)', () => {
        gsap.utils.toArray<HTMLElement>('.think h2, .think > p').forEach((el) => {
          gsap.from(el, { y: 55, opacity: 0, duration: .85, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 86%', once: true } });
        });
      });
    });

    const refreshTimers = [250, 1200, 2500].map((delay) =>
      window.setTimeout(() => ScrollTrigger.refresh(), delay)
    );
    const refreshOnLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', refreshOnLoad, { once: true });
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      cursorCleanups.forEach((cleanup) => cleanup());
      refreshTimers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener('load', refreshOnLoad);
      context.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return null;
}
