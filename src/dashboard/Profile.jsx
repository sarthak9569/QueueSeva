import { useState } from 'react';
import { 
  User, 
  Settings, 
  ShieldCheck, 
  Activity, 
  Calendar, 
  Phone, 
  Mail, 
  ChevronRight, 
  Trash2,
  Award,
  Edit3,
  Check,
  X,
  Fingerprint,
  Smartphone,
  Info
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [loading, setLoading] = useState(false);

  const personalInfo = [
    { label: 'Full Name', key: 'name', value: user?.name, icon: User },
    { label: 'Age', key: 'age', value: user?.age || '28', icon: Calendar },
    { label: 'Phone Number', key: 'phone', value: user?.phone || '+91 98765 43210', icon: Phone },
    { label: 'Email Address', key: 'email', value: user?.email, icon: Mail },
  ];

  const handleStartEdit = (field, value) => {
    setEditingField(field);
    setEditValue(value || '');
  };

  const handleSaveEdit = async () => {
    setLoading(true);
    try {
      await updateProfile({ [editingField]: editValue });
      setEditingField(null);
    } catch (err) {
      console.error('Update failed', err);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'P';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-12"
    >
      {/* Profile Hero Section */}
      <div className="premium-card bg-white p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:scale-110 transition-transform">
           <User size={240} />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10 w-full">
           <div className="relative">
              <div className="h-32 w-32 rounded-[2.5rem] bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-4xl font-black shadow-2xl group-hover:rotate-3 transition-transform">
                {getInitials(user?.name)}
              </div>
              <button className="absolute -bottom-2 -right-2 h-10 w-10 bg-white shadow-lg rounded-xl flex items-center justify-center text-primary hover:scale-110 transition-all border border-slate-50">
                 <Edit3 size={18} />
              </button>
           </div>
           
           <div className="text-center md:text-left space-y-3">
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">{user?.name}</h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                 <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/5 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/10">
                    <Award size={12} />
                    Premium Member
                 </div>
                 <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                    <ShieldCheck size={12} />
                    Verified Patient
                 </div>
              </div>
              <p className="text-sm font-medium text-slate-400 max-w-sm">Patient ID: <span className="text-slate-900 font-bold">#Seva-9569-420</span></p>
           </div>
        </div>

        <div className="flex items-center gap-4 relative z-10 shrink-0">
           <button className="btn-secondary px-6">
              <Settings size={18} />
              Preferences
           </button>
           <button onClick={() => logout()} className="h-12 w-12 bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl flex items-center justify-center transition-all active:scale-90">
              <Trash2 size={20} />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Personal Details - High Density Grid */}
        <div className="lg:col-span-8 space-y-6">
           <div className="flex items-center justify-between mb-2">
              <h3 className="text-primary-header">Account Specifications</h3>
              <p className="text-[10px] font-black text-primary uppercase tracking-widest">Secure Data</p>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {personalInfo.map((item) => (
                <div 
                  key={item.key} 
                  className="premium-card group cursor-pointer hover:border-primary/20 transition-all"
                  onClick={() => editingField !== item.key && handleStartEdit(item.key, item.value)}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-4 w-full">
                       <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                             <item.icon size={16} />
                          </div>
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                       </div>
                       
                       <AnimatePresence mode="wait">
                         {editingField === item.key ? (
                            <motion.div 
                              initial={{ opacity: 0, x: -5 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="flex items-center gap-2" 
                              onClick={e => e.stopPropagation()}
                            >
                              <input 
                                className="w-full bg-slate-50 border-none rounded-xl px-4 py-2 text-sm font-black text-slate-800 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                autoFocus
                              />
                              <button onClick={handleSaveEdit} className="h-9 w-9 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 active:scale-90 transition-all"><Check size={18}/></button>
                              <button onClick={() => setEditingField(null)} className="h-9 w-9 bg-slate-100 text-slate-400 rounded-xl flex items-center justify-center active:scale-90 transition-all"><X size={18}/></button>
                            </motion.div>
                         ) : (
                            <div className="flex items-center justify-between group-hover:translate-x-1 transition-transform">
                              <p className="text-base font-black text-slate-800 tracking-tight">{item.value || 'Not provided'}</p>
                              <ChevronRight size={16} className="text-slate-200 group-hover:text-primary transition-colors" />
                            </div>
                         )}
                       </AnimatePresence>
                    </div>
                  </div>
                </div>
              ))}
           </div>

           <div className="premium-card bg-slate-50 border-slate-200 p-8 flex items-center gap-6 group cursor-pointer overflow-hidden">
              <div className="h-16 w-16 shrink-0 rounded-[1.5rem] bg-white shadow-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform border border-slate-100">
                 <ShieldCheck size={32} />
              </div>
              <div className="relative z-10">
                 <h4 className="text-lg font-black text-slate-800 mb-1 tracking-tight">Security & Medical Access</h4>
                 <p className="text-sm font-medium text-slate-400 leading-relaxed max-w-lg">Manage your biometric clinical authentication and encrypted health sanctuary keys. Ensuring your medical privacy is our ultimate directive.</p>
              </div>
              <div className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                 <ChevronRight size={24} className="text-primary" />
              </div>
           </div>
        </div>

        {/* Side Actions & Stats */}
        <div className="lg:col-span-4 space-y-6">
           <div className="premium-card">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 border-b border-slate-50 pb-4">
                 System Overview
              </h4>
              <div className="space-y-6">
                 {[
                   { label: 'Cloud Synchronized', value: 'Active', color: 'text-emerald-500', icon: ShieldCheck },
                   { label: 'Device Linked', value: 'iPhone 15 Pro', icon: Smartphone },
                   { label: 'Account Created', value: '14 Oct 2023', icon: Calendar },
                 ].map((item, i) => (
                   <div key={i} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2.5 text-slate-500 font-bold">
                         <item.icon size={16} className="text-slate-300" />
                         {item.label}
                      </div>
                      <span className={`font-black ${item.color || 'text-slate-800'}`}>{item.value}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="premium-card bg-slate-900 border-slate-800 text-white overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-4 text-white opacity-10">
                 <Fingerprint size={80} />
              </div>
              <div className="relative z-10">
                 <h4 className="text-lg font-black tracking-tight mb-2">Digital Sanctuary Key</h4>
                 <p className="text-white/40 text-xs font-medium leading-relaxed mb-6">Your unique clinical identifier for secure offline token verification.</p>
                 <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center justify-between group-hover:bg-white/20 transition-colors">
                    <span className="text-xs font-black tracking-widest font-mono">X-442-9569-SAV</span>
                    <Fingerprint size={16} className="text-primary" />
                 </div>
              </div>
           </div>

           <div className="premium-card bg-red-500/[0.02] border-red-500/10 p-6 space-y-4">
              <div className="flex items-center gap-3 text-red-500">
                 <Info size={18} />
                 <h4 className="text-xs font-black uppercase tracking-widest">Danger Zone</h4>
              </div>
              <p className="text-[10px] text-slate-400 font-medium leading-relaxed">Account deletion is permanent. All clinical records, sanctuary tokens, and medical vault history will be destroyed from our secure array.</p>
              <button className="w-full py-3.5 bg-red-500 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-red-500/20 hover:bg-red-600 transition-all active:scale-95">
                 Request Deletion
              </button>
           </div>
        </div>
      </div>

      {/* EMERGENCY BUTTON (STRICT POSITIONING) */}
      <div className="fixed bottom-6 right-6 z-50">
         <button className="bg-rose-500/90 text-white flex items-center gap-3 px-6 py-4 rounded-xl shadow-md hover:scale-105 transition-all group border border-rose-400/20 active:scale-95">
            <div className="bg-white/20 p-1.5 rounded-lg">
               <Activity size={20} />
            </div>
            <div className="text-left">
               <p className="text-[10px] font-black uppercase tracking-widest opacity-80 leading-none">Emergency</p>
               <p className="text-sm font-black tracking-tight">Request Help</p>
            </div>
         </button>
      </div>
    </motion.div>
  );
};

export default Profile;
