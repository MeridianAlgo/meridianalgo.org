import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import CalculatorBase from '../components/calculator/CalculatorBase';
import { allCalculators } from '../utils/calculators';
import { ArrowLeft, Calculator, Lock } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PublicCalculatorPage = () => {
  const { calculatorId } = useParams<{ calculatorId: string }>();
  const navigate = useNavigate();

  const calculator = allCalculators.find(c => c.id === calculatorId);

  useEffect(() => {
    if (calculator) {
      document.title = `${calculator.name} - MeridianAlgo`;
    }
  }, [calculator]);

  if (!calculator) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-md text-center">
            <Calculator className="w-20 h-20 text-gray-700 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-white mb-4">Calculator Not Found</h1>
            <p className="text-gray-400 mb-8">The calculator you're looking for doesn't exist.</p>
            <Link
              to="/tools"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Tools</span>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="bg-gradient-to-br from-orange-900/10 via-black to-yellow-900/10 border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link
              to="/tools"
              className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Tools</span>
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <CalculatorBase calculator={calculator} />

          {/* Sign Up CTA */}
          <div className="mt-12 bg-gradient-to-r from-orange-600/10 to-yellow-600/10 border border-orange-500/20 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Lock className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Save Your Calculations
                  </h3>
                  <p className="text-gray-300">
                    Create a free account to save your calculations, track your financial progress, and access personalized learning modules.
                  </p>
                </div>
              </div>
              <Link
                to="/login"
                className="flex-shrink-0 px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg whitespace-nowrap"
              >
                Sign Up Free
              </Link>
            </div>
          </div>

          {/* Related Tools */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-white mb-6">Related Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {allCalculators
                .filter(c => c.category === calculator.category && c.id !== calculator.id)
                .slice(0, 3)
                .map(relatedCalc => (
                  <div
                    key={relatedCalc.id}
                    onClick={() => navigate(`/calculator/${relatedCalc.id}`)}
                    className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-orange-500 transition-all cursor-pointer group"
                  >
                    <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">
                      {relatedCalc.name}
                    </h4>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {relatedCalc.description}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PublicCalculatorPage;
