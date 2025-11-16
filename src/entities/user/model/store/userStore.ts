import { safeLocalStorage } from '@37bytes/storage-fallback';
import { action, atom } from '@reatom/framework';
import { PlayerInfoOutDto } from '@/shared/api/apiTypes';
import { LocalStorageKey } from '@/shared/enums/localStorageKey';

export const userNameAtom = atom<string | undefined>(
    safeLocalStorage.getItem(LocalStorageKey.USER_NAME) || undefined,
    'userName'
);

export const userUniqueProductsAtom = atom<string[] | undefined>(undefined, 'userUniqueProducts');

export const setUserInfo = action((ctx, { playerName, uniqueProducts }: PlayerInfoOutDto) => {
    userNameAtom(ctx, playerName);
    userUniqueProductsAtom(ctx, uniqueProducts === null ? undefined : uniqueProducts);

    if (playerName) {
        safeLocalStorage.setItem(LocalStorageKey.USER_NAME, playerName);
    }
}, 'setUserInfo');

export const eraseUserInfo = action((ctx) => {
    userNameAtom(ctx, undefined);
    userUniqueProductsAtom(ctx, undefined);
    safeLocalStorage.removeItem(LocalStorageKey.USER_NAME);
}, 'eraseUserInfo');

// Для обратной совместимости с существующим API
export const userStoreAtom = {
    userName: userNameAtom,
    userUniqueProducts: userUniqueProductsAtom,
    setUserInfo,
    eraseUserInfo
};
