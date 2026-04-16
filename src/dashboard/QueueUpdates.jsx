import { useState } from 'react';
import { useQueue } from '../context/QueueContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Search, 
  RefreshCcw, 
  CheckCircle2, 
  AlertCircle,
  Hash,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { cn } from '../components/ui/Button';

const QueueUpdates = () => {
  const { updateTokenStatus } = useQueue();
  const [tokenId, setTokenId] = useState('');
  const [status, setStatus] = useState('SERVING');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    
    try {
      await updateTokenStatus(tokenId, status);
      setMessage(`Token #${tokenId} status successfully updated to ${status}.`);
      setTokenId('');
      setLoading(false);
    } catch {
      setError(`Failed to update. Token #${tokenId} may not exist.`);
      setLoading(false);
    }
  };

  const statusOptions = [
    { value: 'WAITING', label: 'Waiting', variant: 'warning' },
    { value: 'SERVING', label: 'Serving', variant: 'info' },
    { value: 'COMPLETED', label: 'Completed', variant: 'success' },
    { value: 'CANCELLED', label: 'Cancelled', variant: 'danger' },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
         <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Queue Management</h1>
         <p className="text-sm text-slate-500">Update patient token status in real-time.</p>
      </div>

      <Card className="border-none shadow-xl shadow-blue-500/5">
        <CardHeader className="bg-slate-50/50">
           <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <RefreshCcw size={18} className="text-primary" />
              Update Token Status
           </h3>
        </CardHeader>
        <CardContent className="p-8">
          <AnimatePresence mode="wait">
            {message && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-3 text-emerald-700 text-sm font-medium"
              >
                <CheckCircle2 size={18} />
                {message}
              </motion.div>
            )}
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-700 text-sm font-medium"
              >
                <AlertCircle size={18} />
                {error}
              </motion.div>
            )}
          </AnimatePresence>
          
          <form onSubmit={handleUpdate} className="space-y-6">
            <Input
              label="Token ID / Number"
              placeholder="e.g. 101"
              icon={Hash}
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
              required
            />
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 ml-1">New Status</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                {statusOptions.map((opt) => (
                  <label 
                    key={opt.value}
                    className={cn(
                      "cursor-pointer p-3 rounded-xl border border-slate-200 transition-all text-xs font-bold uppercase tracking-wider",
                      status === opt.value 
                        ? "bg-primary/5 border-primary text-primary shadow-sm" 
                        : "bg-white hover:border-slate-300 text-slate-400 group"
                    )}
                  >
                    <input 
                      type="radio" 
                      name="status" 
                      value={opt.value} 
                      className="hidden"
                      checked={status === opt.value} 
                      onChange={(e) => setStatus(e.target.value)}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 text-base gap-2 group transition-all"
              disabled={loading || !tokenId}
            >
              {loading ? 'Updating...' : (
                <>
                  Confirm Update <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="p-6 bg-blue-50/50 border border-blue-100 rounded-2xl">
         <div className="flex gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-primary shrink-0">
               <Info size={20} />
            </div>
            <div>
               <h4 className="text-sm font-bold text-slate-800 mb-1">Quick Tip</h4>
               <p className="text-xs text-blue-600 leading-relaxed font-medium">
                  Updating a token to <strong>SERVING</strong> will automatically notify the patient. 
                  Ensure the patient name matches before confirming the completion.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
};

const Info = ({ size, className }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

export default QueueUpdates;

