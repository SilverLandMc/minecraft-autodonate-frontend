import { action, atom } from '@reatom/core';

/**
 * Стор информации об админе.
 */

export const adminStore = atom().extend(() => {
    const isUserRequestFinished = atom<boolean>(false, 'isUserRequestFinished');
    const isAuthPageVisited = atom<boolean>(false, 'isAuthPageVisited');
    const isAdmin = atom<boolean>(false, 'isAdmin');

    const setUserRequestFinished = action(() => isUserRequestFinished.set(true), 'setUserRequestFinished');
    const setAuthPageVisited = action(() => isAuthPageVisited.set(true), 'setAuthPageVisited');
    const setAdmin = action(() => isAdmin.set(true), 'setAdmin');

    return { isUserRequestFinished, isAdmin, isAuthPageVisited, setUserRequestFinished, setAuthPageVisited, setAdmin };
});
