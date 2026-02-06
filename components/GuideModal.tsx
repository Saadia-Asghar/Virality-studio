
import React, { useState } from 'react';
import { X, Sparkles, Zap, Target, Globe, ShieldCheck, ArrowRight, Play } from 'lucide-react';

interface GuideModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(0);

    if (!isOpen) return null;

    const steps = [
        {
            title: "The Attention Economy",
            subtitle: "The Final Frontier of Growth",
            icon: <Zap className="w-8 h-8 text-indigo-500" />,
            content: "In 2026, attention is the most valuable currency on earth. Algorithms don't care about quality; they care about engagement velocity and retention signals. Trending is your command center for capturing and compounding this currency.",
            color: "from-indigo-600 to-indigo-900"
        },
        {
            title: "Neural Seed Workflow",
            subtitle: "Conceptual Deployment",
            icon: <Sparkles className="w-8 h-8 text-purple-500" />,
            content: "Start with a 'Seed'—a single idea. Our neural engines adapt this seed into perfectly calibrated 'Distribution Nodes' for Instagram, TikTok, and LinkedIn. One seed, infinite reach.",
            color: "from-purple-600 to-indigo-900"
        },
        {
            title: "Intercepting Signals",
            subtitle: "Viral Trend Forensics",
            icon: <Target className="w-8 h-8 text-rose-500" />,
            content: "Don't follow trends—intercept them. Use the Audience Radar to see where competitors are failing and the Trends Explorer to detect breakout audio and topics before the masses arrive.",
            color: "from-rose-600 to-indigo-900"
        },
        {
            title: "The 4x Protocol",
            subtitle: "Standardized Deployment",
            icon: <Globe className="w-8 h-8 text-emerald-500" />,
            content: "Content that works is content that standardizes. Use the Post Reviewer to audit your hooks before you post. If the score is below 85, recalibrate. If it's above 90, deploy at full scale.",
            color: "from-emerald-600 to-indigo-900"
        }
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
            <div className="relative w-full max-w-4xl bg-white rounded-[3.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-[600px] animate-in zoom-in-95 duration-500">

                {/* Left Side: Visual Progress */}
                <div className={`md:w-5/12 bg-gradient-to-br ${steps[step].color} p-12 text-white flex flex-col justify-between transition-all duration-700`}>
                    <div>
                        <div className="bg-white/10 w-16 h-16 rounded-3xl flex items-center justify-center mb-10 border border-white/20">
                            {steps[step].icon}
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-3 opacity-50">Protocol Step 0{step + 1}</p>
                        <h2 className="text-4xl font-black tracking-tighter leading-none mb-4">{steps[step].title}</h2>
                        <p className="text-white/60 font-bold uppercase tracking-widest text-[11px]">{steps[step].subtitle}</p>
                    </div>

                    <div className="flex gap-2">
                        {steps.map((_, i) => (
                            <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === step ? 'w-8 bg-white' : 'w-2 bg-white/20'}`}></div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Content & Actions */}
                <div className="md:w-7/12 p-14 flex flex-col justify-between bg-white relative">
                    <button onClick={onClose} className="absolute top-8 right-8 p-3 text-gray-300 hover:text-gray-900 transition-colors">
                        <X size={24} />
                    </button>

                    <div className="space-y-8 mt-10">
                        <p className="text-2xl font-semibold text-gray-800 leading-relaxed italic">
                            "{steps[step].content}"
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <Play size={16} className="text-indigo-600" />
                                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Recommended Action: Study Tutorial</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-10 border-t border-gray-100">
                        <button
                            onClick={() => setStep(prev => Math.max(0, prev - 1))}
                            className={`text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-all ${step === 0 ? 'opacity-0 pointer-events-none' : ''}`}
                        >
                            Back Access
                        </button>

                        {step < steps.length - 1 ? (
                            <button
                                onClick={() => setStep(prev => prev + 1)}
                                className="px-10 py-4 bg-indigo-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-indigo-100 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
                            >
                                Proceed Protocol
                                <ArrowRight size={14} />
                            </button>
                        ) : (
                            <button
                                onClick={onClose}
                                className="px-10 py-4 bg-gray-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-gray-200 hover:bg-emerald-600 transition-all flex items-center gap-3"
                            >
                                Launch Command
                                <ShieldCheck size={14} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuideModal;
