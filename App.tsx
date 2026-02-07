
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
import ContentCalendar from './components/ContentCalendar';
import HookLibrary from './components/HookLibrary';
import { Sparkles, Terminal, Info, Zap, Loader2 } from 'lucide-react';
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
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-indigo-500/10 border-t-indigo-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap size={20} className="text-indigo-400 animate-pulse" />
            </div>
          </div>
          <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">Initializing Neural Link...</p>
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
      case 'calendar':
        return <ContentCalendar />;
      case 'hooks':
        return <HookLibrary />;
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
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden">
      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="nebula-glow top-[-10%] left-[-5%] bg-indigo-600/10"></div>
        <div className="nebula-glow bottom-[-10%] right-[-5%] bg-purple-600/10" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="ml-72 flex flex-col min-h-screen transition-all duration-500">
        <Header />

        <main className="flex-grow pt-32 px-12 pb-20">
          <div className="max-w-7xl mx-auto">
            {/* Global Context Bar */}
            <div className="mb-14 flex flex-col md:flex-row justify-between items-center bg-white/2 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
              <div className="flex items-center gap-8 mb-4 md:mb-0">
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 mb-1">
                    <Terminal size={14} className="text-indigo-400" />
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Neural Node Connection</span>
                  </div>
                  <span className="text-sm font-black text-white uppercase tracking-widest">{userData?.email || 'Encrypted.User'}</span>
                </div>
                <div className="h-10 w-px bg-white/5 hidden sm:block"></div>
                <div className="flex flex-col hidden sm:flex">
                  <div className="flex items-center gap-3 mb-1">
                    <Sparkles size={14} className="text-amber-400" />
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">AI Status</span>
                  </div>
                  <span className="text-sm font-black text-emerald-400 uppercase tracking-widest">Active & Ready</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsGuideOpen(true)}
                  className="p-4 bg-white/5 text-white/40 hover:text-indigo-400 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all shadow-xl group"
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
                    className="px-10 py-4 bg-white text-black rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-2xl active:scale-95 flex items-center gap-3"
                  >
                    <Zap size={16} />
                    Rapid Post
                  </button>
                )}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000">
              {renderContent()}
            </div>
          </div>
        </main>

        <footer className="px-12 py-10 border-t border-white/5 text-center">
          <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.5em]">Trending Beta v3.0 // Powered by Gemini 2.0 // © 2026 Archive-0</p>
        </footer>
      </div>

      <GuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
    </div>
  );
};

export default App;
