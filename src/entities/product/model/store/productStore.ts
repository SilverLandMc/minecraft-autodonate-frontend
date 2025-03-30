import { makeAutoObservable } from 'mobx';
import { fetchProducts } from '../../api/fetchProducts';
import { AllProductsOutDto } from '../../types';

/**
 * Стор информации о продуктах (товарах).
 *
 * @see authProvider
 */
class ProductStore {
    products?: AllProductsOutDto;
    isProductsFetching?: boolean;

    constructor() {
        makeAutoObservable(this);
    }

    setProducts = (nextProducts?: AllProductsOutDto) => {
        this.products = nextProducts;
    };
    resetProducts = () => this.setProducts(undefined);

    fetchProducts = async () => {
        if (this.products) {
            return;
        }

        this.isProductsFetching = true;
        const nextProducts = await fetchProducts();
        this.setProducts(nextProducts);
        this.isProductsFetching = false;
    };
}

export const productStore = new ProductStore();
