
import React, { useState, useEffect } from 'react';
import {
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
  Rocket,
  Loader2,
  Terminal,
  Target,
  Lock,
  Youtube
} from 'lucide-react';
import { generatePostFromIdea } from '../services/geminiService';
import { postToPlatform, schedulePost } from '../services/platformService';
import { Platform } from '../types';
import { useAuth } from '../contexts/AuthContext';
import SubscriptionModal from './SubscriptionModal';

interface ContentGeneratorProps {
  initialIdea?: string;
}

const FREE_TRIAL_LIMIT = 3;

const ContentGenerator: React.FC<ContentGeneratorProps> = ({ initialIdea = '' }) => {
  const { user, userData, updateUserData } = useAuth();
  const [idea, setIdea] = useState(initialIdea);
  const [platforms, setPlatforms] = useState<Platform[]>([Platform.INSTAGRAM, Platform.TIKTOK]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [actionStatus, setActionStatus] = useState<Record<string, 'idle' | 'loading' | 'success'>>({});
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  useEffect(() => {
    if (initialIdea) {
      setIdea(initialIdea);
    }
  }, [initialIdea]);

  const handleGenerate = async () => {
    if (!idea || !userData) return;

    // Check usage limits
    if (userData.subscriptionStatus === 'trial' && userData.postCount >= FREE_TRIAL_LIMIT) {
      setShowSubscriptionModal(true);
      return;
    }

    setLoading(true);
    try {
      const adaptations: any = {};
      for (const p of platforms) {
        adaptations[p] = await generatePostFromIdea({ topic: idea }, p);
      }
      setResults(adaptations);

      // Increment Usage Count
      await updateUserData({ postCount: (userData.postCount || 0) + 1 });

    } catch (e) {
      console.error(e);
      alert("Error generating content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDirectPost = async (p: Platform, content: any) => {
    if (!user) return;
    const actionKey = `${p}_post`;
    setActionStatus(prev => ({ ...prev, [actionKey]: 'loading' }));

    try {
      await postToPlatform(user.uid, p, content);
      setActionStatus(prev => ({ ...prev, [actionKey]: 'success' }));
      setTimeout(() => setActionStatus(prev => ({ ...prev, [actionKey]: 'idle' })), 3000);
    } catch (e) {
      console.error(e);
      setActionStatus(prev => ({ ...prev, [actionKey]: 'idle' }));
    }
  };

  const handleSchedule = async (p: Platform, content: any) => {
    if (!user) return;
    const actionKey = `${p}_schedule`;
    setActionStatus(prev => ({ ...prev, [actionKey]: 'loading' }));

    const mockDate = new Date(Date.now() + 86400000).toISOString(); // Tomorrow

    try {
      await schedulePost(user.uid, p, content, mockDate);
      setActionStatus(prev => ({ ...prev, [actionKey]: 'success' }));
      setTimeout(() => setActionStatus(prev => ({ ...prev, [actionKey]: 'idle' })), 3000);
    } catch (e) {
      console.error(e);
      setActionStatus(prev => ({ ...prev, [actionKey]: 'idle' }));
    }
  };

  if (!userData) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20 animate-in fade-in duration-1000">
      <div className="cyber-card p-12 rounded-[3.5rem] relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[100px] -z-0"></div>

        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-3 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8 px-4 py-2 bg-indigo-500/10 rounded-full border border-indigo-500/20">
            <Sparkles className="w-4 h-4" />
            <span>AI Content Factory</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter leading-tight uppercase text-gradient">Make Viral Posts</h2>
          <p className="text-white/40 mb-8 font-medium leading-relaxed italic">
            "Just type your idea below. Google Gemini AI will write everything for you. Then, post directly to your apps with one click."
          </p>

          {/* Trial Status Indicator */}
          {userData.subscriptionStatus === 'trial' && (
            <div className="mb-8 inline-flex items-center gap-3 px-6 py-3 bg-white/5 rounded-2xl border border-white/10">
              <div className="flex gap-1.5">
                {[...Array(FREE_TRIAL_LIMIT)].map((_, i) => (
                  <div key={i} className={`w-8 h-2 rounded-full transition-all ${i < (userData.postCount || 0) ? 'bg-indigo-500' : 'bg-white/20'}`}></div>
                ))}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/60 ml-2">
                {FREE_TRIAL_LIMIT - (userData.postCount || 0)} Free Gens Left
              </span>
            </div>
          )}

          <div className="relative mb-10 group">
            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Ex: 5 tips to wake up early and feel great..."
              className="w-full h-48 px-10 py-8 bg-white/5 border border-white/5 rounded-[2.5rem] focus:bg-white/10 focus:border-indigo-500/30 transition-all text-lg font-bold text-white placeholder:text-white/5 resize-none outline-none group-hover:border-white/10 shadow-2xl"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[Platform.INSTAGRAM, Platform.TIKTOK, Platform.LINKEDIN, Platform.TWITTER, Platform.FACEBOOK, Platform.YOUTUBE].map((p) => {
              const Icon = getPlatformIconComponent(p);
              const active = platforms.includes(p);
              return (
                <button
                  key={p}
                  onClick={() => setPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])}
                  className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all flex items-center gap-3 ${active
                    ? 'bg-white border-white text-black shadow-[0_0_30px_rgba(255,255,255,0.1)] scale-105'
                    : 'bg-white/5 border-white/5 text-white/30 hover:border-white/10 hover:text-white'
                    }`}
                >
                  <Icon size={14} />
                  {p}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleGenerate}
              disabled={loading || !idea}
              className="group relative px-14 py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-[11px] uppercase tracking-widest hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_40px_rgba(79,70,229,0.3)] flex items-center justify-center gap-4 mx-auto"
            >
              {loading ? 'AI is Writing...' : 'Write My Posts'}
              {!loading && <Zap className="w-5 h-5 fill-current transition-transform group-hover:scale-110" />}
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            </button>

            {userData.subscriptionStatus === 'trial' && userData.postCount >= FREE_TRIAL_LIMIT && (
              <button onClick={() => setShowSubscriptionModal(true)} className="text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-white transition-colors flex items-center gap-2">
                <Lock size={12} />
                Unlock Unlimited Access
              </button>
            )}
          </div>
        </div>
      </div>

      {results && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in slide-in-from-bottom-10 duration-1000">
          {Object.entries(results).map(([p, content]: [any, any]) => {
            const platform = p as Platform;
            const postStatus = actionStatus[`${p}_post`] || 'idle';
            const schedStatus = actionStatus[`${p}_schedule`] || 'idle';

            return (
              <div key={p} className="cyber-card rounded-[3.5rem] overflow-hidden flex flex-col group border hover:border-indigo-500/30">
                <div className="px-10 py-8 bg-white/2 border-b border-white/5 flex justify-between items-center group-hover:bg-white/5 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/5 group-hover:text-indigo-400 transition-colors">
                      {React.createElement(getPlatformIconComponent(p), { size: 18 })}
                    </div>
                    <span className="font-black text-white uppercase tracking-widest text-[11px]">{p} Post</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] leading-none">Node Ready</span>
                  </div>
                </div>

                <div className="p-10 space-y-10 flex-grow">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Copy Caption</h4>
                      <button
                        onClick={() => handleCopy(content.caption, `${p}_cap`)}
                        className="text-[9px] font-black text-indigo-400 uppercase tracking-widest hover:text-white transition-colors"
                      >
                        {copiedId === `${p}_cap` ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <div className="bg-white/5 p-8 rounded-[2.5rem] font-sans text-sm font-bold text-white/70 whitespace-pre-wrap border border-white/5 leading-relaxed italic shadow-2xl">
                      {content.caption}
                    </div>
                  </div>

                  {content.video_script && (
                    <div className="p-10 bg-indigo-500/5 rounded-[3rem] border border-indigo-500/20 relative overflow-hidden group/script">
                      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover/script:opacity-10 transition-opacity">
                        <Terminal size={100} />
                      </div>
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-8">
                          <Target size={14} className="text-indigo-400" />
                          <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">Video Script</h4>
                        </div>

                        <div className="space-y-8">
                          <div>
                            <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] mb-3">The Hook (First 3 Seconds)</p>
                            <p className="text-lg font-black text-white tracking-tight leading-snug">"{content.video_script.hook}"</p>
                          </div>

                          <div className="space-y-4">
                            <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] mb-4">The Story</p>
                            <div className="space-y-5">
                              {content.video_script.body?.map((line: string, idx: number) => (
                                <div key={idx} className="flex items-start gap-4">
                                  <div className="w-1.5 h-1.5 bg-indigo-500/40 rounded-full mt-2 flex-shrink-0"></div>
                                  <p className="text-xs font-bold text-white/60 leading-relaxed font-mono">{line}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {content.hashtags?.map((tag: string, i: number) => (
                      <span key={i} className="text-[9px] font-black text-white/20 bg-white/5 px-4 py-2 rounded-full uppercase tracking-widest border border-white/5 hover:bg-indigo-500 hover:text-white transition-all cursor-default">
                        {tag.startsWith('#') ? tag : `#${tag}`}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-10 pt-0">
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleDirectPost(platform, content)}
                      disabled={postStatus !== 'idle'}
                      className={`py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl transition-all flex items-center justify-center gap-3 active:scale-95 ${postStatus === 'success' ? 'bg-emerald-500 text-white' : 'bg-white text-black hover:bg-indigo-500 hover:text-white'
                        }`}
                    >
                      {postStatus === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : postStatus === 'success' ? <CheckCircle2 size={16} /> : <Rocket size={16} />}
                      {postStatus === 'loading' ? 'Deploying...' : postStatus === 'success' ? 'Deployed!' : 'Deploy Now'}
                    </button>
                    <button
                      onClick={() => handleSchedule(platform, content)}
                      disabled={schedStatus !== 'idle'}
                      className={`px-10 py-5 bg-white/5 border border-white/5 text-white/40 hover:text-white hover:border-white/20 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${schedStatus === 'success' ? 'text-emerald-400 border-emerald-500/30' : ''
                        }`}
                    >
                      {schedStatus === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : schedStatus === 'success' ? <CheckCircle2 size={16} /> : <Calendar size={16} />}
                      {schedStatus === 'loading' ? 'Scheduling...' : schedStatus === 'success' ? 'Scheduled!' : 'Schedule'}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <SubscriptionModal isOpen={showSubscriptionModal} onClose={() => setShowSubscriptionModal(false)} />
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
    case 'youtube': return Youtube;
    default: return Zap;
  }
};

export default ContentGenerator;
