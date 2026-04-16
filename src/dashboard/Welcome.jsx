import { useState, useEffect } from 'react';
import { 
  Users, 
  CheckCircle, 
  Activity, 
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Clock,
  Calendar
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../api/axiosInstance';
import { motion } from 'framer-motion';

const Welcome = () => {
  const { user } = useAuth();
  const [data, setData] = useState({ departments: [], userToken: null });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/queue/live');
        setData(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const totalWait = data.departments.reduce((acc, d) => acc + d.count, 0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 pb-12"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 leading-[1.1]">
            Welcome back, <br />
            <span className="text-primary">{user?.name}</span>
          </h1>
          <p className="text-slate-500 mt-3 max-w-lg font-medium leading-relaxed">
            The clinical sanctuary is prepared. Manage your patient flow with precision and tranquility today.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="glass-card flex items-center gap-3 px-5 py-3 border-primary/10">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Clinic Status</p>
              <p className="text-sm font-bold text-slate-800 tracking-tight">System Optimal</p>
            </div>
          </div>
          <div className="glass-card flex items-center gap-3 px-5 py-3 border-primary/10">
            <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Date Today</p>
              <p className="text-sm font-bold text-slate-800 tracking-tight">
                {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Quick Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Users, label: 'Live Queue', value: totalWait, color: 'primary', trend: '+12% from avg' },
          { icon: CheckCircle, label: 'Completed Today', value: '42', color: 'emerald', trend: 'Target: 50' },
          { icon: TrendingUp, label: 'Patient Satisfaction', value: '98%', color: 'blue', trend: 'Record High' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5 }}
            className="premium-card flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className={`h-14 w-14 rounded-2xl bg-${stat.color}-500/10 flex items-center justify-center text-${stat.color}-500 shadow-sm border border-${stat.color}-500/10`}>
                <stat.icon size={28} />
              </div>
              <div>
                <p className="text-label mb-1">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</h3>
                  <span className="text-[10px] font-bold text-emerald-500">{stat.trend}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Token Card */}
        <div className="lg:col-span-2 space-y-6">
          {data.userToken ? (
            <div className="premium-card bg-gradient-to-br from-primary to-primary-dark text-white border-none p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                <Clock size={160} />
              </div>
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <div className="bg-white/20 backdrop-blur-sm self-start px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 inline-block">
                    Current Active Token
                  </div>
                  <h3 className="text-5xl font-black tracking-tighter mb-2">#{data.userToken.tokenNumber}</h3>
                  <div className="flex items-center gap-2 opacity-80 font-medium">
                     <Activity size={18} />
                     <span>Wing B, 3rd Floor • Oncology Dept.</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Estimated Wait</p>
                  <p className="text-4xl font-black tracking-tight">{data.userToken.estimatedWaitMinutes} <span className="text-xl opacity-60">min</span></p>
                </div>
              </div>
              <div className="mt-12 flex gap-4 relative z-10">
                <button className="bg-white text-primary px-8 py-3.5 rounded-2xl font-black text-sm shadow-xl hover:bg-slate-50 transition-all active:scale-95 leading-none">
                   Start Consultation
                </button>
                <button className="bg-white/20 backdrop-blur-md text-white px-8 py-3.5 rounded-2xl font-black text-sm hover:bg-white/30 transition-all active:scale-95 leading-none">
                   Reschedule
                </button>
              </div>
            </div>
          ) : (
            <div className="premium-card border-dashed border-2 bg-primary/5 flex flex-col items-center justify-center p-12 text-center group">
               <div className="h-20 w-20 rounded-[2.5rem] bg-white shadow-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Activity size={32} />
               </div>
               <h3 className="text-2xl font-black text-slate-800 mb-2">Ready for a checkup?</h3>
               <p className="text-slate-500 max-w-xs mx-auto text-sm leading-relaxed mb-8">
                 You don't have an active token for today. Select a clinical department to get started.
               </p>
               <button className="btn-primary px-10 py-4 shadow-lg shadow-primary/20">
                  Generate Your Token <ArrowRight size={20} />
               </button>
            </div>
          )}

          {/* Sanctuary Banner */}
          <div className="premium-card p-0 flex flex-col md:flex-row overflow-hidden group">
            <div className="flex-1 p-8">
              <span className="text-[10px] uppercase font-black text-primary tracking-widest mb-3 inline-block">Enhanced Sanctuary Experience</span>
              <h4 className="text-2xl font-black text-slate-800 mb-3 tracking-tight">Patient Atmosphere Control</h4>
              <p className="text-sm text-slate-500 leading-relaxed mb-6 font-medium">
                QueueSeva's Digital Sanctuary mode is active. Our ambient display technology is currently reducing patient perceived wait time by up to <span className="text-primary font-black">24%</span> through targeted visual harmonics.
              </p>
              <div className="flex gap-6">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-200"></div> 
                  Active Visuals
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <div className="w-2 h-2 rounded-full bg-blue-500 shadow-sm shadow-blue-200"></div> 
                  Low Latency Sync
                </div>
              </div>
            </div>
            <div className="w-full md:w-80 bg-slate-100 relative overflow-hidden">
               <div className="absolute inset-0 bg-primary/10 mix-blend-overlay group-hover:bg-primary/0 transition-all duration-700"></div>
               <img 
                 src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600" 
                 className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" 
                 alt="Hospital Interior"
               />
            </div>
          </div>
        </div>

        {/* Sidebar Panel - Clinic Overview */}
        <div className="space-y-6">
          <div className="premium-card">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 border-b border-slate-50 pb-4">
              Real-time Analytics
            </h4>
            <div className="space-y-6">
               {[
                 { label: 'Avg Consultation Time', value: '14m', sub: 'Optimal Range' },
                 { label: 'Current System Load', value: 'High', sub: '8 departments active', color: 'text-red-500' },
                 { label: 'Patient Density', value: '4.2', sub: 'Patients / sq.m' },
               ].map((item, i) => (
                 <div key={i} className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">{item.label}</p>
                      <p className="text-[10px] font-bold text-slate-400">{item.sub}</p>
                    </div>
                    <span className={`text-xl font-black tracking-tight ${item.color || 'text-slate-800'}`}>{item.value}</span>
                 </div>
               ))}
            </div>
            <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
               <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Resource Usage</span>
                  <span className="text-xs font-bold text-primary">82%</span>
               </div>
               <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '82%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-primary"
                  ></motion.div>
               </div>
            </div>
          </div>

          <div className="premium-card bg-slate-900 border-none relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-20 text-white">
              <TrendingUp size={80} />
            </div>
            <div className="relative z-10">
              <h4 className="text-white text-lg font-black tracking-tight mb-2">Daily Peak Tracking</h4>
              <p className="text-white/50 text-xs font-medium leading-relaxed mb-6">
                Monitor system-wide activity peaks to optimize your clinic visit.
              </p>
              <div className="h-24 flex items-end gap-1.5">
                {[40, 60, 45, 90, 65, 80, 50, 70, 85].map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="flex-1 bg-white/20 rounded-t-lg group-hover:bg-primary transition-colors cursor-pointer"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Welcome;
