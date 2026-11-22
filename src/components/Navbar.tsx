import { useEffect, useState } from 'react';
import { Activity, Menu, X } from 'lucide-react';
import { getHashForRoute, type PageRoute } from '../router';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
}

const NAV_ITEMS: { route: PageRoute; label: string }[] = [
  { route: 'features', label: 'Features' },
  { route: 'how-it-works', label: 'How it works' },
  { route: 'get-started', label: 'Get started' },
  { route: 'parameters', label: 'Parameters' },
  { route: 'limits-faq', label: 'FAQ' },
];

export function Navbar({ currentRoute, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, route: PageRoute) => {
    e.preventDefault();
    onNavigate(route);
    setMobileOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'border-b border-neutral-200 bg-white/90 shadow-[0_4px_20px_-10px_rgba(15,23,42,0.12)] backdrop-blur-md'
          : 'border-b border-neutral-200/70 bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        <a
          href={getHashForRoute('home')}
          onClick={(e) => handleLinkClick(e, 'home')}
          className="inline-flex items-center gap-2.5 font-display text-lg font-bold tracking-tight text-neutral-950 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-600"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-600 text-white">
            <Activity className="h-4 w-4" aria-hidden="true" />
          </span>
          <span>DemandCast AI</span>
        </a>

        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <a
                key={item.route}
                href={getHashForRoute(item.route)}
                onClick={(e) => handleLinkClick(e, item.route)}
                aria-current={isActive ? 'page' : undefined}
                className={`text-sm font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-600 ${
                  isActive
                    ? 'text-teal-700 underline decoration-2 underline-offset-8'
                    : 'text-neutral-600 hover:text-neutral-950 hover:underline hover:underline-offset-8'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href={getHashForRoute('download')}
            onClick={(e) => handleLinkClick(e, 'download')}
            className="hidden sm:inline-flex min-h-[40px] items-center justify-center rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 whitespace-nowrap shrink-0"
          >
            Download
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-neutral-200 text-neutral-900 md:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-neutral-200 bg-white px-4 py-4 md:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            <a
              href={getHashForRoute('home')}
              onClick={(e) => handleLinkClick(e, 'home')}
              className={`flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium ${
                currentRoute === 'home'
                  ? 'bg-neutral-100 text-teal-700'
                  : 'text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950'
              }`}
            >
              Home
            </a>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.route}
                href={getHashForRoute(item.route)}
                onClick={(e) => handleLinkClick(e, item.route)}
                className={`flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium ${
                  currentRoute === item.route
                    ? 'bg-neutral-100 text-teal-700'
                    : 'text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950'
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href={getHashForRoute('outputs')}
              onClick={(e) => handleLinkClick(e, 'outputs')}
              className={`flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium ${
                currentRoute === 'outputs'
                  ? 'bg-neutral-100 text-teal-700'
                  : 'text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950'
              }`}
            >
              Outputs
            </a>
            <a
              href={getHashForRoute('download')}
              onClick={(e) => handleLinkClick(e, 'download')}
              className="mt-2 flex min-h-[44px] items-center justify-center rounded-lg bg-teal-700 px-4 text-base font-semibold text-white"
            >
              Download
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
