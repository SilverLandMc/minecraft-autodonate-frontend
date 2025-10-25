import { makeAutoObservable } from 'mobx';
import { ProductsById } from '@/shared/api/apiTypesHelper';
import { AllProductsOutDto } from '../../types';

/**
 * Стор информации о продуктах (товарах).
 *
 * @see authProvider
 */
class ProductStore {
    productsByCategory?: AllProductsOutDto;

    constructor() {
        makeAutoObservable(this);
    }

    setProducts = (nextProducts?: AllProductsOutDto) => {
        this.productsByCategory = nextProducts;
    };

    get productsById(): ProductsById {
        return Object.values(this.productsByCategory ?? {})
            .flat()
            .reduce((result, product) => ({ ...result, [product.id]: product }), {});
    }
}

export const productStore = new ProductStore();
