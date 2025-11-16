import { action, atom } from '@reatom/framework';
import { ProductsById } from '@/shared/api/apiTypesHelper';
import { AllProductsOutDto } from '../../types';

/**
 * Стор информации о продуктах (товарах).
 */
export const productsByCategoryAtom = atom<AllProductsOutDto | undefined>(undefined, 'productsByCategory');

export const setProducts = action((ctx, nextProducts?: AllProductsOutDto) => {
    productsByCategoryAtom(ctx, nextProducts);
}, 'setProducts');

export const productsByIdAtom = atom((ctx) => {
    const byCategory = ctx.spy(productsByCategoryAtom);
    return Object.values(byCategory ?? {})
        .flat()
        .reduce((result, product) => ({ ...result, [product.id]: product }), {} as ProductsById);
}, 'productsById');

// Для обратной совместимости с существующим API
export const productStore = {
    productsByCategory: productsByCategoryAtom,
    productsById: productsByIdAtom,
    setProducts
};
