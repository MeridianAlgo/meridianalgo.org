import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calculator, Activity, TrendingUp, DollarSign, Home, CreditCard, Briefcase, GraduationCap } from 'lucide-react';

// Utility function for parsing numeric inputs
const parseNumericInput = (value: string): number | null => {
  const parsed = parseFloat(value);
  return !isNaN(parsed) ? parsed : null;
};

// Format currency values
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Card component for tools
interface CardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  children: React.ReactNode;
}

const Card = ({ title, icon, description, children }: CardProps) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
      <div className="p-5">
        <div className="flex items-center mb-3">
          <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400 mr-3">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="text-sm text-gray-400">{description}</p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

const PublicToolsPage = () => {
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

  // Emergency Fund
  const [monthlyExpenses, setMonthlyExpenses] = useState<string>('3200');
  const [coverageMonths, setCoverageMonths] = useState<string>('6');
  const [emergencySavings, setEmergencySavings] = useState<string>('5000');
  const emergencyPlan = useMemo(() => {
    const expenses = parseNumericInput(monthlyExpenses) || 0;
    const months = Math.max(parseNumericInput(coverageMonths) || 0, 0);
    const savings = parseNumericInput(emergencySavings) || 0;
    const target = expenses * months;
    const shortfall = Math.max(0, target - savings);
    const percentComplete = target > 0 ? Math.min(100, (savings / target) * 100) : 0;
    return { target, shortfall, percentComplete };
  }, [monthlyExpenses, coverageMonths, emergencySavings]);
  
  // Mortgage Calculator
  const [homePrice, setHomePrice] = useState<string>('300000');
  const [downPayment, setDownPayment] = useState<string>('60000');
  const [interestRate, setInterestRate] = useState<string>('4.5');
  const [loanTerm, setLoanTerm] = useState<string>('30');
  const mortgageCalculation = useMemo(() => {
    const price = parseNumericInput(homePrice) || 0;
    const down = parseNumericInput(downPayment) || 0;
    const rate = parseNumericInput(interestRate) || 0;
    const years = parseNumericInput(loanTerm) || 30;
    
    const loanAmount = price - down;
    const monthlyRate = rate / 100 / 12;
    const payments = years * 12;
    
    let monthlyPayment = 0;
    if (monthlyRate > 0) {
      monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, payments)) / (Math.pow(1 + monthlyRate, payments) - 1);
    } else {
      monthlyPayment = loanAmount / payments;
    }
    
    const totalPayment = monthlyPayment * payments;
    const totalInterest = totalPayment - loanAmount;
    
    return { monthlyPayment, totalPayment, totalInterest, loanAmount };
  }, [homePrice, downPayment, interestRate, loanTerm]);
  
  // Debt Payoff Calculator
  const [debtAmount, setDebtAmount] = useState<string>('10000');
  const [debtInterestRate, setDebtInterestRate] = useState<string>('18');
  const [monthlyPayment, setMonthlyPayment] = useState<string>('500');
  const debtPayoff = useMemo(() => {
    const principal = parseNumericInput(debtAmount) || 0;
    const rate = parseNumericInput(debtInterestRate) || 0;
    const payment = parseNumericInput(monthlyPayment) || 0;
    
    const monthlyRate = rate / 100 / 12;
    
    let balance = principal;
    let months = 0;
    let totalInterest = 0;
    
    if (payment > 0 && principal > 0) {
      while (balance > 0 && months < 600) {
        const interest = balance * monthlyRate;
        totalInterest += interest;
        
        const principalPayment = Math.min(payment, balance + interest);
        balance = balance + interest - principalPayment;
        
        months++;
      }
    }
    
    return { months, totalInterest, totalPayment: principal + totalInterest };
  }, [debtAmount, debtInterestRate, monthlyPayment]);
  
  // Education Savings Calculator
  const [collegeCost, setCollegeCost] = useState<string>('25000');
  const [yearsUntilCollege, setYearsUntilCollege] = useState<string>('10');
  const [currentSavings, setCurrentSavings] = useState<string>('5000');
  const [monthlySavings, setMonthlySavings] = useState<string>('300');
  const [educationReturn, setEducationReturn] = useState<string>('5');
  const educationSavings = useMemo(() => {
    const cost = parseNumericInput(collegeCost) || 0;
    const years = Math.max(parseNumericInput(yearsUntilCollege) || 0, 0);
    const current = parseNumericInput(currentSavings) || 0;
    const monthly = parseNumericInput(monthlySavings) || 0;
    const returnRate = parseNumericInput(educationReturn) || 0;
    
    const months = years * 12;
    const monthlyRate = returnRate / 100 / 12;
    
    let futureValue = current;
    if (monthlyRate > 0) {
      futureValue *= Math.pow(1 + monthlyRate, months);
      futureValue += monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    } else {
      futureValue += monthly * months;
    }
    
    const shortfall = Math.max(0, cost - futureValue);
    const percentFunded = cost > 0 ? Math.min(100, (futureValue / cost) * 100) : 0;
    
    return { futureValue, shortfall, percentFunded };
  }, [collegeCost, yearsUntilCollege, currentSavings, monthlySavings, educationReturn]);

  return (
    <>
      <Helmet>
        <title>Financial Tools | MeridianAlgo</title>
        <meta name="description" content="Free financial calculators and tools to help you plan your budget, investments, and more." />
      </Helmet>

      <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-48 pb-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                Financial Tools
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Free calculators to help you plan your budget, track savings goals, and visualize your financial future.
            </p>
          </div>

          {/* Tools Sections */}
          <div className="space-y-16">
            {/* Budgeting Section */}
            <section>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-white">Budgeting Tools</h2>
                  <p className="text-sm text-gray-400">Plan your spending and saving with these simple calculators.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <Card
                  title="50/30/20 Budget Calculator"
                  icon={<Calculator className="w-5 h-5" />}
                  description="Allocate your income using the popular 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings."
                >
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-gray-400">Monthly After-Tax Income</label>
                      <input
                        type="number"
                        value={income}
                        onChange={e => setIncome(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
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
                        <label className="block text-xs text-gray-400">Target Months of Coverage</label>
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
                    <div>
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{Math.round(emergencyPlan.percentComplete)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${emergencyPlan.percentComplete}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                        <p className="text-xs text-gray-400">Target Amount</p>
                        <p className="text-white font-semibold">{formatCurrency(emergencyPlan.target)}</p>
                      </div>
                      <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                        <p className="text-xs text-gray-400">Shortfall</p>
                        <p className="text-white font-semibold">{formatCurrency(emergencyPlan.shortfall)}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </section>

            {/* Housing Section */}
            <section>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-white">Housing Tools</h2>
                  <p className="text-sm text-gray-400">Plan your home purchase and understand mortgage costs.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <Card
                  title="Mortgage Calculator"
                  icon={<Home className="w-5 h-5" />}
                  description="Calculate your monthly mortgage payment, total interest, and more."
                >
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-400">Home Price</label>
                        <input
                          type="number"
                          value={homePrice}
                          onChange={e => setHomePrice(e.target.value)}
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
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-400">Interest Rate %</label>
                        <input
                          type="number"
                          value={interestRate}
                          onChange={e => setInterestRate(e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400">Loan Term (Years)</label>
                        <input
                          type="number"
                          value={loanTerm}
                          onChange={e => setLoanTerm(e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                        <p className="text-xs text-gray-400">Monthly Payment</p>
                        <p className="text-white font-semibold">{formatCurrency(mortgageCalculation.monthlyPayment)}</p>
                      </div>
                      <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                        <p className="text-xs text-gray-400">Total Interest</p>
                        <p className="text-white font-semibold">{formatCurrency(mortgageCalculation.totalInterest)}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </section>

            {/* Debt Section */}
            <section>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-white">Debt Management Tools</h2>
                  <p className="text-sm text-gray-400">Plan your debt payoff strategy and save on interest.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <Card
                  title="Debt Payoff Calculator"
                  icon={<CreditCard className="w-5 h-5" />}
                  description="See how quickly you can pay off debt and how much interest you'll save."
                >
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-400">Debt Amount</label>
                        <input
                          type="number"
                          value={debtAmount}
                          onChange={e => setDebtAmount(e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400">Interest Rate %</label>
                        <input
                          type="number"
                          value={debtInterestRate}
                          onChange={e => setDebtInterestRate(e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400">Monthly Payment</label>
                      <input
                        type="number"
                        value={monthlyPayment}
                        onChange={e => setMonthlyPayment(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-3 mt-2">
                      <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                        <p className="text-xs text-gray-400">Months to Payoff</p>
                        <p className="text-white font-semibold">{debtPayoff.months}</p>
                      </div>
                      <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                        <p className="text-xs text-gray-400">Total Interest</p>
                        <p className="text-white font-semibold">{formatCurrency(debtPayoff.totalInterest)}</p>
                      </div>
                      <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                        <p className="text-xs text-gray-400">Total Payment</p>
                        <p className="text-white font-semibold">{formatCurrency(debtPayoff.totalPayment)}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </section>

            {/* Education Section */}
            <section>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-white">Education Planning Tools</h2>
                  <p className="text-sm text-gray-400">Plan for education expenses and save for the future.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <Card
                  title="College Savings Calculator"
                  icon={<GraduationCap className="w-5 h-5" />}
                  description="Plan your education savings to meet future college expenses."
                >
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-400">Expected College Cost</label>
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
                          value={yearsUntilCollege}
                          onChange={e => setYearsUntilCollege(e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs text-gray-400">Current Savings</label>
                        <input
                          type="number"
                          value={currentSavings}
                          onChange={e => setCurrentSavings(e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400">Monthly Savings</label>
                        <input
                          type="number"
                          value={monthlySavings}
                          onChange={e => setMonthlySavings(e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400">Return Rate %</label>
                        <input
                          type="number"
                          value={educationReturn}
                          onChange={e => setEducationReturn(e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{Math.round(educationSavings.percentFunded)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${educationSavings.percentFunded}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                        <p className="text-xs text-gray-400">Projected Savings</p>
                        <p className="text-white font-semibold">{formatCurrency(educationSavings.futureValue)}</p>
                      </div>
                      <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                        <p className="text-xs text-gray-400">Shortfall</p>
                        <p className="text-white font-semibold">{formatCurrency(educationSavings.shortfall)}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </section>

            {/* Investing Section */}
            <section>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-white">Investing Tools</h2>
                  <p className="text-sm text-gray-400">Project your investment growth and plan for the future.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <Card
                  title="Investment Growth Calculator"
                  icon={<TrendingUp className="w-5 h-5" />}
                  description="See how your investments could grow over time with regular contributions and compound returns."
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

            {/* CTA Section - Hidden */}
            {/* <section className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Want Access to More Advanced Tools?</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Sign up for a free account to unlock our full suite of financial calculators, including retirement planning, 
                debt payoff strategies, mortgage affordability, and more.
              </p>
              <a 
                href="/login" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <DollarSign className="w-5 h-5 mr-2" />
                Create Free Account
              </a>
            </section> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicToolsPage;