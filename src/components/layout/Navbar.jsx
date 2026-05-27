/**
 * Navbar Component
 * Top navigation bar
 */
export const Navbar = ({ setActive, notifications = [], sidebarOpen, setSidebarOpen }) => {
  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="navbar fixed top-0 left-0 right-0 h-14 glass border-b border-white/6 flex items-center justify-between px-6 z-40 lg:z-40">
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
        >
          ☰
        </button>
        <div className="text-sm text-[#94A3B8]">Welcome back!</div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-white/4 border border-white/8 rounded-lg px-3 py-2 w-64">
          <span className="text-[#94A3B8]">🔍</span>
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 bg-transparent outline-none text-sm text-[#F1F5F9] placeholder-[#475569]"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 hover:bg-white/5 rounded-lg transition-colors">
          <span className="text-lg">🔔</span>
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Profile */}
        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center text-white font-semibold">
            AR
          </div>
        </button>
      </div>
    </div>
  )
}

export default Navbar
