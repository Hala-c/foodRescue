import { Link } from 'react-router-dom';

export default function CTA({ onHoverEnter, onHoverLeave }) {
  return (
    /* Reduced vertical padding for mobile consistency */
    <section id="cta-section" className="py-20 md:py-32 px-6 md:px-12 bg-[#F2F7F5]">
      {/* Adjusted padding (py-16 px-8) for mobile devices */}
      <div className="cta-inner opacity-0 translate-y-[30px] bg-[#111111] rounded-[2rem] md:rounded-[2.5rem] py-16 md:py-24 px-8 md:px-16 max-w-[850px] mx-auto text-center relative overflow-hidden shadow-2xl border border-white/5">
        
        <div className="absolute w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(200,169,110,0.08),transparent_70%)] -top-[150px] -right-[100px] pointer-events-none" />
        <div className="absolute w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(200,169,110,0.05),transparent_70%)] -bottom-[120px] -left-[100px] pointer-events-none" />
        
        <h2 className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-black text-white leading-[1.1] mb-8 relative z-10 uppercase tracking-tighter">
          Ready to rescue<br />some <span className="text-[#C8A96E]">food?</span>
        </h2>
        
        <p className="text-white/40 text-[0.85rem] md:text-[0.95rem] leading-[1.7] mb-12 font-bold relative z-10 uppercase tracking-widest">
          Join the network connecting providers with recipients. <br className="hidden md:block" />
          Initialize connection to start reducing local waste.
        </p>
        
        {/* Added flex-col for mobile button stacking */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center relative z-10">
          <Link 
            to="/signup" 
            onMouseEnter={onHoverEnter} 
            onMouseLeave={onHoverLeave} 
            className="w-full sm:w-auto bg-[#C8A96E] text-[#111111] px-12 py-[1.2rem] text-[0.75rem] font-black uppercase tracking-[0.2em] hover:bg-white transition-all duration-300 shadow-lg shadow-[#C8A96E]/20 text-center" 
            style={{ cursor: 'none' }}
          >
            Start_Rescue
          </Link>

          <Link 
            to="/signup" 
            onMouseEnter={onHoverEnter} 
            onMouseLeave={onHoverLeave} 
            className="w-full sm:w-auto border border-white/20 text-white px-10 py-[1.2rem] text-[0.75rem] font-black uppercase tracking-[0.2em] hover:bg-white/5 hover:border-[#C8A96E]/50 transition-all duration-300 text-center" 
            style={{ cursor: 'none' }}
          >
            Access_Feed
          </Link>
        </div>
      </div>
    </section>
  );
}