import { BrowserRouter } from 'react-router-dom';
import { combineProviders } from '@/shared/lib/combineProviders';
import { MediaContextProvider } from '@/shared/lib/mediaContext';
import { ErrorBoundary } from '../errorBoundary';

export const AppContainer = combineProviders(ErrorBoundary, BrowserRouter, MediaContextProvider);
