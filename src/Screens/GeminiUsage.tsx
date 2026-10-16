import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';

const RANGES = [
  { id: '7d', label: '7D' },
  { id: '30d', label: '30D' },
  { id: '90d', label: '90D' },
];

const D7_VALUES = [118.42, 126.85, 94.10, 142.33, 137.28, 88.15, 65.18];
const D7_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const D30_VALUES = [
  98.42, 112.15, 105.60, 121.33, 118.72, 89.44, 76.28,
  103.55, 117.20, 109.88, 126.41, 122.05, 92.17, 81.36,
  108.94, 124.60, 113.27, 131.88, 127.44, 96.83, 85.12,
  114.36, 129.75, 118.90, 138.22, 133.61, 101.45, 90.28,
  119.82, 135.40,
];

const D90_VALUES = [
  682.40, 714.28, 698.55, 742.16, 725.90, 651.33, 634.87,
  708.22, 736.45, 719.68, 758.31, 744.05, 668.92,
];

const NOW = new Date();
const daysAgoLabel = (n) => {
  const d = new Date(NOW);
  d.setDate(d.getDate() - n);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const sum = (arr) => arr.reduce((a, b) => a + b, 0);

const RANGE_DATA = {
  '7d': {
    caption: 'Last 7 days',
    calls: 312840,
    tokens: 21400000,
    callsChange: 5.2,
    tokensChange: 7.8,
    costChange: 9.1,
    series: D7_VALUES.map((v, i) => ({ label: D7_LABELS[i], value: v })),
    cost: sum(D7_VALUES),
  },
  '30d': {
    caption: 'Last 30 days',
    calls: 1284932,
    tokens: 87400000,
    callsChange: 8.2,
    tokensChange: 12.1,
    costChange: 18.3,
    series: D30_VALUES.map((v, i) => ({
      label: daysAgoLabel(D30_VALUES.length - 1 - i),
      value: v,
    })),
    cost: sum(D30_VALUES),
  },
  '90d': {
    caption: 'Last 90 days',
    calls: 3742118,
    tokens: 251600000,
    callsChange: 14.6,
    tokensChange: 18.9,
    costChange: 22.4,
    series: D90_VALUES.map((v, i) => ({ label: `W${i + 1}`, value: v })),
    cost: sum(D90_VALUES),
  },
};

const MODELS = [
  { name: 'gemini-2.5-pro', calls: 482300, tokens: 38400000, cost: 1470.55, color: '#a855f7' },
  { name: 'gemini-2.5-flash', calls: 512840, tokens: 32100000, cost: 991.20, color: '#8b5cf6' },
  { name: 'gemini-2.0-flash', calls: 218400, tokens: 12600000, cost: 660.48, color: '#6d28d9' },
  { name: 'gemini-2.5-flash-lite', calls: 71392, tokens: 4300000, cost: 222.20, color: '#4c1d95' },
];

const CONSUMERS = [
  { id: 9, name: 'Priya Sharma', email: 'priya.s@example.com', plan: 'enterprise', calls: 112000, tokens: '8.1M', cost: 612.44, hue: 330 },
  { id: 17, name: 'Lisa Andersen', email: 'lisa.a@example.com', plan: 'enterprise', calls: 98000, tokens: '7.2M', cost: 548.21, hue: 270 },
  { id: 5, name: 'Aisha Patel', email: 'aisha.p@example.com', plan: 'enterprise', calls: 85000, tokens: '5.8M', cost: 478.90, hue: 310 },
  { id: 13, name: 'Yuki Tanaka', email: 'yuki.t@example.com', plan: 'enterprise', calls: 71000, tokens: '4.9M', cost: 402.18, hue: 260 },
  { id: 1, name: 'Sarah Chen', email: 'sarah.chen@example.com', plan: 'enterprise', calls: 48200, tokens: '3.2M', cost: 312.75, hue: 265 },
  { id: 2, name: 'Marcus Johnson', email: 'marcus.j@example.com', plan: 'pro', calls: 12800, tokens: '890K', cost: 118.42, hue: 220 },
  { id: 14, name: 'Carlos Ruiz', email: 'carlos.r@example.com', plan: 'pro', calls: 10200, tokens: '710K', cost: 96.55, hue: 200 },
  { id: 7, name: 'Nina Ivanova', email: 'nina.i@example.com', plan: 'pro', calls: 8900, tokens: '610K', cost: 84.31, hue: 280 },
];

const fmtInt = (n) => n.toLocaleString('en-US');

const fmtMoney = (n) =>
  '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const fmtCompact = (n) => {
  if (n >= 1e9) return (n / 1e9).toFixed(2) + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(0) + 'K';
  return String(n);
};

