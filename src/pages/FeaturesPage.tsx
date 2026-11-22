import { ArrowRight, BarChart3, Check, Database, Layers, Terminal } from 'lucide-react';
import { CodeBlock } from '../components/CodeBlock';
import { MotionCard } from '../components/MotionCard';
import { FEATURE_GROUPS } from '../data/toolkitData';
import { getHashForRoute, type PageRoute } from '../router';

interface FeaturesPageProps {
  onNavigate: (route: PageRoute) => void;
}

const GROUP_ICONS = [Database, Layers, BarChart3, Terminal];

const CADENCE_BADGES = [
  { code: 'H', label: 'Hourly' },
  { code: 'D', label: 'Daily' },
  { code: 'W', label: 'Weekly' },
  { code: 'MS', label: 'Monthly' },
  { code: 'QS', label: 'Quarterly' },
];

const SAMPLE_SCHEMA_SNIPPET = `order_date,store,sku,units,promo
2026-01-01,S01,SKU_104,48,0
2026-01-02,S01,SKU_104,52,1
2026-01-03,S02,SKU_219,31,0`;

export function FeaturesPage({ onNavigate }: FeaturesPageProps) {
  return (
    <div className="bg-[#F8FAFB] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          {/* Left Scrolling Architectural Summary Column */}
          <div className="space-y-6 lg:col-span-5">
            <div>
              <p className="font-mono text-xs font-medium text-teal-700">FEATURES</p>
              <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-balance text-neutral-950 sm:text-4xl lg:text-5xl">
                Built for practical forecasting workflows
              </h1>
              <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
                Everything needed to clean messy sales tables, engineer temporal features, and check
                whether a model outperforms simple seasonal rules.
              </p>
            </div>

            <MotionCard interactive={false} className="p-6">
              <p className="font-mono text-xs font-semibold text-neutral-500">SUPPORTED FORMATS</p>
              <div className="mt-3 grid grid-cols-3 gap-2.5 text-center font-mono text-xs font-semibold text-neutral-800">
                <div className="rounded-lg border border-neutral-200 bg-[#F8FAFB] py-3">.CSV</div>
                <div className="rounded-lg border border-neutral-200 bg-[#F8FAFB] py-3">.XLSX</div>
                <div className="rounded-lg border border-neutral-200 bg-[#F8FAFB] py-3">.PARQUET</div>
              </div>
              <p className="mt-3.5 text-sm leading-relaxed text-neutral-600">
                Map any date, target, or series identifier column directly from the CLI, YAML, or
                Streamlit UI without renaming headers first.
              </p>

              <div className="mt-5 border-t border-neutral-200 pt-5">
                <p className="font-mono text-xs font-semibold text-neutral-500">
                  AUTO-DETECTED CADENCES
                </p>
                <div className="mt-3 grid grid-cols-5 gap-2 text-center">
                  {CADENCE_BADGES.map((c) => (
                    <div
                      key={c.code}
                      className="rounded-lg border border-neutral-200 bg-[#F8FAFB] px-1.5 py-2"
                    >
                      <p className="font-mono text-xs font-bold text-teal-700">{c.code}</p>
                      <p className="mt-0.5 text-[11px] text-neutral-500">{c.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </MotionCard>

            <MotionCard interactive={false} delay={0.05} className="p-6">
              <p className="font-mono text-xs font-semibold text-neutral-500">
                EXAMPLE INPUT TABLE
              </p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                Bring long-format sales records with optional store/SKU IDs and scheduled promotion
                flags:
              </p>
              <div className="mt-3">
                <CodeBlock label="sales.csv" language="csv" code={SAMPLE_SCHEMA_SNIPPET} />
              </div>
              <ul className="mt-4 space-y-2 text-xs text-neutral-600">
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-teal-600" aria-hidden="true" />
                  <span>Handles duplicate timestamps via configurable aggregation</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-teal-600" aria-hidden="true" />
                  <span>Fills missing dates cleanly before computing rolling windows</span>
                </li>
              </ul>
            </MotionCard>

            <div className="pt-2">
              <a
                href={getHashForRoute('how-it-works')}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('how-it-works');
                }}
                className="inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-950 whitespace-nowrap shrink-0"
              >
                <span>Next: How it works</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Feature Specification Cards */}
          <div className="space-y-6 lg:col-span-7">
            {FEATURE_GROUPS.map((group, idx) => {
              const Icon = GROUP_ICONS[idx % GROUP_ICONS.length];
              return (
                <MotionCard key={group.number} delay={0.05 * idx} className="p-7 sm:p-8">
                  <div className="flex items-center gap-3.5 border-b border-neutral-200 pb-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-teal-100 bg-teal-50/70 text-teal-700">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <span className="font-mono text-xs font-medium text-teal-700">
                        GROUP {group.number}
                      </span>
                      <h2 className="font-display text-xl font-semibold text-neutral-950 sm:text-2xl">
                        {group.title}
                      </h2>
                    </div>
                  </div>
                  <p className="mt-3 text-base leading-relaxed text-neutral-600">{group.summary}</p>

                  <ul className="mt-5 grid grid-cols-1 gap-2.5 text-sm text-neutral-800 sm:text-base">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </MotionCard>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
