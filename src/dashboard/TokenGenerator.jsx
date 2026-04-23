import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
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
  Ticket,
  AlertTriangle,
  XCircle,
  Search
} from 'lucide-react';
import axiosInstance from '../api/axiosInstance';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const DEPARTMENTS = [
  { id: 'General OPD', icon: Stethoscope, color: 'blue' },
  { id: 'Cardiology', icon: Heart, color: 'red' },
  { id: 'Orthopaedics', icon: Bone, color: 'orange' },
  { id: 'Neurology', icon: Brain, color: 'purple' },
  { id: 'Paediatrics', icon: Baby, color: 'pink' },
  { id: 'Dermatology', icon: Sun, color: 'amber' },
  { id: 'ENT', icon: Ear, color: 'sky' },
  { id: 'Ophthalmology', icon: Eye, color: 'emerald' },
];

const TokenGenerator = () => {
  const { t } = useTranslation();
  const { searchQuery } = useOutletContext();
  const [selectedDept, setSelectedDept] = useState(null);
  const [deptCounts, setDeptCounts] = useState({});
  const [generatedToken, setGeneratedToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isConfirmingCancel, setIsConfirmingCancel] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

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
        } else {
          setGeneratedToken(null);
        }
      } catch (err) {
        console.error('Failed to fetch counts', err);
      }
    };
    fetchCounts();

    window.addEventListener('queue-updated', fetchCounts);
    return () => window.removeEventListener('queue-updated', fetchCounts);
  }, []);

  const handleGenerate = async () => {
    if (!selectedDept) return;
    setLoading(true);
    try {
      const response = await axiosInstance.post('/queue/generate', { department: selectedDept });
      setGeneratedToken(response.data);
      setSelectedDept(null);
      // Trigger sync
      window.dispatchEvent(new CustomEvent('queue-updated'));
    } catch (err) {
      console.error('Failed to generate token', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!generatedToken?._id) return;
    setCancelLoading(true);
    try {
      await axiosInstance.post('/queue/cancel', { tokenId: generatedToken._id });
      setGeneratedToken(null);
      setIsConfirmingCancel(false);
      // Dispatch custom events for success toast and sync
      window.dispatchEvent(new CustomEvent('app-toast', {
        detail: { message: 'Your token has been cancelled successfully', type: 'success' }
      }));
      window.dispatchEvent(new CustomEvent('queue-updated'));
    } catch (err) {
      console.error('Failed to cancel token', err);
    } finally {
      setCancelLoading(false);
    }
  };

  const filteredDepartments = DEPARTMENTS.filter(dept => 
    t(`departments.${dept.id}.name`).toLowerCase().includes(searchQuery)
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12"
    >
      <div className="lg:col-span-8 space-y-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">{t('token.title')}</h1>
          <p className="text-slate-500 font-medium tracking-tight">{t('token.selectDept')}</p>
        </div>

        {filteredDepartments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredDepartments.map((dept) => (
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
                  {deptCounts[dept.id] || 0} {t('status.waiting')}
                </div>
                <h3 className="text-sm font-black text-slate-800 mb-1">{t(`departments.${dept.id}.name`)}</h3>
                <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{t(`departments.${dept.id}.desc`)}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="premium-card py-12 flex flex-col items-center justify-center text-center space-y-4"
          >
            <div className="h-16 w-16 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-300">
              <Search size={32} />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-black text-slate-900 tracking-tight">No departments found</h4>
              <p className="text-sm text-slate-500 font-medium">Try searching for a different medical specialty.</p>
            </div>
          </motion.div>
        )}

        <button
          className="btn-primary w-full py-5 text-base shadow-xl shadow-primary/20 disabled:opacity-50"
          disabled={!selectedDept || loading}
          onClick={handleGenerate}
        >
          {loading ? 'Processing...' : (
            <>
              {t('token.generate')}
              <ChevronRight size={20} />
            </>
          )}
        </button>

        <div className="premium-card bg-slate-50 border-none p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Info size={16} />
            </div>
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">{t('token.instructions')}</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { n: '01', t: t('token.step1') },
              { n: '02', t: t('token.step2') },
              { n: '03', t: t('token.step3') }
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
                  <p className="text-label text-primary">{t('token.currentSession')}</p>

                  <div className="relative inline-block px-4">
                    <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full"></div>
                    <h2 className="text-7xl font-black tracking-tighter text-slate-900 relative">#{generatedToken.tokenNumber}</h2>
                  </div>

                  <div className="grid grid-cols-2 gap-y-6 pt-4 text-left border-t border-slate-50">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 leading-none">{t('token.department')}</p>
                      <p className="text-sm font-black text-slate-800">{t(`departments.${generatedToken.department}.name`)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 leading-none">{t('token.date')}</p>
                      <p className="text-sm font-black text-slate-800">
                        {new Date(generatedToken.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 leading-none">{t('token.checkInTime')}</p>
                      <p className="text-sm font-black text-slate-800">
                        {new Date(generatedToken.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 leading-none text-amber-500">{t('token.estWait')}</p>
                      <p className="text-sm font-black text-amber-500 flex items-center justify-end gap-1">
                        <Clock size={14} />
                        {generatedToken.estimatedWaitMinutes} mins
                      </p>
                    </div>
                  </div>

                  {/* Estimated Arrival Window */}
                  <div className="py-5 px-6 rounded-2xl bg-blue-50 border border-blue-100 flex flex-col items-center justify-center gap-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500">{t('token.estimatedArrival')}</p>
                    <p className="text-xl font-bold text-blue-600">
                      {generatedToken.estimatedWaitMinutes === 0 ? (
                        t('token.arrivalNow')
                      ) : (
                        t('token.arrivalRange', {
                          start: new Date(generatedToken.estimatedArrivalTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
                          end: new Date(new Date(generatedToken.estimatedArrivalTime).getTime() + 10 * 60000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
                        })
                      )}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 pt-4">
                    <button className="btn-primary w-full py-4 text-xs tracking-tight">
                      <Printer size={16} />
                      {t('token.printSlip')}
                    </button>
                    <button className="btn-secondary w-full py-4 text-xs tracking-tight">
                      <Share2 size={16} />
                      {t('token.shareToken')}
                    </button>
                    <button 
                      onClick={() => setIsConfirmingCancel(true)}
                      className="w-full py-4 text-xs tracking-tight bg-red-500 text-white rounded-xl shadow-md hover:bg-red-600 transition-all font-bold flex items-center justify-center gap-2"
                    >
                      <XCircle size={16} />
                      {t('token.cancel')}
                    </button>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="h-6 w-full bg-slate-50/50 border-t border-slate-100 flex items-center px-4">
                  <div className="h-1 w-full bg-slate-200 rounded-full flex gap-1 overflow-hidden opacity-50">
                    {Array.from({ length: 20 }).map((_, i) => (
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
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 leading-none mb-1">{t('status.liveStatus')}</p>
                  <p className="text-xs font-bold text-slate-800 leading-none">{t('token.trackingActive')}</p>
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
          <AnimatePresence>
            {isConfirmingCancel && (
              <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 backdrop-blur-md bg-slate-900/60">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl border border-slate-200 space-y-8"
                >
                  <div className="flex justify-between items-start">
                    <div className="h-16 w-16 rounded-3xl bg-red-50 text-red-500 flex items-center justify-center border border-red-100">
                      <AlertTriangle size={32} />
                    </div>
                    <button
                      onClick={() => setIsConfirmingCancel(false)}
                      className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">Cancel Token?</h3>
                    <p className="text-slate-500 text-base font-bold leading-relaxed">
                      Are you sure you want to cancel this token? This action will remove you from the active queue.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setIsConfirmingCancel(false)}
                      className="flex-1 btn-secondary py-5 text-lg font-black rounded-2xl"
                    >
                      No, Keep It
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={cancelLoading}
                      className="flex-1 bg-red-500 text-white py-5 text-lg font-black shadow-xl shadow-red-500/20 rounded-2xl hover:bg-red-600 transition-all disabled:opacity-50"
                    >
                      {cancelLoading ? 'Cancelling...' : 'Yes, Cancel'}
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TokenGenerator;
