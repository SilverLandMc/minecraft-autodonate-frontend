import { Category, ProductOutDto } from '@/shared/api/apiTypes';

export type AllProductsOutDto = Record<Category, ProductOutDto[]>;
