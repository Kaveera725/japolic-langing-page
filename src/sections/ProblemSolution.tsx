import React from 'react';
import { Container } from '../components/Container';
import { SectionLabel } from '../components/SectionLabel';
import { PROBLEM_SOLUTION_CONTENT } from '../data/content';
import { ArrowRight } from 'lucide-react';

export const ProblemSolution: React.FC = () => {
  return (
    <section id="problem-solution" className="py-20 md:py-28 bg-canvas-base border-b border-hairline-light">
      <Container>
        {/* Header Block */}
        <div className="max-w-3xl mb-14">
          <SectionLabel
            label={PROBLEM_SOLUTION_CONTENT.kicker}
            variant="olive"
            dot={true}
            className="mb-4"
          />
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-ink-primary mb-4">
            {PROBLEM_SOLUTION_CONTENT.heading}
          </h2>
          <p className="font-sans text-base sm:text-lg text-ink-secondary leading-relaxed">
            {PROBLEM_SOLUTION_CONTENT.subheading}
          </p>
        </div>

        {/* 50/50 Comparative Grid */}
        <div className="border border-hairline-strong rounded-sm bg-canvas-elevated overflow-hidden shadow-subtle">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-hairline-light text-xs font-mono tracking-wider uppercase bg-canvas-subtle px-6 py-3 text-ink-tertiary">
            <div>Conventional Storage Trade-off</div>
            <div className="hidden md:block pl-6">Japolic Unified Architecture</div>
          </div>

          <div className="divide-y divide-hairline-light">
            {PROBLEM_SOLUTION_CONTENT.comparisons.map((item) => (
              <div
                key={item.dimension}
                className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-hairline-light p-6 lg:p-8"
              >
                {/* Problem side */}
                <div className="md:pr-8 pb-6 md:pb-0">
                  <div className="flex items-center gap-2 mb-2 font-mono text-xs text-rust">
                    <span>[CONVENTIONAL]</span>
                    <span className="text-ink-tertiary">•</span>
                    <span className="text-ink-secondary uppercase">{item.dimension}</span>
                  </div>
                  <h3 className="font-sans text-base font-semibold text-ink-primary mb-2">
                    {item.problemTitle}
                  </h3>
                  <p className="font-sans text-sm text-ink-secondary leading-relaxed">
                    {item.problemDesc}
                  </p>
                </div>

                {/* Solution side */}
                <div className="md:pl-8 pt-6 md:pt-0 bg-olive-wash/20">
                  <div className="flex items-center gap-2 mb-2 font-mono text-xs text-olive font-medium">
                    <span>[JAPOLIC]</span>
                    <span className="text-ink-tertiary">•</span>
                    <span className="text-ink-secondary uppercase">{item.dimension}</span>
                  </div>
                  <h3 className="font-sans text-base font-semibold text-ink-primary mb-2">
                    {item.solutionTitle}
                  </h3>
                  <p className="font-sans text-sm text-ink-secondary leading-relaxed">
                    {item.solutionDesc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Footnote / Architecture Link */}
        <div className="mt-8 flex items-center justify-between text-xs font-mono text-ink-tertiary">
          <span>SPEC: CONFLICT-FREE REPLICATION // ZERO-STAGING PIPELINES</span>
          <a
            href="#capabilities"
            className="inline-flex items-center gap-1.5 text-olive hover:text-olive-light transition-colors font-medium"
          >
            Explore Storage Engine Capabilities <ArrowRight size={12} />
          </a>
        </div>
      </Container>
    </section>
  );
};
