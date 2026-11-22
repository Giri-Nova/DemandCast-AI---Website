import { useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { MotionCard } from '../components/MotionCard';
import { FAQ_ITEMS, LIMITATIONS_LIST } from '../data/toolkitData';
import { getHashForRoute, type PageRoute } from '../router';

interface LimitsFaqPageProps {
  onNavigate: (route: PageRoute) => void;
}

const HISTORY_EXAMPLES = [
  { horizon: '14 days', required: '42+ days' },
  { horizon: '28 days', required: '84+ days' },
  { horizon: '12 weeks', required: '36+ weeks' },
];

export function LimitsFaqPage({ onNavigate }: LimitsFaqPageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="bg-[#F8FAFB] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          {/* Left Scrolling Limitations & History Rules Column */}
          <div className="space-y-6 lg:col-span-5">
            <div>
              <p className="font-mono text-xs font-medium text-teal-700">TRANSPARENCY</p>
              <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-balance text-neutral-950 sm:text-4xl lg:text-5xl">
                Honest limits &amp; FAQ
              </h1>
              <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
                Know where gradient-boosted tabular forecasting works well, what data volume it
                needs, and where simple baselines can outperform it.
              </p>
            </div>

            <MotionCard interactive={false} className="p-6">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-teal-700" aria-hidden="true" />
                <p className="font-mono text-xs font-semibold text-neutral-500">
                  MINIMUM HISTORY RULE (3 × HORIZON)
                </p>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2.5 text-center">
                {HISTORY_EXAMPLES.map((item) => (
                  <div
                    key={item.horizon}
                    className="rounded-lg border border-neutral-200 bg-[#F8FAFB] p-3"
                  >
                    <p className="text-[11px] text-neutral-500">Horizon {item.horizon}</p>
                    <p className="mt-1 font-mono text-xs font-semibold text-neutral-950 tabular-nums">
                      {item.required}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-3.5 text-xs leading-relaxed text-neutral-600">
                Longer historical windows allow the backtester to validate multiple folds and help
                calibrate prediction intervals.
              </p>
            </MotionCard>

            <MotionCard interactive={false} delay={0.05} className="p-6">
              <h2 className="font-display text-lg font-semibold text-neutral-950">
                Practical limitations
              </h2>
              <ul className="mt-4 divide-y divide-neutral-200 border-t border-neutral-200 text-sm leading-relaxed text-neutral-700">
                {LIMITATIONS_LIST.map((limit, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 py-3.5">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-teal-600"
                      aria-hidden="true"
                    />
                    <span>{limit}</span>
                  </li>
                ))}
              </ul>
            </MotionCard>

            <div className="pt-2">
              <a
                href={getHashForRoute('download')}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('download');
                }}
                className="inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-950 whitespace-nowrap shrink-0"
              >
                <span>Next: Download &amp; Contribute</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right FAQ Accordion */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-neutral-200 bg-white px-6 py-6 sm:px-8">
              <h2 className="font-display text-xl font-semibold text-neutral-950 sm:text-2xl">
                Frequently asked questions
              </h2>
              <div className="mt-4 divide-y divide-neutral-200 border-t border-neutral-200">
                {FAQ_ITEMS.map((item, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div key={item.question}>
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        aria-expanded={isOpen}
                        className="flex min-h-[60px] w-full items-center justify-between gap-4 py-4 text-left font-display text-base font-semibold text-neutral-950 transition-colors hover:text-teal-700 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-teal-600"
                      >
                        <span>{item.question}</span>
                        <ChevronDown
                          className={`h-5 w-5 shrink-0 text-neutral-400 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-teal-700' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.18 }}
                          className="pb-5 text-sm leading-relaxed text-neutral-600 sm:text-base"
                        >
                          {item.answer}
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
