
import React, { useState, useEffect } from 'react';
import {
  BarChart as BarChartIcon,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart
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
  Music2
} from 'lucide-react';
import { generateContentIdeas } from '../services/geminiService';
import { ContentIdea, Platform } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface DashboardProps {
  onSelectIdea: (idea: string) => void;
  setActiveTab: (tab: string) => void;
}

const AttentionInfo: React.FC<{ label: string; info: string }> = ({ label, info }) => (
  <div className="group relative inline-block ml-2">
    <div className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center text-[10px] text-gray-400 cursor-help group-hover:bg-indigo-600 group-hover:text-white transition-all">?</div>
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-gray-900 text-white text-[10px] rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 shadow-2xl skew-y-0 translate-y-2 group-hover:translate-y-0">
      <p className="font-black uppercase tracking-widest mb-1 text-indigo-400">{label}</p>
      <p className="font-medium leading-relaxed opacity-70">{info}</p>
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
    </div>
  </div>
);

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
        const data = await generateContentIdeas(userData?.niche || "High-Performance Business");
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
    { title: "Total Reach", value: "2.4M", change: "+18%", positive: true, icon: <Users size={16} />, info: "Total impressions across all distribution hubs in the last 30 deployment cycles." },
    { title: "Engagement", value: "6.2%", change: "+2.1%", positive: true, icon: <Activity size={16} />, info: "The concentration of interaction signals per attention unit. Higher is better." },
    { title: "New Followers", value: "8,340", change: "+890", positive: true, icon: <TrendingUp size={16} />, info: "Absolute growth in loyal attention nodes within your primary niche targeting." },
    { title: "Post Frequency", value: "1.8/day", change: "-0.2", positive: false, icon: <Calendar size={16} />, info: "Deployment cadence. Standardized output maintains high neural relevance." },
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
        <div className="w-24 h-24 bg-indigo-50 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
          <Key className="text-indigo-600 w-10 h-10" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">AI Access Required</h2>
        <p className="text-gray-500 max-w-md font-medium text-sm">Connect your Gemini API Key in Settings to unlock automated content generation and trend scanning.</p>
        <button
          className="mt-8 bg-indigo-600 text-white px-8 py-3 rounded-2xl font-black shadow-lg shadow-indigo-100 hover:scale-105 transition-all text-sm uppercase tracking-widest"
          onClick={() => setActiveTab('settings')}
        >
          Go to Settings
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Strategy Banner */}
      <div className="bg-gradient-to-br from-gray-900 to-black p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden border border-white/5">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="max-w-xl text-center md:text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-500/10 rounded-full text-[10px] font-black tracking-[0.2em] uppercase mb-6 border border-indigo-500/20">
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
              <span>Strategy Protocol Active</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter leading-tight">
              Viral Niche: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-300">
                {userData?.niche || 'Analyzing Target Context...'}
              </span>
            </h2>
            <p className="text-white/40 text-base font-medium leading-relaxed">
              Neural engines have prioritized {userData?.niche ? 'your current niche' : 'a baseline profile'}. Growth metrics are <span className="text-indigo-400 font-bold">Optimal</span>. Deploy authority-driven hooks for maximum lift.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => setActiveTab('settings')}
              className="whitespace-nowrap px-10 py-5 bg-white text-black font-black rounded-2xl shadow-xl hover:-translate-y-1 transition-all text-sm uppercase tracking-widest"
            >
              System Config
            </button>
            <p className="text-[10px] text-white/20 text-center font-black uppercase tracking-[0.2em]">Next Analysis in 12:44:02</p>
          </div>
        </div>
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="flex items-center">
                <h3 className="text-xl font-black text-gray-900 tracking-tight">Growth Trajectory</h3>
                <AttentionInfo label="Signal Growth" info="Aggregate momentum across all neural nodes. Measures velocity of attention capture." />
              </div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Cross-platform Reach vs Engagement</p>
            </div>
            <select className="text-[11px] font-black uppercase tracking-widest bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-gray-500 outline-none hover:bg-gray-100 transition-colors">
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
            </select>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                <XAxis dataKey="name" stroke="#cbd5e1" fontSize={11} tickLine={false} axisLine={false} tick={{ fontWeight: 700 }} />
                <YAxis stroke="#cbd5e1" fontSize={11} tickLine={false} axisLine={false} tick={{ fontWeight: 700 }} />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px' }}
                />
                <Bar dataKey="reach" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={24} />
                <Bar dataKey="engagement" fill="#818cf8" radius={[6, 6, 0, 0]} barSize={24} opacity={0.5} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex items-center space-x-2 mb-8">
            <ShieldCheck className="text-indigo-600 w-5 h-5" />
            <h3 className="text-xl font-black text-gray-900 tracking-tight">Ecosystem Health</h3>
          </div>
          <div className="space-y-8">
            <HealthIndicator platform={Platform.INSTAGRAM} status="Healthy" score={92} icon={<Instagram size={14} />} />
            <HealthIndicator platform={Platform.TIKTOK} status="Healthy" score={88} icon={<Music2 size={14} />} />
            <HealthIndicator platform={Platform.LINKEDIN} status={userData?.connectedPlatforms?.includes(Platform.LINKEDIN) ? "Healthy" : "Link Required"} score={userData?.connectedPlatforms?.includes(Platform.LINKEDIN) ? 80 : 0} color={userData?.connectedPlatforms?.includes(Platform.LINKEDIN) ? "text-emerald-500" : "text-gray-300"} icon={<Linkedin size={14} />} />
            <HealthIndicator platform={Platform.TWITTER} status="Inactive" score={20} color="text-rose-500" icon={<Twitter size={14} />} />
          </div>
          <div className="mt-10 pt-8 border-t border-gray-50">
            <button className="w-full text-xs font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-700 transition-colors flex items-center justify-center gap-2">
              Full Diagnostics Report
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-end mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Zap className="text-indigo-600 w-5 h-5 fill-current" />
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">Daily Inspiration</h3>
            </div>
            <p className="text-sm text-gray-400 font-medium">Neural engine detected these high-retention concepts for your niche.</p>
          </div>
          <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-indigo-600 transition-all">
            <RefreshCcw size={14} />
            Refresh Ideas
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            [1, 2, 3].map(i => <div key={i} className="h-80 bg-gray-50 animate-pulse rounded-[2.5rem]"></div>)
          ) : (
            ideas.map((idea) => (
              <div key={idea.id} className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-indigo-500/30 transition-all duration-500 flex flex-col h-full overflow-hidden relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors"></div>
                <div className="flex justify-between items-start mb-6">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${idea.priority === 'high' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                    {idea.priority} priority
                  </span>
                  <div className="p-2 bg-gray-50 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    {getPlatformIcon(idea.platform)}
                  </div>
                </div>
                <h4 className="text-xl font-black text-gray-900 mb-4 line-clamp-2 leading-tight tracking-tight">{idea.topic}</h4>
                <p className="text-xs text-gray-500 mb-8 flex-grow leading-relaxed font-medium">{idea.reasoning}</p>

                <div className="flex items-center justify-between mb-8 px-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <Calendar size={12} />
                    <span>{idea.bestTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-black text-indigo-500 uppercase tracking-widest">
                    <Activity size={12} />
                    <span>Viral Lift</span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectIdea(idea.topic)}
                  className="w-full py-4 bg-gray-900 group-hover:bg-indigo-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Launch Lab
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: string; change: string; positive: boolean; icon: React.ReactNode; info?: string }> = ({ title, value, change, positive, icon, info = "The aggregate attention signal detected by the neural engine." }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm group hover:border-indigo-100 transition-colors">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{title}</p>
        <AttentionInfo label={title} info={info} />
      </div>
      <div className="p-2 bg-gray-50 rounded-lg text-gray-400 group-hover:text-indigo-600 transition-colors">
        {icon}
      </div>
    </div>
    <div className="flex items-baseline justify-between">
      <p className="text-3xl font-black text-gray-900 tracking-tighter">{value}</p>
      <div className={`flex items-center text-[11px] font-black px-2 py-0.5 rounded-lg ${positive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
        {positive ? <ArrowUpRight size={12} className="mr-0.5" /> : <ArrowDownRight size={12} className="mr-0.5" />}
        {change}
      </div>
    </div>
  </div>
);

const HealthIndicator: React.FC<{ platform: string; status: string; score: number; icon: React.ReactNode; color?: string }> = ({ platform, status, score, icon, color = "text-emerald-500" }) => (
  <div className="flex items-center justify-between group cursor-default">
    <div className="flex items-center space-x-4">
      <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">{icon}</div>
      <div className="flex items-center">
        <span className="text-[13px] font-black text-gray-700 uppercase tracking-widest">{platform}</span>
        <AttentionInfo label={`${platform} Health`} info="Neural alignment score. High scores indicate the algorithm is currently favoring your content type." />
      </div>
    </div>
    <div className="flex flex-col items-end">
      <span className={`text-[9px] font-black uppercase tracking-[0.2em] mb-2 ${color}`}>{status}</span>
      <div className="w-28 h-2 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
        <div className={`h-full transition-all duration-1000 ${score > 70 ? 'bg-indigo-600' : score > 40 ? 'bg-amber-400' : 'bg-rose-400'}`} style={{ width: `${score}%` }}></div>
      </div>
    </div>
  </div>
);

const getPlatformIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'instagram': return <Instagram size={18} />;
    case 'tiktok': return <Music2 size={18} />;
    case 'linkedin': return <Linkedin size={18} />;
    case 'twitter': return <Twitter size={18} />;
    case 'facebook': return <Facebook size={18} />;
    default: return <Activity size={18} />;
  }
};

export default Dashboard;
