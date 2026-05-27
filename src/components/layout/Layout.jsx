/**
 * Layout Component
 * Main layout wrapper for pages
 */
export const Layout = ({ children, title, breadcrumb = [] }) => {
  return (
    <div className="min-h-screen bg-[#080B14]">
      {/* Background orbs */}
      <div className="orb" style={{ width: 600, height: 600, background: 'rgba(99,102,241,0.04)', top: -200, left: -100 }} />
      <div className="orb" style={{ width: 400, height: 400, background: 'rgba(139,92,246,0.04)', bottom: -100, right: -100 }} />

      {/* Main content */}
      <div className="ml-0 lg:ml-[220px] pt-14">
        <div className="p-6 lg:p-7 max-w-7xl">
          {/* Breadcrumb */}
          {breadcrumb.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-[#334155] mb-4">
              {breadcrumb.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  {i > 0 && <span>›</span>}
                  <span className={i === breadcrumb.length - 1 ? 'text-[#6366F1]' : ''}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Page content */}
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
