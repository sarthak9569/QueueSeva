import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Users,
  CheckCircle,
  Activity,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Clock,
  Calendar,
  AlertTriangle,
  Info
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../api/axiosInstance';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Welcome = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState({ departments: [], userToken: null, completedToday: 0, avgConsultationTime: 12 });
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [newDate, setNewDate] = useState('');
  const [rescheduleStatus, setRescheduleStatus] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/queue/live');
      setData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const totalWait = data.departments.reduce((acc, d) => acc + d.count, 0);

  const handleReschedule = async () => {
    if (!newDate) return;
    try {
      const response = await axiosInstance.post('/queue/reschedule', {
        tokenId: data.userToken._id,
        newDate
      });
      setRescheduleStatus({
        type: 'success',
        message: `Your new token number is ${response.data.newTokenNumber} for ${response.data.scheduledDate}.`
      });
      setIsRescheduling(false);
      fetchData();
    } catch (err) {
      setRescheduleStatus({
        type: 'error',
        message: err.response?.data?.message || 'Failed to reschedule'
      });
    }
  };

  const getStatusConfig = (position) => {
    if (position === 0) return { label: t('status.proceed'), color: 'bg-emerald-500', text: 'text-white' };
    if (position <= 2) return { label: t('status.almost'), color: 'bg-amber-500', text: 'text-white' };
    return { label: t('status.waiting'), color: 'bg-slate-200', text: 'text-slate-600' };
  };

  const status = data.userToken ? getStatusConfig(data.userToken.position) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-10 pb-12"
    >
      {rescheduleStatus && (
        <div className={`p-4 rounded-xl border flex items-center gap-3 ${rescheduleStatus.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-red-50 border-red-100 text-red-800'}`}>
          <Info size={20} />
          <p className="font-bold text-sm">{rescheduleStatus.message}</p>
          <button onClick={() => setRescheduleStatus(null)} className="ml-auto opacity-50 hover:opacity-100">✕</button>
        </div>
      )}

      {/* ROW 1: Welcome + 2 Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6">
          <h1 className="text-5xl font-black text-slate-900 leading-tight tracking-tighter">
            {t('dashboard.welcome')} <br />
            <span className="text-primary">{user?.name}</span>
          </h1>
          <p className="text-slate-600 mt-4 max-w-lg font-medium leading-relaxed text-lg">
            {t('dashboard.subtitle')}
          </p>
        </div>

        <div className="lg:col-span-6 grid grid-cols-2 gap-8">
          {[
            { icon: Users, label: t('dashboard.liveQueue'), value: totalWait, color: 'primary' },
            { icon: CheckCircle, label: t('dashboard.completedToday'), value: data.completedToday, color: 'emerald' },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white border border-slate-300 shadow-md rounded-2xl flex flex-col gap-4 p-8 h-full justify-between hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className={`h-12 w-12 rounded-xl bg-${stat.color}-500/10 flex items-center justify-center text-${stat.color}-500 border border-${stat.color}-500/10`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-label mb-1 uppercase tracking-widest text-slate-400 font-black">{stat.label}</p>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ROW 2: Dominant Token Card */}
      <div className="flex justify-start">
        <div className="w-full lg:w-[75%]">
          {data.userToken ? (
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-gradient-to-br from-primary to-primary-dark text-white border border-blue-200 p-8 relative overflow-hidden group shadow-lg rounded-2xl transition-all"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                <Clock size={240} />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
                <div className="space-y-8">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase inline-block">
                      {t('token.currentSession')}
                    </div>
                    <div className={`${status.color} ${status.text} px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase inline-block shadow-sm`}>
                      {status.label}
                    </div>
                  </div>
                  <h3 className="text-8xl font-black tracking-tighter leading-none">#{data.userToken.tokenNumber}</h3>
                  <div className="flex items-center gap-4 opacity-90 font-bold bg-white/10 p-4 rounded-2xl border border-white/10 w-fit backdrop-blur-sm">
                    <Activity size={24} />
                    <span className="text-lg">{t(`departments.${data.userToken.department}.name`)}</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-white font-black text-2xl tracking-tight">
                      {t('status.patientsAhead', { count: data.userToken.position })}
                    </p>
                    <p className="text-white/60 text-sm font-bold italic flex items-center gap-2">
                      <Info size={16} /> {t('token.selectDept')}
                    </p>
                  </div>
                </div>
                <div className="md:text-right space-y-3 bg-white/10 p-8 rounded-3xl border border-white/10 backdrop-blur-md min-w-[200px]">
                  <p className="text-white/60 text-[10px] font-black uppercase tracking-widest">Department Status</p>
                  <p className="text-6xl font-black tracking-tight">Active</p>
                </div>
              </div>
              <div className="mt-12 flex flex-wrap gap-4 relative z-10">
                <button
                  onClick={() => setIsRescheduling(true)}
                  className="bg-white text-primary px-12 py-5 rounded-2xl font-black text-base shadow-2xl hover:bg-slate-50 transition-all active:scale-95"
                >
                  {t('token.reschedule')}
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="rounded-2xl p-1 bg-gradient-to-br from-blue-50 to-white shadow-md">
              <div className="bg-white border border-slate-300 rounded-2xl flex flex-col items-center justify-center p-8 text-center group shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5">
                <div className="h-32 w-32 rounded-xl bg-blue-100 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform duration-500 border border-blue-200 p-4">
                  <Activity size={56} />
                </div>
                <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">{t('token.readyForCheckup')}</h3>
                <p className="text-slate-500 max-w-sm mx-auto text-xl leading-relaxed mb-12 font-medium">
                  {t('token.noActiveToken')}
                </p>
                <button
                  onClick={() => navigate('/dashboard/generate')}
                  className="btn-primary px-16 py-6 shadow-lg hover:shadow-xl transition-all font-black rounded-2xl text-xl"
                >
                  {t('token.generate')} <ArrowRight size={28} className="ml-2" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isRescheduling && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 backdrop-blur-md bg-slate-900/60">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl border border-slate-200 space-y-8"
            >
              <div className="flex justify-between items-start">
                <div className="h-16 w-16 rounded-3xl bg-amber-50 text-amber-500 flex items-center justify-center border border-amber-100">
                  <AlertTriangle size={32} />
                </div>
                <button onClick={() => setIsRescheduling(false)} className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">✕</button>
              </div>
              <div className="space-y-3">
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">{t('token.reschedule')}</h3>
                <p className="text-slate-500 text-base font-bold leading-relaxed">
                  {t('token.selectDept')}
                </p>
              </div>
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Select New Date</label>
                  <input
                    type="date"
                    min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 font-black text-slate-900 outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all"
                  />
                </div>
                <button
                  onClick={handleReschedule}
                  className="w-full btn-primary py-5 text-lg font-black shadow-xl shadow-primary/20 rounded-2xl"
                >
                  Confirm Reschedule
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ROW 3: ONE Minimal Analytics Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-12">
          <div className="bg-white border border-slate-300 shadow-md rounded-2xl flex flex-col md:flex-row items-center justify-between gap-10 p-10 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
            <div className="space-y-3">
              <h4 className="text-2xl font-black text-slate-900 tracking-tight">Clinic Status Overview</h4>
              <p className="text-slate-500 text-base font-bold">Real-time system health and clinical performance monitoring.</p>
            </div>

            <div className="flex flex-wrap gap-8 items-center">
              {[
                { label: t('dashboard.completedToday'), value: data.completedToday, icon: CheckCircle },
                { label: t('dashboard.systemLoad'), value: totalWait > 20 ? t('status.high') : t('status.optimal'), icon: ShieldCheck, color: totalWait > 20 ? 'text-amber-500' : 'text-emerald-500' },
                { label: t('dashboard.avgWait'), value: `${data.avgConsultationTime}m`, icon: Clock },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-5 px-8 py-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-slate-200 transition-colors">
                  <div className="h-12 w-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{item.label}</p>
                    <p className={`text-2xl font-black tracking-tight ${item.color || 'text-slate-900'}`}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Welcome;
