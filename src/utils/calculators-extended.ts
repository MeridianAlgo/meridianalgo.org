import { Calculator } from '../types/calculator';

/**
 * MORTGAGE & HOME CALCULATORS
 */

export const mortgageCalculator: Calculator = {
  id: 'mortgage',
  name: 'Mortgage Calculator',
  description: 'Calculate monthly mortgage payments and total interest',
  category: 'mortgage',
  icon: 'Home',
  inputs: [
    { id: 'homePrice', label: 'Home Price', type: 'currency', min: 0, default: 300000 },
    { id: 'downPayment', label: 'Down Payment', type: 'currency', min: 0, default: 60000 },
    { id: 'interestRate', label: 'Interest Rate', type: 'percentage', min: 0, max: 20, step: 0.1, default: 6.5 },
    { id: 'loanTerm', label: 'Loan Term (Years)', type: 'number', min: 1, max: 40, default: 30 },
  ],
  calculate: (inputs) => {
    const principal = inputs.homePrice - inputs.downPayment;
    const monthlyRate = inputs.interestRate / 100 / 12;
    const numPayments = inputs.loanTerm * 12;
    
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1);
    const totalPaid = monthlyPayment * numPayments;
    const totalInterest = totalPaid - principal;
    
    return {
      primary: { label: 'Monthly Payment', value: monthlyPayment, format: 'currency' },
      secondary: [
        { label: 'Total Interest', value: totalInterest, format: 'currency' },
        { label: 'Total Paid', value: totalPaid, format: 'currency' },
        { label: 'Loan Amount', value: principal, format: 'currency' },
      ],
      explanation: `Your monthly mortgage payment will be $${monthlyPayment.toFixed(2)}. Over ${inputs.loanTerm} years, you'll pay $${totalInterest.toFixed(2)} in interest.`
    };
  }
};

export const refinanceCalculator: Calculator = {
  id: 'refinance',
  name: 'Refinance Calculator',
  description: 'Determine if refinancing your mortgage makes sense',
  category: 'mortgage',
  icon: 'Home',
  inputs: [
    { id: 'currentBalance', label: 'Current Loan Balance', type: 'currency', min: 0, default: 250000 },
    { id: 'currentRate', label: 'Current Interest Rate', type: 'percentage', min: 0, max: 20, step: 0.1, default: 7 },
    { id: 'newRate', label: 'New Interest Rate', type: 'percentage', min: 0, max: 20, step: 0.1, default: 5.5 },
    { id: 'remainingYears', label: 'Remaining Years', type: 'number', min: 1, max: 40, default: 25 },
    { id: 'closingCosts', label: 'Closing Costs', type: 'currency', min: 0, default: 5000 },
  ],
  calculate: (inputs) => {
    const monthlyRateCurrent = inputs.currentRate / 100 / 12;
    const monthlyRateNew = inputs.newRate / 100 / 12;
    const numPayments = inputs.remainingYears * 12;
    
    const currentPayment = inputs.currentBalance * (monthlyRateCurrent * Math.pow(1 + monthlyRateCurrent, numPayments)) / 
                          (Math.pow(1 + monthlyRateCurrent, numPayments) - 1);
    const newPayment = inputs.currentBalance * (monthlyRateNew * Math.pow(1 + monthlyRateNew, numPayments)) / 
                      (Math.pow(1 + monthlyRateNew, numPayments) - 1);
    
    const monthlySavings = currentPayment - newPayment;
    const breakEvenMonths = inputs.closingCosts / monthlySavings;
    const lifetimeSavings = (monthlySavings * numPayments) - inputs.closingCosts;
    
    return {
      primary: { label: 'Monthly Savings', value: monthlySavings, format: 'currency' },
      secondary: [
        { label: 'Break-Even Point (Months)', value: breakEvenMonths, format: 'number' },
        { label: 'Lifetime Savings', value: lifetimeSavings, format: 'currency' },
        { label: 'New Monthly Payment', value: newPayment, format: 'currency' },
      ],
      explanation: lifetimeSavings > 0 
        ? `Refinancing will save you $${monthlySavings.toFixed(2)}/month. You'll break even in ${Math.ceil(breakEvenMonths)} months.`
        : `Refinancing may not be worth it. Consider the break-even period of ${Math.ceil(breakEvenMonths)} months.`
    };
  }
};

