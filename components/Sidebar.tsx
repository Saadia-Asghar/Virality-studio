
import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'content', label: 'Content Lab', icon: '💡' },
    { id: 'review', label: 'Post Reviewer', icon: '🕵️‍♂️' },
    { id: 'trends', label: 'Viral Trends', icon: '🔥' },
    { id: 'studio', label: 'Image Studio', icon: '🎨' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'team', label: 'Team', icon: '👥' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="w-64 bg-white h-full border-r border-gray-200 flex flex-col fixed left-0 top-0 pt-16 z-40">
      <nav className="flex-1 px-4 py-6 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all ${
              activeTab === item.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <span className={`mr-3 text-lg transition-transform ${activeTab === item.id ? 'scale-110' : ''}`}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center space-x-3 p-3 bg-indigo-50 rounded-2xl border border-indigo-100">
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-black shadow-inner">JD</div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-black text-gray-900 truncate">John Doe</p>
            <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">Pro Member</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
