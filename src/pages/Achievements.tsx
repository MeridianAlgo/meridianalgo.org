import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  BookOpen, Trophy, Flame, Zap, Lock, CheckCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { ACHIEVEMENTS, getEarnedAchievements, getTotalAchievementPoints } from '../utils/achievements';

const Achievements: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(() => (typeof window !== 'undefined' ? window.innerWidth >= 768 : true));

  useEffect(() => {
    document.title = 'MeridianAlgo - Achievements';
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/achievements' } } });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null; // Will redirect to login
  }

  const completedConcepts = user.completedConcepts.length;
  
  // Calculate progress percentage properly - need to get from progressData
  const { progressData } = useAuth();
  const progressPercentage = progressData?.progressPercentage || 0;

  // Use centralized achievements
  const earnedAchievements = getEarnedAchievements(user, completedConcepts, progressPercentage);
  const totalPoints = getTotalAchievementPoints(user, completedConcepts, progressPercentage);

  const achievements = ACHIEVEMENTS.map(achievement => ({
    ...achievement,
    earned: achievement.checkEarned(user, completedConcepts, progressPercentage),
    earnedDate: achievement.checkEarned(user, completedConcepts, progressPercentage) ? user.joinDate : null
  }));

  /* OLD ACHIEVEMENTS - REPLACED WITH CENTRALIZED VERSION
  const achievements = [
    {
      id: 'welcome',
      title: 'Welcome Aboard!',
      description: 'Joined MeridianAlgo and started your financial journey',
      icon: <Users className="w-8 h-8" />,
      earned: true,
      earnedDate: user.joinDate,
      category: 'Getting Started',
      points: 50
    },
    {
      id: 'first_lesson',
      title: 'First Steps',
      description: 'Completed your first lesson',
      icon: <BookOpen className="w-8 h-8" />,
      earned: completedConcepts >= 1,
      earnedDate: completedConcepts >= 1 ? user.joinDate : null,
      category: 'Learning',
      points: 100
    },
    {
      id: 'streak_3',
      title: 'Getting Consistent',
      description: 'Maintained a 3-day learning streak',
      icon: <Flame className="w-8 h-8" />,
      earned: user.learningStreak >= 3,
      earnedDate: null,
      category: 'Consistency',
      points: 150
    },
    {
      id: 'streak_7',
      title: 'Week Warrior',
      description: 'Maintained a 7-day learning streak',
      icon: <TrendingUp className="w-8 h-8" />,
      earned: user.learningStreak >= 7,
      earnedDate: null,
      category: 'Consistency',
      points: 300
    },
    {
      id: 'streak_30',
      title: 'Monthly Master',
      description: 'Maintained a 30-day learning streak',
      icon: <Calendar className="w-8 h-8" />,
      earned: user.learningStreak >= 30,
      earnedDate: null,
      category: 'Consistency',
      points: 1000
    },
    {
      id: 'foundations_complete',
      title: 'Foundation Builder',
      description: 'Completed all Financial Foundations lessons',
      icon: <Target className="w-8 h-8" />,
      earned: user.completedConcepts.filter(c => c.startsWith('foundations')).length >= 6,
      earnedDate: null,
      category: 'Modules',
      points: 500
    },
    {
      id: 'saving_complete',
      title: 'Saving Specialist',
      description: 'Completed all Smart Saving Strategies lessons',
      icon: <Star className="w-8 h-8" />,
      earned: user.completedConcepts.filter(c => c.startsWith('saving')).length >= 5,
      earnedDate: null,
      category: 'Modules',
      points: 500
    },
    {
      id: 'credit_complete',
      title: 'Credit Champion',
      description: 'Completed all Credit & Debt Management lessons',
      icon: <Award className="w-8 h-8" />,
      earned: user.completedConcepts.filter(c => c.startsWith('credit')).length >= 5,
      earnedDate: null,
      category: 'Modules',
      points: 500
    },
    {
      id: 'halfway_hero',
      title: 'Halfway Hero',
      description: 'Completed 50% of all available lessons',
      icon: <Trophy className="w-8 h-8" />,
      earned: progressPercentage >= 50,
      earnedDate: null,
      category: 'Progress',
      points: 750
    },
    {
      id: 'completionist',
      title: 'Financial Guru',
      description: 'Completed all available lessons',
      icon: <Zap className="w-8 h-8" />,
      earned: progressPercentage >= 100,
      earnedDate: null,
      category: 'Progress',
      points: 2000
    },
    {
      id: 'investing_complete',
      title: 'Investment Pro',
      description: 'Completed all Investment Fundamentals lessons',
      icon: <TrendingUp className="w-8 h-8" />,
      earned: user.completedConcepts.filter(c => c.startsWith('investing')).length >= 5,
      earnedDate: null,
      category: 'Modules',
      points: 600
    },
    {
      id: 'retirement_complete',
      title: 'Retirement Ready',
      description: 'Completed all Retirement Planning lessons',
      icon: <Target className="w-8 h-8" />,
      earned: user.completedConcepts.filter(c => c.startsWith('retirement')).length >= 5,
      earnedDate: null,
      category: 'Modules',
      points: 700
    },
    {
      id: 'tax_complete',
      title: 'Tax Optimizer',
      description: 'Completed all Tax Optimization lessons',
      icon: <FileText className="w-8 h-8" />,
      earned: user.completedConcepts.filter(c => c.startsWith('taxes')).length >= 4,
      earnedDate: null,
      category: 'Modules',
      points: 600
    },
    {
      id: 'insurance_complete',
      title: 'Insurance Expert',
      description: 'Completed all Insurance Essentials lessons',
      icon: <Shield className="w-8 h-8" />,
      earned: user.completedConcepts.filter(c => c.startsWith('insurance')).length >= 4,
      earnedDate: null,
      category: 'Modules',
      points: 500
    },
    {
      id: 'banking_complete',
      title: 'Banking Wizard',
      description: 'Completed all Smart Banking lessons',
      icon: <Building className="w-8 h-8" />,
      earned: user.completedConcepts.filter(c => c.startsWith('banking')).length >= 4,
      earnedDate: null,
      category: 'Modules',
      points: 400
    },
    {
      id: 'entrepreneur_complete',
      title: 'Business Builder',
      description: 'Completed all Entrepreneurship Basics lessons',
      icon: <Lightbulb className="w-8 h-8" />,
      earned: user.completedConcepts.filter(c => c.startsWith('entrepreneurship')).length >= 5,
      earnedDate: null,
      category: 'Modules',
      points: 700
    },
    {
      id: 'real_estate_complete',
      title: 'Property Investor',
      description: 'Completed all Real Estate Investing lessons',
      icon: <Home className="w-8 h-8" />,
      earned: user.completedConcepts.filter(c => c.startsWith('real_estate')).length >= 4,
      earnedDate: null,
      category: 'Modules',
      points: 650
    },
    {
      id: 'points_1000',
      title: 'Point Collector',
      description: 'Earned 1,000 total points',
      icon: <Star className="w-8 h-8" />,
      earned: user.totalPoints >= 1000,
      earnedDate: null,
      category: 'Points',
      points: 200
    },
    {
      id: 'points_5000',
      title: 'Point Master',
      description: 'Earned 5,000 total points',
      icon: <Award className="w-8 h-8" />,
      earned: user.totalPoints >= 5000,
      earnedDate: null,
      category: 'Points',
      points: 500
    },
    {
      id: 'points_10000',
      title: 'Point Legend',
      description: 'Earned 10,000 total points',
      icon: <Trophy className="w-8 h-8" />,
      earned: user.totalPoints >= 10000,
      earnedDate: null,
      category: 'Points',
      points: 1000
    },
    {
      id: 'quiz_master',
      title: 'Quiz Master',
      description: 'Completed 5 module quizzes',
      icon: <Brain className="w-8 h-8" />,
      earned: user.completedQuizzes.length >= 5,
      earnedDate: null,
      category: 'Quizzes',
      points: 400
    },
    {
      id: 'speed_learner',
      title: 'Speed Learner',
      description: 'Completed 10 lessons in one day',
      icon: <Zap className="w-8 h-8" />,
      earned: false, // This would need special tracking
      earnedDate: null,
      category: 'Special',
      points: 300
    },
    {
      id: 'early_bird',
      title: 'Early Bird',
      description: 'Completed a lesson before 8 AM',
      icon: <Clock className="w-8 h-8" />,
      earned: false, // This would need special tracking
      earnedDate: null,
      category: 'Special',
      points: 150
    },
    {
      id: 'night_owl',
      title: 'Night Owl',
      description: 'Completed a lesson after 10 PM',
      icon: <Moon className="w-8 h-8" />,
      earned: false, // This would need special tracking
      earnedDate: null,
      category: 'Special',
      points: 150
    }
  ]; */

  const categories = ['All', 'Getting Started', 'Learning', 'Consistency', 'Modules', 'Progress', 'Points', 'Quizzes', 'Special'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredAchievements = selectedCategory === 'All' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activePage="achievements"
        user={user}
        onLogout={async () => {
          await logout();
          navigate('/');
        }}
      />

      <div className={`flex-1 overflow-y-auto transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${sidebarOpen ? 'ml-72' : 'ml-20'}`}>
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">
                Achievements 🏆
              </h1>
              <p className="text-gray-300 mt-1">
                Track your progress and celebrate your milestones!
              </p>
            </div>
            <div className="flex items-center space-x-6">
              {/* Total Points */}
              <div className="flex items-center space-x-2">
                <Zap className="w-6 h-6 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold text-white">{totalPoints}</p>
                  <p className="text-xs text-gray-400">total points</p>
                </div>
              </div>
              {/* Earned Achievements */}
              <div className="flex items-center space-x-2">
                <Trophy className="w-6 h-6 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold text-white">{earnedAchievements.length}</p>
                  <p className="text-xs text-gray-400">achievements</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <Trophy className="w-8 h-8 text-yellow-400" />
                <span className="text-2xl font-bold text-white">{earnedAchievements.length}</span>
              </div>
              <h3 className="text-white font-semibold mb-1">Earned</h3>
              <p className="text-gray-400 text-sm">Out of {achievements.length} total</p>
            </div>

            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <Zap className="w-8 h-8 text-orange-400" />
                <span className="text-2xl font-bold text-white">{totalPoints}</span>
              </div>
              <h3 className="text-white font-semibold mb-1">Points</h3>
              <p className="text-gray-400 text-sm">Achievement points</p>
            </div>

            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <Flame className="w-8 h-8 text-red-400" />
                <span className="text-2xl font-bold text-white">{user.learningStreak}</span>
              </div>
              <h3 className="text-white font-semibold mb-1">Streak</h3>
              <p className="text-gray-400 text-sm">Days in a row</p>
            </div>

            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <BookOpen className="w-8 h-8 text-blue-400" />
                <span className="text-2xl font-bold text-white">{completedConcepts}</span>
              </div>
              <h3 className="text-white font-semibold mb-1">Lessons</h3>
              <p className="text-gray-400 text-sm">Completed</p>
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`bg-gray-800 rounded-2xl p-6 border transition-all duration-300 ${
                  achievement.earned
                    ? 'border-orange-500/50 bg-gradient-to-br from-orange-500/5 to-yellow-500/5'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                    achievement.earned
                      ? 'bg-orange-500/20 text-orange-400'
                      : 'bg-gray-700 text-gray-500'
                  }`}>
                    {achievement.earned ? (
                      React.createElement(achievement.icon, { className: "w-8 h-8" })
                    ) : (
                      <Lock className="w-8 h-8" />
                    )}
                  </div>
                  {achievement.earned && (
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  )}
                </div>

                <h3 className={`text-lg font-bold mb-2 ${
                  achievement.earned ? 'text-white' : 'text-gray-400'
                }`}>
                  {achievement.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4">
                  {achievement.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    achievement.earned
                      ? 'bg-orange-500/20 text-orange-400'
                      : 'bg-gray-700 text-gray-500'
                  }`}>
                    {achievement.category}
                  </span>
                  <span className={`text-sm font-bold ${
                    achievement.earned ? 'text-yellow-400' : 'text-gray-500'
                  }`}>
                    +{achievement.points} pts
                  </span>
                </div>

                {achievement.earned && achievement.earnedDate && (
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-xs text-gray-500">
                      Earned on {new Date(achievement.earnedDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Motivational Section */}
          <div className="mt-12 bg-gradient-to-r from-orange-600/10 to-yellow-600/10 border border-orange-500/30 rounded-2xl p-8 text-center">
            <Trophy className="w-16 h-16 text-orange-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">
              Keep Going! You're Doing Great! 🎉
            </h2>
            <p className="text-gray-300 mb-6">
              {earnedAchievements.length < achievements.length 
                ? `You've earned ${earnedAchievements.length} out of ${achievements.length} achievements. Keep learning to unlock more!`
                : "Congratulations! You've earned all available achievements. You're a true financial literacy champion!"
              }
            </p>
            <Link 
              to="/learning"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300"
            >
              <span>Continue Learning</span>
              <BookOpen className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