export const homeAffordabilityCalculator: Calculator = {
  id: 'home-affordability',
  name: 'Home Affordability Calculator',
  description: 'Calculate how much house you can afford',
  category: 'mortgage',
  icon: 'Home',
  inputs: [
    { id: 'annualIncome', label: 'Annual Income', type: 'currency', min: 0, default: 75000 },
    { id: 'monthlyDebts', label: 'Monthly Debt Payments', type: 'currency', min: 0, default: 500 },
    { id: 'downPayment', label: 'Down Payment', type: 'currency', min: 0, default: 40000 },
    { id: 'interestRate', label: 'Interest Rate', type: 'percentage', min: 0, max: 20, step: 0.1, default: 6.5 },
  ],
  calculate: (inputs) => {
    const monthlyIncome = inputs.annualIncome / 12;
    const maxMonthlyPayment = (monthlyIncome * 0.28) - inputs.monthlyDebts;
    const monthlyRate = inputs.interestRate / 100 / 12;
    const numPayments = 30 * 12;
    
    const maxLoanAmount = maxMonthlyPayment * (Math.pow(1 + monthlyRate, numPayments) - 1) / 
                         (monthlyRate * Math.pow(1 + monthlyRate, numPayments));
    const maxHomePrice = maxLoanAmount + inputs.downPayment;
    
    return {
      primary: { label: 'Maximum Home Price', value: maxHomePrice, format: 'currency' },
      secondary: [
        { label: 'Maximum Loan Amount', value: maxLoanAmount, format: 'currency' },
        { label: 'Estimated Monthly Payment', value: maxMonthlyPayment, format: 'currency' },
        { label: 'Down Payment', value: inputs.downPayment, format: 'currency' },
      ],
      explanation: `Based on your income and debts, you can afford a home up to $${maxHomePrice.toFixed(0)}.`
    };
  }
};

/**
 * AUTO & TRANSPORTATION CALCULATORS
 */

export const autoLoanCalculator: Calculator = {
  id: 'auto-loan',
  name: 'Auto Loan Calculator',
  description: 'Calculate car loan payments and total cost',
  category: 'auto',
  icon: 'Car',
  inputs: [
    { id: 'carPrice', label: 'Car Price', type: 'currency', min: 0, default: 30000 },
    { id: 'downPayment', label: 'Down Payment', type: 'currency', min: 0, default: 5000 },
    { id: 'tradeInValue', label: 'Trade-In Value', type: 'currency', min: 0, default: 0 },
    { id: 'interestRate', label: 'Interest Rate', type: 'percentage', min: 0, max: 30, step: 0.1, default: 5.5 },
    { id: 'loanTerm', label: 'Loan Term (Months)', type: 'number', min: 12, max: 84, default: 60 },
  ],
  calculate: (inputs) => {
    const principal = inputs.carPrice - inputs.downPayment - inputs.tradeInValue;
    const monthlyRate = inputs.interestRate / 100 / 12;
    
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, inputs.loanTerm)) / 
                          (Math.pow(1 + monthlyRate, inputs.loanTerm) - 1);
    const totalPaid = monthlyPayment * inputs.loanTerm;
    const totalInterest = totalPaid - principal;
    
    return {
      primary: { label: 'Monthly Payment', value: monthlyPayment, format: 'currency' },
      secondary: [
        { label: 'Total Interest', value: totalInterest, format: 'currency' },
        { label: 'Total Loan Cost', value: totalPaid, format: 'currency' },
        { label: 'Loan Amount', value: principal, format: 'currency' },
      ],
      explanation: `Your monthly car payment will be $${monthlyPayment.toFixed(2)} for ${inputs.loanTerm} months.`
    };
  }
};

