import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define all 20 new modules
const modules = [
  {
    id: 'credit-building',
    title: 'Credit Building Fundamentals',
    description: 'Build and maintain excellent credit from scratch',
    difficulty: 'Beginner',
    icon: 'TrendingUp',
    color: 'blue',
    lessons: [
      { title: 'Understanding Credit Scores', type: 'reading', duration: '15 min' },
      { title: 'Building Credit from Zero', type: 'reading', duration: '18 min' },
      { title: 'Credit Card Best Practices', type: 'exercise', duration: '20 min' },
      { title: 'Monitoring and Maintaining Credit', type: 'reading', duration: '15 min' }
    ]
  },
  {
    id: 'real-estate-investing',
    title: 'Real Estate Investing Basics',
    description: 'Learn the fundamentals of property investment',
    difficulty: 'Intermediate',
    icon: 'Home',
    color: 'purple',
    lessons: [
      { title: 'Real Estate Investment Strategies', type: 'reading', duration: '20 min' },
      { title: 'Analyzing Property Deals', type: 'exercise', duration: '25 min' },
      { title: 'Financing Investment Properties', type: 'reading', duration: '22 min' },
      { title: 'Property Management Essentials', type: 'reading', duration: '18 min' }
    ]
  },
  {
    id: 'tax-optimization',
    title: 'Tax Optimization Strategies',
    description: 'Minimize taxes legally and maximize deductions',
    difficulty: 'Intermediate',
    icon: 'FileText',
    color: 'red',
    lessons: [
      { title: 'Understanding Tax Brackets', type: 'reading', duration: '15 min' },
      { title: 'Common Tax Deductions', type: 'reading', duration: '20 min' },
      { title: 'Tax-Advantaged Accounts', type: 'exercise', duration: '18 min' },
      { title: 'Year-End Tax Planning', type: 'reading', duration: '16 min' }
    ]
  },
  {
    id: 'insurance-planning',
    title: 'Insurance and Risk Management',
    description: 'Protect yourself and your assets with proper insurance',
    difficulty: 'Beginner',
    icon: 'Shield',
    color: 'green',
    lessons: [
      { title: 'Types of Insurance Coverage', type: 'reading', duration: '18 min' },
      { title: 'Life Insurance Fundamentals', type: 'reading', duration: '20 min' },
      { title: 'Health Insurance Basics', type: 'reading', duration: '22 min' },
      { title: 'Disability and Liability Insurance', type: 'reading', duration: '16 min' }
    ]
  },
  {
    id: 'cryptocurrency-basics',
    title: 'Cryptocurrency Fundamentals',
    description: 'Understand digital currencies and blockchain technology',
    difficulty: 'Intermediate',
    icon: 'Zap',
    color: 'yellow',
    lessons: [
      { title: 'What is Cryptocurrency?', type: 'reading', duration: '15 min' },
      { title: 'Blockchain Technology Explained', type: 'reading', duration: '20 min' },
      { title: 'Buying and Storing Crypto', type: 'exercise', duration: '25 min' },
      { title: 'Crypto Investment Risks', type: 'reading', duration: '18 min' }
    ]
  },
  {
    id: 'estate-planning',
    title: 'Estate Planning Essentials',
    description: 'Plan for the future and protect your legacy',
    difficulty: 'Advanced',
    icon: 'FileText',
    color: 'indigo',
    lessons: [
      { title: 'Wills and Trusts Basics', type: 'reading', duration: '20 min' },
      { title: 'Power of Attorney', type: 'reading', duration: '15 min' },
      { title: 'Beneficiary Designations', type: 'exercise', duration: '18 min' },
      { title: 'Estate Tax Planning', type: 'reading', duration: '22 min' }
    ]
  },
  {
    id: 'side-hustle-finance',
    title: 'Side Hustle Financial Management',
    description: 'Manage finances for your side business',
    difficulty: 'Beginner',
    icon: 'Briefcase',
    color: 'orange',
    lessons: [
      { title: 'Starting a Side Hustle', type: 'reading', duration: '15 min' },
      { title: 'Tracking Side Income', type: 'exercise', duration: '20 min' },
      { title: 'Side Hustle Tax Basics', type: 'reading', duration: '18 min' },
      { title: 'Scaling Your Side Business', type: 'reading', duration: '16 min' }
    ]
  },
  {
    id: 'financial-independence',
    title: 'Financial Independence (FIRE)',
    description: 'Achieve financial independence and early retirement',
    difficulty: 'Advanced',
    icon: 'Target',
    color: 'red',
    lessons: [
      { title: 'FIRE Movement Basics', type: 'reading', duration: '18 min' },
      { title: 'Calculating Your FIRE Number', type: 'exercise', duration: '25 min' },
      { title: 'Aggressive Savings Strategies', type: 'reading', duration: '20 min' },
      { title: 'Living in Early Retirement', type: 'reading', duration: '22 min' }
    ]
  },
  {
    id: 'stock-market-basics',
    title: 'Stock Market Fundamentals',
    description: 'Learn how to invest in individual stocks',
    difficulty: 'Intermediate',
    icon: 'TrendingUp',
    color: 'green',
    lessons: [
      { title: 'How the Stock Market Works', type: 'reading', duration: '20 min' },
      { title: 'Reading Stock Charts', type: 'exercise', duration: '25 min' },
      { title: 'Fundamental Analysis', type: 'reading', duration: '22 min' },
      { title: 'Building a Stock Portfolio', type: 'reading', duration: '18 min' }
    ]
  },
  {
    id: 'bonds-fixed-income',
    title: 'Bonds and Fixed Income',
    description: 'Understand bonds and fixed-income investments',
    difficulty: 'Intermediate',
    icon: 'DollarSign',
    color: 'blue',
    lessons: [
      { title: 'Bond Basics', type: 'reading', duration: '18 min' },
      { title: 'Types of Bonds', type: 'reading', duration: '20 min' },
      { title: 'Bond Yields and Prices', type: 'exercise', duration: '22 min' },
      { title: 'Building a Bond Ladder', type: 'reading', duration: '16 min' }
    ]
  },
  {
    id: 'etf-investing',
    title: 'ETF Investing Strategies',
    description: 'Master exchange-traded fund investments',
    difficulty: 'Beginner',
    icon: 'BarChart',
    color: 'purple',
    lessons: [
      { title: 'What are ETFs?', type: 'reading', duration: '15 min' },
      { title: 'ETFs vs Mutual Funds', type: 'reading', duration: '18 min' },
      { title: 'Choosing the Right ETFs', type: 'exercise', duration: '20 min' },
      { title: 'ETF Portfolio Construction', type: 'reading', duration: '22 min' }
    ]
  },
  {
    id: 'dividend-investing',
    title: 'Dividend Investing',
    description: 'Build passive income through dividend stocks',
    difficulty: 'Intermediate',
    icon: 'TrendingUp',
    color: 'green',
    lessons: [
      { title: 'Dividend Investing Basics', type: 'reading', duration: '18 min' },
      { title: 'Evaluating Dividend Stocks', type: 'exercise', duration: '22 min' },
      { title: 'Dividend Reinvestment Plans', type: 'reading', duration: '16 min' },
      { title: 'Building a Dividend Portfolio', type: 'reading', duration: '20 min' }
    ]
  },
  {
    id: 'options-trading',
    title: 'Options Trading Basics',
    description: 'Introduction to options and derivatives',
    difficulty: 'Advanced',
    icon: 'Zap',
    color: 'red',
    lessons: [
      { title: 'What are Options?', type: 'reading', duration: '20 min' },
      { title: 'Calls and Puts Explained', type: 'reading', duration: '22 min' },
      { title: 'Basic Options Strategies', type: 'exercise', duration: '25 min' },
      { title: 'Options Risk Management', type: 'reading', duration: '18 min' }
    ]
  },
  {
    id: 'international-investing',
    title: 'International Investing',
    description: 'Diversify globally with international investments',
    difficulty: 'Intermediate',
    icon: 'Globe',
    color: 'blue',
    lessons: [
      { title: 'Why Invest Internationally?', type: 'reading', duration: '16 min' },
      { title: 'International Investment Vehicles', type: 'reading', duration: '20 min' },
      { title: 'Currency Risk Management', type: 'exercise', duration: '22 min' },
      { title: 'Emerging Markets', type: 'reading', duration: '18 min' }
    ]
  },
  {
    id: 'retirement-accounts',
    title: 'Retirement Account Strategies',
    description: 'Maximize 401k, IRA, and other retirement accounts',
    difficulty: 'Beginner',
    icon: 'PiggyBank',
    color: 'orange',
    lessons: [
      { title: '401(k) Fundamentals', type: 'reading', duration: '18 min' },
      { title: 'Traditional vs Roth IRA', type: 'reading', duration: '20 min' },
      { title: 'Contribution Strategies', type: 'exercise', duration: '22 min' },
      { title: 'Retirement Account Rollovers', type: 'reading', duration: '16 min' }
    ]
  },
  {
    id: 'wealth-preservation',
    title: 'Wealth Preservation',
    description: 'Protect and preserve your accumulated wealth',
    difficulty: 'Advanced',
    icon: 'Shield',
    color: 'indigo',
    lessons: [
      { title: 'Asset Protection Strategies', type: 'reading', duration: '20 min' },
      { title: 'Diversification for Preservation', type: 'reading', duration: '18 min' },
      { title: 'Inflation Protection', type: 'exercise', duration: '22 min' },
      { title: 'Generational Wealth Transfer', type: 'reading', duration: '20 min' }
    ]
  },
  {
    id: 'frugal-living',
    title: 'Frugal Living Mastery',
    description: 'Live well while spending less',
    difficulty: 'Beginner',
    icon: 'DollarSign',
    color: 'green',
    lessons: [
      { title: 'Frugal Mindset', type: 'reading', duration: '15 min' },
      { title: 'Cutting Major Expenses', type: 'exercise', duration: '20 min' },
      { title: 'Smart Shopping Strategies', type: 'reading', duration: '18 min' },
      { title: 'DIY and Self-Sufficiency', type: 'reading', duration: '16 min' }
    ]
  },
  {
    id: 'financial-psychology',
    title: 'Financial Psychology',
    description: 'Understand the psychology behind money decisions',
    difficulty: 'Intermediate',
    icon: 'Brain',
    color: 'purple',
    lessons: [
      { title: 'Money and Emotions', type: 'reading', duration: '18 min' },
      { title: 'Breaking Bad Money Habits', type: 'exercise', duration: '22 min' },
      { title: 'Financial Stress Management', type: 'reading', duration: '20 min' },
      { title: 'Building Healthy Money Mindsets', type: 'reading', duration: '16 min' }
    ]
  },
  {
    id: 'couples-finance',
    title: 'Couples and Money',
    description: 'Navigate finances as a couple',
    difficulty: 'Beginner',
    icon: 'Heart',
    color: 'red',
    lessons: [
      { title: 'Money Conversations', type: 'reading', duration: '16 min' },
      { title: 'Joint vs Separate Accounts', type: 'reading', duration: '18 min' },
      { title: 'Creating a Couples Budget', type: 'exercise', duration: '22 min' },
      { title: 'Financial Goals as a Team', type: 'reading', duration: '20 min' }
    ]
  },
  {
    id: 'financial-recovery',
    title: 'Financial Recovery',
    description: 'Recover from financial setbacks and rebuild',
    difficulty: 'Beginner',
    icon: 'TrendingUp',
    color: 'blue',
    lessons: [
      { title: 'Assessing Your Situation', type: 'reading', duration: '15 min' },
      { title: 'Creating a Recovery Plan', type: 'exercise', duration: '22 min' },
      { title: 'Rebuilding Emergency Funds', type: 'reading', duration: '18 min' },
      { title: 'Moving Forward', type: 'reading', duration: '16 min' }
    ]
  }
];

