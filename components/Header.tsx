
import React from 'react';
import { Bell, TrendingUp, ShieldCheck, LogOut, Search, Info, HelpCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { userData, signOut } = useAuth();

  return (
    <header className="h-24 bg-[#050505]/80 backdrop-blur-2xl border-b border-white/5 flex items-center justify-between px-12 fixed top-0 right-0 left-72 z-40 transition-all duration-500">
      <div className="flex items-center space-x-12">
        <div className="hidden lg:flex items-center relative group">
          <Search size={16} className="absolute left-5 text-white/20 group-focus-within:text-indigo-400 transition-colors" />
          <input
            type="text"
            placeholder="Search for ideas..."
            className="bg-white/5 border border-white/5 rounded-2xl pl-14 pr-6 py-3.5 text-xs text-white outline-none focus:bg-white/10 focus:border-indigo-500/30 transition-all w-96 font-black tracking-widest uppercase placeholder:text-white/10 shadow-2xl"
          />
        </div>
      </div>

      <div className="flex items-center space-x-8">
        {/* Connection Status */}
        <div className="hidden md:flex items-center bg-white/5 rounded-2xl px-6 py-3 border border-white/5 group cursor-default shadow-xl">
          <div className="flex items-center mr-6">
            <ShieldCheck size={14} className="text-emerald-400 mr-3" />
            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] leading-none">Database Synced</span>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
        </div>

        <div className="h-10 w-px bg-white/5"></div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button className="p-3.5 text-white/20 hover:text-indigo-400 transition-all relative group bg-white/5 rounded-2xl border border-white/5 hover:border-indigo-500/30 hover:bg-white/10 shadow-xl">
            <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#050505]"></span>
          </button>

          <button className="p-3.5 text-white/20 hover:text-amber-400 transition-all group bg-white/5 rounded-2xl border border-white/5 hover:border-amber-500/30 hover:bg-white/10 shadow-xl">
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-6 pl-4 border-l border-white/5">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-[12px] font-black text-white tracking-tighter leading-none mb-1.5 uppercase italic">{userData?.name || 'User'}</span>
            <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">Pro Member</span>
          </div>

          <div className="relative group">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-indigo-500 transition-all duration-500 cursor-pointer shadow-2xl p-1 bg-white/5">
              <img src={userData?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop'} alt="Avatar" className="w-full h-full object-cover rounded-xl" />
            </div>

            {/* Dropdown */}
            <div className="absolute top-full right-0 mt-4 w-56 py-3 bg-[#0c0c0e] rounded-[2rem] border border-white/5 shadow-[0_25px_50px_rgba(0,0,0,1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 translate-y-2 group-hover:translate-y-0 z-50">
              <div className="px-6 py-4 border-b border-white/5 mb-2">
                <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Account Status</p>
                <p className="text-[11px] font-black text-white uppercase tracking-widest mt-1">Verified Beta</p>
              </div>
              <button onClick={() => signOut()} className="w-full flex items-center justify-between px-6 py-4 text-[11px] font-black uppercase tracking-widest text-rose-500 hover:bg-white/5 transition-colors group/logout">
                Sign Out
                <LogOut size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
