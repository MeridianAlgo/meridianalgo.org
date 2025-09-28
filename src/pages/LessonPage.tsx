import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ContentService, { LessonContent, LessonSection } from '../services/contentService';
import { 
  BookOpen, CheckCircle, ArrowLeft, ArrowRight, PlayCircle, 
  FileText, Brain, Target, Home, LogOut, Menu, ChevronLeft, 
  BarChart, Trophy, Lightbulb, Star, Clock, Award, Calculator
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';


const LessonPage: React.FC = () => {
  const { user, isAuthenticated, updateProgress } = useAuth();
  const navigate = useNavigate();
  const { moduleId, lessonId } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [lessonData, setLessonData] = useState<{ info: any; content: LessonContent } | null>(null);
  const [loading, setLoading] = useState(true);
  const [allLessons, setAllLessons] = useState<any[]>([]);

  useEffect(() => {
    document.title = 'MeridianAlgo - Lesson';
    loadLessonData();
  }, [moduleId, lessonId]);

  const loadLessonData = async () => {
    if (!moduleId || !lessonId) return;
    
    setLoading(true);
    try {
      const contentService = ContentService.getInstance();
      const lesson = await contentService.getLesson(moduleId, lessonId);
      const module = await contentService.getModule(moduleId);
      
      if (lesson) {
        setLessonData(lesson);
        document.title = `MeridianAlgo - ${lesson.content.title}`;
        // Persist last visited lesson per module for resume functionality
        try {
          if (moduleId && lessonId && typeof window !== 'undefined') {
            localStorage.setItem(`meridianAlgo_lastLesson_${moduleId}`, lessonId);
          }
        } catch (e) {
          // ignore storage failures
        }
      }
      
      if (module) {
        setAllLessons(module.lessons);
      }
    } catch (error) {
      console.error('Error loading lesson:', error);
    } finally {
      setLoading(false);
    }
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/lesson/${moduleId}/${lessonId}` } } });
    }
  }, [isAuthenticated, navigate, moduleId, lessonId]);

  if (!isAuthenticated || !user) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (!lessonData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Lesson not found</p>
          <Link to="/learning" className="text-orange-400 hover:text-orange-300">Back to Learning Center</Link>
        </div>
      </div>
    );
  }

  const currentIndex = allLessons.findIndex(l => l.id === lessonId);
  const nextLesson = allLessons[currentIndex + 1];
  const prevLesson = allLessons[currentIndex - 1];

  const handleCompleteLesson = () => {
    if (lessonData && updateProgress) {
      updateProgress(lessonData.info.id);
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'video': return <PlayCircle className="w-5 h-5" />;
      case 'reading': return <FileText className="w-5 h-5" />;
      case 'quiz': return <Brain className="w-5 h-5" />;
      case 'exercise': return <Target className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const isCompleted = user.completedConcepts.includes(lessonData?.info.id || '');

  const renderSection = (section: LessonSection, index: number) => {
    switch (section.type) {
      case 'hero':
        return (
          <div key={index} className="bg-gradient-to-r from-orange-600/10 to-yellow-600/10 rounded-2xl p-8 mb-8 border border-orange-500/20">
            <h1 className="text-3xl font-bold text-white mb-2">{section.title}</h1>
            {section.subtitle && <p className="text-orange-300 text-lg">{section.subtitle}</p>}
          </div>
        );
      
      case 'overview':
        return (
          <div key={index} className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <Target className="w-5 h-5 text-orange-400 mr-2" />
              {section.title}
            </h2>
            <ul className="space-y-2">
              {section.items?.map((item, i) => (
                <li key={i} className="flex items-start text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      
      case 'content':
        return (
          <div key={index} className="mb-6">
            {section.title && <h2 className="text-2xl font-bold text-white mb-4">{section.title}</h2>}
            <div className="text-gray-300 leading-relaxed text-lg">
              {section.content}
            </div>
          </div>
        );
      
      case 'highlight':
        return (
          <div key={index} className={`bg-gradient-to-r from-${section.color || 'orange'}-600/10 to-${section.color || 'orange'}-500/10 rounded-2xl p-6 mb-6 border border-${section.color || 'orange'}-500/30`}>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center">
              <Star className={`w-5 h-5 text-${section.color || 'orange'}-400 mr-2`} />
              {section.title}
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">{section.content}</p>
          </div>
        );
      
      case 'keypoints':
        return (
          <div key={index} className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-6">{section.title}</h2>
            <div className="space-y-4">
              {section.points?.map((point, i) => (
                <div key={i} className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-semibold text-white mb-2">{point.title}</h3>
                  <p className="text-gray-300">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'actionsteps':
        return (
          <div key={index} className="bg-gradient-to-r from-blue-600/10 to-blue-500/10 rounded-2xl p-6 mb-6 border border-blue-500/30">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <Target className="w-5 h-5 text-blue-400 mr-2" />
              {section.title}
            </h2>
            <ol className="space-y-3">
              {section.steps?.map((step, i) => (
                <li key={i} className="flex items-start text-gray-300">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        );
      
      case 'protip':
        return (
          <div key={index} className="bg-gradient-to-r from-yellow-600/10 to-yellow-500/10 rounded-2xl p-6 mb-6 border border-yellow-500/30">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center">
              <Lightbulb className="w-5 h-5 text-yellow-400 mr-2" />
              {section.title}
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">{section.content}</p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-800 border-r border-gray-700 transition-all duration-300 flex flex-col fixed h-full z-10`}>
        {/* Logo Section */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <Link to="/learning" className={`flex items-center ${!sidebarOpen && 'justify-center'}`}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              {sidebarOpen && (
                <span className="ml-3 text-xl font-bold text-white">Lesson</span>
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
              to="/tools"
              className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
            >
              <Calculator className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Financial Tools</span>}
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
                <p className="text-xs text-gray-400">Learning in progress</p>
              </div>
            )}
          </div>
          {sidebarOpen && (
            <button
              onClick={() => {
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
                  {lessonData.content.title}
                </h1>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center space-x-2 text-gray-400">
                    {getTypeIcon(lessonData.info.type)}
                    <span className="text-sm capitalize">{lessonData.info.type}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{lessonData.info.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-orange-400">
                    <Award className="w-4 h-4" />
                    <span className="text-sm font-medium">+{lessonData.info.points} points</span>
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

        {/* Lesson Content */}
        <div className="px-8 py-6">
          <div className="max-w-4xl mx-auto">
            {lessonData.content.sections.map((section, index) => renderSection(section, index))}

            {/* Navigation and Actions */}
            <div className="flex items-center justify-between">
              <div>
                {prevLesson && (
                  <Link
                    to={`/lesson/${moduleId}/${prevLesson.id}`}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-all border border-gray-700 hover:border-gray-600"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </Link>
                )}
              </div>

              <div className="flex items-center space-x-4">
                {!isCompleted && (
                  <button
                    onClick={handleCompleteLesson}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-xl transition-all"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Mark Complete</span>
                  </button>
                )}

                {nextLesson ? (
                  <Link
                    to={`/lesson/${moduleId}/${nextLesson.id}`}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white rounded-xl transition-all"
                  >
                    <span>Next Lesson</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Link
                      to={`/quiz/${moduleId}`}
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-xl transition-all animate-pulse"
                    >
                      <Brain className="w-4 h-4" />
                      <span>Take Module Quiz</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      to="/learning"
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-all border border-gray-700"
                    >
                      <span>Back to Learning</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
            {/* Progress Indicator */}
            <div className="mt-8 bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Module Progress</h3>
                <div className="text-sm text-gray-400">{currentIndex + 1} of {allLessons.length} lessons</div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-orange-400 to-yellow-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((currentIndex + 1) / allLessons.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
