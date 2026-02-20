import { TrendingUp, BarChart3, BookOpen, Users, Target, ChevronDown } from 'lucide-react';
import { useEffect } from 'react';

const Research = () => {
  useEffect(() => {
    document.title = 'MeridianAlgo - Research';
  }, []);

  const scrollToContent = () => {
    const focusSection = document.getElementById('focus');
    if (focusSection) {
      focusSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const researchAreas = [
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-400" />,
      title: "Market Analysis",
      description: "Deep-dive research into Midwestern economic trends, cost-of-living shifts, and indicators influencing household stability.",
      color: "blue"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-green-400" />,
      title: "Curriculum Design",
      description: "Development of data-informed lesson plans, digital tools, and assessments for financial literacy programs.",
      color: "green"
    },
    {
      icon: <BookOpen className="w-8 h-8 text-purple-400" />,
      title: "Educational Research",
      description: "Studies on effective financial education methods and expanding access to trustworthy money management knowledge.",
      color: "purple"
    },
    {
      icon: <Users className="w-8 h-8 text-orange-400" />,
      title: "Behavioral Finance",
      description: "Understanding the behavioral factors that shape saving, borrowing, and investing decisions in community contexts.",
      color: "orange"
    }
  ];

  const publications = [
    {
      title: "Financial Resilience in the Midwest",
      date: "2024",
      category: "Community Research",
      description: "An analysis of how regional employment trends and financial education impact household resilience."
    },
    {
      title: "Designing Data-Driven Literacy Programs",
      date: "2024",
      category: "Education",
      description: "Exploring the effectiveness of interactive tools and analytics in improving financial literacy outcomes."
    },
    {
      title: "Community Perspectives on Financial Confidence",
      date: "2023",
      category: "Behavioral Finance",
      description: "Understanding how confidence, trust, and cognitive biases affect household money management decisions."
    }
  ];

  return (
    <div className="relative min-h-screen w-full bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 [background-image:radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:20px_20px] opacity-50"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/5 blur-[100px] rounded-full pointer-events-none"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <div className="mb-12">
            <h1 className="text-4xl md:text-7xl font-display font-bold mb-6 leading-tight uppercase tracking-tight text-white">
              Research & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Innovation</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto mb-8"></div>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light mb-10">
              Advancing the frontiers of financial technology through rigorous research, innovative methodologies, and collaborative knowledge sharing.
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer animate-bounce">
          <button onClick={scrollToContent} className="text-gray-500 hover:text-white transition-colors">
            <ChevronDown className="w-8 h-8" />
          </button>
        </div>
      </section>

      {/* Research Areas */}
      <section id="focus" className="py-24 bg-black relative">
        <div className="max-w-6xl mx-auto px-6 container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight text-white uppercase tracking-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Focus Areas</span>
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto mb-8"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {researchAreas.map((area, index) => (
              <div key={index} className="bg-black/40 border border-gray-800/50 hover:border-orange-400/30 hover:bg-black/60 transition-all duration-300 backdrop-blur-sm p-8 rounded-3xl group hovered:scale-105">
                <div className={`w-16 h-16 bg-${area.color}-500/10 rounded-xl flex items-center justify-center mb-6`}>
                  {area.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4 tracking-tight uppercase">{area.title}</h3>
                <p className="text-gray-300 leading-relaxed text-sm font-light">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent my-12"></div>

      {/* Publications */}
      <section className="py-24 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight text-white uppercase tracking-tight">
              Recent <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Research</span>
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto mb-8"></div>
          </div>

          <div className="space-y-6">
            {publications.map((pub, index) => (
              <div key={index} className="bg-black/40 border border-gray-800/50 hover:border-orange-400/30 transition-all duration-300 p-8 rounded-3xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white mb-2 md:mb-0 tracking-tight">{pub.title}</h3>
                  <div className="flex items-center space-x-4">
                    <span className="text-[10px] uppercase tracking-wider px-3 py-1 bg-orange-400/10 text-orange-400 rounded-lg border border-orange-400/20">{pub.category}</span>
                    <span className="text-[10px] uppercase tracking-wider px-3 py-1 bg-blue-400/10 text-blue-400 rounded-lg border border-blue-400/20">In Progress</span>
                    <span className="text-sm text-gray-400 font-mono">{pub.date}</span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed font-light">{pub.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent my-12"></div>

      {/* Call to Action */}
      <section className="py-24 bg-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-black/60 backdrop-blur-sm border border-gray-800 rounded-3xl p-12">
            <Target className="w-16 h-16 text-orange-400 mx-auto mb-8" />
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight uppercase">
              Collaborate <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">With Us</span>
            </h2>
            <p className="text-lg text-gray-300 mb-12 leading-relaxed font-light">
              Interested in contributing to our research or collaborating on a project? We welcome partnerships with academic institutions, industry professionals, and fellow researchers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-xl text-white bg-orange-500 hover:bg-orange-600 transition-colors duration-200 uppercase tracking-wider shadow-lg"
              >
                Get in Touch
              </a>
              <a
                href="/opensource"
                className="inline-flex items-center justify-center px-8 py-4 border border-gray-600 text-base font-bold rounded-xl text-white hover:border-orange-400 hover:text-orange-400 transition-colors duration-200 uppercase tracking-wider"
              >
                View Our Code
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Research;
