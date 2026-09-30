import React, { useState } from 'react';
import { Container } from '../components/Container';
import { Button } from '../components/Button';
import { SectionLabel } from '../components/SectionLabel';
import { TechnicalDiagram } from '../components/TechnicalDiagram';
import { HERO_CONTENT } from '../data/content';
import { ArrowRight, Copy, Check } from 'lucide-react';

export const Hero: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(HERO_CONTENT.mountCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden bg-canvas-dark text-ink-inverse pt-16 pb-20 md:pt-24 md:pb-28 border-b border-hairline-dark">
      <Container>
        <div className="flex flex-col items-start max-w-4xl">
          {/* Category Kicker */}
          <SectionLabel
            label={HERO_CONTENT.kicker}
            variant="dark"
            dot={true}
            className="mb-6"
          />

          {/* Headline */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-medium leading-[1.12] tracking-tight text-ink-inverse mb-6">
            {HERO_CONTENT.heading}
          </h1>

          {/* Subheading */}
          <p className="font-sans text-base sm:text-lg text-ink-inverse-sub leading-relaxed max-w-3xl mb-8">
            {HERO_CONTENT.subheading}
          </p>

          {/* Interaction Cluster */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <Button
              variant="primary"
              size="lg"
              href="#access"
              icon={<ArrowRight size={16} />}
            >
              {HERO_CONTENT.primaryCta}
            </Button>
            <Button
              variant="inverse"
              size="lg"
              href="#docs"
            >
              {HERO_CONTENT.secondaryCta}
            </Button>
          </div>

          {/* Quick Mount CLI Snippet */}
          <div className="w-full max-w-xl mb-12">
            <div className="flex items-center justify-between px-3 py-2 bg-canvas-dark-subtle/80 border border-hairline-dark rounded-sm font-mono text-xs text-ink-inverse-sub">
              <div className="flex items-center gap-2 overflow-x-auto py-0.5">
                <span className="text-olive-light select-none">$</span>
                <span className="text-ink-inverse font-mono">{HERO_CONTENT.mountCommand}</span>
              </div>
              <button
                onClick={handleCopy}
                className="ml-3 shrink-0 p-1.5 hover:text-white transition-colors"
                title="Copy mount command"
                aria-label="Copy mount command"
              >
                {copied ? <Check size={14} className="text-olive-light" /> : <Copy size={14} />}
              </button>
            </div>
          </div>
        </div>

        {/* Technical Architecture Schematic */}
        <div className="mt-4">
          <TechnicalDiagram />
        </div>
      </Container>
    </section>
  );
};
