import React, { useState } from 'react';
import { Container } from '../components/Container';
import { TechnicalDiagram } from '../components/TechnicalDiagram';
import { ScrollReveal } from '../components/ScrollReveal';
import { ArrowRight, BookOpen, Copy, Check } from 'lucide-react';

const HERO_TAGS = ['FILE SYSTEM', 'SHARED STORAGE', 'S3 COMPATIBLE'] as const;

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

      <Container className="relative z-10 pt-16 pb-16 md:pt-24 md:pb-24">
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            TEXT CONTENT
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}

        {/* Metadata Kicker Tags */}
        <div className="flex flex-wrap items-center gap-2.5 mb-8">
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
          className="font-display text-[2.4rem] sm:text-[3.2rem] md:text-[3.8rem] lg:text-[4.2rem] font-medium leading-[1.06] tracking-tight text-ink-inverse max-w-[820px] mb-6"
        >
          Shared storage.
          <br />
          <span className="text-olive-light">Local-disk performance.</span>
        </h1>

        {/* Supporting Copy */}
        <p className="font-sans text-[15px] sm:text-base md:text-lg text-ink-inverse-sub leading-[1.65] max-w-[620px] mb-10">
          Japolic connects distributed compute to unified shared storage
          over standard POSIX file interfaces — near-local NVMe speeds, native
          S3 compatibility, and automatic cold-data tiering without rewriting
          your application.
        </p>

        {/* CTA Cluster */}
        <div className="flex flex-wrap items-center gap-3.5 mb-10">
          <a
            href="#capabilities"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xs bg-olive text-white font-sans text-sm font-medium tracking-tight border border-[#2F4233] shadow-subtle hover:bg-olive-light hover:shadow-card active:bg-olive-dim transition-all duration-150 interactive-button focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive focus-visible:ring-offset-2 focus-visible:ring-offset-canvas-dark"
          >
            <span>Explore Japolic</span>
            <ArrowRight size={15} strokeWidth={2} className="transition-transform duration-150 group-hover:translate-x-0.5" />
          </a>
          <a
            href="#docs"
            className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xs bg-white/[0.04] text-ink-inverse-sub font-sans text-sm border border-white/[0.12] hover:bg-white/[0.08] hover:text-ink-inverse hover:border-white/[0.25] transition-all duration-150 interactive-button focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-olive"
          >
            <BookOpen size={14} strokeWidth={1.8} className="transition-transform duration-150 group-hover:-translate-y-0.5" />
            <span>Read the docs</span>
          </a>
        </div>

        {/* CLI Quick-Mount Snippet */}
        <div className="max-w-lg mb-14 md:mb-20">
          <div className="flex items-center justify-between px-3.5 py-2 bg-[#1A1815] border border-hairline-dark rounded-xs font-mono text-xs group hover:border-[#38342E] transition-colors">
            <div className="flex items-center gap-2 overflow-x-auto py-0.5">
              <span className="text-olive-light select-none shrink-0 font-semibold">$</span>
              <code className="text-ink-inverse-sub group-hover:text-ink-inverse transition-colors whitespace-nowrap">
                {MOUNT_COMMAND}
              </code>
            </div>
            <button
              onClick={handleCopy}
              className="ml-3 shrink-0 p-1.5 text-ink-inverse-mute hover:text-white transition-colors rounded-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-olive active:scale-95"
              aria-label={copied ? 'Copied to clipboard' : 'Copy mount command to clipboard'}
            >
              {copied ? (
                <Check size={13} className="text-olive-light" />
              ) : (
                <Copy size={13} />
              )}
            </button>
          </div>
          <p className="mt-1.5 font-mono text-[10px] text-ink-inverse-mute tracking-wide pl-1">
            Mount any S3 bucket as a local filesystem in one command.
          </p>
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
