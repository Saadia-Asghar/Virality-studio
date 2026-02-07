
import React, { useState } from 'react';
import {
    ShieldCheck,
    Search,
    Flame,
    Zap,
    Copy,
    CheckCircle2,
    TrendingUp,
    Play,
    Box,
    Target,
    Filter,
    ArrowUpRight,
    Plus
} from 'lucide-react';

const HookLibrary: React.FC = () => {
    const [copiedId, setCopiedId] = useState<number | null>(null);
    const [filter, setFilter] = useState('All');

    const HOOKS = [
        {
            id: 1,
            category: 'Pattern Interrupt',
            text: "Stop doing [Common Mistake] if you want to achieve [Big Result].",
            lift: '+42%',
            desc: "Best for stopping someone from scrolling by calling out an error."
        },
        {
            id: 2,
            category: 'The Secret',
            text: "I analyzed 100+ [Competitors] and found the one secret they all share.",
            lift: '+58%',
            desc: "People love secrets. This hooks them by promising a reveal."
        },
        {
            id: 3,
            category: 'Speed & Results',
            text: "How to go from [Step A] to [Step B] in less than [Small Timeframe].",
            lift: '+31%',
            desc: "Fast results are viral. Use this for quick tutorials."
        },
        {
            id: 4,
            category: 'Confroversial',
            text: "Everyone says [Popular Advice] is the way. They're wrong.",
            lift: '+65%',
            desc: "Disagreement creates comments and shares. Very powerful."
        },
        {
            id: 5,
            category: 'Tool Reveal',
            text: "This one tool changed everything for my [Niche] business.",
            lift: '+24%',
            desc: "Simple, effective, and gets people to ask 'What tool?'."
        }
    ];

    const handleCopy = (text: string, id: number) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-20 animate-in fade-in duration-1000">
            {/* Hero Header */}
            <div className="relative p-12 rounded-[3.5rem] border border-white/5 overflow-hidden group shadow-2xl bg-[#0c0c0e]">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -z-0"></div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="max-w-2xl text-center md:text-left">
                        <div className="inline-flex items-center space-x-3 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8 bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-500/20">
                            <Flame className="w-4 h-4 animate-pulse" />
                            <span>Viral Hook Database</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter text-gradient leading-[0.9] uppercase italic">The Attention <span className="text-indigo-400">Vault</span></h2>
                        <p className="text-white/40 text-lg font-medium leading-relaxed italic max-w-xl">
                            "Copy and paste these viral opening lines to stop people from scrolling past your videos instantly."
                        </p>
                    </div>
                    <div className="flex-shrink-0">
                        <div className="p-10 bg-indigo-500/5 rounded-[3rem] border border-indigo-500/10 text-center shadow-2xl">
                            <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.3em] mb-3">Avg. Views Spike</p>
                            <p className="text-5xl font-black text-indigo-400 tracking-tighter leading-none">+44%</p>
                            <div className="mt-6 flex items-center justify-center gap-2 text-emerald-400">
                                <TrendingUp size={16} />
                                <span className="text-[10px] font-black uppercase tracking-widest leading-none">Global Pulse</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-4 bg-white/2 p-4 rounded-[2.5rem] border border-white/5">
                <div className="p-3 bg-white/5 rounded-2xl text-white/20 border border-white/5 mx-2 hidden sm:block">
                    <Filter size={18} />
                </div>
                {['All', 'Viral', 'Education', 'Challenge', 'Listicle'].map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${filter === cat ? 'bg-white border-white text-black shadow-2xl scale-105' : 'bg-transparent text-white/20 border-transparent hover:text-white hover:bg-white/5'}`}
                    >
                        {cat} Hooks
                    </button>
                ))}
            </div>

            {/* Hook Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {HOOKS.map((hook) => (
                    <div key={hook.id} className="group cyber-card p-12 rounded-[4rem] bg-[#0c0c0e] flex flex-col relative overflow-hidden transition-all duration-700 hover:border-indigo-500/30">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl -z-0 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-10">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400 border border-indigo-500/20 shadow-2xl">
                                        <Zap size={20} className="fill-current" />
                                    </div>
                                    <span className="text-[11px] font-black text-indigo-400 uppercase tracking-widest">{hook.category}</span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="flex items-center gap-2 text-emerald-400 mb-1">
                                        <TrendingUp size={16} />
                                        <span className="text-xl font-black tracking-tighter">{hook.lift}</span>
                                    </div>
                                    <span className="text-[9px] font-black text-white/10 uppercase tracking-widest">Growth Lift</span>
                                </div>
                            </div>

                            <p className="text-3xl font-black text-white mb-8 leading-[1.1] tracking-tight italic uppercase italic">
                                "{hook.text}"
                            </p>

                            <p className="text-sm text-white/30 font-medium leading-relaxed mb-auto pb-10 italic">
                                {hook.desc}
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-10 border-t border-white/5">
                                <div className="flex items-center gap-6">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black text-white/10 uppercase tracking-[0.2em] mb-1">Retention</span>
                                        <span className="text-[11px] font-black text-indigo-400 uppercase tracking-widest">Master Level</span>
                                    </div>
                                    <div className="h-6 w-px bg-white/5"></div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black text-white/10 uppercase tracking-[0.2em] mb-1">Platform</span>
                                        <span className="text-[11px] font-black text-white/40 uppercase tracking-widest">Multi-Node</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleCopy(hook.text, hook.id)}
                                    className={`w-full sm:w-auto flex items-center justify-center gap-4 px-10 py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-2xl active:scale-95 ${copiedId === hook.id ? 'bg-emerald-500 text-white' : 'bg-white text-black hover:bg-indigo-600 hover:text-white'}`}
                                >
                                    {copiedId === hook.id ? (
                                        <>
                                            <CheckCircle2 size={18} />
                                            Hook Copied
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={18} />
                                            Use this Hook
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Empty State / Add More */}
                <div className="p-12 rounded-[4rem] border-4 border-dashed border-white/5 flex flex-col items-center justify-center text-center group hover:border-indigo-500/30 transition-all duration-500 cursor-pointer bg-white/[0.01]">
                    <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mb-8 text-white/10 group-hover:bg-indigo-500 text-white transition-all duration-500 transform group-hover:rotate-12 group-hover:scale-110 shadow-2xl">
                        <Plus size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-white/40 mb-3 uppercase tracking-tighter group-hover:text-white transition-colors italic">New Hacks Uploading</h3>
                    <p className="text-sm text-white/20 font-bold max-w-xs group-hover:text-white/40 leading-relaxed italic">"We are scanning the web for 100+ new viral hooks to add to your vault."</p>
                </div>
            </div>
        </div>
    );
};

export default HookLibrary;
