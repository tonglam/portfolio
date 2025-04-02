'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/tailwind.util';
import { ErrorBoundaryProps as NextErrorBoundaryProps } from 'next/dist/client/components/error-boundary';
import { Component } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface CustomErrorBoundaryProps extends NextErrorBoundaryProps {
  fallback?: React.ReactNode;
  fullScreen?: boolean;
  className?: string;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export class ErrorBoundary extends Component<CustomErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: CustomErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log error to error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, error: undefined });
  };

  handleReload = (): void => {
    window.location.reload();
  };

  render(): React.ReactNode {
    const { hasError, error } = this.state;
    const { children, fallback, fullScreen = false, className } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      const containerClasses = cn(
        'flex flex-col items-center justify-center p-8 text-center',
        {
          'min-h-screen': fullScreen,
        },
        className
      );

      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';

      return (
        <div className={containerClasses}>
          <h3 className="text-xl font-semibold mb-4">Something went wrong</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{errorMessage}</p>
          <div className="flex gap-4">
            <Button onClick={this.handleRetry} variant="outline">
              Try again
            </Button>
            {fullScreen && (
              <Button onClick={this.handleReload} variant="default">
                Reload page
              </Button>
            )}
          </div>
        </div>
      );
    }

    return children;
  }
}
