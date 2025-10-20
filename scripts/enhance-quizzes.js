import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const modulesDir = path.join(__dirname, '..', 'public', 'data', 'lessons', 'modules');

const modules = fs.readdirSync(modulesDir).filter(item => {
  const itemPath = path.join(modulesDir, item);
  return fs.statSync(itemPath).isDirectory();
});

console.log(`📝 Enhancing quizzes for ${modules.length} modules...\\n`);

let enhancedCount = 0;

modules.forEach(moduleId => {
  const modulePath = path.join(modulesDir, moduleId);
  const quizPath = path.join(modulePath, 'quiz.json');

  if (!fs.existsSync(quizPath)) return;

  const currentQuiz = JSON.parse(fs.readFileSync(quizPath, 'utf8'));

  // Check if quiz already has detailed questions
  if (currentQuiz.questions && currentQuiz.questions.length > 5 &&
    currentQuiz.questions[0].explanation && currentQuiz.questions[0].explanation.length > 50) {
    return; // Already enhanced
  }

  // Create enhanced quiz
  const enhancedQuiz = createEnhancedQuiz(currentQuiz.title, moduleId);

  fs.writeFileSync(quizPath, JSON.stringify(enhancedQuiz, null, 2));
  enhancedCount++;
  console.log(`✅ Enhanced quiz: ${moduleId}`);
});

console.log(`\\n🎉 Enhanced ${enhancedCount} quizzes!`);

function createEnhancedQuiz(title, moduleId) {
  const moduleTopics = {
    'credit-building': {
      q1: 'What percentage of your credit score is determined by payment history?',
      q2: 'What is the recommended credit utilization ratio?',
      q3: 'A secured credit card requires a cash deposit.',
      q4: 'How often can you get free credit reports from each bureau?',
      q5: 'Closing old credit cards always improves your credit score.'
    },
    'stock-market-basics': {
      q1: 'What does it mean to own a stock?',
      q2: 'What is a bull market?',
      q3: 'Dividends are guaranteed payments from all stocks.',
      q4: 'What is the main advantage of index funds for beginners?',
      q5: 'You should check your stock portfolio daily.'
    },
    'retirement-accounts': {
      q1: 'What is the main difference between Traditional and Roth IRA?',
      q2: 'What is the 2024 401(k) contribution limit for those under 50?',
      q3: 'Employer 401(k) matching is free money.',
      q4: 'When can you withdraw from a Roth IRA without penalty?',
      q5: 'You can contribute to both a 401(k) and an IRA.'
    }
  };

  const questions = moduleTopics[moduleId] || {
    q1: `What is a key principle of ${title.toLowerCase()}?`,
    q2: 'Which strategy is most effective for long-term success?',
    q3: `Understanding ${title.toLowerCase()} is important for financial success.`,
    q4: 'What should you prioritize when getting started?',
    q5: 'Consistent action is more important than perfect planning.'
  };

  return {
    title: title,
    type: "quiz",
    duration: "12 min",
    points: 150,
    passingScore: 70,
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: questions.q1,
        options: [
          "35% - Payment history is the most important factor",
          "30% - Credit utilization matters most",
          "15% - Length of credit history is key",
          "10% - New credit inquiries are most important"
        ],
        correct: 0,
        explanation: "Payment history accounts for 35% of your credit score, making it the single most important factor. Paying bills on time consistently is crucial for building and maintaining good credit."
      },
      {
        id: 2,
        type: "multiple-choice",
        question: questions.q2,
        options: [
          "Below 10% for optimal scores",
          "Below 30% is recommended",
          "Below 50% is acceptable",
          "It doesn't matter as long as you pay on time"
        ],
        correct: 1,
        explanation: "Keeping your credit utilization below 30% is recommended for maintaining a good credit score. This means if you have a $1,000 credit limit, try to keep your balance below $300. Lower is even better!"
      },
      {
        id: 3,
        type: "true-false",
        question: questions.q3,
        correct: true,
        explanation: "True. A secured credit card requires a refundable security deposit that typically becomes your credit limit. This makes them easier to get approved for when you're building credit from scratch. After demonstrating responsible use, you can often upgrade to an unsecured card."
      },
      {
        id: 4,
        type: "multiple-choice",
        question: questions.q4,
        options: [
          "Once per year from each bureau (3 total per year)",
          "Once per year total (must choose one bureau)",
          "Twice per year from each bureau",
          "Only when you're denied credit"
        ],
        correct: 0,
        explanation: "You're entitled to one free credit report from each of the three major bureaus (Equifax, Experian, TransUnion) every 12 months through AnnualCreditReport.com. That's 3 free reports per year! Pro tip: Space them out every 4 months to monitor your credit year-round."
      },
      {
        id: 5,
        type: "true-false",
        question: questions.q5,
        correct: false,
        explanation: "False. Closing old credit cards can actually hurt your score by reducing your available credit (increasing utilization) and shortening your credit history. Keep old cards open and use them occasionally to maintain your credit history length."
      },
      {
        id: 6,
        type: "multiple-choice",
        question: "What's the best first step when starting to build credit?",
        options: [
          "Apply for multiple credit cards at once",
          "Get a secured credit card or become an authorized user",
          "Take out a large personal loan",
          "Wait until you have more money saved"
        ],
        correct: 1,
        explanation: "Starting with a secured credit card or becoming an authorized user on someone else's account are the safest, most effective ways to begin building credit. These options are accessible to beginners and help establish positive payment history."
      },
      {
        id: 7,
        type: "multiple-choice",
        question: "How long does negative information typically stay on your credit report?",
        options: [
          "1-2 years",
          "3-5 years",
          "7 years for most items",
          "Forever"
        ],
        correct: 2,
        explanation: "Most negative information stays on your credit report for 7 years, including late payments, collections, and charge-offs. Bankruptcies can stay for up to 10 years. The good news is that the impact lessens over time, especially if you build positive credit history."
      },
      {
        id: 8,
        type: "true-false",
        question: "Checking your own credit score hurts your credit.",
        correct: false,
        explanation: "False. Checking your own credit score is a 'soft inquiry' and does NOT hurt your credit. Only 'hard inquiries' from lenders when you apply for credit can temporarily lower your score. Check your credit as often as you want!"
      },
      {
        id: 9,
        type: "multiple-choice",
        question: "What should you do if you find an error on your credit report?",
        options: [
          "Ignore it - errors don't matter",
          "Wait for it to fix itself",
          "Dispute it with the credit bureau in writing",
          "Close all your credit accounts"
        ],
        correct: 2,
        explanation: "If you find an error, dispute it in writing with the credit bureau. They must investigate within 30 days. Include documentation supporting your claim. Errors can significantly impact your score, so it's important to address them promptly."
      },
      {
        id: 10,
        type: "multiple-choice",
        question: "What's the minimum credit score typically needed for the best mortgage rates?",
        options: [
          "580-620",
          "640-680",
          "700-720",
          "760-780"
        ],
        correct: 3,
        explanation: "A credit score of 760-780 or higher typically qualifies you for the best mortgage rates. While you can get approved with lower scores, you'll pay higher interest rates. Even a small difference in rate can mean tens of thousands of dollars over a 30-year mortgage."
      }
    ]
  };
}
