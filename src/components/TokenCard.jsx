const TokenCard = ({ token, isLive = false, isOwnToken = false }) => {
  if (!token) return null;

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'serving': return 'bg-primary/5 text-primary border-primary/20';
      case 'completed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'missed': return 'bg-red-50 text-red-500 border-red-100';
      default: return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  return (
    <div className={`
      premium-card group transition-all duration-300
      ${isOwnToken ? 'ring-2 ring-primary ring-offset-2' : ''}
    `}>
      <div className="flex items-start justify-between mb-4">
        <div>
           <div className="flex items-center gap-2 mb-1">
              <span className="text-lg font-black text-slate-900 tracking-tight">#{token.tokenNumber || '---'}</span>
              {isOwnToken && (
                <span className="bg-primary text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-widest shadow-lg shadow-primary/20">
                  You
                </span>
              )}
           </div>
           <p className="text-[10px] font-black text-primary uppercase tracking-widest leading-none">{token.department || 'General'}</p>
        </div>
        <div className={`px-2.5 py-1 rounded-lg border text-[10px] font-black uppercase tracking-widest ${getStatusColor(token.status)}`}>
           {token.status || 'WAITING'}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-black text-slate-800 tracking-tight line-clamp-1">{token.patientName || 'Clinical Identification'}</h3>
        
        <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
           <div className="flex flex-col">
              <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Initialization</span>
              <span className="text-[10px] font-bold text-slate-500">
                 {token.issuedAt ? new Date(token.issuedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
              </span>
           </div>
           
           <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-300 group-hover:text-primary transition-colors">
              <span className="text-xs font-black">→</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TokenCard;
