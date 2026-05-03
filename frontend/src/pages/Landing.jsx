import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Component Imports
import Hero from '../components/landing/Hero';
import Stats from '../components/landing/Stats';
import Problem from '../components/landing/Problem';
import Steps from '../components/landing/Steps';
import Roles from '../components/landing/Roles';
import Features from '../components/landing/Features';
import CTA from '../components/landing/CTA';
import Footer from '../components/landing/Footer'; 

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorRingRef = useRef(null);
  const scrollBarRef = useRef(null);
  const stepsLineRef = useRef(null);

  /* ---------- cursor logic ---------- */
  useEffect(() => {
    // Disable custom cursor for touch devices to prevent lag
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      gsap.to(cursorRef.current, { left: mx, top: my, duration: 0.05 });
    };
    const tick = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = rx + 'px';
        cursorRingRef.current.style.top = ry + 'px';
      }
      requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', onMove);
    tick();
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  /* ---------- scroll bar logic ---------- */
  useEffect(() => {
    const onScroll = () => {
      const st = window.scrollY;
      const sh = document.body.scrollHeight - window.innerHeight;
      if (scrollBarRef.current) scrollBarRef.current.style.width = (st / sh * 100) + '%';
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ---------- GSAP scroll animations ---------- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.fromTo('.hero-eyebrow',  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9 }, 0.3)
        .fromTo('.hero-title',    { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.0 }, 0.5)
        .fromTo('.hero-sub',      { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9 }, 0.7)
        .fromTo('.hero-ctas',     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 0.9)
        .fromTo('.hero-stat-box', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.4)' }, 0.8)
        .fromTo('.food-card-item',{ opacity: 0, scale: 0.88, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.9, stagger: 0.15 }, 0.7);

      ScrollTrigger.create({
        trigger: '#stats-section',
        start: 'top 85%', // Adjusted for mobile visibility
        once: true,
        onEnter: () => {
          gsap.to('.stat-item', { opacity: 1, y: 0, stagger: 0.15, duration: 0.7, ease: 'power3.out' });
          document.querySelectorAll('.stat-num').forEach((el) => {
            const target = parseInt(el.dataset.target);
            const obj = { val: 0 };
            gsap.to(obj, {
              val: target, duration: 2, ease: 'power2.out', delay: 0.3,
              onUpdate: () => {
                el.textContent = target >= 1000 ? Math.round(obj.val).toLocaleString() : Math.round(obj.val) + (target === 98 ? '%' : '');
              },
            });
          });
        },
      });

      ScrollTrigger.create({
        trigger: '#problem-section',
        start: 'top 80%', 
        once: true,
        onEnter: () => {
          gsap.to('#mRed',    { width: '73%', duration: 1.6, ease: 'power3.out', delay: 0.2 });
          gsap.to('#mOrange', { width: '61%', duration: 1.6, ease: 'power3.out', delay: 0.4 });
          gsap.to('#mRed2',   { width: '58%', duration: 1.6, ease: 'power3.out', delay: 0.6 });
          gsap.to('#mGreen',  { width: '89%', duration: 1.8, ease: 'power3.out', delay: 0.9 });
          gsap.to('.problem-point', { opacity: 1, x: 0, stagger: 0.18, duration: 0.7, ease: 'power3.out', delay: 0.3 });
        },
      });

      ScrollTrigger.create({
        trigger: '#steps-section',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to('.step-item', { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'back.out(1.3)', delay: 0.2 });
          gsap.to(stepsLineRef.current, { width: '100%', duration: 1.4, ease: 'power2.inOut', delay: 0.4 });
        },
      });

      ScrollTrigger.create({
        trigger: '#roles-section',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to('.role-card-item', { opacity: 1, y: 0, stagger: 0.18, duration: 0.8, ease: 'power3.out' });
        },
      });

      ScrollTrigger.create({
        trigger: '#features-section',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to('.feature-card-item', { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out' });
        },
      });

      ScrollTrigger.create({
        trigger: '#cta-section',
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to('.cta-inner', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' });
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const onHoverEnter = () => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    gsap.to(cursorRef.current,     { width: 20, height: 20, duration: 0.3 });
    gsap.to(cursorRingRef.current, { width: 60, height: 60, duration: 0.3 });
  };
  const onHoverLeave = () => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    gsap.to(cursorRef.current,     { width: 12, height: 12, duration: 0.3 });
    gsap.to(cursorRingRef.current, { width: 40, height: 40, duration: 0.3 });
  };

  return (
    <div ref={containerRef} className="bg-[#F2F7F5] text-[#111111] overflow-x-hidden w-full" style={{ cursor: 'none' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&display=swap');
        
        /* Disable custom cursor on mobile */
        @media (max-width: 1024px) {
          .custom-cursor { display: none !important; }
          * { cursor: auto !important; }
        }

        /* Prevent sections from hitting edges on mobile */
        @media (max-width: 768px) {
          .px-12 { padding-left: 1.25rem !important; padding-right: 1.25rem !important; }
          .py-32 { padding-top: 5rem !important; padding-bottom: 5rem !important; }
          .gap-16 { gap: 2rem !important; }
        }

        @keyframes cardFloat1 { 0%,100%{transform:rotate(-3deg) translateY(0)} 50%{transform:rotate(-3deg) translateY(-10px)} }
        @keyframes cardFloat2 { 0%,100%{transform:rotate(2.5deg) translateY(0)} 50%{transform:rotate(2.5deg) translateY(-14px)} }
        @keyframes cardFloat3 { 0%,100%{transform:rotate(-1deg) translateY(0)} 50%{transform:rotate(-1deg) translateY(-8px)} }
        @keyframes pulseGreen { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.5);opacity:0.55} }
        @keyframes heroBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes bgFloat1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,20px)} }
        @keyframes bgFloat2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(15px,-25px)} }
      `}</style>

      {/* Cursor & Scroll Elements */}
      <div ref={cursorRef} className="custom-cursor fixed w-3 h-3 bg-[#C8A96E] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-multiply" />
      <div ref={cursorRingRef} className="custom-cursor fixed w-10 h-10 border-[1.5px] border-[#C8A96E] rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 opacity-[0.45]" />
      <div ref={scrollBarRef} className="fixed top-0 left-0 h-[3px] bg-[#C8A96E] z-[1000] w-0 transition-[width] duration-100" />

      <Hero onHoverEnter={onHoverEnter} onHoverLeave={onHoverLeave} />
      <Stats />
      <Problem />
      <Steps stepsLineRef={stepsLineRef} onHoverEnter={onHoverEnter} onHoverLeave={onHoverLeave} />
      <Roles onHoverEnter={onHoverEnter} onHoverLeave={onHoverLeave} />
      <Features onHoverEnter={onHoverEnter} onHoverLeave={onHoverLeave} />
      <CTA onHoverEnter={onHoverEnter} onHoverLeave={onHoverLeave} />
      <Footer onHoverEnter={onHoverEnter} onHoverLeave={onHoverLeave} />
      
    </div>
  );
}