import { makeAutoObservable } from 'mobx';

/**
 * Стор информации о продуктах (товарах) в корзине пользователя.
 */
class CartStore {
    // Число каждого из продуктов в корзине по его id
    productAmountById: Record<string, number> = {};

    constructor() {
        makeAutoObservable(this);
    }

    incrementProduct = (productId: string) => {
        this.productAmountById[productId] += 1;
    };

    decrementProduct = (productId: string) => {
        if (this.productAmountById[productId] < 1) {
            delete this.productAmountById[productId];
            return;
        }

        this.productAmountById[productId] -= 1;
    };

    resetCart = () => {
        this.productAmountById = {};
    };
}

export const cartStore = new CartStore();
