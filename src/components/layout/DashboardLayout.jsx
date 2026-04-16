import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { AlertTriangle } from 'lucide-react';

const DashboardLayout = () => {
  return (
    <div className="flex bg-background min-h-screen">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Topbar />
        
        <main className="flex-1 overflow-y-auto p-6 md:p-8 relative">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>

          {/* Emergency Button - Fixed Bottom Left within content area or Sidebar? 
              User said "within dashboard" and "fixed bottom left". 
              Usually "fixed bottom left" of the screen.
          */}
          <div className="fixed bottom-8 left-80 z-40">
             <button className="bg-red-500 text-white flex items-center gap-3 px-6 py-4 rounded-2xl shadow-xl shadow-red-200 hover:bg-red-600 hover:scale-105 active:scale-95 transition-all group">
                <div className="bg-white/20 p-1.5 rounded-lg group-hover:animate-pulse">
                  <AlertTriangle size={20} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-80 leading-none">Emergency</p>
                  <p className="text-sm font-black tracking-tight">Request Help</p>
                </div>
             </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
