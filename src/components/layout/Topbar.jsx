import { Bell, Search, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Topbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-30 shadow-sm/5">
      <div className="flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 w-96 group focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20 transition-all">
        <Search size={18} className="text-slate-400 group-focus-within:text-primary transition-colors" />
        <input 
          type="text" 
          placeholder="Search patient records, tokens..." 
          className="bg-transparent border-none outline-none text-sm w-full text-slate-600 placeholder:text-slate-400"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors group">
          <Bell size={22} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white group-hover:scale-110 transition-transform"></span>
        </button>

        <div className="h-10 w-[1px] bg-slate-100"></div>

        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900 leading-none">{user?.name || 'Authorized User'}</p>
            <p className="text-[10px] font-bold text-primary uppercase tracking-widest mt-1">Clinical Guardian</p>
          </div>
          <div className="relative group">
            <button className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary to-secondary p-0.5 shadow-sm group-hover:shadow-md transition-all">
              <div className="h-full w-full bg-white rounded-[10px] flex items-center justify-center overflow-hidden">
                <User size={24} className="text-primary" />
              </div>
            </button>
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2 z-50">
              <button 
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
              >
                <LogOut size={18} />
                Logout Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
