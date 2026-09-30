import React from 'react';
import { Container } from '../components/Container';
import { SectionLabel } from '../components/SectionLabel';
import { FEATURES_CONTENT } from '../data/content';

export const ProductFeatures: React.FC = () => {
  return (
    <section id="capabilities" className="py-20 md:py-28 bg-canvas-base border-b border-hairline-light">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <SectionLabel label="SYSTEM CAPABILITIES" variant="olive" dot={true} className="mb-4" />
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-ink-primary mb-4">
            Engineered for high-concurrency data pipelines.
          </h2>
          <p className="font-sans text-base sm:text-lg text-ink-secondary leading-relaxed">
            Every component of Japolic is designed to strip latency out of shared file systems while using commodity object storage as the durable source of truth.
          </p>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES_CONTENT.map((feature, idx) => (
            <div
              key={feature.id}
              className="flex flex-col justify-between p-6 sm:p-7 bg-canvas-elevated border border-hairline-light hover:border-hairline-strong rounded-sm shadow-subtle transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-canvas-subtle">
                  <span className="font-mono text-[11px] font-medium tracking-wider text-olive uppercase">
                    {feature.tag}
                  </span>
                  <span className="font-mono text-xs text-ink-tertiary">
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="font-sans text-base font-semibold text-ink-primary mb-2.5">
                  {feature.title}
                </h3>
                <p className="font-sans text-sm text-ink-secondary leading-relaxed">
                  {feature.body}
                </p>
              </div>

              {/* Bottom Spec Line */}
              <div className="mt-6 pt-4 border-t border-canvas-subtle font-mono text-xs text-ink-tertiary flex items-center gap-1.5">
                <span className="text-olive">▸</span>
                <span>{feature.spec}</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
