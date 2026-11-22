import { useMemo, useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { FORECAST_SERIES_DATA } from '../data/toolkitData';

type ModelChoice = 'XGBoost' | 'LightGBM' | 'Random Forest' | 'Seasonal Naive';
type HorizonChoice = 14 | 28 | 56;

const MODEL_MULTIPLIERS: Record<ModelChoice, { scale: number; band: number; badge: string }> = {
  XGBoost: { scale: 1.0, band: 1.0, badge: 'Lowest validation error' },
  LightGBM: { scale: 0.99, band: 1.02, badge: 'Fast gradient boosting' },
  'Random Forest': { scale: 0.96, band: 1.18, badge: 'Bagged tree ensemble' },
  'Seasonal Naive': { scale: 0.92, band: 1.35, badge: 'Prior-cycle baseline' },
};

export function ForecastDashboardPreview() {
  const [selectedSku, setSelectedSku] = useState(FORECAST_SERIES_DATA[0].id);
  const [selectedModel, setSelectedModel] = useState<ModelChoice>('XGBoost');
  const [horizon, setHorizon] = useState<HorizonChoice>(28);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const baseSeries = useMemo(
    () => FORECAST_SERIES_DATA.find((s) => s.id === selectedSku) ?? FORECAST_SERIES_DATA[0],
    [selectedSku]
  );

  const modelProfile = MODEL_MULTIPLIERS[selectedModel];
  const horizonMultiplier = horizon === 14 ? 0.52 : horizon === 56 ? 1.95 : 1.0;

  const adjustedForecast = useMemo(
    () => baseSeries.forecast.map((v) => Math.round(v * modelProfile.scale)),
    [baseSeries, modelProfile]
  );

  const adjustedLower = useMemo(
    () =>
      adjustedForecast.map((v, idx) => {
        const halfWidth = (baseSeries.forecast[idx] - baseSeries.lower[idx]) * modelProfile.band;
        return Math.max(0, Math.round(v - halfWidth * (horizon === 56 ? 1.25 : 1)));
      }),
    [adjustedForecast, baseSeries, modelProfile, horizon]
  );

  const adjustedUpper = useMemo(
    () =>
      adjustedForecast.map((v, idx) => {
        const halfWidth = (baseSeries.upper[idx] - baseSeries.forecast[idx]) * modelProfile.band;
        return Math.round(v + halfWidth * (horizon === 56 ? 1.25 : 1));
      }),
    [adjustedForecast, baseSeries, modelProfile, horizon]
  );

  const projectedSum = useMemo(() => {
    const baseNum = parseInt(baseSeries.forecastTotal.replace(/[^0-9]/g, ''), 10) || 1392;
    return Math.round(baseNum * modelProfile.scale * horizonMultiplier).toLocaleString();
  }, [baseSeries, modelProfile, horizonMultiplier]);

  const avgDaily = useMemo(() => {
    const sum = adjustedForecast.reduce((acc, v) => acc + v, 0);
    return (sum / adjustedForecast.length).toFixed(1);
  }, [adjustedForecast]);

  const avgBandWidth = useMemo(() => {
    const sum = adjustedUpper.reduce((acc, u, idx) => acc + (u - adjustedLower[idx]), 0);
    return (sum / adjustedUpper.length).toFixed(1);
  }, [adjustedUpper, adjustedLower]);

  const width = 880;
  const height = 280;
  const padLeft = 48;
  const padRight = 24;
  const padTop = 26;
  const padBottom = 36;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const totalPoints = baseSeries.history.length + adjustedForecast.length;
  const allVals = [
    ...baseSeries.history,
    ...adjustedLower,
    ...adjustedUpper,
    ...baseSeries.baseline,
  ];
  const minY = Math.max(0, Math.floor(Math.min(...allVals) / 10) * 10 - 5);
  const maxY = Math.ceil(Math.max(...allVals) / 10) * 10 + 5;

  const xFor = (idx: number) => padLeft + (idx / (totalPoints - 1)) * plotW;
  const yFor = (val: number) => padTop + (1 - (val - minY) / (maxY - minY)) * plotH;

  const splitIdx = baseSeries.history.length - 1;
  const splitX = xFor(splitIdx);

  const historyPath = baseSeries.history
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${xFor(i).toFixed(1)} ${yFor(v).toFixed(1)}`)
    .join(' ');

  const forecastPath = [baseSeries.history[splitIdx], ...adjustedForecast]
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${xFor(splitIdx + i).toFixed(1)} ${yFor(v).toFixed(1)}`)
    .join(' ');

  const baselinePath = [baseSeries.history[splitIdx], ...baseSeries.baseline]
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${xFor(splitIdx + i).toFixed(1)} ${yFor(v).toFixed(1)}`)
    .join(' ');

  const upperBand = [baseSeries.history[splitIdx], ...adjustedUpper].map(
    (v, i) => `${xFor(splitIdx + i).toFixed(1)},${yFor(v).toFixed(1)}`
  );
  const lowerBand = [baseSeries.history[splitIdx], ...adjustedLower]
    .map((v, i) => `${xFor(splitIdx + i).toFixed(1)},${yFor(v).toFixed(1)}`)
    .reverse();
  const bandPoly = [...upperBand, ...lowerBand].join(' ');

  const yTicks = [minY, Math.round((minY + maxY) / 2), maxY];
  const xTicks = [0, 6, 13, 20, 27];

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_14px_40px_-18px_rgba(15,23,42,0.12)]">
      {/* Workbench Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 bg-neutral-50/70 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <SlidersHorizontal className="h-4 w-4 text-teal-700" aria-hidden="true" />
          <span className="font-display text-sm font-semibold text-neutral-950">
            Forecast Workbench Preview
          </span>
          <span className="text-xs text-neutral-500">· {modelProfile.badge}</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label htmlFor="dash-sku" className="text-xs font-medium text-neutral-600">
              SKU
            </label>
            <select
              id="dash-sku"
              value={selectedSku}
              onChange={(e) => setSelectedSku(e.target.value)}
              className="min-h-[36px] rounded-lg border border-neutral-200 bg-white px-2.5 py-1 text-xs font-medium text-neutral-900 focus:border-teal-600 focus:outline-none"
            >
              {FORECAST_SERIES_DATA.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="dash-model" className="text-xs font-medium text-neutral-600">
              Model
            </label>
            <select
              id="dash-model"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value as ModelChoice)}
              className="min-h-[36px] rounded-lg border border-neutral-200 bg-white px-2.5 py-1 text-xs font-medium text-neutral-900 focus:border-teal-600 focus:outline-none"
            >
              {(['XGBoost', 'LightGBM', 'Random Forest', 'Seasonal Naive'] as ModelChoice[]).map(
                (m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                )
              )}
            </select>
          </div>

          <div
            role="group"
            aria-label="Forecast horizon"
            className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-white p-0.5"
          >
            {([14, 28, 56] as HorizonChoice[]).map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => setHorizon(h)}
                className={`min-h-[30px] rounded-md px-2.5 text-xs font-medium tabular-nums transition-colors ${
                  horizon === h
                    ? 'bg-neutral-950 text-white'
                    : 'text-neutral-600 hover:text-neutral-950'
                }`}
              >
                {h}d
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 divide-y divide-neutral-200 border-b border-neutral-200 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
        <div className="p-4 sm:px-6">
          <p className="text-xs font-medium text-neutral-500">Projected Demand ({horizon}d)</p>
          <p className="mt-1 font-mono text-xl font-semibold text-neutral-950 tabular-nums">
            {projectedSum} units
          </p>
        </div>
        <div className="p-4 sm:px-6">
          <p className="text-xs font-medium text-neutral-500">Mean Daily Forecast</p>
          <p className="mt-1 font-mono text-xl font-semibold text-teal-700 tabular-nums">
            {avgDaily} / day
          </p>
        </div>
        <div className="p-4 sm:px-6">
          <p className="text-xs font-medium text-neutral-500">Mean Interval Span</p>
          <p className="mt-1 font-mono text-xl font-semibold text-sky-700 tabular-nums">
            ±{(Number(avgBandWidth) / 2).toFixed(1)} units
          </p>
        </div>
        <div className="p-4 sm:px-6">
          <p className="text-xs font-medium text-neutral-500">Selected Model</p>
          <p className="mt-1 font-display text-lg font-semibold text-neutral-950">
            {selectedModel}
          </p>
        </div>
      </div>

      {/* Main Analytics Plot */}
      <div className="relative p-5 sm:p-6">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={`Dashboard preview chart for ${baseSeries.label} using ${selectedModel}`}
          className="h-auto w-full overflow-visible select-none"
          onMouseLeave={() => setHoverIdx(null)}
        >
          <rect
            x={splitX}
            y={padTop}
            width={width - padRight - splitX}
            height={plotH}
            fill="rgba(13, 148, 136, 0.04)"
          />

          {yTicks.map((tick) => {
            const y = yFor(tick);
            return (
              <g key={tick}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={width - padRight}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeDasharray="3 3"
                />
                <text
                  x={padLeft - 8}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-neutral-500 font-mono text-[11px] tabular-nums"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          <line
            x1={splitX}
            y1={padTop}
            x2={splitX}
            y2={height - padBottom}
            stroke="#94a3b8"
            strokeDasharray="4 4"
          />

          <text x={padLeft + 4} y={14} className="fill-neutral-500 font-mono text-[10px]">
            HISTORICAL WINDOW
          </text>
          <text x={splitX + 8} y={14} className="fill-teal-700 font-mono text-[10px] font-medium">
            FORECAST REGION ({horizon} DAYS) · 80% PREDICTION INTERVAL
          </text>

          <polygon points={bandPoly} fill="rgba(13, 148, 136, 0.16)" />

          <path
            d={baselinePath}
            fill="none"
            stroke="#0284c7"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.7"
          />

          <path
            d={historyPath}
            fill="none"
            stroke="#0f172a"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d={forecastPath}
            fill="none"
            stroke="#0d9488"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {xTicks.map((idx) => (
            <text
              key={idx}
              x={xFor(idx)}
              y={height - 10}
              textAnchor={idx === 0 ? 'start' : idx === totalPoints - 1 ? 'end' : 'middle'}
              className="fill-neutral-500 font-mono text-[11px] tabular-nums"
            >
              {baseSeries.dates[idx]}
            </text>
          ))}

          {hoverIdx !== null && (
            <g>
              <line
                x1={xFor(hoverIdx)}
                y1={padTop}
                x2={xFor(hoverIdx)}
                y2={height - padBottom}
                stroke="#0d9488"
                strokeDasharray="2 2"
              />
              <circle
                cx={xFor(hoverIdx)}
                cy={yFor(
                  hoverIdx < baseSeries.history.length
                    ? baseSeries.history[hoverIdx]
                    : adjustedForecast[hoverIdx - baseSeries.history.length]
                )}
                r="4.5"
                fill={hoverIdx < baseSeries.history.length ? '#0f172a' : '#0d9488'}
                stroke="#ffffff"
                strokeWidth="2"
              />
            </g>
          )}

          {baseSeries.dates.map((_, idx) => {
            const cw = plotW / totalPoints;
            return (
              <rect
                key={idx}
                x={xFor(idx) - cw / 2}
                y={padTop}
                width={cw}
                height={plotH}
                fill="transparent"
                className="cursor-crosshair"
                onMouseEnter={() => setHoverIdx(idx)}
              />
            );
          })}
        </svg>

        {hoverIdx !== null && (
          <div
            className="pointer-events-none absolute top-8 z-10 rounded-lg border border-neutral-200 bg-white/95 px-3 py-2 text-xs shadow-md"
            style={{
              left: hoverIdx > totalPoints / 2 ? '24px' : undefined,
              right: hoverIdx <= totalPoints / 2 ? '24px' : undefined,
            }}
          >
            <span className="font-mono text-neutral-500">{baseSeries.dates[hoverIdx]}</span>
            <p className="mt-0.5 font-mono text-sm font-semibold text-neutral-950 tabular-nums">
              {hoverIdx < baseSeries.history.length
                ? `${baseSeries.history[hoverIdx]} units (Actual)`
                : `${adjustedForecast[hoverIdx - baseSeries.history.length]} units (${selectedModel})`}
            </p>
            {hoverIdx >= baseSeries.history.length && (
              <p className="font-mono text-[11px] text-teal-700 tabular-nums">
                Interval: {adjustedLower[hoverIdx - baseSeries.history.length]}–
                {adjustedUpper[hoverIdx - baseSeries.history.length]}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
