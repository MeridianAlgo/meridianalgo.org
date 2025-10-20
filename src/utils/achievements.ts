// Centralized achievements configuration
// This ensures Dashboard and Achievements page show the same achievements

import { 
  BookOpen, Award, TrendingUp, Target, Star, Users, Trophy,
  Flame, Calendar, Zap, FileText, Shield, Building,
  Lightbulb, Brain, Clock, Moon, Home
} from 'lucide-react';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: string;
  points: number;
  checkEarned: (user: any, completedConcepts: number, progressPercentage: number) => boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'welcome',
    title: 'Welcome Aboard!',
    description: 'Joined MeridianAlgo and started your financial journey',
    icon: Users,
    category: 'Getting Started',
    points: 50,
    checkEarned: () => true
  },
  {
    id: 'first_lesson',
    title: 'First Steps',
    description: 'Completed your first lesson',
    icon: BookOpen,
    category: 'Learning',
    points: 100,
    checkEarned: (user, completedConcepts) => completedConcepts >= 1
  },
  {
    id: 'streak_3',
    title: 'Getting Consistent',
    description: 'Maintained a 3-day learning streak',
    icon: Flame,
    category: 'Consistency',
    points: 150,
    checkEarned: (user) => user.learningStreak >= 3
  },
  {
    id: 'streak_7',
    title: 'Week Warrior',
    description: 'Maintained a 7-day learning streak',
    icon: TrendingUp,
    category: 'Consistency',
    points: 300,
    checkEarned: (user) => user.learningStreak >= 7
  },
  {
    id: 'streak_30',
    title: 'Monthly Master',
    description: 'Maintained a 30-day learning streak',
    icon: Calendar,
    category: 'Consistency',
    points: 1000,
    checkEarned: (user) => user.learningStreak >= 30
  },
  {
    id: 'lessons_5',
    title: 'Learning Machine',
    description: 'Completed 5 lessons',
    icon: Star,
    category: 'Progress',
    points: 200,
    checkEarned: (_user, completedConcepts) => completedConcepts >= 5
  },
  {
    id: 'lessons_10',
    title: 'Knowledge Seeker',
    description: 'Completed 10 lessons',
    icon: BookOpen,
    category: 'Progress',
    points: 400,
    checkEarned: (_user, completedConcepts) => completedConcepts >= 10
  },
  {
    id: 'lessons_25',
    title: 'Dedicated Learner',
    description: 'Completed 25 lessons',
    icon: Target,
    category: 'Progress',
    points: 750,
    checkEarned: (_user, completedConcepts) => completedConcepts >= 25
  },
  {
    id: 'halfway_hero',
    title: 'Halfway Hero',
    description: 'Completed 50% of all available lessons',
    icon: Trophy,
    category: 'Progress',
    points: 750,
    checkEarned: (_user, _completedConcepts, progressPercentage) => progressPercentage >= 50
  },
  {
    id: 'completionist',
    title: 'Financial Guru',
    description: 'Completed all available lessons',
    icon: Zap,
    category: 'Progress',
    points: 2000,
    checkEarned: (_user, _completedConcepts, progressPercentage) => progressPercentage >= 100
  },
  {
    id: 'quiz_master',
    title: 'Quiz Master',
    description: 'Completed 5 module quizzes',
    icon: Brain,
    category: 'Quizzes',
    points: 400,
    checkEarned: (user) => user.completedQuizzes.length >= 5
  },
  {
    id: 'quiz_expert',
    title: 'Quiz Expert',
    description: 'Completed 10 module quizzes',
    icon: Brain,
    category: 'Quizzes',
    points: 800,
    checkEarned: (user) => user.completedQuizzes.length >= 10
  },
  {
    id: 'points_1000',
    title: 'Point Collector',
    description: 'Earned 1,000 total points',
    icon: Star,
    category: 'Points',
    points: 200,
    checkEarned: (user) => user.totalPoints >= 1000
  },
  {
    id: 'points_5000',
    title: 'Point Master',
    description: 'Earned 5,000 total points',
    icon: Award,
    category: 'Points',
    points: 500,
    checkEarned: (user) => user.totalPoints >= 5000
  },
  {
    id: 'points_10000',
    title: 'Point Legend',
    description: 'Earned 10,000 total points',
    icon: Trophy,
    category: 'Points',
    points: 1000,
    checkEarned: (user) => user.totalPoints >= 10000
  },
  {
    id: 'couples_finance_complete',
    title: 'Relationship Money Pro',
    description: 'Completed all Couples and Money lessons',
    icon: Target,
    category: 'Modules',
    points: 500,
    checkEarned: (user) => user.completedConcepts.filter((c: string) => c.startsWith('couples-finance')).length >= 4
  },
  {
    id: 'credit_building_complete',
    title: 'Credit Champion',
    description: 'Completed all Credit Building lessons',
    icon: Award,
    category: 'Modules',
    points: 500,
    checkEarned: (user) => user.completedConcepts.filter((c: string) => c.startsWith('credit-building')).length >= 4
  },
  {
    id: 'retirement_complete',
    title: 'Retirement Ready',
    description: 'Completed all Retirement Account lessons',
    icon: Target,
    category: 'Modules',
    points: 500,
    checkEarned: (user) => user.completedConcepts.filter((c: string) => c.startsWith('retirement-accounts')).length >= 4
  },
  {
    id: 'insurance_complete',
    title: 'Insurance Expert',
    description: 'Completed all Insurance Planning lessons',
    icon: Shield,
    category: 'Modules',
    points: 500,
    checkEarned: (user) => user.completedConcepts.filter((c: string) => c.startsWith('insurance-planning')).length >= 4
  },
  {
    id: 'healthcare_complete',
    title: 'Healthcare Finance Pro',
    description: 'Completed all Healthcare Finance lessons',
    icon: Shield,
    category: 'Modules',
    points: 500,
    checkEarned: (user) => user.completedConcepts.filter((c: string) => c.startsWith('healthcare-finance') || c.startsWith('healthcare_finance')).length >= 4
  },
  {
    id: 'early_bird',
    title: 'Early Bird',
    description: 'Completed a lesson before 8 AM',
    icon: Clock,
    category: 'Special',
    points: 150,
    checkEarned: () => false // Requires special tracking
  },
  {
    id: 'night_owl',
    title: 'Night Owl',
    description: 'Completed a lesson after 10 PM',
    icon: Moon,
    category: 'Special',
    points: 150,
    checkEarned: () => false // Requires special tracking
  }
];

export const getEarnedAchievements = (user: any, completedConcepts: number, progressPercentage: number) => {
  return ACHIEVEMENTS.filter(achievement => 
    achievement.checkEarned(user, completedConcepts, progressPercentage)
  );
};

export const getTotalAchievementPoints = (user: any, completedConcepts: number, progressPercentage: number) => {
  const earned = getEarnedAchievements(user, completedConcepts, progressPercentage);
  return earned.reduce((sum, achievement) => sum + achievement.points, 0);
};
