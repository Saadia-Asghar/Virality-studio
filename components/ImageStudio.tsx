
import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Sparkles,
  Maximize,
  Download,
  Check,
  Zap,
  Palette,
  Box
} from 'lucide-react';
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
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-700">
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row">
        <div className="p-10 md:w-1/2 border-r border-gray-50">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-indigo-600 rounded-xl text-white">
              <Palette size={20} />
            </div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tighter uppercase tracking-[0.05em]">Visual Engine</h2>
          </div>

          <div className="space-y-8">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Neural Visual Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="High-contrast, cinematic lighting, 8k resolution, photorealistic athlete in dark gym..."
                className="w-full h-40 px-6 py-5 bg-gray-50 border border-gray-100 rounded-3xl focus:bg-white focus:border-indigo-500/30 focus:ring-4 focus:ring-indigo-500/5 transition-all text-sm font-semibold resize-none outline-none placeholder:text-gray-300"
              />
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Geometry</label>
                <div className="flex flex-wrap gap-2">
                  {['1:1', '9:16', '16:9', '4:3'].map(r => (
                    <button
                      key={r}
                      onClick={() => setAspectRatio(r)}
                      className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${aspectRatio === r ? 'bg-gray-900 border-transparent text-white shadow-xl' : 'bg-white border-gray-100 text-gray-400 hover:border-indigo-200'
                        }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Style Matrix</label>
                <div className="relative">
                  <Box className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-[11px] font-black uppercase tracking-widest outline-none focus:border-indigo-500/30 transition-all appearance-none cursor-pointer">
                    <option>Neural Precision (Default)</option>
                    <option>Hyper-Realistic Proxy</option>
                    <option>Monochrome Abstract</option>
                    <option>Vibrant 3D Octane</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !prompt}
              className="group w-full py-5 bg-indigo-600 text-white rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-50 shadow-2xl shadow-indigo-100 flex items-center justify-center gap-4"
            >
              {loading ? (
                <>
                  Processing Neural Layers
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                </>
              ) : (
                <>
                  Synthesize Visual
                  <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-gray-50 md:w-1/2 flex flex-col items-center justify-center p-10 min-h-[400px] relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none select-none flex items-center justify-center font-black text-[20rem] text-dark">
            IMG
          </div>
          {image ? (
            <div className="relative z-10 w-full animate-in zoom-in duration-500">
              <div className="bg-white p-3 rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] border border-gray-100 overflow-hidden group">
                <img src={image} alt="AI Generated" className="w-full h-auto rounded-[2rem] group-hover:scale-[1.02] transition-transform duration-700" />
              </div>
              <div className="mt-10 flex gap-4">
                <button className="flex-1 py-4 bg-gray-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl hover:bg-indigo-600 transition-all flex items-center justify-center gap-3">
                  <Check size={16} />
                  Deploy to Hub
                </button>
                <button onClick={() => {
                  const link = document.createElement('a');
                  link.href = image;
                  link.download = 'virality-studio-gen.png';
                  link.click();
                }} className="p-4 border border-gray-200 bg-white text-gray-400 hover:text-indigo-600 hover:border-indigo-100 rounded-2xl transition-all">
                  <Download size={20} />
                </button>
              </div>
            </div>
          ) : (
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-[2.5rem] bg-indigo-50 flex items-center justify-center mb-6">
                <ImageIcon size={40} className="text-indigo-200" />
              </div>
              <h3 className="text-lg font-black text-gray-900 uppercase tracking-widest">Awaiting Command</h3>
              <p className="max-w-[200px] text-[11px] text-gray-400 font-bold mt-2 uppercase tracking-widest">Synthesize your first asset to populate the preview terminal.</p>
            </div>
          )}
        </div>
      </div>

      {/* Insight Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 bg-gray-900 text-white rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
          <Zap className="text-indigo-400 mb-4 transition-transform group-hover:scale-125" />
          <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 mb-2">Neural Sharpness</h4>
          <p className="text-sm font-bold">Automatic 4x upscaling and frequency-domain noise reduction applied to all assets.</p>
        </div>
        <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm group">
          <Maximize className="text-indigo-600 mb-4 transition-transform group-hover:scale-125" />
          <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Geometry Lock</h4>
          <p className="text-sm font-bold text-gray-900 italic">"9:16 Vertical" is currently trending in your niche for Reels distribution.</p>
        </div>
        <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm group">
          <Palette className="text-rose-500 mb-4 transition-transform group-hover:scale-125" />
          <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Chrominance Map</h4>
          <p className="text-sm font-bold text-gray-900">Brand compliance engines are active. Colors will be normalized during synthesis.</p>
        </div>
      </div>
    </div>
  );
};

export default ImageStudio;
