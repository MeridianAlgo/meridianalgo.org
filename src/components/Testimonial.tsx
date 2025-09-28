import React from 'react';
import { Quote } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company?: string;
  delay?: number;
}

const Testimonial: React.FC<TestimonialProps> = ({
  quote,
  author,
  role,
  company,
  delay = 0
}) => {
  return (
    <AnimatedSection animation="fadeInUp" delay={delay}>
      <div className="relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50 hover:border-orange-400/20 transition-all duration-500 group">
        <Quote className="absolute top-4 right-4 w-8 h-8 text-orange-400/20 group-hover:text-orange-400/40 transition-colors duration-300" />
        
        <blockquote className="relative z-10">
          <p className="text-gray-300 text-lg leading-relaxed mb-6 italic">
            "{quote}"
          </p>
          
          <footer className="border-t border-gray-800 pt-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {author.charAt(0)}
              </div>
              <div>
                <cite className="not-italic">
                  <div className="font-semibold text-white">{author}</div>
                  <div className="text-sm text-gray-400">
                    {role}
                    {company && <span className="text-orange-400"> • {company}</span>}
                  </div>
                </cite>
              </div>
            </div>
          </footer>
        </blockquote>
      </div>
    </AnimatedSection>
  );
};

export default Testimonial;