console.log('🚀 Generating 20 learning modules...\n');

modules.forEach((module, index) => {
  const moduleDir = path.join(__dirname, '..', 'public', 'data', 'lessons', 'modules', module.id);
  const lessonsDir = path.join(moduleDir, 'lessons');
  
  // Create directories
  if (!fs.existsSync(moduleDir)) {
    fs.mkdirSync(moduleDir, { recursive: true });
  }
  if (!fs.existsSync(lessonsDir)) {
    fs.mkdirSync(lessonsDir, { recursive: true });
  }
  
  // Create module.json
  const moduleJson = {
    id: module.id,
    title: module.title,
    description: module.description,
    duration: '2 weeks',
    difficulty: module.difficulty,
    icon: module.icon,
    color: module.color,
    status: 'active',
    lessons: module.lessons.map((lesson, i) => ({
      id: `${module.id}_${i + 1}`,
      title: lesson.title,
      type: lesson.type,
      duration: lesson.duration,
      points: 100,
      contentFile: `modules/${module.id}/lessons/${String(i + 1).padStart(2, '0')}_lesson.json`
    })),
    quiz: {
      id: `${module.id}_quiz`,
      title: `${module.title} Quiz`,
      duration: '10 min',
      points: 150,
      contentFile: `modules/${module.id}/quiz.json`
    }
  };
  
  fs.writeFileSync(
    path.join(moduleDir, 'module.json'),
    JSON.stringify(moduleJson, null, 2)
  );
  
  // Create lesson files
  module.lessons.forEach((lesson, i) => {
    const lessonContent = {
      title: lesson.title,
      type: lesson.type,
      duration: lesson.duration,
      points: 100,
      sections: [
        {
          type: 'hero',
          title: lesson.title,
          subtitle: `Learn about ${lesson.title.toLowerCase()}`,
          color: module.color,
          icon: module.icon
        },
        {
          type: 'content',
          title: 'Introduction',
          content: `This lesson covers the fundamentals of ${lesson.title.toLowerCase()}. You'll learn key concepts and practical strategies.`
        },
        {
          type: 'key-points',
          title: 'Key Takeaways',
          points: [
            { title: 'Concept 1', description: 'Understanding the basics' },
            { title: 'Concept 2', description: 'Practical applications' },
            { title: 'Concept 3', description: 'Best practices' }
          ]
        },
        {
          type: 'content',
          title: 'Summary',
          content: 'You now have a solid foundation in this topic. Practice these concepts to master them.'
        }
      ]
    };
    
    fs.writeFileSync(
      path.join(lessonsDir, `${String(i + 1).padStart(2, '0')}_lesson.json`),
      JSON.stringify(lessonContent, null, 2)
    );
  });
  
  // Create quiz
  const quizContent = {
    title: `${module.title} Quiz`,
    type: 'quiz',
    duration: '10 min',
    points: 150,
    passingScore: 70,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: `What is a key principle of ${module.title.toLowerCase()}?`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correct: 0,
        explanation: 'This is the correct answer because it aligns with best practices.'
      },
      {
        id: 2,
        type: 'true-false',
        question: `${module.title} is important for financial success.`,
        correct: true,
        explanation: 'True. This topic is fundamental to financial literacy.'
      },
      {
        id: 3,
        type: 'multiple-choice',
        question: 'Which strategy is most effective?',
        options: ['Strategy A', 'Strategy B', 'Strategy C', 'Strategy D'],
        correct: 1,
        explanation: 'Strategy B is most effective in most situations.'
      },
      {
        id: 4,
        type: 'multiple-choice',
        question: 'What should you avoid?',
        options: ['Mistake A', 'Mistake B', 'Mistake C', 'Mistake D'],
        correct: 2,
        explanation: 'Avoiding Mistake C is crucial for success.'
      },
      {
        id: 5,
        type: 'true-false',
        question: 'Regular practice improves outcomes.',
        correct: true,
        explanation: 'True. Consistent application of these principles leads to better results.'
      }
    ]
  };
  
  fs.writeFileSync(
    path.join(moduleDir, 'quiz.json'),
    JSON.stringify(quizContent, null, 2)
  );
  
  console.log(`✅ Created module ${index + 1}/20: ${module.title}`);
});

console.log('\n🎉 All 20 modules created successfully!');
console.log('📝 Run "npm run generate-manifest" to update the manifest.json');
