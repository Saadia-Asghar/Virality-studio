
import React, { useState } from 'react';
import { reviewExternalPost } from '../services/geminiService';

const ExtensionReview: React.FC = () => {
  const [content, setContent] = useState('');
  const [platform, setPlatform] = useState('Instagram');
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!content) return;
    setLoading(true);
    try {
      const result = await reviewExternalPost(content, platform);
      setReview(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-0 opacity-50"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-indigo-200">🔍</div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Post Reviewer Lab</h2>
              <p className="text-sm text-gray-500 italic">"Simulating the Virality Studio Chrome Extension"</p>
            </div>
          </div>

          <p className="text-gray-600 mb-6">
            Paste content from a post you found on social media to see how it ranks in our virality engine and get improvement tips.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="md:col-span-3">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste post caption or script here..."
                className="w-full h-32 p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none resize-none"
              />
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Platform</label>
                <select 
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold outline-none"
                >
                  <option>Instagram</option>
                  <option>TikTok</option>
                  <option>LinkedIn</option>
                  <option>Twitter</option>
                </select>
              </div>
              <button
                onClick={handleAnalyze}
                disabled={loading || !content}
                className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-700 disabled:opacity-50 transition-all"
              >
                {loading ? 'Analyzing...' : 'Analyze Post'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {review && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 fade-in duration-500">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
            <div className="relative w-32 h-32 mb-4">
               <svg className="w-full h-full transform -rotate-90">
                 <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-100" />
                 <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
                    className="text-indigo-600 transition-all duration-1000"
                    strokeDasharray={364}
                    strokeDashoffset={364 - (364 * review.viralityScore) / 100}
                 />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="text-3xl font-black text-gray-900">{review.viralityScore}</span>
                 <span className="text-[10px] font-bold text-gray-400 uppercase">Virality</span>
               </div>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Overall Verdict</h3>
            <p className="text-xs text-gray-500 leading-relaxed italic">"{review.verdict}"</p>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
               <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                 <span className="mr-2">✨</span> Better Hook Suggestion
               </h3>
               <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 text-sm font-medium text-indigo-900">
                 {review.hookImprovement}
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-6 rounded-3xl border border-green-100">
                <h4 className="text-xs font-bold text-green-700 uppercase mb-3">Strengths</h4>
                <ul className="space-y-2">
                  {review.strengths.map((s: string, i: number) => (
                    <li key={i} className="text-xs text-green-800 flex items-start">
                      <span className="mr-2">✅</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 p-6 rounded-3xl border border-red-100">
                <h4 className="text-xs font-bold text-red-700 uppercase mb-3">Weaknesses</h4>
                <ul className="space-y-2">
                  {review.weaknesses.map((w: string, i: number) => (
                    <li key={i} className="text-xs text-red-800 flex items-start">
                      <span className="mr-2">⚠️</span> {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExtensionReview;
