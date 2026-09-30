import React, { useState } from 'react';
import { Container } from '../components/Container';
import { TechnicalDiagram } from '../components/TechnicalDiagram';
import { ScrollReveal } from '../components/ScrollReveal';
import { ArrowRight, BookOpen, Copy, Check } from 'lucide-react';

const HERO_TAGS = ['SHARED FILE SYSTEM', 'S3 COMPATIBLE', 'AI & ML WORKLOADS'] as const;

const MOUNT_COMMAND = 'japolic mount --target=s3://your-bucket /mnt/shared';

export const Hero: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(MOUNT_COMMAND);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      className="relative overflow-hidden bg-canvas-dark border-b border-hairline-dark"
      aria-labelledby="hero-heading"
    >
      {/* ── Subtle Engineering Grid Background ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: [
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          ].join(','),
          backgroundSize: '32px 32px',
        }}
      />

      {/* ── Radial warm glow at top-left ── */}
      <div
        className="absolute -top-32 -left-32 w-[600px] h-[600px] pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(63,87,68,0.08) 0%, transparent 65%)',
        }}
      />

      <Container className="relative z-10 pt-12 pb-16 md:pt-20 md:pb-24">
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            TEXT CONTENT
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}

        {/* Metadata Kicker Tags */}
        <div className="flex flex-wrap items-center gap-2.5 mb-6">
          {HERO_TAGS.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 px-2 py-[3px] rounded-xs border border-white/[0.08] bg-white/[0.03] font-mono text-[10px] sm:text-[11px] tracking-widest text-ink-inverse-mute"
            >
              <span className="h-[5px] w-[5px] rounded-full bg-olive" />
              {tag}
            </span>
          ))}
        </div>

        {/* Headline */}
        <h1
          id="hero-heading"
          className="font-display text-[2.2rem] sm:text-[3rem] md:text-[3.75rem] lg:text-[4.25rem] font-medium leading-[1.08] tracking-tight text-ink-inverse max-w-[840px] mb-5"
        >
          Shared storage.
          <br />
          <span className="text-olive-light">Local-disk performance.</span>
        </h1>

        {/* Supporting Copy */}
        <p className="font-sans text-[15px] sm:text-base md:text-lg text-ink-inverse-sub leading-[1.6] max-w-[640px] mb-8">
          Japolic is a shared file system for distributed compute. AI teams,
          platform engineers, and data-intensive applications get direct access
          to S3-backed storage — at speeds close to a local disk — without
          changing how their code reads files.
        </p>

        {/* Action Row: CTAs & Quick-Mount Snippet */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-7 mb-8 lg:mb-14">
          {/* Primary & Secondary CTA (full-width stacked on mobile for thumb reach) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <a
              href="#capabilities"
              className="group min-h-[46px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xs bg-olive text-white font-sans text-sm font-medium tracking-tight border border-[#2F4233] shadow-subtle hover:bg-olive-light hover:shadow-card active:bg-olive-dim transition-all duration-150 interactive-button focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive focus-visible:ring-offset-2 focus-visible:ring-offset-canvas-dark"
            >
              <span>See how it works</span>
              <ArrowRight size={15} strokeWidth={2} className="transition-transform duration-150 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#docs"
              className="group min-h-[46px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xs bg-white/[0.04] text-ink-inverse-sub font-sans text-sm border border-white/[0.12] hover:bg-white/[0.08] hover:text-ink-inverse hover:border-white/[0.25] transition-all duration-150 interactive-button focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-olive"
            >
              <BookOpen size={14} strokeWidth={1.8} className="transition-transform duration-150 group-hover:-translate-y-0.5" />
              <span>Read the docs</span>
            </a>
          </div>

          <div className="h-4 w-px bg-white/[0.1] hidden lg:block" />

          {/* CLI Quick-Mount Snippet */}
          <div className="max-w-md w-full">
            <div className="flex items-center justify-between px-3 py-1.5 bg-[#1A1815] border border-hairline-dark rounded-xs font-mono text-xs group hover:border-[#38342E] transition-colors">
              <div className="flex items-center gap-2 overflow-x-auto py-0.5">
                <span className="text-olive-light select-none shrink-0 font-semibold">$</span>
                <code className="text-ink-inverse-sub group-hover:text-ink-inverse transition-colors whitespace-nowrap text-[11px]">
                  {MOUNT_COMMAND}
                </code>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="ml-2 shrink-0 p-2 min-h-[36px] min-w-[36px] flex items-center justify-center text-ink-inverse-mute hover:text-white transition-colors rounded-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-olive active:scale-95"
                aria-label={copied ? 'Copied to clipboard' : 'Copy mount command to clipboard'}
              >
                {copied ? (
                  <Check size={14} className="text-olive-light" />
                ) : (
                  <Copy size={14} />
                )}
              </button>
            </div>
            <div aria-live="polite" className="sr-only">
              {copied ? 'Mount command copied to clipboard' : ''}
            </div>
            <p className="mt-1 font-mono text-[10px] text-ink-inverse-mute tracking-wide pl-1">
              Mount any S3 bucket as a local filesystem in one command.
            </p>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            ARCHITECTURE DIAGRAM
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <ScrollReveal delayMs={100}>
          <TechnicalDiagram />
        </ScrollReveal>
      </Container>
    </section>
  );
};
