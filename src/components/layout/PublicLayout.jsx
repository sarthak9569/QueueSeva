import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-white selection:bg-primary/10">
      <Navbar />
      <main>
        <Outlet />
      </main>
      
      {/* Minimalist Footer */}
      <footer className="bg-white border-t border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">Q</div>
                <span className="text-xl font-black text-slate-800 tracking-tighter">QueueSeva</span>
              </div>
              <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
                Queue management made simple. Reimagining healthcare one token at a time.
              </p>
            </div>

            <div className="flex flex-wrap gap-8 md:gap-16">
              <div className="space-y-4 text-sm">
                <p className="font-bold text-slate-800">Product</p>
                <div className="flex flex-col gap-2 text-gray-500">
                  <a href="#" className="hover:text-primary transition-colors">Features</a>
                  <a href="#" className="hover:text-primary transition-colors">Queue Live</a>
                  <a href="#" className="hover:text-primary transition-colors">Security</a>
                </div>
              </div>
              <div className="space-y-4 text-sm">
                <p className="font-bold text-slate-800">Company</p>
                <div className="flex flex-col gap-2 text-gray-500">
                  <a href="#" className="hover:text-primary transition-colors">About Us</a>
                  <a href="#" className="hover:text-primary transition-colors">Contact</a>
                  <a href="#" className="hover:text-primary transition-colors">Careers</a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 font-medium">
            <p>© 2024 QueueSeva Clinical Systems. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
