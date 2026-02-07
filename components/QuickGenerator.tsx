
import React, { useState } from 'react';
import { Sparkles, Zap, Loader2, Lock, Instagram, Music2, Linkedin, Twitter, Check } from 'lucide-react';
import { generatePostFromIdea } from '../services/geminiService';
import { useAuth } from '../contexts/AuthContext';
import { Platform } from '../types';

const QuickGenerator: React.FC = () => {
    const { signInWithGoogle } = useAuth();
    const [topic, setTopic] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [selectedPlatform, setSelectedPlatform] = useState<Platform>(Platform.INSTAGRAM);

    const platforms = [
        { id: Platform.INSTAGRAM, icon: Instagram, label: "Instagram" },
        { id: Platform.TIKTOK, icon: Music2, label: "TikTok" },
        { id: Platform.LINKEDIN, icon: Linkedin, label: "LinkedIn" },
        { id: Platform.TWITTER, icon: Twitter, label: "Twitter" },
    ];

    const handleGenerate = async () => {
        if (!topic) return;
        setLoading(true);
        try {
            const content = await generatePostFromIdea({ topic }, selectedPlatform);
            setResult(content);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const getPlatformIcon = (p: Platform) => {
        switch (p) {
            case Platform.INSTAGRAM: return <Instagram size={24} />;
            case Platform.TIKTOK: return <Music2 size={24} />;
            case Platform.LINKEDIN: return <Linkedin size={24} />;
            case Platform.TWITTER: return <Twitter size={24} />;
            default: return <Zap size={24} />;
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto">
            <div className="cyber-card p-1 rounded-[3rem] bg-gradient-to-b from-indigo-500/20 to-transparent p-[1px]">
                <div className="bg-[#0c0c0e] rounded-[3rem] p-8 md:p-12 overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] -z-0 pointer-events-none"></div>

                    {!result ? (
                        <>
                            <div className="text-center mb-10 relative z-10">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-full border border-indigo-500/20 mb-6">
                                    <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300">Instant Demo</span>
                                </div>
                                <h3 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter uppercase italic">Try It Free</h3>
                                <p className="text-white/40 text-lg font-medium italic">"Pick a platform, type your idea, and watch AI write your post in seconds."</p>
                            </div>

                            <div className="relative z-10 max-w-3xl mx-auto">
                                {/* Platform Selector */}
                                <div className="flex justify-center gap-4 mb-8 flex-wrap">
                                    {platforms.map((p) => (
                                        <button
                                            key={p.id}
                                            onClick={() => setSelectedPlatform(p.id)}
                                            className={`px-6 py-3 rounded-2xl flex items-center gap-3 transition-all border ${selectedPlatform === p.id
                                                ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                                                : 'bg-white/5 text-white/40 border-white/5 hover:bg-white/10 hover:text-white'
                                                }`}
                                        >
                                            <p.icon size={16} />
                                            <span className="text-[10px] font-black uppercase tracking-widest">{p.label}</span>
                                        </button>
                                    ))}
                                </div>

                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                                    <input
                                        type="text"
                                        value={topic}
                                        onChange={(e) => setTopic(e.target.value)}
                                        placeholder={`e.g. 3 tips for ${selectedPlatform === Platform.LINKEDIN ? 'leadership' : 'fitness'}...`}
                                        className="relative w-full px-8 py-6 bg-[#111115] border border-white/10 rounded-[2rem] text-lg font-bold text-white placeholder:text-white/20 focus:outline-none focus:bg-[#16161a] transition-all shadow-2xl pr-40"
                                        onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                                    />
                                    <button
                                        onClick={handleGenerate}
                                        disabled={loading || !topic}
                                        className="absolute right-3 top-3 bottom-3 px-8 bg-indigo-600 hover:bg-white hover:text-black text-white rounded-[1.5rem] font-black uppercase tracking-widest text-[11px] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 shadow-lg"
                                    >
                                        {loading ? <Loader2 className="animate-spin" /> : <Zap fill="currentColor" size={16} />}
                                        {loading ? 'Processing...' : 'Generate'}
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 relative z-10">
                            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white/5 rounded-2xl border border-white/5 text-indigo-400">
                                        {getPlatformIcon(selectedPlatform)}
                                    </div>
                                    <div className="text-center md:text-left">
                                        <h4 className="text-xl font-black text-white uppercase italic tracking-tight">Generated For {selectedPlatform}</h4>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-white/30">viral_probability: 94%</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setResult(null)}
                                    className="px-6 py-2 bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors border border-white/5 hover:bg-white/10"
                                >
                                    Try Another Idea
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5 backdrop-blur-md relative group hover:border-indigo-500/20 transition-all">
                                        <div className="absolute top-4 right-4 p-2 bg-indigo-500/10 rounded-lg text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Check size={14} />
                                        </div>
                                        <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] mb-4">Your Caption</p>
                                        <p className="text-sm font-bold text-white/80 leading-relaxed whitespace-pre-wrap italic">
                                            {result.caption}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {result.hashtags?.map((tag: string, i: number) => (
                                            <span key={i} className="text-[9px] font-black bg-indigo-500/10 text-indigo-400 px-3 py-1.5 rounded-full uppercase tracking-widest border border-indigo-500/20">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-[#050505] p-8 rounded-[2rem] border border-white/10 flex flex-col justify-between relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>

                                    <div className="relative z-10 space-y-6">
                                        <div>
                                            <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] mb-2">Video Hook</p>
                                            <p className="text-2xl font-black text-white tracking-tight leading-none italic">"{result.video_script?.hook || result.title}"</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] mb-2">Image Idea</p>
                                            <p className="text-xs font-bold text-white/50 leading-relaxed font-mono bg-white/5 p-4 rounded-xl border border-white/5">
                                                {result.visual_prompt || "No visual prompt generated for this format."}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-8 border-t border-white/10 text-center">
                                        <p className="text-[12px] font-bold text-white/60 mb-4 italic">Want to post this? Sign up for free.</p>
                                        <button
                                            onClick={signInWithGoogle}
                                            className="w-full py-4 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95"
                                        >
                                            <Lock size={14} />
                                            Sign Up & Use This
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuickGenerator;
