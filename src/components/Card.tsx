import React from 'react';
import { LucideIcon } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

interface CardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  iconColor?: string;
  link?: string;
  linkText?: string;
  gradient?: boolean;
  className?: string;
  delay?: number;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  icon: Icon,
  iconColor = 'text-orange-400',
  link,
  linkText = 'Learn More',
  gradient = false,
  className = '',
  delay = 0,
  children
}) => {
  const cardContent = (
    <div
      className={`
        relative group h-full
        ${gradient ? 'bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-black/90' : 'bg-gray-900/80'}
        backdrop-blur-sm rounded-2xl p-6 
        border border-gray-800/50 
        hover:border-orange-400/30 
        transition-all duration-500
        hover:shadow-xl hover:shadow-orange-400/10
        hover:-translate-y-1
        ${className}
      `}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400/0 via-orange-400/0 to-orange-400/0 group-hover:from-orange-400/5 group-hover:via-orange-400/10 group-hover:to-orange-400/5 transition-all duration-500 pointer-events-none" />
      
      {Icon && (
        <div className="mb-4 relative z-10">
          <div className={`inline-flex p-3 rounded-xl bg-black/50 ${iconColor} group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      )}
      
      <h3 className="text-xl font-bold text-white mb-3 relative z-10">{title}</h3>
      <p className="text-gray-400 mb-4 relative z-10 leading-relaxed">{description}</p>
      
      {children && (
        <div className="relative z-10 mb-4">
          {children}
        </div>
      )}
      
      {link && (
        <a
          href={link}
          className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-semibold group/link transition-colors duration-300 relative z-10"
        >
          {linkText}
          <span className="group-hover/link:translate-x-1 transition-transform duration-300">→</span>
        </a>
      )}
    </div>
  );

  return (
    <AnimatedSection animation="fadeInUp" delay={delay}>
      {cardContent}
    </AnimatedSection>
  );
};

export default Card;
