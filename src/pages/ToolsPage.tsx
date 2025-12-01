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

  // Net Worth Calculator
  const [nwCash, setNwCash] = useState('15000');
  const [nwInvestments, setNwInvestments] = useState('50000');
  const [nwProperty, setNwProperty] = useState('250000');
  const [nwDebt, setNwDebt] = useState('180000');
  const netWorthCalc = useMemo(() => {
    const cash = parseNumericInput(nwCash) || 0;
    const investments = parseNumericInput(nwInvestments) || 0;
    const property = parseNumericInput(nwProperty) || 0;
    const debt = parseNumericInput(nwDebt) || 0;
    const totalAssets = cash + investments + property;
    const netWorth = totalAssets - debt;
    return { totalAssets, debt, netWorth };
  }, [nwCash, nwInvestments, nwProperty, nwDebt]);

  // Savings Goal Calculator
  const [goalAmount, setGoalAmount] = useState('10000');
  const [goalMonths, setGoalMonths] = useState('24');
  const [goalCurrent, setGoalCurrent] = useState('1000');
  const [goalRate, setGoalRate] = useState('4');
  const savingsGoalCalc = useMemo(() => {
    const goal = parseNumericInput(goalAmount) || 0;
    const months = parseNumericInput(goalMonths) || 1;
    const current = parseNumericInput(goalCurrent) || 0;
    const rate = parseNumericInput(goalRate) / 100 / 12 || 0;
    const remaining = goal - current;
    const simpleMonthly = remaining / months;
    // With interest
    let monthlyWithInterest = simpleMonthly;
    if (rate > 0) {
      const futureOfCurrent = current * Math.pow(1 + rate, months);
      const needed = goal - futureOfCurrent;
      monthlyWithInterest = needed > 0 ? needed * rate / (Math.pow(1 + rate, months) - 1) : 0;
    }
    return { simpleMonthly, monthlyWithInterest: Math.max(0, monthlyWithInterest), remaining };
  }, [goalAmount, goalMonths, goalCurrent, goalRate]);

  // Inflation Calculator
  const [inflationAmount, setInflationAmount] = useState('100');
  const [inflationYears, setInflationYears] = useState('10');
  const [inflationRate, setInflationRate] = useState('3');
  const inflationCalc = useMemo(() => {
    const amount = parseNumericInput(inflationAmount) || 0;
    const years = parseNumericInput(inflationYears) || 0;
    const rate = parseNumericInput(inflationRate) / 100 || 0;
    const futureValue = amount * Math.pow(1 + rate, years);
    const purchasingPower = amount / Math.pow(1 + rate, years);
    const lostValue = amount - purchasingPower;
    return { futureValue, purchasingPower, lostValue };
  }, [inflationAmount, inflationYears, inflationRate]);

  // Tip Calculator
  const [tipBillAmount, setTipBillAmount] = useState('85');
  const [tipPercent, setTipPercent] = useState('18');
  const [tipSplitWays, setTipSplitWays] = useState('2');
  const tipCalc = useMemo(() => {
    const bill = parseNumericInput(tipBillAmount) || 0;
    const percent = parseNumericInput(tipPercent) || 0;
    const split = parseNumericInput(tipSplitWays) || 1;
    const tipAmount = bill * (percent / 100);
    const total = bill + tipAmount;
    const perPerson = total / split;
    return { tipAmount, total, perPerson };
  }, [tipBillAmount, tipPercent, tipSplitWays]);

  // Paycheck Calculator
  const [paycheckGross, setPaycheckGross] = useState('5000');
  const [paycheckFederal, setPaycheckFederal] = useState('12');
  const [paycheckState, setPaycheckState] = useState('5');
  const [paycheck401k, setPaycheck401k] = useState('6');
  const paycheckCalc = useMemo(() => {
    const gross = parseNumericInput(paycheckGross) || 0;
    const federal = parseNumericInput(paycheckFederal) / 100 || 0;
    const state = parseNumericInput(paycheckState) / 100 || 0;
    const k401 = parseNumericInput(paycheck401k) / 100 || 0;
    const fica = 0.0765; // Social Security + Medicare
    const federalTax = gross * federal;
    const stateTax = gross * state;
    const ficaTax = gross * fica;
    const retirement = gross * k401;
    const totalDeductions = federalTax + stateTax + ficaTax + retirement;
    const netPay = gross - totalDeductions;
    return { federalTax, stateTax, ficaTax, retirement, totalDeductions, netPay };
  }, [paycheckGross, paycheckFederal, paycheckState, paycheck401k]);

  // Loan Comparison Calculator
  const [loanAmount, setLoanAmount] = useState('25000');
  const [loan1Rate, setLoan1Rate] = useState('6.5');
  const [loan1Term, setLoan1Term] = useState('60');
  const [loan2Rate, setLoan2Rate] = useState('4.9');
  const [loan2Term, setLoan2Term] = useState('48');
  const loanCompareCalc = useMemo(() => {
    const principal = parseNumericInput(loanAmount) || 0;
    const r1 = parseNumericInput(loan1Rate) / 100 / 12 || 0;
    const n1 = parseNumericInput(loan1Term) || 1;
    const r2 = parseNumericInput(loan2Rate) / 100 / 12 || 0;
    const n2 = parseNumericInput(loan2Term) || 1;
    const pmt1 = r1 > 0 ? principal * r1 * Math.pow(1 + r1, n1) / (Math.pow(1 + r1, n1) - 1) : principal / n1;
    const pmt2 = r2 > 0 ? principal * r2 * Math.pow(1 + r2, n2) / (Math.pow(1 + r2, n2) - 1) : principal / n2;
    const total1 = pmt1 * n1;
    const total2 = pmt2 * n2;
    const interest1 = total1 - principal;
    const interest2 = total2 - principal;
    return { pmt1, pmt2, total1, total2, interest1, interest2, savings: total1 - total2 };
  }, [loanAmount, loan1Rate, loan1Term, loan2Rate, loan2Term]);

  // Investment Return Calculator
  const [invInitial, setInvInitial] = useState('10000');
  const [invFinal, setInvFinal] = useState('15000');
  const [invYears, setInvYears] = useState('3');
  const investmentReturnCalc = useMemo(() => {
    const initial = parseNumericInput(invInitial) || 1;
    const final = parseNumericInput(invFinal) || 0;
    const years = parseNumericInput(invYears) || 1;
    const totalReturn = ((final - initial) / initial) * 100;
    const annualReturn = (Math.pow(final / initial, 1 / years) - 1) * 100;
    const gain = final - initial;
    return { totalReturn, annualReturn, gain };
  }, [invInitial, invFinal, invYears]);

  // Break-Even Calculator
  const [beFixedCosts, setBeFixedCosts] = useState('5000');
  const [bePrice, setBePrice] = useState('50');
  const [beVariableCost, setBeVariableCost] = useState('20');
  const breakEvenCalc = useMemo(() => {
    const fixed = parseNumericInput(beFixedCosts) || 0;
    const price = parseNumericInput(bePrice) || 0;
    const variable = parseNumericInput(beVariableCost) || 0;
    const margin = price - variable;
    const breakEvenUnits = margin > 0 ? Math.ceil(fixed / margin) : 0;
    const breakEvenRevenue = breakEvenUnits * price;
    return { breakEvenUnits, breakEvenRevenue, margin };
  }, [beFixedCosts, bePrice, beVariableCost]);

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

          <CollapsibleTool
            title="Paycheck Calculator"
            icon={<DollarSign className="w-5 h-5" />}
            description="Estimate your take-home pay after deductions"
          >
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Gross Pay (per paycheck)</label>
                <input type="number" value={paycheckGross} onChange={e => setPaycheckGross(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Federal Tax %</label>
                  <input type="number" value={paycheckFederal} onChange={e => setPaycheckFederal(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">State Tax %</label>
                  <input type="number" value={paycheckState} onChange={e => setPaycheckState(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">401(k) Contribution %</label>
                <input type="number" value={paycheck401k} onChange={e => setPaycheck401k(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div className="bg-gray-900 rounded-lg p-4 mt-4">
                <p className="text-sm text-gray-400">Net Pay (Take-Home)</p>
                <p className="text-2xl font-bold text-green-400">{formatCurrency(paycheckCalc.netPay)}</p>
                <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                  <p className="text-gray-400">Federal: <span className="text-red-400">{formatCurrency(paycheckCalc.federalTax)}</span></p>
                  <p className="text-gray-400">State: <span className="text-red-400">{formatCurrency(paycheckCalc.stateTax)}</span></p>
                  <p className="text-gray-400">FICA: <span className="text-red-400">{formatCurrency(paycheckCalc.ficaTax)}</span></p>
                  <p className="text-gray-400">401(k): <span className="text-blue-400">{formatCurrency(paycheckCalc.retirement)}</span></p>
                </div>
              </div>
            </div>
          </CollapsibleTool>

          {/* Quick Tools */}
          <h2 className="text-xl font-bold text-white mb-4 mt-8">⚡ Quick Tools</h2>

          <CollapsibleTool
            title="Net Worth Calculator"
            icon={<TrendingUp className="w-5 h-5" />}
            description="Track your total assets minus liabilities"
          >
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Cash & Savings</label>
                <input type="number" value={nwCash} onChange={e => setNwCash(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Investments (stocks, 401k, etc.)</label>
                <input type="number" value={nwInvestments} onChange={e => setNwInvestments(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Property Value</label>
                <input type="number" value={nwProperty} onChange={e => setNwProperty(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Total Debt (mortgage, loans, etc.)</label>
                <input type="number" value={nwDebt} onChange={e => setNwDebt(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div className="bg-gray-900 rounded-lg p-4 mt-4">
                <p className="text-sm text-gray-400">Net Worth</p>
                <p className={`text-2xl font-bold ${netWorthCalc.netWorth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {formatCurrency(netWorthCalc.netWorth)}
                </p>
                <p className="text-sm text-gray-400 mt-2">Total Assets: {formatCurrency(netWorthCalc.totalAssets)}</p>
                <p className="text-sm text-red-400">Total Debt: {formatCurrency(netWorthCalc.debt)}</p>
              </div>
            </div>
          </CollapsibleTool>

          <CollapsibleTool
            title="Savings Goal Calculator"
            icon={<PiggyBank className="w-5 h-5" />}
            description="Calculate monthly savings needed to reach your goal"
          >
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Goal Amount</label>
                <input type="number" value={goalAmount} onChange={e => setGoalAmount(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Months to Goal</label>
                <input type="number" value={goalMonths} onChange={e => setGoalMonths(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Current Savings</label>
                <input type="number" value={goalCurrent} onChange={e => setGoalCurrent(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Savings Account Rate %</label>
                <input type="number" value={goalRate} onChange={e => setGoalRate(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div className="bg-gray-900 rounded-lg p-4 mt-4">
                <p className="text-sm text-gray-400">Monthly Savings Needed</p>
                <p className="text-2xl font-bold text-orange-400">{formatCurrency(savingsGoalCalc.monthlyWithInterest)}</p>
                <p className="text-sm text-gray-400 mt-2">Without interest: {formatCurrency(savingsGoalCalc.simpleMonthly)}/mo</p>
                <p className="text-sm text-gray-400">Remaining to save: {formatCurrency(savingsGoalCalc.remaining)}</p>
              </div>
            </div>
          </CollapsibleTool>

          <CollapsibleTool
            title="Inflation Calculator"
            icon={<Percent className="w-5 h-5" />}
            description="See how inflation affects purchasing power"
          >
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Amount Today</label>
                <input type="number" value={inflationAmount} onChange={e => setInflationAmount(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Years</label>
                  <input type="number" value={inflationYears} onChange={e => setInflationYears(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Inflation Rate %</label>
                  <input type="number" value={inflationRate} onChange={e => setInflationRate(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                </div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 mt-4">
                <p className="text-sm text-gray-400">Future Cost of Same Item</p>
                <p className="text-2xl font-bold text-red-400">{formatCurrency(inflationCalc.futureValue)}</p>
                <p className="text-sm text-gray-400 mt-2">Today's {formatCurrency(parseNumericInput(inflationAmount))} will feel like:</p>
                <p className="text-lg font-bold text-orange-400">{formatCurrency(inflationCalc.purchasingPower)}</p>
              </div>
            </div>
          </CollapsibleTool>

          <CollapsibleTool
            title="Tip Calculator"
            icon={<Receipt className="w-5 h-5" />}
            description="Calculate tips and split bills easily"
          >
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Bill Amount</label>
                <input type="number" value={tipBillAmount} onChange={e => setTipBillAmount(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Tip %</label>
                  <input type="number" value={tipPercent} onChange={e => setTipPercent(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Split Ways</label>
                  <input type="number" value={tipSplitWays} onChange={e => setTipSplitWays(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                </div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 mt-4">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <p className="text-xs text-gray-400">Tip</p>
                    <p className="text-lg font-bold text-green-400">{formatCurrency(tipCalc.tipAmount)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Total</p>
                    <p className="text-lg font-bold text-white">{formatCurrency(tipCalc.total)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Per Person</p>
                    <p className="text-lg font-bold text-orange-400">{formatCurrency(tipCalc.perPerson)}</p>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleTool>

          <CollapsibleTool
            title="Loan Comparison"
            icon={<Calculator className="w-5 h-5" />}
            description="Compare two loan options side by side"
          >
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Loan Amount</label>
                <input type="number" value={loanAmount} onChange={e => setLoanAmount(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-blue-400">Loan Option 1</p>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Rate %</label>
                    <input type="number" value={loan1Rate} onChange={e => setLoan1Rate(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Term (months)</label>
                    <input type="number" value={loan1Term} onChange={e => setLoan1Term(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm" />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-green-400">Loan Option 2</p>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Rate %</label>
                    <input type="number" value={loan2Rate} onChange={e => setLoan2Rate(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Term (months)</label>
                    <input type="number" value={loan2Term} onChange={e => setLoan2Term(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-gray-900 rounded-lg p-3">
                  <p className="text-xs text-blue-400 font-medium">Option 1</p>
                  <p className="text-lg font-bold text-white">{formatCurrency(loanCompareCalc.pmt1)}/mo</p>
                  <p className="text-xs text-gray-400">Total: {formatCurrency(loanCompareCalc.total1)}</p>
                  <p className="text-xs text-red-400">Interest: {formatCurrency(loanCompareCalc.interest1)}</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-3">
                  <p className="text-xs text-green-400 font-medium">Option 2</p>
                  <p className="text-lg font-bold text-white">{formatCurrency(loanCompareCalc.pmt2)}/mo</p>
                  <p className="text-xs text-gray-400">Total: {formatCurrency(loanCompareCalc.total2)}</p>
                  <p className="text-xs text-red-400">Interest: {formatCurrency(loanCompareCalc.interest2)}</p>
                </div>
              </div>
              <p className="text-sm text-center mt-2">
                {loanCompareCalc.savings > 0 ? (
                  <span className="text-green-400">Option 2 saves {formatCurrency(loanCompareCalc.savings)} total</span>
                ) : loanCompareCalc.savings < 0 ? (
                  <span className="text-green-400">Option 1 saves {formatCurrency(Math.abs(loanCompareCalc.savings))} total</span>
                ) : (
                  <span className="text-gray-400">Both options cost the same</span>
                )}
              </p>
            </div>
          </CollapsibleTool>

          <CollapsibleTool
            title="Investment Return Calculator"
            icon={<TrendingUp className="w-5 h-5" />}
            description="Calculate your actual investment returns"
          >
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Initial Investment</label>
                <input type="number" value={invInitial} onChange={e => setInvInitial(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Current Value</label>
                <input type="number" value={invFinal} onChange={e => setInvFinal(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Years Held</label>
                <input type="number" value={invYears} onChange={e => setInvYears(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div className="bg-gray-900 rounded-lg p-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400">Total Return</p>
                    <p className={`text-xl font-bold ${investmentReturnCalc.totalReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {investmentReturnCalc.totalReturn.toFixed(2)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Annualized Return</p>
                    <p className={`text-xl font-bold ${investmentReturnCalc.annualReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {investmentReturnCalc.annualReturn.toFixed(2)}%
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mt-3">
                  Gain/Loss: <span className={investmentReturnCalc.gain >= 0 ? 'text-green-400' : 'text-red-400'}>
                    {formatCurrency(investmentReturnCalc.gain)}
                  </span>
                </p>
              </div>
            </div>
          </CollapsibleTool>

          <CollapsibleTool
            title="Break-Even Calculator"
            icon={<Briefcase className="w-5 h-5" />}
            description="Calculate break-even point for business decisions"
          >
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Fixed Costs</label>
                <input type="number" value={beFixedCosts} onChange={e => setBeFixedCosts(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Price per Unit</label>
                  <input type="number" value={bePrice} onChange={e => setBePrice(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Variable Cost per Unit</label>
                  <input type="number" value={beVariableCost} onChange={e => setBeVariableCost(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                </div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 mt-4">
                <p className="text-sm text-gray-400">Break-Even Point</p>
                <p className="text-2xl font-bold text-orange-400">{breakEvenCalc.breakEvenUnits.toLocaleString()} units</p>
                <p className="text-sm text-gray-400 mt-2">Revenue needed: {formatCurrency(breakEvenCalc.breakEvenRevenue)}</p>
                <p className="text-sm text-green-400">Profit margin per unit: {formatCurrency(breakEvenCalc.margin)}</p>
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
