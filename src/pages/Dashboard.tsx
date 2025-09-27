import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, Award, TrendingUp, Calendar, Target, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    document.title = 'MeridianAlgo - Learning Dashboard';
  }, []);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to access your dashboard</h1>
          <Link 
            to="/financial-literacy" 
            className="text-orange-400 hover:text-orange-300 transition-colors"
          >
            Go to Learning Page
          </Link>
        </div>
      </div>
    );
  }

  const totalConcepts = 15; // Total concepts across all sections
  const completedConcepts = user.completedConcepts.length;
  const progressPercentage = (completedConcepts / totalConcepts) * 100;
  
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
      earned: user.completedConcepts.filter(c => c.startsWith('budgeting')).length >= 2,
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
    <div className="min-h-screen bg-black text-white pt-24">
      {/* Hero Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">{user.name.split(' ')[0]}</span>!
            </h1>
            <p className="text-xl text-gray-300">
              Continue your financial literacy journey. You're doing great! 🚀
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-orange-400/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <BookOpen className="w-8 h-8 text-orange-400" />
                <span className="text-2xl font-bold text-white">{completedConcepts}</span>
              </div>
              <h3 className="text-white font-semibold mb-1">Concepts Completed</h3>
              <p className="text-gray-400 text-sm">Out of {totalConcepts} total</p>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-blue-400" />
                <span className="text-2xl font-bold text-white">{user.learningStreak}</span>
              </div>
              <h3 className="text-white font-semibold mb-1">Learning Streak</h3>
              <p className="text-gray-400 text-sm">Days in a row</p>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-400/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <Award className="w-8 h-8 text-green-400" />
                <span className="text-2xl font-bold text-white">{earnedAchievements.length}</span>
              </div>
              <h3 className="text-white font-semibold mb-1">Achievements</h3>
              <p className="text-gray-400 text-sm">Badges earned</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/30 rounded-2xl p-6">
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
            <div className="bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Learning Progress</h2>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">Overall Progress</span>
                  <span className="text-orange-400 font-bold">{Math.round(progressPercentage)}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-orange-400 to-yellow-400 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { name: 'Budgeting & Money Management', completed: user.completedConcepts.filter(c => c.startsWith('budgeting')).length, total: 2 },
                  { name: 'Saving & Goal Setting', completed: user.completedConcepts.filter(c => c.startsWith('saving')).length, total: 2 },
                  { name: 'Debt Management & Credit', completed: user.completedConcepts.filter(c => c.startsWith('debt')).length, total: 2 },
                  { name: 'Investing Fundamentals', completed: user.completedConcepts.filter(c => c.startsWith('investing')).length, total: 2 },
                  { name: 'Insurance & Risk Management', completed: user.completedConcepts.filter(c => c.startsWith('insurance')).length, total: 1 },
                  { name: 'Tax Planning', completed: user.completedConcepts.filter(c => c.startsWith('taxes')).length, total: 1 }
                ].map((section, index) => {
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
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Link 
                to="/financial-literacy"
                className="mt-6 w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:transform hover:scale-[1.02] flex items-center justify-center"
              >
                Continue Learning
              </Link>
            </div>

            {/* Achievements Section */}
            <div className="bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Achievements</h2>
              
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className={`flex items-center space-x-4 p-4 rounded-xl border transition-all ${
                      achievement.earned 
                        ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-400/30' 
                        : 'bg-gray-800/30 border-gray-700/50'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      achievement.earned 
                        ? 'bg-yellow-400/20 text-yellow-400' 
                        : 'bg-gray-700/50 text-gray-500'
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
          <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 backdrop-blur-sm border border-orange-400/30 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link 
                to="/financial-literacy"
                className="bg-black/40 hover:bg-black/60 border border-gray-700 hover:border-orange-400/50 rounded-xl p-6 transition-all group"
              >
                <BookOpen className="w-8 h-8 text-orange-400 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-semibold mb-2">Continue Learning</h3>
                <p className="text-gray-400 text-sm">Pick up where you left off</p>
              </Link>

              <Link 
                to="/newsletters"
                className="bg-black/40 hover:bg-black/60 border border-gray-700 hover:border-blue-400/50 rounded-xl p-6 transition-all group"
              >
                <Calendar className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-semibold mb-2">Weekly Newsletter</h3>
                <p className="text-gray-400 text-sm">Get the latest financial tips</p>
              </Link>

              <Link 
                to="/contact"
                className="bg-black/40 hover:bg-black/60 border border-gray-700 hover:border-green-400/50 rounded-xl p-6 transition-all group"
              >
                <Users className="w-8 h-8 text-green-400 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-semibold mb-2">Get Help</h3>
                <p className="text-gray-400 text-sm">Ask questions or get support</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
