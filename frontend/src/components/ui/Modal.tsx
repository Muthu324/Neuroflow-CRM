import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Card } from './Card';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop wrapper */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm"
          />

          {/* Modal Card content wrapper */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="w-full max-w-lg z-10"
          >
            <Card glass={true} className="border-zinc-800 shadow-2xl relative">
              {/* Header block */}
              <div className="flex items-center justify-between border-b border-zinc-900 px-6 py-4">
                <h3 className="text-md font-sans font-medium text-zinc-100 uppercase tracking-wider">{title}</h3>
                <button
                  onClick={onClose}
                  className="text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900 rounded-lg p-1.5 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body block */}
              <div className="p-6 max-h-[80vh] overflow-y-auto">
                {children}
              </div>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default Modal;
