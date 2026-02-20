import { useEffect } from 'react';
import { BookOpen, Zap, Globe, ChevronDown } from 'lucide-react';

const About = () => {
  useEffect(() => {
    document.title = 'MeridianAlgo - About';
  }, []);

  const scrollToContent = () => {
    const approachSection = document.getElementById('approach');
    if (approachSection) {
      approachSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 [background-image:radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:20px_20px] opacity-50"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/5 blur-[100px] rounded-full pointer-events-none"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <div className="mb-12">
            <h1 className="text-4xl md:text-7xl font-display font-bold mb-6 leading-tight uppercase tracking-tight text-white">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">MeridianAlgo</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto mb-8"></div>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light mb-10">
              We're a student-led nonprofit building a global community around financial literacy and open-source tools.
            </p>
            <div className="inline-flex items-center gap-2 text-orange-400 font-semibold bg-orange-500/10 px-6 py-3 rounded-full border border-orange-400/30 cursor-target">
              <Globe className="w-5 h-5" />
              Operating in 4 Countries Worldwide
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer animate-bounce">
          <button onClick={scrollToContent} className="text-gray-500 hover:text-white transition-colors cursor-target">
            <ChevronDown className="w-8 h-8" />
          </button>
        </div>
      </section>

      {/* Approach Section */}
      <section id="approach" className="py-32 relative overflow-hidden border-t border-white/5">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:50px_50px]"></div>
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight text-white uppercase tracking-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Approach</span>
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto mb-8"></div>
          </div>
          <p className="text-lg text-gray-200 text-center leading-relaxed max-w-3xl mx-auto font-light">
            We teach finance to the next generation through practical education, open-source tools, and collaborative research. From newsletters to hands-on code, no jargon, no gatekeeping, just clarity and opportunity.
          </p>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent my-12"></div>

      {/* What Sets Us Apart Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight text-white uppercase tracking-tight">
              What Sets Us <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Apart</span>
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900/80 p-8 rounded-3xl border border-gray-800 hover:border-orange-400/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-target">
              <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <BookOpen className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center tracking-tight">Practical Education</h3>
              <p className="text-gray-400 text-center text-sm leading-relaxed font-light">Financial newsletters, tutorials, and tools tailored for everyday users not just Wall Street insiders.</p>
            </div>
            <div className="bg-gray-900/80 p-8 rounded-3xl border border-gray-800 hover:border-orange-400/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-target">
              <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Zap className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center tracking-tight">Ethical Algorithms</h3>
              <p className="text-gray-400 text-center text-sm leading-relaxed font-light">We champion fairness, interpretability, and responsible AI in financial education and decision-making tools.</p>
            </div>
            <div className="bg-gray-900/80 p-8 rounded-3xl border border-gray-800 hover:border-orange-400/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-target">
              <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Globe className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center tracking-tight">Global Impact</h3>
              <p className="text-gray-400 text-center text-sm leading-relaxed font-light">Building bridges between academia, regulators, and communities through collaborative research across 4 countries.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent my-12"></div>

      {/* Vision Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight text-white uppercase tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Vision</span>
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto mb-8"></div>
          <p className="text-xl text-white mb-10 leading-relaxed font-light max-w-2xl mx-auto">
            A world where market insights and wealth creation are accessible to everyone, regardless of background or capital.
          </p>
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 uppercase tracking-wider">
            Finance for all.
          </h3>
        </div>
      </section>
    </div>
  );
};

export default About;
