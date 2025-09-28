import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, BookOpen, Code } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import AnimatedSection from './AnimatedSection';

interface Stat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  icon: React.ReactNode;
}

const Stats: React.FC = () => {
  const { targetRef, isIntersecting } = useIntersectionObserver({ threshold: 0.3 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isIntersecting && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isIntersecting, hasAnimated]);

  const stats: Stat[] = [
    { 
      label: 'Active Users', 
      value: 5000, 
      suffix: '+',
      icon: <Users className="w-6 h-6" />
    },
    { 
      label: 'Trading Strategies', 
      value: 25, 
      icon: <TrendingUp className="w-6 h-6" />
    },
    { 
      label: 'Educational Resources', 
      value: 100, 
      suffix: '+',
      icon: <BookOpen className="w-6 h-6" />
    },
    { 
      label: 'Open Source Projects', 
      value: 12, 
      icon: <Code className="w-6 h-6" />
    },
  ];

  const CountUp: React.FC<{ end: number; duration?: number; prefix?: string; suffix?: string }> = ({ 
    end, 
    duration = 2000, 
    prefix = '', 
    suffix = '' 
  }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!hasAnimated) return;

      let startTime: number | null = null;
      const startValue = 0;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(easeOutQuart * (end - startValue) + startValue);
        
        setCount(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, [hasAnimated, end, duration]);

    return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
  };

  return (
    <AnimatedSection animation="fadeInUp">
      <div ref={targetRef as React.RefObject<HTMLDivElement>} className="py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="text-center group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-orange-400/10 to-orange-600/10 text-orange-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-white mb-2">
                {hasAnimated ? (
                  <CountUp 
                    end={stat.value} 
                    prefix={stat.prefix} 
                    suffix={stat.suffix} 
                  />
                ) : (
                  <span className="opacity-0">0</span>
                )}
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Stats;
