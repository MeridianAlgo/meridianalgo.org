import { useEffect, useState } from 'react';
import { Github, Code2, ExternalLink } from 'lucide-react';

const PROJECTS = [
  {
    name: 'meridianalgo.org',
    url: 'https://github.com/MeridianAlgo/meridianalgo.org',
    description: 'The source code for this website — built with React, TypeScript, and Tailwind.',
    language: 'TypeScript',
    license: 'MIT',
    category: 'Documentation'
  },
  {
    name: 'AstryxChain',
    url: 'https://github.com/MeridianAlgo/AstryxChain',
    description: 'Blockchain infrastructure project built in Rust.',
    language: 'Rust',
    license: 'MIT',
    category: 'Tools'
  },
  {
    name: 'LuminaChain',
    url: 'https://github.com/MeridianAlgo/LuminaChain',
    description: 'Lightweight, sovereign Rust L1 blockchain purpose-built for unbreakable stablecoins — our testbed for blockchain internals.',
    language: 'Rust',
    license: 'MIT',
    category: 'Tools'
  },
  {
    name: 'FinDB',
    url: 'https://github.com/MeridianAlgo/FinDB',
    description: 'Financial database infrastructure for high-performance data storage and retrieval.',
    language: 'SQL',
    license: 'MIT',
    category: 'Tools'
  },
  {
    name: 'FinAI',
    url: 'https://github.com/MeridianAlgo/FinAI',
    description: 'In-house LLM research and development focused on finance-based chat and financial requests.',
    language: 'Python',
    license: 'MIT',
    category: 'Machine Learning'
  },
  {
    name: 'Pine-A-Script',
    url: 'https://github.com/MeridianAlgo/Pine-A-Script',
    description: 'Open-source transpiler converting TradingView Pine Script (v5/v6) indicators to executable JavaScript for Node.js.',
    language: 'JavaScript',
    license: 'MIT',
    category: 'Tools'
  },
  {
    name: 'AraAI',
    url: 'https://github.com/MeridianAlgo/AraAI',
    description: 'AI-powered financial analysis platform for stock volatility forecasting, market predictions, and portfolio optimization.',
    language: 'Python',
    license: 'MIT',
    category: 'Machine Learning'
  },
  {
    name: 'Learn-Quant',
    url: 'https://github.com/MeridianAlgo/Learn-Quant',
    description: 'Educational utilities for beginners in Python and JavaScript — a deep look at the building blocks of our programs.',
    language: 'Python',
    license: 'MIT',
    category: 'Libraries'
  },
  {
    name: 'Javascript-Packages',
    url: 'https://github.com/MeridianAlgo/Javascript-Packages',
    description: 'Our NPM packages — install with `npm install meridianalgo` or browse the source here.',
    language: 'JavaScript',
    license: 'MIT',
    category: 'Libraries'
  },
  {
    name: 'Basic-Sentiment-Analysis',
    url: 'https://github.com/MeridianAlgo/Basic-Sentiment-Analysis',
    description: 'Sentiment analysis using FinBERT to classify financial news into positive, negative, and neutral categories.',
    language: 'Python',
    license: 'MIT',
    category: 'Machine Learning'
  },
  {
    name: 'No-Ticker-Left-Behind',
    url: 'https://github.com/MeridianAlgo/No-Ticker-Left-Behind',
    description: 'All tickers for all world stocks — generates a regularly refreshed universe exported in common formats.',
    language: 'Python',
    license: 'MIT',
    category: 'Tools'
  },
  {
    name: 'Python-Packages',
    url: 'https://github.com/MeridianAlgo/Python-Packages',
    description: 'Our PyPI packages — install with `pip install meridianalgo` or browse the source here.',
    language: 'Python',
    license: 'MIT',
    category: 'Libraries'
  },
  {
    name: 'Cryptvault',
    url: 'https://github.com/MeridianAlgo/Cryptvault',
    description: 'Professional-grade cryptocurrency analysis with AI/ML predictions, 50+ pattern recognition, and terminal charting.',
    language: 'Python',
    license: 'BSD 3-Clause',
    category: 'Analysis Tools'
  },
  {
    name: 'Midnight.AI',
    url: 'https://github.com/MeridianAlgo/Midnight.AI',
    description: 'Multi-objective trading engine with a pretrained model, Alpaca API integration for paper trading, and built-in backtester.',
    language: 'Python',
    license: 'MIT',
    category: 'Machine Learning'
  },
  {
    name: 'Apex-Analysis',
    url: 'https://github.com/MeridianAlgo/Apex-Analysis',
    description: 'Beginner-friendly stock analysis and research platform built for accessibility.',
    language: 'Python',
    license: 'MIT',
    category: 'Analysis Tools'
  }
];

