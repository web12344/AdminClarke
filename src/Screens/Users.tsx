import { useState, useMemo, useEffect, useCallback } from "react";
import type { FC, CSSProperties } from "react";
import {
  LayoutDashboard,
  Users as UsersIcon,
  Layers,
  Sparkles,
  Settings,
  Search,
  Bell,
  Download,
  Pencil,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  Menu,
  TriangleAlert,
} from "lucide-react";
import Topbar from "../components/Topbar";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
type Plan = "free" | "pro" | "enterprise";
type Status = "active" | "suspended";
type FilterKey = "all" | Plan | "suspended";
type SortField = "name" | "credits" | "geminiCost";
type SortDir = "asc" | "desc";
type ToastType = "success" | "error" | "info";

interface User {
  id: number;
  name: string;
  email: string;
  plan: Plan;
  status: Status;
  credits: number;
  geminiCost: number;
  joined: string;
  apiCalls: number;
  tokens: string;
  avatarHue: number;
}

interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  leaving?: boolean;
}

interface NavEntry {
  type: "section" | "item";
  key?: string;
  label: string;
  Icon?: FC<{ size?: number; className?: string }>;
  badge?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Mock data                                                          */
/* ------------------------------------------------------------------ */
const INITIAL_USERS: User[] = [
  {
    id: 1,
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    plan: "enterprise",
    status: "active",
    credits: 25000,
    geminiCost: 412.75,
    joined: "2025-02-14",
    apiCalls: 48200,
    tokens: "3.2M",
    avatarHue: 265,
  },
  {
    id: 2,
    name: "Marcus Johnson",
    email: "marcus.j@example.com",
    plan: "pro",
    status: "active",
    credits: 12000,
    geminiCost: 89.42,
    joined: "2025-03-02",
    apiCalls: 12800,
    tokens: "890K",
    avatarHue: 220,
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    email: "elena.r@example.com",
    plan: "pro",
    status: "active",
    credits: 8300,
    geminiCost: 54.18,
    joined: "2025-03-18",
    apiCalls: 7600,
    tokens: "520K",
    avatarHue: 190,
  },
  {
    id: 4,
    name: "David Kim",
    email: "david.kim@example.com",
    plan: "free",
    status: "active",
    credits: 500,
    geminiCost: 0,
    joined: "2025-04-01",
    apiCalls: 120,
    tokens: "8K",
    avatarHue: 150,
  },
  {
    id: 5,
    name: "Aisha Patel",
    email: "aisha.p@example.com",
    plan: "enterprise",
    status: "active",
    credits: 45000,
    geminiCost: 712.33,
    joined: "2025-01-20",
    apiCalls: 85000,
    tokens: "5.8M",
    avatarHue: 310,
  },
  {
    id: 6,
    name: "Tom Wilson",
    email: "tom.wilson@example.com",
    plan: "pro",
    status: "active",
    credits: 6500,
    geminiCost: 41.05,
    joined: "2025-03-25",
    apiCalls: 5900,
    tokens: "410K",
    avatarHue: 140,
  },
  {
    id: 7,
    name: "Nina Ivanova",
    email: "nina.i@example.com",
    plan: "pro",
    status: "active",
    credits: 9200,
    geminiCost: 67.89,
    joined: "2025-02-28",
    apiCalls: 8900,
    tokens: "610K",
    avatarHue: 280,
  },
  {
    id: 8,
    name: "James Carter",
    email: "james.c@example.com",
    plan: "free",
    status: "active",
    credits: 1000,
    geminiCost: 2.15,
    joined: "2025-04-10",
    apiCalls: 340,
    tokens: "22K",
    avatarHue: 170,
  },
  {
    id: 9,
    name: "Priya Sharma",
    email: "priya.s@example.com",
    plan: "enterprise",
    status: "active",
    credits: 60000,
    geminiCost: 945.67,
    joined: "2025-01-08",
    apiCalls: 112000,
    tokens: "8.1M",
    avatarHue: 330,
  },
  {
    id: 10,
    name: "Lucas Mendes",
    email: "lucas.m@example.com",
    plan: "pro",
    status: "active",
    credits: 7800,
    geminiCost: 48.92,
    joined: "2025-03-12",
    apiCalls: 7200,
    tokens: "490K",
    avatarHue: 240,
  },
  {
    id: 11,
    name: "Emma Thompson",
    email: "emma.t@example.com",
    plan: "pro",
    status: "active",
    credits: 5400,
    geminiCost: 35.77,
    joined: "2025-04-03",
    apiCalls: 5100,
    tokens: "360K",
    avatarHue: 290,
  },
  {
    id: 12,
    name: "Omar Hassan",
    email: "omar.h@example.com",
    plan: "free",
    status: "active",
    credits: 800,
    geminiCost: 0.95,
    joined: "2025-04-15",
    apiCalls: 180,
    tokens: "12K",
    avatarHue: 120,
  },
  {
    id: 13,
    name: "Yuki Tanaka",
    email: "yuki.t@example.com",
    plan: "enterprise",
    status: "active",
    credits: 38000,
    geminiCost: 598.21,
    joined: "2025-02-05",
    apiCalls: 71000,
    tokens: "4.9M",
    avatarHue: 260,
  },
  {
    id: 14,
    name: "Carlos Ruiz",
    email: "carlos.r@example.com",
    plan: "pro",
    status: "active",
    credits: 11000,
    geminiCost: 73.45,
    joined: "2025-03-07",
    apiCalls: 10200,
    tokens: "710K",
    avatarHue: 200,
  },
  {
    id: 15,
    name: "Anna Kowalski",
    email: "anna.k@example.com",
    plan: "pro",
    status: "active",
    credits: 4800,
    geminiCost: 29.88,
    joined: "2025-04-06",
    apiCalls: 4300,
    tokens: "300K",
    avatarHue: 300,
  },
  {
    id: 16,
    name: "Ben Osei",
    email: "ben.o@example.com",
    plan: "free",
    status: "suspended",
    credits: 0,
    geminiCost: 0,
    joined: "2025-03-30",
    apiCalls: 45,
    tokens: "3K",
    avatarHue: 130,
  },
  {
    id: 17,
    name: "Lisa Andersen",
    email: "lisa.a@example.com",
    plan: "enterprise",
    status: "active",
    credits: 52000,
    geminiCost: 828.44,
    joined: "2025-01-15",
    apiCalls: 98000,
    tokens: "7.2M",
    avatarHue: 270,
  },
  {
    id: 18,
    name: "Ravi Patel",
    email: "ravi.p@example.com",
    plan: "pro",
    status: "active",
    credits: 6800,
    geminiCost: 44.31,
    joined: "2025-03-20",
    apiCalls: 6300,
    tokens: "430K",
    avatarHue: 180,
  },
];

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "free", label: "Free" },
  { key: "pro", label: "Pro" },
  { key: "enterprise", label: "Enterprise" },
  { key: "suspended", label: "Suspended" },
];

