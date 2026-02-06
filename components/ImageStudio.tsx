
import React, { useState } from 'react';
import { generateImage } from '../services/geminiService';

const ImageStudio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const img = await generateImage(prompt, aspectRatio);
      setImage(img);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Nano Banana Image Studio</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Detailed Visual Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe exactly what you want to see. Style, colors, mood..."
                className="w-full h-24 px-4 py-3 border border-gray-200 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Aspect Ratio</label>
                <div className="flex gap-2">
                  {['1:1', '9:16', '16:9', '4:3'].map(r => (
                    <button
                      key={r}
                      onClick={() => setAspectRatio(r)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                        aspectRatio === r ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-gray-200 text-gray-600'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Style Preset</label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600">
                  <option>Match My Brand (Recommended)</option>
                  <option>Hyper Realistic</option>
                  <option>Minimalist Graphic</option>
                  <option>Vibrant 3D</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !prompt}
              className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all disabled:opacity-50"
            >
              {loading ? 'Generating Viral Imagery...' : '✨ Generate Image'}
            </button>
          </div>
        </div>

        {image && (
          <div className="bg-gray-50 border-t border-gray-200 p-8 flex flex-col items-center">
            <div className="bg-white p-2 rounded-2xl shadow-lg border border-gray-200 max-w-lg overflow-hidden">
              <img src={image} alt="AI Generated" className="w-full h-auto rounded-xl" />
            </div>
            <div className="mt-6 flex gap-4">
              <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-md">Use in Post</button>
              <button onClick={() => {
                const link = document.createElement('a');
                link.href = image;
                link.download = 'virality-studio-gen.png';
                link.click();
              }} className="px-6 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg text-sm font-bold">Download</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageStudio;
