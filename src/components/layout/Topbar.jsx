import { Bell, Search, User, LogOut, Globe, ChevronDown, X, Ticket, FileText, LayoutGrid } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueue } from '../../context/QueueContext';
import axiosInstance from '../../api/axiosInstance';
import { DEPARTMENTS } from '../../dashboard/TokenGenerator';

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'mr', label: 'मराठी' },
  { code: 'gu', label: 'ગુજરાતી' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'te', label: 'తెలుగు' },
];

const Topbar = ({ setSearchQuery }) => {
  const { user, logout } = useAuth();
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const searchContainerRef = useRef(null);

  const [langOpen, setLangOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Cross-module data sources
  const { prescriptions } = useQueue();
  const [tokens, setTokens] = useState([]);

  // Fetch tokens ONCE on mount to cache for fast global search
  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await axiosInstance.get('/queue/history');
        if (Array.isArray(response.data)) {
          setTokens(response.data);
        }
      } catch (err) {
        console.error("Failed to fetch tokens for global search", err);
      }
    };
    fetchTokens();
  }, []);

  // Build the intelligent global search dataset once
  const globalSearchData = useMemo(() => {
    const data = [];

    // 1. Map Departments
    DEPARTMENTS.forEach(dept => {
      data.push({
        id: dept.id,
        title: t(`departments.${dept.id}.name`),
        type: 'department',
        route: '/dashboard/generate',
        meta: t(`departments.${dept.id}.desc`),
        icon: LayoutGrid
      });
    });

    // 2. Map Tokens
    tokens.forEach(token => {
      data.push({
        id: token._id || token.id,
        title: `Token #${token.tokenNumber}`,
        type: 'token',
        route: '/dashboard/history',
        meta: token.department,
        icon: Ticket
      });
    });

    // 3. Map Prescriptions
    prescriptions.forEach(rx => {
      data.push({
        id: rx.id,
        title: `Prescription: ${rx.department || rx.tokenNumber}`,
        type: 'prescription',
        route: '/dashboard/prescriptions',
        meta: rx.medicines || rx.patientName,
        icon: FileText
      });
    });

    return data;
  }, [tokens, prescriptions, t]);

  // Click Outside logic to safely close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search logic for UI performance
  useEffect(() => {
    const normalizedQuery = inputValue.trim().toLowerCase();
    
    // Sync the global state so other modules maintain their standard filtering logic 
    // independently if users don't interact with the dropdown.
    setSearchQuery(normalizedQuery);

    if (!normalizedQuery) {
      setSuggestions([]);
      setIsDropdownOpen(false);
      return;
    }

    const handler = setTimeout(() => {
      let results = globalSearchData.filter(item => 
        item.title?.toLowerCase().includes(normalizedQuery) || 
        item.meta?.toLowerCase().includes(normalizedQuery)
      );

      // Smart Matching: Prioritize exact startsWith matches
      results = results.sort((a, b) => {
        const aStarts = a.title?.toLowerCase().startsWith(normalizedQuery) ? 1 : 0;
        const bStarts = b.title?.toLowerCase().startsWith(normalizedQuery) ? 1 : 0;
        return bStarts - aStarts;
      });

      // Cap at 6 results to not overwhelm the UI
      setSuggestions(results.slice(0, 6));
      setIsDropdownOpen(true);
    }, 250); // 250ms debounce layer

    return () => clearTimeout(handler);
  }, [inputValue, globalSearchData, setSearchQuery]);

  const handleSearchChange = (e) => {
    setInputValue(e.target.value);
  };

  const clearAllSearchState = () => {
    setInputValue("");
    setSearchQuery("");
    setSuggestions([]);
    setIsDropdownOpen(false);
  };

  const handleSuggestionClick = (route) => {
    navigate(route);
    clearAllSearchState(); // Clear all state BEFORE navigating to avoid pre-filtered bug on next page
  };

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('lang', code);
    setLangOpen(false);
  };

  const currentLang = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[0];

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
      
      {/* Smart Search Global Container */}
      <div className="relative w-96 z-50" ref={searchContainerRef}>
        <div className="flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 group focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <Search size={18} className="text-slate-400 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search departments, tokens, prescriptions..." 
            className="bg-transparent border-none outline-none text-sm w-full text-slate-600 placeholder:text-slate-400"
            value={inputValue}
            onChange={handleSearchChange}
            onFocus={() => { if (inputValue.trim()) setIsDropdownOpen(true); }}
          />
          {inputValue && (
            <button 
              onClick={clearAllSearchState}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Real-time Suggestions Dropdown */}
        {isDropdownOpen && inputValue && (
          <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50">
            {suggestions.length > 0 ? (
              <div className="flex flex-col">
                <div className="px-3 py-2 border-b border-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Quick Results
                </div>
                {suggestions.map((item) => (
                  <button 
                    key={item.id + item.type}
                    onClick={() => handleSuggestionClick(item.route)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left border-b border-slate-50 border-last-none"
                  >
                    <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex justify-center items-center flex-shrink-0">
                       <item.icon size={16} />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-sm font-bold text-slate-700 truncate min-w-0">{item.title}</p>
                      {item.meta && <p className="text-[10px] font-medium text-slate-400 truncate min-w-0">{item.meta}</p>}
                    </div>
                    <div className="flex-shrink-0 ml-2">
                       <span className="bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md">
                         {item.type}
                       </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-4 py-8 text-center flex flex-col items-center">
                 <Search size={24} className="text-slate-200 mb-2" />
                 <p className="text-sm font-bold text-slate-500">No results found</p>
                 <p className="text-xs font-medium text-slate-400 mt-1">Try a different search term</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors group">
            <Bell size={22} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white group-hover:scale-110 transition-transform"></span>
          </button>

          {/* Minimal Language Switcher */}
          <div className="relative">
            <button 
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-all cursor-pointer text-sm font-bold text-slate-600"
            >
              <Globe size={14} />
              <span>{currentLang.label}</span>
              <ChevronDown size={12} className={`transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} />
            </button>

            {langOpen && (
              <div className="absolute top-full right-0 mt-2 w-32 bg-white border border-slate-100 rounded-xl shadow-xl overflow-hidden z-50">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full text-left px-4 py-2 text-xs font-bold transition-colors flex items-center justify-between
                      ${i18n.language === lang.code ? 'bg-primary/5 text-primary' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    {lang.label}
                    {i18n.language === lang.code && <div className="h-1 w-1 bg-primary rounded-full"></div>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

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
