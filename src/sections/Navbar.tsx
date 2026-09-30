import React, { useState, useEffect, useRef } from 'react';
import { Container } from '../components/Container';
import { SystemStatusIndicator } from '../components/visuals';
import { Menu, X, ArrowUpRight, Terminal } from 'lucide-react';

interface NavLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

const NAV_ITEMS: NavLink[] = [
  { label: 'Product', href: '#capabilities' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Docs', href: '#docs' },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  // Monitor scroll for shadow/border and active section tracking without layout shift
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);

      const sectionIds = ['capabilities', 'how-it-works', 'use-cases', 'docs'];
      const scrollPos = window.scrollY + 120;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(`#${id}`);
          return;
        }
      }
      if (window.scrollY < 200) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Escape key to close mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll and shift focus when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      // Shift focus to the first interactive item in the drawer
      const timer = setTimeout(() => {
        const firstInteractive = mobileNavRef.current?.querySelector('a, button') as HTMLElement | null;
        firstInteractive?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? 'bg-canvas-base/95 backdrop-blur-md border-b border-hairline-strong shadow-subtle'
          : 'bg-canvas-base border-b border-hairline-light'
      }`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* =================================================================
              LEFT: JAPOLIC WORDMARK & COMPUTE STATUS INDICATOR
              ================================================================= */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="#"
              className="flex items-center gap-2.5 text-ink-primary group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-olive focus-visible:ring-offset-2 rounded-xs"
              aria-label="Japolic home"
            >
              {/* Early Computing Monolithic Symbol */}
              <div className="flex h-7 w-7 items-center justify-center rounded-xs bg-canvas-dark text-canvas-base border border-hairline-dark transition-transform duration-150 group-hover:scale-[1.02]">
                <span className="font-mono text-xs font-semibold tracking-tighter text-white">
                  J:
                </span>
              </div>

              {/* Wordmark */}
              <span className="font-mono text-base font-semibold tracking-wider text-ink-primary uppercase">
                JAPOLIC
              </span>
            </a>

            {/* Subtle Divider */}
            <div className="hidden sm:block h-3.5 w-px bg-hairline-strong" />

            {/* Small Technical Telemetry Metadata */}
            <div className="hidden sm:block">
              <SystemStatusIndicator
                status="nominal"
                label="SYS_OK"
                sublabel="// POSIX-VFS"
                theme="light"
                size="sm"
              />
            </div>
          </div>


          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 text-sm font-sans"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`group relative py-1 tracking-tight font-medium text-xs transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-olive rounded-xs ${
                    isActive
                      ? 'text-ink-primary font-semibold'
                      : 'text-ink-secondary hover:text-ink-primary'
                  }`}
                >
                  <span>{item.label}</span>
                  {/* Restrained underline micro-indicator */}
                  <span
                    className={`absolute -bottom-1 left-0 w-full h-[1.5px] bg-olive transition-transform duration-150 origin-left ease-out ${
                      isActive
                        ? 'scale-x-100 opacity-100'
                        : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-60'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* =================================================================
              RIGHT: METADATA & PRIMARY CTA
              ================================================================= */}
          <div className="hidden md:flex items-center gap-4">
            {/* Quick terminal indicator link */}
            <a
              href="#docs"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-ink-tertiary hover:text-ink-primary transition-colors px-2 py-1 rounded-xs hover:bg-canvas-subtle focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-olive"
            >
              <Terminal size={12} className="text-olive" />
              <span>Docs</span>
            </a>

            {/* Primary Action Button */}
            <a
              href="#get-started"
              className="group inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xs bg-olive text-white font-sans text-xs font-medium tracking-tight border border-[#2F4233] shadow-subtle hover:bg-olive-light hover:shadow-card active:bg-olive-dim transition-all duration-150 interactive-button focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive focus-visible:ring-offset-1"
            >
              <span>Get Started</span>
              <ArrowUpRight
                size={13}
                className="opacity-80 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          {/* =================================================================
              MOBILE: COMPACT ACTIONS & ACCESSIBLE HAMBURGER
              ================================================================= */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="#get-started"
              className="h-9 px-3 flex items-center justify-center rounded-xs bg-olive text-white font-sans text-xs font-medium border border-[#2F4233] interactive-button shadow-subtle"
            >
              Get Started
            </a>

            <button
              ref={menuButtonRef}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              className="h-9 w-9 flex items-center justify-center rounded-xs border border-hairline-strong bg-canvas-elevated text-ink-primary hover:bg-canvas-subtle transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-olive"
            >
              {mobileMenuOpen ? (
                <X size={18} className="transition-transform duration-150 rotate-90" />
              ) : (
                <Menu size={18} className="transition-transform duration-150" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* =====================================================================
          MOBILE DRAWER / ACCESSIBLE OVERLAY
          ===================================================================== */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          ref={mobileNavRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="md:hidden border-b border-hairline-strong bg-canvas-elevated shadow-terminal transition-all duration-200 ease-out"
        >
          <Container className="py-5">
            {/* Status bar in mobile menu */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-hairline-light font-mono text-[11px] text-ink-tertiary">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-olive animate-pulse"></span>
                <span>CLUSTER STATUS: OK</span>
              </span>
              <span>KERNEL: POSIX-VFS</span>
            </div>

            {/* Menu Links */}
            <nav className="flex flex-col space-y-1 font-sans">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between min-h-[44px] py-2.5 px-3 rounded-xs text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-olive ${
                      isActive
                        ? 'bg-olive-wash text-olive font-semibold'
                        : 'text-ink-primary hover:bg-canvas-subtle'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight
                      size={14}
                      className={isActive ? 'text-olive' : 'text-ink-tertiary'}
                    />
                  </a>
                );
              })}
            </nav>

            {/* Mobile Footer CTA */}
            <div className="pt-4 mt-3 border-t border-hairline-light flex flex-col gap-2">
              <a
                href="#get-started"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full min-h-[46px] flex items-center justify-center gap-2 py-2.5 rounded-xs bg-olive text-white font-sans text-sm font-medium border border-[#2F4233] interactive-button shadow-subtle"
              >
                <span>Get Started — Request Early Access</span>
                <ArrowUpRight size={14} />
              </a>
              <div className="text-center font-mono text-[10px] text-ink-tertiary mt-1">
                JAPOLIC STORAGE SYSTEMS
              </div>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
};
