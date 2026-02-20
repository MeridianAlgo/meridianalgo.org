import { Mail, Linkedin, X, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black pt-20 pb-10 border-t border-gray-800 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Logo and Bio Section */}
          <div className="flex-1 max-w-md">
            <Link to="/" className="flex items-center space-x-4 mb-6 group">
              <div className="w-10 h-10 rounded-2xl overflow-hidden bg-white/5 p-1 ring-1 ring-white/10">
                <img
                  src="/meridianalgo.png"
                  alt="MeridianAlgo Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-2xl tracking-tight">
                  Meridian<span className="text-orange-400">Algo</span>
                </span>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-1">v4.0.0</span>
              </div>
            </Link>

            <p className="text-gray-400 mb-8 leading-relaxed text-sm font-light">
              Democratizing financial intelligence through transparent research and powerful open-source utilities.
            </p>

            <div className="flex space-x-3">
              {[
                { icon: <Mail className="w-4 h-4" />, href: "mailto:meridianalgo@gmail.com" },
                { icon: <Github className="w-4 h-4" />, href: "https://github.com/MeridianAlgo" },
                { icon: <Linkedin className="w-4 h-4" />, href: "https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Aorganization%3A107717373&keywords=meridianalgo&origin=RICH_QUERY_SUGGESTION&position=0&searchId=78e6a6ae-9729-449e-8747-3931ace9b150&sid=M2v&spellCorrectionEnabled=false" },
                { icon: <X className="w-4 h-4" />, href: "https://x.com/MeridianAlgo" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-900 border border-gray-800 hover:border-orange-400/50 hover:bg-orange-500/5 p-2 rounded-lg transition-all duration-300 group text-gray-400 hover:text-orange-400"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Vertical Divider for Desktop */}
          <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-gray-800 to-transparent self-stretch" />

          {/* Mobile Horizontal Divider */}
          <div className="block lg:hidden h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent w-full" />

          {/* Links Section */}
          <div className="flex-[2] grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Platform */}
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4 border-l-2 border-orange-400 pl-3">Platform</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-orange-400 transition-colors text-xs font-light">About Us</Link></li>
                <li><Link to="/newsletters" className="text-gray-400 hover:text-orange-400 transition-colors text-xs font-light">Newsletters</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-orange-400 transition-colors text-xs font-light">Contact</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4 border-l-2 border-orange-400 pl-3">Resources</h4>
              <ul className="space-y-2">
                <li><Link to="/tools" className="text-gray-400 hover:text-orange-400 transition-colors text-xs font-light">Financial Tools</Link></li>
                <li><Link to="/opensource" className="text-gray-400 hover:text-orange-400 transition-colors text-xs font-light">Open Source</Link></li>
                <li><Link to="/research" className="text-gray-400 hover:text-orange-400 transition-colors text-xs font-light">Research</Link></li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4 border-l-2 border-orange-400 pl-3">Community</h4>
              <ul className="space-y-2">
                <li><Link to="/partnerships" className="text-gray-400 hover:text-orange-400 transition-colors text-xs font-light">Partnerships</Link></li>
                <li>
                  <a href="https://the.hackfoundation.org/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400 transition-colors text-xs font-light">
                    The Hack Foundation
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <p className="text-xs text-gray-500 font-light">
              &copy; {new Date().getFullYear()} MeridianAlgo. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a href="/legal/Privacy Policy for MeridianAlgo.pdf" target="_blank" rel="noopener noreferrer" className="text-[10px] text-gray-500 hover:text-orange-400 transition-colors uppercase tracking-widest">Privacy</a>
            <a href="/legal/Terms of Service for MeridianAlgo.pdf" target="_blank" rel="noopener noreferrer" className="text-[10px] text-gray-500 hover:text-orange-400 transition-colors uppercase tracking-widest">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;