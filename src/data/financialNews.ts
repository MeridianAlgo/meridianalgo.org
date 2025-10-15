export type FinancialNewsCategory =
  | 'Economy'
  | 'Markets'
  | 'Investing'
  | 'Personal Finance'
  | 'Banking'
  | 'Policy'
  | 'Technology'
  | 'Stocks'
  | 'Cryptocurrencies'
  | 'Commodities';

export interface FinancialNewsItem {
  id: string;
  title: string;
  summary: string;
  content?: string;
  source: string;
  url: string;
  imageUrl?: string;
  publishedAt: string;
  category: FinancialNewsCategory;
  sentiment: 'positive' | 'negative' | 'neutral';
  importance: 'high' | 'medium' | 'low';
  relatedTickers?: string[]; // Stock tickers related to the news
}

export const financialNewsItems: FinancialNewsItem[] = [
  {
    id: 'news-001',
    title: 'Stocks Close Higher as Government Shutdown Looms',
    summary:
      'Stocks finished in positive territory on Tuesday, just hours before a possible government shutdown, with the Dow Jones Industrial Average reaching a fresh record close.',
    source: 'CNBC',
    url: 'https://www.cnbc.com/2025/09/29/stock-market-today-live-updates.html',
    category: 'Stocks',
    sentiment: 'positive',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
    importance: 'high',
    relatedTickers: ['DIA', 'SPY', 'QQQ'],
  },
  {
    id: 'news-002',
    title: 'Wall Street Braces for Potential Government Shutdown Impact',
    summary:
      'Investors are taking the prospect of a government shutdown in stride, though some worry the impact could be harmful if the Trump administration goes through with mass firings of federal workers or if it lasts longer than anticipated.',
    source: 'CNBC',
    url: 'https://www.cnbc.com/2025/09/29/stock-market-today-live-updates.html',
    category: 'Economy',
    sentiment: 'neutral',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
    importance: 'high',
    relatedTickers: ['SPY', 'DIA', 'IEF'],
  },
  {
    id: 'news-003',
    title: 'EchoStar Soars 9% on Potential Verizon Spectrum Deal',
    summary:
      'EchoStar shares jumped after Bloomberg News reported the telecom company was in talks to sell some of its wireless spectrum to Verizon, specifically involving EchoStar\'s AWS-3 licenses used for 5G wireless.',
    source: 'CNBC',
    url: 'https://www.cnbc.com/2025/09/29/stock-market-today-live-updates.html',
    category: 'Stocks',
    sentiment: 'positive',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    importance: 'medium',
    relatedTickers: ['SATS', 'VZ'],
  },
  {
    id: 'news-004',
    title: 'Progress Software Shares Rise After Beating Earnings Estimates',
    summary:
      'Shares of the AI-powered infrastructure software maker rose 3% after exceeding Wall Street\'s estimates for its third quarter and raising its full-year guidance, with adjusted earnings of $1.50 per share on revenue of $250 million.',
    source: 'CNBC',
    url: 'https://www.cnbc.com/2025/09/29/stock-market-today-live-updates.html',
    category: 'Technology',
    sentiment: 'positive',
    publishedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    importance: 'medium',
    relatedTickers: ['PRGS', 'NVDA', 'ORCL'],
  },
  {
    id: 'news-005',
    title: 'Jefferies Reports Strong Q3 Results Despite Stock Drop',
    summary:
      'Jefferies Financial Group shares dropped about 1.3% despite beating expectations, reporting revenue that jumped roughly 22% from a year earlier while its investment banking advisory business hit a record.',
    source: 'CNBC',
    url: 'https://www.cnbc.com/2025/09/29/stock-market-today-live-updates.html',
    category: 'Banking',
    sentiment: 'neutral',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
    importance: 'medium',
    relatedTickers: ['JEF', 'GS', 'MS'],
  },
  {
    id: 'news-006',
    title: 'Obamacare Tax Credits Become Sticking Point in Shutdown Standoff',
    summary:
      'An impasse over health care funding has put the federal government on track to shut down, with the Affordable Care Act\'s enhanced premium tax credits becoming a sticking point in the standoff.',
    source: 'CNBC',
    url: 'https://www.cnbc.com/2025/09/29/stock-market-today-live-updates.html',
    category: 'Policy',
    sentiment: 'neutral',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    importance: 'high',
    relatedTickers: ['UNH', 'HUM', 'CVS', 'CI'],
  },
  {
    id: 'news-007',
    title: 'Wall Street Set to Wrap Up Strong Month and Quarter',
    summary:
      'Wall Street is set to wrap up a strong month and quarter, driven by gains in AI giants such as Nvidia and Oracle, with the S&P 500 up almost 8% quarter to date and the tech-heavy Nasdaq notching more than 11% quarterly gain.',
    source: 'CNBC',
    url: 'https://www.cnbc.com/2025/09/29/stock-market-today-live-updates.html',
    category: 'Stocks',
    sentiment: 'positive',
    publishedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 minutes ago
    importance: 'medium',
    relatedTickers: ['SPY', 'QQQ', 'NVDA', 'ORCL'],
  },
  {
    id: 'news-008',
    title: 'Nike to Report Earnings After the Bell',
    summary:
      'Nike will report its quarterly earnings after market close today, with Wall Street closely watching the athletic apparel giant\'s performance amid changing consumer spending patterns and global economic challenges.',
    source: 'CNBC',
    url: 'https://www.cnbc.com/',
    category: 'Stocks',
    sentiment: 'neutral',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 2.5).toISOString(), // 2.5 hours ago
    importance: 'medium',
    relatedTickers: ['NKE', 'ADDYY', 'UAA', 'LULU'],
  },
  {
    id: 'news-009',
    title: 'Cryptocurrencies Stabilize After Recent Volatility',
    summary:
      'Major cryptocurrencies have stabilized following a period of heightened volatility, with investors closely monitoring regulatory developments and institutional adoption trends in the digital asset space.',
    source: 'Wall Street Journal',
    url: 'https://www.wsj.com/finance/currencies/crypto',
    category: 'Cryptocurrencies',
    sentiment: 'neutral',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 3.5).toISOString(), // 3.5 hours ago
    importance: 'medium',
    relatedTickers: ['COIN', 'MSTR', 'RIOT', 'MARA'],
  },
  {
    id: 'news-010',
    title: 'CoreWeave Announces $14.2 Billion AI Cloud Deal with Meta',
    summary:
      'CoreWeave, backed by Nvidia, announced a $14.2 billion artificial intelligence cloud infrastructure deal with Meta Platforms, boosting Nvidia shares in sympathy during Tuesday\'s trading session.',
    source: 'CNBC',
    url: 'https://www.cnbc.com/2025/09/29/stock-market-today-live-updates.html',
    category: 'Technology',
    sentiment: 'positive',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 1.5).toISOString(), // 1.5 hours ago
    importance: 'high',
    relatedTickers: ['NVDA', 'META', 'MSFT', 'GOOGL'],
  },
  {
    id: 'news-011',
    title: 'Consumer Confidence Falls Below Expectations in September',
    summary:
      'The latest sign of economic strain arose Tuesday when the September reading on consumer confidence came in lower than expected, adding to investor concerns about a slowing labor market and the risk of stagflation.',
    source: 'CNBC',
    url: 'https://www.cnbc.com/2025/09/29/stock-market-today-live-updates.html',
    category: 'Economy',
    sentiment: 'negative',
    publishedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
    importance: 'high',
    relatedTickers: ['SPY', 'XLY', 'XLP', 'DIA'],
  },
  {
    id: 'news-012',
    title: 'Software Stocks Retreat as Paychex Falls After Earnings',
    summary:
      'Software stocks retreated Tuesday, with Paychex pulling back more than 1% following its quarterly results and Salesforce moving 3.3% lower, despite the broader market closing higher.',
    source: 'CNBC',
    url: 'https://www.cnbc.com/2025/09/29/stock-market-today-live-updates.html',
    category: 'Stocks',
    sentiment: 'negative',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 4.5).toISOString(), // 4.5 hours ago
    importance: 'medium',
    relatedTickers: ['PAYX', 'CRM', 'MSFT', 'ADBE'],
  },
  {
    id: 'news-013',
    title: 'Commodities Market Braces for Potential Government Shutdown Impact',
    summary:
      'Commodity traders are assessing how a potential U.S. government shutdown might affect market data reporting, regulatory oversight, and overall trading conditions in energy, metals, and agricultural markets.',
    source: 'Wall Street Journal',
    url: 'https://www.wsj.com/finance/commodities',
    category: 'Commodities',
    sentiment: 'neutral',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 5.5).toISOString(), // 5.5 hours ago
    importance: 'medium',
    relatedTickers: ['USO', 'GLD', 'SLV', 'WEAT'],
  },
  {
    id: 'news-014',
    title: 'September Jobs Report May Be Delayed by Government Shutdown',
    summary:
      'If the government suspends operations, the Labor Department said it won\'t release the September nonfarm payrolls report as scheduled on Friday, potentially delaying crucial information about the direction of the economy ahead of the Federal Reserve\'s October meeting.',
    source: 'CNBC',
    url: 'https://www.cnbc.com/2025/09/29/stock-market-today-live-updates.html',
    category: 'Economy',
    sentiment: 'neutral',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
    importance: 'high',
    relatedTickers: ['SPY', 'DIA', 'IEF', 'TLT'],
  },
  {
    id: 'news-015',
    title: 'Retirement Savings Gap Widens as Americans Face Financial Challenges',
    summary:
      'A comprehensive study revealed growing disparities in retirement preparedness among American households, with many workers struggling to accumulate adequate savings amid competing financial priorities and economic pressures.',
    source: 'MarketWatch',
    url: 'https://www.marketwatch.com/retirement',
    category: 'Personal Finance',
    sentiment: 'Negative',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 3.2).toISOString(), // 3.2 hours ago
    importance: 'Medium',
    relatedTickers: ['TROW', 'BLK', 'SCHW', 'BEN'],
  },
  {
    id: 'news-016',
    title: 'Ethereum Completes Major Network Upgrade, Enhancing Scalability',
    summary:
      'Ethereum successfully implemented a significant protocol upgrade that substantially improves transaction throughput, reduces fees, and decreases energy consumption, addressing key limitations while maintaining decentralization and security.',
    source: 'CoinDesk',
    url: 'https://www.coindesk.com/ethereum',
    category: 'Cryptocurrencies',
    sentiment: 'Positive',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 1.8).toISOString(), // 1.8 hours ago
    importance: 'High',
    relatedTickers: ['ETH-USD', 'COIN', 'MARA', 'RIOT'],
  },
  {
    id: 'news-017',
    title: 'Pfizer Announces Breakthrough in Cancer Treatment Research',
    summary:
      'Pfizer revealed promising clinical trial results for an innovative cancer therapy demonstrating unprecedented efficacy against previously treatment-resistant tumors, potentially transforming treatment protocols for multiple cancer types.',
    source: 'CNBC',
    url: 'https://www.cnbc.com/health',
    category: 'Stocks',
    sentiment: 'Positive',
    publishedAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(), // 35 minutes ago
    importance: 'High',
    relatedTickers: ['PFE', 'MRK', 'BMY', 'JNJ'],
  },
  {
    id: 'news-018',
    title: 'Consumer Confidence Index Exceeds Expectations Despite Inflation Pressures',
    summary:
      'The latest Consumer Confidence Index surpassed analyst forecasts, indicating resilient household sentiment despite persistent inflation concerns, suggesting continued consumer spending strength underpinning economic growth.',
    source: 'Wall Street Journal',
    url: 'https://www.wsj.com/economy/consumers',
    category: 'Economy',
    sentiment: 'Positive',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 2.7).toISOString(), // 2.7 hours ago
    importance: 'Medium',
    relatedTickers: ['XLY', 'XRT', 'WMT', 'AMZN'],
  },
  {
    id: 'news-019',
    title: 'BlackRock Launches Innovative Climate-Focused Investment Products',
    summary:
      'BlackRock introduced a comprehensive suite of investment vehicles specifically designed to capitalize on climate transition opportunities while addressing environmental risks across multiple asset classes and geographic regions.',
    source: 'Financial Times',
    url: 'https://www.ft.com/climate-capital',
    category: 'Investing',
    sentiment: 'Positive',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 4.2).toISOString(), // 4.2 hours ago
    importance: 'Medium',
    relatedTickers: ['BLK', 'ICLN', 'TAN', 'FAN'],
  },
  {
    id: 'news-020',
    title: 'Major Banks Announce Significant Branch Closures Amid Digital Shift',
    summary:
      'Several leading financial institutions revealed plans to substantially reduce their physical branch networks, accelerating their digital transformation strategies in response to changing consumer preferences and operational efficiency imperatives.',
    source: 'Reuters',
    url: 'https://www.reuters.com/business/finance/banking',
    category: 'Banking',
    sentiment: 'Neutral',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 5.8).toISOString(), // 5.8 hours ago
    importance: 'Medium',
    relatedTickers: ['JPM', 'BAC', 'WFC', 'C'],
  }
];
