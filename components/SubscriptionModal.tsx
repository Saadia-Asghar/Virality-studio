
import React from 'react';
import { Check, X, Zap, Crown, Star } from 'lucide-react';
import { useAuth, SubscriptionPlan } from '../contexts/AuthContext';

interface SubscriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose }) => {
    const { updateUserData } = useAuth();

    if (!isOpen) return null;

    const handleUpgrade = async (plan: SubscriptionPlan) => {
        // In a real app, this would trigger Stripe/Payment flow
        // For this demo, we just simulate a successful upgrade
        if (confirm(`Confirm upgrade to ${plan.toUpperCase()} plan?`)) {
            await updateUserData({ subscriptionStatus: plan });
            onClose();
            alert(`Successfully upgraded to ${plan} plan! You now have unlimited access.`);
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-3xl animate-in fade-in duration-500">
            <div className="relative w-full max-w-5xl bg-[#0c0c0e] rounded-[3rem] overflow-hidden border border-white/10 flex flex-col items-center p-12 shadow-[0_0_100px_rgba(79,70,229,0.2)]">

                <button onClick={onClose} className="absolute top-8 right-8 p-4 text-white/20 hover:text-white transition-colors bg-white/5 rounded-2xl">
                    <X size={24} />
                </button>

                <div className="text-center mb-16 max-w-2xl">
                    <div className="inline-flex items-center space-x-3 px-4 py-2 bg-indigo-500/10 rounded-full text-[10px] font-black tracking-[0.3em] uppercase mb-6 border border-indigo-500/20 text-indigo-400">
                        <Zap className="w-4 h-4 fill-current" />
                        <span>Trial Limit Reached</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase italic">Upgrade Access</h2>
                    <p className="text-xl text-white/40 font-medium leading-relaxed italic">
                        "Your neural link has exceeded its free capacity. Initialize a full connection to unlock unlimited viral generation."
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                    {/* Monthly Plan */}
                    <div className="cyber-card p-10 rounded-[2.5rem] bg-[#111115] border border-white/5 hover:border-indigo-500/30 transition-all group relative overflow-hidden flex flex-col">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-bl-[3rem] group-hover:bg-indigo-500/10 transition-all"></div>
                        <div className="mb-8">
                            <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Monthly Node</h3>
                            <p className="text-[11px] font-black text-white/30 uppercase tracking-[0.2em]">Flexible Access</p>
                        </div>
                        <div className="mb-8">
                            <span className="text-5xl font-black text-white tracking-tighter">$29</span>
                            <span className="text-white/30 font-bold ml-2">/ month</span>
                        </div>
                        <ul className="space-y-4 mb-10 flex-grow">
                            <FeatureItem text="Unlimited AI Posts" />
                            <FeatureItem text="Trend Radar Access" />
                            <FeatureItem text="Basic Support" />
                        </ul>
                        <button
                            onClick={() => handleUpgrade('monthly')}
                            className="w-full py-5 bg-white/5 border border-white/10 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all shadow-xl"
                        >
                            Select Monthly
                        </button>
                    </div>

                    {/* Yearly Plan - Best Value */}
                    <div className="cyber-card p-10 rounded-[2.5rem] bg-indigo-900/10 border border-indigo-500/30 relative overflow-hidden flex flex-col group">
                        <div className="absolute top-0 right-0 p-3 bg-indigo-500 text-white text-[9px] font-black uppercase tracking-widest rounded-bl-2xl">
                            Best Value
                        </div>
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>

                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-2xl font-black text-white uppercase tracking-tight">Yearly Core</h3>
                                <Crown size={20} className="text-amber-400 fill-current" />
                            </div>
                            <p className="text-[11px] font-black text-indigo-300 uppercase tracking-[0.2em]">Full Enterprise Suite</p>
                        </div>
                        <div className="mb-8">
                            <span className="text-5xl font-black text-white tracking-tighter">$290</span>
                            <span className="text-indigo-300 font-bold ml-2">/ year</span>
                            <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest mt-2">Save $58 per year</p>
                        </div>
                        <ul className="space-y-4 mb-10 flex-grow">
                            <FeatureItem text="Unlimited AI Posts" higlight />
                            <FeatureItem text="Competitor Spy Tools" higlight />
                            <FeatureItem text="Priority Neural Processing" higlight />
                            <FeatureItem text="24/7 Strategic Support" />
                        </ul>
                        <button
                            onClick={() => handleUpgrade('yearly')}
                            className="w-full py-5 bg-indigo-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-[0_0_40px_rgba(79,70,229,0.4)]"
                        >
                            Select Yearly
                        </button>
                    </div>
                </div>

                <p className="text-white/20 text-[10px] uppercase tracking-widest mt-12 font-bold">Secure Encrypted Payment Gateway</p>
            </div>
        </div>
    );
};

const FeatureItem: React.FC<{ text: string, higlight?: boolean }> = ({ text, higlight }) => (
    <li className="flex items-center gap-4">
        <div className={`p-1 rounded-full ${higlight ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-white/40'}`}>
            <Check size={12} strokeWidth={4} />
        </div>
        <span className={`text-sm font-bold ${higlight ? 'text-white' : 'text-white/60'}`}>{text}</span>
    </li>
);

export default SubscriptionModal;
