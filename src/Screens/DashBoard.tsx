import React, { useState } from "react";
import { Search, Bell, Download, RefreshCw, Users } from "lucide-react";
import MetricCard from "../components/MetricCard";
import Topbar from "../components/Topbar";
const usersData = [
  {
    id: 1,
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    plan: "enterprise",
    status: "active",
    credits: 25000,
    geminiCost: 412.75,
    joined: "2025-02-14",
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
    avatarHue: 310,
  },
];

// const Topbar = () => {
//   return (
//     <header className="sticky top-0 z-50 h-[64px] flex items-center gap-4 bg-[#0a0a12]/85 backdrop-blur-[20px] border-b border-[#a855f7]/12 px-6 -mx-6 transition-all duration-300">
//       <div className="relative flex-1 max-w-[520px]">
//         <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#64748b]" />
//         <input
//           type="text"
//           placeholder="Search users, emails, plans..."
//           className="w-full py-2.5 pr-4 pl-10 rounded-[14px] border border-[#a855f7]/12 bg-[#12101e]/60 text-[#e8e6f0] text-[14px] transition-all duration-200 outline-none placeholder:text-[#64748b] focus:border-[#8b5cf6]/35 focus:ring-[3px] focus:ring-[#8b5cf6]/10 focus:bg-[#141222]/80"
//         />
//       </div>
//       <div className="flex items-center gap-3 ml-auto">
//         <button className="relative w-10 h-10 rounded-[14px] border border-[#a855f7]/12 bg-transparent flex items-center justify-center text-[#94a3b8] transition-all duration-200 hover:border-[#a855f7]/25 hover:text-[#e8e6f0] hover:bg-[#8b5cf6]/[0.08]">
//           <Bell className="w-5 h-5" />
//           <span className="absolute top-2 right-2 w-[7px] h-[7px] rounded-full bg-[#a855f7] shadow-[0_0_8px_rgba(168,85,247,0.7)] animate-pulse" />
//         </button>
//         <button className="w-10 h-10 rounded-[14px] border border-[#a855f7]/12 bg-transparent flex items-center justify-center text-[#94a3b8] transition-all duration-200 hover:border-[#a855f7]/25 hover:text-[#e8e6f0] hover:bg-[#8b5cf6]/[0.08]">
//           <Download className="w-5 h-5" />
//         </button>
//       </div>
//     </header>
//   );
// };

const PageHeader = () => {
  return (
    <div className="pt-7 pb-5 flex items-end justify-between gap-4 flex-wrap">
      <div>
        <h1 className="text-[28px] font-extrabold tracking-[-0.8px] text-[#e8e6f0] text-left">
          Dashboard{" "}
          <span className="bg-gradient-to-br from-[#a855f7] to-[#d8b4fe] bg-clip-text text-transparent">
            Overview
          </span>
        </h1>
        <p className="text-[14px] text-[#94a3b8] mt-0.5">
          Monitor platform performance, user activity, and API costs in real
          time.
        </p>
      </div>
      <div className="flex gap-2.5 flex-wrap">
        <button className="inline-flex items-center gap-2 px-[18px] py-2.5 rounded-[14px] font-semibold text-[14px] transition-all duration-200 border border-[#a855f7]/12 bg-[#8b5cf6]/[0.06] text-[#94a3b8] hover:bg-[#8b5cf6]/[0.12] hover:text-[#e8e6f0] hover:border-[#a855f7]/25">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
        <button className="inline-flex items-center gap-2 px-[18px] py-2.5 rounded-[14px] font-semibold text-[14px] transition-all duration-200 border border-[#a855f7]/25 bg-gradient-to-br from-[#4c1d95] to-[#6d28d9] text-white shadow-[0_0_20px_rgba(124,58,237,0.25)] hover:from-[#6d28d9] hover:to-[#8b5cf6] hover:shadow-[0_0_40px_rgba(124,58,237,0.35)] hover:-translate-y-[1px]">
          <Users className="w-4 h-4" />
          Manage Users
        </button>
      </div>
    </div>
  );
};

