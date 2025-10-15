import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  DollarSign,
  PiggyBank,
  CreditCard,
  Home,
  Activity,
  ArrowUp,
  Calculator,
  Receipt,
  Target,
  Brain,
  Percent
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../contexts/AuthContext';

const Card: React.FC<{
  title: string;
  icon: React.ReactNode;
  description?: string;
  children: React.ReactNode;
}> = ({ title, icon, description, children }) => (
  <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
    <div className="flex items-center space-x-3 mb-4">
      <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center text-orange-400">
        {icon}
      </div>
      <h2 className="text-xl font-bold text-white">{title}</h2>
    </div>
    {description && <p className="text-sm text-gray-400 mb-5 leading-relaxed">{description}</p>}
    {children}
  </div>
);

function formatCurrency(n: number) {
  if (!isFinite(n)) return '-';
  return n.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

const parseNumericInput = (value: string): number => {
  if (value.trim() === '') return NaN;
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : NaN;
};

const TAX_BRACKETS: Record<string, { limit: number; rate: number }[]> = {
  single: [
    { limit: 11000, rate: 0.1 },
    { limit: 44725, rate: 0.12 },
    { limit: 95375, rate: 0.22 },
    { limit: 182100, rate: 0.24 },
    { limit: 231250, rate: 0.32 },
    { limit: 578125, rate: 0.35 },
    { limit: Infinity, rate: 0.37 }
  ],
  married_joint: [
    { limit: 22000, rate: 0.1 },
    { limit: 89450, rate: 0.12 },
    { limit: 190750, rate: 0.22 },
    { limit: 364200, rate: 0.24 },
    { limit: 462500, rate: 0.32 },
    { limit: 693750, rate: 0.35 },
    { limit: Infinity, rate: 0.37 }
  ],
  head_household: [
    { limit: 15700, rate: 0.1 },
    { limit: 59850, rate: 0.12 },
    { limit: 95350, rate: 0.22 },
    { limit: 182100, rate: 0.24 },
    { limit: 231250, rate: 0.32 },
    { limit: 578100, rate: 0.35 },
    { limit: Infinity, rate: 0.37 }
  ]
};

const computeProgressiveTax = (table: { limit: number; rate: number }[], taxableIncome: number): number => {
  if (!Number.isFinite(taxableIncome) || taxableIncome <= 0) {
    return 0;
  }
  let tax = 0;
  let previousLimit = 0;
  for (const bracket of table) {
    const cappedIncome = Math.min(bracket.limit, taxableIncome);
    if (cappedIncome > previousLimit) {
      tax += (cappedIncome - previousLimit) * bracket.rate;
    }
    if (taxableIncome <= bracket.limit) {
      break;
    }
    previousLimit = bracket.limit;
  }
  return tax;
};

const ToolsPage: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(() => (typeof window !== 'undefined' ? window.innerWidth >= 768 : true));
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    document.title = 'MeridianAlgo - Tools & Calculators';
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/financial-tools' } } });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Budget Planner
  const [income, setIncome] = useState<string>('4000');
  const [needs, setNeeds] = useState<string>('50');
  const [wants, setWants] = useState<string>('30');
  const [savings, setSavings] = useState<string>('20');

  const incomeValue = useMemo(() => parseNumericInput(income) || 0, [income]);
  const needsPercent = useMemo(() => parseNumericInput(needs) || 0, [needs]);
  const wantsPercent = useMemo(() => parseNumericInput(wants) || 0, [wants]);
  const savingsPercent = useMemo(() => parseNumericInput(savings) || 0, [savings]);

  const budgetChecks = needsPercent + wantsPercent + savingsPercent;
  const isBudgetBalanced = Number.isFinite(budgetChecks) && Math.round(budgetChecks) === 100;
  const needsAmt = useMemo(() => (incomeValue * needsPercent) / 100, [incomeValue, needsPercent]);
  const wantsAmt = useMemo(() => (incomeValue * wantsPercent) / 100, [incomeValue, wantsPercent]);
  const savingsAmt = useMemo(() => (incomeValue * savingsPercent) / 100, [incomeValue, savingsPercent]);

  // Emergency Fund
  const [monthlyExpenses, setMonthlyExpenses] = useState<string>('3200');
  const [coverageMonths, setCoverageMonths] = useState<string>('6');
  const [emergencySavings, setEmergencySavings] = useState<string>('5000');
  const emergencyPlan = useMemo(() => {
    const expenses = parseNumericInput(monthlyExpenses) || 0;
    const months = Math.max(parseNumericInput(coverageMonths) || 0, 0);
    const currentSavings = Math.max(parseNumericInput(emergencySavings) || 0, 0);
    const target = Math.max(0, expenses * months);
    const gap = Math.max(0, target - currentSavings);
    const coverage = expenses > 0 ? currentSavings / expenses : 0;
    return {
      target,
      gap,
      monthsCovered: expenses > 0 ? currentSavings / expenses : 0,
      coveragePercent: Math.min(1, coverage)
    };
  }, [monthlyExpenses, coverageMonths, emergencySavings]);

  // Savings Goal
  const [goal, setGoal] = useState<string>('10000');
  const [initial, setInitial] = useState<string>('1000');
  const [monthly, setMonthly] = useState<string>('300');
  const [apy, setApy] = useState<string>('3.5');
  const monthsToGoal = useMemo(() => {
    const goalValueRaw = parseNumericInput(goal);
    const initialValueRaw = parseNumericInput(initial);
    const monthlyValueRaw = parseNumericInput(monthly);
    const apyValueRaw = parseNumericInput(apy);

    if (!Number.isFinite(goalValueRaw) || !Number.isFinite(initialValueRaw)) {
      return Infinity;
    }

    const goalValue = goalValueRaw as number;
    const initialValue = initialValueRaw as number;
    const monthlyValue = Number.isFinite(monthlyValueRaw) ? (monthlyValueRaw as number) : 0;
    const apyValue = Number.isFinite(apyValueRaw) ? (apyValueRaw as number) : 0;

    if (goalValue <= initialValue) {
      return 0;
    }

    const monthlyRate = apyValue / 100 / 12;

    if (monthlyValue <= 0 && monthlyRate <= 0) {
      return Infinity;
    }

    let bal = initialValue;
    let m = 0;
    while (bal < goalValue && m < 1200) {
      if (monthlyRate > 0) {
        bal = bal * (1 + monthlyRate) + monthlyValue;
      } else {
        bal += monthlyValue;
      }
      m++;
    }
    return bal >= goalValue ? m : Infinity;
  }, [goal, initial, monthly, apy]);

  // Investment Growth
  const [investInitial, setInvestInitial] = useState<string>('5000');
  const [investMonthly, setInvestMonthly] = useState<string>('400');
  const [investYears, setInvestYears] = useState<string>('10');
  const [investReturn, setInvestReturn] = useState<string>('7');
  const investmentProjection = useMemo(() => {
    const initialValue = Math.max(parseNumericInput(investInitial) || 0, 0);
    const monthlyContribution = Math.max(parseNumericInput(investMonthly) || 0, 0);
    const years = Math.max(parseNumericInput(investYears) || 0, 0);
    const annualReturn = Math.max(parseNumericInput(investReturn) || 0, 0);
    const months = Math.round(years * 12);
    const r = annualReturn / 100 / 12;
    let future = initialValue;
    if (r > 0) {
      future *= Math.pow(1 + r, months);
      future += monthlyContribution * ((Math.pow(1 + r, months) - 1) / r);
    } else {
      future += monthlyContribution * months;
    }
    const totalContributions = initialValue + monthlyContribution * months;
    return {
      futureValue: future,
      totalContributions
    };
  }, [investInitial, investMonthly, investYears, investReturn]);

  // Net Worth Trajectory
  const [netWorthStarting, setNetWorthStarting] = useState<string>('45000');
  const [netWorthContribution, setNetWorthContribution] = useState<string>('800');
  const [netWorthRaise, setNetWorthRaise] = useState<string>('3');
  const [netWorthReturn, setNetWorthReturn] = useState<string>('6');
  const [netWorthYears, setNetWorthYears] = useState<string>('15');
  const netWorthPlan = useMemo(() => {
    const starting = Math.max(parseNumericInput(netWorthStarting) || 0, 0);
    let monthlyContribution = Math.max(parseNumericInput(netWorthContribution) || 0, 0);
    const annualRaise = Math.max(parseNumericInput(netWorthRaise) || 0, 0) / 100;
    const annualReturnRate = Math.max(parseNumericInput(netWorthReturn) || 0, 0) / 100;
    const years = Math.max(parseNumericInput(netWorthYears) || 0, 0);
    const months = Math.round(years * 12);
    const monthlyRate = annualReturnRate / 12;

    let balance = starting;
    let totalContributionAdded = 0;

    for (let m = 0; m < months; m++) {
      if (monthlyRate > 0) {
        balance *= 1 + monthlyRate;
      }
      balance += monthlyContribution;
      totalContributionAdded += monthlyContribution;
      if ((m + 1) % 12 === 0) {
        monthlyContribution *= 1 + annualRaise;
      }
    }

    const totalDeposits = starting + totalContributionAdded;
    const growth = balance - totalDeposits;

    return {
      futureValue: balance,
      totalDeposits,
      contributions: totalContributionAdded,
      growth,
      years
    };
  }, [netWorthStarting, netWorthContribution, netWorthRaise, netWorthReturn, netWorthYears]);

  // Debt Payoff (Snowball)
  const [balance, setBalance] = useState<string>('5000');
  const [apr, setApr] = useState<string>('19.99');
  const [minPay, setMinPay] = useState<string>('150');
  const [extraPay, setExtraPay] = useState<string>('100');
  const payoff = useMemo(() => {
    const balanceValue = parseNumericInput(balance) || 0;
    const aprValue = parseNumericInput(apr) || 0;
    const minPayValue = Math.max(parseNumericInput(minPay) || 0, 0);
    const extraPayValue = Math.max(parseNumericInput(extraPay) || 0, 0);

    if (balanceValue <= 0) {
      return { months: 0, totalInterest: 0, schedule: [] as { month: number; interest: number; principal: number; balance: number }[] };
    }

    const schedule: { month: number; interest: number; principal: number; balance: number }[] = [];
    const monthlyRate = aprValue / 100 / 12;
    const payment = Math.max(minPayValue + extraPayValue, monthlyRate > 0 ? balanceValue * monthlyRate + 1 : 1);

    if (payment <= 0 || (monthlyRate > 0 && payment <= balanceValue * monthlyRate)) {
      return { months: Infinity, totalInterest: Infinity, schedule: [] };
    }

    let bal = balanceValue;
    let month = 0;
    let totalInterest = 0;

    while (bal > 0 && month < 1200) {
      const interest = monthlyRate > 0 ? bal * monthlyRate : 0;
      const principal = Math.min(payment - interest, bal);

      if (principal <= 0) {
        return { months: Infinity, totalInterest: Infinity, schedule: [] };
      }

      bal = Math.max(0, bal + interest - principal);
      totalInterest += interest;
      month++;
      if (month <= 12) {
        schedule.push({ month, interest, principal, balance: bal });
      }
    }

    return { months: bal <= 0 ? month : Infinity, totalInterest, schedule };
  }, [balance, apr, minPay, extraPay]);

  // Credit Utilization
  const [creditBalances, setCreditBalances] = useState<string>('3500');
  const [creditLimits, setCreditLimits] = useState<string>('12000');
  const creditUtilization = useMemo(() => {
    const balances = Math.max(parseNumericInput(creditBalances) || 0, 0);
    const limits = Math.max(parseNumericInput(creditLimits) || 0, 0);
    const ratio = limits > 0 ? (balances / limits) * 100 : 0;
    const status = ratio < 30 ? 'Excellent' : ratio < 50 ? 'Fair' : 'High';
    return { ratio, status, balances, limits };
  }, [creditBalances, creditLimits]);

  // Mortgage Affordability
  const [annualIncome, setAnnualIncome] = useState<string>('85000');
  const [monthlyDebt, setMonthlyDebt] = useState<string>('500');
  const [mortgageRate, setMortgageRate] = useState<string>('6.25');
  const [mortgageTerm, setMortgageTerm] = useState<string>('30');
  const [downPayment, setDownPayment] = useState<string>('40000');
  const mortgageProjection = useMemo(() => {
    const income = Math.max(parseNumericInput(annualIncome) || 0, 0);
    const debt = Math.max(parseNumericInput(monthlyDebt) || 0, 0);
    const rate = Math.max(parseNumericInput(mortgageRate) || 0, 0);
    const termYears = Math.max(parseNumericInput(mortgageTerm) || 0, 0);
    const down = Math.max(parseNumericInput(downPayment) || 0, 0);

    const monthlyIncome = income / 12;
    const front = monthlyIncome * 0.28;
    const back = monthlyIncome * 0.36 - debt;
    const allowedPayment = Math.max(0, Math.min(front, back));

    const totalMonths = Math.round(termYears * 12);
    if (totalMonths <= 0) {
      return { allowedPayment, principal: 0, homePrice: down };
    }

    const monthlyRate = rate / 100 / 12;
    let principal = 0;
    if (monthlyRate > 0) {
      principal = allowedPayment * (1 - Math.pow(1 + monthlyRate, -totalMonths)) / monthlyRate;
    } else {
      principal = allowedPayment * totalMonths;
    }

    const homePrice = principal + down;
    return { allowedPayment, principal, homePrice };
  }, [annualIncome, monthlyDebt, mortgageRate, mortgageTerm, downPayment]);

  // Insurance Gap
  const [insuranceIncome, setInsuranceIncome] = useState<string>('75000');
  const [insuranceYears, setInsuranceYears] = useState<string>('10');
  const [insuranceDebts, setInsuranceDebts] = useState<string>('120000');
  const [insuranceSavings, setInsuranceSavings] = useState<string>('25000');
  const [insuranceCoverage, setInsuranceCoverage] = useState<string>('200000');
  const insurancePlan = useMemo(() => {
    const income = Math.max(parseNumericInput(insuranceIncome) || 0, 0);
    const years = Math.max(parseNumericInput(insuranceYears) || 0, 0);
    const debts = Math.max(parseNumericInput(insuranceDebts) || 0, 0);
    const savingsAvailable = Math.max(parseNumericInput(insuranceSavings) || 0, 0);
    const currentCoverage = Math.max(parseNumericInput(insuranceCoverage) || 0, 0);

    const needed = Math.max(0, income * years + debts - savingsAvailable);
    const gap = Math.max(0, needed - currentCoverage);
    return { needed, gap, currentCoverage };
  }, [insuranceIncome, insuranceYears, insuranceDebts, insuranceSavings, insuranceCoverage]);

  // Retirement Readiness
  const [retirementIncome, setRetirementIncome] = useState<string>('60000');
  const [retirementYears, setRetirementYears] = useState<string>('20');
  const [retirementSavings, setRetirementSavings] = useState<string>('95000');
  const [retirementContribution, setRetirementContribution] = useState<string>('800');
  const [retirementReturn, setRetirementReturn] = useState<string>('6');
  const [longevityYears, setLongevityYears] = useState<string>('30');
  const [longevityExpenses, setLongevityExpenses] = useState<string>('4500');
  const [longevityGuaranteed, setLongevityGuaranteed] = useState<string>('3200');
  const [longevityNestEgg, setLongevityNestEgg] = useState<string>('650000');
  const [longevityWithdrawal, setLongevityWithdrawal] = useState<string>('4');
  const longevityPlan = useMemo(() => {
    const years = Math.max(parseNumericInput(longevityYears) || 0, 0);
    const expenses = Math.max(parseNumericInput(longevityExpenses) || 0, 0);
    const guaranteed = Math.max(parseNumericInput(longevityGuaranteed) || 0, 0);
    const nestEgg = Math.max(parseNumericInput(longevityNestEgg) || 0, 0);
    const withdrawalRate = Math.max(parseNumericInput(longevityWithdrawal) || 0, 0) / 100;

    const monthlyShortfall = Math.max(0, expenses - guaranteed);
    const annualShortfall = monthlyShortfall * 12;
    const withdrawalCapacity = withdrawalRate > 0 ? nestEgg * withdrawalRate : nestEgg;
    const coverageGap = Math.max(0, annualShortfall - withdrawalCapacity);
    const longevityCoverageYears = withdrawalRate > 0 && annualShortfall > 0 ? nestEgg / annualShortfall : Infinity;
    const totalFundingNeed = annualShortfall * years;
    const totalSupport = withdrawalCapacity * years;
    const totalGap = Math.max(0, totalFundingNeed - totalSupport);
    return {
      monthlyShortfall,
      annualShortfall,
      withdrawalCapacity,
      coverageGap,
      longevityCoverageYears,
      targetHorizonYears: years,
      totalFundingNeed,
      totalGap
    };
  }, [longevityYears, longevityExpenses, longevityGuaranteed, longevityNestEgg, longevityWithdrawal]);
  const retirementPlan = useMemo(() => {
    const desiredIncome = Math.max(parseNumericInput(retirementIncome) || 0, 0);
    const years = Math.max(parseNumericInput(retirementYears) || 0, 0);
    const currentSavings = Math.max(parseNumericInput(retirementSavings) || 0, 0);
    const monthlyContribution = Math.max(parseNumericInput(retirementContribution) || 0, 0);
    const annualReturn = Math.max(parseNumericInput(retirementReturn) || 0, 0);

    const months = Math.round(years * 12);
    const r = annualReturn / 100 / 12;
    let future = currentSavings;
    if (r > 0) {
      future *= Math.pow(1 + r, months);
      future += monthlyContribution * ((Math.pow(1 + r, months) - 1) / r);
    } else {
      future += monthlyContribution * months;
    }
    const goal = desiredIncome / 0.04;
    const gap = Math.max(0, goal - future);
    return { future, goal, gap };
  }, [retirementIncome, retirementYears, retirementSavings, retirementContribution, retirementReturn]);

  // College Savings
  const [collegeCost, setCollegeCost] = useState<string>('120000');
  const [collegeYears, setCollegeYears] = useState<string>('12');
  const [collegeSavings, setCollegeSavings] = useState<string>('15000');
  const [collegeMonthly, setCollegeMonthly] = useState<string>('350');
  const [collegeReturn, setCollegeReturn] = useState<string>('5');
  const [collegeInflation, setCollegeInflation] = useState<string>('4');
  const collegePlan = useMemo(() => {
    const cost = Math.max(parseNumericInput(collegeCost) || 0, 0);
    const years = Math.max(parseNumericInput(collegeYears) || 0, 0);
    const current = Math.max(parseNumericInput(collegeSavings) || 0, 0);
    const monthlyContribution = Math.max(parseNumericInput(collegeMonthly) || 0, 0);
    const annualReturn = Math.max(parseNumericInput(collegeReturn) || 0, 0);
    const inflation = Math.max(parseNumericInput(collegeInflation) || 0, 0);

    const futureCost = cost * Math.pow(1 + inflation / 100, years);
    const months = Math.round(years * 12);
    const r = annualReturn / 100 / 12;
    let future = current;
    if (r > 0) {
      future *= Math.pow(1 + r, months);
      future += monthlyContribution * ((Math.pow(1 + r, months) - 1) / r);
    } else {
      future += monthlyContribution * months;
    }
    const gap = Math.max(0, futureCost - future);
    return { futureCost, future, gap };
  }, [collegeCost, collegeYears, collegeSavings, collegeMonthly, collegeReturn, collegeInflation]);
  // College Savings (continued from above)

  // Tax Calculator
  const [annualIncomeTax, setAnnualIncomeTax] = useState<string>('85000');
  const [taxFilingStatus, setTaxFilingStatus] = useState<string>('single');
  const [taxDeductions, setTaxDeductions] = useState<string>('12950');
  const taxCalculation = useMemo(() => {
    const income = Math.max(parseNumericInput(annualIncomeTax) || 0, 0);
    const deductions = Math.max(parseNumericInput(taxDeductions) || 0, 0);
    const taxableIncome = Math.max(0, income - deductions);
    const table = TAX_BRACKETS[taxFilingStatus as keyof typeof TAX_BRACKETS] ?? TAX_BRACKETS.single;
    const tax = computeProgressiveTax(table, taxableIncome);

    let lowerBound = 0;
    let currentBracketRate = table[table.length - 1]?.rate ?? 0;
    let currentBracketUpper = Infinity;
    for (const bracket of table) {
      if (taxableIncome <= bracket.limit) {
        currentBracketRate = bracket.rate;
        currentBracketUpper = bracket.limit;
        break;
      }
      lowerBound = bracket.limit;
    }

    const incomeToNextBracket = Number.isFinite(currentBracketUpper)
      ? Math.max(0, currentBracketUpper - taxableIncome)
      : Infinity;
    const effectiveRate = taxableIncome > 0 ? (tax / taxableIncome) * 100 : 0;
    const afterTaxIncome = income - tax;

    return {
      tax,
      effectiveRate,
      taxableIncome,
      afterTaxIncome,
      bracketTable: table,
      currentBracketRate: currentBracketRate * 100,
      currentBracketUpper,
      currentBracketLower: lowerBound,
      incomeToNextBracket
    };
  }, [annualIncomeTax, taxFilingStatus, taxDeductions]);

  // Loan Calculator
  const [loanAmount, setLoanAmount] = useState<string>('25000');
  const [loanRate, setLoanRate] = useState<string>('8.5');
  const [loanTerm, setLoanTerm] = useState<string>('60');
  const loanCalculation = useMemo(() => {
    const principal = Math.max(parseNumericInput(loanAmount) || 0, 0);
    const annualRate = Math.max(parseNumericInput(loanRate) || 0, 0);
    const months = Math.max(parseNumericInput(loanTerm) || 0, 0);
    
    if (principal <= 0 || annualRate <= 0 || months <= 0) {
      return { monthlyPayment: 0, totalInterest: 0, totalPayment: 0 };
    }
    
    const monthlyRate = annualRate / 100 / 12;
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - principal;
    
    return { monthlyPayment, totalInterest, totalPayment };
  }, [loanAmount, loanRate, loanTerm]);

  const [triggerStress, setTriggerStress] = useState<string>('3');
  const [triggerSocial, setTriggerSocial] = useState<string>('2');
  const [triggerMarketing, setTriggerMarketing] = useState<string>('3');
  const [triggerImpulse, setTriggerImpulse] = useState<string>('4');
  const [triggerSavingsGoal, setTriggerSavingsGoal] = useState<string>('5000');
  const [triggerRedirectPercent, setTriggerRedirectPercent] = useState<string>('50');
  const triggerPlan = useMemo(() => {
    const stress = Math.min(Math.max(parseNumericInput(triggerStress) || 0, 0), 5);
    const social = Math.min(Math.max(parseNumericInput(triggerSocial) || 0, 0), 5);
    const marketing = Math.min(Math.max(parseNumericInput(triggerMarketing) || 0, 0), 5);
    const impulse = Math.min(Math.max(parseNumericInput(triggerImpulse) || 0, 0), 5);
    const goal = Math.max(parseNumericInput(triggerSavingsGoal) || 0, 0);
    const redirect = Math.max(parseNumericInput(triggerRedirectPercent) || 0, 0) / 100;

    const totalScore = stress + social + marketing + impulse;
    const riskLevel = totalScore >= 16 ? 'High Trigger Risk' : totalScore >= 9 ? 'Moderate Trigger Risk' : 'Low Trigger Risk';
    const estimatedImpulseSpend = impulse > 0 ? impulse * 50 : totalScore * 20;
    const redirectAmount = estimatedImpulseSpend * redirect;
    const monthsToGoal = redirectAmount > 0 ? Math.ceil(goal / redirectAmount) : Infinity;

    return {
      totalScore,
      riskLevel,
      estimatedImpulseSpend,
      redirectAmount,
      monthsToGoal
    };
  }, [triggerStress, triggerSocial, triggerMarketing, triggerImpulse, triggerSavingsGoal, triggerRedirectPercent]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const firstName = user.name.split(' ')[0] || user.name;

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activePage="financialTools"
        user={user}
        onLogout={async () => {
          await logout();
          navigate('/');
        }}
      />

      <div className={`flex-1 overflow-y-auto transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${sidebarOpen ? 'ml-72' : 'ml-20'}`}>
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700 px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link to="/learning" className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-300 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Financial Tools & Calculators</h1>
              <p className="text-gray-300">Welcome back, {firstName}. Interactive calculators to plan, learn, and experiment.</p>
            </div>
          </div>
        </div>

        {/* Calculator Directory */}
        <div className="bg-gray-800 border-b border-gray-700 px-8 py-4 sticky top-0 z-10">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-gray-400 font-medium">Jump to:</span>
            <button
              onClick={() => document.getElementById('budget-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full hover:bg-orange-500/30 transition-colors"
            >
              Budget & Cash Flow
            </button>
            <button
              onClick={() => document.getElementById('saving-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full hover:bg-green-500/30 transition-colors"
            >
              Saving & Investing
            </button>
            <button
              onClick={() => document.getElementById('behavior-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-3 py-1 bg-pink-500/20 text-pink-400 rounded-full hover:bg-pink-500/30 transition-colors"
            >
              Behavior & Habits
            </button>
            <button
              onClick={() => document.getElementById('debt-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full hover:bg-purple-500/30 transition-colors"
            >
              Debt & Credit Health
            </button>
            <button
              onClick={() => document.getElementById('home-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500/30 transition-colors"
            >
              Home & Protection
            </button>
            <button
              onClick={() => document.getElementById('retirement-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full hover:bg-indigo-500/30 transition-colors"
            >
              Future Planning
            </button>
            <button
              onClick={() => document.getElementById('advanced-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full hover:bg-cyan-500/30 transition-colors"
            >
              Advanced Tools
            </button>
          </div>
        </div>

        <div className="px-8 py-6 space-y-12">
          <section id="budget-section">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white">Budget & Cash Flow</h2>
                <p className="text-sm text-gray-400">Dial in your spending plan and emergency safety net.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Card
                title="50/30/20 Budget Planner"
                icon={<DollarSign className="w-5 h-5" />}
                description="Check if your monthly plan hits the balanced 50/30/20 split and see dollar targets for each bucket."
              >
                <div className="space-y-3">
                  <label className="block text-sm text-gray-300">Monthly Take-Home Income</label>
                  <input
                    type="number"
                    value={income}
                    onChange={e => setIncome(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  />
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400">Needs %</label>
                      <input
                        type="number"
                        value={needs}
                        onChange={e => setNeeds(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400">Wants %</label>
                      <input
                        type="number"
                        value={wants}
                        onChange={e => setWants(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400">Savings %</label>
                      <input
                        type="number"
                        value={savings}
                        onChange={e => setSavings(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                  <p className={`text-xs ${isBudgetBalanced ? 'text-green-400' : 'text-red-400'}`}>
                    Percentages must add up to 100%. Current: {Number.isFinite(budgetChecks) ? Math.round(budgetChecks) : 0}%
                  </p>
                  <div className="grid grid-cols-3 gap-3 mt-2">
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Needs</p>
                      <p className="text-white font-semibold">{formatCurrency(needsAmt)}</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Wants</p>
                      <p className="text-white font-semibold">{formatCurrency(wantsAmt)}</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Savings</p>
                      <p className="text-white font-semibold">{formatCurrency(savingsAmt)}</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card
                title="Emergency Fund Cushion"
                icon={<Activity className="w-5 h-5" />}
                description="Estimate how many months your current savings covers and what it takes to reach your comfort zone."
              >
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400">Monthly Essential Expenses</label>
                      <input
                        type="number"
                        value={monthlyExpenses}
                        onChange={e => setMonthlyExpenses(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400">Target Coverage (months)</label>
                      <input
                        type="number"
                        value={coverageMonths}
                        onChange={e => setCoverageMonths(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400">Current Emergency Savings</label>
                      <input
                        type="number"
                        value={emergencySavings}
                        onChange={e => setEmergencySavings(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Target Fund Size</p>
                      <p className="text-white font-semibold">{formatCurrency(emergencyPlan.target)}</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Coverage Gap</p>
                      <p className="text-white font-semibold">{formatCurrency(emergencyPlan.gap)}</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Months Covered Now</p>
                      <p className="text-white font-semibold">
                        {Number.isFinite(emergencyPlan.monthsCovered) ? emergencyPlan.monthsCovered.toFixed(1) : '0'} months
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
              <Card
                title="Longevity Income Planner"
                icon={<Target className="w-5 h-5" />}
                description="Blend guaranteed income, portfolio withdrawals, and horizon planning to sustain retirement cash flow."
              >
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400">Longevity Horizon (years)</label>
                      <input
                        type="number"
                        value={longevityYears}
                        onChange={e => setLongevityYears(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400">Monthly Essential Spend</label>
                      <input
                        type="number"
                        value={longevityExpenses}
                        onChange={e => setLongevityExpenses(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400">Guaranteed Income (monthly)</label>
                      <input
                        type="number"
                        value={longevityGuaranteed}
                        onChange={e => setLongevityGuaranteed(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400">Investable Nest Egg</label>
                      <input
                        type="number"
                        value={longevityNestEgg}
                        onChange={e => setLongevityNestEgg(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400">Withdrawal Rate %</label>
                      <input
                        type="number"
                        value={longevityWithdrawal}
                        onChange={e => setLongevityWithdrawal(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Target Horizon</p>
                      <p className="text-white font-semibold">{longevityPlan.targetHorizonYears} years</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Monthly Shortfall</p>
                      <p className="text-white font-semibold">{formatCurrency(Math.round(longevityPlan.monthlyShortfall))}</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Annual Shortfall</p>
                      <p className="text-white font-semibold">{formatCurrency(Math.round(longevityPlan.annualShortfall))}</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Sustainable Withdrawal</p>
                      <p className="text-white font-semibold">{formatCurrency(Math.round(longevityPlan.withdrawalCapacity))}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Annual Gap After Withdrawals</p>
                      <p className="text-white font-semibold">{formatCurrency(Math.round(longevityPlan.coverageGap))}</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Nest Egg Longevity</p>
                      <p className="text-white font-semibold">
                        {Number.isFinite(longevityPlan.longevityCoverageYears)
                          ? `${longevityPlan.longevityCoverageYears.toFixed(1)} years`
                          : 'Needs more funding'}
                      </p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Total Gap Over Horizon</p>
                      <p className="text-white font-semibold">{formatCurrency(Math.round(longevityPlan.totalGap))}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">* Consider annuities, delaying Social Security, or trimming expenses to close the longevity gap.</p>
                </div>
              </Card>
              <Card
                title="Net Worth Trajectory"
                icon={<Activity className="w-5 h-5" />}
                description="Project how your net worth grows with compounding returns and annual contribution raises."
              >
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400">Current Net Worth</label>
                      <input
                        type="number"
                        value={netWorthStarting}
                        onChange={e => setNetWorthStarting(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400">Monthly Contribution</label>
                      <input
                        type="number"
                        value={netWorthContribution}
                        onChange={e => setNetWorthContribution(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400">Years</label>
                      <input
                        type="number"
                        value={netWorthYears}
                        onChange={e => setNetWorthYears(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400">Annual Raise on Contributions %</label>
                      <input
                        type="number"
                        value={netWorthRaise}
                        onChange={e => setNetWorthRaise(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400">Expected Return %</label>
                      <input
                        type="number"
                        value={netWorthReturn}
                        onChange={e => setNetWorthReturn(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Projected Net Worth</p>
                      <p className="text-white font-semibold">{formatCurrency(Math.round(netWorthPlan.futureValue))}</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Total Contributions (incl. starting)</p>
                      <p className="text-white font-semibold">{formatCurrency(Math.round(netWorthPlan.totalDeposits))}</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Investment Growth</p>
                      <p className="text-white font-semibold">{formatCurrency(Math.round(netWorthPlan.growth))}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">* Contributions adjust annually by your chosen raise percentage to mirror income growth.</p>
                </div>
              </Card>
            </div>
          </section>

          <section id="saving-section">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white">Saving & Investing</h2>
                <p className="text-sm text-gray-400">Project balances for college, retirement, and brokerage goals.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Card
                title="Savings Goal Timeline"
                icon={<PiggyBank className="w-5 h-5" />}
                description="See how long it will take to hit a savings milestone with recurring contributions and interest."
              >
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400">Goal Amount</label>
                      <input
                        type="number"
                        value={goal}
                        onChange={e => setGoal(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400">Initial Savings</label>
                      <input
                        type="number"
                        value={initial}
                        onChange={e => setInitial(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400">Monthly Contribution</label>
                      <input
                        type="number"
                        value={monthly}
                        onChange={e => setMonthly(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400">APY %</label>
                      <input
                        type="number"
                        value={apy}
                        onChange={e => setApy(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                    <p className="text-xs text-gray-400">Estimated Time to Goal</p>
                    <p className="text-white font-semibold">
                      {monthsToGoal === Infinity ? 'Not reachable with current inputs' : `${monthsToGoal} months (~${Math.round(monthsToGoal / 12)} years)`}
                    </p>
                  </div>
                </div>
              </Card>

              <Card
                title="Investment Growth Forecast"
                icon={<Activity className="w-5 h-5" />}
                description="Compound your contributions at an assumed annual return to estimate future portfolio size."
              >
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400">Starting Balance</label>
                      <input
                        type="number"
                        value={investInitial}
                        onChange={e => setInvestInitial(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400">Monthly Contribution</label>
                      <input
                        type="number"
                        value={investMonthly}
                        onChange={e => setInvestMonthly(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400">Years Investing</label>
                      <input
                        type="number"
                        value={investYears}
                        onChange={e => setInvestYears(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400">Expected Return %</label>
                      <input
                        type="number"
                        value={investReturn}
                        onChange={e => setInvestReturn(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Projected Future Value</p>
                      <p className="text-white font-semibold">{formatCurrency(Math.round(investmentProjection.futureValue))}</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Total Contributions</p>
                      <p className="text-white font-semibold">{formatCurrency(Math.round(investmentProjection.totalContributions))}</p>
                    </div>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                    <p className="text-xs text-gray-400">Growth Over Contributions</p>
                    <p className="text-white font-semibold">
                      {formatCurrency(Math.round(investmentProjection.futureValue - investmentProjection.totalContributions))}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          <section id="behavior-section">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white">Behavior & Habits</h2>
                <p className="text-sm text-gray-400">Decode spending triggers and redirect momentum toward your savings goals.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Card
                title="Spending Trigger Analyzer"
                icon={<Brain className="w-5 h-5" />}
                description="Score your emotional and environmental spending cues, then map a savings redirect plan."
              >
                <div className="space-y-3">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400">Stress Level (0-5)</label>
                      <input
                        type="number"
                        min={0}
                        max={5}
                        value={triggerStress}
                        onChange={e => setTriggerStress(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400">Social Pressure (0-5)</label>
                      <input
                        type="number"
                        min={0}
                        max={5}
                        value={triggerSocial}
                        onChange={e => setTriggerSocial(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400">Marketing Exposure (0-5)</label>
                      <input
                        type="number"
                        min={0}
                        max={5}
                        value={triggerMarketing}
                        onChange={e => setTriggerMarketing(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400">Impulse Strength (0-5)</label>
                      <input
                        type="number"
                        min={0}
                        max={5}
                        value={triggerImpulse}
                        onChange={e => setTriggerImpulse(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400">Savings Goal ($)</label>
                      <input
                        type="number"
                        value={triggerSavingsGoal}
                        onChange={e => setTriggerSavingsGoal(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400">Redirect % of Impulse</label>
                      <input
                        type="number"
                        value={triggerRedirectPercent}
                        onChange={e => setTriggerRedirectPercent(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Trigger Score</p>
                      <p className="text-white font-semibold">{triggerPlan.totalScore}/20</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Risk Level</p>
                      <p className="text-white font-semibold">{triggerPlan.riskLevel}</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Redirect Each Month</p>
                      <p className="text-white font-semibold">{formatCurrency(Math.round(triggerPlan.redirectAmount))}</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Months to Goal</p>
                      <p className="text-white font-semibold">
                        {triggerPlan.monthsToGoal === Infinity ? 'Adjust redirect plan' : `${triggerPlan.monthsToGoal} months`}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">* Scores capped at 5 per trigger. Aim to reduce scores while increasing redirect percentage.</p>
                </div>
              </Card>
            </div>
          </section>

          <section id="debt-section">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white">Debt & Credit Health</h2>
                <p className="text-sm text-gray-400">Track payoff velocity and keep utilization in the sweet spot.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Card
                title="Debt Payoff (Snowball)"
                icon={<CreditCard className="w-5 h-5" />}
                description="Stack your payments, see interest costs, and stay motivated with a month-by-month schedule."
              >
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400">Balance</label>
                      <input
                        type="number"
                        value={balance}
                        onChange={e => setBalance(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400">APR %</label>
                      <input
                        type="number"
                        value={apr}
                        onChange={e => setApr(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400">Minimum Payment</label>
                      <input
                        type="number"
                        value={minPay}
                        onChange={e => setMinPay(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400">Extra Payment</label>
                      <input
                        type="number"
                        value={extraPay}
                        onChange={e => setExtraPay(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Months to Payoff</p>
                      <p className="text-white font-semibold">{payoff.months === Infinity ? 'Not reachable' : payoff.months}</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Total Interest</p>
                      <p className="text-white font-semibold">{payoff.totalInterest === Infinity ? '-' : formatCurrency(payoff.totalInterest)}</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs text-gray-400 mb-1">First 12 months schedule</p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-gray-300">
                        <thead>
                          <tr className="text-gray-400">
                            <th className="text-left py-1">Month</th>
                            <th className="text-right py-1">Interest</th>
                            <th className="text-right py-1">Principal</th>
                            <th className="text-right py-1">Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {payoff.schedule.map((row) => (
                            <tr key={row.month} className="border-t border-gray-700">
                              <td className="py-1">{row.month}</td>
                              <td className="py-1 text-right">{formatCurrency(row.interest)}</td>
                              <td className="py-1 text-right">{formatCurrency(row.principal)}</td>
                              <td className="py-1 text-right">{formatCurrency(row.balance)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </Card>

              <Card
                title="Credit Utilization Monitor"
                icon={<Activity className="w-5 h-5" />}
                description="Check how much of your revolving limits are in use and how that might look to lenders."
              >
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400">Total Balances</label>
                      <input
                        type="number"
                        value={creditBalances}
                        onChange={e => setCreditBalances(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400">Total Credit Limits</label>
                      <input
                        type="number"
                        value={creditLimits}
                        onChange={e => setCreditLimits(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Utilization Rate</p>
                      <p className="text-white font-semibold">
                        {creditUtilization.limits > 0 ? `${creditUtilization.ratio.toFixed(1)}%` : '-'}
                      </p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Status</p>
                      <p className="text-white font-semibold">{creditUtilization.status}</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Ideal Balance @ 30%</p>
                      <p className="text-white font-semibold">{formatCurrency(Math.round(creditUtilization.limits * 0.3))}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          <section id="home-section">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white">Home & Protection</h2>
                <p className="text-sm text-gray-400">Quantify coverage gaps and estimate sustainable home buying budgets.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Card
                title="Mortgage Affordability"
                icon={<Home className="w-5 h-5" />}
                description="Blend front- and back-end DTI rules to size an affordable mortgage payment and price range."
              >
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400">Household Income (annual)</label>
                      <input
                        type="number"
                        value={annualIncome}
                        onChange={e => setAnnualIncome(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400">Monthly Debt Payments</label>
                      <input
                        type="number"
                        value={monthlyDebt}
                        onChange={e => setMonthlyDebt(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400">Interest Rate %</label>
                      <input
                        type="number"
                        value={mortgageRate}
                        onChange={e => setMortgageRate(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400">Term (years)</label>
                      <input
                        type="number"
                        value={mortgageTerm}
                        onChange={e => setMortgageTerm(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400">Down Payment</label>
                      <input
                        type="number"
                        value={downPayment}
                        onChange={e => setDownPayment(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Max Monthly Payment</p>
                      <p className="text-white font-semibold">{formatCurrency(Math.round(mortgageProjection.allowedPayment))}</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Affordable Loan Amount</p>
                      <p className="text-white font-semibold">{formatCurrency(Math.round(mortgageProjection.principal))}</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Estimated Home Price</p>
                      <p className="text-white font-semibold">{formatCurrency(Math.round(mortgageProjection.homePrice))}</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card
                title="Insurance Coverage Gap"
                icon={<Activity className="w-5 h-5" />}
                description="Size your life insurance needs based on income replacement, debts, and existing assets."
              >
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400">Income to Replace (annual)</label>
                      <input
                        type="number"
                        value={insuranceIncome}
                        onChange={e => setInsuranceIncome(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400">Years Needed</label>
                      <input
                        type="number"
                        value={insuranceYears}
                        onChange={e => setInsuranceYears(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400">Outstanding Debts</label>
                      <input
                        type="number"
                        value={insuranceDebts}
                        onChange={e => setInsuranceDebts(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400">Liquid Savings</label>
                      <input
                        type="number"
                        value={insuranceSavings}
                        onChange={e => setInsuranceSavings(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400">Current Life Insurance Coverage</label>
                    <input
                      type="number"
                      value={insuranceCoverage}
                      onChange={e => setInsuranceCoverage(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Total Needed</p>
                      <p className="text-white font-semibold">{formatCurrency(Math.round(insurancePlan.needed))}</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Current Coverage</p>
                      <p className="text-white font-semibold">{formatCurrency(Math.round(insurancePlan.currentCoverage))}</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Coverage Gap</p>
                      <p className="text-white font-semibold">{formatCurrency(Math.round(insurancePlan.gap))}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          <section id="retirement-section">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white">Future Planning</h2>
                <p className="text-sm text-gray-400">Plan for retirement and education expenses with long-term projections.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Card
                title="Retirement Readiness"
                icon={<Activity className="w-5 h-5" />}
                description="Estimate if your current savings and contributions will meet retirement income goals."
              >
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400">Desired Annual Income</label>
                      <input
                        type="number"
                        value={retirementIncome}
                        onChange={e => setRetirementIncome(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400">Years in Retirement</label>
                      <input
                        type="number"
                        value={retirementYears}
                        onChange={e => setRetirementYears(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400">Current Savings</label>
                      <input
                        type="number"
                        value={retirementSavings}
                        onChange={e => setRetirementSavings(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400">Monthly Contribution</label>
                      <input
                        type="number"
                        value={retirementContribution}
                        onChange={e => setRetirementContribution(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400">Expected Return %</label>
                      <input
                        type="number"
                        value={retirementReturn}
                        onChange={e => setRetirementReturn(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Projected Savings</p>
                      <p className="text-white font-semibold">{formatCurrency(Math.round(retirementPlan.future))}</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Target Needed</p>
                      <p className="text-white font-semibold">{formatCurrency(Math.round(retirementPlan.goal))}</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Gap to Fill</p>
                      <p className="text-white font-semibold">{formatCurrency(Math.round(retirementPlan.gap))}</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card
                title="College Savings Planner"
                icon={<Activity className="w-5 h-5" />}
                description="Project college costs accounting for inflation and plan your savings strategy."
              >
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400">Estimated College Cost</label>
                      <input
                        type="number"
                        value={collegeCost}
                        onChange={e => setCollegeCost(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400">Years Until College</label>
                      <input
                        type="number"
                        value={collegeYears}
                        onChange={e => setCollegeYears(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400">Current Savings</label>
                      <input
                        type="number"
                        value={collegeSavings}
                        onChange={e => setCollegeSavings(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400">Monthly Contribution</label>
                      <input
                        type="number"
                        value={collegeMonthly}
                        onChange={e => setCollegeMonthly(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400">Expected Return %</label>
                      <input
                        type="number"
                        value={collegeReturn}
                        onChange={e => setCollegeReturn(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400">Education Inflation Rate %</label>
                    <input
                      type="number"
                      value={collegeInflation}
                      onChange={e => setCollegeInflation(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Future College Cost</p>
                      <p className="text-white font-semibold">{formatCurrency(Math.round(collegePlan.futureCost))}</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Projected Savings</p>
                      <p className="text-white font-semibold">{formatCurrency(Math.round(collegePlan.future))}</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Savings Gap</p>
                      <p className="text-white font-semibold">{formatCurrency(Math.round(collegePlan.gap))}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          <section id="advanced-section">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white">Advanced Financial Calculators</h2>
                <p className="text-sm text-gray-400">Estimate tax liabilities and loan payments with quick inputs.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Card
                title="Income Tax Estimator"
                icon={<Calculator className="w-5 h-5" />}
                description="Approximate federal income taxes using current brackets and deductions."
              >
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400">Annual Income</label>
                      <input
                        type="number"
                        value={annualIncomeTax}
                        onChange={e => setAnnualIncomeTax(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400">Standard Deduction</label>
                      <input
                        type="number"
                        value={taxDeductions}
                        onChange={e => setTaxDeductions(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400">Filing Status</label>
                      <select
                        value={taxFilingStatus}
                        onChange={e => setTaxFilingStatus(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      >
                        <option value="single">Single</option>
                        <option value="married_joint">Married Filing Jointly</option>
                        <option value="head_household">Head of Household</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Taxable Income</p>
                      <p className="text-white font-semibold">{formatCurrency(Math.round(taxCalculation.taxableIncome))}</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Estimated Tax</p>
                      <p className="text-white font-semibold">{formatCurrency(Math.round(taxCalculation.tax))}</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Effective Rate</p>
                      <p className="text-white font-semibold">{taxCalculation.effectiveRate.toFixed(1)}%</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">After-Tax Income</p>
                      <p className="text-white font-semibold">{formatCurrency(Math.round(taxCalculation.afterTaxIncome))}</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Marginal Rate</p>
                      <p className="text-white font-semibold">{taxCalculation.currentBracketRate.toFixed(1)}%</p>
                    </div>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                    <p className="text-xs text-gray-400">Income Until Next Bracket</p>
                    <p className="text-white font-semibold">
                      {taxCalculation.incomeToNextBracket === Infinity
                        ? 'Top bracket reached'
                        : formatCurrency(Math.round(taxCalculation.incomeToNextBracket))}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">* Uses simplified federal brackets for quick planning purposes.</p>
                </div>
              </Card>
              <Card
                title="Tax Bracket Explorer"
                icon={<Percent className="w-5 h-5" />}
                description="See where your taxable income sits today and how each bracket impacts your next dollar."
              >
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Current Bracket Range</p>
                      <p className="text-white font-semibold">
                        {formatCurrency(Math.round(taxCalculation.currentBracketLower))} –
                        {taxCalculation.currentBracketUpper === Infinity
                          ? ' ∞'
                          : ` ${formatCurrency(Math.round(taxCalculation.currentBracketUpper))}`}
                      </p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Marginal Tax Rate</p>
                      <p className="text-white font-semibold">{taxCalculation.currentBracketRate.toFixed(1)}%</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Income to Next Bracket</p>
                      <p className="text-white font-semibold">
                        {taxCalculation.incomeToNextBracket === Infinity
                          ? 'Top bracket reached'
                          : formatCurrency(Math.round(taxCalculation.incomeToNextBracket))}
                      </p>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-gray-300">
                      <thead>
                        <tr className="text-gray-400">
                          <th className="text-left py-1">Bracket</th>
                          <th className="text-left py-1">Rate</th>
                          <th className="text-left py-1">Taxable Range</th>
                        </tr>
                      </thead>
                      <tbody>
                        {taxCalculation.bracketTable.map((bracket, index) => {
                          const lower = index === 0 ? 0 : taxCalculation.bracketTable[index - 1].limit;
                          const upper = bracket.limit;
                          const isActive = taxCalculation.taxableIncome > lower && taxCalculation.taxableIncome <= upper;
                          return (
                            <tr
                              key={`${bracket.limit}-${bracket.rate}`}
                              className={`border-t border-gray-700 ${isActive ? 'bg-orange-500/10' : ''}`}
                            >
                              <td className="py-1">{index + 1}</td>
                              <td className="py-1">{(bracket.rate * 100).toFixed(1)}%</td>
                              <td className="py-1">
                                {formatCurrency(Math.round(lower))} –{' '}
                                {upper === Infinity ? '∞' : formatCurrency(Math.round(upper))}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Card>
              <Card
                title="Loan Payment Calculator"
                icon={<Receipt className="w-5 h-5" />}
                description="Project monthly payments, interest costs, and total payoff for installment loans."
              >
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400">Loan Amount</label>
                      <input
                        type="number"
                        value={loanAmount}
                        onChange={e => setLoanAmount(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400">APR %</label>
                      <input
                        type="number"
                        value={loanRate}
                        onChange={e => setLoanRate(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400">Term (months)</label>
                      <input
                        type="number"
                        value={loanTerm}
                        onChange={e => setLoanTerm(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Monthly Payment</p>
                      <p className="text-white font-semibold">{formatCurrency(Math.round(loanCalculation.monthlyPayment))}</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Total Interest</p>
                      <p className="text-white font-semibold">{formatCurrency(Math.round(loanCalculation.totalInterest))}</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-xs text-gray-400">Total Paid</p>
                      <p className="text-white font-semibold">{formatCurrency(Math.round(loanCalculation.totalPayment))}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">* Assumes fixed-rate amortizing loan with equal monthly payments.</p>
                </div>
              </Card>
            </div>
          </section>
        </div>
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ToolsPage;