const PLAN_OPTIONS: { value: Plan; label: string }[] = [
  { value: "free", label: "Free — $0/mo" },
  { value: "pro", label: "Pro — $29/mo" },
  { value: "enterprise", label: "Enterprise — $99/mo" },
];

const NAV: NavEntry[] = [
  { type: "section", label: "Overview" },
  { type: "item", key: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { type: "item", key: "users", label: "Users", Icon: UsersIcon, badge: true },
  { type: "section", label: "Billing & Usage" },
  { type: "item", key: "plans", label: "Plans", Icon: Layers },
  { type: "item", key: "gemini", label: "Gemini Usage", Icon: Sparkles },
  { type: "section", label: "System" },
  { type: "item", key: "settings", label: "Settings", Icon: Settings },
];

const TOAST_ICONS: Record<ToastType, string> = {
  success: "✅",
  error: "❌",
  info: "ℹ️",
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const titleCase = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

const avatarStyle = (hue: number): CSSProperties => ({
  background: `linear-gradient(135deg, hsl(${hue}, 55%, 35%), hsl(${hue + 30}, 55%, 50%))`,
});

/* ------------------------------------------------------------------ */
/*  Reusable class strings                                             */
/* ------------------------------------------------------------------ */
const cardBase =
  "bg-[rgba(18,16,30,0.75)] backdrop-blur-xl border border-[#a855f7]/[0.12] rounded-2xl";

const btnBase =
  "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200 border whitespace-nowrap select-none";

const btnPrimary = `${btnBase} bg-gradient-to-br from-[#4c1d95] to-[#6d28d9] text-white border-purple-500/25 shadow-[0_0_20px_rgba(124,58,237,0.25)] hover:from-[#6d28d9] hover:to-[#8b5cf6] hover:shadow-[0_0_40px_rgba(124,58,237,0.35)] hover:-translate-y-px`;

const btnGhost = `${btnBase} bg-purple-500/6 text-slate-400 border-[#a855f7]/[0.12] hover:bg-purple-500/12 hover:text-slate-100 hover:border-purple-500/25`;

const btnDanger = `${btnBase} bg-red-500/10 text-red-400 border-red-500/25 hover:bg-red-500/18 hover:border-red-500/40 disabled:opacity-40 disabled:cursor-not-allowed`;

const inputBase =
  "w-full rounded-xl border border-[#a855f7]/[0.12] bg-[rgba(16,14,28,0.6)] text-[#e8e6f0] text-sm outline-none transition-all duration-200 focus:border-purple-500/35 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.1)] placeholder:text-slate-500";

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */
const SortableTh: FC<{
  label: string;
  field: SortField;
  sort: { field: SortField; dir: SortDir };
  onSort: (f: SortField) => void;
}> = ({ label, field, sort, onSort }) => {
  const active = sort.field === field;
  const Icon = active
    ? sort.dir === "asc"
      ? ArrowUp
      : ArrowDown
    : ArrowUpDown;
  return (
    <th
      onClick={() => onSort(field)}
      className="text-left px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-[1.2px] text-slate-500 border-b border-[#a855f7]/[0.12] whitespace-nowrap cursor-pointer select-none hover:text-slate-400 transition-colors"
    >
      <span className="inline-flex items-center gap-1.5">
        {label}
        <Icon size={12} className={active ? "text-purple-300" : "opacity-50"} />
      </span>
    </th>
  );
};

const PlanBadge: FC<{ plan: Plan }> = ({ plan }) => {
  const styles: Record<Plan, string> = {
    free: "bg-slate-500/15 text-slate-400 border border-slate-500/30",
    pro: "bg-purple-500/15 text-purple-200 border border-purple-500/35",
    enterprise:
      "bg-[#4c1d95]/20 text-purple-300 border border-purple-500/40 shadow-[0_0_12px_rgba(124,58,237,0.2)]",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide whitespace-nowrap ${styles[plan]}`}
    >
      {titleCase(plan)}
    </span>
  );
};

const StatusIndicator: FC<{ status: Status }> = ({ status }) => {
  const dot: Record<Status, string> = {
    active: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]",
    suspended: "bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.5)]",
  };
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300">
      <span className={`w-[7px] h-[7px] rounded-full ${dot[status]}`} />
      {titleCase(status)}
    </span>
  );
};

const UserCell: FC<{ user: User }> = ({ user }) => (
  <div className="flex items-center gap-2.5">
    <div
      className="w-8.5 h-8.5 min-w-[34px] min-h-[34px] rounded-full flex items-center justify-center font-bold text-[13px] text-white"
      style={avatarStyle(user.avatarHue)}
    >
      {user.name.charAt(0)}
    </div>
    <div>
      <div className="text-[13px] font-semibold text-[#e8e6f0]">
        {user.name}
      </div>
      <div className="text-xs text-slate-500">{user.email}</div>
    </div>
  </div>
);

const Toast: FC<{ toast: ToastItem }> = ({ toast }) => {
  const styles: Record<ToastType, string> = {
    success: "bg-emerald-500/12 border-emerald-500/35 text-emerald-300",
    error: "bg-red-500/12 border-red-500/35 text-red-300",
    info: "bg-purple-500/12 border-purple-500/35 text-purple-200",
  };
  return (
    <div
      className={`flex items-center gap-2.5 px-4.5 py-3.5 rounded-xl text-[13px] font-medium border shadow-2xl backdrop-blur-md ${
        styles[toast.type]
      } ${toast.leaving ? "animate-[toastOut_0.3s_forwards]" : "animate-[toastIn_0.3s]"}`}
    >
      <span>{TOAST_ICONS[toast.type]}</span>
      {toast.message}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Main page                                                          */
/* ------------------------------------------------------------------ */
export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [sort, setSort] = useState<{ field: SortField; dir: SortDir }>({
    field: "name",
    dir: "asc",
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [planDraft, setPlanDraft] = useState<Plan>("free");
  const [creditDraft, setCreditDraft] = useState("");
  const [confirmText, setConfirmText] = useState("");

  const [toasts, setToasts] = useState<ToastItem[]>([]);

  /* ---------- toasts ---------- */
  const pushToast = useCallback((type: ToastType, message: string) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((t) => [...t, { id, type, message }]);
    setTimeout(() => {
      setToasts((t) =>
        t.map((x) => (x.id === id ? { ...x, leaving: true } : x)),
      );
      setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 300);
    }, 2800);
  }, []);

  /* ---------- escape key ---------- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDetailOpen(false);
        setEditOpen(false);
        setDeleteOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  /* ---------- derived counts ---------- */
  const counts = useMemo(
    () => ({
      all: users.length,
      free: users.filter((u) => u.plan === "free").length,
      pro: users.filter((u) => u.plan === "pro").length,
      enterprise: users.filter((u) => u.plan === "enterprise").length,
      suspended: users.filter((u) => u.status === "suspended").length,
    }),
    [users],
  );

  const filtered = useMemo(() => {
    let list = [...users];

    if (filter !== "all") {
      list =
        filter === "suspended"
          ? list.filter((u) => u.status === "suspended")
          : list.filter((u) => u.plan === filter);
    }

    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (u) =>
          u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q),
      );
    }

    const { field, dir } = sort;
    list.sort((a, b) => {
      const va = a[field];
      const vb = b[field];
      const cmp =
        typeof va === "string" && typeof vb === "string"
          ? va.toLowerCase().localeCompare(vb.toLowerCase())
          : (va as number) - (vb as number);
      return dir === "asc" ? cmp : -cmp;
    });

    return list;
  }, [users, filter, search, sort]);

  const selectedUser = users.find((u) => u.id === selectedId) ?? null;

  /* ---------- actions ---------- */
  const openDetail = (user: User) => {
    setSelectedId(user.id);
    setDetailOpen(true);
  };

  const openEdit = (user: User) => {
    setSelectedId(user.id);
    setPlanDraft(user.plan);
    setCreditDraft("");
    setEditOpen(true);
  };

  const openDelete = (user: User) => {
    setSelectedId(user.id);
    setConfirmText("");
    setDeleteOpen(true);
  };

  const confirmEdit = () => {
    if (!selectedUser) return;
    const adjust = parseInt(creditDraft, 10) || 0;
    const added = adjust > 0 ? adjust : 0;

    setUsers((prev) =>
      prev.map((u) =>
        u.id === selectedUser.id
          ? { ...u, plan: planDraft, credits: u.credits + added }
          : u,
      ),
    );
    setEditOpen(false);
    setDetailOpen(false);
    pushToast(
      "success",
      `Plan updated to ${titleCase(planDraft)}${
        added ? ` with ${added.toLocaleString()} credits added` : ""
      }`,
    );
  };

  const confirmDelete = () => {
    if (!selectedUser || confirmText.trim() !== selectedUser.email) {
      pushToast("error", "Email does not match — deletion cancelled");
      return;
    }
    const name = selectedUser.name;
    setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
    setDeleteOpen(false);
    setDetailOpen(false);
    setSelectedId(null);
    pushToast("success", `Account for ${name} has been deleted`);
  };

  const toggleSort = (field: SortField) =>
    setSort((prev) =>
      prev.field === field
        ? { field, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { field, dir: "asc" },
    );

  /* ---------- render ---------- */
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#e8e6f0] font-sans antialiased relative">
      <CustomStyles />

      {/* Ambient purple gradient background */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 15% 10%, rgba(76,29,149,0.18) 0%, transparent 60%),
            radial-gradient(ellipse at 85% 20%, rgba(109,40,217,0.12) 0%, transparent 55%),
            radial-gradient(ellipse at 50% 90%, rgba(88,28,135,0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 5% 60%, rgba(30,20,60,0.4) 0%, transparent 40%)
          `,
        }}
      />

      {/* ==================== SIDEBAR ==================== */}

      {/* ==================== MAIN ==================== */}
      <main className="relative z-0  px-4 md:px-6 pb-10">
        <Topbar />

        {/* Page header */}
        <div className="flex flex-wrap items-end justify-between gap-4 pt-7 pb-5">
          <div>
            <h1 className="text-2xl md:text-[28px] text-left font-extrabold tracking-tight">
              User{" "}
              <span className="bg-gradient-to-br from-purple-400 to-purple-200 bg-clip-text text-transparent">
                Management
              </span>
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">
              View, search, filter, and manage all platform accounts.
            </p>
          </div>
        </div>

        {/* Users card */}
        <section className={cardBase}>
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-5 border-b border-[#a855f7]/[0.12]">
            <div>
              <div className="text-base font-bold tracking-tight">
                All Users
              </div>
              <div className="text-xs text-slate-500 mt-0.5 text-left">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              </div>
            </div>
          </div>

          <div className="p-5">
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              {/* <div className="relative flex-1 min-w-[200px] max-w-[360px]">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={`${inputBase} pl-9 py-2 text-[13px]`}
                />
              </div> */}

              {FILTERS.map((f) => {
                const active = filter === f.key;
                return (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setFilter(f.key)}
                    className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-all duration-200 border ${
                      active
                        ? "bg-purple-500/14 border-purple-500/25 text-purple-200 shadow-[0_0_16px_rgba(139,92,246,0.15)]"
                        : "bg-transparent border-[#a855f7]/[0.12] text-slate-400 hover:border-purple-500/25 hover:text-slate-100 hover:bg-purple-500/6"
                    }`}
                  >
                    {f.label}{" "}
                    <span
                      className={`text-[11px] font-semibold ml-1 ${
                        active ? "text-purple-200" : "text-slate-500"
                      }`}
                    >
                      {counts[f.key]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Empty state */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                <Search size={56} className="text-slate-600 opacity-60 mb-4" />
                <h4 className="text-base font-semibold text-slate-400 mb-1">
                  No users found
                </h4>
                <p className="text-[13px] text-slate-500 max-w-[320px]">
                  Try adjusting your search terms or filters to find what you're
                  looking for.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto -mx-5 px-5">
                <table className="w-full border-collapse text-sm min-w-[900px]">
                  <thead>
                    <tr>
                      <SortableTh
                        label="User"
                        field="name"
                        sort={sort}
                        onSort={toggleSort}
                      />
                      <th className="text-left px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-[1.2px] text-slate-500 border-b border-[#a855f7]/[0.12] whitespace-nowrap">
                        Plan
                      </th>
                      <th className="text-left px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-[1.2px] text-slate-500 border-b border-[#a855f7]/[0.12] whitespace-nowrap">
                        Status
                      </th>
                      <SortableTh
                        label="Credits"
                        field="credits"
                        sort={sort}
                        onSort={toggleSort}
                      />
                      <SortableTh
                        label="Gemini Cost (30d)"
                        field="geminiCost"
                        sort={sort}
                        onSort={toggleSort}
                      />
                      <th className="text-left px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-[1.2px] text-slate-500 border-b border-[#a855f7]/[0.12] whitespace-nowrap">
                        Joined
                      </th>
                      <th className="text-left px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-[1.2px] text-slate-500 border-b border-[#a855f7]/[0.12] whitespace-nowrap">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((u) => (
                      <tr
                        key={u.id}
                        onClick={() => openDetail(u)}
                        className="border-b border-[#a855f7]/[0.12] last:border-b-0 hover:bg-purple-500/5 cursor-pointer transition-colors"
                      >
                        <td className="px-3.5 py-3 align-middle">
                          <UserCell user={u} />
                        </td>
                        <td className="px-3.5 py-3 align-start">
                          <PlanBadge plan={u.plan} />
                        </td>
                        <td className="px-3.5 py-3 align-middle">
                          <StatusIndicator status={u.status} />
                        </td>
                        <td className="px-3.5 py-3 align-middle font-mono text-[13px] font-medium text-slate-200">
                          {u.credits.toLocaleString()}
                        </td>
                        <td className="px-3.5 py-3 align-middle font-mono text-xs text-amber-400 font-medium">
                          ${u.geminiCost.toFixed(2)}
                        </td>
                        <td className="px-3.5 py-3 align-middle text-xs text-slate-500">
                          {formatDate(u.joined)}
                        </td>
                        <td className="px-3.5 py-3 align-middle">
                          <div
                            className="flex gap-1.5"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              title="Edit Plan"
                              onClick={() => openEdit(u)}
                              className="w-[30px] h-[30px] rounded-lg border border-[#a855f7]/[0.12] flex items-center justify-center text-slate-500 hover:text-slate-100 hover:border-purple-500/25 hover:bg-purple-500/10 transition"
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              title="Delete"
                              onClick={() => openDelete(u)}
                              className="w-[30px] h-[30px] rounded-lg border border-[#a855f7]/[0.12] flex items-center justify-center text-slate-500 hover:text-red-400 hover:border-red-500/40 hover:bg-red-500/10 transition"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-t border-[#a855f7]/[0.12]">
            <span className="text-[13px] text-slate-500">
              Showing 1–{filtered.length} of {users.length}
            </span>
            <div className="flex gap-1.5">
              <button
                className={`${btnGhost} !px-3 !py-1.5 !text-xs`}
                onClick={() => pushToast("info", "Previous page")}
              >
                <ChevronLeft size={14} /> Prev
              </button>
              <button
                className={`${btnGhost} !px-3 !py-1.5 !text-xs`}
                onClick={() => pushToast("info", "Next page")}
              >
                Next <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ==================== USER DETAIL SLIDE-OVER ==================== */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full md:w-[480px] z-300 flex flex-col bg-[rgba(14,12,24,0.96)] backdrop-blur-2xl border-l border-purple-500/25 shadow-[-20px_0_60px_rgba(0,0,0,0.5),-4px_0_40px_rgba(124,58,237,0.15)] transition-transform duration-500 ${
          detailOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#a855f7]/[0.12] shrink-0">
          <span className="text-[17px] font-bold">User Details</span>
          <button
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-100 hover:bg-purple-500/10 transition"
            onClick={() => setDetailOpen(false)}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {selectedUser && (
            <>
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center font-extrabold text-[22px] text-white shrink-0"
                  style={avatarStyle(selectedUser.avatarHue)}
                >
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <div className="text-lg font-bold">{selectedUser.name}</div>
                  <div className="text-[13px] text-slate-400">
                    {selectedUser.email}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                <DetailItem label="Current Plan">
                  <span className="text-purple-200 capitalize">
                    {selectedUser.plan}
                  </span>
                </DetailItem>
                <DetailItem label="Status">
                  <span
                    className="capitalize"
                    style={{
                      color:
                        selectedUser.status === "active"
                          ? "#34d399"
                          : selectedUser.status === "suspended"
                            ? "#f87171"
                            : "#94a3b8",
                    }}
                  >
                    {selectedUser.status}
                  </span>
                </DetailItem>
                <DetailItem label="Credits Balance">
                  {selectedUser.credits.toLocaleString()}
                </DetailItem>
                <DetailItem label="Gemini Cost (30d)">
                  <span className="text-amber-400">
                    ${selectedUser.geminiCost.toFixed(2)}
                  </span>
                </DetailItem>
                <DetailItem label="API Calls">
                  {selectedUser.apiCalls.toLocaleString()}
                </DetailItem>
                <DetailItem label="Tokens Used">
                  {selectedUser.tokens}
                </DetailItem>
              </div>

              <hr className="border-[#a855f7]/[0.12] my-5" />

              <div className="text-xs text-slate-500 space-y-1.5">
                <MetaRow
                  label="Joined"
                  value={formatDate(selectedUser.joined)}
                />
                <MetaRow
                  label="User ID"
                  value={<span className="font-mono">#{selectedUser.id}</span>}
                />
                <MetaRow label="Last Active" value="2 hours ago" />
              </div>
            </>
          )}
        </div>

        <div className="flex flex-wrap gap-2.5 px-6 py-4 border-t border-[#a855f7]/[0.12] shrink-0">
          <button
            className={btnPrimary}
            onClick={() => selectedUser && openEdit(selectedUser)}
          >
            Edit Plan
          </button>
          <button
            className={btnDanger}
            onClick={() => selectedUser && openDelete(selectedUser)}
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* ==================== EDIT PLAN MODAL ==================== */}
      <ModalShell open={editOpen} onClose={() => setEditOpen(false)}>
        <h3 className="text-xl font-extrabold tracking-tight mb-1">
          Update Subscription Plan
        </h3>
        <p className="text-[13px] text-slate-400 mb-5">
          {selectedUser
            ? `Update plan for ${selectedUser.name} (${selectedUser.email})`
            : "Change the plan for this user."}
        </p>

        <div className="mb-4">
          <label
            htmlFor="planSelect"
            className="block text-[12px] font-semibold uppercase tracking-[1px] text-slate-500 mb-1.5"
          >
            Plan
          </label>
          <select
            id="planSelect"
            value={planDraft}
            onChange={(e) => setPlanDraft(e.target.value as Plan)}
            className={`${inputBase} px-3.5 py-2.5 cursor-pointer appearance-none`}
          >
            {PLAN_OPTIONS.map((p) => (
              <option key={p.value} value={p.value} className="bg-[#0d0d16]">
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="creditAdjust"
            className="block text-[12px] font-semibold uppercase tracking-[1px] text-slate-500 mb-1.5"
          >
            Adjust Credits (optional)
          </label>
          <div className="relative w-full">
            <input
              id="creditAdjust"
              type="number"
              step={100}
              placeholder="e.g., 5000 to add credits"
              value={creditDraft}
              onChange={(e) => setCreditDraft(e.target.value)}
              className={`
      ${inputBase}
      w-full rounded-xl
      px-4 py-3
      text-sm font-medium text-white
      placeholder:text-gray-500
      transition-all duration-200
      hover:border-purple-400/40
      focus:border-purple-500/70
      focus:ring-4 focus:ring-purple-500/10
      focus:outline-none
      [color-scheme:dark]
    `}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2.5 mt-5">
          <button className={btnGhost} onClick={() => setEditOpen(false)}>
            Cancel
          </button>
          <button className={btnPrimary} onClick={confirmEdit}>
            Save Changes
          </button>
        </div>
      </ModalShell>

      {/* ==================== DELETE MODAL ==================== */}
      <ModalShell open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <h3 className="text-xl font-extrabold tracking-tight mb-1 text-red-400">
          Delete Account
        </h3>
        <p className="text-[13px] text-slate-400 mb-5">
          This action is permanent and cannot be undone.
        </p>

        <div className="rounded-2xl border border-red-500/30 bg-red-500/6 p-4 mb-4">
          <h5 className="flex items-center gap-1.5 text-[13px] font-bold text-red-400 mb-1">
            <TriangleAlert size={14} /> Warning: Destructive Action
          </h5>
          <p className="text-xs text-slate-400">
            Deleting this account will remove all user data, credits, usage
            history, and API keys associated with this account.
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-[12px] font-semibold uppercase tracking-[1px] text-slate-500 mb-1.5">
            Type{" "}
            <strong className="text-red-400 font-mono normal-case tracking-normal">
              {selectedUser?.email}
            </strong>{" "}
            to confirm
          </label>
          <input
            type="text"
            autoComplete="off"
            placeholder="Type email to confirm..."
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className={`${inputBase} px-3.5 py-2.5`}
          />
        </div>

        <div className="flex justify-end gap-2.5 mt-5">
          <button className={btnGhost} onClick={() => setDeleteOpen(false)}>
            Cancel
          </button>
          <button
            className={btnDanger}
            disabled={confirmText.trim() !== (selectedUser?.email ?? "")}
            onClick={confirmDelete}
          >
            Delete Permanently
          </button>
        </div>
      </ModalShell>

      {/* ==================== TOASTS ==================== */}
      <div className="fixed bottom-5 right-5 z-500 flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <Toast key={t.id} toast={t} />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tiny helpers used above                                            */
/* ------------------------------------------------------------------ */
const DetailItem: FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <div className="rounded-2xl border border-[#a855f7]/[0.12] bg-purple-500/4 px-4 py-3.5">
    <div className="text-[10px] font-semibold uppercase tracking-[1.2px] text-slate-500 mb-1">
      {label}
    </div>
    <div className="text-[15px] font-semibold font-mono">{children}</div>
  </div>
);

const MetaRow: FC<{ label: string; value: React.ReactNode }> = ({
  label,
  value,
}) => (
  <div className="flex justify-between py-1.5">
    <span>{label}</span>
    <span className="text-slate-300 font-medium">{value}</span>
  </div>
);

const ModalShell: FC<{
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ open, onClose, children }) => (
  <div
    className={`fixed inset-0 z-200 flex items-center justify-center bg-black/70 backdrop-blur-md transition-opacity duration-300 ${
      open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
    }`}
    onClick={(e) => e.target === e.currentTarget && onClose()}
  >
    <div
      className={`relative w-[90%] max-w-[480px] max-h-[85vh] overflow-y-auto rounded-3xl p-7 bg-[#0d0d16] border border-purple-500/25 shadow-[0_0_60px_rgba(124,58,237,0.45),0_20px_60px_rgba(0,0,0,0.6)] transition-transform duration-300 ${
        open ? "scale-100 translate-y-0" : "scale-[0.92] translate-y-3"
      }`}
    >
      <button
        className="absolute top-3.5 right-3.5 w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-100 hover:bg-purple-500/10 transition"
        onClick={onClose}
        aria-label="Close"
      >
        <X size={18} />
      </button>
      {children}
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Global styles (keyframes + scrollbar)                              */
/* ------------------------------------------------------------------ */
const CustomStyles = () => (
  <style>{`
    @keyframes toastIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes toastOut {
      to { opacity: 0; transform: translateY(8px); }
    }
    @keyframes pulseDot {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.4); opacity: 0.6; }
    }
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: #0a0a0f; }
    ::-webkit-scrollbar-thumb {
      background: rgba(139,92,246,0.3);
      border-radius: 3px;
    }
    ::-webkit-scrollbar-thumb:hover { background: rgba(139,92,246,0.5); }
    ::selection { background: rgba(139,92,246,0.35); color: #ede9fe; }
  `}</style>
);
