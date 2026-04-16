import { useState } from 'react';
import { useQueue } from '../context/QueueContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Pill, 
  FileText, 
  Users, 
  CheckCircle2, 
  AlertCircle,
  Save,
  Info,
  Activity,
  UserCheck
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { cn } from '../components/ui/Button';

const AddPrescription = () => {
  const { tokens, addPrescription, updateTokenStatus } = useQueue();
  const [selectedToken, setSelectedToken] = useState('');
  const [medicines, setMedicines] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const servingTokens = tokens.filter(t => t.status === 'SERVING');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedToken) {
      setError('Please select a token first.');
      return;
    }
    
    setLoading(true);
    setMessage('');
    setError('');
    
    try {
      await addPrescription(selectedToken, medicines);
      await updateTokenStatus(selectedToken, 'COMPLETED');

      setMessage(`Prescription saved! Token #${selectedToken} is now COMPLETED.`);
      setSelectedToken('');
      setMedicines('');
      setLoading(false);
    } catch {
      setError(`Failed to save prescription for Token #${selectedToken}.`);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div className="px-2">
         <h1 className="text-4xl font-black text-slate-800 tracking-tighter italic">Write Prescription</h1>
         <p className="text-slate-400 font-medium">Document medical advice and finalize clinical sessions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-none shadow-2xl shadow-blue-500/5 rounded-[40px] overflow-hidden">
            <CardHeader className="bg-slate-50 border-none py-8">
               <h3 className="font-black text-slate-800 tracking-tight flex items-center gap-2">
                  <Pill size={20} className="text-primary" />
                  Electronic Health Record (EHR)
               </h3>
            </CardHeader>
            <CardContent className="p-10">
              <AnimatePresence mode="wait">
                {message && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="mb-8 p-6 bg-emerald-50 border border-emerald-100 rounded-[24px] flex items-center gap-4 text-emerald-700 text-sm font-bold shadow-sm"
                  >
                    <CheckCircle2 size={24} />
                    {message}
                  </motion.div>
                )}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="mb-8 p-6 bg-red-50 border border-red-100 rounded-[24px] flex items-center gap-4 text-red-700 text-sm font-bold shadow-sm"
                  >
                    <AlertCircle size={24} />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>
              
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Select Patient (Active Session)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {servingTokens.map((t) => (
                      <label 
                        key={t.id}
                        className={cn(
                          "cursor-pointer p-6 rounded-[32px] border-2 transition-all flex items-center gap-5 shadow-sm group",
                          selectedToken === t.id 
                            ? "bg-primary/5 border-primary shadow-primary/10 ring-4 ring-primary/5" 
                            : "bg-white border-slate-50 hover:border-slate-100 hover:bg-slate-50/50"
                        )}
                      >
                        <input 
                          type="radio" 
                          name="token" 
                          value={t.id} 
                          className="hidden"
                          checked={selectedToken === t.id} 
                          onChange={(e) => setSelectedToken(e.target.value)}
                        />
                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm italic transition-all group-hover:scale-110",
                          selectedToken === t.id ? "bg-primary text-white" : "bg-slate-100 text-slate-600"
                        )}>
                           {t.id}
                        </div>
                        <div className="flex-1 overflow-hidden">
                           <p className="text-sm font-black text-slate-800 tracking-tight leading-none mb-1">{t.patientName || 'Loading...'}</p>
                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t.department}</p>
                        </div>
                        {selectedToken === t.id && (
                           <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                              <UserCheck size={20} className="text-primary" />
                           </motion.div>
                        )}
                      </label>
                    ))}
                    {servingTokens.length === 0 && (
                      <div className="col-span-full py-16 text-center bg-slate-50 border-2 border-slate-100 rounded-[40px] border-dashed italic">
                         <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-slate-200 mx-auto mb-4 shadow-sm">
                            <Users size={32} />
                         </div>
                         <p className="text-sm font-black text-slate-400 uppercase tracking-widest leading-none">No active sessions</p>
                         <p className="text-[10px] text-slate-300 font-medium mt-2">Check the Live Queue to admit patients</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label htmlFor="medicines" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Clinical Assessment & Prescription</label>
                  <div className="relative group">
                     <div className="absolute left-6 top-6 text-slate-300 group-focus-within:text-primary transition-colors">
                        <FileText size={20} />
                     </div>
                     <textarea 
                        id="medicines" 
                        value={medicines} 
                        onChange={(e) => setMedicines(e.target.value)}
                        required
                        rows={8}
                        className="w-full pl-14 pr-6 py-6 bg-slate-50 border-none rounded-[32px] outline-none transition-all duration-200 focus:ring-8 focus:ring-primary/5 focus:bg-white placeholder:text-slate-300 text-sm font-medium leading-relaxed italic"
                        placeholder="e.g. Paracetamol 500mg (1-1-1), Hydration focus..."
                     />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-16 text-lg font-black tracking-tight gap-3 rounded-[24px] shadow-2xl shadow-primary/20"
                  disabled={loading || servingTokens.length === 0 || !selectedToken}
                >
                  <Save size={22} />
                  {loading ? 'Committing...' : 'Commit Prescription & Finalize'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-10">
           <Card className="bg-slate-900 border-none text-white rounded-[40px] overflow-hidden group">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all"></div>
              <CardContent className="p-10 relative z-10">
                 <h4 className="font-black flex items-center gap-2 mb-8 tracking-tight">
                    <Info size={18} className="text-primary" />
                    Protocol
                 </h4>
                 <ul className="space-y-6">
                    {[
                      'Only SERVING patients are valid for electronic prescription.',
                      'Commitment is permanent and will finalize the session token.',
                      'Prescriptions are encrypted and synced to the patient portal.'
                    ].map((text, i) => (
                      <li key={i} className="flex gap-4">
                         <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></div>
                         <p className="text-xs text-slate-400 leading-relaxed font-medium">
                            {text}
                         </p>
                      </li>
                    ))}
                 </ul>
              </CardContent>
           </Card>

           <div className="p-10 bg-white rounded-[40px] border border-slate-100 text-center shadow-sm italic space-y-4">
              <div className="w-16 h-16 bg-slate-50 rounded-[24px] flex items-center justify-center text-primary mx-auto shadow-sm">
                 <Activity size={28} />
              </div>
              <div>
                 <h4 className="text-sm font-black text-slate-800 tracking-tight leading-none mb-1">Queue Sync</h4>
                 <p className="text-4xl font-black text-primary tracking-tighter tabular-nums mb-1">{servingTokens.length}</p>
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Active Consulations</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AddPrescription;

