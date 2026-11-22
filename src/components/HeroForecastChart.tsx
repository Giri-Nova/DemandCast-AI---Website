import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { FORECAST_SERIES_DATA } from '../data/toolkitData';

export function HeroForecastChart() {
  const [selectedSkuId, setSelectedSkuId] = useState(FORECAST_SERIES_DATA[0].id);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const series = useMemo(
    () => FORECAST_SERIES_DATA.find((s) => s.id === selectedSkuId) ?? FORECAST_SERIES_DATA[0],
    [selectedSkuId]
  );

  const width = 620;
  const height = 270;
  const padLeft = 44;
  const padRight = 18;
  const padTop = 26;
  const padBottom = 38;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const totalPoints = series.history.length + series.forecast.length;
  const allVals = [...series.history, ...series.lower, ...series.upper, ...series.baseline];
  const minY = Math.max(0, Math.floor(Math.min(...allVals) / 10) * 10 - 5);
  const maxY = Math.ceil(Math.max(...allVals) / 10) * 10 + 5;

  const xFor = (idx: number) => padLeft + (idx / (totalPoints - 1)) * plotW;
  const yFor = (val: number) => padTop + (1 - (val - minY) / (maxY - minY)) * plotH;

  const historyPath = series.history
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${xFor(i).toFixed(1)} ${yFor(v).toFixed(1)}`)
    .join(' ');

  const splitIdx = series.history.length - 1;
  const splitX = xFor(splitIdx);

  const forecastLinePoints = [series.history[splitIdx], ...series.forecast];
  const forecastPath = forecastLinePoints
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${xFor(splitIdx + i).toFixed(1)} ${yFor(v).toFixed(1)}`)
    .join(' ');

  const baselinePoints = [series.history[splitIdx], ...series.baseline];
  const baselinePath = baselinePoints
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${xFor(splitIdx + i).toFixed(1)} ${yFor(v).toFixed(1)}`)
    .join(' ');

  const upperBand = [series.history[splitIdx], ...series.upper].map(
    (v, i) => `${xFor(splitIdx + i).toFixed(1)},${yFor(v).toFixed(1)}`
  );
  const lowerBand = [series.history[splitIdx], ...series.lower]
    .map((v, i) => `${xFor(splitIdx + i).toFixed(1)},${yFor(v).toFixed(1)}`)
    .reverse();
  const intervalPolygon = [...upperBand, ...lowerBand].join(' ');

  const yTicks = [minY, Math.round((minY + maxY) / 2), maxY];
  const xTickIndices = [0, 7, 14, 21, 27];

  const hoveredData = useMemo(() => {
    if (hoverIdx === null) return null;
    const isHistory = hoverIdx < series.history.length;
    const fIdx = hoverIdx - series.history.length;
    return {
      idx: hoverIdx,
      date: series.dates[hoverIdx],
      phase: isHistory ? 'Historical' : 'Forecast',
      value: isHistory ? series.history[hoverIdx] : series.forecast[fIdx],
      low: isHistory ? null : series.lower[fIdx],
      high: isHistory ? null : series.upper[fIdx],
      baseline: isHistory ? null : series.baseline[fIdx],
      x: xFor(hoverIdx),
      y: yFor(isHistory ? series.history[hoverIdx] : series.forecast[fIdx]),
    };
  }, [hoverIdx, series]);

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-[0_12px_32px_-16px_rgba(15,23,42,0.12)] sm:p-6">
      {/* Top Bar: Title + SKU Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 pb-4">
        <div>
          <p className="font-display text-sm font-semibold text-neutral-950">
            28-Day Forecast <span className="font-normal text-neutral-500">· Synthetic Sample</span>
          </p>
          <p className="text-xs text-neutral-500">{series.category}</p>
        </div>

        <label htmlFor="hero-sku-select" className="sr-only">
          Select Store and SKU
        </label>
        <select
          id="hero-sku-select"
          value={selectedSkuId}
          onChange={(e) => {
            setSelectedSkuId(e.target.value);
            setHoverIdx(null);
          }}
          className="min-h-[36px] rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-medium text-neutral-900 focus:border-teal-600 focus:outline-none"
        >
          {FORECAST_SERIES_DATA.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      {/* KPI Summary Strip */}
      <div className="mt-4 grid grid-cols-3 gap-3 rounded-xl border border-neutral-200/80 bg-neutral-50/80 p-3.5">
        <div>
          <p className="text-xs text-neutral-500">Actual (28d)</p>
          <p className="mt-0.5 font-mono text-sm font-semibold text-neutral-950 tabular-nums sm:text-base">
            {series.actualTotal}
          </p>
        </div>
        <div>
          <p className="text-xs text-neutral-500">Forecast (28d)</p>
          <p className="mt-0.5 font-mono text-sm font-semibold text-teal-700 tabular-nums sm:text-base">
            {series.forecastTotal}
          </p>
        </div>
        <div>
          <p className="text-xs text-neutral-500">WAPE</p>
          <p className="mt-0.5 font-mono text-sm font-semibold text-sky-700 tabular-nums sm:text-base">
            {series.wape}
          </p>
        </div>
      </div>

      {/* Interactive Chart */}
      <div className="relative mt-4">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={`Interactive forecast chart for ${series.label} showing historical demand, forecast, baseline comparison, and prediction interval`}
          className="h-auto w-full overflow-visible select-none"
          onMouseLeave={() => setHoverIdx(null)}
        >
          {/* Forecast Region Shading */}
          <rect
            x={splitX}
            y={padTop}
            width={width - padRight - splitX}
            height={plotH}
            className="fill-teal-50/70"
          />

          {/* Y Gridlines */}
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

          {/* Phase Header Labels */}
          <text x={padLeft + 4} y={14} className="fill-neutral-500 font-mono text-[10px]">
            PAST ACTUALS
          </text>
          <text x={splitX + 8} y={14} className="fill-teal-700 font-mono text-[10px] font-medium">
            FORECAST + UNCERTAINTY
          </text>

          {/* Split Divider */}
          <line
            x1={splitX}
            y1={padTop}
            x2={splitX}
            y2={height - padBottom}
            stroke="#94a3b8"
            strokeDasharray="4 4"
          />

          {/* Prediction Interval Confidence Band */}
          <polygon points={intervalPolygon} fill="rgba(13, 148, 136, 0.16)" />

          {/* Baseline Comparison */}
          <path
            d={baselinePath}
            fill="none"
            stroke="#0284c7"
            strokeWidth="1.6"
            strokeDasharray="4 4"
            opacity="0.75"
          />

          {/* Historical Demand */}
          <motion.path
            key={`hist-${series.id}`}
            initial={{ pathLength: 0.2, opacity: 0.5 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            d={historyPath}
            fill="none"
            stroke="#0f172a"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Forecasted Demand */}
          <motion.path
            key={`fcst-${series.id}`}
            initial={{ pathLength: 0.2, opacity: 0.5 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            d={forecastPath}
            fill="none"
            stroke="#0d9488"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* X-Axis Labeled Dates */}
          {xTickIndices.map((idx) => (
            <text
              key={idx}
              x={xFor(idx)}
              y={height - 12}
              textAnchor={idx === 0 ? 'start' : idx === totalPoints - 1 ? 'end' : 'middle'}
              className="fill-neutral-500 font-mono text-[10.5px] tabular-nums"
            >
              {series.dates[idx]}
            </text>
          ))}

          {/* Hover Crosshair & Highlight */}
          {hoveredData && (
            <g>
              <line
                x1={hoveredData.x}
                y1={padTop}
                x2={hoveredData.x}
                y2={height - padBottom}
                stroke="#0d9488"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <circle
                cx={hoveredData.x}
                cy={hoveredData.y}
                r="4.5"
                fill={hoveredData.phase === 'Historical' ? '#0f172a' : '#0d9488'}
                stroke="#ffffff"
                strokeWidth="2"
              />
            </g>
          )}

          {/* Interactive Invisible Hover Columns */}
          {series.dates.map((_, idx) => {
            const colWidth = plotW / totalPoints;
            return (
              <rect
                key={idx}
                x={xFor(idx) - colWidth / 2}
                y={padTop}
                width={colWidth}
                height={plotH}
                fill="transparent"
                className="cursor-crosshair"
                onMouseEnter={() => setHoverIdx(idx)}
              />
            );
          })}
        </svg>

        {/* Floating Tooltip */}
        {hoveredData && (
          <div
            className="pointer-events-none absolute top-7 z-10 w-48 rounded-lg border border-neutral-200 bg-white/95 p-2.5 text-xs shadow-md backdrop-blur-xs"
            style={{
              left: hoveredData.idx > totalPoints / 2 ? '12px' : undefined,
              right: hoveredData.idx <= totalPoints / 2 ? '12px' : undefined,
            }}
          >
            <div className="flex items-center justify-between font-mono text-[11px] text-neutral-500">
              <span>{hoveredData.date}</span>
              <span
                className={
                  hoveredData.phase === 'Forecast'
                    ? 'font-semibold text-teal-700'
                    : 'font-semibold text-neutral-800'
                }
              >
                {hoveredData.phase}
              </span>
            </div>
            <p className="mt-1 font-mono text-sm font-semibold text-neutral-950 tabular-nums">
              {hoveredData.value} units
            </p>
            {hoveredData.low !== null && hoveredData.high !== null && (
              <p className="mt-0.5 font-mono text-[11px] text-teal-700 tabular-nums">
                Interval: {hoveredData.low}–{hoveredData.high}
              </p>
            )}
            {hoveredData.baseline !== null && (
              <p className="font-mono text-[11px] text-sky-700 tabular-nums">
                Baseline: {hoveredData.baseline}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200 pt-3 text-xs text-neutral-600">
        <div className="flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-0.5 w-3.5 bg-neutral-900" aria-hidden="true" />
            Historical
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-0.5 w-3.5 bg-teal-600" aria-hidden="true" />
            Forecast
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-3.5 rounded-xs bg-teal-600/20" aria-hidden="true" />
            Prediction Interval
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span
              className="h-0.5 w-3.5 border-t border-dashed border-sky-600"
              aria-hidden="true"
            />
            Baseline
          </span>
        </div>
        <span className="text-neutral-500">Hover chart to inspect points</span>
      </div>
    </div>
  );
}
