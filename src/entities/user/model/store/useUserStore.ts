import { useContext } from 'react';
import { UserStoreContext } from '@/app/providers/userStoreProvider';

export const useUserStore = () => {
    const context = useContext(UserStoreContext);

    if (!context) {
        throw new Error('useUserStore must be used within a UserStoreProvider');
    }

    return context;
};
