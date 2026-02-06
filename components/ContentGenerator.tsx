
import React, { useState, useEffect } from 'react';
import {
  FlaskConical,
  Sparkles,
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  Music2,
  Calendar,
  Copy,
  Zap,
  CheckCircle2,
  Send
} from 'lucide-react';
import { generatePostFromIdea } from '../services/geminiService';
import { Platform } from '../types';

interface ContentGeneratorProps {
  initialIdea?: string;
}

const ContentGenerator: React.FC<ContentGeneratorProps> = ({ initialIdea = '' }) => {
  const [idea, setIdea] = useState(initialIdea);
  const [platforms, setPlatforms] = useState<Platform[]>([Platform.INSTAGRAM, Platform.TIKTOK]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    if (initialIdea) {
      setIdea(initialIdea);
    }
  }, [initialIdea]);

  const handleGenerate = async () => {
    if (!idea) return;
    setLoading(true);
    try {
      const adaptations: any = {};
      for (const p of platforms) {
        adaptations[p] = await generatePostFromIdea({ topic: idea }, p);
      }
      setResults(adaptations);
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
          <Sparkles className="text-gray-300 w-10 h-10" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">AI Lab Locked</h2>
        <p className="text-gray-500 max-w-md font-medium text-sm leading-relaxed">Connect your Gemini API Key in Settings to start generating multichannel viral content protocols.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700">
      <div className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-sm text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-24 h-24 bg-indigo-500/5 rounded-br-[3rem] flex items-center justify-center">
          <FlaskConical className="text-indigo-600 w-8 h-8" />
        </div>

        <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter">Conceptual Deployment</h2>
        <p className="text-gray-400 mb-10 max-w-lg mx-auto font-medium">Describe your conceptual seed and the neural engine will adapt it for every major social distribution node.</p>

        <div className="relative mb-8 group">
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="E.g. Tactical breakdown of the high-performance morning routine..."
            className="w-full h-40 px-8 py-6 bg-gray-50 border border-gray-100 rounded-[2.5rem] focus:bg-white focus:border-indigo-500/30 focus:ring-4 focus:ring-indigo-500/5 transition-all text-lg font-semibold resize-none outline-none group-hover:border-gray-200"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {[Platform.INSTAGRAM, Platform.TIKTOK, Platform.LINKEDIN, Platform.TWITTER, Platform.FACEBOOK].map((p) => {
            const Icon = getPlatformIconComponent(p);
            const active = platforms.includes(p);
            return (
              <button
                key={p}
                onClick={() => setPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])}
                className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all flex items-center gap-2 ${active
                  ? 'bg-gray-900 border-gray-900 text-white shadow-xl scale-105'
                  : 'bg-white border-gray-100 text-gray-400 hover:border-indigo-200 hover:text-indigo-600'
                  }`}
              >
                <Icon size={14} />
                {p}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !idea}
          className="group relative px-12 py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-indigo-100 flex items-center justify-center gap-4 mx-auto overflow-hidden"
        >
          <span className="relative z-10">{loading ? 'Synthesizing Content...' : 'Finalize & Deploy Protocol'}</span>
          {!loading && <Zap className="w-4 h-4 fill-current transition-transform group-hover:rotate-12" />}
          {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
        </button>
      </div>

      {results && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {Object.entries(results).map(([p, content]: [any, any]) => (
            <div key={p} className="bg-white rounded-[3rem] border border-gray-100 overflow-hidden shadow-sm flex flex-col hover:border-indigo-100 transition-colors group">
              <div className="px-10 py-6 bg-gray-50 border-b border-gray-100 flex justify-between items-center group-hover:bg-indigo-50/30 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white rounded-xl shadow-sm">
                    {React.createElement(getPlatformIconComponent(p), { size: 16, className: "text-gray-900" })}
                  </div>
                  <span className="font-black text-gray-900 uppercase tracking-widest text-[11px]">{p}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">AI Optimized</span>
                </div>
              </div>
              <div className="p-10 space-y-8 flex-grow">
                <div>
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Final Caption</h4>
                  <div className="bg-gray-50 p-6 rounded-[2rem] font-sans text-sm font-semibold text-gray-700 whitespace-pre-wrap border border-gray-100 leading-relaxed group-hover:bg-white transition-colors">
                    {content.caption}
                  </div>
                </div>

                {content.video_script && (
                  <div className="p-8 bg-indigo-50/50 rounded-[2.5rem] border border-indigo-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                      <Music2 size={80} />
                    </div>
                    <div className="relative z-10">
                      <h4 className="text-[10px] font-black text-indigo-700 uppercase tracking-widest mb-6">Short-Form Logic</h4>
                      <div className="space-y-6">
                        <div>
                          <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-1">Impact Hook</p>
                          <p className="text-sm font-black text-indigo-900 italic leading-snug">"{content.video_script.hook}"</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-2">Narrative Sequence</p>
                          <ul className="space-y-3">
                            {content.video_script.body?.map((line: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-indigo-300 rounded-full mt-1.5 flex-shrink-0"></div>
                                <p className="text-xs font-bold text-indigo-800 leading-relaxed">{line}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="pt-2">
                          <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-1">Conversion CTA</p>
                          <p className="text-xs font-black text-indigo-900 uppercase tracking-tight">"{content.video_script.cta}"</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 pt-2">
                  {content.hashtags?.map((tag: string, i: number) => (
                    <span key={i} className="text-indigo-600 text-[9px] font-black bg-indigo-50 px-3 py-1.5 rounded-full uppercase tracking-widest border border-indigo-100">
                      {tag.startsWith('#') ? tag : `#${tag}`}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-10 pt-0">
                <div className="flex gap-4">
                  <button className="flex-1 py-4 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-indigo-600 transition-all flex items-center justify-center gap-2">
                    <Calendar size={14} />
                    Schedule
                  </button>
                  <button className="px-8 py-4 bg-white border border-gray-100 text-gray-400 hover:text-indigo-600 hover:border-indigo-100 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2">
                    <Copy size={14} />
                    Copy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const getPlatformIconComponent = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'instagram': return Instagram;
    case 'tiktok': return Music2;
    case 'linkedin': return Linkedin;
    case 'twitter': return Twitter;
    case 'facebook': return Facebook;
    default: return Zap;
  }
};

export default ContentGenerator;
