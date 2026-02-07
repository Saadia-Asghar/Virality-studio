
import React, { useState, useEffect } from 'react';
import {
  BarChart as BarChartIcon,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Cell
} from 'recharts';
import {
  TrendingUp,
  Users,
  Activity,
  Calendar,
  Zap,
  RefreshCcw,
  Key,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  Music2,
  Info,
  Database,
  LayoutDashboard,
  Youtube,
  Rocket,
  Loader2,
  ChevronRight
} from 'lucide-react';
import { generateContentIdeas } from '../services/geminiService';
import { ContentIdea, Platform } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface DashboardProps {
  onSelectIdea: (idea: string) => void;
  setActiveTab: (tab: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectIdea, setActiveTab }) => {
  const { userData } = useAuth();
  const [ideas, setIdeas] = useState<ContentIdea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiKey = localStorage.getItem('virality_gemini_api_key') || userData?.geminiApiKey;
    if (!apiKey) {
      setLoading(false);
      return;
    }

    const fetchIdeas = async () => {
      try {
        const data = await generateContentIdeas(userData?.niche || "Health and Fitness");
        setIdeas(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchIdeas();
  }, [userData?.niche]);

  const stats = [
    { title: "Engagement Rate", value: "6.2%", change: "+2.1%", positive: true, icon: <Activity className="text-indigo-400" /> },
    { title: "Total Views", value: "2.4M", change: "+18%", positive: true, icon: <Users className="text-amber-400" /> },
    { title: "Daily Posts", value: "1.8", change: "-0.2", positive: false, icon: <Calendar className="text-rose-400" /> },
    { title: "Growth Score", value: "92/100", change: "+5", positive: true, icon: <TrendingUp className="text-emerald-400" /> },
  ];

  const chartData = userData?.mockInsights || [
    { name: 'Mon', reach: 450, engagement: 210 },
    { name: 'Tue', reach: 620, engagement: 340 },
    { name: 'Wed', reach: 890, engagement: 450 },
    { name: 'Thu', reach: 710, engagement: 390 },
    { name: 'Fri', reach: 980, engagement: 520 },
    { name: 'Sat', reach: 820, engagement: 410 },
    { name: 'Sun', reach: 1100, engagement: 630 },
  ];

  if (!localStorage.getItem('virality_gemini_api_key') && !userData?.geminiApiKey) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in slide-in-from-bottom-4">
        <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mb-10 border border-white/5 shadow-2xl">
          <Key className="text-indigo-400 w-10 h-10" />
        </div>
        <h2 className="text-4xl font-black text-white mb-3 tracking-tighter uppercase italic">AI Key Required</h2>
        <p className="text-white/30 max-w-md font-bold text-sm leading-relaxed italic">"You need to add your Google Gemini key in settings to unlock AI content and trend tracking."</p>
        <button
          className="mt-10 bg-white text-black px-12 py-5 rounded-2xl font-black shadow-2xl hover:bg-indigo-600 hover:text-white transition-all text-[11px] uppercase tracking-widest active:scale-95 flex items-center gap-3"
          onClick={() => setActiveTab('settings')}
        >
          Setup System Key
          <ChevronRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      {/* Hero Niche Section */}
      <div className="relative p-14 rounded-[4rem] border border-white/5 overflow-hidden group shadow-2xl bg-[#0c0c0e]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-3 px-4 py-1.5 bg-indigo-500/10 rounded-full border border-indigo-500/20 text-indigo-400 text-[10px] font-black tracking-widest uppercase mb-8">
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
              <span>AI Growth Strategy Active</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9] text-gradient uppercase italic">
              {userData?.niche || 'Loading Niche...'}
            </h2>
            <p className="text-white/40 text-xl font-medium leading-relaxed italic max-w-xl">
              "You're making waves in <span className="text-indigo-400">{userData?.niche}</span>. Generate 3 new Reels today to maintain this momentum."
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => setActiveTab('content')}
              className="px-12 py-6 bg-white text-black font-black rounded-3xl shadow-2xl hover:bg-indigo-600 hover:text-white transition-all text-[11px] uppercase tracking-widest active:scale-95 flex items-center gap-4"
            >
              <Rocket size={18} />
              Grow Now
            </button>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center flex items-center justify-center gap-3">
              <ShieldCheck size={16} className="text-emerald-400" />
              <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.2em]">Neural Engine Synced</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="cyber-card p-10 rounded-[3.5rem] bg-[#0c0c0e] hover:border-indigo-500/30 transition-all duration-700 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center justify-between mb-8">
              <span className="text-[11px] font-black text-white/20 uppercase tracking-[0.3em]">{stat.title}</span>
              <div className="p-3 bg-white/5 rounded-2xl border border-white/5 text-white shadow-xl">
                {stat.icon}
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div className="flex flex-col">
                <span className="text-4xl font-black text-white tracking-tighter italic leading-none">{stat.value}</span>
              </div>
              <div className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${stat.positive ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                {stat.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Growth Chart */}
        <div className="lg:col-span-2 p-12 rounded-[4rem] cyber-card bg-[#0c0c0e]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <h3 className="text-3xl font-black text-white tracking-tighter uppercase italic leading-none mb-3">Overall Growth</h3>
              <p className="text-[11px] text-white/20 font-black uppercase tracking-[0.3em]">Tracking Reach vs Engagement (Last 7 Days)</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Reach</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-500/30"></div>
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Interaction</span>
              </div>
            </div>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis
                  dataKey="name"
                  stroke="rgba(255,255,255,0.1)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontWeight: 900, fill: 'rgba(255,255,255,0.3)' }}
                  dy={15}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.1)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontWeight: 900, fill: 'rgba(255,255,255,0.3)' }}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                  contentStyle={{
                    backgroundColor: '#0c0c0e',
                    borderRadius: '24px',
                    border: '1px solid rgba(255,255,255,0.05)',
                    boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
                    padding: '20px'
                  }}
                  labelStyle={{ color: 'rgba(255,255,255,0.2)', fontSize: '10px', fontWeight: 900, marginBottom: '8px', textTransform: 'uppercase' }}
                />
                <Bar dataKey="reach" fill="#4f46e5" radius={[10, 10, 0, 0]} barSize={28} />
                <Bar dataKey="engagement" fill="#4f46e5" radius={[10, 10, 0, 0]} barSize={28} opacity={0.2} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Health Hub */}
        <div className="p-12 rounded-[4rem] cyber-card bg-[#0c0c0e] flex flex-col h-full">
          <div className="flex items-center gap-4 mb-14">
            <div className="p-4 bg-indigo-500/5 rounded-2xl border border-indigo-500/10 text-indigo-400">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-2xl font-black text-white tracking-tighter uppercase italic">App Sync</h3>
          </div>

          <div className="space-y-10 flex-grow">
            <PlatformStatus platform="Instagram" status="Growing" score={92} icon={<Instagram />} />
            <PlatformStatus platform="TikTok" status="Viral" score={88} icon={<Music2 />} />
            <PlatformStatus platform="YouTube" status="Rising" score={75} icon={<Youtube />} color="text-rose-500" />
            <PlatformStatus platform="LinkedIn" status="Stable" score={45} icon={<Linkedin />} color="text-sky-400" />
            <PlatformStatus platform="X / Twitter" status="Paused" score={20} icon={<Twitter />} color="text-white/20" />
          </div>

          <button
            onClick={() => setActiveTab('settings')}
            className="w-full py-5 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black text-white/40 uppercase tracking-widest hover:text-white hover:bg-white/10 transition-all mt-10 active:scale-95"
          >
            Manage Connections
          </button>
        </div>
      </div>

      {/* AI Ideas Section */}
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4 mb-3">
              <Zap className="text-indigo-400 w-8 h-8 fill-current" />
              <h3 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none">Smart Ideas</h3>
            </div>
            <p className="text-sm text-white/30 font-medium italic">"Daily high-reach content ideas from your Gemini AI."</p>
          </div>

          <button className="px-8 py-4 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-indigo-400 hover:border-indigo-500/30 transition-all flex items-center gap-3 group">
            <RefreshCcw size={16} className="group-hover:rotate-180 transition-transform duration-700" />
            Regenerate
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {loading ? (
            [1, 2, 3].map(i => <div key={i} className="h-96 bg-white/5 animate-pulse rounded-[4rem] border border-white/5"></div>)
          ) : (
            ideas.map((idea) => (
              <div key={idea.id} className="group cyber-card p-12 rounded-[4rem] bg-[#0c0c0e] flex flex-col h-full relative overflow-hidden transition-all duration-700 hover:border-indigo-500/30">
                <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/5 rounded-full blur-[80px] group-hover:bg-indigo-500/10 transition-colors"></div>

                <div className="flex justify-between items-start mb-10">
                  <span className={`text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full border ${idea.priority === 'high' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
                    {idea.priority}
                  </span>
                  <div className="p-4 bg-white/1 rounded-2xl text-white/20 group-hover:bg-indigo-500 group-hover:text-white group-hover:scale-110 transition-all duration-500 border border-white/5 shadow-2xl">
                    {getPlatformIcon(idea.platform)}
                  </div>
                </div>

                <h4 className="text-3xl font-black text-white mb-8 tracking-tighter italic leading-[1.1] uppercase italic">"{idea.topic}"</h4>
                <p className="text-sm text-white/30 font-bold leading-relaxed mb-auto italic">"{idea.reasoning}"</p>

                <div className="mt-12 pt-10 border-t border-white/5 flex flex-col gap-8">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-white/10 uppercase tracking-[0.2em] mb-1">Timing</span>
                      <span className="text-[11px] font-black text-white/40 uppercase tracking-widest">{idea.bestTime}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[9px] font-black text-white/10 uppercase tracking-[0.2em] mb-1">Growth</span>
                      <span className="text-[11px] font-black text-emerald-400 uppercase tracking-widest">+High Impact</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectIdea(idea.topic)}
                    className="w-full py-5 bg-white text-black rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest shadow-2xl hover:bg-indigo-500 hover:text-white transition-all transform group-active:scale-95"
                  >
                    Write This Now
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const PlatformStatus: React.FC<{ platform: string, status: string, score: number, icon: React.ReactNode, color?: string }> = ({ platform, status, score, icon, color = "text-emerald-400" }) => (
  <div className="group cursor-default">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-5">
        <div className="w-12 h-12 rounded-[1.2rem] bg-white/5 flex items-center justify-center text-white/20 group-hover:bg-indigo-500/10 group-hover:text-indigo-400 transition-all border border-white/5 shadow-xl">
          {React.cloneElement(icon as React.ReactElement, { size: 20 })}
        </div>
        <span className="text-lg font-black text-white uppercase tracking-tighter italic">{platform}</span>
      </div>
      <span className={`text-[9px] font-black uppercase tracking-[0.3em] ${color} italic`}>{status}</span>
    </div>
    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
      <div
        className={`h-full transition-all duration-1000 ${score > 80 ? 'bg-indigo-500' : score > 50 ? 'bg-indigo-400' : 'bg-rose-500'}`}
        style={{ width: `${score}%` }}
      ></div>
    </div>
  </div>
);

const getPlatformIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'instagram': return <Instagram size={20} />;
    case 'tiktok': return <Music2 size={20} />;
    case 'youtube': return <Youtube size={20} />;
    case 'facebook': return <Facebook size={20} />;
    case 'linkedin': return <Linkedin size={20} />;
    case 'twitter': return <Twitter size={20} />;
    default: return <Activity size={20} />;
  }
};

export default Dashboard;
