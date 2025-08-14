import React, { useEffect } from 'react';
import { Users, BookOpen, Zap, Globe } from 'lucide-react';

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

const About = () => {
  useScrollFadeIn();
  
  useEffect(() => {
    document.title = 'MeridianAlgo - About';
  }, []);
  
  return (
    <div className="relative min-h-screen w-full bg-black pt-24">
      {/* About Title Section */}
      <section className="py-24 fade-in-up bg-transparent">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-white text-5xl md:text-7xl font-extrabold drop-shadow-2xl mb-6 font-inter" style={{ textShadow: '0 4px 32px rgba(0,0,0,0.7)' }}>
            About
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 font-inter font-light" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.5)' }}>
            MeridianAlgo is an open-source platform for democratizing access to sophisticated trading tools and algorithmic finance. Our mission is to empower everyone—from curious beginners to advanced quants—with transparent, ethical, and powerful technology.
          </p>
        </div>
      </section>
      {/* Divider */}
      <div className="flex justify-center items-center">
        <div className="w-32 h-0.5 bg-blue-400/40 rounded-full blur-[1px] my-2" />
      </div>
      {/* Approach Section */}
      <section className="py-24 fade-in-up bg-transparent">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-4 font-inter">Our Approach</h2>
          <p className="text-lg md:text-xl text-slate-200 mb-2 font-inter font-light">
            We simplify the complexities of global financial markets through cutting-edge algorithmic systems that are transparent, powerful, and easy to use. Whether you’re a curious beginner or a seasoned trader, our resources are designed to meet you where you are—no jargon, no barriers, just clarity and possibility.
          </p>
        </div>
      </section>
      {/* Divider */}
      <div className="flex justify-center items-center">
        <div className="w-32 h-0.5 bg-blue-400/40 rounded-full blur-[1px] my-2" />
      </div>
      {/* What Sets Us Apart Section */}
      <section className="py-24 fade-in-up bg-transparent">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-300 mb-10 text-center font-inter">What Sets MeridianAlgo Apart</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="fade-in-up-delayed">
              <h3 className="text-lg font-bold text-white mb-2 font-inter">Practical Education for All</h3>
              <p className="text-slate-200 font-inter font-light">Financial newsletters, tutorials, and tools tailored for everyday users—not just Wall Street insiders.</p>
            </div>
            <div className="fade-in-up-delayed">
              <h3 className="text-lg font-bold text-white mb-2 font-inter">Ethical Algorithm Design</h3>
              <p className="text-slate-200 font-inter font-light">We champion fairness, interpretability, and responsible AI in trading.</p>
            </div>
            <div className="fade-in-up-delayed">
              <h3 className="text-lg font-bold text-white mb-2 font-inter">Social Impact at Scale</h3>
              <p className="text-slate-200 font-inter font-light">We're building bridges between academia, regulators, and communities through collaborative research and public engagement.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Divider */}
      <div className="flex justify-center items-center">
        <div className="w-32 h-0.5 bg-blue-400/40 rounded-full blur-[1px] my-2" />
      </div>
      {/* Vision Section */}
      <section className="py-12 fade-in-up bg-transparent">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-400 mb-4 font-inter">Our Vision</h2>
          <p className="text-lg md:text-xl text-slate-200 mb-4 font-inter font-light">
            This is more than financial literacy—it’s a movement to transform how ordinary people engage with opportunity. Our vision is a world where market insights are shared, risks are understood, and wealth creation is no longer gated behind technical knowledge or capital.
          </p>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 font-inter">Join us in redefining finance—from the ground up.</h3>
        </div>
      </section>
    </div>
  );
};

export default About;