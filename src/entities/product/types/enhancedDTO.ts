import { Category, ProductOutDto } from '@/app/types/api/apiTypes';

export type AllProductsOutDto = Record<Category, ProductOutDto[]>;
