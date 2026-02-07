import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { TrendingUp, Sparkles, Rocket, ChevronRight, Search, Zap, Globe, Instagram, Music2, Youtube, Linkedin, Facebook, Twitter, ImageIcon, Flame, Calendar, Check } from 'lucide-react';
import QuickGenerator from './QuickGenerator';

const Landing: React.FC = () => {
  const { signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-12 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-4 group cursor-pointer">
            <div className="w-12 h-12 bg-white text-black rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
              <TrendingUp size={24} strokeWidth={3} />
            </div>
            <span className="text-2xl font-black tracking-widest uppercase">Virality</span>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-sm font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Get Started Free'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-40 px-6 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 rounded-full border border-white/10 mb-12 backdrop-blur-xl">
            <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-300">Powered by Gemini 2.0 Flash AI</span>
          </div>

          <h1 className="text-7xl md:text-[140px] font-black tracking-tighter leading-[0.85] mb-16 uppercase italic">
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Create</span> <br />
            <span className="text-white">Viral Content</span> <br />
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">In Seconds</span>
          </h1>

          <p className="max-w-3xl mx-auto text-xl md:text-3xl text-white/50 mb-20 leading-relaxed font-medium">
            AI writes engaging posts for you. Pick what you love. Share everywhere with one click. It's that simple.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <button
              onClick={handleLogin}
              disabled={loading}
              className="group w-full sm:w-auto px-16 py-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-[2.5rem] text-xl font-black shadow-[0_20px_60px_rgba(79,70,229,0.4)] hover:shadow-[0_20px_80px_rgba(79,70,229,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-5 uppercase tracking-widest"
            >
              {loading ? 'Initializing...' : 'Start Creating Free'}
              <Rocket size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-16 py-8 bg-white/[0.03] text-white border border-white/10 rounded-[2.5rem] text-xl font-black hover:bg-white/[0.08] hover:border-white/20 transition-all flex items-center justify-center gap-5 backdrop-blur-xl uppercase tracking-widest group">
              Explore Features
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

      {/* What You Get - Benefits Section */}
      <section className="relative py-32 bg-black">
        <div className="max-w-7xl mx-auto px-12">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-4 text-indigo-400/40 uppercase text-xs font-bold tracking-wider mb-8">
              <div className="w-12 h-px bg-indigo-500/30"></div>
              What You Get
              <div className="w-12 h-px bg-indigo-500/30"></div>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase italic leading-none">
              Everything You Need <br />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">To Go Viral</span>
            </h2>
            <p className="text-white/50 text-xl max-w-2xl mx-auto">
              Stop juggling multiple tools. Get everything in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Benefit Card 1 */}
            <div className="group bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-8 rounded-3xl border border-white/10 hover:border-indigo-500/30 transition-all hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap size={28} className="text-white" fill="currentColor" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight">AI Content Writer</h3>
              <p className="text-white/60 text-base leading-relaxed mb-4">
                Type your idea, get 10+ post variations instantly. Captions, hashtags, and hooks included.
              </p>
              <ul className="space-y-2 text-sm text-white/50">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-400" />
                  <span>Works for all platforms</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-400" />
                  <span>Unlimited generations</span>
                </li>
              </ul>
            </div>

            {/* Benefit Card 2 */}
            <div className="group bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-8 rounded-3xl border border-white/10 hover:border-purple-500/30 transition-all hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight">Trend Finder</h3>
              <p className="text-white/60 text-base leading-relaxed mb-4">
                Discover what's trending in your niche before everyone else. Stay ahead of the curve.
              </p>
              <ul className="space-y-2 text-sm text-white/50">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-400" />
                  <span>Real-time trend alerts</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-400" />
                  <span>Competitor analysis</span>
                </li>
              </ul>
            </div>

            {/* Benefit Card 3 */}
            <div className="group bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-8 rounded-3xl border border-white/10 hover:border-emerald-500/30 transition-all hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight">Multi-Platform Posting</h3>
              <p className="text-white/60 text-base leading-relaxed mb-4">
                Write once, post everywhere. Instagram, TikTok, LinkedIn, Twitter, YouTube - all at once.
              </p>
              <ul className="space-y-2 text-sm text-white/50">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-400" />
                  <span>6 platforms supported</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-400" />
                  <span>Schedule in advance</span>
                </li>
              </ul>
            </div>

            {/* Benefit Card 4 */}
            <div className="group bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-8 rounded-3xl border border-white/10 hover:border-rose-500/30 transition-all hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ImageIcon size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight">AI Image Generator</h3>
              <p className="text-white/60 text-base leading-relaxed mb-4">
                Create eye-catching visuals for your posts. No Photoshop, no designer needed.
              </p>
              <ul className="space-y-2 text-sm text-white/50">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-400" />
                  <span>High-quality images</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-400" />
                  <span>Custom styles</span>
                </li>
              </ul>
            </div>

            {/* Benefit Card 5 */}
            <div className="group bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-8 rounded-3xl border border-white/10 hover:border-blue-500/30 transition-all hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Calendar size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight">Smart Scheduler</h3>
              <p className="text-white/60 text-base leading-relaxed mb-4">
                Post at the perfect time, every time. Our AI knows when your audience is most active.
              </p>
              <ul className="space-y-2 text-sm text-white/50">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-400" />
                  <span>Best time suggestions</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-400" />
                  <span>Bulk scheduling</span>
                </li>
              </ul>
            </div>

            {/* Benefit Card 6 */}
            <div className="group bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-8 rounded-3xl border border-white/10 hover:border-amber-500/30 transition-all hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sparkles size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight">Performance Analytics</h3>
              <p className="text-white/60 text-base leading-relaxed mb-4">
                See what works and what doesn't. Get insights to improve your content strategy.
              </p>
              <ul className="space-y-2 text-sm text-white/50">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-400" />
                  <span>Engagement tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-400" />
                  <span>Growth metrics</span>
                </li>
              </ul>
            </div>
          </div>
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
            <StepCard num="01" title="Discover Trends" desc="Identify what's resonating with your audience right now." icon={<Search size={40} />} color="bg-indigo-600" />
            <StepCard num="02" title="AI Creation" desc="Generate polished posts, captions, and scripts instantly." icon={<Zap size={40} />} color="bg-purple-600" />
            <StepCard num="03" title="Multi-Platform" desc="Publish to all your channels with a single action." icon={<Globe size={40} />} color="bg-emerald-600" />
          </div>
        </div>
      </section>

      {/* Target Audience & Platforms */}
      <section id="features" className="relative py-56 border-y border-white/5 bg-gradient-to-b from-black to-[#0c0c0e]">
        <div className="max-w-7xl mx-auto px-12">
          <div className="flex flex-col lg:flex-row items-center gap-32 mb-40">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-6xl md:text-8xl font-black mb-12 tracking-tighter uppercase italic leading-[0.85]">Made For <br /> Busy <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Creators</span></h2>
              <p className="text-white/50 text-2xl font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                No more writer's block. No more spending hours on content. Just great posts, ready to share.
              </p>

              <div className="mt-16 flex flex-wrap justify-center lg:justify-start gap-4">
                {['Solo Creator', 'Ecom Brands', 'Agency Owners', 'Coaches'].map(t => (
                  <div key={t} className="px-6 py-3 bg-white/5 rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-3">
                    <Check size={14} className="text-indigo-400" />
                    {t}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-6">
              <PlatformBox icon={<Instagram />} label="Instagram" color="bg-gradient-to-br from-purple-500 to-pink-500" />
              <PlatformBox icon={<Music2 />} label="TikTok" color="bg-cyan-500" />
              <PlatformBox icon={<Youtube />} label="YouTube" color="bg-red-500" />
              <PlatformBox icon={<Linkedin />} label="LinkedIn" color="bg-blue-600" />
              <PlatformBox icon={<Facebook />} label="Facebook" color="bg-blue-500" />
              <PlatformBox icon={<Twitter />} label="X / Twitter" color="bg-white/10" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <FeatureCard title="Trending Topics" desc="See what's going viral right now in your niche. Never run out of content ideas." icon={<Flame size={32} />} />
            <FeatureCard title="AI Image Creator" desc="Get beautiful images for your posts. No design skills needed." icon={<ImageIcon size={32} />} />
            <FeatureCard title="Auto Scheduler" desc="Post when your followers are online. Set it and forget it." icon={<Calendar size={32} />} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-56 bg-gradient-to-b from-[#0c0c0e] to-black overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.15),transparent_70%)]"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-12">
          <h2 className="text-6xl md:text-8xl font-black mb-12 tracking-tighter uppercase italic leading-none">
            Ready to <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Go Viral?</span>
          </h2>
          <p className="text-white/40 text-2xl mb-16 font-medium italic">Join thousands of creators who are already winning with AI.</p>
          <button
            onClick={handleLogin}
            disabled={loading}
            className="px-20 py-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-[3rem] text-2xl font-black shadow-[0_30px_80px_rgba(99,102,241,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-6 mx-auto uppercase tracking-widest"
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
    <div className={`relative w-28 h-28 ${color} rounded-[2.5rem] flex items-center justify-center text-white mb-10 shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative z-10">{icon}</div>
    </div>
    <span className="text-indigo-400/40 text-4xl font-black mb-4 tracking-tighter">{num}</span>
    <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tight">{title}</h3>
    <p className="text-lg text-white/50 font-medium leading-relaxed max-w-xs">{desc}</p>
  </div>
);

const PlatformBox = ({ icon, label, color }: any) => (
  <div className={`${color} p-8 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 hover:scale-105 transition-all cursor-pointer shadow-2xl group`}>
    <div className="text-white group-hover:scale-110 transition-transform">{icon}</div>
    <span className="text-sm font-black uppercase tracking-widest text-white">{label}</span>
  </div>
);

const FeatureCard = ({ title, desc, icon }: any) => (
  <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 hover:border-indigo-500/30 transition-all group hover:scale-105">
    <div className="text-indigo-400 mb-8 group-hover:scale-110 transition-transform">{icon}</div>
    <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">{title}</h3>
    <p className="text-white/50 text-base leading-relaxed">{desc}</p>
  </div>
);

export default Landing;
