import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
    <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between hover:bg-gray-750 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center text-orange-400">
            {icon}
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold text-white">{title}</h3>
            {description && (
              <p className="text-sm text-gray-400 mt-1">{description}</p>
            )}
          </div>
        </div>
        <div className="text-gray-400">
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>
      
      {isOpen && (
        <div className="px-6 pb-6 border-t border-gray-700">
          <div className="pt-6">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default CollapsibleTool;
