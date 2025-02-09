import { lazy } from 'react';
import componentLoader from 'shared/lib/componentLoader/componentLoader';

export const AdminPageLazy = lazy(() => componentLoader(() => import('./AdminPage')));