const IconCalls = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

const IconTokens = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

const IconCost = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const IconDownload = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const IconRefresh = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" />
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </svg>
);

const IconFile = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

function MetricCard({ icon, iconTone, label, value, change, loading }) {
  const tones = {
    purple: 'bg-violet-500/15 text-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.2)]',
    blue: 'bg-blue-500/10 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.15)]',
    amber: 'bg-amber-500/10 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.15)]',
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-violet-500/10 bg-[rgba(18,16,30,0.75)] p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-500/25 hover:shadow-[0_0_20px_rgba(124,58,237,0.25)] sm:p-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-slate-500">
          {label}
        </span>
        <span className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${tones[iconTone]}`}>
          {icon}
        </span>
      </div>
      {loading ? (
        <span className="block h-9 w-3/4 animate-pulse rounded-lg bg-violet-500/10" />
      ) : (
        <div className="text-2xl font-black tracking-tight text-slate-100 tabular-nums sm:text-3xl">
          {value}
        </div>
      )}
      <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs font-semibold text-rose-400">
        ↑ {change}% <span className="font-medium text-slate-500">vs previous period</span>
      </div>
    </div>
  );
}

function CostChart({ series, loading }) {
  const max = useMemo(() => Math.max(...series.map((d) => d.value), 1), [series]);
  const dense = series.length > 12;

  return (
    <div
      className={`flex h-48 items-stretch gap-1 sm:h-56 sm:gap-2 ${loading ? 'pointer-events-none opacity-30 blur-[1px]' : ''}`}
    >
      {series.map((d, i) => {
        const pct = Math.max((d.value / max) * 100, 3);
        const showLabel = !dense || i % 5 === 0 || i === series.length - 1;

        return (
          <div key={`${d.label}-${i}`} className="group flex min-w-0 flex-1 cursor-pointer flex-col items-center gap-2">
            <div className={`h-3 text-[10px] font-mono leading-3 text-slate-500 transition-colors group-hover:text-violet-300 ${dense ? 'opacity-0' : ''}`}>
              {'$' + Math.round(d.value)}
            </div>
            <div className="relative w-full flex-1">
              <div
                className="absolute bottom-0 left-1/2 w-full max-w-[46px] -translate-x-1/2 rounded-t-lg rounded-b-sm bg-gradient-to-b from-violet-500 to-violet-900 shadow-[0_0_16px_rgba(139,92,246,0.28)] transition-all duration-500 group-hover:from-violet-400 group-hover:to-violet-700 group-hover:shadow-[0_0_28px_rgba(168,85,247,0.55)]"
                style={{ height: `${pct}%`, minHeight: 3 }}
              >
                <div className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-10 flex -translate-x-1/2 translate-y-1 flex-col items-center gap-px rounded-[10px] border border-violet-500/25 bg-[rgba(13,11,24,0.97)] px-3 py-1.5 opacity-0 shadow-[0_10px_28px_rgba(0,0,0,0.55),0_0_20px_rgba(124,58,237,0.25)] transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="whitespace-nowrap text-[10px] font-medium text-slate-500">
                    {d.label}
                  </span>
                  <span className="whitespace-nowrap font-mono text-xs font-bold text-violet-300">
                    {fmtMoney(d.value)}
                  </span>
                </div>
              </div>
            </div>
            <div className="h-3 max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-[10px] font-medium text-slate-500 transition-colors group-hover:text-slate-400">
              {showLabel ? d.label : '\u00A0'}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ModelBreakdown({ models, loading }) {
  const totalCost = useMemo(() => models.reduce((a, m) => a + m.cost, 0), [models]);

  return (
    <div className="flex flex-col gap-4">
      {models.map((m) => {
        const pct = (m.cost / totalCost) * 100;
        return (
          <div key={m.name}>
            <div className="mb-1.5 flex items-center justify-between gap-2.5">
              <div className="flex min-w-0 items-center gap-2 text-[13px] font-semibold text-slate-100">
                <i className="block h-2 w-2 flex-shrink-0 rounded-full" style={{ background: m.color }} />
                <span className="truncate">{m.name}</span>
              </div>
              <div className="flex-shrink-0 font-mono text-xs font-semibold text-amber-400">
                {loading ? '—' : fmtMoney(m.cost)}
              </div>
            </div>
            <div className="h-1.5 overflow-hidden rounded-sm bg-violet-500/10">
              <span
                className="block h-full rounded-sm transition-[width] duration-700"
                style={{
                  width: (loading ? 0 : pct) + '%',
                  background: `linear-gradient(90deg, ${m.color}, ${m.color}aa)`,
                }}
              />
            </div>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-slate-500">
              <span>{fmtInt(m.calls)} calls</span>
              <span>{fmtCompact(m.tokens)} tokens</span>
              <span>{pct.toFixed(1)}% of spend</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TopConsumers({ consumers }) {
  const badgeTone = {
    free: 'bg-slate-500/15 text-slate-400 border border-slate-500/30',
    pro: 'bg-violet-500/15 text-violet-300 border border-violet-500/35',
    enterprise: 'bg-violet-900/20 text-violet-300 border border-violet-500/40 shadow-[0_0_12px_rgba(124,58,237,0.2)]',
  };

  return (
    <div className="-mx-5 overflow-x-auto px-5 sm:-mx-6 sm:px-6">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr>
            {['User', 'Plan', 'API Calls', 'Tokens', 'Cost'].map((h) => (
              <th
                key={h}
                className="whitespace-nowrap border-b border-violet-500/10 px-3.5 py-2.5 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {consumers.map((u) => (
            <tr key={u.id} className="border-b border-violet-500/[0.06] transition-colors last:border-b-0 hover:bg-violet-500/5">
              <td className="whitespace-nowrap px-3.5 py-3 align-middle text-slate-400">
                <div className="flex items-center gap-2.5">
                  <div
                    className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white"
                    style={{
                      background: `linear-gradient(135deg, hsl(${u.hue},55%,35%), hsl(${u.hue + 30},55%,50%))`,
                    }}
                  >
                    {u.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-slate-100">{u.name}</div>
                    <div className="text-xs text-slate-500">{u.email}</div>
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap px-3.5 py-3 align-middle text-slate-400">
                <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide ${badgeTone[u.plan]}`}>
                  {u.plan.charAt(0).toUpperCase() + u.plan.slice(1)}
                </span>
              </td>
              <td className="whitespace-nowrap px-3.5 py-3 align-middle font-mono text-[13px] font-medium text-slate-200 tabular-nums">
                {fmtInt(u.calls)}
              </td>
              <td className="whitespace-nowrap px-3.5 py-3 align-middle font-mono text-[13px] font-medium text-slate-200 tabular-nums">
                {u.tokens}
              </td>
              <td className="whitespace-nowrap px-3.5 py-3 align-middle font-mono text-xs font-medium text-amber-400">
                {fmtMoney(u.cost)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Toasts({ toasts }) {
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  const tones = {
    info: 'bg-violet-500/10 border-violet-500/35 text-violet-300',
    success: 'bg-emerald-500/10 border-emerald-500/35 text-emerald-300',
    error: 'bg-red-500/10 border-red-500/35 text-red-300',
  };
  return (
    <div className="pointer-events-none fixed inset-x-3 bottom-3 z-50 flex flex-col gap-2 sm:inset-x-auto sm:right-5 sm:bottom-5">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto flex max-w-[min(360px,calc(100vw-40px))] items-center gap-2.5 rounded-2xl border px-4 py-3 text-[13px] font-medium shadow-[0_8px_32px_rgba(0,0,0,0.5)] ${tones[t.type] || tones.info} sm:max-w-[360px]`}
        >
          <span>{icons[t.type] || 'ℹ️'}</span>
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}

export default function GeminiUsagePage() {
  const [range, setRange] = useState('30d');
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(0);
  const firstRun = useRef(true);

  const data = RANGE_DATA[range];

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 420);
    return () => clearTimeout(t);
  }, [range]);

  const pushToast = useCallback((type, message) => {
    const id = ++toastId.current;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      pushToast('info', 'Usage data refreshed');
    }, 600);
  };

  const handleReport = () => {
    pushToast('success', 'Gemini usage report generated');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] font-sans text-slate-100 antialiased [background-image:radial-gradient(ellipse_at_15%_10%,rgba(76,29,149,0.18)_0%,transparent_60%),radial-gradient(ellipse_at_85%_20%,rgba(109,40,217,0.12)_0%,transparent_55%),radial-gradient(ellipse_at_50%_90%,rgba(88,28,135,0.08)_0%,transparent_50%)] [background-attachment:fixed]">
      <div className="mx-auto w-full max-w-[1400px] px-4 pb-12 pt-5 sm:px-6 sm:pt-7">
        <header className="mb-4 flex flex-wrap items-end justify-between gap-4 pb-5 pt-5 sm:pt-7">
          <div>
            <h1 className="m-0 text-2xl font-extrabold tracking-tight sm:text-3xl">
              Gemini{' '}
              <span className="bg-gradient-to-br from-violet-400 to-violet-300 bg-clip-text text-transparent">
                API Usage
              </span>
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Monitor Gemini API calls, token consumption, and associated costs.
            </p>
          </div>

          <div className="flex w-full flex-wrap items-center gap-2.5 sm:w-auto">
            <div
              role="tablist"
              aria-label="Time range"
              className="inline-flex gap-1 rounded-full border border-violet-500/10 bg-[rgba(16,14,28,0.6)] p-1"
            >
              {RANGES.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  role="tab"
                  aria-selected={range === r.id}
                  onClick={() => setRange(r.id)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all sm:px-4 ${
                    range === r.id
                      ? 'bg-violet-500/20 text-violet-300 shadow-[inset_0_0_0_1px_rgba(168,85,247,0.25),0_0_16px_rgba(139,92,246,0.15)]'
                      : 'text-slate-500 hover:bg-violet-500/10 hover:text-slate-100'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleRefresh}
              className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl border border-violet-500/10 bg-violet-500/[0.06] px-3.5 py-2.5 text-[13px] font-semibold text-slate-400 transition-all hover:border-violet-500/25 hover:bg-violet-500/[0.12] hover:text-slate-100 active:scale-[0.98] sm:flex-none sm:px-4"
            >
              <IconRefresh />
              <span>Refresh</span>
            </button>

            <button
              type="button"
              onClick={handleReport}
              className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl border border-violet-500/25 bg-gradient-to-br from-violet-900 to-violet-700 px-3.5 py-2.5 text-[13px] font-semibold text-white shadow-[0_0_20px_rgba(124,58,237,0.25)] transition-all hover:-translate-y-px hover:from-violet-700 hover:to-violet-500 hover:shadow-[0_0_40px_rgba(124,58,237,0.35)] active:translate-y-0 sm:flex-none sm:px-4"
            >
              <IconFile />
              <span>Generate Report</span>
            </button>
          </div>
        </header>

        <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          <MetricCard
            icon={<IconCalls />}
            iconTone="purple"
            label="Total API Calls"
            value={fmtInt(data.calls)}
            change={data.callsChange}
            loading={loading}
          />
          <MetricCard
            icon={<IconTokens />}
            iconTone="blue"
            label="Tokens Used"
            value={fmtCompact(data.tokens)}
            change={data.tokensChange}
            loading={loading}
          />
          <MetricCard
            icon={<IconCost />}
            iconTone="amber"
            label="Total Cost"
            value={fmtMoney(data.cost)}
            change={data.costChange}
            loading={loading}
          />
        </div>

        <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <section className="rounded-2xl border border-violet-500/10 bg-[rgba(18,16,30,0.75)] backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-violet-500/10 px-4 py-4 sm:px-5">
              <div>
                <div className="text-base font-bold tracking-tight">Cost Trend</div>
                <div className="mt-0.5 text-xs text-slate-500">{data.caption}</div>
              </div>
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-violet-500/10 bg-violet-500/[0.05] px-2.5 py-1.5 text-[11px] font-medium text-slate-500">
                <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                Live · updates every 60s
              </span>
            </div>
            <div className="p-4 sm:p-5">
              <CostChart series={data.series} loading={loading} />
            </div>
          </section>

          <section className="rounded-2xl border border-violet-500/10 bg-[rgba(18,16,30,0.75)] backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-violet-500/10 px-4 py-4 sm:px-5">
              <div>
                <div className="text-base font-bold tracking-tight">Cost by Model</div>
                <div className="mt-0.5 text-xs text-slate-500">{data.caption}</div>
              </div>
            </div>
            <div className="p-4 sm:p-5">
              <ModelBreakdown models={MODELS} loading={loading} />
            </div>
          </section>
        </div>

        <section className="rounded-2xl border border-violet-500/10 bg-[rgba(18,16,30,0.75)] backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-violet-500/10 px-4 py-4 sm:px-5">
            <div>
              <div className="text-base font-bold tracking-tight">Top Gemini Consumers</div>
              <div className="mt-0.5 text-xs text-slate-500">
                Highest-spending accounts · {data.caption.toLowerCase()}
              </div>
            </div>
            <button
              type="button"
              onClick={() => pushToast('info', 'Consumer export started')}
              className="inline-flex items-center gap-2 rounded-2xl border border-violet-500/10 bg-violet-500/[0.06] px-3.5 py-2.5 text-[13px] font-semibold text-slate-400 transition-all hover:border-violet-500/25 hover:bg-violet-500/[0.12] hover:text-slate-100 active:scale-[0.98]"
            >
              <IconDownload />
              <span>Export</span>
            </button>
          </div>
          <div className="p-4 sm:p-5">
            <TopConsumers consumers={CONSUMERS} />
          </div>
        </section>

        <Toasts toasts={toasts} />
      </div>
    </div>
  );
}