// const MetricCard = ({ label, value, change, isPositive }: { label: string, value: string | number, change: string, isPositive: boolean }) => {
//   return (
//     <div className="relative overflow-hidden bg-[#12101e]/75 backdrop-blur-[16px] border border-[#a855f7]/[0.12] rounded-[20px] py-5 px-[22px] transition-all duration-300 group hover:border-[#a855f7]/25 hover:shadow-[0_0_20px_rgba(124,58,237,0.25)] hover:-translate-y-[2px]">
//       <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#a855f7]/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
//       <div className="text-[12px] font-medium uppercase tracking-[1.2px] text-[#64748b] mb-1">{label}</div>
//       <div className="text-[32px] font-black tracking-[-1px] text-[#e8e6f0] leading-[1.2]">{value}</div>
//       <div className={`text-[12px] font-semibold mt-1.5 flex items-center gap-1 ${isPositive ? 'text-[#34d399]' : 'text-[#f87171]'}`}>
//         {change}
//       </div>
//     </div>
//   );
// };

const RecentUsers = () => {
  const getBadgeStyle = (plan: string) => {
    switch (plan) {
      case "enterprise":
        return "bg-[#4c1d95]/20 text-[#c084fc] border-[#a855f7]/40 shadow-[0_0_12px_rgba(124,58,237,0.2)]";
      case "pro":
        return "bg-[#8b5cf6]/15 text-[#d8b4fe] border-[#8b5cf6]/35";
      default:
        return "bg-[#64748b]/15 text-[#94a3b8] border-[#64748b]/30";
    }
  };

  return (
    <div className="bg-[#12101e]/75 backdrop-blur-[16px] border border-[#a855f7]/[0.12] rounded-[20px] overflow-hidden transition-all duration-300">
      <div className="py-[18px] px-[22px] flex items-center justify-between border-b border-[#a855f7]/[0.12]">
        <div>
          <div className="text-[16px] font-bold tracking-[-0.3px] text-[#e8e6f0]">
            Recent Users
          </div>
          <div className="text-[12px] text-[#64748b] mt-px">
            Latest signups on the platform
          </div>
        </div>
        <button className="px-[18px] py-2 rounded-[14px] font-semibold text-[13px] border border-transparent text-[#94a3b8] hover:bg-[#8b5cf6]/[0.12] hover:text-[#e8e6f0] hover:border-[#a855f7]/25 transition-all">
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[14px]">
          <colgroup>
            <col className="w-[45%]" />
            <col className="w-[18%]" />
            <col className="w-[17%]" />
            <col className="w-[20%]" />
          </colgroup>

          <thead>
            <tr>
              <th className="text-left py-2.5 px-4 text-[11px] font-semibold uppercase tracking-[1.2px] text-[#64748b] border-b border-[#a855f7]/[0.12]">
                User
              </th>

              <th className="text-left py-2.5 px-4 text-[11px] font-semibold uppercase tracking-[1.2px] text-[#64748b] border-b border-[#a855f7]/[0.12]">
                Plan
              </th>

              <th className="text-left py-2.5 px-4 text-[11px] font-semibold uppercase tracking-[1.2px] text-[#64748b] border-b border-[#a855f7]/[0.12]">
                Credits
              </th>

              <th className="text-left py-2.5 px-4 text-[11px] font-semibold uppercase tracking-[1.2px] text-[#64748b] border-b border-[#a855f7]/[0.12]">
                Joined
              </th>
            </tr>
          </thead>

          <tbody>
            {usersData.map((user) => (
              <tr
                key={user.id}
                className="border-b border-[#a855f7]/[0.06] hover:bg-[#8b5cf6]/[0.05] transition-all cursor-pointer last:border-0"
              >
                {/* USER */}
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-[34px] h-[34px] rounded-full flex items-center justify-center font-bold text-[13px] text-white shrink-0"
                      style={{
                        background: `linear-gradient(
                  135deg,
                  hsl(${user.avatarHue}, 60%, 35%),
                  hsl(${user.avatarHue + 30}, 60%, 50%)
                )`,
                      }}
                    >
                      {user.name.charAt(0)}
                    </div>

                    <div className="min-w-0 text-left">
                      <div className="font-semibold text-[#e8e6f0] text-left text-[13px] truncate">
                        {user.name}
                      </div>

                      <div className="text-[12px] text-[#64748b] truncate">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>

                {/* PLAN */}
                <td className="py-3 px-4 text-left align-middle">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-[0.3px] border capitalize ${getBadgeStyle(user.plan)}`}
                  >
                    {user.plan}
                  </span>
                </td>

                {/* CREDITS */}
                <td className="py-3 px-4 text-left text-[#e2e8f0] font-mono text-[13px] font-medium">
                  {user.credits.toLocaleString()}
                </td>

                {/* JOINED */}
                <td className="py-3 px-4 text-[#64748b] text-left text-[12px]">
                  {new Date(user.joined).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PlanDistribution = () => {
  const plans = [
    { name: "Free", count: 4, color: "#475569" },
    { name: "Pro", count: 9, color: "#8b5cf6" },
    { name: "Enterprise", count: 5, color: "#c084fc" },
  ];
  const max = Math.max(...plans.map((p) => p.count));

  return (
    <div className="bg-[#12101e]/75 backdrop-blur-[16px] border border-[#a855f7]/[0.12] rounded-[20px] overflow-hidden transition-all duration-300">
      <div className="py-[18px] px-[22px] border-b border-[#a855f7]/[0.12]">
        <div className="text-[16px] font-bold tracking-[-0.3px] text-[#e8e6f0]">
          Plan Distribution
        </div>
        <div className="text-[12px] text-[#64748b] mt-px">
          Active subscriptions by tier
        </div>
      </div>
      <div className="p-[22px]">
        {plans.map((plan) => (
          <div key={plan.name} className="mb-3.5 last:mb-0">
            <div className="flex justify-between text-[13px] mb-1">
              <span className="text-[#94a3b8] font-medium">{plan.name}</span>
              <span className="text-[#e8e6f0] font-bold">{plan.count}</span>
            </div>
            <div className="h-1.5 bg-[#8b5cf6]/[0.08] rounded-[3px] overflow-hidden">
              <div
                className="h-full rounded-[3px] transition-all duration-500"
                style={{
                  width: `${(plan.count / max) * 100}%`,
                  background: `linear-gradient(90deg, ${plan.color}, ${plan.color}cc)`,
                  boxShadow: `0 0 12px ${plan.color}44`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function DashBoard() {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <>
      {showSearch && (
        <button
          type="button"
          aria-label="Close search"
          onClick={() => setShowSearch(false)}
          className="fixed inset-0 z-40 bg-transparent w-full h-full cursor-default"
        />
      )}
      <div className="min-h-screen bg-[#0a0a0f] text-[#e8e6f0] font-sans px-6 pb-10 bg-fixed bg-[radial-gradient(ellipse_at_15%_10%,rgba(76,29,149,0.18)_0%,transparent_60%),radial-gradient(ellipse_at_85%_20%,rgba(109,40,217,0.12)_0%,transparent_55%),radial-gradient(ellipse_at_50%_90%,rgba(88,28,135,0.08)_0%,transparent_50%),radial-gradient(ellipse_at_5%_60%,rgba(30,20,60,0.4)_0%,transparent_40%)]">
        <Topbar />
        <PageHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard
            label="Total Credits"
            value="284,500"
            change="↑ 12,400 this month"
            isPositive={true}
          />

          <MetricCard
            label="Users"
            value="32"
            change="↑ 18.3% vs last month"
            isPositive={false}
          />

          <MetricCard
            label="Active Subscriptions"
            value="12"
            change="↑ 18.3% vs last month"
            isPositive={true}
          />

          <MetricCard
            label="Gemini API Cost (30d)"
            value="$3,247.82"
            change="↑ 18.3% vs last month"
            isPositive={false}
            // only last 2 digits animate
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
          <div className="lg:col-span-2">
            <RecentUsers />
          </div>
          <div className="lg:col-span-1">
            <PlanDistribution />
          </div>
        </div>
      </div>
    </>
  );
}

export default DashBoard;
