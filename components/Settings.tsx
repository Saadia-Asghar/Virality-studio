
import React, { useState } from 'react';
import {
  User,
  Settings as SettingsIcon,
  Key,
  CreditCard,
  ExternalLink,
  Activity,
  Instagram,
  Linkedin,
  Twitter,
  Music2,
  ShieldEllipsis,
  ShieldCheck,
  Zap,
  ChevronRight,
  Database,
  Globe,
  Youtube,
  Facebook,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { linkPlatform, seedMockData } from '../services/platformService';
import { Platform } from '../types';

const Settings: React.FC = () => {
  const { user, userData, updateUserData } = useAuth();
  const [apiKey, setApiKey] = useState(localStorage.getItem('virality_gemini_api_key') || '');
  const [seeding, setSeeding] = useState(false);

  const PLATFORMS = [
    { id: Platform.INSTAGRAM, name: 'Instagram', icon: Instagram },
    { id: Platform.TIKTOK, name: 'TikTok', icon: Music2 },
    { id: Platform.YOUTUBE, name: 'YouTube', icon: Youtube },
    { id: Platform.LINKEDIN, name: 'LinkedIn', icon: Linkedin },
    { id: Platform.TWITTER, name: 'Twitter / X', icon: Twitter },
    { id: Platform.FACEBOOK, name: 'Facebook', icon: Facebook },
  ];

  const handleLink = async (platform: Platform) => {
    if (!user) return;
    const username = prompt(`Enter your ${platform} username:`) || '';
    if (username) {
      await linkPlatform(user.uid, platform, username);
    }
  };

  const handleApiKeyChange = (val: string) => {
    setApiKey(val);
    localStorage.setItem('virality_gemini_api_key', val);
    updateUserData({ geminiApiKey: val });
    window.dispatchEvent(new Event('storage'));
  };

  const handleSeed = async () => {
    if (!user) return;
    setSeeding(true);
    await seedMockData(user.uid);
    setSeeding(false);
    alert("Profile seeded with mock engagement data and connected platforms.");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20 animate-in fade-in duration-1000">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center space-x-6 text-center md:text-left">
          <div className="p-5 bg-indigo-600/10 rounded-[2rem] border border-indigo-500/20 text-indigo-400 shadow-2xl">
            <SettingsIcon size={32} />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">App Settings</h2>
            <p className="text-sm text-white/30 font-medium tracking-tight mt-2 italic">"Configure your AI keys, link your social media, and manage your account."</p>
          </div>
        </div>
        <button
          onClick={handleSeed}
          disabled={seeding}
          className="px-12 py-5 bg-white text-black rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-4 active:scale-95 disabled:opacity-50"
        >
          <Database size={18} />
          {seeding ? 'Syncing...' : 'Setup Mock Data'}
        </button>
      </div>

      {/* Profile Card */}
      <section className="relative p-12 rounded-[3.5rem] border border-white/5 overflow-hidden group shadow-2xl bg-[#0c0c0e]">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[100px] -z-0"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="relative">
            <div className="w-32 h-32 rounded-[3rem] border-4 border-white/5 overflow-hidden shadow-2xl shadow-indigo-500/10 group-hover:border-indigo-500/30 transition-all duration-500">
              <img src={userData?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop'} className="w-full h-full object-cover" alt="Profile" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#0c0c0e] rounded-2xl shadow-2xl border border-white/10 flex items-center justify-center text-emerald-400">
              <ShieldCheck size={20} />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-4xl font-black text-white tracking-tight mb-2 uppercase italic leading-none">{userData?.name || 'Anonymous User'}</h3>
            <p className="text-white/40 text-xl font-medium italic mb-6">"Growing in: <span className="text-indigo-400">{userData?.niche || 'Not set'}</span>"</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="px-4 py-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20 flex items-center gap-3">
                <Activity size={14} className="text-indigo-400" />
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Premium Operating Access</span>
              </div>
              <button className="text-[10px] font-black uppercase tracking-widest text-indigo-400/50 hover:text-indigo-400 transition-colors border-b border-indigo-500/20 pb-0.5">Edit Profile Info</button>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Platform Links */}
        <section className="cyber-card p-12 rounded-[3.5rem] flex flex-col h-full bg-[#0c0c0e]">
          <div className="flex items-center gap-5 mb-12">
            <div className="p-4 bg-white/5 rounded-[1.5rem] text-white/40 border border-white/5 shadow-2xl">
              <Globe size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">Deployment Ports</h2>
              <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.2em]">Link your social apps here.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
            {PLATFORMS.map((platform) => {
              const Icon = platform.icon;
              const isConnected = userData?.connectedPlatforms?.includes(platform.id);
              return (
                <div key={platform.id} className="p-6 bg-white/5 rounded-[2rem] border border-white/5 flex items-center justify-between hover:bg-white/[0.08] transition-all group cursor-pointer" onClick={() => handleLink(platform.id)}>
                  <div className="flex items-center space-x-4 text-white/30 group-hover:text-white transition-colors">
                    <div className={`p-2 rounded-lg ${isConnected ? 'bg-indigo-500 text-white' : 'bg-white/5'}`}>
                      <Icon size={18} />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-widest leading-none">{platform.name}</span>
                  </div>
                  <div className={`p-2 rounded-xl border transition-all ${isConnected ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'text-white/10 group-hover:text-white/40 border-transparent'}`}>
                    {isConnected ? <ShieldCheck size={16} /> : <Plus size={16} />}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* API Configuration */}
        <section className="cyber-card p-12 rounded-[3.5rem] flex flex-col h-full bg-[#0c0c0e]">
          <div className="flex items-center gap-5 mb-12">
            <div className="p-4 bg-indigo-600 rounded-[1.5rem] text-white shadow-[0_0_30px_rgba(79,70,229,0.3)]">
              <Key size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">Google Gemini AI</h2>
              <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.2em]">The brain of your app.</p>
            </div>
          </div>

          <div className="space-y-10 flex-grow">
            <div className="space-y-5">
              <div className="flex items-center justify-between px-1">
                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] block">Gemini Matrix Key</label>
                <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Secured</span>
              </div>
              <div className="relative group">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => handleApiKeyChange(e.target.value)}
                  placeholder="Paste your API key here..."
                  className="w-full px-8 py-6 bg-white/5 border border-white/5 rounded-[2rem] font-mono text-sm text-indigo-400 outline-none focus:bg-white/10 focus:border-indigo-500/30 transition-all placeholder:text-white/5 shadow-2xl"
                />
                <ShieldEllipsis size={20} className="absolute right-8 top-1/2 -translate-y-1/2 text-white/5 group-focus-within:text-indigo-400 transition-colors" />
              </div>
            </div>

            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-between p-8 bg-indigo-500/5 rounded-[2.5rem] border border-indigo-500/20 hover:bg-indigo-500/10 transition-all group mt-auto"
            >
              <div className="flex items-center gap-5">
                <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400">
                  <ExternalLink size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-black text-white uppercase tracking-widest group-hover:text-indigo-400 transition-colors">Get Free Gemini Key</span>
                  <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.1em] mt-1">Visit Google AI Studio</span>
                </div>
              </div>
              <ChevronRight size={20} className="text-white/10 group-hover:text-white transition-all group-hover:translate-x-1" />
            </a>

            <p className="text-[10px] text-white/10 font-bold leading-relaxed italic text-center px-6">"Your key is saved safely on your device and is only used to generate your content."</p>
          </div>
        </section>
      </div>

      {/* Subscription Card */}
      <section className="cyber-card p-12 rounded-[4rem] overflow-hidden relative group bg-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-12">
          <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            <div className="p-8 bg-black text-white rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.3)] group-hover:scale-110 transition-transform duration-500">
              <CreditCard size={40} />
            </div>
            <div>
              <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-4 shadow-2xl">
                <Sparkles size={14} className="animate-pulse" />
                ENTERPRISE CORE
              </div>
              <p className="text-6xl font-black text-black tracking-tighter leading-none mb-4">$49.00 <span className="text-lg text-black/20 font-bold">/ MO</span></p>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <p className="text-[10px] text-black/40 font-black uppercase tracking-[0.2em] italic">Renewing on Aug 12, 2026</p>
              </div>
            </div>
          </div>
          <button className="px-14 py-6 bg-black text-white rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.2)] active:scale-95 flex items-center gap-4">
            Manage Billing
            <ChevronRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
};

const Plus: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);

export default Settings;
