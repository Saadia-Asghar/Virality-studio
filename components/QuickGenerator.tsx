
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
            <div className="relative rounded-[3rem] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent"></div>
                <div className="relative bg-[#0a0a0c]/90 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 md:p-14">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-indigo-600/10 to-purple-600/10 rounded-full blur-[120px] -z-0 pointer-events-none"></div>

                    {!result ? (
                        <>
                            <div className="text-center mb-12 relative z-10">
                                <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full border border-indigo-500/20 mb-8 backdrop-blur-sm">
                                    <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-300">Live Demo</span>
                                </div>
                                <h3 className="text-4xl md:text-6xl font-black mb-5 tracking-tighter leading-none">
                                    <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">Experience AI Content</span>
                                </h3>
                                <p className="text-white/50 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">Choose your platform, share your concept, and watch our AI craft engaging content in real-time.</p>
                            </div>

                            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                                {/* Platform Selector */}
                                <div className="flex justify-center gap-3 flex-wrap">
                                    {platforms.map((p) => (
                                        <button
                                            key={p.id}
                                            onClick={() => setSelectedPlatform(p.id)}
                                            className={`group px-7 py-4 rounded-2xl flex items-center gap-3 transition-all duration-300 border backdrop-blur-sm ${selectedPlatform === p.id
                                                    ? 'bg-gradient-to-r from-white to-gray-100 text-black border-white shadow-[0_8px_30px_rgba(255,255,255,0.12)] scale-105'
                                                    : 'bg-white/[0.03] text-white/50 border-white/10 hover:bg-white/[0.08] hover:text-white hover:border-white/20 hover:scale-105'
                                                }`}
                                        >
                                            <p.icon size={18} className={selectedPlatform === p.id ? '' : 'group-hover:scale-110 transition-transform'} />
                                            <span className="text-[11px] font-black uppercase tracking-[0.15em]">{p.label}</span>
                                        </button>
                                    ))}
                                </div>

                                <div className="relative group">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[2.2rem] blur-lg opacity-20 group-hover:opacity-30 transition duration-1000 group-focus-within:opacity-40"></div>
                                    <input
                                        type="text"
                                        value={topic}
                                        onChange={(e) => setTopic(e.target.value)}
                                        placeholder={selectedPlatform === Platform.LINKEDIN ? 'e.g., Leadership strategies for remote teams...' : 'e.g., Best morning routine for productivity...'}
                                        className="relative w-full px-8 py-7 bg-[#0a0a0c] border border-white/10 rounded-[2rem] text-lg font-semibold text-white placeholder:text-white/25 focus:outline-none focus:bg-[#0f0f12] focus:border-indigo-500/40 transition-all shadow-2xl pr-44"
                                        onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                                    />
                                    <button
                                        onClick={handleGenerate}
                                        disabled={loading || !topic}
                                        className="absolute right-2 top-2 bottom-2 px-10 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-white hover:to-gray-100 hover:text-black text-white rounded-[1.6rem] font-black uppercase tracking-[0.15em] text-[11px] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-3 shadow-lg hover:shadow-xl disabled:hover:from-indigo-600 disabled:hover:to-indigo-500"
                                    >
                                        {loading ? <Loader2 className="animate-spin" size={18} /> : <Zap fill="currentColor" size={18} />}
                                        {loading ? 'Creating...' : 'Generate'}
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 relative z-10">
                            <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
                                <div className="flex items-center gap-5">
                                    <div className="p-4 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 text-indigo-400 backdrop-blur-sm">
                                        {getPlatformIcon(selectedPlatform)}
                                    </div>
                                    <div className="text-center md:text-left">
                                        <h4 className="text-2xl font-black text-white tracking-tight mb-1">
                                            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">Your {selectedPlatform} Content</span>
                                        </h4>
                                        <p className="text-xs font-bold uppercase tracking-wider text-emerald-400/80 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                                            Optimized & Ready
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setResult(null)}
                                    className="px-6 py-3 bg-white/5 rounded-xl text-xs font-black uppercase tracking-wider text-white/50 hover:text-white hover:bg-white/10 transition-all border border-white/10 hover:border-white/20"
                                >
                                    Create Another
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-5">
                                    <div className="bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-8 rounded-[2rem] border border-white/10 backdrop-blur-md relative group hover:border-indigo-500/30 transition-all">
                                        <div className="absolute top-4 right-4 p-2 bg-emerald-500/10 rounded-lg text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Check size={16} />
                                        </div>
                                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-4">Caption</p>
                                        <p className="text-base font-medium text-white/90 leading-relaxed whitespace-pre-wrap">
                                            {result.caption}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {result.hashtags?.map((tag: string, i: number) => (
                                            <span key={i} className="text-[10px] font-bold bg-indigo-500/10 text-indigo-300 px-4 py-2 rounded-full uppercase tracking-wider border border-indigo-500/20 hover:bg-indigo-500/20 transition-colors">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-[#050505] to-[#0a0a0c] p-8 rounded-[2rem] border border-white/10 flex flex-col justify-between relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>

                                    <div className="relative z-10 space-y-6">
                                        <div>
                                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-3">Opening Hook</p>
                                            <p className="text-2xl font-black text-white tracking-tight leading-tight">"{result.video_script?.hook || result.title}"</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-3">Visual Concept</p>
                                            <p className="text-sm font-medium text-white/60 leading-relaxed bg-white/5 p-5 rounded-xl border border-white/10">
                                                {result.visual_prompt || "Visual concept not available for this format."}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-8 border-t border-white/10 text-center relative z-10">
                                        <p className="text-sm font-semibold text-white/60 mb-5">Ready to publish this content?</p>
                                        <button
                                            onClick={signInWithGoogle}
                                            className="w-full py-4 bg-gradient-to-r from-white to-gray-100 text-black rounded-xl font-black text-xs uppercase tracking-wider hover:from-indigo-600 hover:to-indigo-500 hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 active:scale-95"
                                        >
                                            <Lock size={16} />
                                            Sign Up & Publish
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
