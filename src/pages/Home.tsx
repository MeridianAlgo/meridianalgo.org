import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Github } from 'lucide-react';

const OPEN_SOURCE_PROJECTS = [
  {
    id: 1,
    title: "In-NodeJS",
    description: "Advanced Node.js-based trading tools for algorithmic research, leveraging Alpaca's paper trading API for stocks and crypto.",
    tags: ["JavaScript", "Trading", "API"],
    icon: <Code2 className="w-7 h-7 text-blue-400" />,
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    hoverBorderClass: "hover:border-blue-400/60",
    url: "https://github.com/MeridianAlgo/In-NodeJS"
  },
  {
    id: 2,
    title: "In-Pine",
    description: "Machine-learning-driven trading tools and indicators for TradingView, written in Pine Script.",
    tags: ["Pine Script", "TradingView", "ML"],
    icon: <Code2 className="w-7 h-7 text-purple-400" />,
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    hoverBorderClass: "hover:border-purple-400/60",
    url: "https://github.com/MeridianAlgo/In-Pine"
  },
  {
    id: 3,
    title: "Python Library",
    description: "A comprehensive Python library for algorithmic trading and financial analysis. Also available on PyPI.",
    tags: ["Python", "PyPI", "Backtesting"],
    icon: <Code2 className="w-7 h-7 text-green-400" />,
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    hoverBorderClass: "hover:border-green-400/60",
    url: "https://github.com/MeridianAlgo/Packages"
  },
  {
    id: 4,
    title: "BitFlow",
    description: "Advanced trading engine built with Node.js for high-performance algorithmic trading and real-time market data processing.",
    tags: ["Node.js", "Engine", "Real-time"],
    icon: <Code2 className="w-7 h-7 text-yellow-400" />,
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/30",
    hoverBorderClass: "hover:border-yellow-400/60",
    url: "https://github.com/MeridianAlgo/In-NodeJS/tree/main/BitFlow"
  },
  {
    id: 5,
    title: "Cryptvault",
    description: "Charting resource using machine learning to identify the best types of charting on specific tickers.",
    tags: ["Python", "ML", "Charting"],
    icon: <Code2 className="w-7 h-7 text-red-400" />,
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    hoverBorderClass: "hover:border-red-400/60",
    url: "https://github.com/MeridianAlgo/Cryptvault"
  },
  {
    id: 6,
    title: "Time Series Research",
    description: "Advanced time series analysis and prediction models for financial market data.",
    tags: ["Python", "ML", "Prediction"],
    icon: <Code2 className="w-7 h-7 text-indigo-400" />,
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/30",
    hoverBorderClass: "hover:border-indigo-400/60",
    url: "https://github.com/MeridianAlgo/TimeSeries-Prediction"
  }
];

const HERO_BUTTONS = [
  { name: 'Open Source', to: '/opensource' },
  { name: 'Newsletters', to: '/newsletters' },
];

