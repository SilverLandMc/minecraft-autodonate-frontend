import { lazy } from 'react';
import { componentLoader } from '@/shared/lib/componentLoader';

export const ShopPageLazy = lazy(() => componentLoader(() => import('./ShopPage')));
