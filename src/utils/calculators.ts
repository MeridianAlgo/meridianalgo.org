import { Calculator } from '../types/calculator';

/**
 * Budget Planner Calculator
 */
export const budgetPlannerCalculator: Calculator = {
  id: 'budget-planner',
  name: 'Budget Planner',
  description: 'Plan your monthly budget and track income vs expenses',
  category: 'budgeting',
  icon: 'Calculator',
  inputs: [
    {
      id: 'monthlyIncome',
      label: 'Monthly Income',
      type: 'currency',
      min: 0,
      default: 5000,
      tooltip: 'Your total monthly income after taxes'
    },
    {
      id: 'housing',
      label: 'Housing (Rent/Mortgage)',
      type: 'currency',
      min: 0,
      default: 1500,
      tooltip: 'Monthly housing costs'
    },
    {
      id: 'utilities',
      label: 'Utilities',
      type: 'currency',
      min: 0,
      default: 200,
      tooltip: 'Electric, water, gas, internet, etc.'
    },
    {
      id: 'food',
      label: 'Food & Groceries',
      type: 'currency',
      min: 0,
      default: 600,
      tooltip: 'Groceries and dining out'
    },
    {
      id: 'transportation',
      label: 'Transportation',
      type: 'currency',
      min: 0,
      default: 400,
      tooltip: 'Car payment, gas, insurance, public transit'
    },
    {
      id: 'other',
      label: 'Other Expenses',
      type: 'currency',
      min: 0,
      default: 500,
      tooltip: 'Entertainment, subscriptions, misc.'
    }
  ],
  calculate: (inputs) => {
    const totalExpenses = inputs.housing + inputs.utilities + inputs.food + inputs.transportation + inputs.other;
    const remaining = inputs.monthlyIncome - totalExpenses;
    const savingsRate = (remaining / inputs.monthlyIncome) * 100;

    return {
      primary: {
        label: 'Money Left Over',
        value: remaining,
        format: 'currency'
      },
      secondary: [
        {
          label: 'Total Expenses',
          value: totalExpenses,
          format: 'currency'
        },
        {
          label: 'Savings Rate',
          value: savingsRate,
          format: 'percentage'
        }
      ],
      explanation: remaining >= 0 
        ? `Great! You have $${remaining.toFixed(2)} left over each month. Consider saving or investing this amount.`
        : `Warning: You're spending $${Math.abs(remaining).toFixed(2)} more than you earn. Review your expenses to balance your budget.`
    };
  },
  visualization: 'chart'
};

/**
 * Debt Payoff Calculator
 */
export const debtPayoffCalculator: Calculator = {
  id: 'debt-payoff',
  name: 'Debt Payoff Calculator',
  description: 'Calculate how long it will take to pay off your debt',
  category: 'debt',
  icon: 'CreditCard',
  inputs: [
    {
      id: 'debtAmount',
      label: 'Total Debt Amount',
      type: 'currency',
      min: 0,
      default: 10000,
      tooltip: 'Total amount of debt you owe'
    },
    {
      id: 'interestRate',
      label: 'Annual Interest Rate',
      type: 'percentage',
      min: 0,
      max: 100,
      step: 0.1,
      default: 18,
      tooltip: 'Annual percentage rate (APR) on your debt'
    },
    {
      id: 'monthlyPayment',
      label: 'Monthly Payment',
      type: 'currency',
      min: 0,
      default: 300,
      tooltip: 'Amount you plan to pay each month'
    }
  ],
  calculate: (inputs) => {
    const principal = inputs.debtAmount;
    const monthlyRate = inputs.interestRate / 100 / 12;
    const payment = inputs.monthlyPayment;

    if (payment <= principal * monthlyRate) {
      return {
        primary: {
          label: 'Months to Pay Off',
          value: 999,
          format: 'number'
        },
        explanation: 'Warning: Your monthly payment is too low to cover the interest. You need to increase your payment amount.'
      };
    }

    const months = Math.log(payment / (payment - principal * monthlyRate)) / Math.log(1 + monthlyRate);
    const totalPaid = payment * months;
    const totalInterest = totalPaid - principal;

    return {
      primary: {
        label: 'Months to Pay Off',
        value: Math.ceil(months),
        format: 'number'
      },
      secondary: [
        {
          label: 'Total Amount Paid',
          value: totalPaid,
          format: 'currency'
        },
        {
          label: 'Total Interest Paid',
          value: totalInterest,
          format: 'currency'
        },
        {
          label: 'Years',
          value: months / 12,
          format: 'number'
        }
      ],
      explanation: `You'll be debt-free in ${Math.ceil(months)} months (${(months / 12).toFixed(1)} years) by paying $${payment.toFixed(2)} per month.`
    };
  },
  visualization: 'chart'
};

