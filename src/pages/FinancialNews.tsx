import React, { useMemo, useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  Newspaper,
  BarChart3,
  Filter,
  Search,
  Clock,
  ArrowUpDown,
  ExternalLink,
  TrendingUp,
  RefreshCw,
  Image as ImageIcon,
  Tag,
  ThumbsUp
} from 'lucide-react';
import { getFinancialNews, getStockTickers, getNewsByTicker } from '../services/newsService';

import { FinancialNewsCategory } from '../data/financialNews';
import { StockTicker } from '../data/stockTickers';
import { EnhancedNewsItem } from '../services/newsService';

const CATEGORY_ORDER: FinancialNewsCategory[] = [
  'Markets',
  'Economy',
  'Investing',
  'Personal Finance',
  'Technology',
  'Policy',
  'Banking',
];

const IMPORTANCE_ORDER: Record<string, number> = {
  High: 3,
  Medium: 2,
  Low: 1,
};

const SENTIMENT_ORDER: Record<string, number> = {
  Positive: 3,
  Neutral: 2,
  Negative: 1,
};

const FinancialNewsPage: React.FC = () => {
  const location = useLocation();
  const [newsItems, setNewsItems] = useState<EnhancedNewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'All' | FinancialNewsCategory>('All');
  const [selectedSentiment, setSelectedSentiment] = useState<'All' | 'Positive' | 'Neutral' | 'Negative'>('All');
  const [sortKey, setSortKey] = useState<'latest' | 'oldest' | 'importance' | 'sentiment'>('latest');
  const [searchTerm, setSearchTerm] = useState('');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [selectedTicker, setSelectedTicker] = useState<string | undefined>();
  const stockTickers = useMemo(() => getStockTickers(), []);

  // Load news data and handle URL query params
  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const news = await getFinancialNews();
        setNewsItems(news);

        // Check for query params
        const params = new URLSearchParams(location.search);
        const categoryParam = params.get('category');
        if (categoryParam && CATEGORY_ORDER.includes(categoryParam as FinancialNewsCategory)) {
          setSelectedCategory(categoryParam as FinancialNewsCategory);
        }
      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setIsLoading(false);
        setLastUpdated(new Date());
      }
    };

    fetchNews();
  }, [location]);

  // Refresh news data periodically (every 60 seconds)
  useEffect(() => {
    const refreshInterval = setInterval(async () => {
      setIsRefreshing(true);
      try {
        const freshNews = await getFinancialNews();
        setNewsItems(freshNews);
        setLastUpdated(new Date());
      } catch (error) {
        console.error('Failed to refresh news:', error);
      } finally {
        setIsRefreshing(false);
      }
    }, 60000);

    return () => clearInterval(refreshInterval);
  }, []);

  // Manual refresh function
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const freshNews = await getFinancialNews();
      setNewsItems(freshNews);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to refresh news:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const categories = useMemo(() => {
    const unique = new Set<FinancialNewsCategory>();
    newsItems.forEach((item) => unique.add(item.category));
    return CATEGORY_ORDER.filter((cat) => unique.has(cat));
  }, [newsItems]);

  const filteredItems = useMemo(() => {
    return newsItems
      .filter((item) => (selectedCategory === 'All' ? true : item.category === selectedCategory))
      .filter((item) => (selectedSentiment === 'All' ? true : item.sentiment === selectedSentiment))
      .filter((item) => {
        if (!selectedTicker) return true;
        return item.relatedTickers?.includes(selectedTicker);
      })
      .filter((item) => {
        if (!searchTerm.trim()) return true;
        const haystack = `${item.title} ${item.summary} ${item.source}`.toLowerCase();
        return haystack.includes(searchTerm.toLowerCase());
      })
      .sort((a, b) => {
        switch (sortKey) {
          case 'oldest':
            return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
          case 'importance':
            return IMPORTANCE_ORDER[b.importance] - IMPORTANCE_ORDER[a.importance];
          case 'sentiment':
            return SENTIMENT_ORDER[b.sentiment] - SENTIMENT_ORDER[a.sentiment];
          case 'latest':
          default:
            return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        }
      });
  }, [selectedCategory, selectedSentiment, sortKey, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-full mx-0 px-8 py-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </Link>
            <div className="flex items-center gap-3">
              <Newspaper className="w-8 h-8 text-orange-400" />
              <div>
                <h1 className="text-2xl font-bold text-white">Financial News Hub (BETA)</h1>
                <p className="text-gray-400 text-sm">
                  Track the latest market, economic, and policy headlines curated for MeridianAlgo learners.
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-700 hover:border-orange-400 hover:text-white transition-colors"
              disabled={isRefreshing}
            >
              <RefreshCw className={`w-4 h-4 text-orange-400 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
            </button>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-400" />
              <span>Updated {lastUpdated.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-full mx-0 px-8 py-10">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <section className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)] gap-10">
            {/* Filters Sidebar */}
            <aside className="bg-gray-800 border border-gray-700 rounded-2xl p-8 space-y-10 h-fit sticky top-6">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-orange-400" /> Filters
                </h2>
                <div className="flex flex-wrap gap-3">
                  <button
                    className={`px-4 py-2 rounded-full text-sm border transition-colors ${selectedCategory === 'All'
                      ? 'bg-orange-500 border-orange-500 text-white'
                      : 'border-gray-600 text-gray-300 hover:border-orange-400 hover:text-white'
                      }`}
                    onClick={() => setSelectedCategory('All')}
                  >
                    All Topics
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`px-4 py-2 rounded-full text-sm border transition-colors ${selectedCategory === category
                        ? 'bg-orange-500 border-orange-500 text-white'
                        : 'border-gray-600 text-gray-300 hover:border-orange-400 hover:text-white'
                        }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-orange-400" /> Companies
                </h2>
                <div className="flex flex-wrap gap-3 max-h-48 overflow-y-auto pr-2">
                  <button
                    className={`px-4 py-2 rounded-full text-sm border transition-colors ${!selectedTicker
                      ? 'bg-orange-500 border-orange-500 text-white'
                      : 'border-gray-600 text-gray-300 hover:border-orange-400 hover:text-white'
                      }`}
                    onClick={() => setSelectedTicker(undefined)}
                  >
                    All Companies
                  </button>
                  {stockTickers.slice(0, 10).map((ticker) => (
                    <button
                      key={ticker.symbol}
                      className={`px-4 py-2 rounded-full text-sm border transition-colors ${selectedTicker === ticker.symbol
                        ? 'bg-orange-500 border-orange-500 text-white'
                        : 'border-gray-600 text-gray-300 hover:border-orange-400 hover:text-white'
                        }`}
                      onClick={() => setSelectedTicker(ticker.symbol)}
                    >
                      {ticker.symbol}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4 text-orange-400" /> Sentiment
                </h2>
                <div className="flex flex-wrap gap-3">
                  {(['All', 'Positive', 'Neutral', 'Negative'] as const).map((sentiment) => (
                    <button
                      key={sentiment}
                      className={`px-4 py-2 rounded-full text-sm border transition-colors ${selectedSentiment === sentiment
                        ? 'bg-orange-500 border-orange-500 text-white'
                        : 'border-gray-600 text-gray-300 hover:border-orange-400 hover:text-white'
                        }`}
                      onClick={() => setSelectedSentiment(sentiment)}
                    >
                      {sentiment}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 text-orange-400" /> Sort By
                </h2>
                <div className="space-y-3">
                  {(
                    [
                      { key: 'latest', label: 'Latest Headlines' },
                      { key: 'oldest', label: 'Oldest Headlines' },
                      { key: 'importance', label: 'Importance' },
                      { key: 'sentiment', label: 'Sentiment Strength' },
                    ] as const
                  ).map((option) => (
                    <button
                      key={option.key}
                      className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${sortKey === option.key
                        ? 'border-orange-500 bg-orange-500/10 text-white'
                        : 'border-gray-700 text-gray-300 hover:border-orange-400 hover:text-white'
                        }`}
                      onClick={() => setSortKey(option.key)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* News List */}
            <section className="space-y-8">
              <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search headlines, companies, or sources..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl py-4 pl-12 pr-4 text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="text-sm text-gray-400">
                  Showing <span className="text-white font-semibold">{filteredItems.length}</span> article(s)
                </div>
              </div>

              {filteredItems.length === 0 ? (
                <div className="bg-gray-800 border border-gray-700 rounded-2xl p-12 text-center text-gray-400">
                  <p className="text-lg font-medium text-white mb-2">No matching headlines just yet.</p>
                  <p>Try adjusting your filters or search query to see more financial insights.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-8">
                  {filteredItems.map((item) => {
                    const published = new Date(item.publishedAt);
                    return (
                      <article
                        key={item.id}
                        className="bg-gray-800 border border-gray-700 hover:border-orange-400/70 transition-colors rounded-2xl p-0 flex flex-col md:flex-row overflow-hidden"
                      >
                        {item.imageUrl && (
                          <div className="w-full md:w-1/4 h-56 md:h-auto relative">
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="p-8 flex flex-col gap-5 flex-1">
                          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                            <span className="px-3 py-1 rounded-full text-xs bg-orange-500/10 text-orange-300 border border-orange-500/30">
                              {item.category}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs bg-gray-700/60 text-gray-200 border border-gray-600">
                              {item.importance} Impact
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-xs border ${item.sentiment === 'Positive'
                                ? 'bg-green-500/10 text-green-300 border-green-500/40'
                                : item.sentiment === 'Negative'
                                  ? 'bg-red-500/10 text-red-300 border-red-500/40'
                                  : 'bg-gray-700/60 text-gray-200 border-gray-600'
                                }`}
                            >
                              {item.sentiment}
                            </span>
                            <time dateTime={item.publishedAt} className="text-xs text-gray-500 ml-auto">
                              {published.toLocaleString(undefined, {
                                month: 'short',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: '2-digit',
                              })}
                            </time>
                          </div>

                          <div>
                            <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">{item.summary}</p>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 mt-auto">
                            {item.relatedTickers && item.relatedTickers.length > 0 && (
                              <div className="flex items-center gap-2 text-sm">
                                <Tag className="w-4 h-4 text-orange-400" />
                                <div className="flex flex-wrap gap-2">
                                  {item.relatedTickers.map(ticker => (
                                    <span
                                      key={ticker}
                                      className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-200 cursor-pointer hover:bg-orange-500/20"
                                      onClick={() => setSelectedTicker(ticker)}
                                    >
                                      {ticker}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center justify-between text-sm text-gray-400">
                            <div className="font-medium text-gray-200">{item.source}</div>
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 text-sm font-semibold"
                            >
                              Read Full Story
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          </section>
        )}
      </main>
    </div>
  );
};

export default FinancialNewsPage;
