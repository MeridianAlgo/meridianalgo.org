import React, { ChangeEvent, useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ContentService, { CalculatorConfig, LessonContent, LessonSection } from '../services/contentService';
import { 
  BookOpen, CheckCircle, ArrowLeft, ArrowRight, PlayCircle, 
  FileText, Brain, Target, Home, LogOut, Menu, ChevronLeft, 
  BarChart, Trophy, Lightbulb, Star, Clock, Award, Calculator
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';


type CalculatorInputs = Record<string, number | ''>;
type CalculatorState = Record<string, { inputs: CalculatorInputs; result: string }>;

const LessonPage: React.FC = () => {
  const { user, isAuthenticated, updateProgress } = useAuth();
  const navigate = useNavigate();
  const { moduleId, lessonId } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [lessonData, setLessonData] = useState<{ info: any; content: LessonContent } | null>(null);
  const [loading, setLoading] = useState(true);
  const [allLessons, setAllLessons] = useState<any[]>([]);
  const [calculatorState, setCalculatorState] = useState<CalculatorState>({});

  useEffect(() => {
    document.title = 'MeridianAlgo - Lesson';
    loadLessonData();
  }, [moduleId, lessonId]);

  const loadLessonData = async () => {
    if (!moduleId || !lessonId) return;
    
    setLoading(true);
    try {
      const contentService = ContentService.getInstance();
      const lesson = await contentService.getLesson(moduleId, lessonId);
      const module = await contentService.getModule(moduleId);
      
      if (lesson) {
        setLessonData(lesson);
        document.title = `MeridianAlgo - ${lesson.content.title}`;
        // Persist last visited lesson per module for resume functionality
        try {
          if (moduleId && lessonId && typeof window !== 'undefined') {
            localStorage.setItem(`meridianAlgo_lastLesson_${moduleId}`, lessonId);
          }
        } catch (e) {
          // ignore storage failures
        }
      }
      
      if (module) {
        setAllLessons(module.lessons);
      }
    } catch (error) {
      console.error('Error loading lesson:', error);
    } finally {
      setLoading(false);
    }
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/lesson/${moduleId}/${lessonId}` } } });
    }
  }, [isAuthenticated, navigate, moduleId, lessonId]);

  useEffect(() => {
    if (!lessonData) return;

    const calculators = lessonData.content.sections
      .filter(section => section.type === 'calculator' && section.calculator)
      .map(section => section.calculator as CalculatorConfig);

    if (calculators.length === 0) {
      return;
    }

    setCalculatorState(prev => {
      let updated = false;
      const next: CalculatorState = { ...prev };

      calculators.forEach(calculator => {
        if (!next[calculator.id]) {
          const inputs: CalculatorInputs = {} as CalculatorInputs;
          calculator.inputs.forEach(input => {
            inputs[input.id] = '';
          });
          next[calculator.id] = {
            inputs,
            result: 'Enter values to calculate'
          };
          updated = true;
        }
      });

      return updated ? next : prev;
    });
  }, [lessonData]);

  if (!isAuthenticated || !user) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (!lessonData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Lesson not found</p>
          <Link to="/learning" className="text-orange-400 hover:text-orange-300">Back to Learning Center</Link>
        </div>
      </div>
    );
  }

  const currentIndex = allLessons.findIndex(l => l.id === lessonId);
  const nextLesson = allLessons[currentIndex + 1];
  const prevLesson = allLessons[currentIndex - 1];

  const handleCompleteLesson = () => {
    if (lessonData && updateProgress) {
      updateProgress(lessonData.info.id);
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'video': return <PlayCircle className="w-5 h-5" />;
      case 'reading': return <FileText className="w-5 h-5" />;
      case 'quiz': return <Brain className="w-5 h-5" />;
      case 'exercise': return <Target className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const isCompleted = user?.completedConcepts?.includes(lessonData.info.id) ?? false;

  const formatCurrency = (value: number) => {
    if (!Number.isFinite(value)) return '—';
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: value >= 1000 ? 0 : 2
    });
  };

  const formatPercent = (value: number, digits = 1) => {
    if (!Number.isFinite(value)) return '—';
    return `${value.toFixed(digits)}%`;
  };

  const computeCalculatorResult = (
    calculatorId: string,
    inputs: Record<string, number>,
    config: CalculatorConfig
  ): string => {
    switch (calculatorId) {
      case 'investing_growth_projection': {
        const monthly = inputs.monthlyContribution;
        const rate = inputs.expectedReturn / 100 / 12;
        const years = inputs.years;
        const periods = years * 12;
        const futureValue = rate === 0
          ? monthly * periods
          : monthly * ((Math.pow(1 + rate, periods) - 1) / rate);
        return `${config.resultLabel}: ${formatCurrency(futureValue)}`;
      }
      case 'allocation_expected_return': {
        const stockWeight = inputs.stockAllocation / 100;
        const bondWeight = inputs.bondAllocation / 100;
        const otherWeight = Math.max(0, 1 - stockWeight - bondWeight);
        const expectedReturnDecimal = (
          stockWeight * (inputs.stockReturn / 100) +
          bondWeight * (inputs.bondReturn / 100) +
          otherWeight * ((inputs.otherReturn || 0) / 100)
        );
        return `${config.resultLabel}: ${formatPercent(expectedReturnDecimal * 100, 2)}`;
      }
      case 'risk_persona_score': {
        const average = (inputs.capacity + inputs.tolerance + inputs.need) / 3;
        let persona = 'Balanced Navigator';
        if (average < 2.5) {
          persona = 'Capital Preserver';
        } else if (average > 3.8) {
          persona = 'Growth Trailblazer';
        }
        return `${config.resultLabel}: ${persona} (avg score ${average.toFixed(1)})`;
      }
      case 'rebalance_gap': {
        const targetStocks = inputs.targetStocks;
        const targetBonds = inputs.targetBonds;
        const currentStocks = inputs.currentStocks;
        const currentBonds = inputs.currentBonds;
        const stockDiff = (currentStocks - targetStocks).toFixed(1);
        const bondDiff = (currentBonds - targetBonds).toFixed(1);
        return `${config.resultLabel}: Shift stocks ${stockDiff}% and bonds ${bondDiff}% to realign.`;
      }
      case 'fee_drag_projection': {
        const balance = inputs.balance;
        const feeRate = inputs.feePercent / 100;
        const years = inputs.years;
        const annualReturn = inputs.grossReturn / 100;
        const valueNoFee = balance * Math.pow(1 + annualReturn, years);
        const valueWithFee = balance * Math.pow(1 + annualReturn - feeRate, years);
        const lost = valueNoFee - valueWithFee;
        return `${config.resultLabel}: ${formatCurrency(lost)} potential growth lost to fees.`;
      }
      case 'retirement_contribution_gap': {
        const income = inputs.annualIncome;
        const currentPct = inputs.currentContributionPercent / 100;
        const desiredPct = inputs.desiredContributionPercent / 100;
        const annualGap = income * (desiredPct - currentPct);
        return `${config.resultLabel}: Increase by ${formatCurrency(annualGap / 12)} per month to hit your target.`;
      }
      case 'goal_timeline_estimator': {
        const target = inputs.goalAmount;
        const current = inputs.currentSavings;
        const monthly = inputs.monthlyContribution;
        if (monthly <= 0) {
          return `${config.resultLabel}: Increase your monthly contribution to reach this goal.`;
        }

        const remaining = Math.max(0, target - current);
        if (remaining === 0) {
          return `${config.resultLabel}: Goal already fully funded!`;
        }

        const monthsNeeded = Math.ceil(remaining / monthly);
        const years = Math.floor(monthsNeeded / 12);
        const months = monthsNeeded % 12;

        const parts: string[] = [];
        if (years > 0) {
          parts.push(`${years} year${years === 1 ? '' : 's'}`);
        }
        if (months > 0 || parts.length === 0) {
          parts.push(`${months} month${months === 1 ? '' : 's'}`);
        }

        return `${config.resultLabel}: Approximately ${parts.join(' and ')} to finish.`;
      }
      case 'retirement_number': {
        const expenses = inputs.annualExpenses;
        const otherIncome = inputs.otherIncome;
        const withdrawalRate = inputs.withdrawalRate / 100;
        const portfolioNeed = (expenses - otherIncome) / withdrawalRate;
        return `${config.resultLabel}: ${formatCurrency(portfolioNeed)}`;
      }
      case 'social_security_break_even': {
        const fraBenefit = inputs.fraBenefit;
        const earlyBenefit = fraBenefit * 0.7;
        const delayedBenefit = fraBenefit * 1.24;
        const monthlyDiff = delayedBenefit - earlyBenefit;
        const foregone = delayedBenefit * 48; // 4 years delay from 66 to 70
        const breakEvenMonths = foregone / monthlyDiff;
        const breakEvenAge = 70 + breakEvenMonths / 12;
        return `${config.resultLabel}: Break-even at age ${breakEvenAge.toFixed(1)} when delaying vs claiming at 62.`;
      }
      case 'medicare_budget_planner': {
        const total = inputs.partB + inputs.drugPlan + inputs.supplement + inputs.otherMedical;
        return `${config.resultLabel}: ${formatCurrency(total)} per year or ${formatCurrency(total / 12)} per month.`;
      }
      case 'withdrawal_guardrail': {
        const portfolio = inputs.portfolioValue;
        const withdrawRate = inputs.withdrawalPercent / 100;
        const firstYear = portfolio * withdrawRate;
        const inflation = inputs.inflationRate / 100;
        const nextYear = firstYear * (1 + inflation);
        return `${config.resultLabel}: ${formatCurrency(firstYear)} now, ${formatCurrency(nextYear)} next year (inflation adjusted).`;
      }
      case 'tax_bracket_estimator': {
        const income = inputs.taxableIncome;
        const brackets = [
          { limit: 11600, rate: 0.1 },
          { limit: 47050, rate: 0.12 },
          { limit: 100525, rate: 0.22 },
          { limit: 191950, rate: 0.24 },
          { limit: 243725, rate: 0.32 },
          { limit: 609350, rate: 0.35 },
          { limit: Infinity, rate: 0.37 }
        ];

        let tax = 0;
        let remaining = income;
        let prevLimit = 0;
        let marginalRate = 0.37;

        for (const bracket of brackets) {
          const taxable = Math.min(remaining, bracket.limit - prevLimit);
          if (taxable > 0) {
            tax += taxable * bracket.rate;
            remaining -= taxable;
            marginalRate = bracket.rate;
          }
          prevLimit = bracket.limit;
          if (remaining <= 0) break;
        }

        const effectiveRate = tax / income * 100;
        return `${config.resultLabel}: Marginal ${formatPercent(marginalRate * 100, 0)}, Effective ${effectiveRate.toFixed(1)}%, Estimated tax ${formatCurrency(tax)}.`;
      }
      default:
        return config.resultLabel;
    }
  };

  const handleCalculatorInput = (
    calculator: CalculatorConfig,
    inputId: string,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const rawValue = event.target.value;

    setCalculatorState(prev => {
      const next: CalculatorState = { ...prev };
      const calculatorEntry = next[calculator.id] || { inputs: {} as CalculatorInputs, result: 'Enter values to calculate' };
      const updatedInputs: CalculatorInputs = {
        ...calculatorEntry.inputs,
        [inputId]: rawValue === '' ? '' : Number(rawValue)
      };

      let result = 'Enter values to calculate';
      const allFilled = calculator.inputs.every(input => updatedInputs[input.id] !== '' && !Number.isNaN(Number(updatedInputs[input.id])));

      if (allFilled) {
        const numericInputs: Record<string, number> = {};
        calculator.inputs.forEach(input => {
          numericInputs[input.id] = Number(updatedInputs[input.id]);
        });
        result = computeCalculatorResult(calculator.id, numericInputs, calculator);
      }

      next[calculator.id] = {
        inputs: updatedInputs,
        result
      };

      return next;
    });
  };

  const renderLinks = (links: LessonSection['links'], layout: LessonSection['layout']) => {
    if (!links || links.length === 0) return null;

    const containerClass = layout === 'stack'
      ? 'space-y-4'
      : 'grid gap-4 sm:grid-cols-2';

    return (
      <div className={containerClass}>
        {links.map((link, idx) => (
          <a
            key={`${link.label}-${idx}`}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-gray-900/60 border border-gray-700 hover:border-orange-400/60 hover:-translate-y-0.5 transition-all rounded-2xl p-5"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-semibold text-white">{link.label}</h4>
              <ArrowRight className="w-4 h-4 text-orange-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">{link.description}</p>
            <span className="mt-3 inline-flex items-center text-orange-300 text-xs uppercase tracking-wide">
              Open resource
              <ChevronLeft className="hidden" />
            </span>
          </a>
        ))}
      </div>
    );
  };

  const renderCalculatorSection = (section: LessonSection, index: number) => {
    if (!section.calculator) return null;

    const calculator = section.calculator;
    const state = calculatorState[calculator.id];

    return (
      <div
        key={index}
        className="bg-gradient-to-br from-gray-900/80 via-gray-900/60 to-gray-900/80 border border-orange-500/20 rounded-3xl p-6 mb-8 shadow-xl"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-orange-500/20 rounded-xl">
              <Calculator className="w-6 h-6 text-orange-300" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{section.title || 'Interactive Calculator'}</h2>
              <p className="text-gray-400 text-sm max-w-2xl">{calculator.description}</p>
            </div>
          </div>
          {calculator.highlight && (
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl px-4 py-2 text-sm text-orange-200 font-medium">
              {calculator.highlight}
            </div>
          )}
        </div>

        <div className={`grid gap-4 ${calculator.inputs.length > 2 ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
          {calculator.inputs.map(input => (
            <label key={input.id} className="flex flex-col bg-gray-900/70 border border-gray-700 rounded-2xl p-4">
              <span className="text-sm font-semibold text-white mb-2">{input.label}</span>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  step={input.step ?? 'any'}
                  min={input.min}
                  max={input.max}
                  value={state?.inputs[input.id] ?? ''}
                  onChange={event => handleCalculatorInput(calculator, input.id, event)}
                  placeholder={input.placeholder}
                  className="w-full bg-gray-950/80 border border-gray-700 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/40 rounded-lg px-3 py-2 text-white"
                />
                {input.suffix && (
                  <span className="text-sm text-gray-400 whitespace-nowrap">{input.suffix}</span>
                )}
              </div>
            </label>
          ))}
        </div>

        <div className="mt-6 bg-gray-900/80 border border-orange-500/20 rounded-2xl p-5">
          <div className="text-sm uppercase tracking-wide text-gray-400 mb-1">{calculator.resultLabel}</div>
          <div className="text-xl font-semibold text-orange-200">{state?.result ?? 'Enter values to calculate'}</div>
        </div>

        {calculator.formulaNote && (
          <p className="mt-4 text-xs text-gray-500 leading-relaxed">{calculator.formulaNote}</p>
        )}

        {calculator.ctaLabel && (
          <div className="mt-6 flex items-center justify-between bg-gradient-to-r from-orange-600/10 to-yellow-500/10 border border-orange-500/30 rounded-2xl px-5 py-4">
            <div className="text-sm text-gray-300">{calculator.ctaLabel}</div>
            <ArrowRight className="w-5 h-5 text-orange-300" />
          </div>
        )}
      </div>
    );
  };

  const renderSection = (section: LessonSection, index: number) => {
    switch (section.type) {
      case 'hero':
        return (
          <div key={index} className="bg-gradient-to-r from-orange-600/10 to-yellow-600/10 rounded-2xl p-8 mb-8 border border-orange-500/20">
            <h1 className="text-3xl font-bold text-white mb-2">{section.title}</h1>
            {section.subtitle && <p className="text-orange-300 text-lg">{section.subtitle}</p>}
          </div>
        );
      
      case 'overview':
        return (
          <div key={index} className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <Target className="w-5 h-5 text-orange-400 mr-2" />
              {section.title}
            </h2>
            <ul className="space-y-2">
              {section.items?.map((item, i) => (
                <li key={i} className="flex items-start text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      
      case 'content':
        return (
          <div key={index} className="mb-6">
            {section.title && <h2 className="text-2xl font-bold text-white mb-4">{section.title}</h2>}
            <div className="text-gray-300 leading-relaxed text-lg">
              {section.content}
            </div>
          </div>
        );
      
      case 'highlight':
        return (
          <div key={index} className={`bg-gradient-to-r from-${section.color || 'orange'}-600/10 to-${section.color || 'orange'}-500/10 rounded-2xl p-6 mb-6 border border-${section.color || 'orange'}-500/30`}>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center">
              <Star className={`w-5 h-5 text-${section.color || 'orange'}-400 mr-2`} />
              {section.title}
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">{section.content}</p>
          </div>
        );
      
      case 'keypoints':
        return (
          <div key={index} className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-6">{section.title}</h2>
            <div className="space-y-4">
              {section.points?.map((point, i) => (
                <div key={i} className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-semibold text-white mb-2">{point.title}</h3>
                  <p className="text-gray-300">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'actionsteps':
        return (
          <div key={index} className="bg-gradient-to-r from-blue-600/10 to-blue-500/10 rounded-2xl p-6 mb-6 border border-blue-500/30">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <Target className="w-5 h-5 text-blue-400 mr-2" />
              {section.title}
            </h2>
            <ol className="space-y-3">
              {section.steps?.map((step, i) => (
                <li key={i} className="flex items-start text-gray-300">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        );
      
      case 'protip':
        return (
          <div key={index} className="bg-gradient-to-r from-yellow-600/10 to-yellow-500/10 rounded-2xl p-6 mb-6 border border-yellow-500/30">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center">
              <Lightbulb className="w-5 h-5 text-yellow-400 mr-2" />
              {section.title}
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">{section.content}</p>
          </div>
        );

      case 'resources':
        return (
          <div key={index} className="bg-gray-800/90 rounded-3xl p-7 mb-8 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <BookOpen className="w-5 h-5 text-orange-300 mr-2" />
              {section.title || 'Helpful Links'}
            </h2>
            {section.subtitle && (
              <p className="text-gray-400 text-sm mb-4 max-w-3xl">{section.subtitle}</p>
            )}
            {renderLinks(section.links, section.layout)}
          </div>
        );

      case 'calculator':
        return renderCalculatorSection(section, index);

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-800 border-r border-gray-700 transition-all duration-300 flex flex-col fixed h-full z-10`}>
        {/* Logo Section */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <Link to="/learning" className={`flex items-center ${!sidebarOpen && 'justify-center'}`}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              {sidebarOpen && (
                <span className="ml-3 text-xl font-bold text-white">Lesson</span>
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

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <Link
              to="/"
              className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
            >
              <Home className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Back to Home</span>}
            </Link>
            <Link
              to="/dashboard"
              className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
            >
              <BarChart className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Dashboard</span>}
            </Link>
            <Link
              to="/learning"
              className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Learning Center</span>}
            </Link>
            <Link
              to="/achievements"
              className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
            >
              <Trophy className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Achievements</span>}
            </Link>
            <Link
              to="/tools"
              className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
            >
              <Calculator className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Financial Tools</span>}
            </Link>
          </div>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-700">
          <div className={`flex items-center ${!sidebarOpen && 'justify-center'}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            {sidebarOpen && (
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-gray-400">Learning in progress</p>
              </div>
            )}
          </div>
          {sidebarOpen && (
            <button
              onClick={() => {
                navigate('/');
              }}
              className="mt-4 w-full flex items-center justify-center px-3 py-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 overflow-y-auto ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/learning"
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-300 hover:text-white"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {lessonData.content.title}
                </h1>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center space-x-2 text-gray-400">
                    {getTypeIcon(lessonData.info.type)}
                    <span className="text-sm capitalize">{lessonData.info.type}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{lessonData.info.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-orange-400">
                    <Award className="w-4 h-4" />
                    <span className="text-sm font-medium">+{lessonData.info.points} points</span>
                  </div>
                </div>
              </div>
            </div>
            {isCompleted && (
              <div className="flex items-center space-x-2 text-green-400">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Completed</span>
              </div>
            )}
          </div>
        </div>

        {/* Lesson Content */}
        <div className="px-8 py-6">
          <div className="max-w-4xl mx-auto">
            {lessonData.content.sections.map((section, index) => renderSection(section, index))}

            {/* Navigation and Actions */}
            <div className="flex items-center justify-between">
              <div>
                {prevLesson && (
                  <Link
                    to={`/lesson/${moduleId}/${prevLesson.id}`}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-all border border-gray-700 hover:border-gray-600"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </Link>
                )}
              </div>

              <div className="flex items-center space-x-4">
                {!isCompleted && (
                  <button
                    onClick={handleCompleteLesson}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-xl transition-all"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Mark Complete</span>
                  </button>
                )}

                {nextLesson ? (
                  <Link
                    to={`/lesson/${moduleId}/${nextLesson.id}`}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white rounded-xl transition-all"
                  >
                    <span>Next Lesson</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Link
                      to={`/quiz/${moduleId}`}
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-xl transition-all animate-pulse"
                    >
                      <Brain className="w-4 h-4" />
                      <span>Take Module Quiz</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      to="/learning"
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-all border border-gray-700"
                    >
                      <span>Back to Learning</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
            {/* Progress Indicator */}
            <div className="mt-8 bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Module Progress</h3>
                <div className="text-sm text-gray-400">{currentIndex + 1} of {allLessons.length} lessons</div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-orange-400 to-yellow-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((currentIndex + 1) / allLessons.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
