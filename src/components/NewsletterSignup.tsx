import React, { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setMessage('Thank you for subscribing! Check your email for confirmation.');
      setEmail('');
      
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }, 1500);
  };

  return (
    <AnimatedSection animation="fadeInUp">
      <div className="bg-gradient-to-r from-orange-400/10 via-orange-500/10 to-orange-600/10 rounded-2xl p-8 border border-orange-400/20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex p-3 rounded-full bg-orange-400/10 mb-4">
            <Mail className="w-8 h-8 text-orange-400" />
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-3">
            Stay Updated with Smart Cents Weekly
          </h3>
          
          <p className="text-gray-400 mb-6">
            Get the latest insights on financial literacy and trading strategies delivered to your inbox every week.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-400 transition-colors duration-300"
              disabled={status === 'loading' || status === 'success'}
            />
            
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="px-6 py-3 bg-orange-400 hover:bg-orange-500 disabled:bg-gray-700 text-black disabled:text-gray-400 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 min-w-[140px]"
            >
              {status === 'loading' && (
                <>
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Subscribing...
                </>
              )}
              {status === 'success' && (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Subscribed!
                </>
              )}
              {(status === 'idle' || status === 'error') && 'Subscribe'}
            </button>
          </form>
          
          {message && (
            <div className={`mt-4 flex items-center justify-center gap-2 ${status === 'error' ? 'text-red-400' : 'text-green-400'}`}>
              {status === 'error' ? <AlertCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
              <span className="text-sm">{message}</span>
            </div>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default NewsletterSignup;