const CATEGORIES = ['All', 'Machine Learning', 'Analysis Tools', 'Libraries', 'Documentation', 'Tools'];

const LANG_COLORS: Record<string, string> = {
  Python: 'bg-blue-500/20 text-blue-300 border-blue-500/20',
  JavaScript: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/20',
  TypeScript: 'bg-blue-400/20 text-blue-200 border-blue-400/20',
  Rust: 'bg-orange-500/20 text-orange-300 border-orange-500/20',
  SQL: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/20',
  Markdown: 'bg-gray-500/20 text-gray-300 border-gray-500/20',
};

const OpenSource = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    document.title = 'MeridianAlgo - Open Source';
  }, []);

  const filtered = selectedCategory === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-400/20">

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <div className="animate-fade-in-up">
            <span className="text-[10px] uppercase tracking-[0.4em] text-orange-300/80 font-mono mb-8 inline-block bg-white/5 px-4 py-2 rounded-full border border-white/10">
              Community Code
            </span>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            <h1 className="text-5xl md:text-8xl font-display font-bold mb-6 leading-none uppercase tracking-tight text-white mt-6">
              Open <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-amber-300">Source</span>
            </h1>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light mb-10">
              All our tools, research, and educational resources are freely available. Built by the community, for the community.
            </p>
          </div>
          <div className="animate-fade-in-up flex justify-center gap-12" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            {[
              { value: PROJECTS.length.toString(), label: 'Projects' },
              { value: 'MIT', label: 'License' },
              { value: '100%', label: 'Open Source' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-bold text-white">{value}</p>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1 font-mono">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="relative z-10">

        {/* Filter + Grid */}
        <section className="relative py-24 bg-black overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-orange-400/50" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* Category filter */}
            <div className="flex flex-wrap gap-2 justify-center mb-16">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-colors duration-200 ${
                    selectedCategory === cat
                      ? 'bg-orange-400/20 text-orange-300 border border-orange-400/40'
                      : 'bg-white/5 text-gray-400 border border-white/10 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Projects grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((project) => (
                <a
                  key={project.name}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-gray-900/20 border border-white/5 hover:border-white/10 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 flex flex-col relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-300/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Code2 className="w-4 h-4 text-gray-400 group-hover:text-orange-300/80 transition-colors duration-200" />
                      </div>
                      <h3 className="text-sm font-bold text-white group-hover:text-orange-300/90 transition-colors duration-200 uppercase tracking-tight">
                        {project.name}
                      </h3>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors duration-200 flex-shrink-0" />
                  </div>

                  <p className="text-gray-500 text-xs mb-5 flex-grow leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-2 mt-auto flex-wrap">
                    <span className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border ${LANG_COLORS[project.language] || 'bg-gray-500/20 text-gray-300 border-gray-500/20'}`}>
                      {project.language}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 text-gray-500 border border-white/10">
                      {project.license}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-32 bg-black overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-orange-400/50" />

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <span className="text-[10px] uppercase tracking-[0.4em] text-orange-300/80 font-mono mb-6 inline-block bg-black px-4 py-2 rounded-full border border-white/10">
              Contribute
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-8 tracking-tight uppercase leading-tight mt-6">
              Build With <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-amber-300">Us</span>
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed font-light max-w-2xl mx-auto mb-12">
              Join our community of developers, researchers, and educators building the future of financial literacy.
            </p>
            <a
              href="https://github.com/MeridianAlgo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/15 hover:border-white/25 rounded-xl font-bold text-base transition-colors duration-200 uppercase tracking-wider"
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </a>
          </div>
        </section>

      </div>
    </div>
  );
};

export default OpenSource;
