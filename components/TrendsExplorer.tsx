
import React, { useState, useEffect } from 'react';
import { Search, Flame, Target, Rocket, Lightbulb, TrendingUp, ArrowRight } from 'lucide-react';
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
        <div className="w-24 h-24 bg-gray-50 rounded-3xl flex items-center justify-center mb-6 border border-gray-100 shadow-sm">
          <Flame className="text-gray-300 w-10 h-10" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Trend Radar Offline</h2>
        <p className="text-gray-500 max-w-md font-medium text-sm leading-relaxed">System requires an active Gemini API Key to establish a secure link with live platform trend data.</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="bg-[#0A0A0A] p-12 rounded-[3.5rem] text-white relative overflow-hidden border border-white/5 shadow-2xl group">
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-2 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            <Target className="w-4 h-4" />
            <span>Neural Scanning Enabled</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">Intercept Viral Shifts</h2>
          <p className="text-white/40 mb-10 max-w-lg font-medium leading-relaxed">
            Scanning live platform metadata to isolate hooks and acoustic patterns currently achieving exponential distribution.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5" />
              <input
                type="text"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white text-sm font-bold placeholder-white/20 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                placeholder="Define niche scope..."
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-indigo-700 active:scale-95 transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3"
            >
              Scan Data
              <Rocket className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="absolute top-[-30%] right-[-5%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-indigo-600/20 transition-all duration-700"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {loading ? (
          [1, 2, 3, 4].map(i => <div key={i} className="h-56 bg-gray-50 animate-pulse rounded-[2.5rem] border border-gray-100"></div>)
        ) : (
          trends.map((trend, i) => (
            <div key={i} className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-indigo-500/20 transition-all duration-500 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-[3rem] -z-0 group-hover:bg-indigo-50 transition-colors"></div>
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border ${trend.urgency === 'hot' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-indigo-50 text-indigo-600 border-indigo-100'}`}>
                    {trend.urgency} Phase
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <TrendingUp size={14} className="text-emerald-500" />
                    <span>Relevance: {trend.relevance}%</span>
                  </div>
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-4 tracking-tight leading-tight">{trend.name}</h3>
                <p className="text-xs text-gray-500 mb-8 flex-grow leading-relaxed font-semibold">{trend.suggestion}</p>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-50">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    EST. REACH: <span className="text-indigo-600 ml-1">{trend.reach}</span>
                  </div>
                  <button
                    onClick={() => onSelectIdea(trend.name)}
                    className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-900 hover:text-indigo-600 transition-colors group-hover:translate-x-1"
                  >
                    Deploy Lab
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {!loading && (
        <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 flex items-center space-x-10 relative overflow-hidden">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-sm flex-shrink-0">
            <Lightbulb className="text-indigo-600 w-10 h-10" />
          </div>
          <div className="relative z-10">
            <h4 className="text-lg font-black text-gray-900 tracking-tight mb-2 uppercase tracking-[0.05em]">Intelligence: Micro-Trend Windows</h4>
            <p className="text-sm text-gray-400 font-medium leading-relaxed max-w-2xl">
              Algorithms for <span className="text-gray-900 font-bold">"{niche}"</span> typically favor high-contrast visual hooks during 18:00 - 21:00 UTC. Standardize your export resolution to 1080x1920 for maximum bitrate retention on TikTok servers.
            </p>
          </div>
          <div className="absolute right-[-2%] bottom-[-50%] text-[10rem] font-black text-gray-900/5 select-none pointer-events-none">
            B-ROLL
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendsExplorer;
