import { useState, useEffect } from 'react';
import { 
  Heart, 
  Activity, 
  Bone, 
  Brain, 
  Baby, 
  Sun, 
  Ear, 
  Eye, 
  Info, 
  Printer, 
  Share2, 
  Stethoscope,
  ChevronRight,
  Clock,
  Calendar,
  Ticket
} from 'lucide-react';
import axiosInstance from '../api/axiosInstance';
import { motion, AnimatePresence } from 'framer-motion';

const DEPARTMENTS = [
  { id: 'General OPD', name: 'General OPD', desc: 'Standard checkups', icon: Stethoscope, color: 'blue' },
  { id: 'Cardiology', name: 'Cardiology', desc: 'Heart health', icon: Heart, color: 'red' },
  { id: 'Orthopaedics', name: 'Orthopaedics', desc: 'Bone & joint care', icon: Bone, color: 'orange' },
  { id: 'Neurology', name: 'Neurology', desc: 'Brain & nervous system', icon: Brain, color: 'purple' },
  { id: 'Paediatrics', name: 'Paediatrics', desc: 'Children healthcare', icon: Baby, color: 'pink' },
  { id: 'Dermatology', name: 'Dermatology', desc: 'Skin & hair', icon: Sun, color: 'amber' },
  { id: 'ENT', name: 'ENT', desc: 'Ear, Nose & Throat', icon: Ear, color: 'sky' },
  { id: 'Ophthalmology', name: 'Ophthalmology', desc: 'Eye & vision care', icon: Eye, color: 'emerald' },
];