export const leaseVsBuyCalculator: Calculator = {
  id: 'lease-vs-buy',
  name: 'Lease vs Buy Calculator',
  description: 'Compare leasing vs buying a car',
  category: 'auto',
  icon: 'Car',
  inputs: [
    { id: 'carPrice', label: 'Car Price', type: 'currency', min: 0, default: 35000 },
    { id: 'leaseTerm', label: 'Lease Term (Months)', type: 'number', min: 12, max: 60, default: 36 },
    { id: 'monthlyLeasePayment', label: 'Monthly Lease Payment', type: 'currency', min: 0, default: 400 },
    { id: 'downPaymentBuy', label: 'Down Payment (Buy)', type: 'currency', min: 0, default: 7000 },
    { id: 'loanRate', label: 'Loan Interest Rate', type: 'percentage', min: 0, max: 20, step: 0.1, default: 5.5 },
  ],
  calculate: (inputs) => {
    const leaseCost = inputs.monthlyLeasePayment * inputs.leaseTerm;
    
    const loanAmount = inputs.carPrice - inputs.downPaymentBuy;
    const monthlyRate = inputs.loanRate / 100 / 12;
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, inputs.leaseTerm)) / 
                          (Math.pow(1 + monthlyRate, inputs.leaseTerm) - 1);
    const buyCost = (monthlyPayment * inputs.leaseTerm) + inputs.downPaymentBuy;
    
    const difference = buyCost - leaseCost;
    
    return {
      primary: { label: 'Cost Difference', value: Math.abs(difference), format: 'currency' },
      secondary: [
        { label: 'Total Lease Cost', value: leaseCost, format: 'currency' },
        { label: 'Total Buy Cost', value: buyCost, format: 'currency' },
        { label: 'Monthly Buy Payment', value: monthlyPayment, format: 'currency' },
      ],
      explanation: difference > 0 
        ? `Leasing is cheaper by $${Math.abs(difference).toFixed(2)} over ${inputs.leaseTerm} months, but you won't own the car.`
        : `Buying is cheaper by $${Math.abs(difference).toFixed(2)} and you'll own the car.`
    };
  }
};

/**
 * EDUCATION CALCULATORS
 */

export const studentLoanCalculator: Calculator = {
  id: 'student-loan',
  name: 'Student Loan Calculator',
  description: 'Calculate student loan payments and payoff time',
  category: 'education',
  icon: 'GraduationCap',
  inputs: [
    { id: 'loanAmount', label: 'Total Loan Amount', type: 'currency', min: 0, default: 35000 },
    { id: 'interestRate', label: 'Interest Rate', type: 'percentage', min: 0, max: 15, step: 0.1, default: 5.5 },
    { id: 'loanTerm', label: 'Repayment Term (Years)', type: 'number', min: 5, max: 30, default: 10 },
  ],
  calculate: (inputs) => {
    const monthlyRate = inputs.interestRate / 100 / 12;
    const numPayments = inputs.loanTerm * 12;
    
    const monthlyPayment = inputs.loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1);
    const totalPaid = monthlyPayment * numPayments;
    const totalInterest = totalPaid - inputs.loanAmount;
    
    return {
      primary: { label: 'Monthly Payment', value: monthlyPayment, format: 'currency' },
      secondary: [
        { label: 'Total Interest', value: totalInterest, format: 'currency' },
        { label: 'Total Repayment', value: totalPaid, format: 'currency' },
        { label: 'Interest as % of Loan', value: (totalInterest / inputs.loanAmount) * 100, format: 'percentage' },
      ],
      explanation: `You'll pay $${monthlyPayment.toFixed(2)}/month for ${inputs.loanTerm} years, with $${totalInterest.toFixed(2)} in interest.`
    };
  }
};

export const college529Calculator: Calculator = {
  id: 'college-529',
  name: '529 College Savings Calculator',
  description: 'Plan for college education costs',
  category: 'education',
  icon: 'GraduationCap',
  inputs: [
    { id: 'currentAge', label: "Child's Current Age", type: 'number', min: 0, max: 18, default: 5 },
    { id: 'collegeAge', label: 'College Starting Age', type: 'number', min: 17, max: 25, default: 18 },
    { id: 'currentSavings', label: 'Current Savings', type: 'currency', min: 0, default: 10000 },
    { id: 'monthlyContribution', label: 'Monthly Contribution', type: 'currency', min: 0, default: 300 },
    { id: 'returnRate', label: 'Expected Return Rate', type: 'percentage', min: 0, max: 15, step: 0.1, default: 6 },
    { id: 'collegeCost', label: 'Estimated College Cost', type: 'currency', min: 0, default: 100000 },
  ],
  calculate: (inputs) => {
    const yearsToCollege = inputs.collegeAge - inputs.currentAge;
    const months = yearsToCollege * 12;
    const monthlyRate = inputs.returnRate / 100 / 12;
    
    const futureValueCurrent = inputs.currentSavings * Math.pow(1 + monthlyRate, months);
    const futureValueContributions = inputs.monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    const totalSavings = futureValueCurrent + futureValueContributions;
    
    const shortfall = inputs.collegeCost - totalSavings;
    
    return {
      primary: { label: 'Projected Savings', value: totalSavings, format: 'currency' },
      secondary: [
        { label: 'Years Until College', value: yearsToCollege, format: 'number' },
        { label: shortfall > 0 ? 'Shortfall' : 'Surplus', value: Math.abs(shortfall), format: 'currency' },
        { label: 'Total Contributed', value: inputs.currentSavings + (inputs.monthlyContribution * months), format: 'currency' },
      ],
      explanation: shortfall > 0
        ? `You'll have $${totalSavings.toFixed(0)} saved, which is $${shortfall.toFixed(0)} short of your goal.`
        : `Great! You'll exceed your college savings goal by $${Math.abs(shortfall).toFixed(0)}.`
    };
  }
};

