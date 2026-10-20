import React, { useState } from 'react';

// ==================== TYPES & INTERFACES ====================
export type PlanStatus = 'active' | 'archived';
export type SubView = 'list' | 'manage';
export type BillingCycle = 'monthly' | 'annual';
export type ToastType = 'success' | 'error' | 'info';

export interface Plan {
  id: string;
  name: string;
  badge: string;
  priceMonthly: number;
  priceAnnual: number;
  billingNote: string;
  color: string;
  accentClass?: string;
  textAccent?: string;
  borderAccent?: string;
  glowColor?: string;
  users: number;
  status: PlanStatus;
  isPopular: boolean;
  description: string;
  credits: number;
  rolloverCap: number;
  dailyApiLimit: number;
  unlimitedApi: boolean;
  maxTokensPerCall: number;
  features: string[];
}

export interface ColorPreset {
  label: string;
  hex: string;
}

export interface ToastMessage {
  id: number;
  type: ToastType;
  message: string;
}

// ==================== INITIAL STATIC DATA ====================
const INITIAL_PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    badge: 'Starter',
    priceMonthly: 0,
    priceAnnual: 0,
    billingNote: 'Free forever',
    color: '#64748b',
    accentClass: 'from-slate-600 to-slate-500',
    textAccent: 'text-slate-400',
    borderAccent: 'border-slate-500/30',
    glowColor: 'rgba(100, 116, 139, 0.2)',
    users: 4,
    status: 'active',
    isPopular: false,
    description: 'Basic access with limited features for personal exploration.',
    credits: 500,
    rolloverCap: 0,
    dailyApiLimit: 5,
    unlimitedApi: false,
    maxTokensPerCall: 4096,
    features: [
      '500 credits / mo',
      '5 Gemini API calls / day',
      'Community support'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    badge: 'Most Popular',
    priceMonthly: 29,
    priceAnnual: 24,
    billingNote: 'Billed monthly or $288/yr',
    color: '#8b5cf6',
    accentClass: 'from-[#4c1d95] to-[#8b5cf6]',
    textAccent: 'text-[#a855f7]',
    borderAccent: 'border-purple-500/40',
    glowColor: 'rgba(139, 92, 246, 0.35)',
    users: 9,
    status: 'active',
    isPopular: true,
    description: 'For professionals and small teams building production workflows.',
    credits: 10000,
    rolloverCap: 5000,
    dailyApiLimit: 1000,
    unlimitedApi: true,
    maxTokensPerCall: 32768,
    features: [
      '10,000 credits / mo',
      'Unlimited Gemini API calls',
      'Priority email support',
      'Advanced analytics'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    badge: 'Custom Scale',
    priceMonthly: 99,
    priceAnnual: 79,
    billingNote: 'Billed monthly or $948/yr',
    color: '#c084fc',
    accentClass: 'from-[#6d28d9] to-[#c084fc]',
    textAccent: 'text-[#c084fc]',
    borderAccent: 'border-purple-400/45',
    glowColor: 'rgba(192, 132, 252, 0.4)',
    users: 5,
    status: 'active',
    isPopular: false,
    description: 'For organizations at scale requiring dedicated throughput and SLAs.',
    credits: 100000,
    rolloverCap: 50000,
    dailyApiLimit: 10000,
    unlimitedApi: true,
    maxTokensPerCall: 128000,
    features: [
      '100,000+ credits / mo',
      'Dedicated support',
      'Custom integrations',
      'SLA guarantee',
      'SSO / SAML'
    ]
  }
];

const COLOR_PRESETS: ColorPreset[] = [
  { label: 'Slate', hex: '#64748b' },
  { label: 'Electric Purple', hex: '#8b5cf6' },
  { label: 'Bright Lavender', hex: '#c084fc' },
  { label: 'Emerald', hex: '#34d399' },
  { label: 'Amber', hex: '#fbbf24' },
  { label: 'Sky Blue', hex: '#60a5fa' }
];

