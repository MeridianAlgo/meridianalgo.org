import React, { useState, useEffect } from 'react';
import { Calculator as CalculatorType, CalculatorInputValues } from '../../types/calculator';
import CalculatorInput from './CalculatorInput';
import CalculatorResult from './CalculatorResult';
import { Calculator as CalculatorIcon } from 'lucide-react';

interface CalculatorBaseProps {
  calculator: CalculatorType;
}

const CalculatorBase: React.FC<CalculatorBaseProps> = ({ calculator }) => {
  const [inputValues, setInputValues] = useState<CalculatorInputValues>(() => {
    const initial: CalculatorInputValues = {};
    calculator.inputs.forEach(input => {
      initial[input.id] = input.default || 0;
    });
    return initial;
  });

  const [result, setResult] = useState(() => calculator.calculate(inputValues));

  useEffect(() => {
    const newResult = calculator.calculate(inputValues);
    setResult(newResult);
  }, [inputValues, calculator]);

  const handleInputChange = (inputId: string, value: number) => {
    setInputValues(prev => ({
      ...prev,
      [inputId]: value,
    }));
  };

  const handleReset = () => {
    const resetValues: CalculatorInputValues = {};
    calculator.inputs.forEach(input => {
      resetValues[input.id] = input.default || 0;
    });
    setInputValues(resetValues);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
            <CalculatorIcon className="w-6 h-6 text-orange-400" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">{calculator.name}</h2>
            <p className="text-gray-400 text-sm">{calculator.description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inputs Section */}
        <div className="space-y-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Input Values</h3>
            <div className="space-y-4">
              {calculator.inputs.map(input => (
                <CalculatorInput
                  key={input.id}
                  input={input}
                  value={inputValues[input.id]}
                  onChange={(value) => handleInputChange(input.id, value)}
                />
              ))}
            </div>
            
            <button
              onClick={handleReset}
              className="mt-6 w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 text-sm"
            >
              Reset to Defaults
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Results</h3>
            <CalculatorResult result={result} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorBase;
