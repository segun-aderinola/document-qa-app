import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { AppShell } from './components/layout/AppShell';
import { Home } from './routes/Home';
import { DocumentRoute } from './routes/DocumentRoute';
import { Toaster } from './components/ui/toaster';

function App() {
  const handleError = (error: Error, errorInfo: any) => {
    console.error('Application error:', error, errorInfo);
  };

  return (
    <ErrorBoundary onError={handleError}>
      <AppProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<AppShell />}>
                <Route index element={<Home />} />
                <Route path="doc/:id" element={<DocumentRoute />} />
              </Route>
            </Routes>
            <Toaster />
          </div>
        </Router>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;