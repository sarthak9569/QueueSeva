const QueueStatusBar = ({ stats }) => {
  const defaultStats = {
    total: 0,
    waiting: 0,
    serving: 0,
    completed: 0,
    ...stats
  };

  const statConfig = [
    { label: 'Total Volume', value: defaultStats.total, color: 'text-slate-600', bg: 'bg-slate-50' },
    { label: 'In Waiting', value: defaultStats.waiting, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Now Serving', value: defaultStats.serving, color: 'text-primary', bg: 'bg-primary/5' },
    { label: 'Session Ends', value: defaultStats.completed, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statConfig.map((stat, i) => (
        <div key={i} className={`premium-card p-4 flex flex-col items-center justify-center text-center group hover:scale-[1.02] transition-transform`}>
          <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-2">{stat.label}</span>
          <div className={`h-10 px-4 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center text-xl font-black shadow-sm group-hover:shadow-md transition-shadow`}>
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QueueStatusBar;
