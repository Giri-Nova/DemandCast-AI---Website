import { useState } from 'react';
import {
  Activity,
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Code2,
  Database,
  FileSpreadsheet,
  GitBranch,
  Github,
  Layers,
  LayoutDashboard,
  LineChart,
  ShieldCheck,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { motion } from 'motion/react';
import { CodeBlock } from '../components/CodeBlock';
import { ForecastDashboardPreview } from '../components/ForecastDashboardPreview';
import { HeroForecastChart } from '../components/HeroForecastChart';
import {
  CAPABILITY_STRIP,
  DOCUMENTATION_ENTRIES,
  EVALUATION_METRIC_CARDS,
  FAQ_ITEMS,
  GITHUB_REPO_PLACEHOLDER,
  MODEL_COMPARISON_ROWS,
  PROBLEM_SOLUTION_STAGES,
  PROCESS_STEPS,
  PRODUCT_FEATURES,
  QUICK_START_HERO_CMD,
} from '../data/toolkitData';
import { getHashForRoute, type PageRoute } from '../router';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenRepoModal: () => void;
}

const CAPABILITY_ICONS = [
  FileSpreadsheet,
  ShieldCheck,
  Activity,
  Code2,
  Terminal,
  LayoutDashboard,
];

const FEATURE_ICONS = [
  Database,
  Layers,
  BarChart3,
  ShieldCheck,
  LineChart,
  Terminal,
];

const DOC_ICONS = [
  Sparkles,
  GitBranch,
  Terminal,
  Code2,
  BarChart3,
  BookOpen,
];

