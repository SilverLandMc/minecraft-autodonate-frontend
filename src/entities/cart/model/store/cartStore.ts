import { makeAutoObservable } from 'mobx';
import { PromocodeOutDto } from '@/app/types/api/apiTypes';

/**
 * Стор информации о продуктах (товарах) в корзине пользователя.
 */
class CartStore {
    // Число каждого из продуктов в корзине по его id
    productAmountById: Record<string, number> = {};
    // Активированный промокод
    promoCode?: PromocodeOutDto;

    constructor() {
        makeAutoObservable(this);
    }

    incrementProduct = (productId: string) => {
        this.productAmountById[productId] += 1;
    };

    decrementProduct = (productId: string) => {
        if (this.productAmountById[productId] === 1) {
            delete this.productAmountById[productId];
            return;
        }

        this.productAmountById[productId] -= 1;
    };

    deleteProduct = (productId: string) => {
        delete this.productAmountById[productId];
    };

    resetCart = () => {
        this.productAmountById = {};
    };

    setPromoCode = (promoCode?: PromocodeOutDto) => {
        this.promoCode = promoCode;
    };

    deletePromoCode = () => this.setPromoCode(undefined);
}

export const cartStore = new CartStore();
