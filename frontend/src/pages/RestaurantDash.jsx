import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';
import api from '../api/api';
import toast from 'react-hot-toast';
import { gsap } from 'gsap';
import DashboardLayout from '../components/DashboardLayout';

export default function RestaurantDash() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const activeTab = query.get("view") || "post";

  const [foods, setFoods] = useState([]);
  const [requests, setRequests] = useState([]);
  const [foodForm, setFoodForm] = useState({ name: '', quantity: '', location: '', pickup_time: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [filterStatus, setFilterStatus] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const formRef = useRef(null);
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

  useEffect(() => {
    fetchData();
    if (activeTab === 'post' && formRef.current) {
      gsap.fromTo(formRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
    }
  }, [activeTab]);

  const fetchData = async () => {
    try {
      const foodRes = await api.get('/foods');
      const myInventory = foodRes.data.reverse();
      setFoods(myInventory);

      const requestPromises = myInventory.map(food => api.get(`/requests/food/${food._id}`));
      const requestResponses = await Promise.allSettled(requestPromises);

      const allRequests = requestResponses
        .filter(res => res.status === 'fulfilled')
        .flatMap(res => res.value.data)
        .map(req => {
          const matchingFood = myInventory.find(f => f._id === req.food);
          return { ...req, food: matchingFood || null };
        })
        .filter(req => req.food !== null)
        .reverse(); 
        
      setRequests(allRequests);
    } catch (err) {
      console.error("Dashboard data fetch failed", err);
    }
  };

  const handlePostFood = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingId) {
        await api.put(`/foods/${editingId}`, foodForm);
      } else {
        await api.post('/foods', { ...foodForm, restaurant_id: user?.user?._id || user?.user?.id });
      }
      toast.success(editingId ? 'Listing updated!' : 'Food listed successfully');
      setFoodForm({ name: '', quantity: '', location: '', pickup_time: '' });
      setEditingId(null);
      fetchData();
    } catch (err) {
      toast.error('Failed to process listing');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRequestAction = async (id, action) => {
    try {
      if (action === "pickup") {
        await api.put(`/requests/${id}/pickup`);
      } else {
        await api.patch(`/requests/${id}/${action}`);
      }
      fetchData();
      toast.success(`Request marked as ${action}`);
    } catch (err) {
      toast.error("Action failed");
    }
  };

  const deleteFood = async (id) => {
    try {
      await api.delete(`/foods/${id}`);
      fetchData();
      toast.success("Listing removed");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const filteredRequests = requests.filter(req => {
    if (filterStatus === 'all') return true;
    return req.status === filterStatus;
  });

  const getHeaderContent = () => {
    if (activeTab === 'post') return { title: "From Surplus to Smiles", subtitle: "Enter the details of the food available for donation." };
    if (activeTab === 'inventory') return { title: "Inventory Management", subtitle: "Manage and track your active surplus listings." };
    if (activeTab === 'requests') return { title: "Charity Requests", subtitle: "Approve requests and track pick-ups." };
  };

  const header = getHeaderContent();

  const filterOptions = [
    { label: 'All Requests', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Accepted', value: 'accepted' },
    { label: 'Picked Up', value: 'picked_up' },
    { label: 'Rejected', value: 'rejected' }
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-10 max-w-[1100px] mx-auto">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2 text-gray-900">{header.title}</h1>
          <p className="text-gray-600 text-lg">{header.subtitle}</p>
        </div>

        {activeTab === 'requests' && (
          <div className="relative" ref={dropdownRef}>
            <div 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-white/40 backdrop-blur-2xl px-6 rounded-full border border-white/60 shadow-sm flex items-center justify-between gap-4 h-[56px] cursor-pointer hover:bg-white/60 transition-all min-w-[200px]"
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
        )}
      </div>

      <div className="max-w-[1100px] mx-auto">
        {activeTab === 'post' && (
          <div ref={formRef} className="bg-white/20 backdrop-blur-[40px] border border-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-[2.5rem] p-10 sm:p-12">
            <form onSubmit={handlePostFood} className="space-y-8">
              <div>
                <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-3">Food Item Name</label>
                <input type="text" placeholder="e.g. Mixed Vegetable Salads or Fresh Pasta" className="w-full bg-white/40 focus:bg-white/70 p-5 rounded-2xl outline-none transition-all placeholder:text-gray-400 font-medium text-gray-800" value={foodForm.name} onChange={e => setFoodForm({...foodForm, name: e.target.value})} required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-3">Total Quantity</label>
                  <input type="text" placeholder="e.g. 10 portions" className="w-full bg-white/40 focus:bg-white/70 p-5 rounded-2xl outline-none transition-all placeholder:text-gray-400 font-medium text-gray-800" value={foodForm.quantity} onChange={e => setFoodForm({...foodForm, quantity: e.target.value})} required />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-3">Pickup Deadline</label>
                  <input type="text" placeholder="e.g. Before 11:00 PM" className="w-full bg-white/40 focus:bg-white/70 p-5 rounded-2xl outline-none transition-all placeholder:text-gray-400 font-medium text-gray-800" value={foodForm.pickup_time} onChange={e => setFoodForm({...foodForm, pickup_time: e.target.value})} required />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-3">Collection Location</label>
                <input type="text" placeholder="Enter branch name or specific address" className="w-full bg-white/40 focus:bg-white/70 p-5 rounded-2xl outline-none transition-all placeholder:text-gray-400 font-medium text-gray-800" value={foodForm.location} onChange={e => setFoodForm({...foodForm, location: e.target.value})} required />
              </div>

              <div className="border-t border-white/40 pt-8 mt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3 text-gray-500">
                  <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <p className="text-xs font-semibold max-w-[200px] leading-tight">Shared instantly with authorized local charities.</p>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full sm:w-auto bg-black text-white px-10 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-xl">{isSubmitting ? 'Processing...' : (editingId ? 'Update Listing' : 'Post Food Listing')}</button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="space-y-4">
            {foods.length > 0 ? foods.map(food => (
              <div key={food._id} className="bg-white/20 backdrop-blur-[40px] p-5 sm:p-6 rounded-3xl border border-white/50 flex flex-col sm:flex-row justify-between sm:items-center gap-4 shadow-sm">
                <div>
                  <h3 className="font-bold text-xl text-gray-900">{food.name}</h3>
                  <p className="text-sm text-gray-600 mt-1 font-medium">{food.quantity} • {food.location}</p>
                  <span className="text-[10px] font-black uppercase bg-white/50 px-2 py-1 mt-2 rounded inline-block">{food.status}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setEditingId(food._id); setFoodForm(food); navigate("/restaurant?view=post"); }} className="bg-blue-500/10 text-blue-700 px-5 py-2.5 rounded-xl font-bold hover:bg-blue-500/20 transition-all">Edit</button>
                  <button onClick={() => deleteFood(food._id)} className="bg-red-500/10 text-red-700 px-5 py-2.5 rounded-xl font-bold hover:bg-red-500/20 transition-all">Delete</button>
                </div>
              </div>
            )) : <p className="text-center text-gray-500 py-10 font-bold uppercase tracking-widest">No Inventory Found</p>}
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="space-y-6 animate-fadeIn">
            {filteredRequests.length > 0 ? filteredRequests.map(req => (
              <div key={req._id} className="bg-white/20 backdrop-blur-[40px] p-5 sm:p-8 rounded-[2rem] border border-white/50 flex flex-col sm:flex-row justify-between sm:items-center gap-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] hover:bg-white/30 transition-all duration-300">
                <div className="max-w-xl">
                  <h4 className="font-black text-xl text-gray-900 drop-shadow-sm">{req.food.name}</h4>
                  <p className="text-base text-gray-700 font-semibold mt-2 mb-4 p-4 bg-white/40 rounded-xl border border-white/50 italic">"{req.message}"</p>
                  <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${req.status === 'pending' ? 'bg-yellow-400/20 text-yellow-700 border-yellow-400/30' : req.status === 'accepted' ? 'bg-blue-400/20 text-blue-700 border-blue-400/30' : req.status === 'rejected' ? 'bg-red-400/20 text-red-700 border-red-400/30' : 'bg-green-400/20 text-green-700 border-green-400/30'}`}>
                    {req.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {req.status === "pending" && (
                    <>
                      <button onClick={() => handleRequestAction(req._id, 'accept')} className="bg-green-500 text-white px-6 py-3 rounded-xl text-sm font-black shadow-lg shadow-green-500/30 hover:bg-green-600 hover:-translate-y-1 transition-all">Accept Request</button>
                      <button onClick={() => handleRequestAction(req._id, 'reject')} className="bg-red-500/10 text-red-700 px-6 py-3 rounded-xl text-sm font-black border border-red-500/20 hover:bg-red-500/20 transition-all">Reject</button>
                    </>
                  )}
                  {req.status === "accepted" && (
                    <button onClick={() => handleRequestAction(req._id, 'pickup')} className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-3 rounded-xl text-sm font-black shadow-xl hover:-translate-y-1 transition-all">Mark Picked Up</button>
                  )}
                </div>
              </div>
            )) : (
              <div className="bg-white/10 backdrop-blur-[40px] p-10 rounded-[2rem] border border-white/30 text-center shadow-inner">
                 <p className="text-gray-500 font-black uppercase tracking-widest text-sm">No {filterStatus !== 'all' ? filterStatus.replace('_', ' ') : ''} Requests Found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}