import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Calculator, TrendingUp, PiggyBank, CreditCard, Home, 
  Car, GraduationCap, Heart, Briefcase, DollarSign,
  Search, Filter, X, ArrowRight
} from 'lucide-react';
import { allCalculators } from '../utils/calculators';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PublicTools = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Tools', icon: Calculator },
    { id: 'budgeting', name: 'Budgeting', icon: PiggyBank },
    { id: 'debt', name: 'Debt Management', icon: CreditCard },
    { id: 'investing', name: 'Investing', icon: TrendingUp },
    { id: 'retirement', name: 'Retirement', icon: Heart },
    { id: 'savings', name: 'Savings', icon: DollarSign },
    { id: 'mortgage', name: 'Mortgage & Home', icon: Home },
    { id: 'auto', name: 'Auto & Transport', icon: Car },
    { id: 'education', name: 'Education', icon: GraduationCap },
    { id: 'business', name: 'Business', icon: Briefcase },
  ];

  const filteredCalculators = allCalculators.filter(calc => {
    const matchesSearch = searchQuery === '' || 
      calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      calc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || calc.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.icon || Calculator;
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-orange-900/20 via-black to-yellow-900/20 border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl mb-6">
                <Calculator className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Financial Tools & Calculators
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Access {allCalculators.length}+ free financial calculators to help you make informed decisions about budgeting, investing, debt, retirement, and more.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-500/25"
                >
                  Sign Up for Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <a
                  href="#calculators"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl transition-all duration-300 border border-gray-700"
                >
                  Browse Tools
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Tools Section */}
        <div id="calculators" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Search and Filter */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-12">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search financial tools..."
                  className="w-full pl-12 pr-4 py-4 bg-black border border-gray-800 text-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center space-x-3">
                <Filter className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="bg-black border border-gray-800 text-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 min-w-[200px]"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {(searchQuery || categoryFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setCategoryFilter('all');
                  }}
                  className="flex items-center space-x-2 px-6 py-4 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Clear</span>
                </button>
              )}
            </div>

            <div className="mt-4 text-sm text-gray-400">
              Showing {filteredCalculators.length} of {allCalculators.length} tools
            </div>
          </div>

          {/* Calculator Grid */}
          {filteredCalculators.length === 0 ? (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-16 text-center">
              <Calculator className="w-20 h-20 text-gray-700 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-3">No tools found</h3>
              <p className="text-gray-400 mb-8 text-lg">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setCategoryFilter('all');
                }}
                className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors font-semibold"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCalculators.map((calculator) => {
                const Icon = getCategoryIcon(calculator.category);
                return (
                  <div
                    key={calculator.id}
                    className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-orange-500 transition-all duration-300 cursor-pointer group"
                    onClick={() => navigate(`/calculator/${calculator.id}`)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-xl flex items-center justify-center group-hover:from-orange-500/30 group-hover:to-yellow-500/30 transition-all">
                        <Icon className="w-7 h-7 text-orange-400" />
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-orange-400 transition-colors" />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">
                      {calculator.name}
                    </h3>
                    
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                      {calculator.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs px-3 py-1.5 bg-gray-800 text-gray-300 rounded-full border border-gray-700">
                        {categories.find(c => c.id === calculator.category)?.name || calculator.category}
                      </span>
                      <span className="text-xs text-orange-400 font-medium">Free Tool →</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Want to Save Your Calculations?
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Create a free account to save your calculations, track your progress, and access personalized financial learning.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-600 font-semibold rounded-xl hover:bg-orange-50 transition-all duration-300 shadow-lg"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PublicTools;
