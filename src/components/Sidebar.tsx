import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  Users,
  Layers,
  Settings,
  Sparkles,
  Menu,
  X,
} from "lucide-react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const navClasses = ({ isActive }: { isActive: boolean }) => {
    const base =
      "flex items-center gap-3 py-[10px] px-[14px] rounded-[14px] font-medium text-[14px] whitespace-nowrap transition-all duration-200 border relative select-none no-underline outline-none group";

    const inactive =
      "text-[#94a3b8] border-transparent hover:bg-[#8b5cf6]/[0.08] hover:text-[#e8e6f0] hover:border-[#a855f7]/[0.12]";

    const active =
      "bg-[#8b5cf6]/[0.12] text-[#d8b4fe] border-[#a855f7]/40 shadow-[inset_0_0_20px_rgba(139,92,246,0.06),0_0_20px_rgba(124,58,237,0.25)]";

    return `${base} ${isActive ? active : inactive}`;
  };

  const iconClasses =
    "w-5 h-5 shrink-0 transition-colors duration-300";

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      {/* <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0a0a12]/95 backdrop-blur-[20px] border-b border-[#a855f7]/10 z-[90] flex items-center px-4">
        <button
          onClick={() => setIsOpen(true)}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-[#d8b4fe] hover:bg-[#8b5cf6]/10 transition"
        >
          <Menu className="w-6 h-6" />
        </button>

        <span className="ml-3 text-[18px] font-extrabold text-[#e8e6f0]">
          KAi
          <span className="bg-gradient-to-br from-[#a855f7] to-[#d8b4fe] bg-clip-text text-transparent">
            Admin
          </span>
        </span>
      </div> */}

      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-[2px] z-[95]"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 bottom-0
          w-[264px]
          bg-[#0a0a12]/95
          backdrop-blur-[20px]
          border-r border-[#a855f7]/10
          flex flex-col
          z-[100]
          transition-transform duration-300 ease-in-out

          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Animated glowing right border */}
        <div className="absolute top-0 -right-[1px] w-[1px] h-full bg-gradient-to-b from-transparent via-[#a855f7]/40 to-transparent animate-pulse duration-[4000ms]" />

        {/* Brand Header */}
        <div className="flex items-center gap-3 py-5 px-5 border-b border-[#a855f7]/10 shrink-0">
          <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-[#4c1d95] to-[#8b5cf6] flex items-center justify-center text-[20px] font-black text-white shadow-[0_0_20px_rgba(124,58,237,0.25)] shrink-0">
            C
          </div>

          <span className="text-[18px] font-extrabold tracking-tight text-[#e8e6f0] whitespace-nowrap">
            KAi
            <span className="bg-gradient-to-br from-[#a855f7] to-[#d8b4fe] bg-clip-text text-transparent">
              Admin
            </span>
          </span>

          <span className="text-[9px] font-bold uppercase tracking-[1.5px] px-2 py-[3px] rounded-full bg-[#8b5cf6]/20 text-[#d8b4fe] border border-[#a855f7]/30 whitespace-nowrap ml-auto">
            Admin
          </span>

          {/* Close button - mobile only */}
          <button
            onClick={closeSidebar}
            className="lg:hidden ml-auto text-[#94a3b8] hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 flex flex-col gap-1 overflow-y-auto custom-scrollbar">
          <div className="text-[10px] font-semibold uppercase tracking-[1.8px] text-[#64748b] pt-3 pb-1.5 px-3 whitespace-nowrap">
            Overview
          </div>

          <NavLink to="/" className={navClasses} onClick={closeSidebar}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute left-[-12px] top-1/2 -translate-y-1/2 w-[3px] h-6 bg-gradient-to-b from-[#a855f7] to-[#8b5cf6] rounded-r-[3px] shadow-[0_0_12px_rgba(168,85,247,0.5)]" />
                )}

                <LayoutGrid className={iconClasses} />
                <span>Dashboard</span>
              </>
            )}
          </NavLink>

          <NavLink to="/profile" className={navClasses} onClick={closeSidebar}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute left-[-12px] top-1/2 -translate-y-1/2 w-[3px] h-6 bg-gradient-to-b from-[#a855f7] to-[#8b5cf6] rounded-r-[3px] shadow-[0_0_12px_rgba(168,85,247,0.5)]" />
                )}

                <Users className={iconClasses} />
                <span>Users</span>

                <span className="ml-auto text-[11px] font-bold px-2 py-[2px] rounded-full bg-[#8b5cf6]/20 text-[#d8b4fe] whitespace-nowrap">
                  18
                </span>
              </>
            )}
          </NavLink>

          <div className="text-[10px] font-semibold uppercase tracking-[1.8px] text-[#64748b] pt-4 pb-1.5 px-3 whitespace-nowrap">
            Billing & Usage
          </div>

          <NavLink to="/plans" className={navClasses} onClick={closeSidebar}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute left-[-12px] top-1/2 -translate-y-1/2 w-[3px] h-6 bg-gradient-to-b from-[#a855f7] to-[#8b5cf6] rounded-r-[3px] shadow-[0_0_12px_rgba(168,85,247,0.5)]" />
                )}

                <Layers className={iconClasses} />
                <span>Plans</span>
              </>
            )}
          </NavLink>

          <NavLink to="/usage" className={navClasses} onClick={closeSidebar}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute left-[-12px] top-1/2 -translate-y-1/2 w-[3px] h-6 bg-gradient-to-b from-[#a855f7] to-[#8b5cf6] rounded-r-[3px] shadow-[0_0_12px_rgba(168,85,247,0.5)]" />
                )}

                <Sparkles className={iconClasses} />
                <span>Gemini Usage</span>
              </>
            )}
          </NavLink>
        </nav>

        {/* Footer */}
        <div className="py-4 px-5 border-t border-[#a855f7]/10 shrink-0 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4c1d95] to-[#a855f7] flex items-center justify-center font-bold text-[14px] text-white shrink-0">
            C
          </div>

          <div className="flex-1 min-w-0 whitespace-nowrap">
            <div className="text-[13px] font-semibold text-[#e8e6f0]">
              Clarke
            </div>

            <div className="text-[11px] font-medium text-[#64748b]">
              Super Admin
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;