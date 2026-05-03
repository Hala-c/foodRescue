const steps = [
  { 
    label: 'Restaurant lists surplus food', 
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
        <path d="M7 2v20"></path>
        <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
      </svg>
    ) 
  },
  { 
    label: 'Charity browses the live feed', 
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    ) 
  },
  { 
    label: 'Charity sends a request', 
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
      </svg>
    ) 
  },
  { 
    label: 'Restaurant approves one request', 
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    ) 
  },
  { 
    label: 'Food gets picked up', 
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 16h6"></path>
        <path d="M19 13v6"></path>
        <path d="M21 10V8a2 2 0 0 0-2-2h-5l-1.34-2.68A2 2 0 0 0 10.88 2H5a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h11"></path>
      </svg>
    ) 
  },
];

export default function Steps({ stepsLineRef, onHoverEnter, onHoverLeave }) {
  return (
    <section id="steps-section" className="py-24 md:py-32 px-4 md:px-12 bg-[#F3F3F1]">
      <div className="text-center mb-16 md:mb-20">
        <p className="text-[0.65rem] md:text-[0.72rem] tracking-[0.2em] uppercase text-[#C8A96E] font-bold mb-3">The solution</p>
        <h2 className="font-serif text-[clamp(1.8rem,3.5vw,3rem)] font-black leading-tight md:leading-none text-[#111111] uppercase tracking-tighter">Five steps. Zero waste.</h2>
      </div>

      <div className="relative max-w-[940px] mx-auto">
        
        {/* Connection Line: Horizontal Desktop / Vertical Mobile */}
        <div className="hidden md:block absolute top-10 left-10 right-10 h-[2px] bg-[#111111]/10 z-0">
          <div ref={stepsLineRef} className="h-full w-0 bg-[#C8A96E] transition-[width] duration-[1400ms] ease-in-out" />
        </div>
        <div className="md:hidden absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1.5px] bg-[#111111]/10 z-0" />

        <div className="flex flex-col md:grid md:grid-cols-5 gap-12 md:gap-6 relative z-10">
          {steps.map((s, i) => (
            <div 
              key={i} 
              className={`step-item opacity-0 flex flex-col items-center md:block 
                ${i % 2 === 0 ? 'mobile-left-align' : 'mobile-right-align'}`}
            >
              {/* Responsive Container: Alternates side on mobile */}
              <div className={`flex flex-col items-center md:block w-full
                ${i % 2 === 0 ? 'translate-x-[-25%] md:translate-x-0' : 'translate-x-[25%] md:translate-x-0'}`}
              >
                <div 
                  onMouseEnter={onHoverEnter} 
                  onMouseLeave={onHoverLeave} 
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full mx-auto mb-4 flex items-center justify-center bg-white border-[2px] md:border-[2.5px] border-[#111111]/10 relative hover:border-[#C8A96E] hover:scale-110 transition-all duration-300"
                >
                  <div className="scale-75 md:scale-100">{s.icon}</div>
                  <span className="absolute -top-1 -right-1 w-5 h-5 md:w-[22px] md:h-[22px] bg-[#111111] text-[#C8A96E] rounded-full text-[0.6rem] md:text-[0.68rem] font-bold flex items-center justify-center font-sans">
                    {i + 1}
                  </span>
                </div>

                <div className="font-bold text-[0.6rem] md:text-[0.83rem] text-[#111111] leading-[1.45] uppercase tracking-widest text-center max-w-[120px] md:max-w-none mx-auto">
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}