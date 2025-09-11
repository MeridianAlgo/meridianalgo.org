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
            MeridianAlgo is an open-source platform for democratizing access to sophisticated trading tools and algorithmic finance. Our mission is to empower everyone—from curious beginners to advanced quants—with transparent, ethical, and powerful technology.
          </p>
        </div>
      </section>
      
      {/* Divider */}
      <div className="w-full h-px bg-gray-800 my-12"></div>
      
      {/* Approach Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white">Our </span>
              <span className="text-orange-400">Approach</span>
            </h2>
            <div className="w-24 h-1 bg-orange-400 rounded-full mx-auto"></div>
          </div>
          <p className="text-lg text-gray-300 text-center leading-relaxed max-w-3xl mx-auto">
            We simplify the complexities of global financial markets through cutting-edge algorithmic systems that are transparent, powerful, and easy to use. Whether you're a curious beginner or a seasoned trader, our resources are designed to meet you where you are—no jargon, no barriers, just clarity and possibility.
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: 'Ishaan Manoor', role: 'Founder & Lead Researcher', desc: 'Leads research and development across open-source trading systems and youth literacy.' },
              { name: 'Dennis Talpa', role: 'Quant Research', desc: 'Focuses on model design, backtesting, and infrastructure.' },
              { name: 'Daniel Dimov', role: 'Research & Compliance', desc: 'Guides research review and ethical standards.' },
              { name: 'Ethan Hsu', role: 'Content & Strategy', desc: 'Creates accessible finance content and tutorials.' },
              { name: 'Likhit Siva Reddy', role: 'Youth Literacy', desc: 'Builds curriculum and resources for Gen Z finance.' },
              { name: 'Amogh Natarajan', role: 'Content Engineering', desc: 'Translates complex topics into practical guides.' },
              { name: 'Ibrahim Arif', role: 'Data & Ops', desc: 'Supports data workflows and operations.' },
              { name: 'Ameen Baig', role: 'Fundraising', desc: 'Helps partnerships, fundraising, and outreach.' },
              { name: 'Kaushal Pratury', role: 'Fundraising', desc: 'Drives community and donor relations.' },
              { name: 'Tanish Patel', role: 'Quant Research', desc: 'Contributes to tooling and performance analysis.' },
            ].map((member) => (
              <div key={member.name} className="bg-gray-900/70 p-6 rounded-2xl border border-gray-800 hover:border-orange-400/40 transition-colors text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400 font-bold">
                  {member.name.split(' ').map(n => n[0]).slice(0,2).join('')}
                </div>
                <div className="text-white font-semibold">{member.name}</div>
                <div className="text-orange-300 text-sm">{member.role}</div>
                <p className="text-gray-400 text-sm mt-2">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-gray-800 my-12"></div>

      {/* Team Structure */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white">Team </span>
              <span className="text-orange-400">Structure</span>
            </h2>
            <div className="w-24 h-1 bg-orange-400 rounded-full mx-auto"></div>
          </div>

          <div className="space-y-8 max-w-5xl mx-auto">
            <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-2">MeridianAlgo Algorithmic Research Team (Quantam Meridian)</h3>
              <p className="text-slate-300 mb-4">Open source software for financial research and streamlining complex trend analysis.</p>
              <ul className="list-disc list-inside text-gray-300 grid md:grid-cols-2 gap-2">
                <li>Ishaan Manoor</li>
                <li>Dennis Talpa</li>
                <li>Tanish Patel</li>
              </ul>
            </div>

            <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-2">MeridianAlgo Youth Literacy Team (Smart Cents Weekly)</h3>
              <p className="text-slate-300 mb-4">Creating online content to improve Generation Z's understanding of finance and wealth-building in unique areas of life.</p>
              <ul className="list-disc list-inside text-gray-300 grid md:grid-cols-2 gap-2">
                <li>Likhit (Siva) Reddy</li>
                <li>Ethan Hsu</li>
                <li>Amogh Natarajan</li>
                <li className="opacity-80">Sub-Review: Ishaan Manoor</li>
                <li className="opacity-80">Sub-Review: Daniel Dimov</li>
              </ul>
            </div>

            <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-2">MeridianAlgo General Literacy Team (Corporate Compass)</h3>
              <p className="text-slate-300 mb-4">Creating online content to improve investors' understanding of current corporate events (e.g., earnings, news effects on sentiment, future trend analysis, and organizational structure).</p>
              <ul className="list-disc list-inside text-gray-300 grid md:grid-cols-2 gap-2">
                <li>Daniel Dimov</li>
                <li className="opacity-80">Sub-Review: Ishaan Manoor</li>
              </ul>
            </div>

            <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-2">MeridianAlgo Directory and Operations</h3>
              <div className="grid md:grid-cols-2 gap-6 mt-2">
                <div>
                  <h4 className="text-orange-400 font-semibold mb-2">Board</h4>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Ishaan Manoor</li>
                    <li>Daniel Dimov</li>
                    <li>Dennis Talpa</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-orange-400 font-semibold mb-2">SysAdmin</h4>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Ishaan Manoor</li>
                    <li>Dennis Talpa</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-orange-400 font-semibold mb-2">Fundraising</h4>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Kaushal Pratury</li>
                    <li>Ameen Baig</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;