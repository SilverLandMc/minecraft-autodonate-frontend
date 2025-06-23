import { makeAutoObservable, runInAction } from 'mobx';
import { fetchProducts } from '../../api/fetchProducts';
import { AllProductsOutDto, ProductsById } from '../../types';

/**
 * Стор информации о продуктах (товарах).
 *
 * @see authProvider
 */
class ProductStore {
    productsByCategory?: AllProductsOutDto;
    isProductsFetching?: boolean;

    constructor() {
        makeAutoObservable(this);
    }

    setProducts = (nextProducts?: AllProductsOutDto) => {
        this.productsByCategory = nextProducts;
    };

    fetchProducts = async () => {
        if (this.productsByCategory) {
            return;
        }

        this.isProductsFetching = true;

        const nextProducts = await fetchProducts();

        runInAction(() => {
            this.setProducts(nextProducts);
            this.isProductsFetching = false;
        });
    };

    get productsById(): ProductsById {
        return Object.values(this.productsByCategory ?? {})
            .flat()
            .reduce((result, product) => ({ ...result, [product.id]: product }), {});
    }
}

export const productStore = new ProductStore();
