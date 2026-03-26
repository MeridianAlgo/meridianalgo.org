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

const Newsletters = () => {
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
          const newsletterList: Newsletter[] = manifestData.newsletters.map((item: { fileName: string; [key: string]: unknown }) => ({
            ...item,
            fileUrl: `/newsletters/${item.fileName}`,
            id: item.fileName.replace(/\.pdf$/i, '').replace(/[^a-zA-Z0-9]/g, '-')
          }));
          newsletterList.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
          setNewsletters(newsletterList);
        } else {
          setNewsletters([]);
        }
      } catch {
        setNewsletters([]);
      } finally {
        setLoading(false);
      }
    };

    loadNewsletters();
  }, []);

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

  const categories = Array.from(new Set(newsletters.map(n => n.category).filter(Boolean))) as string[];

  const filteredNewsletters = newsletters.filter((newsletter) => {
    const matchesSearch = searchQuery === '' ||
      newsletter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      newsletter.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategories.length === 0 ||
      (newsletter.category && selectedCategories.includes(newsletter.category));

    const ts = new Date(newsletter.uploadDate).getTime();
    const afterStart = startDate ? ts >= new Date(startDate + 'T00:00:00').getTime() : true;
    const beforeEnd = endDate ? ts <= new Date(endDate + 'T23:59:59').getTime() : true;

    return matchesSearch && matchesCategory && afterStart && beforeEnd;
  });

  const totalPages = Math.ceil(filteredNewsletters.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedNewsletters = filteredNewsletters.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="relative min-h-screen w-full bg-black text-white selection:bg-orange-500/20">

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <div className="animate-fade-in-up">
            <span className="text-[10px] uppercase tracking-[0.4em] text-orange-400/80 font-mono mb-8 inline-block bg-white/5 px-4 py-2 rounded-full border border-white/10">
              Weekly Publication
            </span>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            <h1 className="text-5xl md:text-8xl font-display font-bold mb-6 leading-none uppercase tracking-tight text-white mt-6">
              News<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">letters</span>
            </h1>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light mb-10">
              Stay informed with our latest insights, market analysis, and financial literacy strategies.
            </p>
          </div>
          <div className="animate-fade-in-up flex justify-center gap-12" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            {[
              { value: newsletters.length > 0 ? newsletters.length.toString() : '—', label: 'Issues' },
              { value: 'Weekly', label: 'Frequency' },
              { value: 'Free', label: 'Access' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-bold text-white">{value}</p>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1 font-mono">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Filter + Grid */}
      <section className="relative py-24 bg-black overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-orange-500/50" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Search */}
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                placeholder="Search newsletters by title or topic..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-orange-400/50 focus:ring-1 focus:ring-orange-400/30 transition-colors text-sm"
              />
            </div>
          </div>

          {/* Category Filters */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              <span className="text-gray-600 text-xs font-mono uppercase tracking-wider flex items-center gap-2 self-center">
                <Filter className="w-3.5 h-3.5" /> Filter
              </span>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors duration-200 ${
                    selectedCategories.includes(category)
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                      : 'bg-white/5 text-gray-400 border border-white/10 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {/* Date Filters */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 max-w-3xl mx-auto mb-10">
            <div className="flex flex-col md:flex-row md:items-end gap-4">
              <div className="flex-1">
                <label htmlFor="start-date" className="block text-xs text-gray-400 mb-2 font-mono uppercase tracking-wider">
                  Start date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={(e) => { setStartDate(e.target.value); setCurrentPage(1); }}
                    className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-3 py-3 text-gray-200 focus:outline-none focus:border-orange-400/50 text-sm"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label htmlFor="end-date" className="block text-xs text-gray-400 mb-2 font-mono uppercase tracking-wider">
                  End date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="end-date"
                    type="date"
                    value={endDate}
                    onChange={(e) => { setEndDate(e.target.value); setCurrentPage(1); }}
                    className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-3 py-3 text-gray-200 focus:outline-none focus:border-orange-400/50 text-sm"
                  />
                </div>
              </div>
              <div>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 hover:border-white/20 px-5 py-3 rounded-lg transition-colors duration-200 text-sm font-mono uppercase tracking-wider"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear
                </button>
              </div>
            </div>
          </div>

          {(searchQuery || selectedCategories.length > 0 || startDate || endDate) && (
            <p className="text-center text-gray-500 text-xs font-mono mb-8 uppercase tracking-wider">
              Showing {filteredNewsletters.length} of {newsletters.length} newsletters
            </p>
          )}

          {/* Grid */}
          {loading ? (
            <div className="text-center py-24">
              <div className="animate-spin w-10 h-10 border-2 border-orange-400 border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-gray-500 text-sm font-mono uppercase tracking-wider">Loading...</p>
            </div>
          ) : filteredNewsletters.length === 0 ? (
            <div className="text-center py-24">
              <FolderOpen className="w-14 h-14 text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500 text-sm mb-6">No newsletters match your filters.</p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-orange-500 hover:bg-white hover:text-black text-white rounded-xl text-sm font-bold transition-all duration-300 uppercase tracking-wider"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedNewsletters.map((newsletter) => {
                  const isPdf = newsletter.fileName.toLowerCase().endsWith('.pdf');
                  return (
                    <div
                      key={newsletter.id}
                      className="group bg-gray-900/20 border border-white/5 hover:border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col relative"
                    >
                      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Thumbnail */}
                      <div className="relative h-44 bg-gradient-to-br from-orange-500/10 to-amber-500/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {newsletter.thumbnail ? (
                          <img
                            src={newsletter.thumbnail}
                            alt={newsletter.title}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                        ) : (
                          <FileText className="w-16 h-16 text-orange-400/20" />
                        )}
                        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider text-orange-400 border border-orange-400/20">
                          {newsletter.category || 'Newsletter'}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-white font-bold text-base mb-2 line-clamp-2 group-hover:text-orange-400/90 transition-colors duration-200 uppercase tracking-tight">
                          {newsletter.title}
                        </h3>

                        <p className="text-gray-500 text-xs mb-4 line-clamp-3 flex-grow leading-relaxed font-light">
                          {newsletter.description}
                        </p>

                        <div className="flex items-center text-gray-600 text-xs mb-5 font-mono">
                          <Calendar className="w-3.5 h-3.5 mr-2" />
                          {formatDate(newsletter.uploadDate)}
                        </div>

                        <div className="flex gap-3 mt-auto">
                          {isPdf ? (
                            <button
                              onClick={() => setSelectedPdf(newsletter)}
                              className="flex-1 bg-orange-500 hover:bg-white hover:text-black text-white px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider"
                            >
                              <Eye className="w-4 h-4" />
                              Read Now
                            </button>
                          ) : (
                            <a
                              href={newsletter.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 bg-orange-500 hover:bg-white hover:text-black text-white px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider"
                            >
                              <Eye className="w-4 h-4" />
                              Open
                            </a>
                          )}
                          <a
                            href={newsletter.fileUrl}
                            download={newsletter.fileName}
                            className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 hover:border-white/20 px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider"
                          >
                            <Download className="w-4 h-4" />
                            Download
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
                    className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                        currentPage === page
                          ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                          : 'bg-white/5 text-gray-400 border border-white/10 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
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
          <div className="bg-gray-900 rounded-2xl w-full max-w-6xl h-full max-h-[90vh] flex flex-col border border-white/10">
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h3 className="text-white font-bold text-base uppercase tracking-tight">
                {selectedPdf.title}
              </h3>
              <button
                onClick={() => setSelectedPdf(null)}
                className="text-gray-500 hover:text-white transition-colors duration-200 p-2 hover:bg-white/5 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 p-6 overflow-hidden">
              <iframe
                src={selectedPdf.fileUrl}
                className="w-full h-full rounded-xl border border-white/5"
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
