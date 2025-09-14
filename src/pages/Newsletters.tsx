import { useState, useEffect } from 'react';
import { FileText, Download, Calendar, Eye, X, FolderOpen } from 'lucide-react';

interface Newsletter {
  id: string;
  title: string;
  description: string;
  fileName: string;
  fileUrl: string;
  uploadDate: string;
}

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
  // Date filter state (YYYY-MM-DD strings)
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  useEffect(() => {
    document.title = 'MeridianAlgo - Newsletters';
  }, []);

  // Load newsletters from the newsletters folder
  useEffect(() => {
    const loadNewsletters = async () => {
      try {
        // Try to fetch a manifest file that lists all available newsletters
        const response = await fetch('/newsletters/manifest.json');
        if (response.ok) {
          const manifestData = await response.json();
          const newsletterList: Newsletter[] = manifestData.newsletters.map((item: any) => ({
            ...item,
            fileUrl: `/newsletters/${item.fileName}`,
            id: item.fileName.replace(/\.pdf$/i, '').replace(/[^a-zA-Z0-9]/g, '-')
          }));
          // Sort newest first by uploadDate
          newsletterList.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
          setNewsletters(newsletterList);
        } else {
          // If no manifest, try to load some default newsletters
          const defaultNewsletters = [
            {
              id: 'sample-1',
              title: 'Market Analysis Q1 2025',
              description: 'Comprehensive analysis of market trends and algorithmic trading opportunities for the first quarter.',
              fileName: 'market-analysis-q1-2025.pdf',
              fileUrl: '/newsletters/market-analysis-q1-2025.pdf',
              uploadDate: '2025-01-15'
            },
            {
              id: 'sample-2',
              title: 'Trading Strategies Guide',
              description: 'Essential guide to implementing automated trading strategies using MeridianAlgo tools.',
              fileName: 'trading-strategies-guide.pdf',
              fileUrl: '/newsletters/trading-strategies-guide.pdf',
              uploadDate: '2025-01-10'
            }
          ];
          
          // Check if files actually exist before adding them
          const existingNewsletters = [];
          for (const newsletter of defaultNewsletters) {
            try {
              const fileResponse = await fetch(newsletter.fileUrl, { method: 'HEAD' });
              if (fileResponse.ok) {
                existingNewsletters.push(newsletter);
              }
            } catch (error) {
              // File doesn't exist, skip it
            }
          }
          setNewsletters(existingNewsletters);
        }
      } catch (error) {
        console.log('No newsletters found in /newsletters folder');
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

  return (
    <div className="relative min-h-screen w-full bg-black pt-24 overflow-x-hidden overflow-y-auto">

      {/* Hero Section */}
      <section className="py-24 fade-in-up bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 font-inter">
              Newsletters
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 max-w-4xl mx-auto leading-relaxed font-inter font-light">
              Stay informed with our latest insights, market analysis, and algorithmic trading strategies. 
              Access our comprehensive collection of newsletters and research publications.
            </p>
          </div>
        </div>
      </section>

      {/* Newsletters List */}
      <section className="py-16 fade-in-up bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center font-inter">
            Available Newsletters
          </h2>
          {/* Filters */}
          <div className="mb-8 bg-slate-900/40 backdrop-blur-md border border-orange-400/20 rounded-2xl p-4 sm:p-6">
            <div className="flex flex-col md:flex-row md:items-end md:space-x-4 space-y-4 md:space-y-0">
              <div className="flex-1">
                <label htmlFor="start-date" className="block text-sm text-slate-300 mb-2 font-inter">Start date</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-black/40 border border-slate-700 rounded-lg pl-10 pr-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label htmlFor="end-date" className="block text-sm text-slate-300 mb-2 font-inter">End date</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="end-date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-black/40 border border-slate-700 rounded-lg pl-10 pr-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                  />
                </div>
              </div>
              <div className="md:w-auto">
                <button
                  type="button"
                  onClick={() => { setStartDate(''); setEndDate(''); }}
                  className="inline-flex items-center justify-center w-full md:w-auto bg-white text-gray-900 hover:bg-orange-600 hover:text-white border border-gray-200 px-4 py-2 rounded-lg transition-all duration-300 font-inter"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear filters
                </button>
              </div>
            </div>
          </div>

          {/* Compute filtered list by date */}
          {(() => {
            const filtered = newsletters.filter((n) => {
              const ts = new Date(n.uploadDate).getTime();
              const afterStart = startDate ? ts >= new Date(startDate + 'T00:00:00').getTime() : true;
              const beforeEnd = endDate ? ts <= new Date(endDate + 'T23:59:59').getTime() : true;
              return afterStart && beforeEnd;
            });

            if (loading) {
              return (
                <div className="text-center py-16">
                  <div className="animate-spin w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-slate-400 text-lg font-inter">Loading newsletters...</p>
                </div>
              );
            }

            if (!loading && newsletters.length === 0) {
              return (
                <div className="text-center py-16">
                  <FolderOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-400 text-lg font-inter mb-2">No newsletters found.</p>
                  <p className="text-slate-500 font-inter font-light">
                    Add PDF files to the <code className="bg-slate-800 px-2 py-1 rounded text-orange-400">/public/newsletters/</code> folder to display them here.
                  </p>
                  <div className="mt-6 text-left max-w-2xl mx-auto bg-slate-900/40 rounded-xl p-6 border border-orange-400/20">
                    <h3 className="text-white font-semibold mb-3 font-inter">How to add newsletters:</h3>
                    <ol className="text-slate-300 space-y-2 font-inter font-light">
                      <li>1. Place your PDF files in the <code className="bg-slate-800 px-1 rounded text-orange-400">/public/newsletters/</code> folder</li>
                      <li>2. Optionally, create a <code className="bg-slate-800 px-1 rounded text-orange-400">manifest.json</code> file to add titles and descriptions</li>
                      <li>3. Refresh the page to see your newsletters</li>
                    </ol>
                  </div>
                </div>
              );
            }

            if (filtered.length === 0) {
              return (
                <div className="text-center py-16">
                  <FolderOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-400 text-lg font-inter mb-2">No newsletters match your date filters.</p>
                  <button
                    type="button"
                    onClick={() => { setStartDate(''); setEndDate(''); }}
                    className="inline-flex items-center justify-center bg-white text-gray-900 hover:bg-orange-600 hover:text-white border border-gray-200 px-4 py-2 rounded-lg transition-all duration-300 font-inter"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Clear filters
                  </button>
                </div>
              );
            }

            return (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((newsletter) => {
                  const isPdf = newsletter.fileName.toLowerCase().endsWith('.pdf');
                  return (
                  <div key={newsletter.id} className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-6 border border-orange-400/20 hover:border-orange-400/40 transition-all duration-300 hover:transform hover:scale-105 flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <FileText className="w-8 h-8 text-orange-400 flex-shrink-0" />
                    </div>
                    
                    <h3 className="text-white font-semibold text-lg mb-2 font-inter line-clamp-2 min-h-[3.5rem]">
                      {newsletter.title}
                    </h3>
                    
                    <div className="flex-grow">
                      {newsletter.description && (
                        <p className="text-slate-300 text-sm mb-4 font-inter font-light line-clamp-3 min-h-[4.5rem]">
                          {newsletter.description}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center text-slate-400 text-sm mb-4 font-inter">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(newsletter.uploadDate)}
                    </div>
                    
                    <div className="flex space-x-3 mt-auto">
                      {isPdf ? (
                        <button
                          onClick={() => openPdfViewer(newsletter)}
                          className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 font-inter h-12"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </button>
                      ) : (
                        <a
                          href={newsletter.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-white text-gray-900 hover:bg-orange-600 hover:text-white border border-gray-200 px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 font-inter h-12"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Open</span>
                        </a>
                      )}
                      <a
                        href={newsletter.fileUrl}
                        download={newsletter.fileName}
                        className="flex-1 bg-white text-gray-900 hover:bg-orange-600 hover:text-white border border-gray-200 px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 font-inter h-12"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </a>
                    </div>
                  </div>
                );})}
              </div>
            );
          })()}
        </div>
      </section>

      {/* PDF Viewer Modal */}
      {selectedPdf && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-6xl h-full max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800 font-inter">
                {selectedPdf.title}
              </h3>
              <button
                onClick={closePdfViewer}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 p-6">
              <iframe
                src={selectedPdf.fileUrl}
                className="w-full h-full rounded-lg border"
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