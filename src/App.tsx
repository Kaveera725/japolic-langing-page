import React from 'react';
import { Navbar } from './sections/Navbar';
import { Hero } from './sections/Hero';
import { ProblemSolution } from './sections/ProblemSolution';
import { ProductFeatures } from './sections/ProductFeatures';
import { UseCases } from './sections/UseCases';
import { Footer } from './sections/Footer';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-canvas-base text-ink-primary font-sans overflow-x-hidden">
      {/* Accessible Skip to Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-olive focus:text-white focus:rounded-xs focus:ring-2 focus:ring-olive-light focus:outline-none font-mono text-xs font-semibold shadow-terminal"
      >
        Skip to main content
      </a>

      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-grow overflow-x-hidden focus:outline-none">
        <Hero />
        <ProblemSolution />
        <ProductFeatures />
        <UseCases />
      </main>
      <Footer />
    </div>
  );
};

export default App;
