import { useEffect } from 'react';
import { Cpu, Brain, ChevronDown, Network, BarChart3, Lock, Globe } from 'lucide-react';

const AI = () => {
    useEffect(() => {
        document.title = 'MeridianAlgo - AI & Machine Learning';
    }, []);

    const scrollToContent = () => {
        const content = document.getElementById('projects');
        if (content) {
            content.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="relative min-h-screen w-full bg-black text-white">
            {/* Background Pattern */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 [background-image:radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:20px_20px]"></div>
            </div>

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none"></div>
                </div>

                <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl mb-8 border border-purple-500/30">
                        <Brain className="w-10 h-10 text-purple-400" />
                    </div>

                    <h1 className="text-4xl md:text-7xl font-display font-bold mb-6 leading-tight uppercase tracking-tight text-white">
                        Artificial <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Intelligence</span>
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto mb-8"></div>
                    <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light mb-10">
                        Pioneering financial intelligence with custom Large Language Models and multi-objective trading engines.
                    </p>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer animate-bounce">
                    <button onClick={scrollToContent} className="text-gray-500 hover:text-white transition-colors cursor-target">
                        <ChevronDown className="w-8 h-8" />
                    </button>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-32 relative bg-black">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 gap-24">

                        {/* FinAI Card - Full Width Detail - Removed Image Section */}
                        <div className="group relative bg-gray-900/40 border border-gray-800 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-sm overflow-hidden hover:border-blue-400/30 transition-all duration-500 cursor-target">
                            <div className="absolute -right-20 -top-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>

                            <div className="relative z-10 grid md:grid-cols-1 gap-12 items-center">
                                <div>
                                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-blue-400 mb-6 block flex items-center gap-2">
                                        <Brain className="w-4 h-4" />
                                        Research & Development
                                    </span>
                                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 uppercase tracking-tight">FinAI</h2>
                                    <p className="text-gray-300 text-lg leading-relaxed mb-8 font-light">
                                        FinAI represents our initiative to build a domain-specific Large Language Model (LLM) tailored for the financial sector. Unlike general-purpose models, FinAI is being trained on a curated corpus of financial reports, market analysis, regulatory documents, and economic research.
                                    </p>
                                    <p className="text-gray-400 leading-relaxed mb-8 font-light">
                                        The goal is to create an assistant capable of understanding complex financial queries, generating accurate market summaries, and assisting with quantitative research tasks—all while prioritizing data privacy and reduced hallucination rates.
                                    </p>
                                    <div className="flex flex-wrap gap-4 mb-8">
                                        <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                            <Network className="w-4 h-4 text-blue-400" />
                                            <span className="text-sm text-blue-300">Transformer Architecture</span>
                                        </div>
                                        <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                            <Lock className="w-4 h-4 text-blue-400" />
                                            <span className="text-sm text-blue-300">Privacy Focus</span>
                                        </div>
                                    </div>
                                    <a href="https://github.com/MeridianAlgo/FinAI" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-500/25 uppercase tracking-wide text-sm cursor-target">
                                        View Repository <Globe className="w-4 h-4 ml-2" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Midnight.AI Card - Full Width Detail - Removed Image Section */}
                        <div className="group relative bg-gray-900/40 border border-gray-800 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-sm overflow-hidden hover:border-purple-400/30 transition-all duration-500 cursor-target">
                            <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all"></div>

                            <div className="relative z-10 grid md:grid-cols-1 gap-12 items-center">
                                <div className="order-1 md:order-2">
                                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-purple-400 mb-6 block flex items-center gap-2">
                                        <Cpu className="w-4 h-4" />
                                        Algorithmic Trading Engine
                                    </span>
                                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 uppercase tracking-tight">Midnight.AI</h2>
                                    <p className="text-gray-300 text-lg leading-relaxed mb-8 font-light">
                                        Midnight.AI is our flagship multi-objective trading engine. It combines traditional quantitative strategies with deep reinforcement learning models to adapt to changing market conditions.
                                    </p>
                                    <p className="text-gray-400 leading-relaxed mb-8 font-light">
                                        The platform features seamless integration with the Alpaca API for paper trading and live execution. It includes a robust backtesting suite that allows researchers to simulate strategies across historical datasets, visualizing performance metrics and drawdown risks before deployment.
                                    </p>
                                    <div className="flex flex-wrap gap-4 mb-8">
                                        <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                            <BarChart3 className="w-4 h-4 text-purple-400" />
                                            <span className="text-sm text-purple-300">Backtesting Suite</span>
                                        </div>
                                        <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                            <Globe className="w-4 h-4 text-purple-400" />
                                            <span className="text-sm text-purple-300">Alpaca Integration</span>
                                        </div>
                                    </div>
                                    <a href="https://github.com/MeridianAlgo/Midnight.AI" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-purple-500/25 uppercase tracking-wide text-sm cursor-target">
                                        View Repository <Globe className="w-4 h-4 ml-2" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* AraAI Card - Full Width Detail */}
                        <div className="group relative bg-gray-900/40 border border-gray-800 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-sm overflow-hidden hover:border-cyan-400/30 transition-all duration-500 cursor-target">
                            <div className="absolute -right-20 -top-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all"></div>

                            <div className="relative z-10 grid md:grid-cols-1 gap-12 items-center">
                                <div>
                                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400 mb-6 block flex items-center gap-2">
                                        <Brain className="w-4 h-4" />
                                        Advanced Prediction
                                    </span>
                                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 uppercase tracking-tight">AraAI</h2>
                                    <p className="text-gray-300 text-lg leading-relaxed mb-8 font-light">
                                        AraAI is our specialized stock volatility forecasting platform. By leveraging Liquid Time-Constant (LTC) networks and S4 models, AraAI analyzes micro-market structures to predict price fluctuations with high precision.
                                    </p>
                                    <p className="text-gray-400 leading-relaxed mb-8 font-light">
                                        Designed for quantitative analysts, AraAI provides probability distributions for future price movement, enabling more informed risk management and options pricing strategies.
                                    </p>
                                    <div className="flex flex-wrap gap-4 mb-8">
                                        <div className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                                            <Network className="w-4 h-4 text-cyan-400" />
                                            <span className="text-sm text-cyan-300">LTC Networks</span>
                                        </div>
                                        <div className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                                            <BarChart3 className="w-4 h-4 text-cyan-400" />
                                            <span className="text-sm text-cyan-300">Volatility Forecasting</span>
                                        </div>
                                    </div>
                                    <a href="https://github.com/MeridianAlgo/AraAI" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-cyan-500/25 uppercase tracking-wide text-sm cursor-target">
                                        View Repository <Globe className="w-4 h-4 ml-2" />
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Research Stats */}
            <section className="py-24 border-t border-gray-800/50">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h3 className="text-2xl font-bold mb-12 uppercase tracking-widest text-gray-500">Technology Stack</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="p-6 bg-gray-900/50 rounded-2xl border border-gray-800 hover:border-blue-500/30 transition-colors cursor-target">
                            <div className="text-3xl font-bold text-blue-400 mb-2">LLM</div>
                            <div className="text-xs text-gray-400 uppercase tracking-wider">Transformer Models</div>
                        </div>
                        <div className="p-6 bg-gray-900/50 rounded-2xl border border-gray-800 hover:border-purple-500/30 transition-colors cursor-target">
                            <div className="text-3xl font-bold text-purple-400 mb-2">RL</div>
                            <div className="text-xs text-gray-400 uppercase tracking-wider">Reinforcement Learning</div>
                        </div>
                        <div className="p-6 bg-gray-900/50 rounded-2xl border border-gray-800 hover:border-green-500/30 transition-colors cursor-target">
                            <div className="text-3xl font-bold text-green-400 mb-2">PyTorch</div>
                            <div className="text-xs text-gray-400 uppercase tracking-wider">Deep Learning Framework</div>
                        </div>
                        <div className="p-6 bg-gray-900/50 rounded-2xl border border-gray-800 hover:border-orange-500/30 transition-colors cursor-target">
                            <div className="text-3xl font-bold text-orange-400 mb-2">API</div>
                            <div className="text-xs text-gray-400 uppercase tracking-wider">Real-time Data</div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AI;
