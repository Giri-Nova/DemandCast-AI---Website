import { ArrowRight, CheckCircle2, FileText, FolderOutput } from 'lucide-react';
import { CodeBlock } from '../components/CodeBlock';
import { MotionCard } from '../components/MotionCard';
import {
  EVALUATION_METRIC_CARDS,
  MODEL_COMPARISON_ROWS,
  OUTPUT_FILES,
} from '../data/toolkitData';
import { getHashForRoute, type PageRoute } from '../router';

interface OutputsPageProps {
  onNavigate: (route: PageRoute) => void;
}

const FORECAST_CSV_PREVIEW = `date,store,sku,forecast,q10,q90
2026-11-01,S01,SKU_104,51.4,43.2,59.8
2026-11-02,S01,SKU_104,53.9,45.1,62.4
2026-11-03,S01,SKU_104,56.2,46.8,65.7`;

export function OutputsPage({ onNavigate }: OutputsPageProps) {
  return (
    <div className="bg-[#F8FAFB] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          {/* Left Scrolling Evaluation & Sample Export Column */}
          <div className="space-y-6 lg:col-span-5">
            <div>
              <p className="font-mono text-xs font-medium text-teal-700">
                ARTIFACTS &amp; EVALUATION
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-balance text-neutral-950 sm:text-4xl lg:text-5xl">
                Outputs
              </h1>
              <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
                Every run writes structured CSV forecasts, evaluation tables, diagnostic plots, the
                resolved YAML configuration, and a reusable model file to{' '}
                <code className="font-mono text-sm text-neutral-950 sm:text-base">outputs/</code>.
              </p>
            </div>

            <MotionCard interactive={false} className="p-6">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                <h2 className="font-display text-lg font-semibold text-neutral-950">
                  Evaluation summary
                </h2>
                <span className="inline-flex items-center gap-1 font-mono text-xs font-medium text-teal-700">
                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                  XGBoost Best
                </span>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {EVALUATION_METRIC_CARDS.map((card) => (
                  <div
                    key={card.label}
                    className="rounded-lg border border-neutral-200 bg-[#F8FAFB] p-3"
                  >
                    <p className="font-mono text-[11px] font-medium text-neutral-500">
                      {card.label}
                    </p>
                    <p className="mt-1 font-mono text-lg font-bold text-neutral-950 tabular-nums">
                      {card.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-4">
                {MODEL_COMPARISON_ROWS.map((row) => (
                  <div key={row.model}>
                    <div className="flex items-baseline justify-between text-xs">
                      <span
                        className={`font-semibold ${
                          row.isBest ? 'text-teal-700' : 'text-neutral-800'
                        }`}
                      >
                        {row.model}
                      </span>
                      <span className="font-mono text-neutral-500 tabular-nums">
                        {row.wapeLabel}
                      </span>
                    </div>
                    <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-md bg-neutral-100">
                      <div
                        className={`h-full rounded-md ${
                          row.isBest ? 'bg-teal-600' : 'bg-slate-400'
                        }`}
                        style={{ width: `${row.relativeBarWidth}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </MotionCard>

            <MotionCard interactive={false} delay={0.05} className="p-6">
              <p className="font-mono text-xs font-semibold text-neutral-500">
                SAMPLE FORECAST.CSV SCHEMA
              </p>
              <p className="mt-2 text-sm text-neutral-600">
                Point forecasts paired with lower and upper prediction interval bounds:
              </p>
              <div className="mt-3">
                <CodeBlock label="outputs/forecast.csv" language="csv" code={FORECAST_CSV_PREVIEW} />
              </div>
            </MotionCard>

            <div className="pt-2">
              <a
                href={getHashForRoute('limits-faq')}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('limits-faq');
                }}
                className="inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-950 whitespace-nowrap shrink-0"
              >
                <span>Next: Limits &amp; FAQ</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Artifact Manifest */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
              <div className="flex items-center gap-2.5 border-b border-neutral-200 bg-neutral-50 px-6 py-4">
                <FolderOutput className="h-5 w-5 text-teal-600" aria-hidden="true" />
                <span className="font-mono text-sm font-semibold text-neutral-950">outputs/</span>
              </div>
              <ul className="divide-y divide-neutral-200">
                {OUTPUT_FILES.map((artifact) => (
                  <li
                    key={artifact.file}
                    className="px-6 py-5 transition-colors hover:bg-neutral-50/70"
                  >
                    <div className="flex items-start gap-3.5">
                      <FileText
                        className="mt-1 h-4 w-4 shrink-0 text-neutral-400"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="font-mono text-sm font-semibold text-neutral-950">
                          {artifact.file}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-neutral-600 sm:text-base">
                          {artifact.purpose}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
