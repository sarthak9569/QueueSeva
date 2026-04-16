import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-white selection:bg-primary/10">
      <Navbar />
      <main>
        <Outlet />
      </main>
      
      {/* Footer (Premium Medical SaaS style) */}
      <footer className="bg-slate-50 border-t border-slate-100 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">Q</div>
                <span className="text-xl font-black text-slate-800 tracking-tighter">QueueSeva</span>
              </div>
              <p className="text-slate-500 max-w-sm leading-relaxed">
                Reimagining the medical waiting experience with real-time tracking and intelligent flow management.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-slate-800 tracking-tight">Product</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="hover:text-primary transition-colors cursor-pointer">Live Queue</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Token System</li>
                <li className="hover:text-primary transition-colors cursor-pointer">EHR Integration</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-slate-800 tracking-tight">Company</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="hover:text-primary transition-colors cursor-pointer">About Us</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Contact</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-400">&copy; 2024 QueueSeva. All rights reserved.</p>
            <div className="flex items-center gap-6">
               <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all cursor-pointer">
                  <span className="text-[10px] font-bold">X</span>
               </div>
               <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all cursor-pointer">
                  <span className="text-[10px] font-bold">IN</span>
               </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
