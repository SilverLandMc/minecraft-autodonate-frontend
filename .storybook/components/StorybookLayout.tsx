import { FunctionComponent, PropsWithChildren } from 'react';
import { MediaContextProvider } from '../../src/app/providers/MediaProvider';
import combineProviders from '@/shared/lib/combineProviders/combineProviders';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from 'app/providers/StoreProvider';
import { AppContextProvider } from 'app/providers/AppContextProvider';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import './StorybookLayout.scss';

const StorybookProvider = combineProviders(
    BrowserRouter,
    StoreProvider,
    MediaContextProvider,
    AppContextProvider,
    ErrorBoundary
);

export const StorybookLayout: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="app">
        <StorybookProvider>{children}</StorybookProvider>{' '}
    </div>
);
