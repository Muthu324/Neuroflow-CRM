/**
 * Sidebar Component
 * Left navigation sidebar
 */
export const Sidebar = ({ active, setActive, sidebarOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'linkedin', label: 'LinkedIn CRM', icon: '🔗' },
    { id: 'instagram', label: 'Instagram CRM', icon: '📱' },
    { id: 'leads', label: 'Leads', icon: '👥' },
    { id: 'projects', label: 'Projects', icon: '📁' },
    { id: 'followups', label: 'Follow Ups', icon: '📞' },
    { id: 'revenue', label: 'Revenue', icon: '💰' },
    { id: 'aiagent', label: 'AI Agent', icon: '🤖' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ]

  return (
    <div className={`sidebar fixed left-0 top-0 w-[220px] h-screen glass border-r border-white/6 p-6 flex flex-col ${sidebarOpen ? 'open' : ''} z-50 lg:z-auto`}>
      {/* Logo */}
      <div className="mb-8">
        <div className="text-2xl font-bold gradient-text">✦ NeuroFlow</div>
        <div className="text-xs text-[#94A3B8] mt-1">AI CRM Platform</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto space-y-1">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`nav-item w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center gap-3 ${active === item.id ? 'active' : 'text-[#94A3B8] hover:text-[#F1F5F9]'}`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-6 border-t border-white/6">
        <div className="text-xs text-[#94A3B8]">Logged in as</div>
        <div className="text-sm font-medium text-[#F1F5F9] mt-1">Alex Rivera</div>
      </div>
    </div>
  )
}

export default Sidebar
