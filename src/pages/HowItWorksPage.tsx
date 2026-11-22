import { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { MotionCard } from '../components/MotionCard';
import { PROCESS_STEPS } from '../data/toolkitData';
import { getHashForRoute, type PageRoute } from '../router';

interface HowItWorksPageProps {
  onNavigate: (route: PageRoute) => void;
}

const STAGE_DETAILS = [
  'Reads tabular data via pandas, normalizes date strings (including day-first formats), and maps custom column headers.',
  'Aggregates duplicate timestamps, infers series frequency (D, W, MS, QS, H), and inserts missing calendar dates cleanly.',
  'Computes lagged targets, rolling statistics, calendar flags, and joins user-provided future promo/price covariates.',
  'Splits historical data chronologically into expanding or rolling folds, scoring LightGBM/XGBoost alongside simple baselines.',
  'Trains across full history, produces horizon projections with quantile intervals, and writes all CSV, plot, and joblib outputs.',
];

const STAGE_INPUTS_OUTPUTS = [
  { input: 'CSV / Excel / Parquet file', output: 'Typed DataFrame with standardized columns' },
  { input: 'Irregular transaction rows', output: 'Continuous calendar timeline per series ID' },
  { input: 'Regularized target series', output: 'Lag, rolling, and calendar feature matrix' },
  { input: 'Feature matrix + time folds', output: 'Out-of-sample metrics vs. seasonal baselines' },
  { input: 'Trained estimator + horizon', output: 'forecast.csv, plots, and saved model.joblib' },
];

export function HowItWorksPage({ onNavigate }: HowItWorksPageProps) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="bg-[#F8FAFB] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          {/* Left Scrolling Architectural Overview Column */}
          <div className="space-y-6 lg:col-span-5">
            <div>
              <p className="font-mono text-xs font-medium text-teal-700">WORKFLOW</p>
              <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-balance text-neutral-950 sm:text-4xl lg:text-5xl">
                How it works
              </h1>
              <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
                A deterministic five-stage pipeline from raw spreadsheet export to evaluated
                forecasts. Select any stage to inspect its transformations.
              </p>
            </div>

            <MotionCard interactive={false} className="p-6">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
                <div>
                  <p className="font-mono text-xs font-semibold text-teal-700">
                    STAGE {PROCESS_STEPS[activeStep].step} OF 05
                  </p>
                  <h2 className="mt-1 font-display text-xl font-semibold text-neutral-950">
                    {PROCESS_STEPS[activeStep].title}
                  </h2>
                </div>
                <div className="flex gap-1">
                  {PROCESS_STEPS.map((s, idx) => (
                    <button
                      key={s.step}
                      type="button"
                      onClick={() => setActiveStep(idx)}
                      className={`min-h-[32px] rounded-lg px-2.5 font-mono text-xs font-medium transition-colors ${
                        activeStep === idx
                          ? 'bg-teal-700 text-white'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      }`}
                    >
                      {s.step}
                    </button>
                  ))}
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-neutral-700 sm:text-base">
                {STAGE_DETAILS[activeStep]}
              </p>

              <div className="mt-5 grid grid-cols-1 gap-2.5 rounded-xl border border-neutral-200 bg-[#F8FAFB] p-4 text-xs">
                <div>
                  <span className="font-mono font-semibold text-neutral-500">STAGE INPUT: </span>
                  <span className="font-mono text-neutral-900">
                    {STAGE_INPUTS_OUTPUTS[activeStep].input}
                  </span>
                </div>
                <div>
                  <span className="font-mono font-semibold text-teal-700">STAGE OUTPUT: </span>
                  <span className="font-mono text-neutral-900">
                    {STAGE_INPUTS_OUTPUTS[activeStep].output}
                  </span>
                </div>
              </div>
            </MotionCard>

            <MotionCard interactive={false} delay={0.05} className="p-6">
              <div className="flex items-center gap-2 text-neutral-950">
                <ShieldCheck className="h-4 w-4 text-teal-700" aria-hidden="true" />
                <p className="font-mono text-xs font-semibold text-neutral-500">
                  LEAKAGE-FREE DESIGN GUARANTEES
                </p>
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-neutral-600">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-teal-600"
                    aria-hidden="true"
                  />
                  <span>
                    Lags and rolling windows at time <code className="font-mono text-neutral-900">t</code>{' '}
                    strictly exclude observations at or after{' '}
                    <code className="font-mono text-neutral-900">t</code>.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-teal-600"
                    aria-hidden="true"
                  />
                  <span>
                    Backtest folds respect chronological order rather than random K-fold shuffling.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-teal-600"
                    aria-hidden="true"
                  />
                  <span>
                    Series normalization parameters are fitted exclusively inside training windows.
                  </span>
                </li>
              </ul>
            </MotionCard>

            <div className="pt-2">
              <a
                href={getHashForRoute('get-started')}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('get-started');
                }}
                className="inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-950 whitespace-nowrap shrink-0"
              >
                <span>Next: Get started</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Vertical Timeline Stepper */}
          <div className="lg:col-span-7">
            <ol className="relative space-y-5 border-l border-neutral-200 pl-8">
              {PROCESS_STEPS.map((item, idx) => {
                const isSelected = activeStep === idx;
                return (
                  <motion.li
                    key={item.step}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.28, delay: 0.04 * idx }}
                    className="relative"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveStep(idx)}
                      className={`w-full rounded-xl border p-6 text-left transition-all duration-150 sm:p-7 ${
                        isSelected
                          ? 'border-teal-600 bg-white shadow-xs'
                          : 'border-neutral-200 bg-white/85 hover:border-neutral-300 hover:bg-white'
                      }`}
                    >
                      <span
                        className={`absolute top-6 -left-[45px] flex h-7 w-7 items-center justify-center rounded-full border font-mono text-xs font-semibold tabular-nums transition-colors ${
                          isSelected
                            ? 'border-teal-600 bg-teal-700 text-white'
                            : 'border-neutral-300 bg-white text-neutral-700'
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="font-display text-lg font-semibold text-neutral-950 sm:text-xl">
                          {item.step} — {item.title}
                        </h3>
                        <span className="font-mono text-xs text-neutral-500 tabular-nums">
                          Stage {item.step}
                        </span>
                      </div>
                      <p className="mt-2.5 text-sm leading-relaxed text-neutral-600 sm:text-base">
                        {item.description}
                      </p>
                      <p className="mt-3 font-mono text-xs text-sky-700">
                        Output: {STAGE_INPUTS_OUTPUTS[idx].output}
                      </p>
                    </button>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
