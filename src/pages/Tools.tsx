import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';
import { 
  Calculator, TrendingUp, PiggyBank, CreditCard, Home, 
  Car, GraduationCap, Heart, Briefcase, DollarSign,
  Search, Filter, X, ArrowRight
} from 'lucide-react';
import { allCalculators } from '../utils/calculators';

const Tools = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(() => 
    typeof window !== 'undefined' ? window.innerWidth >= 768 : true
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

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
    <div className="min-h-screen bg-gray-900 flex">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activePage="financialTools"
        user={user!}
        onLogout={() => {
          logout();
          navigate('/');
        }}
      />

      <div className={`flex-1 overflow-y-auto transition-all duration-500 ${sidebarOpen ? 'ml-72' : 'ml-20'}`}>
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700 px-4 sm:px-6 md:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-2">Financial Tools</h1>
            <p className="text-gray-300">
              Access {allCalculators.length}+ calculators and tools to help you make informed financial decisions
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8">
          {/* Search and Filter */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tools..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-orange-400" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="bg-gray-900 border border-gray-700 text-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                  className="flex items-center space-x-2 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors"
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
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
              <Calculator className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No tools found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setCategoryFilter('all');
                }}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
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
                    className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-orange-500 transition-all duration-300 cursor-pointer group"
                    onClick={() => navigate(`/tools/${calculator.id}`)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center group-hover:bg-orange-500/30 transition-colors">
                        <Icon className="w-6 h-6 text-orange-400" />
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-orange-400 transition-colors" />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">
                      {calculator.name}
                    </h3>
                    
                    <p className="text-sm text-gray-400 mb-4">
                      {calculator.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs px-3 py-1 bg-gray-700 text-gray-300 rounded-full">
                        {categories.find(c => c.id === calculator.category)?.name || calculator.category}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tools;