/**
 * Compound Interest Calculator
 */
export const compoundInterestCalculator: Calculator = {
  id: 'compound-interest',
  name: 'Compound Interest Calculator',
  description: 'See how your money grows over time with compound interest',
  category: 'investing',
  icon: 'TrendingUp',
  inputs: [
    {
      id: 'principal',
      label: 'Initial Investment',
      type: 'currency',
      min: 0,
      default: 1000,
      tooltip: 'Starting amount you invest'
    },
    {
      id: 'monthlyContribution',
      label: 'Monthly Contribution',
      type: 'currency',
      min: 0,
      default: 100,
      tooltip: 'Amount you add each month'
    },
    {
      id: 'years',
      label: 'Time Period (Years)',
      type: 'number',
      min: 1,
      max: 50,
      default: 10,
      tooltip: 'How long you plan to invest'
    },
    {
      id: 'rate',
      label: 'Annual Return Rate',
      type: 'percentage',
      min: 0,
      max: 30,
      step: 0.1,
      default: 7,
      tooltip: 'Expected annual return (7% is historical stock market average)'
    }
  ],
  calculate: (inputs) => {
    const P = inputs.principal;
    const PMT = inputs.monthlyContribution;
    const r = inputs.rate / 100 / 12;
    const n = inputs.years * 12;

    // Future value of initial investment
    const FV_principal = P * Math.pow(1 + r, n);
    
    // Future value of monthly contributions
    const FV_contributions = PMT * ((Math.pow(1 + r, n) - 1) / r);
    
    const futureValue = FV_principal + FV_contributions;
    const totalContributed = P + (PMT * n);
    const totalGains = futureValue - totalContributed;

    return {
      primary: {
        label: 'Future Value',
        value: futureValue,
        format: 'currency'
      },
      secondary: [
        {
          label: 'Total Contributed',
          value: totalContributed,
          format: 'currency'
        },
        {
          label: 'Total Gains',
          value: totalGains,
          format: 'currency'
        },
        {
          label: 'Return on Investment',
          value: (totalGains / totalContributed) * 100,
          format: 'percentage'
        }
      ],
      explanation: `By investing $${P.toFixed(2)} initially and $${PMT.toFixed(2)} monthly for ${inputs.years} years at ${inputs.rate}% annual return, you'll have $${futureValue.toFixed(2)}.`
    };
  },
  visualization: 'chart'
};

/**
 * Retirement Savings Calculator
 */