export const KAiPlansModule: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>(INITIAL_PLANS);
  const [activeSubView, setActiveSubView] = useState<SubView>('list');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Editor state for Manage Plan page
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [newFeatureText, setNewFeatureText] = useState<string>('');

  // ==================== TOAST HELPER ====================
  const showToast = (type: ToastType, message: string): void => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // ==================== NAVIGATION & EDITOR HANDLERS ====================
  const handleOpenManagePlan = (plan: Plan): void => {
    setEditingPlan({
      ...plan,
      features: [...plan.features]
    });
    setNewFeatureText('');
    setActiveSubView('manage');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCreateNewPlan = (): void => {
    const newPlanTemplate: Plan = {
      id: `tier-${Date.now()}`,
      name: 'Scale Tier',
      badge: 'New Tier',
      priceMonthly: 49,
      priceAnnual: 39,
      billingNote: 'Billed monthly or $468/yr',
      color: '#a855f7',
      users: 0,
      status: 'active',
      isPopular: false,
      description: 'High-throughput tier for growing teams.',
      credits: 25000,
      rolloverCap: 10000,
      dailyApiLimit: 2500,
      unlimitedApi: false,
      maxTokensPerCall: 65536,
      features: [
        '25,000 credits / mo',
        '2,500 Gemini API calls / day',
        'Team workspace sharing'
      ]
    };
    setEditingPlan(newPlanTemplate);
    setNewFeatureText('');
    setActiveSubView('manage');
  };

  const handleSavePlan = (e?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>): void => {
    if (e) e.preventDefault();
    if (!editingPlan) return;

    if (!editingPlan.name.trim()) {
      showToast('error', 'Plan name cannot be empty');
      return;
    }

    setPlans((prev) => {
      const exists = prev.some((p) => p.id === editingPlan.id);
      if (exists) {
        return prev.map((p) => (p.id === editingPlan.id ? editingPlan : p));
      }
      return [...prev, editingPlan];
    });

    showToast('success', `${editingPlan.name} plan configuration saved`);
    setActiveSubView('list');
  };

  const handleResetChanges = (): void => {
    if (!editingPlan) return;
    const original = plans.find((p) => p.id === editingPlan.id);
    if (original) {
      setEditingPlan({ ...original, features: [...original.features] });
      showToast('info', 'Reverted unsaved changes');
    }
  };

  // ==================== FEATURE LIST HANDLERS ====================
  const handleFeatureTextChange = (index: number, value: string): void => {
    if (!editingPlan) return;
    const updated = [...editingPlan.features];
    updated[index] = value;
    setEditingPlan({ ...editingPlan, features: updated });
  };

  const handleAddFeature = (): void => {
    if (!editingPlan || !newFeatureText.trim()) return;
    setEditingPlan({
      ...editingPlan,
      features: [...editingPlan.features, newFeatureText.trim()]
    });
    setNewFeatureText('');
  };

  const handleRemoveFeature = (index: number): void => {
    if (!editingPlan) return;
    setEditingPlan({
      ...editingPlan,
      features: editingPlan.features.filter((_, idx) => idx !== index)
    });
  };

  const handleMoveFeature = (index: number, direction: -1 | 1): void => {
    if (!editingPlan) return;
    const updated = [...editingPlan.features];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= updated.length) return;
    [updated[index], updated[targetIndex]] = [updated[targetIndex], updated[index]];
    setEditingPlan({ ...editingPlan, features: updated });
  };

  const handleCreditsChange = (nextVal: number): void => {
    if (!editingPlan) return;
    const clamped = Math.max(0, nextVal);
    const updatedFeatures = [...editingPlan.features];
    if (updatedFeatures[0] && updatedFeatures[0].toLowerCase().includes('credit')) {
      updatedFeatures[0] = `${clamped.toLocaleString()} credits / mo`;
    }
    setEditingPlan({
      ...editingPlan,
      credits: clamped,
      features: updatedFeatures
    });
  };

  // ==================== METRICS CALCULATIONS ====================
  const totalActiveUsers = plans.reduce((acc, p) => acc + p.users, 0);
  const estimatedMRR = plans.reduce((acc, p) => acc + p.priceMonthly * p.users, 0);
  const totalMonthlyCreditsIssued = plans.reduce((acc, p) => acc + p.credits * p.users, 0);

  const filteredPlans = plans.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="min-h-screen text-[#e8e6f0] font-sans antialiased selection:bg-purple-500/35 selection:text-purple-100"
      style={{
        backgroundColor: '#0a0a0f',
        backgroundImage: `
          radial-gradient(ellipse at 15% 10%, rgba(76, 29, 149, 0.18) 0%, transparent 60%),
          radial-gradient(ellipse at 85% 20%, rgba(109, 40, 217, 0.12) 0%, transparent 55%),
          radial-gradient(ellipse at 50% 90%, rgba(88, 28, 135, 0.08) 0%, transparent 50%),
          radial-gradient(ellipse at 5% 60%, rgba(30, 20, 60, 0.4) 0%, transparent 40%)
        `,
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ==================== SIDEBAR ==================== */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-[264px] bg-[#0a0a12]/95 backdrop-blur-xl border-r border-purple-500/15 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-[72px] lg:w-[264px]'
        }`}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-purple-500/15 shrink-0 md:justify-center lg:justify-start">
          <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-[#4c1d95] to-[#8b5cf6] flex items-center justify-center text-xl font-black text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] shrink-0">
            C
          </div>
          <span className="text-lg font-extrabold tracking-tight text-[#e8e6f0] md:hidden lg:inline">
            KAi<span className="bg-gradient-to-r from-[#a855f7] to-[#d8b4fe] bg-clip-text text-transparent">Admin</span>
          </span>
          <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-purple-500/20 text-[#d8b4fe] border border-purple-500/30 md:hidden lg:inline">
            Admin
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          <div className="text-[10px] font-semibold uppercase tracking-[1.8px] text-[#64748b] px-3 pt-3 pb-1.5 md:hidden lg:block">
            Overview
          </div>
          <button
            type="button"
            onClick={() => {
              setActiveSubView('list');
              showToast('info', 'Viewing Plans Module');
            }}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-[14px] text-[#94a3b8] hover:text-[#e8e6f0] hover:bg-purple-500/10 transition text-sm font-medium md:justify-center lg:justify-start cursor-pointer"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z" />
            </svg>
            <span className="md:hidden lg:inline">Dashboard</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveSubView('list');
              showToast('info', 'Viewing Plans Module');
            }}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-[14px] text-[#94a3b8] hover:text-[#e8e6f0] hover:bg-purple-500/10 transition text-sm font-medium md:justify-center lg:justify-start cursor-pointer"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span className="md:hidden lg:inline">Users</span>
            <span className="ml-auto text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-[#d8b4fe] md:hidden lg:inline">
              {totalActiveUsers}
            </span>
          </button>

          <div className="text-[10px] font-semibold uppercase tracking-[1.8px] text-[#64748b] px-3 pt-4 pb-1.5 md:hidden lg:block">
            Billing & Usage
          </div>
          <button
            type="button"
            onClick={() => setActiveSubView('list')}
            className="relative flex items-center gap-3 px-3.5 py-2.5 rounded-[14px] bg-purple-500/15 text-[#d8b4fe] border border-purple-500/30 shadow-[0_0_20px_rgba(124,58,237,0.2)] transition text-sm font-medium md:justify-center lg:justify-start cursor-pointer"
          >
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-gradient-to-b from-[#a855f7] to-[#8b5cf6] rounded-r" />
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="md:hidden lg:inline">Plans</span>
            <span className="ml-auto text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-500/25 text-[#d8b4fe] md:hidden lg:inline">
              {plans.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => showToast('info', 'Gemini Usage tab')}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-[14px] text-[#94a3b8] hover:text-[#e8e6f0] hover:bg-purple-500/10 transition text-sm font-medium md:justify-center lg:justify-start cursor-pointer"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
            <span className="md:hidden lg:inline">Gemini Usage</span>
          </button>
        </nav>

        {/* Admin Footer */}
        <div className="p-4 border-t border-purple-500/15 flex items-center gap-2.5 md:justify-center lg:justify-start">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4c1d95] to-[#a855f7] flex items-center justify-center font-bold text-sm text-white ring-2 ring-purple-500/30 shrink-0">
            AR
          </div>
          <div className="min-w-0 md:hidden lg:block">
            <div className="text-[13px] font-semibold text-[#e8e6f0] truncate">Alex Rodriguez</div>
            <div className="text-[11px] text-[#64748b] font-medium">Super Admin</div>
          </div>
        </div>
      </aside>

      {/* ==================== MAIN CONTENT ==================== */}
      <main className="md:ml-[72px] lg:ml-[264px] min-h-screen px-4 sm:px-6 pb-12 transition-all">
        {/* Topbar */}
        <header className="sticky top-0 z-30 h-16 -mx-4 sm:-mx-6 px-4 sm:px-6 bg-[#0a0a12]/85 backdrop-blur-xl border-b border-purple-500/15 flex items-center gap-4">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle navigation"
            className="md:hidden w-10 h-10 rounded-[14px] border border-purple-500/15 flex items-center justify-center text-[#94a3b8] hover:text-white hover:border-purple-500/30"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <svg
              className="w-4 h-4 text-[#64748b] absolute left-3.5 top-1/2 -translate-y-1/2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              placeholder="Search plans, features, or descriptions..."
              className="w-full pl-10 pr-4 py-2 rounded-[14px] border border-purple-500/15 bg-[#12101e]/60 text-sm text-[#e8e6f0] placeholder-[#64748b] focus:outline-none focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/15 transition"
            />
          </div>

          <div className="ml-auto flex items-center gap-2.5">
            {activeSubView === 'manage' && (
              <button
                type="button"
                onClick={() => setActiveSubView('list')}
                className="px-3.5 py-2 rounded-[12px] text-xs font-semibold bg-purple-500/10 border border-purple-500/25 text-[#d8b4fe] hover:bg-purple-500/20 transition cursor-pointer"
              >
                ← All Plans
              </button>
            )}
            <button
              type="button"
              onClick={() => showToast('info', 'All plan configurations synced')}
              className="w-10 h-10 rounded-[14px] border border-purple-500/15 flex items-center justify-center text-[#94a3b8] hover:text-white hover:border-purple-500/30 hover:bg-purple-500/10 transition relative cursor-pointer"
              title="Notifications"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#a855f7] shadow-[0_0_8px_#a855f7] animate-pulse" />
            </button>
          </div>
        </header>

        {/* ===================================================================
            VIEW 1: PLANS OVERVIEW PAGE
        =================================================================== */}
        {activeSubView === 'list' && (
          <div>
            {/* Page Header */}
            <div className="pt-7 pb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-[#e8e6f0]">
                  Plan{' '}
                  <span className="bg-gradient-to-r from-[#a855f7] to-[#d8b4fe] bg-clip-text text-transparent">
                    Management
                  </span>
                </h1>
                <p className="text-sm text-[#94a3b8] mt-1">
                  Manage subscription tiers, pricing, feature copy, and monthly credit allocations.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Monthly / Annual Preview Toggle */}
                <div className="inline-flex p-1 rounded-[14px] bg-[#12101e]/90 border border-purple-500/15">
                  <button
                    type="button"
                    onClick={() => setBillingCycle('monthly')}
                    className={`px-3 py-1.5 rounded-[10px] text-xs font-semibold transition cursor-pointer ${
                      billingCycle === 'monthly'
                        ? 'bg-purple-600/30 text-[#d8b4fe] border border-purple-500/30 shadow-[0_0_12px_rgba(139,92,246,0.2)]'
                        : 'text-[#94a3b8] hover:text-white'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    onClick={() => setBillingCycle('annual')}
                    className={`px-3 py-1.5 rounded-[10px] text-xs font-semibold transition cursor-pointer ${
                      billingCycle === 'annual'
                        ? 'bg-purple-600/30 text-[#d8b4fe] border border-purple-500/30 shadow-[0_0_12px_rgba(139,92,246,0.2)]'
                        : 'text-[#94a3b8] hover:text-white'
                    }`}
                  >
                    Annual (Save 20%)
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleCreateNewPlan}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[14px] text-sm font-semibold text-white bg-gradient-to-r from-[#4c1d95] to-[#6d28d9] hover:from-[#6d28d9] hover:to-[#8b5cf6] border border-purple-500/30 shadow-[0_0_20px_rgba(124,58,237,0.25)] transition transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Create New Tier
                </button>
              </div>
            </div>

            {/* Summary KPI Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
              <div className="bg-[#12101e]/75 backdrop-blur-md border border-purple-500/15 rounded-[20px] p-5 hover:border-purple-500/30 transition">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b] mb-1">
                  Active Tiers
                </div>
                <div className="text-3xl font-black tracking-tight text-[#e8e6f0]">{plans.length}</div>
                <div className="text-xs font-semibold text-[#34d399] mt-1.5">All tiers operational</div>
              </div>

              <div className="bg-[#12101e]/75 backdrop-blur-md border border-purple-500/15 rounded-[20px] p-5 hover:border-purple-500/30 transition">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b] mb-1">
                  Estimated Plan MRR
                </div>
                <div className="text-3xl font-black tracking-tight text-[#e8e6f0] font-mono">
                  ${estimatedMRR.toLocaleString()}
                </div>
                <div className="text-xs font-semibold text-[#34d399] mt-1.5">
                  Across {totalActiveUsers} subscribed accounts
                </div>
              </div>

              <div className="bg-[#12101e]/75 backdrop-blur-md border border-purple-500/15 rounded-[20px] p-5 hover:border-purple-500/30 transition">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b] mb-1">
                  Monthly Credits Pool
                </div>
                <div className="text-3xl font-black tracking-tight text-[#e8e6f0] font-mono">
                  {totalMonthlyCreditsIssued.toLocaleString()}
                </div>
                <div className="text-xs font-semibold text-[#d8b4fe] mt-1.5">Auto-renews on 1st of month</div>
              </div>

              <div className="bg-[#12101e]/75 backdrop-blur-md border border-purple-500/15 rounded-[20px] p-5 hover:border-purple-500/30 transition">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b] mb-1">
                  Top Performing Tier
                </div>
                <div className="text-3xl font-black tracking-tight text-[#c084fc]">Pro</div>
                <div className="text-xs font-semibold text-[#94a3b8] mt-1.5">50% of active user base</div>
              </div>
            </div>

            {/* Plans Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredPlans.map((plan) => {
                const displayPrice = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceAnnual;
                return (
                  <div
                    key={plan.id}
                    className={`group relative bg-[#12101e]/75 backdrop-blur-md rounded-[20px] p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 border ${
                      plan.isPopular
                        ? 'border-purple-500/40 shadow-[0_0_35px_rgba(124,58,237,0.2)]'
                        : 'border-purple-500/15 hover:border-purple-500/30'
                    } overflow-hidden`}
                  >
                    {/* Ambient Corner Glow */}
                    <div
                      className="absolute -top-12 -right-12 w-36 h-36 rounded-full pointer-events-none blur-2xl opacity-30 transition-opacity group-hover:opacity-60"
                      style={{ backgroundColor: plan.color }}
                    />

                    <div>
                      {/* Top Row: Tier Name + Badge */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className="text-xs font-bold uppercase tracking-[1.5px]"
                          style={{ color: plan.color }}
                        >
                          {plan.name}
                        </span>
                        <div className="flex items-center gap-2">
                          {plan.status !== 'active' && (
                            <span className="text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                              Archived
                            </span>
                          )}
                          {plan.badge && (
                            <span
                              className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border"
                              style={{
                                backgroundColor: `${plan.color}20`,
                                color: plan.color,
                                borderColor: `${plan.color}50`
                              }}
                            >
                              {plan.badge}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex items-baseline gap-1 my-1">
                        <span className="text-4xl font-black tracking-tight text-[#e8e6f0]">
                          ${displayPrice}
                        </span>
                        <span className="text-sm text-[#64748b] font-medium">/mo</span>
                      </div>
                      <div className="text-[11px] text-[#64748b] mb-3">{plan.billingNote}</div>

                      {/* Description */}
                      <p className="text-[13px] text-[#94a3b8] leading-relaxed mb-5 min-h-[40px]">
                        {plan.description}
                      </p>

                      {/* Allocation Highlight Pills */}
                      <div className="grid grid-cols-2 gap-2.5 p-3 rounded-[14px] bg-[#0a0a0f]/60 border border-purple-500/10 mb-5">
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-[#64748b] font-semibold">
                            Monthly Credits
                          </div>
                          <div className="text-sm font-bold font-mono text-[#e2e8f0] mt-0.5">
                            {plan.credits.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-[#64748b] font-semibold">
                            Daily Gemini API
                          </div>
                          <div className="text-sm font-bold font-mono text-[#d8b4fe] mt-0.5">
                            {plan.unlimitedApi ? 'Unlimited' : `${plan.dailyApiLimit.toLocaleString()}/day`}
                          </div>
                        </div>
                      </div>

                      {/* Active Users Indicator */}
                      <div className="flex items-center justify-between text-xs font-semibold text-[#64748b] mb-3 pb-2 border-b border-purple-500/10">
                        <span>Subscribed Accounts</span>
                        <span className="text-[#e8e6f0] font-mono">{plan.users} active users</span>
                      </div>

                      {/* Feature List */}
                      <div className="space-y-2 mb-6">
                        {plan.features.map((feat, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-[#94a3b8]">
                            <span className="mt-0.5 shrink-0" style={{ color: plan.color }}>
                              ✦
                            </span>
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenManagePlan(plan)}
                        className="w-full py-2.5 px-4 rounded-[14px] text-sm font-semibold text-white bg-gradient-to-r from-[#4c1d95] to-[#6d28d9] hover:from-[#6d28d9] hover:to-[#8b5cf6] border border-purple-500/30 shadow-[0_0_20px_rgba(124,58,237,0.25)] transition flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                        Manage Plan
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Comparison Matrix Table */}
            <div className="mt-8 bg-[#12101e]/75 backdrop-blur-md border border-purple-500/15 rounded-[20px] overflow-hidden">
              <div className="px-6 py-4 border-b border-purple-500/15 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#e8e6f0]">Tier Quota & Credit Matrix</h3>
                  <p className="text-xs text-[#64748b]">Live comparison of configured plan limits</p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[640px]">
                  <thead>
                    <tr className="border-b border-purple-500/15 text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
                      <th className="py-3.5 px-6">Tier</th>
                      <th className="py-3.5 px-6">Monthly Price</th>
                      <th className="py-3.5 px-6">Annual Price</th>
                      <th className="py-3.5 px-6">Monthly Credits</th>
                      <th className="py-3.5 px-6">Rollover Cap</th>
                      <th className="py-3.5 px-6">Daily API Calls</th>
                      <th className="py-3.5 px-6 text-right">Quick Edit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-500/10 text-sm">
                    {plans.map((p) => (
                      <tr key={p.id} className="hover:bg-purple-500/5 transition">
                        <td className="py-3.5 px-6 font-semibold text-[#e8e6f0] flex items-center gap-2.5">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                          {p.name}
                        </td>
                        <td className="py-3.5 px-6 font-mono text-[#e2e8f0]">${p.priceMonthly}/mo</td>
                        <td className="py-3.5 px-6 font-mono text-[#94a3b8]">${p.priceAnnual}/mo</td>
                        <td className="py-3.5 px-6 font-mono text-[#d8b4fe] font-semibold">
                          {p.credits.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-6 font-mono text-[#94a3b8]">
                          {p.rolloverCap > 0 ? p.rolloverCap.toLocaleString() : 'None'}
                        </td>
                        <td className="py-3.5 px-6 font-mono text-[#34d399]">
                          {p.unlimitedApi ? 'Unlimited' : p.dailyApiLimit.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-6 text-right">
                          <button
                            type="button"
                            onClick={() => handleOpenManagePlan(p)}
                            className="px-3 py-1.5 rounded-[10px] text-xs font-semibold bg-purple-500/10 text-[#d8b4fe] border border-purple-500/20 hover:bg-purple-500/20 transition cursor-pointer"
                          >
                            Edit Texts & Credits
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            VIEW 2: MANAGE PLAN PAGE (EDITOR + LIVE PREVIEW)
        =================================================================== */}
        {activeSubView === 'manage' && editingPlan && (
          <div>
            {/* Breadcrumb & Header */}
            <div className="pt-6 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-500/15 mb-6">
              <div>
                <button
                  type="button"
                  onClick={() => setActiveSubView('list')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#a855f7] hover:text-[#d8b4fe] mb-2 transition cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                  Back to Plans Overview
                </button>
                <h1 className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-[#e8e6f0]">
                  Manage{' '}
                  <span className="bg-gradient-to-r from-[#a855f7] to-[#d8b4fe] bg-clip-text text-transparent">
                    {editingPlan.name} Plan
                  </span>
                </h1>
                <p className="text-sm text-[#94a3b8] mt-0.5">
                  Edit display texts, adjust subscription pricing, and configure monthly credit & Gemini API quotas.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleResetChanges}
                  className="px-4 py-2.5 rounded-[14px] text-xs sm:text-sm font-semibold bg-purple-500/5 text-[#94a3b8] border border-purple-500/15 hover:text-white hover:border-purple-500/30 transition cursor-pointer"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={handleSavePlan}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[14px] text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#4c1d95] to-[#6d28d9] hover:from-[#6d28d9] hover:to-[#8b5cf6] border border-purple-500/35 shadow-[0_0_25px_rgba(124,58,237,0.35)] transition cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Save Plan Changes
                </button>
              </div>
            </div>

            {/* 2-Column Responsive Layout */}
            <form onSubmit={handleSavePlan} className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {/* LEFT COLUMN: EDIT CONTROLS */}
              <div className="lg:col-span-2 space-y-6">
                {/* 1. EDIT PLAN TEXTS & BRANDING */}
                <div className="bg-[#12101e]/75 backdrop-blur-md border border-purple-500/15 rounded-[20px] overflow-hidden">
                  <div className="px-6 py-4 border-b border-purple-500/15 flex items-center justify-between">
                    <div>
                      <h2 className="text-base font-bold text-[#e8e6f0]">1. Plan Texts & Messaging</h2>
                      <p className="text-xs text-[#64748b]">
                        Customize the public-facing title, badge, description, and feature list.
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-[#a855f7] bg-purple-500/10 px-2.5 py-1 rounded-md border border-purple-500/20">
                      ID: {editingPlan.id}
                    </span>
                  </div>

                  <div className="p-6 space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#64748b] mb-2">
                          Plan Name
                        </label>
                        <input
                          type="text"
                          value={editingPlan.name}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setEditingPlan({ ...editingPlan, name: e.target.value })
                          }
                          placeholder="e.g., Pro"
                          className="w-full px-3.5 py-2.5 rounded-[14px] border border-purple-500/15 bg-[#0d0d16] text-sm text-[#e8e6f0] focus:outline-none focus:border-purple-500/50"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#64748b] mb-2">
                          Highlight Badge Text
                        </label>
                        <input
                          type="text"
                          value={editingPlan.badge}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setEditingPlan({ ...editingPlan, badge: e.target.value })
                          }
                          placeholder="e.g., Most Popular"
                          className="w-full px-3.5 py-2.5 rounded-[14px] border border-purple-500/15 bg-[#0d0d16] text-sm text-[#e8e6f0] focus:outline-none focus:border-purple-500/50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#64748b] mb-2">
                        Plan Description Subtitle
                      </label>
                      <textarea
                        rows={2}
                        value={editingPlan.description}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                          setEditingPlan({ ...editingPlan, description: e.target.value })
                        }
                        placeholder="Describe who this plan is built for..."
                        className="w-full px-3.5 py-2.5 rounded-[14px] border border-purple-500/15 bg-[#0d0d16] text-sm text-[#e8e6f0] focus:outline-none focus:border-purple-500/50 resize-none"
                      />
                    </div>

                    {/* Theme Accent Picker */}
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#64748b] mb-2">
                        Tier Accent Color
                      </label>
                      <div className="flex flex-wrap items-center gap-2.5">
                        {COLOR_PRESETS.map((preset) => (
                          <button
                            key={preset.hex}
                            type="button"
                            onClick={() => setEditingPlan({ ...editingPlan, color: preset.hex })}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition cursor-pointer ${
                              editingPlan.color === preset.hex
                                ? 'border-white bg-white/10 text-white shadow-sm'
                                : 'border-purple-500/15 bg-[#0d0d16] text-[#94a3b8] hover:text-white'
                            }`}
                          >
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: preset.hex }} />
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Dynamic Feature Bullet Editor */}
                    <div className="pt-2 border-t border-purple-500/10">
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#64748b] mb-2.5">
                        Included Features List ({editingPlan.features.length})
                      </label>

                      <div className="space-y-2.5 mb-3">
                        {editingPlan.features.map((feat, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span
                              className="w-7 h-9 flex items-center justify-center text-sm font-bold shrink-0"
                              style={{ color: editingPlan.color }}
                            >
                              ✦
                            </span>
                            <input
                              type="text"
                              value={feat}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                handleFeatureTextChange(index, e.target.value)
                              }
                              className="flex-1 px-3.5 py-2 rounded-[12px] border border-purple-500/15 bg-[#0d0d16] text-sm text-[#e8e6f0] focus:outline-none focus:border-purple-500/50"
                            />
                            <button
                              type="button"
                              onClick={() => handleMoveFeature(index, -1)}
                              disabled={index === 0}
                              className="w-8 h-8 rounded-[10px] border border-purple-500/15 flex items-center justify-center text-[#64748b] hover:text-white disabled:opacity-30 cursor-pointer"
                              title="Move Up"
                            >
                              ↑
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMoveFeature(index, 1)}
                              disabled={index === editingPlan.features.length - 1}
                              className="w-8 h-8 rounded-[10px] border border-purple-500/15 flex items-center justify-center text-[#64748b] hover:text-white disabled:opacity-30 cursor-pointer"
                              title="Move Down"
                            >
                              ↓
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRemoveFeature(index)}
                              className="w-8 h-8 rounded-[10px] border border-red-500/20 bg-red-500/10 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition cursor-pointer"
                              title="Remove Feature"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Add New Feature Input */}
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={newFeatureText}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewFeatureText(e.target.value)}
                          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddFeature();
                            }
                          }}
                          placeholder="Add a new feature line item..."
                          className="flex-1 px-3.5 py-2 rounded-[12px] border border-dashed border-purple-500/30 bg-[#0d0d16]/60 text-sm text-[#e8e6f0] placeholder-[#64748b] focus:outline-none focus:border-purple-500"
                        />
                        <button
                          type="button"
                          onClick={handleAddFeature}
                          className="px-4 py-2 rounded-[12px] text-xs font-semibold bg-purple-500/15 text-[#d8b4fe] border border-purple-500/30 hover:bg-purple-500/25 transition cursor-pointer"
                        >
                          + Add Feature
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. MANAGE PLAN PRICES */}
                <div className="bg-[#12101e]/75 backdrop-blur-md border border-purple-500/15 rounded-[20px] overflow-hidden">
                  <div className="px-6 py-4 border-b border-purple-500/15">
                    <h2 className="text-base font-bold text-[#e8e6f0]">2. Pricing Configuration</h2>
                    <p className="text-xs text-[#64748b]">
                      Set monthly and annual subscription rates and billing subtext.
                    </p>
                  </div>

                  <div className="p-6 space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#64748b] mb-2">
                          Monthly Price ($ USD)
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-mono text-[#64748b]">
                            $
                          </span>
                          <input
                            type="number"
                            min="0"
                            step="1"
                            value={editingPlan.priceMonthly}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              setEditingPlan({
                                ...editingPlan,
                                priceMonthly: Math.max(0, Number(e.target.value))
                              })
                            }
                            className="w-full pl-8 pr-3.5 py-2.5 rounded-[14px] border border-purple-500/15 bg-[#0d0d16] text-sm font-mono text-[#e8e6f0] focus:outline-none focus:border-purple-500/50"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#64748b] mb-2">
                          Annual Rate ($ / mo)
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-mono text-[#64748b]">
                            $
                          </span>
                          <input
                            type="number"
                            min="0"
                            step="1"
                            value={editingPlan.priceAnnual}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              setEditingPlan({
                                ...editingPlan,
                                priceAnnual: Math.max(0, Number(e.target.value))
                              })
                            }
                            className="w-full pl-8 pr-3.5 py-2.5 rounded-[14px] border border-purple-500/15 bg-[#0d0d16] text-sm font-mono text-[#e8e6f0] focus:outline-none focus:border-purple-500/50"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#64748b] mb-2">
                          Billing Subtext Note
                        </label>
                        <input
                          type="text"
                          value={editingPlan.billingNote}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setEditingPlan({ ...editingPlan, billingNote: e.target.value })
                          }
                          placeholder="e.g., Billed monthly"
                          className="w-full px-3.5 py-2.5 rounded-[14px] border border-purple-500/15 bg-[#0d0d16] text-sm text-[#e8e6f0] focus:outline-none focus:border-purple-500/50"
                        />
                      </div>
                    </div>

                    {/* Quick Price Presets */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-xs text-[#64748b] mr-1">Quick Monthly Price:</span>
                      {[0, 19, 29, 49, 99, 199].map((presetPrice) => (
                        <button
                          key={presetPrice}
                          type="button"
                          onClick={() =>
                            setEditingPlan({
                              ...editingPlan,
                              priceMonthly: presetPrice,
                              priceAnnual: Math.round(presetPrice * 0.8)
                            })
                          }
                          className="px-2.5 py-1 rounded-lg text-xs font-mono bg-purple-500/10 text-[#d8b4fe] border border-purple-500/20 hover:bg-purple-500/20 transition cursor-pointer"
                        >
                          ${presetPrice}/mo
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3. EDIT CREDITS & GEMINI QUOTAS */}
                <div className="bg-[#12101e]/75 backdrop-blur-md border border-purple-500/15 rounded-[20px] overflow-hidden">
                  <div className="px-6 py-4 border-b border-purple-500/15">
                    <h2 className="text-base font-bold text-[#e8e6f0]">3. Credits & Gemini API Quotas</h2>
                    <p className="text-xs text-[#64748b]">
                      Configure monthly credit allowances, rollover caps, and Gemini token/call limits.
                    </p>
                  </div>

                  <div className="p-6 space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Monthly Credits */}
                      <div className="p-4 rounded-[16px] bg-[#0d0d16]/90 border border-purple-500/15">
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#94a3b8] mb-1.5">
                          Monthly Credits Allocation
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="100"
                          value={editingPlan.credits}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleCreditsChange(Number(e.target.value))
                          }
                          className="w-full px-3.5 py-2 rounded-[12px] border border-purple-500/25 bg-[#12101e] text-lg font-bold font-mono text-[#d8b4fe] focus:outline-none focus:border-purple-500"
                        />

                        {/* Quick Stepper Buttons */}
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {[-5000, -1000, 1000, 5000, 25000].map((delta) => (
                            <button
                              key={delta}
                              type="button"
                              onClick={() => handleCreditsChange(editingPlan.credits + delta)}
                              className="px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-purple-500/10 text-[#94a3b8] hover:text-white hover:bg-purple-500/20 border border-purple-500/15 transition cursor-pointer"
                            >
                              {delta > 0 ? `+${delta.toLocaleString()}` : delta.toLocaleString()}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Credit Rollover Cap */}
                      <div className="p-4 rounded-[16px] bg-[#0d0d16]/90 border border-purple-500/15">
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#94a3b8] mb-1.5">
                          Unused Credit Rollover Cap
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="500"
                          value={editingPlan.rolloverCap}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setEditingPlan({
                              ...editingPlan,
                              rolloverCap: Math.max(0, Number(e.target.value))
                            })
                          }
                          className="w-full px-3.5 py-2 rounded-[12px] border border-purple-500/25 bg-[#12101e] text-lg font-bold font-mono text-[#e2e8f0] focus:outline-none focus:border-purple-500"
                        />
                        <p className="text-[11px] text-[#64748b] mt-3">
                          Set to <code className="text-[#d8b4fe]">0</code> to disable monthly credit rollovers.
                        </p>
                      </div>
                    </div>

                    {/* Gemini API Daily Limits */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
                            Daily Gemini API Calls
                          </label>
                          <label className="inline-flex items-center gap-1.5 text-xs text-[#d8b4fe] cursor-pointer">
                            <input
                              type="checkbox"
                              checked={editingPlan.unlimitedApi}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setEditingPlan({ ...editingPlan, unlimitedApi: e.target.checked })
                              }
                              className="rounded border-purple-500/40 bg-[#0d0d16] text-purple-600 focus:ring-0"
                            />
                            Unlimited Calls
                          </label>
                        </div>
                        <input
                          type="number"
                          disabled={editingPlan.unlimitedApi}
                          value={editingPlan.dailyApiLimit}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setEditingPlan({
                              ...editingPlan,
                              dailyApiLimit: Math.max(1, Number(e.target.value))
                            })
                          }
                          className="w-full px-3.5 py-2.5 rounded-[14px] border border-purple-500/15 bg-[#0d0d16] text-sm font-mono text-[#e8e6f0] disabled:opacity-40 focus:outline-none focus:border-purple-500/50"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#64748b] mb-2">
                          Max Context Tokens / Request
                        </label>
                        <select
                          value={editingPlan.maxTokensPerCall}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            setEditingPlan({
                              ...editingPlan,
                              maxTokensPerCall: Number(e.target.value)
                            })
                          }
                          className="w-full px-3.5 py-2.5 rounded-[14px] border border-purple-500/15 bg-[#0d0d16] text-sm font-mono text-[#e8e6f0] focus:outline-none focus:border-purple-500/50"
                        >
                          <option value={4096}>4,096 tokens (Standard)</option>
                          <option value={16384}>16,384 tokens (Extended)</option>
                          <option value={32768}>32,768 tokens (Pro)</option>
                          <option value={65536}>65,536 tokens (High Context)</option>
                          <option value={128000}>128,000 tokens (Enterprise Ultra)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: STICKY LIVE CARD PREVIEW & STATUS */}
              <div className="lg:sticky lg:top-24 space-y-5">
                <div className="bg-[#12101e]/90 backdrop-blur-md border border-purple-500/25 rounded-[20px] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#a855f7]">
                      Live Card Preview
                    </span>
                    <span className="text-[11px] text-[#64748b]">Updates as you type</span>
                  </div>

                  {/* Live Preview Card */}
                  <div className="relative bg-[#0d0d16] rounded-[18px] p-5 border border-purple-500/30 shadow-[0_0_30px_rgba(124,58,237,0.18)] overflow-hidden">
                    <div
                      className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl opacity-35 pointer-events-none"
                      style={{ backgroundColor: editingPlan.color }}
                    />

                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span
                        className="text-xs font-bold uppercase tracking-[1.5px]"
                        style={{ color: editingPlan.color }}
                      >
                        {editingPlan.name || 'Untitled'}
                      </span>
                      {editingPlan.badge && (
                        <span
                          className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border"
                          style={{
                            backgroundColor: `${editingPlan.color}20`,
                            color: editingPlan.color,
                            borderColor: `${editingPlan.color}50`
                          }}
                        >
                          {editingPlan.badge}
                        </span>
                      )}
                    </div>

                    <div className="flex items-baseline gap-1 my-1">
                      <span className="text-3xl font-black text-[#e8e6f0]">
                        ${editingPlan.priceMonthly}
                      </span>
                      <span className="text-xs text-[#64748b]">/mo</span>
                      {editingPlan.priceAnnual > 0 && (
                        <span className="ml-2 text-[11px] font-mono text-[#34d399]">
                          (${editingPlan.priceAnnual}/mo annual)
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-[#64748b] mb-3">{editingPlan.billingNote}</div>

                    <p className="text-xs text-[#94a3b8] leading-relaxed mb-4">
                      {editingPlan.description || 'No description provided.'}
                    </p>

                    <div className="grid grid-cols-2 gap-2 p-2.5 rounded-[12px] bg-[#12101e] border border-purple-500/15 mb-4">
                      <div>
                        <div className="text-[9px] uppercase text-[#64748b] font-semibold">Credits</div>
                        <div className="text-xs font-mono font-bold text-[#e2e8f0]">
                          {editingPlan.credits.toLocaleString()}/mo
                        </div>
                      </div>
                      <div>
                        <div className="text-[9px] uppercase text-[#64748b] font-semibold">Gemini Calls</div>
                        <div className="text-xs font-mono font-bold text-[#d8b4fe]">
                          {editingPlan.unlimitedApi ? 'Unlimited' : `${editingPlan.dailyApiLimit}/day`}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5 mb-4">
                      {editingPlan.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-[#94a3b8]">
                          <span style={{ color: editingPlan.color }}>✦</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    <div className="w-full py-2 rounded-[12px] text-xs font-semibold text-center text-white bg-gradient-to-r from-[#4c1d95] to-[#6d28d9] opacity-90">
                      Subscribe to {editingPlan.name}
                    </div>
                  </div>

                  {/* Visibility & Highlight Toggles */}
                  <div className="mt-5 pt-4 border-t border-purple-500/15 space-y-3">
                    <label className="flex items-center justify-between text-xs text-[#94a3b8] cursor-pointer">
                      <span>Highlight as "Most Popular"</span>
                      <input
                        type="checkbox"
                        checked={editingPlan.isPopular}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setEditingPlan({ ...editingPlan, isPopular: e.target.checked })
                        }
                        className="rounded border-purple-500/40 bg-[#0d0d16] text-purple-600"
                      />
                    </label>

                    <label className="flex items-center justify-between text-xs text-[#94a3b8] cursor-pointer">
                      <span>Plan Status</span>
                      <select
                        value={editingPlan.status}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                          setEditingPlan({
                            ...editingPlan,
                            status: e.target.value as PlanStatus
                          })
                        }
                        className="px-2.5 py-1 rounded-lg border border-purple-500/20 bg-[#0d0d16] text-xs text-[#e8e6f0]"
                      >
                        <option value="active">Active (Visible)</option>
                        <option value="archived">Archived (Hidden)</option>
                      </select>
                    </label>
                  </div>

                  {/* Impact Notice */}
                  <div className="mt-4 p-3 rounded-[12px] bg-purple-500/10 border border-purple-500/20 text-[11px] text-[#d8b4fe]">
                    Saving changes will update pricing & credit quotas for{' '}
                    <strong className="font-mono">{editingPlan.users} active users</strong> currently on the{' '}
                    <strong>{editingPlan.name}</strong> tier.
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* ==================== TOAST CONTAINER ==================== */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto px-4 py-3 rounded-[14px] text-xs font-medium flex items-center gap-2.5 shadow-2xl border backdrop-blur-md transition-all ${
              t.type === 'success'
                ? 'bg-emerald-500/15 border-emerald-500/35 text-emerald-300'
                : t.type === 'error'
                ? 'bg-red-500/15 border-red-500/35 text-red-300'
                : 'bg-purple-500/15 border-purple-500/35 text-[#d8b4fe]'
            }`}
          >
            <span>{t.type === 'success' ? '✅' : t.type === 'error' ? '❌' : 'ℹ️'}</span>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KAiPlansModule;