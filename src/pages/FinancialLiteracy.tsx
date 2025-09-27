import { useEffect, useState } from 'react';
import { BookOpen, DollarSign, PiggyBank, CreditCard, TrendingUp, Shield, Calculator, Target, CheckCircle, ChevronDown, ChevronRight, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from '../components/AuthModal';

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

const FinancialLiteracy = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, isAuthenticated, updateProgress } = useAuth();

  useEffect(() => {
    document.title = 'MeridianAlgo - Financial Literacy Learning';
  }, []);

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const toggleConceptCompletion = (conceptId: string) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
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
            'Use high-yield savings accounts (look for 4%+ APY)',
            'Automate your savings to remove temptation',
            'Take advantage of employer 401(k) matching'
          ],
          actionItems: [
            'Research and compare high-yield savings accounts',
            'Set up automatic transfers on payday',
            'Check if your employer offers 401(k) matching',
            'Open separate savings accounts for different goals'
          ],
          globalTip: 'Local credit unions and community banks often offer better rates and lower fees than large national banks. Research options in your area.'
        },
        {
          title: 'SMART Financial Goals',
          description: 'Set Specific, Measurable, Achievable, Relevant, and Time-bound financial objectives.',
          keyPoints: [
            'Specific: "Save $5,000" not "save money"',
            'Measurable: Track progress monthly',
            'Achievable: Based on your actual income',
            'Relevant: Aligned with your life priorities',
            'Time-bound: Set clear deadlines'
          ],
          actionItems: [
            'Write down 3 short-term goals (1 year or less)',
            'Identify 2 medium-term goals (1-5 years)',
            'Define 1 long-term goal (5+ years)',
            'Calculate monthly savings needed for each goal'
          ]
        }
      ]
    },
    {
      id: 'debt',
      title: 'Debt Management & Credit',
      icon: <CreditCard className="w-6 h-6" />,
      color: 'red',
      description: 'Understand credit scores, manage debt effectively, and build a strong credit history.',
      concepts: [
        {
          title: 'Understanding Credit Scores',
          description: 'Learn how credit scores work and what factors affect them most.',
          keyPoints: [
            'Payment history (35%) - most important factor',
            'Credit utilization (30%) - keep below 30% of limits',
            'Length of credit history (15%) - keep old accounts open',
            'Credit mix (10%) - variety of credit types',
            'New credit (10%) - limit hard inquiries'
          ],
          actionItems: [
            'Check your credit score for free (Credit Karma, Annual Credit Report)',
            'Review your credit report for errors',
            'Set up automatic payments for all bills',
            'Pay down credit card balances to below 30% utilization'
          ],
          globalTip: 'Many employers worldwide check credit scores for certain positions, especially in finance or security. A good credit score can impact job opportunities beyond just loan rates.'
        },
        {
          title: 'Debt Payoff Strategies',
          description: 'Choose between debt snowball and avalanche methods to eliminate debt efficiently.',
          keyPoints: [
            'Debt Snowball: Pay minimums on all debts, extra on smallest balance',
            'Debt Avalanche: Pay minimums on all debts, extra on highest interest rate',
            'Debt Consolidation: Combine multiple debts into one payment',
            'Balance Transfers: Move high-interest debt to lower-rate cards'
          ],
          actionItems: [
            'List all debts with balances, minimum payments, and interest rates',
            'Choose snowball (motivation) or avalanche (math) method',
            'Calculate how much extra you can pay toward debt monthly',
            'Consider calling creditors to negotiate lower interest rates'
          ]
        }
      ]
    },
    {
      id: 'investing',
      title: 'Investing Fundamentals',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'purple',
      description: 'Start your investment journey with basic concepts and low-cost strategies.',
      concepts: [
        {
          title: 'Investment Basics',
          description: 'Understand different investment types and the power of compound interest.',
          keyPoints: [
            'Stocks: Ownership shares in companies',
            'Bonds: Loans to companies or governments',
            'Index Funds: Diversified baskets of stocks/bonds',
            'ETFs: Exchange-traded funds with low fees',
            'Compound interest: Your money earning money over time'
          ],
          actionItems: [
            'Open a brokerage account with low fees (Fidelity, Vanguard, Schwab)',
            'Start with broad market index funds (S&P 500)',
            'Set up automatic monthly investments',
            'Learn about dollar-cost averaging'
          ],
          globalTip: 'Many companies worldwide offer employee stock purchase plans (ESPPs) with discounts. Check if your employer offers this benefit as a way to start investing.'
        },
        {
          title: 'Retirement Planning',
          description: 'Maximize employer benefits and understand retirement account types.',
          keyPoints: [
            '401(k): Employer-sponsored, often with matching',
            'IRA: Individual retirement account, more investment options',
            'Roth vs Traditional: Tax treatment differences',
            'Target-date funds: Automatically adjust risk over time'
          ],
          actionItems: [
            'Contribute enough to get full employer 401(k) match',
            'Choose low-cost index funds in your 401(k)',
            'Consider opening a Roth IRA for additional savings',
            'Increase contributions by 1% annually'
          ],
          globalTip: 'If your employer offers pension benefits, understand how they work alongside your personal retirement savings to maximize your retirement income.'
        }
      ]
    },
    {
      id: 'insurance',
      title: 'Insurance & Risk Management',
      icon: <Shield className="w-6 h-6" />,
      color: 'orange',
      description: 'Protect your financial future with appropriate insurance coverage.',
      concepts: [
        {
          title: 'Essential Insurance Types',
          description: 'Understand which insurance types are necessary and which are optional.',
          keyPoints: [
            'Health Insurance: Protects against medical costs',
            'Auto Insurance: Required by law in most states',
            'Renters/Homeowners: Protects your belongings and liability',
            'Life Insurance: Protects dependents if you pass away',
            'Disability Insurance: Replaces income if you cannot work'
          ],
          actionItems: [
            'Review your current insurance coverage',
            'Shop around for better rates annually',
            'Increase deductibles to lower premiums',
            'Consider term life insurance if you have dependents'
          ],
          globalTip: 'Consider your local climate and natural disaster risks when choosing insurance coverage. Ensure you have appropriate protection for your region.'
        }
      ]
    },
    {
      id: 'taxes',
      title: 'Tax Planning',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'yellow',
      description: 'Minimize your tax burden and maximize refunds through smart planning.',
      concepts: [
        {
          title: 'Tax Basics & Deductions',
          description: 'Understand how taxes work and common ways to reduce what you owe.',
          keyPoints: [
            'Standard vs Itemized deductions',
            'Tax credits vs deductions (credits are better)',
            'Pre-tax contributions reduce taxable income',
            'Keep receipts for potential deductions'
          ],
          actionItems: [
            'Organize tax documents throughout the year',
            'Maximize 401(k) and IRA contributions',
            'Track charitable donations and business expenses',
            'Consider using tax software or hiring a professional'
          ],
          globalTip: 'Tax laws vary significantly by location. If you work remotely or across borders, understand the tax implications of your work and residence locations.'
        }
      ]
    }
  ];

  const totalConcepts = sections.reduce((total, section) => total + section.concepts.length, 0);
  const completedCount = completedConcepts.size;
  const progressPercentage = totalConcepts > 0 ? (completedCount / totalConcepts) * 100 : 0;

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 [background-image:radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-2xl mb-8">
              <BookOpen className="w-10 h-10 text-orange-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
              Financial <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Literacy</span> Learning
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              Master essential financial concepts with practical, Midwest-focused guidance. Build confidence in budgeting, saving, investing, and planning for your financial future.
            </p>
          </div>

          {/* Progress Tracker */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Your Progress</h3>
                <span className="text-orange-400 font-medium">{completedCount}/{totalConcepts} concepts</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-orange-400 to-yellow-400 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-gray-400 text-sm mt-2">
                {progressPercentage.toFixed(0)}% complete - Keep learning to build your financial confidence!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Sections */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="space-y-6">
            {sections.map((section) => (
              <div key={section.id} className="bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-2xl overflow-hidden">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-6 text-left hover:bg-gray-800/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-${section.color}-500/10 rounded-xl flex items-center justify-center`}>
                        <div className={`text-${section.color}-400`}>
                          {section.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">{section.title}</h3>
                        <p className="text-gray-400 text-sm">{section.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-400">
                        {section.concepts.filter(concept => 
                          completedConcepts.has(`${section.id}-${concept.title}`)
                        ).length}/{section.concepts.length}
                      </span>
                      {expandedSection === section.id ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </button>

                {expandedSection === section.id && (
                  <div className="px-6 pb-6">
                    <div className="space-y-6">
                      {section.concepts.map((concept, conceptIndex) => {
                        const conceptId = `${section.id}-${concept.title}`;
                        const isCompleted = completedConcepts.has(conceptId);
                        
                        return (
                          <div key={conceptIndex} className="bg-gray-900/50 rounded-xl p-6 border border-gray-700/50">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <h4 className="text-lg font-semibold text-white mb-2">{concept.title}</h4>
                                <p className="text-gray-300 text-sm mb-4">{concept.description}</p>
                              </div>
                              <button
                                onClick={() => toggleConceptCompletion(conceptId)}
                                className={`ml-4 p-2 rounded-lg transition-colors ${
                                  isCompleted 
                                    ? 'bg-green-500/20 text-green-400' 
                                    : 'bg-gray-700/50 text-gray-400 hover:bg-gray-600/50'
                                }`}
                              >
                                <CheckCircle className="w-5 h-5" />
                              </button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <h5 className="text-sm font-semibold text-orange-400 mb-3 uppercase tracking-wide">Key Points</h5>
                                <ul className="space-y-2">
                                  {concept.keyPoints.map((point, pointIndex) => (
                                    <li key={pointIndex} className="flex items-start space-x-2">
                                      <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                                      <span className="text-gray-300 text-sm">{point}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h5 className="text-sm font-semibold text-blue-400 mb-3 uppercase tracking-wide">Action Items</h5>
                                <ul className="space-y-2">
                                  {concept.actionItems.map((item, itemIndex) => (
                                    <li key={itemIndex} className="flex items-start space-x-2">
                                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                                      <span className="text-gray-300 text-sm">{item}</span>
                                    </li>
                            </div>

                            {concept.globalTip && (
                              <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                                <div className="flex items-start space-x-2">
                                  <Target className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <h6 className="text-sm font-semibold text-yellow-400 mb-1">Global Tip</h6>
                                    <p className="text-gray-300 text-sm">{concept.globalTip}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
{{ ... }}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 backdrop-blur-sm border border-orange-400/30 rounded-2xl p-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              Ready to Take <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Action?</span>
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed font-light">
              Financial literacy is a journey, not a destination. Start with one concept, take action, and build momentum toward your financial goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/newsletters" 
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-orange-500 hover:bg-orange-600 transition-colors duration-200"
              >
                Get Weekly Tips
              </a>
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-3 border border-gray-600 text-base font-medium rounded-xl text-white hover:border-orange-400 hover:text-orange-400 transition-colors duration-200"
              >
                Ask Questions
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FinancialLiteracy;
