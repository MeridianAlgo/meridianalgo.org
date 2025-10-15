import React from 'react';
import { CalculatorResult as CalculatorResultType } from '../../types/calculator';
import { TrendingUp, DollarSign, Percent } from 'lucide-react';

interface CalculatorResultProps {
  result: CalculatorResultType;
}

const CalculatorResult: React.FC<CalculatorResultProps> = ({ result }) => {
  const formatValue = (value: number, format: 'currency' | 'number' | 'percentage'): string => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(value);
      case 'percentage':
        return `${value.toFixed(2)}%`;
      case 'number':
        return new Intl.NumberFormat('en-US', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }).format(value);
      default:
        return value.toString();
    }
  };

  const getIcon = (format: 'currency' | 'number' | 'percentage') => {
    switch (format) {
      case 'currency':
        return <DollarSign className="w-6 h-6" />;
      case 'percentage':
        return <Percent className="w-6 h-6" />;
      default:
        return <TrendingUp className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Primary Result */}
      <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border border-orange-500/30 rounded-xl p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-300">{result.primary.label}</span>
          <div className="text-orange-400">
            {getIcon(result.primary.format)}
          </div>
        </div>
        <div className="text-3xl sm:text-4xl font-bold text-white">
          {formatValue(result.primary.value, result.primary.format)}
        </div>
      </div>

      {/* Secondary Results */}
      {result.secondary && result.secondary.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {result.secondary.map((item, index) => (
            <div
              key={index}
              className="bg-gray-800/50 border border-gray-700 rounded-xl p-4"
            >
              <div className="text-xs text-gray-400 mb-1">{item.label}</div>
              <div className="text-xl font-semibold text-white">
                {formatValue(item.value, item.format)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Explanation */}
      {result.explanation && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
          <p className="text-sm text-gray-300">{result.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default CalculatorResult;
