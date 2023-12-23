import { render } from 'react-dom';
import App from './app/App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import initializeSentry from 'shared/lib/initializeSentry/initializeSentry';
import combineProviders from 'shared/lib/combineProviders/combineProviders';
import { MediaContextProvider } from 'app/providers/MediaProvider';
import './app/styles/index.scss';

initializeSentry();

const AppContainer = combineProviders(BrowserRouter, ThemeProvider, MediaContextProvider);

render(
    <AppContainer>
        <App />
    </AppContainer>,

    document.getElementById('root')
);
