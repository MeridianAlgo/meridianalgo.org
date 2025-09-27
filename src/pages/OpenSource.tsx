import { useEffect, useState } from 'react';
import { Github, Code2, ExternalLink, Users } from 'lucide-react';

const PROJECTS = [
  {
    name: 'In-NodeJS',
    url: 'https://github.com/MeridianAlgo/In-NodeJS',
    description: 'Interactive Node.js-based simulations for classroom discussions on investing fundamentals and community wealth building.',
    category: 'Resources',
    language: 'JavaScript',
    features: ['Financial Simulations', 'Teaching Resources', 'Community Workshops']
  },
  {
    name: 'In-Pine',
    url: 'https://github.com/MeridianAlgo/In-Pine',
    description: 'Educational Pine Script lessons that explain market movements and personal finance concepts through visual indicators.',
    category: 'Education',
    language: 'Pine Script',
    features: ['Interactive Lessons', 'Visual Indicators', 'Self-Guided Learning']
  },
  {
    name: 'Python Library',
    url: 'https://github.com/MeridianAlgo/Packages',
    description: 'A comprehensive Python library for financial literacy workshops, budgeting labs, and community data storytelling. Also available on PyPI.',
    category: 'Resources',
    language: 'Python',
    features: ['PyPI Package', 'Budgeting Labs', 'Data Storytelling']
  },
  {
    name: 'JavaScript Packages',
    url: 'https://github.com/MeridianAlgo/Javascript-Packages',
    description: 'Collection of JavaScript packages and utilities for building financial literacy dashboards and interactive lessons.',
    category: 'Resources',
    language: 'JavaScript',
    features: ['NPM Packages', 'Education Utilities', 'Financial Tools']
  },
  {
    name: 'Utilities',
    url: 'https://github.com/MeridianAlgo/Utils',
    description: 'Utility scripts and tools for managing financial education events, surveys, and community research.',
    category: 'Resources',
    language: 'Python',
    features: ['Data Processing', 'Community Surveys', 'Research Tools']
  },
  {
    name: 'BitFlow',
    url: 'https://github.com/MeridianAlgo/In-NodeJS/tree/main/BitFlow',
    description: 'Real-time data exploration engine built with Node.js to help classrooms analyze market trends and personal finance scenarios.',
    category: 'Learning Platform',
    language: 'JavaScript',
    features: ['Real-time Insights', 'Market Education', 'Interactive Demos']
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
    description: 'Machine learning tools that support financial equity research and help students explore economic resilience metrics.',
    category: 'Education',
    language: 'Python',
    features: ['ML Education', 'Equity Metrics', 'Community Analysis']
  },
  {
    name: 'Cryptvault',
    url: 'https://github.com/MeridianAlgo/Cryptvault',
    description: 'Charting resource using machine learning to explain savings and investment concepts across different community case studies.',
    category: 'Education',
    language: 'Python',
    features: ['Charting Analysis', 'ML Optimization', 'Community Case Studies']
  },
  {
    name: 'TimeSeries Research',
    url: 'https://github.com/MeridianAlgo/TimeSeries-Prediction',
    description: 'Advanced time series analysis tools used in our research to forecast Midwestern economic trends and household resilience.',
    category: 'Research',
    language: 'Python',
    features: ['Time Series Analysis', 'Economic Forecasting', 'ML Models']
  }
];

const CATEGORIES = [
  { name: 'All', color: 'orange' },
  { name: 'Resources', color: 'orange' },
  { name: 'Education', color: 'orange' },
  { name: 'Learning Platform', color: 'orange' },
  { name: 'Machine Learning', color: 'orange' }
];

const OpenSource = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  useEffect(() => {
    document.title = 'MeridianAlgo - Open Source';
  }, []);

  const filteredProjects = selectedCategory === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(project => project.category === selectedCategory);

  const getLanguageColor = (language: string): string => {
    const colors: Record<string, string> = {
      'JavaScript': 'bg-yellow-500',
      'Python': 'bg-orange-500',
      'Pine Script': 'bg-orange-400',
      'TypeScript': 'bg-orange-600'
    };
    return colors[language] || 'bg-gray-500';
  };

  const getCategoryColor = () => {
    // Unified orange theme for all cards
    return 'border-orange-400 bg-orange-500/5';
  };

  return (
    <div className="relative min-h-screen w-full bg-black pt-24 overflow-x-hidden overflow-y-auto">

      {/* Hero Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <Github className="w-16 h-16 text-orange-400 mr-4" />
            <h1 className="text-white text-5xl md:text-7xl font-extrabold drop-shadow-2xl font-inter" style={{ textShadow: '0 4px 32px rgba(0,0,0,0.7)' }}>
              Open Source
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-slate-200 mb-8 font-inter font-light max-w-4xl mx-auto" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.5)' }}>
            MeridianAlgo is built on the belief that transparency and collaboration drive community prosperity. Our open source lessons, simulations, and research help Midwestern learners build lasting financial confidence together.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">10</div>
              <div className="text-slate-300 font-inter">Active Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-300 mb-2">100%</div>
              <div className="text-slate-300 font-inter">Open Source</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">MIT</div>
              <div className="text-slate-300 font-inter">Licensed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {CATEGORIES.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 font-inter ${
                  selectedCategory === category.name
                    ? 'bg-orange-600 text-white shadow-lg scale-105'
                    : 'bg-slate-800/60 text-slate-300 hover:bg-orange-600/20 hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.name} 
                className={`group bg-slate-900/40 backdrop-blur-md rounded-2xl p-6 border-2 ${getCategoryColor()} hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex flex-col`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Code2 className="w-8 h-8 text-orange-400" />
                    <div>
                      <h3 className="text-white text-lg font-semibold leading-snug">{project.name}</h3>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`w-3 h-3 rounded-full ${getLanguageColor(project.language)}`}></span>
                        <span className="text-xs text-slate-400 font-inter">{project.language}</span>
                        <span className="text-xs font-medium text-gray-300 bg-gray-700/50 px-2 py-0.5 rounded-full whitespace-nowrap">
                          {project.category}
                        </span>
                      </div>
                    </div>
                  </div>
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
                        className="px-3 py-1 text-xs bg-orange-900/20 text-orange-300 rounded-full font-inter"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3 mt-auto">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 font-inter group-hover:shadow-lg h-12"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Code</span>
                  </a>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 bg-white text-gray-900 hover:bg-orange-600 hover:text-white border border-gray-200 rounded-xl transition-all duration-300 flex items-center justify-center h-12 w-12"
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
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-orange-900/10 to-orange-900/20 rounded-3xl p-12 border border-orange-400/30">
            <Users className="w-16 h-16 text-orange-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-inter">Join Our Community</h2>
            <p className="text-xl text-slate-200 mb-8 font-inter font-light">
              By making our technology open, we empower a global community to innovate, learn, and build a more equitable financial future—together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/MeridianAlgo"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 font-inter"
              >
                <Github className="w-5 h-5" />
                <span>Explore All Repositories</span>
              </a>
              <a
                href="/contact"
                className="bg-white text-gray-900 border border-gray-200 hover:bg-orange-600 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 font-inter"
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