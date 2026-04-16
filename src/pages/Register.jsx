import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Phone, Calendar, ArrowRight, ClipboardCheck, ShieldCheck, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    password: '',
    agreeToTerms: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.agreeToTerms) {
      setError('Regulatory compliance required.');
      return;
    }

    setLoading(true);
    try {
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        age: Number(formData.age),
        password: formData.password
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Identity initialization failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full"
      >
        <div className="text-center mb-10">
           <div className="h-16 w-16 bg-primary rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-primary/20 mx-auto mb-6 group cursor-default">
              <Heart size={32} className="text-white fill-current group-hover:scale-110 transition-transform duration-500" />
           </div>
           <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">QueueSeva</h1>
           <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Create Your Clinical Sanctuary Identity</p>
        </div>

        <div className="premium-card bg-white p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-dark"></div>
          
          <div className="flex items-center justify-between mb-8">
             <h2 className="text-xl font-black text-slate-800 tracking-tight">Identity Registration</h2>
             <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                <ShieldCheck size={12} />
                Secure Array
             </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8 p-4 bg-red-50 border border-red-500/10 rounded-xl flex items-center gap-3 text-red-500"
            >
              <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
              <span className="text-xs font-black uppercase tracking-widest leading-none">{error}</span>
            </motion.div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2 col-span-1 md:col-span-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Identity Name</label>
                 <div className="relative group">
                   <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={18} />
                   <input
                     name="name"
                     type="text"
                     placeholder="John Clinical Doe"
                     className="input-primary pl-12"
                     value={formData.name}
                     onChange={handleChange}
                     required
                   />
                 </div>
               </div>

               <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Age</label>
                 <div className="relative group">
                   <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={18} />
                   <input
                     name="age"
                     type="number"
                     placeholder="28"
                     className="input-primary pl-12"
                     value={formData.age}
                     onChange={handleChange}
                     required
                   />
                 </div>
               </div>

               <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mobile Telemetry</label>
                 <div className="relative group">
                   <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={18} />
                   <input
                     name="phone"
                     type="tel"
                     placeholder="+91 98765 43210"
                     className="input-primary pl-12"
                     value={formData.phone}
                     onChange={handleChange}
                     required
                   />
                 </div>
               </div>

               <div className="space-y-2 col-span-1 md:col-span-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Protocol</label>
                 <div className="relative group">
                   <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={18} />
                   <input
                     name="email"
                     type="email"
                     placeholder="jane@sanctuary.com"
                     className="input-primary pl-12"
                     value={formData.email}
                     onChange={handleChange}
                     required
                   />
                 </div>
               </div>

               <div className="space-y-2 col-span-1 md:col-span-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Access Password</label>
                 <div className="relative group">
                   <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={18} />
                   <input
                     name="password"
                     type="password"
                     placeholder="••••••••"
                     className="input-primary pl-12"
                     value={formData.password}
                     onChange={handleChange}
                     required
                   />
                 </div>
               </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 group cursor-pointer" onClick={() => setFormData(p => ({...p, agreeToTerms: !p.agreeToTerms}))}>
              <div className={`mt-0.5 h-5 w-5 rounded border-2 transition-all flex items-center justify-center ${formData.agreeToTerms ? 'bg-primary border-primary text-white scale-110' : 'bg-white border-slate-200'}`}>
                 {formData.agreeToTerms && <ArrowRight size={14} className="rotate-[-45deg]" />}
              </div>
              <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase tracking-widest select-none">
                I acknowledge the <span className="text-primary font-black hover:underline">Sanctuary Protocols</span> and <span className="text-primary font-black hover:underline">Clinical Data Ordinances</span>.
              </p>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-sm tracking-[0.05em] shadow-xl shadow-primary/20 active:scale-[0.98] mt-4">
              {loading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Create Identity</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
          Existing identity? <Link to="/login" className="text-primary font-black hover:underline cursor-pointer">Re-Authenticate</Link>
        </p>

        <div className="mt-12 flex items-center justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
           <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <ShieldCheck size={14} />
              Biolock Protected
           </div>
           <div className="h-1 w-1 rounded-full bg-slate-300"></div>
           <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              End-to-End Clinical Encryption
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
