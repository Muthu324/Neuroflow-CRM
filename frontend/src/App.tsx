import React from 'react';
import { HashRouter } from 'react-router-dom';
import { AuthProvider } from './app/authContext';
import { DataProvider } from './app/dataContext';
import { AppProvider } from './app/providers';
import { AppRouter } from './app/router';
import { FloatingAlerts } from './components/notifications/FloatingAlerts';

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppProvider>
          <HashRouter>
            {/* Dynamic Flying Toasts element */}
            <FloatingAlerts />
            
            {/* Navigation router maps */}
            <AppRouter />
          </HashRouter>
        </AppProvider>
      </DataProvider>
    </AuthProvider>
  );
}
