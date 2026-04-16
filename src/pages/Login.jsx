import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Mail, Lock, LogIn, Heart, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Required clinical credentials missing.');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication sequence failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-10">
           <div className="h-16 w-16 bg-primary rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-primary/20 mx-auto mb-6 group cursor-default">
              <Heart size={32} className="text-white fill-current group-hover:scale-110 transition-transform duration-500" />
           </div>
           <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">QueueSeva</h1>
           <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Clinical Sanctuary Access</p>
        </div>

        <div className="premium-card bg-white p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-dark"></div>
          
          <h2 className="text-xl font-black text-slate-800 mb-8 tracking-tight">Initiate Authentication</h2>

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-500/10 rounded-xl flex items-center gap-3 text-red-500"
            >
              <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
              <span className="text-xs font-black uppercase tracking-widest leading-none">{error}</span>
            </motion.div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={18} />
                <input
                  type="email"
                  placeholder="name@clinic.com"
                  className="input-primary pl-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                 <a href="#" className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Vault Reset?</a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={18} />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input-primary pl-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-sm tracking-[0.05em] shadow-xl shadow-primary/20 active:scale-[0.98]">
              {loading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Initialize Portal</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
          
          <div className="mt-10 pt-8 border-t border-slate-50 flex items-center justify-center gap-4">
             <div className="flex -space-x-3">
                {[1,2,3].map(i => (
                   <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                   </div>
                ))}
             </div>
             <p className="text-[10px] font-bold text-slate-400 leading-tight uppercase tracking-widest">Join <span className="text-slate-900 font-black">2,400+</span> patients in the clinical sanctuary</p>
          </div>
        </div>

        <p className="text-center mt-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
          New to the sanctuary? <Link to="/signup" className="text-primary font-black hover:underline cursor-pointer">Register Identity</Link>
        </p>

        <div className="mt-12 flex items-center justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
           <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <ShieldCheck size={14} />
              AES-256 Protected
           </div>
           <div className="h-1 w-1 rounded-full bg-slate-300"></div>
           <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              ISO 27001 Certified
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
