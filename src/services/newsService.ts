import { financialNewsItems, FinancialNewsItem, FinancialNewsCategory } from '../data/financialNews';
import { stockTickers, StockTicker } from '../data/stockTickers';

// Diverse set of image URLs to avoid repetition
const newsImageUrls = [
  'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=500&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=500&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=500&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=500&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?w=500&auto=format&fit=crop&q=60',
];

// Enhanced news item with image
export interface EnhancedNewsItem extends FinancialNewsItem {
  imageUrl: string;
}

// Get all financial news with images
export const getFinancialNews = (): EnhancedNewsItem[] => {
  return financialNewsItems.map((item, index) => ({
    ...item,
    imageUrl: newsImageUrls[index % newsImageUrls.length]
  }));
};

// Get news by category
export const getNewsByCategory = (category: FinancialNewsCategory | 'All'): EnhancedNewsItem[] => {
  const allNews = getFinancialNews();
  if (category === 'All') return allNews;
  return allNews.filter(item => item.category === category);
};

// Get news by sentiment
export const getNewsBySentiment = (sentiment: 'All' | 'Positive' | 'Neutral' | 'Negative'): EnhancedNewsItem[] => {
  const allNews = getFinancialNews();
  if (sentiment === 'All') return allNews;
  return allNews.filter(item => item.sentiment === sentiment);
};

// Get news filtered by ticker symbol
export const getNewsByTicker = (tickerSymbol: string): EnhancedNewsItem[] => {
  return getFinancialNews().filter(item => 
    item.relatedTickers?.includes(tickerSymbol)
  );
};

// Get all available stock tickers
export const getStockTickers = (): StockTicker[] => {
  return stockTickers;
};

// Get stock tickers by sector
export const getTickersBySector = (sector: string): StockTicker[] => {
  return stockTickers.filter(ticker => ticker.sector === sector);
};

// Simulate fetching fresh news (would connect to real API in production)
export const fetchFreshNews = (): Promise<EnhancedNewsItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getFinancialNews());
    }, 500);
  });
};