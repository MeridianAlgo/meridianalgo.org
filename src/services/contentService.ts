interface LessonManifest {
  modules: Module[];
}

interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  icon: string;
  color: string;
  lessons: LessonInfo[];
  quiz: QuizInfo;
}

interface LessonInfo {
  id: string;
  title: string;
  type: string;
  duration: string;
  points: number;
  contentFile: string;
}

interface QuizInfo {
  id: string;
  title: string;
  duration: string;
  points: number;
  contentFile: string;
}

interface LessonContent {
  title: string;
  type: string;
  duration: string;
  points: number;
  sections: LessonSection[];
}

interface LessonSection {
  type: string;
  title?: string;
  subtitle?: string;
  content?: string;
  items?: string[];
  points?: KeyPoint[];
  steps?: string[];
  color?: string;
  icon?: string;
  image?: string;
}

interface KeyPoint {
  title: string;
  description: string;
}

interface QuizContent {
  title: string;
  type: string;
  duration: string;
  points: number;
  passingScore: number;
  questions: QuizQuestion[];
}

interface QuizQuestion {
  id: number;
  type: string;
  question: string;
  options?: string[];
  correct: number | boolean;
  explanation: string;
}

class ContentService {
  private static instance: ContentService;
  private manifest: LessonManifest | null = null;

  static getInstance(): ContentService {
    if (!ContentService.instance) {
      ContentService.instance = new ContentService();
    }
    return ContentService.instance;
  }

  async loadManifest(): Promise<LessonManifest> {
    if (this.manifest) {
      return this.manifest;
    }

    try {
      const response = await fetch('/data/lessons/manifest.json');
      if (!response.ok) {
        throw new Error('Failed to load lesson manifest');
      }
      this.manifest = await response.json();
      return this.manifest!;
    } catch (error) {
      console.error('Error loading lesson manifest:', error);
      // Return fallback data
      return this.getFallbackManifest();
    }
  }

  async loadLessonContent(contentFile: string): Promise<LessonContent> {
    try {
      const response = await fetch(`/data/lessons/${contentFile}`);
      if (!response.ok) {
        throw new Error(`Failed to load lesson content: ${contentFile}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error loading lesson content:', error);
      return this.getFallbackLessonContent();
    }
  }

  async loadQuizContent(contentFile: string): Promise<QuizContent> {
    try {
      const response = await fetch(`/data/lessons/${contentFile}`);
      if (!response.ok) {
        throw new Error(`Failed to load quiz content: ${contentFile}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error loading quiz content:', error);
      return this.getFallbackQuizContent();
    }
  }

  async getModules(): Promise<Module[]> {
    const manifest = await this.loadManifest();
    return manifest.modules;
  }

  async getModule(moduleId: string): Promise<Module | null> {
    const modules = await this.getModules();
    return modules.find(m => m.id === moduleId) || null;
  }

  async getLesson(moduleId: string, lessonId: string): Promise<{ info: LessonInfo; content: LessonContent } | null> {
    const module = await this.getModule(moduleId);
    if (!module) return null;

    const lessonInfo = module.lessons.find(l => l.id === lessonId);
    if (!lessonInfo) return null;

    const content = await this.loadLessonContent(lessonInfo.contentFile);
    return { info: lessonInfo, content };
  }

  async getQuiz(moduleId: string): Promise<{ info: QuizInfo; content: QuizContent } | null> {
    const module = await this.getModule(moduleId);
    if (!module) return null;

    const content = await this.loadQuizContent(module.quiz.contentFile);
    return { info: module.quiz, content };
  }

  private getFallbackManifest(): LessonManifest {
    return {
      modules: [
        {
          id: 'foundations',
          title: 'Financial Foundations',
          description: 'Build a strong foundation in personal finance basics',
          duration: '4 weeks',
          difficulty: 'Beginner',
          icon: 'BookOpen',
          color: 'orange',
          lessons: [
            {
              id: 'foundations_1',
              title: 'Introduction to Money Management',
              type: 'reading',
              duration: '15 min',
              points: 100,
              contentFile: 'foundations_1.json'
            }
          ],
          quiz: {
            id: 'foundations_quiz',
            title: 'Financial Foundations Quiz',
            duration: '10 min',
            points: 200,
            contentFile: 'foundations_quiz.json'
          }
        }
      ]
    };
  }

  private getFallbackLessonContent(): LessonContent {
    return {
      title: 'Lesson Content',
      type: 'reading',
      duration: '10 min',
      points: 100,
      sections: [
        {
          type: 'content',
          title: 'Lesson Content',
          content: 'This lesson content is currently being loaded. Please check back soon for the full content.'
        }
      ]
    };
  }

  private getFallbackQuizContent(): QuizContent {
    return {
      title: 'Quiz',
      type: 'quiz',
      duration: '5 min',
      points: 100,
      passingScore: 70,
      questions: [
        {
          id: 1,
          type: 'multiple-choice',
          question: 'This is a sample question.',
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correct: 0,
          explanation: 'This is a sample explanation.'
        }
      ]
    };
  }
}

export default ContentService;
export type { LessonManifest, Module, LessonInfo, LessonContent, LessonSection, QuizContent, QuizQuestion };
