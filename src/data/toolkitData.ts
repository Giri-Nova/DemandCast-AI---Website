export const GITHUB_REPO_PLACEHOLDER = '[GITHUB_REPO_URL]';

export const QUICK_START_HERO_CMD =
  'python -m src.train --data my_sales.csv --date-col order_date --target-col demand';

export interface CapabilityItem {
  id: string;
  title: string;
  detail: string;
}

export const CAPABILITY_STRIP: CapabilityItem[] = [
  { id: 'data', title: 'Any tabular sales data', detail: 'CSV, Excel, or Parquet' },
  { id: 'backtest', title: 'Honest backtesting', detail: 'Time-ordered validation' },
  { id: 'intervals', title: 'Prediction intervals', detail: 'Quantile uncertainty bands' },
  { id: 'python', title: 'Python API', detail: 'Clean config & dataframes' },
  { id: 'cli', title: 'CLI', detail: 'Single-command training' },
  { id: 'dashboard', title: 'Streamlit dashboard', detail: 'Interactive visual UI' },
];

export interface PipelineSolutionStage {
  id: string;
  label: string;
  role: string;
  detail: string;
  artifact: string;
}

export const PROBLEM_SOLUTION_STAGES: PipelineSolutionStage[] = [
  {
    id: 'ingest',
    label: 'CSV / Excel',
    role: 'Raw sales export',
    detail: 'Load POS, ERP, or e-commerce tables using your own date, target, and ID column names.',
    artifact: 'read_table(data_path)',
  },
  {
    id: 'validate',
    label: 'Data Validation',
    role: 'Timeline cleanup',
    detail: 'Parse dates, aggregate duplicate timestamps, detect cadence, and fill missing calendar dates.',
    artifact: 'regularized_series.parquet',
  },
  {
    id: 'features',
    label: 'Feature Engineering',
    role: 'Leak-free signals',
    detail: 'Build historical lags, rolling mean/std windows, calendar features, and future promo flags.',
    artifact: 'lag_1, lag_7, roll_mean_28',
  },
  {
    id: 'train',
    label: 'Model Training',
    role: 'Tree & baseline models',
    detail: 'Train gradient-boosted tabular models alongside simple seasonal baselines on identical splits.',
    artifact: 'model.joblib',
  },
  {
    id: 'backtest',
    label: 'Backtesting',
    role: 'Historical validation',
    detail: 'Score rolling or expanding time windows with MAE, RMSE, WMAPE, sMAPE, and Bias.',
    artifact: 'backtest_metrics.csv',
  },
  {
    id: 'forecast',
    label: 'Forecast',
    role: 'Point + intervals',
    detail: 'Generate multi-step demand projections with lower and upper quantile prediction intervals.',
    artifact: 'forecast.csv',
  },
  {
    id: 'insights',
    label: 'Business Insights',
    role: 'Inventory & planning',
    detail: 'Review per-series accuracy, feature importance drivers, and safety-stock uncertainty ranges.',
    artifact: 'feature_importance.png',
  },
];

export interface ProductFeatureCard {
  id: string;
  title: string;
  description: string;
  highlight: string;
}

export const PRODUCT_FEATURES: ProductFeatureCard[] = [
  {
    id: 'flexible-input',
    title: 'Flexible Data Input',
    description:
      'Works with CSV, Excel, and Parquet sales datasets using configurable date, target, and series ID columns.',
    highlight: 'Auto-detects cadence & handles missing dates',
  },
  {
    id: 'time-series-features',
    title: 'Time-Series Features',
    description:
      'Automatically constructs lag offsets, rolling window statistics, and calendar temporal features without data leakage.',
    highlight: 'Supports future known promo & price inputs',
  },
  {
    id: 'model-comparison',
    title: 'Model Comparison',
    description:
      'Compare machine-learning forecasts directly against simple baseline methods on the exact same test windows.',
    highlight: 'Verifies real lift over seasonal naive rules',
  },
  {
    id: 'honest-backtesting',
    title: 'Honest Backtesting',
    description:
      'Evaluate forecasts using chronological historical validation windows rather than misleading random train/test splits.',
    highlight: 'Reports WMAPE, sMAPE, MAE, RMSE, and Bias',
  },
  {
    id: 'prediction-intervals',
    title: 'Prediction Intervals',
    description:
      'Show calibrated upper and lower uncertainty bands around future predictions to support inventory safety margins.',
    highlight: 'Configurable quantile bounds',
  },
  {
    id: 'multiple-interfaces',
    title: 'Multiple Interfaces',
    description:
      'Run workflows from the command line, automate via Python API and YAML configs, or explore visually in Streamlit.',
    highlight: 'Reusable model.joblib scoring',
  },
];

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Ingest',
    description:
      'Read CSV, Excel, or Parquet sales files and map date, target, and series identifier columns.',
  },
  {
    step: '02',
    title: 'Validate',
    description:
      'Clean duplicates, detect series frequency, and regularize timelines with missing-date handling.',
  },
  {
    step: '03',
    title: 'Train',
    description:
      'Generate strict leak-free lags and rolling windows, then fit tree models and baselines.',
  },
  {
    step: '04',
    title: 'Backtest',
    description:
      'Score out-of-sample chronological folds across WMAPE, MAE, RMSE, and per-series error.',
  },
  {
    step: '05',
    title: 'Forecast',
    description:
      'Project future demand across your horizon with point forecasts, intervals, and saved artifacts.',
  },
];

