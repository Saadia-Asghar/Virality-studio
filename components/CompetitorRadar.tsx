
import React, { useState, useEffect } from 'react';
import { Target, Users, Search, Zap, ShieldAlert, TrendingUp } from 'lucide-react';
import { scanCompetitors } from '../services/platformService';
import { Platform } from '../types';
import { useAuth } from '../contexts/AuthContext';

const CompetitorRadar: React.FC = () => {
    const { userData } = useAuth();
    const [competitors, setCompetitors] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
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

    useEffect(() => {
        if (userData?.niche) {
            handleScan();
        }
    }, [platform]);

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            <div className="bg-gradient-to-br from-indigo-950 to-black p-12 rounded-[3.5rem] text-white relative overflow-hidden border border-white/10 shadow-2xl">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="max-w-xl">
                        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-500/10 rounded-full text-[10px] font-black tracking-[0.2em] uppercase mb-6 border border-indigo-500/20">
                            <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
                            <span>Signal Interception Active</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter leading-tight">
                            Audience <span className="text-indigo-400">Radar</span>
                        </h2>
                        <p className="text-white/40 text-base font-medium leading-relaxed">
                            Scanning distribution patterns of market leaders in <span className="text-indigo-400 font-bold">"{userData?.niche || 'your niche'}"</span>. Identify tactical gaps and pivot your creative execution.
                        </p>
                    </div>
                    <div className="flex gap-2 bg-white/5 p-2 rounded-2xl border border-white/10">
                        {[Platform.INSTAGRAM, Platform.TIKTOK, Platform.LINKEDIN].map(p => (
                            <button
                                key={p}
                                onClick={() => setPlatform(p)}
                                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${platform === p ? 'bg-white text-black shadow-xl' : 'text-white/40 hover:text-white'}`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading ? (
                    [1, 2, 3].map(i => <div key={i} className="h-80 bg-gray-50 animate-pulse rounded-[3rem] border border-gray-100"></div>)
                ) : (
                    competitors.map((comp, i) => (
                        <div key={i} className="group bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-indigo-500/20 transition-all duration-500 flex flex-col relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-bl-[4rem] group-hover:bg-indigo-500/10 transition-all"></div>
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                                        <Users size={24} />
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Est. Reach</p>
                                        <p className="text-lg font-black text-gray-900 leading-none mt-1">{comp.followers}</p>
                                    </div>
                                </div>

                                <h3 className="text-xl font-black text-gray-900 mb-6 tracking-tight">@{comp.name}</h3>

                                <div className="space-y-6">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <TrendingUp size={14} className="text-emerald-500" />
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Strategy</p>
                                        </div>
                                        <p className="text-xs font-bold text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                            {comp.strategy}
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <ShieldAlert size={14} className="text-indigo-500" />
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Opportunity Gap</p>
                                        </div>
                                        <p className="text-xs font-black text-indigo-600 leading-relaxed bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100">
                                            {comp.gap}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {!loading && competitors.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 rounded-[3.5rem] border border-dashed border-gray-200">
                    <Search className="text-gray-300 w-16 h-16 mb-4" />
                    <h3 className="text-xl font-black text-gray-900 uppercase tracking-widest">Radar Awaiting Signal</h3>
                    <p className="text-sm text-gray-400 font-medium max-w-sm mt-2">Initialize your niche profile to start intercepting competitor tactical movements.</p>
                    <button onClick={handleScan} className="mt-8 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-indigo-100">Recalibrate Scan</button>
                </div>
            )}
        </div>
    );
};

export default CompetitorRadar;
