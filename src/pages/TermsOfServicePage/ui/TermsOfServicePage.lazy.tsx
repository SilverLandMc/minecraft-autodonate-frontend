import { lazy } from 'react';
import componentLoader from 'shared/lib/componentLoader/componentLoader';

export const TermsOfServicePageLazy = lazy(() => componentLoader(() => import('./TermsOfServicePage')));