export interface FeatureGroup {
  number: string;
  title: string;
  summary: string;
  items: string[];
}

export const FEATURE_GROUPS: FeatureGroup[] = [
  {
    number: '01',
    title: 'Works with any data',
    summary: 'Bring raw exports from POS, ERP, or spreadsheets without renaming columns first.',
    items: [
      'Reads CSV, Excel (.xlsx/.xls), and Parquet files',
      'Maps your own date, target, and identifier column names',
      'Supports a single series or thousands of series together',
      'Auto-detects daily, weekly, monthly, quarterly, or hourly frequency',
      'Handles duplicate timestamps, missing dates, and day-first date formats',
    ],
  },
  {
    number: '02',
    title: 'Forecasting',
    summary: 'Gradient-boosted tabular models configured for time-series structure out of the box.',
    items: [
      'Powered by LightGBM and tree ensembles with sensible time-series defaults',
      'Automatic lag features and rolling window statistics',
      'Optional promo or price covariates known in the future',
      'Quantile-based prediction intervals alongside point forecasts',
      'Built-in trend handling and series normalization',
    ],
  },
  {
    number: '03',
    title: 'Trustworthy evaluation',
    summary: 'Verify whether the model actually beats simple seasonal rules before relying on it.',
    items: [
      'Strict temporal feature generation with zero future data leakage',
      'Rolling or expanding time-based backtest splits',
      'Direct comparison against simple baseline forecasters',
      'Reports WMAPE, sMAPE, MAE, RMSE, and Bias',
      'Per-series error breakdowns and feature importance rankings',
    ],
  },
  {
    number: '04',
    title: 'Ways to use it',
    summary: 'Run an ad-hoc experiment in the terminal or integrate into repeatable Python workflows.',
    items: [
      'Command-line interface for quick runs and scripts',
      'YAML configuration files for reproducible team pipelines',
      'Python API returning structured metrics and forecast DataFrames',
      'Interactive Streamlit dashboard for non-programmers',
      'Reusable saved model artifacts for scoring new dates without retraining',
    ],
  },
];

export interface ModelMetricCard {
  label: string;
  value: string;
  caption: string;
}

export const EVALUATION_METRIC_CARDS: ModelMetricCard[] = [
  {
    label: 'MAE',
    value: '6.55',
    caption: 'Mean absolute unit error across validation window',
  },
  {
    label: 'RMSE',
    value: '8.51',
    caption: 'Root mean squared error penalizing demand spikes',
  },
  {
    label: 'WAPE',
    value: '9.71%',
    caption: 'Weighted absolute percentage error across total volume',
  },
];

export interface ModelComparisonRow {
  model: string;
  isBest: boolean;
  summary: string;
  wapeLabel: string;
  relativeBarWidth: number;
}

export const MODEL_COMPARISON_ROWS: ModelComparisonRow[] = [
  {
    model: 'XGBoost',
    isBest: true,
    summary: 'Best performing · MAE 6.55 · RMSE 8.51',
    wapeLabel: '9.71% WAPE',
    relativeBarWidth: 54,
  },
  {
    model: 'Random Forest',
    isBest: false,
    summary: 'Tree ensemble benchmark on identical time-based folds',
    wapeLabel: 'Higher error vs. XGBoost',
    relativeBarWidth: 72,
  },
  {
    model: 'Seasonal Naive',
    isBest: false,
    summary: 'Prior-cycle baseline reference for honest lift checks',
    wapeLabel: 'Baseline reference',
    relativeBarWidth: 92,
  },
];

export interface ForecastSeriesOption {
  id: string;
  label: string;
  category: string;
  actualTotal: string;
  forecastTotal: string;
  wape: string;
  dates: string[];
  history: number[];
  forecast: number[];
  lower: number[];
  upper: number[];
  baseline: number[];
}

