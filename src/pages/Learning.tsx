import { useEffect, useState } from 'react';
import { DollarSign, PiggyBank, CreditCard, TrendingUp, Shield, Calculator, CheckCircle, ChevronDown, ChevronRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

interface ConceptSection {
  id: string;
  title: string;
  icon: JSX.Element;
  color: string;
  description: string;
  concepts: ConceptItem[];
}

interface ConceptItem {
  title: string;
  description: string;
  keyPoints: string[];
  actionItems: string[];
  globalTip?: string;
}

const Learning = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const { user, isAuthenticated, updateProgress } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'MeridianAlgo - Learning Center';
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/learning' } } });
    }
  }, [isAuthenticated, navigate]);

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const toggleConceptCompletion = (conceptId: string) => {
    updateProgress(conceptId);
  };

  const completedConcepts = user?.completedConcepts || [];
  const completedConceptsSet = new Set(completedConcepts);

  const sections: ConceptSection[] = [
    {
      id: 'budgeting',
      title: 'Budgeting & Money Management',
      icon: <Calculator className="w-6 h-6" />,
      color: 'blue',
      description: 'Master the fundamentals of tracking income, expenses, and creating sustainable spending plans.',
      concepts: [
        {
          title: 'Creating Your First Budget',
          description: 'Learn the 50/30/20 rule and how to track your money flow effectively.',
          keyPoints: [
            '50% for needs (rent, groceries, utilities)',
            '30% for wants (entertainment, dining out)',
            '20% for savings and debt repayment',
            'Track every expense for at least one month'
          ],
          actionItems: [
            'Download a budgeting app or create a spreadsheet',
            'List all your monthly income sources',
            'Categorize your expenses from the past month',
            'Set realistic spending limits for each category'
          ],
          globalTip: 'Consider seasonal expenses in your region - heating/cooling costs, holiday spending, or seasonal work patterns can significantly impact your budget.'
        },
        {
          title: 'Emergency Fund Basics',
          description: 'Build a financial safety net to protect against unexpected expenses.',
          keyPoints: [
            'Start with $500-$1000 as your initial goal',
            'Gradually build to 3-6 months of expenses',
            'Keep emergency funds in a separate, easily accessible account',
            'Only use for true emergencies (job loss, medical bills, major repairs)'
          ],
          actionItems: [
            'Open a high-yield savings account for emergencies only',
            'Set up automatic transfers of $25-50 per paycheck',
            'Calculate your monthly essential expenses',
            'Create a list of what qualifies as an emergency'
          ],
          globalTip: 'Regional factors like weather patterns, local job markets, and cost of living should influence your emergency fund size and planning.'
        }
      ]
    },
    {
      id: 'saving',
      title: 'Saving & Goal Setting',
      icon: <PiggyBank className="w-6 h-6" />,
      color: 'green',
      description: 'Develop effective saving strategies and set achievable financial goals.',
      concepts: [
        {
          title: 'Smart Saving Strategies',
          description: 'Maximize your savings with proven techniques and account types.',
          keyPoints: [
            'Pay yourself first - save before spending',
            'Use high-yield savings accounts for better returns',
            'Automate your savings to build consistency',
            'Take advantage of employer matching programs'
          ],
          actionItems: [
            'Set up automatic transfers to savings',
            'Research and compare high-yield savings accounts',
            'Calculate how much you can realistically save monthly',
            'Open separate accounts for different savings goals'
          ],
          globalTip: 'Interest rates and banking options vary significantly by country and region. Research local banks and credit unions for the best savings rates in your area.'
        },
        {
          title: 'Setting SMART Financial Goals',
          description: 'Create specific, measurable, achievable, relevant, and time-bound financial objectives.',
          keyPoints: [
            'Specific: Define exactly what you want to achieve',
            'Measurable: Set a clear dollar amount and timeline',
            'Achievable: Make sure your goal is realistic',
            'Relevant: Align goals with your values and priorities',
            'Time-bound: Set a specific deadline'
          ],
          actionItems: [
            'Write down 3 short-term goals (1 year or less)',
            'Identify 2 medium-term goals (1-5 years)',
            'Define 1 long-term goal (5+ years)',
            'Break each goal into monthly savings targets'
          ],
          globalTip: 'Consider local economic conditions, inflation rates, and cultural financial milestones when setting your goals.'
        }
      ]
    },
    {
      id: 'debt',
      title: 'Debt Management & Credit',
      icon: <CreditCard className="w-6 h-6" />,
      color: 'red',
      description: 'Learn to manage debt effectively and build a strong credit history.',
      concepts: [
        {
          title: 'Understanding Credit Scores',
          description: 'Learn how credit scores work and how to improve yours.',
          keyPoints: [
            'Credit scores range from 300-850 (higher is better)',
            'Payment history is the most important factor (35%)',
            'Credit utilization should stay below 30%',
            'Length of credit history matters (15%)'
          ],
          actionItems: [
            'Check your credit report for free annually',
            'Set up automatic payments for all bills',
            'Pay down credit card balances below 30% of limits',
            'Avoid closing old credit accounts'
          ],
          globalTip: 'Credit scoring systems vary by country. In some regions, alternative data like utility payments or rental history may be considered.'
        },
        {
          title: 'Debt Payoff Strategies',
          description: 'Choose between debt snowball and avalanche methods to eliminate debt.',
          keyPoints: [
            'Debt Snowball: Pay minimums on all debts, extra on smallest balance',
            'Debt Avalanche: Pay minimums on all debts, extra on highest interest rate',
            'Consider debt consolidation for multiple high-interest debts',
            'Never ignore debt - communicate with creditors if struggling'
          ],
          actionItems: [
            'List all debts with balances, minimum payments, and interest rates',
            'Choose either snowball or avalanche method',
            'Calculate how much extra you can pay toward debt monthly',
            'Set up automatic payments to avoid late fees'
          ],
          globalTip: 'Debt consolidation options and bankruptcy laws vary significantly by country. Research local regulations and seek professional advice when needed.'
        }
      ]
    },
    {
      id: 'investing',
      title: 'Investing Fundamentals',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'purple',
      description: 'Start your investment journey with basic concepts and strategies.',
      concepts: [
        {
          title: 'Investment Basics',
          description: 'Understand different types of investments and risk levels.',
          keyPoints: [
            'Stocks represent ownership in companies',
            'Bonds are loans to companies or governments',
            'Mutual funds and ETFs provide instant diversification',
            'Higher potential returns usually mean higher risk'
          ],
          actionItems: [
            'Open a brokerage account with low fees',
            'Start with broad market index funds',
            'Invest consistently, regardless of market conditions',
            'Never invest money you need within 5 years'
          ],
          globalTip: 'Investment options, tax implications, and regulations vary by country. Research local investment platforms and tax-advantaged accounts available in your region.'
        },
        {
          title: 'Retirement Planning',
          description: 'Start planning for retirement early to take advantage of compound interest.',
          keyPoints: [
            'Start as early as possible - time is your biggest advantage',
            'Take full advantage of employer 401(k) matching',
            'Consider Roth vs. Traditional retirement accounts',
            'Aim to save 10-15% of your income for retirement'
          ],
          actionItems: [
            'Calculate how much you need for retirement',
            'Maximize employer matching contributions',
            'Open an IRA if you don\'t have employer retirement plan',
            'Increase contributions by 1% annually'
          ],
          globalTip: 'Retirement systems vary globally. Some countries have strong public pensions, others rely more on private savings. Research your local retirement benefits and plan accordingly.'
        }
      ]
    },
    {
      id: 'insurance',
      title: 'Insurance & Risk Management',
      icon: <Shield className="w-6 h-6" />,
      color: 'indigo',
      description: 'Protect yourself and your assets with appropriate insurance coverage.',
      concepts: [
        {
          title: 'Essential Insurance Types',
          description: 'Understand which insurance policies you need and when.',
          keyPoints: [
            'Health insurance is typically the most important',
            'Auto insurance is required in most places if you drive',
            'Renters/homeowners insurance protects your belongings',
            'Life insurance becomes important when others depend on you financially'
          ],
          actionItems: [
            'Review your current insurance coverage',
            'Shop around for better rates annually',
            'Understand your deductibles and coverage limits',
            'Consider umbrella insurance if you have significant assets'
          ],
          globalTip: 'Insurance requirements and availability vary significantly by country and region. Some have universal healthcare, others rely on private insurance. Research what\'s mandatory and recommended in your area.'
        }
      ]
    },
    {
      id: 'taxes',
      title: 'Tax Planning',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'yellow',
      description: 'Learn basic tax concepts and strategies to minimize your tax burden legally.',
      concepts: [
        {
          title: 'Tax Basics & Planning',
          description: 'Understand how taxes work and plan to minimize what you owe.',
          keyPoints: [
            'Know the difference between tax deductions and credits',
            'Understand your marginal vs. effective tax rate',
            'Keep organized records of tax-deductible expenses',
            'Consider tax-advantaged accounts like 401(k)s and IRAs'
          ],
          actionItems: [
            'Organize your tax documents throughout the year',
            'Track deductible expenses (charitable donations, business expenses)',
            'Maximize contributions to tax-advantaged retirement accounts',
            'Consider working with a tax professional for complex situations'
          ],
          globalTip: 'Tax systems vary dramatically worldwide. Some countries have simple flat taxes, others have complex progressive systems. Learn your local tax obligations and available deductions.'
        }
      ]
    }
  ];

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  const totalConcepts = sections.reduce((total, section) => total + section.concepts.length, 0);
  const completedCount = completedConcepts.length;
  const progressPercentage = totalConcepts > 0 ? (completedCount / totalConcepts) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 text-white pt-24">
      {/* Header */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <Link 
              to="/dashboard"
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </Link>
            
            <div className="text-right">
              <p className="text-gray-400">Welcome back, {user?.name?.split(' ')[0]}!</p>
            </div>
          </div>

          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Learning Center</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Master financial literacy with our comprehensive, interactive curriculum designed for real-world application.
            </p>

            {/* Progress Bar */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Your Progress</h3>
                <span className="text-blue-400 font-bold">{Math.round(progressPercentage)}% Complete</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-purple-400 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-gray-400 text-sm mt-2">
                {completedCount} of {totalConcepts} concepts completed
              </p>
            </div>
          </div>

          {/* Learning Sections */}
          <div className="space-y-6">
            {sections.map((section) => {
              const isExpanded = expandedSection === section.id;
              const sectionCompletedConcepts = section.concepts.filter((_, index) => 
                completedConceptsSet.has(`${section.id}_${index}`)
              ).length;
              const sectionProgress = section.concepts.length > 0 ? (sectionCompletedConcepts / section.concepts.length) * 100 : 0;

              return (
                <div key={section.id} className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full p-6 text-left hover:bg-gray-700/30 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${section.color}-500/20`}>
                          <div className={`text-${section.color}-400`}>
                            {section.icon}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-1">{section.title}</h3>
                          <p className="text-gray-400 text-sm">{section.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-sm text-gray-400">
                            {sectionCompletedConcepts}/{section.concepts.length} completed
                          </div>
                          <div className="w-24 bg-gray-700 rounded-full h-2 mt-1">
                            <div 
                              className={`bg-${section.color}-400 h-2 rounded-full transition-all duration-300`}
                              style={{ width: `${sectionProgress}%` }}
                            ></div>
                          </div>
                        </div>
                        {isExpanded ? (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-gray-700">
                      {section.concepts.map((concept, conceptIndex) => {
                        const conceptId = `${section.id}_${conceptIndex}`;
                        const isCompleted = completedConceptsSet.has(conceptId);

                        return (
                          <div key={conceptIndex} className="p-6 border-b border-gray-700 last:border-b-0">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <h4 className="text-lg font-semibold text-white mb-2">{concept.title}</h4>
                                <p className="text-gray-300 mb-4">{concept.description}</p>
                              </div>
                              <button
                                onClick={() => toggleConceptCompletion(conceptId)}
                                className={`ml-4 flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all ${
                                  isCompleted
                                    ? 'bg-green-500 border-green-500 text-white'
                                    : 'border-gray-600 hover:border-green-500 text-gray-400 hover:text-green-500'
                                }`}
                              >
                                {isCompleted && <CheckCircle className="w-5 h-5" />}
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h5 className="font-medium text-white mb-3">Key Points:</h5>
                                <ul className="space-y-2">
                                  {concept.keyPoints.map((point, pointIndex) => (
                                    <li key={pointIndex} className="flex items-start space-x-2">
                                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                                      <span className="text-gray-300 text-sm">{point}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h5 className="font-medium text-white mb-3">Action Items:</h5>
                                <ul className="space-y-2">
                                  {concept.actionItems.map((item, itemIndex) => (
                                    <li key={itemIndex} className="flex items-start space-x-2">
                                      <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                                      <span className="text-gray-300 text-sm">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {concept.globalTip && (
                              <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                                <h6 className="font-medium text-yellow-400 mb-2">💡 Global Perspective:</h6>
                                <p className="text-gray-300 text-sm">{concept.globalTip}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Learning;
