import { useEffect } from 'react';
import { BookOpen, Zap, Globe, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  useEffect(() => {
    document.title = 'MeridianAlgo - About';
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-black text-white selection:bg-orange-500/20">

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <div className="animate-fade-in-up">
            <span className="text-[10px] uppercase tracking-[0.4em] text-orange-400/80 font-mono mb-8 inline-block bg-white/5 px-4 py-2 rounded-full border border-white/10">
              Student-Led Nonprofit
            </span>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            <h1 className="text-5xl md:text-8xl font-display font-bold mb-6 leading-none uppercase tracking-tight text-white mt-6">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Us</span>
            </h1>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light mb-10">
              Building a global community around financial literacy and open-source tools — no jargon, no gatekeeping.
            </p>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            <div className="inline-flex items-center gap-2 text-gray-400 text-sm bg-white/5 px-6 py-3 rounded-full border border-white/10">
              <Globe className="w-4 h-4 text-orange-400/70" />
              Operating in 4 Countries Worldwide
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-700" />
        </div>
      </section>

      {/* Content Body */}
      <div className="relative z-10">

        {/* Mission Section */}
        <section className="relative py-32 overflow-hidden bg-black">
          <div className="absolute top-0 left-0 w-full h-px bg-orange-500/50" />

          <div className="absolute inset-0 pointer-events-none">
            <div className="max-w-7xl mx-auto px-6 h-full relative">
              <div className="absolute top-0 left-6 md:left-24 w-px h-full bg-orange-400/15" />
              <div className="absolute top-0 right-6 md:right-24 w-px h-full bg-orange-400/15" />
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <span className="text-[10px] uppercase tracking-[0.4em] text-orange-400/80 font-mono mb-6 inline-block bg-black px-4 py-2 rounded-full border border-white/10">
              Our Mission
            </span>
            <h2 className="text-3xl md:text-6xl font-display font-bold text-white mb-10 tracking-tight uppercase leading-tight mt-6">
              Finance for <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Everyone</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light max-w-3xl mx-auto">
              We teach finance to the next generation through practical education, open-source tools, and collaborative research. From newsletters to hands-on code — no jargon, no gatekeeping, just clarity and opportunity.
            </p>
          </div>
        </section>

        {/* What Sets Us Apart */}
        <section className="relative py-32 bg-black overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-orange-500/50" />

          <div className="absolute inset-0 pointer-events-none">
            <div className="max-w-7xl mx-auto px-6 h-full relative">
              <div className="absolute top-0 left-6 md:left-24 w-px h-full bg-orange-400/15" />
              <div className="absolute top-0 right-6 md:right-24 w-px h-full bg-orange-400/15" />
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <span className="text-[10px] uppercase tracking-[0.4em] text-orange-400/80 font-mono mb-6 inline-block bg-black px-4 py-2 rounded-full border border-white/10">
                Core Values
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight uppercase leading-tight mt-6">
                What Sets Us <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Apart</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <BookOpen className="w-6 h-6 text-orange-400/80" />,
                  title: 'Practical Education',
                  desc: 'Financial newsletters, tutorials, and tools tailored for everyday users — not just Wall Street insiders.',
                },
                {
                  icon: <Zap className="w-6 h-6 text-orange-400/80" />,
                  title: 'Ethical Algorithms',
                  desc: 'We champion fairness, interpretability, and responsible AI in financial education and decision-making tools.',
                },
                {
                  icon: <Globe className="w-6 h-6 text-orange-400/80" />,
                  title: 'Global Impact',
                  desc: 'Building bridges between academia, regulators, and communities through collaborative research across 4 countries.',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group bg-gray-900/20 p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 tracking-tight uppercase group-hover:text-orange-400/90 transition-colors duration-200">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision + CTA Section */}
        <section className="relative py-32 bg-black overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-orange-500/50" />

          <div className="absolute inset-0 pointer-events-none">
            <div className="max-w-7xl mx-auto px-6 h-full relative">
              <div className="absolute top-0 left-6 md:left-24 w-px h-full bg-orange-400/15" />
              <div className="absolute top-0 right-6 md:right-24 w-px h-full bg-orange-400/15" />
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] md:w-[calc(100%-12rem)] h-px bg-orange-400/15" />
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <span className="text-[10px] uppercase tracking-[0.4em] text-orange-400/80 font-mono mb-6 inline-block bg-black px-4 py-2 rounded-full border border-white/10">
              Our Vision
            </span>
            <h2 className="text-3xl md:text-6xl font-display font-bold text-white mb-8 tracking-tight uppercase leading-tight mt-6">
              A World Without <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Barriers</span>
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed font-light max-w-2xl mx-auto mb-14">
              A world where market insights and wealth creation are accessible to everyone, regardless of background or capital.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/tools"
                className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-base transition-colors duration-200 shadow-xl uppercase tracking-wider"
              >
                Try Our Tools
              </Link>
              <Link
                to="/newsletters"
                className="px-8 py-4 border border-white/15 text-gray-300 hover:border-white/30 hover:text-white rounded-xl font-bold text-base transition-colors duration-200 uppercase tracking-wider"
              >
                Read Newsletter
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;
