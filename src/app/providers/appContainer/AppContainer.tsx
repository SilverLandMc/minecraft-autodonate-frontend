import { BrowserRouter } from 'react-router-dom';
import { combineProviders } from '@/shared/lib/combineProviders';
import { MediaContextProvider } from '@/shared/lib/mediaContext';
import { ErrorBoundary } from '../errorBoundary';
import { UserStoreProvider } from '../userStoreProvider';

export const AppContainer = combineProviders(ErrorBoundary, BrowserRouter, UserStoreProvider, MediaContextProvider);
