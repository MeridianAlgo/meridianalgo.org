import React, { useState, useEffect } from 'react';
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

  // Load newsletters from the newsletters folder
  useEffect(() => {
    const loadNewsletters = async () => {
      try {
        // Try to fetch a manifest file that lists all available newsletters
        const response = await fetch('/newsletters/manifest.json');
        if (response.ok) {
          const manifestData = await response.json();
          const newsletterList = manifestData.newsletters.map((item: any) => ({
            ...item,
            fileUrl: `/newsletters/${item.fileName}`,
            id: item.fileName.replace(/\.pdf$/i, '').replace(/[^a-zA-Z0-9]/g, '-')
          }));
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
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#21273b] via-[#23243a] via-60% to-black pt-24">
      {/* Starry Background */}
      <div className="stars" />
      <div className="stars2" />
      <div className="stars3" />
      
      {/* Mountain Background */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10" style={{ backgroundImage: 'url("/mountain.jpg")' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e293b]/60 via-[#23243a]/40 to-[#181a23]/80"></div>
      </div>

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
          
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-slate-400 text-lg font-inter">Loading newsletters...</p>
            </div>
          ) : newsletters.length === 0 ? (
            <div className="text-center py-16">
              <FolderOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-400 text-lg font-inter mb-2">No newsletters found.</p>
              <p className="text-slate-500 font-inter font-light">
                Add PDF files to the <code className="bg-slate-800 px-2 py-1 rounded text-blue-400">/public/newsletters/</code> folder to display them here.
              </p>
              <div className="mt-6 text-left max-w-2xl mx-auto bg-slate-900/40 rounded-xl p-6 border border-blue-400/20">
                <h3 className="text-white font-semibold mb-3 font-inter">How to add newsletters:</h3>
                <ol className="text-slate-300 space-y-2 font-inter font-light">
                  <li>1. Place your PDF files in the <code className="bg-slate-800 px-1 rounded text-blue-400">/public/newsletters/</code> folder</li>
                  <li>2. Optionally, create a <code className="bg-slate-800 px-1 rounded text-blue-400">manifest.json</code> file to add titles and descriptions</li>
                  <li>3. Refresh the page to see your newsletters</li>
                </ol>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsletters.map((newsletter) => (
                <div key={newsletter.id} className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-6 border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="flex items-start justify-between mb-4">
                    <FileText className="w-8 h-8 text-blue-400 flex-shrink-0" />
                  </div>
                  
                  <h3 className="text-white font-semibold text-lg mb-2 font-inter line-clamp-2">
                    {newsletter.title}
                  </h3>
                  
                  {newsletter.description && (
                    <p className="text-slate-300 text-sm mb-4 font-inter font-light line-clamp-3">
                      {newsletter.description}
                    </p>
                  )}
                  
                  <div className="flex items-center text-slate-400 text-sm mb-4 font-inter">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(newsletter.uploadDate)}
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={() => openPdfViewer(newsletter)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 font-inter"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                    <a
                      href={newsletter.fileUrl}
                      download={newsletter.fileName}
                      className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 font-inter"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
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