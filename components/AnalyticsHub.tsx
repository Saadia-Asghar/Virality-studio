
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Target, TrendingUp, Megaphone, Gem, Download, Share2, Activity, Globe, Zap, Heart, MessageSquare, Repeat, Eye, Instagram, Music2, Linkedin, Twitter, Youtube, Facebook, BarChart3, ChevronDown, Filter } from 'lucide-react';
import { MOCK_CHART_DATA, MOCK_POST_HISTORY } from '../constants';

const PIE_DATA = [
    { name: 'Instagram', value: 45 },
    { name: 'TikTok', value: 35 },
    { name: 'LinkedIn', value: 15 },
    { name: 'Twitter', value: 5 },
];

const COLORS = ['#6366f1', '#10b981', '#0ea5e9', '#f43f5e'];

const AnalyticsHub: React.FC = () => {
    return (
        <div className="space-y-12 pb-20 animate-in fade-in duration-1000">
            {/* Header / Config Section */}
            <div className="flex flex-col xl:flex-row justify-between items-end gap-10">
                <div className="max-w-2xl">
                    <div className="inline-flex items-center space-x-3 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8 bg-indigo-500/10 px-5 py-2 rounded-full border border-indigo-500/20">
                        <Activity className="w-4 h-4 animate-pulse" />
                        <span>Live Telemetry Stream</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9] italic">
                        Performance<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Hub</span>
                    </h2>
                    <p className="text-xl text-white/40 font-medium italic mt-6 leading-relaxed max-w-xl">
                        "Your centralized command center for engagement metrics. Track viral velocity across the entire node network."
                    </p>
                </div>

                <div className="flex flex-wrap gap-4">
                    <button className="flex items-center gap-4 px-8 py-5 bg-white/5 text-white/40 border border-white/5 rounded-[2rem] text-[10px] font-black uppercase tracking-widest hover:text-white hover:bg-white/10 transition-all group">
                        <Download size={18} className="group-hover:translate-y-1 transition-transform" />
                        Export Data
                    </button>
                    <button className="flex items-center gap-4 px-8 py-5 bg-white text-black rounded-[2rem] text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all active:scale-95 group">
                        <Share2 size={18} />
                        Share Report
                    </button>
                </div>
            </div>

            {/* Main Viz Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Area Chart - Signal Flow */}
                <div className="lg:col-span-2 cyber-card p-12 rounded-[4rem] bg-[#0c0c0e] relative overflow-hidden group border border-white/5">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 opacity-50"></div>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
                        <div>
                            <div className="flex items-center gap-4 mb-2">
                                <BarChart3 className="text-indigo-400" size={24} />
                                <h3 className="text-3xl font-black text-white tracking-tighter uppercase italic leading-none">Signal Flow</h3>
                            </div>
                            <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.3em]">Interaction Density (72h)</p>
                        </div>
                        <div className="flex bg-[#111115] p-2 rounded-[1.5rem] border border-white/10 backdrop-blur-md shadow-2xl">
                            <button className="px-6 py-3 text-[9px] font-black uppercase tracking-widest bg-white shadow-lg rounded-2xl text-black transition-all">Views</button>
                            <button className="px-6 py-3 text-[9px] font-black uppercase tracking-widest text-white/30 hover:text-white transition-all">Clicks</button>
                        </div>
                    </div>

                    <div className="h-[400px] w-full relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={MOCK_CHART_DATA}>
                                <defs>
                                    <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                                <XAxis
                                    dataKey="name"
                                    stroke="rgba(255,255,255,0.1)"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    dy={20}
                                    tick={{ fontWeight: 900, fill: 'rgba(255,255,255,0.3)' }}
                                />
                                <YAxis
                                    stroke="rgba(255,255,255,0.1)"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fontWeight: 900, fill: 'rgba(255,255,255,0.3)' }}
                                />
                                <Tooltip
                                    cursor={{ stroke: '#4f46e5', strokeWidth: 1, strokeDasharray: '5 5' }}
                                    contentStyle={{
                                        backgroundColor: '#0c0c0e',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '24px',
                                        boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
                                        padding: '20px'
                                    }}
                                    itemStyle={{ fontSize: '12px', fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                                    labelStyle={{ marginBottom: '10px', fontSize: '10px', color: 'rgba(255,255,255,0.5)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="reach"
                                    stroke="#6366f1"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorReach)"
                                    animationDuration={2000}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart - Node Velocity */}
                <div className="cyber-card p-12 rounded-[4rem] bg-[#0c0c0e] flex flex-col justify-between border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none"></div>

                    <div className="relative z-10 mb-8">
                        <h3 className="text-3xl font-black text-white tracking-tighter uppercase italic leading-none mb-2">Network Split</h3>
                        <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.3em]">Traffic Source Breakdown</p>
                    </div>

                    <div className="flex-grow flex items-center justify-center relative mb-8">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={PIE_DATA}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={75}
                                    outerRadius={100}
                                    paddingAngle={8}
                                    dataKey="value"
                                    animationDuration={1500}
                                    stroke="none"
                                >
                                    {PIE_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#0c0c0e',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '16px',
                                        padding: '12px 16px',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                                    }}
                                    itemStyle={{ fontSize: '11px', fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-5xl font-black text-white tracking-tighter italic">100%</span>
                            <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] mt-1">Aggregate</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {PIE_DATA.map((item, i) => (
                            <div key={i} className="flex flex-col p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                                <div className="flex items-center space-x-2 mb-2">
                                    <div className="w-2 h-2 rounded-full shadow-[0_0_10px_currentColor]" style={{ backgroundColor: COLORS[i], color: COLORS[i] }}></div>
                                    <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">{item.name}</span>
                                </div>
                                <span className="text-xl font-black text-white tracking-tight">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Post Performance Table */}
            <div className="cyber-card p-12 rounded-[4rem] bg-[#0c0c0e] border border-white/5 relative overflow-hidden">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-8">
                    <div>
                        <h3 className="text-3xl font-black text-white tracking-tight uppercase italic mb-2">Recent Nodes</h3>
                        <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.3em]">Individual Content Performance Audit</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="p-4 bg-white/5 rounded-2xl text-white/40 hover:text-white border border-white/5 transition-all">
                            <Filter size={18} />
                        </button>
                        <button className="px-8 py-4 bg-white/5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white border border-white/5 transition-all flex items-center gap-3">
                            Full History
                            <ChevronDown size={14} />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-indigo-500/20">
                                <th className="pb-8 pl-4 text-[9px] font-black uppercase tracking-[0.2em] text-indigo-400">Content Asset</th>
                                <th className="pb-8 text-[9px] font-black uppercase tracking-[0.2em] text-indigo-400">Target Node</th>
                                <th className="pb-8 text-[9px] font-black uppercase tracking-[0.2em] text-indigo-400 text-center">Likes</th>
                                <th className="pb-8 text-[9px] font-black uppercase tracking-[0.2em] text-indigo-400 text-center">Shares</th>
                                <th className="pb-8 text-[9px] font-black uppercase tracking-[0.2em] text-indigo-400 text-center">Total Reach</th>
                                <th className="pb-8 pr-4 text-[9px] font-black uppercase tracking-[0.2em] text-emerald-500 text-right">Momentum</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {MOCK_POST_HISTORY.map((post) => (
                                <tr key={post.id} className="group hover:bg-white/[0.02] transition-colors">
                                    <td className="py-8 pl-4">
                                        <div className="flex flex-col">
                                            <span className="text-lg font-black text-white tracking-tight group-hover:text-indigo-400 transition-colors italic">"{post.title}"</span>
                                            <span className="text-[9px] text-white/20 font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                                                Deployed: {post.date}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-8">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-white/5 rounded-2xl border border-white/5 text-white/40 group-hover:text-white transition-all shadow-lg">
                                                {getPlatformIcon(post.platform)}
                                            </div>
                                            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{post.platform}</span>
                                        </div>
                                    </td>
                                    <td className="py-8 text-center">
                                        <span className="px-4 py-2 bg-white/5 rounded-xl text-sm font-black text-white border border-white/5">{post.likes.toLocaleString()}</span>
                                    </td>
                                    <td className="py-8 text-center">
                                        <span className="px-4 py-2 bg-white/5 rounded-xl text-sm font-black text-white border border-white/5">{post.shares.toLocaleString()}</span>
                                    </td>
                                    <td className="py-8 text-center">
                                        <span className="text-xl font-black text-white tracking-tighter">{post.reach.toLocaleString()}</span>
                                    </td>
                                    <td className="py-8 pr-4 text-right">
                                        <span className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-500/10 text-emerald-400 rounded-full font-black text-[10px] border border-emerald-500/20 uppercase tracking-widest">
                                            <TrendingUp size={12} />
                                            {post.growth}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Insight Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <InsightCard icon={<Globe className="text-indigo-400" />} title="Peak Signal" value="09:42 UTC" desc="Optimal post window detected" />
                <InsightCard icon={<TrendingUp className="text-emerald-400" />} title="Growth Pulse" value="+412%" desc="Viral momentum increasing" />
                <InsightCard icon={<Megaphone className="text-amber-400" />} title="Lead Node" value="REELS" desc="Highest performing format" />
                <InsightCard icon={<Zap className="text-rose-400" />} title="Neural Value" value="$2.4k" desc="Est. Brand Partnership Value" />
            </div>
        </div>
    );
};

const getPlatformIcon = (platform: string) => {
    const size = 18;
    switch (platform.toLowerCase()) {
        case 'instagram': return <Instagram size={size} />;
        case 'tiktok': return <Music2 size={size} />;
        case 'linkedin': return <Linkedin size={size} />;
        case 'twitter': return <Twitter size={size} />;
        case 'facebook': return <Facebook size={size} />;
        case 'youtube': return <Youtube size={size} />;
        default: return <Activity size={size} />;
    }
}

const InsightCard: React.FC<{ icon: React.ReactNode, title: string, value: string, desc: string }> = ({ icon, title, value, desc }) => (
    <div className="cyber-card p-10 rounded-[3.5rem] bg-[#0c0c0e] border border-white/5 group hover:border-indigo-500/30 transition-all duration-500 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-[3rem] -mr-4 -mt-4 transition-all group-hover:bg-indigo-600/20"></div>

        <div className="w-16 h-16 bg-[#111115] rounded-[1.5rem] flex items-center justify-center mb-10 border border-white/5 group-hover:scale-110 transition-transform shadow-2xl">
            {React.cloneElement(icon as React.ReactElement, { size: 28 })}
        </div>

        <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-2">{title}</h4>
        <p className="text-4xl font-black text-white tracking-tighter mb-4 uppercase italic leading-none">{value}</p>
        <p className="text-[11px] text-white/40 font-bold leading-relaxed italic border-t border-white/5 pt-4">"{desc}"</p>
    </div>
);

export default AnalyticsHub;
