import { FlaskConical, TrendingUp, BarChart3, BookOpen, Users, Target } from 'lucide-react';

const Research = () => {
  const researchAreas = [
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-400" />,
      title: "Market Analysis",
      description: "Deep-dive research into market trends, volatility patterns, and economic indicators affecting trading strategies.",
      color: "blue"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-green-400" />,
      title: "Algorithm Development",
      description: "Research and development of cutting-edge trading algorithms using machine learning and statistical models.",
      color: "green"
    },
    {
      icon: <BookOpen className="w-8 h-8 text-purple-400" />,
      title: "Educational Research",
      description: "Studies on effective financial education methods and democratizing access to trading knowledge.",
      color: "purple"
    },
    {
      icon: <Users className="w-8 h-8 text-orange-400" />,
      title: "Behavioral Finance",
      description: "Understanding psychological factors that influence trading decisions and market movements.",
      color: "orange"
    }
  ];

  const publications = [
    {
      title: "Democratizing Algorithmic Trading: A Study on Open-Source Tools",
      date: "2024",
      category: "Financial Technology",
      description: "An analysis of how open-source trading tools can level the playing field for retail traders."
    },
    {
      title: "Machine Learning Applications in Market Prediction",
      date: "2024",
      category: "Data Science",
      description: "Exploring the effectiveness of various ML models in predicting market movements."
    },
    {
      title: "The Psychology of Risk Management in Trading",
      date: "2023",
      category: "Behavioral Finance",
      description: "Understanding how cognitive biases affect trading decisions and risk assessment."
    }
  ];

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
              <FlaskConical className="w-10 h-10 text-orange-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
              Research & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Innovation</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              Advancing the frontiers of financial technology through rigorous research, innovative methodologies, and collaborative knowledge sharing.
            </p>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-24 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-orange-400 font-mono mb-6 inline-block bg-orange-400/10 px-4 py-2 rounded-full">Research Areas</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 leading-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Focus Areas</span>
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {researchAreas.map((area, index) => (
              <div key={index} className="bg-black/40 border border-gray-800/50 hover:border-orange-400/30 hover:bg-black/60 transition-all duration-300 backdrop-blur-sm p-8 rounded-2xl">
                <div className={`w-16 h-16 bg-${area.color}-500/10 rounded-xl flex items-center justify-center mb-6`}>
                  {area.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{area.title}</h3>
                <p className="text-gray-300 leading-relaxed text-sm">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-gray-800 my-12"></div>

      {/* Publications */}
      <section className="py-24 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-orange-400 font-mono mb-6 inline-block bg-orange-400/10 px-4 py-2 rounded-full">Publications</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 leading-tight">
              Recent <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Research</span>
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto"></div>
          </div>

          <div className="space-y-6">
            {publications.map((pub, index) => (
              <div key={index} className="bg-black/40 border border-gray-800/50 hover:border-orange-400/30 transition-all duration-300 p-8 rounded-2xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white mb-2 md:mb-0">{pub.title}</h3>
                  <div className="flex items-center space-x-4">
                    <span className="text-xs px-3 py-1 bg-orange-400/10 text-orange-400 rounded-full">{pub.category}</span>
                    <span className="text-sm text-gray-400">{pub.date}</span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{pub.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-gray-800 my-12"></div>

      {/* Call to Action */}
      <section className="py-24 bg-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-black/60 backdrop-blur-sm border border-gray-800 rounded-2xl p-12">
            <Target className="w-16 h-16 text-orange-400 mx-auto mb-8" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              Collaborate with <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Our Team</span>
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed font-light">
              Interested in contributing to our research or collaborating on a project? We welcome partnerships with academic institutions, industry professionals, and fellow researchers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-orange-500 hover:bg-orange-600 transition-colors duration-200"
              >
                Get in Touch
              </a>
              <a 
                href="/opensource" 
                className="inline-flex items-center justify-center px-8 py-3 border border-gray-600 text-base font-medium rounded-xl text-white hover:border-orange-400 hover:text-orange-400 transition-colors duration-200"
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
