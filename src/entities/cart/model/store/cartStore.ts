import { action, atom } from '@reatom/core';
import { PromocodeOutDto } from '@/shared/api/apiTypes';

/**
 * Стор информации о продуктах (товарах) в корзине пользователя и активированном промокоде.
 */

/**
 * Стор информации об админе.
 */

export const cartStore = atom().extend(() => {
    // Число каждого из продуктов в корзине по его id
    const productAmountById = atom<Record<string, number>>({}, 'productAmountById');

    // Активированный промокод
    const promoCode = atom<PromocodeOutDto | undefined>(undefined, 'isAuthPageVisited');

    const incrementProduct = action((productId: string) => {
        if (!productAmountById()[productId]) {
            productAmountById.set((prevState) => {
                prevState[productId] = 1;
                return prevState;
            });
            return;
        }

        productAmountById.set((prevState) => {
            prevState[productId] += 1;
            return prevState;
        });
    }, 'incrementProduct');

    const decrementProduct = action((productId: string) => {
        if (productAmountById()[productId] === 1) {
            productAmountById.set((prevState) => {
                delete prevState[productId];
                return prevState;
            });
            return;
        }

        productAmountById.set((prevState) => {
            prevState[productId] -= 1;
            return prevState;
        });
    }, 'decrementProduct');

    const setPromoCode = action((nextPromoCode?: PromocodeOutDto) => promoCode.set(nextPromoCode), 'setPromoCode');

    const deletePromoCode = action(() => setPromoCode(undefined), 'deletePromoCode');

    return { productAmountById, promoCode, incrementProduct, decrementProduct, setPromoCode, deletePromoCode };
});
