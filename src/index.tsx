import App from './app/App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import initializeSentry from 'shared/lib/initializeSentry/initializeSentry';
import combineProviders from 'shared/lib/combineProviders/combineProviders';
import { MediaContextProvider } from 'app/providers/MediaProvider';
import { createRoot } from 'react-dom/client';
import { StoreProvider } from 'app/providers/StoreProvider';
import { AppContextProvider } from 'app/providers/AppContextProvider';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import './app/styles/index.scss';

if (!__IS_DEV__) {
    initializeSentry();
}

const AppContainer = combineProviders(
    BrowserRouter,
    StoreProvider,
    ThemeProvider,
    MediaContextProvider,
    AppContextProvider,
    ErrorBoundary
);
const rootContainer = document.getElementById('root');

const root = createRoot(rootContainer);

root.render(
    <AppContainer>
        <App />
    </AppContainer>
);
