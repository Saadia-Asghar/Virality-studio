
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_CHART_DATA } from '../constants';
import { generateContentIdeas } from '../services/geminiService';
import { ContentIdea, Platform } from '../types';

interface DashboardProps {
  onSelectIdea: (idea: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectIdea }) => {
  const [ideas, setIdeas] = useState<ContentIdea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const data = await generateContentIdeas("Fitness & High-Performance Business");
        setIdeas(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchIdeas();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Reach" value="2.4M" change="+18%" positive={true} />
        <StatCard title="Engagement" value="6.2%" change="+2.1%" positive={true} />
        <StatCard title="New Followers" value="8,340" change="+890" positive={true} />
        <StatCard title="Post Frequency" value="1.8/day" change="-0.2" positive={false} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900">Account Growth Overview</h3>
            <select className="text-xs bg-gray-50 border border-gray-200 rounded px-2 py-1 text-gray-600 outline-none">
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="reach" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={32} />
                <Bar dataKey="engagement" fill="#818cf8" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Account Health</h3>
          <div className="space-y-6">
            <HealthIndicator platform={Platform.INSTAGRAM} status="Healthy" score={92} />
            <HealthIndicator platform={Platform.TIKTOK} status="Healthy" score={88} />
            <HealthIndicator platform={Platform.LINKEDIN} status="Attention" score={65} color="text-yellow-500" />
            <HealthIndicator platform={Platform.TWITTER} status="Inactive" score={20} color="text-red-500" />
          </div>
          <div className="mt-8 pt-6 border-t border-gray-100">
            <button className="w-full text-sm font-semibold text-indigo-600 hover:text-indigo-700">Detailed Performance Report &rarr;</button>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-end mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">🔥 Daily Inspiration</h3>
            <p className="text-sm text-gray-500">AI-curated content hooks designed for high retention.</p>
          </div>
          <button className="text-sm font-semibold text-gray-400 hover:text-indigo-600 transition-colors">Refresh Ideas</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {loading ? (
            [1, 2, 3].map(i => <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-xl"></div>)
          ) : (
            ideas.map((idea) => (
              <div key={idea.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all group flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${idea.priority === 'high' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                    {idea.priority} priority
                  </span>
                  <span className="text-xl filter grayscale group-hover:grayscale-0 transition-all">{getPlatformIcon(idea.platform)}</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">{idea.topic}</h4>
                <p className="text-xs text-gray-500 mb-4 flex-grow line-clamp-3 leading-relaxed">{idea.reasoning}</p>
                <div className="flex items-center text-[11px] font-medium text-gray-400 mb-5">
                  <span className="mr-3 flex items-center"><span className="mr-1">⏰</span> {idea.bestTime}</span>
                  <span className="flex items-center"><span className="mr-1">📈</span> High Virality</span>
                </div>
                <button 
                  onClick={() => onSelectIdea(idea.topic)}
                  className="w-full py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  Generate Full Post
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: string; change: string; positive: boolean }> = ({ title, value, change, positive }) => (
  <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{title}</p>
    <div className="mt-2 flex items-baseline">
      <p className="text-2xl font-bold text-gray-900 tracking-tight">{value}</p>
      <p className={`ml-2 text-xs font-bold px-1.5 py-0.5 rounded ${positive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
        {change}
      </p>
    </div>
  </div>
);

const HealthIndicator: React.FC<{ platform: string; status: string; score: number; color?: string }> = ({ platform, status, score, color = "text-green-500" }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-sm">{getPlatformIcon(platform)}</div>
      <span className="text-sm font-bold text-gray-700 capitalize">{platform}</span>
    </div>
    <div className="flex flex-col items-end">
      <span className={`text-[10px] font-extrabold uppercase tracking-widest mb-1 ${color}`}>{status}</span>
      <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full transition-all duration-1000 ${score > 70 ? 'bg-indigo-500' : score > 40 ? 'bg-yellow-400' : 'bg-red-400'}`} style={{ width: `${score}%` }}></div>
      </div>
    </div>
  </div>
);

const getPlatformIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'instagram': return '📸';
    case 'tiktok': return '🎵';
    case 'linkedin': return '💼';
    case 'twitter': return '🐦';
    case 'facebook': return '👥';
    default: return '📱';
  }
};

export default Dashboard;
