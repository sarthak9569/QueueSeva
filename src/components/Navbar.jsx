import { Bell, LogOut, Heart, Search, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 py-4">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <Heart size={20} className="text-white fill-current" />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tighter">QueueSeva</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
             {['Features', 'Sanctity', 'Pricing', 'Security'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-colors">
                   {item}
                </a>
             ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 group cursor-pointer hover:border-primary/20 transition-all">
             <Search size={14} className="text-slate-400 group-hover:text-primary" />
             <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 group-hover:text-slate-600">Search Protocol</span>
          </div>

          <div className="h-6 w-[1px] bg-slate-100 mx-2 hidden sm:block"></div>

          {user ? (
            <div className="flex items-center gap-3">
               <Link to="/dashboard" className="btn-secondary py-2 px-5 text-[10px]">
                  Dashboard
               </Link>
               <button 
                 onClick={handleLogout}
                 className="h-10 w-10 bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl flex items-center justify-center transition-all active:scale-95"
               >
                 <LogOut size={18} />
               </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
               <Link to="/login" className="px-5 py-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-primary transition-colors">
                 Login
               </Link>
               <Link to="/signup" className="btn-primary py-2 px-6 shadow-lg shadow-primary/20 text-[10px]">
                 Get Started
               </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
