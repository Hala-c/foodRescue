import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../api/api';
import toast from 'react-hot-toast';
import { gsap } from 'gsap';

export default function CharityDash() {
  const { user } = useAuth();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestingId, setRequestingId] = useState(null);
  
  const cardsRef = useRef([]);
  const headerLineRef = useRef(null);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/foods');
      setFoods(data.filter(f => f.status === 'available'));
    } catch (err) {
      toast.error("System sync failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFoods(); }, []);

  useEffect(() => {
    if (!loading && foods.length > 0) {
      const tl = gsap.timeline();
      tl.fromTo(headerLineRef.current, 
        { scaleX: 0 }, 
        { scaleX: 1, duration: 1.5, ease: "expo.inOut" }
      );
      tl.fromTo(cardsRef.current,
        { opacity: 0, x: -30, skewX: 2, filter: "blur(10px)" },
        { 
          opacity: 1, x: 0, skewX: 0, filter: "blur(0px)",
          duration: 1, stagger: 0.08, ease: "power4.out" 
        },
        "-=1"
      );
    }
  }, [loading, foods]);

  const onRowHover = (index, enter) => {
    if (window.innerWidth >= 768) {
      gsap.to(cardsRef.current[index], {
        x: enter ? 10 : 0,
        backgroundColor: enter ? "rgba(0,0,0,0.02)" : "transparent",
        duration: 0.4,
        ease: "power2.out"
      });
    }
  };

  const handleRequest = async (item) => {
    try {
      setRequestingId(item._id);
      const requesterId = user?.user?._id || user?.user?.id;
      const payload = {
        food: item.name,
        requester: requesterId,
        message: "System Allocation Request"
      };
      const response = await api.post('/requests', payload);
      if (response.status === 201) {
        toast.success(`Allocated: ${item.name}`);
        gsap.to(`.card-${item._id}`, {
          opacity: 0, x: 100, scale: 0.9, filter: "blur(5px)",
          duration: 0.6, ease: "expo.in",
          onComplete: () => fetchFoods()
        });
      }
    } catch (err) {
      toast.error("Transaction refused");
    } finally {
      setRequestingId(null);
    }
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-[#F2EFE7] font-mono text-[10px] tracking-[0.4em] uppercase text-gray-400">
      <div className="flex gap-2">
        <div className="w-1 h-4 bg-black animate-bounce"></div>
        <div className="w-1 h-4 bg-black animate-bounce [animation-delay:0.2s]"></div>
        <div className="w-1 h-4 bg-black animate-bounce [animation-delay:0.4s]"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F2EFE7] text-black font-sans selection:bg-black selection:text-white antialiased">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 pt-32 pb-24">
        
        {/* تم تقليل mb-32 إلى mb-16 لتقليل المسافة تحت الخط الأسود */}
        <header className="mb-16 relative">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end pb-10 gap-8">
            <div className="space-y-4">
              <span className="block text-[10px] font-black tracking-[0.5em] text-gray-500 uppercase">
                Operational Exchange // {new Date().getFullYear()}
              </span>
              <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter uppercase leading-[0.9]">
                Surplus<br className="hidden md:block" /> Logistics
              </h1>
            </div>
            <button onClick={fetchFoods} className="w-full md:w-auto text-[10px] font-black tracking-[0.3em] uppercase border border-black px-8 py-4 hover:bg-black hover:text-[#F2EFE7] transition-all duration-500 cursor-pointer">
              Update Feed
            </button>
          </div>
          <div ref={headerLineRef} className="absolute bottom-0 left-0 w-full h-[4px] bg-black origin-left"></div>
        </header>

        <div className="border-t border-black/10">
          {foods.length > 0 ? (
            foods.map((item, index) => (
              <div 
                key={item._id} 
                ref={el => cardsRef.current[index] = el}
                onMouseEnter={() => onRowHover(index, true)}
                onMouseLeave={() => onRowHover(index, false)}
                className={`card-${item._id} group grid grid-cols-1 lg:grid-cols-12 items-center p-6 lg:p-8 border-b border-black/10 transition-colors duration-300 gap-8 lg:gap-4`}
              >
                <div className="hidden lg:block lg:col-span-1 text-[10px] font-bold text-gray-400/50 tracking-widest">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <div className="lg:col-span-5 pr-4">
                  <h4 className="text-xl md:text-3xl font-black tracking-tight uppercase leading-tight break-words">
                    {item.name}
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="text-[8px] font-black tracking-[0.2em] uppercase bg-black text-white px-2 py-0.5">Asset_Verified</span>
                    <span className="text-[8px] font-black tracking-[0.2em] uppercase border border-black/10 text-gray-400 px-2 py-0.5">In_Stock</span>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Quantity</p>
                  <p className="text-sm font-bold tabular-nums leading-tight max-w-[150px]">{item.quantity}</p>
                </div>

                <div className="lg:col-span-2">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Origin</p>
                  <p className="text-xs font-bold uppercase tracking-tight leading-tight">{item.location}</p>
                </div>

                <div className="lg:col-span-2">
                  <button 
                    onClick={() => handleRequest(item)}
                    disabled={requestingId === item._id}
                    className="w-full h-14 bg-black text-white text-[10px] font-black tracking-[0.4em] uppercase relative overflow-hidden group/btn cursor-pointer"
                  >
                    <span className="relative z-10 transition-transform duration-500 block group-hover/btn:-translate-y-12">
                      {requestingId === item._id ? "..." : "Commit"}
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center translate-y-12 group-hover/btn:translate-y-0 transition-transform duration-500 bg-black text-[#F2EFE7]">
                      Confirm
                    </span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-24 text-center border-b border-black/10">
              <p className="text-[10px] font-black tracking-[0.6em] text-gray-400 uppercase italic">Buffer Empty // Waiting for Resources</p>
            </div>
          )}
        </div>
        
        <div className="mt-12 flex flex-col sm:row justify-between items-center text-[8px] font-bold text-gray-400 uppercase tracking-[0.4em] gap-4">
           <span>Secured Transaction Protocol</span>
           <span>Authored by {user?.user?.name || "Elsayed Hamad"}</span>
        </div>
      </div>
    </div>
  );
}