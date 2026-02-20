import { useEffect, useState } from 'react';
import { Github, Code2, ExternalLink } from 'lucide-react';

const PROJECTS = [
  {
    name: 'meridianalgo.org',
    url: 'https://github.com/MeridianAlgo/meridianalgo.org',
    description: 'Just our website in all its glory :)',
    language: 'TypeScript',
    license: 'MIT',
    category: 'Documentation'
  },
  {
    name: 'AstryxChain',
    url: 'https://github.com/MeridianAlgo/AstryxChain',
    description: 'Blockchain infrastructure project.',
    language: 'Rust',
    license: 'MIT',
    category: 'Tools'
  },
  {
    name: 'LuminaChain',
    url: 'https://github.com/MeridianAlgo/LuminaChain',
    description: 'LuminaChain is a lightweight, sovereign Rust L1 blockchain purpose-built for unbreakable stablecoins. It\'s our testbed for learning the intricacies of the blockchain...',
    language: 'Rust',
    license: 'MIT',
    category: 'Tools'
  },
  {
    name: 'FinDB',
    url: 'https://github.com/MeridianAlgo/FinDB',
    description: 'Financial database infrastructure.',
    language: 'SQL',
    license: 'MIT',
    category: 'Tools'
  },
  {
    name: 'FinAI',
    url: 'https://github.com/MeridianAlgo/FinAI',
    description: 'We are researching and developing our own in-house LLM, which will be focused on finance-based chats and requests.',
    language: 'Python',
    license: 'MIT',
    category: 'Machine Learning'
  },
  {
    name: 'Pine-A-Script',
    url: 'https://github.com/MeridianAlgo/Pine-A-Script',
    description: 'Open-source transpiler that converts TradingView Pine Script (v5 and early v6) indicators to clean, executable JavaScript for Node.js.',
    language: 'JavaScript',
    license: 'MIT',
    category: 'Tools'
  },
  {
    name: 'AraAI',
    url: 'https://github.com/MeridianAlgo/AraAI',
    description: 'Ara AI is an AI-powered financial analysis platform developed by MeridianAlgo, designed for stock volatility forecasting, market predictions, and portfolio optimization...',
    language: 'Python',
    license: 'MIT',
    category: 'Machine Learning'
  },
  {
    name: '.github',
    url: 'https://github.com/MeridianAlgo/.github',
    description: 'Organization profile repository.',
    language: 'Markdown',
    license: 'MIT',
    category: 'Documentation'
  },
  {
    name: 'Learn-Quant',
    url: 'https://github.com/MeridianAlgo/Learn-Quant',
    description: 'This repository offers beginners in Python and JavaScript a look at the utilities that go into creating each of our programs. Each of these programs is detailed...',
    language: 'Python',
    license: 'MIT',
    category: 'Libraries'
  },
  {
    name: 'Javascript-Packages',
    url: 'https://github.com/MeridianAlgo/Javascript-Packages',
    description: 'To view our NPM packages, run the command \'npm install meridianalgo\' in your terminal, or you can access our files here https://www.npmjs.com/package/meridianalgo...',
    language: 'JavaScript',
    license: 'MIT',
    category: 'Libraries'
  },
  {
    name: 'Basic-Sentiment-Analysis',
    url: 'https://github.com/MeridianAlgo/Basic-Sentiment-Analysis',
    description: 'Implemented sentiment analysis leveraging FinBERT to accurately classify financial news and similar documents into positive, negative, and neutral sentiment categories...',
    language: 'Python',
    license: 'MIT',
    category: 'Machine Learning'
  },
  {
    name: 'No-Ticker-Left-Behind',
    url: 'https://github.com/MeridianAlgo/No-Ticker-Left-Behind',
    description: 'This repository contains all tickers for all stocks across the world, and generates a regularly refreshed stock universe and exports it in common formats for use...',
    language: 'Python',
    license: 'MIT',
    category: 'Tools'
  },
  {
    name: 'Python-Packages',
    url: 'https://github.com/MeridianAlgo/Python-Packages',
    description: 'To view our Python packages, run the command pip install meridianalgo in your terminal, or you can access our files here https://pypi.org/project/meridianalgo/.',
    language: 'Python',
    license: 'MIT',
    category: 'Libraries'
  },
  {
    name: 'Cryptvault',
    url: 'https://github.com/MeridianAlgo/Cryptvault',
    description: 'Professional-grade cryptocurrency analysis with advanced AI/ML predictions, 50+ pattern recognition, and MathPlotLib terminal charts. CryptVault is an informational...',
    language: 'Python',
    license: 'BSD 3-Clause',
    category: 'Analysis Tools'
  },
  {
    name: 'Midnight.AI',
    url: 'https://github.com/MeridianAlgo/Midnight.AI',
    description: 'Midnight.AI: A multi-objective trading engine with a pretrained model, direct Alpaca API integration for paper trading, and a built-in backtester. Test strategies...',
    language: 'Python',
    license: 'MIT',
    category: 'Machine Learning'
  },
  {
    name: 'Apex-Analysis',
    url: 'https://github.com/MeridianAlgo/Apex-Analysis',
    description: 'Beginner-friendly stock analysis and research platform.',
    language: 'Python',
    license: 'MIT',
    category: 'Analysis Tools'
  }
];

const CATEGORIES = ['All', 'Machine Learning', 'Analysis Tools', 'Libraries', 'Documentation', 'Tools'];

const OpenSource = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    document.title = 'MeridianAlgo - Open Source';
  }, []);

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedCategory);

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      'Python': 'bg-blue-500',
      'JavaScript': 'bg-yellow-500',
      'TypeScript': 'bg-blue-400',
      'Rust': 'bg-orange-600',
      'SQL': 'bg-cyan-500',
      'Markdown': 'bg-gray-500',
      'Various': 'bg-purple-500'
    };
    return colors[language] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 [background-image:radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-2xl mb-8">
              <Github className="w-10 h-10 text-orange-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Open Source</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light mb-8">
              All our tools, research, and educational resources are freely available. Built by the community, for the community.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-2">{PROJECTS.length}</div>
              <div className="text-gray-400">Active Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-2">
                <span className="text-orange-400">MIT</span>
              </div>
              <div className="text-gray-400">License</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-2">
                <span className="text-orange-400">100%</span>
              </div>
              <div className="text-gray-400 whitespace-nowrap">Open Source</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-y border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${selectedCategory === category
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-orange-400/40 transition-all duration-300 hover:scale-105 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Code2 className="w-6 h-6 text-orange-400" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors">
                      {project.name}
                    </h3>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-orange-400 transition-colors" />
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
                  {project.description}
                </p>

                <div className="flex items-center gap-2 mt-auto">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getLanguageColor(project.language)} text-white`}>
                    {project.language}
                  </span>
                  {project.license && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-400 border border-orange-400/30">
                      {project.license}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 to-yellow-900/20"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-white">Contribute to </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Open Source</span>
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Join our community of developers, researchers, and educators building the future of financial literacy.
          </p>
          <a
            href="https://github.com/MeridianAlgo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg"
          >
            <Github className="w-5 h-5" />
            View on GitHub
          </a>
        </div>
      </section>
    </div>
  );
};

export default OpenSource;
