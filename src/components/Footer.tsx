import { Mail, Linkedin, X, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black pt-16 pb-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <div className="w-12 h-12 rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-white/5 p-1">
                <img 
                  src="/Profile Logo (1).png" 
                  alt="MeridianAlgo Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-white font-bold text-2xl">
                <span className="text-white">Meridian</span><span className="text-white">Algo</span>
                <span className="text-xs font-normal text-gray-400 block mt-1">v3.3.5</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-8 max-w-md leading-relaxed text-base">
              Democratizing financial literacy through open-source education, community programs, and research that empower Midwestern families.
              <span className="text-orange-400 font-medium">Building the future of accessible finance.</span>
            </p>
            <div className="flex space-x-3">
              <a href="mailto:meridianalgo@gmail.com" className="bg-white/5 hover:bg-white/10 p-3 rounded-xl transition-all duration-300 hover:scale-105 border border-white/5">
                <Mail className="w-5 h-5 text-white" />
              </a>
              <a href="https://github.com/MeridianAlgo" target="_blank" rel="noopener noreferrer" className="bg-white/5 hover:bg-white/10 p-3 rounded-xl transition-all duration-300 hover:scale-105 border border-white/5">
                <Github className="w-5 h-5 text-white" />
              </a>
              <a href="https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Aorganization%3A107717373&keywords=meridianalgo&origin=RICH_QUERY_SUGGESTION&position=0&searchId=78e6a6ae-9729-449e-8747-3931ace9b150&sid=M2v&spellCorrectionEnabled=false" target="_blank" rel="noopener noreferrer" className="bg-white/5 hover:bg-white/10 p-3 rounded-xl transition-all duration-300 hover:scale-105 border border-white/5">
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <a href="https://x.com/MeridianAlgo" target="_blank" rel="noopener noreferrer" className="bg-white/5 hover:bg-white/10 p-3 rounded-xl transition-all duration-300 hover:scale-105 border border-white/5">
                <X className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-5">Platform</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-orange-400 transition-colors">About Us</Link></li>
              <li><Link to="/newsletters" className="text-gray-400 hover:text-orange-400 transition-colors">Newsletters</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-orange-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://github.com/MeridianAlgo" target="_blank" rel="noopener noreferrer" className="text-base text-gray-400 hover:text-orange-400 transition-colors duration-200 flex items-center group">
                  <Github className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  GitHub
                </a>
              </li>
              <li>
                <Link to="/opensource" className="text-base text-gray-400 hover:text-orange-400 transition-colors duration-200">
                  Open Source
                </Link>
              </li>
              <li>
                <Link to="/research" className="text-base text-gray-400 hover:text-orange-400 transition-colors duration-200">
                  Research
                </Link>
              </li>
              <li>
                <Link to="/partnerships" className="text-base text-gray-400 hover:text-orange-400 transition-colors duration-200">
                  Partnerships
                </Link>
              </li>
            </ul>
          </div>

         
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} MeridianAlgo. All rights reserved.
            <span className="ml-2 text-xs text-gray-500">v3.3.5</span>
          </p>
          <div className="flex items-center gap-4 ml-auto">
            <a href="/legal/Privacy Policy for MeridianAlgo.pdf" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">Privacy Policy</a>
            <span className="text-gray-700">|</span>
            <a href="/legal/Terms of Service for MeridianAlgo.pdf" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;