// Export all new calculators
export const extendedCalculators: Calculator[] = [
  mortgageCalculator,
  refinanceCalculator,
  homeAffordabilityCalculator,
  autoLoanCalculator,
  leaseVsBuyCalculator,
  studentLoanCalculator,
  college529Calculator,
];

/**
 * BUSINESS CALCULATORS
 */

export const breakEvenCalculator: Calculator = {
  id: 'break-even',
  name: 'Break-Even Analysis',
  description: 'Calculate when your business will break even',
  category: 'business',
  icon: 'Briefcase',
  inputs: [
    { id: 'fixedCosts', label: 'Monthly Fixed Costs', type: 'currency', min: 0, default: 5000 },
    { id: 'pricePerUnit', label: 'Price Per Unit', type: 'currency', min: 0, default: 50 },
    { id: 'variableCostPerUnit', label: 'Variable Cost Per Unit', type: 'currency', min: 0, default: 20 },
  ],
  calculate: (inputs) => {
    const contributionMargin = inputs.pricePerUnit - inputs.variableCostPerUnit;
    const breakEvenUnits = inputs.fixedCosts / contributionMargin;
    const breakEvenRevenue = breakEvenUnits * inputs.pricePerUnit;
    const contributionMarginRatio = (contributionMargin / inputs.pricePerUnit) * 100;
    
    return {
      primary: { label: 'Break-Even Units', value: breakEvenUnits, format: 'number' },
      secondary: [
        { label: 'Break-Even Revenue', value: breakEvenRevenue, format: 'currency' },
        { label: 'Contribution Margin', value: contributionMargin, format: 'currency' },
        { label: 'Contribution Margin %', value: contributionMarginRatio, format: 'percentage' },
      ],
      explanation: `You need to sell ${Math.ceil(breakEvenUnits)} units to break even, generating $${breakEvenRevenue.toFixed(2)} in revenue.`
    };
  }
};

export const businessLoanCalculator: Calculator = {
  id: 'business-loan',
  name: 'Business Loan Calculator',
  description: 'Calculate business loan payments',
  category: 'business',
  icon: 'Briefcase',
  inputs: [
    { id: 'loanAmount', label: 'Loan Amount', type: 'currency', min: 0, default: 50000 },
    { id: 'interestRate', label: 'Interest Rate', type: 'percentage', min: 0, max: 30, step: 0.1, default: 8 },
    { id: 'loanTerm', label: 'Loan Term (Years)', type: 'number', min: 1, max: 25, default: 5 },
  ],
  calculate: (inputs) => {
    const monthlyRate = inputs.interestRate / 100 / 12;
    const numPayments = inputs.loanTerm * 12;
    
    const monthlyPayment = inputs.loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1);
    const totalPaid = monthlyPayment * numPayments;
    const totalInterest = totalPaid - inputs.loanAmount;
    
    return {
      primary: { label: 'Monthly Payment', value: monthlyPayment, format: 'currency' },
      secondary: [
        { label: 'Total Interest', value: totalInterest, format: 'currency' },
        { label: 'Total Repayment', value: totalPaid, format: 'currency' },
        { label: 'Cost of Capital %', value: (totalInterest / inputs.loanAmount) * 100, format: 'percentage' },
      ],
      explanation: `Monthly payment of $${monthlyPayment.toFixed(2)} for ${inputs.loanTerm} years.`
    };
  }
};

