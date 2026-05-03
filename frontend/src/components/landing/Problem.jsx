export default function Problem() {
  return (
    <section id="problem-section" className="py-20 md:py-32 px-6 md:px-12 bg-[#F3F3F1]">
      {/* Balanced grid ratio: 1.2fr for the card and 1fr for the text side */}
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Data Card */}
        <div className="bg-white rounded-xl p-8 md:p-10 shadow-2xl border border-black/5 order-2 lg:order-1">
          <p className="font-serif text-[1.1rem] font-black uppercase tracking-tight mb-8 text-[#111111]">System_Inefficiency_Log</p>
          {[
            { label: 'Unsold surplus wasted daily', id: 'mRed', bg: 'bg-[#111111]' },
            { label: 'Charities with inconsistent supply', id: 'mOrange', bg: 'bg-[#C8A96E]' },
            { label: 'Local food insecurity gap', id: 'mRed2', bg: 'bg-[#111111]' },
          ].map((m, i) => (
            <div key={i} className="mb-6">
              <div className="text-[0.65rem] text-[#111111]/40 mb-2 uppercase font-black tracking-widest">{m.label}</div>
              <div className="h-[4px] bg-black/5 rounded-full overflow-hidden">
                <div id={m.id} className={`h-full w-0 transition-[width] duration-[1600ms] ${m.bg}`} />
              </div>
            </div>
          ))}
          <div className="mt-8 pt-8 border-t border-black/5 flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-[#C8A96E] animate-pulse" />
            <span className="text-[0.7rem] font-black uppercase text-[#111111]">Resolution_With_Rescue</span>
            <div className="flex-1 h-[4px] bg-black/5 rounded-full overflow-hidden ml-4">
              <div id="mGreen" className="h-full w-0 bg-[#C8A96E]" />
            </div>
          </div>
        </div>

        {/* Right Column: Heading and Problem Points */}
        <div className="order-1 lg:order-2">
          <p className="text-[0.72rem] tracking-[0.4em] uppercase text-[#C8A96E] font-black mb-4">The_Problem</p>
          
          <h2 className="font-serif text-[clamp(1.8rem,3.2vw,2.8rem)] font-black leading-[1.1] mb-8 text-[#111111] uppercase tracking-tighter">
            Bridging the gap between <span className="text-[#C8A96E]">surplus</span> and need.
          </h2>

          <div className="space-y-2">
            {[
              { 
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6"/>
                  </svg>
                ), 
                title: 'WASTE_LOG', 
                desc: 'Perfectly edible meals discarded daily due to lack of coordination.' 
              },
              { 
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                ), 
                title: 'SUPPLY_GAP', 
                desc: 'Charities lack a consistent, real-time registry of available food.' 
              }
            ].map((p, i) => (
              <div key={i} className="problem-point opacity-0 translate-x-5 flex gap-6 items-start py-6 border-b border-black/5 last:border-0">
                <div className="w-12 h-12 rounded-lg bg-[#111111] flex items-center justify-center text-white shadow-lg shadow-[#C8A96E]/10">
                  {p.icon}
                </div>
                <div>
                  <div className="font-black text-[0.8rem] text-[#111111] uppercase tracking-widest">{p.title}</div>
                  <div className="text-[0.75rem] text-[#111111]/50 leading-relaxed font-medium mt-1 uppercase">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}