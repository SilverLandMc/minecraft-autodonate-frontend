import { createContext, FunctionComponent, PropsWithChildren } from 'react';
import { UserStore } from '@/entities/user';

export const UserStoreContext = createContext<UserStore | null>(null);

export const UserStoreProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const store = new UserStore();
    return <UserStoreContext.Provider value={store}>{children}</UserStoreContext.Provider>;
};
