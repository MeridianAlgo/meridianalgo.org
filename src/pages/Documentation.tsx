import React from 'react';

const PROJECTS = [
  {
    name: 'In-NodeJS',
    url: 'https://github.com/MeridianAlgo/In-NodeJS',
    description: 'Advanced Node.js-based trading tools for algorithmic research, leveraging Alpaca’s paper trading API for stocks and crypto.'
  },
  {
    name: 'In-Pine',
    url: 'https://github.com/MeridianAlgo/In-Pine',
    description: 'Innovative, machine-learning-driven trading tools built in Pine Script for TradingView, with adaptive open-source indicators.'
  },
  {
    name: 'Utils',
    url: 'https://github.com/MeridianAlgo/Utils',
    description: 'A collection of utility scripts and tools developed by MeridianAlgo for research and automation.'
  }
];

const Documentation: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1e293b] via-[#23243a] to-[#181a23] pt-24 px-4">
      <div className="text-center p-12 rounded-3xl shadow-2xl bg-black/40 border border-blue-900/40 backdrop-blur-md mb-12">
        <h1 className="text-5xl md:text-7xl font-extrabold text-blue-300 mb-6 font-inter drop-shadow-xl" style={{ textShadow: '0 4px 32px rgba(0,0,0,0.7)' }}>
          Documentation
        </h1>
        <p className="text-2xl md:text-3xl text-blue-200 font-light font-inter mb-2" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.5)' }}>
          is coming soon.
        </p>
      </div>
      <div className="w-full max-w-2xl mx-auto mt-2">
        <h2 className="text-2xl font-bold text-blue-200 mb-6 font-inter tracking-wide text-center">Our Developments</h2>
        <ul className="space-y-6">
          {PROJECTS.map((project) => (
            <li key={project.name} className="bg-gradient-to-r from-blue-900/60 to-blue-800/40 rounded-xl p-6 shadow-lg border border-blue-800/40 hover:shadow-2xl transition-all duration-300">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl font-semibold text-blue-300 hover:text-blue-100 underline underline-offset-4 transition-colors duration-200"
              >
                {project.name}
              </a>
              <p className="text-blue-100 mt-2 text-base font-inter font-light">
                {project.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Documentation;