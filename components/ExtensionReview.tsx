
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
  Globe
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
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700">
      <div className="bg-[#0A0A0A] p-12 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-bl-full -z-0 blur-3xl group-hover:bg-indigo-600/20 transition-all duration-700"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-5/12">
            <div className="inline-flex items-center space-x-2 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
              <Eye className="w-4 h-4" />
              <span>External Signal Extraction</span>
            </div>
            <h2 className="text-4xl font-black text-white mb-6 tracking-tighter leading-tight">Neural Post Audit</h2>
            <p className="text-white/40 mb-8 font-medium leading-relaxed">
              Synthesize clinical-grade performance reviews for external assets. Decipher the underlying viral logic of any social post.
            </p>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-2">
                <Globe className="text-indigo-500 w-4 h-4" />
                <p className="text-[10px] font-black text-white uppercase tracking-widest">Extension Simulation</p>
              </div>
              <p className="text-[11px] text-white/30 font-medium leading-relaxed italic">"Simulating the Trending Browser Node for seamless signal interception."</p>
            </div>
          </div>

          <div className="md:w-7/12 w-full space-y-6">
            <div className="relative group">
              <MessageSquare className="absolute top-6 left-6 text-white/20 w-5 h-5 pointer-events-none group-focus-within:text-indigo-500 transition-colors" />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste post caption, transcript, or raw signal here..."
                className="w-full h-48 pl-16 pr-8 py-6 bg-white/5 border border-white/10 rounded-[2rem] text-white text-sm font-semibold placeholder-white/10 outline-none focus:bg-white/10 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 transition-all resize-none shadow-2xl"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full h-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-[11px] font-black text-white uppercase tracking-widest outline-none focus:border-indigo-500/50 transition-all appearance-none cursor-pointer"
                >
                  <option className="bg-black">Instagram Hub</option>
                  <option className="bg-black">TikTok Node</option>
                  <option className="bg-black">LinkedIn Terminal</option>
                  <option className="bg-black">Twitter Protocol</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">▼</div>
              </div>
              <button
                onClick={handleAnalyze}
                disabled={loading || !content}
                className="group px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-2xl shadow-indigo-600/20 hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                {loading ? 'Decrypting Layers...' : 'Intercept Signal'}
                <Zap className="w-4 h-4 fill-current group-hover:rotate-12 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {review && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-in slide-in-from-bottom-6 fade-in duration-700 pb-12">
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col items-center text-center group">
            <div className="relative w-48 h-48 mb-10 group-hover:scale-105 transition-transform duration-700">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-50" />
                <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent"
                  className="text-indigo-600 transition-all duration-1000"
                  strokeDasharray={552}
                  strokeDashoffset={552 - (552 * review.viralityScore) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-black text-gray-900 tracking-tighter">{review.viralityScore}</span>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-2">Score</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
                <Activity size={12} className="text-indigo-600" />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Overall Verdict</span>
              </div>
              <p className="text-sm font-bold text-gray-500 leading-relaxed italic px-2">"{review.verdict}"</p>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm group hover:border-indigo-100 transition-colors">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
                    <Sparkles size={18} />
                  </div>
                  <h3 className="text-lg font-black text-gray-900 tracking-tight uppercase tracking-widest">Hook Reinforcement</h3>
                </div>
                <button className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:scale-105 transition-all">Copy Prompt</button>
              </div>
              <div className="p-8 bg-indigo-50/50 rounded-[2rem] border border-indigo-100 text-sm font-semibold text-indigo-900 leading-relaxed italic">
                {review.hookImprovement}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-emerald-50/50 p-8 rounded-[3rem] border border-emerald-100 group">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-emerald-500 rounded-xl text-white">
                    <CheckCircle2 size={16} />
                  </div>
                  <h4 className="text-[11px] font-black text-emerald-700 uppercase tracking-widest">Signal Assets</h4>
                </div>
                <ul className="space-y-4">
                  {review.strengths.map((s: string, i: number) => (
                    <li key={i} className="text-xs font-bold text-emerald-800 flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-rose-50/50 p-8 rounded-[3rem] border border-rose-100 group">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-rose-500 rounded-xl text-white">
                    <ShieldAlert size={16} />
                  </div>
                  <h4 className="text-[11px] font-black text-rose-700 uppercase tracking-widest">Signal Noise</h4>
                </div>
                <ul className="space-y-4">
                  {review.weaknesses.map((w: string, i: number) => (
                    <li key={i} className="text-xs font-bold text-rose-800 flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-rose-400 rounded-full mt-1.5 flex-shrink-0"></div>
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
