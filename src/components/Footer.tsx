import React from 'react';
import { Mail, Linkedin, X, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#23243a] via-[#181a23] to-black pt-12 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Removed AnimatedTrading */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-4 group">
              <div className="w-10 h-10 rounded-lg overflow-hidden group-hover:scale-110 transition-transform duration-300">
                <img 
                  src="/Profile Logo (1).png" 
                  alt="MeridianAlgo Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-white font-bold text-xl">
                <span className="text-blue-400">M</span>eridian<span className="text-blue-400">A</span>lgo
              </span>
            </Link>
            <p className="text-slate-400 mb-6 max-w-md leading-relaxed">
              Democratizing access to sophisticated trading tools through open-source algorithms. 
              Empowering wealth creation for all, from the ground up.
            </p>
            <div className="flex space-x-4">
              <a href="mailto:meridianalgo@gmail.com" className="bg-slate-800 hover:bg-blue-600 p-2 rounded-lg transition-all duration-300 hover:scale-110">
                <Mail className="w-5 h-5 text-slate-400 hover:text-white" />
              </a>
              <a href="https://github.com/MeridianAlgo" className="bg-slate-800 hover:bg-blue-600 p-2 rounded-lg transition-all duration-300 hover:scale-110">
                <Github className="w-5 h-5 text-slate-400 hover:text-white" />
              </a>
              <a href="https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Aorganization%3A107717373&keywords=meridianalgo&origin=RICH_QUERY_SUGGESTION&position=0&searchId=78e6a6ae-9729-449e-8747-3931ace9b150&sid=M2v&spellCorrectionEnabled=false" className="bg-slate-800 hover:bg-blue-600 p-2 rounded-lg transition-all duration-300 hover:scale-110">
                <Linkedin className="w-5 h-5 text-slate-400 hover:text-white" />
              </a>
              <a href="https://x.com/MeridianAlgo" className="bg-slate-800 hover:bg-blue-600 p-2 rounded-lg transition-all duration-300 hover:scale-110">
                <X className="w-5 h-5 text-slate-400 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-slate-400 hover:text-blue-400 transition-all duration-300 hover:translate-x-1">About Us</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-blue-400 transition-all duration-300 hover:translate-x-1">Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-all duration-300 hover:translate-x-1">Open Source Code</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-all duration-300 hover:translate-x-1">Newsletter</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-400 text-sm mb-4 md:mb-0">
              © 2025 MeridianAlgo. All rights reserved. Open source, transparent, accessible.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="/Privacy Policy for MeridianAlgo.pdf" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-all duration-300 hover:scale-105">Privacy Policy</a>
              <a href="/Terms of Service for MeridianAlgo.pdf" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-all duration-300 hover:scale-105">Terms of Service</a>
              <a href="https://opensource.org/license/apache-2-0" className="text-slate-400 hover:text-blue-400 transition-all duration-300 hover:scale-105">Open Source License</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;