
import React, { useState } from 'react';
import { X, Sparkles, Zap, Target, Globe, ShieldCheck, ArrowRight, Play, Terminal, Users, Database, ChevronRight } from 'lucide-react';

interface GuideModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(0);

    if (!isOpen) return null;

    const steps = [
        {
            title: "Viral Velocity",
            subtitle: "System Initialization",
            icon: <Zap className="w-12 h-12 text-white" />,
            content: "Welcome to the Command Deck. We analyze global social signals to detect viral anomalies before they trend. Your growth is no longer random, it's engineered.",
            color: "from-indigo-600 via-indigo-950 to-[#0c0c0e]"
        },
        {
            title: "Neural Writing",
            subtitle: "Gemini 2.0 Flash Integration",
            icon: <Sparkles className="w-12 h-12 text-white" />,
            content: "Generative AI handles your copy. Input a raw concept, and our neural engine synthesizes high-retention scripts for Reels, TikToks, and LinkedIn specifically tuned for algorithm dominance.",
            color: "from-purple-600 via-purple-950 to-[#0c0c0e]"
        },
        {
            title: "Trend Radar",
            subtitle: "Global Signal Interception",
            icon: <Target className="w-12 h-12 text-white" />,
            content: "Stop guessing. We scan millions of data points across all major platforms to identify 'Viral Clusters'. You'll know exactly what format is winning in your niche right now.",
            color: "from-rose-600 via-rose-950 to-[#0c0c0e]"
        },
        {
            title: "Secure Vault",
            subtitle: "Encrypted Asset Storage",
            icon: <Database className="w-12 h-12 text-white" />,
            content: "Every script, image, and strategy is encrypted and stored in your private cloud vault. Your intellectual property is secure and accessible from any terminal.",
            color: "from-emerald-600 via-emerald-950 to-[#0c0c0e]"
        }
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-3xl animate-in fade-in duration-700">
            <div className="relative w-full max-w-6xl bg-[#0c0c0e] rounded-[4rem] overflow-hidden shadow-[0_0_150px_rgba(0,0,0,1)] border border-white/10 flex flex-col md:flex-row min-h-[700px] animate-in zoom-in-95 duration-700 slide-in-from-bottom-10">

                {/* Left Side: Immersive Visuals */}
                <div className={`md:w-5/12 bg-gradient-to-br ${steps[step].color} p-16 text-white flex flex-col justify-between transition-all duration-1000 relative overflow-hidden group`}>
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

                    {/* Animated Background Elements */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/20 rounded-full animate-[spin_60s_linear_infinite]"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-white/20 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
                    </div>

                    <div className="relative z-10">
                        <div className="bg-white/10 w-28 h-28 rounded-[2.5rem] flex items-center justify-center mb-16 border border-white/20 shadow-2xl backdrop-blur-xl group-hover:scale-110 transition-transform duration-700">
                            {steps[step].icon}
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-px w-12 bg-white/50"></div>
                            <p className="text-[11px] font-black uppercase tracking-[0.5em] text-white/60">Module 0{step + 1}</p>
                        </div>

                        <h2 className="text-6xl font-black tracking-tighter leading-[0.85] mb-6 uppercase italic">{steps[step].title}</h2>
                        <p className="text-white/60 font-black uppercase tracking-[0.2em] text-[11px] bg-black/20 inline-block px-4 py-2 rounded-full backdrop-blur-md border border-white/10">{steps[step].subtitle}</p>
                    </div>

                    <div className="flex gap-4 relative z-10 mt-12">
                        {steps.map((_, i) => (
                            <div key={i} className={`h-1.5 rounded-full transition-all duration-700 shadow-lg ${i === step ? 'w-20 bg-white' : 'w-3 bg-white/20'}`}></div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Control Panel */}
                <div className="md:w-7/12 p-20 flex flex-col justify-between bg-[#0c0c0e] relative">
                    <button onClick={onClose} className="absolute top-12 right-12 p-5 text-white/20 hover:text-white transition-all bg-white/5 rounded-[1.5rem] border border-white/5 hover:bg-white/10 hover:border-white/20 group">
                        <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
                    </button>

                    <div className="space-y-16 mt-10">
                        <p className="text-4xl font-medium text-white leading-[1.4] italic text-gradient-indigo-white">
                            "{steps[step].content}"
                        </p>

                        <div className="space-y-6">
                            <div className="p-8 bg-white/[0.02] rounded-[2.5rem] border border-white/5">
                                <div className="flex items-center gap-6 mb-4">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                                        <Terminal size={24} />
                                    </div>
                                    <h4 className="text-[11px] font-black text-white/40 uppercase tracking-[0.3em]">System Directive</h4>
                                </div>
                                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500 w-2/3 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-16 border-t border-white/5">
                        <button
                            onClick={() => setStep(prev => Math.max(0, prev - 1))}
                            className={`flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-white/30 hover:text-white transition-all group ${step === 0 ? 'opacity-0 pointer-events-none' : ''}`}
                        >
                            <span className="p-3 bg-white/5 rounded-full group-hover:bg-white component-hover:text-black border border-white/5 transition-all"><ChevronRight className="rotate-180" size={14} /></span>
                            Previous Protocol
                        </button>

                        {step < steps.length - 1 ? (
                            <button
                                onClick={() => setStep(prev => prev + 1)}
                                className="px-14 py-6 bg-white text-black rounded-[2rem] text-[11px] font-black uppercase tracking-widest shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:bg-indigo-600 hover:text-white active:scale-95 transition-all flex items-center gap-5 group"
                            >
                                Next Sequence
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        ) : (
                            <button
                                onClick={onClose}
                                className="px-14 py-6 bg-indigo-600 text-white rounded-[2rem] text-[11px] font-black uppercase tracking-widest shadow-[0_0_60px_rgba(79,70,229,0.4)] hover:bg-white hover:text-black hover:shadow-white/20 transition-all flex items-center gap-5 active:scale-95 duration-300"
                            >
                                Initialize System
                                <ShieldCheck size={20} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuideModal;
