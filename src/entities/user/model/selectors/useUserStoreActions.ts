import { useUserStore } from '../store/useUserStore';

export const useUserStoreActions = () => {
    const { setUserInfo, eraseUserInfo } = useUserStore();

    return { setUserInfo, eraseUserInfo };
};
