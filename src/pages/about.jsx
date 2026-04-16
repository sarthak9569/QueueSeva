import { Activity, Shield, Users, Globe, Target, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="pt-24 pb-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-8">
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20 shadow-sm"
          >
             <Target size={14} className="text-primary" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Behind the mission</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-tight"
          >
            Reimagining the <br/>
            <span className="text-primary italic">patient flow</span> experience.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto font-medium"
          >
             At QueueSeva, we believe that accessing healthcare should never be an administrative burden. Our purpose is to eliminate the friction between hospitals and hope.
          </motion.p>
        </div>
        
        {/* Abstract shapes */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2"></div>
      </section>

      {/* Stats Section */}
      <section className="py-24 border-y border-slate-100 italic">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              {[
                { label: 'Wait Time Reduced', val: '65%' },
                { label: 'Patient Satisfaction', val: '98%' },
                { label: 'Clinics Empowered', val: '1.2k+' },
                { label: 'Tokens Processed', val: '10M+' }
              ].map((stat, i) => (
                <div key={i} className="space-y-1">
                   <p className="text-4xl font-black text-slate-900 tracking-tighter">{stat.val}</p>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div className="space-y-8">
                <h2 className="text-4xl font-black text-slate-800 tracking-tight leading-none">The QueueSeva Story</h2>
                <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium">
                   <p>
                      QueueSeva was born from a simple observation in a crowded clinic hallway: modern hospitals have incredible medical technology, but patient logistics were still stuck in the 19th century.
                   </p>
                   <p className="italic">
                      "We set out to build a system that respects the patient's time and the clinician's peace of mind. By building a bridge between data and empathy, we've created a platform that optimizes every second of the medical journey."
                   </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                   {[
                     { icon: Shield, title: 'Secure Protocol', desc: 'HIPAA compliant data architecture.' },
                     { icon: Globe, title: 'Global Vision', desc: 'Scaling clinical efficiency globally.' }
                   ].map((item, i) => (
                     <div key={i} className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 hover:border-primary/20 transition-all group">
                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary group-hover:scale-110 transition-transform mb-4">
                           <item.icon size={20} />
                        </div>
                        <h4 className="font-black text-slate-800 tracking-tight">{item.title}</h4>
                        <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                     </div>
                   ))}
                </div>
             </div>
             
             <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="bg-slate-100 rounded-[48px] overflow-hidden aspect-[4/5] relative shadow-2xl">
                   <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000" alt="Hospital interior" className="w-full h-full object-cover grayscale opacity-80" />
                   <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
                   <div className="absolute bottom-10 left-10 p-6 bg-white/10 backdrop-blur-md rounded-[32px] border border-white/20 text-white">
                      <p className="text-3xl font-black">2024</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest">Founded with Purpose</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
