import { action, atom, computed } from '@reatom/core';
import { ProductsById } from '@/shared/api/apiTypesHelper';
import { AllProductsOutDto } from '../../types';

/**
 * Стор информации о продуктах (товарах).
 */
export const productStore = atom().extend(() => {
    const productsByCategory = atom<AllProductsOutDto | undefined>(undefined, 'productsByCategory');

    const setProducts = action(
        (nextProducts?: AllProductsOutDto) => productsByCategory.set(nextProducts),
        'setProducts'
    );

    const productsById = computed<ProductsById>(
        () =>
            Object.values(productsByCategory() ?? {})
                .flat()
                .reduce((result, product) => ({ ...result, [product.id]: product }), {}),
        'getProductsById'
    );

    return { productsByCategory, productsById, setProducts };
});
