
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Target, TrendingUp, Megaphone, Gem, Download, Share2 } from 'lucide-react';
import { MOCK_CHART_DATA } from '../constants';

const PIE_DATA = [
    { name: 'Instagram', value: 45 },
    { name: 'TikTok', value: 35 },
    { name: 'LinkedIn', value: 15 },
    { name: 'Twitter', value: 5 },
];

const COLORS = ['#4f46e5', '#818cf8', '#c7d2fe', '#e0e7ff'];

const AnalyticsHub: React.FC = () => {
    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            <div className="flex justify-between items-end mb-4">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tighter">Performance Hub</h2>
                    <p className="text-sm text-gray-400 font-medium">Macro-scale audience dynamics and conversion metrics.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 text-gray-900 border border-gray-100 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-white transition-all">
                        <Download size={14} />
                        Export PDF
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all">
                        <Share2 size={14} />
                        Share Hub
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h3 className="text-2xl font-black text-gray-900 tracking-tight">Engagement Flow</h3>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Real-time interaction density</p>
                        </div>
                        <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
                            <button className="px-6 py-2 text-[10px] font-black uppercase tracking-widest bg-white shadow-xl rounded-xl text-indigo-600 transition-all">Views</button>
                            <button className="px-6 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-all">Clicks</button>
                        </div>
                    </div>
                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={MOCK_CHART_DATA}>
                                <defs>
                                    <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                                <XAxis dataKey="name" stroke="#cbd5e1" fontSize={11} tickLine={false} axisLine={false} dy={10} tick={{ fontWeight: 700 }} />
                                <YAxis stroke="#cbd5e1" fontSize={11} tickLine={false} axisLine={false} tick={{ fontWeight: 700 }} />
                                <Tooltip
                                    cursor={{ stroke: '#4f46e5', strokeWidth: 2 }}
                                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', padding: '16px' }}
                                />
                                <Area type="monotone" dataKey="reach" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#colorReach)" animationDuration={2000} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col">
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">Traffic Split</h3>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1 mb-10">Audience source distribution</p>
                    <div className="flex-grow flex items-center justify-center relative">
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={PIE_DATA}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={100}
                                    paddingAngle={10}
                                    dataKey="value"
                                    animationDuration={1500}
                                >
                                    {PIE_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(255,255,255,0.5)" strokeWidth={2} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-3xl font-black text-gray-900 tracking-tighter">100%</span>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Aggregate</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-y-6 gap-x-4 mt-12 bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
                        {PIE_DATA.map((item, i) => (
                            <div key={i} className="flex flex-col">
                                <div className="flex items-center space-x-2 mb-1">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.name}</span>
                                </div>
                                <span className="text-base font-black text-gray-900">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <InsightCard icon={<Target className="text-indigo-600" />} title="Peak Activity" value="09:42 UTC" desc="Optimal post window" />
                <InsightCard icon={<TrendingUp className="text-emerald-500" />} title="Viral Velocity" value="+412%" desc="Engagement momentum" />
                <InsightCard icon={<Megaphone className="text-amber-500" />} title="Top Medium" value="Reels" desc="Distribution lead" />
                <InsightCard icon={<Gem className="text-purple-500" />} title="Ecosystem Val" value="$2.4K" desc="Targeted rev potential" />
            </div>
        </div>
    );
};

const InsightCard: React.FC<{ icon: React.ReactNode, title: string, value: string, desc: string }> = ({ icon, title, value, desc }) => (
    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-indigo-100 transition-all duration-500 group">
        <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white transition-all">
            {React.cloneElement(icon as React.ReactElement, { size: 24 })}
        </div>
        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">{title}</h4>
        <p className="text-3xl font-black text-gray-900 mb-2 tracking-tighter">{value}</p>
        <p className="text-[11px] text-gray-500 font-bold leading-tight">{desc}</p>
    </div>
);

export default AnalyticsHub;
