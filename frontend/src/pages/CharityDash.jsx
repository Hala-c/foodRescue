import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';
import api from '../api/api';
import toast from 'react-hot-toast';
import { gsap } from 'gsap';
import DashboardLayout from '../components/DashboardLayout';

export default function CharityDash() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const activeTab = query.get("view") || "browse";

  const userId = user?.user?._id || user?.id || user?._id;
  const charityName = user?.user?.name || user?.name || "Verified Charity";

  const [foods, setFoods] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestingId, setRequestingId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const cardsRef = useRef([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [foodRes, reqRes] = await Promise.all([
        api.get('/foods'),
        api.get('/requests')
      ]);

      const validRequests = reqRes.data.filter(req => req.food !== null).reverse();
      setMyRequests(validRequests);

      const activeRequests = validRequests.filter(req => req.status !== 'rejected');
      const requestedFoodIds = activeRequests.map(req => 
        (typeof req.food === 'object' ? req.food._id : req.food)
      );

      const availableFoods = foodRes.data
        .filter(f => f.status === 'available' && !requestedFoodIds.includes(f._id))
        .reverse(); 

      setFoods(availableFoods);
    } catch (err) {
      console.error("Sync failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [activeTab]);

  useEffect(() => {
    if (!loading && activeTab === 'browse' && foods.length > 0) {
      gsap.fromTo(cardsRef.current,
        { opacity: 0, y: 20, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, stagger: 0.08, ease: "power4.out" }
      );
    }
  }, [loading, activeTab, foods]);

  const handleRequest = async (item) => {
    try {
      setRequestingId(item._id);
      
      await api.post('/requests', { 
        food: item.name, 
        message: `Requested by: ${charityName}`, 
        requester: userId 
      });

      toast.success(`Allocated: ${item.name}`);

      gsap.to(`.card-${item._id}`, { 
        opacity: 0, 
        scale: 0.9, 
        duration: 0.4, 
        onComplete: () => {
          setFoods(prev => prev.filter(f => f._id !== item._id));
        } 
      });

    } catch (err) {
      toast.error("Transaction refused");
    } finally {
      setRequestingId(null);
    }
  };

  const filteredRequests = myRequests.filter(req => {
    if (filterStatus === 'all') return true;
    return req.status === filterStatus;
  });

  const filterOptions = [
    { label: 'All History', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Accepted', value: 'accepted' },
    { label: 'Picked Up', value: 'picked_up' },
    { label: 'Rejected', value: 'rejected' }
  ];

  return (
    <DashboardLayout>
      {activeTab === 'browse' ? (
        <>
          <header className="mb-10 mt-4 px-4 sm:px-0">
            <span className="block text-[10px] font-black tracking-[0.5em] text-gray-500 uppercase">Operational Exchange // {new Date().getFullYear()}</span>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter uppercase leading-[0.9] mt-4">Surplus Logistics</h1>
          </header>

          <div className="grid gap-6 px-4 sm:px-0">
            {foods.length > 0 ? foods.map((item, index) => (
              <div key={item._id} ref={el => cardsRef.current[index] = el} className={`card-${item._id} flex flex-col md:flex-row bg-white/20 backdrop-blur-[40px] border border-white/50 p-6 rounded-3xl items-center justify-between shadow-sm`}>
                <div className="flex-1 w-full">
                  <h4 className="text-2xl font-black tracking-tight uppercase leading-tight">{item.name}</h4>
                  <div className="flex gap-2 mt-2">
                    <span className="text-[9px] font-black tracking-[0.2em] uppercase bg-black text-white px-2 py-1 rounded">Asset_Verified</span>
                  </div>
                  <div className="flex gap-8 mt-4 text-[10px] font-black text-gray-600 uppercase tracking-widest">
                    <p>Qty: <span className="text-sm text-black">{item.quantity}</span></p>
                    <p>Origin: <span className="text-sm text-black">{item.location}</span></p>
                  </div>
                </div>
                <button onClick={() => handleRequest(item)} disabled={requestingId === item._id} className="mt-4 md:mt-0 w-full md:w-auto px-10 py-5 bg-black text-white text-[10px] font-black tracking-[0.4em] uppercase rounded-2xl hover:-translate-y-1 transition-all disabled:opacity-50">
                  {requestingId === item._id ? "..." : "Commit"}
                </button>
              </div>
            )) : <p className="text-[10px] font-black tracking-[0.6em] text-gray-500 uppercase text-center py-10">Buffer Empty // Waiting for Resources</p>}
          </div>
        </>
      ) : (
        <div className="space-y-4 animate-fadeIn px-4 sm:px-0">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
            <h2 className="text-4xl font-black text-gray-800 tracking-tight drop-shadow-sm">History</h2>
            
            <div className="relative mx-auto sm:mx-0 w-full sm:w-auto" ref={dropdownRef}>
              <div 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-white/40 backdrop-blur-2xl px-6 rounded-full border border-white/60 shadow-sm flex items-center justify-between gap-4 h-[56px] cursor-pointer hover:bg-white/60 transition-all min-w-[220px]"
              >
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Filter:</span>
                <span className="font-black text-gray-900 text-[13px] uppercase tracking-wider">
                  {filterOptions.find(opt => opt.value === filterStatus)?.label}
                </span>
                <svg className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
              </div>

              {isDropdownOpen && (
                <div className="absolute top-[64px] right-0 w-full bg-white/80 backdrop-blur-3xl border border-white/60 rounded-[2rem] shadow-2xl overflow-hidden z-[100] animate-in fade-in zoom-in-95 duration-200">
                  {filterOptions.map((option) => (
                    <div 
                      key={option.value}
                      onClick={() => {
                        setFilterStatus(option.value);
                        setIsDropdownOpen(false);
                      }}
                      className={`px-6 py-4 text-[11px] font-black uppercase tracking-widest cursor-pointer transition-colors hover:bg-black hover:text-white ${filterStatus === option.value ? 'text-black bg-white/40' : 'text-gray-600'}`}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* MISSING CODE RESTORED: Mobile cards — Only status badge on the right */}
          <div className="md:hidden space-y-3">
            {filteredRequests.length > 0 ? filteredRequests.map(req => (
              <div key={req._id} className="bg-white/40 backdrop-blur-xl rounded-[2rem] border border-white/60 shadow-sm p-6 flex flex-row justify-between items-start">
                <div className="space-y-3">
                  <p className="font-black text-gray-800 text-xl">{req.food?.name || "Asset Removed"}</p>
                  <div>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Pickup Time</p>
                    <p className="text-gray-600 font-bold text-sm tracking-wider">{req.food?.pickup_time || "N/A"}</p>
                  </div>
                </div>
                
                <div className="mt-1">
                  <span className={`inline-block px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${req.status === 'rejected' ? 'bg-red-400/20 text-red-700 border-red-400/30' : req.status === 'pending' ? 'bg-yellow-400/20 text-yellow-700 border-yellow-400/30' : req.status === 'accepted' ? 'bg-blue-400/20 text-blue-700 border-blue-400/30' : 'bg-green-400/20 text-green-700 border-green-400/30'}`}>
                    {req.status}
                  </span>
                </div>
              </div>
            )) : (
              <div className="bg-white/40 backdrop-blur-xl rounded-[2rem] border border-white/60 shadow-sm p-12 text-center">
                <p className="text-gray-500 font-black uppercase tracking-widest text-sm">
                  No {filterStatus !== 'all' ? filterStatus.replace('_', ' ') : ''} History Found
                </p>
              </div>
            )}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-white/60 overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead className="bg-white/50 border-b border-black/5">
                <tr>
                  <th className="p-8 text-xs font-black uppercase tracking-widest text-gray-500">Asset</th>
                  <th className="p-8 text-xs font-black uppercase tracking-widest text-gray-500">Pickup Time</th>
                  <th className="p-8 text-xs font-black uppercase tracking-widest text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {filteredRequests.length > 0 ? filteredRequests.map(req => (
                  <tr key={req._id} className="hover:bg-black/[0.01] transition-colors">
                    <td className="p-8 font-black text-gray-800 text-xl">{req.food?.name || "Asset Removed"}</td>
                    <td className="p-8 text-gray-600 font-bold text-sm tracking-wider">{req.food?.pickup_time || "N/A"}</td>
                    <td className="p-8">
                      <span className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${req.status === 'rejected' ? 'bg-red-400/20 text-red-700 border-red-400/30' : req.status === 'pending' ? 'bg-yellow-400/20 text-yellow-700 border-yellow-400/30' : req.status === 'accepted' ? 'bg-blue-400/20 text-blue-700 border-blue-400/30' : 'bg-green-400/20 text-green-700 border-green-400/30'}`}>
                        {req.status}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="3" className="p-12 text-center">
                       <p className="text-gray-500 font-black uppercase tracking-widest text-sm">No History Found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}