export const FORECAST_SERIES_DATA: ForecastSeriesOption[] = [
  {
    id: 'store-01-sku-104',
    label: 'Store 01 · SKU 104',
    category: 'Apparel · Daily cadence',
    actualTotal: '1,248 units',
    forecastTotal: '1,392 units',
    wape: '9.7%',
    dates: [
      'Oct 01', 'Oct 03', 'Oct 05', 'Oct 07', 'Oct 09', 'Oct 11', 'Oct 13',
      'Oct 15', 'Oct 17', 'Oct 19', 'Oct 21', 'Oct 23', 'Oct 25', 'Oct 27',
      'Oct 29', 'Oct 31', 'Nov 02', 'Nov 04', 'Nov 06', 'Nov 08', 'Nov 10',
      'Nov 12', 'Nov 14', 'Nov 16', 'Nov 18', 'Nov 20', 'Nov 22', 'Nov 24',
    ],
    history: [41, 44, 48, 43, 46, 56, 61, 44, 47, 51, 45, 49, 59, 64],
    forecast: [48, 52, 55, 50, 54, 64, 68, 50, 54, 58, 52, 56, 66, 71],
    lower: [42, 45, 47, 42, 45, 54, 57, 41, 44, 47, 42, 45, 54, 58],
    upper: [54, 59, 63, 58, 63, 74, 79, 59, 64, 69, 62, 67, 78, 84],
    baseline: [45, 48, 51, 46, 49, 58, 62, 46, 49, 52, 47, 50, 59, 63],
  },
  {
    id: 'store-02-sku-219',
    label: 'Store 02 · SKU 219',
    category: 'Home Goods · Daily cadence',
    actualTotal: '892 units',
    forecastTotal: '946 units',
    wape: '11.2%',
    dates: [
      'Oct 01', 'Oct 03', 'Oct 05', 'Oct 07', 'Oct 09', 'Oct 11', 'Oct 13',
      'Oct 15', 'Oct 17', 'Oct 19', 'Oct 21', 'Oct 23', 'Oct 25', 'Oct 27',
      'Oct 29', 'Oct 31', 'Nov 02', 'Nov 04', 'Nov 06', 'Nov 08', 'Nov 10',
      'Nov 12', 'Nov 14', 'Nov 16', 'Nov 18', 'Nov 20', 'Nov 22', 'Nov 24',
    ],
    history: [31, 29, 27, 30, 34, 41, 38, 30, 28, 26, 29, 33, 40, 37],
    forecast: [32, 30, 29, 32, 36, 43, 40, 33, 31, 29, 33, 37, 45, 42],
    lower: [27, 25, 23, 26, 29, 35, 32, 26, 23, 21, 25, 28, 35, 32],
    upper: [37, 35, 35, 38, 43, 51, 48, 40, 39, 37, 41, 46, 55, 52],
    baseline: [31, 29, 27, 30, 34, 40, 37, 31, 29, 27, 30, 34, 40, 37],
  },
  {
    id: 'store-04-sku-408',
    label: 'Store 04 · SKU 408',
    category: 'Beverage · Daily cadence',
    actualTotal: '1,610 units',
    forecastTotal: '1,735 units',
    wape: '8.9%',
    dates: [
      'Oct 01', 'Oct 03', 'Oct 05', 'Oct 07', 'Oct 09', 'Oct 11', 'Oct 13',
      'Oct 15', 'Oct 17', 'Oct 19', 'Oct 21', 'Oct 23', 'Oct 25', 'Oct 27',
      'Oct 29', 'Oct 31', 'Nov 02', 'Nov 04', 'Nov 06', 'Nov 08', 'Nov 10',
      'Nov 12', 'Nov 14', 'Nov 16', 'Nov 18', 'Nov 20', 'Nov 22', 'Nov 24',
    ],
    history: [52, 55, 59, 54, 58, 69, 73, 55, 58, 62, 57, 61, 72, 76],
    forecast: [58, 61, 65, 60, 64, 75, 79, 60, 63, 67, 62, 66, 77, 81],
    lower: [51, 54, 57, 52, 55, 65, 68, 51, 53, 56, 51, 55, 65, 68],
    upper: [65, 68, 73, 68, 73, 85, 90, 69, 73, 78, 73, 77, 89, 94],
    baseline: [54, 57, 61, 56, 60, 70, 74, 54, 57, 61, 56, 60, 70, 74],
  },
];

export interface DocNavEntry {
  number: string;
  route: 'features' | 'how-it-works' | 'get-started' | 'parameters' | 'outputs' | 'limits-faq';
  title: string;
  subtitle: string;
}

