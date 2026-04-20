import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { AlertTriangle } from 'lucide-react';

const DashboardLayout = () => {
  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Topbar />
        
        <main className="flex-1 overflow-y-auto relative">
          <div className="max-w-7xl mx-auto p-8 space-y-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
