import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export default function Footer({ onHoverEnter, onHoverLeave }) {
  
  const scrollToSection = (e, id) => {
    e.preventDefault();
    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: id, offsetY: 0 },
      ease: "power4.inOut"
    });
  };

  return (
    <footer className="bg-[#111111] text-white/40 py-20 md:py-24 px-6 md:px-12 relative overflow-hidden border-t border-white/5">
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#C8A96E]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 mb-20 md:mb-24">
          {/* Left Column */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full bg-[#C8A96E] animate-pulse" />
              <span className="text-[10px] tracking-[0.4em] uppercase font-black text-[#C8A96E]">
                Food_Rescue_Network // Platform_Live
              </span>
            </div>
            <h2 className="font-serif text-[clamp(2rem,3.5vw,3.5rem)] font-black text-white leading-[1.1] uppercase tracking-tighter">
              Ready to rescue <br /> 
              <span className="text-[#C8A96E]">the surplus</span> together?
            </h2>
          </div>

          {/* Right Column */}
          <div className="grid grid-cols-2 gap-12 pt-0 md:pt-12">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase font-black text-white/20 mb-6">(Explore)</p>
              <ul className="space-y-4">
                {['Stats', 'Problem', 'Steps', 'Features'].map((link) => (
                  <li key={link}>
                    <a 
                      href={`#${link.toLowerCase()}-section`} 
                      onClick={(e) => scrollToSection(e, `#${link.toLowerCase()}-section`)}
                      onMouseEnter={onHoverEnter} 
                      onMouseLeave={onHoverLeave}
                      className="text-[11px] font-black uppercase tracking-widest text-white/60 hover:text-[#C8A96E] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase font-black text-white/20 mb-6">(Connect)</p>
              <ul className="space-y-4">
                <li>
                  <Link 
                    to="/login" 
                    onMouseEnter={onHoverEnter} 
                    onMouseLeave={onHoverLeave}
                    className="text-[11px] font-black uppercase tracking-widest text-white/60 hover:text-[#C8A96E] transition-colors"
                  >
                    Log_In
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/signup" 
                    onMouseEnter={onHoverEnter} 
                    onMouseLeave={onHoverLeave}
                    className="text-[11px] font-black uppercase tracking-widest text-white/60 hover:text-[#C8A96E] transition-colors"
                  >
                    Sign_Up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 text-[0.72rem] tracking-[0.2em] uppercase font-bold text-center md:text-left">
          <p>
            Built with care · No AI · No payments · No tracking · Just <span className="text-[#C8A96E]">food rescue</span>
          </p>
          <p className="opacity-20 text-[10px]">
            © 2026 // Rescue_Platform
          </p>
        </div>
      </div>
    </footer>
  );
}