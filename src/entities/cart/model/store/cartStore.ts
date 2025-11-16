import { action, atom } from '@reatom/framework';
import { PromocodeOutDto } from '@/shared/api/apiTypes';

/**
 * Стор информации о продуктах (товарах) в корзине пользователя и активированном промокоде.
 */

// Число каждого из продуктов в корзине по его id
export const productAmountByIdAtom = atom<Record<string, number>>({}, 'productAmountById');

// Активированный промокод
export const promoCodeAtom = atom<PromocodeOutDto | undefined>(undefined, 'promoCode');

export const incrementProduct = action((ctx, productId: string) => {
    const current = ctx.get(productAmountByIdAtom);

    if (!current[productId]) {
        productAmountByIdAtom(ctx, {
            ...current,
            [productId]: 1
        });
        return;
    }

    productAmountByIdAtom(ctx, {
        ...current,
        [productId]: current[productId] + 1
    });
}, 'incrementProduct');

export const decrementProduct = action((ctx, productId: string) => {
    const current = ctx.get(productAmountByIdAtom);

    if (current[productId] === 1) {
        const { [productId]: _, ...rest } = current;
        productAmountByIdAtom(ctx, rest);
        return;
    }

    productAmountByIdAtom(ctx, {
        ...current,
        [productId]: current[productId] - 1
    });
}, 'decrementProduct');

export const setPromoCode = action((ctx, nextPromoCode?: PromocodeOutDto) => {
    promoCodeAtom(ctx, nextPromoCode);
}, 'setPromoCode');

export const deletePromoCode = action((ctx) => {
    promoCodeAtom(ctx, undefined);
}, 'deletePromoCode');

// Для обратной совместимости с существующим API
export const cartStore = {
    productAmountById: productAmountByIdAtom,
    promoCode: promoCodeAtom,
    incrementProduct,
    decrementProduct,
    setPromoCode,
    deletePromoCode
};
