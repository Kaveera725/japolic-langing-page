import React, { useState } from 'react';
import { Container } from '../components/Container';
import { Button } from '../components/Button';
import { NAV_LINKS } from '../data/content';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-hairline-light bg-canvas-base/95 backdrop-blur-sm transition-colors">
      <Container className="flex h-16 items-center justify-between">
        {/* Brand / Wordmark */}
        <a href="#" className="flex items-center gap-2.5 text-ink-primary group">
          <div className="flex h-6 w-6 items-center justify-center rounded-xs bg-ink-primary text-white text-xs font-mono font-bold tracking-tight">
            J
          </div>
          <span className="font-sans font-semibold text-lg tracking-tight">Japolic</span>
          <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-xs bg-canvas-subtle border border-hairline-strong text-[11px] font-mono text-ink-tertiary">
            v0.9-preview
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-sans text-ink-secondary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-ink-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#docs"
            className="text-xs font-mono text-ink-tertiary hover:text-ink-primary px-2 py-1 transition-colors"
          >
            Docs →
          </a>
          <Button variant="primary" size="sm" href="#access">
            Request Access
          </Button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex md:hidden items-center gap-2">
          <Button variant="primary" size="sm" href="#access" className="text-xs px-2.5 py-1">
            Access
          </Button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-ink-secondary hover:text-ink-primary border border-hairline-light rounded-xs bg-canvas-subtle"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </Container>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-hairline-light bg-canvas-elevated px-5 py-4">
          <nav className="flex flex-col gap-3 font-sans text-sm">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-ink-secondary hover:text-ink-primary flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowUpRight size={14} className="text-ink-tertiary" />
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
