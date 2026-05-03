import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register the plugin to enable window scrolling
gsap.registerPlugin(ScrollToPlugin);

const foodCards = [
  { 
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"/><path d="M12 8v4l3 3"/>
      </svg>
    ), 
    name: 'Mixed Greens Salad', 
    meta: 'Cairo Kitchen · 0.8 km away', 
    qty: '12 portions available', 
    status: 'Available now', 
    statusColor: 'text-[#111111]/60', 
    dotColor: 'bg-[#C8A96E]', 
    position: 'top-0 md:top-12 left-0 md:left-2.5' 
  },
  { 
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 17V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"/><path d="M12 19v-4M8 19v-2M16 19v-2"/>
      </svg>
    ), 
    name: 'Fresh Baked Bread', 
    meta: 'Sunset Bakery · 1.2 km away', 
    qty: '24 loaves', 
    status: 'Pickup by 6 PM', 
    statusColor: 'text-[#C8A96E]', 
    dotColor: 'bg-[#C8A96E]', 
    position: 'top-[160px] md:top-[200px] right-0 md:left-80' 
  },
  { 
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ), 
    name: 'Lunch Boxes', 
    meta: 'Nile Restaurant', 
    status: 'Approved ✓', 
    statusColor: 'text-[#111111]', 
    approved: true, 
    position: 'bottom-0 md:bottom-[40px] left-0 md:left-[50px]' 
  },
];

export default function Hero({ onHoverEnter, onHoverLeave }) {

  // Function to handle the smooth scroll[cite: 5]
  const handleScroll = (e) => {
    e.preventDefault();
    gsap.to(window, {
      duration: 1.2,
      scrollTo: "#steps-section",
      ease: "power3.inOut"
    });
  };

  return (
    <section id="hero-section" className="min-h-screen flex flex-col md:grid md:grid-cols-2 items-center px-6 md:px-12 pt-32 md:pt-20 pb-16 gap-16 relative overflow-hidden bg-[#F3F3F1]">
      <div className="absolute w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-[#111111] opacity-[0.03] -top-[50px] md:-top-[100px] -right-[50px] md:-right-[100px] animate-[bgFloat1_12s_ease-in-out_infinite] pointer-events-none" />
      <div className="absolute w-[200px] md:w-[400px] h-[200px] md:h-[400px] rounded-full bg-[#C8A96E] opacity-[0.05] -bottom-[30px] md:-bottom-[50px] -left-[40px] md:-left-[80px] animate-[bgFloat2_15s_ease-in-out_infinite] pointer-events-none" />

      <div className="z-10 text-center md:text-left">
        <div className="hero-eyebrow opacity-0 flex items-center justify-center md:justify-start gap-3 mb-6">
          <div className="w-2 h-2 rounded-full bg-[#C8A96E] animate-pulse" />
          <span className="text-[0.65rem] md:text-[0.72rem] tracking-[0.4em] uppercase text-[#C8A96E] font-black">Food Rescue Platform</span>
        </div>
        <h1 className="hero-title opacity-0 font-serif text-[clamp(2.2rem,5.5vw,4.8rem)] font-black leading-[1.05] md:leading-[1.0] text-[#111111] uppercase tracking-tighter mb-6">
          Good food<br />deserves a<br /><span className="text-[#C8A96E]">second life.</span>
        </h1>
        <p className="hero-sub opacity-0 text-[0.95rem] md:text-[1.05rem] text-[#111111]/60 leading-[1.75] max-w-[480px] mb-10 font-light uppercase tracking-tight">
          Connect restaurants with surplus food to charities and communities who need it most — simply, beautifully, immediately.
        </p>
        <div className="hero-ctas opacity-0 flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start">
          <Link to="/signup" onMouseEnter={onHoverEnter} onMouseLeave={onHoverLeave} className="w-full sm:w-auto bg-[#111111] text-white px-10 py-4 text-[0.75rem] font-black uppercase tracking-widest hover:bg-[#C8A96E] transition-all duration-200 text-center" style={{ cursor: 'none' }}>Start_Rescuing</Link>
          
          <button 
            onClick={handleScroll} 
            onMouseEnter={onHoverEnter} 
            onMouseLeave={onHoverLeave} 
            className="w-full sm:w-auto border border-[#111111] text-[#111111] px-10 py-4 text-[0.75rem] font-black uppercase tracking-widest hover:bg-[#111111] hover:text-white transition-all duration-200" 
            style={{ cursor: 'none' }}
          >
            The_Protocol
          </button>
        </div>
      </div>

      {/* Visual Container: Added 'hidden md:block' to disappear on mobile[cite: 15] */}
      <div className="hidden md:block relative h-[540px] w-full max-w-[500px] mx-auto md:mx-0">
        <div className="hero-stat-box opacity-0 absolute top-0 md:top-13 right-0 md:right-8 bg-[#111111] text-white rounded-2xl px-[1rem] md:px-[1.4rem] py-3 md:py-4 text-center animate-[heroBob_9s_ease-in-out_infinite] z-[2] border border-white/10 shadow-2xl">
          <div className="font-serif text-[1.5rem] md:text-[1.9rem] font-black text-[#C8A96E]">847</div>
          <div className="text-[0.5rem] md:text-[0.6rem] opacity-70 tracking-[0.2em] uppercase mt-1">meals rescued today</div>
        </div>
        
        {foodCards.map((card, i) => (
          <div key={i} className={`food-card-item opacity-0 absolute ${card.position} w-[180px] md:w-[245px] bg-white rounded-xl p-4 md:p-6 shadow-xl border border-black/5 animate-[cardFloat${i+1}_${6+i}s_ease-in-out_infinite]`}>
            <div className="flex justify-between items-start mb-2 md:mb-4">
              <div>
                <div className="mb-2 md:mb-3 scale-75 md:scale-100 origin-left">{card.icon}</div>
                <div className="text-[0.7rem] md:text-[0.8rem] font-black uppercase tracking-tight text-[#111111] leading-none">{card.name}</div>
                <div className="text-[0.55rem] md:text-[0.6rem] text-[#111111]/40 uppercase font-bold mt-1 tracking-tighter">{card.meta}</div>
              </div>
              {card.approved && <div className="bg-[#111111] text-white text-[0.45rem] md:text-[0.5rem] font-black px-1.5 md:px-2 py-0.5 md:py-1 uppercase tracking-tighter shadow-lg">Approved</div>}
            </div>
            {card.qty && <div className="inline-block mt-1 md:mt-2 bg-[#F3F3F1] text-[#111111] text-[0.55rem] md:text-[0.6rem] font-black px-2 md:px-3 py-0.5 md:py-1 uppercase tracking-tighter border border-black/5">{card.qty}</div>}
            <div className="flex items-center gap-1.5 mt-2 md:mt-3">
              <div className={`w-1 h-1 rounded-full ${card.dotColor} animate-pulse`} />
              <span className={`text-[0.55rem] md:text-[0.6rem] font-black uppercase tracking-tighter ${card.statusColor}`}>{card.status}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}