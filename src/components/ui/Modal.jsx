import { useState } from 'react'

/**
 * Modal Component
 * Reusable modal dialog
 */
export const Modal = ({ isOpen, onClose, title, children, actions }) => {
  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md">
        <div className="glass rounded-lg border border-white/6 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#F1F5F9]">{title}</h2>
            <button
              onClick={onClose}
              className="text-[#94A3B8] hover:text-[#F1F5F9] transition-colors"
            >
              ✕
            </button>
          </div>
          <div className="mb-6">{children}</div>
          {actions && (
            <div className="flex gap-2 justify-end">
              {actions}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Modal
