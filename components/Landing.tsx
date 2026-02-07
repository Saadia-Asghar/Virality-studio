import React, { useState } from 'react';
import { ArrowRight, Zap, TrendingUp, Search, ShieldCheck, Sparkles, Rocket, ChevronRight, Check, Database, Globe, Instagram, Music2, Youtube, Linkedin, Facebook, Twitter, Image as ImageIcon, Flame, Calendar } from 'lucide-react';
import QuickGenerator from './QuickGenerator';
import { useAuth } from '../contexts/AuthContext';

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  const { signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      onStart();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden font-sans">
      {/* Premium Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="nebula-glow top-0 left-1/4 bg-indigo-600/10"></div>
        <div className="nebula-glow bottom-0 right-1/4 bg-purple-600/10" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      {/* Modern Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-2xl border-b border-white/5 h-24 flex items-center">
        <div className="max-w-7xl mx-auto px-10 w-full flex items-center justify-between">
          <div className="flex items-center space-x-6 group cursor-pointer">
            <div className="w-12 h-12 bg-white text-black rounded-2xl flex items-center justify-center shadow-[0_10px_30px_rgba(255,255,255,0.2)] group-hover:scale-110 transition-transform duration-500">
              <TrendingUp className="w-6 h-6 border-white" strokeWidth={3} />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter uppercase leading-none italic">VIRALITY</span>
              <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mt-1">v3.0 Gemini AI</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-12">
            <div className="flex items-center space-x-10 text-[11px] font-black uppercase tracking-[0.3em] text-white/30">
              <a href="#how-it-works" className="hover:text-white transition-colors cursor-pointer">Strategy</a>
              <a href="#features" className="hover:text-white transition-colors cursor-pointer">AI Nodes</a>
              <a href="#platforms" className="hover:text-white transition-colors cursor-pointer">Distribution</a>
            </div>
            <div className="w-px h-6 bg-white/10 mx-6"></div>
            <button
              onClick={handleLogin}
              disabled={loading}
              className="group px-10 py-4 bg-white text-black rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all hover:bg-indigo-600 hover:text-white flex items-center gap-4 active:scale-95 shadow-2xl"
            >
              {loading ? 'Entering...' : 'Launch App'}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </nav>

      {/* Cinematic Hero */}
      <section className="relative pt-64 pb-48 px-6 text-center">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="inline-flex items-center space-x-4 bg-indigo-500/10 px-6 py-2.5 rounded-full mb-12 border border-indigo-500/20 animate-fade-in backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-300">Powered by Gemini 2.0 Flash AI</span>
          </div>

          <h1 className="text-7xl md:text-[140px] font-black tracking-tighter leading-[0.85] mb-16 uppercase text-gradient-indigo italic">
            Get More <br />
            <span className="text-white">Views</span> <br />
            <span className="text-indigo-400">Fast.</span>
          </h1>

          <p className="max-w-3xl mx-auto text-xl md:text-3xl text-white/40 mb-20 leading-relaxed font-medium italic">
            "AI writes your posts. You pick the best ones. Post to all your social apps at once."
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full sm:w-auto px-16 py-8 bg-indigo-600 text-white rounded-[2.5rem] text-xl font-black shadow-[0_20px_60px_rgba(79,70,229,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-5 uppercase tracking-widest"
            >
              {loading ? 'Initializing...' : 'Get Started Free'}
              <Rocket size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-16 py-8 bg-white/5 text-white border border-white/10 rounded-[2.5rem] text-xl font-black hover:bg-white/10 transition-all flex items-center justify-center gap-5 backdrop-blur-xl uppercase tracking-widest italic group">
              View Strategy
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Dynamic Floaties - Deep Space feel */}
        <div className="hidden xl:block absolute top-[40%] left-[8%] rotate-[-15deg] animate-float opacity-40">
          <div className="cyber-card p-10 rounded-[3.5rem] bg-[#0c0c0e]/80 border-indigo-500/30 shadow-2xl backdrop-blur-3xl">
            <div className="flex items-center gap-6 mb-8 text-indigo-400">
              <TrendingUp size={32} />
              <p className="text-4xl font-black">+412%</p>
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-white/60">Growth Locked</p>
          </div>
        </div>

        <div className="hidden xl:block absolute top-[50%] right-[8%] rotate-[10deg] animate-float opacity-40" style={{ animationDelay: '1.5s' }}>
          <div className="cyber-card p-10 rounded-[3.5rem] bg-[#0c0c0e]/80 border-rose-500/30 shadow-2xl backdrop-blur-3xl">
            <div className="flex items-center gap-6 mb-8 text-rose-500">
              <Zap size={32} fill="currentColor" />
              <p className="text-4xl font-black uppercase italic">Live</p>
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-white/60">AI Ready</p>
          </div>
        </div>
      </section>

      {/* Instant Demo Section */}
      <section className="relative py-32 bg-[#0c0c0e] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-12">
          <QuickGenerator />
        </div>
      </section>

      {/* How it Works - Simplified */}
      <section id="how-it-works" className="relative py-32 bg-black">
        <div className="max-w-7xl mx-auto px-12 text-center">
          <div className="inline-flex items-center gap-4 text-indigo-400/40 uppercase text-xs font-bold tracking-wider mb-8">
            <div className="w-12 h-px bg-indigo-500/30"></div>
            How It Works
            <div className="w-12 h-px bg-indigo-500/30"></div>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-16 tracking-tighter uppercase italic leading-none">How It <span className="text-indigo-600">Works</span></h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
            <StepCard num="01" title="Find Trends" desc="We find what's going viral in your niche right now." icon={<Search size={40} />} color="bg-indigo-600" />
            <StepCard num="02" title="AI Writes" desc="AI creates your posts, captions, and video scripts instantly." icon={<Zap size={40} />} color="bg-purple-600" />
            <StepCard num="03" title="Post It" desc="Share to all your social apps with one click." icon={<Globe size={40} />} color="bg-emerald-600" />
          </div>
        </div>
      </section>

      {/* Target Audience & Platforms */}
      <section id="features" className="relative py-56 border-y border-white/5 bg-gradient-to-b from-black to-[#0c0c0e]">
        <div className="max-w-7xl mx-auto px-12">
          <div className="flex flex-col lg:flex-row items-center gap-32 mb-40">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-6xl md:text-8xl font-black mb-12 tracking-tighter uppercase italic leading-[0.85]">For Anyone Who <br /> Wants <span className="text-indigo-400">Views.</span></h2>
              <p className="text-white/40 text-2xl font-medium leading-relaxed italic max-w-2xl mx-auto lg:mx-0">
                "Stop guessing what to post. Let AI create content that people want to share."
              </p>

              <div className="mt-16 flex flex-wrap justify-center lg:justify-start gap-4">
                {['Solo Creator', 'Ecom Brands', 'Agency Owners', 'Coaches'].map(t => (
                  <div key={t} className="px-6 py-3 bg-white/5 rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-3">
                    <Check size={14} className="text-emerald-400" />
                    {t}
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-1/3 grid grid-cols-2 gap-6" id="platforms">
              <PlatformBox icon={<Instagram />} label="Instagram" color="bg-rose-500" />
              <PlatformBox icon={<Music2 />} label="TikTok" color="bg-cyan-500" />
              <PlatformBox icon={<Youtube />} label="YouTube" color="bg-red-500" />
              <PlatformBox icon={<Linkedin />} label="LinkedIn" color="bg-blue-600" />
              <PlatformBox icon={<Facebook />} label="Facebook" color="bg-blue-500" />
              <PlatformBox icon={<Twitter />} label="X / Twitter" color="bg-white/10" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <FeatureCard title="Viral Hook Library" desc="Get access to high-retention hooks that stop the scroll instantly." icon={<Flame size={32} />} />
            <FeatureCard title="AI Image Studio" desc="Generate premium 4K visuals for your posts without hiring a designer." icon={<ImageIcon size={32} />} />
            <FeatureCard title="Smart Post Scheduler" desc="Always post at the perfect time when your audience is most active." icon={<Calendar size={32} />} />
          </div>
        </div>
      </section>

      {/* Secure Database CTA */}
      <section className="py-56 bg-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-5xl mx-auto px-12 text-center text-black relative z-10">
          <div className="inline-flex items-center gap-4 bg-black p-10 rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.3)] group-hover:scale-105 transition-transform duration-700 mb-16">
            <Database size={64} className="text-white" />
          </div>
          <h2 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none mb-12 italic">Secure. <br /> Private. <br /> Yours.</h2>
          <p className="text-2xl font-bold italic leading-relaxed max-w-2xl mx-auto mb-20 text-black/50">
            "Your ideas and growth stats are stored in your own secure database. Built with high-security Firebase protocols."
          </p>
          <button
            onClick={handleLogin}
            className="px-16 py-8 bg-black text-white rounded-[2.5rem] text-xl font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-5 mx-auto"
          >
            Join the Elite
            <Sparkles size={24} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-[#0c0c0e] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-12">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12 mb-12">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center space-x-4 mb-4 hover:scale-105 transition-transform cursor-pointer">
                <div className="w-12 h-12 bg-white text-black rounded-2xl flex items-center justify-center shadow-xl">
                  <TrendingUp size={24} strokeWidth={3} />
                </div>
                <span className="text-2xl font-black tracking-widest uppercase text-white">Virality</span>
              </div>
              <p className="text-xs font-bold text-white/40 uppercase tracking-wider text-center md:text-left">Powered by AI</p>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
              {['About', 'Security', 'Privacy', 'Contact'].map(l => (
                <a key={l} href="#" className="text-sm font-bold uppercase tracking-wider text-white/60 hover:text-white transition-colors">{l}</a>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-center">
            <p className="text-sm font-bold text-white/50">© 2026 Virality Studio. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const StepCard = ({ num, title, desc, icon, color }: any) => (
  <div className="flex flex-col items-center text-center group">
    <div className={`w-28 h-28 ${color} rounded-[2.5rem] flex items-center justify-center text-white mb-10 shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
      {icon}
    </div>
    <span className="text-indigo-400/30 text-5xl font-black mb-4 tracking-tighter">{num}</span>
    <h3 className="text-3xl font-black text-white mb-6 uppercase italic italic">{title}</h3>
    <p className="text-lg text-white/30 font-bold leading-relaxed italic">"{desc}"</p>
  </div>
);

const PlatformBox = ({ icon, label, color }: any) => (
  <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 flex flex-col items-center text-center group cursor-pointer hover:bg-white/5 transition-all duration-500">
    <div className={`p-4 rounded-2xl ${color} text-white mb-4 group-hover:scale-110 transition-transform shadow-2xl`}>
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <span className="text-[11px] font-black uppercase tracking-widest text-white/20 group-hover:text-white transition-colors">{label}</span>
  </div>
);

const FeatureCard = ({ title, desc, icon }: any) => (
  <div className="cyber-card p-12 rounded-[4rem] bg-[#0c0c0e] hover:border-indigo-500/30 transition-all duration-700 group relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all"></div>
    <div className="w-16 h-16 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center text-white/30 mb-10 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110 transition-all duration-500">
      {icon}
    </div>
    <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tight italic leading-none">{title}</h3>
    <p className="text-sm text-white/30 font-bold leading-relaxed italic">"{desc}"</p>
  </div>
);

export default Landing;
