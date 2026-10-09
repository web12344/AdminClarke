import { Search, Bell, Download, Menu, X } from "lucide-react";
import { useState } from "react";

const Topbar = () => {
  const [isOpen, setIsOpen] = useState(false);
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
      <header className="sticky top-0 z-50 h-[64px] flex items-center justify-between gap-3 bg-[#0a0a12]/85 backdrop-blur-[20px] border-b border-[#a855f7]/[0.12] px-4 lg:px-6 -mx-4 lg:-mx-6">
        {/* Menu button + Logo (visible on all screens; add lg:hidden back if you only want it on mobile) */}
        <div className="flex items-center gap-2 shrink-0 lg:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            className="flex w-10 h-10 items-center justify-center rounded-xl text-[#d8b4fe] hover:bg-[#8b5cf6]/10 transition"
          >
            <Menu className="w-6 h-6" />
          </button>

          <span className="text-[18px] font-extrabold text-[#e8e6f0] hidden md:inline">
            KAi{" "}
            <span className="bg-gradient-to-br from-[#a855f7] to-[#d8b4fe] bg-clip-text text-transparent">
              Admin
            </span>
          </span>
        </div>

        {/* Search */}
        {!showSearch && (
          <div className="relative flex-1 lg:max-w-[520px]  ">
            <button
              type="button"
              onClick={() => setShowSearch(!showSearch)}
              className="w-10 h-10 rounded-[14px] border border-[#a855f7]/[0.12] flex items-center justify-center text-[#94a3b8] hover:bg-[#8b5cf6]/10 transition"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        )}

        {showSearch && (
          <div className="relative flex-1 lg:max-w-[520px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#64748b]" />

            <input
              autoFocus
              type="text"
              placeholder="Search..."
              className="w-full py-2.5 pr-12 pl-10 rounded-[14px] border border-[#a855f7]/[0.12] bg-[#12101e]/60 text-[#e8e6f0] text-[14px] outline-none"
            />

            <button
              onClick={() => setShowSearch(false)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            className="w-7 h-7 md:rounded-[14px] rounded-[7px] md:w-10 md:h-10 border border-[#a855f7]/[0.12] flex items-center justify-center text-[#94a3b8] hover:bg-[#8b5cf6]/10 transition"
          >
            <Bell className=" md:w-5 md:h-5 w-4 h-4" />
          </button>

          <button
            type="button"
            className="w-7 h-7 md:rounded-[14px] rounded-[7px] md:w-10 md:h-10 border border-[#a855f7]/[0.12] flex items-center justify-center text-[#94a3b8] hover:bg-[#8b5cf6]/10 transition"
          >
            <Download className=" md:w-5 md:h-5 w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Drawer Overlay & Panel */}
    </>
  );
};

export default Topbar;
