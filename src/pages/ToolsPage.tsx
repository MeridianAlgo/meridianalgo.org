import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ArrowLeft, DollarSign, PiggyBank, CreditCard, ChevronLeft, Menu } from 'lucide-react';

const Card: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
    <div className="flex items-center space-x-3 mb-4">
      <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center text-orange-400">
        {icon}
      </div>
      <h2 className="text-xl font-bold text-white">{title}</h2>
    </div>
    {children}
  </div>
);

function formatCurrency(n: number) {
  if (!isFinite(n)) return '-';
  return n.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

const ToolsPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(() => (typeof window !== 'undefined' ? window.innerWidth >= 768 : true));

  useEffect(() => {
    document.title = 'MeridianAlgo - Tools & Calculators';
  }, []);

  // Budget Planner
  const [income, setIncome] = useState<number>(4000);
  const [needs, setNeeds] = useState<number>(50); // %
  const [wants, setWants] = useState<number>(30); // %
  const [savings, setSavings] = useState<number>(20); // %
  const budgetChecks = needs + wants + savings;
  const needsAmt = useMemo(() => (income * needs) / 100, [income, needs]);
  const wantsAmt = useMemo(() => (income * wants) / 100, [income, wants]);
  const savingsAmt = useMemo(() => (income * savings) / 100, [income, savings]);

  // Savings Goal
  const [goal, setGoal] = useState<number>(10000);
  const [initial, setInitial] = useState<number>(1000);
  const [monthly, setMonthly] = useState<number>(300);
  const [apy, setApy] = useState<number>(3.5); // %
  const monthsToGoal = useMemo(() => {
    const r = apy / 100 / 12;
    let bal = initial;
    let m = 0;
    while (bal < goal && m < 1200) {
      bal = bal * (1 + r) + monthly;
      m++;
    }
    return bal >= goal ? m : Infinity;
  }, [goal, initial, monthly, apy]);

  // Debt Payoff (Snowball)
  const [balance, setBalance] = useState<number>(5000);
  const [apr, setApr] = useState<number>(19.99); // %
  const [minPay, setMinPay] = useState<number>(150);
  const [extraPay, setExtraPay] = useState<number>(100);
  const payoff = useMemo(() => {
    let bal = balance;
    let monthlyRate = apr / 100 / 12;
    let month = 0;
    let totalInterest = 0;
    const schedule: { month: number; interest: number; principal: number; balance: number }[] = [];
    const payment = Math.max(minPay + extraPay, bal * monthlyRate + 1); // avoid negative amortization
    while (bal > 0 && month < 1200) {
      const interest = bal * monthlyRate;
      const principal = Math.min(payment - interest, bal);
      bal = Math.max(0, bal + interest - principal);
      totalInterest += interest;
      month++;
      if (month <= 12) schedule.push({ month, interest, principal, balance: bal });
    }
    return { months: month, totalInterest, schedule };
  }, [balance, apr, minPay, extraPay]);

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar placeholder spacing for platform consistency */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-800 border-r border-gray-700 transition-all duration-300 flex flex-col fixed h-full z-10`}>
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <Link to="/learning" className={`flex items-center ${!sidebarOpen && 'justify-center'}`}>
              <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-yellow-600 rounded-xl flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              {sidebarOpen && (
                <span className="ml-3 text-xl font-bold text-white">Tools</span>
              )}
            </Link>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 hover:bg-gray-700 rounded-lg transition-colors text-gray-300 hover:text-white"
            >
              {sidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`flex-1 overflow-y-auto ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/learning" className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-300 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">Financial Tools & Calculators</h1>
                <p className="text-gray-300">Interactive calculators to plan, learn, and experiment</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Budget Planner */}
            <Card title="50/30/20 Budget Planner" icon={<DollarSign className="w-5 h-5" />}> 
              <div className="space-y-3">
                <label className="block text-sm text-gray-300">Monthly Take-Home Income</label>
                <input type="number" value={income} onChange={e => setIncome(Number(e.target.value))} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-gray-400">Needs %</label>
                    <input type="number" value={needs} onChange={e => setNeeds(Number(e.target.value))} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400">Wants %</label>
                    <input type="number" value={wants} onChange={e => setWants(Number(e.target.value))} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400">Savings %</label>
                    <input type="number" value={savings} onChange={e => setSavings(Number(e.target.value))} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                  </div>
                </div>
                <p className={`text-xs ${budgetChecks === 100 ? 'text-green-400' : 'text-red-400'}`}>Percentages must add up to 100%. Current: {budgetChecks}%</p>
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

            {/* Savings Goal */}
            <Card title="Savings Goal Timeline" icon={<PiggyBank className="w-5 h-5" />}> 
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-400">Goal Amount</label>
                    <input type="number" value={goal} onChange={e => setGoal(Number(e.target.value))} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400">Initial Savings</label>
                    <input type="number" value={initial} onChange={e => setInitial(Number(e.target.value))} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-400">Monthly Contribution</label>
                    <input type="number" value={monthly} onChange={e => setMonthly(Number(e.target.value))} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400">APY %</label>
                    <input type="number" value={apy} onChange={e => setApy(Number(e.target.value))} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                  </div>
                </div>
                <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                  <p className="text-xs text-gray-400">Estimated Time to Goal</p>
                  <p className="text-white font-semibold">{monthsToGoal === Infinity ? 'Not reachable with current inputs' : `${monthsToGoal} months (~${Math.round(monthsToGoal/12)} years)`}</p>
                </div>
              </div>
            </Card>

            {/* Debt Payoff */}
            <Card title="Debt Payoff (Snowball)" icon={<CreditCard className="w-5 h-5" />}> 
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-400">Balance</label>
                    <input type="number" value={balance} onChange={e => setBalance(Number(e.target.value))} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400">APR %</label>
                    <input type="number" value={apr} onChange={e => setApr(Number(e.target.value))} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-400">Minimum Payment</label>
                    <input type="number" value={minPay} onChange={e => setMinPay(Number(e.target.value))} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400">Extra Payment</label>
                    <input type="number" value={extraPay} onChange={e => setExtraPay(Number(e.target.value))} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                    <p className="text-xs text-gray-400">Months to Payoff</p>
                    <p className="text-white font-semibold">{payoff.months}</p>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                    <p className="text-xs text-gray-400">Total Interest</p>
                    <p className="text-white font-semibold">{formatCurrency(payoff.totalInterest)}</p>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;
