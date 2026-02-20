import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Github, Newspaper, Calculator, Database, Server, Cpu, Globe, Layers, ShieldCheck } from 'lucide-react';


const OPEN_SOURCE_PROJECTS = [
  {
    id: 1,
    title: "FinAI",
    description: "Finance-based LLM research and development with custom models.",
    tags: ["Python", "ML", "Finance"],
    icon: <Code2 className="w-6 h-6 text-blue-400" />,
    url: "https://github.com/MeridianAlgo/FinAI"
  },
  {
    id: 2,
    title: "Midnight.AI",
    description: "Multi-objective trading engine with Alpaca integration.",
    tags: ["Python", "Trading", "ML"],
    icon: <Cpu className="w-6 h-6 text-purple-400" />,
    url: "https://github.com/MeridianAlgo/Midnight.AI"
  },
  {
    id: 3,
    title: "Learn-Quant",
    description: "Educational utilities for beginners in Python and JavaScript.",
    tags: ["Python", "Education"],
    icon: <Globe className="w-6 h-6 text-green-400" />,
    url: "https://github.com/MeridianAlgo/Learn-Quant"
  },
  {
    id: 4,
    title: "Cryptvault",
    description: "Crypto analysis with AI predictions and pattern recognition.",
    tags: ["Python", "Crypto"],
    icon: <ShieldCheck className="w-6 h-6 text-yellow-400" />,
    url: "https://github.com/MeridianAlgo/Cryptvault"
  },
  {
    id: 5,
    title: "AraAI",
    description: "AI platform for stock volatility forecasting.",
    tags: ["Python", "Analysis"],
    icon: <Database className="w-6 h-6 text-cyan-400" />,
    url: "https://github.com/MeridianAlgo/AraAI"
  },
  {
    id: 6,
    title: "Apex-Analysis",
    description: "Beginner-friendly stock analysis and research platform.",
    tags: ["Python", "Tools"],
    icon: <Layers className="w-6 h-6 text-rose-400" />,
    url: "https://github.com/MeridianAlgo/Apex-Analysis"
  }
];

const FEATURES = [
  {
    title: 'Open Source',
    desc: 'Transparent, community-driven financial tools for everyone.',
  },
  {
    title: 'Easy to Use',
    desc: 'Repeatable and accessible financial utilities for daily use.',
  },
  {
    title: 'Accuracy First',
    desc: 'Precision and reliability are at the core of every tool we deliver.',
  }
];

const CODESTACK = [
  { name: 'Node.js', icon: <Server className="w-8 h-8 text-green-500" /> },
  { name: 'Python', icon: <Code2 className="w-8 h-8 text-blue-500" /> },
  { name: 'React', icon: <Code2 className="w-8 h-8 text-cyan-400" /> },
  { name: 'TypeScript', icon: <Code2 className="w-8 h-8 text-blue-400" /> },
  { name: 'PostgreSQL', icon: <Database className="w-8 h-8 text-indigo-400" /> },
  { name: 'TensorFlow', icon: <Cpu className="w-8 h-8 text-orange-500" /> }
];

