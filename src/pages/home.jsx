import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Activity, 
  ShieldCheck, 
  Clock, 
  Smartphone,
  CheckCircle2,
  Users,
  ChevronRight
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-white">
      {/* Hero Section - 2 Column Layout */}
      <section className="relative overflow-hidden pt-16 pb-32 lg:pt-32 lg:pb-48">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-emerald-50/30 -z-10"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            {/* Left: Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex-1 space-y-8 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                 <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">v2.0 Now Live</span>
              </div>
              
              <h1 className="text-6xl lg:text-8xl font-black text-slate-900 leading-[0.95] tracking-tighter">
                Hospital waiting, <br/>
                <span className="text-primary italic">simplified.</span>
              </h1>
              
              <p className="text-xl text-slate-500 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                The modern, intuitive queue management system designed for seamless hospital and patient experiences. Eliminate friction, reduce wait times, and focus on healing.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Link to="/signup">
                  <Button size="lg" className="h-16 px-10 gap-2 shadow-2xl shadow-primary/20 rounded-2xl">
                    Get Started <ArrowRight size={20} />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="h-16 px-10 rounded-2xl">
                    Explore Platform
                  </Button>
                </Link>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-8 pt-8 border-t border-slate-100">
                 <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-12 h-12 rounded-2xl border-4 border-white overflow-hidden shadow-sm">
                         <img src={`https://i.pravatar.cc/150?img=${i+10}`} alt="avatar" className="w-full h-full object-cover" />
                      </div>
                    ))}
                 </div>
                 <div className="text-left">
                    <p className="text-sm font-black text-slate-800 tracking-tight leading-none mb-1">10k+ Active Users</p>
                    <div className="flex items-center gap-1 text-amber-400">
                       {[1,2,3,4,5].map(i => <StarIcon key={i} />)}
                    </div>
                 </div>
              </div>
            </motion.div>

            {/* Right: Visual Element (Premium Mockup style) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 relative"
            >
               <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full -z-10 animate-pulse"></div>
               <div className="bg-slate-900 rounded-[48px] p-6 shadow-2xl ring-1 ring-white/10 group overflow-hidden">
                  <div className="bg-white rounded-[32px] overflow-hidden aspect-[4/3] relative">
                     {/* Abstract UI Elements */}
                     <div className="p-8 space-y-6">
                        <div className="flex justify-between items-center mb-10">
                           <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                              <Activity size={24} />
                           </div>
                           <div className="flex gap-2">
                              {['','',''].map((_,i) => <div key={i} className="w-8 h-2 bg-slate-100 rounded-full"></div>)}
                           </div>
                        </div>
                        <div className="space-y-4">
                           <div className="h-14 w-full bg-slate-50 rounded-2xl border border-slate-100 p-4 flex items-center gap-3">
                              <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">✓</div>
                              <div className="w-32 h-2 bg-slate-200 rounded-full"></div>
                           </div>
                           <div className="h-40 w-full bg-primary/5 rounded-[32px] border-2 border-dashed border-primary/20 flex flex-col items-center justify-center text-primary">
                              <p className="text-4xl font-black tracking-tighter mb-1">C-42</p>
                              <p className="text-[10px] font-black uppercase tracking-widest">Your Current Position</p>
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                              <div className="h-24 bg-slate-50 rounded-[28px] border border-slate-100"></div>
                              <div className="h-24 bg-slate-50 rounded-[28px] border border-slate-100"></div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section - 3 Column Responsive Grid */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { 
                icon: Clock, 
                title: 'Live Tracking', 
                desc: 'Monitor your queue position from your phone anywhere. No more physical lines.',
                color: 'text-primary'
              },
              { 
                icon: ShieldCheck, 
                title: 'Secure Records', 
                desc: 'All medical history and prescriptions encrypted and synced in real-time.',
                color: 'text-emerald-500'
              },
              { 
                icon: Smartphone, 
                title: 'Easy Token Gen', 
                desc: 'Generate medical tokens with a single tap across any department.',
                color: 'text-purple-500'
              }
            ].map((feature, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Card className="p-10 h-full hover:scale-105 hover:shadow-2xl transition-all duration-300 border-none group cursor-default">
                  <div className={`w-16 h-16 rounded-[24px] bg-white shadow-lg flex items-center justify-center mb-8 group-hover:bg-slate-900 group-hover:text-white transition-colors animate-bounce-subtle`}>
                    <feature.icon size={32} className={feature.color} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 mb-4 tracking-tight">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
                  <div className="mt-8 flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all opacity-0 group-hover:opacity-100">
                     Check Details <ChevronRight size={16} />
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials - Horizontal Cards */}
      <section className="py-32 pb-48">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-20 space-y-4">
              <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px]">What they say</span>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-800 tracking-tighter italic leading-none">Loved by clinicians and patients.</h2>
           </div>
           
           <div className="flex flex-col lg:flex-row gap-8">
              {[
                { name: 'Dr. Sarah Wilson', role: 'Head of Cardiology', text: 'QueueSewa transformed how we handle peak hours. The real-time tracking reduced physical crowd by 70%.' },
                { name: 'James Thompson', role: 'Regular Patient', text: 'The ease of generating tokens from home is a game-changer. I only visit when my turn is about to come.' }
              ].map((item, i) => (
                <div key={i} className="flex-1 p-10 rounded-[40px] border border-slate-100 bg-white hover:bg-slate-50 hover:border-primary/20 transition-all group">
                   <div className="flex items-center gap-4 mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-slate-100 overflow-hidden shadow-sm">
                         <img src={`https://i.pravatar.cc/150?img=${i+42}`} alt="" />
                      </div>
                      <div>
                         <p className="font-black text-slate-800 tracking-tight leading-none">{item.name}</p>
                         <p className="text-[10px] uppercase font-bold text-slate-400 mt-1">{item.role}</p>
                      </div>
                   </div>
                   <p className="text-lg text-slate-600 leading-relaxed font-medium italic">"{item.text}"</p>
                   <div className="flex text-amber-400 mt-8 gap-1">
                      {[1,2,3,4,5].map(s => <StarIcon key={s} />)}
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};

const StarIcon = () => (
   <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
   </svg>
);

export default Home;
