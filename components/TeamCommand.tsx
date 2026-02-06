
import React from 'react';
import { UserPlus, MoreVertical, Send, Slack, Disc as Discord, Notebook as Notion, BarChart3 } from 'lucide-react';

const TEAM_MEMBERS = [
    { name: 'John Doe', role: 'Admin', avatar: 'JD', status: 'Online', color: 'bg-indigo-600' },
    { name: 'Sarah Smith', role: 'Content Strategist', avatar: 'SS', status: 'In Meeting', color: 'bg-rose-500' },
    { name: 'Mike Johnson', role: 'Video Editor', avatar: 'MJ', status: 'Editing', color: 'bg-amber-500' },
    { name: 'Alex Lee', role: 'Data Analyst', avatar: 'AL', status: 'Offline', color: 'bg-gray-400' },
];

const TeamCommand: React.FC = () => {
    return (
        <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h2 className="text-4xl font-black text-gray-900 tracking-tighter">Command Center</h2>
                    <p className="text-sm text-gray-400 font-medium">Coordinate cross-functional growth strategies with the core crew.</p>
                </div>
                <button className="bg-indigo-600 text-white px-8 py-4 rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest shadow-2xl shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center gap-3">
                    <UserPlus size={16} />
                    Invite Member
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm p-10">
                        <h3 className="text-xl font-black text-gray-900 mb-10 tracking-tight uppercase tracking-[0.05em]">Active Workplace</h3>
                        <div className="space-y-4">
                            {TEAM_MEMBERS.map((member, i) => (
                                <div key={i} className="group flex items-center justify-between p-5 rounded-[2rem] hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100">
                                    <div className="flex items-center space-x-5">
                                        <div className="relative">
                                            <div className={`w-14 h-14 rounded-2xl ${member.color} flex items-center justify-center text-white font-black text-sm shadow-xl shadow-gray-200 group-hover:scale-105 transition-transform`}>
                                                {member.avatar}
                                            </div>
                                            {member.status === 'Online' && (
                                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-black text-gray-900 tracking-tight">{member.name}</h4>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5">{member.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-10">
                                        <div className="hidden md:flex flex-col items-end">
                                            <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${member.status === 'Online' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                member.status === 'Offline' ? 'bg-gray-100 text-gray-400 border-gray-200' : 'bg-amber-50 text-amber-600 border-amber-100'
                                                }`}>
                                                {member.status}
                                            </span>
                                        </div>
                                        <button className="text-gray-300 hover:text-indigo-600 transition-colors">
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-indigo-950 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-2">
                                <BarChart3 className="text-indigo-400 w-5 h-5" />
                                <h3 className="text-xl font-black tracking-tight uppercase tracking-wider">Campaign Target</h3>
                            </div>
                            <p className="text-indigo-300 text-[10px] font-black uppercase tracking-[0.2em] mb-10">Consolidated Weekly Goal: 50M Reach</p>

                            <div className="relative pt-1">
                                <div className="flex mb-4 items-center justify-between">
                                    <div>
                                        <span className="text-[10px] font-black inline-block py-1 px-3 uppercase rounded-full text-indigo-400 bg-indigo-500/10 border border-indigo-500/20">
                                            Velocity Check
                                        </span>
                                    </div>
                                    <div className="text-right font-black text-2xl tracking-tighter">
                                        65%
                                    </div>
                                </div>
                                <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-white/5 border border-white/5">
                                    <div style={{ width: "65%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.5)]"></div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-6">
                                <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">32.5M ATTRIBUTED</span>
                                <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">17.5M REMAINING</span>
                            </div>
                        </div>
                        <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px]"></div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm p-8 flex flex-col h-[500px]">
                        <h3 className="text-lg font-black text-gray-900 mb-8 uppercase tracking-widest px-2">Secure Comms</h3>
                        <div className="flex-1 overflow-y-auto space-y-8 custom-scrollbar px-2">
                            <ChatItem
                                name="Sarah Smith"
                                msg="Does anyone have the hook calibration for Tuesday's Reels?"
                                time="10:24"
                                avatar="SS"
                                color="bg-rose-500"
                            />
                            <ChatItem
                                name="Mike Johnson"
                                msg="Just uploaded the 4K render to the hub. Metadata is primed."
                                time="11:45"
                                avatar="MJ"
                                color="bg-amber-500"
                            />
                        </div>
                        <div className="pt-8 mt-4 border-t border-gray-50 flex gap-2">
                            <input
                                type="text"
                                placeholder="Broadcast message..."
                                className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3 text-xs font-semibold focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                            />
                            <button className="p-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                                <Send size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm p-8">
                        <h3 className="text-lg font-black text-gray-900 mb-6 uppercase tracking-widest px-2">Sync Ports</h3>
                        <div className="space-y-3">
                            <IntegrationBadge icon={<Slack size={14} />} name="Slack" status="Active" />
                            <IntegrationBadge icon={<Discord size={14} />} name="Discord" status="Active" />
                            <IntegrationBadge icon={<Notion size={14} />} name="Notion" status="Connect" active={false} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ChatItem: React.FC<{ name: string, msg: string, time: string, avatar: string, color: string }> = ({ name, msg, time, avatar, color }) => (
    <div className="flex space-x-4 group">
        <div className={`w-10 h-10 rounded-xl ${color} flex-shrink-0 flex items-center justify-center text-[11px] font-black text-white shadow-lg shadow-gray-100 group-hover:scale-110 transition-transform`}>
            {avatar}
        </div>
        <div className="flex flex-col flex-1">
            <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-[11px] font-black text-gray-900 uppercase tracking-tight">{name}</span>
                <span className="text-[9px] font-black text-gray-300 tracking-widest">{time}</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed bg-gray-50 p-4 rounded-[1.5rem] rounded-tl-none font-medium border border-gray-100">{msg}</p>
        </div>
    </div>
);

const IntegrationBadge: React.FC<{ icon: React.ReactNode, name: string, status: string, active?: boolean }> = ({ icon, name, status, active = true }) => (
    <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-50 bg-gray-50/30 hover:bg-white hover:shadow-sm transition-all cursor-pointer">
        <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${active ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-100 text-gray-400'}`}>
                {icon}
            </div>
            <span className="text-[11px] font-black text-gray-700 uppercase tracking-widest">{name}</span>
        </div>
        <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${active ? 'text-indigo-600' : 'text-gray-300'}`}>{status}</span>
    </div>
);

export default TeamCommand;
