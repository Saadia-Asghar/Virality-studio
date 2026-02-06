
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="h-16 bg-indigo-700 border-b border-indigo-800 flex items-center justify-between px-6 fixed top-0 w-full z-50">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
          <span className="text-xl">🚀</span>
        </div>
        <span className="text-white font-extrabold text-xl tracking-tight">Virality Studio</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center bg-indigo-600 rounded-full px-4 py-1.5 border border-indigo-500">
          <span className="text-[10px] font-bold text-indigo-100 uppercase tracking-widest mr-2">Status</span>
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse mr-2"></div>
          <span className="text-xs font-semibold text-white">Systems Active</span>
        </div>
        
        <button className="p-2 text-indigo-100 hover:text-white transition-colors relative">
          <span className="text-xl">🔔</span>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-indigo-700"></span>
        </button>
        
        <div className="h-8 w-px bg-indigo-500 mx-2"></div>
        
        <button className="bg-white text-indigo-700 px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-indigo-50 transition-colors">
          Connect Platform
        </button>
      </div>
    </header>
  );
};

export default Header;
