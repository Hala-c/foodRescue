import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../api/api';
import toast from 'react-hot-toast';

export default function Login({ onHoverEnter, onHoverLeave }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', form);
      login(data);
      toast.success('Access Granted');
      
      if (data.user.role === 'restaurant') {
        navigate('/restaurant');
      } else {
        navigate('/charity');
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Authentication Failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white font-sans">
      
      {/* Sidebar Section: Hidden on mobile, visible on desktop */}
      <div className="hidden md:flex md:w-[45%] bg-[#1c1c1c] p-6 md:p-12 flex-col justify-center relative overflow-hidden">
        
        {/* Glassmorphism Container */}
        <div className="relative z-10 w-full max-w-[450px] mx-auto p-10 md:p-16 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
          
          <h1 className="text-white text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.1] mb-10 tracking-tighter">
            Welcome to <br />
            our community
          </h1>
          
          <div className="pt-8 border-t border-white/10">
            <p className="text-white/40 text-[0.75rem] md:text-[0.8rem] leading-[1.8] uppercase tracking-[0.25em] font-bold">
              A collaborative hub designed for restaurants and charities to reduce food waste and improve distribution efficiency.
            </p>
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* Right Section: Form Area */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-12 bg-white">
        <div className="w-full max-w-[400px]">
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-[2.6rem] font-bold text-[#111111] mb-5 tracking-tight">
              Sign In
            </h2>
            <p className="text-[#111111]/60 text-[0.95rem] leading-relaxed font-medium">
              Access the platform for automated surplus matching and tracking.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-7">
            <div className="space-y-6">
              <div className="group">
                <label className="text-[0.85rem] font-bold text-[#111111] mb-2.5 block uppercase tracking-wider">
                  Email address
                </label>
                <input 
                  type="email" 
                  required 
                  placeholder="name@organization.com"
                  className="w-full bg-[#f8faff] border border-[#111111]/10 p-4 rounded-xl outline-none focus:border-blue-500 transition-all text-[1rem] placeholder:text-gray-300 shadow-sm" 
                  onChange={e => setForm({...form, email: e.target.value})} 
                />
              </div>
              
              <div className="relative group">
                <label className="text-[0.85rem] font-bold text-[#111111] mb-2.5 block uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required 
                    placeholder="••••••••"
                    className="w-full bg-[#f8faff] border border-[#111111]/10 p-4 pr-12 rounded-xl outline-none focus:border-blue-500 transition-all text-[1rem] placeholder:text-gray-300 shadow-sm" 
                    onChange={e => setForm({...form, password: e.target.value})} 
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#111111]/20 hover:text-[#111111] transition-colors"
                  >
                    {showPassword ? (
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c7 0 11-8 11-8s-4-8-11-8-11 8-11 8 4 8 11 8z" />
                        <circle cx="12" cy="12" r="3" />
                        <path d="M1 1l22 22" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <button 
              onMouseEnter={onHoverEnter} 
              onMouseLeave={onHoverLeave}
              className="w-full bg-[#111111] text-white py-4 rounded-xl font-bold text-[1.05rem] hover:bg-black transition-all shadow-xl shadow-black/5 cursor-pointer"
            >
              Log In
            </button>

            <p className="text-[0.9rem] font-medium text-[#111111]/50 text-center">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-600 font-bold hover:underline">Create free account</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}