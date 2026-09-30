import React from 'react';
import { Container } from '../components/Container';
import { SectionLabel } from '../components/SectionLabel';
import { USE_CASES_CONTENT } from '../data/content';
import { CheckCircle2 } from 'lucide-react';

export const UseCases: React.FC = () => {
  return (
    <section id="workloads" className="py-20 md:py-28 bg-canvas-subtle/50 border-b border-hairline-light">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <SectionLabel label="PRODUCTION WORKLOADS" variant="olive" dot={true} className="mb-4" />
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-ink-primary mb-4">
            Purpose-built for data-constrained systems.
          </h2>
          <p className="font-sans text-base sm:text-lg text-ink-secondary leading-relaxed">
            See how infrastructure teams deploy Japolic to eliminate data transfer overhead and optimize compute utilization across distributed nodes.
          </p>
        </div>

        {/* Workload Modules */}
        <div className="space-y-12">
          {USE_CASES_CONTENT.map((item, idx) => (
            <div
              key={item.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start p-6 sm:p-8 bg-canvas-elevated border border-hairline-light rounded-sm shadow-subtle"
            >
              {/* Left Column: Description & Value */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-xs text-olive uppercase tracking-wider font-medium">
                    {item.tag}
                  </span>
                  <span className="text-hairline-strong">•</span>
                  <span className="font-mono text-xs text-ink-tertiary">MODULE 0{idx + 1}</span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-medium text-ink-primary mb-4">
                  {item.title}
                </h3>

                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed mb-6">
                  {item.body}
                </p>

                <div className="pt-4 border-t border-canvas-subtle">
                  <div className="text-xs font-mono uppercase text-ink-tertiary mb-2">Systems Impact</div>
                  <p className="font-sans text-sm text-ink-secondary">
                    {item.impact}
                  </p>
                </div>
              </div>

              {/* Right Column: Code Snippet or System Verification */}
              <div className="lg:col-span-5 w-full">
                {item.snippet ? (
                  <div className="rounded-sm bg-canvas-dark border border-hairline-dark overflow-hidden text-ink-inverse text-xs font-mono shadow-subtle">
                    <div className="px-3.5 py-2 border-b border-hairline-dark bg-canvas-dark-card flex items-center justify-between text-[11px] text-ink-inverse-mute">
                      <span>storage-spec.yaml</span>
                      <span>POSIX VFS</span>
                    </div>
                    <pre className="p-4 overflow-x-auto text-[12px] leading-relaxed text-ink-inverse-sub">
                      <code>{item.snippet}</code>
                    </pre>
                  </div>
                ) : (
                  <div className="p-6 rounded-sm bg-canvas-subtle border border-hairline-light flex flex-col justify-center h-full">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-olive shrink-0 mt-0.5" />
                      <div>
                        <div className="font-sans text-sm font-semibold text-ink-primary mb-1">
                          Architectural Invariant
                        </div>
                        <div className="font-sans text-xs text-ink-secondary leading-relaxed">
                          {item.highlight}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
