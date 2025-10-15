import React from 'react';
import { CalculatorInput as CalculatorInputType } from '../../types/calculator';
import { HelpCircle } from 'lucide-react';

interface CalculatorInputProps {
  input: CalculatorInputType;
  value: number;
  onChange: (value: number) => void;
}

const CalculatorInput: React.FC<CalculatorInputProps> = ({ input, value, onChange }) => {
  const formatValue = (val: number): string => {
    if (input.type === 'currency') {
      return val.toFixed(2);
    } else if (input.type === 'percentage') {
      return val.toFixed(2);
    }
    return val.toString();
  };

  const parseValue = (val: string): number => {
    const parsed = parseFloat(val);
    return isNaN(parsed) ? 0 : parsed;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseValue(e.target.value);
    
    // Apply min/max constraints
    let constrainedValue = newValue;
    if (input.min !== undefined && newValue < input.min) {
      constrainedValue = input.min;
    }
    if (input.max !== undefined && newValue > input.max) {
      constrainedValue = input.max;
    }
    
    onChange(constrainedValue);
  };

  const getPrefix = () => {
    if (input.type === 'currency') return '$';
    return '';
  };

  const getSuffix = () => {
    if (input.type === 'percentage') return '%';
    if (input.suffix) return input.suffix;
    return '';
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label htmlFor={input.id} className="block text-sm font-medium text-gray-300">
          {input.label}
        </label>
        {input.tooltip && (
          <div className="group relative">
            <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
            <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block w-64 p-2 bg-gray-800 text-xs text-gray-300 rounded-lg shadow-lg z-10">
              {input.tooltip}
            </div>
          </div>
        )}
      </div>
      
      <div className="relative">
        {getPrefix() && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {getPrefix()}
          </span>
        )}
        
        <input
          id={input.id}
          type="number"
          value={formatValue(value)}
          onChange={handleChange}
          min={input.min}
          max={input.max}
          step={input.step || 1}
          className={`w-full ${getPrefix() ? 'pl-8' : 'pl-4'} ${getSuffix() ? 'pr-12' : 'pr-4'} py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 hover:border-gray-500`}
        />
        
        {getSuffix() && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {getSuffix()}
          </span>
        )}
      </div>
    </div>
  );
};

export default CalculatorInput;
