import React, { useState } from 'react';
import { Container } from '../components/Container';
import { Button } from '../components/Button';
import { FOOTER_CONTENT } from '../data/content';
import { Check, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <footer id="access" className="bg-canvas-dark text-ink-inverse border-t border-hairline-dark pt-16 pb-12">
      <Container>
        {/* Pre-Footer Action Block */}
        <div className="pb-16 mb-16 border-b border-hairline-dark">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 mb-4 rounded-xs border border-white/10 bg-white/5 font-mono text-[11px] text-ink-inverse-sub uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-olive animate-pulse" />
              <span>Controlled Technical Preview</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-ink-inverse mb-3">
              {FOOTER_CONTENT.ctaTitle}
            </h2>

            <p className="font-sans text-sm sm:text-base text-ink-inverse-sub leading-relaxed mb-6">
              {FOOTER_CONTENT.ctaDescription}
            </p>

            {submitted ? (
              <div className="flex items-center gap-2 p-3 bg-olive-dim border border-olive rounded-sm text-sm font-mono text-ink-inverse">
                <Check size={16} className="text-olive-light" />
                <span>Request received. Our infrastructure team will follow up via email.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md">
                <input
                  type="email"
                  required
                  placeholder="engineering@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 bg-canvas-dark-card border border-hairline-dark rounded-sm text-sm font-sans text-ink-inverse placeholder-ink-inverse-mute focus:outline-none focus:border-olive"
                />
                <Button variant="primary" size="md" type="submit" icon={<ArrowRight size={14} />}>
                  {FOOTER_CONTENT.ctaButton}
                </Button>
              </form>
            )}
            <p className="mt-2 text-[11px] font-mono text-ink-inverse-mute">
              Direct CLI installer & technical architecture paper provided upon approval.
            </p>
          </div>
        </div>

        {/* 4-Column Directory */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 mb-12 border-b border-hairline-dark text-sm">
          {FOOTER_CONTENT.columns.map((col) => (
            <div key={col.title}>
              <div className="font-mono text-xs uppercase tracking-wider text-ink-inverse-sub mb-4">
                {col.title}
              </div>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs sm:text-sm text-ink-inverse-mute hover:text-ink-inverse transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Metadata & Status Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-ink-inverse-mute">
          <div>{FOOTER_CONTENT.copyright}</div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-olive" />
            <span>{FOOTER_CONTENT.status}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
