import { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorPage } from '@/pages/errorPage';
import { Sentry } from '@/shared/lib/aliases';
import { createLogger } from '@/shared/lib/logger';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

const logger = createLogger('ErrorBoundary');

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        const errorMessage = `ErrorBoundary showed! componentStack: ${info.componentStack}`;
        logger.error(errorMessage);
        Sentry.captureMessage(errorMessage);
    }

    render() {
        const { hasError } = this.state;
        const { children } = this.props;

        if (hasError) {
            return <ErrorPage />;
        }

        return children;
    }
}
