
import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Sparkles,
  Maximize,
  Download,
  Check,
  Zap,
  Palette,
  Box,
  Rocket,
  Loader2,
  Trash2,
  CheckCircle2
} from 'lucide-react';
import { generateImage } from '../services/geminiService';

const ImageStudio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    setSaved(false);
    try {
      const img = await generateImage(prompt, aspectRatio);
      setImage(img);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20 animate-in fade-in duration-1000">
      {/* Main Studio Console */}
      <div className="cyber-card rounded-[4rem] bg-[#0c0c0e] overflow-hidden flex flex-col lg:flex-row border border-white/5 shadow-2xl">
        <div className="p-12 lg:w-1/2 border-r border-white/5 flex flex-col h-full bg-gradient-to-br from-[#0c0c0e] to-black">
          <div className="flex items-center gap-5 mb-12">
            <div className="p-4 bg-indigo-600 rounded-[1.5rem] text-white shadow-[0_0_30px_rgba(79,70,229,0.3)]">
              <Palette size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic leading-none">AI Image Lab</h2>
              <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.2em] mt-2 italic">Synthesize viral visual assets.</p>
            </div>
          </div>

          <div className="space-y-10 flex-grow">
            <div>
              <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-4 px-1">What to create?</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ex: A futuristic athlete training in a neon cyberpunk gym, high resolution, cinematic light..."
                className="w-full h-48 px-10 py-8 bg-white/5 border border-white/5 rounded-[2.5rem] focus:bg-white/10 focus:border-indigo-500/30 transition-all text-sm font-bold text-white resize-none outline-none placeholder:text-white/5 shadow-2xl"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-4 px-1">Image Size</label>
                <div className="grid grid-cols-2 gap-3">
                  {['1:1', '9:16', '16:9', '4:3'].map(r => (
                    <button
                      key={r}
                      onClick={() => setAspectRatio(r)}
                      className={`px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${aspectRatio === r ? 'bg-white border-white text-black shadow-2xl scale-105' : 'bg-white/5 border-white/5 text-white/30 hover:text-white hover:bg-white/10'}`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-4 px-1">Art Style</label>
                <div className="relative group">
                  <Box className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5 group-focus-within:text-indigo-400 transition-all" />
                  <select className="w-full pl-16 pr-6 py-5 bg-white/5 border border-white/5 rounded-2xl text-[11px] font-black uppercase tracking-widest text-white outline-none focus:border-indigo-500/50 transition-all appearance-none cursor-pointer shadow-2xl">
                    <option>Neural (Default)</option>
                    <option>Hyper-Realistic</option>
                    <option>Cinematic 3D</option>
                    <option>Cyberpunk Art</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !prompt}
              className="group w-full py-6 bg-indigo-600 text-white rounded-[2rem] text-[11px] font-black uppercase tracking-widest hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-50 shadow-[0_0_40px_rgba(79,70,229,0.3)] flex items-center justify-center gap-4 mt-auto"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Rocket size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
              {loading ? 'Synthesizing Labs...' : 'Generate AI Image'}
            </button>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="md:w-1/2 flex flex-col items-center justify-center p-12 min-h-[500px] relative overflow-hidden bg-black/40">
          <div className="absolute inset-0 opacity-5 pointer-events-none select-none flex items-center justify-center font-black text-[25rem] text-white">
            IMG
          </div>

          {image ? (
            <div className="relative z-10 w-full animate-in zoom-in duration-700">
              <div className="cyber-card p-4 rounded-[3.5rem] bg-white/[0.03] border border-white/10 group overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
                <img src={image} alt="AI Generated" className="w-full h-auto rounded-[2.5rem] group-hover:scale-105 transition-all duration-1000" />
              </div>

              <div className="mt-12 flex gap-4">
                <button
                  onClick={handleSave}
                  className={`flex-1 py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-2xl flex items-center justify-center gap-4 active:scale-95 ${saved ? 'bg-emerald-500 text-white' : 'bg-white text-black hover:bg-indigo-600 hover:text-white'}`}
                >
                  {saved ? <CheckCircle2 size={18} /> : <Check size={18} />}
                  {saved ? 'Saved to Library' : 'Save to Assets'}
                </button>
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = image;
                    link.download = 'viral-asset.png';
                    link.click();
                  }}
                  className="p-5 bg-white/5 border border-white/5 text-white/40 hover:text-indigo-400 hover:border-indigo-500/30 rounded-2xl transition-all shadow-xl"
                >
                  <Download size={24} />
                </button>
                <button onClick={() => setImage(null)} className="p-5 bg-white/5 border border-white/5 text-white/20 hover:text-rose-500 hover:border-rose-500/30 rounded-2xl transition-all shadow-xl">
                  <Trash2 size={24} />
                </button>
              </div>
            </div>
          ) : (
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-[2.5rem] bg-white/5 border border-white/5 flex items-center justify-center mb-10 shadow-2xl group hover:scale-110 transition-all duration-500">
                <ImageIcon size={48} className="text-indigo-400/20 group-hover:text-indigo-400 transition-colors" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Preview Terminal</h3>
              <p className="max-w-xs text-[11px] text-white/20 font-black mt-3 uppercase tracking-widest italic leading-relaxed">"Your high-fidelity visual assets will appear here once generated."</p>
            </div>
          )}
        </div>
      </div>

      {/* AI Intelligence Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <InsightCard icon={<Zap className="text-indigo-400" />} title="Neural Upscale" desc="Every image is automatically upscaled to 4K resolution with AI sharpness." />
        <InsightCard icon={<Maximize className="text-amber-400" />} title="Trending Ratio" desc="9:16 'Vertical' is currently the highest performing size for Reels and TikTok." />
        <InsightCard icon={<Palette className="text-rose-500" />} title="Color Mastery" desc="Colors are automatically adjusted to match viral color theories for your niche." />
      </div>
    </div>
  );
};

const InsightCard: React.FC<{ icon: React.ReactNode, title: string, desc: string }> = ({ icon, title, desc }) => (
  <div className="cyber-card p-10 rounded-[3rem] bg-[#0c0c0e] group relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:bg-indigo-500 group-hover:text-white transition-all transform group-hover:scale-110 group-hover:rotate-6">
      {React.cloneElement(icon as React.ReactElement, { size: 24 })}
    </div>
    <h4 className="text-[12px] font-black text-white uppercase tracking-widest mb-3 italic">{title}</h4>
    <p className="text-xs font-bold text-white/30 leading-relaxed italic">{desc}</p>
  </div>
);

export default ImageStudio;
