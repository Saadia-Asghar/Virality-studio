
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

const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [pendingIdea, setPendingIdea] = useState<string | null>(null);

  useEffect(() => {
    // Basic check for session or "onboarding completion"
    const hasBeenStarted = localStorage.getItem('virality_started');
    if (hasBeenStarted) setIsStarted(true);
  }, []);

  const handleStart = () => {
    localStorage.setItem('virality_started', 'true');
    setIsStarted(true);
  };

  const handleSelectIdea = (idea: string) => {
    setPendingIdea(idea);
    setActiveTab('content');
  };

  if (!isStarted) {
    return <Landing onStart={handleStart} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onSelectIdea={handleSelectIdea} />;
      case 'content':
        return <ContentGenerator initialIdea={pendingIdea || ''} />;
      case 'review':
        return <ExtensionReview />;
      case 'studio':
        return <ImageStudio />;
      case 'trends':
        return <TrendsExplorer />;
      case 'settings':
        return <Settings />;
      case 'analytics':
        return (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in slide-in-from-bottom-4">
            <div className="w-24 h-24 bg-indigo-50 rounded-3xl flex items-center justify-center text-4xl mb-6 shadow-sm">📈</div>
            <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Analytics Hub</h2>
            <p className="text-gray-500 max-w-md">Syncing with Meta & TikTok API. Deep engagement insights will appear here shortly.</p>
            <button className="mt-8 bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100" onClick={() => setActiveTab('settings')}>Connect Accounts</button>
          </div>
        );
      case 'team':
        return (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in slide-in-from-bottom-4">
            <div className="w-24 h-24 bg-blue-50 rounded-3xl flex items-center justify-center text-4xl mb-6 shadow-sm">👥</div>
            <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Team Command</h2>
            <p className="text-gray-500 max-w-md italic">"Collaborative viral growth happens here."</p>
            <div className="mt-8 bg-white border border-gray-100 rounded-[2rem] p-8 shadow-xl max-w-sm w-full">
               <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">JD</div>
                    <div className="text-left">
                      <p className="text-sm font-black text-gray-900">John Doe</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Admin</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-green-50 text-green-600 px-2.5 py-1 rounded-full font-black tracking-widest">ONLINE</span>
               </div>
               <button className="w-full py-3 bg-gray-50 text-gray-400 text-xs font-bold rounded-xl border-2 border-dashed border-gray-200">
                 + Add Team Member
               </button>
            </div>
          </div>
        );
      default:
        return <Dashboard onSelectIdea={handleSelectIdea} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="ml-64 pt-24 px-10 pb-16 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
                <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Active Session</p>
              </div>
              <h1 className="text-4xl font-black text-gray-900 capitalize tracking-tighter">{activeTab.replace('-', ' ')}</h1>
            </div>
            <div className="flex items-center space-x-4">
               {activeTab !== 'content' && (
                 <button 
                  onClick={() => {
                    setPendingIdea(null);
                    setActiveTab('content');
                  }}
                  className="bg-gray-900 text-white px-8 py-3 rounded-2xl text-sm font-black shadow-2xl hover:bg-black transition-all transform hover:-translate-y-1 active:scale-95"
                 >
                   Quick Draft
                 </button>
               )}
            </div>
          </div>
          <div className="animate-in fade-in duration-700">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
