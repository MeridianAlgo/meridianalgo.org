import React, { useEffect } from 'react';
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

  if (state.succeeded) {
    return (
      <div className="pt-20 w-full bg-gradient-to-b from-[#21273b] via-[#23243a] via-60% to-black min-h-screen">
        <section className="py-20 min-h-screen flex items-center justify-center bg-transparent">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="rounded-3xl p-12 bg-transparent">
              <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-full p-6 w-fit mx-auto mb-8">
                <Send className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-6 font-inter">Thank You!</h2>
              <p className="text-xl text-slate-300 mb-8 font-inter font-light">
                Your message has been sent successfully. We'll get back to you within 24 hours!
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 font-inter"
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
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#21273b] via-[#23243a] via-60% to-black pt-24">
      {/* Hero Section */}
      <section className="py-24 fade-in-up bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 font-inter">
              Contact
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 max-w-4xl mx-auto leading-relaxed font-inter font-light">
              Ready to democratize financial markets? Connect with us to learn more about 
              our algorithms, contribute to our open-source projects, or join our community.
            </p>
          </div>
        </div>
      </section>
      {/* Divider */}
      <div className="flex justify-center items-center">
        <div className="w-32 h-0.5 bg-blue-400/40 rounded-full blur-[1px] my-2" />
      </div>
      {/* Main Content */}
      <section className="py-20 fade-in-up bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8 font-inter">Get Connected</h2>
              <div className="space-y-8 mb-12">
                <div className="flex items-start space-x-6 group">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2 font-inter">Email</h3>
                    <p className="text-slate-400 font-inter">meridianalgo@gmail.com</p>
                    <p className="text-slate-500 text-sm mt-1 font-inter font-light">We respond within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6 group">
                  <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-4">
                    <Github className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2 font-inter">Open Source</h3>
                    <a href="https://github.com/MeridianAlgo" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-inter">
                      github.com/MeridianAlgo
                    </a>
                    <p className="text-slate-500 text-sm mt-1 font-inter font-light">Contribute to our projects</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6 group">
                  <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl p-4">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2 font-inter">Community</h3>
                    <p className="text-slate-400 font-inter">Global • Remote First</p>
                    <p className="text-slate-500 text-sm mt-1 font-inter font-light">Discord & Telegram coming soon</p>
                  </div>
                </div>
              </div>
              {/* Social Links */}
              <div className="mb-12">
                <h3 className="text-white font-semibold text-lg mb-6 font-inter">Follow Us</h3>
                <div className="flex space-x-4">
                  <a 
                    href="https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Aorganization%3A107717373&keywords=meridianalgo&origin=RICH_QUERY_SUGGESTION&position=0&searchId=78e6a6ae-9729-449e-8747-3931ace9b150&sid=M2v&spellCorrectionEnabled=false"
                    className="bg-slate-800 hover:bg-blue-600 p-3 rounded-xl transition-all duration-300 hover:scale-110"
                  >
                    <Linkedin className="w-6 h-6 text-slate-400 hover:text-white" />
                  </a>
                  <a 
                    href="https://x.com/MeridianAlgo"
                    className="bg-slate-800 hover:bg-blue-600 p-3 rounded-xl transition-all duration-300 hover:scale-110"
                  >
                    <X className="w-6 h-6 text-slate-400 hover:text-white" />
                  </a>
                  <a 
                    href="https://github.com/MeridianAlgo"
                    className="bg-slate-800 hover:bg-blue-600 p-3 rounded-xl transition-all duration-300 hover:scale-110"
                  >
                    <Github className="w-6 h-6 text-slate-400 hover:text-white" />
                  </a>
                </div>
              </div>
              {/* Engagement Options */}
              <div className="rounded-2xl p-8 bg-transparent">
                <h4 className="text-white font-semibold mb-6 text-lg font-inter">Ways to Engage</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-slate-300 hover:text-blue-400 transition-colors duration-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="font-inter font-light">Contribute to open-source algorithms</span>
                  </div>
                  <div className="flex items-center space-x-3 text-slate-300 hover:text-blue-400 transition-colors duration-300">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="font-inter font-light">Join our trading community</span>
                  </div>
                  <div className="flex items-center space-x-3 text-slate-300 hover:text-blue-400 transition-colors duration-300">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="font-inter font-light">Access educational resources</span>
                  </div>
                  <div className="flex items-center space-x-3 text-slate-300 hover:text-blue-400 transition-colors duration-300">
                    <div className="w-2 h-2 bg-blue-700 rounded-full"></div>
                    <span className="font-inter font-light">Partner with our research initiatives</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Contact Form */}
            <div className="rounded-3xl p-10 bg-transparent">
              <h2 className="text-2xl font-bold text-white mb-8 font-inter">Send us a Message</h2>
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
                    className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-4 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-all duration-300 hover:border-slate-500 font-inter"
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
                    className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-4 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-all duration-300 hover:border-slate-500 font-inter"
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
                    className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-4 text-white focus:border-blue-500 focus:outline-none transition-all duration-300 hover:border-slate-500 font-inter"
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
                    className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-4 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-all duration-300 resize-none hover:border-slate-500 font-inter"
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
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:transform hover:scale-[1.02] flex items-center justify-center space-x-3 hover:shadow-lg hover:shadow-blue-500/25 font-inter"
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