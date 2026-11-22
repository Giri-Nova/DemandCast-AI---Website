import { Check, Download, ExternalLink, Github } from 'lucide-react';
import { CodeBlock } from '../components/CodeBlock';
import { MotionCard } from '../components/MotionCard';
import { GITHUB_REPO_URL, GITHUB_ZIP_URL } from '../data/toolkitData';

export function DownloadPage() {
  return (
    <div className="bg-[#F8FAFB] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          {/* Left Scrolling Release Overview Column */}
          <div className="space-y-6 lg:col-span-5">
            <div>
              <p className="font-mono text-xs font-medium text-teal-700">OPEN SOURCE RELEASE</p>
              <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-balance text-neutral-950 sm:text-4xl lg:text-5xl">
                Built for developers. Open to everyone.
              </h1>
              <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
                Inspect the source code, run the pytest verification suite locally, or adapt the
                YAML pipeline for your own retail or academic forecasting workflow.
              </p>
            </div>

            <MotionCard interactive={false} className="p-6">
              <p className="font-mono text-xs font-semibold text-neutral-500">CORE STACK</p>
              <div className="mt-3 grid grid-cols-2 gap-2.5 font-mono text-xs font-medium text-neutral-800">
                <div className="rounded-lg border border-neutral-200 bg-[#F8FAFB] px-3 py-2.5">
                  Python 3.10+
                </div>
                <div className="rounded-lg border border-neutral-200 bg-[#F8FAFB] px-3 py-2.5">
                  LightGBM / XGBoost
                </div>
                <div className="rounded-lg border border-neutral-200 bg-[#F8FAFB] px-3 py-2.5">
                  pandas / NumPy
                </div>
                <div className="rounded-lg border border-neutral-200 bg-[#F8FAFB] px-3 py-2.5">
                  Streamlit UI
                </div>
              </div>
              <ul className="mt-5 space-y-2 border-t border-neutral-200 pt-4 text-xs text-neutral-600">
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-teal-600" aria-hidden="true" />
                  <span>Open-source repository on GitHub</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-teal-600" aria-hidden="true" />
                  <a
                    href={GITHUB_REPO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate underline decoration-neutral-300 underline-offset-4 hover:text-teal-700"
                  >
                    {GITHUB_REPO_URL}
                  </a>
                </li>
              </ul>
            </MotionCard>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] items-center gap-2.5 rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 whitespace-nowrap shrink-0"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                <span>View on GitHub</span>
                <ExternalLink className="h-3.5 w-3.5 opacity-80" aria-hidden="true" />
              </a>

              <a
                href={GITHUB_ZIP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] items-center gap-2 rounded-xl border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 transition-colors hover:border-neutral-950 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 whitespace-nowrap shrink-0"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                <span>Download source (ZIP)</span>
              </a>
            </div>
          </div>

          {/* Right Clone, Tests & Contribution Cards */}
          <div className="space-y-6 lg:col-span-7">
            <MotionCard delay={0.05} className="p-7">
              <h2 className="font-display text-xl font-semibold text-neutral-950">
                1. Clone repository
              </h2>
              <p className="mt-2 text-sm text-neutral-600 sm:text-base">
                Clone the toolkit directly into a local working directory and install dependencies.
              </p>
              <div className="mt-5">
                <CodeBlock
                  label="git clone"
                  language="bash"
                  buttonText="Copy command"
                  code={`git clone ${GITHUB_REPO_URL}.git`}
                />
              </div>
            </MotionCard>

            <MotionCard delay={0.1} className="p-7">
              <h2 className="font-display text-xl font-semibold text-neutral-950">
                2. Run the test suite
              </h2>
              <p className="mt-2 text-sm text-neutral-600 sm:text-base">
                Verify timeline cleaning, feature generation, backtest splits, and prediction
                exports before committing changes.
              </p>
              <div className="mt-5">
                <CodeBlock
                  label="pytest"
                  language="bash"
                  buttonText="Copy command"
                  code="python -m pytest -q"
                />
              </div>
            </MotionCard>

            <MotionCard delay={0.15} className="p-7">
              <h2 className="font-display text-xl font-semibold text-neutral-950">
                3. Contributing
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600 sm:text-base">
                Pull requests and issue reports are welcome for dataset adapters, new evaluation
                metrics, interval calibration improvements, and documentation clarity. Run the
                test suite above before submitting changes.
              </p>
            </MotionCard>
          </div>
        </div>
      </div>
    </div>
  );
}