export const retirementCalculator: Calculator = {
  id: 'retirement-savings',
  name: 'Retirement Savings Calculator',
  description: 'Calculate how much you need to save for retirement',
  category: 'retirement',
  icon: 'Target',
  inputs: [
    {
      id: 'currentAge',
      label: 'Current Age',
      type: 'number',
      min: 18,
      max: 100,
      default: 30,
      tooltip: 'Your current age'
    },
    {
      id: 'retirementAge',
      label: 'Retirement Age',
      type: 'number',
      min: 50,
      max: 100,
      default: 65,
      tooltip: 'Age you plan to retire'
    },
    {
      id: 'currentSavings',
      label: 'Current Retirement Savings',
      type: 'currency',
      min: 0,
      default: 50000,
      tooltip: 'Amount already saved for retirement'
    },
    {
      id: 'monthlyContribution',
      label: 'Monthly Contribution',
      type: 'currency',
      min: 0,
      default: 500,
      tooltip: 'Amount you save each month'
    },
    {
      id: 'returnRate',
      label: 'Expected Annual Return',
      type: 'percentage',
      min: 0,
      max: 20,
      step: 0.1,
      default: 7,
      tooltip: 'Expected investment return rate'
    },
    {
      id: 'retirementIncome',
      label: 'Desired Annual Retirement Income',
      type: 'currency',
      min: 0,
      default: 60000,
      tooltip: 'Annual income you want in retirement'
    }
  ],
  calculate: (inputs) => {
    const yearsToRetirement = inputs.retirementAge - inputs.currentAge;
    const monthsToRetirement = yearsToRetirement * 12;
    const monthlyRate = inputs.returnRate / 100 / 12;

    // Future value of current savings
    const FV_current = inputs.currentSavings * Math.pow(1 + monthlyRate, monthsToRetirement);
    
    // Future value of monthly contributions
    const FV_contributions = inputs.monthlyContribution * ((Math.pow(1 + monthlyRate, monthsToRetirement) - 1) / monthlyRate);
    
    const totalAtRetirement = FV_current + FV_contributions;
    
    // Using 4% withdrawal rule
    const annualIncome = totalAtRetirement * 0.04;
    const shortfall = inputs.retirementIncome - annualIncome;

    return {
      primary: {
        label: 'Retirement Savings at ' + inputs.retirementAge,
        value: totalAtRetirement,
        format: 'currency'
      },
      secondary: [
        {
          label: 'Annual Retirement Income (4% rule)',
          value: annualIncome,
          format: 'currency'
        },
        {
          label: 'Years to Retirement',
          value: yearsToRetirement,
          format: 'number'
        },
        {
          label: shortfall > 0 ? 'Income Shortfall' : 'Income Surplus',
          value: Math.abs(shortfall),
          format: 'currency'
        }
      ],
      explanation: shortfall > 0
        ? `You'll have $${totalAtRetirement.toFixed(0)} at retirement, providing $${annualIncome.toFixed(0)}/year. You're $${shortfall.toFixed(0)} short of your goal. Consider increasing contributions.`
        : `Great! You're on track to exceed your retirement income goal by $${Math.abs(shortfall).toFixed(0)} per year.`
    };
  },
  visualization: 'chart'
};

/**
 * Emergency Fund Calculator
 */
export const emergencyFundCalculator: Calculator = {
  id: 'emergency-fund',
  name: 'Emergency Fund Calculator',
  description: 'Calculate how much you should have in your emergency fund',
  category: 'savings',
  icon: 'Shield',
  inputs: [
    {
      id: 'monthlyExpenses',
      label: 'Monthly Expenses',
      type: 'currency',
      min: 0,
      default: 3000,
      tooltip: 'Your total monthly living expenses'
    },
    {
      id: 'monthsCoverage',
      label: 'Months of Coverage',
      type: 'number',
      min: 1,
      max: 12,
      default: 6,
      tooltip: 'How many months of expenses to save (3-6 recommended)'
    },
    {
      id: 'currentSavings',
      label: 'Current Emergency Savings',
      type: 'currency',
      min: 0,
      default: 5000,
      tooltip: 'Amount currently in your emergency fund'
    },
    {
      id: 'monthlySavings',
      label: 'Monthly Savings Amount',
      type: 'currency',
      min: 0,
      default: 200,
      tooltip: 'Amount you can save each month'
    }
  ],
  calculate: (inputs) => {
    const targetAmount = inputs.monthlyExpenses * inputs.monthsCoverage;
    const remaining = targetAmount - inputs.currentSavings;
    const monthsToGoal = remaining > 0 ? Math.ceil(remaining / inputs.monthlySavings) : 0;
    const progressPercent = (inputs.currentSavings / targetAmount) * 100;

    return {
      primary: {
        label: 'Emergency Fund Goal',
        value: targetAmount,
        format: 'currency'
      },
      secondary: [
        {
          label: 'Amount Remaining',
          value: Math.max(0, remaining),
          format: 'currency'
        },
        {
          label: 'Months to Goal',
          value: monthsToGoal,
          format: 'number'
        },
        {
          label: 'Progress',
          value: Math.min(100, progressPercent),
          format: 'percentage'
        }
      ],
      explanation: remaining > 0
        ? `You need $${remaining.toFixed(2)} more to reach your goal. At $${inputs.monthlySavings}/month, you'll reach it in ${monthsToGoal} months.`
        : `Congratulations! You've reached your emergency fund goal of ${inputs.monthsCoverage} months of expenses.`
    };
  },
  visualization: 'gauge'
};

