interface LessonManifest {
  modules: Module[];
  generatedAt?: string;
  version?: string;
}

interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  icon: string;
  color: string;
  status?: 'active' | 'coming-soon' | 'locked';
  prerequisites?: string[];
  unlockCost?: number;
  lessons: LessonInfo[];
  quiz: QuizInfo;
}

interface ModuleMetadata {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  icon: string;
  color: string;
  status: 'active' | 'coming-soon' | 'locked';
  prerequisites?: string[];
  unlockCost?: number;
}

interface ModuleStatus {
  moduleId: string;
  status: 'locked' | 'available' | 'in-progress' | 'completed';
  progress: number;
  lessonsCompleted: number;
  lessonsTotal: number;
  quizCompleted: boolean;
  canUnlock: boolean;
  unlockCost?: number;
  lockReason?: string;
}

interface UserProgress {
  completedLessons: string[];
  completedQuizzes: string[];
  completedModules: string[];
  unlockedModules: string[];
  totalPoints: number;
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
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

interface LessonLink {
  label: string;
  description: string;
  url: string;
}

interface CalculatorInput {
  id: string;
  label: string;
  placeholder?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
}

interface CalculatorConfig {
  id: string;
  description: string;
  resultLabel: string;
  inputs: CalculatorInput[];
  formulaNote?: string;
  highlight?: string;
  ctaLabel?: string;
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
  links?: LessonLink[];
  calculator?: CalculatorConfig;
  layout?: 'grid' | 'stack';
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

      const text = await response.text();
      if (text.trim().startsWith('<')) {
        throw new Error(`Received HTML instead of JSON for lesson: ${contentFile}`);
      }

      return JSON.parse(text);
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

      const text = await response.text();
      if (text.trim().startsWith('<')) {
        throw new Error(`Received HTML instead of JSON for quiz: ${contentFile}`);
      }

      return JSON.parse(text);
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

    // Use auto-resolution for backward compatibility
    const content = await this.loadLessonContentAuto(lessonInfo.contentFile);
    return { info: lessonInfo, content };
  }

  async getQuiz(moduleId: string): Promise<{ info: QuizInfo; content: QuizContent } | null> {
    const module = await this.getModule(moduleId);
    if (!module) return null;

    // Use auto-resolution for backward compatibility
    const content = await this.loadQuizContentAuto(module.quiz.contentFile);
    return { info: module.quiz, content };
  }

  /**
   * Discovers all available modules from the modular structure
   * This method scans the modules directory and returns metadata
   */
  async discoverModules(): Promise<ModuleMetadata[]> {
    try {
      // In a browser environment, we rely on the manifest
      // The manifest is generated by the build script
      const manifest = await this.loadManifest();
      
      return manifest.modules.map(module => ({
        id: module.id,
        title: module.title,
        description: module.description,
        duration: module.duration,
        difficulty: module.difficulty as 'Beginner' | 'Intermediate' | 'Advanced',
        icon: module.icon,
        color: module.color,
        status: module.status || 'active',
        prerequisites: module.prerequisites,
        unlockCost: module.unlockCost
      }));
    } catch (error) {
      console.error('Error discovering modules:', error);
      return [];
    }
  }

  /**
   * Gets the status of a module based on user progress
   */
  getModuleStatus(moduleId: string, module: Module, userProgress: UserProgress): ModuleStatus {
    const lessonsTotal = module.lessons.length;
    const lessonsCompleted = module.lessons.filter(lesson => 
      userProgress.completedLessons.includes(lesson.id)
    ).length;
    
    const progress = lessonsTotal > 0 ? Math.round((lessonsCompleted / lessonsTotal) * 100) : 0;
    const quizCompleted = userProgress.completedQuizzes.some(q => q.startsWith(`${moduleId}_quiz`));
    
    // Determine if module is locked
    let status: 'locked' | 'available' | 'in-progress' | 'completed' = 'available';
    let canUnlock = false;
    let unlockCost: number | undefined;
    let lockReason: string | undefined;
    
    // Check if module is explicitly unlocked
    const isUnlocked = userProgress.unlockedModules.includes(moduleId);
    
    // Check prerequisites
    if (module.prerequisites && module.prerequisites.length > 0 && !isUnlocked) {
      const prerequisitesMet = module.prerequisites.every(prereqId =>
        userProgress.completedModules.includes(prereqId)
      );
      
      if (!prerequisitesMet) {
        status = 'locked';
        lockReason = 'Complete prerequisite modules first';
        
        // Can unlock with points if unlock cost is defined
        if (module.unlockCost && userProgress.totalPoints >= module.unlockCost) {
          canUnlock = true;
          unlockCost = module.unlockCost;
        }
      }
    }
    
    // Check module status field
    if (module.status === 'coming-soon') {
      status = 'locked';
      lockReason = 'Coming soon';
      canUnlock = false;
    } else if (module.status === 'locked' && !isUnlocked) {
      status = 'locked';
      lockReason = 'This module is locked';
      if (module.unlockCost && userProgress.totalPoints >= module.unlockCost) {
        canUnlock = true;
        unlockCost = module.unlockCost;
      }
    }
    
    // Determine progress status
    if (status === 'available' || isUnlocked) {
      if (progress === 100 && quizCompleted) {
        status = 'completed';
      } else if (progress > 0) {
        status = 'in-progress';
      } else {
        status = 'available';
      }
    }
    
    return {
      moduleId,
      status,
      progress,
      lessonsCompleted,
      lessonsTotal,
      quizCompleted,
      canUnlock,
      unlockCost,
      lockReason
    };
  }

