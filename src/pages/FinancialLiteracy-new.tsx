import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, TrendingUp, Target, ArrowRight, Lock, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const FinancialLiteracy = () => {
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        document.title = 'MeridianAlgo - Financial Literacy';
    }, []);

    const modules = [
        {
            id: 'budgeting-basics',
            title: 'Budgeting Basics',
            description: 'Master the fundamentals of managing your money',
            lessons: 4,
            duration: '30 min',
            level: 'Beginner',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            id: 'investing-101',
            title: 'Investing 101',
            description: 'Learn how to grow your wealth through smart investments',
            lessons: 6,
            duration: '45 min',
            level: 'Beginner',
            color: 'from-green-500 to-emerald-500'
        },
        {
            id: 'credit-debt',
            title: 'Credit & Debt Management',
            description: 'Build credit and manage debt effectively',
            lessons: 5,
            duration: '40 min',
            level: 'Intermediate',
            color: 'from-purple-500 to-pink-500'
        },
        {
            id: 'retirement-planning',
            title: 'Retirement Planning',
            description: 'Secure your financial future with smart planning',
            lessons: 5,
            duration: '50 min',
            level: 'Intermediate',
            color: 'from-orange-500 to-red-500'
        },
        {
            id: 'tax-strategies',
            title: 'Tax Strategies',
            description: 'Optimize your taxes and maximize returns',
            lessons: 4,
            duration: '35 min',
            level: 'Advanced',
            color: 'from-yellow-500 to-orange-500'
        },
        {
            id: 'real-estate',
            title: 'Real Estate Investing',
            description: 'Build wealth through property investments',
            lessons: 6,
            duration: '60 min',
            level: 'Advanced',
            color: 'from-teal-500 to-cyan-500'
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 [background-image:radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:20px_20px]"></div>
                </div>

                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-2xl mb-8">
                            <BookOpen className="w-10 h-10 text-orange-400" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
                            Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Financial Literacy</span>
                        </h1>
                        <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto mb-8"></div>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light mb-8">
                            Build essential financial skills through interactive lessons, practical tools, and expert guidance. Start your journey to financial freedom today.
                        </p>

                        {!isAuthenticated && (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <Link
                                    to="/login"
                                    className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/50 flex items-center gap-2"
                                >
                                    <Lock className="w-5 h-5" />
                                    Sign In to Start Learning
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gradient-to-br from-orange-900/20 to-yellow-900/20 border-y border-orange-500/20">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        {[
                            { number: '50+', label: 'Interactive Lessons' },
                            { number: '10+', label: 'Learning Modules' },
                            { number: '25+', label: 'Financial Tools' },
                            { number: '10,000+', label: 'Students Taught' }
                        ].map((stat, index) => (
                            <div key={index}>
                                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-2">{stat.number}</div>
                                <div className="text-gray-300 text-lg">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Learning Modules */}
            <section className="py-24 bg-black">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-xs uppercase tracking-widest text-orange-400 font-mono mb-6 inline-block bg-orange-400/10 px-4 py-2 rounded-full">Learning Path</span>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 leading-tight">
                            Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Modules</span>
                        </h2>
                        <div className="w-16 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {modules.map((module, index) => (
                            <div
                                key={module.id}
                                className="group relative bg-gray-900/50 rounded-2xl p-8 border border-gray-800 hover:border-orange-400/40 transition-all duration-300 hover:scale-[1.02]"
                            >
                                <div className={`w-16 h-16 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center mb-6 opacity-80 group-hover:opacity-100 transition-opacity`}>
                                    <BookOpen className="w-8 h-8 text-white" />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-3">{module.title}</h3>
                                <p className="text-gray-400 mb-6 text-sm leading-relaxed">{module.description}</p>

                                <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                                    <span>{module.lessons} lessons</span>
                                    <span>•</span>
                                    <span>{module.duration}</span>
                                    <span>•</span>
                                    <span className="text-orange-400">{module.level}</span>
                                </div>

                                {isAuthenticated ? (
                                    <Link
                                        to="/learning"
                                        className="inline-flex items-center justify-center w-full px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-all duration-300 group"
                                    >
                                        Start Learning
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                ) : (
                                    <Link
                                        to="/login"
                                        className="inline-flex items-center justify-center w-full px-6 py-3 border-2 border-orange-400 text-orange-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 rounded-xl font-medium transition-all duration-300"
                                    >
                                        <Lock className="w-4 h-4 mr-2" />
                                        Sign In to Access
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-gray-900/50">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 leading-tight">
                            Why Learn <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">With Us</span>?
                        </h2>
                        <div className="w-16 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Target className="w-8 h-8" />,
                                title: 'Practical & Actionable',
                                description: 'Real-world lessons you can apply immediately to improve your financial situation.'
                            },
                            {
                                icon: <TrendingUp className="w-8 h-8" />,
                                title: 'Track Your Progress',
                                description: 'Monitor your learning journey with detailed analytics and achievement badges.'
                            },
                            {
                                icon: <CheckCircle className="w-8 h-8" />,
                                title: 'Expert-Verified Content',
                                description: 'All content is reviewed by financial professionals and educators.'
                            }
                        ].map((feature, index) => (
                            <div key={index} className="bg-black/60 p-8 rounded-2xl border border-gray-800 hover:border-orange-400/40 transition-all">
                                <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-xl flex items-center justify-center mb-6 text-orange-400">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-black">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to Transform Your Financial Life?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Join thousands of learners who have already started their journey to financial freedom.
                    </p>
                    <Link
                        to={isAuthenticated ? '/learning' : '/login'}
                        className="inline-block px-12 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/50"
                    >
                        {isAuthenticated ? 'Go to Learning Center' : 'Get Started Free'}
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default FinancialLiteracy;
