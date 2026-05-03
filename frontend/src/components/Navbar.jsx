import { useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { gsap } from 'gsap';

export default function Navbar() {
  const { user, logout } = useAuth(); //
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(navRef.current, 
      { y: -20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, []);

  // Smooth Scroll Handler
  const scrollToSection = (e, id) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/'); // Redirect to landing if on another page
    }
  };

  const handleLogout = () => {
    logout(); //[cite: 4]
    navigate('/');
  };

  // Sections defined in your Landing Page[cite: 4]
  const navItems = [
    { name: 'Main', id: 'hero-section' }, // Link to top
    { name: 'Process', id: 'steps-section' },
    { name: 'The_Problem', id: 'problem-section' },
    { name: 'Roles', id: 'roles-section' },
    { name: 'Features', id: 'features-section' }
  ];

  return (
    <nav 
      ref={navRef}
      className="fixed top-0 left-0 w-full z-[999] px-12 py-8 flex items-center justify-between pointer-events-none h-fit"
    >
      {/* 1. Identity Node (Acts as Main/Home)[cite: 3] */}
      <div className="pointer-events-auto flex items-center gap-4 group">
        <a 
          href="#hero-section" 
          onClick={(e) => scrollToSection(e, 'hero-section')}
          className="flex items-center gap-4 cursor-pointer"
        >
          <div className="relative w-6 h-6 bg-black rounded-[4px] rotate-45 flex items-center justify-center transition-transform duration-700 group-hover:rotate-[225deg]">
            <div className="w-1/2 h-1/2 border-2 border-white"></div>
          </div>
          <span className="text-[16px] font-black uppercase tracking-[0.4em] text-black">rescue</span>
        </a>
      </div>

      {/* 2. Central Navigation Pill */}
      <div className="pointer-events-auto hidden lg:flex items-center bg-[#E6E6DF]/70 backdrop-blur-md border border-black/[0.03] rounded-full px-2 py-1.5 shadow-sm">
        {navItems.map((item) => (
          <a 
            key={item.name}
            href={`#${item.id}`}
            onClick={(e) => scrollToSection(e, item.id)}
            className="px-6 py-3 text-[9px] font-black text-black/40 hover:text-black uppercase tracking-[0.3em] transition-all duration-300 cursor-pointer"
          >
            {item.name}
          </a>
        ))}
      </div>

      {/* 3. Action Controls[cite: 4] */}
      <div className="pointer-events-auto flex items-center gap-8">
        {!user ? (
          <>
            <Link to="/login" className="text-[11px] font-bold uppercase tracking-widest text-black/80 hover:text-black transition-colors">Login</Link>
            <Link to="/signup" className="bg-[#1C1C1C] text-white text-[11px] font-bold uppercase tracking-[0.15em] px-7 py-3.5 rounded-lg flex items-center gap-3 hover:bg-black transition-all active:scale-95">Sign Up</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="bg-[#1A1A1A] text-white text-[9px] font-black uppercase tracking-[0.1em] px-5 py-2.5 rounded-md hover:shadow-lg transition-all active:scale-95 cursor-pointer">
            Terminate_Session
          </button>
        )}
      </div>
    </nav>
  );
}