const Home = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

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
      carousel.scrollLeft += 1;
      animationFrameId = requestAnimationFrame(scroll);
    };

    let isHovering = false;
    const startScrolling = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(scroll);
    };
    const stopScrolling = () => cancelAnimationFrame(animationFrameId);

    const handleMouseEnter = () => { isHovering = true; stopScrolling(); };
    const handleMouseLeave = () => { isHovering = false; startScrolling(); };
    const handleVisibility = () => {
      if (document.hidden || isHovering) stopScrolling();
      else startScrolling();
    };

    carousel.addEventListener('mouseenter', handleMouseEnter);
    carousel.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibility);

    startScrolling();

    return () => {
      cancelAnimationFrame(animationFrameId);
      carousel.removeEventListener('mouseenter', handleMouseEnter);
      carousel.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-black text-white selection:bg-orange-500/30">



      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 z-10">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/mountain.jpg')",
            filter: 'brightness(0.65)',
          }}
        />
        <div className="absolute inset-0 bg-black/60" />

        {/* Global Background Grid - Static Matrix Style */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-7xl font-display font-bold mb-6 text-white text-shadow-glow tracking-tight uppercase">
              Chart Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Ascent</span>
            </h1>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <p className="text-lg md:text-xl text-gray-200 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
              Advancing our future with financial tools and open-source resources.
            </p>
          </div>
          <div className="animate-fade-in-up flex flex-col sm:flex-row gap-5 justify-center items-center" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            <Link
              to="/tools"
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-base transition-all duration-300 shadow-xl hover:shadow-orange-500/20 active:scale-95 cursor-target"
            >
              Try Our Tools
            </Link>
            <Link
              to="/opensource"
              className="px-8 py-4 border border-orange-400/50 text-orange-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 rounded-xl font-bold text-base transition-all duration-300 backdrop-blur-sm active:scale-95 shadow-lg cursor-target"
            >
              Explore Open Source
            </Link>
          </div>
        </div>
      </section>

      {/* Content Body */}
      <div className="w-full relative z-10">

        {/* Purpose Section with Split Line */}
        <section id="purpose" className="relative py-32 overflow-hidden bg-black/80 backdrop-blur-sm">
          {/* Solid Orange Divider */}
          <div className="absolute top-0 left-0 w-full h-px bg-orange-500"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* The Solid Splitter Line - Top of Section Box */}
            <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] md:w-[calc(100%-12rem)] h-px bg-orange-400/25"></div>

            <div className="absolute -top-[152px] left-1/2 -translate-x-1/2 w-px h-[217px] bg-orange-400/25"></div>

            {/* Edge Vertical Lines (Frame) */}
            <div className="absolute top-16 left-6 md:left-24 w-px h-[698px] bg-orange-400/25"></div>
            <div className="absolute top-16 right-6 md:right-24 w-px h-[802px] bg-orange-400/25"></div>

            <div className="relative text-center space-y-6 pt-24">
              <div className="mb-16 max-w-3xl mx-auto">
                <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-orange-400 font-mono mb-6 inline-block bg-black/80 px-4 py-2 rounded-full border border-orange-400/30 backdrop-blur-sm">Our Purpose</span>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight uppercase leading-tight">
                  Building the <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Future of Finance</span>
                </h2>
                <p className="text-lg text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
                  We democratize financial intelligence through transparent research and powerful open-source utilities.
                </p>
              </div>

              <div className="relative grid md:grid-cols-3 gap-6 max-w-5xl mx-auto pb-12">
                {[
                  { icon: <Newspaper />, title: 'Weekly Newsletter', desc: 'Market analysis and financial strategies in your inbox.', link: '/newsletters' },
                  { icon: <Calculator />, title: 'Financial Tools', desc: 'Interactive calculators designed for real-world scenarios.', link: '/tools' },
                  { icon: <Code2 />, title: 'Open Source', desc: 'Access our libraries and contribute to the future of finance.', link: '/opensource' }
                ].map((box, i) => (
                  <Link key={i} to={box.link} className="group bg-black/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:border-orange-400/40 transition-all duration-300 hover:-translate-y-1 flex flex-col items-start text-left shadow-2xl z-20 cursor-target">
                    <div className="p-3 bg-orange-500/10 rounded-xl mb-6 group-hover:bg-orange-500/20 transition-colors ring-1 ring-orange-500/20">
                      {box.icon && React.cloneElement(box.icon as React.ReactElement, { className: "w-6 h-6 text-orange-400" })}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-orange-400 transition-colors">{box.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed font-light">{box.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Open Source Section - Full Screen Width */}
        <section className="relative py-32 overflow-hidden bg-black/80 backdrop-blur-sm">
          {/* Solid Orange Divider */}
          <div className="absolute top-0 left-0 w-full h-px bg-orange-500"></div>

          {/* Architectural Lines Continuing Through */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="max-w-7xl mx-auto px-6 h-full relative">
              <div className="absolute top-0 left-6 md:left-24 w-px h-[calc(100%+8rem)] bg-orange-400/25 z-0"></div>
              <div className="absolute top-0 right-6 md:right-24 w-px h-[calc(100%+8rem)] bg-orange-400/25 z-0"></div>
            </div>
          </div>

          <div className="relative z-10 text-center space-y-6 w-full">
            <div className="mb-12 max-w-3xl mx-auto px-6">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-orange-400 font-mono mb-6 inline-block bg-black/80 px-4 py-2 rounded-full border border-orange-400/30 backdrop-blur-sm">Our Code</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight uppercase leading-tight">
                For the <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Community</span>
              </h2>
              <p className="text-lg text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
                Transparent code powering the next generation of analysts.
              </p>
            </div>

            <div
              ref={carouselRef}
              className="flex overflow-x-hidden gap-8 px-6 py-4 cursor-grab active:cursor-grabbing scroll-smooth z-20 relative w-full"
            >
              {[...OPEN_SOURCE_PROJECTS, ...OPEN_SOURCE_PROJECTS, ...OPEN_SOURCE_PROJECTS].map((project, index) => (
                <div
                  key={`${project.id}-${index}`}
                  className={`flex-none w-[400px] bg-black/80 backdrop-blur-xl border border-white/10 hover:border-orange-400/40 p-8 rounded-[2rem] transition-all duration-500 group relative overflow-hidden flex flex-col shadow-2xl cursor-target`}
                >
                  <div className="flex items-center space-x-5 mb-8 relative z-10">
                    <div className="p-4 bg-gray-900 rounded-xl ring-1 ring-white/10 group-hover:ring-orange-400/40 transition-all duration-300">
                      {project.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors tracking-tight uppercase leading-none">{project.title}</h3>
                  </div>
                  <p className="text-gray-400 mb-8 relative z-10 leading-relaxed min-h-[80px] text-sm font-light text-left">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-8 relative z-10">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="text-[10px] font-mono uppercase tracking-wider px-3 py-1.5 bg-white/5 text-gray-300 rounded-lg border border-white/10 group-hover:border-orange-400/20 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto w-full inline-flex items-center justify-center px-6 py-3 bg-orange-500/5 hover:bg-orange-500 text-white rounded-xl font-bold transition-all duration-300 border border-orange-400/10 group-hover:border-transparent shadow-lg uppercase tracking-widest text-[10px] cursor-target"
                  >
                    <Github className="w-4 h-4 mr-3" />
                    Repository
                  </a>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link to="/opensource" className="px-6 py-3 rounded-xl border border-orange-400/40 text-orange-400 hover:bg-orange-500 hover:text-white transition-all duration-300 font-bold whitespace-nowrap text-xs uppercase tracking-[0.2em] shadow-lg inline-block cursor-target">
                Explore All Projects
              </Link>
            </div>
          </div>
        </section>

        {/* Why MeridianAlgo Section - Matched Typography & Continuity */}
        <section className="py-32 bg-black/80 backdrop-blur-sm relative">
          {/* Solid Orange Divider */}
          <div className="absolute top-0 left-0 w-full h-px bg-orange-500"></div>

          {/* Architectural Lines Continuing Through */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="max-w-7xl mx-auto px-6 h-full relative">
              <div className="absolute top-0 left-6 md:left-24 w-px h-[calc(100%+8rem)] bg-orange-400/25 z-0"></div>
              <div className="absolute top-0 right-6 md:right-24 w-px h-[calc(100%+8rem)] bg-orange-400/25 z-0"></div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-orange-400 font-mono mb-6 inline-block bg-black/80 px-4 py-2 rounded-full border border-orange-400/30 backdrop-blur-sm">Core Values</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight uppercase leading-tight">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Standard</span>
            </h2>
            <p className="text-lg text-gray-400 font-light max-w-2xl mx-auto leading-relaxed mb-16">
              Precision, transparency, and accessibility.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
              {FEATURES.map((feature, index) => (
                <div key={index} className="bg-gray-900/20 backdrop-blur-sm rounded-[2rem] p-10 border border-white/5 transition-all duration-500 hover:border-orange-400/40 group relative overflow-hidden z-20 cursor-target">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <h3 className="text-xl font-bold text-white mb-6 tracking-tight group-hover:text-orange-400 transition-colors uppercase font-display leading-tight">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-light">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Codestack Section (Formerly Start Now) */}
        <section className="py-32 relative bg-black/80 backdrop-blur-sm">
          {/* Solid Orange Divider */}
          <div className="absolute top-0 left-0 w-full h-px bg-orange-500"></div>

          {/* Architectural Lines Ending */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="max-w-7xl mx-auto px-6 h-full relative">
              <div className="absolute top-0 left-6 md:left-24 w-px h-full bg-orange-400/25 z-0"></div>
              <div className="absolute top-0 right-6 md:right-24 w-px h-full bg-orange-400/25 z-0"></div>
              {/* Bottom Cap Line */}
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] md:w-[calc(100%-12rem)] h-px bg-orange-400/25 z-0"></div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-12 tracking-tight uppercase leading-tight">
              About Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Codestack</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
              {CODESTACK.map((tech, i) => (
                <div key={i} className="flex flex-col items-center justify-center p-6 bg-gray-900/50 rounded-2xl border border-white/5 hover:border-orange-400/30 transition-all hover:-translate-y-1">
                  <div className="mb-4">{tech.icon}</div>
                  <span className="text-gray-400 text-sm font-mono uppercase">{tech.name}</span>
                </div>
              ))}
            </div>

            <p className="text-lg text-gray-400 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
              Built with cutting-edge open source technologies for performance, reliability, and scale.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <Link to="/about" className="w-full sm:w-auto px-12 py-5 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold text-lg transition-all shadow-xl active:scale-95 text-center uppercase tracking-wider cursor-target">
                Our Story
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;