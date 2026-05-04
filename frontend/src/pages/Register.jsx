import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/api';
import toast from 'react-hot-toast';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'restaurant' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form); 
      
      toast.success('Registration successful!');
      navigate('/login');
    } catch (err) {
      console.error("Full Error Details:", err.response?.data);
      const errorMsg = err.response?.data?.msg || err.response?.data?.message || 'Registration failed';
      toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white font-sans">
      
      {/* Sidebar Section: Increased width to 48% for a bolder presence */}
      <div className="hidden md:flex md:w-[43%] bg-[#1c1c1c] p-6 md:p-12 flex-col justify-center relative overflow-hidden">
        
        {/* Taller Glassmorphism Container */}
        <div className="relative z-10 w-full max-w-[450px] mx-auto px-10 py-20 md:px-16 md:py-24 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
          
          <h1 className="text-white text-[clamp(1.8rem,3vw,2.8rem)] font-bold leading-[1.1] mb-10 tracking-tighter">
            Welcome to <br />
            our community
          </h1>
          
          <div className="pt-10 border-t border-white/10">
            <p className="text-white/40 text-[0.7rem] leading-[2] uppercase tracking-[0.25em] font-bold">
              A collaborative hub designed for restaurants and charities to reduce food waste and improve distribution efficiency.
            </p>
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* Right Section: Form Area */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-12 bg-white">
        <div className="w-full max-w-[560px]">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-[2.6rem] font-bold text-[#111111] mb-4 tracking-tight">
              Create Account
            </h2>
            <p className="text-[#111111]/60 text-[1rem] leading-relaxed font-medium">
              Join the platform for automated surplus matching and tracking.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              
              <div className="group">
                <label className="text-[0.75rem] font-bold text-[#111111] mb-2 block uppercase tracking-wider">
                  Full Name
                </label>
                <input 
                  type="text" 
                  required 
                  placeholder="Full Name"
                  className="w-full bg-[#f8faff] border border-[#111111]/10 p-4 rounded-xl outline-none focus:border-blue-500 transition-all text-[0.95rem] placeholder:text-gray-300 shadow-sm" 
                  onChange={e => setForm({...form, name: e.target.value})} 
                />
              </div>

              <div className="group">
                <label className="text-[0.75rem] font-bold text-[#111111] mb-2 block uppercase tracking-wider">
                  Email Address
                </label>
                <input 
                  type="email" 
                  required 
                  placeholder="Email Address"
                  className="w-full bg-[#f8faff] border border-[#111111]/10 p-4 rounded-xl outline-none focus:border-blue-500 transition-all text-[0.95rem] placeholder:text-gray-300 shadow-sm" 
                  onChange={e => setForm({...form, email: e.target.value})} 
                />
              </div>
              
              <div className="relative group">
                <label className="text-[0.75rem] font-bold text-[#111111] mb-2 block uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required 
                    placeholder="Password"
                    className="w-full bg-[#f8faff] border border-[#111111]/10 p-4 pr-12 rounded-xl outline-none focus:border-blue-500 transition-all text-[0.95rem] placeholder:text-gray-300 shadow-sm" 
                    onChange={e => setForm({...form, password: e.target.value})} 
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#111111]/20 hover:text-[#111111] transition-colors"
                  >
                    {showPassword ? (
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c7 0 11-8 11-8s-4-8-11-8-11 8-11 8 4 8 11 8z" />
                        <circle cx="12" cy="12" r="3" />
                        <path d="M1 1l22 22" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="group">
                <label className="text-[0.75rem] font-bold text-[#111111] mb-2 block uppercase tracking-wider">
                  I am a
                </label>
                <select 
                  className="w-full bg-[#f8faff] border border-[#111111]/10 p-4 rounded-xl bg-white outline-none focus:border-blue-500 transition-all text-[0.95rem] shadow-sm appearance-none cursor-pointer" 
                  onChange={e => setForm({...form, role: e.target.value})}
                >
                  <option value="restaurant">Restaurant (Donate Food)</option>
                  <option value="charity">Charity (Receive Food)</option>
                </select>
              </div>
            </div>

            <button 
              className="w-full bg-[#111111] text-white py-4 rounded-xl font-bold text-[1.05rem] hover:bg-black transition-all shadow-xl shadow-black/5 cursor-pointer"
            >
              Sign Up
            </button>

            <p className="text-[0.9rem] font-medium text-[#111111]/50 text-center">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 font-bold hover:underline">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
