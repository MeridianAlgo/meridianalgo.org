import React from 'react';
import { Outlet } from 'react-router-dom';

const LearningLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* No navbar - clean learning environment */}
      <main className="relative z-10">
        <Outlet />
      </main>
    </div>
  );
};

export default LearningLayout;
