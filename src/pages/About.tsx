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
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Us</span>
          </h1>
          <div className="w-16 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto mb-8"></div>
          <p className="text-lg text-gray-200 leading-relaxed font-light max-w-4xl mx-auto">
            We're a student-led team building a community around financial literacy and open-source tools. Our mission: make finance simple, practical, and accessible—especially for young people learning to build wealth. We publish guides, research, and code that anyone can learn from today.
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
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 leading-tight">
              <span className="text-white">Our </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Approach</span>
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto mb-8"></div>
          </div>
          <p className="text-base text-gray-200 text-center leading-relaxed max-w-2xl mx-auto font-light">
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
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 leading-tight">
              <span className="text-white">What Sets Us </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Apart</span>
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900/80 p-8 rounded-2xl border border-gray-800 hover:border-orange-400/40 transition-colors">
              <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <BookOpen className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-orange-400 mb-4 text-center">Practical Education</h3>
              <p className="text-gray-300 text-center text-sm">Financial newsletters, tutorials, and tools tailored for everyday users—not just Wall Street insiders.</p>
            </div>
            <div className="bg-gray-900/80 p-8 rounded-2xl border border-gray-800 hover:border-orange-400/40 transition-colors">
              <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Zap className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-orange-400 mb-4 text-center">Ethical Algorithms</h3>
              <p className="text-gray-300 text-center text-sm">We champion fairness, interpretability, and responsible AI in trading.</p>
            </div>
            <div className="bg-gray-900/80 p-8 rounded-2xl border border-gray-800 hover:border-orange-400/40 transition-colors">
              <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Globe className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-orange-400 mb-4 text-center">Social Impact</h3>
              <p className="text-gray-300 text-center text-sm">Building bridges between academia, regulators, and communities through collaborative research.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent my-12"></div>

      {/* Vision Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 leading-tight">
            <span className="text-white">Our </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Vision</span>
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto mb-8"></div>
          <p className="text-base text-gray-200 mb-8 leading-relaxed font-light max-w-3xl mx-auto">
            This is more than financial literacy—it's a movement to transform how ordinary people engage with opportunity. Our vision: a world where market insights are shared, risks are understood, and wealth creation isn't gated behind technical knowledge or capital.
          </p>
          <h3 className="text-xl font-semibold text-white">Join us in redefining finance—from the ground up.</h3>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-gray-800 my-12"></div>

      {/* Our Team */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 leading-tight">
              <span className="text-white">Our </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Team</span>
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto"></div>
          </div>
          <div className="space-y-10 max-w-5xl mx-auto">
            {/* Leadership */}
            <div className="bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-3xl p-8">
              <div className="flex items-center justify-center mb-8">
                <div className="text-center">
                  <span className="text-xs uppercase tracking-widest text-orange-400 font-mono mb-4 inline-block bg-orange-400/10 px-4 py-2 rounded-full">Leadership</span>
                  <h3 className="text-2xl font-display font-bold text-white">Core Team</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { name: 'Ishaan Manoor', role: 'Founder & Lead Researcher', desc: 'Leads research and development across open-source and youth literacy.' },
                  { name: 'Daniel Dimov', role: 'Research & Compliance', desc: 'Guides research review and ethical standards.' },
                  { name: 'Dennis Talpa', role: 'SysAdmin & Quant Research', desc: 'Leads systems administration and contributes to model design and infrastructure.' },
                ].map((m) => (
                  <div key={m.name} className="group relative">
                    <div className="bg-black/60 p-8 rounded-2xl border border-gray-800/50 hover:border-orange-400/40 transition-all duration-300 hover:scale-[1.02] text-center">
                      <div className="relative mb-6">
                        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-orange-500/20 to-yellow-500/20 flex items-center justify-center border border-orange-400/30">
                          <img src="/Profile Logo (1).png" alt="avatar" className="w-16 h-16 rounded-full object-cover" />
                        </div>
                      </div>
                      <h4 className="text-xl font-semibold text-white mb-2">{m.name}</h4>
                      <div className="text-orange-400 text-sm font-medium mb-4">{m.role}</div>
                      <p className="text-gray-300 text-sm leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quant Researchers */}
            <div className="bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-3xl p-8">
              <div className="flex items-center justify-center mb-8">
                <div className="text-center">
                  <span className="text-xs uppercase tracking-widest text-orange-400 font-mono mb-4 inline-block bg-orange-400/10 px-4 py-2 rounded-full">Research</span>
                  <h3 className="text-2xl font-display font-bold text-white">Quant Researchers</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { name: 'Ishaan Manoor', role: 'Research Lead', desc: 'Leads research and development across open-source and youth literacy.' },
                  { name: 'Tanish Patel', role: 'Research Lead', desc: 'Guides research review and improves upon existing models.' },
                  { name: 'Dennis Talpa', role: 'Quant Research', desc: 'Leads systems administration and contributes to model design and infrastructure.' },
                ].map((m) => (
                  <div key={m.name} className="group relative">
                    <div className="bg-black/60 p-8 rounded-2xl border border-gray-800/50 hover:border-orange-400/40 transition-all duration-300 hover:scale-[1.02] text-center">
                      <div className="relative mb-6">
                        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-orange-500/20 to-yellow-500/20 flex items-center justify-center border border-orange-400/30">
                          <img src="/Profile Logo (1).png" alt="avatar" className="w-16 h-16 rounded-full object-cover" />
                        </div>
                      </div>
                      <h4 className="text-xl font-semibold text-white mb-2">{m.name}</h4>
                      <div className="text-orange-400 text-sm font-medium mb-4">{m.role}</div>
                      <p className="text-gray-300 text-sm leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content & Education */}
            <div className="bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-3xl p-8">
              <div className="flex items-center justify-center mb-8">
                <div className="text-center">
                  <span className="text-xs uppercase tracking-widest text-orange-400 font-mono mb-4 inline-block bg-orange-400/10 px-4 py-2 rounded-full">Learning</span>
                  <h3 className="text-2xl font-display font-bold text-white">Content & Education</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { name: 'Ethan Hsu', role: 'Content & Strategy', desc: 'Creates accessible finance content and tutorials.' },
                  { name: 'Amogh Natarajan', role: 'Content Engineering', desc: 'Translates complex topics into practical guides.' },
                  { name: 'Likhit Siva Reddy', role: 'Youth Literacy', desc: 'Builds curriculum and resources for Gen Z finance.' },
                  { name: 'Michel Enin', role: 'Content & Education', desc: 'Contributes to research and educational content.' },
                  { name: 'Daniel Dimov', role: 'Content & Education', desc: 'Works on content and education materials.' },
                ].map((m) => (
                  <div key={m.name} className="group relative">
                    <div className="bg-black/60 p-8 rounded-2xl border border-gray-800/50 hover:border-orange-400/40 transition-all duration-300 hover:scale-[1.02] text-center">
                      <div className="relative mb-6">
                        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-orange-500/20 to-yellow-500/20 flex items-center justify-center border border-orange-400/30">
                          <img src="/Profile Logo (3).png" alt="avatar" className="w-16 h-16 rounded-full object-cover" />
                        </div>
                      </div>
                      <h4 className="text-xl font-semibold text-white mb-2">{m.name}</h4>
                      <div className="text-orange-400 text-sm font-medium mb-4">{m.role}</div>
                      <p className="text-gray-300 text-sm leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fundraising */}
            <div className="bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-3xl p-8">
              <div className="flex items-center justify-center mb-8">
                <div className="text-center">
                  <span className="text-xs uppercase tracking-widest text-orange-400 font-mono mb-4 inline-block bg-orange-400/10 px-4 py-2 rounded-full">Growth</span>
                  <h3 className="text-2xl font-display font-bold text-white">Fundraising</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                {[
                  { name: 'Kaushal Pratury', role: 'Fundraising', desc: 'Drives community and donor relations.' },
                  { name: 'Ishaan Manoor', role: 'Fundraising', desc: 'Supports partnerships and fundraising efforts.' },
                ].map((m) => (
                  <div key={m.name} className="group relative">
                    <div className="bg-black/60 p-8 rounded-2xl border border-gray-800/50 hover:border-orange-400/40 transition-all duration-300 hover:scale-[1.02] text-center">
                      <div className="relative mb-6">
                        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-orange-500/20 to-yellow-500/20 flex items-center justify-center border border-orange-400/30">
                          <img src="/Profile Logo (1).png" alt="avatar" className="w-16 h-16 rounded-full object-cover" />
                        </div>
                      </div>
                      <h4 className="text-xl font-semibold text-white mb-2">{m.name}</h4>
                      <div className="text-orange-400 text-sm font-medium mb-4">{m.role}</div>
                      <p className="text-gray-300 text-sm leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Beta Testers */}
            <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 backdrop-blur-sm border border-orange-400/30 rounded-3xl p-8">
              <div className="flex items-center justify-center mb-8">
                <div className="text-center">
                  <span className="text-xs uppercase tracking-widest text-orange-400 font-mono mb-4 inline-block bg-orange-400/10 px-4 py-2 rounded-full">Beta Testing</span>
                  <h3 className="text-2xl font-display font-bold text-white">Public Beta Testers/Content Analysts</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { name: 'Europe', count: '4', desc: 'Testing our platform across European markets.' },
                  { name: 'Canada', count: '4', desc: 'Providing feedback in the Canadian market.' },
                  { name: 'Asia', count: '2', desc: 'Analyzing content and providing insights.' },
                ].map((m) => (
                  <div key={m.name} className="group relative">
                    <div className="bg-black/60 p-8 rounded-2xl border border-gray-800/50 hover:border-orange-400/40 transition-all duration-300 hover:scale-[1.02] text-center">
                      <div className="relative mb-6">
                        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-orange-500/20 to-yellow-500/20 flex items-center justify-center border border-orange-400/30">
                          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">{m.count}</div>
                        </div>
                      </div>
                      <h4 className="text-xl font-semibold text-white mb-2">{m.name}</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Beta Testers Note */}
            <div className="text-center text-gray-400 mt-12">
         *In accordance with rules and regulations, we are not able to disclose the names of our beta testers and content analysts. These guidlines strictly follow the EU General Data Protection Regulation (GDPR), the Canadian Personal Information Protection and Electronic Documents Act (PIPEDA), and the ASEAN Personal Data Protection Act (PDPA) respectively. 
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;