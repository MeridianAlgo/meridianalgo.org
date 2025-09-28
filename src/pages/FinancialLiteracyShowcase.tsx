import { useEffect } from 'react';
import { 
  BookOpen, PiggyBank, CreditCard, TrendingUp, 
  Calculator, Target, Award, Users, CheckCircle, ArrowRight,
  FileText, Brain, Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface Skill {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  color: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  lessons: number;
  duration: string;
  outcomes: string[];
}

const FinancialLiteracyShowcase = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    document.title = 'MeridianAlgo - Financial Literacy Skills';
  }, []);

  const skills: Skill[] = [
    {
      id: 'budgeting',
      title: 'Budgeting & Money Management',
      description: 'Master the art of tracking income, expenses, and creating sustainable spending plans that work for your lifestyle.',
      icon: <Calculator className="w-8 h-8" />,
      color: 'blue',
      level: 'Beginner',
      lessons: 6,
      duration: '4 weeks',
      outcomes: [
        'Create and maintain a personal budget',
        'Track expenses effectively',
        'Build an emergency fund',
        'Set realistic financial goals'
      ]
    },
    {
      id: 'saving',
      title: 'Smart Saving Strategies',
      description: 'Develop powerful saving habits and strategies to grow your wealth systematically over time.',
      icon: <PiggyBank className="w-8 h-8" />,
      color: 'green',
      level: 'Beginner',
      lessons: 5,
      duration: '3 weeks',
      outcomes: [
        'Automate your savings',
        'Choose high-yield savings accounts',
        'Save for major life goals',
        'Understand compound interest'
      ]
    },
    {
      id: 'credit',
      title: 'Credit & Debt Management',
      description: 'Understand credit scores, manage debt effectively, and build a strong financial foundation.',
      icon: <CreditCard className="w-8 h-8" />,
      color: 'purple',
      level: 'Intermediate',
      lessons: 5,
      duration: '4 weeks',
      outcomes: [
        'Improve your credit score',
        'Read and understand credit reports',
        'Choose effective debt payoff strategies',
        'Use credit cards responsibly'
      ]
    },
    {
      id: 'investing',
      title: 'Investment Fundamentals',
      description: 'Start your investment journey with confidence and learn to grow your wealth through smart investing.',
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'orange',
      level: 'Intermediate',
      lessons: 5,
      duration: '6 weeks',
      outcomes: [
        'Understand different investment types',
        'Build a diversified portfolio',
        'Assess and manage investment risk',
        'Choose between stocks, bonds, and funds'
      ]
    },
    {
      id: 'retirement',
      title: 'Retirement Planning',
      description: 'Plan for a secure and comfortable retirement with strategic long-term financial planning.',
      icon: <Target className="w-8 h-8" />,
      color: 'indigo',
      level: 'Advanced',
      lessons: 5,
      duration: '5 weeks',
      outcomes: [
        'Maximize 401(k) and IRA benefits',
        'Calculate retirement needs',
        'Understand Social Security',
        'Plan for healthcare costs'
      ]
    },
    {
      id: 'taxes',
      title: 'Tax Optimization',
      description: 'Learn to optimize your taxes legally and understand deductions to keep more of your money.',
      icon: <FileText className="w-8 h-8" />,
      color: 'red',
      level: 'Advanced',
      lessons: 4,
      duration: '3 weeks',
      outcomes: [
        'Understand tax brackets and rates',
        'Maximize deductions and credits',
        'Use tax-advantaged accounts',
        'Plan for tax efficiency'
      ]
    }
  ];

  const getLevelColor = (level: string) => {
    switch(level) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const totalLessons = skills.reduce((acc, skill) => acc + skill.lessons, 0);

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      {/* Hero Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Finance</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Build essential financial skills through our comprehensive curriculum designed by experts. 
              From budgeting basics to advanced investment strategies, we'll guide you every step of the way.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <BookOpen className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">{skills.length}</div>
                <div className="text-gray-400 text-sm">Skill Areas</div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <Brain className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">{totalLessons}</div>
                <div className="text-gray-400 text-sm">Total Lessons</div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <Award className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">Practical</div>
                <div className="text-gray-400 text-sm">Skills</div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <Users className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">Self-Paced</div>
                <div className="text-gray-400 text-sm">Learning</div>
              </div>
            </div>

            {isAuthenticated ? (
              <Link 
                to="/learning"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:transform hover:scale-105"
              >
                <span>Continue Your Journey</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            ) : (
              <Link 
                to="/login"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:transform hover:scale-105"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Skills You'll Master
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105 flex flex-col h-full"
              >
                <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center mb-6 text-orange-400">
                  {skill.icon}
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">{skill.title}</h3>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${getLevelColor(skill.level)}`}>
                    {skill.level}
                  </span>
                </div>
                
                <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                  {skill.description}
                </p>
                
                <div className="mb-6 text-sm text-gray-400">
                  <span>{skill.lessons} lessons</span>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-white font-medium mb-3">What you'll learn:</h4>
                  <ul className="space-y-2">
                    {skill.outcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-auto">
                  {isAuthenticated ? (
                    <Link 
                      to="/learning"
                      className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-medium py-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 border border-orange-500/30 hover:border-orange-400"
                    >
                      <span>Start Learning</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <Link 
                      to="/login"
                      className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-medium py-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 border border-orange-500/30 hover:border-orange-400"
                    >
                      <span>Get Started</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Your Learning Journey
          </h2>
          
          <div className="space-y-8">
            {skills.map((skill, index) => {
              return (
              <div key={skill.id} className="flex items-center space-x-6">
                <div className={`w-12 h-12 ${index === 0 ? 'bg-blue-500/20 text-blue-400' : index === 1 ? 'bg-green-500/20 text-green-400' : index === 2 ? 'bg-purple-500/20 text-purple-400' : index === 3 ? 'bg-orange-500/20 text-orange-400' : index === 4 ? 'bg-indigo-500/20 text-indigo-400' : 'bg-red-500/20 text-red-400'} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <span className="font-bold">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">{skill.title}</h3>
                  <p className="text-gray-400 text-sm">{skill.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">{skill.lessons} lessons</div>
                </div>
              </div>
            );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-r from-orange-600/10 to-yellow-600/10 backdrop-blur-sm border border-orange-500/30 rounded-2xl p-12">
            <Zap className="w-16 h-16 text-orange-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Financial Future?
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Start your financial literacy journey with expert-designed courses. 
              Get personalized learning, track your progress, and build real skills.
            </p>
            
            {isAuthenticated ? (
              <Link 
                to="/learning"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:transform hover:scale-105"
              >
                <span>Go to Learning Center</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            ) : (
              <div className="space-y-4">
                <Link 
                  to="/login"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:transform hover:scale-105"
                >
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <p className="text-gray-400 text-sm">
                  No credit card required • Free forever • Start learning immediately
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FinancialLiteracyShowcase;
