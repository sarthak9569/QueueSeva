import { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  Mail, 
  Phone, 
  MessageCircle, 
  HelpCircle, 
  Ticket, 
  Activity, 
  FileText, 
  ShieldCheck, 
  Cpu,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ_DATA = {
  'General': [
    { q: 'What is QueueSeva?', a: 'QueueSeva is a world-class clinical sanctuary management array designed to eliminate patient wait-anxiety through real-time telemetry and atmospheric control.' },
    { q: 'How do I initiate my session?', a: 'Simply register your clinical identity, then navigate to the Request Token module to join the live medical flow immediately.' },
    { q: 'Is my health sanctuary data encrypted?', a: 'Every byte is protected by production-grade elliptic-curve cryptography and high-entropy security headers for absolute clinical privacy.' },
  ],
  'Token System': [
    { q: 'What is the token allocation limit?', a: 'To maintain clinical throughput equilibrium, each patient identity is allocated one active token per clinical wing.' },
    { q: 'How is clinical priority determined?', a: 'Tokens are issued via a deterministic first-in-first-out (FIFO) sequence, ensuring unbiased clinical access for all sanctuary residents.' },
  ],
  'Queue Status': [
    { q: 'How accurate is the wait telemetry?', a: 'Our predictive algorithms analyze real-time consultation velocity to provide wait estimates with a 98.4% precision rating.' },
    { q: 'Do I need to maintain an active display?', a: 'The sanctuary dashboard polls every 10 seconds. You can safely lock your device; critical updates are synchronized upon re-initialization.' },
  ],
  'Prescriptions': [
    { q: 'What are the vault upload specifications?', a: 'The medical clinical vault accepts high-resolution JPG, PNG, and PDF formats up to a 10MB individual file limit.' },
    { q: 'Who has access to my clinical records?', a: 'Access is strictly limited to your authorized clinical identity and the specialized medical staff assigned to your care sanctuary.' },
  ],
  'Account & Security': [
    { q: 'Can I reset my clinical credentials?', a: 'Identity management is available through the Profile sub-module. Passwords can be updated via encrypted verification protocols.' },
  ],
  'Technical Support': [
    { q: 'How do I report a system anomaly?', a: 'Please contact our specialized engineering array via support@queueseva.com with high-fidelity screenshots of the behavioral deviation.' },
  ]
};

const FAQ = () => {
  const [activeTab, setActiveTab] = useState('General');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(null);

  const categories = [
    { id: 'General', icon: HelpCircle },
    { id: 'Token System', icon: Ticket },
    { id: 'Queue Status', icon: Activity },
    { id: 'Prescriptions', icon: FileText },
    { id: 'Account & Security', icon: ShieldCheck },
    { id: 'Technical Support', icon: Cpu },
  ];

  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const filteredFaqs = (FAQ_DATA[activeTab] || []).filter(faq => 
    faq.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-12"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Help Center</h2>
          <p className="text-slate-500 font-medium tracking-tight">Navigate the QueueSeva clinical sanctuary with ease.</p>
        </div>
        
        <div className="relative group w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search for clinical directives..." 
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Category Sidebar */}
        <div className="lg:col-span-4 space-y-2">
           <div className="premium-card p-3 space-y-1 bg-slate-50 border-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group
                    ${activeTab === cat.id 
                      ? 'bg-white text-primary shadow-md shadow-primary/5' 
                      : 'text-slate-500 hover:bg-white hover:text-slate-800'}
                  `}
                  onClick={() => { setActiveTab(cat.id); setExpandedIndex(null); }}
                >
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center transition-colors ${activeTab === cat.id ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-400 group-hover:bg-white group-hover:text-primary'}`}>
                     <cat.icon size={18} />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest">{cat.id}</span>
                  {activeTab === cat.id && (
                    <motion.div layoutId="activeCat" className="ml-auto">
                       <ArrowRight size={14} />
                    </motion.div>
                  )}
                </button>
              ))}
           </div>
           
           <div className="premium-card bg-primary text-white border-none p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                 <HelpCircle size={80} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">Productivity</p>
              <h4 className="text-lg font-black tracking-tight mb-4">Quick Shortcuts</h4>
              <div className="space-y-3">
                 {['Generate Token', 'Live Tracking', 'Medical Vault'].map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest bg-white/10 p-2.5 rounded-lg border border-white/5 hover:bg-white/20 cursor-pointer transition-colors">
                       {item}
                       <ExternalLink size={12} />
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* FAQ List */}
        <div className="lg:col-span-8 space-y-4">
           {filteredFaqs.map((faq, index) => (
             <div key={index} className="premium-card p-0 overflow-hidden group transition-all">
                <button 
                  className={`w-full px-8 py-6 flex items-center justify-between transition-colors ${expandedIndex === index ? 'bg-slate-50' : 'hover:bg-slate-50/50'}`}
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="text-sm font-black text-slate-800 tracking-tight text-left">{faq.q}</span>
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center transition-all ${expandedIndex === index ? 'bg-primary text-white rotate-180' : 'bg-slate-50 text-slate-400 group-hover:text-primary'}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>
                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                       <div className="px-8 pb-8 pt-2 text-sm font-medium text-slate-500 leading-relaxed">
                          {faq.a}
                       </div>
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
           ))}
           {filteredFaqs.length === 0 && (
             <div className="py-24 text-center">
                <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-4 text-slate-200">
                   <HelpCircle size={32} />
                </div>
                <h4 className="text-slate-500 font-bold">Query Not Identified</h4>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Try a different Clinical directive</p>
             </div>
           )}
        </div>
      </div>

      {/* Support Strip */}
      <div className="premium-card bg-slate-900 border-none p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 group">
        <div className="space-y-4 text-center md:text-left">
          <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center text-primary mb-2 mx-auto md:mx-0">
             <MessageCircle size={28} />
          </div>
          <div>
            <h4 className="text-2xl font-black text-white tracking-tight mb-2">Still need clinical assistance?</h4>
            <p className="text-white/50 text-sm font-medium leading-relaxed max-w-lg">Our specialized medical sanctuary support array is available 24/7 for real-time troubleshooting and clinical guidance.</p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-2">
            <div className="flex items-center gap-3 text-xs font-black text-white/70 uppercase tracking-widest hover:text-white transition-colors cursor-pointer">
              <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center"><Mail size={16} /></div>
              support@queueseva.com
            </div>
            <div className="flex items-center gap-3 text-xs font-black text-white/70 uppercase tracking-widest hover:text-white transition-colors cursor-pointer focus:outline-none">
              <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center"><Phone size={16} /></div>
              +91 98765 43210
            </div>
          </div>
        </div>
        <button className="btn-primary py-5 px-10 shadow-2xl shadow-primary/20 scale-110 active:scale-105 transition-all">
          <MessageCircle size={22} />
          Initiate Support Chat
        </button>
      </div>
    </motion.div>
  );
};

export default FAQ;
