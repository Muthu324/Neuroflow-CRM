import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';

// Direct Page Imports
import { Dashboard } from '../pages/Dashboard';
import { LinkedInCRM } from '../pages/LinkedInCRM';
import { InstagramCRM } from '../pages/InstagramCRM';
import { Leads } from '../pages/Leads';
import { Projects } from '../pages/Projects';
import { Followups } from '../pages/Followups';
import { Revenue } from '../pages/Revenue';
import { AIAgent } from '../pages/AIAgent';
import { Notifications } from '../pages/Notifications';
import { Settings } from '../pages/Settings';

export const AppRouter: React.FC = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/linkedin" element={<LinkedInCRM />} />
        <Route path="/instagram" element={<InstagramCRM />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/followups" element={<Followups />} />
        <Route path="/revenue" element={<Revenue />} />
        <Route path="/ai-agent" element={<AIAgent />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
        
        {/* Wildcard Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
};
export default AppRouter;
