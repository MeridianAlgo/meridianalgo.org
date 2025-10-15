import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rich lesson content templates
const lessonTemplates = {
  'credit-building': {
    lessons: [
      {
        title: "Understanding Credit Scores",
        sections: [
          {
            type: "hero",
            title: "Understanding Credit Scores",
            subtitle: "Master the fundamentals of credit scoring and why it matters",
            color: "blue",
            icon: "TrendingUp"
          },
          {
            type: "content",
            title: "What is a Credit Score?",
            content: "Your credit score is a three-digit number (typically 300-850) that represents your creditworthiness. Lenders use this score to decide whether to approve you for credit cards, loans, mortgages, and even rental applications. A higher score means better interest rates and more financial opportunities."
          },
          {
            type: "key-points",
            title: "The Five Factors That Determine Your Score",
            points: [
              {
                title: "Payment History (35%)",
                description: "Your track record of paying bills on time. Even one late payment can significantly impact your score. This is the most important factor."
              },
              {
                title: "Credit Utilization (30%)",
                description: "The percentage of available credit you're using. Keep this below 30% for optimal scores. Using $300 of a $1,000 limit = 30% utilization."
              },
              {
                title: "Length of Credit History (15%)",
                description: "How long you've had credit accounts. Older accounts help your score. Don't close your oldest credit card!"
              },
              {
                title: "Credit Mix (10%)",
                description: "Having different types of credit (credit cards, auto loans, mortgages) shows you can manage various accounts responsibly."
              },
              {
                title: "New Credit (10%)",
                description: "Recent credit inquiries and new accounts. Too many applications in a short time can hurt your score."
              }
            ]
          },
          {
            type: "content",
            title: "Credit Score Ranges",
            content: "Understanding where you stand:\\n\\n• 800-850: Exceptional - Best rates and terms\\n• 740-799: Very Good - Above average, great rates\\n• 670-739: Good - Near or slightly above average\\n• 580-669: Fair - Below average, higher rates\\n• 300-579: Poor - Difficult to get approved"
          },
          {
            type: "callout",
            title: "Free Credit Reports",
            content: "You're entitled to one free credit report from each bureau (Equifax, Experian, TransUnion) every year at AnnualCreditReport.com. Check them regularly for errors!",
            color: "green",
            icon: "FileText"
          },
          {
            type: "steps",
            title: "How to Check Your Credit Score",
            steps: [
              "Visit AnnualCreditReport.com for free reports from all three bureaus",
              "Use free services like Credit Karma or Credit Sesame for regular monitoring",
              "Check if your credit card offers free score tracking (many do)",
              "Review your reports for errors and dispute any inaccuracies",
              "Set calendar reminders to check every 4 months (rotating bureaus)"
            ]
          }
        ]
      },
      {
        title: "Building Credit from Zero",
        sections: [
          {
            type: "hero",
            title: "Building Credit from Zero",
            subtitle: "Start your credit journey the right way",
            color: "blue",
            icon: "TrendingUp"
          },
          {
            type: "content",
            title: "Starting with No Credit History",
            content: "Having no credit history is different from having bad credit. You're starting with a clean slate! The challenge is that lenders have no data to assess your creditworthiness. Here's how to build credit from scratch."
          },
          {
            type: "key-points",
            title: "Best Ways to Build Credit from Zero",
            points: [
              {
                title: "Secured Credit Card",
                description: "Put down a deposit ($200-500) that becomes your credit limit. Use it for small purchases and pay in full monthly. After 6-12 months of good behavior, you can upgrade to an unsecured card and get your deposit back."
              },
              {
                title: "Credit Builder Loan",
                description: "Banks hold your loan amount in savings while you make payments. After paying off the loan, you get the money back plus you've built credit history. Perfect for beginners!"
              },
              {
                title: "Become an Authorized User",
                description: "Ask a family member with good credit to add you to their credit card. Their positive history can help build your score. Make sure they have excellent payment history!"
              },
              {
                title: "Student Credit Card",
                description: "If you're in college, student cards are designed for people with no credit history. They often have lower limits and fewer perks, but they're easier to get approved for."
              },
              {
                title: "Rent Reporting Services",
                description: "Services like Rental Kharma or RentTrack report your rent payments to credit bureaus. Turn your monthly rent into credit-building activity!"
              }
            ]
          },
          {
            type: "steps",
            title: "Your 6-Month Credit Building Plan",
            steps: [
              "Month 1: Apply for a secured credit card with a $300-500 deposit",
              "Month 1-6: Make small purchases ($20-50/month) and pay in full each month",
              "Month 2: Set up automatic payments to never miss a due date",
              "Month 3: Keep credit utilization below 30% (use less than $150 of $500 limit)",
              "Month 4: Check your credit score - you should see it appear!",
              "Month 6: Apply for a second credit card or credit builder loan",
              "Ongoing: Continue perfect payment history and low utilization"
            ]
          },
          {
            type: "callout",
            title: "Patience is Key",
            content: "Building good credit takes time. You'll see your first score after 3-6 months, but it takes 12-24 months to build a solid credit history. Stay consistent!",
            color: "orange",
            icon: "Clock"
          }
        ]
      }
    ]
  },
  'stock-market-basics': {
    lessons: [
      {
        title: "How the Stock Market Works",
        sections: [
          {
            type: "hero",
            title: "How the Stock Market Works",
            subtitle: "Demystifying the stock market for beginners",
            color: "green",
            icon: "TrendingUp"
          },
          {
            type: "content",
            title: "What is the Stock Market?",
            content: "The stock market is where investors buy and sell shares of publicly traded companies. When you buy a stock, you're purchasing a small piece of ownership in that company. If the company does well, your shares increase in value. If it struggles, they may decrease."
          },
          {
            type: "key-points",
            title: "Key Stock Market Concepts",
            points: [
              {
                title: "Stocks (Equities)",
                description: "Shares of ownership in a company. When you own Apple stock, you literally own a tiny piece of Apple Inc. You can profit from price increases and dividends."
              },
              {
                title: "Stock Exchanges",
                description: "Marketplaces where stocks are bought and sold. The NYSE and NASDAQ are the two largest in the US. Think of them as organized marketplaces for trading."
              },
              {
                title: "Market Orders vs Limit Orders",
                description: "Market orders buy/sell immediately at current price. Limit orders only execute at your specified price or better. Limit orders give you more control."
              },
              {
                title: "Bull vs Bear Markets",
                description: "Bull markets are rising (optimistic). Bear markets are falling (pessimistic). Bulls charge forward, bears swipe down - that's how to remember!"
              },
              {
                title: "Dividends",
                description: "Regular cash payments some companies make to shareholders. It's like getting paid just for owning the stock. Not all companies pay dividends."
              }
            ]
          },
          {
            type: "content",
            title: "How Stock Prices Move",
            content: "Stock prices are determined by supply and demand. When more people want to buy a stock than sell it, the price goes up. When more want to sell than buy, it goes down. Prices reflect investor expectations about a company's future performance, not just current results."
          },
          {
            type: "steps",
            title: "How to Start Investing in Stocks",
            steps: [
              "Open a brokerage account (Fidelity, Schwab, Vanguard, or Robinhood)",
              "Fund your account with money you won't need for 5+ years",
              "Research companies or index funds you want to invest in",
              "Start small - buy 1-2 shares to learn the process",
              "Set up automatic investments to build your portfolio over time",
              "Review your investments quarterly, but don't obsess daily",
              "Stay invested for the long term - time in market beats timing the market"
            ]
          },
          {
            type: "callout",
            title: "Start with Index Funds",
            content: "New investors should consider index funds (like S&P 500 funds) before individual stocks. They provide instant diversification across hundreds of companies, reducing risk while you learn.",
            color: "blue",
            icon: "Shield"
          }
        ]
      }
    ]
  }
};

