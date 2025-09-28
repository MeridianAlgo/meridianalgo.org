import { useEffect, useState } from 'react';
import { 
  BookOpen, Clock, Award, Target, TrendingUp, 
  CheckCircle, Lock, PlayCircle, FileText,
  BarChart, Home, LogOut, Menu, ChevronLeft,
  Brain, Zap, Trophy, Flame, ArrowRight, User, Calculator
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import ContentService, { Module as ManifestModule, LessonInfo } from '../services/contentService';

interface TopicView {
  id: string;
  title: string;
  type: 'reading' | 'quiz' | 'exercise' | 'video';
  duration: string;
  completed: boolean;
  points: number;
}

interface ModuleView {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | string;
  topics: TopicView[];
  progress: number;
  locked: boolean;
  icon: JSX.Element;
  color: string;
}

const LearningCenter = () => {
  const { user, isAuthenticated, logout, progressData } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(() => (typeof window !== 'undefined' ? window.innerWidth >= 768 : true));
  const [modules, setModules] = useState<ModuleView[]>([]);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});
  const currentStreak = user?.learningStreak || 0;

  useEffect(() => {
    document.title = 'MeridianAlgo - Learning Platform';
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/learning' } } });
    }
  }, [isAuthenticated, navigate]);

  // Get user's completed concepts/quizzes for progress tracking
  const completedConcepts = user?.completedConcepts || [];
  const completedQuizzes = user?.completedQuizzes || [];
  
  // Helper function to check if a topic is completed
  const isTopicCompleted = (topicId: string) => completedConcepts.includes(topicId);

  // Helper function to calculate module progress
  const calculateModuleProgress = (topics: TopicView[]) => {
    const completedTopics = topics.filter(topic => isTopicCompleted(topic.id));
    return topics.length > 0 ? Math.round((completedTopics.length / topics.length) * 100) : 0;
  };

  // Map manifest icon string to a Lucide icon element
  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen className="w-5 h-5" />;
      case 'Target': return <Target className="w-5 h-5" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5" />;
      case 'BarChart': return <BarChart className="w-5 h-5" />;
      case 'Trophy': return <Trophy className="w-5 h-5" />;
      case 'FileText': return <FileText className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  // Tailwind dynamic color helper (avoid fully dynamic class names)
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'orange': return { bg: 'bg-orange-500/20', text: 'text-orange-400' };
      case 'green': return { bg: 'bg-green-500/20', text: 'text-green-400' };
      case 'purple': return { bg: 'bg-purple-500/20', text: 'text-purple-400' };
      case 'indigo': return { bg: 'bg-indigo-500/20', text: 'text-indigo-400' };
      case 'red': return { bg: 'bg-red-500/20', text: 'text-red-400' };
      case 'blue': return { bg: 'bg-blue-500/20', text: 'text-blue-400' };
      default: return { bg: 'bg-gray-600/20', text: 'text-gray-400' };
    }
  };

  const parseMinutes = (duration: string): number => {
    // expects strings like '15 min'
    const match = duration.match(/(\d+)\s*min/i);
    return match ? parseInt(match[1], 10) : 0;
  };

  // Load modules dynamically from manifest
  useEffect(() => {
    const load = async () => {
      const cs = ContentService.getInstance();
      const manifestModules = await cs.getModules();
      const built: ModuleView[] = manifestModules.map((m: ManifestModule) => {
        const topics: TopicView[] = m.lessons.map((l: LessonInfo) => ({
          id: l.id,
          title: l.title,
          type: (l.type as any),
          duration: l.duration,
          completed: isTopicCompleted(l.id),
          points: l.points,
        }));
        return {
          id: m.id,
          title: m.title,
          description: m.description,
          duration: m.duration,
          difficulty: m.difficulty,
          topics,
          progress: calculateModuleProgress(topics),
          locked: false, // Could lock based on prerequisites
          icon: getModuleIcon(m.icon),
          color: m.color,
        };
      });
      // sort by difficulty: Beginner < Intermediate < Advanced (unknown last)
      const order: Record<string, number> = { 'Beginner': 0, 'Intermediate': 1, 'Advanced': 2 };
      built.sort((a, b) => (order[a.difficulty] ?? 99) - (order[b.difficulty] ?? 99));
      setModules(built);
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user?.completedConcepts]);

  // Modules with user completion state are kept directly in state now
  const modulesWithProgress = modules;

  const getResumeLessonId = (moduleId: string, topics: TopicView[]): string | null => {
    try {
      if (typeof window !== 'undefined') {
        const last = localStorage.getItem(`meridianAlgo_lastLesson_${moduleId}`);
        if (last && topics.some(t => t.id === last)) return last;
      }
    } catch {}

    // Fallback to first incomplete
    const firstIncomplete = topics.find(t => !t.completed);
    return firstIncomplete ? firstIncomplete.id : null;
  };

  const isQuizCompleted = (moduleId: string): boolean => {
    // quiz ids in manifest are `${moduleId}_quiz`
    const quizIdPrefix = `${moduleId}_quiz`;
    return completedQuizzes?.some((q: string) => q.startsWith(quizIdPrefix));
  };

  // Use unified progress data from AuthContext
  const overallProgress = progressData?.progressPercentage || 0;
  const totalPoints = user?.totalPoints || 0;
  const completedLessons = progressData?.completedLessons || 0;

  // Calculate hours from actual durations of completed lessons and quizzes
  const totalMinutesFromLessons = modulesWithProgress.reduce((sum, m) => {
    return sum + m.topics.reduce((acc, t) => acc + (t.completed ? parseMinutes(t.duration) : 0), 0);
  }, 0);

  // Include quizzes' duration if completed
  const addQuizMinutes = async (): Promise<number> => {
    const cs = ContentService.getInstance();
    const manifestModules = await cs.getModules();
    let quizMinutes = 0;
    for (const m of manifestModules) {
      if (m.quiz && completedQuizzes.some((q: string) => q.startsWith(m.quiz.id))) {
        quizMinutes += parseMinutes(m.quiz.duration);
      }
    }
    return quizMinutes;
  };

  const [totalHours, setTotalHours] = useState<number>(0);
  useEffect(() => {
    const compute = async () => {
      const quizMin = await addQuizMinutes();
      const mins = totalMinutesFromLessons + quizMin;
      setTotalHours(Math.round((mins / 60) * 10) / 10);
    };
    compute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modulesWithProgress, user?.completedQuizzes]);

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'video': return <PlayCircle className="w-4 h-4" />;
      case 'reading': return <FileText className="w-4 h-4" />;
      case 'quiz': return <Brain className="w-4 h-4" />;
      case 'exercise': return <Target className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar - Coursera/LeetCode Style */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-800 border-r border-gray-700 transition-all duration-300 flex flex-col fixed h-full z-10`}>
        {/* Logo Section */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <Link to="/" className={`flex items-center ${!sidebarOpen && 'justify-center'}`}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              {sidebarOpen && (
                <span className="ml-3 text-xl font-bold text-white">Learn</span>
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

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <Link
              to="/"
              className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
            >
              <Home className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Back to Home</span>}
            </Link>
            <Link
              to="/dashboard"
              className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
            >
              <BarChart className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Dashboard</span>}
            </Link>
            <div className="flex items-center px-3 py-2 bg-orange-600 text-white rounded-lg">
              <BookOpen className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3 font-medium">My Learning</span>}
            </div>
            <Link
              to="/achievements"
              className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
            >
              <Trophy className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Achievements</span>}
            </Link>
            <Link
              to="/tools"
              className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
            >
              <Calculator className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Financial Tools</span>}
            </Link>
            <Link
              to="/profile"
              className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
            >
              <User className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Profile</span>}
            </Link>
          </div>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-700">
          <div className={`flex items-center ${!sidebarOpen && 'justify-center'}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            {sidebarOpen && (
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-gray-400">{totalPoints} points</p>
              </div>
            )}
          </div>
          {sidebarOpen && (
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="mt-4 w-full flex items-center justify-center px-3 py-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          )}
        </div>
      </div>

      {/* Floating expand button when sidebar is collapsed */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 left-4 z-20 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-gray-300 hover:text-white border border-gray-700"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}

      {/* Main Content */}
      <div className={`flex-1 overflow-y-auto ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Continue Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Learning Journey</span> 📚
              </h1>
              <p className="text-gray-300 mt-1">Continue your financial literacy journey</p>
            </div>
            <div className="flex items-center space-x-6">
              {/* Streak */}
              <div className="flex items-center space-x-2">
                <Flame className="w-6 h-6 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold text-white">{currentStreak}</p>
                  <p className="text-xs text-gray-400">day streak</p>
                </div>
              </div>
              {/* Points */}
              <div className="flex items-center space-x-2">
                <Zap className="w-6 h-6 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold text-white">{totalPoints}</p>
                  <p className="text-xs text-gray-400">total points</p>
                </div>
              </div>
              {/* Progress */}
              <div className="flex items-center space-x-2">
                <div className="w-32">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">Progress</span>
                    <span className="text-xs font-medium text-white">{overallProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-yellow-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${overallProgress}%` }}
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-400" />
                </div>
                <span className="text-2xl font-bold text-white">{modulesWithProgress.length}</span>
              </div>
              <p className="text-gray-400 text-sm">Total Modules</p>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <span className="text-2xl font-bold text-white">{completedLessons}</span>
              </div>
              <p className="text-gray-400 text-sm">Completed Lessons</p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-400" />
                </div>
                <span className="text-2xl font-bold text-white">{totalHours}</span>
              </div>
              <p className="text-gray-400 text-sm">Hours Learned</p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-orange-400" />
                </div>
                <span className="text-2xl font-bold text-white">{totalPoints}</span>
              </div>
              <p className="text-gray-400 text-sm">Points Earned</p>
            </div>
          </div>

          {/* Course Modules */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Your Learning Path</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {modulesWithProgress.map((module) => (
                <div
                  key={module.id}
                  className={`bg-gray-800 rounded-xl border ${
                    module.locked ? 'border-gray-700 opacity-60' : 'border-gray-700 hover:border-gray-600'
                  } transition-all duration-300 overflow-hidden`}
                >
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {(() => { const c = getColorClasses(module.color); return (
                          <div className={`w-12 h-12 ${c.bg} rounded-xl flex items-center justify-center ${c.text}`}>
                            {module.icon}
                          </div>
                        );})()}
                        <div>
                          <h3 className="text-lg font-bold text-white">{module.title}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(module.difficulty)}`}>
                              {module.difficulty}
                            </span>
                            <span className="text-xs text-gray-400">• {module.duration}</span>
                          </div>
                        </div>
                      </div>
                      {module.locked && <Lock className="w-5 h-5 text-gray-500" />}
                    </div>

                    <p className="text-gray-300 text-sm mb-4">{module.description}</p>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-400">Progress</span>
                        <span className="text-xs font-medium text-white">{module.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-orange-500 to-yellow-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${module.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Topics Preview */}
                    <div className="space-y-2 mb-4 overflow-auto pr-2 flex flex-col">
                      <div className="flex-1 min-h-[8rem]">
                        {(expandedModules[module.id] ? module.topics : module.topics.slice(0, 5)).map((topic) => (
                          <div key={topic.id} className="flex items-center justify-between py-2">
                            <Link to={`/lesson/${module.id}/${topic.id}`} className="flex items-center space-x-2 group">
                              {topic.completed ? (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              ) : (
                                <div className="w-4 h-4 border-2 border-gray-600 rounded-full" />
                              )}
                              <span className="text-sm text-gray-300 group-hover:text-white underline decoration-dotted underline-offset-4">
                                {topic.title}
                              </span>
                            </Link>
                            <div className="flex items-center space-x-2">
                              {getTypeIcon(topic.type)}
                              <span className="text-xs text-gray-400">{topic.duration}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      {module.topics.length > 5 && !expandedModules[module.id] && (
                        <button
                          onClick={() => setExpandedModules(prev => ({ ...prev, [module.id]: true }))}
                          className="text-xs text-gray-300 hover:text-white underline decoration-dotted underline-offset-4 pl-6 text-left"
                        >
                          +{module.topics.length - 5} more lessons
                        </button>
                      )}
                      {module.topics.length > 5 && expandedModules[module.id] && (
                        <button
                          onClick={() => setExpandedModules(prev => ({ ...prev, [module.id]: false }))}
                          className="text-xs text-gray-300 hover:text-white underline decoration-dotted underline-offset-4 pl-6 text-left"
                        >
                          Show less
                        </button>
                      )}
                    </div>

                    {/* Action Button */}
                    {module.locked ? (
                      <button
                        disabled
                        className="mt-auto w-full py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 bg-gray-700 text-gray-500 cursor-not-allowed"
                      >
                        <Lock className="w-4 h-4" />
                        <span>Locked</span>
                      </button>
                    ) : (
                      (() => {
                        const resumeId = getResumeLessonId(module.id, module.topics);
                        const allLessonsCompleted = module.topics.every(t => t.completed);
                        const quizDone = isQuizCompleted(module.id);
                        const href = allLessonsCompleted && !quizDone
                          ? `/quiz/${module.id}`
                          : `/lesson/${module.id}/${resumeId || module.topics[0].id}`;
                        return (
                          <Link
                            to={href}
                            className="mt-auto w-full py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white"
                          >
                            {module.progress > 0 ? (
                              <>
                                <span>Continue Learning</span>
                                <ArrowRight className="w-4 h-4" />
                              </>
                            ) : (
                              <>
                                <span>Start Module</span>
                                <ArrowRight className="w-4 h-4" />
                              </>
                            )}
                          </Link>
                        );
                      })()
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Next Steps */}
          <div className="mt-12 bg-gradient-to-r from-orange-600 to-orange-500 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready for the next challenge?</h3>
            <p className="text-orange-100 mb-6">
              Complete the Financial Foundations module to unlock Investment Basics and take your knowledge to the next level!
            </p>
            <Link 
              to="/financial-literacy"
              className="bg-white text-orange-600 px-6 py-3 rounded-lg font-medium hover:bg-orange-50 transition-colors inline-block"
            >
              View Learning Path
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningCenter;
