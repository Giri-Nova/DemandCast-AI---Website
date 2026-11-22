import { useState } from 'react';
import { ArrowRight, Check, FolderTree } from 'lucide-react';
import { CodeBlock } from '../components/CodeBlock';
import { MotionCard } from '../components/MotionCard';
import { QUICK_START_BLOCKS } from '../data/toolkitData';
import { getHashForRoute, type PageRoute } from '../router';

interface GetStartedPageProps {
  onNavigate: (route: PageRoute) => void;
}

const PROJECT_LAYOUT = `demandcast/
├── app/streamlit_app.py
├── src/
│   ├── config.py
│   ├── io.py
│   ├── pipeline.py
│   ├── sample_data.py
│   ├── train.py
│   └── predict.py
├── config.yaml
└── requirements.txt`;

export function GetStartedPage({ onNavigate }: GetStartedPageProps) {
  const [activeBlockId, setActiveBlockId] = useState<string>(QUICK_START_BLOCKS[0].id);

  const scrollToBlock = (id: string) => {
    setActiveBlockId(id);
    const el = document.getElementById(`doc-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-[#F8FAFB] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          {/* Left Scrolling Documentation Rail */}
          <div className="space-y-6 lg:col-span-5">
            <div>
              <p className="font-mono text-xs font-medium text-teal-700">DOCUMENTATION</p>
              <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-balance text-neutral-950 sm:text-4xl lg:text-5xl">
                Get started
              </h1>
              <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
                Run the bundled synthetic example in minutes, point the CLI at your own sales file,
                open the Streamlit dashboard, or call the Python API directly.
              </p>
            </div>

            <MotionCard interactive={false} className="p-4">
              <p className="px-2 pb-2 font-mono text-xs font-semibold text-neutral-500">
                SETUP SECTIONS
              </p>
              <nav aria-label="Setup steps" className="space-y-1">
                {QUICK_START_BLOCKS.map((block) => {
                  const isActive = activeBlockId === block.id;
                  return (
                    <button
                      key={block.id}
                      type="button"
                      onClick={() => scrollToBlock(block.id)}
                      className={`flex min-h-[40px] w-full items-center rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-teal-700 text-white'
                          : 'text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950'
                      }`}
                    >
                      <span>{block.title}</span>
                    </button>
                  );
                })}
              </nav>
            </MotionCard>

            <MotionCard interactive={false} delay={0.05} className="p-6">
              <div className="flex items-center gap-2">
                <FolderTree className="h-4 w-4 text-teal-700" aria-hidden="true" />
                <p className="font-mono text-xs font-semibold text-neutral-500">
                  REPOSITORY STRUCTURE
                </p>
              </div>
              <pre className="mt-3 overflow-x-auto rounded-lg border border-neutral-200 bg-[#F8FAFB] p-4 font-mono text-xs leading-relaxed text-neutral-800">
                <code>{PROJECT_LAYOUT}</code>
              </pre>
              <ul className="mt-4 space-y-2 text-xs text-neutral-600">
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-teal-600" aria-hidden="true" />
                  <span>Runs locally in a standard Python virtual environment</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-teal-600" aria-hidden="true" />
                  <span>No external database or cloud API keys required</span>
                </li>
              </ul>
            </MotionCard>

            <div className="pt-2">
              <a
                href={getHashForRoute('parameters')}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('parameters');
                }}
                className="inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-950 whitespace-nowrap shrink-0"
              >
                <span>Next: Input parameters</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Documentation Blocks */}
          <div className="space-y-6 lg:col-span-7">
            {QUICK_START_BLOCKS.map((block, idx) => (
              <MotionCard
                key={block.id}
                delay={0.04 * idx}
                interactive={false}
                className="scroll-mt-24 p-6 sm:p-7"
              >
                <div id={`doc-${block.id}`}>
                  <h2 className="font-display text-xl font-semibold text-neutral-950">
                    {block.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600 sm:text-base">
                    {block.description}
                  </p>
                  <div className="mt-4">
                    <CodeBlock language={block.language} label={block.language} code={block.code} />
                  </div>
                </div>
              </MotionCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
