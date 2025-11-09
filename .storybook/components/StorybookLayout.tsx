import { FunctionComponent, PropsWithChildren } from 'react';
import { MediaContextProvider } from '../../src/app/providers/mediaProvider';
import { combineProviders } from '@/shared/lib/combineProviders';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from '@/app/providers/errorBoundary';
import './StorybookLayout.scss';

const StorybookProvider = combineProviders(BrowserRouter, MediaContextProvider, ErrorBoundary);

export const StorybookLayout: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="app">
        <StorybookProvider>{children}</StorybookProvider>{' '}
    </div>
);
