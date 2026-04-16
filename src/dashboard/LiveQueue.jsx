import { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  Clock, 
  MapPin, 
  Wifi, 
  QrCode, 
  Info, 
  TrendingUp, 
  Activity,
  AlertCircle,
  BarChart2,
  Signal,
  ArrowUpRight
} from 'lucide-react';
import axiosInstance from '../api/axiosInstance';
import { motion, AnimatePresence } from 'framer-motion';

const LiveQueue = () => {
  const [data, setData] = useState({ departments: [], userToken: null });
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const prevWaitCount = useRef(null);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/queue/live');
      setData(response.data);
      
      if (response.data.userToken) {
        const myDept = response.data.departments.find(d => d.department === response.data.userToken.department);
        if (myDept && myDept.count <= 3 && myDept.count > 0) {
          if (prevWaitCount.current > 3 || prevWaitCount.current === null) {
              setShowToast(true);
              setTimeout(() => setShowToast(false), 5000);
          }
        }
        prevWaitCount.current = myDept?.count;
      }
    } catch (err) {
      console.error('Failed to poll queue data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const activeDept = data.userToken ? data.departments.find(d => d.department === data.userToken.department) : data.departments[0];
  const peopleAhead = activeDept?.count || 0;
  const estWait = data.userToken?.estimatedWaitMinutes || 0;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 pb-12"
    >
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-8 z-[100] bg-primary text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/20"
          >
            <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center animate-pulse">
              <AlertCircle size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest leading-none mb-1 opacity-80">Urgent Alert</p>
              <p className="font-black text-sm tracking-tight">Your turn is approaching — 3 tokens left!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="premium-card bg-white relative overflow-hidden flex items-center justify-between">
           <div className="relative z-10">
              <p className="text-label mb-2">My Token</p>
              <h3 className="text-5xl font-black text-slate-900 tracking-tighter">
                {data.userToken ? data.userToken.tokenNumber : 'N/A'}
              </h3>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-slate-400">
                 <MapPin size={14} className="text-primary" />
                 {data.userToken ? data.userToken.department : 'No Token Selected'}
              </div>
           </div>
           <div className="opacity-5 scale-150 absolute -right-4 -bottom-4 text-primary">
              <Activity size={120} />
           </div>
        </div>

        <div className="premium-card bg-primary text-white border-none flex items-center justify-between group overflow-hidden">
           <div className="relative z-10">
              <p className="text-[10px] uppercase font-bold tracking-widest text-white/60 mb-2">People Ahead</p>
              <h3 className="text-5xl font-black tracking-tighter leading-none">{peopleAhead}</h3>
              <p className="mt-4 text-xs font-bold text-white/80 flex items-center gap-1.5">
                 <Users size={16} /> Patient Density Tracking
              </p>
           </div>
           <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users size={32} />
           </div>
        </div>

        <div className="premium-card border-slate-100 flex items-center justify-between">
           <div>
              <p className="text-label mb-2 text-primary">Estimated Wait</p>
              <h3 className="text-5xl font-black text-slate-900 tracking-tighter">
                ~ {estWait} <span className="text-xl text-slate-400">min</span>
              </h3>
              <div className="mt-4 flex items-center gap-2">
                 <div className="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.max(20, 100 - (peopleAhead * 10))}%` }}
                      className="h-full bg-primary"
                    />
                 </div>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Calculated</span>
              </div>
           </div>
           <div className="h-16 w-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
              <Clock size={32} />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Section - Departmental Load */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-primary-header">Departmental Load</h3>
              <p className="text-secondary-label">Live status across all clinical wings</p>
            </div>
            <button className="text-primary text-xs font-black uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
               View Floor Map <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.departments.map((dept) => (
              <div key={dept.department} className={`premium-card p-5 group ${data.userToken?.department === dept.department ? 'border-primary/30 ring-1 ring-primary/10 bg-primary/[0.01]' : ''}`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-black text-slate-800 tracking-tight flex items-center gap-2">
                      {dept.department}
                      {data.userToken?.department === dept.department && (
                        <span className="bg-primary text-white text-[8px] px-1.5 py-0.5 rounded-full uppercase tracking-tighter font-black">My Dept</span>
                      )}
                    </h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                      {dept.load} Volume • {dept.currentToken || 'S-12'} Current
                    </p>
                  </div>
                  <Signal 
                    size={16} 
                    className={dept.load === 'High' ? 'text-red-500' : dept.load === 'Moderate' ? 'text-amber-500' : 'text-emerald-500'} 
                  />
                </div>
                
                <div className="space-y-2">
                   <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                      <span className="text-slate-400">Real-time Load</span>
                      <span className={dept.load === 'High' ? 'text-red-500' : 'text-slate-600'}>
                         {dept.load === 'High' ? '80%' : dept.load === 'Moderate' ? '50%' : '20%'}
                      </span>
                   </div>
                   <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: dept.load === 'High' ? '80%' : dept.load === 'Moderate' ? '50%' : '20%' }}
                         className={`h-full ${dept.load === 'High' ? 'bg-red-500' : dept.load === 'Moderate' ? 'bg-amber-500' : 'bg-emerald-500'}`}
                      />
                   </div>
                </div>

                <div className="mt-4 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-50 pt-3">
                   <span>Wait List: <span className="text-slate-800">{dept.count}</span></span>
                   <span className="opacity-50 group-hover:opacity-100 transition-opacity flex items-center gap-1">Details <ArrowUpRight size={10} /></span>
                </div>
              </div>
            ))}
          </div>

          <div className="premium-card bg-primary/[0.02] border-primary/10 p-8 flex flex-col md:flex-row items-center justify-between group">
            <div className="max-w-md">
                <h4 className="text-xl font-black text-slate-800 mb-2 tracking-tight">Want to relax?</h4>
                <p className="text-sm text-slate-500 mb-6 font-medium leading-relaxed">Scan the QR code to find our premium patient lounge with refreshments and digital entertainment while you wait.</p>
                <button className="btn-secondary group-hover:border-primary/30 transition-all">
                    Find Sanctuary Lounge
                </button>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-xl border border-slate-100 group-hover:scale-105 transition-transform duration-500">
                <QrCode size={100} className="text-slate-800 opacity-80" />
            </div>
          </div>
        </div>

        {/* Sidebar Section - Clinic Overview */}
        <div className="lg:col-span-4 space-y-6">
          <div className="premium-card">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 border-b border-slate-50 pb-4 flex items-center gap-2">
              <BarChart2 size={16} className="text-primary" />
              Clinic Overview
            </h4>
            <div className="space-y-6">
               {[
                 { label: 'Total Patients Today', value: '482', icon: Users },
                 { label: 'Avg Consultation Time', value: '12m', icon: Clock },
                 { label: 'System Load Status', value: 'High', color: 'text-red-500', icon: Activity },
               ].map((item, i) => (
                 <div key={i} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                        <item.icon size={16} />
                      </div>
                      <span className="text-xs font-bold text-slate-500 tracking-tight">{item.label}</span>
                    </div>
                    <span className={`text-base font-black tracking-tight ${item.color || 'text-slate-800'}`}>{item.value}</span>
                 </div>
               ))}
            </div>

            <div className="mt-8 relative h-32 rounded-2xl overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-secondary/80 mix-blend-multiply transition-opacity group-hover:opacity-100 opacity-90 z-10"></div>
               <img src="https://images.unsplash.com/photo-1576091160550-217359f4ecf8?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110" />
               <div className="absolute inset-0 z-20 p-5 flex flex-col justify-end">
                  <p className="text-[10px] font-black text-white/60 uppercase tracking-widest leading-none mb-1">Clinic Live Stream</p>
                  <h4 className="text-white text-sm font-black tracking-tight flex items-center gap-2">
                     Main Sanctuary Hall
                     <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse shadow-glow"></div>
                  </h4>
               </div>
            </div>
          </div>

          <div className="premium-card bg-slate-900 border-none">
             <div className="flex items-center gap-3 mb-6">
               <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                  <Wifi size={20} />
               </div>
               <div>
                  <p className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none mb-1">Sanctuary Mesh</p>
                  <p className="text-sm font-black text-white tracking-tight">Complimentary Wi-Fi</p>
               </div>
             </div>
             <div className="space-y-4">
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5 group hover:bg-white/10 transition-all cursor-pointer">
                   <div>
                      <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest leading-none mb-1">SSID</p>
                      <p className="text-xs font-bold text-white tracking-tight">QueueSeva_Sanctuary</p>
                   </div>
                   <Signal size={14} className="text-primary" />
                </div>
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5 group hover:bg-white/10 transition-all cursor-pointer">
                   <div>
                      <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest leading-none mb-1">Access Key</p>
                      <p className="text-xs font-bold text-white tracking-tight">SevaHealth@2024</p>
                   </div>
                   <Clock size={14} className="text-white/30" />
                </div>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LiveQueue;
