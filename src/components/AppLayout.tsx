import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTopButton from './ScrollToTopButton';

interface AppLayoutProps {
  authenticated?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ authenticated = false }) => {
  return (
    <div className={`min-h-screen ${authenticated ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900' : 'bg-black'}`}>
      {/* Authenticated users get a different background pattern */}
      {authenticated && (
        <div className="fixed inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), 
                             radial-gradient(circle at 80% 20%, rgba(255, 119, 48, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.2) 0%, transparent 50%)`
          }}></div>
        </div>
      )}
      
      <Navbar />
      <main className="relative z-10">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default AppLayout;
