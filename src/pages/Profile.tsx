import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  User, Calendar, Trophy, Target, 
  BookOpen, Award, Edit3, Save, X, 
  Home, LogOut, Menu, ChevronLeft 
} from 'lucide-react';

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    document.title = 'MeridianAlgo - Profile';
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/profile' } } });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name,
        email: user.email
      });
    }
  }, [user]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Update user profile logic would go here
    console.log('Saving profile:', editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: user?.name || '',
      email: user?.email || ''
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const joinDate = new Date(user.joinDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-gray-800 border-r border-gray-700 transition-all duration-300 flex flex-col`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <h2 className="text-xl font-bold text-white">MeridianAlgo</h2>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1 rounded-lg hover:bg-gray-700 text-gray-400"
            >
              {sidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
          >
            <Home className="w-5 h-5" />
            {sidebarOpen && <span>Dashboard</span>}
          </button>
          
          <button
            onClick={() => navigate('/learning')}
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            {sidebarOpen && <span>My Learning</span>}
          </button>

          <button
            onClick={() => navigate('/achievements')}
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
          >
            <Trophy className="w-5 h-5" />
            {sidebarOpen && <span>Achievements</span>}
          </button>

          <button
            onClick={() => navigate('/profile')}
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg bg-orange-500/20 text-orange-400 transition-colors"
          >
            <User className="w-5 h-5" />
            {sidebarOpen && <span>Profile</span>}
          </button>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
            <p className="text-gray-400">Manage your account information and preferences</p>
          </div>

          {/* Profile Card */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-orange-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                  <p className="text-gray-400">{user.email}</p>
                </div>
              </div>
              
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>

            {/* Profile Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                ) : (
                  <div className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white">
                    {user.name}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                ) : (
                  <div className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white">
                    {user.email}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Member Since</h3>
                  <p className="text-gray-400">{joinDate}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Total Points</h3>
                  <p className="text-gray-400">{user.totalPoints.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Learning Streak</h3>
                  <p className="text-gray-400">{user.learningStreak} days</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Certificates</h3>
                  <p className="text-gray-400">{user.certificates.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {user.completedConcepts.slice(-5).map((concept, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                  <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Completed lesson: {concept}</p>
                    <p className="text-gray-400 text-sm">Recently completed</p>
                  </div>
                </div>
              ))}
              
              {user.completedConcepts.length === 0 && (
                <p className="text-gray-400 text-center py-4">No recent activity. Start learning to see your progress here!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