export const profitMarginCalculator: Calculator = {
  id: 'profit-margin',
  name: 'Profit Margin Calculator',
  description: 'Calculate gross and net profit margins',
  category: 'business',
  icon: 'Briefcase',
  inputs: [
    { id: 'revenue', label: 'Total Revenue', type: 'currency', min: 0, default: 100000 },
    { id: 'cogs', label: 'Cost of Goods Sold', type: 'currency', min: 0, default: 60000 },
    { id: 'operatingExpenses', label: 'Operating Expenses', type: 'currency', min: 0, default: 25000 },
  ],
  calculate: (inputs) => {
    const grossProfit = inputs.revenue - inputs.cogs;
    const netProfit = grossProfit - inputs.operatingExpenses;
    const grossMargin = (grossProfit / inputs.revenue) * 100;
    const netMargin = (netProfit / inputs.revenue) * 100;
    
    return {
      primary: { label: 'Net Profit', value: netProfit, format: 'currency' },
      secondary: [
        { label: 'Gross Profit', value: grossProfit, format: 'currency' },
        { label: 'Gross Margin', value: grossMargin, format: 'percentage' },
        { label: 'Net Margin', value: netMargin, format: 'percentage' },
      ],
      explanation: `Your net profit margin is ${netMargin.toFixed(2)}% with a net profit of $${netProfit.toFixed(2)}.`
    };
  }
};

/**
 * SAVINGS & INVESTMENT CALCULATORS
 */

export const savingsGoalCalculator: Calculator = {
  id: 'savings-goal',
  name: 'Savings Goal Calculator',
  description: 'Calculate how much to save monthly to reach your goal',
  category: 'savings',
  icon: 'Target',
  inputs: [
    { id: 'goalAmount', label: 'Savings Goal', type: 'currency', min: 0, default: 20000 },
    { id: 'currentSavings', label: 'Current Savings', type: 'currency', min: 0, default: 5000 },
    { id: 'timeframe', label: 'Timeframe (Months)', type: 'number', min: 1, max: 600, default: 24 },
    { id: 'interestRate', label: 'Interest Rate', type: 'percentage', min: 0, max: 15, step: 0.1, default: 4 },
  ],
  calculate: (inputs) => {
    const remaining = inputs.goalAmount - inputs.currentSavings;
    const monthlyRate = inputs.interestRate / 100 / 12;
    
    const futureValueCurrent = inputs.currentSavings * Math.pow(1 + monthlyRate, inputs.timeframe);
    const stillNeeded = inputs.goalAmount - futureValueCurrent;
    
    const monthlyPayment = stillNeeded / (((Math.pow(1 + monthlyRate, inputs.timeframe) - 1) / monthlyRate));
    const totalContributed = monthlyPayment * inputs.timeframe;
    const interestEarned = inputs.goalAmount - inputs.currentSavings - totalContributed;
    
    return {
      primary: { label: 'Monthly Savings Needed', value: monthlyPayment, format: 'currency' },
      secondary: [
        { label: 'Total to Contribute', value: totalContributed, format: 'currency' },
        { label: 'Interest Earned', value: interestEarned, format: 'currency' },
        { label: 'Months to Goal', value: inputs.timeframe, format: 'number' },
      ],
      explanation: `Save $${monthlyPayment.toFixed(2)}/month for ${inputs.timeframe} months to reach your $${inputs.goalAmount.toFixed(0)} goal.`
    };
  }
};

export const cdCalculator: Calculator = {
  id: 'cd-calculator',
  name: 'CD (Certificate of Deposit) Calculator',
  description: 'Calculate CD returns and compare options',
  category: 'savings',
  icon: 'DollarSign',
  inputs: [
    { id: 'principal', label: 'Initial Deposit', type: 'currency', min: 0, default: 10000 },
    { id: 'interestRate', label: 'Annual Interest Rate', type: 'percentage', min: 0, max: 10, step: 0.1, default: 4.5 },
    { id: 'term', label: 'Term (Months)', type: 'number', min: 1, max: 120, default: 12 },
    { id: 'compoundingFrequency', label: 'Compounding (times/year)', type: 'number', min: 1, max: 365, default: 12 },
  ],
  calculate: (inputs) => {
    const rate = inputs.interestRate / 100;
    const years = inputs.term / 12;
    const n = inputs.compoundingFrequency;
    
    const futureValue = inputs.principal * Math.pow(1 + rate / n, n * years);
    const interestEarned = futureValue - inputs.principal;
    const apy = (Math.pow(1 + rate / n, n) - 1) * 100;
    
    return {
      primary: { label: 'Maturity Value', value: futureValue, format: 'currency' },
      secondary: [
        { label: 'Interest Earned', value: interestEarned, format: 'currency' },
        { label: 'APY', value: apy, format: 'percentage' },
        { label: 'Term (Months)', value: inputs.term, format: 'number' },
      ],
      explanation: `Your CD will be worth $${futureValue.toFixed(2)} at maturity, earning $${interestEarned.toFixed(2)} in interest.`
    };
  }
};

