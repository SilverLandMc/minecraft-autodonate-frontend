import { AppContextProvider } from 'app/providers/AppContextProvider';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import { MediaContextProvider } from 'app/providers/MediaProvider';
import { StoreProvider } from 'app/providers/StoreProvider';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import combineProviders from 'shared/lib/combineProviders/combineProviders';
import initializeSentry from 'shared/lib/initializeSentry/initializeSentry';
import App from './app/App';
import './app/styles/index.scss';

if (!__IS_DEV__) {
    initializeSentry();
}

const AppContainer = combineProviders(
    BrowserRouter,
    StoreProvider,
    MediaContextProvider,
    AppContextProvider,
    ErrorBoundary
);

const root = createRoot(document.getElementById('root')!);

root.render(
    <AppContainer>
        <App />
    </AppContainer>
);
