export default function Roles({ onHoverEnter, onHoverLeave }) {
  return (
    // Added px-6 for mobile to keep text off the screen edges
    <section id="roles-section" className="py-32 px-6 md:px-12 bg-[#111111] text-white relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] rounded-full bg-white/[0.02] -top-[200px] -right-[100px] pointer-events-none" />
      
      <div className="text-center mb-16">
        <p className="text-[0.72rem] tracking-[0.2em] uppercase text-[#C8A96E] font-bold mb-3">Built for both sides</p>
        <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-black text-white uppercase tracking-tighter">Who is it for?</h2>
      </div>

      {/* Changed grid-cols-2 to grid-cols-1 md:grid-cols-2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px] mx-auto">
        {[
          { 
            icon: (
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            ), 
            title: 'Restaurants', 
            f: ['Add surplus food listings in seconds', 'View all incoming requests per listing', 'Approve exactly one charity per item', 'Track pickup confirmation'] 
          },
          { 
            icon: (
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
              </svg>
            ), 
            title: 'Charities', 
            f: ['Browse all available food near you', 'Request items with a single tap', 'Track your request status live', 'Mark food as picked up'] 
          },
        ].map((role, i) => (
          <div key={i} onMouseEnter={onHoverEnter} onMouseLeave={onHoverLeave} className="role-card-item opacity-0 translate-y-5 bg-white/[0.03] border border-white/[0.1] rounded-[1.5rem] p-8 md:p-10 hover:bg-white/[0.06] hover:border-[#C8A96E]/30 hover:-translate-y-1 transition-all duration-300">
            <div className="mb-4">{role.icon}</div>
            <h3 className="font-serif text-[1.6rem] font-bold mb-5 uppercase tracking-tight">{role.title}</h3>
            <ul className="space-y-2.5">
              {role.f.map((feat, j) => (
                <li key={j} className="flex gap-3 items-center py-2.5 text-[0.88rem] opacity-70 border-b border-white/[0.05] last:border-0 font-medium">
                  <div className="w-5 h-5 min-w-[20px] rounded-full bg-[#C8A96E]/10 border border-[#C8A96E]/40 flex items-center justify-center text-[0.62rem] text-[#C8A96E]">✓</div>
                  {feat}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}