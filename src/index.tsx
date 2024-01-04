import App from './app/App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import initializeSentry from 'shared/lib/initializeSentry/initializeSentry';
import combineProviders from 'shared/lib/combineProviders/combineProviders';
import { MediaContextProvider } from 'app/providers/MediaProvider';
import { createRoot } from 'react-dom/client';
import './app/styles/index.scss';

initializeSentry();

const AppContainer = combineProviders(BrowserRouter, ThemeProvider, MediaContextProvider);
const rootContainer = document.getElementById('root');

const root = createRoot(rootContainer);

root.render(
    <AppContainer>
        <App />
    </AppContainer>
);
