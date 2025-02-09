import { safeLocalStorage } from '@37bytes/storage-fallback';
import { PlayerInfoOutDto } from 'app/types/api/apiTypes';
import { makeAutoObservable } from 'mobx';
import LocalStorageKey from 'shared/const/enum/localStorageKey';

export class UserStore {
    userName?: string = safeLocalStorage.getItem(LocalStorageKey.USER_NAME) || undefined;
    userUniqueProducts?: string[];

    constructor() {
        makeAutoObservable(this);
    }

    setUserInfo = ({ playerName, uniqueProducts }: PlayerInfoOutDto) => {
        this.userName = playerName;
        this.userUniqueProducts = (uniqueProducts as string[] | undefined) ?? [];

        if (playerName) {
            safeLocalStorage.setItem(LocalStorageKey.USER_NAME, playerName);
        }
    };

    eraseUserInfo = () => {
        this.userName = undefined;
        this.userUniqueProducts = [];
        safeLocalStorage.removeItem(LocalStorageKey.USER_NAME);
    };
}
