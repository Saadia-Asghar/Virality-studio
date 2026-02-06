
import React, { useState, useEffect } from 'react';
import { fetchViralTrends } from '../services/geminiService';

const TrendsExplorer: React.FC = () => {
  const [trends, setTrends] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [niche, setNiche] = useState('Fitness & Wellness');

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await fetchViralTrends(niche);
      setTrends(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-indigo-700 to-violet-800 p-8 rounded-3xl text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold mb-2">Trend Scanning Engine</h2>
          <p className="text-indigo-100 mb-6 max-w-md">Scanning live platform data to find the hooks and topics that are currently going viral.</p>
          <div className="flex gap-2 max-w-md">
            <input 
              type="text" 
              value={niche} 
              onChange={(e) => setNiche(e.target.value)}
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-white/30"
              placeholder="Enter your niche..."
            />
            <button 
              onClick={handleSearch}
              className="bg-white text-indigo-700 px-6 py-2 rounded-xl font-bold hover:bg-indigo-50 transition-all"
            >
              Scan
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
          <span className="text-9xl">🔥</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          [1, 2, 3, 4].map(i => <div key={i} className="h-40 bg-gray-100 animate-pulse rounded-2xl"></div>)
        ) : (
          trends.map((trend, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${trend.urgency === 'hot' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                  {trend.urgency} trend
                </span>
                <span className="text-xs font-bold text-gray-400">Match: {trend.relevance}%</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{trend.name}</h3>
              <p className="text-sm text-gray-500 mb-4 flex-grow">{trend.suggestion}</p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                <span className="text-xs text-indigo-600 font-bold">Est. Reach: {trend.reach}</span>
                <button className="text-xs font-bold text-gray-900 hover:text-indigo-600 underline">Create Content &rarr;</button>
              </div>
            </div>
          ))
        )}
      </div>

      {!loading && (
        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 flex items-center space-x-6">
          <div className="text-4xl">💡</div>
          <div>
            <h4 className="font-bold text-indigo-900">Pro Tip: Micro-Trends</h4>
            <p className="text-sm text-indigo-700">Trends in "{niche}" usually peak on Tuesday mornings. Start preparing your reels 48 hours in advance for maximum algorithm lift.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendsExplorer;
