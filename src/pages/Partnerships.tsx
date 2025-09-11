import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Partnerships: React.FC = () => {
  useEffect(() => {
    document.title = 'MeridianAlgo - Partnerships';
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pt-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto py-12">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="text-blue-400">Partners</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-orange-400 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're proud to collaborate with industry leaders who share our vision for innovation and excellence in finance education.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Jukebox Print Partner Card */}
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-3xl p-8 hover:from-gray-800 hover:to-gray-800 transition-all duration-500 border border-gray-700/30 hover:border-gray-600/50 shadow-2xl hover:shadow-gray-900/30 group">
            <div className="flex flex-col items-center mb-8">
              <div className="w-32 h-32 bg-white/5 rounded-2xl p-4 mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <img 
                  src="/jukebox.png" 
                  alt="Jukebox Print Logo" 
                  className="h-20 w-auto object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = '/path/to/fallback-logo.png';
                  }}
                />
              </div>
              <h3 className="text-2xl font-bold text-white text-center">Jukebox Print</h3>
            </div>
            <p className="text-gray-300 mb-8 text-center leading-relaxed">
              Jukebox Print is a leading provider of high-quality printing services, helping businesses and individuals bring their creative visions to life with exceptional print products and outstanding customer service.
            </p>
            <div className="flex justify-center">
              <a 
                href="https://www.jukeboxprint.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-all duration-300 transform hover:scale-105 border border-white/10 hover:border-white/20 flex items-center group-hover:shadow-lg group-hover:shadow-white/5"
              >
                Visit Website
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Future Partner Card */}
          <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-3xl p-8 border-2 border-dashed border-gray-700/30 flex flex-col items-center justify-center min-h-[400px] group hover:border-gray-600/50 transition-colors duration-500">
            <div className="w-24 h-24 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-12 h-12 text-gray-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-2xl font-medium text-gray-300 group-hover:text-white transition-colors">Your Company Here</h3>
            <p className="text-gray-500 text-center mt-3 group-hover:text-gray-300 transition-colors">
              Interested in partnering with us? Let's create something amazing together.
            </p>
            <div className="mt-6">
              <a 
                href="mailto:partnerships@meridianalgo.com" 
                className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-full text-sm font-medium transition-all duration-300 border border-white/10 hover:border-white/20"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Become a Partner
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Interested in partnering with us? We're always looking for innovative companies to collaborate with and create mutually beneficial relationships.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/contact" 
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-all duration-300 transform hover:scale-105 border border-white/10 hover:border-white/20 flex items-center justify-center space-x-2"
            >
              <span>Get in Touch</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </Link>
            <a 
              href="mailto:partnerships@meridianalgo.com"
              className="px-8 py-3.5 bg-transparent hover:bg-white/5 text-white rounded-full font-medium transition-all duration-300 transform hover:scale-105 border border-white/10 hover:border-white/20 flex items-center justify-center space-x-2"
            >
              <span>Email Us</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-24 pt-12 border-t border-gray-800/50">
          <h3 className="text-2xl font-semibold text-center mb-8">Why Partner With Us?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'Expand Your Reach',
                description: 'Connect with our growing community of traders and investors.',
                icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
              },
              {
                title: 'Innovate Together',
                description: 'Collaborate on cutting-edge financial technology solutions.',
                icon: 'M13 10V3L4 14h7v7l9-11h-7z'
              },
              {
                title: 'Mutual Growth',
                description: 'Create value for both our organizations and users through strategic partnerships.',
                icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
              }
            ].map((item, index) => (
              <div key={index} className="bg-gray-800/30 p-6 rounded-2xl hover:bg-gray-800/50 transition-colors duration-300">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partnerships;
