import { useEffect } from 'react';
import { BookOpen, Zap, Globe } from 'lucide-react';

const About = () => {
  useEffect(() => {
    document.title = 'MeridianAlgo - About';
  }, []);
  
  return (
    <div className="relative min-h-screen w-full bg-black pt-24">

      {/* About Title Section */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            About <span className="text-orange-400">Us</span>
          </h1>
          <div className="w-24 h-1 bg-orange-400 rounded-full mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 leading-relaxed">
            We’re a student-led team in high school building a community around financial literacy and open-source tools. Our mission is to make finance simple, practical, and accessible—especially for young people learning how to build wealth the right way. We publish guides, research, and code that anyone can learn from today. Many of us plan to study finance, data analytics, or economics in college—and we’re using MeridianAlgo to start that journey now.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-gray-800 my-12"></div>
      
      {/* Approach Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Subtle, modern background unique to About */}
        <div className="pointer-events-none absolute inset-0 opacity-90">
          <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:44px_44px]"></div>
          <div className="absolute -top-40 -right-40 w-[480px] h-[480px] rounded-full bg-orange-500/10 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-[420px] h-[420px] rounded-full bg-yellow-500/10 blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white">Our </span>
              <span className="text-orange-400">Approach</span>
            </h2>
            <div className="w-24 h-1 bg-orange-400 rounded-full mx-auto"></div>
          </div>
          <p className="text-lg text-gray-300 text-center leading-relaxed max-w-3xl mx-auto">
            We teach finance to the next generation and help people build wealth over time through practical education, open-source tools, and collaborative research. From newsletters and tutorials to hands-on code and community projects, we meet you where you are—no jargon, no gatekeeping, just clarity and opportunity.
          </p>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent my-12"></div>
      
      {/* What Sets Us Apart Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white">What Sets Us </span>
              <span className="text-orange-400">Apart</span>
            </h2>
            <div className="w-24 h-1 bg-orange-400 rounded-full mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900/80 p-8 rounded-2xl border border-gray-800 hover:border-orange-400/40 transition-colors">
              <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <BookOpen className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-orange-400 mb-4 text-center">Practical Education</h3>
              <p className="text-gray-300 text-center">Financial newsletters, tutorials, and tools tailored for everyday users—not just Wall Street insiders.</p>
            </div>
            <div className="bg-gray-900/80 p-8 rounded-2xl border border-gray-800 hover:border-orange-400/40 transition-colors">
              <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Zap className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-orange-400 mb-4 text-center">Ethical Algorithms</h3>
              <p className="text-gray-300 text-center">We champion fairness, interpretability, and responsible AI in trading.</p>
            </div>
            <div className="bg-gray-900/80 p-8 rounded-2xl border border-gray-800 hover:border-orange-400/40 transition-colors">
              <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Globe className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-orange-400 mb-4 text-center">Social Impact</h3>
              <p className="text-gray-300 text-center">Building bridges between academia, regulators, and communities through collaborative research.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent my-12"></div>
      
      {/* Vision Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-white">Our </span>
            <span className="text-orange-400">Vision</span>
          </h2>
          <div className="w-24 h-1 bg-orange-400 rounded-full mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            This is more than financial literacy—it's a movement to transform how ordinary people engage with opportunity. Our vision is a world where market insights are shared, risks are understood, and wealth creation is no longer gated behind technical knowledge or capital.
          </p>
          <h3 className="text-2xl font-bold text-white">Join us in redefining finance—from the ground up.</h3>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-gray-800 my-12"></div>

      {/* Our Team */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white">Our </span>
              <span className="text-orange-400">Team</span>
            </h2>
            <div className="w-24 h-1 bg-orange-400 rounded-full mx-auto"></div>
          </div>
          <div className="space-y-10 max-w-5xl mx-auto">
            {/* Leadership */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Leadership</h3>
                <span className="text-xs text-orange-300 uppercase tracking-widest">Core</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'Ishaan Manoor', role: 'Founder & Lead Researcher', desc: 'Leads research and development across open-source trading systems and youth literacy.' },
                  { name: 'Daniel Dimov', role: 'Research & Compliance', desc: 'Guides research review and ethical standards.' },
                  { name: 'Dennis Talpa', role: 'SysAdmin & Quant Research', desc: 'Leads systems administration and contributes to model design and infrastructure.' },
                ].map((m) => (
                  <div key={m.name} className="bg-gray-900/70 p-6 rounded-2xl border border-gray-800 hover:border-orange-400/40 transition-colors text-center">
                    <img src="/Profile Logo (1).png" alt="avatar" className="w-12 h-12 mx-auto mb-3 rounded-full object-cover border border-orange-400/30" />
                    <div className="text-white font-semibold">{m.name}</div>
                    <div className="text-orange-300 text-sm">{m.role}</div>
                    <p className="text-gray-400 text-sm mt-2">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quant Researchers */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Quant Researchers</h3>
                <span className="text-xs text-orange-300 uppercase tracking-widest">Research</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'Ibrahim Arif', role: 'Quant Research', desc: 'Builds data pipelines and contributes to research and backtesting.' },
                  { name: 'Tanish Patel', role: 'Quant Research', desc: 'Contributes to tooling and performance analysis.' },
                ].map((m) => (
                  <div key={m.name} className="bg-gray-900/70 p-6 rounded-2xl border border-gray-800 hover:border-orange-400/40 transition-colors text-center">
                    <img src="/Profile Logo (2).png" alt="avatar" className="w-12 h-12 mx-auto mb-3 rounded-full object-cover border border-orange-400/30" />
                    <div className="text-white font-semibold">{m.name}</div>
                    <div className="text-orange-300 text-sm">{m.role}</div>
                    <p className="text-gray-400 text-sm mt-2">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Content & Education */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Content & Education</h3>
                <span className="text-xs text-orange-300 uppercase tracking-widest">Learning</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'Ethan Hsu', role: 'Content & Strategy', desc: 'Creates accessible finance content and tutorials.' },
                  { name: 'Amogh Natarajan', role: 'Content Engineering', desc: 'Translates complex topics into practical guides.' },
                  { name: 'Likhit Siva Reddy', role: 'Youth Literacy', desc: 'Builds curriculum and resources for Gen Z finance.' },
                ].map((m) => (
                  <div key={m.name} className="bg-gray-900/70 p-6 rounded-2xl border border-gray-800 hover:border-orange-400/40 transition-colors text-center">
                    <img src="/Profile Logo (3).png" alt="avatar" className="w-12 h-12 mx-auto mb-3 rounded-full object-cover border border-orange-400/30" />
                    <div className="text-white font-semibold">{m.name}</div>
                    <div className="text-orange-300 text-sm">{m.role}</div>
                    <p className="text-gray-400 text-sm mt-2">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Fundraising */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Fundraising</h3>
                <span className="text-xs text-orange-300 uppercase tracking-widest">Growth</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'Ameen Baig', role: 'Fundraising', desc: 'Helps partnerships, fundraising, and outreach.' },
                  { name: 'Kaushal Pratury', role: 'Fundraising', desc: 'Drives community and donor relations.' },
                ].map((m) => (
                  <div key={m.name} className="bg-gray-900/70 p-6 rounded-2xl border border-gray-800 hover:border-orange-400/40 transition-colors text-center">
                    <img src="/Profile Logo (1).png" alt="avatar" className="w-12 h-12 mx-auto mb-3 rounded-full object-cover border border-orange-400/30" />
                    <div className="text-white font-semibold">{m.name}</div>
                    <div className="text-orange-300 text-sm">{m.role}</div>
                    <p className="text-gray-400 text-sm mt-2">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;