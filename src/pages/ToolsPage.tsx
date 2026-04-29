import React, { useEffect, useMemo, useState } from 'react';

import {
  DollarSign, PiggyBank, CreditCard, Home, TrendingUp,
  Calculator, Receipt, Shield, Briefcase, ChevronDown
} from 'lucide-react';
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
  useEffect(() => {
    document.title = 'MeridianAlgo - Tools & Calculators';
  }, []);



  const scrollToContent = () => {
    const content = document.getElementById('tools-start');
    if (content) {
      content.scrollIntoView({ behavior: 'smooth' });
    }
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
    let futureValue = P * Math.pow(1 + r, n);
    if (r > 0) {
      futureValue += PMT * ((Math.pow(1 + r, n) - 1) / r);
    } else {
      futureValue += PMT * n;
    }
    const totalContributions = P + PMT * n;
    return { futureValue, totalContributions, earnings: futureValue - totalContributions };
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
    const monthlyIncomeValue = income / 12;
    const front = monthlyIncomeValue * 0.28;
    const back = monthlyIncomeValue * 0.36 - debt;
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
    const futureValue = totalAnnual * ((Math.pow(1 + returnRate, years) - 1) / returnRate);
    return { annualContrib, annualMatch, futureValue };
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
    const maxMonthly = (income / 12) * 0.15; // 15% rule
    const loanAmountValue = rate > 0 ? (maxMonthly * (1 - Math.pow(1 + rate, -months))) / rate : maxMonthly * months;
    return { maxMonthly, maxCarPrice: loanAmountValue + down };
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
    const annualIncomeValue = balance * rate;
    return { annualIncome: annualIncomeValue, monthlyIncome: annualIncomeValue / 12 };
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
    const taxSavingsValue = contrib * taxRate;
    const futureValue = contrib * ((Math.pow(1 + returnRate, years) - 1) / returnRate);
    return { taxSavings: taxSavingsValue, futureValue, totalSavings: taxSavingsValue * years };
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
    const returnRateValue = parseNumericInput(collegeReturn) / 100 || 0;
    const futureCostValue = cost * Math.pow(1.04, years); // 4% inflation
    const r = returnRateValue / 12;
    const n = years * 12;
    let futureValue = current * Math.pow(1 + r, n);
    if (r > 0) {
      futureValue += (monthly * (Math.pow(1 + r, n) - 1)) / r;
    } else {
      futureValue += monthly * n;
    }
    return { futureCost: futureCostValue, future: futureValue, gap: Math.max(0, futureCostValue - futureValue) };
  }, [collegeCost, collegeYears, collegeSavings, collegeMonthly, collegeReturn]);

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
    const federalTaxValue = gross * federal;
    const stateTaxValue = gross * state;
    const ficaTaxValue = gross * fica;
    const retirementValue = gross * k401;
    const totalDeductionsValue = federalTaxValue + stateTaxValue + ficaTaxValue + retirementValue;
    const netPayValue = gross - totalDeductionsValue;
    return { federalTax: federalTaxValue, stateTax: stateTaxValue, ficaTax: ficaTaxValue, retirement: retirementValue, totalDeductions: totalDeductionsValue, netPay: netPayValue };
  }, [paycheckGross, paycheckFederal, paycheckState, paycheck401k]);

  // Net Worth
  const [totalAssets, setTotalAssets] = useState('150000');
  const [totalLiabilities, setTotalLiabilities] = useState('80000');
  const netWorthCalc = useMemo(() => {
    const assets = parseNumericInput(totalAssets) || 0;
    const liab = parseNumericInput(totalLiabilities) || 0;
    return { netWorth: assets - liab, ratio: liab > 0 ? (assets / liab).toFixed(2) : '∞' };
  }, [totalAssets, totalLiabilities]);

  // Savings Goal
  const [goalTarget, setGoalTarget] = useState('20000');
  const [goalCurrent, setGoalCurrent] = useState('5000');
  const [goalMonthly, setGoalMonthly] = useState('500');
  const [goalRate, setGoalRate] = useState('4');
  const goalCalc = useMemo(() => {
    const target = parseNumericInput(goalTarget) || 0;
    const current = parseNumericInput(goalCurrent) || 0;
    const monthly = parseNumericInput(goalMonthly) || 0;
    const r = (parseNumericInput(goalRate) || 0) / 100 / 12;
    let balance = current;
    let months = 0;
    while (balance < target && months < 600) {
      balance = balance * (1 + r) + monthly;
      months++;
    }
    return { months, years: (months / 12).toFixed(1) };
  }, [goalTarget, goalCurrent, goalMonthly, goalRate]);

  // Inflation Calculator
  const [inflationAmount, setInflationAmount] = useState('100000');
  const [inflationYears, setInflationYears] = useState('20');
  const [inflationRate, setInflationRate] = useState('3');
  const inflationCalc = useMemo(() => {
    const amount = parseNumericInput(inflationAmount) || 0;
    const years = parseNumericInput(inflationYears) || 0;
    const rate = (parseNumericInput(inflationRate) || 0) / 100;
    return {
      futureNeeded: amount * Math.pow(1 + rate, years),
      todayPower: amount / Math.pow(1 + rate, years),
    };
  }, [inflationAmount, inflationYears, inflationRate]);

  // Dividend Income
  const [divInvested, setDivInvested] = useState('50000');
  const [divYield, setDivYield] = useState('3.5');
  const [divYears, setDivYears] = useState('10');
  const divCalc = useMemo(() => {
    const invested = parseNumericInput(divInvested) || 0;
    const yieldPct = (parseNumericInput(divYield) || 0) / 100;
    const years = parseNumericInput(divYears) || 0;
    const annualDiv = invested * yieldPct;
    let balance = invested;
    for (let i = 0; i < years; i++) balance += balance * yieldPct;
    return { annualDiv, monthlyDiv: annualDiv / 12, dripValue: balance };
  }, [divInvested, divYield, divYears]);

  // Dollar Cost Averaging
  const [dcaMonthly, setDcaMonthly] = useState('500');
  const [dcaYears, setDcaYears] = useState('10');
  const [dcaReturn, setDcaReturn] = useState('8');
  const [dcaInitial, setDcaInitial] = useState('1000');
  const dcaCalc = useMemo(() => {
    const monthly = parseNumericInput(dcaMonthly) || 0;
    const years = parseNumericInput(dcaYears) || 0;
    const r = (parseNumericInput(dcaReturn) || 0) / 100 / 12;
    const initial = parseNumericInput(dcaInitial) || 0;
    const n = years * 12;
    let fv = initial * Math.pow(1 + r, n);
    fv += r > 0 ? monthly * ((Math.pow(1 + r, n) - 1) / r) : monthly * n;
    const totalContrib = initial + monthly * n;
    return { futureValue: fv, totalContrib, gain: fv - totalContrib };
  }, [dcaMonthly, dcaYears, dcaReturn, dcaInitial]);

  // Salary Converter
  const [salaryAnnual, setSalaryAnnual] = useState('75000');
  const [salaryHours, setSalaryHours] = useState('40');
  const salaryCalc = useMemo(() => {
    const annual = parseNumericInput(salaryAnnual) || 0;
    const hours = parseNumericInput(salaryHours) || 40;
    return {
      monthly: annual / 12,
      biweekly: annual / 26,
      weekly: annual / 52,
      hourly: annual / (hours * 52),
    };
  }, [salaryAnnual, salaryHours]);

  // Break-Even
  const [beFixed, setBeFixed] = useState('50000');
  const [bePrice, setBePrice] = useState('100');
  const [beVariable, setBeVariable] = useState('60');
  const beCalc = useMemo(() => {
    const fixed = parseNumericInput(beFixed) || 0;
    const price = parseNumericInput(bePrice) || 0;
    const variable = parseNumericInput(beVariable) || 0;
    const margin = price - variable;
    const units = margin > 0 ? Math.ceil(fixed / margin) : Infinity;
    return { units, revenue: isFinite(units) ? units * price : Infinity, margin };
  }, [beFixed, bePrice, beVariable]);

  // Tip Calculator
  const [tipBill, setTipBill] = useState('85');
  const [tipPct, setTipPct] = useState('20');
  const [tipPeople, setTipPeople] = useState('4');
  const tipCalc = useMemo(() => {
    const bill = parseNumericInput(tipBill) || 0;
    const pct = (parseNumericInput(tipPct) || 0) / 100;
    const people = Math.max(1, parseNumericInput(tipPeople) || 1);
    const tip = bill * pct;
    const total = bill + tip;
    return { tip, total, perPerson: total / people, tipPerPerson: tip / people };
  }, [tipBill, tipPct, tipPeople]);

  // Loan Comparison
  const [loanAmt, setLoanAmt] = useState('25000');
  const [loanRate1, setLoanRate1] = useState('5.5');
  const [loanTerm1, setLoanTerm1] = useState('60');
  const [loanRate2, setLoanRate2] = useState('7.5');
  const [loanTerm2, setLoanTerm2] = useState('72');
  const loanCompCalc = useMemo(() => {
    const p = parseNumericInput(loanAmt) || 0;
    const calcLoan = (ratePct: string, termMonths: string) => {
      const r = (parseNumericInput(ratePct) || 0) / 100 / 12;
      const n = parseNumericInput(termMonths) || 0;
      const pmt = r > 0 ? (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : p / n;
      return { pmt, total: pmt * n, interest: pmt * n - p };
    };
    return { a: calcLoan(loanRate1, loanTerm1), b: calcLoan(loanRate2, loanTerm2) };
  }, [loanAmt, loanRate1, loanTerm1, loanRate2, loanTerm2]);

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 [background-image:radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-400/10 blur-[100px] rounded-full pointer-events-none"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400/20 to-yellow-500/20 rounded-2xl mb-8 border border-white/5">
            <Calculator className="w-10 h-10 text-orange-300" />
          </div>

          <h1 className="text-4xl md:text-7xl font-display font-bold mb-6 leading-tight uppercase tracking-tight text-white">
            Financial <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-yellow-400">Tools</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-300 to-yellow-400 mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light mb-10">
            Interactive calculators to plan, experiment, and optimize your financial future.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer animate-bounce">
          <button onClick={scrollToContent} className="text-gray-500 hover:text-white transition-colors">
            <ChevronDown className="w-8 h-8" />
          </button>
        </div>
      </section>

      <div id="tools-start" className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-24">
          {/* Section: Budget & Cash Flow */}
          <section>
            <div className="flex items-center space-x-4 mb-8 justify-center">
              <DollarSign className="w-8 h-8 text-orange-300" />
              <h2 className="text-3xl font-display font-bold text-white uppercase tracking-tight">Budget & Cash Flow</h2>
            </div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent mb-12"></div>

            <div className="grid gap-6 md:grid-cols-2 items-start">
              <CollapsibleTool
                title="50/30/20 Budget Planner"
                icon={<DollarSign className="w-5 h-5" />}
                description="Balance your spending with the popular 50/30/20 rule"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Monthly Income</label>
                    <input type="number" value={income} onChange={e => setIncome(e.target.value)}
                      className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-orange-300 focus:outline-none transition-all" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Needs %</label>
                      <input type="number" value={needs} onChange={e => setNeeds(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-orange-300" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Wants %</label>
                      <input type="number" value={wants} onChange={e => setWants(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-orange-300" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Savings %</label>
                      <input type="number" value={savings} onChange={e => setSavings(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-orange-300" />
                    </div>
                  </div>
                  <p className={`text-xs text-center font-mono ${budgetCalc.balanced ? 'text-green-400' : 'text-red-400'}`}>
                    {budgetCalc.balanced ? '✓ Balanced' : '✗ Must equal 100%'}
                  </p>
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="bg-white/5 rounded-xl p-4 text-center">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Needs</p>
                      <p className="text-white font-bold">{formatCurrency(budgetCalc.needsAmt)}</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 text-center">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Wants</p>
                      <p className="text-white font-bold">{formatCurrency(budgetCalc.wantsAmt)}</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 text-center">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Savings</p>
                      <p className="text-white font-bold">{formatCurrency(budgetCalc.savingsAmt)}</p>
                    </div>
                  </div>
                </div>
              </CollapsibleTool>

              <CollapsibleTool
                title="Emergency Fund Calculator"
                icon={<Shield className="w-5 h-5" />}
                description="Calculate how much you need for financial emergencies"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Monthly Expenses</label>
                    <input type="number" value={monthlyExpenses} onChange={e => setMonthlyExpenses(e.target.value)}
                      className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-orange-300" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Months of Coverage</label>
                    <input type="number" value={coverageMonths} onChange={e => setCoverageMonths(e.target.value)}
                      className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-orange-300" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Current Savings</label>
                    <input type="number" value={emergencySavings} onChange={e => setEmergencySavings(e.target.value)}
                      className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-orange-300" />
                  </div>
                  <div className="bg-white/5 rounded-xl p-6 mt-4 border border-white/5">
                    <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">Target Fund</p>
                    <p className="text-3xl font-bold text-white mb-2">{formatCurrency(emergencyCalc.target)}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-orange-300">Gap: {formatCurrency(emergencyCalc.gap)}</span>
                      <span className="text-gray-400">{emergencyCalc.monthsCovered.toFixed(1)} months ready</span>
                    </div>
                  </div>
                </div>
              </CollapsibleTool>
            </div>
          </section>

          {/* Section: Saving & Investing */}
          <section>
            <div className="flex items-center space-x-4 mb-8 justify-center">
              <TrendingUp className="w-8 h-8 text-orange-300" />
              <h2 className="text-3xl font-display font-bold text-white uppercase tracking-tight">Saving & Investing</h2>
            </div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent mb-12"></div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start">
              <CollapsibleTool
                title="Compound Interest"
                icon={<TrendingUp className="w-5 h-5" />}
                description="See the power of compounding"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Initial</label>
                    <input type="number" value={compoundInitial} onChange={e => setCompoundInitial(e.target.value)}
                      className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Monthly +</label>
                      <input type="number" value={compoundMonthly} onChange={e => setCompoundMonthly(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Years</label>
                      <input type="number" value={compoundYears} onChange={e => setCompoundYears(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Rate %</label>
                    <input type="number" value={compoundRate} onChange={e => setCompoundRate(e.target.value)}
                      className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Future Value</p>
                    <p className="text-2xl font-bold text-green-400">{formatCurrency(compoundCalc.futureValue)}</p>
                  </div>
                </div>
              </CollapsibleTool>

              <CollapsibleTool
                title="Roth vs Trad IRA"
                icon={<PiggyBank className="w-5 h-5" />}
                description="Compare retirement accounts"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Annual Contribution</label>
                    <input type="number" value={iraContribution} onChange={e => setIraContribution(e.target.value)}
                      className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Tax Rate %</label>
                      <input type="number" value={iraTaxRate} onChange={e => setIraTaxRate(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Years</label>
                      <input type="number" value={iraYears} onChange={e => setIraYears(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Return %</label>
                      <input type="number" value={iraReturn} onChange={e => setIraReturn(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white" />
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Roth Advantage</p>
                    <p className="text-2xl font-bold text-orange-300">{formatCurrency(Math.abs(iraCalc.difference))}</p>
                  </div>
                </div>
              </CollapsibleTool>

              <CollapsibleTool
                title="401(k) Match"
                icon={<Briefcase className="w-5 h-5" />}
                description="Employer match bonuses"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Annual Salary</label>
                    <input type="number" value={k401Salary} onChange={e => setK401Salary(e.target.value)}
                      className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Your Contrib %</label>
                      <input type="number" value={k401Contribution} onChange={e => setK401Contribution(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Match %</label>
                      <input type="number" value={k401Match} onChange={e => setK401Match(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Years</label>
                      <input type="number" value={k401Years} onChange={e => setK401Years(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Return %</label>
                      <input type="number" value={k401Return} onChange={e => setK401Return(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Pot. Future Value</p>
                    <p className="text-2xl font-bold text-blue-400">{formatCurrency(k401Calc.futureValue)}</p>
                    <p className="text-xs text-gray-500 mt-1">based on {formatCurrency(k401Calc.annualMatch)}/yr match</p>
                  </div>
                </div>
              </CollapsibleTool>
            </div>
          </section>

          {/* Section: Debt & Loans */}
          <section>
            <div className="flex items-center space-x-4 mb-8 justify-center">
              <CreditCard className="w-8 h-8 text-orange-300" />
              <h2 className="text-3xl font-display font-bold text-white uppercase tracking-tight">Debt & Loans</h2>
            </div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent mb-12"></div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start">
              <CollapsibleTool
                title="Debt Payoff"
                icon={<CreditCard className="w-5 h-5" />}
                description="Plan your debt freedom"
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Balance</label>
                      <input type="number" value={debtBalance} onChange={e => setDebtBalance(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">APR %</label>
                      <input type="number" value={debtAPR} onChange={e => setDebtAPR(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Min Pay</label>
                      <input type="number" value={debtMinPay} onChange={e => setDebtMinPay(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Extra</label>
                      <input type="number" value={debtExtra} onChange={e => setDebtExtra(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Time to Payoff</p>
                    <p className="text-2xl font-bold text-white">{debtCalc.months} months</p>
                    <p className="text-xs text-gray-500 mt-1">Total Paid: {formatCurrency(debtCalc.totalPaid)}</p>
                  </div>
                </div>
              </CollapsibleTool>

              <CollapsibleTool
                title="Mortgage Affordability"
                icon={<Home className="w-5 h-5" />}
                description="How much house can you afford?"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Annual Income</label>
                    <input type="number" value={annualIncome} onChange={e => setAnnualIncome(e.target.value)}
                      className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Mth Loan Debt</label>
                      <input type="number" value={monthlyDebt} onChange={e => setMonthlyDebt(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Down Pmt</label>
                      <input type="number" value={downPayment} onChange={e => setDownPayment(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Interest Rate %</label>
                    <input type="number" value={mortgageRate} onChange={e => setMortgageRate(e.target.value)}
                      className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Max Home Price</p>
                    <p className="text-2xl font-bold text-green-400">{formatCurrency(mortgageCalc.homePrice)}</p>
                  </div>
                </div>
              </CollapsibleTool>

              <CollapsibleTool
                title="Car Affordability"
                icon={<Calculator className="w-5 h-5" />}
                description="15% income rule"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Income</label>
                    <input type="number" value={carIncome} onChange={e => setCarIncome(e.target.value)}
                      className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Down Pmt</label>
                      <input type="number" value={carDownPayment} onChange={e => setCarDownPayment(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Loan Rate %</label>
                      <input type="number" value={carLoanRate} onChange={e => setCarLoanRate(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Loan Term (Months)</label>
                    <input type="number" value={carLoanTerm} onChange={e => setCarLoanTerm(e.target.value)}
                      className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Max Car Price</p>
                    <p className="text-2xl font-bold text-green-400">{formatCurrency(carCalc.maxCarPrice)}</p>
                  </div>
                </div>
              </CollapsibleTool>
            </div>
          </section>

          {/* Section: Paycheck & HSA */}
          <section>
            <div className="flex items-center space-x-4 mb-8 justify-center">
              <Receipt className="w-8 h-8 text-orange-300" />
              <h2 className="text-3xl font-display font-bold text-white uppercase tracking-tight">Income & Benefits</h2>
            </div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent mb-12"></div>

            <div className="grid gap-6 md:grid-cols-2 items-start">
              <CollapsibleTool
                title="Paycheck Estimator"
                icon={<DollarSign className="w-5 h-5" />}
                description="See your take-home pay"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Gross Pay (Monthly)</label>
                    <input type="number" value={paycheckGross} onChange={e => setPaycheckGross(e.target.value)}
                      className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-orange-300" />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Fed Tax %</label>
                      <input type="number" value={paycheckFederal} onChange={e => setPaycheckFederal(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">State %</label>
                      <input type="number" value={paycheckState} onChange={e => setPaycheckState(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">401k %</label>
                      <input type="number" value={paycheck401k} onChange={e => setPaycheck401k(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white" />
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Net Take-Home</p>
                    <p className="text-2xl font-bold text-green-400">{formatCurrency(paycheckCalc.netPay)}</p>
                  </div>
                </div>
              </CollapsibleTool>

              <CollapsibleTool
                title="HSA Savings"
                icon={<Shield className="w-5 h-5" />}
                description="Triple tax advantage"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Annual Contribution</label>
                    <input type="number" value={hsaContribution} onChange={e => setHsaContribution(e.target.value)}
                      className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-orange-300" />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Tax Rate %</label>
                      <input type="number" value={hsaTaxRate} onChange={e => setHsaTaxRate(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Years</label>
                      <input type="number" value={hsaYears} onChange={e => setHsaYears(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Return %</label>
                      <input type="number" value={hsaReturn} onChange={e => setHsaReturn(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white" />
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Future HSA Value</p>
                    <p className="text-2xl font-bold text-green-400">{formatCurrency(hsaCalc.futureValue)}</p>
                    <p className="text-xs text-gray-500 mt-1">Tax Savings: {formatCurrency(hsaCalc.taxSavings)}/yr</p>
                  </div>
                </div>
              </CollapsibleTool>
            </div>
          </section>

          {/* More tools section */}


          {/* Section: Advanced Planning */}
          <section>
            <div className="flex items-center space-x-4 mb-8 justify-center">
              <TrendingUp className="w-8 h-8 text-orange-300" />
              <h2 className="text-3xl font-display font-bold text-white uppercase tracking-tight">Advanced Planning</h2>
            </div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent mb-12"></div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start">
              <CollapsibleTool
                title="FIRE Calculator"
                icon={<TrendingUp className="w-5 h-5" />}
                description="Financial Independence Retire Early"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Annual Expenses in Retirement</label>
                    <input type="number" value={fireAnnualExpenses} onChange={e => setFireAnnualExpenses(e.target.value)}
                      className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Current Savings</label>
                    <input type="number" value={fireCurrentSavings} onChange={e => setFireCurrentSavings(e.target.value)}
                      className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Monthly Save</label>
                      <input type="number" value={fireMonthlySavings} onChange={e => setFireMonthlySavings(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Return %</label>
                      <input type="number" value={fireReturnRate} onChange={e => setFireReturnRate(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">FIRE Number</p>
                    <p className="text-2xl font-bold text-green-400">{formatCurrency(fireCalc.fireNumber)}</p>
                    <p className="text-sm text-white mt-1">{fireCalc.yearsToFire.toFixed(1)} years to goal</p>
                  </div>
                </div>
              </CollapsibleTool>

              <CollapsibleTool
                title="Rent vs Buy"
                icon={<Home className="w-5 h-5" />}
                description="Compare 5-year outlook"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Monthly Rent</label>
                    <input type="number" value={rentMonthly} onChange={e => setRentMonthly(e.target.value)}
                      className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Home Price</label>
                    <input type="number" value={homePrice} onChange={e => setHomePrice(e.target.value)}
                      className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Comaprison Years</label>
                    <input type="number" value={rentVsBuyYears} onChange={e => setRentVsBuyYears(e.target.value)}
                      className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Verdict</p>
                    <p className="text-xl font-bold text-white">{rentVsBuyCalc.difference > 0 ? "Rent is Cheaper" : "Buy is Cheaper"}</p>
                    <p className="text-xs text-gray-500 mt-1">Difference: {formatCurrency(Math.abs(rentVsBuyCalc.difference))}</p>
                  </div>
                </div>
              </CollapsibleTool>

              <CollapsibleTool
                title="Student Loan Payoff"
                icon={<Briefcase className="w-5 h-5" />}
                description="Plan your customized payoff strategy"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Loan Balance</label>
                    <input type="number" value={studentLoanBalance} onChange={e => setStudentLoanBalance(e.target.value)}
                      className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Rate %</label>
                      <input type="number" value={studentLoanRate} onChange={e => setStudentLoanRate(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Monthly Pay</label>
                      <input type="number" value={studentLoanPayment} onChange={e => setStudentLoanPayment(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Time to Payoff</p>
                    <p className="text-2xl font-bold text-white">{studentLoanCalc.years.toFixed(1)} years</p>
                    <p className="text-xs text-gray-500 mt-1">Total Interest: {formatCurrency(studentLoanCalc.totalInterest)}</p>
                  </div>
                </div>
              </CollapsibleTool>
            </div>
          </section>

          {/* Section: More Calculators */}
          <section>
            <div className="flex items-center space-x-4 mb-8 justify-center">
              <Calculator className="w-8 h-8 text-orange-300" />
              <h2 className="text-3xl font-display font-bold text-white uppercase tracking-tight">More Calculators</h2>
            </div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent mb-12"></div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 items-start">
              <CollapsibleTool
                title="Credit Card Payoff"
                icon={<CreditCard className="w-5 h-5" />}
                description="Kill high interest debt"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Balance</label>
                    <input type="number" value={ccBalance} onChange={e => setCcBalance(e.target.value)}
                      className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">APR %</label>
                      <input type="number" value={ccAPR} onChange={e => setCcAPR(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Monthly Pay</label>
                      <input type="number" value={ccPayment} onChange={e => setCcPayment(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Time to Payoff</p>
                    <p className="text-2xl font-bold text-white">{ccCalc.months} months</p>
                    <p className="text-xs text-gray-500 mt-1">Total Interest: {formatCurrency(ccCalc.totalInterest)}</p>
                  </div>
                </div>
              </CollapsibleTool>

              <CollapsibleTool
                title="Investment Withdrawal"
                icon={<PiggyBank className="w-5 h-5" />}
                description="Safe withdrawal rates"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Portfolio Balance</label>
                    <input type="number" value={retirementBalance} onChange={e => setRetirementBalance(e.target.value)}
                      className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Withdrawal Rate %</label>
                    <input type="number" value={retirementWithdrawal} onChange={e => setRetirementWithdrawal(e.target.value)}
                      className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Monthly Income</p>
                    <p className="text-2xl font-bold text-green-400">{formatCurrency(retirementCalc.monthlyIncome)}</p>
                    <p className="text-xs text-gray-500 mt-1">{formatCurrency(retirementCalc.annualIncome)}/year</p>
                  </div>
                </div>
              </CollapsibleTool>

              <CollapsibleTool
                title="Income Tax Estimator"
                icon={<Receipt className="w-5 h-5" />}
                description="Estimate federal taxes"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Taxable Income</label>
                    <input type="number" value={taxIncome} onChange={e => setTaxIncome(e.target.value)}
                      className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Standard Deduction</label>
                    <input type="number" value={taxDeductions} onChange={e => setTaxDeductions(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Est. Tax</p>
                    <p className="text-2xl font-bold text-white">{formatCurrency(taxCalc.tax)}</p>
                    <p className="text-xs text-gray-500 mt-1">Effective Rate: {taxCalc.effectiveRate.toFixed(1)}%</p>
                  </div>
                </div>
              </CollapsibleTool>

              <CollapsibleTool
                title="College Savings (529)"
                icon={<TrendingUp className="w-5 h-5" />}
                description="Plan for education costs"
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Est. Cost</label>
                      <input type="number" value={collegeCost} onChange={e => setCollegeCost(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Years</label>
                      <input type="number" value={collegeYears} onChange={e => setCollegeYears(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Current</label>
                      <input type="number" value={collegeSavings} onChange={e => setCollegeSavings(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Monthly +</label>
                      <input type="number" value={collegeMonthly} onChange={e => setCollegeMonthly(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Return %</label>
                    <input type="number" value={collegeReturn} onChange={e => setCollegeReturn(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Projected Value</p>
                    <p className="text-2xl font-bold text-green-400">{formatCurrency(collegeCalc.future)}</p>
                    <p className="text-xs text-gray-500 mt-1">Gap: {formatCurrency(collegeCalc.gap)}</p>
                  </div>
                </div>
              </CollapsibleTool>
            </div>
          </section>
          {/* Section: Everyday Tools */}
          <section>
            <div className="flex items-center space-x-4 mb-8 justify-center">
              <Calculator className="w-8 h-8 text-orange-300" />
              <h2 className="text-3xl font-display font-bold text-white uppercase tracking-tight">Everyday Tools</h2>
            </div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent mb-12"></div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start">

              <CollapsibleTool title="Net Worth Calculator" icon={<DollarSign className="w-5 h-5" />} description="Assets minus liabilities">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Total Assets</label>
                    <input type="number" value={totalAssets} onChange={e => setTotalAssets(e.target.value)}
                      className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-orange-300 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Total Liabilities</label>
                    <input type="number" value={totalLiabilities} onChange={e => setTotalLiabilities(e.target.value)}
                      className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-orange-300 focus:outline-none" />
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Net Worth</p>
                    <p className={`text-2xl font-bold ${(parseFloat(totalAssets) || 0) - (parseFloat(totalLiabilities) || 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {formatCurrency(netWorthCalc.netWorth)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Asset/Debt Ratio: {netWorthCalc.ratio}</p>
                  </div>
                </div>
              </CollapsibleTool>

              <CollapsibleTool title="Savings Goal" icon={<PiggyBank className="w-5 h-5" />} description="How long to reach your target">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Target</label>
                      <input type="number" value={goalTarget} onChange={e => setGoalTarget(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Current</label>
                      <input type="number" value={goalCurrent} onChange={e => setGoalCurrent(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Monthly +</label>
                      <input type="number" value={goalMonthly} onChange={e => setGoalMonthly(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Rate %</label>
                      <input type="number" value={goalRate} onChange={e => setGoalRate(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Time to Goal</p>
                    <p className="text-2xl font-bold text-green-400">{goalCalc.years} years</p>
                    <p className="text-xs text-gray-500 mt-1">{goalCalc.months} months total</p>
                  </div>
                </div>
              </CollapsibleTool>

              <CollapsibleTool title="Tip & Bill Split" icon={<Receipt className="w-5 h-5" />} description="Split bills between people">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Bill Total</label>
                    <input type="number" value={tipBill} onChange={e => setTipBill(e.target.value)}
                      className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Tip %</label>
                      <input type="number" value={tipPct} onChange={e => setTipPct(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">People</label>
                      <input type="number" value={tipPeople} onChange={e => setTipPeople(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Per Person</p>
                      <p className="text-lg font-bold text-white">{formatCurrency(tipCalc.perPerson)}</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Tip Total</p>
                      <p className="text-lg font-bold text-orange-300">{formatCurrency(tipCalc.tip)}</p>
                    </div>
                  </div>
                </div>
              </CollapsibleTool>

            </div>
          </section>

          {/* Section: Investment Analysis */}
          <section>
            <div className="flex items-center space-x-4 mb-8 justify-center">
              <TrendingUp className="w-8 h-8 text-orange-300" />
              <h2 className="text-3xl font-display font-bold text-white uppercase tracking-tight">Investment Analysis</h2>
            </div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent mb-12"></div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start">

              <CollapsibleTool title="Dividend Income" icon={<TrendingUp className="w-5 h-5" />} description="Dividend yield & DRIP growth">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Amount Invested</label>
                    <input type="number" value={divInvested} onChange={e => setDivInvested(e.target.value)}
                      className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Div Yield %</label>
                      <input type="number" value={divYield} onChange={e => setDivYield(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">DRIP Years</label>
                      <input type="number" value={divYears} onChange={e => setDivYears(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Monthly Income</p>
                      <p className="text-lg font-bold text-green-400">{formatCurrency(divCalc.monthlyDiv)}</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">DRIP Value</p>
                      <p className="text-lg font-bold text-blue-400">{formatCurrency(divCalc.dripValue)}</p>
                    </div>
                  </div>
                </div>
              </CollapsibleTool>

              <CollapsibleTool title="Dollar Cost Averaging" icon={<TrendingUp className="w-5 h-5" />} description="DCA strategy projected returns">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Initial</label>
                      <input type="number" value={dcaInitial} onChange={e => setDcaInitial(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Monthly</label>
                      <input type="number" value={dcaMonthly} onChange={e => setDcaMonthly(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Years</label>
                      <input type="number" value={dcaYears} onChange={e => setDcaYears(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Return %</label>
                      <input type="number" value={dcaReturn} onChange={e => setDcaReturn(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Portfolio Value</p>
                    <p className="text-2xl font-bold text-green-400">{formatCurrency(dcaCalc.futureValue)}</p>
                    <p className="text-xs text-gray-500 mt-1">Gain: {formatCurrency(dcaCalc.gain)} on {formatCurrency(dcaCalc.totalContrib)} invested</p>
                  </div>
                </div>
              </CollapsibleTool>

              <CollapsibleTool title="Inflation Calculator" icon={<Calculator className="w-5 h-5" />} description="Purchasing power over time">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Today's Amount</label>
                    <input type="number" value={inflationAmount} onChange={e => setInflationAmount(e.target.value)}
                      className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Years</label>
                      <input type="number" value={inflationYears} onChange={e => setInflationYears(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Inflation %</label>
                      <input type="number" value={inflationRate} onChange={e => setInflationRate(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Future Need</p>
                      <p className="text-lg font-bold text-orange-300">{formatCurrency(inflationCalc.futureNeeded)}</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Today's Power</p>
                      <p className="text-lg font-bold text-red-400">{formatCurrency(inflationCalc.todayPower)}</p>
                    </div>
                  </div>
                </div>
              </CollapsibleTool>

            </div>
          </section>

          {/* Section: Business & Salary */}
          <section>
            <div className="flex items-center space-x-4 mb-8 justify-center">
              <Briefcase className="w-8 h-8 text-orange-300" />
              <h2 className="text-3xl font-display font-bold text-white uppercase tracking-tight">Business & Salary</h2>
            </div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent mb-12"></div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start">

              <CollapsibleTool title="Salary Converter" icon={<DollarSign className="w-5 h-5" />} description="Annual ↔ hourly ↔ monthly">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Annual Salary</label>
                    <input type="number" value={salaryAnnual} onChange={e => setSalaryAnnual(e.target.value)}
                      className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Hours Per Week</label>
                    <input type="number" value={salaryHours} onChange={e => setSalaryHours(e.target.value)}
                      className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'Monthly', val: salaryCalc.monthly },
                      { label: 'Bi-weekly', val: salaryCalc.biweekly },
                      { label: 'Weekly', val: salaryCalc.weekly },
                      { label: 'Hourly', val: salaryCalc.hourly },
                    ].map(({ label, val }) => (
                      <div key={label} className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{label}</p>
                        <p className="text-sm font-bold text-white">{formatCurrency(val)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CollapsibleTool>

              <CollapsibleTool title="Break-Even Analysis" icon={<TrendingUp className="w-5 h-5" />} description="When does your business profit?">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Fixed Costs</label>
                    <input type="number" value={beFixed} onChange={e => setBeFixed(e.target.value)}
                      className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Price/Unit</label>
                      <input type="number" value={bePrice} onChange={e => setBePrice(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Variable/Unit</label>
                      <input type="number" value={beVariable} onChange={e => setBeVariable(e.target.value)}
                        className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Break-Even Units</p>
                    <p className="text-2xl font-bold text-white">{isFinite(beCalc.units) ? beCalc.units.toLocaleString() : '∞'}</p>
                    <p className="text-xs text-gray-500 mt-1">Revenue needed: {isFinite(beCalc.revenue) ? formatCurrency(beCalc.revenue) : '—'}</p>
                  </div>
                </div>
              </CollapsibleTool>

              <CollapsibleTool title="Loan Comparison" icon={<CreditCard className="w-5 h-5" />} description="Compare two loan options side by side">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Loan Amount</label>
                    <input type="number" value={loanAmt} onChange={e => setLoanAmt(e.target.value)}
                      className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-orange-300/80 uppercase tracking-wider mb-2 font-mono">Option A</p>
                      <input type="number" value={loanRate1} onChange={e => setLoanRate1(e.target.value)} placeholder="Rate %" className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white mb-2" />
                      <input type="number" value={loanTerm1} onChange={e => setLoanTerm1(e.target.value)} placeholder="Months" className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-blue-400/80 uppercase tracking-wider mb-2 font-mono">Option B</p>
                      <input type="number" value={loanRate2} onChange={e => setLoanRate2(e.target.value)} placeholder="Rate %" className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white mb-2" />
                      <input type="number" value={loanTerm2} onChange={e => setLoanTerm2(e.target.value)} placeholder="Months" className="cursor-target w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
                      <p className="text-xs text-orange-300/80 uppercase tracking-wider mb-1">A Monthly</p>
                      <p className="text-base font-bold text-white">{formatCurrency(loanCompCalc.a.pmt)}</p>
                      <p className="text-[10px] text-gray-500 mt-1">Interest: {formatCurrency(loanCompCalc.a.interest)}</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
                      <p className="text-xs text-blue-400/80 uppercase tracking-wider mb-1">B Monthly</p>
                      <p className="text-base font-bold text-white">{formatCurrency(loanCompCalc.b.pmt)}</p>
                      <p className="text-[10px] text-gray-500 mt-1">Interest: {formatCurrency(loanCompCalc.b.interest)}</p>
                    </div>
                  </div>
                </div>
              </CollapsibleTool>

            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;
