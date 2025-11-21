import { action, makeAutoObservable, makeObservable, observable } from 'mobx';
import { PromocodeOutDto } from '@/shared/api/apiTypes';

/**
 * Стор информации о продуктах (товарах) в корзине пользователя и активированном промокоде.
 */
class CartStore {
    // Число каждого из продуктов в корзине по его id
    productAmountById: Record<string, number> = {};
    // Активированный промокод
    promoCode?: PromocodeOutDto;

    // constructor() {
    //     makeAutoObservable(this);
    // }

    constructor() {
        makeObservable(this, {
            productAmountById: observable,
            promoCode: observable,
            incrementProduct: action,
            decrementProduct: action,
            deleteProduct: action,
            setPromoCode: action,
            deletePromoCode: action
        });
    }

    incrementProduct = (productId: string) => {
        if (!this.productAmountById[productId]) {
            this.productAmountById[productId] = 1;
            return;
        }

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

    setPromoCode = (promoCode?: PromocodeOutDto) => {
        this.promoCode = promoCode;
    };

    deletePromoCode = () => this.setPromoCode(undefined);
}

export const cartStore = new CartStore();
