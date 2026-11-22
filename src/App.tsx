import { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { Activity, Terminal, X } from 'lucide-react';
import { CodeBlock } from './components/CodeBlock';
import { Navbar } from './components/Navbar';
import { GITHUB_REPO_PLACEHOLDER } from './data/toolkitData';
import { DownloadPage } from './pages/DownloadPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { GetStartedPage } from './pages/GetStartedPage';
import { HomePage } from './pages/HomePage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { LimitsFaqPage } from './pages/LimitsFaqPage';
import { OutputsPage } from './pages/OutputsPage';
import { ParametersPage } from './pages/ParametersPage';
import { getHashForRoute, getRouteFromHash, type PageRoute } from './router';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(() => {
    if (typeof window !== 'undefined') {
      return getRouteFromHash(window.location.hash);
    }
    return 'home';
  });

  const [repoNoticeOpen, setRepoNoticeOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(getRouteFromHash(window.location.hash));
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route: PageRoute) => {
    const targetHash = getHashForRoute(route);
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col bg-[#F8FAFB] text-neutral-950">
        <Navbar currentRoute={currentRoute} onNavigate={navigateTo} />

        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentRoute}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {currentRoute === 'home' && (
                <HomePage
                  onNavigate={navigateTo}
                  onOpenRepoModal={() => setRepoNoticeOpen(true)}
                />
              )}
              {currentRoute === 'features' && <FeaturesPage onNavigate={navigateTo} />}
              {currentRoute === 'how-it-works' && <HowItWorksPage onNavigate={navigateTo} />}
              {currentRoute === 'get-started' && <GetStartedPage onNavigate={navigateTo} />}
              {currentRoute === 'parameters' && <ParametersPage onNavigate={navigateTo} />}
              {currentRoute === 'outputs' && <OutputsPage onNavigate={navigateTo} />}
              {currentRoute === 'limits-faq' && <LimitsFaqPage onNavigate={navigateTo} />}
              {currentRoute === 'download' && (
                <DownloadPage onOpenRepoModal={() => setRepoNoticeOpen(true)} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="border-t border-neutral-200 bg-white py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-teal-600 text-white">
                    <Activity className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span className="font-display text-base font-bold text-neutral-950">
                    DemandCast AI
                  </span>
                </div>
                <p className="text-sm text-neutral-600">
                  Open-source demand forecasting for real-world sales data.
                </p>
              </div>

              <nav
                aria-label="Footer links"
                className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium"
              >
                <button
                  type="button"
                  onClick={() => setRepoNoticeOpen(true)}
                  className="text-neutral-600 transition-colors hover:text-teal-700"
                >
                  GitHub
                </button>
                <a
                  href={getHashForRoute('outputs')}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('outputs');
                  }}
                  className="text-neutral-600 transition-colors hover:text-teal-700"
                >
                  Documentation
                </a>
                <a
                  href={getHashForRoute('features')}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('features');
                  }}
                  className="text-neutral-600 transition-colors hover:text-teal-700"
                >
                  Features
                </a>
                <a
                  href={getHashForRoute('get-started')}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('get-started');
                  }}
                  className="text-neutral-600 transition-colors hover:text-teal-700"
                >
                  Get Started
                </a>
                <a
                  href={getHashForRoute('parameters')}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('parameters');
                  }}
                  className="text-neutral-600 transition-colors hover:text-teal-700"
                >
                  Parameters
                </a>
                <a
                  href={getHashForRoute('limits-faq')}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('limits-faq');
                  }}
                  className="text-neutral-600 transition-colors hover:text-teal-700"
                >
                  FAQ
                </a>
              </nav>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 pt-6 text-xs text-neutral-500 sm:text-sm">
              <p className="font-medium text-neutral-700">
                Built with Python · Pandas · LightGBM · Streamlit
              </p>
              <span>Open Source (MIT placeholder)</span>
            </div>
          </div>
        </footer>

        {repoNoticeOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="repo-dialog-title"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs"
            onClick={() => setRepoNoticeOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-lg rounded-2xl border border-neutral-200 bg-white p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <Terminal className="h-5 w-5 text-teal-600" aria-hidden="true" />
                  <h2
                    id="repo-dialog-title"
                    className="font-display text-lg font-semibold text-neutral-950"
                  >
                    GitHub Repository Link
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setRepoNoticeOpen(false)}
                  aria-label="Close repository dialog"
                  className="inline-flex min-h-[36px] min-w-[36px] items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-neutral-600 sm:text-base">
                The public repository URL (
                <code className="font-mono text-sm text-neutral-900">{GITHUB_REPO_PLACEHOLDER}</code>
                ) will be linked here once published. Clone and run tests with:
              </p>

              <div className="mt-4">
                <CodeBlock
                  label="Clone & verify"
                  language="bash"
                  buttonText="Copy command"
                  code={`git clone ${GITHUB_REPO_PLACEHOLDER}\npython -m pytest -q`}
                />
              </div>

              <div className="mt-5 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setRepoNoticeOpen(false);
                    navigateTo('get-started');
                  }}
                  className="inline-flex min-h-[40px] items-center rounded-xl border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-100"
                >
                  Read Quick start
                </button>
                <button
                  type="button"
                  onClick={() => setRepoNoticeOpen(false)}
                  className="inline-flex min-h-[40px] items-center rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-950"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </MotionConfig>
  );
}