/**
 * Investment Return Calculator
 */
export const investmentReturnCalculator: Calculator = {
  id: 'investment-return',
  name: 'Investment Return Calculator',
  description: 'Calculate potential returns on your investments',
  category: 'investing',
  icon: 'TrendingUp',
  inputs: [
    {
      id: 'initialInvestment',
      label: 'Initial Investment',
      type: 'currency',
      min: 0,
      default: 10000,
      tooltip: 'Starting investment amount'
    },
    {
      id: 'years',
      label: 'Investment Period (Years)',
      type: 'number',
      min: 1,
      max: 50,
      default: 5,
      tooltip: 'How long you plan to invest'
    },
    {
      id: 'returnRate',
      label: 'Expected Annual Return',
      type: 'percentage',
      min: -50,
      max: 100,
      step: 0.1,
      default: 8,
      tooltip: 'Expected annual return rate'
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate',
      type: 'percentage',
      min: 0,
      max: 20,
      step: 0.1,
      default: 3,
      tooltip: 'Expected annual inflation rate'
    }
  ],
  calculate: (inputs) => {
    const futureValue = inputs.initialInvestment * Math.pow(1 + inputs.returnRate / 100, inputs.years);
    const totalReturn = futureValue - inputs.initialInvestment;
    const returnPercent = (totalReturn / inputs.initialInvestment) * 100;
    
    // Adjust for inflation
    const realReturnRate = ((1 + inputs.returnRate / 100) / (1 + inputs.inflationRate / 100) - 1) * 100;
    const realFutureValue = inputs.initialInvestment * Math.pow(1 + realReturnRate / 100, inputs.years);

    return {
      primary: {
        label: 'Future Value',
        value: futureValue,
        format: 'currency'
      },
      secondary: [
        {
          label: 'Total Return',
          value: totalReturn,
          format: 'currency'
        },
        {
          label: 'Return Percentage',
          value: returnPercent,
          format: 'percentage'
        },
        {
          label: 'Inflation-Adjusted Value',
          value: realFutureValue,
          format: 'currency'
        }
      ],
      explanation: `Your $${inputs.initialInvestment.toFixed(2)} investment will grow to $${futureValue.toFixed(2)} in ${inputs.years} years at ${inputs.returnRate}% annual return. After adjusting for ${inputs.inflationRate}% inflation, the real value is $${realFutureValue.toFixed(2)}.`
    };
  },
  visualization: 'chart'
};

// Import extended calculators
import { moreCalculators } from './calculators-extended';

// Export all calculators
export const allCalculators: Calculator[] = [
  budgetPlannerCalculator,
  debtPayoffCalculator,
  compoundInterestCalculator,
  retirementCalculator,
  emergencyFundCalculator,
  investmentReturnCalculator,
  ...moreCalculators
];
