
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ContentGenerator from './components/ContentGenerator';
import ImageStudio from './components/ImageStudio';
import TrendsExplorer from './components/TrendsExplorer';
import Settings from './components/Settings';
import Landing from './components/Landing';
import ExtensionReview from './components/ExtensionReview';
import AnalyticsHub from './components/AnalyticsHub';
import TeamCommand from './components/TeamCommand';
import CompetitorRadar from './components/CompetitorRadar';
import GuideModal from './components/GuideModal';
import { Sparkles, Terminal, Info } from 'lucide-react';
import { useAuth } from './contexts/AuthContext';

const App: React.FC = () => {
  const { user, loading: authLoading, userData } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [pendingIdea, setPendingIdea] = useState<string | null>(null);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  useEffect(() => {
    // Show guide automatically for new users
    const hasSeenGuide = localStorage.getItem('virality_guide_seen');
    if (user && !hasSeenGuide) {
      setIsGuideOpen(true);
      localStorage.setItem('virality_guide_seen', 'true');
    }
  }, [user]);

  const handleSelectIdea = (idea: string) => {
    setPendingIdea(idea);
    setActiveTab('content');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
          <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">Neural Link Initializing...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Landing onStart={() => setActiveTab('dashboard')} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onSelectIdea={handleSelectIdea} setActiveTab={setActiveTab} />;
      case 'content':
        return <ContentGenerator initialIdea={pendingIdea || ''} />;
      case 'review':
        return <ExtensionReview />;
      case 'studio':
        return <ImageStudio />;
      case 'trends':
        return <TrendsExplorer onSelectIdea={handleSelectIdea} />;
      case 'radar':
        return <CompetitorRadar />;
      case 'settings':
        return <Settings />;
      case 'analytics':
        return <AnalyticsHub />;
      case 'team':
        return <TeamCommand />;
      default:
        return <Dashboard onSelectIdea={handleSelectIdea} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-50 selection:text-indigo-600">
      <Header />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="ml-72 pt-28 px-12 pb-20 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-wrap break-all">
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-indigo-600/10 p-1.5 rounded-lg border border-indigo-600/20">
                  <Terminal size={14} className="text-indigo-600" />
                </div>
                <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em]">
                  {userData?.email ? `Node: ${userData.email}` : 'Encrypted Session'}
                </p>
              </div>
              <h1 className="text-5xl font-black text-gray-900 tracking-tighter uppercase">{activeTab.replace('-', ' ')}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsGuideOpen(true)}
                className="p-4 bg-gray-50 text-gray-400 hover:text-indigo-600 rounded-2xl transition-all group"
                title="Protocol Guide"
              >
                <Info size={20} className="group-hover:scale-110 transition-transform" />
              </button>
              {activeTab !== 'content' && (
                <button
                  onClick={() => {
                    setPendingIdea(null);
                    setActiveTab('content');
                  }}
                  className="bg-gray-900 text-white px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl shadow-gray-200 hover:bg-indigo-600 hover:-translate-y-1 transition-all flex items-center gap-3 active:scale-95"
                >
                  <Sparkles size={16} />
                  Rapid Protocol
                </button>
              )}
            </div>
          </div>
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000">
            {renderContent()}
          </div>
        </div>
      </main>
      <GuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
    </div>
  );
};

export default App;
