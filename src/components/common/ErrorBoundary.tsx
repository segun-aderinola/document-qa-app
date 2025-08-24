import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { GradientIcon } from './GradientIcon';

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="p-8 max-w-md w-full text-center">
        <GradientIcon icon={AlertTriangle} size={48} className="mx-auto mb-4" />
        
        <h2 className="text-xl font-semibold mb-3">
          Oops! Something went wrong
        </h2>
        
        <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
          We encountered an unexpected error. Don't worry, your data is safe. 
          You can try refreshing the page or click the button below to reset the application.
        </p>
        
        <div className="space-y-3">
          <Button onClick={resetErrorBoundary} className="w-full flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()} 
            className="w-full"
          >
            Refresh Page
          </Button>
        </div>
        
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-6 text-left">
            <summary className="text-sm text-muted-foreground cursor-pointer hover:text-foreground">
              Error Details (Development)
            </summary>
            <pre className="mt-2 text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-auto max-h-32">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}
      </Card>
    </div>
  );
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  onError?: (error: Error, errorInfo: any) => void;
}

export function ErrorBoundary({ children, onError }: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={onError}
      onReset={() => {
        // Clear any problematic state from localStorage if needed
        try {
          // Could add specific cleanup here
          window.location.reload();
        } catch (e) {
          console.warn('Failed to reset application state:', e);
        }
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}