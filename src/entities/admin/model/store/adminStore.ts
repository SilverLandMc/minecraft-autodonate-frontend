import { makeAutoObservable } from 'mobx';

/**
 * Стор информации об админе.
 */
class AdminStore {
    isUserRequestFinished: boolean = false;
    isAuthPageVisited: boolean = false;
    isAdmin: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setUserRequestFinished = () => (this.isUserRequestFinished = true);
    setAuthPageVisited = () => (this.isAuthPageVisited = true);
    setAdmin = () => (this.isAdmin = true);
}

export const adminStore = new AdminStore();
