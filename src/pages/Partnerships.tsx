import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Handshake, ArrowRight } from 'lucide-react';
import jukeboxLogo from '../assets/images/jukebox.png';
import costcoLogo from '../assets/images/Costco.png';
import hackFoundationLogo from '../assets/images/HackClub.png';

const Partnerships = () => {
  useEffect(() => {
    document.title = 'MeridianAlgo - Partnerships';
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 [background-image:radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-2xl mb-8">
              <Handshake className="w-10 h-10 text-orange-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
              Strategic <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Partnerships</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              Collaborating with industry leaders who share our vision for democratizing financial education and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-orange-400 font-mono mb-6 inline-block bg-orange-400/10 px-4 py-2 rounded-full">Our Partners</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 leading-tight">
              Trusted <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Collaborators</span>
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Hack Foundation Partner Card */}
            <div className="group relative">
              <div className="bg-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-orange-400/30 transition-all duration-300 hover:scale-[1.02] p-8 rounded-3xl cursor-target">
                <div className="flex flex-col items-center mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-2xl p-4 mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 border border-orange-400/30">
                    <img
                      src={hackFoundationLogo}
                      alt="Hack Foundation Logo"
                      className="h-16 w-auto object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white text-center mb-2">The Hack Foundation</h3>
                  <span className="text-orange-400 text-sm font-medium">Fiscal Sponsor</span>
                </div>
                <p className="text-gray-300 mb-8 text-center leading-relaxed text-sm">
                  The Hack Foundation is our fiscal sponsor, supporting our mission to democratize financial education through their nonprofit infrastructure and resources.
                </p>
                <div className="flex justify-center">
                  <a
                    href="https://the.hackfoundation.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-all duration-300 group w-48 cursor-target"
                  >
                    Visit Website
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            {/* Jukebox Print Partner Card */}
            <div className="group relative">
              <div className="bg-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-orange-400/30 transition-all duration-300 hover:scale-[1.02] p-8 rounded-3xl cursor-target">
                <div className="flex flex-col items-center mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-2xl p-4 mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 border border-orange-400/30">
                    <img
                      src={jukeboxLogo}
                      alt="Jukebox Print Logo"
                      className="h-16 w-auto object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white text-center mb-2">Jukebox Print</h3>
                  <span className="text-orange-400 text-sm font-medium">Printing Solutions</span>
                </div>
                <p className="text-gray-300 mb-8 text-center leading-relaxed text-sm">
                  Leading provider of high-quality printing services, helping businesses and individuals bring their creative visions to life with exceptional products and outstanding customer service.
                </p>
                <div className="flex justify-center">
                  <a
                    href="https://www.jukeboxprint.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-all duration-300 group w-48 cursor-target"
                  >
                    Visit Website
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            {/* Costco Partner Card */}
            <div className="group relative">
              <div className="bg-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-orange-400/30 transition-all duration-300 hover:scale-[1.02] p-8 rounded-3xl cursor-target">
                <div className="flex flex-col items-center mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-2xl p-4 mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 border border-orange-400/30">
                    <img
                      src={costcoLogo}
                      alt="Costco Logo"
                      className="h-16 w-auto object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white text-center mb-2">Costco</h3>
                  <span className="text-orange-400 text-sm font-medium">Food Services</span>
                </div>
                <p className="text-gray-300 mb-8 text-center leading-relaxed text-sm">
                  Costco helps provide food for our events, ensuring we have the resources to host successful gatherings.
                </p>
                <div className="flex justify-center">
                  <a
                    href="https://www.costco.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-all duration-300 group w-48 cursor-target"
                  >
                    Visit Website
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
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
                className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-all duration-300 transform hover:scale-105 border border-white/10 hover:border-white/20 flex items-center justify-center space-x-2 cursor-target"
              >
                <span>Get in Touch</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </Link>
              <a
                href="mailto:partnerships@meridianalgo.com"
                className="px-8 py-3.5 bg-transparent hover:bg-white/5 text-white rounded-full font-medium transition-all duration-300 transform hover:scale-105 border border-white/10 hover:border-white/20 flex items-center justify-center space-x-2 cursor-target"
              >
                <span>Email Us</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="mt-24 pt-12 border-t border-gray-800/50">
            <h3 className="text-2xl font-semibold text-center mb-8">
              <span className="text-white">Why Partner with </span>
              <span className="text-orange-400">Us</span>
              <span className="text-white">?</span>
            </h3>
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
                <div key={index} className="bg-gray-800/30 p-6 rounded-2xl hover:bg-gray-800/50 transition-colors duration-300 border border-transparent hover:border-orange-400/30 cursor-target">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
      </section>
    </div>
  );
};

export default Partnerships;
