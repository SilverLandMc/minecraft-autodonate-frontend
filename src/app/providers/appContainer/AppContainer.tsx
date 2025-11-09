import { BrowserRouter } from 'react-router-dom';
import { combineProviders } from '@/shared/lib/combineProviders';
import { ErrorBoundary } from '../errorBoundary';
import { MediaContextProvider } from '../mediaProvider';
import { UserStoreProvider } from '../userStoreProvider';

export const AppContainer = combineProviders(ErrorBoundary, BrowserRouter, UserStoreProvider, MediaContextProvider);
