/**
 * Calculator Type Definitions
 */

export interface CalculatorInput {
  id: string;
  label: string;
  type: 'number' | 'currency' | 'percentage';
  min?: number;
  max?: number;
  step?: number;
  default?: number;
  tooltip?: string;
  suffix?: string;
}

export interface CalculatorResult {
  primary: {
    label: string;
    value: number;
    format: 'currency' | 'number' | 'percentage';
  };
  secondary?: Array<{
    label: string;
    value: number;
    format: 'currency' | 'number' | 'percentage';
  }>;
  chartData?: ChartData;
  explanation?: string;
}

export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }>;
}

export type CalculatorCategory = 'budgeting' | 'debt' | 'investing' | 'retirement' | 'savings' | 'general' | 'mortgage' | 'auto' | 'education' | 'business';

export interface Calculator {
  id: string;
  name: string;
  description: string;
  category: CalculatorCategory;
  icon: string;
  inputs: CalculatorInput[];
  calculate: (inputs: Record<string, number>) => CalculatorResult;
  visualization?: 'chart' | 'table' | 'gauge' | 'none';
}

export interface CalculatorInputValues {
  [key: string]: number;
}