export const DOCUMENTATION_ENTRIES: DocNavEntry[] = [
  {
    number: '01',
    route: 'features',
    title: 'Features',
    subtitle: 'Capabilities and supported data',
  },
  {
    number: '02',
    route: 'how-it-works',
    title: 'How it works',
    subtitle: 'Forecasting pipeline',
  },
  {
    number: '03',
    route: 'get-started',
    title: 'Get started',
    subtitle: 'Installation and first forecast',
  },
  {
    number: '04',
    route: 'parameters',
    title: 'Parameters',
    subtitle: 'Configuration reference',
  },
  {
    number: '05',
    route: 'outputs',
    title: 'Outputs',
    subtitle: 'Forecast files, plots, and models',
  },
  {
    number: '06',
    route: 'limits-faq',
    title: 'Limits & FAQ',
    subtitle: 'Constraints and common questions',
  },
];

export interface QuickStartBlock {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
}

export const QUICK_START_BLOCKS: QuickStartBlock[] = [
  {
    id: 'install',
    title: '1. Install dependencies',
    description: 'Create an isolated Python virtual environment and install the toolkit requirements.',
    language: 'bash',
    code: `python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\\Scripts\\activate
pip install -r requirements.txt`,
  },
  {
    id: 'examples',
    title: '2. Try the bundled synthetic example',
    description: 'Generate the synthetic sample dataset and run training using the default YAML configuration.',
    language: 'bash',
    code: `python -m src.sample_data
python -m src.train --config config.yaml`,
  },
  {
    id: 'own-data',
    title: '3. Forecast your own dataset',
    description: 'Point the CLI at your CSV, Excel, or Parquet file and identify the relevant columns.',
    language: 'bash',
    code: `python -m src.train \\
  --data my_sales.csv \\
  --date-col order_date \\
  --target-col demand \\
  --id-cols store sku \\
  --horizon 28`,
  },
  {
    id: 'dashboard',
    title: '4. Launch the interactive dashboard',
    description: 'Upload files, map columns visually, inspect backtests, and download forecasts in Streamlit.',
    language: 'bash',
    code: `streamlit run app/streamlit_app.py`,
  },
  {
    id: 'predict',
    title: '5. Forecast again without retraining',
    description: 'Reuse a previously saved model artifact with newly appended sales records.',
    language: 'bash',
    code: `python -m src.predict --model outputs/model.joblib --data newer_sales.csv`,
  },
  {
    id: 'python-api',
    title: '6. Use the Python API',
    description: 'Configure and run training directly inside notebooks or scheduled Python jobs.',
    language: 'python',
    code: `from src.config import Config
from src.io import read_table
from src.pipeline import run_training

cfg = Config(
    date_col="order_date",
    target_col="demand",
    id_cols=["store", "sku"],
    horizon=28,
)
res = run_training(cfg, read_table("sales.csv"))

print(res.metrics)
print(res.forecast.head())`,
  },
];

export interface ParameterRow {
  parameter: string;
  meaning: string;
  defaultValue: string;
}

export const INPUT_PARAMETERS: ParameterRow[] = [
  {
    parameter: 'data_path',
    meaning: 'Path to the input CSV, Excel, or Parquet sales dataset.',
    defaultValue: 'Required',
  },
  {
    parameter: 'date_col',
    meaning: 'Name of the column containing order or transaction dates.',
    defaultValue: 'Required',
  },
  {
    parameter: 'target_col',
    meaning: 'Numeric column to forecast (for example, units sold or demand).',
    defaultValue: 'Required',
  },
  {
    parameter: 'id_cols',
    meaning: 'One or more columns identifying individual series (e.g., store, sku). Leave empty for a single series.',
    defaultValue: 'None (single series)',
  },
  {
    parameter: 'horizon',
    meaning: 'Number of future periods to forecast ahead.',
    defaultValue: '28',
  },
  {
    parameter: 'freq',
    meaning: 'Time frequency of the series (D, W, MS, QS, H, or auto-detected).',
    defaultValue: 'auto',
  },
  {
    parameter: 'aggregation',
    meaning: 'How duplicate timestamps within the same series are combined (sum, mean, etc.).',
    defaultValue: 'sum',
  },
  {
    parameter: 'fill_missing',
    meaning: 'Strategy for missing calendar dates after timeline regularization (zero, ffill, interpolate).',
    defaultValue: 'zero',
  },
  {
    parameter: 'dayfirst',
    meaning: 'Parse ambiguous dates such as 05/06/2026 as DD/MM/YYYY instead of MM/DD/YYYY.',
    defaultValue: 'false',
  },
  {
    parameter: 'categorical_cols',
    meaning: 'Static or grouping categorical columns passed as features to tree models.',
    defaultValue: 'None',
  },
  {
    parameter: 'future_covariate_cols + future_data_path',
    meaning: 'Known future drivers (such as scheduled promotions or planned prices) and the file supplying future dates.',
    defaultValue: 'None',
  },
  {
    parameter: 'quantiles',
    meaning: 'Target quantile levels used to construct lower and upper prediction intervals.',
    defaultValue: '[0.1, 0.5, 0.9]',
  },
  {
    parameter: 'normalize',
    meaning: 'Scale target magnitudes per series during training to stabilize multi-series models.',
    defaultValue: 'yes',
  },
  {
    parameter: 'lags / rolling_windows / objective / lgbm_params',
    meaning: 'Feature lag offsets, rolling summary windows, loss objective, and model hyperparameters.',
    defaultValue: 'automatic',
  },
  {
    parameter: 'output_dir',
    meaning: 'Directory where forecasts, metrics tables, plots, resolved config, and model.joblib are written.',
    defaultValue: 'outputs',
  },
];

