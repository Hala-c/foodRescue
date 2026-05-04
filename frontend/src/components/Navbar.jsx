import { useRef, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { gsap } from 'gsap';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeView = searchParams.get("view"); 

  useEffect(() => {
    gsap.fromTo(navRef.current, 
      { y: -20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  const scrollToSection = (e, id) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/');
    }
  };

  const handleLogout = () => {
    navigate('/', { replace: true });
    setTimeout(() => {
      logout();
    }, 100);
  };

  const landingItems = [
    { name: 'Main', id: 'hero-section' },
    { name: 'Process', id: 'steps-section' },
    { name: 'The_Problem', id: 'problem-section' },
    { name: 'Roles', id: 'roles-section' },
    { name: 'Features', id: 'features-section' }
  ];

  const renderCentralPill = () => {
    if (location.pathname === '/restaurant') {
      const currentView = activeView || 'post';
      return (
        <div className="pointer-events-auto hidden lg:flex items-center bg-white/40 backdrop-blur-[40px] p-1.5 rounded-full shadow-sm border border-white/50 h-[56px]">
          <button onClick={() => navigate("/restaurant?view=post")} className={`px-8 rounded-full font-black text-[14px] transition-all duration-300 h-full ${currentView === 'post' ? 'bg-black shadow-md text-white' : 'text-gray-600 hover:bg-white/30 cursor-pointer'}`}>List / Edit Food</button>
          <button onClick={() => navigate("/restaurant?view=inventory")} className={`px-8 rounded-full font-black text-[14px] transition-all duration-300 h-full ${currentView === 'inventory' ? 'bg-black shadow-md text-white' : 'text-gray-600 hover:bg-white/30 cursor-pointer'}`}>Inventory</button>
          <button onClick={() => navigate("/restaurant?view=requests")} className={`px-8 rounded-full font-black text-[14px] transition-all duration-300 h-full ${currentView === 'requests' ? 'bg-black shadow-md text-white' : 'text-gray-600 hover:bg-white/30 cursor-pointer'}`}>Approvals</button>
        </div>
      );
    }

    if (location.pathname === '/charity') {
      const currentView = activeView || 'browse';
      return (
        <div className="pointer-events-auto hidden lg:flex items-center bg-white/40 backdrop-blur-[40px] p-1.5 rounded-full shadow-sm border border-white/50 h-[56px]">
          <button onClick={() => navigate("/charity?view=browse")} className={`px-8 rounded-full font-black text-[14px] transition-all duration-300 h-full ${currentView === 'browse' ? 'bg-black shadow-md text-white' : 'text-gray-600 hover:bg-white/30 cursor-pointer'}`}>Surplus Feed</button>
          <button onClick={() => navigate("/charity?view=history")} className={`px-8 rounded-full font-black text-[14px] transition-all duration-300 h-full ${currentView === 'history' ? 'bg-black shadow-md text-white' : 'text-gray-600 hover:bg-white/30 cursor-pointer'}`}>Allocation History</button>
        </div>
      );
    }

    return (
      <div className="pointer-events-auto hidden lg:flex items-center bg-[#E6E6DF]/70 backdrop-blur-md border border-black/[0.03] rounded-full px-2 py-1.5 shadow-sm">
        {landingItems.map((item) => (
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
    );
  };

  // Mobile nav items for dashboard pages
  const getMobileNavItems = () => {
    if (location.pathname === '/restaurant') {
      const currentView = activeView || 'post';
      return [
        { label: 'List / Edit Food', view: 'post', active: currentView === 'post' },
        { label: 'Inventory', view: 'inventory', active: currentView === 'inventory' },
        { label: 'Approvals', view: 'requests', active: currentView === 'requests' },
      ];
    }
    if (location.pathname === '/charity') {
      const currentView = activeView || 'browse';
      return [
        { label: 'Surplus Feed', view: 'browse', active: currentView === 'browse' },
        { label: 'Allocation History', view: 'history', active: currentView === 'history' },
      ];
    }
    return null;
  };

  const mobileNavItems = getMobileNavItems();

  return (
    <>
      <nav ref={navRef} className="fixed top-0 left-0 w-full z-[999] px-6 sm:px-12 py-6 flex items-center justify-between pointer-events-none h-fit max-w-[1600px] mx-auto right-0">
      
      <div className="pointer-events-auto flex items-center gap-4 group cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-7 h-7 bg-black flex items-center justify-center transform rotate-45 rounded-[3px]">
           <div className="w-3 h-3 border-[2.5px] border-[#F2EFE7] rounded-sm"></div>
        </div>
        <span className="font-black text-xl sm:text-2xl tracking-[0.3em] text-black uppercase mt-1">
          Rescue
        </span>
      </div>

      {renderCentralPill()}

      <div className="pointer-events-auto flex items-center gap-4 sm:gap-8">
        {!user ? (
          <>
            <Link to="/login" className="text-[11px] font-bold uppercase tracking-widest text-black/80 hover:text-black transition-colors">Login</Link>
            <Link to="/signup" className="bg-[#1C1C1C] text-white text-[11px] font-bold uppercase tracking-[0.15em] px-5 sm:px-7 py-3.5 rounded-lg flex items-center gap-3 hover:bg-black transition-all active:scale-95">Sign Up</Link>
          </>
        ) : (
          <>
            {/* Mobile hamburger — only on dashboard pages, only below lg */}
            {mobileNavItems && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden flex flex-col justify-center gap-[5px] w-10 h-10 cursor-pointer pointer-events-auto"
                aria-label="Toggle menu"
              >
                <span className={`block h-[2px] bg-black transition-all duration-300 origin-center ${mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} style={{width:'22px'}}></span>
                <span className={`block h-[2px] bg-black transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} style={{width:'22px'}}></span>
                <span className={`block h-[2px] bg-black transition-all duration-300 origin-center ${mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} style={{width:'22px'}}></span>
              </button>
            )}
            <button onClick={handleLogout} className="hidden sm:block bg-[#1a1a1a] text-white px-8 py-3.5 rounded-xl text-[10px] font-black tracking-[0.2em] uppercase shadow-xl hover:bg-black hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
              Terminate_Session
            </button>
          </>
        )}
      </div>
    </nav>

    {/* Mobile dropdown menu for dashboard nav + logout */}
    {mobileNavItems && mobileMenuOpen && (
      <div className="fixed top-[88px] left-0 right-0 z-[998] mx-4 lg:hidden">
        <div className="bg-white/80 backdrop-blur-3xl border border-white/60 rounded-[2rem] shadow-2xl overflow-hidden">
          {mobileNavItems.map((item) => (
            <button
              key={item.view}
              onClick={() => {
                navigate(`${location.pathname}?view=${item.view}`);
                setMobileMenuOpen(false);
              }}
              className={`w-full px-8 py-5 text-[11px] font-black uppercase tracking-widest text-left transition-colors ${item.active ? 'bg-black text-white' : 'text-gray-600 hover:bg-black hover:text-white'}`}
            >
              {item.label}
            </button>
          ))}
          <div className="border-t border-black/5">
            <button
              onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
              className="w-full px-8 py-5 text-[11px] font-black uppercase tracking-widest text-left text-red-600 hover:bg-red-50 transition-colors"
            >
              Terminate_Session
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}