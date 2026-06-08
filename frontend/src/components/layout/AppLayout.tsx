import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { MobileSidebar } from './MobileSidebar';
import { motion, AnimatePresence } from 'motion/react';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex w-full min-h-screen bg-[#09090b] text-zinc-400 font-sans antialiased">
      {/* Drawer Menu (responsive mobile overlays) */}
      <MobileSidebar 
        isOpen={isMobileOpen} 
        onClose={() => setIsMobileOpen(false)} 
      />

      {/* Main Sidebar (desktop persistent) */}
      <Sidebar />

      {/* Primary shell content areas */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar onToggleMobileMenu={() => setIsMobileOpen(true)} />

        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-8 md:py-10 max-w-7xl w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
export default AppLayout;
