import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Github, Newspaper, FlaskConical } from 'lucide-react';

const OPEN_SOURCE_PROJECTS = [
  {
    id: 1,
    title: "In-NodeJS",
    description: "Interactive Node.js-based simulations for community financial literacy workshops across the Midwest.",
    tags: ["JavaScript", "Education", "Community"],
    icon: <Code2 className="w-7 h-7 text-blue-400" />,
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    hoverBorderClass: "hover:border-blue-400/60",
    url: "https://github.com/MeridianAlgo/In-NodeJS"
  },
  {
    id: 2,
    title: "In-Pine",
    description: "Pine Script lessons that visualize market movements and personal finance concepts for educators and students.",
    tags: ["Pine Script", "Classroom", "Visualization"],
    icon: <Code2 className="w-7 h-7 text-purple-400" />,
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    hoverBorderClass: "hover:border-purple-400/60",
    url: "https://github.com/MeridianAlgo/In-Pine"
  },
  {
    id: 3,
    title: "Python Library",
    description: "A comprehensive Python library for budgeting labs, classroom activities, and community data storytelling. Also available on PyPI.",
    tags: ["Python", "PyPI", "Education"],
    icon: <Code2 className="w-7 h-7 text-green-400" />,
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    hoverBorderClass: "hover:border-green-400/60",
    url: "https://github.com/MeridianAlgo/Packages"
  },
  {
    id: 4,
    title: "JavaScript Library",
    description: "A collection of JavaScript utilities for financial calculations and API interactions.",
    tags: ["JavaScript", "Utilities", "Finance"],
    icon: <Code2 className="w-7 h-7 text-yellow-400" />,
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/30",
    hoverBorderClass: "hover:border-yellow-400/60",
    url: "https://github.com/MeridianAlgo/"
  }
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
    desc: 'Data-informed insights that translate complex markets into relatable lessons.',
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
    desc: 'Transparent, community-driven curriculum for everyone.',
    color: 'text-blue-400'
  },
  {
    icon: (
      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <rect width="20" height="14" x="2" y="5" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 10h20" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Easy to Use',
    desc: 'We make everything we do repeatable and easy allowing you to focus on what matters most.',
    color: 'text-purple-400'
  },
  {
    icon: (
      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Accuracy First',
    desc: 'Precision and reliability are at the core of every lesson we deliver.',
    color: 'text-amber-400'
  },
  {
    icon: (
      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Lightning Fast',
    desc: 'Our digital resources are optimized for quick, accessible learning moments.',
    color: 'text-yellow-400'
  },
  {
    icon: (
      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 17l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Scalable',
    desc: 'From local classrooms to regional coalitions.',
    color: 'text-cyan-400'
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
      carousel.scrollLeft += 1.5; // Adjust speed
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/mountain.jpg')",
            filter: 'blur(0px) brightness(0.65)',
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-white">
              Chart Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Ascent</span>
            </h1>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <p className="text-xl md:text-2xl text-gray-200 font-light mb-12 max-w-3xl mx-auto leading-relaxed">
              Empowering the next generation with practical finance education, research, and open-source tools for lasting wealth.
            </p>
          </div>
          <div className="animate-fade-in-up flex flex-col sm:flex-row gap-6 justify-center items-center" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            <Link 
              to="/financial-literacy" 
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg"
            >
              Get Started
            </Link>
            <Link 
              to="/opensource" 
              className="px-8 py-4 border-2 border-orange-400 text-orange-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 rounded-xl font-semibold text-lg transition-all duration-300"
            >
              Explore Open Source
            </Link>
          </div>
        </div>

   
      </section>

      {/* Main Content */}
      <div className="w-full relative z-10 bg-black">
        {/* Hero Section */}
        <section id="purpose" className="py-32 relative overflow-hidden border-b border-gray-800">
          <div className="absolute inset-0">
            {/* Tiny dots pattern */}
            <div className="absolute inset-0 [background-image:radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:20px_20px]"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-8">
              <div className="text-center mb-20 max-w-4xl mx-auto">
              <span className="text-xs uppercase tracking-widest text-orange-400 font-mono mb-6 inline-block bg-orange-400/10 px-4 py-2 rounded-full">Our Purpose</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                Teaching <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Finance to Everyone</span>
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto mb-8"></div>
            </div>
            
            <div className="bg-black/60 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
              <div className="prose prose-invert max-w-none text-lg text-gray-300 leading-relaxed">
                <p className="text-lg mb-8 text-gray-200 font-light max-w-3xl mx-auto">
                  We believe <span className="text-white font-medium">financial literacy should be accessible to everyone</span>, regardless of background or experience. Our mission: empower individuals through practical education, research, and open-source tools.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mt-12">
                  <Link to="/newsletters" className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-orange-400/60 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mt-1">
                        <Newspaper className="w-6 h-6 text-orange-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Weekly Newsletter</h3>
                        <p className="text-gray-400 text-sm">Weekly insights on markets, strategies, and financial education.</p>
                      </div>
                    </div>
                  </Link>
                  
                  <Link to="/opensource" className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-orange-400/30 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mt-1">
                        <Code2 className="w-6 h-6 text-orange-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Open Source Code</h3>
                        <p className="text-gray-400 text-sm">Explore our public repos and contribute to open-source financial literacy resources.</p>
                      </div>
                    </div>
                  </Link>
                  
                  <Link to="/research" className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-orange-400/30 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mt-1">
                        <FlaskConical className="w-6 h-6 text-orange-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Research</h3>
                        <p className="text-gray-400 text-sm">Advancing financial knowledge through cutting-edge research and analysis.</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
              
              <div className="mt-12 text-center">
                <a 
                  href="/about" 
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-orange-400 text-orange-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 text-base font-medium rounded-xl md:py-4 md:text-lg md:px-10 transition-all duration-300"
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
              <span className="text-xs uppercase tracking-widest text-orange-400 font-mono mb-6 inline-block bg-orange-400/10 px-4 py-2 rounded-full">Our Work</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 leading-tight">
                Open Source <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Codebase</span>
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto mb-8"></div>
              <p className="text-base text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
                Explore our growing collection of open-source projects designed to strengthen financial literacy and community wealth in the Midwest.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {OPEN_SOURCE_PROJECTS.map((project, index) => (
                  <div key={index} className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800 hover:border-orange-400/40 transition-all duration-300 flex flex-col">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-xl mb-4 mx-auto">
                      <Github className="w-8 h-8 text-orange-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-3 text-center">{project.title}</h3>
                    <p className="text-gray-300 text-xs mb-4 text-center leading-relaxed">{project.description}</p>
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
                      className="mt-auto w-full inline-flex items-center justify-center px-4 py-2 border-2 border-orange-400 text-orange-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 rounded-lg text-sm font-medium transition-all duration-300"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      View on GitHub
                    </a>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-gray-800 my-12"></div>

        {/* Why Choose Us Section */}
        <section className="py-32 bg-black">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <span className="text-xs uppercase tracking-widest text-orange-400 font-mono mb-6 inline-block bg-orange-400/10 px-4 py-2 rounded-full">Why Choose Us</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">MeridianAlgo</span>?
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto mb-8"></div>
              <p className="text-lg text-gray-200 font-light max-w-3xl mx-auto">
                We combine cutting-edge technology with transparent, open-source development to democratize financial markets.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {FEATURES.map((feature, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 hover:border-orange-400/40 transition-all duration-300 flex flex-col hover:shadow-lg hover:shadow-orange-500/10"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-3 text-center">{feature.title}</h3>
                    <p className="text-gray-300 text-sm mb-4 text-center leading-relaxed">{feature.desc}</p>
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
            <div className="text-center mb-16 animate-fade-in-up">
              <span className="text-xs uppercase tracking-widest text-orange-400 font-mono mb-6 inline-block bg-orange-400/10 px-4 py-2 rounded-full">Join Us</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 leading-tight">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Community</span>
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto"></div>
            </div>
            <p className="text-base text-gray-300 max-w-2xl mx-auto leading-relaxed font-light mb-12">
              Join educators, developers, and neighbors collaborating to expand financial confidence and education across Midwestern communities.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-orange-400/30 transition-all hover:scale-[1.02] animate-slide-in-left">
                <div className="w-14 h-14 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-7 h-7 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">Collaborate</h3>
                <p className="text-gray-300 text-sm mb-4">Work with like-minded individuals on open-source projects and community finance education.</p>
              </div>

              <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-orange-400/30 transition-all hover:scale-[1.02] animate-scale-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                <div className="w-14 h-14 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-7 h-7 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0114 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">Learn & Grow</h3>
                <p className="text-gray-300 text-sm mb-4">Access educational resources and learn from experienced mentors and developers.</p>
              </div>

              <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-orange-400/30 transition-all hover:scale-[1.02] animate-slide-in-right" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
                <div className="w-14 h-14 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-7 h-7 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">Contribute</h3>
                <p className="text-gray-300 text-sm mb-4">Share your knowledge and contribute to the future of open-source financial literacy resources.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-gray-800 my-12"></div>

        {/* Technology Section */}
        <section className="py-20 bg-black">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-widest text-orange-400 font-mono mb-6 inline-block bg-orange-400/10 px-4 py-2 rounded-full">Our Stack</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 leading-tight">
                Modern <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Technology</span>
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto mb-8"></div>
              <p className="text-base text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
                Built with cutting-edge technologies to deliver powerful and reliable financial education tools.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-orange-400/30 transition-all hover:scale-[1.02]">
                <div className="w-14 h-14 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <Code2 className="w-7 h-7 text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">Node.js</h3>
                <p className="text-gray-300 text-xs">High-performance JavaScript runtime for building scalable back-end services that power our education tools.</p>
              </div>

              <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-yellow-400/30 transition-all hover:scale-[1.02]">
                <div className="w-14 h-14 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-7 h-7 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">Pine Script</h3>
                <p className="text-gray-300 text-xs">Powerful scripting language for developing custom indicators that teach real-world finance concepts.</p>
              </div>

              <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-green-400/30 transition-all hover:scale-[1.02]">
                <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-7 h-7 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">Python</h3>
                <p className="text-gray-300 text-xs">Versatile language for backtesting, data analysis, and strategy development.</p>
              </div>

              <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-blue-400/30 transition-all hover:scale-[1.02]">
                <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">Java</h3>
                <p className="text-gray-300 text-xs">Enterprise-grade language for robust, scalable financial education applications.</p>
              </div>

              <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-purple-400/30 transition-all hover:scale-[1.02]">
                <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">HTML</h3>
                <p className="text-gray-300 text-xs">Foundation markup language for building modern web interfaces.</p>
              </div>

              <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-cyan-400/30 transition-all hover:scale-[1.02]">
                <div className="w-14 h-14 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.611L5 14.5" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">React</h3>
                <p className="text-gray-300 text-xs">Modern JavaScript library for building interactive user interfaces.</p>
              </div>
            </div>
          </div>
        </section>
        
      </div>
    </div>
  );
};

export default Home;