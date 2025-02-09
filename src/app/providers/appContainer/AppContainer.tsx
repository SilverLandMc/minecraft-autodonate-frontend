import { BrowserRouter } from 'react-router-dom';
import combineProviders from '@/shared/lib/combineProviders/combineProviders';
import { AppContextProvider } from '../AppContextProvider';
import { ErrorBoundary } from '../ErrorBoundary';
import { MediaContextProvider } from '../MediaProvider';
import { StoreProvider } from '../StoreProvider';
import { UserStoreProvider } from '../userStoreProvider';

export const AppContainer = combineProviders(
    ErrorBoundary,
    BrowserRouter,
    StoreProvider,
    UserStoreProvider,
    MediaContextProvider,
    AppContextProvider
);
