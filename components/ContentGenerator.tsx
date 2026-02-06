
import React, { useState, useEffect } from 'react';
import { generatePostFromIdea } from '../services/geminiService';
import { Platform } from '../types';

interface ContentGeneratorProps {
  initialIdea?: string;
}

const ContentGenerator: React.FC<ContentGeneratorProps> = ({ initialIdea = '' }) => {
  const [idea, setIdea] = useState(initialIdea);
  const [platforms, setPlatforms] = useState<Platform[]>([Platform.INSTAGRAM, Platform.TIKTOK]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    if (initialIdea) {
      setIdea(initialIdea);
    }
  }, [initialIdea]);

  const handleGenerate = async () => {
    if (!idea) return;
    setLoading(true);
    try {
      const adaptations: any = {};
      for (const p of platforms) {
        adaptations[p] = await generatePostFromIdea({ topic: idea }, p);
      }
      setResults(adaptations);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">What's your next viral hit?</h2>
        <p className="text-gray-500 mb-8 max-w-lg mx-auto">Describe your content idea and Virality Studio will adapt it perfectly for all your connected platforms.</p>
        
        <div className="relative mb-6">
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="E.g. 5 myths about protein intake that you should stop believing..."
            className="w-full h-32 px-5 py-4 border-2 border-gray-100 rounded-2xl focus:border-indigo-500 focus:ring-0 transition-all text-lg resize-none"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {[Platform.INSTAGRAM, Platform.TIKTOK, Platform.LINKEDIN, Platform.TWITTER, Platform.FACEBOOK].map((p) => (
            <button
              key={p}
              onClick={() => setPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                platforms.includes(p) 
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' 
                : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-300'
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !idea}
          className="px-10 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-200"
        >
          {loading ? 'AI Adapting Content...' : '✨ Generate Multichannel Posts'}
        </button>
      </div>

      {results && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Object.entries(results).map(([p, content]: [any, any]) => (
            <div key={p} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-gray-900 capitalize">{p}</span>
                  <span className="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded">AUTO-OPTIMIZED</span>
                </div>
                <button className="text-xs font-bold text-indigo-600">Edit Hook</button>
              </div>
              <div className="p-6 space-y-5 flex-grow">
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Optimized Caption</h4>
                  <div className="bg-gray-50 p-4 rounded-xl font-mono text-sm text-gray-700 whitespace-pre-wrap border border-gray-100">
                    {content.caption}
                  </div>
                </div>

                {content.video_script && (
                  <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100">
                    <h4 className="text-xs font-bold text-indigo-700 uppercase tracking-widest mb-3">Short-Form Script</h4>
                    <p className="text-xs font-bold text-indigo-900 mb-1">🪝 Hook:</p>
                    <p className="text-xs text-indigo-800 mb-3 italic">"{content.video_script.hook}"</p>
                    <p className="text-xs font-bold text-indigo-900 mb-1">📝 Body:</p>
                    <ul className="text-[11px] text-indigo-800 space-y-1 list-disc pl-4 mb-3">
                      {content.video_script.body?.map((line: string, idx: number) => <li key={idx}>{line}</li>)}
                    </ul>
                    <p className="text-xs font-bold text-indigo-900 mb-1">📣 CTA:</p>
                    <p className="text-xs text-indigo-800 italic">"{content.video_script.cta}"</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {content.hashtags?.map((tag: string, i: number) => (
                    <span key={i} className="text-indigo-600 text-[11px] font-bold bg-indigo-50 px-2 py-1 rounded">
                      {tag.startsWith('#') ? tag : `#${tag}`}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6 pt-0 border-t border-gray-50 bg-gray-50/30">
                <div className="flex gap-3">
                  <button className="flex-1 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">Schedule Post</button>
                  <button className="px-5 py-3 border border-gray-200 bg-white rounded-xl text-sm font-bold text-gray-600 hover:border-indigo-300">Copy</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentGenerator;