export function HomePage({ onNavigate, onOpenRepoModal }: HomePageProps) {
  const [activePipelineIdx, setActivePipelineIdx] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const activeStage = PROBLEM_SOLUTION_STAGES[activePipelineIdx];

  return (
    <div className="bg-[#F8FAFB]">
      {/* 1. HERO SECTION */}
      <section className="border-b border-neutral-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 sm:pb-20 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="font-mono text-xs font-medium tracking-wide text-teal-700">
                DEMANDCAST AI <span aria-hidden="true">·</span> INTELLIGENT DEMAND FORECASTING
              </p>

              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 font-display text-[clamp(2.5rem,4.5vw,3.85rem)] leading-[1.08] font-bold tracking-tight text-balance text-neutral-950"
              >
                Forecast demand.
                <br />
                Plan inventory smarter.
              </motion.h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-600 sm:text-lg">
                DemandCast AI is an open-source demand forecasting toolkit that turns historical
                sales data into reliable forecasts, prediction intervals, and actionable insights.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <a
                  href={getHashForRoute('get-started')}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('get-started');
                  }}
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-teal-700 px-6 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 whitespace-nowrap shrink-0"
                >
                  <span>Get Started</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={onOpenRepoModal}
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-xl border border-neutral-300 bg-white px-6 py-2.5 text-sm font-semibold text-neutral-900 transition-colors hover:border-neutral-950 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 whitespace-nowrap shrink-0"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  <span>View on GitHub</span>
                </button>
              </div>

              <p className="mt-8 font-mono text-xs text-neutral-500">
                Open Source <span aria-hidden="true">·</span> Python{' '}
                <span aria-hidden="true">·</span> Machine Learning{' '}
                <span aria-hidden="true">·</span> Time-Series Forecasting
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6"
            >
              <HeroForecastChart />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. TRUST / CAPABILITY STRIP */}
      <section className="border-b border-neutral-200/80 bg-[#F8FAFB]">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {CAPABILITY_STRIP.map((item, idx) => {
              const Icon = CAPABILITY_ICONS[idx % CAPABILITY_ICONS.length];
              return (
                <div
                  key={item.id}
                  className="flex items-start gap-3 rounded-xl border border-neutral-200/80 bg-white p-3.5"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-neutral-950">{item.title}</p>
                    <p className="mt-0.5 text-xs text-neutral-500">{item.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. PROBLEM -> SOLUTION PIPELINE */}
      <section className="border-b border-neutral-200/80 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-medium text-teal-700">END-TO-END WORKFLOW</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-balance text-neutral-950 sm:text-4xl">
              From raw sales data to actionable forecasts.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-neutral-600">
              Select any stage in the pipeline to inspect how messy order exports become evaluated
              multi-horizon forecasts.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-2">
            {PROBLEM_SOLUTION_STAGES.map((stage, idx) => {
              const isSelected = activePipelineIdx === idx;
              return (
                <div key={stage.id} className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActivePipelineIdx(idx)}
                    className={`min-h-[42px] rounded-xl border px-4 py-2 text-left text-xs font-semibold transition-all duration-150 ${
                      isSelected
                        ? 'border-teal-600 bg-teal-700 text-white shadow-xs'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-800 hover:border-neutral-300 hover:bg-white'
                    }`}
                  >
                    {stage.label}
                  </button>
                  {idx < PROBLEM_SOLUTION_STAGES.length - 1 && (
                    <ArrowRight
                      className="hidden h-4 w-4 shrink-0 text-neutral-400 sm:block"
                      aria-hidden="true"
                    />
                  )}
                </div>
              );
            })}
          </div>

          <motion.div
            key={activeStage.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-6 grid grid-cols-1 items-center gap-6 rounded-xl border border-neutral-200 bg-[#F8FAFB] p-6 sm:grid-cols-12"
          >
            <div className="sm:col-span-8">
              <p className="font-mono text-xs font-medium text-teal-700">
                STAGE 0{activePipelineIdx + 1} · {activeStage.role.toUpperCase()}
              </p>
              <h3 className="mt-1 font-display text-xl font-semibold text-neutral-950">
                {activeStage.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600 sm:text-base">
                {activeStage.detail}
              </p>
            </div>
            <div className="sm:col-span-4 sm:text-right">
              <p className="text-xs text-neutral-500">Pipeline artifact</p>
              <p className="mt-1 inline-block rounded-lg border border-neutral-200 bg-white px-3 py-1.5 font-mono text-xs font-medium text-sky-700">
                {activeStage.artifact}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. FEATURES SECTION */}
      <section className="border-b border-neutral-200/80 bg-[#F8FAFB] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="font-mono text-xs font-medium text-teal-700">CAPABILITIES</p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-balance text-neutral-950 sm:text-4xl">
                Built for trustworthy demand forecasting
              </h2>
            </div>
            <a
              href={getHashForRoute('features')}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('features');
              }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-neutral-950"
            >
              <span>All features</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PRODUCT_FEATURES.map((feature, idx) => {
              const Icon = FEATURE_ICONS[idx % FEATURE_ICONS.length];
              return (
                <motion.article
                  key={feature.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  whileHover={{ y: -3 }}
                  className="flex flex-col justify-between rounded-xl border border-neutral-200 bg-white p-6 transition-shadow duration-200 hover:border-neutral-300 hover:shadow-sm"
                >
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-teal-100 bg-teal-50/70 text-teal-700">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold text-neutral-950">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                      {feature.description}
                    </p>
                  </div>
                  <p className="mt-5 border-t border-neutral-100 pt-3 font-mono text-xs text-sky-700">
                    {feature.highlight}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS (5-STEP HORIZONTAL / VERTICAL PROCESS) */}
      <section className="border-b border-neutral-200/80 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="font-mono text-xs font-medium text-teal-700">ARCHITECTURE</p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-balance text-neutral-950 sm:text-4xl">
                How it works
              </h2>
            </div>
            <a
              href={getHashForRoute('how-it-works')}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('how-it-works');
              }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-neutral-950"
            >
              <span>Explore workflow</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="relative mt-12">
            <div
              className="absolute top-6 right-12 left-12 hidden h-px bg-neutral-200 lg:block"
              aria-hidden="true"
            />
            <ol className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
              {PROCESS_STEPS.map((item, idx) => (
                <motion.li
                  key={item.step}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="relative flex flex-col rounded-xl border border-neutral-200 bg-white p-5 lg:border-0 lg:bg-transparent lg:p-0"
                >
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl border border-neutral-200 bg-white font-mono text-sm font-semibold text-teal-700 tabular-nums shadow-2xs">
                    {item.step}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-neutral-950">
                    {item.step} — {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                    {item.description}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 6. MODEL PERFORMANCE SECTION */}
      <section className="border-b border-neutral-200/80 bg-[#F8FAFB] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-medium text-teal-700">MODEL EVALUATION</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-balance text-neutral-950 sm:text-4xl">
              Evaluated on chronological backtest splits
            </h2>
            <p className="mt-3 text-base leading-relaxed text-neutral-600">
              Backtest results from the project evaluation suite comparing gradient-boosted trees
              against Random Forest and Seasonal Naive baselines.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Metric Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1">
              {EVALUATION_METRIC_CARDS.map((metric) => (
                <div
                  key={metric.label}
                  className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-6 py-5"
                >
                  <div>
                    <p className="font-mono text-xs font-semibold tracking-wide text-neutral-500">
                      {metric.label}
                    </p>
                    <p className="mt-1 text-xs text-neutral-500">{metric.caption}</p>
                  </div>
                  <p className="font-mono text-3xl font-bold text-neutral-950 tabular-nums">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Model Comparison Chart */}
            <div className="rounded-xl border border-neutral-200 bg-white p-6 sm:p-8 lg:col-span-7">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 pb-4">
                <div>
                  <h3 className="font-display text-lg font-semibold text-neutral-950">
                    Model comparison (lower error is better)
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Best-performing model highlighted in teal
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-teal-700">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  Best: XGBoost (9.71% WAPE)
                </span>
              </div>

              <div className="mt-6 space-y-5">
                {MODEL_COMPARISON_ROWS.map((row) => (
                  <div key={row.model}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span
                        className={`font-display text-sm font-semibold ${
                          row.isBest ? 'text-teal-700' : 'text-neutral-800'
                        }`}
                      >
                        {row.model}
                      </span>
                      <span className="font-mono text-xs font-medium text-neutral-600 tabular-nums">
                        {row.wapeLabel}
                      </span>
                    </div>
                    <div className="mt-2 h-3 w-full overflow-hidden rounded-md bg-neutral-100">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${row.relativeBarWidth}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                        className={`h-full rounded-md ${
                          row.isBest ? 'bg-teal-600' : 'bg-slate-400'
                        }`}
                      />
                    </div>
                    <p className="mt-1.5 text-xs text-neutral-500">{row.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FORECAST DASHBOARD PREVIEW */}
      <section className="border-b border-neutral-200/80 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-medium text-teal-700">INTERACTIVE WORKBENCH</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-balance text-neutral-950 sm:text-4xl">
              Forecast dashboard preview
            </h2>
            <p className="mt-3 text-base leading-relaxed text-neutral-600">
              Switch SKUs, models, and forecast horizons to inspect predicted unit demand and
              uncertainty ranges—mirroring the bundled Streamlit experience.
            </p>
          </div>

          <div className="mt-10">
            <ForecastDashboardPreview />
          </div>
        </div>
      </section>

      {/* 8. COMPACT DOCUMENTATION NAVIGATION */}
      <section className="border-b border-neutral-200/80 bg-[#F8FAFB] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-medium text-teal-700">REFERENCE</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-balance text-neutral-950 sm:text-4xl">
              Documentation
            </h2>
            <p className="mt-3 text-base text-neutral-600">
              Jump directly to detailed guides, parameter references, and output schemas.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {DOCUMENTATION_ENTRIES.map((doc, idx) => {
              const Icon = DOC_ICONS[idx % DOC_ICONS.length];
              return (
                <a
                  key={doc.route}
                  href={getHashForRoute(doc.route)}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(doc.route);
                  }}
                  className="group flex items-center justify-between gap-4 rounded-xl border border-neutral-200 bg-white px-5 py-4 transition-all duration-150 hover:border-teal-600/60 hover:shadow-xs"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-700 transition-colors group-hover:bg-teal-50 group-hover:text-teal-700">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-display text-sm font-semibold text-neutral-950">
                        <span className="font-mono text-teal-700 tabular-nums">{doc.number}</span> —{' '}
                        {doc.title}
                      </p>
                      <p className="mt-0.5 text-xs text-neutral-500">{doc.subtitle}</p>
                    </div>
                  </div>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:text-teal-700"
                    aria-hidden="true"
                  />
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. QUICK START DEVELOPER SECTION */}
      <section className="border-b border-neutral-200/80 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="font-mono text-xs font-medium text-teal-700">CLI &amp; PYTHON API</p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-balance text-neutral-950 sm:text-4xl">
                Start forecasting in minutes.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-neutral-600">
                Point the training CLI at your sales CSV, specify your date and target columns, and
                generate backtest reports and future prediction intervals automatically.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={getHashForRoute('get-started')}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('get-started');
                  }}
                  className="inline-flex min-h-[42px] items-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition-colors hover:border-neutral-950 hover:bg-neutral-50"
                >
                  <span>View documentation</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <CodeBlock
                label="Quick start CLI"
                language="bash"
                buttonText="Copy command"
                code={QUICK_START_HERO_CMD}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 10. OPEN SOURCE / GITHUB SECTION */}
      <section className="border-b border-neutral-200/80 bg-[#F8FAFB] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-neutral-200 bg-white p-8 sm:p-10">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="font-mono text-xs font-medium text-teal-700">OPEN SOURCE</p>
                <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-balance text-neutral-950 sm:text-4xl">
                  Built for developers. Open to everyone.
                </h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-neutral-600">
                  Inspect every feature transformation, run the pytest suite locally, or adapt the
                  YAML pipeline for your own retail, e-commerce, or academic datasets.
                </p>
                <p className="mt-4 font-mono text-xs text-neutral-500">
                  Python <span aria-hidden="true">·</span> Open-Source License (MIT placeholder){' '}
                  <span aria-hidden="true">·</span> Repo: {GITHUB_REPO_PLACEHOLDER}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 lg:col-span-5 lg:justify-end">
                <button
                  type="button"
                  onClick={onOpenRepoModal}
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-700 whitespace-nowrap shrink-0"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  <span>GitHub Repository</span>
                </button>
                <a
                  href={getHashForRoute('download')}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('download');
                  }}
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-xl border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 transition-colors hover:border-neutral-950 whitespace-nowrap shrink-0"
                >
                  <span>Contribute &amp; Tests</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQ ACCORDION */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="font-mono text-xs font-medium text-teal-700">QUESTIONS</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
              Frequently asked questions
            </h2>
          </div>

          <div className="mt-10 divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-white px-6">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={item.question}>
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
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
      </section>
    </div>
  );
}
