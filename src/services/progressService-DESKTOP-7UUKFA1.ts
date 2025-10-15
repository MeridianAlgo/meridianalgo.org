import ContentService from './contentService';

interface ProgressData {
  totalLessons: number;
  completedLessons: number;
  totalPoints: number;
  earnedPoints: number;
  progressPercentage: number;
  moduleProgress: { [moduleId: string]: number };
}

class ProgressService {
  private static instance: ProgressService;
  private contentService: ContentService;

  constructor() {
    this.contentService = ContentService.getInstance();
  }

  static getInstance(): ProgressService {
    if (!ProgressService.instance) {
      ProgressService.instance = new ProgressService();
    }
    return ProgressService.instance;
  }

  async calculateProgress(completedConcepts: string[], completedQuizzes: string[]): Promise<ProgressData> {
    try {
      const modules = await this.contentService.getModules();
      
      let totalLessons = 0;
      let completedLessons = 0;
      let totalPoints = 0;
      let earnedPoints = 0;
      const moduleProgress: { [moduleId: string]: number } = {};

      for (const module of modules) {
        let moduleTotal = 0;
        let moduleCompleted = 0;
        let modulePointsTotal = 0;
        let modulePointsEarned = 0;

        // Count lessons
        for (const lesson of module.lessons) {
          totalLessons++;
          moduleTotal++;
          totalPoints += lesson.points;
          modulePointsTotal += lesson.points;

          if (completedConcepts.includes(lesson.id)) {
            completedLessons++;
            moduleCompleted++;
            earnedPoints += lesson.points;
            modulePointsEarned += lesson.points;
          }
        }

        // Count quiz points but not as separate lesson for progress calculation
        if (module.quiz) {
          totalPoints += module.quiz.points;
          modulePointsTotal += module.quiz.points;

          const quizCompleted = completedQuizzes.some(q => q.startsWith(module.quiz.id));
          if (quizCompleted) {
            earnedPoints += module.quiz.points;
            modulePointsEarned += module.quiz.points;
          }
        }

        moduleProgress[module.id] = moduleTotal > 0 ? Math.round((moduleCompleted / moduleTotal) * 100) : 0;
      }

      const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

      return {
        totalLessons,
        completedLessons,
        totalPoints,
        earnedPoints,
        progressPercentage,
        moduleProgress
      };
    } catch (error) {
      console.error('Error calculating progress:', error);
      return {
        totalLessons: 30,
        completedLessons: 0,
        totalPoints: 3000,
        earnedPoints: 0,
        progressPercentage: 0,
        moduleProgress: {}
      };
    }
  }

  calculateStreak(lastLoginDate: string, currentStreak: number): { streak: number; missedMessage?: string } {
    const today = new Date();
    const todayStr = today.toDateString();
    const lastLogin = lastLoginDate ? new Date(lastLoginDate) : new Date();
    const lastLoginStr = lastLogin.toDateString();

    // If already logged in today, return current streak
    if (todayStr === lastLoginStr) {
      return { streak: currentStreak };
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    // If last login was yesterday, increment streak
    if (lastLoginStr === yesterdayStr) {
      return { streak: currentStreak + 1 };
    }

    // If last login was more than 1 day ago, reset streak and show message
    const daysSinceLogin = Math.floor((today.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24));
    
    let missedMessage;
    if (daysSinceLogin === 2) {
      missedMessage = "We missed you yesterday! Let's get back on track! 💪";
    } else if (daysSinceLogin <= 7) {
      missedMessage = `We missed you for ${daysSinceLogin - 1} days! Welcome back! 🎉`;
    } else if (daysSinceLogin <= 30) {
      missedMessage = "It's been a while! Ready to continue your learning journey? 🚀";
    } else {
      missedMessage = "Welcome back! Let's restart your learning adventure! ✨";
    }

    return { streak: 1, missedMessage };
  }

  getPointsForLesson(lessonId: string): number {
    // Default points mapping - could be enhanced to load from content service
    const pointsMap: { [key: string]: number } = {
      // Beginner lessons
      'foundations_1': 50,
      'foundations_2': 50,
      'foundations_3': 50,
      'foundations_4': 50,
      'foundations_5': 50,
      'foundations_6': 50,
      'foundations_7': 50,
      'foundations_8': 50,
      'saving_1': 50,
      'saving_2': 50,
      'saving_3': 50,
      'saving_4': 50,
      'saving_5': 50,
      'insurance_1': 50,
      'insurance_2': 50,
      'insurance_3': 50,
      'insurance_4': 50,
      'banking_1': 50,
      'banking_2': 50,
      'banking_3': 50,
      'banking_4': 50,

      // Intermediate lessons
      'credit_1': 100,
      'credit_2': 100,
      'credit_3': 100,
      'credit_4': 100,
      'credit_5': 100,
      'investing_1': 100,
      'investing_2': 100,
      'investing_3': 100,
      'investing_4': 100,
      'investing_5': 100,
      'entrepreneurship_1': 100,
      'entrepreneurship_2': 100,
      'entrepreneurship_3': 100,
      'entrepreneurship_4': 100,
      'entrepreneurship_5': 100,
      'real_estate_1': 100,
      'real_estate_2': 100,
      'real_estate_3': 100,
      'real_estate_4': 100,

      // Advanced lessons
      'retirement_1': 150,
      'retirement_2': 150,
      'retirement_3': 150,
      'retirement_4': 150,
      'retirement_5': 150,
      'taxes_1': 150,
      'taxes_2': 150,
      'taxes_3': 150,
      'taxes_4': 150,

      // Quizzes
      'foundations_quiz': 100,
      'saving_quiz': 100,
      'insurance_quiz': 100,
      'banking_quiz': 100,
      'credit_quiz': 150,
      'investing_quiz': 150,
      'entrepreneurship_quiz': 150,
      'real_estate_quiz': 150,
      'retirement_quiz': 200,
      'taxes_quiz': 200
    };

    return pointsMap[lessonId] || 100;
  }
}

export default ProgressService;
export type { ProgressData };
