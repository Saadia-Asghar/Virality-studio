
import React from 'react';
import { UserPlus, MoreVertical, Send, Slack, Disc as Discord, Notebook as Notion, BarChart3, Users, MessageSquare, Plus, CheckCircle2, Zap } from 'lucide-react';

const TEAM_MEMBERS = [
    { name: 'John Doe', role: 'Team Owner', avatar: 'JD', status: 'Online', color: 'bg-indigo-600' },
    { name: 'Sarah Smith', role: 'Social Expert', avatar: 'SS', status: 'In Meeting', color: 'bg-rose-500' },
    { name: 'Mike Johnson', role: 'Video Editor', avatar: 'MJ', status: 'Working', color: 'bg-amber-500' },
    { name: 'Alex Lee', role: 'Data Helper', avatar: 'AL', status: 'Offline', color: 'bg-gray-400' },
];

const TeamCommand: React.FC = () => {
    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-20 animate-in fade-in duration-1000">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left">
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">Team Work</h2>
                    <p className="text-sm text-white/40 font-medium italic mt-3">"Invite your team, chat with them, and track your group goals."</p>
                </div>
                <button className="bg-white text-black px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-2xl hover:bg-indigo-600 hover:text-white active:scale-95 transition-all flex items-center gap-4">
                    <UserPlus size={18} />
                    Invite Member
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-10">
                    {/* Member List */}
                    <div className="cyber-card p-10 rounded-[3.5rem] bg-[#0c0c0e]">
                        <h3 className="text-2xl font-black text-white mb-10 tracking-tight uppercase italic leading-none">Active Crew</h3>
                        <div className="space-y-4">
                            {TEAM_MEMBERS.map((member, i) => (
                                <div key={i} className="group flex items-center justify-between p-6 rounded-[2.5rem] hover:bg-white/5 transition-all border border-transparent hover:border-white/5">
                                    <div className="flex items-center space-x-6">
                                        <div className="relative">
                                            <div className={`w-16 h-16 rounded-[1.5rem] ${member.color} flex items-center justify-center text-white font-black text-lg shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                                                {member.avatar}
                                            </div>
                                            {member.status === 'Online' && (
                                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-[#0c0c0e] rounded-full animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-black text-white tracking-tight leading-none group-hover:text-indigo-400 transition-colors uppercase italic">{member.name}</h4>
                                            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mt-1.5">{member.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-12">
                                        <div className="hidden md:flex flex-col items-end">
                                            <span className={`text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border ${member.status === 'Online' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                member.status === 'Offline' ? 'bg-white/5 text-white/20 border-white/10' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                                }`}>
                                                {member.status}
                                            </span>
                                        </div>
                                        <button className="p-3 bg-white/5 rounded-xl border border-white/5 text-white/20 hover:text-white transition-all">
                                            <MoreVertical size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Progress Card */}
                    <div className="relative p-12 rounded-[4rem] bg-indigo-600/5 border border-indigo-500/10 overflow-hidden shadow-2xl group">
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] -z-0"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-3">
                                <BarChart3 className="text-indigo-400 w-6 h-6" />
                                <h3 className="text-2xl font-black text-white tracking-tight uppercase italic leading-none">Weekly Growth Goal</h3>
                            </div>
                            <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em] mb-12">Targeting 50,000,000 Total Reach</p>

                            <div className="space-y-6">
                                <div className="flex items-end justify-between px-2">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-1">Current Speed</span>
                                        <span className="text-4xl font-black text-white tracking-tighter">65% <span className="text-sm text-white/20">of target</span></span>
                                    </div>
                                    <div className="p-3 bg-white text-black rounded-2xl shadow-2xl">
                                        <Zap size={20} className="fill-current" />
                                    </div>
                                </div>
                                <div className="overflow-hidden h-4 rounded-full bg-white/5 border border-white/5 shadow-inner">
                                    <div style={{ width: "65%" }} className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.5)] rounded-full animate-in slide-in-from-left duration-1000"></div>
                                </div>
                                <div className="flex justify-between items-center px-2">
                                    <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] italic">32.5M Reach Achieved</span>
                                    <span className="text-[10px] font-black text-white/10 uppercase tracking-[0.2em]">17.5M to go</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-10">
                    {/* Chat Hub */}
                    <div className="cyber-card p-10 rounded-[3.5rem] bg-[#0c0c0e] flex flex-col h-[600px] border border-white/5">
                        <div className="flex items-center justify-between mb-10 px-2">
                            <h3 className="text-lg font-black text-white uppercase tracking-[0.2em]">Team Chat</h3>
                            <div className="flex -space-x-3">
                                {TEAM_MEMBERS.map((m, i) => (
                                    <div key={i} className={`w-8 h-8 rounded-lg border-2 border-[#0c0c0e] ${m.color} text-[8px] font-black flex items-center justify-center text-white`}>{m.avatar}</div>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-10 custom-scrollbar pr-2 no-scrollbar">
                            <ChatItem
                                name="Sarah Smith"
                                msg="Does everyone have the hook calibration for Tuesday's Reels?"
                                time="10:24 AM"
                                avatar="SS"
                                color="bg-rose-500"
                            />
                            <ChatItem
                                name="Mike Johnson"
                                msg="Just uploaded the 4K render to the hub. Metadata is primed."
                                time="11:45 AM"
                                avatar="MJ"
                                color="bg-amber-500"
                            />
                            <ChatItem
                                name="John Doe"
                                msg="Looks elite. Let's push to the Content Lab for AI adaptation."
                                time="12:01 PM"
                                avatar="JD"
                                color="bg-indigo-600"
                            />
                        </div>

                        <div className="pt-8 mt-10 border-t border-white/5 flex gap-3">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="flex-1 bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-xs font-black uppercase tracking-widest text-white placeholder:text-white/10 focus:border-indigo-500/50 outline-none transition-all"
                            />
                            <button className="p-4 bg-white text-black rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-2xl active:scale-95">
                                <Send size={18} />
                            </button>
                        </div>
                    </div>

                    {/* App Links */}
                    <div className="cyber-card p-10 rounded-[3.5rem] bg-[#0c0c0e] border border-white/5">
                        <h3 className="text-lg font-black text-white mb-8 uppercase tracking-[0.2em] px-2 italic">Integrations</h3>
                        <div className="space-y-4">
                            <IntegrationBadge icon={<Slack size={16} />} name="Slack" status="Live" />
                            <IntegrationBadge icon={<Discord size={16} />} name="Discord" status="Live" />
                            <IntegrationBadge icon={<Notion size={16} />} name="Notion" status="Connect" active={false} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ChatItem: React.FC<{ name: string, msg: string, time: string, avatar: string, color: string }> = ({ name, msg, time, avatar, color }) => (
    <div className="flex space-x-5 group">
        <div className={`w-12 h-12 rounded-2xl ${color} flex-shrink-0 flex items-center justify-center text-[11px] font-black text-white shadow-2xl group-hover:scale-110 transition-all duration-500 border border-white/5`}>
            {avatar}
        </div>
        <div className="flex flex-col flex-1">
            <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-black text-white uppercase tracking-widest italic">{name}</span>
                <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">{time}</span>
            </div>
            <p className="text-[12px] text-white/50 leading-relaxed bg-white/5 p-5 rounded-[2rem] rounded-tl-none font-bold border border-white/5 italic">"{msg}"</p>
        </div>
    </div>
);

const IntegrationBadge: React.FC<{ icon: React.ReactNode, name: string, status: string, active?: boolean }> = ({ icon, name, status, active = true }) => (
    <div className="flex items-center justify-between p-5 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/5 transition-all cursor-pointer group">
        <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-xl border ${active ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-white/5 text-white/20 border-white/10'}`}>
                {icon}
            </div>
            <span className="text-[11px] font-black text-white/40 uppercase tracking-widest group-hover:text-white transition-colors">{name}</span>
        </div>
        <div className="flex items-center gap-2">
            {active && <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>}
            <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${active ? 'text-emerald-400' : 'text-white/10'}`}>{status}</span>
        </div>
    </div>
);

export default TeamCommand;
