
import React, { useState } from 'react';
import {
  Search,
  FlaskConical,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  Activity,
  Eye,
  MessageSquare,
  TrendingUp,
  Zap,
  Globe,
  Plus,
  ArrowRight,
  ShieldCheck,
  Terminal,
  Loader2
} from 'lucide-react';
import { reviewExternalPost } from '../services/geminiService';

const ExtensionReview: React.FC = () => {
  const [content, setContent] = useState('');
  const [platform, setPlatform] = useState('Instagram');
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!content) return;
    setLoading(true);
    try {
      const result = await reviewExternalPost(content, platform);
      setReview(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20 animate-in fade-in duration-1000">
      <div className="cyber-card p-12 rounded-[4rem] relative overflow-hidden group border-white/5 bg-[#0c0c0e]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[100px] -z-0 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-5/12">
            <div className="inline-flex items-center space-x-3 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8 bg-indigo-500/10 px-5 py-2 rounded-full border border-indigo-500/20">
              <Eye className="w-4 h-4" />
              <span>Signal Intercept Active</span>
            </div>
            <h2 className="text-5xl font-black text-white mb-8 tracking-tighter leading-[0.9] uppercase text-gradient italic">Neural <br />Audit</h2>
            <p className="text-white/40 mb-10 font-medium leading-relaxed italic text-lg">
              "Paste any viral candidate here. Our neural engine will decipher the underlying logic and predict probability of success."
            </p>

            <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 backdrop-blur-md group hover:bg-white/10 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <Globe className="text-indigo-400 w-5 h-5" />
                <p className="text-[10px] font-black text-white uppercase tracking-widest">Global Node Sync</p>
              </div>
              <p className="text-xs text-white/30 font-bold leading-relaxed italic">"Simulating the <span className="text-indigo-400">Trending Browser Node</span> for seamless signal interception across the social mesh."</p>
            </div>
          </div>

          <div className="md:w-7/12 w-full space-y-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-indigo-500/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity rounded-[3rem]"></div>
              <MessageSquare className="absolute top-8 left-8 text-white/20 w-6 h-6 pointer-events-none group-focus-within:text-indigo-400 transition-colors z-20" />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste raw signal caption or transcript..."
                className="relative z-10 w-full h-64 pl-20 pr-10 py-8 bg-[#111115] border border-white/10 rounded-[3rem] text-white text-lg font-bold placeholder-white/20 outline-none focus:bg-white/5 focus:border-indigo-500/30 transition-all resize-none shadow-2xl"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1 relative">
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full h-full px-8 py-6 bg-white/5 border border-white/5 rounded-[2rem] text-[11px] font-black text-white uppercase tracking-widest outline-none focus:border-indigo-500/30 transition-all appearance-none cursor-pointer hover:bg-white/10"
                >
                  <option className="bg-black">Instagram Hub</option>
                  <option className="bg-black">TikTok Node</option>
                  <option className="bg-black">LinkedIn Terminal</option>
                  <option className="bg-black">Twitter Protocol</option>
                </select>
                <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">▼</div>
              </div>
              <button
                onClick={handleAnalyze}
                disabled={loading || !content}
                className="group px-12 py-6 bg-white text-black rounded-[2rem] font-black text-[11px] uppercase tracking-widest shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:bg-indigo-600 hover:text-white active:scale-95 transition-all flex items-center justify-center gap-4 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Zap className="w-5 h-5 fill-current group-hover:rotate-12 transition-transform" />}
                {loading ? 'Deciphering...' : 'Run Audit'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {review && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-in slide-in-from-bottom-10 fade-in duration-1000">
          <div className="cyber-card p-12 rounded-[4rem] bg-[#0c0c0e] flex flex-col items-center text-center group border border-white/5 hover:border-indigo-500/30 transition-all">
            <div className="relative w-64 h-64 mb-12 group-hover:scale-105 transition-transform duration-700">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="128" cy="128" r="110" stroke="rgba(255,255,255,0.03)" strokeWidth="12" fill="transparent" />
                <circle cx="128" cy="128" r="110" stroke="#4f46e5" strokeWidth="12" fill="transparent"
                  className="transition-all duration-1000 shadow-[0_0_30px_rgba(79,70,229,0.5)]"
                  strokeDasharray={691}
                  strokeDashoffset={691 - (691 * review.viralityScore) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-7xl font-black text-white tracking-tighter italic">{review.viralityScore}</span>
                <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em] mt-2">Node Score</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-6 py-2 bg-indigo-500/10 rounded-full border border-indigo-500/20">
                <Activity size={12} className="text-indigo-400" />
                <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest leading-none">Diagnostic Verdict</span>
              </div>
              <p className="text-xl font-bold text-white/70 leading-relaxed italic px-2">"{review.verdict}"</p>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-10">
            <div className="cyber-card p-12 rounded-[4rem] bg-[#0c0c0e] hover:border-indigo-500/30 transition-all group border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-[60px] pointer-events-none"></div>
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-5">
                  <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white tracking-tight uppercase italic leading-none mb-1">Signal Boost</h3>
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Optimized Hook Protocol</p>
                  </div>
                </div>
              </div>
              <div className="p-10 bg-[#111115] rounded-[3rem] border border-white/5 text-xl font-medium text-indigo-200 leading-relaxed italic shadow-inner">
                "{review.hookImprovement}"
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-emerald-500/5 p-10 rounded-[3.5rem] border border-emerald-500/10 group hover:bg-emerald-500/10 transition-colors">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 size={20} />
                  </div>
                  <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em]">Signal Integrity</h4>
                </div>
                <ul className="space-y-5">
                  {review.strengths.map((s: string, i: number) => (
                    <li key={i} className="text-sm font-bold text-white/50 flex items-start gap-4">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-rose-500/5 p-10 rounded-[3.5rem] border border-rose-500/10 group hover:bg-rose-500/10 transition-colors">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-rose-500/10 rounded-2xl text-rose-400 border border-rose-500/20">
                    <ShieldAlert size={20} />
                  </div>
                  <h4 className="text-[10px] font-black text-rose-400 uppercase tracking-[0.3em]">Signal Noise</h4>
                </div>
                <ul className="space-y-5">
                  {review.weaknesses.map((w: string, i: number) => (
                    <li key={i} className="text-sm font-bold text-white/50 flex items-start gap-4">
                      <div className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExtensionReview;
