import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../api/api';
import toast from 'react-hot-toast';
import { gsap } from 'gsap';

export default function RestaurantDash() {
  const { user } = useAuth();
  const [food, setFood] = useState({ name: '', quantity: '', location: '', pickup_time: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const formRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(formRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  const handlePostFood = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const foodData = {
        ...food,
        restaurant_id: user?.user?._id || user?.user?.id 
      };

      await api.post('/foods', foodData);
      toast.success('Food listed successfully');
      setFood({ name: '', quantity: '', location: '', pickup_time: '' });
      
      gsap.to(formRef.current, { 
        x: [-4, 4, -4, 4, 0], 
        duration: 0.4, 
        ease: "linear" 
      });
    } catch (err) {
      console.error("Submit Error:", err.response?.data);
      toast.error(err.response?.data?.message || 'Failed to post food');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2EFE7] text-[#111] font-sans antialiased flex flex-col">
      
      <main className="max-w-[90%] mx-auto pt-32 pb-20 px-6 w-full">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-3">From Surplus to Smiles</h1>
          <p className="text-gray-500 text-lg">Enter the details of the food available for donation.</p>
        </div>

        {/* Enhanced Powerful Glass Container */}
        <div 
          ref={formRef}
          className="backdrop-blur-[40px] bg-white/20 border border-white shadow-[0_32px_64px_rgba(0,0,0,0.1)] rounded-[2.5rem] overflow-hidden"
        >
          <form onSubmit={handlePostFood} className="p-8 md:p-12 space-y-8">
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Food Item Name
              </label>
              <input
                type="text"
                placeholder="e.g. Mixed Vegetable Salads or Fresh Pasta"
                className="w-full bg-white/30 border border-white/20 focus:border-black focus:bg-white/80 p-4 rounded-2xl outline-none transition-all text-base"
                value={food.name}
                onChange={e => setFood({...food, name: e.target.value})}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Total Quantity
                </label>
                <input
                  type="text"
                  placeholder="e.g. 10 portions"
                  className="w-full bg-white/30 border border-white/20 focus:border-black focus:bg-white/80 p-4 rounded-2xl outline-none transition-all text-base"
                  value={food.quantity}
                  onChange={e => setFood({...food, quantity: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Pickup Deadline
                </label>
                <input
                  type="text"
                  placeholder="e.g. Before 11:00 PM"
                  className="w-full bg-white/30 border border-white/20 focus:border-black focus:bg-white/80 p-4 rounded-2xl outline-none transition-all text-base"
                  value={food.pickup_time}
                  onChange={e => setFood({...food, pickup_time: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Collection Location
              </label>
              <input
                type="text"
                placeholder="Enter branch name or specific address"
                className="w-full bg-white/30 border border-white/20 focus:border-black focus:bg-white/80 p-4 rounded-2xl outline-none transition-all text-base"
                value={food.location}
                onChange={e => setFood({...food, location: e.target.value})}
                required
              />
            </div>

            <div className="pt-4 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-[11px] font-medium leading-tight max-w-[200px]">
                  Shared instantly with authorized local charities.
                </span>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto bg-black text-white px-10 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
              >
                {isSubmitting ? 'Processing...' : 'Post Food Listing'}
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}