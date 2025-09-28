import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ContentService, { QuizContent, QuizQuestion } from '../services/contentService';
import { 
  BookOpen, CheckCircle, ArrowLeft, ArrowRight, Brain, 
  Home, LogOut, Menu, ChevronLeft, BarChart, Trophy, 
  Clock, Award, AlertCircle, Star
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const QuizPage: React.FC = () => {
  const { user, isAuthenticated, updateProgress, completeQuiz } = useAuth();
  const navigate = useNavigate();
  const { moduleId } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(() => (typeof window !== 'undefined' ? window.innerWidth >= 768 : true));
  const [quizData, setQuizData] = useState<{ info: any; content: QuizContent } | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number | boolean }>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    document.title = 'MeridianAlgo - Quiz';
    loadQuizData();
  }, [moduleId]);

  const loadQuizData = async () => {
    if (!moduleId) return;
    
    setLoading(true);
    try {
      const contentService = ContentService.getInstance();
      const quiz = await contentService.getQuiz(moduleId);
      
      if (quiz) {
        setQuizData(quiz);
        document.title = `MeridianAlgo - ${quiz.content.title}`;
      }
    } catch (error) {
      console.error('Error loading quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/quiz/${moduleId}` } } });
    }
  }, [isAuthenticated, navigate, moduleId]);

  if (!isAuthenticated || !user) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Quiz not found</p>
          <Link to="/learning" className="text-orange-400 hover:text-orange-300">Back to Learning Center</Link>
        </div>
      </div>
    );
  }

  const handleAnswer = (questionId: number, answer: number | boolean) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const calculateScore = () => {
    let correct = 0;
    quizData.content.questions.forEach(question => {
      if (answers[question.id] === question.correct) {
        correct++;
      }
    });
    return Math.round((correct / quizData.content.questions.length) * 100);
  };

  const handleSubmitQuiz = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setShowResults(true);
    
    // Record quiz completion (kept separate from lessons)
    if (finalScore >= quizData.content.passingScore && completeQuiz) {
      completeQuiz(quizData.info.id, finalScore);
    }
  };

  const quizId = quizData?.info.id || '';
  const isCompleted = user.completedQuizzes?.some?.((q: string) => q.startsWith(quizId)) || false;
  const currentQ = quizData.content.questions[currentQuestion];

  if (showResults) {
    const passed = score >= quizData.content.passingScore;
    
    return (
      <div className="min-h-screen bg-gray-900 flex">
        {/* Sidebar - same as lesson page */}
        <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-800 border-r border-gray-700 transition-all duration-300 flex flex-col fixed h-full z-10`}>
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <Link to="/learning" className={`flex items-center ${!sidebarOpen && 'justify-center'}`}>
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                {sidebarOpen && (
                  <span className="ml-3 text-xl font-bold text-white">Quiz Results</span>
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

          <nav className="flex-1 p-4">
            <div className="space-y-2">
              <Link to="/" className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors">
                <Home className="w-5 h-5" />
                {sidebarOpen && <span className="ml-3">Back to Home</span>}
              </Link>
              <Link to="/learning" className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors">
                <BookOpen className="w-5 h-5" />
                {sidebarOpen && <span className="ml-3">Learning Center</span>}
              </Link>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className={`flex-1 overflow-y-auto ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
          <div className="px-8 py-6">
            <div className="max-w-4xl mx-auto">
              <div className={`text-center p-12 rounded-2xl border ${passed ? 'bg-green-600/10 border-green-500/30' : 'bg-red-600/10 border-red-500/30'}`}>
                {passed ? (
                  <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
                ) : (
                  <AlertCircle className="w-20 h-20 text-red-400 mx-auto mb-6" />
                )}
                
                <h1 className="text-4xl font-bold text-white mb-4">
                  {passed ? 'Congratulations!' : 'Keep Learning!'}
                </h1>
                
                <p className="text-xl text-gray-300 mb-8">
                  You scored {score}% on the {quizData.content.title}
                </p>

                <div className="bg-gray-800 rounded-xl p-6 mb-8 max-w-md mx-auto">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-400">Your Score</span>
                    <span className={`text-2xl font-bold ${passed ? 'text-green-400' : 'text-red-400'}`}>
                      {score}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-400">Passing Score</span>
                    <span className="text-gray-300">{quizData.content.passingScore}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Questions Correct</span>
                    <span className="text-gray-300">
                      {Math.round((score / 100) * quizData.content.questions.length)} / {quizData.content.questions.length}
                    </span>
                  </div>
                </div>

                {passed && (
                  <div className="bg-gradient-to-r from-orange-600/10 to-yellow-600/10 rounded-xl p-6 mb-8 border border-orange-500/30">
                    <Award className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                    <p className="text-orange-300 font-medium">
                      You earned +{quizData.info.points} points!
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-center space-x-4">
                  {!passed && (
                    <button
                      onClick={() => {
                        setShowResults(false);
                        setCurrentQuestion(0);
                        setAnswers({});
                        setScore(0);
                      }}
                      className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl transition-all"
                    >
                      Try Again
                    </button>
                  )}
                  
                  <Link
                    to="/learning"
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-all"
                  >
                    Back to Learning
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If quiz already completed, block retake
  if (isCompleted && !showResults) {
    return (
      <div className="min-h-screen bg-gray-900 flex">
        <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-800 border-r border-gray-700 transition-all duration-300 flex flex-col fixed h-full z-10`}>
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <Link to="/learning" className={`flex items-center ${!sidebarOpen && 'justify-center'}`}>
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                {sidebarOpen && (
                  <span className="ml-3 text-xl font-bold text-white">Quiz</span>
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
        </div>
        <div className={`flex-1 overflow-y-auto ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
          <div className="px-8 py-6">
            <div className="max-w-3xl mx-auto text-center">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-white mb-2">Quiz Completed</h1>
              <p className="text-gray-300 mb-6">You've already completed the {quizData.content.title}. Retakes are disabled.</p>
              <Link to="/learning" className="inline-flex items-center space-x-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl transition-all">
                <span>Back to Learning</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-800 border-r border-gray-700 transition-all duration-300 flex flex-col fixed h-full z-10`}>
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <Link to="/learning" className={`flex items-center ${!sidebarOpen && 'justify-center'}`}>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              {sidebarOpen && (
                <span className="ml-3 text-xl font-bold text-white">Quiz</span>
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

        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <Link to="/" className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors">
              <Home className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Back to Home</span>}
            </Link>
            <Link to="/learning" className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors">
              <BookOpen className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Learning Center</span>}
            </Link>
          </div>
        </nav>
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
                  {quizData.content.title}
                </h1>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center space-x-1 text-gray-400">
                    <Brain className="w-4 h-4" />
                    <span className="text-sm">Quiz</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{quizData.info.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-orange-400">
                    <Award className="w-4 h-4" />
                    <span className="text-sm font-medium">+{quizData.info.points} points</span>
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

        {/* Quiz Content */}
        <div className="px-8 py-6">
          <div className="max-w-4xl mx-auto">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">
                  Question {currentQuestion + 1} of {quizData.content.questions.length}
                </span>
                <span className="text-gray-400 text-sm">
                  {Math.round(((currentQuestion + 1) / quizData.content.questions.length) * 100)}% Complete
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / quizData.content.questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                {currentQ.question}
              </h2>

              {currentQ.type === 'multiple-choice' && currentQ.options && (
                <div className="space-y-3">
                  {currentQ.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(currentQ.id, index)}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        answers[currentQ.id] === index
                          ? 'bg-orange-600/20 border-orange-500 text-white'
                          : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center text-sm font-bold ${
                          answers[currentQ.id] === index
                            ? 'bg-orange-500 border-orange-500 text-white'
                            : 'border-gray-500'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </span>
                        {option}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {currentQ.type === 'true-false' && (
                <div className="space-y-3">
                  {[true, false].map((value) => (
                    <button
                      key={value.toString()}
                      onClick={() => handleAnswer(currentQ.id, value)}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        answers[currentQ.id] === value
                          ? 'bg-orange-600/20 border-orange-500 text-white'
                          : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center text-sm font-bold ${
                          answers[currentQ.id] === value
                            ? 'bg-orange-500 border-orange-500 text-white'
                            : 'border-gray-500'
                        }`}>
                          {value ? 'T' : 'F'}
                        </span>
                        {value ? 'True' : 'False'}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-all border border-gray-700 hover:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center space-x-4">
                {currentQuestion < quizData.content.questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQuestion(currentQuestion + 1)}
                    disabled={answers[currentQ.id] === undefined}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={Object.keys(answers).length < quizData.content.questions.length}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Submit Quiz</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
