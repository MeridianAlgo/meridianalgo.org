import { useEffect } from 'react';
import { BookOpen, Zap, Globe } from 'lucide-react';

const About = () => {
  useEffect(() => {
    document.title = 'MeridianAlgo - About';
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-black">
      {/* Hero Section */}
      <section className="pt-44 pb-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 [background-image:radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
              <span className="text-white">About </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">MeridianAlgo</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light mb-8">
              We're a student-led nonprofit building a global community around financial literacy and open-source tools. Our mission: make finance simple, practical, and accessible—especially for young people learning to build wealth.
            </p>
            <div className="inline-flex items-center gap-2 text-orange-400 font-semibold bg-orange-500/10 px-6 py-3 rounded-full border border-orange-400/30">
              <Globe className="w-5 h-5" />
              Operating in 7 Countries Worldwide
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-90">
          <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:44px_44px]"></div>
          <div className="absolute -top-40 -right-40 w-[480px] h-[480px] rounded-full bg-orange-500/10 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-[420px] h-[420px] rounded-full bg-yellow-500/10 blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
              <span className="text-white">Our </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Approach</span>
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto mb-8"></div>
          </div>
          <p className="text-lg text-gray-200 text-center leading-relaxed max-w-3xl mx-auto font-light">
            We teach finance to the next generation through practical education, open-source tools, and collaborative research. From newsletters to hands-on code—no jargon, no gatekeeping, just clarity and opportunity.
          </p>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent my-12"></div>

      {/* What Sets Us Apart Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
              <span className="text-white">What Sets Us </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Apart</span>
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900/80 p-8 rounded-2xl border border-gray-800 hover:border-orange-400/40 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <BookOpen className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-orange-400 mb-4 text-center">Practical Education</h3>
              <p className="text-gray-300 text-center text-sm">Financial newsletters, tutorials, and tools tailored for everyday users—not just Wall Street insiders.</p>
            </div>
            <div className="bg-gray-900/80 p-8 rounded-2xl border border-gray-800 hover:border-orange-400/40 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Zap className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-orange-400 mb-4 text-center">Ethical Algorithms</h3>
              <p className="text-gray-300 text-center text-sm">We champion fairness, interpretability, and responsible AI in financial education and decision-making tools.</p>
            </div>
            <div className="bg-gray-900/80 p-8 rounded-2xl border border-gray-800 hover:border-orange-400/40 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Globe className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-orange-400 mb-4 text-center">Global Impact</h3>
              <p className="text-gray-300 text-center text-sm">Building bridges between academia, regulators, and communities through collaborative research across 7 countries.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent my-12"></div>

      {/* Vision Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
            <span className="text-white">Our </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Vision</span>
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto mb-8"></div>
          <p className="text-lg text-gray-200 mb-8 leading-relaxed font-light max-w-3xl mx-auto">
            This is more than financial literacy—it's a movement to transform how ordinary people engage with opportunity. Our vision: a world where market insights are shared, risks are understood, and wealth creation isn't gated behind technical knowledge or capital.
          </p>
          <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
            Join us in redefining finance—from the ground up.
          </h3>
        </div>
      </section>
    </div>
  );
};

export default About;
