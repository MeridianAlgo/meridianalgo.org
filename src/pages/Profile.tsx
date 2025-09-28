import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  User, Calendar, Trophy, Target, 
  BookOpen, Award, Edit3, Save, X 
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(() => (typeof window !== 'undefined' ? window.innerWidth >= 768 : true));
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    preferredContact: ''
  });

  const extractPreferredContact = (account: typeof user): string => {
    if (!account) return '';
    const candidateKeys = ['preferredContact', 'alternateContact', 'secondaryEmail', 'phone'];
    const anyAccount = account as unknown as Record<string, unknown>;
    for (const key of candidateKeys) {
      const value = anyAccount[key];
      if (typeof value === 'string' && value.trim().length > 0) {
        return value;
      }
    }
    return '';
  };

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
        preferredContact: extractPreferredContact(user)
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
      preferredContact: extractPreferredContact(user)
    });
    setIsEditing(false);
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
    <div className="min-h-screen bg-gray-900 flex text-white">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activePage="profile"
        user={user ?? null}
        onLogout={() => {
          logout();
          navigate('/');
        }}
      />

      <div className={`flex-1 overflow-y-auto transition-all duration-300 ${sidebarOpen ? 'ml-72' : 'ml-20'}`}>
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-white mb-2">Profile</h1>
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
                <div className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-300">
                  {user.email}
                </div>
                <p className="text-xs text-gray-500 mt-2">Email is linked to your account and cannot be changed.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Contact</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.preferredContact}
                    onChange={(e) => setEditForm({ ...editForm, preferredContact: e.target.value })}
                    placeholder="e.g. Alternate email or phone number"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                ) : (
                  <div className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white">
                    {editForm.preferredContact || 'Not set'}
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
