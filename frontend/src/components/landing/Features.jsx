import React from 'react';

const features = [
  { 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    ), 
    title: 'Trusted Network', 
    desc: 'Creating a verified ecosystem where restaurants and charities work together with total confidence.' 
  },
  { 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
        <path d="M7 2v20"></path>
        <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
      </svg>
    ), 
    title: 'Zero Waste Mission', 
    desc: 'Transforming potential food waste into immediate opportunities for local communities to thrive.' 
  },
  { 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
        <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
        <path d="M8.59 16.11a6 6 0 0 1 6.82 0"></path>
        <line x1="12" y1="20" x2="12.01" y2="20"></line>
      </svg>
    ), 
    title: 'Community Outreach', 
    desc: 'Connecting surplus resources to the nearest shelters and kitchens to maximize local impact.' 
  },
  { 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z"></path>
        <polyline points="15 7 10 12 15 17"></polyline>
      </svg>
    ), 
    title: 'Instant Commitment', 
    desc: 'Removing barriers so charities can secure fresh food for those in need without a second of delay.' 
  },
  { 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m13 2-2 10h10l-2 10"></path>
      </svg>
    ), 
    title: 'Fair Distribution', 
    desc: 'Ensuring every donation is shared equitably among local organizations to reach as many people as possible.' 
  },
  { 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10V8a2 2 0 0 0-2-2h-5l-1.34-2.68A2 2 0 0 0 10.88 2H5a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h11"></path>
        <path d="M16 16h6"></path>
        <path d="M19 13v6"></path>
      </svg>
    ), 
    title: 'Impact Visibility', 
    desc: 'Tracking the journey of every meal to see the real change and smiles created in our neighborhood.' 
  },
];

export default function Features({ onHoverEnter, onHoverLeave }) {
  return (
    <section id="features-section" className="py-32 px-6 md:px-12 bg-[#F2F7F5] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(200,169,110,0.08),transparent_70%)] pointer-events-none" />
      
      <div className="text-center mb-20 relative z-10">
        <p className="text-[0.7rem] tracking-[0.4em] uppercase text-[#C8A96E] font-black mb-4">Core_Purpose</p>
        <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-black text-[#111111] leading-tight uppercase tracking-tighter">Small Actions, Big Smiles.</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1100px] mx-auto relative z-10">
        {features.map((f, i) => (
          <div 
            key={i} 
            onMouseEnter={onHoverEnter} 
            onMouseLeave={onHoverLeave} 
            className="feature-card-item opacity-0 translate-y-5 bg-white/20 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-10 border border-white/80 shadow-[0_20px_50px_rgba(17,17,17,0.03)] hover:bg-white/40 hover:border-[#C8A96E]/40 hover:-translate-y-2 transition-all duration-500 flex flex-col items-start"
          >
            <div className="w-[58px] h-[58px] rounded-2xl bg-[#C8A96E] flex items-center justify-center mb-8 shadow-lg shadow-[#C8A96E]/20">
              {f.icon}
            </div>
            
            <h3 className="font-serif text-[1.3rem] font-bold text-[#111111] mb-3 leading-none uppercase tracking-tight">
              {f.title}
            </h3>
            
            <p className="text-[0.85rem] text-[#111111]/50 font-medium leading-relaxed tracking-tight">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}