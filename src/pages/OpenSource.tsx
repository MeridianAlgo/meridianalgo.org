import { useEffect, useState } from 'react';
import { Github, Code2, ExternalLink, Star, GitFork } from 'lucide-react';

const PROJECTS = [
  {
    name: 'AraAI',
    url: 'https://github.com/MeridianAlgo/AraAI',
    description: 'AI-powered financial analysis platform for stock volatility forecasting, market predictions, and portfolio optimization using ensemble machine learning.',
    language: 'Python',
    license: 'Other',
    stars: 1,
    category: 'Machine Learning'
  },
  {
    name: 'Cryptvault',
    url: 'https://github.com/MeridianAlgo/Cryptvault',
    description: 'Professional-grade cryptocurrency analysis with advanced AI/ML predictions, 50+ pattern recognition, and TradingView-style terminal charts.',
    language: 'Python',
    license: 'MIT',
    stars: 2,
    category: 'Machine Learning'
  },
  {
    name: 'TradeRiser',
    url: 'https://github.com/MeridianAlgo/TradeRiser',
    description: 'Modular crypto trading bot with TP/SL. Real-time Alpaca API, 6 indicators, paper trading. Easy to customize. Beginner-friendly. Production-ready.',
    language: 'JavaScript',
    license: 'MIT',
    category: 'Trading Tools'
  },
  {
    name: 'Bitflow',
    url: 'https://github.com/MeridianAlgo/Bitflow',
    description: 'Combination of Node.js and Python designed to help research trading strategies and test your own strategies in algorithmic trading.',
    language: 'JavaScript',
    license: 'Other',
    category: 'Trading Tools'
  },
  {
    name: 'Apex-Analysis',
    url: 'https://github.com/MeridianAlgo/Apex-Analysis',
    description: 'Stock Analysis and Identification tools for comprehensive market research.',
    language: 'Python',
    category: 'Analysis Tools'
  },
  {
    name: 'Python-Packages',
    url: 'https://github.com/MeridianAlgo/Python-Packages',
    description: 'Python packages available on PyPI. Install with: pip install meridianalgo',
    language: 'Python',
    license: 'MIT',
    stars: 1,
    category: 'Libraries'
  },
  {
    name: 'Adaptive-MA-Selection',
    url: 'https://github.com/MeridianAlgo/Adaptive-MA-Selection',
    description: 'Adaptive Moving Average Selection algorithms for dynamic market analysis.',
    language: 'Python',
    license: 'MIT',
    category: 'Analysis Tools'
  },
  {
    name: 'Portfolio-Optimization',
    url: 'https://github.com/MeridianAlgo/Portfolio-Optimization',
    description: 'Portfolio optimization tools and strategies for wealth management.',
    language: 'Python',
    category: 'Research'
  },
  {
    name: 'Portfolio-Optimization-Research',
    url: 'https://github.com/MeridianAlgo/Portfolio-Optimization-Research',
    description: 'Research project on different ways to optimize portfolios with machine learning.',
    language: 'Python',
    license: 'MIT',
    category: 'Research'
  },
  {
    name: 'Option-Pricing-Research',
    url: 'https://github.com/MeridianAlgo/Option-Pricing-Research',
    description: 'Automated, quant-grade platform for option pricing research supporting Black-Scholes, Heston, and ML techniques.',
    language: 'Python',
    license: 'MIT',
    stars: 1,
    category: 'Research'
  },
  {
    name: 'FinAI',
    url: 'https://github.com/MeridianAlgo/FinAI',
    description: 'Financial AI platform for analysis and predictions using advanced machine learning.',
    language: 'Python',
    license: 'MIT',
    stars: 1,
    category: 'Machine Learning'
  },
  {
    name: 'TimeSeries-Prediction-Research',
    url: 'https://github.com/MeridianAlgo/TimeSeries-Prediction-Research',
    description: 'Time-Series research for understanding quantitative finance applications.',
    language: 'HTML',
    license: 'MIT',
    category: 'Research'
  },
  {
    name: 'Utils',
    url: 'https://github.com/MeridianAlgo/Utils',
    description: 'Utilities for beginners in Python and JavaScript. Educational purposes only.',
    language: 'Python',
    license: 'MIT',
    stars: 1,
    category: 'Libraries'
  },
  {
    name: 'Bitflow-Original',
    url: 'https://github.com/MeridianAlgo/Bitflow-Original',
    description: 'Original Bitflow implementation for algorithmic trading research.',
    language: 'JavaScript',
    category: 'Trading Tools'
  },
  {
    name: 'Javascript-Packages',
    url: 'https://github.com/MeridianAlgo/Javascript-Packages',
    description: 'NPM packages. Install with: npm i meridianalgo-js',
    language: 'TypeScript',
    license: 'MIT',
    category: 'Libraries'
  },
  {
    name: 'In-NodeJS',
    url: 'https://github.com/MeridianAlgo/In-NodeJS',
    description: 'Advanced Node.js-based trading tools for algorithmic research using Alpaca paper trading API.',
    language: 'JavaScript',
    license: 'MPL-2.0',
    stars: 1,
    category: 'Trading Tools'
  },
  {
    name: 'MeridianAlgo',
    url: 'https://github.com/MeridianAlgo/MeridianAlgo',
    description: 'Main repository for MeridianAlgo organization and documentation.',
    language: 'Various',
    license: 'MIT',
    category: 'Documentation'
  }
];

const CATEGORIES = ['All', 'Machine Learning', 'Trading Tools', 'Research', 'Analysis Tools', 'Libraries', 'Documentation'];

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
      'HTML': 'bg-orange-500',
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
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-2">17</div>
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
