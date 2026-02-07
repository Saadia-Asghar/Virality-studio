
import React from 'react';
import {
  LayoutDashboard,
  FlaskConical,
  Eye,
  Flame,
  Target,
  Image as ImageIcon,
  BarChart3,
  Users,
  Settings as SettingsIcon,
  ChevronRight,
  TrendingUp,
  Box,
  Calendar,
  Sparkles,
  Zap
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Main Command', icon: LayoutDashboard },
    { id: 'content', label: 'AI Post Lab', icon: Zap },
    { id: 'calendar', label: 'Post Schedule', icon: Calendar },
    { id: 'trends', label: 'Find Trends', icon: Flame },
    { id: 'radar', label: 'Market Radar', icon: Target },
    { id: 'review', label: 'Check My Post', icon: Eye },
    { id: 'studio', label: 'AI Image Lab', icon: ImageIcon },
    { id: 'analytics', label: 'Growth Stats', icon: BarChart3 },
    { id: 'team', label: 'Team Work', icon: Users },
    { id: 'settings', label: 'App Settings', icon: SettingsIcon },
  ];

  return (
    <aside className="w-72 h-screen bg-[#050505] border-r border-white/5 fixed left-0 top-0 z-50 transition-all duration-500 overflow-y-auto no-scrollbar">
      {/* App Logo */}
      <div className="h-24 flex items-center px-10 mb-8 border-b border-white/5 bg-gradient-to-br from-[#0c0c0e] to-transparent sticky top-0 z-10 backdrop-blur-xl">
        <div className="w-12 h-12 bg-white text-black rounded-2xl flex items-center justify-center mr-4 shadow-[0_10px_30px_rgba(255,255,255,0.15)] group hover:scale-110 transition-transform cursor-pointer">
          <TrendingUp size={24} />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-black text-white tracking-tighter uppercase leading-none">TRENDING</span>
          <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mt-1">v3.0 Gemini AI</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="px-6 space-y-2 pb-32">
        <p className="px-5 text-[9px] font-black text-white/20 uppercase tracking-[0.3em] mb-4">Operations Center</p>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-500 group relative ${isActive
                ? 'bg-white text-black shadow-[0_20px_40px_rgba(0,0,0,0.5)] scale-[1.02]'
                : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-r-full"></div>
              )}

              <div className="flex items-center space-x-4">
                <Icon size={18} className={`${isActive ? 'text-black' : 'group-hover:text-indigo-400 transition-colors duration-500'}`} />
                <span className={`text-[11px] font-black uppercase tracking-widest ${isActive ? 'text-black' : ''}`}>
                  {item.label}
                </span>
              </div>

              {isActive ? (
                <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse"></div>
              ) : (
                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Pro Upgrade Card */}
      <div className="absolute bottom-10 left-6 right-6">
        <div className="p-8 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/10 relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/20 transition-all duration-700"></div>

          <div className="flex items-center space-x-4 mb-6">
            <div className="p-2.5 bg-indigo-500 rounded-xl shadow-lg shadow-indigo-500/20">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="text-[11px] font-black text-white uppercase tracking-widest leading-none">Studio Pro Access</span>
          </div>

          <p className="text-[10px] text-white/30 font-bold leading-relaxed mb-6 italic">"You are at 85% growth capacity. Unlock all AI nodes now."</p>

          <button className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-500 hover:text-white transition-all shadow-xl active:scale-95">
            Claim Pro Seat
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
