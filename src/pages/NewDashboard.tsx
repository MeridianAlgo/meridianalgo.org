import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ContentService from '../services/contentService';
import { 
  BookOpen, Award, TrendingUp, Calendar, Target, Star, Users,
  Flame
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { getEarnedAchievements } from '../utils/achievements';

const NewDashboard: React.FC = () => {
  const { user, isAuthenticated, progressData, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(() => (typeof window !== 'undefined' ? window.innerWidth >= 768 : true));
  const [moduleSummaries, setModuleSummaries] = useState<{ key: string; name: string; total: number; completed: number }[]>([]);
  const [progressPage, setProgressPage] = useState(0);
  const [achievementsPage, setAchievementsPage] = useState(0);
  const PROGRESS_ITEMS_PER_PAGE = 5;
  const ACHIEVEMENTS_PER_PAGE = 5;

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
      // Filter only active modules and map to summaries
      const summaries = mods
        .filter(m => m.status === 'active')
        .map(m => {
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
  const completedConcepts = user.completedConcepts.length; // Use actual completed concepts count
  const progressPercentage = progressData?.progressPercentage || 0;
  const joinDate = new Date(user.joinDate);
  const daysSinceJoined = Math.floor((Date.now() - joinDate.getTime()) / (1000 * 60 * 60 * 24));

  // Use centralized achievements
  const earnedAchievements = getEarnedAchievements(user, completedConcepts, progressPercentage);
  
  // Pagination for progress
  const totalProgressPages = Math.ceil(moduleSummaries.length / PROGRESS_ITEMS_PER_PAGE);
  const paginatedModules = moduleSummaries.slice(
    progressPage * PROGRESS_ITEMS_PER_PAGE,
    (progressPage + 1) * PROGRESS_ITEMS_PER_PAGE
  );

  // Pagination for achievements
  const totalAchievementsPages = Math.ceil(earnedAchievements.length / ACHIEVEMENTS_PER_PAGE);
  const paginatedAchievements = earnedAchievements.slice(
    achievementsPage * ACHIEVEMENTS_PER_PAGE,
    (achievementsPage + 1) * ACHIEVEMENTS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activePage="dashboard"
        user={user}
        onLogout={async () => {
          await logout();
          navigate('/');
        }}
      />

      <div className={`flex-1 overflow-y-auto transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${sidebarOpen ? 'ml-72' : 'ml-20'}`}>
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

              <div className="space-y-4 mb-4">
                {paginatedModules.map((section, index) => {
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
              
              {/* Pagination Controls */}
              {totalProgressPages > 1 && (
                <div className="flex items-center justify-center gap-2 mb-4">
                  <button
                    onClick={() => setProgressPage(p => Math.max(0, p - 1))}
                    disabled={progressPage === 0}
                    className="px-3 py-1 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    Previous
                  </button>
                  <span className="text-gray-400 text-sm">
                    Page {progressPage + 1} of {totalProgressPages}
                  </span>
                  <button
                    onClick={() => setProgressPage(p => Math.min(totalProgressPages - 1, p + 1))}
                    disabled={progressPage === totalProgressPages - 1}
                    className="px-3 py-1 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    Next
                  </button>
                </div>
              )}
              <Link 
                to="/learning"
                className="mt-6 w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:transform hover:scale-[1.02] flex items-center justify-center"
              >
                Continue Learning
              </Link>
            </div>

            {/* Achievements Section - Only show earned achievements */}
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Achievements</h2>
              
              {earnedAchievements.length === 0 ? (
                <div className="text-center py-8">
                  <Award className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Complete lessons to earn achievements!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {paginatedAchievements.map((achievement) => {
                    const Icon = achievement.icon;
                    return (
                      <div 
                        key={achievement.id}
                        className="flex items-center space-x-4 p-4 rounded-xl border bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-400/30 transition-all"
                      >
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-yellow-400/20 text-yellow-400">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-white">
                            {achievement.title}
                          </h3>
                          <p className="text-gray-400 text-sm">{achievement.description}</p>
                        </div>
                        <Award className="w-5 h-5 text-yellow-400" />
                      </div>
                    );
                  })}
                  
                  {/* Pagination Controls */}
                  {totalAchievementsPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-4">
                      <button
                        onClick={() => setAchievementsPage(p => Math.max(0, p - 1))}
                        disabled={achievementsPage === 0}
                        className="px-3 py-1 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                      >
                        Previous
                      </button>
                      <span className="text-gray-400 text-sm">
                        Page {achievementsPage + 1} of {totalAchievementsPages}
                      </span>
                      <button
                        onClick={() => setAchievementsPage(p => Math.min(totalAchievementsPages - 1, p + 1))}
                        disabled={achievementsPage === totalAchievementsPages - 1}
                        className="px-3 py-1 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                      >
                        Next
                      </button>
                    </div>
                  )}
                  
                  <Link 
                    to="/achievements"
                    className="block text-center text-orange-400 hover:text-orange-300 text-sm font-medium mt-4"
                  >
                    View all {earnedAchievements.length} achievements →
                  </Link>
                </div>
              )}
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