console.log('🎨 Enhancing lesson content with rich, detailed information...\\n');

// Function to enhance a single lesson file
function enhanceLesson(modulePath, lessonFile, enhancedContent) {
  const lessonPath = path.join(modulePath, 'lessons', lessonFile);
  
  if (fs.existsSync(lessonPath)) {
    fs.writeFileSync(lessonPath, JSON.stringify(enhancedContent, null, 2));
    return true;
  }
  return false;
}

// Enhance credit-building module
const creditBuildingPath = path.join(__dirname, '..', 'public', 'data', 'lessons', 'modules', 'credit-building');
if (lessonTemplates['credit-building']) {
  lessonTemplates['credit-building'].lessons.forEach((lesson, index) => {
    const lessonFile = `${String(index + 1).padStart(2, '0')}_lesson.json`;
    const enhanced = {
      title: lesson.title,
      type: "reading",
      duration: "18 min",
      points: 100,
      sections: lesson.sections
    };
    
    if (enhanceLesson(creditBuildingPath, lessonFile, enhanced)) {
      console.log(`✅ Enhanced: Credit Building - ${lesson.title}`);
    }
  });
}

// Enhance stock-market-basics module
const stockMarketPath = path.join(__dirname, '..', 'public', 'data', 'lessons', 'modules', 'stock-market-basics');
if (lessonTemplates['stock-market-basics']) {
  lessonTemplates['stock-market-basics'].lessons.forEach((lesson, index) => {
    const lessonFile = `${String(index + 1).padStart(2, '0')}_lesson.json`;
    const enhanced = {
      title: lesson.title,
      type: "reading",
      duration: "20 min",
      points: 100,
      sections: lesson.sections
    };
    
    if (enhanceLesson(stockMarketPath, lessonFile, enhanced)) {
      console.log(`✅ Enhanced: Stock Market Basics - ${lesson.title}`);
    }
  });
}

console.log('\\n🎉 Lesson enhancement complete!');
console.log('📝 Enhanced lessons now have rich content with:');
console.log('   - Detailed explanations');
console.log('   - Key points with descriptions');
console.log('   - Step-by-step guides');
console.log('   - Callouts and tips');
console.log('   - Real-world examples');
