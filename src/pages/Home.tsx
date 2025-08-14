import 'react/jsx-runtime';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const HERO_BUTTONS = [
  { name: 'Open Source', to: '/opensource' },
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
    // Reset scroll position to top on page load
    window.scrollTo(0, 0);
    
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
    // Don't call onScroll immediately to prevent auto-scroll
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}

const Home = () => {
  useScrollFadeIn();
  
  useEffect(() => {
    document.title = 'MeridianAlgo - Home';
  }, []);
  
  return (
    <div className="relative min-h-screen w-full bg-black">
      {/* Landing Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden fade-in-up bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("/mountain.jpg")' }}>
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.6) 2px, transparent 2px)`,
          backgroundSize: '40px 40px'
        }}></div>
        {/* Mountain overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
        {/* Fade to black at bottom - moved much lower */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
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
                className="relative group inline-block px-8 py-3 rounded-full border-2 border-blue-400 text-white font-semibold text-lg shadow-lg transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-blue-400/40 hover:bg-blue-600 hover:border-blue-600"
              >
                <span className="relative z-10">{btn.name}</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="w-full relative z-10 bg-black">
        {/* Our Mission Section */}
        <section className="py-32 fade-in-up bg-transparent">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-inter">Our Mission</h2>
            <p className="text-xl text-slate-200 mb-8 font-inter font-light">
              We believe that <span className="text-blue-400 font-semibold">financial opportunity</span> should be accessible to all. Our mission is to <span className="text-blue-400 font-semibold">democratize</span> advanced trading and investment tools, making them <span className="text-blue-400 font-semibold">open, ethical, and easy</span> to use for everyone—no matter where you start.
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-inter">Our Code</h2>
            <p className="text-xl text-slate-200 mb-4 font-inter font-light">
              Explore our <span className="text-blue-400 font-semibold">open-source ecosystem</span> powering the future of algorithmic trading.
            </p>
            <p className="text-lg text-slate-300 mb-8 font-inter font-light max-w-3xl mx-auto">
              From <span className="text-blue-400 font-semibold">Node.js trading engines</span> to <span className="text-blue-400 font-semibold">Pine Script indicators</span>, our repositories provide the building blocks for sophisticated trading strategies accessible to everyone.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center items-center max-w-2xl mx-auto">
              <a href="https://github.com/MeridianAlgo/In-NodeJS" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-800 to-blue-600 text-white px-6 py-3 rounded-2xl shadow-lg font-semibold text-base hover:from-blue-900 hover:to-blue-700 transition-all duration-300 text-center">In-NodeJS</a>
              <a href="https://github.com/MeridianAlgo/In-Pine" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-800 to-blue-600 text-white px-6 py-3 rounded-2xl shadow-lg font-semibold text-base hover:from-blue-900 hover:to-blue-700 transition-all duration-300 text-center">In-Pine</a>
              <a href="https://github.com/MeridianAlgo/Cryptvault" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-800 to-blue-600 text-white px-6 py-3 rounded-2xl shadow-lg font-semibold text-base hover:from-blue-900 hover:to-blue-700 transition-all duration-300 text-center">Cryptvault</a>
              <a href="https://github.com/MeridianAlgo/Ara" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-800 to-blue-600 text-white px-6 py-3 rounded-2xl shadow-lg font-semibold text-base hover:from-blue-900 hover:to-blue-700 transition-all duration-300 text-center">Ara</a>
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center font-inter">Features of Our Code</h2>
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-inter">Community</h2>
            <p className="text-xl text-slate-200 mb-6 font-inter font-light">
              MeridianAlgo connects <span className="text-blue-400 font-semibold">innovators, traders, and researchers</span> from around the world. Share strategies, learn from others, and build together in a truly <span className="text-blue-400 font-semibold">open environment</span>.
            </p>
            <p className="text-lg text-slate-300 mb-4 font-inter font-light max-w-4xl mx-auto">
              Join our growing community of <span className="text-blue-400 font-semibold">developers and traders</span> who contribute to cutting-edge financial technology. Whether you're sharing <span className="text-blue-400 font-semibold">trading algorithms</span>, discussing <span className="text-blue-400 font-semibold">market insights</span>, or collaborating on new features, our community thrives on <span className="text-blue-400 font-semibold">knowledge sharing</span> and mutual growth.
            </p>
            <p className="text-base text-slate-400 font-inter font-light max-w-3xl mx-auto">
              From <span className="text-blue-400 font-semibold">Discord discussions</span> to <span className="text-blue-400 font-semibold">GitHub contributions</span>, every voice matters in shaping the future of accessible algorithmic trading.
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-inter">Technology</h2>
            <p className="text-xl text-slate-200 mb-6 font-inter font-light">
              Our platform is built with <span className="text-blue-400 font-semibold">modern, scalable technology</span>—<span className="text-blue-400 font-semibold">open APIs</span>, <span className="text-blue-400 font-semibold">robust backtesting</span>, and <span className="text-blue-400 font-semibold">transparent algorithms</span>. Everything is designed for flexibility and growth.
            </p>
            <p className="text-lg text-slate-300 mb-4 font-inter font-light max-w-4xl mx-auto">
              Leveraging <span className="text-blue-400 font-semibold">cloud-native architecture</span>, our systems handle <span className="text-blue-400 font-semibold">real-time market data</span> processing with microsecond precision. Built on <span className="text-blue-400 font-semibold">Node.js</span>, <span className="text-blue-400 font-semibold">Python</span>, and <span className="text-blue-400 font-semibold">Pine Script</span>, our technology stack ensures <span className="text-blue-400 font-semibold">reliability</span> and <span className="text-blue-400 font-semibold">performance</span> at scale.
            </p>
            <p className="text-base text-slate-400 font-inter font-light max-w-3xl mx-auto">
              From <span className="text-blue-400 font-semibold">machine learning models</span> to <span className="text-blue-400 font-semibold">distributed computing</span>, every component is optimized for the demanding requirements of modern algorithmic trading.
            </p>
          </div>
        </section>
        
        {/* Fade to footer */}
        <div className="h-24 bg-gradient-to-b from-black to-[#23243a]"></div>
      </div>
    </div>
  );
};

export default Home;