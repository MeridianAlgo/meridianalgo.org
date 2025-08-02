import React, { useEffect } from 'react';
import { Github, Users, Code2 } from 'lucide-react';

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

const PROJECTS = [
  {
    name: 'In-NodeJS',
    url: 'https://github.com/MeridianAlgo/In-NodeJS',
    desc: 'Advanced Node.js-based trading tools for algorithmic research, leveraging Alpaca’s paper trading API for stocks and crypto.'
  },
  {
    name: 'In-Pine',
    url: 'https://github.com/MeridianAlgo/In-Pine',
    desc: 'Machine-learning-driven trading tools and indicators for TradingView, written in Pine Script.'
  },
  {
    name: 'Utils',
    url: 'https://github.com/MeridianAlgo/Utils',
    desc: 'Utility scripts and tools for research and automation.'
  },
  {
    name: 'Python Library',
    url: 'https://github.com/MeridianAlgo/Packages',
    desc: 'A comprehensive Python library for algorithmic trading and financial analysis. Also available on PyPI.'
  }
];

const OpenSource = () => {
  useScrollFadeIn();
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#21273b] via-[#23243a] via-60% to-black pt-24">
      {/* Mountain Background */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10" style={{ backgroundImage: 'url(\"/mountain.jpg\")' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e293b]/40 via-[#23243a]/20 to-[#181a23]/80"></div>
      </div>
      {/* Why Open Source Section */}
      <section className="py-24 fade-in-up bg-transparent">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-white text-5xl md:text-7xl font-extrabold drop-shadow-2xl mb-8 font-inter" style={{ textShadow: '0 4px 32px rgba(0,0,0,0.7)' }}>
            Open Source
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-10 font-inter font-light" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.5)' }}>
            MeridianAlgo is built on the belief that transparency and collaboration drive innovation. Our core trading engine and tools are open source, empowering anyone to learn, build, and contribute.
          </p>
        </div>
      </section>
      {/* Divider */}
      <div className="flex justify-center items-center">
        <div className="w-32 h-0.5 bg-blue-400/40 rounded-full blur-[1px] my-2" />
      </div>
      {/* Projects List Section */}
      <section className="py-24 fade-in-up bg-transparent">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-8 font-inter">Our Open Source Projects</h2>
          <ul className="space-y-8">
            {PROJECTS.map((project) => (
              <li key={project.name} className="bg-gradient-to-r from-blue-900/60 to-blue-800/40 rounded-xl p-8 shadow-lg border border-blue-800/40 hover:shadow-2xl transition-all duration-300">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl font-semibold text-blue-300 hover:text-blue-100 underline underline-offset-4 transition-colors duration-200"
                >
                  {project.name}
                </a>
                <p className="text-blue-100 mt-2 text-base font-inter font-light">
                  {project.desc}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      {/* Divider */}
      <div className="flex justify-center items-center">
        <div className="w-32 h-0.5 bg-blue-400/40 rounded-full blur-[1px] my-2" />
      </div>
      {/* Community Impact Section */}
      <section className="py-24 fade-in-up bg-transparent">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-400 mb-4 font-inter">Community Impact</h2>
          <p className="text-lg md:text-xl text-slate-200 mb-4 font-inter font-light">
            By making our technology open, we empower a global community to innovate, learn, and build a more equitable financial future—together.
          </p>
        </div>
      </section>
    </div>
  );
};

export default OpenSource; 