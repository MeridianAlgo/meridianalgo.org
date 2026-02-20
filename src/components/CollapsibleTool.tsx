import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface CollapsibleToolProps {
  title: string;
  icon: React.ReactNode;
  description?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleTool: React.FC<CollapsibleToolProps> = ({
  title,
  icon,
  description,
  children,
  defaultOpen = false
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-gray-900/40 backdrop-blur-md rounded-3xl border border-white/10 hover:border-orange-400/30 transition-all duration-300 overflow-hidden shadow-xl">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors text-left cursor-target"
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-2xl flex items-center justify-center text-orange-400 border border-orange-400/20 group-hover:scale-110 transition-transform">
            {icon}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
            {description && (
              <p className="text-sm text-gray-400 mt-1 font-light">{description}</p>
            )}
          </div>
        </div>
        <div className={`text-orange-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-6 h-6" />
        </div>
      </button>

      <div
        className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="px-6 pb-8 pt-2 border-t border-white/5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CollapsibleTool;
