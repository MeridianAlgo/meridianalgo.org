import 'react/jsx-runtime';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const HERO_BUTTONS = [
  { name: 'Learn More', to: '/about' },
  { name: 'Newsletters', to: '/newsletters' },
];

const FEATURES = [
  {
    icon: (
      <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12l2 2 4-4" /></svg>
    ),
    title: 'AI-Driven',
    desc: 'Smart, adaptive algorithms that learn and evolve with the market.'
  },
  {
    icon: (
      <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20l9-5-9-5-9 5 9 5z" /><path d="M12 12V4m0 0L3 9m9-5l9 5" /></svg>
    ),
    title: 'Open Source',
    desc: 'Transparent, community-driven code for everyone.'
  },
  {
    icon: (
      <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="5" rx="2" /><path d="M2 7l10 6 10-6" /></svg>
    ),
    title: 'Easily Understandable',
    desc: 'Intuitive tools and clear documentation for all experience levels.'
  },
  {
    icon: (
      <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
    ),
    title: 'Accuracy First',
    desc: 'Precision and reliability are at the core of every strategy.'
  },
];

function useScrollFadeIn() {
  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in-up, .fade-in-up-delayed');
    const onScroll = () => {
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 40) {
          el.classList.add('animate');
        }
      });
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}

const Home = () => {
  useScrollFadeIn();
  return (
    <div className="relative min-h-screen w-full">
      {/* Landing Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden fade-in-up bg-transparent">
        {/* Starry Sky Layers */}
        <div className="stars" />
        <div className="stars2" />
        <div className="stars3" />
        {/* Mountain Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/mountain.jpg")' }}
        >
          {/* Lighter Gradient Overlay for visible peak */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e293b]/40 via-[#23243a]/20 to-[#181a23]/80"></div>
        </div>
        {/* Centered Title, Subtitle, and Buttons */}
        <div className="relative z-20 flex flex-col items-center justify-center w-full h-full">
          <h1 className="text-white text-5xl md:text-7xl font-extrabold drop-shadow-2xl mb-4 font-inter" style={{ textShadow: '0 4px 32px rgba(0,0,0,0.7)' }}>
            Chart Your Path
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-10 font-light font-inter" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.5)' }}>
            Empowering you to reach new heights in finance and technology
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            {HERO_BUTTONS.map((btn) => (
              <Link
                key={btn.name}
                to={btn.to}
                className="relative group inline-block px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold text-lg shadow-lg transition-all duration-300 ease-out transform hover:scale-105 hover:from-blue-700 hover:to-blue-500 hover:shadow-2xl active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-400/40"
              >
                <span className="relative z-10">{btn.name}</span>
                <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10"></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Gradient Content (starts after mountain) */}
      <div className="w-full bg-gradient-to-b from-[#21273b] via-[#23243a] via-60% to-black">
        {/* Our Mission Section */}
        <section className="py-32 fade-in-up bg-transparent">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-300 mb-6 font-inter">Our Mission</h2>
            <p className="text-xl text-slate-200 mb-8 font-inter font-light">
              We believe that financial opportunity should be accessible to all. Our mission is to democratize advanced trading and investment tools, making them open, ethical, and easy to use for everyone—no matter where you start.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="flex justify-center items-center">
          <div className="w-32 h-0.5 bg-blue-400/40 rounded-full blur-[1px] my-2" />
        </div>

        {/* Our Code Section */}
        <section className="py-32 fade-in-up bg-transparent">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-200 mb-6 font-inter">Our Code</h2>
            <p className="text-xl text-slate-200 mb-8 font-inter font-light">
              Explore our open-source projects powering MeridianAlgo:
            </p>
            <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
              <a href="https://github.com/MeridianAlgo/In-NodeJS" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-800 to-blue-600 text-white px-8 py-4 rounded-2xl shadow-lg font-semibold text-lg hover:from-blue-900 hover:to-blue-700 transition-all duration-300 mb-4 md:mb-0">In-NodeJS</a>
              <a href="https://github.com/MeridianAlgo/In-Pine" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-800 to-blue-600 text-white px-8 py-4 rounded-2xl shadow-lg font-semibold text-lg hover:from-blue-900 hover:to-blue-700 transition-all duration-300 mb-4 md:mb-0">In-Pine</a>
              <a href="https://github.com/MeridianAlgo/Utils" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-800 to-blue-600 text-white px-8 py-4 rounded-2xl shadow-lg font-semibold text-lg hover:from-blue-900 hover:to-blue-700 transition-all duration-300">Utils</a>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="flex justify-center items-center">
          <div className="w-32 h-0.5 bg-blue-400/40 rounded-full blur-[1px] my-2" />
        </div>

        {/* Features Section */}
        <section className="py-32 fade-in-up bg-transparent">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-300 mb-12 text-center font-inter">Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {FEATURES.map((feature, i) => (
                <div key={i} className="group bg-[#23243a]/80 border border-blue-400/30 rounded-2xl p-8 flex flex-col items-center text-center shadow-xl hover:shadow-2xl hover:border-blue-400/60 transition-all duration-300 fade-in-up-delayed">
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 font-inter">{feature.title}</h3>
                  <p className="text-slate-200 font-inter font-light">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="flex justify-center items-center">
          <div className="w-32 h-0.5 bg-blue-400/40 rounded-full blur-[1px] my-2" />
        </div>

        {/* Community Section */}
        <section className="py-32 fade-in-up bg-transparent">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-200 mb-6 font-inter">Community</h2>
            <p className="text-xl text-slate-200 mb-8 font-inter font-light">
              MeridianAlgo connects innovators, traders, and researchers from around the world. Share strategies, learn from others, and build together in a truly open environment.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="flex justify-center items-center">
          <div className="w-32 h-0.5 bg-blue-400/40 rounded-full blur-[1px] my-2" />
        </div>

        {/* Technology Section */}
        <section className="py-32 fade-in-up bg-transparent">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-300 mb-6 font-inter">Technology</h2>
            <p className="text-xl text-slate-200 mb-8 font-inter font-light">
              Our platform is built with modern, scalable technology—open APIs, robust backtesting, and transparent algorithms. Everything is designed for flexibility and growth.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;