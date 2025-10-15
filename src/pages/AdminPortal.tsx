import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Plus, Save, Trash2, BookOpen, FileText, HelpCircle, Lock } from 'lucide-react';

// Obfuscated admin code - decode to verify
const getAdminCode = () => atob('TUVSSURJQU4yMDI0');

const AdminPortal = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'modules' | 'lessons' | 'quizzes'>('modules');

  // Module form
  const [moduleForm, setModuleForm] = useState({
    id: '',
    title: '',
    description: '',
    difficulty: 'Beginner',
    duration: '',
    category: '',
    icon: 'BookOpen',
    color: 'orange',
    prerequisites: [] as string[],
    points: 150
  });

  // Lesson form
  const [lessonForm, setLessonForm] = useState({
    moduleId: '',
    id: '',
    title: '',
    duration: '',
    type: 'reading',
    points: 100,
    content: {
      hero: { title: '', subtitle: '', image: '' },
      introduction: '',
      keyPoints: [''],
      sections: [{ title: '', content: '' }],
      callouts: [{ type: 'tip', title: '', content: '' }],
      practicalSteps: [{ step: 1, title: '', description: '' }],
      quiz: { question: '', options: ['', '', '', ''], correctAnswer: 0, explanation: '' }
    }
  });

  // Quiz form
  const [quizForm, setQuizForm] = useState({
    moduleId: '',
    title: '',
    description: '',
    passingScore: 70,
    questions: [{
      id: 'q1',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: ''
    }]
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (codeInput === getAdminCode()) {
      setIsAuthorized(true);
      setError('');
      sessionStorage.setItem('adminAuth', 'true');
    } else {
      setError('Invalid access code');
      setCodeInput('');
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem('adminAuth') === 'true') {
      setIsAuthorized(true);
    }
  }, []);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 max-w-md w-full">
          <div className="text-center mb-6">
            <Lock className="w-16 h-16 text-orange-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
            <p className="text-gray-400">Enter your admin code to continue</p>
          </div>
          <form onSubmit={handleCodeSubmit} className="space-y-4">
            <input
              type="password"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-center text-lg tracking-widest"
              placeholder="Enter code"
              autoFocus
            />
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-bold py-3 rounded-lg transition-all"
            >
              Access Admin Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  const handleCreateModule = async () => {
    const moduleData = {
      ...moduleForm,
      status: 'active',
      lessons: []
    };

    try {
      const response = await fetch('/.netlify/functions/create-module', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-code': btoa('MERIDIAN2024')
        },
        body: JSON.stringify(moduleData)
      });

      const result = await response.json();
      if (result.success) {
        alert('Module created! Commit and push changes to see it live.');
      } else {
        alert('Error: ' + result.error);
      }
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  };

  const handleCreateLesson = async () => {
    try {
      const response = await fetch('/.netlify/functions/create-lesson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-code': btoa('MERIDIAN2024')
        },
        body: JSON.stringify({ moduleId: lessonForm.moduleId, lessonData: lessonForm })
      });

      const result = await response.json();
      if (result.success) {
        alert('Lesson created! Commit and push changes to see it live.');
      } else {
        alert('Error: ' + result.error);
      }
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  };

  const handleCreateQuiz = async () => {
    try {
      const response = await fetch('/.netlify/functions/create-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-code': btoa('MERIDIAN2024')
        },
        body: JSON.stringify({ moduleId: quizForm.moduleId, quizData: quizForm })
      });

      const result = await response.json();
      if (result.success) {
        alert('Quiz created! Commit and push changes to see it live.');
      } else {
        alert('Error: ' + result.error);
      }
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  };

  const addKeyPoint = () => {
    setLessonForm(prev => ({
      ...prev,
      content: {
        ...prev.content,
        keyPoints: [...prev.content.keyPoints, '']
      }
    }));
  };

  const addSection = () => {
    setLessonForm(prev => ({
      ...prev,
      content: {
        ...prev.content,
        sections: [...prev.content.sections, { title: '', content: '' }]
      }
    }));
  };

  const addQuizQuestion = () => {
    setQuizForm(prev => ({
      ...prev,
      questions: [...prev.questions, {
        id: `q${prev.questions.length + 1}`,
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        explanation: ''
      }]
    }));
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Admin Content Portal</h1>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('modules')}
            className={`px-6 py-3 font-medium transition-colors ${activeTab === 'modules'
              ? 'text-orange-400 border-b-2 border-orange-400'
              : 'text-gray-400 hover:text-white'
              }`}
          >
            <BookOpen className="w-5 h-5 inline mr-2" />
            Modules
          </button>
          <button
            onClick={() => setActiveTab('lessons')}
            className={`px-6 py-3 font-medium transition-colors ${activeTab === 'lessons'
              ? 'text-orange-400 border-b-2 border-orange-400'
              : 'text-gray-400 hover:text-white'
              }`}
          >
            <FileText className="w-5 h-5 inline mr-2" />
            Lessons
          </button>
          <button
            onClick={() => setActiveTab('quizzes')}
            className={`px-6 py-3 font-medium transition-colors ${activeTab === 'quizzes'
              ? 'text-orange-400 border-b-2 border-orange-400'
              : 'text-gray-400 hover:text-white'
              }`}
          >
            <HelpCircle className="w-5 h-5 inline mr-2" />
            Quizzes
          </button>
        </div>

        {/* Module Form */}
        {activeTab === 'modules' && (
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-6">Create New Module</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Module ID</label>
                  <input
                    type="text"
                    value={moduleForm.id}
                    onChange={(e) => setModuleForm({ ...moduleForm, id: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    placeholder="e.g., crypto-basics"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={moduleForm.title}
                    onChange={(e) => setModuleForm({ ...moduleForm, title: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    placeholder="e.g., Cryptocurrency Basics"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={moduleForm.description}
                  onChange={(e) => setModuleForm({ ...moduleForm, description: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white h-24"
                  placeholder="Brief description of the module"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Difficulty</label>
                  <select
                    value={moduleForm.difficulty}
                    onChange={(e) => setModuleForm({ ...moduleForm, difficulty: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Duration</label>
                  <input
                    type="text"
                    value={moduleForm.duration}
                    onChange={(e) => setModuleForm({ ...moduleForm, duration: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    placeholder="e.g., 2 weeks"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Points</label>
                  <input
                    type="number"
                    value={moduleForm.points}
                    onChange={(e) => setModuleForm({ ...moduleForm, points: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                </div>
              </div>

              <button
                onClick={handleCreateModule}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>Create Module</span>
              </button>
            </div>
          </div>
        )}

        {/* Lesson Form */}
        {activeTab === 'lessons' && (
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-6">Create New Lesson</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Module ID</label>
                  <input
                    type="text"
                    value={lessonForm.moduleId}
                    onChange={(e) => setLessonForm({ ...lessonForm, moduleId: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    placeholder="e.g., crypto-basics"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Lesson ID</label>
                  <input
                    type="text"
                    value={lessonForm.id}
                    onChange={(e) => setLessonForm({ ...lessonForm, id: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    placeholder="e.g., 01_intro"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Lesson Title</label>
                <input
                  type="text"
                  value={lessonForm.title}
                  onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Introduction</label>
                <textarea
                  value={lessonForm.content.introduction}
                  onChange={(e) => setLessonForm({
                    ...lessonForm,
                    content: { ...lessonForm.content, introduction: e.target.value }
                  })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white h-32"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium">Key Points</label>
                  <button onClick={addKeyPoint} className="text-orange-400 hover:text-orange-300">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {lessonForm.content.keyPoints.map((point, idx) => (
                  <input
                    key={idx}
                    type="text"
                    value={point}
                    onChange={(e) => {
                      const newPoints = [...lessonForm.content.keyPoints];
                      newPoints[idx] = e.target.value;
                      setLessonForm({
                        ...lessonForm,
                        content: { ...lessonForm.content, keyPoints: newPoints }
                      });
                    }}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white mb-2"
                    placeholder={`Key point ${idx + 1}`}
                  />
                ))}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium">Sections</label>
                  <button onClick={addSection} className="text-orange-400 hover:text-orange-300">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {lessonForm.content.sections.map((section, idx) => (
                  <div key={idx} className="mb-4 p-4 bg-gray-700 rounded-lg">
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => {
                        const newSections = [...lessonForm.content.sections];
                        newSections[idx].title = e.target.value;
                        setLessonForm({
                          ...lessonForm,
                          content: { ...lessonForm.content, sections: newSections }
                        });
                      }}
                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white mb-2"
                      placeholder="Section title"
                    />
                    <textarea
                      value={section.content}
                      onChange={(e) => {
                        const newSections = [...lessonForm.content.sections];
                        newSections[idx].content = e.target.value;
                        setLessonForm({
                          ...lessonForm,
                          content: { ...lessonForm.content, sections: newSections }
                        });
                      }}
                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white h-24"
                      placeholder="Section content"
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={handleCreateLesson}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>Create Lesson</span>
              </button>
            </div>
          </div>
        )}

        {/* Quiz Form */}
        {activeTab === 'quizzes' && (
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-6">Create New Quiz</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Module ID</label>
                <input
                  type="text"
                  value={quizForm.moduleId}
                  onChange={(e) => setQuizForm({ ...quizForm, moduleId: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium">Questions</label>
                  <button onClick={addQuizQuestion} className="text-orange-400 hover:text-orange-300">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {quizForm.questions.map((q, idx) => (
                  <div key={idx} className="mb-6 p-4 bg-gray-700 rounded-lg">
                    <h3 className="text-lg font-medium mb-3">Question {idx + 1}</h3>
                    <textarea
                      value={q.question}
                      onChange={(e) => {
                        const newQuestions = [...quizForm.questions];
                        newQuestions[idx].question = e.target.value;
                        setQuizForm({ ...quizForm, questions: newQuestions });
                      }}
                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white mb-3"
                      placeholder="Question text"
                    />
                    {q.options.map((opt, optIdx) => (
                      <input
                        key={optIdx}
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const newQuestions = [...quizForm.questions];
                          newQuestions[idx].options[optIdx] = e.target.value;
                          setQuizForm({ ...quizForm, questions: newQuestions });
                        }}
                        className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white mb-2"
                        placeholder={`Option ${optIdx + 1}`}
                      />
                    ))}
                    <select
                      value={q.correctAnswer}
                      onChange={(e) => {
                        const newQuestions = [...quizForm.questions];
                        newQuestions[idx].correctAnswer = parseInt(e.target.value);
                        setQuizForm({ ...quizForm, questions: newQuestions });
                      }}
                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white mb-2"
                    >
                      <option value={0}>Option 1 is correct</option>
                      <option value={1}>Option 2 is correct</option>
                      <option value={2}>Option 3 is correct</option>
                      <option value={3}>Option 4 is correct</option>
                    </select>
                    <textarea
                      value={q.explanation}
                      onChange={(e) => {
                        const newQuestions = [...quizForm.questions];
                        newQuestions[idx].explanation = e.target.value;
                        setQuizForm({ ...quizForm, questions: newQuestions });
                      }}
                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                      placeholder="Explanation"
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={handleCreateQuiz}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>Create Quiz</span>
              </button>
            </div>
          </div>
        )}

        <div className="mt-8 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
          <p className="text-blue-300 text-sm">
            <strong>Note:</strong> This is a frontend prototype. In production, you'd need a backend API to save this data to your filesystem or database, then regenerate the manifest.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
