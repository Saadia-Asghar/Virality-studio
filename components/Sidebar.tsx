
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
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'content', label: 'Content Lab', icon: FlaskConical },
    { id: 'review', label: 'Post Reviewer', icon: Eye },
    { id: 'trends', label: 'Viral Trends', icon: Flame },
    { id: 'radar', label: 'Audience Radar', icon: Target },
    { id: 'studio', label: 'Image Studio', icon: ImageIcon },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <div className="w-72 bg-white h-full border-r border-gray-100 flex flex-col fixed left-0 top-0 pt-20 z-40 selection:bg-indigo-50 selection:text-indigo-600">
      <nav className="flex-1 px-6 py-8 space-y-2 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`group w-full flex items-center justify-between px-4 py-3.5 text-[13px] font-black tracking-tight rounded-2xl transition-all duration-300 ${isActive
                ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 translate-x-1'
                : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'
                }`}
            >
              <div className="flex items-center">
                <Icon className={`mr-4 w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                <span className="uppercase tracking-[0.05em]">{item.label}</span>
              </div>
              {isActive && <ChevronRight className="w-4 h-4 opacity-50" />}
            </button>
          );
        })}
      </nav>

      <div className="p-6 border-t border-gray-50">
        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-[2rem] border border-gray-100 hover:border-indigo-100 transition-colors cursor-pointer group">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-sm font-black shadow-lg shadow-indigo-100 group-hover:scale-105 transition-transform">JD</div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-black text-gray-900 truncate tracking-tight">John Doe</p>
            <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">Enterprise Plan</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