const TokenGenerator = () => {
  const [selectedDept, setSelectedDept] = useState(null);
  const [deptCounts, setDeptCounts] = useState({});
  const [generatedToken, setGeneratedToken] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axiosInstance.get('/queue/live');
        const counts = {};
        response.data.departments.forEach(d => {
          counts[d.department] = d.count;
        });
        setDeptCounts(counts);
        if (response.data.userToken) {
          setGeneratedToken(response.data.userToken);
        }
      } catch (err) {
        console.error('Failed to fetch counts', err);
      }
    };
    fetchCounts();
  }, []);

  const handleGenerate = async () => {
    if (!selectedDept) return;
    setLoading(true);
    try {
      const response = await axiosInstance.post('/queue/generate', { department: selectedDept });
      setGeneratedToken(response.data);
      setSelectedDept(null);
    } catch (err) {
      console.error('Failed to generate token', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12"
    >
      <div className="lg:col-span-8 space-y-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Request Medical Token</h1>
          <p className="text-slate-500 font-medium tracking-tight">Select a clinical department to join the live sanctuary flow.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DEPARTMENTS.map((dept) => (
            <motion.div 
              key={dept.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedDept(dept.id)}
              className={`
                premium-card cursor-pointer relative group transition-all duration-300
                ${selectedDept === dept.id 
                  ? 'ring-2 ring-primary border-primary shadow-lg shadow-primary/10 bg-primary/[0.02]' 
                  : 'hover:border-primary/30'}
              `}
            >
              <div className={`h-12 w-12 rounded-xl bg-${dept.color}-500/10 flex items-center justify-center text-${dept.color}-500 mb-4 group-hover:scale-110 transition-transform`}>
                <dept.icon size={24} />
              </div>
              <div className="absolute top-4 right-4 bg-slate-50 px-2 py-1 rounded-lg text-[10px] font-black text-slate-400 border border-slate-100 uppercase tracking-widest leading-none">
                {deptCounts[dept.id] || 0} waiting
              </div>
              <h3 className="text-sm font-black text-slate-800 mb-1">{dept.name}</h3>
              <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{dept.desc}</p>
            </motion.div>
          ))}
        </div>

        <button 
          className="btn-primary w-full py-5 text-base shadow-xl shadow-primary/20 disabled:opacity-50"
          disabled={!selectedDept || loading}
          onClick={handleGenerate}
        >
          {loading ? 'Processing Transaction...' : (
            <>
              Generate My Token
              <ChevronRight size={20} />
            </>
          )}
        </button>

        <div className="premium-card bg-slate-50 border-none p-8">
           <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                 <Info size={16} />
              </div>
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Instructions</h4>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { n: '01', t: 'Select your required department from the clinical grid above.' },
                { n: '02', t: "Confirm your selection and tap 'Generate My Token' to proceed." },
                { n: '03', t: 'Keep this display active or print your slip for real-time tracking.' }
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                   <p className="text-2xl font-black text-primary/20">{item.n}</p>
                   <p className="text-xs font-medium text-slate-500 leading-relaxed">{item.t}</p>
                </div>
              ))}
           </div>
        </div>
      </div>

      <div className="lg:col-span-4 h-full">
        <AnimatePresence mode="wait">
          {generatedToken ? (
            <motion.div 
              key="token"
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className="sticky top-28"
            >
              <div className="premium-card p-0 overflow-hidden shadow-2xl relative">
                <div className="bg-primary h-2 w-full"></div>
                <div className="p-8 text-center space-y-8">
                   <p className="text-label text-primary">Current Session Token</p>
                   
                   <div className="relative inline-block px-4">
                      <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full"></div>
                      <h2 className="text-7xl font-black tracking-tighter text-slate-900 relative">#{generatedToken.tokenNumber}</h2>
                   </div>

                   <div className="grid grid-cols-2 gap-y-6 pt-4 text-left border-t border-slate-50">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 leading-none">Department</p>
                        <p className="text-sm font-black text-slate-800">{generatedToken.department}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 leading-none">Date</p>
                        <p className="text-sm font-black text-slate-800">
                          {new Date(generatedToken.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 leading-none">Check-in Time</p>
                        <p className="text-sm font-black text-slate-800">
                          {new Date(generatedToken.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 leading-none text-amber-500">Est. Wait</p>
                        <p className="text-sm font-black text-amber-500 flex items-center justify-end gap-1">
                          <Clock size={14} />
                          {generatedToken.estimatedWaitMinutes} mins
                        </p>
                      </div>
                   </div>

                   <div className="flex flex-col gap-3 pt-4">
                      <button className="btn-primary w-full py-4 text-xs tracking-tight">
                         <Printer size={16} />
                         Print Secure Slip
                      </button>
                      <button className="btn-secondary w-full py-4 text-xs tracking-tight">
                         <Share2 size={16} />
                         Share Digital Token
                      </button>
                   </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="h-6 w-full bg-slate-50/50 border-t border-slate-100 flex items-center px-4">
                   <div className="h-1 w-full bg-slate-200 rounded-full flex gap-1 overflow-hidden opacity-50">
                      {Array.from({length: 20}).map((_, i) => (
                        <div key={i} className="flex-1 bg-slate-300"></div>
                      ))}
                   </div>
                </div>
              </div>
              
              <div className="mt-4 glass-card p-4 border-emerald-500/20 bg-emerald-500/[0.02] flex items-center gap-3">
                 <div className="h-8 w-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
                    <Activity size={18} />
                 </div>
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 leading-none mb-1">Live Status</p>
                    <p className="text-xs font-bold text-slate-800 leading-none">Tracking established securely</p>
                 </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-[600px] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-8 text-center"
            >
               <div className="h-20 w-20 rounded-[2.5rem] bg-slate-50 flex items-center justify-center text-slate-300 mb-4 tracking-tighter shadow-inner">
                  <Ticket size={32} />
               </div>
               <h4 className="text-slate-500 font-bold mb-2">Token Awaiting</h4>
               <p className="text-[10px] text-slate-400 font-medium leading-relaxed max-w-[200px]">
                 Please select a medical department from the list to initiate your consultation sequence.
               </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TokenGenerator;
