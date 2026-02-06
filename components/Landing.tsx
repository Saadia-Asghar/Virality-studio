
import React, { useState } from 'react';
import { ArrowRight, Zap, TrendingUp, Search, ShieldCheck, Star, Users, Globe, Play, Mail, Lock } from 'lucide-react';
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
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] -z-10"></div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
              <TrendingUp className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              TRENDING
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-10 text-[13px] font-bold uppercase tracking-widest text-white/50">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#performance" className="hover:text-white transition-colors">Performance</a>
            <a href="#solutions" className="hover:text-white transition-colors">Solutions</a>
            <button
              onClick={handleLogin}
              disabled={loading}
              className="group relative px-6 py-2.5 bg-white text-black rounded-lg font-black overflow-hidden transition-all hover:pr-10"
            >
              <span className="relative z-10 transition-all">{loading ? 'AUTH...' : 'LAUNCH APP'}</span>
              <ArrowRight className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-full mb-8 border border-white/10 animate-fade-in">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-ping"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300">v2.5 Neural Engine Live</span>
          </div>

          <h1 className="text-6xl md:text-[110px] font-black tracking-tighter leading-[0.85] mb-10 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/20">
            GENERATE <br />
            <span className="text-indigo-500">ATTENTION</span> <br />
            AT SCALE.
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/50 mb-14 leading-relaxed font-medium">
            The elite AI command center for modern creators. Analyze niches, intercept emerging trends, and deploy viral content across the social mesh with precision.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full md:w-auto px-12 py-5 bg-indigo-600 text-white rounded-2xl text-lg font-black shadow-[0_0_40px_rgba(79,70,229,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              {loading ? 'Authenticating...' : 'Sign In with Google'}
              <ArrowRight className="w-5 h-5" />
            </button>
            <div className="flex flex-col gap-2">
              <button className="w-full md:w-auto px-12 py-5 bg-white/5 text-white border border-white/10 rounded-2xl text-lg font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                <Mail className="w-5 h-5" />
                Sign Up with Email
              </button>
              <p className="text-[10px] text-white/20 font-black uppercase tracking-widest mt-2">Enterprise login enabled</p>
            </div>
          </div>
        </div>

        {/* Floating Metrics Decoration */}
        <div className="hidden xl:block absolute top-[40%] left-[10%] p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl rotate-[-12deg] shadow-2xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black text-white/40 uppercase">Virality Score</p>
              <p className="text-2xl font-black">98.4</p>
            </div>
          </div>
          <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="w-[85%] h-full bg-indigo-500"></div>
          </div>
        </div>

        <div className="hidden xl:block absolute top-[50%] right-[10%] p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl rotate-[8deg] shadow-2xl">
          <div className="flex items-center gap-4 mb-2">
            <Users className="text-purple-400 w-5 h-5" />
            <p className="text-[10px] font-black text-white/40 uppercase">Audience Lift</p>
          </div>
          <p className="text-3xl font-black">+424%</p>
          <p className="text-[9px] text-green-400 font-bold uppercase mt-1 tracking-widest">Optimized</p>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="relative py-40 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-32">
            <div className="text-left">
              <div className="inline-flex items-center space-x-2 text-indigo-400 text-xs font-black uppercase tracking-[0.3em] mb-6">
                <Zap className="w-4 h-4 fill-current" />
                <span>The Infrastructure</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">Built for the <br /> Attention Economy</h2>
              <p className="text-white/40 text-lg leading-relaxed max-w-md">Stop guessing. Deploy data-backed creative strategies that force the algorithm to take notice.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <MiniFeature icon={<Search />} title="Radar" desc="Intercept trends early." />
              <MiniFeature icon={<Globe />} title="Multichannel" desc="Sync every platform." />
              <MiniFeature icon={<ShieldCheck />} title="Verified" desc="High-retention hooks." />
              <MiniFeature icon={<Star />} title="Premium" desc="AI-driven growth." />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Search className="w-8 h-8" />}
              title="Trend Intelligence"
              desc="Real-time spectral analysis of live social platform data to detect viral spikes before they peak."
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Hyper-Adaptation"
              desc="One conceptual seed. Automated deployment into perfectly calibrated hooks for every major hub."
            />
            <FeatureCard
              icon={<ShieldCheck className="w-8 h-8" />}
              title="Content Forensics"
              desc="Deep-layer content audit. Paste any asset to receive a definitive viral score and clinical feedback."
            />
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section id="performance" className="py-40 bg-indigo-600 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="flex justify-center space-x-1 mb-10">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="text-white fill-current w-5 h-5" />)}
          </div>
          <p className="text-3xl md:text-4xl font-black text-white tracking-tight mb-12 italic leading-tight">
            "Trending is the literal cheat code. My engagement metrics normalized at 4x within the first 30 days of standardizing deployment."
          </p>
          <div className="flex items-center justify-center space-x-5">
            <div className="w-14 h-14 bg-white/20 rounded-2xl backdrop-blur-md"></div>
            <div className="text-left">
              <p className="font-black text-white text-lg tracking-tight">Marcus Vane</p>
              <p className="text-sm text-white/70 font-bold uppercase tracking-widest">Head of Growth, Zenith Labs</p>
            </div>
          </div>
        </div>
        {/* Background Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30rem] font-black text-white/5 pointer-events-none select-none">
          99%
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white/30 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center space-x-3 grayscale opacity-30">
            <TrendingUp className="w-6 h-6" />
            <span className="text-sm font-black tracking-widest uppercase">Trending AI</span>
          </div>

          <div className="flex flex-wrap justify-center gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-white/40">
            <a href="#" className="hover:text-white transition-colors">Infrastructure</a>
            <a href="#" className="hover:text-white transition-colors">Protocol</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
            <a href="#" className="hover:text-white transition-colors">Node Access</a>
          </div>

          <p className="text-[10px] font-bold">© 2026 ARCHIVE-0. ALL SYSTEMS OPERATIONAL.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: any) => (
  <div className="group relative bg-[#0A0A0A] p-12 rounded-[3rem] border border-white/5 hover:border-indigo-500/50 transition-all hover:-translate-y-3 overflow-hidden shadow-2xl">
    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 rounded-full blur-3xl group-hover:bg-indigo-600/20 transition-all"></div>
    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-indigo-500 mb-8 border border-white/10 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-2xl font-black text-white mb-4 tracking-tighter">{title}</h3>
    <p className="text-white/30 leading-relaxed font-medium">{desc}</p>
  </div>
);

const MiniFeature = ({ icon, title, desc }: any) => (
  <div className="flex items-start space-x-4 p-4 bg-white/2 rounded-2xl border border-white/5">
    <div className="text-indigo-400 mt-1">{React.cloneElement(icon, { size: 18 })}</div>
    <div>
      <h4 className="text-[11px] font-black uppercase tracking-widest text-white">{title}</h4>
      <p className="text-[10px] text-white/30 font-bold">{desc}</p>
    </div>
  </div>
);

export default Landing;
