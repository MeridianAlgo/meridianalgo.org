import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, DollarSign, PiggyBank, CreditCard, Home, TrendingUp,
  Calculator, Receipt, Shield, Briefcase, Percent, ArrowUp
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../contexts/AuthContext';
import CollapsibleTool from '../components/CollapsibleTool';

function formatCurrency(n: number) {
  if (!isFinite(n)) return '-';
  return n.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

const parseNumericInput = (value: string): number => {
  if (value.trim() === '') return NaN;
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : NaN;
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
      navigate('/login', { state: { from: { pathname: '/tools' } } });
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

  // 50/30/20 Budget
  const [income, setIncome] = useState('4000');
  const [needs, setNeeds] = useState('50');
  const [wants, setWants] = useState('30');
  const [savings, setSavings] = useState('20');
  const budgetCalc = useMemo(() => {
    const inc = parseNumericInput(income) || 0;
    const n = parseNumericInput(needs) || 0;
    const w = parseNumericInput(wants) || 0;
    const s = parseNumericInput(savings) || 0;
    const total = n + w + s;
    return {
      needsAmt: (inc * n) / 100,
      wantsAmt: (inc * w) / 100,
      savingsAmt: (inc * s) / 100,
      balanced: Math.round(total) === 100
    };
  }, [income, needs, wants, savings]);

  // Emergency Fund
  const [monthlyExpenses, setMonthlyExpenses] = useState('3200');
  const [coverageMonths, setCoverageMonths] = useState('6');
  const [emergencySavings, setEmergencySavings] = useState('5000');
  const emergencyCalc = useMemo(() => {
    const expenses = parseNumericInput(monthlyExpenses) || 0;
    const months = parseNumericInput(coverageMonths) || 0;
    const current = parseNumericInput(emergencySavings) || 0;
    const target = expenses * months;
    return {
      target,
      gap: Math.max(0, target - current),
      monthsCovered: expenses > 0 ? current / expenses : 0
    };
  }, [monthlyExpenses, coverageMonths, emergencySavings]);

  // Compound Interest
  const [compoundInitial, setCompoundInitial] = useState('5000');
  const [compoundMonthly, setCompoundMonthly] = useState('200');
  const [compoundYears, setCompoundYears] = useState('10');
  const [compoundRate, setCompoundRate] = useState('7');
  const compoundCalc = useMemo(() => {
    const P = parseNumericInput(compoundInitial) || 0;
    const PMT = parseNumericInput(compoundMonthly) || 0;
    const years = parseNumericInput(compoundYears) || 0;
    const rate = parseNumericInput(compoundRate) || 0;
    const n = years * 12;
    const r = rate / 100 / 12;
    let future = P * Math.pow(1 + r, n);
    if (r > 0) {
      future += PMT * ((Math.pow(1 + r, n) - 1) / r);
    } else {
      future += PMT * n;
    }
    const totalContributions = P + PMT * n;
    return { future, totalContributions, earnings: future - totalContributions };
  }, [compoundInitial, compoundMonthly, compoundYears, compoundRate]);

  // Debt Payoff
  const [debtBalance, setDebtBalance] = useState('5000');
  const [debtAPR, setDebtAPR] = useState('19.99');
  const [debtMinPay, setDebtMinPay] = useState('150');
  const [debtExtra, setDebtExtra] = useState('100');
  const debtCalc = useMemo(() => {
    const bal = parseNumericInput(debtBalance) || 0;
    const apr = parseNumericInput(debtAPR) || 0;
    const minPay = parseNumericInput(debtMinPay) || 0;
    const extra = parseNumericInput(debtExtra) || 0;
    const monthlyRate = apr / 100 / 12;
    const payment = minPay + extra;
    let remaining = bal;
    let months = 0;
    let totalInterest = 0;
    while (remaining > 0 && months < 600) {
      const interest = remaining * monthlyRate;
      const principal = Math.min(payment - interest, remaining);
      if (principal <= 0) break;
      remaining -= principal;
      totalInterest += interest;
      months++;
    }
    return { months, totalInterest, totalPaid: bal + totalInterest };
  }, [debtBalance, debtAPR, debtMinPay, debtExtra]);

  // Mortgage Affordability
  const [annualIncome, setAnnualIncome] = useState('85000');
  const [monthlyDebt, setMonthlyDebt] = useState('500');
  const [mortgageRate, setMortgageRate] = useState('6.5');
  const [downPayment, setDownPayment] = useState('40000');
  const mortgageCalc = useMemo(() => {
    const income = parseNumericInput(annualIncome) || 0;
    const debt = parseNumericInput(monthlyDebt) || 0;
    const rate = parseNumericInput(mortgageRate) || 0;
    const down = parseNumericInput(downPayment) || 0;
    const monthlyIncome = income / 12;
    const front = monthlyIncome * 0.28;
    const back = monthlyIncome * 0.36 - debt;
    const maxPayment = Math.min(front, back);
    const r = rate / 100 / 12;
    const n = 30 * 12;
    const principal = r > 0 ? maxPayment * (1 - Math.pow(1 + r, -n)) / r : maxPayment * n;
    return { maxPayment, homePrice: principal + down };
  }, [annualIncome, monthlyDebt, mortgageRate, downPayment]);

  // Rent vs Buy
  const [rentMonthly, setRentMonthly] = useState('2000');
  const [homePrice, setHomePrice] = useState('350000');
  const [rentVsBuyYears, setRentVsBuyYears] = useState('5');
  const rentVsBuyCalc = useMemo(() => {
    const rent = parseNumericInput(rentMonthly) || 0;
    const price = parseNumericInput(homePrice) || 0;
    const years = parseNumericInput(rentVsBuyYears) || 0;
    const totalRent = rent * 12 * years;
    const downPay = price * 0.2;
    const loanAmount = price * 0.8;
    const monthlyMortgage = loanAmount * 0.005; // Simplified
    const totalMortgage = monthlyMortgage * 12 * years;
    const maintenance = price * 0.01 * years;
    const totalBuy = downPay + totalMortgage + maintenance;
    return { totalRent, totalBuy, difference: totalBuy - totalRent };
  }, [rentMonthly, homePrice, rentVsBuyYears]);

  // FIRE Calculator
  const [fireAnnualExpenses, setFireAnnualExpenses] = useState('50000');
  const [fireCurrentSavings, setFireCurrentSavings] = useState('100000');
  const [fireMonthlySavings, setFireMonthlySavings] = useState('3000');
  const [fireReturnRate, setFireReturnRate] = useState('7');
  const fireCalc = useMemo(() => {
    const expenses = parseNumericInput(fireAnnualExpenses) || 0;
    const current = parseNumericInput(fireCurrentSavings) || 0;
    const monthly = parseNumericInput(fireMonthlySavings) || 0;
    const rate = parseNumericInput(fireReturnRate) || 0;
    const fireNumber = expenses * 25; // 4% rule
    const gap = Math.max(0, fireNumber - current);
    const r = rate / 100 / 12;
    let balance = current;
    let months = 0;
    while (balance < fireNumber && months < 600) {
      balance = balance * (1 + r) + monthly;
      months++;
    }
    return { fireNumber, gap, yearsToFire: months / 12 };
  }, [fireAnnualExpenses, fireCurrentSavings, fireMonthlySavings, fireReturnRate]);

  // Roth vs Traditional IRA
  const [iraContribution, setIraContribution] = useState('6500');
  const [iraTaxRate, setIraTaxRate] = useState('24');
  const [iraYears, setIraYears] = useState('30');
  const [iraReturn, setIraReturn] = useState('7');
  const iraCalc = useMemo(() => {
    const contrib = parseNumericInput(iraContribution) || 0;
    const taxRate = parseNumericInput(iraTaxRate) / 100 || 0;
    const years = parseNumericInput(iraYears) || 0;
    const returnRate = parseNumericInput(iraReturn) / 100 || 0;
    const rothAfterTax = contrib * (1 - taxRate);
    const rothFuture = rothAfterTax * Math.pow(1 + returnRate, years);
    const tradFuture = contrib * Math.pow(1 + returnRate, years);
    const tradAfterTax = tradFuture * (1 - taxRate);
    return { rothFuture, tradAfterTax, difference: rothFuture - tradAfterTax };
  }, [iraContribution, iraTaxRate, iraYears, iraReturn]);

  // Student Loan Payoff
  const [studentLoanBalance, setStudentLoanBalance] = useState('35000');
  const [studentLoanRate, setStudentLoanRate] = useState('5.5');
  const [studentLoanPayment, setStudentLoanPayment] = useState('400');
  const studentLoanCalc = useMemo(() => {
    const bal = parseNumericInput(studentLoanBalance) || 0;
    const rate = parseNumericInput(studentLoanRate) / 100 / 12 || 0;
    const pmt = parseNumericInput(studentLoanPayment) || 0;
    let remaining = bal;
    let months = 0;
    let totalInterest = 0;
    while (remaining > 0 && months < 600) {
      const interest = remaining * rate;
      const principal = Math.min(pmt - interest, remaining);
      if (principal <= 0) break;
      remaining -= principal;
      totalInterest += interest;
      months++;
    }
    return { months, years: months / 12, totalInterest };
  }, [studentLoanBalance, studentLoanRate, studentLoanPayment]);

  // 401k Calculator
  const [k401Salary, setK401Salary] = useState('75000');
  const [k401Contribution, setK401Contribution] = useState('10');
  const [k401Match, setK401Match] = useState('50');
  const [k401Years, setK401Years] = useState('25');
  const [k401Return, setK401Return] = useState('7');
  const k401Calc = useMemo(() => {
    const salary = parseNumericInput(k401Salary) || 0;
    const contribPct = parseNumericInput(k401Contribution) / 100 || 0;
    const matchPct = parseNumericInput(k401Match) / 100 || 0;
    const years = parseNumericInput(k401Years) || 0;
    const returnRate = parseNumericInput(k401Return) / 100 || 0;
    const annualContrib = salary * contribPct;
    const annualMatch = annualContrib * matchPct;
    const totalAnnual = annualContrib + annualMatch;
    const future = totalAnnual * ((Math.pow(1 + returnRate, years) - 1) / returnRate);
    return { annualContrib, annualMatch, future };
  }, [k401Salary, k401Contribution, k401Match, k401Years, k401Return]);

  // Car Affordability
  const [carIncome, setCarIncome] = useState('60000');
  const [carDownPayment, setCarDownPayment] = useState('5000');
  const [carLoanRate, setCarLoanRate] = useState('5.5');
  const [carLoanTerm, setCarLoanTerm] = useState('60');
  const carCalc = useMemo(() => {
    const income = parseNumericInput(carIncome) || 0;
    const down = parseNumericInput(carDownPayment) || 0;
    const rate = parseNumericInput(carLoanRate) / 100 / 12 || 0;
    const months = parseNumericInput(carLoanTerm) || 0;
    const maxMonthly = income / 12 * 0.15; // 15% rule
    const loanAmount = rate > 0 ? maxMonthly * (1 - Math.pow(1 + rate, -months)) / rate : maxMonthly * months;
    return { maxMonthly, maxCarPrice: loanAmount + down };
  }, [carIncome, carDownPayment, carLoanRate, carLoanTerm]);

  // Credit Card Payoff
  const [ccBalance, setCcBalance] = useState('8000');
  const [ccAPR, setCcAPR] = useState('21.99');
  const [ccPayment, setCcPayment] = useState('300');
  const ccCalc = useMemo(() => {
    const bal = parseNumericInput(ccBalance) || 0;
    const apr = parseNumericInput(ccAPR) / 100 / 12 || 0;
    const pmt = parseNumericInput(ccPayment) || 0;
    let remaining = bal;
    let months = 0;
    let totalInterest = 0;
    while (remaining > 0 && months < 600) {
      const interest = remaining * apr;
      const principal = Math.min(pmt - interest, remaining);
      if (principal <= 0) break;
      remaining -= principal;
      totalInterest += interest;
      months++;
    }
    return { months, totalInterest, totalPaid: bal + totalInterest };
  }, [ccBalance, ccAPR, ccPayment]);

  // Tax Calculator
  const [taxIncome, setTaxIncome] = useState('85000');
  const [taxDeductions, setTaxDeductions] = useState('13850');
  const taxCalc = useMemo(() => {
    const income = parseNumericInput(taxIncome) || 0;
    const deductions = parseNumericInput(taxDeductions) || 0;
    const taxable = Math.max(0, income - deductions);
    // 2024 single filer brackets
    let tax = 0;
    if (taxable > 578125) tax += (taxable - 578125) * 0.37;
    if (taxable > 231250) tax += Math.min(taxable - 231250, 346875) * 0.35;
    if (taxable > 182100) tax += Math.min(taxable - 182100, 49150) * 0.32;
    if (taxable > 95375) tax += Math.min(taxable - 95375, 86725) * 0.24;
    if (taxable > 44725) tax += Math.min(taxable - 44725, 50650) * 0.22;
    if (taxable > 11000) tax += Math.min(taxable - 11000, 33725) * 0.12;
    tax += Math.min(taxable, 11000) * 0.10;
    return { tax, effectiveRate: taxable > 0 ? (tax / taxable) * 100 : 0, afterTax: income - tax };
  }, [taxIncome, taxDeductions]);

  // Retirement Withdrawal
  const [retirementBalance, setRetirementBalance] = useState('1000000');
  const [retirementWithdrawal, setRetirementWithdrawal] = useState('4');
  const retirementCalc = useMemo(() => {
    const balance = parseNumericInput(retirementBalance) || 0;
    const rate = parseNumericInput(retirementWithdrawal) / 100 || 0;
    const annualIncome = balance * rate;
    return { annualIncome, monthlyIncome: annualIncome / 12 };
  }, [retirementBalance, retirementWithdrawal]);

  // HSA Calculator
  const [hsaContribution, setHsaContribution] = useState('4150');
  const [hsaTaxRate, setHsaTaxRate] = useState('24');
  const [hsaYears, setHsaYears] = useState('20');
  const [hsaReturn, setHsaReturn] = useState('6');
  const hsaCalc = useMemo(() => {
    const contrib = parseNumericInput(hsaContribution) || 0;
    const taxRate = parseNumericInput(hsaTaxRate) / 100 || 0;
    const years = parseNumericInput(hsaYears) || 0;
    const returnRate = parseNumericInput(hsaReturn) / 100 || 0;
    const taxSavings = contrib * taxRate;
    const future = contrib * ((Math.pow(1 + returnRate, years) - 1) / returnRate);
    return { taxSavings, future, totalSavings: taxSavings * years };
  }, [hsaContribution, hsaTaxRate, hsaYears, hsaReturn]);

  // College Savings (529)
  const [collegeCost, setCollegeCost] = useState('120000');
  const [collegeYears, setCollegeYears] = useState('15');
  const [collegeSavings, setCollegeSavings] = useState('10000');
  const [collegeMonthly, setCollegeMonthly] = useState('400');
  const [collegeReturn, setCollegeReturn] = useState('6');
  const collegeCalc = useMemo(() => {
    const cost = parseNumericInput(collegeCost) || 0;
    const years = parseNumericInput(collegeYears) || 0;
    const current = parseNumericInput(collegeSavings) || 0;
    const monthly = parseNumericInput(collegeMonthly) || 0;
    const returnRate = parseNumericInput(collegeReturn) / 100 || 0;
    const futureCost = cost * Math.pow(1.04, years); // 4% inflation
    const r = returnRate / 12;
    const n = years * 12;
    let future = current * Math.pow(1 + r, n);
    future += monthly * ((Math.pow(1 + r, n) - 1) / r);
    return { futureCost, future, gap: Math.max(0, futureCost - future) };
  }, [collegeCost, collegeYears, collegeSavings, collegeMonthly, collegeReturn]);

  if (!isAuthenticated || !user) {
    return null;
  }

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
              <p className="text-gray-300">Interactive calculators to plan, learn, and experiment with your finances.</p>
            </div>
          </div>
        </div>

        <div className="px-8 py-6 space-y-4">
          {/* Budget & Cash Flow */}
          <h2 className="text-xl font-bold text-white mb-4">💰 Budget & Cash Flow</h2>

          <CollapsibleTool
            title="50/30/20 Budget Planner"
            icon={<DollarSign className="w-5 h-5" />}
            description="Balance your spending with the popular 50/30/20 rule"
          >
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Monthly Income</label>
                <input type="number" value={income} onChange={e => setIncome(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Needs %</label>
                  <input type="number" value={needs} onChange={e => setNeeds(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Wants %</label>
                  <input type="number" value={wants} onChange={e => setWants(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Savings %</label>
                  <input type="number" value={savings} onChange={e => setSavings(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                </div>
              </div>
              <p className={`text-xs ${budgetCalc.balanced ? 'text-green-400' : 'text-red-400'}`}>
                {budgetCalc.balanced ? '✓ Balanced!' : '✗ Must equal 100%'}
              </p>
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="bg-gray-900 rounded-lg p-3">
                  <p className="text-xs text-gray-400">Needs</p>
                  <p className="text-white font-semibold">{formatCurrency(budgetCalc.needsAmt)}</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-3">
                  <p className="text-xs text-gray-400">Wants</p>
                  <p className="text-white font-semibold">{formatCurrency(budgetCalc.wantsAmt)}</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-3">
                  <p className="text-xs text-gray-400">Savings</p>
                  <p className="text-white font-semibold">{formatCurrency(budgetCalc.savingsAmt)}</p>
                </div>
              </div>
            </div>
          </CollapsibleTool>

          <CollapsibleTool
            title="Emergency Fund Calculator"
            icon={<Shield className="w-5 h-5" />}
            description="Calculate how much you need for financial emergencies"
          >
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Monthly Expenses</label>
                <input type="number" value={monthlyExpenses} onChange={e => setMonthlyExpenses(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Months of Coverage</label>
                <input type="number" value={coverageMonths} onChange={e => setCoverageMonths(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Current Savings</label>
                <input type="number" value={emergencySavings} onChange={e => setEmergencySavings(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div className="bg-gray-900 rounded-lg p-4 mt-4">
                <p className="text-sm text-gray-400">Target Fund</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(emergencyCalc.target)}</p>
                <p className="text-sm text-orange-400 mt-2">Gap: {formatCurrency(emergencyCalc.gap)}</p>
                <p className="text-xs text-gray-400 mt-1">You have {emergencyCalc.monthsCovered.toFixed(1)} months covered</p>
              </div>
            </div>
          </CollapsibleTool>

          {/* Saving & Investing */}
          <h2 className="text-xl font-bold text-white mb-4 mt-8">📈 Saving & Investing</h2>

          <CollapsibleTool
            title="Compound Interest Calculator"
            icon={<TrendingUp className="w-5 h-5" />}
            description="See the power of compound interest over time"
          >
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Initial Investment</label>
                <input type="number" value={compoundInitial} onChange={e => setCompoundInitial(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Monthly Contribution</label>
                <input type="number" value={compoundMonthly} onChange={e => setCompoundMonthly(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Years</label>
                  <input type="number" value={compoundYears} onChange={e => setCompoundYears(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Annual Return %</label>
                  <input type="number" value={compoundRate} onChange={e => setCompoundRate(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                </div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 mt-4">
                <p className="text-sm text-gray-400">Future Value</p>
                <p className="text-2xl font-bold text-green-400">{formatCurrency(compoundCalc.future)}</p>
                <p className="text-sm text-gray-400 mt-2">Total Contributions: {formatCurrency(compoundCalc.totalContributions)}</p>
                <p className="text-sm text-orange-400">Earnings: {formatCurrency(compoundCalc.earnings)}</p>
              </div>
            </div>
          </CollapsibleTool>

          <CollapsibleTool
            title="Roth IRA vs Traditional IRA"
            icon={<PiggyBank className="w-5 h-5" />}
            description="Compare tax advantages of Roth vs Traditional IRA"
          >
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Annual Contribution</label>
                <input type="number" value={iraContribution} onChange={e => setIraContribution(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Tax Rate %</label>
                  <input type="number" value={iraTaxRate} onChange={e => setIraTaxRate(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Years</label>
                  <input type="number" value={iraYears} onChange={e => setIraYears(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Expected Return %</label>
                <input type="number" value={iraReturn} onChange={e => setIraReturn(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-gray-900 rounded-lg p-3">
                  <p className="text-xs text-gray-400">Roth IRA (After-Tax)</p>
                  <p className="text-lg font-bold text-green-400">{formatCurrency(iraCalc.rothFuture)}</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-3">
                  <p className="text-xs text-gray-400">Traditional (After-Tax)</p>
                  <p className="text-lg font-bold text-blue-400">{formatCurrency(iraCalc.tradAfterTax)}</p>
                </div>
              </div>
              <p className="text-sm text-orange-400 mt-2">
                {iraCalc.difference > 0 ? 'Roth IRA wins by ' : 'Traditional IRA wins by '}
                {formatCurrency(Math.abs(iraCalc.difference))}
              </p>
            </div>
          </CollapsibleTool>

          <CollapsibleTool
            title="401(k) Calculator"
            icon={<Briefcase className="w-5 h-5" />}
            description="Calculate your 401(k) growth with employer match"
          >
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Annual Salary</label>
                <input type="number" value={k401Salary} onChange={e => setK401Salary(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Your Contribution %</label>
                  <input type="number" value={k401Contribution} onChange={e => setK401Contribution(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Employer Match %</label>
                  <input type="number" value={k401Match} onChange={e => setK401Match(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Years</label>
                  <input type="number" value={k401Years} onChange={e => setK401Years(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Return %</label>
                  <input type="number" value={k401Return} onChange={e => setK401Return(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                </div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 mt-4">
                <p className="text-sm text-gray-400">Future Balance</p>
                <p className="text-2xl font-bold text-green-400">{formatCurrency(k401Calc.future)}</p>
                <p className="text-sm text-gray-400 mt-2">Your Annual: {formatCurrency(k401Calc.annualContrib)}</p>
                <p className="text-sm text-orange-400">Employer Match: {formatCurrency(k401Calc.annualMatch)}</p>
              </div>
            </div>
          </CollapsibleTool>

          {/* Debt & Credit */}
          <h2 className="text-xl font-bold text-white mb-4 mt-8">💳 Debt & Credit</h2>

          <CollapsibleTool
            title="Debt Payoff Calculator"
            icon={<CreditCard className="w-5 h-5" />}
            description="Calculate how long it will take to pay off your debt"
          >
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Total Balance</label>
                <input type="number" value={debtBalance} onChange={e => setDebtBalance(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">APR %</label>
                <input type="number" value={debtAPR} onChange={e => setDebtAPR(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Minimum Payment</label>
                  <input type="number" value={debtMinPay} onChange={e => setDebtMinPay(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Extra Payment</label>
                  <input type="number" value={debtExtra} onChange={e => setDebtExtra(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                </div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 mt-4">
                <p className="text-sm text-gray-400">Payoff Time</p>
                <p className="text-2xl font-bold text-white">{debtCalc.months} months ({(debtCalc.months / 12).toFixed(1)} years)</p>
                <p className="text-sm text-red-400 mt-2">Total Interest: {formatCurrency(debtCalc.totalInterest)}</p>
                <p className="text-sm text-gray-400">Total Paid: {formatCurrency(debtCalc.totalPaid)}</p>
              </div>
            </div>
          </CollapsibleTool>

          <CollapsibleTool
            title="Credit Card Payoff"
            icon={<CreditCard className="w-5 h-5" />}
            description="Plan your credit card debt elimination"
          >
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Card Balance</label>
                <input type="number" value={ccBalance} onChange={e => setCcBalance(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">APR %</label>
                <input type="number" value={ccAPR} onChange={e => setCcAPR(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Monthly Payment</label>
                <input type="number" value={ccPayment} onChange={e => setCcPayment(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div className="bg-gray-900 rounded-lg p-4 mt-4">
                <p className="text-sm text-gray-400">Payoff Time</p>
                <p className="text-2xl font-bold text-white">{ccCalc.months} months</p>
                <p className="text-sm text-red-400 mt-2">Interest: {formatCurrency(ccCalc.totalInterest)}</p>
              </div>
            </div>
          </CollapsibleTool>

          <CollapsibleTool
            title="Student Loan Payoff"
            icon={<Receipt className="w-5 h-5" />}
            description="Calculate your student loan repayment timeline"
          >
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Loan Balance</label>
                <input type="number" value={studentLoanBalance} onChange={e => setStudentLoanBalance(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Interest Rate %</label>
                <input type="number" value={studentLoanRate} onChange={e => setStudentLoanRate(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Monthly Payment</label>
                <input type="number" value={studentLoanPayment} onChange={e => setStudentLoanPayment(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div className="bg-gray-900 rounded-lg p-4 mt-4">
                <p className="text-sm text-gray-400">Payoff Time</p>
                <p className="text-2xl font-bold text-white">{studentLoanCalc.years.toFixed(1)} years</p>
                <p className="text-sm text-red-400 mt-2">Total Interest: {formatCurrency(studentLoanCalc.totalInterest)}</p>
              </div>
            </div>
          </CollapsibleTool>

          {/* Home & Real Estate */}
          <h2 className="text-xl font-bold text-white mb-4 mt-8">🏠 Home & Real Estate</h2>

          <CollapsibleTool
            title="Mortgage Affordability"
            icon={<Home className="w-5 h-5" />}
            description="Calculate how much house you can afford"
          >
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Annual Income</label>
                <input type="number" value={annualIncome} onChange={e => setAnnualIncome(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Monthly Debt Payments</label>
                <input type="number" value={monthlyDebt} onChange={e => setMonthlyDebt(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Interest Rate %</label>
                  <input type="number" value={mortgageRate} onChange={e => setMortgageRate(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Down Payment</label>
                  <input type="number" value={downPayment} onChange={e => setDownPayment(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                </div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 mt-4">
                <p className="text-sm text-gray-400">Max Home Price</p>
                <p className="text-2xl font-bold text-green-400">{formatCurrency(mortgageCalc.homePrice)}</p>
                <p className="text-sm text-gray-400 mt-2">Max Monthly Payment: {formatCurrency(mortgageCalc.maxPayment)}</p>
              </div>
            </div>
          </CollapsibleTool>

          <CollapsibleTool
            title="Rent vs Buy Calculator"
            icon={<Home className="w-5 h-5" />}
            description="Compare the costs of renting vs buying"
          >
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Monthly Rent</label>
                <input type="number" value={rentMonthly} onChange={e => setRentMonthly(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Home Purchase Price</label>
                <input type="number" value={homePrice} onChange={e => setHomePrice(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Years to Compare</label>
                <input type="number" value={rentVsBuyYears} onChange={e => setRentVsBuyYears(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-gray-900 rounded-lg p-3">
                  <p className="text-xs text-gray-400">Total Rent Cost</p>
                  <p className="text-lg font-bold text-blue-400">{formatCurrency(rentVsBuyCalc.totalRent)}</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-3">
                  <p className="text-xs text-gray-400">Total Buy Cost</p>
                  <p className="text-lg font-bold text-orange-400">{formatCurrency(rentVsBuyCalc.totalBuy)}</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                {rentVsBuyCalc.difference > 0 ? 'Renting saves ' : 'Buying saves '}
                {formatCurrency(Math.abs(rentVsBuyCalc.difference))}
              </p>
            </div>
          </CollapsibleTool>

          <CollapsibleTool
            title="Car Affordability"
            icon={<Calculator className="w-5 h-5" />}
            description="Calculate how much car you can afford"
          >
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Annual Income</label>
                <input type="number" value={carIncome} onChange={e => setCarIncome(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Down Payment</label>
                <input type="number" value={carDownPayment} onChange={e => setCarDownPayment(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Loan Rate %</label>
                  <input type="number" value={carLoanRate} onChange={e => setCarLoanRate(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Loan Term (months)</label>
                  <input type="number" value={carLoanTerm} onChange={e => setCarLoanTerm(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                </div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 mt-4">
                <p className="text-sm text-gray-400">Max Car Price</p>
                <p className="text-2xl font-bold text-green-400">{formatCurrency(carCalc.maxCarPrice)}</p>
                <p className="text-sm text-gray-400 mt-2">Max Monthly Payment: {formatCurrency(carCalc.maxMonthly)}</p>
              </div>
            </div>
          </CollapsibleTool>

          {/* Retirement & Future Planning */}
          <h2 className="text-xl font-bold text-white mb-4 mt-8">🎯 Retirement & Future Planning</h2>

          <CollapsibleTool
            title="FIRE Calculator"
            icon={<TrendingUp className="w-5 h-5" />}
            description="Calculate when you can achieve Financial Independence"
          >
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Annual Expenses</label>
                <input type="number" value={fireAnnualExpenses} onChange={e => setFireAnnualExpenses(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Current Savings</label>
                <input type="number" value={fireCurrentSavings} onChange={e => setFireCurrentSavings(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Monthly Savings</label>
                <input type="number" value={fireMonthlySavings} onChange={e => setFireMonthlySavings(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Expected Return %</label>
                <input type="number" value={fireReturnRate} onChange={e => setFireReturnRate(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div className="bg-gray-900 rounded-lg p-4 mt-4">
                <p className="text-sm text-gray-400">FIRE Number (25x expenses)</p>
                <p className="text-2xl font-bold text-orange-400">{formatCurrency(fireCalc.fireNumber)}</p>
                <p className="text-sm text-gray-400 mt-2">Years to FIRE: {fireCalc.yearsToFire.toFixed(1)}</p>
                <p className="text-sm text-red-400">Gap: {formatCurrency(fireCalc.gap)}</p>
              </div>
            </div>
          </CollapsibleTool>

          <CollapsibleTool
            title="Retirement Withdrawal Calculator"
            icon={<PiggyBank className="w-5 h-5" />}
            description="Calculate safe withdrawal rates for retirement"
          >
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Retirement Balance</label>
                <input type="number" value={retirementBalance} onChange={e => setRetirementBalance(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Withdrawal Rate % (4% rule)</label>
                <input type="number" value={retirementWithdrawal} onChange={e => setRetirementWithdrawal(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div className="bg-gray-900 rounded-lg p-4 mt-4">
                <p className="text-sm text-gray-400">Annual Income</p>
                <p className="text-2xl font-bold text-green-400">{formatCurrency(retirementCalc.annualIncome)}</p>
                <p className="text-sm text-gray-400 mt-2">Monthly Income: {formatCurrency(retirementCalc.monthlyIncome)}</p>
              </div>
            </div>
          </CollapsibleTool>

          <CollapsibleTool
            title="College Savings (529 Plan)"
            icon={<Receipt className="w-5 h-5" />}
            description="Plan for future college expenses"
          >
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Target College Cost (today's dollars)</label>
                <input type="number" value={collegeCost} onChange={e => setCollegeCost(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Years Until College</label>
                <input type="number" value={collegeYears} onChange={e => setCollegeYears(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Current Savings</label>
                <input type="number" value={collegeSavings} onChange={e => setCollegeSavings(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Monthly Savings</label>
                  <input type="number" value={collegeMonthly} onChange={e => setCollegeMonthly(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Return %</label>
                  <input type="number" value={collegeReturn} onChange={e => setCollegeReturn(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                </div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 mt-4">
                <p className="text-sm text-gray-400">Future Cost (with inflation)</p>
                <p className="text-2xl font-bold text-red-400">{formatCurrency(collegeCalc.futureCost)}</p>
                <p className="text-sm text-green-400 mt-2">Your Savings Will Be: {formatCurrency(collegeCalc.future)}</p>
                <p className="text-sm text-orange-400">Gap: {formatCurrency(collegeCalc.gap)}</p>
              </div>
            </div>
          </CollapsibleTool>

          {/* Tax & Insurance */}
          <h2 className="text-xl font-bold text-white mb-4 mt-8">📊 Tax & Insurance</h2>

          <CollapsibleTool
            title="Federal Tax Calculator"
            icon={<Percent className="w-5 h-5" />}
            description="Estimate your federal income tax"
          >
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Annual Income</label>
                <input type="number" value={taxIncome} onChange={e => setTaxIncome(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Standard Deduction</label>
                <input type="number" value={taxDeductions} onChange={e => setTaxDeductions(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div className="bg-gray-900 rounded-lg p-4 mt-4">
                <p className="text-sm text-gray-400">Estimated Tax</p>
                <p className="text-2xl font-bold text-red-400">{formatCurrency(taxCalc.tax)}</p>
                <p className="text-sm text-gray-400 mt-2">Effective Rate: {taxCalc.effectiveRate.toFixed(2)}%</p>
                <p className="text-sm text-green-400">After-Tax Income: {formatCurrency(taxCalc.afterTax)}</p>
              </div>
            </div>
          </CollapsibleTool>

          <CollapsibleTool
            title="HSA/FSA Calculator"
            icon={<Shield className="w-5 h-5" />}
            description="Calculate HSA tax savings and growth"
          >
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Annual Contribution</label>
                <input type="number" value={hsaContribution} onChange={e => setHsaContribution(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Tax Rate %</label>
                  <input type="number" value={hsaTaxRate} onChange={e => setHsaTaxRate(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Years</label>
                  <input type="number" value={hsaYears} onChange={e => setHsaYears(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Expected Return %</label>
                <input type="number" value={hsaReturn} onChange={e => setHsaReturn(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div className="bg-gray-900 rounded-lg p-4 mt-4">
                <p className="text-sm text-gray-400">Annual Tax Savings</p>
                <p className="text-2xl font-bold text-green-400">{formatCurrency(hsaCalc.taxSavings)}</p>
                <p className="text-sm text-gray-400 mt-2">Future Value: {formatCurrency(hsaCalc.future)}</p>
                <p className="text-sm text-orange-400">Total Tax Savings: {formatCurrency(hsaCalc.totalSavings)}</p>
              </div>
            </div>
          </CollapsibleTool>

          {/* Back to Top Button */}
          {showBackToTop && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50"
            >
              <ArrowUp className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;
