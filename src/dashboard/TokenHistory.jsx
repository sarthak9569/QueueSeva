import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  Search, 
  Eye, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  XCircle,
  TrendingUp,
  History,
  Download,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import axiosInstance from '../api/axiosInstance';
import { motion, AnimatePresence } from 'framer-motion';

const TokenHistory = () => {
  const { searchQuery } = useOutletContext();
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmRemoveId, setConfirmRemoveId] = useState(null);
  const [removeLoading, setRemoveLoading] = useState(false);
  const itemsPerPage = 8;

  const fetchHistory = async () => {
    try {
      const response = await axiosInstance.get('/queue/history');
      setHistory(response.data);
      setFilteredHistory(response.data);
    } catch (err) {
      console.error('Failed to fetch history', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    window.addEventListener('queue-updated', fetchHistory);
    return () => window.removeEventListener('queue-updated', fetchHistory);
  }, []);

  useEffect(() => {
    let result = history;
    if (searchQuery) {
      result = result.filter(item => 
        item.tokenNumber.toLowerCase().includes(searchQuery) ||
        item.department.toLowerCase().includes(searchQuery)
      );
    }
    if (statusFilter !== 'All') {
      result = result.filter(item => item.status === statusFilter.toLowerCase());
    }
    setFilteredHistory(result);
    setCurrentPage(1);
  }, [searchQuery, statusFilter, history]);

  const handleRemove = async () => {
    if (!confirmRemoveId) return;
    setRemoveLoading(true);
    try {
      await axiosInstance.post('/queue/archive', { tokenId: confirmRemoveId });
      // Remove from state instantly
      const updatedHistory = history.filter(item => item._id !== confirmRemoveId);
      setHistory(updatedHistory);
      setConfirmRemoveId(null);
      // Dispatch success toast
      window.dispatchEvent(new CustomEvent('app-toast', { 
        detail: { message: 'Token removed from history', type: 'success' } 
      }));
    } catch (err) {
      console.error('Failed to remove token', err);
    } finally {
      setRemoveLoading(false);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredHistory.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
            <CheckCircle2 size={12} />
            <span>Completed</span>
          </div>
        );
      case 'waiting':
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-100">
            <Clock size={12} />
            <span>Waiting</span>
          </div>
        );
      case 'cancelled':
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-100">
            <XCircle size={12} />
            <span>Cancelled</span>
          </div>
        );
      case 'expired':
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-300">
            <Clock size={12} />
            <span>Expired</span>
          </div>
        );
      default:
        return <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[10px] font-black">{status}</span>;
    }
  };

  const stats = {
    total: history.length,
    completed: history.filter(h => h.status === 'completed').length,
    avgWait: history.length > 0 
      ? Math.round(history.reduce((acc, h) => acc + (h.estimatedWaitMinutes || 0), 0) / history.length) 
      : 15
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-12"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Token History</h2>
          <p className="text-slate-500 font-medium tracking-tight">Review your past clinical visits and status updates.</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="relative w-full md:w-auto">
             <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
             <select 
               className="pl-11 pr-10 py-3 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none appearance-none shadow-sm min-w-[160px]"
               value={statusFilter}
               onChange={(e) => setStatusFilter(e.target.value)}
             >
               <option value="All">All Status</option>
               <option value="Waiting">Waiting</option>
               <option value="Completed">Completed</option>
               <option value="Cancelled">Cancelled</option>
               <option value="Expired">Expired</option>
             </select>
          </div>
        </div>
      </div>

      <div className="premium-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-5 text-label">Token No.</th>
                <th className="px-8 py-5 text-label">Department</th>
                <th className="px-8 py-5 text-label text-center">Date</th>
                <th className="px-8 py-5 text-label text-center">Time</th>
                <th className="px-8 py-5 text-label text-center">Status</th>
                <th className="px-8 py-5 text-label text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <tr key={item._id} className="group hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-5">
                      <span className="text-sm font-black text-primary tracking-tight">#{item.tokenNumber}</span>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm font-bold text-slate-700">{item.department}</span>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <span className="text-xs font-bold text-slate-500">
                        {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <span className="text-xs font-bold text-slate-500">
                        {new Date(item.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                      </span>
                    </td>
                    <td className="px-8 py-5 flex justify-center">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="px-8 py-5 text-right flex justify-end gap-2">
                      <button className="h-9 w-9 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/30 transition-all shadow-sm group-hover:bg-primary/5 active:scale-90">
                        <Eye size={18} />
                      </button>
                      <button 
                        onClick={() => setConfirmRemoveId(item._id)}
                        className="h-9 w-9 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-red-500 hover:text-red-600 hover:border-red-200 transition-all shadow-sm group-hover:bg-red-50 active:scale-90"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-8 py-12 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300">
                        <Search size={24} />
                      </div>
                      <p className="text-sm font-bold text-slate-500 tracking-tight">No tokens match your search</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-8 py-5 border-t border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
             Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredHistory.length)} of {filteredHistory.length} records
          </p>
          <div className="flex items-center gap-2">
            <button 
              className="h-9 px-4 bg-white border border-slate-100 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-white transition-all shadow-sm flex items-center gap-2"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
            >
              <ChevronLeft size={14} /> Previous
            </button>
            <button 
              className="h-9 px-4 bg-primary text-white rounded-xl text-xs font-black shadow-lg shadow-primary/20 hover:bg-primary-dark disabled:opacity-30 transition-all flex items-center gap-2"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(p => p + 1)}
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: History, label: 'Total Tokens', value: stats.total, color: 'primary' },
          { icon: CheckCircle2, label: 'Visits Completed', value: stats.completed, color: 'emerald' },
          { icon: TrendingUp, label: 'Avg. Wait Time', value: `${stats.avgWait}min`, color: 'red' },
        ].map((stat, i) => (
          <div key={i} className="premium-card flex flex-col justify-between overflow-hidden relative">
            <div className={`absolute top-0 left-0 w-1 h-full bg-${stat.color}-500`}></div>
            <p className="text-label mb-4">{stat.label}</p>
            <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
            <div className={`absolute right-4 bottom-4 text-${stat.color}-500/10`}>
               <stat.icon size={64} />
            </div>
          </div>
        ))}
      </div>
      <AnimatePresence>
        {confirmRemoveId && (
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
                  onClick={() => setConfirmRemoveId(null)} 
                  className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-3">
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">Remove from History?</h3>
                <p className="text-slate-500 text-base font-bold leading-relaxed">
                  Are you sure you want to remove this token from your history? 
                  This will hide it from your view permanently without deleting the record.
                </p>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => setConfirmRemoveId(null)}
                  className="flex-1 btn-secondary py-5 text-lg font-black rounded-2xl"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleRemove}
                  disabled={removeLoading}
                  className="flex-1 bg-red-500 text-white py-5 text-lg font-black shadow-xl shadow-red-500/20 rounded-2xl hover:bg-red-600 transition-all disabled:opacity-50"
                >
                  {removeLoading ? 'Removing...' : 'Remove'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TokenHistory;
