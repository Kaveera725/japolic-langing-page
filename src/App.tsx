import React from 'react';
import { Navbar } from './sections/Navbar';
import { Hero } from './sections/Hero';
import { ProblemSolution } from './sections/ProblemSolution';
import { ProductFeatures } from './sections/ProductFeatures';
import { UseCases } from './sections/UseCases';
import { Footer } from './sections/Footer';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-canvas-base text-ink-primary font-sans">
      <Navbar />
      <main className="flex-grow">
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
