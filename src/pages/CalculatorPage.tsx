import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';
import CalculatorBase from '../components/calculator/CalculatorBase';
import { allCalculators } from '../utils/calculators';
import { ArrowLeft, Calculator } from 'lucide-react';

const CalculatorPage = () => {
  const { calculatorId } = useParams<{ calculatorId: string }>();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(() => 
    typeof window !== 'undefined' ? window.innerWidth >= 768 : true
  );

  const calculator = allCalculators.find(c => c.id === calculatorId);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

  if (!calculator) {
    return (
      <div className="min-h-screen bg-gray-900 flex">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activePage="tools"
          user={user}
          onLogout={() => {
            logout();
            navigate('/');
          }}
        />
        <div className={`flex-1 overflow-y-auto transition-all duration-500 ${sidebarOpen ? 'ml-72' : 'ml-20'}`}>
          <div className="max-w-4xl mx-auto px-4 py-16 text-center">
            <Calculator className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-4">Calculator Not Found</h1>
            <Link
              to="/tools-center"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Tools</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activePage="financialTools"
        user={user}
        onLogout={() => {
          logout();
          navigate('/');
        }}
      />

      <div className={`flex-1 overflow-y-auto transition-all duration-500 ${sidebarOpen ? 'ml-72' : 'ml-20'}`}>
        <div className="bg-gray-800 border-b border-gray-700 px-4 sm:px-6 md:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            <Link
              to="/tools-center"
              className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Tools</span>
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8">
          <CalculatorBase calculator={calculator} />
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;
