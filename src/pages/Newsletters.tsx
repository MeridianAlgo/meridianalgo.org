import { useState, useEffect } from 'react';
import { FileText, Download, Calendar, Eye, X, FolderOpen, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

interface Newsletter {
  id: string;
  title: string;
  description: string;
  fileName: string;
  fileUrl: string;
  uploadDate: string;
  category?: string;
  week?: number;
  thumbnail?: string;
}

const ITEMS_PER_PAGE = 9;

function useScrollFadeIn() {
  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in-up, .fade-in-up-delayed');
    const onScroll = () => {
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 40) {
          el.classList.add('animate');
        }
      });
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}

const Newsletters = () => {
  useScrollFadeIn();
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [selectedPdf, setSelectedPdf] = useState<Newsletter | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    document.title = 'MeridianAlgo - Newsletters';
  }, []);

  useEffect(() => {
    const loadNewsletters = async () => {
      try {
        const response = await fetch('/newsletters/manifest.json');
        if (response.ok) {
          const manifestData = await response.json();
          const newsletterList: Newsletter[] = manifestData.newsletters.map((item: any) => ({
            ...item,
            fileUrl: `/newsletters/${item.fileName}`,
            id: item.fileName.replace(/\.pdf$/i, '').replace(/[^a-zA-Z0-9]/g, '-')
          }));
          newsletterList.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
          setNewsletters(newsletterList);
        } else {
          setNewsletters([]);
        }
      } catch (error) {
        console.log('No newsletters found');
        setNewsletters([]);
      } finally {
        setLoading(false);
      }
    };

    loadNewsletters();
  }, []);

  const openPdfViewer = (newsletter: Newsletter) => {
    setSelectedPdf(newsletter);
  };

  const closePdfViewer = () => {
    setSelectedPdf(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setStartDate('');
    setEndDate('');
    setCurrentPage(1);
  };

  // Get unique categories
  const categories = Array.from(new Set(newsletters.map(n => n.category).filter(Boolean))) as string[];

  // Filter newsletters
  const filteredNewsletters = newsletters.filter((newsletter) => {
    // Search filter
    const matchesSearch = searchQuery === '' ||
      newsletter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      newsletter.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filter
    const matchesCategory = selectedCategories.length === 0 ||
      (newsletter.category && selectedCategories.includes(newsletter.category));

    // Date filter
    const ts = new Date(newsletter.uploadDate).getTime();
    const afterStart = startDate ? ts >= new Date(startDate + 'T00:00:00').getTime() : true;
    const beforeEnd = endDate ? ts <= new Date(endDate + 'T23:59:59').getTime() : true;

    return matchesSearch && matchesCategory && afterStart && beforeEnd;
  });

  // Pagination
  const totalPages = Math.ceil(filteredNewsletters.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedNewsletters = filteredNewsletters.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="relative min-h-screen w-full bg-black overflow-x-hidden overflow-y-auto">
      {/* Background Pattern - extends to top */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 [background-image:radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>

      {/* Hero Section */}
      <section className="pt-44 pb-16 relative overflow-hidden">

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-2xl mb-6">
              <FileText className="w-10 h-10 text-orange-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Newsletters</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              Stay informed with our latest insights, market analysis, and financial literacy strategies. Access our comprehensive collection of newsletters and educational publications.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 fade-in-up bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-2xl mx-auto">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search newsletters by title or topic (e.g., 'dividends', 'ratios', 'portfolio')..."
                className="w-full bg-slate-900/60 backdrop-blur-md border border-orange-400/30 rounded-2xl pl-12 pr-4 py-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600 text-lg"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="mb-6">
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <span className="text-slate-400 font-medium flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter by:
              </span>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${selectedCategories.includes(category)
                      ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg'
                      : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/60 border border-slate-700'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Date Filters */}
          <div className="bg-slate-900/40 backdrop-blur-md border border-orange-400/20 rounded-2xl p-6 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:space-x-4 space-y-4 md:space-y-0">
              <div className="flex-1">
                <label htmlFor="start-date" className="block text-sm text-slate-300 mb-2 font-inter font-medium">
                  Start date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full bg-black/40 border border-slate-700 rounded-lg pl-10 pr-3 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label htmlFor="end-date" className="block text-sm text-slate-300 mb-2 font-inter font-medium">
                  End date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="end-date"
                    type="date"
                    value={endDate}
                    onChange={(e) => {
                      setEndDate(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full bg-black/40 border border-slate-700 rounded-lg pl-10 pr-3 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                  />
                </div>
              </div>
              <div className="md:w-auto">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center justify-center w-full md:w-auto bg-white text-gray-900 hover:bg-orange-600 hover:text-white border border-gray-200 px-6 py-3 rounded-lg transition-all duration-300 font-inter font-medium"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          {(searchQuery || selectedCategories.length > 0 || startDate || endDate) && (
            <div className="text-center mt-6 text-slate-400">
              Showing {filteredNewsletters.length} of {newsletters.length} newsletters
            </div>
          )}
        </div>
      </section>

      {/* Newsletters Grid */}
      <section className="py-16 fade-in-up bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-slate-400 text-lg font-inter">Loading newsletters...</p>
            </div>
          ) : filteredNewsletters.length === 0 ? (
            <div className="text-center py-16">
              <FolderOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-400 text-lg font-inter mb-2">No newsletters found matching your filters.</p>
              <button
                onClick={clearFilters}
                className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-all duration-300 font-inter font-medium mt-4"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedNewsletters.map((newsletter) => {
                  const isPdf = newsletter.fileName.toLowerCase().endsWith('.pdf');
                  return (
                    <div
                      key={newsletter.id}
                      className="group bg-slate-900/60 backdrop-blur-md rounded-2xl overflow-hidden border border-orange-400/20 hover:border-orange-400/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20 flex flex-col"
                    >
                      {/* Thumbnail */}
                      <div className="relative h-48 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 flex items-center justify-center overflow-hidden">
                        {newsletter.thumbnail ? (
                          <img
                            src={newsletter.thumbnail}
                            alt={newsletter.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        ) : (
                          <FileText className="w-20 h-20 text-orange-400/40" />
                        )}
                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-orange-400 border border-orange-400/30">
                          {newsletter.category || 'Newsletter'}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-white font-semibold text-xl mb-3 font-inter line-clamp-2 group-hover:text-orange-400 transition-colors">
                          {newsletter.title}
                        </h3>

                        <p className="text-slate-300 text-sm mb-4 font-inter font-light line-clamp-3 flex-grow">
                          {newsletter.description}
                        </p>

                        <div className="flex items-center text-slate-400 text-sm mb-4 font-inter">
                          <Calendar className="w-4 h-4 mr-2" />
                          {formatDate(newsletter.uploadDate)}
                        </div>

                        {/* CTAs */}
                        <div className="flex gap-3 mt-auto">
                          {isPdf ? (
                            <button
                              onClick={() => openPdfViewer(newsletter)}
                              className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 font-inter font-semibold shadow-lg hover:shadow-orange-500/50"
                            >
                              <Eye className="w-5 h-5" />
                              <span>Read Now</span>
                            </button>
                          ) : (
                            <a
                              href={newsletter.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 font-inter font-semibold"
                            >
                              <Eye className="w-5 h-5" />
                              <span>Open</span>
                            </a>
                          )}
                          <a
                            href={newsletter.fileUrl}
                            download={newsletter.fileName}
                            className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 font-inter font-semibold"
                          >
                            <Download className="w-5 h-5" />
                            <span>Download</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${currentPage === page
                          ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* PDF Viewer Modal */}
      {selectedPdf && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl w-full max-w-6xl h-full max-h-[90vh] flex flex-col border border-orange-400/30">
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h3 className="text-xl font-semibold text-white font-inter">
                {selectedPdf.title}
              </h3>
              <button
                onClick={closePdfViewer}
                className="text-slate-400 hover:text-white transition-colors duration-300 p-2 hover:bg-slate-800 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 p-6 overflow-hidden">
              <iframe
                src={selectedPdf.fileUrl}
                className="w-full h-full rounded-lg border border-slate-700"
                title={selectedPdf.title}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Newsletters;
