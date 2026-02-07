
import React, { useState, useEffect } from 'react';
import { Target, Users, Search, Zap, ShieldAlert, TrendingUp, Plus, Loader2, BarChart3, Star, Hash, Activity } from 'lucide-react';
import { scanCompetitors, fetchCompetitorDetails } from '../services/platformService';
import { Platform } from '../types';
import { useAuth } from '../contexts/AuthContext';

const CompetitorRadar: React.FC = () => {
    const { userData } = useAuth();
    const [competitors, setCompetitors] = useState<any[]>([]);
    const [userCompetitors, setUserCompetitors] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [adding, setAdding] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [platform, setPlatform] = useState<Platform>(Platform.INSTAGRAM);

    const handleScan = async () => {
        if (!userData?.niche) return;
        setLoading(true);
        try {
            const results = await scanCompetitors(userData.niche, platform);
            setCompetitors(results);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleAddCompetitor = async () => {
        if (!newUsername) return;
        setAdding(true);
        try {
            const details = await fetchCompetitorDetails(newUsername, platform);
            if (details) {
                setUserCompetitors(prev => [details, ...prev]);
                setNewUsername('');
            }
        } catch (e) {
            console.error(e);
        } finally {
            setAdding(false);
        }
    };

    useEffect(() => {
        if (userData?.niche) {
            handleScan();
        }
    }, [platform, userData?.niche]);

    return (
        <div className="space-y-12 pb-20 animate-in fade-in duration-1000">
            {/* Mission Control Header */}
            <div className="relative p-12 rounded-[4rem] border border-white/5 overflow-hidden group shadow-2xl bg-[#0c0c0e]">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -z-0 pointer-events-none"></div>
                <div className="relative z-10 flex flex-col xl:flex-row justify-between items-center gap-12 text-center xl:text-left">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center space-x-3 px-4 py-2 bg-indigo-500/10 rounded-full text-[10px] font-black tracking-[0.3em] uppercase mb-8 border border-indigo-500/20 text-indigo-400">
                            <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(79,70,229,0.5)]"></span>
                            <span>Target Interception Active</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9] text-gradient uppercase italic">
                            Competitor<br /><span className="text-indigo-500">Radar</span>
                        </h2>
                        <p className="text-white/40 text-xl font-medium leading-relaxed italic max-w-xl">
                            "Tracking hostiles in <span className="text-white">{userData?.niche || 'Unknown Sector'}</span>. Analyze their tactical growth patterns and steal their strategy."
                        </p>
                    </div>

                    <div className="flex flex-col gap-6 w-full xl:w-auto min-w-[350px]">
                        <div className="flex bg-white/5 p-2 rounded-[2rem] border border-white/5 backdrop-blur-md shadow-2xl">
                            {[Platform.INSTAGRAM, Platform.TIKTOK, Platform.YOUTUBE].map(p => (
                                <button
                                    key={p}
                                    onClick={() => setPlatform(p)}
                                    className={`flex-1 px-8 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${platform === p ? 'bg-white text-black shadow-xl scale-105' : 'text-white/30 hover:text-white hover:bg-white/5'}`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-3 relative group">
                            <div className="absolute inset-0 bg-indigo-500/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity rounded-[2rem]"></div>
                            <input
                                type="text"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                placeholder="Enter Target Username..."
                                className="relative z-10 flex-grow px-8 py-5 bg-[#111115] border border-white/10 rounded-[2rem] text-[11px] font-black uppercase tracking-widest focus:outline-none focus:border-indigo-500/50 transition-all text-white placeholder:text-white/10 shadow-inner"
                            />
                            <button
                                onClick={handleAddCompetitor}
                                disabled={adding || !newUsername}
                                className="relative z-10 p-5 bg-white text-black rounded-[2rem] hover:bg-indigo-600 hover:text-white transition-all shadow-2xl active:scale-95 disabled:opacity-50 disabled:scale-100"
                            >
                                {adding ? <Loader2 className="w-6 h-6 animate-spin" /> : <Plus size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Competitor Targets */}
            {userCompetitors.length > 0 && (
                <div className="space-y-10">
                    <div className="flex items-center gap-5 px-4">
                        <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400 border border-indigo-500/20">
                            <Target size={24} />
                        </div>
                        <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic">Tracked Targets</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {userCompetitors.map((comp, i) => (
                            <div key={i} className="cyber-card p-10 rounded-[3.5rem] bg-[#0c0c0e] relative overflow-hidden group hover:border-indigo-500/30 transition-all duration-500">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/5 rounded-full blur-[60px] group-hover:bg-indigo-500/10 transition-colors"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-indigo-400 group-hover:scale-110 transition-transform">
                                            <Users size={24} />
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] mb-1 block">Viral Score</span>
                                            <span className="text-4xl font-black text-white tracking-tighter italic">{comp.viralScore || 0}</span>
                                        </div>
                                    </div>

                                    <h4 className="text-3xl font-black text-white mb-8 tracking-tight italic uppercase">@{comp.name}</h4>

                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        <div className="p-5 bg-white/2 rounded-[2rem] border border-white/5 group-hover:bg-white/5 transition-colors">
                                            <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] mb-2">Followers</p>
                                            <p className="text-xl font-black text-white tracking-tight">{comp.followers}</p>
                                        </div>
                                        <div className="p-5 bg-white/2 rounded-[2rem] border border-white/5 group-hover:bg-white/5 transition-colors">
                                            <p className="text-[9px] font-black text-emerald-500/40 uppercase tracking-[0.2em] mb-2">Engagement</p>
                                            <p className="text-xl font-black text-emerald-400 tracking-tight">{comp.engagementRate}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6 pt-6 border-t border-white/5">
                                        <div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <Star size={12} className="text-amber-400" />
                                                <p className="text-[10px] font-black text-amber-400/60 uppercase tracking-widest">Core Strategy</p>
                                            </div>
                                            <p className="text-[12px] font-medium text-white/60 leading-relaxed italic">
                                                "{comp.contentPillar}"
                                            </p>
                                        </div>

                                        <div>
                                            <div className="flex bg-white/2 p-2 rounded-2xl gap-2 flex-wrap">
                                                {comp.topHashtags?.map((tag: string, idx: number) => (
                                                    <span key={idx} className="px-3 py-1.5 bg-white/5 rounded-xl text-[9px] font-black text-indigo-300 uppercase tracking-widest border border-white/5">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* AI Discovered Competitors */}
            <div className="space-y-10">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 px-4">
                    <div className="flex items-center gap-5">
                        <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-400 border border-emerald-500/20">
                            <Zap size={24} fill="currentColor" />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic leading-none mb-2">Detected Threats</h3>
                            <p className="text-[11px] text-white/30 font-black uppercase tracking-[0.3em]">{userData?.niche} Sector Scan</p>
                        </div>
                    </div>
                    <button
                        onClick={handleScan}
                        disabled={loading}
                        className="px-6 py-3 bg-white/5 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all flex items-center gap-3"
                    >
                        {loading ? <Loader2 className="animate-spin" size={14} /> : <Activity size={14} />}
                        {loading ? 'Scanning Spectrum...' : 'Refresh Radar'}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        [1, 2, 3].map(i => <div key={i} className="h-96 bg-white/5 animate-pulse rounded-[4rem] border border-white/5"></div>)
                    ) : (
                        competitors.map((comp, i) => (
                            <div key={i} className="group cyber-card p-12 rounded-[4rem] bg-[#0c0c0e] flex flex-col relative overflow-hidden hover:border-emerald-500/30 transition-all duration-500">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-[4rem] group-hover:bg-emerald-500/10 transition-all duration-700"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-10">
                                        <div className="w-16 h-16 bg-white/5 rounded-[1.5rem] flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform border border-white/5 shadow-xl">
                                            <Users size={28} />
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">Audience</p>
                                            <p className="text-2xl font-black text-white leading-none mt-2">{comp.followers}</p>
                                        </div>
                                    </div>

                                    <h3 className="text-3xl font-black text-white mb-8 tracking-tighter italic uppercase">@{comp.name}</h3>

                                    <div className="space-y-6">
                                        <div className="p-6 bg-white/2 rounded-[2.5rem] border border-white/5 group-hover:bg-white/5 transition-colors">
                                            <div className="flex items-center gap-3 mb-3">
                                                <TrendingUp size={16} className="text-indigo-400" />
                                                <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Strategy Detected</p>
                                            </div>
                                            <p className="text-xs font-bold text-white/60 leading-relaxed italic">
                                                "{comp.strategy}"
                                            </p>
                                        </div>

                                        <div className="p-6 bg-rose-500/5 rounded-[2.5rem] border border-rose-500/10">
                                            <div className="flex items-center gap-3 mb-3">
                                                <ShieldAlert size={16} className="text-rose-500" />
                                                <p className="text-[10px] font-black text-rose-400 uppercase tracking-[0.2em]">Vulnerability</p>
                                            </div>
                                            <p className="text-[11px] font-bold text-rose-200 leading-relaxed uppercase tracking-widest">
                                                {comp.gap}
                                            </p>
                                        </div>
                                    </div>

                                    <button className="w-full mt-8 py-5 rounded-2xl bg-white/5 text-white/20 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                                        Analyze Profile
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {!loading && competitors.length === 0 && (
                <div className="flex flex-col items-center justify-center py-32 text-center bg-white/[0.02] rounded-[5rem] border border-dashed border-white/5">
                    <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center mb-10 border border-white/5 shadow-2xl">
                        <Search className="text-white/20 w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-black text-white uppercase tracking-widest mb-4 italic">Radar Silence</h3>
                    <p className="text-sm text-white/30 font-bold max-w-sm mt-2 italic leading-relaxed">"No hostile signatures detected. Initialize scan to intercept competitor signals."</p>
                    <button
                        onClick={handleScan}
                        className="mt-12 px-14 py-6 bg-white text-black rounded-[2rem] font-black text-[11px] uppercase tracking-widest shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:bg-indigo-600 hover:text-white transition-all active:scale-95 flex items-center gap-4"
                    >
                        <Zap size={18} fill="currentColor" />
                        Init Scan Sequence
                    </button>
                </div>
            )}
        </div>
    );
};

export default CompetitorRadar;
