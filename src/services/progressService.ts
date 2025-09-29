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
      'foundations_1': 100,
      'foundations_2': 75,
      'foundations_3': 150,
      'foundations_4': 100,
      'foundations_5': 125,
      'foundations_6': 100,
      'saving_1': 100,
      'saving_2': 125,
      'saving_3': 75,
      'saving_4': 150,
      'saving_5': 100,
      'credit_1': 125,
      'credit_2': 150,
      'credit_3': 100,
      'credit_4': 175,
      'credit_5': 100,
      'investing_1': 125,
      'investing_2': 150,
      'investing_3': 125,
      'investing_4': 200,
      'investing_5': 100,
      'retirement_1': 125,
      'retirement_2': 175,
      'retirement_3': 125,
      'retirement_4': 150,
      'retirement_5': 175,
      'taxes_1': 100,
      'taxes_2': 150,
      'taxes_3': 125,
      'taxes_4': 150,
      'insurance_1': 140,
      'insurance_2': 160,
      'insurance_3': 175,
      'insurance_4': 165,
      'banking_1': 130,
      'banking_2': 160,
      'banking_3': 145,
      'banking_4': 170,
      'saving_quiz': 200,
      'insurance_quiz': 220,
      'banking_quiz': 180,
      'entrepreneurship_1': 150,
      'entrepreneurship_2': 175,
      'entrepreneurship_3': 125,
      'entrepreneurship_4': 150,
      'entrepreneurship_5': 125,
      'real_estate_1': 125,
      'real_estate_2': 175,
      'real_estate_3': 150,
      'real_estate_4': 150
    };

    return pointsMap[lessonId] || 100;
  }
}

export default ProgressService;
export type { ProgressData };
