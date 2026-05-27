/**
 * Input Component
 * Reusable text input with validation support
 */
export const Input = ({ label, error, className = '', ...props }) => {
  return (
    <div className={`w-full ${className}`}>
      {label && <label className="block text-sm font-medium text-[#F1F5F9] mb-2">{label}</label>}
      <input
        className={`w-full bg-white/4 border border-white/8 text-[#F1F5F9] rounded-lg px-3 py-2 text-sm outline-none transition-colors font-sans focus:border-[#6366F1]/50 focus:ring-2 focus:ring-[#6366F1]/10 ${error ? 'border-red-500' : ''}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}

export default Input
