import { safeLocalStorage } from '@37bytes/storage-fallback';
import { action, atom } from '@reatom/core';
import { PlayerInfoOutDto } from '@/shared/api/apiTypes';
import { LocalStorageKey } from '@/shared/enums/localStorageKey';

export const userStoreAtom = atom().extend(() => {
    const userName = atom<string | undefined>(
        safeLocalStorage.getItem(LocalStorageKey.USER_NAME) || undefined,
        'productsByCategory'
    );

    const userUniqueProducts = atom<string[] | undefined>(undefined, 'userUniqueProducts');

    const setUserInfo = action(({ playerName, uniqueProducts }: PlayerInfoOutDto) => {
        userName.set(playerName);
        userUniqueProducts.set(uniqueProducts === null ? undefined : uniqueProducts);

        if (playerName) {
            safeLocalStorage.setItem(LocalStorageKey.USER_NAME, playerName);
        }
    }, 'setUserInfo');

    const eraseUserInfo = action(() => {
        userName.set(undefined);
        userUniqueProducts.set(undefined);
        safeLocalStorage.removeItem(LocalStorageKey.USER_NAME);
    }, 'eraseUserInfo');

    return { userName, userUniqueProducts, setUserInfo, eraseUserInfo };
});
