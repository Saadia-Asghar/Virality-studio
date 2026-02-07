
import React, { useState } from 'react';
import {
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    Zap,
    Clock,
    Instagram,
    Music2,
    Linkedin,
    Plus,
    ArrowRight,
    TrendingUp,
    Target,
    Youtube,
    Facebook,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';

const ContentCalendar: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const SCHEDULE = [
        { day: 'Mon', platform: 'Instagram', time: '09:00', title: '5 AI Tips Reel', status: 'ready' },
        { day: 'Mon', platform: 'TikTok', time: '18:30', title: 'Viral Hook Test', status: 'ready' },
        { day: 'Wed', platform: 'YouTube', time: '11:15', title: 'Full Breakdown', status: 'pending' },
        { day: 'Fri', platform: 'Facebook', time: '10:00', title: 'Daily Insight', status: 'ready' },
        { day: 'Sun', platform: 'TikTok', time: '21:00', title: 'B-Roll Edit', status: 'ready' },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-12 pb-20 animate-in fade-in duration-1000">
            {/* Header / Month Selector */}
            <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
                <div className="flex items-center space-x-6 text-center lg:text-left">
                    <div className="p-5 bg-indigo-600 rounded-[2rem] text-white shadow-[0_0_40px_rgba(79,70,229,0.3)]">
                        <CalendarIcon size={32} />
                    </div>
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">Post Schedule</h2>
                        <p className="text-sm text-white/40 font-medium italic mt-2 italic leading-relaxed">"Manage your future viral posts and never miss a peak window."</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 bg-white/5 p-3 rounded-[2rem] border border-white/5 shadow-2xl backdrop-blur-xl">
                    <button className="p-4 bg-white/5 text-white/40 hover:text-white rounded-2xl hover:bg-white/10 transition-all"><ChevronLeft size={20} /></button>
                    <div className="flex flex-col items-center px-8">
                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-1">Current Cycle</span>
                        <span className="text-xl font-black text-white uppercase tracking-widest leading-none">August 2026</span>
                    </div>
                    <button className="p-4 bg-white/5 text-white/40 hover:text-white rounded-2xl hover:bg-white/10 transition-all"><ChevronRight size={20} /></button>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
                {DAYS.map(day => (
                    <div key={day} className="space-y-6">
                        <div className="text-center py-4 bg-indigo-500/5 rounded-2xl border border-indigo-500/10 shadow-xl">
                            <p className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.3em] italic">{day}</p>
                        </div>

                        <div className="space-y-4">
                            {SCHEDULE.filter(s => s.day === day).map((item, i) => (
                                <div key={i} className="cyber-card p-6 rounded-[2.5rem] group relative overflow-hidden flex flex-col items-center text-center bg-[#0c0c0e] hover:border-indigo-500/30">
                                    <div className={`absolute top-0 left-0 w-full h-1.5 ${item.status === 'ready' ? 'bg-indigo-500' : 'bg-amber-500 animate-pulse'}`}></div>

                                    <div className="p-4 bg-white/5 rounded-2xl text-white/30 mb-6 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-all duration-500 border border-white/5">
                                        {item.platform === 'Instagram' && <Instagram size={20} />}
                                        {item.platform === 'TikTok' && <Music2 size={20} />}
                                        {item.platform === 'YouTube' && <Youtube size={20} />}
                                        {item.platform === 'Facebook' && <Facebook size={20} />}
                                    </div>

                                    <p className="text-[12px] font-black text-white mb-3 leading-tight uppercase tracking-tight italic">{item.title}</p>

                                    <div className="flex items-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-8">
                                        <Clock size={12} className="text-indigo-400" />
                                        <span>{item.time}</span>
                                    </div>

                                    <button className="w-full py-3 bg-white/5 hover:bg-white hover:text-black rounded-[1.2rem] text-[9px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95">
                                        Edit Node
                                    </button>
                                </div>
                            ))}

                            <button className="w-full h-32 rounded-[2.5rem] border-4 border-dashed border-white/5 flex flex-col items-center justify-center text-white/10 hover:border-indigo-500/30 hover:text-indigo-400 transition-all duration-500 group bg-white/[0.01]">
                                <Plus size={28} className="group-hover:scale-110 group-hover:rotate-90 transition-all" />
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] mt-3 opacity-0 group-hover:opacity-100 transition-all">New Deployment</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Smart Metrics Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10">
                <InsightBox icon={<TrendingUp className="text-emerald-400" />} label="Peak Time" value="WED / 18:00" desc="Highest engagement window" />
                <InsightBox icon={<CheckCircle2 className="text-indigo-400" />} label="Weekly Goal" value="85% READY" desc="Content queue status" />
                <InsightBox icon={<AlertCircle className="text-amber-400" />} label="Next Post" value="IN 12 HOURS" desc="Countdown to next trigger" />
            </div>
        </div>
    );
};

const InsightBox: React.FC<{ icon: React.ReactNode, label: string, value: string, desc: string }> = ({ icon, label, value, desc }) => (
    <div className="cyber-card p-10 rounded-[3rem] bg-[#0c0c0e] flex items-center gap-8 relative overflow-hidden group border border-white/5">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="p-5 bg-white/5 rounded-[1.5rem] text-white border border-white/5 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(79,70,229,0.1)] transition-all">
            {icon}
        </div>
        <div>
            <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-2">{label}</h4>
            <p className="text-2xl font-black text-white tracking-tighter uppercase italic leading-none mb-1">{value}</p>
            <p className="text-[10px] font-bold text-white/10 uppercase tracking-widest italic">{desc}</p>
        </div>
    </div>
);

export default ContentCalendar;
