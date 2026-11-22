import { useMemo, useState } from 'react';
import { ArrowRight, Search, Sliders } from 'lucide-react';
import { motion } from 'motion/react';
import { CodeBlock } from '../components/CodeBlock';
import { MotionCard } from '../components/MotionCard';
import { INPUT_PARAMETERS } from '../data/toolkitData';
import { getHashForRoute, type PageRoute } from '../router';

interface ParametersPageProps {
  onNavigate: (route: PageRoute) => void;
}

const SAMPLE_YAML_CONFIG = `data_path: my_sales.csv
date_col: order_date
target_col: demand
id_cols: [store, sku]
horizon: 28
freq: auto
aggregation: sum
fill_missing: zero
quantiles: [0.1, 0.5, 0.9]
normalize: true
output_dir: outputs`;

export function ParametersPage({ onNavigate }: ParametersPageProps) {
  const [paramQuery, setParamQuery] = useState('');

  const filteredParameters = useMemo(() => {
    const q = paramQuery.trim().toLowerCase();
    if (!q) return INPUT_PARAMETERS;
    return INPUT_PARAMETERS.filter(
      (row) =>
        row.parameter.toLowerCase().includes(q) ||
        row.meaning.toLowerCase().includes(q) ||
        row.defaultValue.toLowerCase().includes(q)
    );
  }, [paramQuery]);

  return (
    <div className="bg-[#F8FAFB] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          {/* Left Scrolling Parameter Overview Column */}
          <div className="space-y-6 lg:col-span-5">
            <div>
              <p className="font-mono text-xs font-medium text-teal-700">CONFIGURATION</p>
              <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-balance text-neutral-950 sm:text-4xl lg:text-5xl">
                Input parameters
              </h1>
              <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
                The same parameters work in the YAML file, the command line, and the dashboard.
              </p>
            </div>

            <MotionCard interactive={false} className="p-6">
              <div className="flex items-center gap-2">
                <Sliders className="h-4 w-4 text-teal-700" aria-hidden="true" />
                <p className="font-mono text-xs font-semibold text-neutral-500">
                  SEARCH CONFIGURATION KEYS
                </p>
              </div>
              <div className="mt-3">
                <label htmlFor="param-search" className="sr-only">
                  Filter parameters
                </label>
                <div className="relative">
                  <Search
                    className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-neutral-400"
                    aria-hidden="true"
                  />
                  <input
                    id="param-search"
                    type="search"
                    value={paramQuery}
                    onChange={(e) => setParamQuery(e.target.value)}
                    placeholder="Filter e.g. horizon, dayfirst..."
                    className="min-h-[44px] w-full rounded-xl border border-neutral-200 bg-[#F8FAFB] pr-3.5 pl-10 text-sm text-neutral-950 placeholder:text-neutral-400 focus:border-teal-600 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>
              <p className="mt-3 text-xs text-neutral-500 tabular-nums">
                Showing {filteredParameters.length} of {INPUT_PARAMETERS.length} parameters
              </p>

              <div className="mt-5 grid grid-cols-3 gap-2 border-t border-neutral-200 pt-4 text-center font-mono text-xs font-medium text-neutral-700">
                <div className="rounded-lg border border-neutral-200 bg-[#F8FAFB] py-2">
                  config.yaml
                </div>
                <div className="rounded-lg border border-neutral-200 bg-[#F8FAFB] py-2">
                  --cli-flags
                </div>
                <div className="rounded-lg border border-neutral-200 bg-[#F8FAFB] py-2">
                  Streamlit
                </div>
              </div>
            </MotionCard>

            <MotionCard interactive={false} delay={0.05} className="p-6">
              <p className="font-mono text-xs font-semibold text-neutral-500">
                EXAMPLE YAML CONFIG
              </p>
              <p className="mt-2 text-sm text-neutral-600">
                Save recurring project settings in a YAML file and invoke{' '}
                <code className="font-mono text-xs text-neutral-900">--config config.yaml</code>.
              </p>
              <div className="mt-3">
                <CodeBlock label="config.yaml" language="yaml" code={SAMPLE_YAML_CONFIG} />
              </div>
            </MotionCard>

            <div className="pt-2">
              <a
                href={getHashForRoute('outputs')}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('outputs');
                }}
                className="inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-950 whitespace-nowrap shrink-0"
              >
                <span>Next: View outputs</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Parameter Reference Table */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-x-auto rounded-xl border border-neutral-200 bg-white"
            >
              <table className="w-full border-collapse text-left text-sm sm:text-base">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50">
                    <th className="px-5 py-4 font-display text-xs font-semibold tracking-wide text-neutral-600 uppercase">
                      Parameter
                    </th>
                    <th className="px-5 py-4 font-display text-xs font-semibold tracking-wide text-neutral-600 uppercase">
                      Meaning
                    </th>
                    <th className="px-5 py-4 font-display text-xs font-semibold tracking-wide text-neutral-600 uppercase">
                      Default
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 bg-white">
                  {filteredParameters.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-5 py-10 text-center text-sm text-neutral-500">
                        No parameters match &ldquo;{paramQuery}&rdquo;.
                      </td>
                    </tr>
                  ) : (
                    filteredParameters.map((row) => (
                      <tr key={row.parameter} className="transition-colors hover:bg-neutral-50/80">
                        <td className="px-5 py-4 align-top font-mono text-sm font-medium text-teal-800 whitespace-nowrap">
                          {row.parameter}
                        </td>
                        <td className="px-5 py-4 align-top text-sm leading-relaxed text-neutral-700">
                          {row.meaning}
                        </td>
                        <td className="px-5 py-4 align-top font-mono text-xs text-neutral-700 tabular-nums whitespace-nowrap">
                          {row.defaultValue}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
