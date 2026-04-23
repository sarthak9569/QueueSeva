import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  BarChart3,
  Activity,
  History,
  FileText,
  User,
  HelpCircle,
  PlusCircle,
  Stethoscope,
  Heart
} from 'lucide-react';

const Sidebar = () => {
  const { t } = useTranslation();
  
  const menuItems = [
    { icon: PlusCircle, label: t('sidebar.generate'), path: '/dashboard/generate' },
    { icon: Activity, label: t('sidebar.live'), path: '/dashboard/live' },
    { icon: History, label: t('sidebar.history'), path: '/dashboard/history' },
    { icon: FileText, label: t('sidebar.prescriptions'), path: '/dashboard/prescriptions' },
    { icon: User, label: t('sidebar.profile'), path: '/dashboard/profile' },
    { icon: HelpCircle, label: t('sidebar.faq'), path: '/dashboard/faq' },
  ];

  return (
    <aside className="w-72 bg-white h-screen border-r border-slate-200 flex flex-col sticky top-0 overflow-y-auto">
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Heart size={24} className="text-white fill-current" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">QueueSeva</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Clinical Sanctuary</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 mt-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 group
                ${isActive
                  ? 'bg-primary/5 text-primary'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={20}
                    className={isActive ? 'text-primary' : 'text-slate-400 group-hover:text-slate-900'}
                  />
                  <span className="font-bold text-sm">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-6">
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
          <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">{t('sidebar.hospitalStatus')}</p>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-bold text-slate-800 tracking-tight">{t('sidebar.operational')}</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">Latency: <span className="text-primary font-bold">24ms</span></p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
