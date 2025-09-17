import React from 'react';

const SkipToContent: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-orange-400 text-black px-4 py-2 rounded-md font-semibold"
    >
      Skip to main content
    </a>
  );
};

export default SkipToContent;
