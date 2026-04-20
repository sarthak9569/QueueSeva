import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as Lucide from 'lucide-react';
import { Button } from '../components/ui/Button';

// --- MINI UI COMPONENTS FOR VISUALS ---

const HeroIllustration = () => (
  <motion.div 
    animate={{ y: [0, -8, 0] }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    className="relative w-full aspect-square max-w-[500px] mx-auto"
  >
    {/* Background Decorative Circles */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl"></div>
    
    {/* Main Phone Frame */}
    <div className="absolute inset-0 bg-white border-[8px] border-slate-900 rounded-[3rem] shadow-2xl overflow-hidden z-10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-20"></div>
      
      {/* App Content Mockup */}
      <div className="p-8 pt-12 h-full flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary border border-primary/20">
            <Lucide.User size={24} />
          </div>
          <div className="flex flex-col items-end">
             <div className="w-20 h-2 bg-slate-100 rounded-full"></div>
             <div className="w-12 h-2 bg-slate-50 rounded-full mt-2"></div>
          </div>
        </div>
        
        {/* Token Card */}
        <div className="bg-primary rounded-3xl p-8 text-white shadow-xl shadow-primary/20 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">Your Current Token</p>
          <h4 className="text-6xl font-black tracking-tighter mb-4">A-42</h4>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Serving Now</p>
              <p className="text-xl font-bold">A-38</p>
            </div>
            <div className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase">Live</div>
          </div>
        </div>
        
        {/* Queue Progress */}
        <div className="space-y-4">
           <div className="flex justify-between items-center">
             <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Wait Time</p>
             <p className="text-xs font-black text-primary uppercase tracking-widest">~ 12 Mins</p>
           </div>
           <div className="h-4 bg-slate-50 rounded-full overflow-hidden p-1 border border-slate-100">
              <motion.div 
                animate={{ width: ["10%", "75%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="h-full bg-primary rounded-full"
              ></motion.div>
           </div>
        </div>

        {/* Action Button */}
        <div className="mt-auto h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-xs uppercase tracking-widest">
           View Instructions
        </div>
      </div>
    </div>

    {/* Floating Elements */}
    <motion.div 
      animate={{ y: [0, 10, 0], x: [0, 5, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -right-6 top-1/4 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 z-20 flex items-center gap-3"
    >
      <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-500">
        <Lucide.Bell size={20} />
      </div>
      <div>
        <div className="w-16 h-2 bg-slate-100 rounded-full mb-1"></div>
        <div className="w-10 h-2 bg-slate-50 rounded-full"></div>
      </div>
    </motion.div>
  </motion.div>
);

const DepartmentMiniUI = () => (
  <div className="w-full h-32 bg-slate-50 rounded-2xl border border-slate-200 p-4 flex flex-col gap-3 relative overflow-hidden group">
    <div className="flex items-center gap-2 p-2 bg-white rounded-xl border border-primary/20 shadow-sm translate-x-4">
       <div className="w-6 h-6 bg-primary/10 rounded-md flex items-center justify-center text-primary">
          <Lucide.HeartPulse size={14} />
       </div>
       <div className="w-20 h-2 bg-primary/20 rounded-full"></div>
    </div>
    <div className="flex items-center gap-2 p-2 bg-white rounded-xl border border-slate-200 opacity-60">
       <div className="w-6 h-6 bg-slate-100 rounded-md flex items-center justify-center text-slate-400">
          <Lucide.Baby size={14} />
       </div>
       <div className="w-20 h-2 bg-slate-100 rounded-full"></div>
    </div>
    <div className="absolute top-0 right-0 p-2 text-primary opacity-20 group-hover:opacity-40 transition-opacity">
       <Lucide.Search size={40} />
    </div>
  </div>
);

const TokenMiniUI = () => (
  <div className="w-full h-32 flex items-center justify-center relative">
    <motion.div 
      whileHover={{ y: -4 }}
      className="w-24 h-32 bg-white border-2 border-primary rounded-xl flex flex-col items-center justify-center gap-2 shadow-lg relative"
    >
       <div className="absolute -top-1 -left-1 -right-1 h-3 bg-primary rounded-t-lg"></div>
       <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-2">Token</p>
       <h4 className="text-3xl font-black text-primary tracking-tighter">A-42</h4>
       <div className="w-12 h-12 border border-slate-200 rounded-md flex flex-wrap p-1 gap-1 opacity-40">
          {[...Array(9)].map((_, i) => <div key={i} className="w-2 h-2 bg-slate-400 rounded-[1px]"></div>)}
       </div>
    </motion.div>
  </div>
);

const TrackingMiniUI = () => (
  <div className="w-full h-32 bg-slate-900 rounded-2xl p-4 flex flex-col justify-between border border-slate-800">
     <div className="flex justify-between items-start">
        <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
           <Lucide.Navigation size={16} />
        </div>
        <div className="flex -space-x-2">
           <div className="w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-900 shadow-lg"></div>
           <div className="w-6 h-6 rounded-full bg-slate-700 border-2 border-slate-900 shadow-lg"></div>
        </div>
     </div>
     <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-black text-slate-400 tracking-widest uppercase">
           <span>Live Position</span>
           <span>Next</span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
           <motion.div 
             animate={{ width: ["0%", "85%"] }}
             transition={{ duration: 3, repeat: Infinity }}
             className="h-full bg-primary rounded-full"
           ></motion.div>
        </div>
     </div>
  </div>
);

const Home = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="py-24 lg:py-32 bg-white overflow-hidden border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* LEFT CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-10"
            >
              <h1 className="text-6xl lg:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
                Skip the <br />
                <span className="text-primary italic">Waiting Room.</span>
              </h1>
              <p className="text-xl text-slate-500 max-w-lg leading-relaxed font-semibold">
                Digital tokens and live tracking for the modern healthcare experience. No rows, no stress.
              </p>
              <div className="flex flex-wrap gap-5 pt-4">
                <Link to="/signup">
                  <button className="bg-primary text-white px-10 py-5 rounded-2xl font-black text-lg shadow-md hover:shadow-lg transition-all active:scale-95 border border-primary-dark/10 flex items-center gap-2">
                    Get Started <Lucide.ArrowRight size={24} />
                  </button>
                </Link>
                <button
                  onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-slate-900 border border-slate-300 px-10 py-5 rounded-2xl font-black text-lg shadow-md hover:bg-slate-50 transition-all active:scale-95 flex items-center gap-2"
                >
                  See How it Works
                </button>
              </div>
            </motion.div>

            {/* RIGHT VISUAL */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <HeroIllustration />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. FEATURES SECTION (BG: SLATE-50) */}
      <section id="features" className="py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter">Designed for Modern Healthcare</h2>
            <p className="text-xl text-slate-500 font-medium">Intelligent tools built to empower patients and medical staff alike.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Lucide.Smartphone,
                title: 'Digital Tokens',
                desc: 'Book tokens instantly through our intuitive interface',
                color: 'text-primary'
              },
              {
                icon: Lucide.TrendingUp,
                title: 'Live Tracking',
                desc: 'Track your position in real-time from anywhere',
                color: 'text-primary'
              },
              {
                icon: Lucide.FileText,
                title: 'Easy Records',
                desc: 'Manage your clinical history and secure prescriptions',
                color: 'text-primary'
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white border border-slate-300 rounded-3xl shadow-md hover:shadow-lg hover:-translate-y-1 hover:border-primary/40 transition-all p-10 group">
                <div className={`w-16 h-16 bg-primary/10 ${feature.color} rounded-xl flex items-center justify-center mb-8 border border-primary/10 group-hover:scale-105 transition-transform`}>
                  <feature.icon size={32} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS FLOW (BG: WHITE) */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter">How QueueSeva Works</h2>
            <p className="text-xl text-slate-500 font-medium">Three simple steps to reclaiming your time.</p>
          </div>

          {/* Desktop Connector Line */}
          <div className="hidden md:block absolute top-[70%] left-[20%] right-[20%] h-0.5 border-t-2 border-dashed border-primary/20 -z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {[
              {
                Visual: DepartmentMiniUI,
                title: 'Select Department',
                desc: 'Choose your clinic',
                color: 'text-primary'
              },
              {
                Visual: TokenMiniUI,
                title: 'Get Your Token',
                desc: 'Receive your number',
                color: 'text-primary'
              },
              {
                Visual: TrackingMiniUI,
                title: 'Track & Visit',
                desc: 'Arrive at the right time',
                color: 'text-primary'
              }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center flex flex-col items-center group"
              >
                <div className="relative mb-10 w-full max-w-[200px]">
                  {/* Step Number Badge */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-xs font-black shadow-lg z-20 border-2 border-white">
                    {i + 1}
                  </div>
                  <step.Visual />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">{step.title}</h3>
                  <p className="text-slate-400 font-black uppercase tracking-widest text-xs">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SUPPORT SECTION (BG: BLUE-50 / 3-CARD GRID) */}
      <section id="support" className="py-24 bg-blue-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter">Need Help or Support?</h2>
            <p className="text-xl text-slate-500 font-medium">Join thousands skipping the wait or contact our systems array.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Lucide.HelpCircle,
                title: 'Help Center',
                desc: 'Browse our massive repository of clinical guides and FAQs',
                btnText: 'Read Docs'
              },
              {
                icon: Lucide.MessageCircle,
                title: 'Contact Support',
                desc: 'Direct assistance for patient and hospital management issues',
                btnText: 'Open Ticket'
              },
              {
                icon: Lucide.Zap,
                title: 'Live Assistance',
                desc: 'Real-time help from our dedicated clinical sanctuary staff',
                btnText: 'Start Chat'
              }
            ].map((card, i) => (
              <div key={i} className="bg-white border border-slate-300 rounded-3xl p-8 shadow-md flex flex-col items-center text-center group hover:border-primary/30 transition-all">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all">
                  <card.icon size={24} />
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-3 tracking-tight">{card.title}</h4>
                <p className="text-slate-500 text-sm font-medium mb-6 flex-grow">{card.desc}</p>
                <button className="text-primary font-black text-sm uppercase tracking-widest hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                  {card.btnText} <Lucide.ChevronRight size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Final CTA Button */}
          <div className="flex justify-center pt-8">
            <Link to="/signup">
              <button className="bg-primary text-white px-16 py-6 rounded-xl font-black text-xl shadow-md hover:bg-primary/90 hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-4 border border-primary-dark/10">
                Join QueueSeva <Lucide.ArrowRight size={24} />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )};
export default Home;