import React, { useState } from 'react';
import { Container } from '../components/Container';
import { ScrollReveal } from '../components/ScrollReveal';
import { SystemStatusIndicator } from '../components/visuals';
import { ArrowRight, Check, Copy, ExternalLink, Terminal } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════
   FOOTER NAVIGATION STRUCTURE
   ═══════════════════════════════════════════════════════════ */

const NAV_LINKS = [
  { label: 'Product', href: '#product' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Docs', href: '#docs' },
];

const RESOURCE_LINKS = [
  { label: 'Documentation', href: '#docs' },
  { label: 'GitHub', href: '#github', external: true },
  { label: 'Contact', href: '#contact' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '#privacy' },
  { label: 'Terms of Service', href: '#terms' },
  { label: 'Security & Compliance', href: '#security' },
];

export const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const installCmd = 'curl -fsSL https://japolic.dev/install.sh | sh';

  const copyToClipboard = () => {
    navigator.clipboard?.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer
      id="get-started"
      className="bg-canvas-dark text-ink-inverse border-t border-hairline-dark relative overflow-hidden"
      aria-labelledby="footer-heading"
    >
      {/* ── Subtle Technical Coordinate Grid Background ── */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        aria-hidden="true"
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footerTechnicalGrid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="0" cy="0" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footerTechnicalGrid)" />
        </svg>
      </div>

      <Container className="relative z-10">
        {/* ═══════════════════════════════════════════════════════
            PRE-FOOTER CONCLUSION CTA BLOCK
            ═══════════════════════════════════════════════════════ */}
        <ScrollReveal>
          <div id="docs" className="scroll-mt-[72px]" />
          <div className="pt-16 sm:pt-20 lg:pt-24 pb-14 md:pb-20 border-b border-hairline-dark">
            <div className="max-w-3xl">
              {/* Technical system status badge */}
              <div className="mb-6">
                <SystemStatusIndicator
                  status="nominal"
                  label="ALL SYSTEMS OPERATIONAL"
                  sublabel="STABLE"
                  theme="dark"
                  size="sm"
                />
              </div>

              {/* Closing statement */}
              <h2
                id="footer-heading"
                className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[3.25rem] font-medium tracking-tight text-ink-inverse leading-[1.12] mb-6"
              >
                Build faster on data that keeps up.
              </h2>

              <p className="font-sans text-base sm:text-lg text-ink-inverse-sub leading-relaxed mb-8 max-w-2xl">
                A shared file system that keeps your data close to your compute — backed by commodity object storage, no infrastructure overhaul required.
              </p>

              {/* Action Bar: Primary CTA + Terminal Quickstart */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-6">
                <a
                  href="#contact"
                  className="group min-h-[46px] inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xs bg-olive text-white font-sans text-sm font-medium tracking-tight border border-[#4D6A53] shadow-subtle hover:bg-olive-light hover:shadow-card active:bg-olive-dim transition-all duration-150 interactive-button focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive focus-visible:ring-offset-2 focus-visible:ring-offset-canvas-dark"
                >
                  <span>Get Started</span>
                  <ArrowRight size={15} strokeWidth={2} className="transition-transform duration-150 group-hover:translate-x-0.5" />
                </a>

                {/* Monospace quick install prompt with copy button */}
                <div className="flex items-center justify-between gap-3 px-3.5 py-2 bg-canvas-dark-card border border-hairline-dark rounded-xs font-mono text-xs text-ink-inverse-sub hover:border-hairline-dark-subtle transition-colors">
                  <div className="flex items-center gap-2 truncate">
                    <Terminal size={14} className="text-olive flex-shrink-0" />
                    <span className="text-ink-inverse-mute select-none">$</span>
                    <span className="truncate text-ink-inverse font-mono">{installCmd}</span>
                  </div>
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    aria-label="Copy install command"
                    className="p-2 min-h-[36px] min-w-[36px] flex items-center justify-center hover:text-ink-inverse text-ink-inverse-mute transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-olive rounded-xs flex-shrink-0 active:scale-95"
                  >
                    {copied ? <Check size={14} className="text-olive" /> : <Copy size={14} />}
                  </button>
                </div>
                <div aria-live="polite" className="sr-only">
                  {copied ? 'Install command copied to clipboard' : ''}
                </div>
              </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-4 font-mono text-[11px] text-ink-inverse-mute">
              <span>Single binary</span>
              <span className="text-hairline-dark">•</span>
              <span>POSIX compatible</span>
              <span className="text-hairline-dark">•</span>
              <span>Zero-downtime tiering</span>
            </div>
          </div>
        </div>
      </ScrollReveal>

        {/* ═══════════════════════════════════════════════════════
            MAIN FOOTER DIRECTORY (Wordmark + Navigation Columns)
            ═══════════════════════════════════════════════════════ */}
        <div className="py-12 md:py-16 border-b border-hairline-dark">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
            {/* Col 1-5: Brand & Positioning Statement */}
            <div className="md:col-span-5 flex flex-col justify-between">
              <div>
                <a
                  href="#"
                  className="font-mono text-base font-semibold tracking-[0.15em] text-ink-inverse uppercase inline-block mb-4 hover:text-olive-light transition-colors"
                >
                  JAPOLIC
                </a>
                <p className="font-sans text-sm text-ink-inverse-sub leading-relaxed max-w-sm mb-6">
                  Shared file system infrastructure for distributed compute — backed by S3-compatible object storage.
                </p>
              </div>

              <div className="font-mono text-[11px] text-ink-inverse-mute">
                <div>INFRASTRUCTURE ARCHITECTURE</div>
                <div className="text-olive-light mt-0.5">BUILT FOR SCALE</div>
              </div>
            </div>

            {/* Col 6-8: Navigation */}
            <div className="md:col-span-3">
              <h3 className="font-mono text-xs uppercase tracking-wider text-ink-inverse font-medium mb-4">
                Navigation
              </h3>
              <ul className="space-y-3">
                {NAV_LINKS.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="font-sans text-sm text-ink-inverse-sub hover:text-ink-inverse transition-colors inline-block py-1"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 9-12: Resources & Developer Access */}
            <div className="md:col-span-4">
              <h3 className="font-mono text-xs uppercase tracking-wider text-ink-inverse font-medium mb-4">
                Resources
              </h3>
              <ul className="space-y-3 mb-8">
                {RESOURCE_LINKS.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="font-sans text-sm text-ink-inverse-sub hover:text-ink-inverse transition-colors inline-flex items-center gap-1.5 py-1"
                    >
                      <span>{item.label}</span>
                      {item.external && (
                        <ExternalLink size={12} className="text-ink-inverse-mute" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Technical specs block */}
              <div className="p-3 bg-canvas-dark-card border border-hairline-dark rounded-xs font-mono text-[11px] text-ink-inverse-mute">
                <span className="text-ink-inverse block mb-1">Architecture Paper</span>
                <span>Whitepaper: High-Throughput POSIX Over Object Storage</span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            BOTTOM METADATA BAR (Copyright, Legal, Status)
            ═══════════════════════════════════════════════════════ */}
        <div className="py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-ink-inverse-mute">
          <div>
            © {new Date().getFullYear()} Japolic Technologies, Inc. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {LEGAL_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-ink-inverse transition-colors py-1 inline-block"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};
