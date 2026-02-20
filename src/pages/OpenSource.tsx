import { useEffect, useState } from 'react';
import { Github, Code2, ExternalLink } from 'lucide-react';

const PROJECTS = [
  {
    name: 'FinAI',
    url: 'https://github.com/MeridianAlgo/FinAI',
    description: 'We are researching and developing our own in-house LLM, which will be focused on finance-based chats and requests.',
    language: 'Python',
    license: 'MIT',
    category: 'Machine Learning'
  },
  {
    name: 'Midnight.AI',
    url: 'https://github.com/MeridianAlgo/Midnight.AI',
    description: 'A multi-objective trading engine with a pretrained model, direct Alpaca API integration for paper trading, and a built-in backtester.',
    language: 'Python',
    license: 'MIT',
    category: 'Machine Learning'
  },
  {
    name: 'Learn-Quant',
    url: 'https://github.com/MeridianAlgo/Learn-Quant',
    description: 'This repository offers beginners in Python and JavaScript a look at the utilities that go into creating each of our programs.',
    language: 'Python',
    category: 'Libraries'
  },
  {
    name: 'Cryptvault',
    url: 'https://github.com/MeridianAlgo/Cryptvault',
    description: 'Professional-grade cryptocurrency analysis with advanced AI/ML predictions, 50+ pattern recognition, and MathPlotLib terminal charts.',
    language: 'Python',
    license: 'BSD 3-Clause',
    category: 'Machine Learning'
  },
  {
    name: 'MeridianAlgo',
    url: 'https://github.com/MeridianAlgo/MeridianAlgo',
    description: 'Welcome to MeridianAlgo! Dive into our collection of repositories, where you will find innovative algorithms, tools, and projects.',
    language: 'Various',
    category: 'Documentation'
  },
  {
    name: 'AraAI',
    url: 'https://github.com/MeridianAlgo/AraAI',
    description: 'Ara AI is an AI-powered financial analysis platform developed by MeridianAlgo, designed for stock volatility forecasting and market predictions.',
    language: 'Python',
    license: 'Other',
    category: 'Machine Learning'
  },
  {
    name: 'Javascript-Packages',
    url: 'https://www.npmjs.com/package/meridianalgo-js',
    description: 'To view our NPM packages, run the command npm i meridianalgo-js in your terminal.',
    language: 'TypeScript',
    license: 'MIT',
    category: 'Libraries'
  },
  {
    name: 'Apex-Analysis',
    url: 'https://github.com/MeridianAlgo/Apex-Analysis',
    description: 'Beginner-friendly stock analysis and research platform.',
    language: 'Python',
    license: 'MIT',
    category: 'Analysis Tools'
  },
  {
    name: 'Python-Packages',
    url: 'https://pypi.org/project/meridianalgo/',
    description: 'To view our Python packages, run the command pip install meridianalgo in your terminal.',
    language: 'Python',
    license: 'MIT',
    category: 'Libraries'
  },
  {
    name: 'Cyrptax',
    url: 'https://github.com/MeridianAlgo/Cyrptax',
    description: 'A all in one crypto tax platform aimed at making your life easier with crypto tax for free.',
    language: 'Python',
    license: 'Other',
    category: 'Tools'
  },
  {
    name: 'Portfolio-Optimization-Research',
    url: 'https://github.com/MeridianAlgo/Portfolio-Optimization-Research',
    description: 'Learning to optimize your portfolio is challenging. Therefore, we wanted to research different ways to optimize our portfolio.',
    language: 'Python',
    license: 'MIT',
    category: 'Research'
  },
  {
    name: 'Option-Pricing-Research',
    url: 'https://github.com/MeridianAlgo/Option-Pricing-Research',
    description: 'Automated, quant-grade, all-in-one platform for option pricing research, supporting Black-Scholes, Heston, and ML techniques.',
    language: 'Python',
    license: 'MIT',
    category: 'Research'
  },
  {
    name: 'TimeSeries-Prediciton-Research',
    url: 'https://github.com/MeridianAlgo/TimeSeries-Prediciton-Research',
    description: 'Time-Series Research is our way of understanding how it can relate to quantitative finance.',
    language: 'HTML',
    license: 'MIT',
    category: 'Research'
  }
];

const CATEGORIES = ['All', 'Machine Learning', 'Research', 'Analysis Tools', 'Libraries', 'Documentation', 'Tools'];

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
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 cursor-target ${selectedCategory === category
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
                className="group bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-orange-400/40 transition-all duration-300 hover:scale-105 flex flex-col cursor-target"
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
            className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg cursor-target"
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
