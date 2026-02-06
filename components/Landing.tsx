
import React from 'react';

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-white selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <span className="text-2xl">🚀</span>
          </div>
          <span className="text-2xl font-black text-gray-900 tracking-tight">Virality Studio</span>
        </div>
        <div className="hidden md:flex items-center space-x-8 text-sm font-bold text-gray-600">
          <a href="#" className="hover:text-indigo-600 transition-colors">Features</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Pricing</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Success Stories</a>
          <button 
            onClick={onStart}
            className="bg-indigo-600 text-white px-6 py-2.5 rounded-full hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
          >
            Launch Studio
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 text-center">
        <div className="inline-flex items-center space-x-2 bg-indigo-50 px-4 py-2 rounded-full mb-8 border border-indigo-100">
          <span className="text-indigo-600 text-xs font-black uppercase tracking-widest animate-pulse">New</span>
          <span className="text-indigo-900 text-xs font-bold">Gemini 2.5 Integrated Engine</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-8 tracking-tight leading-[0.9]">
          Own the <span className="text-indigo-600">Feed.</span> <br />
          Automate the <span className="text-indigo-600">Viral.</span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-gray-500 mb-12 leading-relaxed">
          The all-in-one AI command center that analyzes your niche, detects emerging trends, generates multi-platform content, and reviews your performance in real-time.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
          <button 
            onClick={onStart}
            className="w-full md:w-auto px-12 py-5 bg-indigo-600 text-white rounded-2xl text-lg font-black shadow-2xl shadow-indigo-200 hover:scale-105 transition-all"
          >
            Get Started Free
          </button>
          <button className="w-full md:w-auto px-12 py-5 bg-white text-gray-900 border-2 border-gray-100 rounded-2xl text-lg font-bold hover:bg-gray-50 transition-all">
            Watch Demo
          </button>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="bg-gray-50 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Built for the Attention Economy</h2>
            <p className="text-gray-500">Stop guessing. Start growing with data-backed AI creativity.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon="🔥" 
              title="Trend Detection" 
              desc="Real-time scanning of live platform data to find what's trending before it's too late."
            />
            <FeatureCard 
              icon="🎨" 
              title="Multi-Format AI" 
              desc="One idea. Five platforms. AI automatically adapts scripts, captions, and hashtags."
            />
            <FeatureCard 
              icon="🕵️‍♂️" 
              title="Post Reviewer" 
              desc="Paste any content and get a brutal viral review. Know why a post failed or succeeded."
            />
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center space-x-2 mb-6">
            {[1,2,3,4,5].map(i => <span key={i} className="text-yellow-400">★</span>)}
          </div>
          <p className="text-2xl font-medium text-gray-900 italic mb-8">
            "Virality Studio cut my content creation time by 80%. I went from 5k to 50k followers in 3 months using their trend detection engine."
          </p>
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div className="text-left">
              <p className="font-bold text-gray-900">Sarah Jenkins</p>
              <p className="text-sm text-gray-500">Founder, FitFlow Media</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0">© 2025 Virality Studio AI. All rights reserved.</p>
          <div className="flex space-x-8 text-sm font-bold">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: any) => (
  <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2">
    <div className="text-5xl mb-6">{icon}</div>
    <h3 className="text-xl font-black text-gray-900 mb-4 tracking-tight">{title}</h3>
    <p className="text-gray-500 leading-relaxed text-sm">{desc}</p>
  </div>
);

export default Landing;
