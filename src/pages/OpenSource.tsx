import React, { useEffect } from 'react';
import { Github, Users, Code2, Star, GitFork, ExternalLink } from 'lucide-react';

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
    description: 'Advanced Node.js-based trading tools for algorithmic research, leveraging Alpaca\'s paper trading API for stocks and crypto.',
    category: 'Resources',
    language: 'JavaScript',
    features: ['Paper Trading', 'Stock & Crypto APIs', 'Real-time Data']
  },
  {
    name: 'In-Pine',
    url: 'https://github.com/MeridianAlgo/In-Pine',
    description: 'Machine-learning-driven trading tools and indicators for TradingView, written in Pine Script.',
    category: 'Machine Learning',
    language: 'Pine Script',
    features: ['TradingView Integration', 'ML Indicators', 'Custom Strategies']
  },
  {
    name: 'Python Library',
    url: 'https://github.com/MeridianAlgo/Packages',
    description: 'A comprehensive Python library for algorithmic trading and financial analysis. Also available on PyPI.',
    category: 'Resources',
    language: 'Python',
    features: ['PyPI Package', 'Financial Analysis', 'Backtesting']
  },
  {
    name: 'JavaScript Packages',
    url: 'https://github.com/MeridianAlgo/Javascript-Packages',
    description: 'Collection of JavaScript packages and utilities for algorithmic trading and financial analysis.',
    category: 'Resources',
    language: 'JavaScript',
    features: ['NPM Packages', 'Trading Utilities', 'Financial Tools']
  },
  {
    name: 'Utilities',
    url: 'https://github.com/MeridianAlgo/Utils',
    description: 'Utility scripts and tools for research and automation in algorithmic trading.',
    category: 'Resources',
    language: 'Python',
    features: ['Data Processing', 'Automation', 'Research Tools']
  },
  {
    name: 'BitFlow',
    url: 'https://github.com/MeridianAlgo/In-NodeJS/tree/main/BitFlow',
    description: 'Advanced trading engine built with Node.js for high-performance algorithmic trading and real-time market data processing.',
    category: 'Trading Engine',
    language: 'JavaScript',
    features: ['Real-time Trading', 'Market Data', 'High Performance']
  },
  {
    name: 'Cryptvault',
    url: 'https://github.com/MeridianAlgo/Cryptvault',
    description: 'Charting resource using machine learning to identify the best types of charting on specific tickers.',
    category: 'Machine Learning',
    language: 'Python',
    features: ['Charting Analysis', 'ML Optimization', 'Ticker-Specific Charts']
  },
  {
    name: 'Ara',
    url: 'https://github.com/MeridianAlgo/Ara',
    description: 'Machine learning tools for education and volatility metrics analysis in trading strategies.',
    category: 'Machine Learning',
    language: 'Python',
    features: ['ML Education', 'Volatility Metrics', 'Strategy Analysis']
  }
];

const CATEGORIES = [
  { name: 'All', color: 'blue' },
  { name: 'Trading Engine', color: 'green' },
  { name: 'Machine Learning', color: 'purple' },
  { name: 'Resources', color: 'indigo' }
];

const OpenSource = () => {
  useScrollFadeIn();
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredProjects = selectedCategory === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(project => project.category === selectedCategory);

  const getLanguageColor = (language: string) => {
    const colors = {
      'JavaScript': 'bg-yellow-500',
      'Python': 'bg-blue-500',
      'Pine Script': 'bg-purple-500',
      'TypeScript': 'bg-blue-600'
    };
    return colors[language] || 'bg-gray-500';
  };

  const getCategoryColor = (category: string) => {
    // Unified blue theme for all cards
    return 'border-blue-400 bg-blue-400/10';
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#21273b] via-[#23243a] via-60% to-black pt-24 overflow-x-hidden">

      {/* Hero Section */}
      <section className="py-24 fade-in-up bg-transparent">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <Github className="w-16 h-16 text-blue-400 mr-4" />
            <h1 className="text-white text-5xl md:text-7xl font-extrabold drop-shadow-2xl font-inter" style={{ textShadow: '0 4px 32px rgba(0,0,0,0.7)' }}>
              Open Source
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-slate-200 mb-8 font-inter font-light max-w-4xl mx-auto" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.5)' }}>
            MeridianAlgo is built on the belief that transparency and collaboration drive innovation. Our comprehensive suite of trading tools and libraries are open source, empowering anyone to learn, build, and contribute to the future of algorithmic finance.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{PROJECTS.length}</div>
              <div className="text-slate-300 font-inter">Active Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">100%</div>
              <div className="text-slate-300 font-inter">Open Source</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">MIT</div>
              <div className="text-slate-300 font-inter">Licensed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 fade-in-up bg-transparent">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {CATEGORIES.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 font-inter ${
                  selectedCategory === category.name
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/60 hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 fade-in-up bg-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.name} 
                className={`group bg-slate-900/40 backdrop-blur-md rounded-2xl p-6 border-2 ${getCategoryColor(project.category)} hover:shadow-2xl hover:scale-105 transition-all duration-300 fade-in-up-delayed`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Code2 className="w-8 h-8 text-blue-400" />
                    <div>
                      <h3 className="text-xl font-bold text-white font-inter group-hover:text-blue-300 transition-colors">
                        {project.name}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`w-3 h-3 rounded-full ${getLanguageColor(project.language)}`}></span>
                        <span className="text-sm text-slate-400 font-inter">{project.language}</span>
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-slate-700 text-slate-300 font-inter">
                    {project.category}
                  </span>
                </div>

                {/* Description */}
                <p className="text-slate-300 mb-6 font-inter font-light leading-relaxed">
                  {project.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.features.map((feature) => (
                      <span 
                        key={feature}
                        className="px-3 py-1 text-xs bg-blue-900/40 text-blue-300 rounded-full font-inter"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 font-inter group-hover:shadow-lg min-h-[48px]"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Code</span>
                  </a>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-all duration-300 flex items-center justify-center min-h-[48px] min-w-[48px]"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 fade-in-up bg-transparent">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-3xl p-12 border border-blue-400/30">
            <Users className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-inter">Join Our Community</h2>
            <p className="text-xl text-slate-200 mb-8 font-inter font-light">
              By making our technology open, we empower a global community to innovate, learn, and build a more equitable financial future—together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/MeridianAlgo"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 font-inter"
              >
                <Github className="w-5 h-5" />
                <span>Explore All Repositories</span>
              </a>
              <a
                href="/contact"
                className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 font-inter"
              >
                <Users className="w-5 h-5" />
                <span>Get Involved</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OpenSource;