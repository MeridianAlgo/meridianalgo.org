import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ContentService from '../services/contentService';
import { 
  BookOpen, Award, TrendingUp, Calendar, Target, Star, Users, Home, 
  LogOut, Menu, ChevronLeft, BarChart, Trophy, Flame, User
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const NewDashboard: React.FC = () => {
  const { user, isAuthenticated, progressData, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(() => (typeof window !== 'undefined' ? window.innerWidth >= 768 : true));
  const [moduleSummaries, setModuleSummaries] = useState<{ key: string; name: string; total: number; completed: number }[]>([]);

  useEffect(() => {
    document.title = 'MeridianAlgo - Dashboard';
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/dashboard' } } });
    }
  }, [isAuthenticated, navigate]);

  // Build module totals and completed counts (excluding quizzes)
  useEffect(() => {
    const load = async () => {
      const cs = ContentService.getInstance();
      const mods = await cs.getModules();
      const summaries = mods.map(m => {
        const total = m.lessons.length;
        const completed = (user?.completedConcepts ?? []).filter(c => c.startsWith(m.id + '_') && !c.includes('_quiz')).length;
        return { key: m.id, name: m.title, total, completed };
      });
      setModuleSummaries(summaries);
    };
    if (isAuthenticated && user) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user]);

  if (!isAuthenticated || !user) {
    return null; // Will redirect to login
  }

  const totalConcepts = progressData?.totalLessons || 30;
  const completedConcepts = progressData?.completedLessons || 0;
  const progressPercentage = progressData?.progressPercentage || 0;
  const totalPoints = user.totalPoints || 0;
  
  const joinDate = new Date(user.joinDate);
  const daysSinceJoined = Math.floor((Date.now() - joinDate.getTime()) / (1000 * 60 * 60 * 24));

  const achievements = [
    {
      id: 'first_login',
      title: 'Welcome Aboard!',
      description: 'Joined MeridianAlgo',
      icon: <Users className="w-6 h-6" />,
      earned: true,
      date: user.joinDate
    },
    {
      id: 'first_concept',
      title: 'First Steps',
      description: 'Completed your first concept',
      icon: <BookOpen className="w-6 h-6" />,
      earned: completedConcepts >= 1,
      date: completedConcepts >= 1 ? user.joinDate : null
    },
    {
      id: 'budgeting_master',
      title: 'Budgeting Master',
      description: 'Completed all budgeting concepts',
      icon: <Target className="w-6 h-6" />,
      earned: user.completedConcepts.filter(c => c.startsWith('foundations')).length >= 3,
      date: null
    },
    {
      id: 'streak_3',
      title: 'Getting Started',
      description: '3-day learning streak',
      icon: <TrendingUp className="w-6 h-6" />,
      earned: user.learningStreak >= 3,
      date: null
    },
    {
      id: 'streak_7',
      title: 'Week Warrior',
      description: '7-day learning streak',
      icon: <TrendingUp className="w-6 h-6" />,
      earned: user.learningStreak >= 7,
      date: null
    },
    {
      id: 'concept_5',
      title: 'Learning Machine',
      description: 'Completed 5 concepts',
      icon: <Star className="w-6 h-6" />,
      earned: completedConcepts >= 5,
      date: null
    },
    {
      id: 'halfway_hero',
      title: 'Halfway Hero',
      description: 'Completed 50% of all concepts',
      icon: <Star className="w-6 h-6" />,
      earned: progressPercentage >= 50,
      date: null
    }
  ];

  const earnedAchievements = achievements.filter(a => a.earned);

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-800 border-r border-gray-700 transition-all duration-300 flex flex-col fixed h-full z-10`}>
        {/* Logo Section */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <Link to="/" className={`flex items-center ${!sidebarOpen && 'justify-center'}`}>
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center">
                <BarChart className="w-6 h-6 text-white" />
              </div>
              {sidebarOpen && (
                <span className="ml-3 text-xl font-bold text-white">Dashboard</span>
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
            <div className="flex items-center px-3 py-2 bg-orange-600 text-white rounded-lg">
              <BarChart className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3 font-medium">Dashboard</span>}
            </div>
            <Link
              to="/learning"
              className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Learning Center</span>}
            </Link>
            <Link
              to="/achievements"
              className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
            >
              <Trophy className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Achievements</span>}
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
                <p className="text-xs text-gray-400">{completedConcepts} concepts completed</p>
              </div>
            )}
          </div>
          {sidebarOpen && (
            <button
              onClick={async () => {
                await logout();
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
        {/* Streak Message */}
        {user.streakMessage && (
          <div className="px-8 pt-6">
            <div className="bg-gradient-to-r from-orange-600/10 to-yellow-600/10 border border-orange-500/30 rounded-xl p-4 mb-4">
              <p className="text-orange-300 text-center font-medium">{user.streakMessage}</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white">
                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">{user.name.split(' ')[0]}</span>! 👋
              </h1>
              <p className="text-gray-300 mt-1">
                Continue your financial literacy journey. You're doing great! 🚀
              </p>
            </div>
            <div className="flex items-center space-x-6">
              {/* Streak */}
              <div className="flex items-center space-x-2">
                <Flame className="w-6 h-6 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold text-white">{user.learningStreak}</p>
                  <p className="text-xs text-gray-400">day streak</p>
                </div>
              </div>
              {/* Progress */}
              <div className="flex items-center space-x-2">
                <div className="w-32">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">Progress</span>
                    <span className="text-xs font-medium text-white">{Math.round(progressPercentage)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-orange-400 to-yellow-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <BookOpen className="w-8 h-8 text-orange-400" />
                <span className="text-2xl font-bold text-white">{completedConcepts}</span>
              </div>
              <h3 className="text-white font-semibold mb-1">Lessons Completed</h3>
              <p className="text-gray-400 text-sm">Out of {totalConcepts} total</p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-blue-400" />
                <span className="text-2xl font-bold text-white">{user.learningStreak}</span>
              </div>
              <h3 className="text-white font-semibold mb-1">Learning Streak</h3>
              <p className="text-gray-400 text-sm">Days in a row</p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <Award className="w-8 h-8 text-green-400" />
                <span className="text-2xl font-bold text-white">{earnedAchievements.length}</span>
              </div>
              <h3 className="text-white font-semibold mb-1">Achievements</h3>
              <p className="text-gray-400 text-sm">Badges earned</p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <Calendar className="w-8 h-8 text-purple-400" />
                <span className="text-2xl font-bold text-white">{daysSinceJoined}</span>
              </div>
              <h3 className="text-white font-semibold mb-1">Days Learning</h3>
              <p className="text-gray-400 text-sm">Since you joined</p>
            </div>
          </div>

          {/* Progress Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Learning Progress</h2>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">Overall Progress</span>
                  <span className="text-orange-400 font-bold">{Math.round(progressPercentage)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-orange-400 to-yellow-400 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-4">
                {moduleSummaries.map((section, index) => {
                  const sectionProgress = section.total > 0 ? (section.completed / section.total) * 100 : 0;
                  return (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-300 text-sm">{section.name}</span>
                        <span className="text-gray-400 text-sm">{section.completed}/{section.total}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-orange-400 to-yellow-400 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${sectionProgress}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <Link 
                to="/learning"
                className="mt-6 w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:transform hover:scale-[1.02] flex items-center justify-center"
              >
                Continue Learning
              </Link>
            </div>

            {/* Achievements Section */}
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Achievements</h2>
              
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className={`flex items-center space-x-4 p-4 rounded-xl border transition-all ${
                      achievement.earned 
                        ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-400/30' 
                        : 'bg-gray-700/30 border-gray-600/50'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      achievement.earned 
                        ? 'bg-yellow-400/20 text-yellow-400' 
                        : 'bg-gray-600/50 text-gray-500'
                    }`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${achievement.earned ? 'text-white' : 'text-gray-400'}`}>
                        {achievement.title}
                      </h3>
                      <p className="text-gray-400 text-sm">{achievement.description}</p>
                    </div>
                    {achievement.earned && (
                      <Award className="w-5 h-5 text-yellow-400" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-orange-400/30 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link 
                to="/learning"
                className="bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-orange-400/50 rounded-xl p-6 transition-all group"
              >
                <BookOpen className="w-8 h-8 text-orange-400 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-semibold mb-2">Continue Learning</h3>
                <p className="text-gray-400 text-sm">Pick up where you left off</p>
              </Link>

              <Link 
                to="/newsletters"
                className="bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-blue-400/50 rounded-xl p-6 transition-all group"
              >
                <Calendar className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-semibold mb-2">Weekly Newsletter</h3>
                <p className="text-gray-400 text-sm">Get the latest financial tips</p>
              </Link>

              <Link 
                to="/contact"
                className="bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-green-400/50 rounded-xl p-6 transition-all group"
              >
                <Users className="w-8 h-8 text-green-400 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-semibold mb-2">Get Help</h3>
                <p className="text-gray-400 text-sm">Ask questions or get support</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDashboard;
