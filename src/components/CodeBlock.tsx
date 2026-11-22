import { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  label?: string;
  buttonText?: string;
  className?: string;
}

function renderHighlightedLine(line: string, language: string) {
  const trimmed = line.trimStart();
  if (trimmed.startsWith('#')) {
    return <span className="text-neutral-400">{line}</span>;
  }

  if (language === 'bash') {
    const tokens = line.split(/(\s+)/);
    return tokens.map((token, idx) => {
      if (token.startsWith('--')) {
        return (
          <span key={idx} className="font-medium text-sky-700">
            {token}
          </span>
        );
      }
      if (token === 'python' || token === 'pip' || token === 'streamlit' || token === 'git') {
        return (
          <span key={idx} className="font-semibold text-teal-700">
            {token}
          </span>
        );
      }
      if (token.endsWith('.csv') || token.endsWith('.yaml') || token.endsWith('.joblib') || token.endsWith('.py')) {
        return (
          <span key={idx} className="text-neutral-950 underline decoration-neutral-300 underline-offset-4">
            {token}
          </span>
        );
      }
      return <span key={idx}>{token}</span>;
    });
  }

  if (language === 'python') {
    const keywords = new Set(['from', 'import', 'print']);
    const tokens = line.split(/(\b[a-zA-Z_]+\b|"[^"]*")/g);
    return tokens.map((token, idx) => {
      if (keywords.has(token)) {
        return (
          <span key={idx} className="font-semibold text-teal-700">
            {token}
          </span>
        );
      }
      if (token.startsWith('"') && token.endsWith('"')) {
        return (
          <span key={idx} className="text-sky-700">
            {token}
          </span>
        );
      }
      return <span key={idx}>{token}</span>;
    });
  }

  return line;
}

export function CodeBlock({
  code,
  language = 'bash',
  label,
  buttonText = 'Copy',
  className = '',
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = code;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  };

  const lines = code.split('\n');

  return (
    <div
      className={`overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)] ${className}`}
    >
      <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50/90 px-4 py-2.5">
        <span className="inline-flex items-center gap-2 font-mono text-xs font-medium text-neutral-600">
          <Terminal className="h-3.5 w-3.5 text-teal-600" aria-hidden="true" />
          {label || language}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? 'Copied to clipboard' : 'Copy code to clipboard'}
          className="inline-flex min-h-[34px] items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-700 transition-colors hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 whitespace-nowrap shrink-0"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-teal-600" aria-hidden="true" />
              <span className="text-teal-700">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{buttonText}</span>
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto bg-neutral-50/40 p-4 text-[13.5px] leading-relaxed text-neutral-900">
        <code className="font-mono">
          {lines.map((line, idx) => (
            <div key={idx} className="whitespace-pre">
              {renderHighlightedLine(line, language)}
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