export const dividendCalculator: Calculator = {
  id: 'dividend',
  name: 'Dividend Income Calculator',
  description: 'Calculate dividend income from stocks',
  category: 'investing',
  icon: 'TrendingUp',
  inputs: [
    { id: 'investment', label: 'Total Investment', type: 'currency', min: 0, default: 50000 },
    { id: 'dividendYield', label: 'Dividend Yield', type: 'percentage', min: 0, max: 20, step: 0.1, default: 3.5 },
    { id: 'reinvest', label: 'Reinvest Dividends? (1=Yes, 0=No)', type: 'number', min: 0, max: 1, default: 1 },
    { id: 'years', label: 'Investment Period (Years)', type: 'number', min: 1, max: 50, default: 10 },
  ],
  calculate: (inputs) => {
    const annualDividend = inputs.investment * (inputs.dividendYield / 100);
    
    let futureValue = inputs.investment;
    let totalDividends = 0;
    
    if (inputs.reinvest === 1) {
      futureValue = inputs.investment * Math.pow(1 + inputs.dividendYield / 100, inputs.years);
      totalDividends = futureValue - inputs.investment;
    } else {
      totalDividends = annualDividend * inputs.years;
      futureValue = inputs.investment + totalDividends;
    }
    
    return {
      primary: { label: 'Total Dividend Income', value: totalDividends, format: 'currency' },
      secondary: [
        { label: 'Annual Dividend', value: annualDividend, format: 'currency' },
        { label: 'Future Portfolio Value', value: futureValue, format: 'currency' },
        { label: 'Total Return', value: ((futureValue - inputs.investment) / inputs.investment) * 100, format: 'percentage' },
      ],
      explanation: inputs.reinvest === 1
        ? `With dividend reinvestment, you'll earn $${totalDividends.toFixed(2)} over ${inputs.years} years.`
        : `Without reinvestment, you'll receive $${annualDividend.toFixed(2)}/year in dividends.`
    };
  }
};

export const roiCalculator: Calculator = {
  id: 'roi',
  name: 'ROI (Return on Investment) Calculator',
  description: 'Calculate return on investment percentage',
  category: 'investing',
  icon: 'TrendingUp',
  inputs: [
    { id: 'initialInvestment', label: 'Initial Investment', type: 'currency', min: 0, default: 10000 },
    { id: 'finalValue', label: 'Final Value', type: 'currency', min: 0, default: 15000 },
    { id: 'years', label: 'Investment Period (Years)', type: 'number', min: 0.1, max: 50, step: 0.1, default: 3 },
  ],
  calculate: (inputs) => {
    const totalReturn = inputs.finalValue - inputs.initialInvestment;
    const roi = (totalReturn / inputs.initialInvestment) * 100;
    const annualizedReturn = (Math.pow(inputs.finalValue / inputs.initialInvestment, 1 / inputs.years) - 1) * 100;
    
    return {
      primary: { label: 'Total Return', value: totalReturn, format: 'currency' },
      secondary: [
        { label: 'ROI Percentage', value: roi, format: 'percentage' },
        { label: 'Annualized Return', value: annualizedReturn, format: 'percentage' },
        { label: 'Investment Period', value: inputs.years, format: 'number' },
      ],
      explanation: `Your investment returned ${roi.toFixed(2)}% (${annualizedReturn.toFixed(2)}% annualized) over ${inputs.years} years.`
    };
  }
};

// Add more calculators to the export
export const moreCalculators: Calculator[] = [
  ...extendedCalculators,
  breakEvenCalculator,
  businessLoanCalculator,
  profitMarginCalculator,
  savingsGoalCalculator,
  cdCalculator,
  dividendCalculator,
  roiCalculator,
];
