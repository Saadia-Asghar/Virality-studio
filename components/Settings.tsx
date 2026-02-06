
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
  Facebook,
  ShieldEllipsis,
  ShieldCheck,
  Zap
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
    { id: Platform.LINKEDIN, name: 'LinkedIn', icon: Linkedin },
    { id: Platform.TWITTER, name: 'Twitter', icon: Twitter },
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
    <div className="max-w-4xl mx-auto space-y-10 pb-20 animate-in fade-in duration-700 font-sans">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-100">
            <SettingsIcon className="text-white w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tighter">System Configuration</h2>
            <p className="text-sm text-gray-400 font-medium tracking-tight">Manage your neural identity and integration ports.</p>
          </div>
        </div>
        <button
          onClick={handleSeed}
          disabled={seeding}
          className="px-6 py-3 bg-indigo-600/10 text-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-2"
        >
          <Zap size={14} />
          {seeding ? 'Seeding...' : 'Seed Mock Data'}
        </button>
      </div>

      <section className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden group">
        <div className="px-10 py-8 border-b border-gray-50 flex justify-between items-center group-hover:bg-gray-50/50 transition-colors">
          <div className="flex items-center space-x-3">
            <User size={18} className="text-gray-400" />
            <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest leading-none">User Identity</h2>
          </div>
          <button className="text-[11px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-700">Modify Identity</button>
        </div>
        <div className="p-10 flex items-center space-x-8">
          <div className="relative">
            <img src={userData?.avatar || ''} className="w-24 h-24 rounded-[2rem] border-4 border-white shadow-2xl object-cover" alt="Profile" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-xl shadow-lg border border-gray-100 flex items-center justify-center">
              <ShieldCheck size={16} className="text-emerald-500" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">{userData?.name || 'Anonymous User'}</h3>
            <p className="text-gray-500 text-sm font-medium mt-1">{userData?.niche || 'Global Context Pending'}</p>
            <div className="flex items-center mt-3 gap-2">
              <Activity size={12} className="text-indigo-600" />
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                {userData?.onboardingComplete ? 'Archive Alpha-9 Access' : 'Trial Protocol Level'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden group">
        <div className="px-10 py-8 border-b border-gray-50 group-hover:bg-gray-50/50 transition-colors">
          <div className="flex items-center space-x-3">
            <Activity size={18} className="text-gray-400" />
            <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest leading-none">Deployment Ports</h2>
          </div>
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-2 ml-7">Authorize neural pipelines to distribution hubs.</p>
        </div>
        <div className="divide-y divide-gray-50">
          {PLATFORMS.map((platform) => {
            const Icon = platform.icon;
            const isConnected = userData?.connectedPlatforms?.includes(platform.id);
            return (
              <div key={platform.id} className="px-10 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${isConnected ? 'bg-indigo-600 border-transparent text-white shadow-lg shadow-indigo-100' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-gray-900 uppercase tracking-tight">{platform.name}</h4>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5">
                      {isConnected ? 'Port Authorized' : 'Link Required'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleLink(platform.id)}
                  className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${isConnected ? 'bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-100' : 'bg-gray-900 text-white border-transparent hover:bg-indigo-600 active:scale-95'
                    }`}
                >
                  {isConnected ? 'Revoke Access' : 'Establish Link'}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-[#0A0A0A] rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden group">
        <div className="px-10 py-8 border-b border-white/5 group-hover:bg-white/2 transition-colors">
          <div className="flex items-center space-x-3">
            <Key size={18} className="text-indigo-500" />
            <h2 className="text-sm font-black text-white uppercase tracking-widest leading-none">Neural Configuration</h2>
          </div>
          <p className="text-[10px] text-white/30 font-black uppercase tracking-widest mt-2 ml-7">Manage your Gemini LLM credentials.</p>
        </div>
        <div className="p-10 space-y-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] px-1">Gemini Pro/Flash Matrix Key</label>
              <div className="flex items-center gap-2">
                <ShieldEllipsis size={14} className="text-indigo-400" />
                <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">AES-256 Storage</span>
              </div>
            </div>
            <div className="flex gap-4">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => handleApiKeyChange(e.target.value)}
                placeholder="PROX-XXXXXXXXXXXX-XXXX"
                className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:bg-white/10 focus:border-indigo-500/50 transition-all font-mono text-sm text-white outline-none placeholder:text-white/10"
              />
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-4 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-2xl shadow-white/5"
              >
                Provision
                <ExternalLink size={14} />
              </a>
            </div>
            <p className="text-[9px] text-white/20 mt-4 font-black uppercase tracking-[0.2em] px-1">Credential is anchored to local DOM storage and never transmitted outside this environment.</p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden group">
        <div className="px-10 py-8 border-b border-gray-50 group-hover:bg-gray-50/50 transition-colors">
          <div className="flex items-center space-x-3">
            <CreditCard size={18} className="text-gray-400" />
            <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest leading-none">Financial Ledger</h2>
          </div>
        </div>
        <div className="p-10">
          <div className="flex justify-between items-center bg-gray-50 p-8 rounded-[2rem] border border-gray-100">
            <div>
              <div className="inline-flex items-center px-3 py-1 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest rounded-lg mb-4 shadow-lg shadow-indigo-100">ENTERPRISE CORE</div>
              <p className="text-4xl font-black text-gray-900 tracking-tighter">$49.00 <span className="text-sm text-gray-400 font-bold">/ MONTHLY</span></p>
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-2 font-black">Next Extraction: Aug 12, 2026</p>
            </div>
            <button className="px-8 py-4 bg-white border border-gray-200 rounded-2xl text-[11px] font-black uppercase tracking-widest text-gray-900 hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm">Manage Ledger</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Settings;
