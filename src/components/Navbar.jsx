import { Heart, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('');

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  useEffect(() => {
    if (location.pathname !== '/') return;

    const options = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Trigger when section is in the middle of the viewport
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    const sections = ['features', 'how-it-works', 'support'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const navLinks = [
    { label: t('navbar.features'), href: '#features' },
    { label: t('navbar.howItWorks'), href: '#how-it-works' },
    { label: t('navbar.support'), href: '#support' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 h-20 flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <Heart size={22} className="text-white fill-current" />
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-tighter">QueueSeva</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              className={`text-sm font-semibold transition-all duration-300 relative py-1
                ${activeSection === item.href.replace('#', '') 
                   ? 'text-primary' 
                   : 'text-slate-600 hover:text-primary'}`}
            >
              {item.label}
              {activeSection === item.href.replace('#', '') && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full animate-in fade-in slide-in-from-bottom-1 duration-300"></span>
              )}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md hover:scale-105 transition-all">
                  {t('navbar.dashboard')}
                </button>
              </Link>
              <button 
                onClick={handleLogout}
                className="p-2.5 bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:text-primary transition-colors">
                {t('navbar.login')}
              </Link>
              <Link to="/signup">
                <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md hover:scale-105 transition-all">
                  {t('navbar.getStarted')}
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