const FEATURES = [
  {
    icon: (
      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'AI-Driven',
    desc: 'Smart, adaptive algorithms that learn and evolve with the market.',
    color: 'text-emerald-400'
  },
  {
    icon: (
      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 20l9-5-9-5-9 5 9 5z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 12V4m0 0L3 9m9-5l9 5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Open Source',
    desc: 'Transparent, community-driven code for everyone.',
    color: 'text-blue-400'
  },
  {
    icon: (
      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <rect width="20" height="14" x="2" y="5" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 10h20" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Easily Understandable',
    desc: 'Intuitive tools and clear documentation for all experience levels.',
    color: 'text-purple-400'
  },
  {
    icon: (
      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Accuracy First',
    desc: 'Precision and reliability are at the core of every strategy.',
    color: 'text-amber-400'
  },
];

const Home = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const hoverCountRef = useRef<number>(0);

  useEffect(() => {
    document.title = 'MeridianAlgo - Home';

    const carousel = carouselRef.current;
    if (!carousel) return;

    let animationFrameId: number;
    const getHalfWidth = () => carousel.scrollWidth / 2;

    const scroll = () => {
      const half = getHalfWidth();
      if (carousel.scrollLeft >= half) {
        carousel.scrollLeft = 0;
      }
      carousel.scrollLeft += 0.6; // Adjust speed
      animationFrameId = requestAnimationFrame(scroll);
    };

    const startScrolling = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(scroll);
    };

    const stopScrolling = () => {
      cancelAnimationFrame(animationFrameId);
    };

    // Pause only when truly hovering a card (avoid child bubbling issues)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const related = (e as MouseEvent).relatedTarget as HTMLElement | null;
      const card = target ? target.closest('.carousel-card') as HTMLElement | null : null;
      // Genuine enter: coming from outside the card
      if (card && (!related || !card.contains(related))) {
        hoverCountRef.current += 1;
        stopScrolling();
      }
    };
    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const related = (e as MouseEvent).relatedTarget as HTMLElement | null;
      const card = target ? target.closest('.carousel-card') as HTMLElement | null : null;
      // Genuine leave: moving to outside the card
      if (card && (!related || !card.contains(related))) {
        hoverCountRef.current = Math.max(0, hoverCountRef.current - 1);
        if (hoverCountRef.current === 0) startScrolling();
      }
    };

    // Resume when leaving the carousel area entirely
    const handleMouseLeaveCarousel = () => {
      hoverCountRef.current = 0;
      startScrolling();
    };

    // Handle tab visibility change to keep animation consistent
    const handleVisibility = () => {
      if (document.hidden) {
        stopScrolling();
      } else if (hoverCountRef.current === 0) {
        startScrolling();
      }
    };

    carousel.addEventListener('mouseover', handleMouseOver);
    carousel.addEventListener('mouseout', handleMouseOut);
    carousel.addEventListener('mouseleave', handleMouseLeaveCarousel);
    document.addEventListener('visibilitychange', handleVisibility);

    startScrolling();

    return () => {
      cancelAnimationFrame(animationFrameId);
      carousel.removeEventListener('mouseover', handleMouseOver);
      carousel.removeEventListener('mouseout', handleMouseOut);
      carousel.removeEventListener('mouseleave', handleMouseLeaveCarousel);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);
  
  return (
    <div className="relative min-h-screen w-full bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("/mountain.jpg")', backgroundPosition: 'center 30%' }}>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/80"></div>
        
        {/* Content */}
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Chart Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-orange-400">Ascent</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Empowering your trading journey with open-source AI algorithms and data-driven insights.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {HERO_BUTTONS.map((button) => (
                <Link
                  key={button.name}
                  to={button.to}
                  className="px-8 py-3 text-lg font-medium rounded-lg border-2 border-white text-white hover:bg-orange-600 hover:border-orange-600 transition-all duration-300 flex items-center space-x-2 group"
                >
                  <span>{button.name}</span>
                  <svg 
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="w-full relative z-10 bg-black">
        {/* Hero Section */}
        <section className="py-32 relative overflow-hidden border-b border-gray-800">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTIxIDMyYzAtMi4yMDktMS43OTEtNC00LTRzLTQgMS43OTEtNCA0IDEuNzkxIDQgNCA0IDQtMS43OTEgNC00em0tMiAwYzAtMS4xMDQtLjg5Ni0yLTItMnMtMiAuODk2LTIgMiAuODk2IDIgMiAyIDItLjg5NiAyLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-8">
              <div className="text-center mb-16 max-w-5xl mx-auto">
              <span className="text-sm uppercase tracking-wider text-orange-400 font-mono mb-4 inline-block">Our Purpose</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Teaching <span className="text-orange-400">Finance to Everyone</span>
              </h2>
              <div className="w-24 h-1 bg-orange-400 mx-auto mb-8"></div>
            </div>
            
            <div className="bg-black/60 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
              <div className="prose prose-invert max-w-none text-lg text-gray-300 leading-relaxed">
                <p className="text-xl mb-6">
                  We believe that <span className="text-white font-medium">financial literacy should be accessible to all age groups</span>, regardless of their background or experience. Our mission is to empower individuals through comprehensive financial education, research, and practical tools for the modern digital economy.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mt-12">
                  <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-orange-400/60 transition-colors">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mt-1">
                        <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">Weekly Newsletter</h3>
                        <p className="text-gray-400">Stay updated with our weekly insights on markets, strategies, and financial education.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-orange-400/30 transition-colors">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mt-1">
                        <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">Open Source Code</h3>
                        <p className="text-gray-400">Explore our public repos and contribute to advanced trading tools.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-orange-400/30 transition-colors">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mt-1">
                        <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">Research</h3>
                        <p className="text-gray-400">Advancing financial knowledge through cutting-edge research and analysis.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 text-center">
                <a 
                  href="/about" 
                  className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-orange-500 hover:bg-orange-600 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </section>


        {/* Divider removed to avoid double line with section border-b */}

        {/* Our Code Section */}
        <section className="py-24 bg-black">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <div className="mb-16">
              <span className="text-sm uppercase tracking-wider text-orange-400 font-mono mb-4 inline-block">Our Work</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Open Source <span className="text-orange-400">Codebase</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto mb-8"></div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Explore our growing collection of open-source projects designed to democratize access to algorithmic trading tools and education.
              </p>
            </div>
            
            <div className="relative overflow-hidden group">
              <div 
                ref={carouselRef}
                className="flex overflow-x-auto pb-8 -mx-4 px-4 hide-scrollbar"
                style={{ scrollBehavior: 'smooth' }}
              >
                <div className="flex space-x-6">
                  {[...OPEN_SOURCE_PROJECTS, ...OPEN_SOURCE_PROJECTS].map((project, index) => (
                    <div 
                      key={`${project.id}-${index}`}
                      className={`carousel-card flex-none w-72 md:w-80 bg-gray-900/80 p-6 rounded-2xl border ${project.borderColor} ${project.hoverBorderClass} transition-colors duration-300 h-full flex flex-col`}
                    >
                      <div className={`w-14 h-14 ${project.bgColor} rounded-xl flex items-center justify-center mb-4 mx-auto`}>
                        {project.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 text-center">{project.title}</h3>
                      <p className="text-gray-300 text-sm mb-4 text-center">{project.description}</p>
                      <div className="flex flex-wrap justify-center gap-2 mb-4">
                        {project.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="text-xs px-3 py-1 bg-gray-800 text-gray-300 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a 
                        href={project.url}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mt-auto w-full inline-flex items-center justify-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        View on GitHub
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-gray-800 my-12"></div>

        {/* Features Section */}
        <section className="py-24 bg-black">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <span className="text-sm uppercase tracking-wider text-orange-400 font-mono mb-4 inline-block">Why Choose Us</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                The <span className="text-white">MeridianAlgo</span> <span className="text-orange-400">Advantage</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {FEATURES.map((feature, index) => (
                <div key={index} className="group relative p-0.5 rounded-2xl bg-gradient-to-br from-orange-500/20 to-yellow-500/20 hover:opacity-100 transition-all duration-300">
                  <div className="bg-gray-900/80 p-8 rounded-2xl h-full backdrop-blur-sm">
                    <div className={`w-16 h-16 ${feature.color} bg-opacity-10 rounded-xl flex items-center justify-center mb-6`}>
                      {feature.icon}
                    </div>
                    <h3 className={`text-2xl font-bold mb-4 ${feature.color}`}>{feature.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Divider */}
        <div className="w-full h-px bg-gray-800 my-12"></div>

        {/* Community Section */}
        <section className="py-20 bg-black">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-sm uppercase tracking-wider text-orange-400 font-mono mb-4 inline-block">Join Us</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Our <span className="text-orange-400">Community</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto mb-8"></div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Join a growing community of traders, developers, and financial enthusiasts working together to democratize access to algorithmic trading tools and education.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-orange-400/30 transition-all hover:scale-[1.02]">
                <div className="w-14 h-14 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-7 h-7 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Collaborate</h3>
                <p className="text-gray-300 text-sm mb-4">Work with like-minded individuals on open-source projects and trading strategies.</p>
              </div>

              <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-orange-400/30 transition-all hover:scale-[1.02]">
                <div className="w-14 h-14 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-7 h-7 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0114 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Learn & Grow</h3>
                <p className="text-gray-300 text-sm mb-4">Access educational resources and learn from experienced traders and developers.</p>
              </div>

              <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-orange-400/30 transition-all hover:scale-[1.02]">
                <div className="w-14 h-14 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-7 h-7 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Contribute</h3>
                <p className="text-gray-300 text-sm mb-4">Share your knowledge and contribute to the future of open-source trading tools.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-20 bg-black">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-sm uppercase tracking-wider text-orange-400 font-mono mb-4 inline-block">Our Stack</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Modern <span className="text-orange-400">Technology</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto mb-8"></div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Built with cutting-edge technologies to deliver powerful and reliable trading tools.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-orange-400/30 transition-all hover:scale-[1.02]">
                <div className="w-14 h-14 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <Code2 className="w-7 h-7 text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Node.js</h3>
                <p className="text-gray-300 text-sm">High-performance JavaScript runtime for building scalable back-end services.</p>
              </div>

              <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-yellow-400/30 transition-all hover:scale-[1.02]">
                <div className="w-14 h-14 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-7 h-7 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Pine Script</h3>
                <p className="text-gray-300 text-sm">Powerful scripting language for developing custom indicators and strategies.</p>
              </div>

              <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-green-400/30 transition-all hover:scale-[1.02]">
                <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.462 3.501a.75.75 0 00-1.043.85l3.18 6.678a.75.75 0 01-.688.971H10.5a.75.75 0 000 1.5h4.412a.75.75 0 01.688.97l-3.18 6.679a.75.75 0 101.316.624l3.5-7.333a.75.75 0 000-.85l-3.5-7.333a.75.75 0 00-.273-.226z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.538 3.501a.75.75 0 011.043.85l-3.18 6.678a.75.75 0 00.688.971H13.5a.75.75 0 010 1.5H9.088a.75.75 0 00-.688.97l3.18 6.679a.75.75 0 11-1.316.624l-3.5-7.333a.75.75 0 010-.85l3.5-7.333a.75.75 0 01.273-.226z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Python</h3>
                <p className="text-gray-300 text-sm">Versatile language for backtesting, data analysis, and strategy development.</p>
              </div>
            </div>
          </div>
        </section>
        
      </div>
    </div>
  );
};

export default Home;