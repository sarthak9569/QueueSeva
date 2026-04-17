import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Smartphone,
  LayoutDashboard,
  ShieldCheck,
  Stethoscope,
  ChevronRight,
  TrendingUp,
  Heart
} from 'lucide-react';
import { Button } from '../components/ui/Button';

const Home = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. HERO SECTION (2 COLUMN ONLY) */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-blue-50/50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT CONTENT */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-tight">
                Skip the Waiting Room. <br />
                <span className="text-primary italic">Save Your Time.</span>
              </h1>
              <p className="text-xl text-gray-500 max-w-lg leading-relaxed">
                Get your hospital token digitally and track your turn from anywhere. Experience healthcare without the stress of long queues.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/signup">
                  <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold shadow-md hover:scale-105 hover:bg-primary-dark transition-all flex items-center gap-2">
                    Get Started <ArrowRight size={20} />
                  </button>
                </Link>
                <Link to="/about">
                  <button className="bg-white text-primary border border-primary/10 px-8 py-4 rounded-xl font-bold shadow-md hover:scale-105 transition-all flex items-center gap-2">
                    See How it Works
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* RIGHT VISUAL */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl border-8 border-white group">
                <img 
                  src="/images/hero.png" 
                  alt="Modern Hospital Waiting Room" 
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 lg:-left-12 bg-white p-6 rounded-2xl shadow-xl border border-slate-50 animate-bounce-subtle flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Current wait</p>
                  <p className="text-2xl font-black text-slate-900 leading-none">12 mins</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. MISSION SECTION (2 COLUMN GRID) */}
      <section id="mission" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 grid grid-cols-2 gap-6">
              <div className="rounded-2xl overflow-hidden shadow-lg h-64 mt-8">
                <img src="/images/mission-doctor.png" alt="Doctor providing care" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg h-64">
                <img src="/images/mission-hallway.png" alt="Clean hospital hallway" className="w-full h-full object-cover" />
              </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-8">
              <h2 className="text-4xl font-bold text-slate-900">
                Our Mission: No More Crowded Waiting Rooms
              </h2>
              <p className="text-lg text-gray-500 leading-relaxed">
                We believe hospital visits shouldn't be stressful. QueueSeva helps you wait where you're comfortable, not in a hallway. Our goal is to digitize the entire waiting experience for every patient.
              </p>
              
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div className="space-y-2 border-l-4 border-primary pl-6">
                  <p className="text-4xl font-black text-slate-900">94%</p>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Patient Satisfaction</p>
                </div>
                <div className="space-y-2 border-l-4 border-emerald-500 pl-6">
                  <p className="text-4xl font-black text-slate-900">40m</p>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Average Time Saved</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURES SECTION (3 CARDS GRID) */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-slate-900">Designed for Modern Care</h2>
            <p className="text-lg text-gray-500">
              Intelligent tools built to empower patients and medical staff alike.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: Smartphone, 
                title: 'Digital Tokens', 
                desc: 'Book your turn instantly from your phone. No more physical queues or paperwork.',
                color: 'bg-blue-50 text-blue-600'
              },
              { 
                icon: TrendingUp, 
                title: 'Live Tracking', 
                desc: 'Know exactly when it\'s your turn to see the doctor. Track your position in real-time.',
                color: 'bg-emerald-50 text-emerald-600'
              },
              { 
                icon: LayoutDashboard, 
                title: 'Easy Records', 
                desc: 'Access your prescriptions and history in one place. Your health data, always with you.',
                color: 'bg-amber-50 text-amber-600'
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed font-medium">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS (3 STEPS HORIZONTAL) */}
      <section id="how-it-works" className="py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-white">Seamless Integration</h2>
            <p className="text-lg text-blue-100 opacity-80">Three simple steps to a better hospital experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Step 1 */}
            <div className="relative text-center space-y-6">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white text-3xl font-black mx-auto">
                1
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-white">Select Department</h4>
                <p className="text-blue-50/70 text-sm px-4">Choose your required clinic or specialist through our intuitive interface.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative text-center space-y-6">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white text-3xl font-black mx-auto">
                2
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-white">Get Your Token</h4>
                <p className="text-blue-50/70 text-sm px-4">Instantly receive your digital queue position and estimated consultation time.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative text-center space-y-6">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white text-3xl font-black mx-auto">
                3
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-white">Visit Your Doctor</h4>
                <p className="text-blue-50/70 text-sm px-4">Walk in just as your number is called, skipping the wait and minimizing exposure.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION (BIG CARD) */}
      <section id="support" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-r from-primary to-primary-dark rounded-[40px] p-12 lg:p-20 relative overflow-hidden text-center space-y-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl -ml-32 -mb-32"></div>
            
            <h2 className="text-4xl lg:text-6xl font-bold text-white relative z-10 max-w-2xl mx-auto leading-tight">
              Ready to save time today?
            </h2>
            <p className="text-xl text-blue-50/80 relative z-10 max-w-xl mx-auto font-medium">
              Join thousands of patients using QueueSeva for a better, stress-free hospital experience.
            </p>
            <div className="relative z-10 pt-4">
              <Link to="/signup">
                <button className="bg-white text-primary px-10 py-5 rounded-2xl font-bold text-lg shadow-xl hover:scale-105 transition-all">
                  Start Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;