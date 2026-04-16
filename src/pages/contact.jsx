import { Mail, Phone, MapPin, Send, MessageSquare, Globe, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for reaching out! We will get back to you soon.');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      {/* Header */}
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
          <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20"
          >
             <MessageSquare size={14} className="text-primary" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Get in touch</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl font-black text-slate-900 tracking-tighter"
          >
            We're here to help you <span className="text-primary italic">heal.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-500 font-medium max-w-xl mx-auto"
          >
             Have questions about our platform or need technical assistance scaling your clinical logistics?
          </motion.p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left: Info Cards */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <div className="col-span-2 p-10 bg-slate-900 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/40 transition-all"></div>
               <div className="relative z-10 space-y-6">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 shadow-sm">
                     <Globe size={24} />
                  </div>
                  <h3 className="text-3xl font-black tracking-tight leading-none">Global Support Center</h3>
                  <p className="text-slate-400 font-medium">Available 24/7 for urgent clinical infrastructure escalations.</p>
                  <Button className="bg-white text-slate-900 hover:bg-slate-100 rounded-2xl gap-2 font-black transition-all">
                     View Status Page <ArrowRight size={16} />
                  </Button>
               </div>
            </div>

            {[
              { icon: Mail, title: 'Email Us', desc: 'support@queueseva.com', detail: 'Response in < 2h' },
              { icon: Phone, title: 'Call Center', desc: '+1 (800) 123-4567', detail: 'Mon-Sat, 9AM-8PM' }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-blue-500/5 group hover:border-primary/20 transition-all">
                 <div className="w-12 h-12 bg-slate-50 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <item.icon size={22} />
                 </div>
                 <h4 className="font-black text-slate-800 tracking-tight">{item.title}</h4>
                 <p className="text-sm font-bold text-slate-500 mt-1">{item.desc}</p>
                 <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mt-4">{item.detail}</p>
              </div>
            ))}
          </motion.div>

          {/* Right: Premium Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="rounded-[48px] p-4 bg-white border-2 border-slate-100 shadow-2xl shadow-blue-500/10 transition-all">
              <CardContent className="p-10 space-y-8">
                 <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-primary text-white rounded-[24px] flex items-center justify-center shadow-lg shadow-primary/20">
                       <Send size={24} />
                    </div>
                    <div>
                       <h3 className="text-2xl font-black text-slate-800 tracking-tight">Send a message</h3>
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Secure encrypted channel</p>
                    </div>
                 </div>

                 <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                    <div className="col-span-1 space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">First Name</label>
                       <input 
                         type="text" 
                         required 
                         className="w-full px-5 py-4 bg-slate-50 border-none rounded-[20px] outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium placeholder:text-slate-300"
                         placeholder="John" 
                       />
                    </div>
                    <div className="col-span-1 space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Last Name</label>
                       <input 
                         type="text" 
                         required 
                         className="w-full px-5 py-4 bg-slate-50 border-none rounded-[20px] outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium placeholder:text-slate-300"
                         placeholder="Wick" 
                       />
                    </div>
                    <div className="col-span-2 space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                       <input 
                         type="email" 
                         required 
                         className="w-full px-5 py-4 bg-slate-50 border-none rounded-[20px] outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium placeholder:text-slate-300"
                         placeholder="john@example.com" 
                       />
                    </div>
                    <div className="col-span-2 space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Your Message</label>
                       <textarea 
                         rows="5" 
                         required
                         className="w-full px-5 py-4 bg-slate-50 border-none rounded-[20px] outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium placeholder:text-slate-300 resize-none"
                         placeholder="How can we help you today?" 
                       />
                    </div>
                    <div className="col-span-2 pt-4">
                       <Button type="submit" className="w-full h-16 rounded-[24px] text-lg font-black tracking-tighter gap-3 shadow-xl shadow-primary/20">
                          Send Command <Send size={20} />
                       </Button>
                    </div>
                 </form>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </section>
    </div>
  );
};

export default Contact;
