
import React from 'react';
import { Bell, TrendingUp, ShieldCheck, Plus, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { userData, signOut } = useAuth();

  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 fixed top-0 w-full z-50 selection:bg-indigo-50 selection:text-indigo-600">
      <div className="flex items-center space-x-3 group cursor-pointer">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform">
          <TrendingUp className="text-white w-6 h-6" />
        </div>
        <span className="text-xl font-black text-gray-900 tracking-tighter uppercase">TRENDING</span>
      </div>

      <div className="flex items-center space-x-6">
        <div className="hidden md:flex items-center bg-gray-50 rounded-full px-5 py-2 border border-gray-100 group cursor-default">
          <div className="flex items-center mr-4">
            <ShieldCheck size={14} className="text-emerald-500 mr-2" />
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Security Masking</span>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2"></div>
          <span className="text-[11px] font-black text-gray-900 uppercase tracking-tight">Active</span>
        </div>

        <div className="h-8 w-px bg-gray-100"></div>

        <button className="p-2.5 text-gray-400 hover:text-indigo-600 transition-all relative group bg-gray-50 rounded-xl">
          <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-4 ml-2">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-[11px] font-black text-gray-900 uppercase tracking-tight">{userData?.name}</span>
            <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">Enterprise node</span>
          </div>
          <button onClick={() => signOut()} className="p-2.5 text-gray-400 hover:text-rose-600 transition-all bg-gray-50 rounded-xl group" title="Logout">
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
