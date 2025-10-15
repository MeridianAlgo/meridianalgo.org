import { useEffect, useState } from 'react';
import { 
  BookOpen, Clock, Award, Target, TrendingUp, 
  CheckCircle, Lock, PlayCircle, FileText, BarChart,
  Brain, Zap, Trophy, Flame, ArrowRight, ArrowUp, Filter, ChevronDown, Search, X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import ContentService, { Module as ManifestModule, LessonInfo } from '../services/contentService';
import Sidebar from '../components/Sidebar';
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
  status?: 'active' | 'coming-soon' | 'locked';
}

const LearningCenter = () => {
  const { user, isAuthenticated, logout, progressData, unlockModule } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(() => (typeof window !== 'undefined' ? window.innerWidth >= 768 : true));
  const [modules, setModules] = useState<ModuleView[]>([]);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});
  const [expandedLockInfo, setExpandedLockInfo] = useState<Record<string, boolean>>({});
  const [unlockMessages, setUnlockMessages] = useState<Record<string, string>>({});
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Load filters from localStorage or use defaults
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('meridianAlgo_searchQuery') || '';
    }
    return '';
  });
  const [difficultyFilter, setDifficultyFilter] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('meridianAlgo_difficultyFilter') || 'all';
    }
    return 'all';
  });
  const [completionFilter, setCompletionFilter] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('meridianAlgo_completionFilter') || 'all';
    }
    return 'all';
  });
  const [formatFilter, setFormatFilter] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('meridianAlgo_formatFilter') || 'all';
    }
    return 'all';
  });
  
  const currentStreak = user?.learningStreak || 0;

  useEffect(() => {
    document.title = 'MeridianAlgo - Learning Platform';
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/learning' } } });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Persist filters to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('meridianAlgo_searchQuery', searchQuery);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('meridianAlgo_difficultyFilter', difficultyFilter);
    }
  }, [difficultyFilter]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('meridianAlgo_completionFilter', completionFilter);
    }
  }, [completionFilter]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('meridianAlgo_formatFilter', formatFilter);
    }
  }, [formatFilter]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

        const moduleProgressPercent = calculateModuleProgress(topics);

        const builtModule: ModuleView = {
          id: m.id,
          title: m.title,
          description: m.description,
          duration: m.duration,
          difficulty: m.difficulty,
          topics,
          progress: moduleProgressPercent,
          locked: false,
          icon: getModuleIcon(m.icon),
          color: m.color,
          status: m.status,
        };

        return builtModule;
      });
      // sort by difficulty: Beginner < Intermediate < Advanced (unknown last)
      const order: Record<string, number> = { 'Beginner': 0, 'Intermediate': 1, 'Advanced': 2 };
      built.sort((a, b) => (order[a.difficulty] ?? 99) - (order[b.difficulty] ?? 99));
      const lockedModules = applyModuleLocks(built);
      setModules(lockedModules);
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user?.completedConcepts, user?.unlockedModules]);

  const applyModuleLocks = (orderedModules: ModuleView[]): ModuleView[] => {
    let beginnerComplete = true;
    let intermediateComplete = true;
    const unlockedSet = new Set(user?.unlockedModules || []);

    const updated = orderedModules.map((module) => {
      let locked = false;

      // Always lock coming-soon modules
      if (module.status === 'coming-soon') {
        locked = true;
      } else {
        if (module.difficulty === 'Intermediate' && !beginnerComplete) {
          locked = true;
        }

        if (module.difficulty === 'Advanced' && (!beginnerComplete || !intermediateComplete)) {
          locked = true;
        }
      }

      if (module.difficulty === 'Beginner' && module.progress < 100) {
        beginnerComplete = false;
      }

      if (module.difficulty === 'Intermediate' && module.progress < 100) {
        intermediateComplete = false;
      }

      return {
        ...module,
        locked: module.status === 'coming-soon' ? true : (locked && !unlockedSet.has(module.id))
      };
    });

    return updated;
  };

  const refreshModuleLocks = () => {
    setModules(prev => {
      const cloned = prev.map(m => ({ ...m }));
      return applyModuleLocks(cloned);
    });
  };

  const getUnlockCost = (difficulty: string) => {
    switch (difficulty) {
      case 'Intermediate':
        return 800;
      case 'Advanced':
        return 1200;
      default:
        return 0;
    }
  };

  const handleUnlock = (moduleId: string, difficulty: string) => {
    const cost = getUnlockCost(difficulty);
    if (!cost) return;
    const success = unlockModule(moduleId, cost);
    if (success) {
      refreshModuleLocks();
      setUnlockMessages(prev => ({ ...prev, [moduleId]: `Module unlocked! ${cost} points spent.` }));
    } else {
      setUnlockMessages(prev => ({ ...prev, [moduleId]: `Not enough points. You need ${cost} points to unlock.` }));
    }
  };

  // Modules with user completion state are kept directly in state now
  const modulesWithProgress = modules;

  const filteredModules = modulesWithProgress.filter((module) => {
    const searchMatch = searchQuery === '' || 
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description.toLowerCase().includes(searchQuery.toLowerCase());
    const difficultyMatch =
      difficultyFilter === 'all' || module.difficulty?.toLowerCase() === difficultyFilter;
    const completionMatch =
      completionFilter === 'all' ||
      (completionFilter === 'completed' && module.progress === 100) ||
      (completionFilter === 'in-progress' && module.progress > 0 && module.progress < 100) ||
      (completionFilter === 'not-started' && module.progress === 0);
    const formatMatch =
      formatFilter === 'all' || module.topics.some((topic) => topic.type === formatFilter);
    return searchMatch && difficultyMatch && completionMatch && formatMatch;
  });

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

  if (!isAuthenticated || !user) {
    return null;
  }

  const firstName = user.name.split(' ')[0] || user.name;

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activePage="learning"
        user={user}
        onLogout={() => {
          logout();
          navigate('/');
        }}
      />

      <div className={`flex-1 overflow-y-auto transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${sidebarOpen ? 'ml-72' : 'ml-20'}`}>
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700 px-4 sm:px-6 md:px-8 py-4 sm:py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">{firstName}</span> 📚
              </h1>
              <p className="text-gray-300 mt-1 text-sm sm:text-base">Continue your financial literacy journey</p>
            </div>
            <div className="flex items-center flex-wrap gap-4 sm:gap-6">
              {/* Streak */}
              <div className="flex items-center space-x-2">
                <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-white">{currentStreak}</p>
                  <p className="text-xs text-gray-400">day streak</p>
                </div>
              </div>
              {/* Points */}
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-white">{totalPoints}</p>
                  <p className="text-xs text-gray-400">total points</p>
                </div>
              </div>
              {/* Progress */}
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <div className="w-full sm:w-32">
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

        {/* Filters */}
        <div className="px-4 sm:px-6 md:px-8 pt-6">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 sm:p-5 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-white">Customize your learning</h2>
                <p className="text-sm text-gray-400">Search and filter modules to find what you need.</p>
              </div>
              {(searchQuery || difficultyFilter !== 'all' || completionFilter !== 'all' || formatFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setDifficultyFilter('all');
                    setCompletionFilter('all');
                    setFormatFilter('all');
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors text-sm min-h-[44px]"
                >
                  <X className="w-4 h-4" />
                  <span>Clear Filters</span>
                </button>
              )}
            </div>
            
            {/* Search Bar */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search modules by title or description..."
                className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 hover:border-gray-600 min-h-[44px]"
              />
            </div>
            
            {/* Filter Dropdowns */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  className="bg-gray-900 border border-gray-700 text-gray-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 w-full sm:w-auto min-h-[44px]"
                >
                  <option value="all">All difficulties</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div className="w-full sm:w-auto">
                <select
                  value={completionFilter}
                  onChange={(e) => setCompletionFilter(e.target.value)}
                  className="bg-gray-900 border border-gray-700 text-gray-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 w-full sm:w-auto min-h-[44px]"
                >
                  <option value="all">All progress states</option>
                  <option value="completed">Completed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="not-started">Not Started</option>
                </select>
              </div>
              <div className="w-full sm:w-auto">
                <select
                  value={formatFilter}
                  onChange={(e) => setFormatFilter(e.target.value)}
                  className="bg-gray-900 border border-gray-700 text-gray-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 w-full sm:w-auto min-h-[44px]"
                >
                  <option value="all">All formats</option>
                  <option value="reading">Reading Guides</option>
                  <option value="video">Video Lessons</option>
                  <option value="exercise">Interactive Exercises</option>
                  <option value="quiz">Knowledge Checks</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        {/* Stats Cards */}
        <div className="px-4 sm:px-6 md:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Your Learning Path</h2>
              <span className="text-sm text-gray-400">
                {filteredModules.length} {filteredModules.length === 1 ? 'module' : 'modules'}
              </span>
            </div>
            
            {filteredModules.length === 0 ? (
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 sm:p-12 text-center">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No modules found</h3>
                <p className="text-gray-400 mb-6">
                  Try adjusting your filters or search query to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setDifficultyFilter('all');
                    setCompletionFilter('all');
                    setFormatFilter('all');
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white rounded-lg transition-all duration-300 font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {filteredModules.map((module) => (
                <div
                  key={module.id}
                  className={`bg-gray-800 rounded-xl border ${
                    module.locked ? 'border-gray-700 opacity-60' : 'border-gray-700 hover:border-gray-600'
                  } transition-all duration-300 overflow-hidden`}
                >
                  <div className="p-4 sm:p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                        {(() => { const c = getColorClasses(module.color); return (
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 ${c.bg} rounded-xl flex items-center justify-center ${c.text} flex-shrink-0`}>
                            {module.icon}
                          </div>
                        );})()}
                        <div className="min-w-0 flex-1">
                          <h3 className="text-base sm:text-lg font-bold text-white truncate">{module.title}</h3>
                          <div className="flex items-center flex-wrap gap-1 sm:gap-2 mt-1">
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(module.difficulty)}`}>
                              {module.difficulty}
                            </span>
                            {module.status === 'coming-soon' && (
                              <span className="text-xs px-2 py-1 rounded-full font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                                Coming Soon
                              </span>
                            )}
                            <span className="text-xs text-gray-400">• {module.duration}</span>
                          </div>
                        </div>
                      </div>
                      {module.locked && <Lock className="w-5 h-5 text-gray-500 flex-shrink-0" />}
                    </div>

                    <p className="text-gray-300 text-xs sm:text-sm mb-4">{module.description}</p>

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
                          <div key={topic.id} className="flex items-center justify-between py-2 gap-2 min-h-[44px]">
                            {module.locked ? (
                              <div 
                                className="flex items-center space-x-2 flex-1 min-w-0 cursor-not-allowed opacity-50"
                                title="Complete prerequisites or unlock this module to access lessons"
                              >
                                {topic.completed ? (
                                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                ) : (
                                  <div className="w-4 h-4 border-2 border-gray-600 rounded-full flex-shrink-0" />
                                )}
                                <span className="text-xs sm:text-sm text-gray-300 truncate">
                                  {topic.title}
                                </span>
                              </div>
                            ) : (
                              <Link to={`/lesson/${module.id}/${topic.id}`} className="flex items-center space-x-2 group flex-1 min-w-0">
                                {topic.completed ? (
                                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                ) : (
                                  <div className="w-4 h-4 border-2 border-gray-600 rounded-full flex-shrink-0" />
                                )}
                                <span className="text-xs sm:text-sm text-gray-300 group-hover:text-white underline decoration-dotted underline-offset-4 truncate">
                                  {topic.title}
                                </span>
                              </Link>
                            )}
                            <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                              {getTypeIcon(topic.type)}
                              <span className="text-xs text-gray-400 hidden sm:inline">{topic.duration}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      {module.topics.length > 5 && !expandedModules[module.id] && (
                        <button
                          onClick={() => setExpandedModules(prev => ({ ...prev, [module.id]: true }))}
                          className="text-xs text-gray-300 hover:text-white underline decoration-dotted underline-offset-4 pl-6 text-left min-h-[44px] flex items-center"
                        >
                          +{module.topics.length - 5} more lessons
                        </button>
                      )}
                      {module.topics.length > 5 && expandedModules[module.id] && (
                        <button
                          onClick={() => setExpandedModules(prev => ({ ...prev, [module.id]: false }))}
                          className="text-xs text-gray-300 hover:text-white underline decoration-dotted underline-offset-4 pl-6 text-left min-h-[44px] flex items-center"
                        >
                          Show less
                        </button>
                      )}
                    </div>

                    {/* Action Button */}
                    {module.locked ? (
                      <div className="mt-auto space-y-3">
                        {/* Collapsible "How to Unlock" Section */}
                        <button
                          onClick={() => setExpandedLockInfo(prev => ({ ...prev, [module.id]: !prev[module.id] }))}
                          className="w-full flex items-center justify-between p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors min-h-[44px]"
                        >
                          <span className="text-sm text-gray-300 font-medium">How to unlock</span>
                          <ChevronDown 
                            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                              expandedLockInfo[module.id] ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        
                        {/* Expanded Lock Info */}
                        {expandedLockInfo[module.id] && (
                          <div className="p-4 bg-gray-700/30 rounded-lg space-y-3 animate-fadeIn">
                            {module.status === 'coming-soon' ? (
                              <div className="space-y-2">
                                <p className="text-xs text-gray-300">
                                  <strong>Coming Soon!</strong>
                                </p>
                                <p className="text-xs text-gray-400">
                                  This module is currently being developed and will be available soon. Check back later for new content!
                                </p>
                              </div>
                            ) : (
                              <>
                                <div className="space-y-2">
                                  <p className="text-xs text-gray-300">
                                    <strong>Unlock Requirements:</strong>
                                  </p>
                                  {module.difficulty === 'Intermediate' && (
                                    <p className="text-xs text-gray-400">
                                      • Complete all Beginner modules, OR
                                    </p>
                                  )}
                                  {module.difficulty === 'Advanced' && (
                                    <p className="text-xs text-gray-400">
                                      • Complete all Beginner and Intermediate modules, OR
                                    </p>
                                  )}
                                  <p className="text-xs text-gray-400">
                                    • Spend {getUnlockCost(module.difficulty)} points to unlock early
                                  </p>
                                </div>
                                
                                <div className="pt-2 border-t border-gray-600">
                                  <p className="text-xs text-gray-400">
                                    <strong>Your Progress:</strong>
                                  </p>
                                  <p className="text-xs text-gray-400 mt-1">
                                    Points: {totalPoints} / {getUnlockCost(module.difficulty)}
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        )}
                        
                        {unlockMessages[module.id] && (
                          <p className="text-xs text-center text-gray-300 p-2 bg-orange-500/10 rounded-lg border border-orange-500/30">
                            {unlockMessages[module.id]}
                          </p>
                        )}
                        
                        {module.status !== 'coming-soon' && (
                          <button
                            onClick={() => handleUnlock(module.id, module.difficulty)}
                            className={`w-full py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 min-h-[44px] text-sm sm:text-base ${
                              totalPoints >= getUnlockCost(module.difficulty)
                                ? 'bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white'
                                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                            }`}
                            disabled={totalPoints < getUnlockCost(module.difficulty)}
                          >
                            <Zap className="w-4 h-4 flex-shrink-0" />
                            <span>Unlock for {getUnlockCost(module.difficulty)} pts</span>
                          </button>
                        )}
                      </div>
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
                            className="mt-auto w-full py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white min-h-[44px] text-sm sm:text-base"
                          >
                            {module.progress > 0 ? (
                              <>
                                <span>Continue Learning</span>
                                <ArrowRight className="w-4 h-4 flex-shrink-0" />
                              </>
                            ) : (
                              <>
                                <span>Start Module</span>
                                <ArrowRight className="w-4 h-4 flex-shrink-0" />
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
            )}
          </div>

          {/* Recommended Next Steps */}
          <div className="mt-8 sm:mt-12 bg-gradient-to-r from-orange-600 to-orange-500 rounded-xl p-6 sm:p-8 text-white">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Ready for the next challenge?</h3>
            <p className="text-orange-100 mb-4 sm:mb-6 text-sm sm:text-base">
              Complete the Financial Foundations module to unlock Investment Basics and take your knowledge to the next level!
            </p>
            <Link 
              to="/financial-literacy"
              className="bg-white text-orange-600 px-6 py-3 rounded-lg font-medium hover:bg-orange-50 transition-colors inline-block min-h-[44px] flex items-center justify-center text-sm sm:text-base"
            >
              View Learning Path
            </Link>
          </div>
          {/* Back to Top Button */}
          {showBackToTop && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50"
              aria-label="Back to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearningCenter;