export interface OutputArtifact {
  file: string;
  purpose: string;
}

export const OUTPUT_FILES: OutputArtifact[] = [
  {
    file: 'forecast.csv',
    purpose: 'Future point forecasts and lower/upper prediction intervals for every series and horizon step.',
  },
  {
    file: 'backtest_metrics.csv',
    purpose: 'Overall out-of-sample error summary comparing ML models against simple baselines.',
  },
  {
    file: 'backtest_by_series.csv',
    purpose: 'Granular accuracy metrics broken down by each individual series ID.',
  },
  {
    file: 'backtest_predictions.csv',
    purpose: 'Row-level actual vs. predicted values across backtest folds for inspection.',
  },
  {
    file: 'feature_importance (.csv / .png)',
    purpose: 'Ranked table and chart showing which lags, rolling stats, or covariates drove predictions.',
  },
  {
    file: 'forecast plots',
    purpose: 'Visualizations of historical demand, backtest fit, and future prediction intervals.',
  },
  {
    file: 'model.joblib',
    purpose: 'Serialized trained model bundle for scoring newer data without retraining.',
  },
  {
    file: 'config_resolved.yaml',
    purpose: 'Complete resolved configuration file recording every inferred and explicit setting.',
  },
];

export const LIMITATIONS_LIST: string[] = [
  'Needs at least 3 x horizon periods of history per series to construct lags and a clean time-based backtest.',
  'Future values of promotional, discount, or price columns must be supplied by the user via future_data_path.',
  'On very short single series, a simple seasonal baseline can beat tree models; the report includes baselines so you can verify.',
  'Quantile prediction intervals can be miscalibrated on small or erratic datasets.',
  'Any metrics and charts shown on this website reflect bundled evaluation runs—always evaluate on your own backtest.',
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What data does DemandCast use?',
    answer:
      'DemandCast AI works with tabular historical sales datasets in CSV, Excel (.xlsx/.xls), or Apache Parquet format. You simply map which columns represent dates, target demand values, and optional store/SKU identifiers.',
  },
  {
    question: 'What forecasting models are supported?',
    answer:
      'The toolkit trains gradient-boosted tree models (LightGBM / XGBoost) and Random Forest ensembles alongside simple Seasonal Naive and Rolling Mean baselines so you can benchmark real predictive lift.',
  },
  {
    question: 'How much historical data do I need?',
    answer:
      'Plan for at least 3 x horizon periods of history per series (for example, at least 84 days when forecasting 28 days ahead). Longer history provides cleaner seasonal signals and better interval calibration.',
  },
  {
    question: 'How are forecasts evaluated?',
    answer:
      'Forecasts are evaluated using chronological time-based backtest splits rather than random splits, reporting MAE, RMSE, WMAPE, sMAPE, and Bias overall and per series.',
  },
  {
    question: 'Can I use my own CSV?',
    answer:
      'Yes. Point --data to your CSV file and pass --date-col, --target-col, and optional --id-cols flags without reshaping or renaming your columns beforehand.',
  },
  {
    question: 'Does it provide prediction intervals?',
    answer:
      'Yes. Configurable quantile bounds generate upper and lower prediction intervals alongside the point forecast to communicate uncertainty across the forecast horizon.',
  },
  {
    question: 'Can I run it locally?',
    answer:
      'Yes. Everything runs locally in Python via the CLI, Python API, or Streamlit dashboard—no external cloud services or paid API keys are required.',
  },
];