  /**
   * Validates a module's structure
   */
  validateModuleStructure(module: Module): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    // Check required fields
    const requiredFields: (keyof Module)[] = ['id', 'title', 'description', 'difficulty', 'icon', 'color', 'lessons'];
    
    for (const field of requiredFields) {
      if (!module[field]) {
        errors.push(`Missing required field: ${field}`);
      }
    }
    
    // Validate difficulty
    const validDifficulties = ['Beginner', 'Intermediate', 'Advanced'];
    if (module.difficulty && !validDifficulties.includes(module.difficulty)) {
      errors.push(`Invalid difficulty: ${module.difficulty}. Must be one of: ${validDifficulties.join(', ')}`);
    }
    
    // Validate lessons
    if (module.lessons) {
      if (!Array.isArray(module.lessons)) {
        errors.push('Lessons must be an array');
      } else if (module.lessons.length === 0) {
        warnings.push('Module has no lessons');
      } else {
        module.lessons.forEach((lesson, index) => {
          if (!lesson.id) errors.push(`Lesson ${index} missing id`);
          if (!lesson.title) errors.push(`Lesson ${index} missing title`);
          if (!lesson.contentFile) errors.push(`Lesson ${index} missing contentFile`);
          if (!lesson.type) warnings.push(`Lesson ${index} missing type`);
          if (!lesson.duration) warnings.push(`Lesson ${index} missing duration`);
        });
      }
    }
    
    // Validate quiz
    if (module.quiz) {
      if (!module.quiz.id) errors.push('Quiz missing id');
      if (!module.quiz.contentFile) errors.push('Quiz missing contentFile');
    } else {
      warnings.push('Module has no quiz');
    }
    
    // Validate status
    if (module.status) {
      const validStatuses = ['active', 'coming-soon', 'locked'];
      if (!validStatuses.includes(module.status)) {
        warnings.push(`Invalid status: ${module.status}. Must be one of: ${validStatuses.join(', ')}`);
      }
    }
    
    // Validate prerequisites
    if (module.prerequisites && !Array.isArray(module.prerequisites)) {
      errors.push('Prerequisites must be an array');
    }
    
    // Validate unlock cost
    if (module.unlockCost !== undefined) {
      if (typeof module.unlockCost !== 'number' || module.unlockCost < 0) {
        errors.push('Unlock cost must be a positive number');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Validates all modules in the manifest
   */
  async validateAllModules(): Promise<{ [moduleId: string]: ValidationResult }> {
    const modules = await this.getModules();
    const results: { [moduleId: string]: ValidationResult } = {};
    
    for (const module of modules) {
      results[module.id] = this.validateModuleStructure(module);
    }
    
    return results;
  }

  /**
   * Clears the cached manifest to force a reload
   */
  clearCache(): void {
    this.manifest = null;
  }

  /**
   * Checks if a module uses the new modular structure
   */
  isModularStructure(module: Module): boolean {
    // Check if content files use the modules/ path
    if (module.lessons && module.lessons.length > 0) {
      return module.lessons[0].contentFile.startsWith('modules/');
    }
    return false;
  }

  /**
   * Gets the content file path, handling both legacy and modular structures
   */
  getContentPath(contentFile: string): string {
    // If it already starts with modules/, it's using the new structure
    if (contentFile.startsWith('modules/')) {
      return `/data/lessons/${contentFile}`;
    }
    // Legacy structure - files are in the root lessons directory
    return `/data/lessons/${contentFile}`;
  }

  /**
   * Loads lesson content with automatic path resolution
   */
  async loadLessonContentAuto(contentFile: string): Promise<LessonContent> {
    const path = this.getContentPath(contentFile);
    
    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Failed to load lesson content: ${contentFile}`);
      }

      const text = await response.text();
      if (text.trim().startsWith('<')) {
        throw new Error(`Received HTML instead of JSON for lesson: ${contentFile}`);
      }

      return JSON.parse(text);
    } catch (error) {
      console.error('Error loading lesson content:', error);
      return this.getFallbackLessonContent();
    }
  }

  /**
   * Loads quiz content with automatic path resolution
   */
  async loadQuizContentAuto(contentFile: string): Promise<QuizContent> {
    const path = this.getContentPath(contentFile);
    
    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Failed to load quiz content: ${contentFile}`);
      }

      const text = await response.text();
      if (text.trim().startsWith('<')) {
        throw new Error(`Received HTML instead of JSON for quiz: ${contentFile}`);
      }

      return JSON.parse(text);
    } catch (error) {
      console.error('Error loading quiz content:', error);
      return this.getFallbackQuizContent();
    }
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
export type {
  LessonManifest,
  Module,
  ModuleMetadata,
  ModuleStatus,
  UserProgress,
  ValidationResult,
  LessonInfo,
  LessonContent,
  LessonSection,
  LessonLink,
  CalculatorConfig,
  CalculatorInput,
  QuizContent,
  QuizQuestion
};
