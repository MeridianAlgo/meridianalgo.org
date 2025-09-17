import { useEffect } from 'react';
import { Mail, Github, MapPin, Send, Linkedin, X } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

function useScrollFadeIn() {
  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in-up, .fade-in-up-delayed');
    const onScroll = () => {
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 40) {
          el.classList.add('animate');
        }
      });
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}

const Contact = () => {
  useScrollFadeIn();
  const [state, handleSubmit] = useForm("xkgzwdoa");
  
  useEffect(() => {
    document.title = 'MeridianAlgo - Contact';
  }, []);

  if (state.succeeded) {
    return (
      <div className="pt-20 w-full bg-gradient-to-b from-[#21273b] via-[#23243a] via-60% to-black min-h-screen">
        <section className="py-20 min-h-screen flex items-center justify-center bg-transparent">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="rounded-3xl p-12 bg-transparent">
              <div className="bg-gradient-to-r from-orange-600 to-orange-400 rounded-full p-6 w-fit mx-auto mb-8">
                <Send className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-6 font-inter">Thank You!</h2>
              <p className="text-xl text-slate-300 mb-8 font-inter font-light">
                Your message has been sent successfully. We'll get back to you within 24 hours!
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 font-inter"
              >
                Send Another Message
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

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
              <Mail className="w-10 h-10 text-orange-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Touch</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              Ready to democratize financial markets? Connect with us to learn more about our algorithms, contribute to our open-source projects, or join our community.
            </p>
          </div>
        </div>
      </section>
      {/* Main Content */}
      <section className="py-24 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <div className="text-center mb-16">
                <span className="text-xs uppercase tracking-widest text-orange-400 font-mono mb-6 inline-block bg-orange-400/10 px-4 py-2 rounded-full">Contact Information</span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 leading-tight">
                  Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Connect</span>
                </h2>
                <div className="w-16 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto"></div>
              </div>
              
              <div className="space-y-6 mb-12">
                <div className="bg-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-orange-400/30 transition-all duration-300 p-6 rounded-2xl">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-2">Email</h3>
                      <p className="text-gray-300">meridianalgo@gmail.com</p>
                      <p className="text-gray-400 text-sm mt-1">We respond within 24 hours</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-orange-400/30 transition-all duration-300 p-6 rounded-2xl">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                      <Github className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-2">Open Source</h3>
                      <a href="https://github.com/MeridianAlgo" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">
                        github.com/MeridianAlgo
                      </a>
                      <p className="text-gray-400 text-sm mt-1">Contribute to our projects</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-orange-400/30 transition-all duration-300 p-6 rounded-2xl">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-2">Community</h3>
                      <p className="text-gray-300">Global • Remote First</p>
                      <p className="text-gray-400 text-sm mt-1">Discord & Telegram coming soon</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Social Links */}
              <div className="mb-12">
                <h3 className="text-white font-semibold text-lg mb-6">Follow Us</h3>
                <div className="flex space-x-4">
                  <a 
                    href="https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Aorganization%3A107717373&keywords=meridianalgo&origin=RICH_QUERY_SUGGESTION&position=0&searchId=78e6a6ae-9729-449e-8747-3931ace9b150&sid=M2v&spellCorrectionEnabled=false"
                    className="bg-gray-800/50 hover:bg-orange-500 p-3 rounded-xl transition-all duration-300 hover:scale-110 border border-gray-700/50 hover:border-orange-400/50"
                  >
                    <Linkedin className="w-6 h-6 text-gray-400 hover:text-white" />
                  </a>
                  <a 
                    href="https://x.com/MeridianAlgo"
                    className="bg-gray-800/50 hover:bg-orange-500 p-3 rounded-xl transition-all duration-300 hover:scale-110 border border-gray-700/50 hover:border-orange-400/50"
                  >
                    <X className="w-6 h-6 text-gray-400 hover:text-white" />
                  </a>
                  <a 
                    href="https://github.com/MeridianAlgo"
                    className="bg-gray-800/50 hover:bg-orange-500 p-3 rounded-xl transition-all duration-300 hover:scale-110 border border-gray-700/50 hover:border-orange-400/50"
                  >
                    <Github className="w-6 h-6 text-gray-400 hover:text-white" />
                  </a>
                </div>
              </div>
              {/* Engagement Options */}
              <div className="bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8">
                <h4 className="text-white font-semibold mb-6 text-lg">Ways to Engage</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-gray-300 hover:text-orange-400 transition-colors duration-300 cursor-pointer">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>Contribute to open-source algorithms</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300 hover:text-orange-400 transition-colors duration-300 cursor-pointer">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Join our trading community</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300 hover:text-orange-400 transition-colors duration-300 cursor-pointer">
                    <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                    <span>Access educational resources</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300 hover:text-orange-400 transition-colors duration-300 cursor-pointer">
                    <div className="w-2 h-2 bg-orange-700 rounded-full"></div>
                    <span>Partner with our research initiatives</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Contact Form */}
            <div className="bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-3xl p-10">
              <div className="text-center mb-8">
                <span className="text-xs uppercase tracking-widest text-orange-400 font-mono mb-4 inline-block bg-orange-400/10 px-4 py-2 rounded-full">Contact Form</span>
                <h2 className="text-2xl font-bold text-white mb-4">Send us a Message</h2>
                <div className="w-12 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto"></div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white font-medium mb-3 font-inter">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full bg-gray-900/50 border border-gray-600/50 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none transition-all duration-300 hover:border-gray-500"
                    placeholder="Your full name"
                  />
                  <ValidationError 
                    prefix="Name" 
                    field="name"
                    errors={state.errors}
                    className="text-red-400 text-sm mt-2"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white font-medium mb-3 font-inter">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-gray-900/50 border border-gray-600/50 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none transition-all duration-300 hover:border-gray-500"
                    placeholder="your.email@example.com"
                  />
                  <ValidationError 
                    prefix="Email" 
                    field="email"
                    errors={state.errors}
                    className="text-red-400 text-sm mt-2"
                  />
                </div>

                <div>
                  <label htmlFor="interest" className="block text-white font-medium mb-3 font-inter">
                    Primary Interest
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    className="w-full bg-gray-900/50 border border-gray-600/50 rounded-xl px-4 py-4 text-white focus:border-orange-500 focus:outline-none transition-all duration-300 hover:border-gray-500"
                  >
                    <option value="">Select your interest</option>
                    <option value="trading">Algorithmic Trading</option>
                    <option value="education">Educational Resources</option>
                    <option value="opensource">Open Source Contribution</option>
                    <option value="research">Research Collaboration</option>
                    <option value="partnership">Partnership Opportunities</option>
                    <option value="recruiting">Recruiting & Careers</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-white font-medium mb-3 font-inter">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full bg-gray-900/50 border border-gray-600/50 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none transition-all duration-300 resize-none hover:border-gray-500"
                    placeholder="Tell us about your interest in MeridianAlgo..."
                  />
                  <ValidationError 
                    prefix="Message" 
                    field="message"
                    errors={state.errors}
                    className="text-red-400 text-sm mt-2"
                  />
                </div>

                <button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:transform hover:scale-[1.02] flex items-center justify-center space-x-3 hover:shadow-lg hover:shadow-orange-500/25"
                >
                  <Send className="w-5 h-5" />
                  <span>{state.submitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;