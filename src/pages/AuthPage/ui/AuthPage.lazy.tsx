import { lazy } from 'react';
import componentLoader from 'shared/lib/componentLoader/componentLoader';

export const AuthPageLazy = lazy(() => componentLoader(() => import('./AuthPage')));
