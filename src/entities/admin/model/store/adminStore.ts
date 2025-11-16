import { action, atom } from '@reatom/framework';

/**
 * Стор информации об админе.
 */

const isUserRequestFinishedAtom = atom<boolean>(false, 'isUserRequestFinished');
const isAuthPageVisitedAtom = atom<boolean>(false, 'isAuthPageVisited');
const isAdminAtom = atom<boolean>(false, 'isAdmin');

const setUserRequestFinished = action((ctx) => {
    isUserRequestFinishedAtom(ctx, true);
}, 'setUserRequestFinished');

const setAuthPageVisited = action((ctx) => {
    isAuthPageVisitedAtom(ctx, true);
}, 'setAuthPageVisited');

const setAdmin = action((ctx) => {
    isAdminAtom(ctx, true);
}, 'setAdmin');

// Для обратной совместимости с существующим API
export const adminStore = {
    isUserRequestFinished: isUserRequestFinishedAtom,
    isAdmin: isAdminAtom,
    isAuthPageVisited: isAuthPageVisitedAtom,
    setUserRequestFinished,
    setAuthPageVisited,
    setAdmin
};
