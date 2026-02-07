
import React, { useState, useEffect } from 'react';
import { Search, Flame, Target, Rocket, Lightbulb, TrendingUp, ArrowRight, Zap, Loader2, Globe } from 'lucide-react';
import { fetchViralTrends } from '../services/geminiService';

interface TrendsExplorerProps {
  onSelectIdea: (idea: string) => void;
}

const TrendsExplorer: React.FC<TrendsExplorerProps> = ({ onSelectIdea }) => {
  const [trends, setTrends] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [niche, setNiche] = useState('Fitness & Wellness');

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await fetchViralTrends(niche);
      setTrends(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (!localStorage.getItem('virality_gemini_api_key')) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in slide-in-from-bottom-4">
        <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mb-6 border border-white/10 shadow-2xl">
          <Flame className="text-white/20 w-10 h-10" />
        </div>
        <h2 className="text-3xl font-black text-white mb-2 tracking-tight uppercase">Radar Offline</h2>
        <p className="text-white/40 max-w-md font-medium text-sm leading-relaxed">System requires Google Gemini AI Key to find live social media trends.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      {/* Search Header */}
      <div className="relative p-12 rounded-[3.5rem] border border-white/5 overflow-hidden group shadow-2xl bg-gradient-to-br from-[#0c0c0e] to-black">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] -z-0 opacity-50 group-hover:opacity-80 transition-opacity"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-500/10 rounded-full text-[10px] font-black tracking-[0.3em] uppercase mb-8 border border-indigo-500/20 text-indigo-400 font-sans">
            <Globe className="w-3.5 h-3.5" />
            <span>Scanning Viral Signals</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter leading-[0.9] text-gradient uppercase">
            Find <span className="text-indigo-400">Viral</span> Trends
          </h2>
          <p className="text-white/40 text-lg font-medium leading-relaxed italic mb-10 max-w-xl">
            "Enter your niche below. Gemini AI will scan the web to find exactly what topics are trending right now."
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5" />
              <input
                type="text"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full h-16 bg-white/5 border border-white/5 rounded-2xl pl-16 pr-6 text-white text-[11px] font-black uppercase tracking-widest placeholder-white/20 outline-none focus:border-indigo-500/50 transition-all shadow-2xl"
                placeholder="Ex: Luxury Watches, Keto Diet..."
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-10 py-5 bg-white text-black rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-indigo-600 hover:text-white active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-4"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Rocket size={18} />}
              {loading ? 'Scanning...' : 'Scan Now'}
            </button>
          </div>
        </div>
      </div>

      {/* Trends Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {loading ? (
          [1, 2, 3, 4].map(i => <div key={i} className="h-64 bg-white/5 animate-pulse rounded-[3rem] border border-white/5"></div>)
        ) : (
          trends.map((trend, i) => (
            <div key={i} className="group cyber-card p-10 rounded-[3rem] bg-[#0c0c0e] flex flex-col relative overflow-hidden transition-all duration-700">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-bl-[4rem] group-hover:bg-indigo-500/10 transition-all"></div>

              <div className="relative z-10 h-full flex flex-col">
                <div className="flex justify-between items-start mb-8">
                  <span className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border ${trend.urgency === 'hot' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20 animate-pulse' : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'}`}>
                    {trend.urgency} Phase
                  </span>
                  <div className="flex items-center gap-2 text-[10px] font-black text-white/30 uppercase tracking-widest">
                    <TrendingUp size={14} className="text-emerald-400" />
                    <span>Relevance: {trend.relevance}%</span>
                  </div>
                </div>

                <h3 className="text-2xl font-black text-white mb-6 tracking-tight italic uppercase leading-tight group-hover:text-indigo-400 transition-colors">{trend.name}</h3>
                <p className="text-xs text-white/40 mb-10 flex-grow leading-relaxed font-bold italic">"{trend.suggestion}"</p>

                <div className="flex items-center justify-between mt-auto pt-8 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <Zap size={14} className="text-indigo-400" />
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Estimated Reach: <span className="text-white/60 ml-1">{trend.reach}</span></span>
                  </div>
                  <button
                    onClick={() => onSelectIdea(trend.name)}
                    className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-white hover:text-indigo-400 transition-all group-hover:translate-x-2"
                  >
                    Use Trend
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {!loading && (
        <div className="relative p-12 rounded-[3.5rem] bg-indigo-500/5 border border-indigo-500/10 flex flex-col md:flex-row items-center gap-10 overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
            <Globe size={400} className="translate-x-[-20%] translate-y-[-20%]" />
          </div>
          <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 shadow-2xl flex-shrink-0 relative z-10 group-hover:scale-110 transition-transform duration-500">
            <Lightbulb className="text-indigo-400 w-10 h-10" />
          </div>
          <div className="relative z-10 text-center md:text-left">
            <h4 className="text-xl font-black text-white tracking-tight mb-3 uppercase tracking-[0.1em]">AI Tip: Posting Windows</h4>
            <p className="text-sm text-white/40 font-medium leading-relaxed max-w-2xl italic">
              "For <span className="text-indigo-400 font-bold">"{niche}"</span>, users are most active between <span className="text-white">6:00 PM and 9:00 PM</span>. Try posting your content during this time for 40% more views."
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendsExplorer;
